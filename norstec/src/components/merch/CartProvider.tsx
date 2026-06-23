"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { MAX_QUANTITY_PER_LINE } from "@/config/merch";
import type { LocalCart, LocalCartLine, Money } from "@/types/merch";

const STORAGE_KEY = "norstec-local-cart-v1";

// A cart line without its quantity; the provider merges quantities.
export type AddToCartInput = Omit<LocalCartLine, "quantity">;

const clampQuantity = (quantity: number) =>
  Math.max(1, Math.min(Math.floor(quantity), MAX_QUANTITY_PER_LINE));

type CartContextValue = {
  cart: LocalCart;
  isCheckingOut: boolean;
  checkoutError: string | null;
  maxPerLine: number;
  checkout: () => Promise<void>;
  addItem: (item: AddToCartInput, quantity?: number) => void;
  updateItem: (variantId: string, quantity: number) => void;
  removeItem: (variantId: string) => void;
};

const EMPTY_CART: LocalCart = {
  lines: [],
  totalQuantity: 0,
  subtotal: null,
};

const CartContext = createContext<CartContextValue | null>(null);

function calculateCart(lines: LocalCartLine[]): LocalCart {
  const totalQuantity = lines.reduce((total, line) => total + line.quantity, 0);
  const currencyCode = lines[0]?.price.currencyCode;
  const sameCurrency = lines.every((line) => line.price.currencyCode === currencyCode);
  const subtotal: Money | null =
    currencyCode && sameCurrency
      ? {
          amount: lines.reduce((total, line) => total + line.price.amount * line.quantity, 0),
          currencyCode,
        }
      : null;

  return { lines, totalQuantity, subtotal };
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<LocalCart>(EMPTY_CART);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [toast, setToast] = useState<{ title: string; id: number } | null>(null);
  const toastId = useRef(0);

  const persist = useCallback((lines: LocalCartLine[]) => {
    const nextCart = calculateCart(lines);
    setCart(nextCart);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextCart));
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return;

    try {
      const localCart = JSON.parse(stored) as LocalCart;
      if (!Array.isArray(localCart.lines)) throw new Error("Invalid local cart.");
      setCart(calculateCart(localCart.lines));
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const addItem = useCallback(
    (item: AddToCartInput, quantity = 1) => {
      const existing = cart.lines.find((line) => line.variantId === item.variantId);
      const nextLine: LocalCartLine = {
        ...item,
        quantity: clampQuantity((existing?.quantity ?? 0) + quantity),
      };

      persist([...cart.lines.filter((line) => line.variantId !== item.variantId), nextLine]);
      toastId.current += 1;
      setToast({ title: item.title, id: toastId.current });
    },
    [cart.lines, persist]
  );

  const updateItem = useCallback(
    (variantId: string, quantity: number) => {
      if (quantity < 1) {
        persist(cart.lines.filter((line) => line.variantId !== variantId));
        return;
      }
      persist(
        cart.lines.map((line) =>
          line.variantId === variantId ? { ...line, quantity: clampQuantity(quantity) } : line
        )
      );
    },
    [cart.lines, persist]
  );

  const removeItem = useCallback(
    (variantId: string) => {
      persist(cart.lines.filter((line) => line.variantId !== variantId));
    },
    [cart.lines, persist]
  );

  // Creates a real Shopify cart server-side and redirects to Shopify's hosted
  // checkout, which owns final price, availability, shipping, tax, and payment.
  const checkout = useCallback(async () => {
    if (!cart.lines.length || isCheckingOut) return;
    setIsCheckingOut(true);
    setCheckoutError(null);

    try {
      const response = await fetch("/api/cart/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lines: cart.lines.map((line) => ({
            variantId: line.variantId,
            quantity: line.quantity,
          })),
        }),
      });

      const data = (await response.json()) as { checkoutUrl?: string; error?: string };
      if (!response.ok || !data.checkoutUrl) {
        throw new Error(data.error || "Could not start checkout.");
      }

      window.location.href = data.checkoutUrl;
    } catch (e) {
      setCheckoutError(e instanceof Error ? e.message : "Could not start checkout.");
      setIsCheckingOut(false);
    }
  }, [cart.lines, isCheckingOut]);

  // Auto-dismiss the "added to cart" confirmation toast.
  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 2800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const value = useMemo(
    () => ({
      cart,
      isCheckingOut,
      checkoutError,
      maxPerLine: MAX_QUANTITY_PER_LINE,
      checkout,
      addItem,
      updateItem,
      removeItem,
    }),
    [addItem, cart, checkout, checkoutError, isCheckingOut, removeItem, updateItem]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[100] flex justify-center px-4 sm:justify-end sm:pr-6">
        <AnimatePresence>
          {toast && (
            <motion.div
              role="status"
              aria-live="polite"
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.22, 0.9, 0.2, 1] }}
              className="pointer-events-auto flex items-center gap-3 rounded-3xl border-2 border-moody bg-egg px-5 py-3"
            >
              <span className="material-symbols-outlined text-copper">check_circle</span>
              <span className="min-w-0 truncate">Added to cart</span>
              <Link
                href="/cart"
                className="shrink-0 rounded-full border-2 border-moody bg-moody px-4 py-1 text-egg transition-colors hover:bg-transparent hover:text-moody"
              >
                View cart
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider.");
  return context;
}
