import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    redirect("/admin/login");
  }

  return (
    <main className="min-h-screen bg-[#FFFFFF] px-5 py-10 text-[#000000] sm:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E5E5E5] pb-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#000000]">
              LOVEATFIRSTSIGHT FINDS
            </p>
            <h1 className="mt-2 font-serif text-3xl sm:text-4xl">
              Admin dashboard
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Manage your store, products and customer orders.
            </p>
          </div>

          <form action="/api/admin/logout" method="POST">
            <button
              type="submit"
              className="border border-[#000000] px-5 py-2.5 text-sm font-semibold text-[#000000] transition hover:bg-[#000000] hover:text-white"
            >
              Sign out
            </button>
          </form>
        </header>

        <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <a
            href="#products"
            className="border border-[#E5E5E5] bg-white p-6 transition hover:border-[#000000]"
          >
            <span className="text-sm text-gray-500">Store management</span>
            <h2 className="mt-3 font-serif text-2xl">Products</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Add clothing, manage prices, update product details and control stock.
            </p>
            <span className="mt-5 inline-block text-sm font-semibold text-[#000000]">
              Manage products →
            </span>
          </a>

          <a
            href="#orders"
            className="border border-[#E5E5E5] bg-white p-6 transition hover:border-[#000000]"
          >
            <span className="text-sm text-gray-500">Customer activity</span>
            <h2 className="mt-3 font-serif text-2xl">Orders</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Review customer orders and track their progress.
            </p>
            <span className="mt-5 inline-block text-sm font-semibold text-[#000000]">
              View orders →
            </span>
          </a>

          <a
            href="/shop"
            target="_blank"
            rel="noreferrer"
            className="border border-[#E5E5E5] bg-white p-6 transition hover:border-[#000000]"
          >
            <span className="text-sm text-gray-500">Customer experience</span>
            <h2 className="mt-3 font-serif text-2xl">View store</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Open the public shop and see how customers view your products.
            </p>
            <span className="mt-5 inline-block text-sm font-semibold text-[#000000]">
              Visit shop →
            </span>
          </a>
        </section>

        <section
          id="products"
          className="mt-10 border border-[#E5E5E5] bg-white p-6 sm:p-8"
        >
          <h2 className="font-serif text-2xl">Product management</h2>
          <p className="mt-3 text-sm leading-6 text-gray-600">
            The dashboard layout is ready. Next, we will connect this section to
            your Neon database so you can add products, upload images, edit
            prices and update availability.
          </p>
        </section>

        <section
          id="orders"
          className="mt-6 border border-[#E5E5E5] bg-white p-6 sm:p-8"
        >
          <h2 className="font-serif text-2xl">Customer orders</h2>
          <p className="mt-3 text-sm leading-6 text-gray-600">
            We will connect this section to your orders database in the next step.
          </p>
        </section>

        <footer className="mt-10 text-center text-xs text-gray-500">
          LOVEATFIRSTSIGHT FINDS · Store administration
        </footer>
      </div>
    </main>
  );
}