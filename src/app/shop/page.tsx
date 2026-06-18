"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Filter, SlidersHorizontal } from "lucide-react";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { FilterSidebar } from "@/components/shop/FilterSidebar";
import { SortDropdown } from "@/components/shop/SortDropdown";
import { products } from "@/lib/data";
import { fadeIn } from "@/lib/framer-variants";

export default function ShopPage() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("featured");

  let filtered = [...products];

  if (selectedCategory) {
    filtered = filtered.filter((p) =>
      p.category.toLowerCase().includes(selectedCategory.toLowerCase())
    );
  }

  if (sortBy === "price-asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-desc") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === "newest") {
    filtered.sort((a, b) => (a.badge === "New" ? -1 : 1));
  }

  return (
    <div className="pt-20">
      <motion.section
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="py-16 px-6 lg:px-12 max-w-[1440px] mx-auto"
      >
        <p className="font-body text-[10px] tracking-[0.28em] uppercase text-earth mb-4">
          Collection
        </p>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light">
          Shop All
        </h1>
        <p className="font-body text-sm text-text-muted mt-4 max-w-lg">
          Discover our complete collection of modest fashion, Islamic home decor,
          and prayer essentials.
        </p>
      </motion.section>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pb-24">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-sand">
          <p className="font-body text-sm text-text-muted">
            {filtered.length} products
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="lg:hidden flex items-center gap-2 font-body text-xs tracking-[0.15em] uppercase text-earth"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
            <SortDropdown value={sortBy} onChange={setSortBy} />
          </div>
        </div>

        <div className="flex gap-12">
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-28">
              <FilterSidebar
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
            </div>
          </aside>

          {filterOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div
                className="absolute inset-0 bg-dark/30"
                onClick={() => setFilterOpen(false)}
              />
              <div className="absolute left-0 top-0 bottom-0 w-80 bg-cream p-6 overflow-y-auto">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-display text-xl font-light">Filters</h3>
                  <button onClick={() => setFilterOpen(false)}>Close</button>
                </div>
                <FilterSidebar
                  selectedCategory={selectedCategory}
                  onCategoryChange={(cat) => {
                    setSelectedCategory(cat);
                    setFilterOpen(false);
                  }}
                />
              </div>
            </div>
          )}

          <div className="flex-1">
            <ProductGrid products={filtered} />
          </div>
        </div>
      </div>
    </div>
  );
}
