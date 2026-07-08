"use client";

import { ProductCategory } from "@/types/product";
import { categoryLabels } from "@/data/products";
import { formatPrice } from "@/lib/utils";

const categories = Object.keys(categoryLabels) as ProductCategory[];

export const PRICE_MAX = 12000;

interface ShopFiltersProps {
  selectedCategories: ProductCategory[];
  onToggleCategory: (category: ProductCategory) => void;
  maxPrice: number;
  onMaxPriceChange: (value: number) => void;
  onReset: () => void;
}

export function ShopFilters({
  selectedCategories,
  onToggleCategory,
  maxPrice,
  onMaxPriceChange,
  onReset,
}: ShopFiltersProps) {
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

      <div className="flex flex-col gap-3">
        <h4 className="text-sm font-semibold text-primary">Category</h4>
        {categories.map((category) => (
          <label key={category} className="flex items-center gap-2 text-sm text-secondary">
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => onToggleCategory(category)}
              className="h-4 w-4 rounded border-border accent-[color:var(--color-accent)]"
            />
            {categoryLabels[category]}
          </label>
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
          className="w-full accent-[color:var(--color-accent)]"
        />
        <span className="text-sm text-secondary">Up to {formatPrice(maxPrice)}</span>
      </div>
    </aside>
  );
}
