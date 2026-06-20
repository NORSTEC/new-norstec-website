import type {LocalCartLine} from "@/types/merch";

export function extractShopifyVariantId(variantId: string): string | null {
  const numericId = variantId.match(/(?:ProductVariant\/)?(\d+)$/)?.[1];
  return numericId ?? null;
}

export function buildShopifyCartPermalink(domain: string, lines: LocalCartLine[]): string | null {
  const normalizedDomain = domain.replace(/^https?:\/\//, "").replace(/\/$/, "");
  if (!normalizedDomain) return null;

  const cartPath = lines
    .map((line) => {
      const variantId = extractShopifyVariantId(line.variantId);
      return variantId ? `${variantId}:${line.quantity}` : null;
    })
    .filter((line): line is string => Boolean(line))
    .join(",");

  if (!cartPath) return null;

  // Shopify checkout is the source of truth for final price, shipping, tax, availability,
  // Vipps payment, and Printful fulfillment.
  return `https://${normalizedDomain}/cart/${cartPath}`;
}
