"use client";

import { useState, type FormEvent } from "react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Unable to sign in. Please try again.");
        return;
      }

      window.location.assign("/admin");
    } catch {
      setError("Unable to connect. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FAF7F4] px-5 py-12 text-[#252124]">
      <section className="w-full max-w-md border border-[#E8DFDE] bg-white p-7 shadow-sm sm:p-10">
        <div className="mb-8 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#702B40]">
            LOVEATFIRSTSIGHT FINDS
          </p>

          <h1 className="mt-5 font-serif text-3xl">
            Admin Login
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Sign in to manage your store, products and customer orders.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold"
            >
              Admin Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              autoFocus
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full border border-[#E8DFDE] px-4 py-3 text-sm outline-none transition focus:border-[#702B40]"
              placeholder="Enter your admin password"
            />
          </div>

          {error && (
            <p
              role="alert"
              className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#702B40] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#572032] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <a
          href="/"
          className="mt-7 block text-center text-sm text-gray-600 transition hover:text-[#702B40]"
        >
          &larr; Back to store
        </a>
      </section>
    </main>
  );
}
