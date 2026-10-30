"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Heart, ShoppingBag } from "lucide-react";
import { Product } from "@/lib/types/product";
import { useCartStore } from "@/lib/store/cart";
import { useWishlistStore } from "@/lib/store/wishlist";

const badgeStyles: Record<string, string> = {
  New: "bg-forest text-cream",
  Bestseller: "bg-gold text-forest-deep",
  Sale: "bg-earth text-cream",
};

export function ProductCard({ product }: { product: Product }) {
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const isWishlisted = useWishlistStore((state) => state.isWishlisted);

  const handleAdd = (event: React.MouseEvent) => {
    event.preventDefault();
    addItem(product, 1, product.sizes?.[0], product.colors?.[0]?.name);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  };

  return (
    <article className="group">
      <div className="relative aspect-[4/5] bg-stone overflow-hidden">
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
          <span
            className={`absolute top-3 left-3 z-10 font-body text-[9px] tracking-[0.18em] uppercase px-2.5 py-1 ${
              badgeStyles[product.badge] ?? "bg-forest text-cream"
            }`}
          >
            {product.badge}
          </span>
        )}

        <button
          onClick={() => toggleWishlist(product)}
          aria-label={
            isWishlisted(product.id)
              ? `Remove ${product.name} from wishlist`
              : `Save ${product.name} to wishlist`
          }
          className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center bg-cream/90 text-earth hover:bg-cream transition-colors"
        >
          <Heart
            size={16}
            className={isWishlisted(product.id) ? "fill-gold text-gold" : ""}
          />
        </button>

        <div className="absolute inset-x-0 bottom-0 p-3 z-10 translate-y-full transition-transform duration-300 group-hover:translate-y-0 focus-within:translate-y-0 max-md:translate-y-0">
          <button
            onClick={handleAdd}
            className="w-full bg-forest text-cream font-body text-[10px] tracking-[0.18em] uppercase py-3 flex items-center justify-center gap-2 hover:bg-forest-deep transition-colors"
          >
            {added ? (
              <>
                <Check size={14} /> Added
              </>
            ) : (
              <>
                <ShoppingBag size={14} /> Quick add
              </>
            )}
          </button>
        </div>
      </div>

      <div className="pt-4">
        <p className="font-body text-[9px] tracking-[0.16em] uppercase text-text-muted">
          {product.category}
        </p>
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-display text-lg font-light leading-snug mt-1 group-hover:text-gold transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2 mt-2">
          <span className="font-body text-sm text-dark">₹{product.price}</span>
          {product.originalPrice && (
            <span className="font-body text-xs text-text-muted line-through">
              ₹{product.originalPrice}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
