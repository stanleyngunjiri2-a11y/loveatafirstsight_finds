import Image from "next/image";
import Link from "next/link";
import { sql } from "@/lib/db";
import { MessageCircle, ShoppingBag } from "lucide-react";

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

const categories = ["All", "Hoodies", "Shirts", "T-shirts"];

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const selectedCategory = categories.includes(params.category ?? "")
    ? params.category!
    : "All";

  let products: Product[] = [];

  try {
    products = (await sql`
      SELECT id, name, slug, description, category, price,
             old_price, image_url, stock_status
      FROM products
      WHERE stock_status = 'available'
      ORDER BY created_at DESC
    `) as Product[];
  } catch (error) {
    console.error("Unable to load products:", error);
  }

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <main className="min-h-screen bg-[#FFFFFF] text-[#000000]">
      <header className="border-b border-[#E5E5E5] px-5 py-5 sm:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="font-serif text-lg font-semibold tracking-tight">
            LOVEATFIRSTSIGHT <span className="text-[#000000]">FINDS</span>
          </Link>
          <Link
            href="/"
            className="text-sm text-[#000000] transition hover:opacity-70"
          >
            Back to home
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-10 sm:py-16">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#000000]">
          Your next favourite find
        </p>

        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <h1 className="font-serif text-4xl sm:text-6xl">The Shop</h1>
            <p className="mt-3 max-w-lg text-sm leading-6 text-[#666666]">
              Discover pieces that express your style. Find something you love,
              then order directly through WhatsApp.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-[#666666]">
            <ShoppingBag size={17} />
            {filteredProducts.length} available{" "}
            {filteredProducts.length === 1 ? "piece" : "pieces"}
          </div>
        </div>

        <nav
          aria-label="Product categories"
          className="my-9 flex flex-wrap gap-2 border-b border-[#E5E5E5] pb-5"
        >
          {categories.map((category) => {
            const active = category === selectedCategory;
            const href =
              category === "All"
                ? "/shop"
                : `/shop?category=${encodeURIComponent(category)}`;

            return (
              <Link
                key={category}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`inline-flex min-h-12 items-center justify-center rounded-full border-2 px-6 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 ${
                  active
                    ? "border-black bg-white text-black shadow-sm"
                    : "border-[#BDBDBD] bg-white text-black hover:border-black hover:bg-[#F3F3F3] active:bg-[#E5E5E5]"
                }`}
              >
                {category}
              </Link>
            );
          })}
        </nav>

        {filteredProducts.length === 0 ? (
          <div className="rounded-2xl border border-[#E5E5E5] bg-white px-6 py-20 text-center">
            <ShoppingBag className="mx-auto mb-5 text-[#000000]" size={34} />
            <h2 className="font-serif text-2xl">
              {products.length === 0
                ? "Your next favourite piece is on its way"
                : "No pieces in this category yet"}
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#666666]">
              {products.length === 0
                ? "Our collection is being prepared. Check back soon or contact us on WhatsApp."
                : "Explore another category to discover our available collection."}
            </p>
            <a
              href="https://wa.me/254794625388"
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-black bg-black px-7 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
            >
              <MessageCircle size={17} />
              Ask about available pieces
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <article key={product.id} className="group min-w-0">
                <Link href={`/shop/${product.slug}`} className="block">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-[#F5F5F5]">
                    <Image
                      src={product.image_url}
                      alt={product.name}
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    {product.old_price &&
                      Number(product.old_price) > Number(product.price) && (
                        <span className="absolute left-2 top-2 rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold text-[#000000] sm:left-3 sm:top-3 sm:text-xs">
                          SALE
                        </span>
                      )}
                  </div>

                  <p className="mt-4 text-[10px] uppercase tracking-[0.2em] text-[#666666] sm:text-xs">
                    {product.category}
                  </p>
                  <h2 className="mt-1 line-clamp-2 text-sm font-medium sm:text-base">
                    {product.name}
                  </h2>
                </Link>

                <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
                  <span className="font-semibold">
                    KSh {Number(product.price).toLocaleString("en-KE")}
                  </span>
                  {product.old_price &&
                    Number(product.old_price) > Number(product.price) && (
                      <span className="text-xs text-[#666666] line-through">
                        KSh {Number(product.old_price).toLocaleString("en-KE")}
                      </span>
                    )}
                </div>

                <Link
                  href={`/shop/${product.slug}`}
                  className="mt-4 inline-flex w-full items-center justify-center rounded-full border border-[#000000] px-3 py-2.5 text-xs font-medium text-[#000000] transition hover:bg-[#000000] hover:text-white sm:text-sm"
                >
                  View product
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>

      <footer className="border-t border-[#E5E5E5] px-5 py-8 text-center text-xs text-[#666666]">
        © {new Date().getFullYear()} LOVEATFIRSTSIGHT FINDS · Find what you love.
      </footer>
    </main>
  );
}
