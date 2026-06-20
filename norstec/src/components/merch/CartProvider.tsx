"use client";

import {createContext, useCallback, useContext, useEffect, useMemo, useState} from "react";
import {buildShopifyCartPermalink} from "@/lib/shopifyCartPermalink";
import type {LocalCart, LocalCartLine, MerchProduct, Money} from "@/types/merch";
import {imageBuilder} from "@/utils/imageBuilder";

const STORAGE_KEY = "norstec-local-cart-v1";

type CartContextValue = {
  cart: LocalCart;
  checkoutUrl: string | null;
  addItem: (product: MerchProduct, quantity?: number) => void;
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

export function CartProvider({
  children,
  shopifyStoreDomain,
}: {
  children: React.ReactNode;
  shopifyStoreDomain?: string;
}) {
  const [cart, setCart] = useState<LocalCart>(EMPTY_CART);

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
    (product: MerchProduct, quantity = 1) => {
      const existing = cart.lines.find((line) => line.variantId === product.shopifyVariantId);
      const nextLine: LocalCartLine = {
        variantId: product.shopifyVariantId,
        quantity: (existing?.quantity ?? 0) + quantity,
        title: product.title,
        price: product.price,
        slug: product.slug,
        imageUrl: imageBuilder(product.images?.[0], {
          width: 500,
          height: 500,
          fit: "crop",
          quality: 90,
        }),
        imageAlt: product.images?.[0]?.alt || product.title,
      };

      persist([
        ...cart.lines.filter((line) => line.variantId !== product.shopifyVariantId),
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

  const checkoutUrl = useMemo(
    () =>
      shopifyStoreDomain
        ? buildShopifyCartPermalink(shopifyStoreDomain, cart.lines)
        : null,
    [cart.lines, shopifyStoreDomain],
  );

  const value = useMemo(
    () => ({cart, checkoutUrl, addItem, updateItem, removeItem}),
    [addItem, cart, checkoutUrl, removeItem, updateItem],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider.");
  return context;
}
