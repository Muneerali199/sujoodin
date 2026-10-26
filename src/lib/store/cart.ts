import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, Product } from "@/lib/types/product";

export function cartItemKey(item: Pick<CartItem, "id" | "selectedSize" | "selectedColor">) {
  return `${item.id}::${item.selectedSize ?? ""}::${item.selectedColor ?? ""}`;
}

export const COUPON_CODE = "SUJOOD10";
export const COUPON_PERCENT = 10;

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
        if (get().coupon !== COUPON_CODE) return 0;
        return Math.round((get().totalPrice() * COUPON_PERCENT) / 100);
      },

      shipping: () => {
        const subtotal = get().totalPrice() - get().discount();
        if (subtotal === 0) return 0;
        return subtotal >= 999 ? 0 : 99;
      },

      grandTotal: () => {
        const total = get().totalPrice() - get().discount() + get().shipping();
        return Math.max(0, total);
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
