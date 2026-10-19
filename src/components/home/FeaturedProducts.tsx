"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Plus, Sparkles } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { Product } from "@/lib/types/product";
import { useCartStore } from "@/lib/store/cart";
import { useWishlistStore } from "@/lib/store/wishlist";
import { TiltCard } from "@/components/ui/TiltCard";
import { fadeInUp, staggerContainer } from "@/lib/framer-variants";

export function FeaturedProducts({
  products = [],
}: {
  products?: Product[];
}) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [addedToCart, setAddedToCart] = useState<string | null>(null);
  const addItem = useCartStore((state) => state.addItem);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const isWishlisted = useWishlistStore((state) => state.isWishlisted);

  const featuredProducts = products;

  const handleAddItem = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    setAddedToCart(product.id);
    addItem(product);
    setTimeout(() => setAddedToCart(null), 1200);
  };

  return (
    <section className="py-24 lg:py-32 px-6 lg:px-12 max-w-[1440px] mx-auto">
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="mb-12"
      >
        <SectionHeader
          eyebrow="New Arrivals"
          title="Featured Products"
          subtitle="Handpicked pieces that embody our commitment to quality and faith."
          link={{ label: "Shop All", href: "/shop" }}
        />
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
      >
        {featuredProducts.map((product) => (
          <TiltCard
            key={product.id}
            className="group cursor-pointer"
            intensity={8}
          >
            <div className="relative aspect-[3/4] bg-stone overflow-hidden mb-4">
              {product.images && product.images[0] && (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-dark/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />

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
                className="absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center bg-cream/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-cream shadow-lg"
              >
                <Heart
                  className={`w-5 h-5 transition-all duration-200 ${
                    isWishlisted(product.id)
                      ? "fill-gold text-gold scale-110"
                      : "text-earth"
                  }`}
                />
              </button>

              <motion.div
                className="absolute inset-x-0 bottom-0 p-4 rounded-b-2xl"
                initial={{ y: "100%" }}
                animate={{ y: hoveredId === product.id ? "0%" : "100%" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <button
                  onClick={(e) => handleAddItem(e, product)}
                  className="w-full bg-dark text-cream font-body text-xs tracking-[0.15em] uppercase py-3 flex items-center justify-center gap-2 hover:bg-earth transition-colors duration-300 shadow-lg"
                >
                  {addedToCart === product.id ? (
                    <>
                      <Plus className="w-4 h-4" />
                      Added
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      Quick Add
                    </>
                  )}
                </button>
              </motion.div>

              <div className="absolute inset-0 flex items-end justify-between p-4 pointer-events-none">
                <div className="flex gap-2">
                  {product.colors?.slice(0, 3).map((color) => (
                    <div
                      key={color.name}
                      className="w-2 h-2 rounded-full border border-cream/50"
                      style={{ backgroundColor: color.hex }}
                    />
                  ))}
                </div>
              </div>
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
          </TiltCard>
        ))}
      </motion.div>
    </section>
  );
}
