import { getProducts, getProductsByCategory } from "@/lib/server-data";
import { Filter } from "lucide-react";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { FilterSidebar } from "@/components/shop/FilterSidebar";
import { SortDropdown } from "@/components/shop/SortDropdown";
import { categories } from "@/lib/data";
import { notFound } from "next/navigation";

export default async function ShopCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categorySlug } = await params;

  const products =
    categorySlug === "all"
      ? await getProducts()
      : await getProductsByCategory(categorySlug);

  const category = categories.find((c) => c.slug === categorySlug);
  if (categorySlug !== "all" && !category) {
    notFound();
  }

  return (
    <div className="pt-20">
      <section className="py-16 px-6 lg:px-12 max-w-[1440px] mx-auto">
        <p className="font-body text-[10px] tracking-[0.28em] uppercase text-earth mb-4">
          Collection
        </p>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light">
          {category ? category.name : "Shop All"}
        </h1>
        <p className="font-body text-sm text-text-muted mt-4 max-w-lg">
          Discover our complete collection of modest fashion, Islamic home decor,
          and prayer essentials.
        </p>
      </section>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pb-24">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-sand">
          <p className="font-body text-sm text-text-muted">
            {products.length} products
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => {}}
              className="lg:hidden flex items-center gap-2 font-body text-xs tracking-[0.15em] uppercase text-earth"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
            <SortDropdown value="featured" onChange={() => {}} />
          </div>
        </div>

        <div className="flex gap-12">
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-28">
              <FilterSidebar
                selectedCategory={categorySlug === "all" ? null : categorySlug}
                onCategoryChange={() => {}}
              />
            </div>
          </aside>

          <div className="flex-1">
            <ProductGrid products={products} />
          </div>
        </div>
      </div>
    </div>
  );
}
