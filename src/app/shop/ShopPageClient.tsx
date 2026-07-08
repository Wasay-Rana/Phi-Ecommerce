"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import { products, niches, categoryLabels, nicheOf } from "@/data/products";
import { Niche, ProductCategory } from "@/types/product";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ProductGridSkeleton } from "@/components/product/ProductGridSkeleton";
import { ShopFilters, PRICE_MAX } from "@/components/shop/ShopFilters";
import { SortSelect, SortOption } from "@/components/shop/SortSelect";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

function deriveFiltersFromParams(searchParams: URLSearchParams) {
  const category = searchParams.get("category") as ProductCategory | null;
  const niche = searchParams.get("niche") as Niche | null;
  return {
    niche: niche ?? (category ? nicheOf[category] : ("all" as const)),
    categories: category ? [category] : [],
    query: searchParams.get("q") ?? "",
  };
}

export function ShopPageClient() {
  const searchParams = useSearchParams();
  const searchParamsKey = searchParams.toString();
  const initialFilters = deriveFiltersFromParams(searchParams);

  const [loading, setLoading] = useState(true);
  const [activeNiche, setActiveNiche] = useState<Niche | "all">(initialFilters.niche);
  const [selectedCategories, setSelectedCategories] = useState<ProductCategory[]>(
    initialFilters.categories
  );
  const [searchQuery, setSearchQuery] = useState(initialFilters.query);
  const [maxPrice, setMaxPrice] = useState(PRICE_MAX);
  const [sort, setSort] = useState<SortOption>("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Re-derive filters from the URL whenever it changes — including client-side
  // navigations to /shop with a different query string, which don't remount
  // this component and so wouldn't otherwise pick up the new value. Adjusting
  // state during render (rather than in an effect) is the React-recommended
  // pattern for this: https://react.dev/learn/you-might-not-need-an-effect
  const [syncedParamsKey, setSyncedParamsKey] = useState(searchParamsKey);
  if (searchParamsKey !== syncedParamsKey) {
    setSyncedParamsKey(searchParamsKey);
    const next = deriveFiltersFromParams(searchParams);
    setActiveNiche(next.niche);
    setSelectedCategories(next.categories);
    setSearchQuery(next.query);
  }

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  function toggleCategory(category: ProductCategory) {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  }

  function selectNiche(niche: Niche | "all") {
    setActiveNiche(niche);
    setSelectedCategories([]);
  }

  function resetFilters() {
    setActiveNiche("all");
    setSelectedCategories([]);
    setMaxPrice(PRICE_MAX);
    setSearchQuery("");
  }

  const filtered = useMemo(() => {
    let list = products.filter((p) => p.price <= maxPrice);
    if (activeNiche !== "all") {
      list = list.filter((p) => nicheOf[p.category] === activeNiche);
    }
    if (selectedCategories.length > 0) {
      list = list.filter((p) => selectedCategories.includes(p.category));
    }
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter(
        (p) => p.name.toLowerCase().includes(q) || p.tagline.toLowerCase().includes(q)
      );
    }
    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      default:
        list = [...list].sort((a, b) => Number(!!b.badges?.length) - Number(!!a.badges?.length));
    }
    return list;
  }, [activeNiche, selectedCategories, maxPrice, sort, searchQuery]);

  const filterProps = {
    activeNiche,
    selectedCategories,
    onToggleCategory: toggleCategory,
    maxPrice,
    onMaxPriceChange: setMaxPrice,
    onReset: resetFilters,
  };

  const activeNicheLabel = activeNiche === "all" ? null : niches.find((n) => n.id === activeNiche)?.label;

  return (
    <div className="container-page py-10">
      <div className="mb-4">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Shop", href: activeNiche === "all" ? undefined : "/shop" },
            ...(activeNicheLabel ? [{ label: activeNicheLabel }] : []),
          ]}
        />
      </div>

      <div className="mb-6 flex flex-col gap-2">
        <h1 className="text-section text-primary sm:text-section-lg">
          {searchQuery ? `Results for "${searchQuery}"` : activeNicheLabel ? `${activeNicheLabel} products` : "Shop all products"}
        </h1>
        <p className="text-secondary">{filtered.length} products</p>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => selectNiche("all")}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
            activeNiche === "all" ? "bg-primary text-inverse" : "bg-bg-alt text-secondary hover:text-primary"
          }`}
        >
          All
        </button>
        {niches.map((niche) => (
          <button
            key={niche.id}
            type="button"
            onClick={() => selectNiche(niche.id)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              activeNiche === niche.id ? "bg-primary text-inverse" : "bg-bg-alt text-secondary hover:text-primary"
            }`}
          >
            {niche.label}
          </button>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
        <div className="hidden lg:block">
          <ShopFilters {...filterProps} />
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-primary lg:hidden"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </button>
              {selectedCategories.map((category) => (
                <span
                  key={category}
                  className="flex items-center gap-1 rounded-full bg-accent-soft px-3 py-1.5 text-meta font-medium text-accent-text"
                >
                  {categoryLabels[category]}
                  <button
                    type="button"
                    aria-label={`Remove ${category} filter`}
                    onClick={() => toggleCategory(category)}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
              {searchQuery && (
                <span className="flex items-center gap-1 rounded-full bg-accent-soft px-3 py-1.5 text-meta font-medium text-accent-text">
                  &ldquo;{searchQuery}&rdquo;
                  <button type="button" aria-label="Clear search" onClick={() => setSearchQuery("")}>
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
            </div>
            <div className="ml-auto">
              <SortSelect value={sort} onChange={setSort} />
            </div>
          </div>

          {loading ? <ProductGridSkeleton /> : <ProductGrid products={filtered} />}
        </div>
      </div>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="absolute inset-0 bg-primary/40"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="relative ml-auto flex h-full w-full max-w-xs flex-col gap-6 overflow-y-auto bg-surface p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-primary">Filters</h3>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                aria-label="Close filters"
                className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-bg-alt"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <ShopFilters {...filterProps} />
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(false)}
              className="mt-auto w-full rounded-full bg-accent py-3 text-sm font-semibold text-accent-text"
            >
              Show {filtered.length} results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
