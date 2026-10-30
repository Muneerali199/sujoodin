export const COUPON_CODE = "SUJOOD10";
export const COUPON_PERCENT = 10;
export const SHIPPING_FLAT = 99;
export const FREE_SHIPPING_MIN = 999;

export function computeDiscount(subtotal: number, coupon: string | null): number {
  if (coupon !== COUPON_CODE) return 0;
  return Math.round((subtotal * COUPON_PERCENT) / 100);
}

export function computeShipping(subtotalAfterDiscount: number): number {
  if (subtotalAfterDiscount <= 0) return 0;
  return subtotalAfterDiscount >= FREE_SHIPPING_MIN ? 0 : SHIPPING_FLAT;
}

export function computeTotals(subtotal: number, coupon: string | null) {
  const discount = computeDiscount(subtotal, coupon);
  const shipping = computeShipping(subtotal - discount);
  return {
    subtotal,
    discount,
    shipping,
    total: Math.max(0, subtotal - discount + shipping),
  };
}
