"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import {
  getCart,
  removeFromCart,
  updateCartQuantity,
  type CartItem,
} from "@/lib/cart";

function money(amount: number) {
  return `KSh ${amount.toLocaleString("en-KE")}`;
}

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  const refreshCart = useCallback(() => {
    setItems(getCart());
  }, []);

  useEffect(() => {
    refreshCart();
    setReady(true);

    window.addEventListener("cart-updated", refreshCart);
    window.addEventListener("storage", refreshCart);

    return () => {
      window.removeEventListener("cart-updated", refreshCart);
      window.removeEventListener("storage", refreshCart);
    };
  }, [refreshCart]);

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  function changeQuantity(item: CartItem, quantity: number) {
    if (quantity < 1) {
      removeFromCart(item.productId);
    } else {
      updateCartQuantity(item.productId, quantity);
    }

    refreshCart();
  }

  function removeItem(productId: string) {
    removeFromCart(productId);
    refreshCart();
  }

  return (
    <main className="min-h-screen bg-[#FAF7F4] text-[#252124]">
      <header className="border-b border-[#E8DFDE] bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
          <Link
            href="/shop"
            className="flex items-center gap-2 text-sm font-medium transition hover:text-[#702B40]"
          >
            <ArrowLeft size={17} />
            Continue shopping
          </Link>

          <Link
            href="/"
            className="font-serif text-lg font-semibold tracking-wide text-[#702B40] sm:text-xl"
          >
            LOVEATFIRSTSIGHT FINDS
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#702B40]">
            Your selection
          </p>

          <h1 className="mt-2 font-serif text-4xl sm:text-5xl">
            Shopping bag
          </h1>

          <p className="mt-3 text-sm text-gray-500">
            Review your finds before proceeding to checkout.
          </p>
        </div>

        {!ready ? (
          <div className="border border-[#E8DFDE] bg-white p-10 text-center">
            Loading your shopping bag...
          </div>
        ) : items.length === 0 ? (
          <div className="border border-[#E8DFDE] bg-white px-6 py-16 text-center sm:py-20">
            <ShoppingBag
              size={42}
              strokeWidth={1.2}
              className="mx-auto text-[#702B40]"
            />

            <h2 className="mt-5 font-serif text-2xl">
              Your bag is waiting
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
              You haven&apos;t added anything yet. Explore our collection and
              find something you love.
            </p>

            <Link
              href="/shop"
              className="mt-7 inline-flex items-center justify-center gap-2 bg-[#702B40] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#512033]"
            >
              Explore the collection
              <ArrowRight size={17} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
            <section className="space-y-4">
              {items.map((item) => (
                <article
                  key={item.productId}
                  className="flex flex-col gap-4 border border-[#E8DFDE] bg-white p-4 sm:flex-row sm:gap-6 sm:p-5"
                >
                  <Link
                    href={`/shop/${item.slug}`}
                    className="block shrink-0"
                  >
                    {item.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="h-52 w-full object-cover sm:h-36 sm:w-32"
                      />
                    ) : (
                      <div className="flex h-52 w-full items-center justify-center bg-[#FAF7F4] sm:h-36 sm:w-32">
                        <ShoppingBag
                          size={30}
                          strokeWidth={1.2}
                          className="text-[#702B40]"
                        />
                      </div>
                    )}
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col justify-between gap-4">
                    <div>
                      <Link
                        href={`/shop/${item.slug}`}
                        className="font-serif text-xl transition hover:text-[#702B40]"
                      >
                        {item.name}
                      </Link>

                      <p className="mt-2 text-sm font-semibold">
                        {money(item.price)}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="inline-flex items-center border border-[#E8DFDE]">
                        <button
                          type="button"
                          aria-label={`Decrease quantity of ${item.name}`}
                          onClick={() =>
                            changeQuantity(item, item.quantity - 1)
                          }
                          className="p-2.5 transition hover:bg-[#FAF7F4]"
                        >
                          <Minus size={15} />
                        </button>

                        <span className="min-w-10 text-center text-sm">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          aria-label={`Increase quantity of ${item.name}`}
                          disabled={item.quantity >= 20}
                          onClick={() =>
                            changeQuantity(item, item.quantity + 1)
                          }
                          className="p-2.5 transition hover:bg-[#FAF7F4] disabled:opacity-40"
                        >
                          <Plus size={15} />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(item.productId)}
                        className="inline-flex items-center gap-1.5 text-sm text-gray-500 transition hover:text-red-700"
                      >
                        <Trash2 size={15} />
                        Remove
                      </button>
                    </div>

                    <p className="text-sm text-gray-500">
                      Item total:{" "}
                      <span className="font-semibold text-[#252124]">
                        {money(item.price * item.quantity)}
                      </span>
                    </p>
                  </div>
                </article>
              ))}

              <Link
                href="/shop"
                className="inline-flex items-center gap-2 py-3 text-sm font-medium text-[#702B40] transition hover:underline"
              >
                <ArrowLeft size={16} />
                Add more finds
              </Link>
            </section>

            <aside className="border border-[#E8DFDE] bg-white p-6 sm:p-7 lg:sticky lg:top-6">
              <h2 className="font-serif text-2xl">Order summary</h2>

              <div className="mt-6 flex justify-between gap-4 text-sm">
                <span className="text-gray-500">
                  Items ({items.reduce((sum, item) => sum + item.quantity, 0)})
                </span>

                <span>{money(subtotal)}</span>
              </div>

              <div className="mt-4 flex justify-between gap-4 border-t border-[#E8DFDE] pt-5">
                <span className="font-semibold">Subtotal</span>
                <span className="text-lg font-semibold">
                  {money(subtotal)}
                </span>
              </div>

              <p className="mt-4 text-xs leading-5 text-gray-500">
                Delivery charges, if applicable, will be confirmed with you
                before fulfilment.
              </p>

              <Link
                href="/checkout"
                className="mt-7 flex w-full items-center justify-center gap-2 bg-[#702B40] px-5 py-4 text-sm font-semibold text-white transition hover:bg-[#512033]"
              >
                Proceed to checkout
                <ArrowRight size={17} />
              </Link>

              <p className="mt-4 text-center text-xs text-gray-400">
                No online payment required.
              </p>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}

