#!/usr/bin/env node
/**
 * Applies the merch category taxonomy to Shopify products.
 *
 * Category pills on /merch are built from namespaced tags ("kategori:klær"),
 * so free-form tags such as "core" or "jul" never show up as a filter.
 *
 * Usage (from the norstec/ directory):
 *
 *   node scripts/shopify-category-tags.mjs           # dry run, prints the plan
 *   node scripts/shopify-category-tags.mjs --apply   # writes to Shopify
 *
 * Requires an Admin API access token with write_products in .env.local:
 *
 *   SHOPIFY_ADMIN_API_TOKEN=shpat_...
 *
 * Tags are added, never replaced, so existing tags survive. Remove obsolete
 * tags manually in the Shopify admin, or with --remove <tag>.
 */

import { readFileSync } from "node:fs";

// ---------------------------------------------------------------------------
// Taxonomy. Add a line per product handle. Handles come from the product URL:
// /products/<handle>. A product may sit in several categories.
// ---------------------------------------------------------------------------
const CATEGORIES = {
  "spacepodden-t-skjorte": ["klær"],
  "norstec-signature-stripe-cap": ["hodeplagg"],
  "hvitt-keramisk-krus-med-farge-pa-innsiden-11-oz-ceramic-blue": ["drikke"],
  "drikkeflaske-norstec-hazardous-material-container-1-1": ["drikke"],
  "slim-case": ["tilbehør"],
};

const PREFIX = "kategori:";

// ---------------------------------------------------------------------------

function loadEnv() {
  try {
    for (const line of readFileSync(new URL("../.env.local", import.meta.url), "utf8").split("\n")) {
      const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (match && !process.env[match[1]]) {
        process.env[match[1]] = match[2].replace(/^["']|["']$/g, "");
      }
    }
  } catch {
    // No .env.local; fall back to the ambient environment.
  }
}

async function adminFetch(query, variables) {
  const domain = process.env.SHOPIFY_STORE_DOMAIN?.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const token = process.env.SHOPIFY_ADMIN_API_TOKEN;
  const version = process.env.SHOPIFY_ADMIN_API_VERSION || "2026-04";

  if (!domain) throw new Error("Missing SHOPIFY_STORE_DOMAIN.");
  if (!token) throw new Error("Missing SHOPIFY_ADMIN_API_TOKEN (needs write_products).");

  const response = await fetch(`https://${domain}/admin/api/${version}/graphql.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Shopify-Access-Token": token },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) throw new Error(`Shopify Admin API responded with HTTP ${response.status}.`);

  const body = await response.json();
  if (body.errors?.length) throw new Error(body.errors.map((e) => e.message).join("; "));
  return body.data;
}

const PRODUCTS_QUERY = `
  query Products($cursor: String) {
    products(first: 100, after: $cursor) {
      pageInfo { hasNextPage endCursor }
      edges { node { id handle title tags } }
    }
  }
`;

const TAGS_ADD_MUTATION = `
  mutation TagsAdd($id: ID!, $tags: [String!]!) {
    tagsAdd(id: $id, tags: $tags) {
      userErrors { field message }
    }
  }
`;

const TAGS_REMOVE_MUTATION = `
  mutation TagsRemove($id: ID!, $tags: [String!]!) {
    tagsRemove(id: $id, tags: $tags) {
      userErrors { field message }
    }
  }
`;

async function fetchAllProducts() {
  const products = [];
  let cursor = null;
  let hasNextPage = true;

  while (hasNextPage) {
    const data = await adminFetch(PRODUCTS_QUERY, { cursor });
    products.push(...data.products.edges.map((edge) => edge.node));
    hasNextPage = data.products.pageInfo.hasNextPage;
    cursor = data.products.pageInfo.endCursor;
  }

  return products;
}

async function main() {
  loadEnv();

  const args = process.argv.slice(2);
  const apply = args.includes("--apply");
  const removeIndex = args.indexOf("--remove");
  const tagsToRemove = removeIndex === -1 ? [] : args.slice(removeIndex + 1).filter((a) => !a.startsWith("--"));

  const products = await fetchAllProducts();
  const seen = new Set();
  let changes = 0;

  for (const product of products) {
    seen.add(product.handle);

    const wanted = (CATEGORIES[product.handle] ?? []).map((category) => `${PREFIX}${category}`);
    const existing = new Set(product.tags.map((tag) => tag.toLowerCase()));
    const missing = wanted.filter((tag) => !existing.has(tag.toLowerCase()));
    const removable = tagsToRemove.filter((tag) => existing.has(tag.toLowerCase()));

    if (!wanted.length) {
      console.log(`SKIP  ${product.handle} — not in the taxonomy, add it to CATEGORIES`);
      continue;
    }
    if (!missing.length && !removable.length) {
      console.log(`OK    ${product.handle} — ${wanted.join(", ")}`);
      continue;
    }

    changes += 1;
    const parts = [];
    if (missing.length) parts.push(`+${missing.join(" +")}`);
    if (removable.length) parts.push(`-${removable.join(" -")}`);
    console.log(`${apply ? "WRITE" : "PLAN "} ${product.handle} — ${parts.join("  ")}`);

    if (!apply) continue;

    if (missing.length) {
      const result = await adminFetch(TAGS_ADD_MUTATION, { id: product.id, tags: missing });
      const errors = result.tagsAdd.userErrors;
      if (errors.length) throw new Error(errors.map((e) => e.message).join("; "));
    }
    if (removable.length) {
      const result = await adminFetch(TAGS_REMOVE_MUTATION, { id: product.id, tags: removable });
      const errors = result.tagsRemove.userErrors;
      if (errors.length) throw new Error(errors.map((e) => e.message).join("; "));
    }
  }

  for (const handle of Object.keys(CATEGORIES)) {
    if (!seen.has(handle)) console.log(`WARN  ${handle} — in CATEGORIES but not found in Shopify`);
  }

  console.log(
    changes === 0
      ? "\nNothing to do."
      : apply
        ? `\nDone. ${changes} product(s) updated.`
        : `\n${changes} product(s) would change. Re-run with --apply to write.`
  );
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
