import { NextResponse } from "next/server";
import { MAX_QUANTITY_PER_LINE } from "@/config/merch";
import { createShopifyCart } from "@/lib/shopify/storefront";
import type { CheckoutLineInput } from "@/types/shopify";

export const dynamic = "force-dynamic";

// Guard rails against oversized/abusive payloads. Shopify also throttles cart
// creation, but we bound the request before it ever reaches Shopify.
const MAX_LINES = 50;

type CheckoutBody = { lines?: { variantId?: unknown; quantity?: unknown }[] };

export async function POST(request: Request) {
  let body: CheckoutBody;
  try {
    body = (await request.json()) as CheckoutBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const lines: CheckoutLineInput[] = (Array.isArray(body.lines) ? body.lines : [])
    .slice(0, MAX_LINES)
    .map((line) => ({
      variantId: typeof line?.variantId === "string" ? line.variantId : "",
      quantity: Math.min(Math.floor(Number(line?.quantity)) || 0, MAX_QUANTITY_PER_LINE),
    }))
    .filter((line) => line.variantId && line.quantity > 0);

  if (!lines.length) {
    return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
  }

  try {
    const { checkoutUrl } = await createShopifyCart(lines);
    return NextResponse.json({ checkoutUrl });
  } catch (e) {
    console.error("Checkout creation failed:", e);
    return NextResponse.json(
      { error: "Could not start checkout. Please try again." },
      { status: 502 }
    );
  }
}
