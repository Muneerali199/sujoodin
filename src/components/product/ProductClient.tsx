"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Minus, Plus, Truck, RotateCcw, Shield } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProductGallery } from "@/components/product/ProductGallery";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { Product } from "@/lib/types/product";
import { useCartStore } from "@/lib/store/cart";
import { useWishlistStore } from "@/lib/store/wishlist";
import { fadeIn, staggerContainer } from "@/lib/framer-variants";

interface ProductClientProps {
  product: Product;
  related: Product[];
}

export default function ProductClient({
  product,
  related,
}: ProductClientProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    undefined
  );
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    undefined
  );
  const [activeTab, setActiveTab] = useState("description");
  const addItem = useCartStore((state) => state.addItem);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const isWishlisted = useWishlistStore((state) => state.isWishlisted);

  const effectiveSize =
    selectedSize && product.sizes?.includes(selectedSize)
      ? selectedSize
      : product.sizes?.[0];
  const effectiveColor =
    selectedColor && product.colors?.some((c) => c.name === selectedColor)
      ? selectedColor
      : product.colors?.[0]?.name;

  const tabs = [
    { id: "description", label: "Description" },
    { id: "care", label: "Care Instructions" },
    { id: "shipping", label: "Shipping & Returns" },
  ];

  return (
    <div className="pt-20">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="max-w-[1440px] mx-auto px-6 lg:px-12 py-12 lg:py-16"
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <motion.div variants={fadeIn}>
            <ProductGallery images={product.images} name={product.name} />
          </motion.div>

          <motion.div variants={fadeIn} className="lg:pt-8">
            {product.badge && (
              <Badge
                variant={
                  product.badge === "New"
                    ? "new"
                    : product.badge === "Bestseller"
                    ? "bestseller"
                    : "sale"
                }
                className="mb-4"
              >
                {product.badge}
              </Badge>
            )}

            <p className="font-body text-xs tracking-[0.15em] uppercase text-earth mb-2">
              {product.category}
            </p>

            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-light">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mt-4">
              <span className="font-body text-2xl">₹{product.price}</span>
              {product.originalPrice && (
                <span className="font-body text-lg text-text-muted line-through">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>

            <p className="font-body text-sm text-text-muted mt-6 leading-relaxed">
              {product.description}
            </p>

            {product.colors && product.colors.length > 0 && (
              <div className="mt-8">
                <p className="font-body text-xs tracking-[0.15em] uppercase text-earth mb-3">
                  Color
                </p>
                <div className="flex items-center gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-8 h-8 rounded-full border-2 transition-all duration-300 ${
                        effectiveColor === color.name
                          ? "border-gold scale-110"
                          : "border-sand"
                      }`}
                      style={{ backgroundColor: color.hex }}
                      aria-label={color.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {product.sizes && product.sizes.length > 0 && (
              <div className="mt-8">
                <div className="flex items-center justify-between mb-3">
                  <p className="font-body text-xs tracking-[0.15em] uppercase text-earth">
                    Size
                  </p>
                  <Link
                    href="/size-guide"
                    className="font-body text-[10px] tracking-[0.15em] uppercase text-text-muted underline underline-offset-4 hover:text-dark transition-colors"
                  >
                    Size guide
                  </Link>
                </div>
                <div className="flex items-center gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 font-body text-xs border transition-all duration-300 ${
                        effectiveSize === size
                          ? "border-dark bg-dark text-cream"
                          : "border-sand text-dark hover:border-dark"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8">
              <p className="font-body text-xs tracking-[0.15em] uppercase text-earth mb-3">
                Quantity
              </p>
              <div className="flex items-center gap-4 border border-sand w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                  className="p-3 hover:bg-stone transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-body text-sm w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Increase quantity"
                  className="p-3 hover:bg-stone transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <Button
                variant="primary"
                size="lg"
                className="flex-1"
                disabled={!product.inStock}
                onClick={() =>
                  addItem(product, quantity, effectiveSize, effectiveColor)
                }
              >
                {product.inStock ? "Add to Cart" : "Sold Out"}
              </Button>
              <Button
                variant="secondary"
                size="lg"
                aria-label={
                  isWishlisted(product.id)
                    ? "Remove from wishlist"
                    : "Save to wishlist"
                }
                onClick={() => toggleWishlist(product)}
              >
                <Heart
                  className={`w-5 h-5 ${
                    isWishlisted(product.id) ? "fill-gold text-gold" : ""
                  }`}
                />
              </Button>
            </div>

            <div className="mt-8 pt-8 border-t border-sand grid grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center gap-2">
                <Truck className="w-5 h-5 text-earth" />
                <p className="font-body text-xs text-text-muted">
                  Free Shipping
                </p>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <RotateCcw className="w-5 h-5 text-earth" />
                <p className="font-body text-xs text-text-muted">
                  Easy Returns
                </p>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <Shield className="w-5 h-5 text-earth" />
                <p className="font-body text-xs text-text-muted">
                  Secure Payment
                </p>
              </div>
            </div>

            <div className="mt-8">
              <div className="flex gap-6 border-b border-sand">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`font-body text-xs tracking-[0.15em] uppercase pb-3 border-b-2 transition-colors duration-300 ${
                      activeTab === tab.id
                        ? "border-dark text-dark"
                        : "border-transparent text-text-muted hover:text-dark"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <div className="py-6">
                {activeTab === "description" && (
                  <p className="font-body text-sm text-text-muted leading-relaxed">
                    {product.description}
                  </p>
                )}
                {activeTab === "care" && (
                  <ul className="font-body text-sm text-text-muted leading-relaxed space-y-2">
                    <li>• Hand wash or gentle machine wash in cold water</li>
                    <li>• Do not bleach</li>
                    <li>• Iron on low heat if needed</li>
                    <li>• Store in a cool, dry place</li>
                  </ul>
                )}
                {activeTab === "shipping" && (
                  <div className="font-body text-sm text-text-muted leading-relaxed space-y-2">
                    <p>• Free shipping on orders above ₹999</p>
                    <p>• Standard delivery: 5-7 business days</p>
                    <p>• Express delivery: 2-3 business days (₹99)</p>
                    <p>• Easy 7-day return policy</p>
                    <Link
                      href="/shipping-returns"
                      className="inline-block mt-2 text-dark underline underline-offset-4 hover:text-gold transition-colors"
                    >
                      Read the full policy
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <RelatedProducts products={related} currentProductId={product.id} />
    </div>
  );
}
