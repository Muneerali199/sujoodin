"use client";

import { categories } from "@/lib/data";

interface FilterSidebarProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export function FilterSidebar({
  selectedCategory,
  onCategoryChange,
}: FilterSidebarProps) {
  const priceRanges = [
    { label: "Under ₹500", min: 0, max: 500 },
    { label: "₹500 - ₹1000", min: 500, max: 1000 },
    { label: "₹1000 - ₹2000", min: 1000, max: 2000 },
    { label: "₹2000+", min: 2000, max: Infinity },
  ];

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

      <div className="pt-8 border-t border-sand">
        <h3 className="font-body text-[10px] tracking-[0.25em] uppercase text-earth mb-4">
          Price Range
        </h3>
        <div className="flex flex-col gap-3">
          {priceRanges.map((range) => (
            <button
              key={range.label}
              className="font-body text-sm text-text-muted hover:text-dark transition-colors duration-300 text-left"
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
