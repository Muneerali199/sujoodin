"use client";

import { useLenis } from "@/lib/lenis";

export function Providers({ children }: { children: React.ReactNode }) {
  useLenis();
  return <>{children}</>;
}
