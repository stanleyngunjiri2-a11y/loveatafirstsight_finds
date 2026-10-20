import Link from "next/link";
import { ArrowUpRight, MapPin, MessageCircle } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/254794625388";
const INSTAGRAM_URL = "https://www.instagram.com/loveatfirstsight_finds/";
const TIKTOK_URL =
  "https://www.tiktok.com/@loveatfirstsight_finds?_r=1&_t=ZS-9AepJ8cvitx";

export const metadata = {
  title: "Contact Us",
  description:
    "Contact LOVEATFIRSTSIGHT FINDS about products, availability, orders, and pickup.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#FFFFFF] text-[#000000]">
      <header className="border-b border-[#E5E5E5] bg-white">
        <div className="container flex min-h-20 items-center justify-between gap-4">
          <Link href="/" className="font-serif text-sm font-semibold sm:text-base">
            LOVEATFIRSTSIGHT <span className="text-[#000000]">FINDS</span>
          </Link>
          <Link href="/shop" className="text-sm text-[#000000] hover:underline">
            Continue shopping
          </Link>
        </div>
      </header>

      <section className="container py-14 sm:py-20">
        <p className="eyebrow text-[#000000]">We'd love to hear from you</p>
        <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-tight tracking-tight sm:text-6xl">
          Let's find what you're looking for.
        </h1>
        <p className="mt-5 max-w-2xl text-sm leading-7 text-[#666666]">
          Have a question about a product, pricing, availability, or pickup?
          Contact us through one of the channels below and we'll help you with
          the details.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="border border-[#E5E5E5] bg-white p-7 transition hover:border-[#D9D9D9] hover:shadow-lg"
          >
            <MessageCircle size={24} className="text-[#000000]" />
            <h2 className="mt-5 font-serif text-2xl">WhatsApp</h2>
            <p className="mt-2 text-sm text-[#666666]">0794 625 388</p>
            <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#000000]">
              Start a conversation <ArrowUpRight size={14} />
            </span>
          </a>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="border border-[#E5E5E5] bg-white p-7 transition hover:border-[#D9D9D9] hover:shadow-lg"
          >
            <span aria-hidden="true" className="text-2xl font-semibold text-[#000000]">◎</span>
            <h2 className="mt-5 font-serif text-2xl">Instagram</h2>
            <p className="mt-2 text-sm text-[#666666]">@loveatfirstsight_finds</p>
            <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#000000]">
              Visit Instagram <ArrowUpRight size={14} />
            </span>
          </a>

          <a
            href={TIKTOK_URL}
            target="_blank"
            rel="noreferrer"
            className="border border-[#E5E5E5] bg-white p-7 transition hover:border-[#D9D9D9] hover:shadow-lg"
          >
            <span className="text-xl font-bold text-[#000000]">♪</span>
            <h2 className="mt-5 font-serif text-2xl">TikTok</h2>
            <p className="mt-2 break-words text-sm text-[#666666]">
              @loveatfirstsight_finds
            </p>
            <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#000000]">
              Visit TikTok <ArrowUpRight size={14} />
            </span>
          </a>
        </div>

        <div className="mt-8 flex items-start gap-4 border border-[#E5E5E5] bg-[#F5F5F5] p-6 sm:p-8">
          <MapPin size={22} className="mt-1 shrink-0 text-[#000000]" />
          <div>
            <h2 className="font-serif text-2xl">Pickup location</h2>
            <p className="mt-2 text-sm leading-6 text-[#666666]">
              Dynamic Mall, Shop ML32, Ground Floor.
            </p>
            <p className="mt-2 text-sm leading-6 text-[#666666]">
              Contact us before visiting to confirm arrangements for your order.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
