"use client";

import { useMemo, useState } from "react";
import MerchFilterBar, { type MerchSort } from "@/components/merch/MerchFilterBar";
import ProductCard from "@/components/merch/ProductCard";
import SectionHero from "@/components/sections/SectionHero";
import type { ShopifyProductListItem } from "@/types/shopify";
import type { SectionHero as SectionHeroType } from "@/types/sections/sectionHero";

type Props = {
  hero?: SectionHeroType | null;
  products: ShopifyProductListItem[];
};

// Category pills come from namespaced Shopify tags ("kategori:klær"), so the
// team can keep using free-form tags ("core", "jul", "sommer") without them
// leaking into the filter UI. See docs/MERCH_SETUP.md for the taxonomy.
const CATEGORY_TAG_PREFIX = "kategori:";

type CategorySource = "namespaced-tag" | "tag" | "product-type";

function categoriesOf(product: ShopifyProductListItem, source: CategorySource): string[] {
  if (source === "namespaced-tag") {
    return product.tags
      .filter((tag) => tag.toLowerCase().startsWith(CATEGORY_TAG_PREFIX))
      .map((tag) => tag.slice(CATEGORY_TAG_PREFIX.length).trim())
      .filter(Boolean);
  }
  if (source === "tag") return product.tags;
  return product.productType ? [product.productType] : [];
}

function matchesSearch(product: ShopifyProductListItem, query: string): boolean {
  const haystack = [
    product.title,
    product.description,
    product.productType ?? "",
    // Strip the namespace so "kategori:klær" is searchable as "klær".
    ...product.tags.map((tag) => tag.replace(new RegExp(`^${CATEGORY_TAG_PREFIX}`, "i"), "")),
  ]
    .join(" ")
    .toLowerCase();
  // Every term must appear somewhere, so "black hoodie" also matches "Hoodie black".
  return query.split(/\s+/).every((term) => haystack.includes(term));
}

function sortProducts(
  products: ShopifyProductListItem[],
  sort: MerchSort
): ShopifyProductListItem[] {
  // "featured" keeps the order Shopify returned (sortKey: TITLE) untouched.
  if (sort === "featured") return products;

  const sorted = [...products];
  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.minPrice.amount - b.minPrice.amount);
    case "price-desc":
      return sorted.sort((a, b) => b.minPrice.amount - a.minPrice.amount);
    case "newest":
      return sorted.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    case "title-asc":
      return sorted.sort((a, b) => a.title.localeCompare(b.title, "nb"));
    default:
      return sorted;
  }
}

export default function ClientMerchPage({ hero, products }: Props) {
  const [search, setSearch] = useState("");
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sort, setSort] = useState<MerchSort>("featured");

  const { categories, categorySource } = useMemo(() => {
    // Prefer the curated taxonomy. Fall back to raw tags, then to product types,
    // so the filter still does something useful on a partly tagged catalog.
    const sources: CategorySource[] = ["namespaced-tag", "tag", "product-type"];
    const source =
      sources.find((candidate) => {
        const values = new Set(products.flatMap((product) => categoriesOf(product, candidate)));
        return candidate === "namespaced-tag" ? values.size > 0 : values.size > 1;
      }) ?? "namespaced-tag";

    const values = new Set(products.flatMap((product) => categoriesOf(product, source)));

    return {
      categories: Array.from(values).sort((a, b) => a.localeCompare(b, "nb")),
      categorySource: source,
    };
  }, [products]);

  const visibleProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    const filtered = products.filter((product) => {
      if (
        activeCategories.length &&
        !categoriesOf(product, categorySource).some((category) =>
          activeCategories.includes(category)
        )
      ) {
        return false;
      }
      if (inStockOnly && !product.availableForSale) return false;
      if (query && !matchesSearch(product, query)) return false;
      return true;
    });

    return sortProducts(filtered, sort);
  }, [products, search, activeCategories, categorySource, inStockOnly, sort]);

  const toggleCategory = (category: string) =>
    setActiveCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );

  const resetFilters = () => {
    setSearch("");
    setActiveCategories([]);
    setInStockOnly(false);
  };

  return (
    <main className="w-full">
      {hero && <SectionHero section={hero} className="no-snap" />}
      <div className="desktop-container w-full">
        {products.length > 0 && (
          <MerchFilterBar
            search={search}
            onSearchChange={setSearch}
            categories={categories}
            activeCategories={activeCategories}
            onToggleCategory={toggleCategory}
            onClearCategories={() => setActiveCategories([])}
            inStockOnly={inStockOnly}
            onInStockOnlyChange={setInStockOnly}
            sort={sort}
            onSortChange={setSort}
            resultCount={visibleProducts.length}
            totalCount={products.length}
            onReset={resetFilters}
          />
        )}
        <section className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4 3xl:grid-cols-5">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          {!products.length && (
            <p className="col-span-full text-center">No products published yet.</p>
          )}
          {products.length > 0 && !visibleProducts.length && (
            <div className="col-span-full flex flex-col items-center gap-4 py-10 text-center">
              <p>No products match your filters.</p>
              <button
                type="button"
                onClick={resetFilters}
                className="cursor-pointer rounded-full border-2 border-moody bg-moody px-5 py-2 text-egg transition-colors hover:bg-transparent hover:text-moody"
              >
                Clear filters
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
