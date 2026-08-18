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

// Shopify tags are the axis the team actually curates. Product types come from
// the Gelato sync and are usually identical across the catalog, so they are only
// used when tags give us nothing to filter on.
function categoriesOf(product: ShopifyProductListItem, useTags: boolean): string[] {
  if (useTags) return product.tags;
  return product.productType ? [product.productType] : [];
}

function matchesSearch(product: ShopifyProductListItem, query: string): boolean {
  const haystack = [product.title, product.description, product.productType ?? "", ...product.tags]
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

  const { categories, useTags } = useMemo(() => {
    const tags = new Set(products.flatMap((product) => product.tags));
    const preferTags = tags.size > 1;
    const values = preferTags
      ? tags
      : new Set(
          products
            .map((product) => product.productType)
            .filter((type): type is string => Boolean(type))
        );

    return {
      categories: Array.from(values).sort((a, b) => a.localeCompare(b, "nb")),
      useTags: preferTags,
    };
  }, [products]);

  const visibleProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    const filtered = products.filter((product) => {
      if (
        activeCategories.length &&
        !categoriesOf(product, useTags).some((category) => activeCategories.includes(category))
      ) {
        return false;
      }
      if (inStockOnly && !product.availableForSale) return false;
      if (query && !matchesSearch(product, query)) return false;
      return true;
    });

    return sortProducts(filtered, sort);
  }, [products, search, activeCategories, useTags, inStockOnly, sort]);

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
