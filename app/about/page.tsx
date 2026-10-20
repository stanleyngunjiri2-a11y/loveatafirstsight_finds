import Link from "next/link";
import { ArrowRight, Heart, MapPin } from "lucide-react";

export const metadata = {
  title: "Our Story",
  description:
    "Discover the story and style behind LOVEATFIRSTSIGHT FINDS.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#FFFFFF] text-[#000000]">
      <header className="border-b border-[#E5E5E5] bg-white">
        <div className="container flex min-h-20 items-center justify-between gap-4">
          <Link href="/" className="font-serif text-sm font-semibold sm:text-base">
            LOVEATFIRSTSIGHT <span className="text-[#000000]">FINDS</span>
          </Link>
          <Link href="/shop" className="text-sm text-[#000000] hover:underline">
            Shop collection
          </Link>
        </div>
      </header>

      <section className="container grid gap-12 py-16 sm:py-24 md:grid-cols-2 md:items-center">
        <div>
          <p className="eyebrow text-[#000000]">A little about us</p>
          <h1 className="mt-5 font-serif text-5xl leading-tight tracking-tight sm:text-6xl">
            Find pieces that feel like <em className="text-[#555555]">you.</em>
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-8 text-[#666666]">
            LOVEATFIRSTSIGHT FINDS is about discovering clothing that
            expresses your personality and makes everyday style feel special.
            Explore our selection of hoodies, shirts and T-shirts to find
            pieces that suit your look.
          </p>
          <Link href="/shop" className="primary-button mt-8">
            Explore the shop <ArrowRight size={16} />
          </Link>
        </div>

        <div className="flex min-h-80 flex-col items-center justify-center bg-[#F5F5F5] p-8 text-center sm:min-h-96">
          <Heart size={36} strokeWidth={1.2} className="text-[#000000]" />
          <p className="mt-6 font-serif text-3xl italic text-[#000000] sm:text-4xl">
            Love at first find.
          </p>
          <p className="mt-4 max-w-sm text-sm leading-7 text-[#666666]">
            Personal style, everyday comfort, and finds worth falling for.
          </p>
        </div>
      </section>

      <section className="border-y border-[#E5E5E5] bg-white py-12">
        <div className="container grid gap-8 sm:grid-cols-3">
          {[
            ["Hoodies", "Comfortable layers for everyday style."],
            ["Shirts", "Classic pieces to make your look your own."],
            ["T-shirts", "Easy essentials for everyday outfits."],
          ].map(([title, description]) => (
            <div key={title}>
              <h2 className="font-serif text-2xl text-[#000000]">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-[#666666]">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="container flex flex-col gap-4 py-12 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3 text-sm leading-6 text-[#666666]">
          <MapPin size={18} className="mt-1 shrink-0 text-[#000000]" />
          <p>
            Pickup point
            <br />
            Dynamic Mall, Shop ML32, Ground Floor
          </p>
        </div>
        <Link href="/contact" className="outline-button w-fit">
          Get in touch <ArrowRight size={15} />
        </Link>
      </section>
    </main>
  );
}
