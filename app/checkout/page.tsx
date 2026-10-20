"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  LoaderCircle,
  MapPin,
  MessageCircle,
  ShoppingBag,
} from "lucide-react";
import {
  clearCart,
  getCart,
  type CartItem,
} from "@/lib/cart";

const PICKUP_ADDRESS = "Dynamic Mall, Shop ML32, Ground Floor";

function money(amount: number) {
  return `KSh ${amount.toLocaleString("en-KE")}`;
}

type OrderResponse = {
  success?: boolean;
  orderId?: string;
  totalAmount?: number;
  whatsappUrl?: string;
  error?: string;
};

export default function CheckoutPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [fulfilmentMethod, setFulfilmentMethod] = useState<
    "pickup" | "delivery"
  >("pickup");
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [notes, setNotes] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [order, setOrder] = useState<OrderResponse | null>(null);

  useEffect(() => {
    setItems(getCart());
    setReady(true);
  }, []);

  const subtotal = useMemo(
    () =>
      items.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      ),
    [items],
  );

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setError("");

    if (items.length === 0) {
      setError("Your shopping bag is empty. Please add a product first.");
      return;
    }

    if (
      fulfilmentMethod === "delivery" &&
      deliveryLocation.trim().length < 3
    ) {
      setError("Please enter your delivery location.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName: customerName.trim(),
          customerPhone: customerPhone.trim(),
          fulfilmentMethod,
          deliveryLocation:
            fulfilmentMethod === "delivery"
              ? deliveryLocation.trim()
              : "",
          notes: notes.trim(),
          items: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        }),
      });

      const result = (await response.json()) as OrderResponse;

      if (!response.ok || !result.success || !result.orderId) {
        throw new Error(
          result.error ||
            "We couldn't submit your order. Please try again.",
        );
      }

      setOrder(result);
      clearCart();
      setItems([]);
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#FAF7F4] text-[#252124]">
      <header className="border-b border-[#E8DFDE] bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#702B40] hover:underline"
          >
            <ArrowLeft size={17} />
            Shopping bag
          </Link>

          <Link
            href="/"
            className="font-serif text-base font-semibold tracking-wide text-[#702B40] sm:text-xl"
          >
            LOVEATFIRSTSIGHT FINDS
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
        {order ? (
          <section className="mx-auto max-w-2xl border border-[#E8DFDE] bg-white px-6 py-10 text-center sm:px-12 sm:py-14">
            <CheckCircle2
              size={54}
              strokeWidth={1.4}
              className="mx-auto text-green-700"
            />

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#702B40]">
              Order received
            </p>

            <h1 className="mt-3 font-serif text-3xl sm:text-4xl">
              Thank you for your order!
            </h1>

            <p className="mt-4 text-sm leading-7 text-gray-600">
              Your order has been saved. Contact us on WhatsApp to
              confirm availability and arrange collection or delivery.
            </p>

            <div className="mt-8 border border-[#E8DFDE] bg-[#FAF7F4] p-5 text-left">
              <p className="text-sm text-gray-500">Order reference</p>
              <p className="mt-1 break-all font-semibold">
                {order.orderId}
              </p>

              <div className="mt-4 flex items-center justify-between gap-4 border-t border-[#E8DFDE] pt-4">
                <span className="text-sm text-gray-600">
                  Order total
                </span>
                <span className="text-lg font-semibold">
                  {money(Number(order.totalAmount ?? 0))}
                </span>
              </div>
            </div>

            {order.whatsappUrl && (
              <a
                href={order.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#702B40] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#512033]"
              >
                <MessageCircle size={20} />
                Send order via WhatsApp
              </a>
            )}

            <p className="mt-4 text-xs leading-6 text-gray-500">
              No online payment has been made. Confirm payment and
              delivery arrangements directly with the store.
            </p>

            <Link
              href="/shop"
              className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-[#702B40] hover:underline"
            >
              Continue shopping
              <ArrowRight size={16} />
            </Link>
          </section>
        ) : (
          <>
            <div className="mb-9">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#702B40]">
                Almost yours
              </p>

              <h1 className="mt-2 font-serif text-4xl sm:text-5xl">
                Checkout
              </h1>

              <p className="mt-3 text-sm text-gray-500">
                Enter your details so we can prepare your order.
              </p>
            </div>

            {!ready ? (
              <div className="border border-[#E8DFDE] bg-white p-10 text-center">
                Loading your order...
              </div>
            ) : items.length === 0 ? (
              <div className="border border-[#E8DFDE] bg-white px-6 py-14 text-center">
                <ShoppingBag
                  size={42}
                  strokeWidth={1.2}
                  className="mx-auto text-[#702B40]"
                />

                <h2 className="mt-5 font-serif text-2xl">
                  Your shopping bag is empty
                </h2>

                <p className="mt-3 text-sm text-gray-500">
                  Add some finds to your bag before checking out.
                </p>

                <Link
                  href="/shop"
                  className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#702B40] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[#512033]"
                >
                  Explore the collection
                  <ArrowRight size={17} />
                </Link>
              </div>
            ) : (
              <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_350px]">
                <form
                  onSubmit={handleSubmit}
                  className="space-y-7 border border-[#E8DFDE] bg-white p-5 sm:p-8"
                >
                  <section>
                    <h2 className="font-serif text-2xl">
                      Your details
                    </h2>

                    <div className="mt-6 space-y-5">
                      <div>
                        <label
                          htmlFor="customerName"
                          className="mb-2 block text-sm font-medium"
                        >
                          Full name *
                        </label>

                        <input
                          id="customerName"
                          name="customerName"
                          type="text"
                          autoComplete="name"
                          required
                          minLength={2}
                          maxLength={120}
                          value={customerName}
                          onChange={(event) =>
                            setCustomerName(event.target.value)
                          }
                          placeholder="Enter your full name"
                          className="w-full border border-[#E8DFDE] bg-white px-4 py-3.5 text-sm outline-none transition focus:border-[#702B40]"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="customerPhone"
                          className="mb-2 block text-sm font-medium"
                        >
                          Phone number *
                        </label>

                        <input
                          id="customerPhone"
                          name="customerPhone"
                          type="tel"
                          autoComplete="tel"
                          inputMode="tel"
                          required
                          maxLength={30}
                          value={customerPhone}
                          onChange={(event) =>
                            setCustomerPhone(event.target.value)
                          }
                          placeholder="e.g. 0712345678"
                          className="w-full border border-[#E8DFDE] bg-white px-4 py-3.5 text-sm outline-none transition focus:border-[#702B40]"
                        />

                        <p className="mt-2 text-xs text-gray-500">
                          Enter a valid Kenyan phone number.
                        </p>
                      </div>
                    </div>
                  </section>

                  <section className="border-t border-[#E8DFDE] pt-7">
                    <h2 className="font-serif text-2xl">
                      Fulfilment method
                    </h2>

                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                      <button
                        type="button"
                        onClick={() => setFulfilmentMethod("pickup")}
                        aria-pressed={fulfilmentMethod === "pickup"}
                        className={`border p-4 text-left transition ${
                          fulfilmentMethod === "pickup"
                            ? "border-[#702B40] bg-[#fbf4f3]"
                            : "border-[#E8DFDE] hover:border-[#bda7a6]"
                        }`}
                      >
                        <MapPin
                          size={21}
                          className="text-[#702B40]"
                        />

                        <span className="mt-3 block text-sm font-semibold">
                          Store pickup
                        </span>

                        <span className="mt-2 block text-xs leading-5 text-gray-500">
                          {PICKUP_ADDRESS}
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setFulfilmentMethod("delivery")}
                        aria-pressed={fulfilmentMethod === "delivery"}
                        className={`border p-4 text-left transition ${
                          fulfilmentMethod === "delivery"
                            ? "border-[#702B40] bg-[#fbf4f3]"
                            : "border-[#E8DFDE] hover:border-[#bda7a6]"
                        }`}
                      >
                        <ShoppingBag
                          size={21}
                          className="text-[#702B40]"
                        />

                        <span className="mt-3 block text-sm font-semibold">
                          Delivery
                        </span>

                        <span className="mt-2 block text-xs leading-5 text-gray-500">
                          Tell us where you would like your order delivered.
                        </span>
                      </button>
                    </div>

                    {fulfilmentMethod === "delivery" && (
                      <div className="mt-5">
                        <label
                          htmlFor="deliveryLocation"
                          className="mb-2 block text-sm font-medium"
                        >
                          Delivery location *
                        </label>

                        <textarea
                          id="deliveryLocation"
                          name="deliveryLocation"
                          required
                          minLength={3}
                          maxLength={500}
                          rows={3}
                          value={deliveryLocation}
                          onChange={(event) =>
                            setDeliveryLocation(event.target.value)
                          }
                          placeholder="Enter your estate, area, town and any helpful directions"
                          className="w-full resize-y border border-[#E8DFDE] px-4 py-3.5 text-sm outline-none transition focus:border-[#702B40]"
                        />

                        <p className="mt-2 text-xs leading-5 text-gray-500">
                          Delivery fees and availability will be confirmed
                          before fulfilment.
                        </p>
                      </div>
                    )}
                  </section>

                  <section className="border-t border-[#E8DFDE] pt-7">
                    <label
                      htmlFor="notes"
                      className="block font-serif text-2xl"
                    >
                      Additional notes
                    </label>

                    <p className="mt-2 text-xs text-gray-500">
                      Optional: include any special requests about your order.
                    </p>

                    <textarea
                      id="notes"
                      name="notes"
                      rows={3}
                      maxLength={1000}
                      value={notes}
                      onChange={(event) => setNotes(event.target.value)}
                      placeholder="Anything we should know?"
                      className="mt-4 w-full resize-y border border-[#E8DFDE] px-4 py-3.5 text-sm outline-none transition focus:border-[#702B40]"
                    />
                  </section>

                  {error && (
                    <div
                      role="alert"
                      className="border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-800"
                    >
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting || items.length === 0}
                    className="flex w-full items-center justify-center gap-3 rounded-full bg-[#702B40] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#512033] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitting ? (
                      <>
                        <LoaderCircle
                          size={19}
                          className="animate-spin"
                        />
                        Submitting your order...
                      </>
                    ) : (
                      <>
                        Place order
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs leading-5 text-gray-500">
                    No online payment is required. We will confirm your
                    order and fulfilment arrangements with you.
                  </p>
                </form>

                <aside className="border border-[#E8DFDE] bg-white p-5 sm:p-7 lg:sticky lg:top-6">
                  <h2 className="font-serif text-2xl">
                    Order summary
                  </h2>

                  <div className="mt-6 space-y-5">
                    {items.map((item) => (
                      <div
                        key={item.productId}
                        className="flex justify-between gap-4"
                      >
                        <div className="min-w-0">
                          <p className="break-words text-sm font-medium">
                            {item.name}
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            Quantity: {item.quantity}
                          </p>
                        </div>

                        <span className="shrink-0 text-sm font-medium">
                          {money(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 space-y-3 border-t border-[#E8DFDE] pt-5">
                    <div className="flex justify-between gap-4 text-sm">
                      <span className="text-gray-500">Subtotal</span>
                      <span>{money(subtotal)}</span>
                    </div>

                    <div className="flex justify-between gap-4 border-t border-[#E8DFDE] pt-4">
                      <span className="font-semibold">Total</span>
                      <span className="text-lg font-semibold">
                        {money(subtotal)}
                      </span>
                    </div>
                  </div>

                  <p className="mt-4 text-xs leading-5 text-gray-500">
                    Delivery fees, where applicable, are not included
                    and will be confirmed by the store.
                  </p>

                  <Link
                    href="/cart"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#702B40] hover:underline"
                  >
                    <ArrowLeft size={15} />
                    Edit shopping bag
                  </Link>
                </aside>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
