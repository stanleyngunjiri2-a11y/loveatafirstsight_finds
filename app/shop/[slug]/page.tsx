import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MessageCircle, ArrowLeft } from "lucide-react";
import { sql } from "@/lib/db";
import AddToCartButton from "@/components/AddToCartButton";

export const dynamic = "force-dynamic";

type Product = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  category: string;
  price: string | number;
  old_price: string | number | null;
  image_url: string;
  stock_status: string;
};

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let product: Product | undefined;

  try {
    const results = (await sql`
      SELECT
        id,
        name,
        slug,
        description,
        category,
        price,
        old_price,
        image_url,
        stock_status
      FROM products
      WHERE slug = ${slug}
      LIMIT 1
    `) as Product[];

    product = results[0];
  } catch (error) {
    console.error("Unable to load product:", error);
    throw new Error("Unable to load this product. Please try again.");
  }

  if (!product) {
    notFound();
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const productUrl = `${siteUrl}/shop/${product.slug}`;

  const message = [
    "Hello LOVEATFIRSTSIGHT FINDS! I'd like to order this product:",
    "",
    `Product: ${product.name}`,
    `Price: KSh ${Number(product.price).toLocaleString("en-KE")}`,
    `Product link: ${productUrl}`,
    "",
    "Please confirm availability. Thank you!",
  ].join("\n");

  const whatsappUrl = `https://wa.me/254794625388?text=${encodeURIComponent(message)}`;

  return (
    <main className="min-h-screen bg-[#FFFFFF] text-[#000000]">
      <header className="border-b border-[#E5E5E5] bg-white px-5 py-5 sm:px-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm text-[#000000] transition hover:underline"
          >
            <ArrowLeft size={17} />
            Back to shop
          </Link>

          <Link
            href="/cart"
            className="text-sm font-semibold text-[#000000] transition hover:underline"
          >
            Shopping bag
          </Link>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-10 sm:px-10 sm:py-16 md:grid-cols-2 md:items-center">
        <div className="relative mx-auto aspect-[3/4] w-full max-w-lg overflow-hidden rounded-2xl bg-[#F5F5F5]">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              unoptimized
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-[#666666]">
              Product image coming soon
            </div>
          )}

          {product.stock_status === "sold" && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/45">
              <span className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#000000]">
                SOLD OUT
              </span>
            </div>
          )}
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#000000]">
            {product.category}
          </p>

          <h1 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
            {product.name}
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="text-xl font-semibold">
              KSh {Number(product.price).toLocaleString("en-KE")}
            </span>

            {product.old_price &&
              Number(product.old_price) > Number(product.price) && (
                <span className="text-base text-[#666666] line-through">
                  KSh{" "}
                  {Number(product.old_price).toLocaleString("en-KE")}
                </span>
              )}
          </div>

          <p className="mt-6 whitespace-pre-line text-sm leading-7 text-[#666666]">
            {product.description ||
              "A special find selected for your wardrobe."}
          </p>

          <p
            className={`mt-6 text-sm font-medium ${
              product.stock_status === "available"
                ? "text-green-700"
                : "text-red-700"
            }`}
          >
            {product.stock_status === "available"
              ? "Available to order"
              : "Currently sold out"}
          </p>

          <div className="mt-8">
            <AddToCartButton
              productId={String(product.id)}
              name={product.name}
              slug={product.slug}
              price={Number(product.price)}
              imageUrl={product.image_url || ""}
              stockStatus={product.stock_status}
            />
          </div>

          {product.stock_status === "available" && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex w-full items-center justify-center gap-3 rounded-full border border-[#000000] px-7 py-4 text-sm font-medium text-[#000000] transition hover:bg-[#F5F5F5] sm:w-auto"
            >
              <MessageCircle size={19} />
              Ask about this product
            </a>
          )}

          <p className="mt-5 text-xs leading-6 text-[#666666]">
            Pickup: Dynamic Mall, Shop ML32, Ground Floor. Delivery
            arrangements can be confirmed with us on WhatsApp.
          </p>
        </div>
      </section>
    </main>
  );
}