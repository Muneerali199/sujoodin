"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useCartStore } from "@/lib/store/cart";
import { useWishlistStore } from "@/lib/store/wishlist";
import { useStoreHydrated } from "@/lib/store/use-store-hydrated";
import { fadeInUp, staggerContainer } from "@/lib/framer-variants";

export default function WishlistPage() {
  const items = useWishlistStore((state) => state.items);
  const removeItem = useWishlistStore((state) => state.removeItem);
  const addItem = useCartStore((state) => state.addItem);
  const hydrated = useStoreHydrated(useWishlistStore);

  if (!hydrated) {
    return <div className="pt-20 min-h-[70vh]" aria-hidden="true" />;
  }

  if (items.length === 0) {
    return (
      <div className="pt-20 min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Heart className="w-11 h-11 text-sand mx-auto mb-6" />
          <h1 className="font-display text-4xl md:text-5xl font-light mb-4">
            Your wishlist is empty
          </h1>
          <p className="font-body text-sm text-text-muted max-w-sm mb-10 leading-relaxed">
            Tap the heart on any piece you love and it will be waiting here for
            you.
          </p>
          <Link href="/shop">
            <Button variant="primary" size="lg">
              Explore the collection
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <section className="py-16 lg:py-20 px-6 lg:px-12 max-w-[1440px] mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={fadeInUp}
            className="font-body text-[10px] tracking-[0.28em] uppercase text-earth mb-4"
          >
            Saved for later
          </motion.p>
          <motion.h1
            variants={fadeInUp}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-light"
          >
            Wishlist
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="font-body text-sm text-text-muted mt-4"
          >
            {items.length} {items.length === 1 ? "piece" : "pieces"} saved
          </motion.p>
        </motion.div>
      </section>

      <section className="pb-24 px-6 lg:px-12 max-w-[1440px] mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {items.map((product) => (
            <motion.div key={product.id} variants={fadeInUp} className="group">
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
                  onClick={() => removeItem(product.id)}
                  aria-label={`Remove ${product.name} from wishlist`}
                  className="absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center bg-cream/85 backdrop-blur-sm text-dark transition-opacity duration-300 hover:bg-cream"
                >
                  <X size={15} />
                </button>

                <div className="absolute inset-x-0 bottom-0 p-4 z-10">
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full"
                    onClick={() =>
                      addItem(
                        product,
                        1,
                        product.sizes?.[0],
                        product.colors?.[0]?.name
                      )
                    }
                  >
                    <ShoppingBag size={14} className="mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>

              <Link href={`/product/${product.slug}`}>
                <h2 className="font-display text-lg font-light group-hover:text-gold transition-colors duration-300">
                  {product.name}
                </h2>
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
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="mt-14 pt-8 border-t border-sand flex flex-wrap items-center justify-between gap-5"
        >
          <Link
            href="/shop"
            className="font-body text-xs tracking-[0.15em] uppercase text-earth hover:text-dark transition-colors inline-flex items-center gap-2 group"
          >
            Continue shopping
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
          <Link
            href="/cart"
            className="font-body text-xs tracking-[0.15em] uppercase text-dark hover:text-gold transition-colors"
          >
            Go to cart
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
