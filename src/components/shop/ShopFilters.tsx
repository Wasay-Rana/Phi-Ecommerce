"use client";

import { Niche, ProductCategory } from "@/types/product";
import { categoriesByNiche, categoryLabels, niches } from "@/data/taxonomy";
import { formatPrice } from "@/lib/utils";

export const PRICE_MAX = 12000;

interface ShopFiltersProps {
  activeNiche: Niche | "all";
  selectedCategories: ProductCategory[];
  onToggleCategory: (category: ProductCategory) => void;
  maxPrice: number;
  onMaxPriceChange: (value: number) => void;
  onReset: () => void;
}

export function ShopFilters({
  activeNiche,
  selectedCategories,
  onToggleCategory,
  maxPrice,
  onMaxPriceChange,
  onReset,
}: ShopFiltersProps) {
  const nicheGroups = activeNiche === "all" ? niches : niches.filter((n) => n.id === activeNiche);

  return (
    <aside className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-primary">Filters</h3>
        <button
          type="button"
          onClick={onReset}
          className="text-meta font-medium text-secondary hover:text-primary"
        >
          Reset
        </button>
      </div>

      <div className="flex flex-col gap-5">
        {nicheGroups.map((niche) => (
          <div key={niche.id} className="flex flex-col gap-3">
            <h4 className="text-meta font-semibold uppercase tracking-wide text-secondary">
              {niche.label}
            </h4>
            {categoriesByNiche[niche.id].map((category) => (
              <label key={category} className="flex items-center gap-2 text-sm text-secondary">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => onToggleCategory(category)}
                  className="h-4 w-4 rounded-sm border-border accent-accent"
                />
                {categoryLabels[category]}
              </label>
            ))}
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <h4 className="text-sm font-semibold text-primary">Max price</h4>
        <input
          type="range"
          min={500}
          max={PRICE_MAX}
          step={100}
          value={maxPrice}
          onChange={(e) => onMaxPriceChange(Number(e.target.value))}
          className="w-full accent-accent"
        />
        <span className="text-sm text-secondary">Up to {formatPrice(maxPrice)}</span>
      </div>
    </aside>
  );
}
