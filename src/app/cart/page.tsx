"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Minus, Plus, X, Tag } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useCartStore } from "@/lib/store/cart";
import { useToast } from "@/components/ui/Toast";
import { fadeIn, staggerContainer } from "@/lib/framer-variants";

export default function CartPage() {
  const { addToast } = useToast();
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const totalPrice = useCartStore((state) => state.totalPrice());
  const shipping = totalPrice >= 999 ? 0 : 99;
  const total = totalPrice + shipping;

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
        {items.length === 0 ? (
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
                {items.map((item) => (
                  <motion.div
                    key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                    variants={fadeIn}
                    className="flex gap-6 pb-6 border-b border-sand"
                  >
                    <div className="w-28 h-32 bg-stone flex-shrink-0" />
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
                        <div className="flex items-center gap-4 mt-2">
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
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="p-2 hover:bg-stone transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-body text-sm w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
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
                            onClick={() => removeItem(item.id)}
                            className="text-text-muted hover:text-dark transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
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
                  <div className="flex gap-2">
                    <Input placeholder="Coupon code" className="flex-1" />
                    <Button variant="secondary" size="sm">
                      <Tag className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  className="w-full mt-6"
                  onClick={() =>
                    addToast({
                      type: "info",
                      title: "Checkout coming soon",
                      description:
                        "We're working on integrating secure payments. Stay tuned!",
                    })
                  }
                >
                  Proceed to Checkout
                </Button>

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
