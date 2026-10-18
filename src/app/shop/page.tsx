"use client";

import { useEffect, useState } from "react";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { FilterSidebar } from "@/components/shop/FilterSidebar";
import { SortDropdown } from "@/components/shop/SortDropdown";
import { Product } from "@/lib/types/product";

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => {
        setProducts(data.success ? data.products : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="pt-20">
      {loading ? (
        <section className="py-16 px-6 lg:px-12 max-w-[1440px] mx-auto text-center">
          <p className="font-body text-[10px] tracking-[0.28em] uppercase text-earth mb-4">
            Collection
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light">
            Shop All
          </h1>
        </section>
      ) : (
        <>
          <section className="py-16 px-6 lg:px-12 max-w-[1440px] mx-auto">
            <p className="font-body text-[10px] tracking-[0.28em] uppercase text-earth mb-4">
              Collection
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light">
              Shop All
            </h1>
            <p className="font-body text-sm text-text-muted mt-4 max-w-lg">
              Discover our complete collection of modest fashion, Islamic home
              decor, and prayer essentials.
            </p>
          </section>

          <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pb-24">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-sand">
              <p className="font-body text-sm text-text-muted">
                {products.length} products
              </p>
              <div className="flex items-center gap-4">
                <SortDropdown value="featured" onChange={() => {}} />
              </div>
            </div>

            <div className="flex gap-12">
              <aside className="hidden lg:block w-64 flex-shrink-0">
                <div className="sticky top-28">
                  <FilterSidebar selectedCategory={null} onCategoryChange={() => {}} />
                </div>
              </aside>

              <div className="flex-1">
                <ProductGrid products={products} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
