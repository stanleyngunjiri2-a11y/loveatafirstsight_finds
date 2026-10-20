export type CartItem = {
  productId: string;
  name: string;
  slug: string;
  price: number;
  imageUrl: string;
  quantity: number;
};

const CART_KEY = "loveatfirstsight_finds_cart";

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(CART_KEY);
    if (!stored) return [];

    const parsed: unknown = JSON.parse(stored);

    if (!Array.isArray(parsed)) return [];

    return parsed.filter(
      (item): item is CartItem =>
        item !== null &&
        typeof item === "object" &&
        typeof item.productId === "string" &&
        typeof item.name === "string" &&
        typeof item.slug === "string" &&
        Number.isFinite(Number(item.price)) &&
        typeof item.quantity === "number" &&
        Number.isInteger(item.quantity) &&
        item.quantity > 0,
    );
  } catch {
    return [];
  }
}

export function saveCart(items: CartItem[]) {
  if (typeof window === "undefined") return;

  localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("cart-updated"));
}

export function addToCart(item: Omit<CartItem, "quantity">) {
  const cart = getCart();
  const existing = cart.find((entry) => entry.productId === item.productId);

  if (existing) {
    existing.quantity = Math.min(existing.quantity + 1, 20);
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  saveCart(cart);
}

export function updateCartQuantity(productId: string, quantity: number) {
  const cart = getCart();

  const updated = cart
    .map((item) =>
      item.productId === productId
        ? { ...item, quantity: Math.min(Math.max(quantity, 1), 20) }
        : item,
    );

  saveCart(updated);
}

export function removeFromCart(productId: string) {
  saveCart(getCart().filter((item) => item.productId !== productId));
}

export function clearCart() {
  saveCart([]);
}
