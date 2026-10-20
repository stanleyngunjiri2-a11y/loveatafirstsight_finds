"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";

type Product = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  category: string;
  price: number | string;
  old_price: number | string | null;
  image_url: string | null;
  stock_status: "available" | "sold";
  created_at?: string;
};

type OrderItem = {
  product_name: string;
  product_url: string;
  unit_price: number | string;
  quantity: number;
  subtotal: number | string;
};

type CustomerOrder = {
  id: string;
  customer_name: string;
  customer_phone: string;
  fulfilment_method: "pickup" | "delivery";
  delivery_location: string | null;
  notes: string | null;
  total_amount: number | string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  created_at: string;
  items: OrderItem[];
};

const categories = ["Hoodies", "Shirts", "T-shirts"];

const money = (amount: number | string | null) =>
  `KSh ${Number(amount ?? 0).toLocaleString("en-KE")}`;

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<CustomerOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [section, setSection] = useState<"products" | "orders">("products");

  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "Hoodies",
    price: "",
    oldPrice: "",
    imageUrl: "",
  });

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const [productsResponse, ordersResponse] = await Promise.all([
        fetch("/api/admin/products", { cache: "no-store" }),
        fetch("/api/admin/orders", { cache: "no-store" }),
      ]);

      if (
        productsResponse.status === 401 ||
        ordersResponse.status === 401
      ) {
        window.location.href = "/admin/login";
        return;
      }

      const productsData = await productsResponse.json();
      const ordersData = await ordersResponse.json();

      if (!productsResponse.ok) {
        throw new Error(productsData.error || "Could not load products.");
      }

      if (!ordersResponse.ok) {
        throw new Error(ordersData.error || "Could not load orders.");
      }

      setProducts(productsData.products || []);
      setOrders(ordersData.orders || []);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not connect to the database.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadDashboard();
  }, [loadDashboard]);

  async function addProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setNotice("");

    try {
      const response = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Could not add product.");
      }

      setForm({
        name: "",
        description: "",
        category: "Hoodies",
        price: "",
        oldPrice: "",
        imageUrl: "",
      });

      setNotice("Product added successfully.");
      setSection("products");
      await loadDashboard();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not add product.");
    } finally {
      setSaving(false);
    }
  }

  async function updateStock(product: Product) {
    setError("");
    setNotice("");

    const stockStatus =
      product.stock_status === "available" ? "sold" : "available";

    try {
      const response = await fetch("/api/admin/products", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: product.id, stockStatus }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Could not update stock.");
      }

      setNotice(`${product.name} marked as ${stockStatus}.`);
      await loadDashboard();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update stock.");
    }
  }

  async function updateOrderStatus(
    orderId: string,
    status: CustomerOrder["status"],
  ) {
    setError("");
    setNotice("");

    try {
      const response = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: orderId, status }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Could not update order.");
      }

      setNotice("Order status updated.");
      await loadDashboard();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update order.");
    }
  }

  async function logout() {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } finally {
      window.location.href = "/admin/login";
    }
  }

  const pendingOrders = orders.filter(
    (order) => order.status === "pending",
  ).length;

  return (
    <main className="min-h-screen bg-[#FFFFFF] text-[#000000]">
      <header className="border-b border-[#E5E5E5] bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#000000]">
              LOVEATFIRSTSIGHT FINDS
            </p>
            <h1 className="mt-1 font-serif text-2xl sm:text-3xl">
              Admin dashboard
            </h1>
          </div>

          <button
            onClick={logout}
            className="border border-[#E5E5E5] px-4 py-2 text-sm font-semibold transition hover:bg-[#FFFFFF]"
          >
            Sign out
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        {error && (
          <div
            role="alert"
            className="mb-5 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        {notice && (
          <div
            role="status"
            className="mb-5 border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800"
          >
            {notice}
          </div>
        )}

        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="border border-[#E5E5E5] bg-white p-5">
            <p className="text-sm text-gray-500">Total products</p>
            <p className="mt-2 text-3xl font-semibold">{products.length}</p>
          </div>

          <div className="border border-[#E5E5E5] bg-white p-5">
            <p className="text-sm text-gray-500">Available products</p>
            <p className="mt-2 text-3xl font-semibold">
              {products.filter((p) => p.stock_status === "available").length}
            </p>
          </div>

          <div className="border border-[#E5E5E5] bg-white p-5">
            <p className="text-sm text-gray-500">Pending orders</p>
            <p className="mt-2 text-3xl font-semibold">{pendingOrders}</p>
          </div>
        </div>

        <nav className="mb-8 flex flex-wrap gap-3">
          <button
            onClick={() => setSection("products")}
            className={`px-5 py-3 text-sm font-semibold ${
              section === "products"
                ? "bg-[#000000] text-white"
                : "border border-[#E5E5E5] bg-white"
            }`}
          >
            Products
          </button>

          <button
            onClick={() => setSection("orders")}
            className={`px-5 py-3 text-sm font-semibold ${
              section === "orders"
                ? "bg-[#000000] text-white"
                : "border border-[#E5E5E5] bg-white"
            }`}
          >
            Customer orders ({orders.length})
          </button>

          <a
            href="/shop"
            target="_blank"
            rel="noreferrer"
            className="border border-[#E5E5E5] bg-white px-5 py-3 text-sm font-semibold"
          >
            View store ↗
          </a>
        </nav>

        {loading ? (
          <div className="bg-white p-10 text-center text-gray-500">
            Loading dashboard...
          </div>
        ) : section === "products" ? (
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
            <section className="min-w-0">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="font-serif text-2xl">Your products</h2>

                <button
                  onClick={() => void loadDashboard()}
                  className="text-sm font-semibold text-[#000000] underline"
                >
                  Refresh
                </button>
              </div>

              {products.length === 0 ? (
                <div className="border border-[#E5E5E5] bg-white p-8 text-center">
                  <p className="font-serif text-xl">No products yet</p>
                  <p className="mt-2 text-sm text-gray-500">
                    Add your first product using the form.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {products.map((product) => (
                    <article
                      key={product.id}
                      className="flex flex-col gap-4 border border-[#E5E5E5] bg-white p-4 sm:flex-row"
                    >
                      {product.image_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="h-36 w-full shrink-0 object-cover sm:w-32"
                        />
                      ) : (
                        <div className="flex h-36 w-full shrink-0 items-center justify-center bg-[#FFFFFF] text-sm text-gray-500 sm:w-32">
                          No image
                        </div>
                      )}

                      <div className="min-w-0 flex-1">
                        <p className="text-xs uppercase tracking-wider text-[#000000]">
                          {product.category}
                        </p>

                        <h3 className="mt-1 break-words font-semibold">
                          {product.name}
                        </h3>

                        <p className="mt-2 font-semibold">
                          {money(product.price)}
                        </p>

                        {product.old_price != null && (
                          <p className="text-sm text-gray-400 line-through">
                            {money(product.old_price)}
                          </p>
                        )}

                        <span
                          className={`mt-2 inline-block text-xs font-semibold ${
                            product.stock_status === "available"
                              ? "text-green-700"
                              : "text-red-700"
                          }`}
                        >
                          {product.stock_status === "available"
                            ? "Available"
                            : "Sold"}
                        </span>

                        <div className="mt-3 flex flex-wrap gap-3">
                          <a
                            href={`/shop/${product.slug}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm font-semibold text-[#000000] underline"
                          >
                            View product
                          </a>

                          <button
                            onClick={() => void updateStock(product)}
                            className="text-sm font-semibold underline"
                          >
                            Mark as{" "}
                            {product.stock_status === "available"
                              ? "sold"
                              : "available"}
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>

            <section className="border border-[#E5E5E5] bg-white p-5 sm:p-6">
              <h2 className="font-serif text-2xl">Add a product</h2>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Add the product details and a publicly accessible image URL.
              </p>

              <form onSubmit={addProduct} className="mt-6 space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1 block text-sm font-medium"
                  >
                    Product name *
                  </label>
                  <input
                    id="name"
                    required
                    maxLength={160}
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    className="w-full border border-[#E5E5E5] px-3 py-3 outline-none focus:border-[#000000]"
                    placeholder="e.g. Oversized Hoodie"
                  />
                </div>

                <div>
                  <label
                    htmlFor="category"
                    className="mb-1 block text-sm font-medium"
                  >
                    Category *
                  </label>
                  <select
                    id="category"
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value })
                    }
                    className="w-full border border-[#E5E5E5] bg-white px-3 py-3"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="price"
                    className="mb-1 block text-sm font-medium"
                  >
                    Selling price (KSh) *
                  </label>
                  <input
                    id="price"
                    type="number"
                    min="1"
                    step="0.01"
                    required
                    value={form.price}
                    onChange={(e) =>
                      setForm({ ...form, price: e.target.value })
                    }
                    className="w-full border border-[#E5E5E5] px-3 py-3"
                    placeholder="1500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="oldPrice"
                    className="mb-1 block text-sm font-medium"
                  >
                    Original price (optional)
                  </label>
                  <input
                    id="oldPrice"
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.oldPrice}
                    onChange={(e) =>
                      setForm({ ...form, oldPrice: e.target.value })
                    }
                    className="w-full border border-[#E5E5E5] px-3 py-3"
                    placeholder="2000"
                  />
                </div>

                <div>
                  <label
                    htmlFor="imageUrl"
                    className="mb-1 block text-sm font-medium"
                  >
                    Product image URL
                  </label>
                  <input
                    id="imageUrl"
                    type="url"
                    value={form.imageUrl}
                    onChange={(e) =>
                      setForm({ ...form, imageUrl: e.target.value })
                    }
                    className="w-full border border-[#E5E5E5] px-3 py-3"
                    placeholder="https://..."
                  />
                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Image upload is not enabled in this form yet.
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="mb-1 block text-sm font-medium"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    className="w-full border border-[#E5E5E5] px-3 py-3"
                    placeholder="Describe the fit, fabric, sizes and other details..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="w-full bg-[#000000] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#222222] disabled:opacity-60"
                >
                  {saving ? "Saving product..." : "Add product"}
                </button>
              </form>
            </section>
          </div>
        ) : (
          <section>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-serif text-2xl">Customer orders</h2>

              <button
                onClick={() => void loadDashboard()}
                className="text-sm font-semibold text-[#000000] underline"
              >
                Refresh orders
              </button>
            </div>

            {orders.length === 0 ? (
              <div className="border border-[#E5E5E5] bg-white p-10 text-center">
                <h3 className="font-serif text-xl">No customer orders yet</h3>
                <p className="mt-2 text-sm text-gray-500">
                  New orders will appear here when checkout is connected.
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                {orders.map((order) => (
                  <article
                    key={order.id}
                    className="border border-[#E5E5E5] bg-white p-5 sm:p-6"
                  >
                    <div className="flex flex-col justify-between gap-4 sm:flex-row">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-[#000000]">
                          Order #{order.id.slice(0, 8)}
                        </p>

                        <h3 className="mt-2 text-lg font-semibold">
                          {order.customer_name}
                        </h3>

                        <a
                          href={`https://wa.me/254${order.customer_phone.replace(/\D/g, "").replace(/^0/, "")}`}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-1 inline-block text-sm text-[#000000] underline"
                        >
                          {order.customer_phone}
                        </a>

                        <p className="mt-2 text-sm text-gray-500">
                          {new Date(order.created_at).toLocaleString("en-KE")}
                        </p>
                      </div>

                      <div>
                        <p className="text-xl font-semibold">
                          {money(order.total_amount)}
                        </p>
                        <span className="mt-2 inline-block text-xs uppercase tracking-wider text-gray-500">
                          {order.fulfilment_method}
                        </span>
                      </div>
                    </div>

                    {order.fulfilment_method === "delivery" &&
                      order.delivery_location && (
                        <p className="mt-3 text-sm">
                          <strong>Delivery location:</strong>{" "}
                          {order.delivery_location}
                        </p>
                      )}

                    {order.notes && (
                      <p className="mt-2 text-sm">
                        <strong>Notes:</strong> {order.notes}
                      </p>
                    )}

                    <div className="my-5 border-t border-[#E5E5E5] pt-4">
                      <h4 className="mb-3 text-sm font-semibold">
                        Items ordered
                      </h4>

                      {(order.items || []).map((item, index) => (
                        <div
                          key={`${order.id}-${index}`}
                          className="flex justify-between gap-4 py-2 text-sm"
                        >
                          <div>
                            <p>{item.product_name}</p>
                            <p className="text-gray-500">
                              {item.quantity} × {money(item.unit_price)}
                            </p>
                          </div>
                          <p className="shrink-0 font-medium">
                            {money(item.subtotal)}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col gap-3 border-t border-[#E5E5E5] pt-4 sm:flex-row sm:items-center sm:justify-between">
                      <span
                        className={`text-sm font-semibold uppercase ${
                          order.status === "completed"
                            ? "text-green-700"
                            : order.status === "cancelled"
                              ? "text-red-700"
                              : "text-[#000000]"
                        }`}
                      >
                        {order.status}
                      </span>

                      <label className="flex items-center gap-3 text-sm">
                        Update status
                        <select
                          value={order.status}
                          onChange={(e) =>
                            void updateOrderStatus(
                              order.id,
                              e.target.value as CustomerOrder["status"],
                            )
                          }
                          className="border border-[#E5E5E5] bg-white px-3 py-2"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </label>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
}
