"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Minus, Plus, X, Tag, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCartStore, cartItemKey, COUPON_CODE } from "@/lib/store/cart";
import { useStoreHydrated } from "@/lib/store/use-store-hydrated";
import { useToast } from "@/components/ui/Toast";
import { fadeIn, staggerContainer } from "@/lib/framer-variants";

export default function CartPage() {
  const { addToast } = useToast();
  const hydrated = useStoreHydrated(useCartStore);
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const coupon = useCartStore((state) => state.coupon);
  const applyCoupon = useCartStore((state) => state.applyCoupon);
  const removeCoupon = useCartStore((state) => state.removeCoupon);
  const totalPrice = useCartStore((state) => state.totalPrice());
  const discount = useCartStore((state) => state.discount());
  const shipping = useCartStore((state) => state.shipping());
  const total = useCartStore((state) => state.grandTotal());
  const [code, setCode] = useState("");

  const handleCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (applyCoupon(code)) {
      addToast({
        type: "success",
        title: "Coupon applied",
        description: `${COUPON_CODE} — 10% off your order`,
      });
      setCode("");
    } else {
      addToast({
        type: "error",
        title: "Invalid coupon",
        description: "Check the code and try again.",
      });
    }
  };

  return (
    <div className="pt-20">
      <motion.section
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="py-16 px-6 lg:px-12 max-w-[1440px] mx-auto"
      >
        <p className="font-body text-[10px] tracking-[0.28em] uppercase text-earth mb-4">
          Shopping Cart
        </p>
        <h1 className="font-display text-4xl md:text-5xl font-light">
          Your Cart
        </h1>
      </motion.section>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pb-24">
        {!hydrated ? (
          <div className="h-48" aria-hidden="true" />
        ) : items.length === 0 ? (
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="text-center py-24"
          >
            <p className="font-body text-lg text-text-muted mb-8">
              Your cart is empty
            </p>
            <Link href="/shop">
              <Button variant="primary" size="lg">
                Continue Shopping
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="lg:col-span-2"
            >
              <div className="flex flex-col gap-6">
                {items.map((item) => {
                  const key = cartItemKey(item);
                  return (
                    <motion.div
                      key={key}
                      variants={fadeIn}
                      className="flex gap-6 pb-6 border-b border-sand"
                    >
                      <Link
                        href={`/product/${item.slug}`}
                        className="relative w-24 h-32 sm:w-28 bg-stone flex-shrink-0 overflow-hidden"
                      >
                        {item.images?.[0] && (
                          <img
                            src={item.images[0]}
                            alt={item.name}
                            className="absolute inset-0 w-full h-full object-cover object-top"
                          />
                        )}
                      </Link>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <Link
                            href={`/product/${item.slug}`}
                            className="font-display text-lg font-light hover:text-gold transition-colors"
                          >
                            {item.name}
                          </Link>
                          <p className="font-body text-xs text-text-muted mt-1">
                            {item.category}
                          </p>
                          <div className="flex flex-wrap items-center gap-4 mt-2">
                            {item.selectedSize && (
                              <span className="font-body text-xs text-earth">
                                Size: {item.selectedSize}
                              </span>
                            )}
                            {item.selectedColor && (
                              <span className="font-body text-xs text-earth">
                                Color: {item.selectedColor}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 border border-sand">
                            <button
                              onClick={() =>
                                updateQuantity(key, item.quantity - 1)
                              }
                              aria-label="Decrease quantity"
                              className="p-2 hover:bg-stone transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-body text-sm w-6 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(key, item.quantity + 1)
                              }
                              aria-label="Increase quantity"
                              className="p-2 hover:bg-stone transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <div className="flex items-center gap-6">
                            <span className="font-body text-base">
                              ₹{item.price * item.quantity}
                            </span>
                            <button
                              onClick={() => removeItem(key)}
                              aria-label={`Remove ${item.name}`}
                              className="text-text-muted hover:text-dark transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            <motion.aside
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="lg:col-span-1"
            >
              <div className="bg-warm-white p-8 sticky top-28">
                <h3 className="font-display text-xl font-light mb-6">
                  Order Summary
                </h3>

                <div className="flex flex-col gap-4 pb-6 border-b border-sand">
                  <div className="flex items-center justify-between">
                    <span className="font-body text-sm text-earth">
                      Subtotal
                    </span>
                    <span className="font-body text-sm">₹{totalPrice}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="font-body text-sm text-gold">
                        Discount ({COUPON_CODE})
                      </span>
                      <span className="font-body text-sm text-gold">
                        −₹{discount}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="font-body text-sm text-earth">
                      Shipping
                    </span>
                    <span className="font-body text-sm">
                      {shipping === 0 ? (
                        <span className="text-gold">Free</span>
                      ) : (
                        `₹${shipping}`
                      )}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="font-body text-xs text-text-muted">
                      Free shipping on orders above ₹999
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between py-6 border-b border-sand">
                  <span className="font-body text-base font-medium">Total</span>
                  <span className="font-display text-2xl">₹{total}</span>
                </div>

                <div className="mt-6">
                  {coupon ? (
                    <div className="flex items-center justify-between border border-gold/40 bg-gold/5 px-4 py-3">
                      <span className="flex items-center gap-2 font-body text-xs tracking-wide uppercase text-earth">
                        <Check className="w-4 h-4 text-gold" />
                        {coupon} applied
                      </span>
                      <button
                        onClick={removeCoupon}
                        className="font-body text-xs text-text-muted hover:text-dark transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleCoupon} className="flex gap-2">
                      <input
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Coupon code"
                        aria-label="Coupon code"
                        className="flex-1 min-w-0 bg-transparent border border-sand px-3 py-2 font-body text-sm placeholder:text-text-muted focus:outline-none focus:border-gold transition-colors"
                      />
                      <Button type="submit" variant="secondary" size="sm">
                        <Tag className="w-4 h-4" />
                      </Button>
                    </form>
                  )}
                  {!coupon && (
                    <p className="font-body text-[10px] tracking-wide text-text-muted mt-2">
                      Try {COUPON_CODE} for 10% off
                    </p>
                  )}
                </div>

                <Link
                  href="/checkout"
                  className="block w-full text-center mt-6 bg-dark text-cream font-body text-sm tracking-wide px-6 py-4 hover:bg-earth transition-colors duration-300"
                >
                  Proceed to Checkout
                </Link>

                <Link
                  href="/shop"
                  className="block text-center mt-4 font-body text-xs tracking-[0.15em] uppercase text-earth hover:text-dark transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            </motion.aside>
          </div>
        )}
      </div>
    </div>
  );
}
