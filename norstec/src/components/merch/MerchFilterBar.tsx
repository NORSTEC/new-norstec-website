"use client";

export type MerchSort = "featured" | "price-asc" | "price-desc" | "newest" | "title-asc";

export const MERCH_SORT_OPTIONS: { value: MerchSort; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "title-asc", label: "Name: A–Z" },
];

type Props = {
  search: string;
  onSearchChange: (value: string) => void;
  categories: string[];
  activeCategories: string[];
  onToggleCategory: (value: string) => void;
  onClearCategories: () => void;
  inStockOnly: boolean;
  onInStockOnlyChange: (value: boolean) => void;
  sort: MerchSort;
  onSortChange: (value: MerchSort) => void;
  resultCount: number;
  totalCount: number;
  onReset: () => void;
};

const pillBase =
  "cursor-pointer rounded-full border-2 border-moody px-4 py-2 text-sm transition-colors duration-200 md:text-base";
const pillActive = "bg-moody text-egg";
const pillIdle = "bg-transparent text-moody hover:bg-moody/10";

export default function MerchFilterBar({
  search,
  onSearchChange,
  categories,
  activeCategories,
  onToggleCategory,
  onClearCategories,
  inStockOnly,
  onInStockOnlyChange,
  sort,
  onSortChange,
  resultCount,
  totalCount,
  onReset,
}: Props) {
  const hasActiveFilters = Boolean(search.trim()) || activeCategories.length > 0 || inStockOnly;

  return (
    <section className="flex w-full flex-col gap-5 pb-10" aria-label="Product filters">
      <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Search */}
        <div className="relative w-full lg:max-w-md">
          <label htmlFor="merch-search" className="sr-only">
            Search products
          </label>
          <span
            aria-hidden="true"
            className="icon icon-24 icon-400 pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-moody"
          >
            search
          </span>
          <input
            id="merch-search"
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search merch…"
            autoComplete="off"
            className="w-full rounded-full border-2 border-moody bg-transparent py-2.5 pl-13 pr-11 text-moody placeholder:text-moody/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-copper"
          />
          {search && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 flex -translate-y-1/2 cursor-pointer items-center justify-center rounded-full p-1 text-moody transition-opacity hover:opacity-60"
            >
              <span aria-hidden="true" className="icon icon-24 icon-400">
                close
              </span>
            </button>
          )}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-3">
          <label htmlFor="merch-sort" className="shrink-0 text-sm text-moody md:text-base">
            Sort by
          </label>
          <select
            id="merch-sort"
            value={sort}
            onChange={(event) => onSortChange(event.target.value as MerchSort)}
            className="cursor-pointer rounded-full border-2 border-moody bg-transparent px-4 py-2.5 text-moody focus:outline-none focus-visible:ring-2 focus-visible:ring-copper"
          >
            {MERCH_SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value} className="bg-egg text-moody">
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Category + availability */}
      <div className="flex w-full flex-wrap items-center gap-3">
        {categories.length > 1 && (
          <>
            <button
              type="button"
              onClick={onClearCategories}
              aria-pressed={activeCategories.length === 0}
              className={`${pillBase} ${activeCategories.length === 0 ? pillActive : pillIdle}`}
            >
              All
            </button>
            {categories.map((category) => {
              const active = activeCategories.includes(category);
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => onToggleCategory(category)}
                  aria-pressed={active}
                  className={`${pillBase} capitalize ${active ? pillActive : pillIdle}`}
                >
                  {category}
                </button>
              );
            })}
            <span aria-hidden="true" className="hidden h-6 w-px bg-moody/30 md:block" />
          </>
        )}

        <button
          type="button"
          onClick={() => onInStockOnlyChange(!inStockOnly)}
          aria-pressed={inStockOnly}
          className={`${pillBase} ${inStockOnly ? pillActive : pillIdle}`}
        >
          In stock only
        </button>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="cursor-pointer text-sm text-moody underline underline-offset-4 transition-opacity hover:opacity-60 md:text-base"
          >
            Clear filters
          </button>
        )}
      </div>

      <p aria-live="polite" className="text-sm text-moody/70">
        Showing {resultCount} of {totalCount} {totalCount === 1 ? "product" : "products"}
      </p>
    </section>
  );
}
