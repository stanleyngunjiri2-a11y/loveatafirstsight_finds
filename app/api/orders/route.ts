	import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RequestedItem = {
  productId: string;
  quantity: number;
};

type CheckoutBody = {
  customerName: string;
  customerPhone: string;
  fulfilmentMethod: "pickup" | "delivery";
  deliveryLocation?: string;
  notes?: string;
  items: RequestedItem[];
};

const MAX_ITEMS = 30;

function cleanText(value: unknown, maxLength: number) {
  return typeof value === "string"
    ? value.trim().slice(0, maxLength)
    : "";
}

function normalizePhone(value: string) {
  const digits = value.replace(/\D/g, "");

  if (/^0\d{9}$/.test(digits)) {
    return `254${digits.slice(1)}`;
  }

  if (/^254\d{9}$/.test(digits)) {
    return digits;
  }

  if (/^\d{9}$/.test(digits)) {
    return `254${digits}`;
  }

  return "";
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CheckoutBody;

    const customerName = cleanText(body.customerName, 120);
    const customerPhoneInput = cleanText(body.customerPhone, 30);
    const customerPhone = normalizePhone(customerPhoneInput);
    const fulfilmentMethod = body.fulfilmentMethod;
    const deliveryLocation = cleanText(body.deliveryLocation, 500);
    const notes = cleanText(body.notes, 1000);
    const items = body.items;

    if (customerName.length < 2) {
      return NextResponse.json(
        { error: "Please enter your full name." },
        { status: 400 },
      );
    }

    if (!customerPhone) {
      return NextResponse.json(
        {
          error:
            "Enter a valid Kenyan phone number, such as 0712345678 or 254712345678.",
        },
        { status: 400 },
      );
    }

    if (!["pickup", "delivery"].includes(fulfilmentMethod)) {
      return NextResponse.json(
        { error: "Choose pickup or delivery." },
        { status: 400 },
      );
    }

    if (fulfilmentMethod === "delivery" && deliveryLocation.length < 3) {
      return NextResponse.json(
        { error: "Please provide your delivery location." },
        { status: 400 },
      );
    }

    if (
      !Array.isArray(items) ||
      items.length === 0 ||
      items.length > MAX_ITEMS
    ) {
      return NextResponse.json(
        { error: "Your cart is empty or contains too many items." },
        { status: 400 },
      );
    }

    const quantities = new Map<string, number>();

    for (const item of items) {
      if (
        !item ||
        typeof item.productId !== "string" ||
        !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
          item.productId,
        ) ||
        !Number.isInteger(item.quantity) ||
        item.quantity < 1 ||
        item.quantity > 20
      ) {
        return NextResponse.json(
          { error: "One or more cart items are invalid." },
          { status: 400 },
        );
      }

      quantities.set(
        item.productId,
        (quantities.get(item.productId) ?? 0) + item.quantity,
      );
    }

    const checkedItems: {
      id: string;
      name: string;
      slug: string;
      price: number;
      quantity: number;
      subtotal: number;
      productUrl: string;
    }[] = [];

    const origin = new URL(request.url).origin;

    for (const [productId, quantity] of quantities) {
      const rows = await sql`
        SELECT id, name, slug, price, stock_status
        FROM products
        WHERE id = ${productId}::uuid
        LIMIT 1
      `;

      if (rows.length === 0) {
        return NextResponse.json(
          { error: "A product in your cart no longer exists." },
          { status: 400 },
        );
      }

      const product = rows[0];

      if (product.stock_status !== "available") {
        return NextResponse.json(
          {
            error: `${product.name} is no longer available. Please remove it from your cart.`,
          },
          { status: 409 },
        );
      }

      const price = Number(product.price);

      if (!Number.isFinite(price) || price <= 0) {
        return NextResponse.json(
          { error: "A product has an invalid price. Please contact the store." },
          { status: 500 },
        );
      }

      checkedItems.push({
        id: String(product.id),
        name: String(product.name),
        slug: String(product.slug),
        price,
        quantity,
        subtotal: Math.round(price * quantity * 100) / 100,
        productUrl: `${origin}/shop/${product.slug}`,
      });
    }

    const totalAmount =
      Math.round(
        checkedItems.reduce((sum, item) => sum + item.subtotal, 0) * 100,
      ) / 100;

    const databaseItems = checkedItems.map((item) => ({
      product_id: item.id,
      product_name: item.name,
      product_url: item.productUrl,
      unit_price: item.price,
      quantity: item.quantity,
      subtotal: item.subtotal,
    }));

    /*
     * Save the order and all its items in a single SQL statement.
     * The CTE avoids creating an order without its associated items
     * if the item insertion fails.
     */
    const savedOrders = await sql`
      WITH new_order AS (
        INSERT INTO customer_orders (
          customer_name,
          customer_phone,
          fulfilment_method,
          delivery_location,
          notes,
          total_amount,
          status
        )
        VALUES (
          ${customerName},
          ${customerPhone},
          ${fulfilmentMethod},
          ${fulfilmentMethod === "delivery" ? deliveryLocation : null},
          ${notes || null},
          ${totalAmount},
          'pending'
        )
        RETURNING id
      ),
      inserted_items AS (
        INSERT INTO order_items (
          order_id,
          product_id,
          product_name,
          product_url,
          unit_price,
          quantity,
          subtotal
        )
        SELECT
          new_order.id,
          item.product_id,
          item.product_name,
          item.product_url,
          item.unit_price,
          item.quantity,
          item.subtotal
        FROM new_order
        CROSS JOIN json_to_recordset(
          ${JSON.stringify(databaseItems)}::json
        ) AS item(
          product_id uuid,
          product_name text,
          product_url text,
          unit_price numeric,
          quantity integer,
          subtotal numeric
        )
        RETURNING order_id
      )
      SELECT new_order.id
      FROM new_order
      INNER JOIN inserted_items
        ON inserted_items.order_id = new_order.id
      LIMIT 1
    `;

    if (savedOrders.length === 0) {
      throw new Error("The order could not be saved.");
    }

    const orderId = String(savedOrders[0].id);

    const itemLines = checkedItems
      .map(
        (item) =>
          `${item.name} x ${item.quantity} — KSh ${item.subtotal.toLocaleString("en-KE")}\n${item.productUrl}`,
      )
      .join("\n\n");

    const message = [
      "Hello LOVEATFIRSTSIGHT FINDS! I have placed an order.",
      "",
      `Order reference: ${orderId}`,
      `Name: ${customerName}`,
      `Phone: ${customerPhoneInput}`,
      `Fulfilment: ${fulfilmentMethod}`,
      ...(fulfilmentMethod === "delivery"
        ? [`Delivery location: ${deliveryLocation}`]
        : []),
      "",
      "Items:",
      itemLines,
      "",
      `Order total: KSh ${totalAmount.toLocaleString("en-KE")}`,
      ...(notes ? ["", `Additional notes: ${notes}`] : []),
      "",
      "Please confirm availability and the next steps.",
    ].join("\n");

    return NextResponse.json(
      {
        success: true,
        orderId,
        totalAmount,
        whatsappUrl: `https://wa.me/254794625388?text=${encodeURIComponent(message)}`,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Customer checkout failed:", error);

    return NextResponse.json(
      {
        error:
          "We could not submit your order. Please try again or contact the store.",
      },
      { status: 500 },
    );
  }
}
