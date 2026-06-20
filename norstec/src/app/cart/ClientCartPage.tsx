"use client";

import Image from "next/image";
import Link from "next/link";
import Money from "@/components/merch/Money";
import {useCart} from "@/components/merch/CartProvider";

export default function ClientCartPage() {
  const {cart, checkoutUrl, updateItem, removeItem} = useCart();
  const lines = cart.lines;

  return (
    <main className="min-h-screen desktop-container">
      <header className="mb-12 border-b-2 border-moody pb-8">
        <p className="mb-3 uppercase tracking-[0.18em] text-copper">NORSTEC store</p>
        <h1 className="text-[2rem] sm:text-[3rem] md:text-[4rem] xl:text-[5rem] 2xl:text-[6rem] font-thin uppercase">
          Cart
        </h1>
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
                      <h2 className="text-h3 font-medium">{line.title}</h2>
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
                      className="h-9 w-9 cursor-pointer rounded-full border-2 border-moody"
                    >
                      -
                    </button>
                    <span className="min-w-5 text-center">{line.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateItem(line.variantId, line.quantity + 1)}
                      aria-label="Increase quantity"
                      className="h-9 w-9 cursor-pointer rounded-full border-2 border-moody"
                    >
                      +
                    </button>
                    <button
                      type="button"
                      onClick={() => removeItem(line.variantId)}
                      className="ml-auto cursor-pointer underline underline-offset-4"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </section>

          <aside className="h-fit rounded-4xl border-2 border-moody p-6 lg:sticky lg:top-24">
            <h2 className="text-h2">Summary</h2>
            {/* This subtotal is based on Sanity display prices. Shopify checkout is final. */}
            <div className="my-6 flex justify-between gap-4 border-y-2 border-moody py-5">
              <span>Total</span>
              <strong>
                <Money value={cart.subtotal} />
              </strong>
            </div>
            {checkoutUrl ? (
              <a
                href={checkoutUrl}
                className="flex w-full items-center justify-center rounded-full border-2 border-moody bg-moody px-5 py-3 text-egg transition-colors hover:bg-transparent hover:text-moody"
              >
                Checkout
              </a>
            ) : (
              <p className="rounded-3xl border-2 border-copper p-4 text-copper">
                Checkout is not configured. Add SHOPIFY_STORE_DOMAIN.
              </p>
            )}
            <p className="mt-4 text-sm">
              Displayed totals are estimates. Shopify checkout is the source of truth for final
              price, availability, shipping, tax, Vipps payment, and Printful fulfillment.
            </p>
          </aside>
        </div>
      )}
    </main>
  );
}
