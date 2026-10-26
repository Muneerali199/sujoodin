"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Check } from "lucide-react";
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
  const [addedToCart, setAddedToCart] = useState<string | null>(null);
  const addItem = useCartStore((state) => state.addItem);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const isWishlisted = useWishlistStore((state) => state.isWishlisted);

  const handleAddItem = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    setAddedToCart(product.id);
    addItem(
      product,
      1,
      product.sizes?.[0],
      product.colors?.[0]?.name
    );
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
        {products.map((product) => (
          <TiltCard key={product.id} className="group">
            <div className="relative aspect-[3/4] bg-stone overflow-hidden mb-4">
              <Link
                href={`/product/${product.slug}`}
                aria-label={`View ${product.name}`}
                className="absolute inset-0 z-[1]"
              />
              {product.images?.[0] && (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
              )}

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
                onClick={() => toggleWishlist(product)}
                aria-label={
                  isWishlisted(product.id)
                    ? `Remove ${product.name} from wishlist`
                    : `Save ${product.name} to wishlist`
                }
                className="absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center bg-cream/85 text-earth opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-all duration-300 hover:bg-cream"
              >
                <Heart
                  className={`w-5 h-5 transition-all duration-200 ${
                    isWishlisted(product.id)
                      ? "fill-gold text-gold"
                      : ""
                  }`}
                />
              </button>

              <div className="absolute inset-x-0 bottom-0 p-4 z-10 translate-y-full transition-transform duration-300 group-hover:translate-y-0 focus-within:translate-y-0 max-md:translate-y-0">
                <button
                  onClick={(e) => handleAddItem(e, product)}
                  className="w-full bg-dark text-cream font-body text-xs tracking-[0.15em] uppercase py-3 flex items-center justify-center gap-2 hover:bg-earth transition-colors duration-300"
                >
                  {addedToCart === product.id ? (
                    <>
                      <Check className="w-4 h-4" />
                      Added
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      Quick Add
                    </>
                  )}
                </button>
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
