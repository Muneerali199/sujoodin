"use client";

import { useEffect } from "react";
import { useLenis } from "@/lib/lenis";
import { useCartStore } from "@/lib/store/cart";
import { useWishlistStore } from "@/lib/store/wishlist";

export function Providers({ children }: { children: React.ReactNode }) {
  useLenis();

  useEffect(() => {
    useCartStore.persist.rehydrate();
    useWishlistStore.persist.rehydrate();
  }, []);

  return <>{children}</>;
}