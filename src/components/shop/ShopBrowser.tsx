"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Filter, Search, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { FilterSidebar } from "@/components/shop/FilterSidebar";
import { SortDropdown } from "@/components/shop/SortDropdown";
import { Product } from "@/lib/types/product";

type SortValue = "featured" | "newest" | "price-asc" | "price-desc";

const priceBounds: Record<string, [number, number]> = {
  "under-500": [0, 500],
  "500-1000": [500, 1000],
  "1000-2000": [1000, 2000],
  "over-2000": [2000, Infinity],
};

interface ShopBrowserProps {
  products: Product[];
  activeCategory?: string | null;
  showFilters?: boolean;
  initialSearch?: string;
  initialSort?: SortValue;
}

export function ShopBrowser({
  products,
  activeCategory = null,
  showFilters = true,
  initialSearch = "",
  initialSort = "featured",
}: ShopBrowserProps) {
  const router = useRouter();
  const [category, setCategory] = useState<string | null>(activeCategory);
  const [priceRange, setPriceRange] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortValue>(initialSort);
  const [filterOpen, setFilterOpen] = useState(false);
  const [search, setSearch] = useState(initialSearch);


  const filtered = useMemo(() => {
    let list = [...products];

    if (category) {
      list = list.filter(
        (p) => p.category.toLowerCase().replace(/\s+/g, "-") === category
      );
    }

    if (search.trim()) {
      const term = search.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.category.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term)
      );
    }

    if (priceRange && priceBounds[priceRange]) {
      const [min, max] = priceBounds[priceRange];
      list = list.filter((p) => p.price >= min && p.price < max);
    }

    switch (sortBy) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        list.sort(
          (a, b) =>
            new Date(b.createdAt ?? 0).getTime() -
            new Date(a.createdAt ?? 0).getTime()
        );
        break;
      default:
        list.sort((a, b) => Number(b.featured) - Number(a.featured));
    }

    return list;
  }, [products, category, priceRange, sortBy, search]);

  const handleCategoryChange = (slug: string | null) => {
    setCategory(slug);
    setFilterOpen(false);
    if (slug) {
      router.push(`/shop/${slug}`);
    } else {
      router.push("/shop");
    }
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const value = search.trim();
    router.push(value ? `/shop?q=${encodeURIComponent(value)}` : "/shop");
  };

  const sidebar = (
    <FilterSidebar
      selectedCategory={category}
      onCategoryChange={handleCategoryChange}
      selectedPriceRange={priceRange}
      onPriceRangeChange={setPriceRange}
    />
  );

  return (
    <>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pb-24">
        <form
          onSubmit={handleSearchSubmit}
          role="search"
          className="mb-8 flex max-w-2xl items-center border border-sand bg-warm-white"
        >
          <Search size={17} className="ml-4 shrink-0 text-earth" />
          <label htmlFor="shop-search" className="sr-only">
            Search products
          </label>
          <input
            id="shop-search"
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search products, categories, or gifts"
            className="scroll-mt-24 min-w-0 flex-1 bg-transparent px-3 py-3.5 font-body text-sm outline-none placeholder:text-text-muted"
          />
          <button
            type="submit"
            className="self-stretch bg-forest px-5 font-body text-[10px] tracking-[0.16em] uppercase text-cream hover:bg-forest-deep transition-colors"
          >
            Search
          </button>
        </form>

        <div className="flex items-center justify-between mb-8 pb-4 border-b border-sand">
          <p className="font-body text-sm text-text-muted">
            {filtered.length}{" "}
            {filtered.length === 1 ? "product" : "products"}
            {(category || priceRange || search.trim()) && (
              <span className="text-sand"> of {products.length}</span>
            )}
          </p>
          <div className="flex items-center gap-4 sm:gap-5">
            {search.trim() && (
              <button
                onClick={() => {
                  setSearch("");
                  router.replace("/shop");
                }}
                className="flex items-center gap-1.5 font-body text-[10px] tracking-[0.12em] uppercase text-earth border border-sand px-2.5 py-1.5 hover:border-gold hover:text-gold transition-colors"
              >
                “{search.trim()}”
                <X size={12} />
              </button>
            )}
            {showFilters && (
              <button
                onClick={() => setFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 font-body text-xs tracking-[0.15em] uppercase text-earth"
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>
            )}
            <SortDropdown
              value={sortBy}
              onChange={(v) => setSortBy(v as SortValue)}
            />
          </div>
        </div>

        <div className="flex gap-12">
          {showFilters && (
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-28">{sidebar}</div>
            </aside>
          )}

          <div className="flex-1">
            <ProductGrid products={filtered} />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {filterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setFilterOpen(false)}
              className="absolute inset-0 bg-dark/40"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 240 }}
              className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-cream p-6 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-display text-xl font-light">Filters</h3>
                <button
                  onClick={() => setFilterOpen(false)}
                  aria-label="Close filters"
                  className="text-earth hover:text-dark transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              {sidebar}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
