import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { sql } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const orders = await sql`
      SELECT
        o.id,
        o.customer_name,
        o.customer_phone,
        o.fulfilment_method,
        o.delivery_location,
        o.notes,
        o.total_amount,
        o.status,
        o.created_at,
        COALESCE(
          (
            SELECT json_agg(
              json_build_object(
                'product_name', oi.product_name,
                'product_url', oi.product_url,
                'unit_price', oi.unit_price,
                'quantity', oi.quantity,
                'subtotal', oi.subtotal
              )
            )
            FROM order_items oi
            WHERE oi.order_id = o.id
          ),
          '[]'::json
        ) AS items
      FROM customer_orders o
      ORDER BY o.created_at DESC
      LIMIT 200
    `;

    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Orders fetch failed:", error);

    return NextResponse.json(
      { error: "Unable to load orders." },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const id = typeof body.id === "string" ? body.id : "";
    const status = body.status;

    const validStatuses = [
      "pending",
      "confirmed",
      "completed",
      "cancelled",
    ];

    if (!id || !validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid order ID or status." },
        { status: 400 },
      );
    }

    const rows = await sql`
      UPDATE customer_orders
      SET status = ${status}
      WHERE id = ${id}::uuid
      RETURNING id, status
    `;

    if (rows.length === 0) {
      return NextResponse.json(
        { error: "Order not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, order: rows[0] });
  } catch (error) {
    console.error("Order update failed:", error);

    return NextResponse.json(
      { error: "Unable to update order." },
      { status: 500 },
    );
  }
}
