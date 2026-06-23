// Low-level Shopify Storefront API GraphQL client.
//
// Server-only: do not import from client components. Authentication uses
// SHOPIFY_STOREFRONT_API_TOKEN (no NEXT_PUBLIC_ prefix), so it is never
// bundled into client-side code.
//
// Authenticates with the public Storefront API access token via the
// `X-Shopify-Storefront-Access-Token` header. This token is read-only
// (unauthenticated_* scopes) and is used server-side only.
//
// Docs: https://shopify.dev/docs/api/storefront

const DEFAULT_API_VERSION = "2026-04";

export class ShopifyConfigError extends Error {}
export class ShopifyRequestError extends Error {}

type ShopifyConfig = {
  endpoint: string;
  token: string;
};

function getConfig(): ShopifyConfig {
  const domain = process.env.SHOPIFY_STORE_DOMAIN?.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const token = process.env.SHOPIFY_STOREFRONT_API_TOKEN;
  const version = process.env.SHOPIFY_STOREFRONT_API_VERSION || DEFAULT_API_VERSION;

  if (!domain || !token) {
    throw new ShopifyConfigError(
      "Missing SHOPIFY_STORE_DOMAIN or SHOPIFY_STOREFRONT_API_TOKEN environment variable.",
    );
  }

  return {endpoint: `https://${domain}/api/${version}/graphql.json`, token};
}

export async function shopifyStorefrontFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const {endpoint, token} = getConfig();

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({query, variables}),
    // Prices and availability must always be fresh; never cache.
    cache: "no-store",
  });

  if (!response.ok) {
    throw new ShopifyRequestError(`Shopify responded with HTTP ${response.status}.`);
  }

  const body = (await response.json()) as {data?: T; errors?: {message: string}[]};

  if (body.errors?.length) {
    throw new ShopifyRequestError(body.errors.map((e) => e.message).join("; "));
  }
  if (!body.data) {
    throw new ShopifyRequestError("Shopify returned no data.");
  }

  return body.data;
}
