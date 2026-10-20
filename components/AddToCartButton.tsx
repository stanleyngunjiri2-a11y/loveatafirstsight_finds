"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, ShoppingBag, ArrowRight } from "lucide-react";
import { addToCart } from "@/lib/cart";

type AddToCartButtonProps = {
  productId: string;
  name: string;
  slug: string;
  price: number;
  imageUrl: string;
  stockStatus: string;
};

export default function AddToCartButton({
  productId,
  name,
  slug,
  price,
  imageUrl,
  stockStatus,
}: AddToCartButtonProps) {
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    if (stockStatus !== "available") return;

    addToCart({
      productId,
      name,
      slug,
      price,
      imageUrl,
    });

    setAdded(true);

    window.setTimeout(() => {
      setAdded(false);
    }, 2500);
  }

  if (stockStatus !== "available") {
    return (
      <button
        type="button"
        disabled
        className="inline-flex w-full cursor-not-allowed items-center justify-center rounded-full bg-[#E5E5E5] px-7 py-4 text-sm font-medium text-[#666666] sm:w-auto"
      >
        Sold out
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      <button
        type="button"
        onClick={handleAddToCart}
        className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#000000] px-7 py-4 text-sm font-medium text-white transition hover:bg-[#222222] sm:w-auto"
      >
        {added ? <Check size={19} /> : <ShoppingBag size={19} />}
        {added ? "Added to bag!" : "Add to bag"}
      </button>

      <Link
        href="/cart"
        className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#000000] px-7 py-4 text-sm font-medium text-[#000000] transition hover:bg-[#F5F5F5] sm:w-auto"
      >
        View bag
        <ArrowRight size={17} />
      </Link>
    </div>
  );
}
