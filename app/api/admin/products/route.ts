import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { sql } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const categories = ["Hoodies", "Shirts", "T-shirts"];

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const products = await sql`
      SELECT * FROM products ORDER BY created_at DESC
    `;

    return NextResponse.json({ products });
  } catch (error) {
    console.error("Products fetch failed:", error);
    return NextResponse.json(
      { error: "Could not load products." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const description =
      typeof body.description === "string" ? body.description.trim() : "";
    const category = body.category;
    const imageUrl =
      typeof body.imageUrl === "string" ? body.imageUrl.trim() : "";
    const price = Number(body.price);
    const oldPrice =
      body.oldPrice === "" || body.oldPrice == null
        ? null
        : Number(body.oldPrice);

    if (!name || name.length > 160) {
      return NextResponse.json(
        { error: "Enter a valid product name." },
        { status: 400 },
      );
    }

    if (!categories.includes(category)) {
      return NextResponse.json(
        { error: "Choose a valid category." },
        { status: 400 },
      );
    }

    if (!Number.isFinite(price) || price <= 0) {
      return NextResponse.json(
        { error: "Enter a valid selling price." },
        { status: 400 },
      );
    }

    if (
      oldPrice !== null &&
      (!Number.isFinite(oldPrice) || oldPrice <= price)
    ) {
      return NextResponse.json(
        { error: "Original price must exceed selling price." },
        { status: 400 },
      );
    }

    if (imageUrl && !/^https?:\/\/\S+$/i.test(imageUrl)) {
      return NextResponse.json(
        { error: "Enter a valid HTTP or HTTPS image URL." },
        { status: 400 },
      );
    }

    const slug = `${name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")}-${crypto.randomUUID().slice(0, 8)}`;

    const rows = await sql`
      INSERT INTO products (
        name, slug, description, category, price,
        old_price, image_url, image_urls, stock_status
      )
      VALUES (
        ${name},
        ${slug},
        ${description},
        ${category},
        ${price},
        ${oldPrice},
        ${imageUrl},
        ${JSON.stringify(imageUrl ? [imageUrl] : [])}::jsonb,
        'available'
      )
      RETURNING *
    `;

    return NextResponse.json(
      { success: true, product: rows[0] },
      { status: 201 },
    );
  } catch (error) {
    console.error("Product creation failed:", error);
    return NextResponse.json(
      { error: "Could not save the product." },
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

    if (!id) {
      return NextResponse.json(
        { error: "A valid product ID is required." },
        { status: 400 },
      );
    }

    // Replace the image on an existing product without creating a new product.
    if (body.imageUrl !== undefined) {
      const imageUrl =
        typeof body.imageUrl === "string" ? body.imageUrl.trim() : "";

      let parsedUrl: URL;

      try {
        parsedUrl = new URL(imageUrl);
      } catch {
        return NextResponse.json(
          { error: "Please upload a valid product image." },
          { status: 400 },
        );
      }

      if (
        !["https:", "http:"].includes(parsedUrl.protocol) ||
        !parsedUrl.hostname
      ) {
        return NextResponse.json(
          { error: "Please upload a valid product image URL." },
          { status: 400 },
        );
      }

      const rows = await sql`
        UPDATE products
        SET
          image_url = ${imageUrl},
          image_urls = ${JSON.stringify([imageUrl])}::jsonb,
          updated_at = NOW()
        WHERE id = ${id}::uuid
        RETURNING id, name, image_url, image_urls
      `;

      if (!rows.length) {
        return NextResponse.json(
          { error: "Product not found." },
          { status: 404 },
        );
      }

      return NextResponse.json({
        success: true,
        message: "Product image updated successfully.",
        product: rows[0],
      });
    }

    // Keep the existing stock-status functionality.
    const stockStatus = body.stockStatus;

    if (!["available", "sold"].includes(stockStatus)) {
      return NextResponse.json(
        { error: "Invalid stock status." },
        { status: 400 },
      );
    }

    const rows = await sql`
      UPDATE products
      SET stock_status = ${stockStatus}, updated_at = NOW()
      WHERE id = ${id}::uuid
      RETURNING id, name, stock_status
    `;

    if (!rows.length) {
      return NextResponse.json(
        { error: "Product not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, product: rows[0] });
  } catch (error) {
    console.error("Product update failed:", error);

    return NextResponse.json(
      { error: "Could not update the product. Please try again." },
      { status: 500 },
    );
  }
}

