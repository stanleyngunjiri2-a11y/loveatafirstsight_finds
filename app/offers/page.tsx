import Link from "next/link";
import { ArrowRight, Heart, MessageCircle } from "lucide-react";

const categories = [
  {
    name: "Hoodies",
    description: "Explore comfortable layers for your everyday look.",
    href: "/shop?category=Hoodies",
  },
  {
    name: "Shirts",
    description: "Discover classic pieces for different occasions.",
    href: "/shop?category=Shirts",
  },
  {
    name: "T-shirts",
    description: "Browse everyday essentials and casual favourites.",
    href: "/shop?category=T-shirts",
  },
];

export const metadata = {
  title: "Offers & Finds",
  description:
    "Explore clothing collections and ask LOVEATFIRSTSIGHT FINDS about current offers and availability.",
};

export default function OffersPage() {
  return (
    <main className="min-h-screen bg-[#FFFFFF] text-[#000000]">
      <header className="border-b border-[#E5E5E5] bg-white">
        <div className="container flex min-h-20 items-center justify-between gap-4">
          <Link href="/" className="font-serif text-sm font-semibold sm:text-base">
            LOVEATFIRSTSIGHT <span className="text-[#000000]">FINDS</span>
          </Link>
          <Link href="/cart" className="text-sm text-[#000000] hover:underline">
            Shopping bag
          </Link>
        </div>
      </header>

      <section className="bg-[#F5F5F5] px-5 py-16 text-center sm:py-24">
        <Heart size={28} strokeWidth={1.3} className="mx-auto text-[#000000]" />
        <p className="eyebrow mt-5 text-[#000000]">Something worth finding</p>
        <h1 className="mt-4 font-serif text-4xl tracking-tight sm:text-6xl">
          Discover your next favourite.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#666666]">
          Explore our available collections and check the current prices.
          For information about special offers or a particular item, get in
          touch with us directly.
        </p>
        <Link href="/shop" className="primary-button mt-8">
          Browse all products <ArrowRight size={16} />
        </Link>
      </section>

      <section className="container py-14 sm:py-20">
        <div className="mb-8">
          <p className="eyebrow text-[#000000]">Explore the collection</p>
          <h2 className="section-title">Find your kind of style.</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {categories.map((category, index) => (
            <Link
              key={category.name}
              href={category.href}
              className={`collection-card flex min-h-56 flex-col justify-between p-6 sm:p-8 collection-${index + 1}`}
            >
              <span className="text-xs uppercase tracking-widest">
                0{index + 1} / Collection
              </span>
              <div>
                <h3 className="font-serif text-3xl">{category.name}</h3>
                <p className="mt-3 text-sm leading-6 opacity-80">
                  {category.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
                  Explore <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-4 border border-[#E5E5E5] bg-white p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <h2 className="font-serif text-2xl">Looking for something specific?</h2>
            <p className="mt-2 text-sm leading-6 text-[#666666]">
              Ask us about current availability, pricing, and pickup arrangements.
            </p>
          </div>
          <a
            href="https://wa.me/254794625388"
            target="_blank"
            rel="noreferrer"
            className="primary-button w-fit"
          >
            <MessageCircle size={16} /> Ask on WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}
