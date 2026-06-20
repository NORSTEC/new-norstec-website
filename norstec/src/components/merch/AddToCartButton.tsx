"use client";

import {useState} from "react";
import {useCart} from "@/components/merch/CartProvider";
import type {MerchProduct} from "@/types/merch";

export default function AddToCartButton({
  product,
  className = "",
}: {
  product: MerchProduct;
  className?: string;
}) {
  const {addItem} = useCart();
  const [added, setAdded] = useState(false);

  const add = () => {
    addItem(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <button
      type="button"
      onClick={add}
      className={`rounded-full border-2 border-moody bg-moody px-5 py-2 text-egg transition-colors hover:bg-transparent hover:text-moody cursor-pointer ${className}`}
    >
      {added ? "Added" : "Add to cart"}
    </button>
  );
}
