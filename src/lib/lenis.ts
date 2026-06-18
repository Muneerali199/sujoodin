"use client";

import { useEffect, useRef } from "react";

export function useLenis() {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    let lenis: any;

    async function init() {
      const Lenis = (await import("lenis")).default;

      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
      lenisRef.current = lenis;
    }

    init();

    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
    };
  }, []);

  return lenisRef;
}
