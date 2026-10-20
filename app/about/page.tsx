import Link from "next/link";
import { ArrowRight, Heart, MapPin } from "lucide-react";

export const metadata = {
  title: "Our Story",
  description:
    "Discover the story and style behind LOVEATFIRSTSIGHT FINDS.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#FAF7F4] text-[#252124]">
      <header className="border-b border-[#E8DFDE] bg-white">
        <div className="container flex min-h-20 items-center justify-between gap-4">
          <Link href="/" className="font-serif text-sm font-semibold sm:text-base">
            LOVEATFIRSTSIGHT <span className="text-[#702B40]">FINDS</span>
          </Link>
          <Link href="/shop" className="text-sm text-[#702B40] hover:underline">
            Shop collection
          </Link>
        </div>
      </header>

      <section className="container grid gap-12 py-16 sm:py-24 md:grid-cols-2 md:items-center">
        <div>
          <p className="eyebrow text-[#702B40]">A little about us</p>
          <h1 className="mt-5 font-serif text-5xl leading-tight tracking-tight sm:text-6xl">
            Find pieces that feel like <em className="text-[#B77D8C]">you.</em>
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-8 text-[#76696A]">
            LOVEATFIRSTSIGHT FINDS is about discovering clothing that
            expresses your personality and makes everyday style feel special.
            Explore our selection of hoodies, shirts and T-shirts to find
            pieces that suit your look.
          </p>
          <Link href="/shop" className="primary-button mt-8">
            Explore the shop <ArrowRight size={16} />
          </Link>
        </div>

        <div className="flex min-h-80 flex-col items-center justify-center bg-[#F4E7E8] p-8 text-center sm:min-h-96">
          <Heart size={36} strokeWidth={1.2} className="text-[#702B40]" />
          <p className="mt-6 font-serif text-3xl italic text-[#702B40] sm:text-4xl">
            Love at first find.
          </p>
          <p className="mt-4 max-w-sm text-sm leading-7 text-[#76696A]">
            Personal style, everyday comfort, and finds worth falling for.
          </p>
        </div>
      </section>

      <section className="border-y border-[#E8DFDE] bg-white py-12">
        <div className="container grid gap-8 sm:grid-cols-3">
          {[
            ["Hoodies", "Comfortable layers for everyday style."],
            ["Shirts", "Classic pieces to make your look your own."],
            ["T-shirts", "Easy essentials for everyday outfits."],
          ].map(([title, description]) => (
            <div key={title}>
              <h2 className="font-serif text-2xl text-[#702B40]">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-[#76696A]">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="container flex flex-col gap-4 py-12 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3 text-sm leading-6 text-[#76696A]">
          <MapPin size={18} className="mt-1 shrink-0 text-[#702B40]" />
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
