"use client";

import { useEffect, useRef } from "react";
import type Lenis from "lenis";

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    let lenis: Lenis | undefined;
    let frame = 0;

    async function init() {
      const { default: Lenis } = await import("lenis");

      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });

      function raf(time: number) {
        lenis?.raf(time);
        frame = requestAnimationFrame(raf);
      }

      frame = requestAnimationFrame(raf);
      lenisRef.current = lenis;
    }

    init();

    return () => {
      cancelAnimationFrame(frame);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  return lenisRef;
}
