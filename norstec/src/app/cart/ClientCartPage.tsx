"use client";

import Image from "next/image";
import Link from "next/link";
import Money from "@/components/merch/Money";
import { useCart } from "@/components/merch/CartProvider";

export default function ClientCartPage() {
  const { cart, checkout, isCheckingOut, checkoutError, maxPerLine, updateItem, removeItem } =
    useCart();
  const lines = cart.lines;

  return (
    <main className="min-h-screen desktop-container">
      <header className="mb-12 border-b-2 border-moody pb-8">
        <Link
          href="/merch"
          className="mb-6 inline-flex items-center gap-2 rounded-full border-2 border-moody bg-moody px-5 py-2 text-egg transition-colors hover:bg-transparent hover:text-moody"
        >
          <span className="material-symbols-outlined rotate-180">trending_flat</span>
          Back to merch
        </Link>
        <h1 className="text-h1">Cart</h1>
      </header>

      {!lines.length ? (
        <section className="rounded-4xl border-2 border-moody p-8">
          <h2 className="text-h2">Your cart is empty</h2>
          <p className="mt-4">Find something you like in the merch store.</p>
          <Link
            href="/merch"
            className="mt-7 inline-flex rounded-full border-2 border-moody bg-moody px-5 py-2 text-egg transition-colors hover:bg-transparent hover:text-moody"
          >
            Browse merch
          </Link>
        </section>
      ) : (
        <div className="grid gap-10 lg:grid-cols-[1fr_22rem]">
          <section className="space-y-5">
            {lines.map((line) => (
              <article
                key={line.variantId}
                className="grid grid-cols-[6rem_1fr] gap-5 rounded-4xl border-2 border-moody p-4 sm:grid-cols-[9rem_1fr]"
              >
                <div className="aspect-square overflow-hidden rounded-3xl">
                  {line.imageUrl ? (
                    <Image
                      src={line.imageUrl}
                      alt={line.imageAlt || line.title}
                      width={400}
                      height={400}
                      className="h-full w-full object-cover"
                      unoptimized
                    />
                  ) : null}
                </div>
                <div className="flex min-w-0 flex-col justify-between gap-4">
                  <div>
                    <Link href={`/merch/${line.slug}`} className="hover:text-copper">
                      <h2 className="text-base font-medium md:text-lg">{line.title}</h2>
                    </Link>
                    <p className="mt-2 font-semibold">
                      <Money
                        value={{
                          amount: line.price.amount * line.quantity,
                          currencyCode: line.price.currencyCode,
                        }}
                      />
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => updateItem(line.variantId, line.quantity - 1)}
                      aria-label="Decrease quantity"
                      className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-2 border-moody bg-moody text-egg transition-colors hover:bg-transparent hover:text-moody"
                    >
                      -
                    </button>
                    <span className="min-w-5 text-center">{line.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateItem(line.variantId, line.quantity + 1)}
                      aria-label="Increase quantity"
                      disabled={line.quantity >= maxPerLine}
                      title={line.quantity >= maxPerLine ? `Max ${maxPerLine} per item` : undefined}
                      className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-2 border-moody bg-moody text-egg transition-colors hover:bg-transparent hover:text-moody disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-moody disabled:hover:text-egg"
                    >
                      +
                    </button>
                    {line.quantity >= maxPerLine && (
                      <span className="text-sm text-copper">Max {maxPerLine}</span>
                    )}
                    <button
                      type="button"
                      onClick={() => removeItem(line.variantId)}
                      aria-label="Remove item"
                      className="ml-auto flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-2 border-moody bg-moody text-egg transition-colors hover:bg-transparent hover:text-moody"
                    >
                      <span className="material-symbols-outlined text-[1.15rem]">delete</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </section>

          <aside className="h-fit rounded-4xl border-2 border-moody p-6 lg:sticky lg:top-24">
            <h2 className="text-h2">Summary</h2>
            <div className="my-6 flex justify-between gap-4 border-y-2 border-moody py-5">
              <span>Subtotal</span>
              <strong>
                <Money value={cart.subtotal} />
              </strong>
            </div>
            <button
              type="button"
              onClick={checkout}
              disabled={isCheckingOut}
              className="flex w-full items-center justify-center rounded-full border-2 border-moody bg-moody px-5 py-3 text-egg transition-colors hover:bg-transparent hover:text-moody disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isCheckingOut ? "Starting checkout…" : "Checkout"}
            </button>
            {checkoutError && (
              <p className="mt-4 rounded-3xl border-2 border-copper p-4 text-copper">
                {checkoutError}
              </p>
            )}
            <p className="mt-4 text-sm">
              Shipping and tax are calculated at checkout. Payment is handled securely by Shopify,
              including Vipps/MobilePay.
            </p>
          </aside>
        </div>
      )}
    </main>
  );
}
