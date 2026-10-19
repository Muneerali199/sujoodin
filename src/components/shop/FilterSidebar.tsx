"use client";

import { categories } from "@/lib/data";

interface FilterSidebarProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  selectedPriceRange?: string | null;
  onPriceRangeChange?: (range: string | null) => void;
}

const priceRanges = [
  { id: "under-500", label: "Under ₹500" },
  { id: "500-1000", label: "₹500 – ₹1000" },
  { id: "1000-2000", label: "₹1000 – ₹2000" },
  { id: "over-2000", label: "₹2000 and above" },
];

export function FilterSidebar({
  selectedCategory,
  onCategoryChange,
  selectedPriceRange = null,
  onPriceRangeChange,
}: FilterSidebarProps) {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="font-body text-[10px] tracking-[0.25em] uppercase text-earth mb-4">
          Category
        </h3>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => onCategoryChange(null)}
            className={`font-body text-sm text-left transition-colors duration-300 ${
              selectedCategory === null
                ? "text-dark font-medium"
                : "text-text-muted hover:text-dark"
            }`}
          >
            All Products
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.slug)}
              className={`font-body text-sm text-left transition-colors duration-300 ${
                selectedCategory === category.slug
                  ? "text-dark font-medium"
                  : "text-text-muted hover:text-dark"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {onPriceRangeChange && (
        <div className="pt-8 border-t border-sand">
          <h3 className="font-body text-[10px] tracking-[0.25em] uppercase text-earth mb-4">
            Price Range
          </h3>
          <div className="flex flex-col gap-3">
            {priceRanges.map((range) => (
              <button
                key={range.id}
                onClick={() =>
                  onPriceRangeChange(
                    selectedPriceRange === range.id ? null : range.id
                  )
                }
                className={`font-body text-sm text-left transition-colors duration-300 ${
                  selectedPriceRange === range.id
                    ? "text-dark font-medium"
                    : "text-text-muted hover:text-dark"
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
