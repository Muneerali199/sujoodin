"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/store/cart";
import { Button } from "@/components/ui/Button";
import { cartDrawer } from "@/lib/framer-variants";
import Link from "next/link";
import { useToast } from "@/components/ui/Toast";

export function CartDrawer() {
  const { addToast } = useToast();
  const isOpen = useCartStore((state) => state.isOpen);
  const closeCart = useCartStore((state) => state.closeCart);
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const totalPrice = useCartStore((state) => state.totalPrice());

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-dark/30 backdrop-blur-sm z-[55]"
          />
          <motion.div
            variants={cartDrawer}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-cream z-[60] flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-sand">
              <h2 className="font-display text-2xl font-light">Your Cart</h2>
              <button onClick={closeCart} aria-label="Close cart">
                <X className="w-5 h-5 text-earth" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-6 px-6">
                <ShoppingBag className="w-12 h-12 text-sand" />
                <p className="font-body text-sm text-text-muted text-center">
                  Your cart is empty
                </p>
                <Link href="/shop" onClick={closeCart}>
                  <Button variant="primary">Continue Shopping</Button>
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-4">
                  <div className="flex flex-col gap-6">
                    {items.map((item) => (
                      <div
                        key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                        className="flex gap-4 pb-6 border-b border-sand/50"
                      >
                        <div className="w-20 h-24 bg-stone flex-shrink-0" />
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="font-display text-base font-light">
                              {item.name}
                            </h3>
                            <p className="font-body text-xs text-text-muted mt-1">
                              {item.category}
                            </p>
                            {item.selectedSize && (
                              <p className="font-body text-xs text-earth mt-1">
                                Size: {item.selectedSize}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 border border-sand">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className="p-1.5 hover:bg-stone transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="font-body text-xs w-6 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="p-1.5 hover:bg-stone transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="font-body text-sm">
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
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-sand p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-body text-sm text-earth">Subtotal</span>
                    <span className="font-body text-lg">₹{totalPrice}</span>
                  </div>
                  <p className="font-body text-xs text-text-muted mb-6">
                    Shipping calculated at checkout
                  </p>
                  <Link href="/cart" onClick={closeCart} className="block">
                  <Button
                    variant="primary"
                    className="w-full"
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
                  </Link>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
