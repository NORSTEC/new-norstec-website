"use client";

import {useState} from "react";
import {useCart, type AddToCartInput} from "@/components/merch/CartProvider";

export default function AddToCartButton({
  line,
  soldOut = false,
  className = "",
}: {
  // Null when no variant is selected yet.
  line: AddToCartInput | null;
  soldOut?: boolean;
  className?: string;
}) {
  const {addItem} = useCart();
  const [added, setAdded] = useState(false);

  const add = () => {
    if (!line) return;
    addItem(line);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  if (soldOut) {
    return (
      <button
        type="button"
        disabled
        className={`rounded-full border-2 border-moody px-5 py-2 text-moody opacity-50 cursor-not-allowed ${className}`}
      >
        Sold out
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={add}
      disabled={!line}
      className={`rounded-full border-2 border-moody bg-moody px-5 py-2 text-egg transition-colors hover:bg-transparent hover:text-moody cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      {added ? "Added" : "Add to cart"}
    </button>
  );
}
