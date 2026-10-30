import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, Product } from "@/lib/types/product";
import {
  COUPON_CODE,
  computeDiscount,
  computeShipping,
  computeTotals,
} from "@/lib/commerce";

export { COUPON_CODE, COUPON_PERCENT } from "@/lib/commerce";

export function cartItemKey(item: Pick<CartItem, "id" | "selectedSize" | "selectedColor">) {
  return `${item.id}::${item.selectedSize ?? ""}::${item.selectedColor ?? ""}`;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  coupon: string | null;
  addItem: (product: Product, quantity?: number, size?: string, color?: string) => void;
  removeItem: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  closeCart: () => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  totalItems: () => number;
  totalPrice: () => number;
  discount: () => number;
  shipping: () => number;
  grandTotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      coupon: null,

      addItem: (product, quantity = 1, size, color) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) =>
              item.id === product.id &&
              item.selectedSize === size &&
              item.selectedColor === color
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                cartItemKey(item) === cartItemKey(existingItem)
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
              isOpen: true,
            };
          }

          return {
            items: [
              ...state.items,
              {
                ...product,
                quantity,
                selectedSize: size,
                selectedColor: color,
              },
            ],
            isOpen: true,
          };
        }),

      removeItem: (key) =>
        set((state) => ({
          items: state.items.filter((item) => cartItemKey(item) !== key),
        })),

      updateQuantity: (key, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            cartItemKey(item) === key
              ? { ...item, quantity: Math.max(1, quantity) }
              : item
          ),
        })),

      clearCart: () => set({ items: [], coupon: null }),

      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      closeCart: () => set({ isOpen: false }),

      applyCoupon: (code) => {
        if (code.trim().toUpperCase() !== COUPON_CODE) return false;
        set({ coupon: COUPON_CODE });
        return true;
      },

      removeCoupon: () => set({ coupon: null }),

      totalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),

      totalPrice: () =>
        get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),

      discount: () => {
        const { items, coupon } = get();
        return computeDiscount(
          items.reduce((sum, item) => sum + item.price * item.quantity, 0),
          coupon
        );
      },

      shipping: () => {
        const { items, coupon } = get();
        const subtotal = items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        return computeShipping(subtotal - computeDiscount(subtotal, coupon));
      },

      grandTotal: () => {
        const { items, coupon } = get();
        const subtotal = items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        return computeTotals(subtotal, coupon).total;
      },
    }),
    {
      name: "sujood-cart",
      skipHydration: true,
      partialize: (state) => ({
        items: state.items,
        coupon: state.coupon,
      }),
    }
  )
);
