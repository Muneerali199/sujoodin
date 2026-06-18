"use client";

import { motion } from "framer-motion";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { FilterSidebar } from "@/components/shop/FilterSidebar";
import { SortDropdown } from "@/components/shop/SortDropdown";
import { products } from "@/lib/data";
import { fadeIn } from "@/lib/framer-variants";

export default function CategoryPage({ params }: { params: { category: string } }) {
  const categorySlug = params.category;
  const categoryProducts = products.filter((p) =>
    p.category.toLowerCase().replace(/\s+/g, "-") === categorySlug
  );

  const categoryName = categoryProducts[0]?.category || categorySlug;

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
          {categoryName}
        </h1>
        <p className="font-body text-sm text-text-muted mt-4">
          {categoryProducts.length} products
        </p>
      </motion.section>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pb-24">
        <ProductGrid products={categoryProducts} />
      </div>
    </div>
  );
}
