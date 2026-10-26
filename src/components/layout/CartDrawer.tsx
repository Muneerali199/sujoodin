"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { cartItemKey, useCartStore } from "@/lib/store/cart";
import { Button } from "@/components/ui/Button";
import { cartDrawer } from "@/lib/framer-variants";
import Link from "next/link";

export function CartDrawer() {
  const isOpen = useCartStore((state) => state.isOpen);
  const closeCart = useCartStore((state) => state.closeCart);
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const totalPrice = useCartStore((state) => state.totalPrice());
  const discount = useCartStore((state) => state.discount());
  const shipping = useCartStore((state) => state.shipping());
  const grandTotal = useCartStore((state) => state.grandTotal());

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-dark/30 z-[55]"
          />
          <motion.div
            variants={cartDrawer}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-cream z-[60] flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between p-6 border-b border-sand">
              <h2 className="font-display text-2xl font-light">Your Cart</h2>
              <button
                onClick={closeCart}
                aria-label="Close cart"
                className="text-earth hover:text-dark transition-colors"
              >
                <X className="w-5 h-5" />
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
                    {items.map((item) => {
                      const key = cartItemKey(item);
                      return (
                        <div
                          key={key}
                          className="flex gap-4 pb-6 border-b border-sand/50"
                        >
                          <Link
                            href={`/product/${item.slug}`}
                            onClick={closeCart}
                            className="relative w-20 h-24 bg-stone flex-shrink-0 overflow-hidden"
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
                                onClick={closeCart}
                                className="font-display text-base font-light hover:text-gold transition-colors"
                              >
                                {item.name}
                              </Link>
                              <p className="font-body text-xs text-text-muted mt-1">
                                {item.category}
                              </p>
                              <div className="flex flex-wrap gap-3 mt-1">
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
                              <div className="flex items-center gap-3 border border-sand">
                                <button
                                  onClick={() =>
                                    updateQuantity(key, item.quantity - 1)
                                  }
                                  aria-label="Decrease quantity"
                                  className="p-1.5 hover:bg-stone transition-colors"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="font-body text-xs w-6 text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    updateQuantity(key, item.quantity + 1)
                                  }
                                  aria-label="Increase quantity"
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
                                  onClick={() => removeItem(key)}
                                  aria-label={`Remove ${item.name}`}
                                  className="text-text-muted hover:text-dark transition-colors"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="border-t border-sand p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-body text-sm text-earth">Subtotal</span>
                    <span className="font-body text-sm">₹{totalPrice}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-body text-sm text-gold">
                        Discount
                      </span>
                      <span className="font-body text-sm text-gold">
                        −₹{discount}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-body text-sm text-earth">Shipping</span>
                    <span className="font-body text-sm">
                      {shipping === 0 ? "Free" : `₹${shipping}`}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-4 mb-5 border-t border-sand">
                    <span className="font-body text-sm">Total</span>
                    <span className="font-display text-xl">₹{grandTotal}</span>
                  </div>
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="block w-full text-center bg-dark text-cream font-body text-sm tracking-wide px-6 py-4 hover:bg-earth transition-colors duration-300"
                  >
                    Proceed to Checkout
                  </Link>
                  <Link
                    href="/cart"
                    onClick={closeCart}
                    className="block text-center mt-3 font-body text-xs tracking-[0.15em] uppercase text-earth hover:text-dark transition-colors"
                  >
                    View Cart
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
