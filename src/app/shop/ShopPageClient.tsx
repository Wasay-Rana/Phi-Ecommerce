"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import { products } from "@/data/products";
import { ProductCategory } from "@/types/product";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ProductGridSkeleton } from "@/components/product/ProductGridSkeleton";
import { ShopFilters, PRICE_MAX } from "@/components/shop/ShopFilters";
import { SortSelect, SortOption } from "@/components/shop/SortSelect";

export function ShopPageClient() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") as ProductCategory | null;

  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<ProductCategory[]>(
    initialCategory ? [initialCategory] : []
  );
  const [maxPrice, setMaxPrice] = useState(PRICE_MAX);
  const [sort, setSort] = useState<SortOption>("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  function toggleCategory(category: ProductCategory) {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  }

  function resetFilters() {
    setSelectedCategories([]);
    setMaxPrice(PRICE_MAX);
  }

  const filtered = useMemo(() => {
    let list = products.filter((p) => p.price <= maxPrice);
    if (selectedCategories.length > 0) {
      list = list.filter((p) => selectedCategories.includes(p.category));
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
  }, [selectedCategories, maxPrice, sort]);

  const filterProps = {
    selectedCategories,
    onToggleCategory: toggleCategory,
    maxPrice,
    onMaxPriceChange: setMaxPrice,
    onReset: resetFilters,
  };

  return (
    <div className="container-page py-10">
      <div className="mb-8 flex flex-col gap-2">
        <h1 className="text-section text-primary sm:text-section-lg">Shop all products</h1>
        <p className="text-secondary">{filtered.length} products</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
        <div className="hidden lg:block">
          <ShopFilters {...filterProps} />
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(true)}
              className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-primary lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </button>
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
