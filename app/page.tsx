import Image from "next/image";
import Link from "next/link";
import {
ArrowRight,
ArrowUpRight,
Heart,
MapPin,
MessageCircle,
ShoppingBag,
Sparkles,
} from "lucide-react";
import { FaInstagram } from "react-icons/fa";

const WHATSAPP_URL = "https://wa.me/254794625388";
const INSTAGRAM_URL = "https://www.instagram.com/loveatfirstsight_finds/";
const TIKTOK_URL =
"https://www.tiktok.com/@loveatfirstsight_finds?_r=1&_t=ZS-9AepJ8cvitx";

const categories = [
  {
    number: "01",
    name: "Hoodies",
    description: "Comfortable layers for your everyday style.",
    href: "/shop?category=Hoodies",
    tone: "category-rose",
    symbol: "01 / COMFORT",
  },
  {
    number: "02",
    name: "Shirts",
    description: "Classic pieces that make your style stand out.",
    href: "/shop?category=Shirts",
    tone: "category-sand",
    symbol: "02 / CLASSIC",
  },
  {
    number: "03",
    name: "T-shirts",
    description: "Everyday essentials made for your look.",
    href: "/shop?category=T-shirts",
    tone: "category-plum",
    symbol: "03 / EVERYDAY",
  },
];

const collections = [
{
number: "01",
title: "The everyday edit",
subtitle: "Your wardrobe, refreshed.",
href: "/shop?category=everyday",
},
{
number: "02",
title: "The statement edit",
subtitle: "Made to be remembered.",
href: "/shop?category=statement",
},
{
number: "03",
title: "The special edit",
subtitle: "Find something unexpected.",
href: "/offers",
},
];

function BrandMark({ light = false }: { light?: boolean }) {
return ( <Link
   href="/"
   aria-label="LOVEATFIRSTSIGHT FINDS home"
   className="flex w-fit items-center gap-3"
 > <span className="relative block h-12 w-12 shrink-0 overflow-hidden rounded-full bg-white"> <Image
       src="/images/logo.png"
       alt="LOVEATFIRSTSIGHT FINDS logo"
       fill
       sizes="48px"
       className="object-contain"
     /> </span>


  <span className="flex flex-col">
    <span
      className={`font-serif text-[12px] font-semibold tracking-[-0.035em] sm:text-sm ${
        light ? "text-white" : "text-[#241b1d]"
      }`}
    >
      LOVEATFIRSTSIGHT
    </span>

    <span
      className={`mt-1 text-[9px] font-medium uppercase tracking-[0.35em] ${
        light ? "text-[#dfbfc5]" : "text-[#672c3b]"
      }`}
    >
      FINDS
    </span>
  </span>
</Link>


);
}

function SocialLinks({ light = false }: { light?: boolean }) {
const className = `flex h-10 w-10 items-center justify-center rounded-full border transition ${
    light
      ? "border-white/20 text-white hover:border-white hover:bg-white/10"
      : "border-[#e9dfdc] text-[#672c3b] hover:border-[#672c3b]"
  }`;

return ( <div className="flex items-center gap-2"> <a
     href={INSTAGRAM_URL}
     target="_blank"
     rel="noreferrer"
     aria-label="Instagram"
     className={className}
   > <FaInstagram size={17} /> </a>


  <a
    href={TIKTOK_URL}
    target="_blank"
    rel="noreferrer"
    aria-label="TikTok"
    className={className}
  >
    <svg
      viewBox="0 0 24 24"
      width="17"
      height="17"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.55v13.67a2.9 2.9 0 0 1-2.9 2.9 2.9 2.9 0 1 1 2.9-2.9c0-.23-.03-.46-.08-.68V11.4a6.45 6.45 0 0 0-2.82-.65A6.25 6.25 0 1 0 15.82 17V9.6a8.3 8.3 0 0 0 4.86 1.57V7.63a4.8 4.8 0 0 1-1.09-.94Z" />
    </svg>
  </a>
</div>


);
}

export default function Home() {
return ( <main className="overflow-hidden"> <div className="bg-[#672c3b] px-4 py-2.5 text-center text-[9px] font-semibold uppercase tracking-[0.16em] text-white sm:text-[10px] sm:tracking-[0.23em]">
A little something special is waiting for you <span className="mx-2 text-[#e7c6cb]">✳</span>
Discover your next favourite find </div>


  <header
    id="top"
    className="relative z-20 border-b border-[#e9dfdc] bg-[#fbf8f5]"
  >
    <div className="container flex min-h-[78px] items-center justify-between gap-4 sm:min-h-[92px]">
      <BrandMark />

      <nav
        aria-label="Main navigation"
        className="hidden items-center gap-7 lg:flex"
      >
        <Link className="nav-link" href="/">
          Home
        </Link>
        <Link className="nav-link" href="/shop">
          Shop
        </Link>
        <Link className="nav-link" href="/offers">
          Offers
        </Link>
        <Link className="nav-link" href="/about">
          Our Story
        </Link>
        <Link className="nav-link" href="/contact">
          Contact
        </Link>
      </nav>

      <div className="flex items-center gap-2 sm:gap-3">
        <Link
          href="/cart"
          aria-label="View shopping bag"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e9dfdc] transition hover:border-[#672c3b]"
        >
          <ShoppingBag size={18} strokeWidth={1.6} />
        </Link>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          className="hidden min-h-11 items-center gap-2 bg-[#672c3b] px-5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-[#47202b] sm:flex"
        >
          <MessageCircle size={15} />
          Let's talk
        </a>

        <details className="relative lg:hidden">
          <summary
            aria-label="Open navigation menu"
            className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-full border border-[#e9dfdc] text-xl"
          >
            ☰
          </summary>

          <nav className="absolute right-0 top-12 z-50 flex w-52 flex-col border border-[#e9dfdc] bg-[#fbf8f5] p-2 shadow-xl">
            {[
              ["Home", "/"],
              ["Shop", "/shop"],
              ["Offers", "/offers"],
              ["Our Story", "/about"],
              ["Contact", "/contact"],
              ["Shopping Bag", "/cart"],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="border-b border-[#e9dfdc] px-4 py-3 text-xs last:border-0 hover:text-[#672c3b]"
              >
                {label}
              </Link>
            ))}

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="m-2 bg-[#672c3b] px-3 py-3 text-center text-xs text-white"
            >
              Chat on WhatsApp
            </a>
          </nav>
        </details>
      </div>
    </div>
  </header>

  <section className="container grid min-h-[590px] items-center gap-10 py-14 md:min-h-[650px] md:grid-cols-[1.02fr_0.98fr] md:gap-12 md:py-16 lg:gap-20">
    <div className="relative z-10 py-3 md:py-10">
      <div className="mb-7 flex items-center gap-3">
        <span className="h-px w-9 bg-[#672c3b]" />
        <p className="eyebrow text-[#672c3b]">Your style, your story</p>
      </div>

      <h1 className="max-w-[620px] font-serif text-[clamp(48px,8vw,88px)] font-normal leading-[0.99] tracking-[-0.065em] text-[#241b1d]">
        Some things
        <br />
        just feel like
        <br />
        <span className="italic text-[#8c5362]">you.</span>
      </h1>

      <p className="mt-7 max-w-[410px] text-sm leading-7 text-[#76696a] sm:text-base sm:leading-8">
        Discover pieces that speak to your style, express your personality,
        and make getting dressed feel a little more special.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Link href="/shop" className="primary-button">
          Explore the finds
          <ArrowRight size={15} />
        </Link>

        <Link href="/about" className="outline-button">
          Our story
        </Link>
      </div>

      <div className="mt-12 flex items-center gap-4 border-t border-[#e9dfdc] pt-6">
        <div className="flex -space-x-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#fbf8f5] bg-[#e7d0cf] font-serif text-sm text-[#672c3b]">
            L
          </span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#fbf8f5] bg-[#dfc5b4] font-serif text-sm text-[#672c3b]">
            F
          </span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#fbf8f5] bg-[#d9d2df] font-serif text-sm text-[#672c3b]">
            ♡
          </span>
        </div>

        <div>
          <p className="text-xs font-semibold text-[#241b1d]">
            Find what feels right
          </p>
          <p className="mt-1 text-[11px] text-[#76696a]">
            Your next favourite piece starts here.
          </p>
        </div>
      </div>
    </div>

    <div className="relative mx-auto w-full max-w-[560px]">
      <div className="absolute -right-3 -top-3 h-24 w-24 border border-[#d8b8bd] sm:-right-5 sm:-top-5 sm:h-32 sm:w-32" />

      <div className="relative grid min-h-[390px] grid-cols-[1fr_0.78fr] gap-3 sm:min-h-[490px] sm:gap-4">
        <div className="relative flex min-h-[350px] flex-col items-center justify-center overflow-hidden bg-[#eadbd7] px-4 text-center sm:min-h-[450px]">
          <span className="absolute left-4 top-4 text-[9px] font-semibold tracking-[0.2em] text-[#672c3b]">
            THE LOVE EDIT
          </span>

          <div className="relative mb-6 h-40 w-40 sm:h-52 sm:w-52">
            <Image
              src="/images/logo.png"
              alt="LOVEATFIRSTSIGHT FINDS"
              fill
              sizes="(max-width: 640px) 160px, 208px"
              className="object-contain mix-blend-multiply"
              priority
            />
          </div>

          <p className="max-w-[190px] font-serif text-2xl leading-tight tracking-[-0.04em] text-[#47202b] sm:text-3xl">
            Fall in love
            <br />
            with your finds.
          </p>

          <span className="mt-4 text-[9px] uppercase tracking-[0.23em] text-[#672c3b]">
            Style with feeling
          </span>
        </div>

        <div className="flex flex-col gap-3 sm:gap-4">
          <div className="flex flex-1 flex-col items-center justify-center bg-[#e7e1e5] px-3 text-center">
            <Sparkles
              size={30}
              strokeWidth={1.1}
              className="text-[#672c3b]"
            />

            <p className="mt-5 font-serif text-2xl italic text-[#47202b] sm:text-3xl">
              Your kind
              <br />
              of beautiful.
            </p>

            <span className="mt-3 text-[8px] uppercase tracking-[0.17em] text-[#76696a]">
              Made for your mood
            </span>
          </div>

          <div className="flex min-h-[125px] flex-col justify-center bg-[#672c3b] p-5 text-white sm:min-h-[165px] sm:p-7">
            <Heart size={19} strokeWidth={1.3} />

            <p className="mt-4 font-serif text-xl italic sm:text-2xl">
              Love at first find.
            </p>

            <Link
              href="/shop"
              className="mt-3 flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#f0dce0]"
            >
              Discover more <ArrowUpRight size={13} />
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-4 -left-3 flex items-center gap-2 bg-[#fbf8f5] px-4 py-3 shadow-sm sm:-left-6">
        <Sparkles size={14} className="text-[#672c3b]" />
        <span className="text-[9px] font-semibold uppercase tracking-[0.13em]">
          Curated with love
        </span>
      </div>
    </div>
  </section>

  <div className="border-y border-[#e9dfdc] bg-white/60">
    <div className="container grid grid-cols-2 gap-x-5 gap-y-5 py-7 sm:grid-cols-4 sm:py-8">
      {[
        ["01", "Find your style"],
        ["02", "Discover new looks"],
        ["03", "Shop with ease"],
        ["04", "Made personal"],
      ].map(([number, label]) => (
        <div key={number} className="flex items-center gap-3">
          <span className="font-serif text-xl italic text-[#b68a92]">
            {number}
          </span>
          <span className="text-[9px] font-semibold uppercase tracking-[0.11em] text-[#4d4142] sm:text-[10px]">
            {label}
          </span>
        </div>
      ))}
    </div>
  </div>

  <section className="container py-20 sm:py-28">
    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
      <div>
        <p className="section-label">A little inspiration</p>
        <h2 className="section-title">
          Find your kind
          <br className="sm:hidden" /> of style.
        </h2>
      </div>

      <p className="max-w-[340px] text-sm leading-7 text-[#76696a]">
        Every style tells a story. Start exploring and discover the pieces
        that feel unmistakably you.
      </p>
    </div>

    <div className="mt-10 grid gap-4 md:grid-cols-3">
      {categories.map((category) => (
        <Link
          key={category.number}
          href={category.href}
          className={`category-card group relative flex min-h-[260px] flex-col justify-between overflow-hidden p-6 sm:min-h-[315px] sm:p-8 ${category.tone}`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-semibold tracking-[0.15em]">
              {category.symbol}
            </span>

            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-current/20 transition group-hover:translate-x-1">
              <ArrowUpRight size={17} strokeWidth={1.5} />
            </span>
          </div>

          <div className="category-decoration" aria-hidden="true">
            {category.number}
          </div>

          <div className="relative z-10">
            <h3 className="font-serif text-3xl tracking-[-0.04em] sm:text-4xl">
              {category.name}
            </h3>

            <p className="mt-3 text-xs opacity-75">
              {category.description}
            </p>

            <span className="mt-6 inline-block border-b border-current/40 pb-1 text-[9px] font-semibold uppercase tracking-[0.16em]">
              Explore category
            </span>
          </div>
        </Link>
      ))}
    </div>
  </section>

  <section className="bg-[#f0e7e4] py-20 sm:py-24">
    <div className="container">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="section-label">The inspiration board</p>
          <h2 className="section-title">
            A few ways to find
            <br />
            your next favourite.
          </h2>
        </div>

        <Link href="/shop" className="outline-button w-fit">
          Browse the shop <ArrowRight size={15} />
        </Link>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {collections.map((collection, index) => (
          <Link
            href={collection.href}
            key={collection.number}
            className={`collection-card collection-${index + 1} group flex min-h-[230px] flex-col justify-between p-6 sm:min-h-[270px] sm:p-8`}
          >
            <span className="text-[10px] font-semibold tracking-[0.18em]">
              EDIT {collection.number}
            </span>

            <div>
              <h3 className="font-serif text-2xl tracking-[-0.04em] sm:text-3xl">
                {collection.title}
              </h3>

              <p className="mt-2 text-xs opacity-75">
                {collection.subtitle}
              </p>

              <span className="mt-5 inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.15em]">
                Explore edit
                <ArrowRight
                  size={14}
                  className="transition group-hover:translate-x-1"
                />
              </span>
            </div>
          </Link>
        ))}
      </div>

      <p className="mt-5 text-center text-[10px] leading-5 text-[#76696a]">
        Browse our collections to discover available products and current
        prices.
      </p>
    </div>
  </section>

  <section className="container py-20 sm:py-28">
    <div className="grid gap-10 md:grid-cols-[0.85fr_1.15fr] md:items-center md:gap-20">
      <div className="relative mx-auto flex min-h-[330px] w-full max-w-[420px] items-center justify-center overflow-hidden bg-[#e7d9d8] p-8 sm:min-h-[420px]">
        <div className="absolute left-5 top-5 h-14 w-14 border-l border-t border-[#9f727b]" />
        <div className="absolute bottom-5 right-5 h-14 w-14 border-b border-r border-[#9f727b]" />

        <div className="relative h-48 w-48 sm:h-60 sm:w-60">
          <Image
            src="/images/logo.png"
            alt="LOVEATFIRSTSIGHT FINDS brand logo"
            fill
            sizes="(max-width: 640px) 192px, 240px"
            className="object-contain mix-blend-multiply"
          />
        </div>

        <span className="absolute bottom-8 text-[9px] font-semibold uppercase tracking-[0.24em] text-[#672c3b]">
          Find something you love
        </span>
      </div>

      <div>
        <p className="section-label">More than a find</p>

        <h2 className="section-title mt-4 max-w-[520px] text-[clamp(36px,5vw,58px)]">
          Your style should feel like <em>yourself.</em>
        </h2>

        <p className="mt-6 max-w-[480px] text-sm leading-8 text-[#76696a]">
          LOVEATFIRSTSIGHT FINDS is about discovering styles that make you
          feel confident, expressive, and comfortable being yourself.
          We're here to help you explore your options and find pieces you
          genuinely love.
        </p>

        <Link href="/about" className="primary-button mt-8">
          Get to know us <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  </section>

  <section className="bg-[#47202b] py-16 text-white sm:py-20">
    <div className="container grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
      <div>
        <p className="eyebrow text-[#dfbfc5]">
          Let's find your next favourite
        </p>

        <h2 className="mt-4 max-w-[650px] font-serif text-4xl font-normal leading-tight tracking-[-0.05em] sm:text-5xl md:text-6xl">
          Something caught your eye?
        </h2>

        <p className="mt-4 max-w-[520px] text-sm leading-7 text-white/70">
          Have a question about a style, availability, pricing, or pickup?
          Get in touch and we'll help you with the details.
        </p>
      </div>

      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noreferrer"
        className="flex min-h-12 w-fit items-center justify-center gap-3 bg-white px-6 text-[10px] font-semibold uppercase tracking-[0.13em] text-[#47202b] transition hover:bg-[#ead9d9]"
      >
        <MessageCircle size={17} />
        Chat on WhatsApp
        <ArrowUpRight size={15} />
      </a>
    </div>
  </section>

  <footer className="bg-[#fbf8f5]">
    <div className="container grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.7fr_1fr] lg:gap-16 lg:py-16">
      <div>
        <BrandMark />

        <p className="mt-5 max-w-[330px] text-xs leading-7 text-[#76696a]">
          A place to discover personal style, explore new finds, and fall
          in love with the little things that make an outfit yours.
        </p>

        <div className="mt-5">
          <SocialLinks />
        </div>
      </div>

      <div>
        <p className="eyebrow text-[#672c3b]">Explore</p>

        <nav className="mt-5 flex flex-col items-start gap-3 text-xs text-[#76696a]">
          <Link className="footer-link" href="/shop">
            Shop all
          </Link>
          <Link className="footer-link" href="/offers">
            Offers
          </Link>
          <Link className="footer-link" href="/about">
            Our story
          </Link>
          <Link className="footer-link" href="/contact">
            Contact us
          </Link>
          <Link className="footer-link" href="/cart">
            Shopping bag
          </Link>
        </nav>
      </div>

      <div>
        <p className="eyebrow text-[#672c3b]">Come say hello</p>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-5 flex items-start gap-3 text-xs leading-6 text-[#76696a] hover:text-[#672c3b]"
        >
          <MessageCircle
            size={16}
            className="mt-1 shrink-0 text-[#672c3b]"
          />
          <span>
            WhatsApp
            <br />
            0794 625 388
          </span>
        </a>

        <div className="mt-4 flex items-start gap-3 text-xs leading-6 text-[#76696a]">
          <MapPin size={16} className="mt-1 shrink-0 text-[#672c3b]" />
          <span>
            Pickup point
            <br />
            Dynamic Mall, Shop ML32
            <br />
            Ground Floor, Nairobi, Kenya
          </span>
        </div>
      </div>
    </div>

    <div className="border-t border-[#e9dfdc]">
      <div className="container flex flex-col gap-3 py-5 text-[10px] text-[#76696a] sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} LOVEATFIRSTSIGHT FINDS. All rights
          reserved.
        </p>

        <p className="flex items-center gap-1">
          Made with <Heart size={11} className="text-[#8c5362]" /> for your
          next favourite find.
        </p>
      </div>
    </div>
  </footer>

  <a
    href={WHATSAPP_URL}
    target="_blank"
    rel="noreferrer"
    aria-label="Chat with LOVEATFIRSTSIGHT FINDS on WhatsApp"
    className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#672c3b] text-white shadow-lg transition hover:scale-105 hover:bg-[#47202b]"
  >
    <MessageCircle size={21} />
  </a>
</main>


);
}
