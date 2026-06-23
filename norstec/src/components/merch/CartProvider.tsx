"use client";

import {createContext, useCallback, useContext, useEffect, useMemo, useState} from "react";
import type {LocalCart, LocalCartLine, Money} from "@/types/merch";

const STORAGE_KEY = "norstec-local-cart-v1";

// A cart line without its quantity; the provider merges quantities.
export type AddToCartInput = Omit<LocalCartLine, "quantity">;

type CartContextValue = {
  cart: LocalCart;
  isCheckingOut: boolean;
  checkoutError: string | null;
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

  return {lines, totalQuantity, subtotal};
}

export function CartProvider({children}: {children: React.ReactNode}) {
  const [cart, setCart] = useState<LocalCart>(EMPTY_CART);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

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
        quantity: (existing?.quantity ?? 0) + quantity,
      };

      persist([
        ...cart.lines.filter((line) => line.variantId !== item.variantId),
        nextLine,
      ]);
    },
    [cart.lines, persist],
  );

  const updateItem = useCallback(
    (variantId: string, quantity: number) => {
      if (quantity < 1) {
        persist(cart.lines.filter((line) => line.variantId !== variantId));
        return;
      }
      persist(
        cart.lines.map((line) => (line.variantId === variantId ? {...line, quantity} : line)),
      );
    },
    [cart.lines, persist],
  );

  const removeItem = useCallback(
    (variantId: string) => {
      persist(cart.lines.filter((line) => line.variantId !== variantId));
    },
    [cart.lines, persist],
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
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          lines: cart.lines.map((line) => ({
            variantId: line.variantId,
            quantity: line.quantity,
          })),
        }),
      });

      const data = (await response.json()) as {checkoutUrl?: string; error?: string};
      if (!response.ok || !data.checkoutUrl) {
        throw new Error(data.error || "Could not start checkout.");
      }

      window.location.href = data.checkoutUrl;
    } catch (e) {
      setCheckoutError(e instanceof Error ? e.message : "Could not start checkout.");
      setIsCheckingOut(false);
    }
  }, [cart.lines, isCheckingOut]);

  const value = useMemo(
    () => ({cart, isCheckingOut, checkoutError, checkout, addItem, updateItem, removeItem}),
    [addItem, cart, checkout, checkoutError, isCheckingOut, removeItem, updateItem],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider.");
  return context;
}
