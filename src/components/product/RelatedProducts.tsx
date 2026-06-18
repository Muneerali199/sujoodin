"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { products } from "@/lib/data";
import { useCartStore } from "@/lib/store/cart";
import { useWishlistStore } from "@/lib/store/wishlist";
import { SectionHeader } from "@/components/shared/SectionHeader";

interface RelatedProductsProps {
  currentProductId: string;
}

export function RelatedProducts({ currentProductId }: RelatedProductsProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const addItem = useCartStore((state) => state.addItem);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const isWishlisted = useWishlistStore((state) => state.isWishlisted);

  const related = products
    .filter((p) => p.id !== currentProductId)
    .slice(0, 4);

  return (
    <section className="py-24 px-6 lg:px-12 max-w-[1440px] mx-auto border-t border-sand">
      <SectionHeader
        eyebrow="You May Also Like"
        title="Related Products"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {related.map((product) => (
          <div
            key={product.id}
            className="group"
            onMouseEnter={() => setHoveredId(product.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="relative aspect-[4/3] bg-stone overflow-hidden mb-4">
              <div className="absolute inset-0 bg-gradient-to-br from-stone via-sand/40 to-clay/20" />

              {product.badge && (
                <div className="absolute top-3 left-3 z-10">
                  <Badge
                    variant={
                      product.badge === "New"
                        ? "new"
                        : product.badge === "Bestseller"
                        ? "bestseller"
                        : "sale"
                    }
                  >
                    {product.badge}
                  </Badge>
                </div>
              )}

              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleWishlist(product);
                }}
                className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center bg-cream/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-cream"
              >
                <Heart
                  className={`w-4 h-4 ${
                    isWishlisted(product.id)
                      ? "fill-gold text-gold"
                      : "text-earth"
                  }`}
                />
              </button>

              <motion.div
                className="absolute inset-x-0 bottom-0 p-4"
                initial={{ y: "100%" }}
                animate={{ y: hoveredId === product.id ? "0%" : "100%" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <button
                  onClick={() => addItem(product)}
                  className="w-full bg-dark text-cream font-body text-xs tracking-[0.15em] uppercase py-3 flex items-center justify-center gap-2 hover:bg-earth transition-colors duration-300"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Quick Add
                </button>
              </motion.div>
            </div>

            <Link href={`/product/${product.slug}`}>
              <h3 className="font-display text-lg font-light group-hover:text-gold transition-colors duration-300">
                {product.name}
              </h3>
              <p className="font-body text-xs text-text-muted mt-1 tracking-wide">
                {product.category}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="font-body text-sm">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="font-body text-xs text-text-muted line-through">
                    ₹{product.originalPrice}
                  </span>
                )}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
