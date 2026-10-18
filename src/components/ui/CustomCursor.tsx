"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  const move = useCallback(
    (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    },
    []
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.addEventListener("mousemove", move);

    const onHoverIn = () => setHover(true);
    const onHoverOut = () => setHover(false);
    window.addEventListener("mouseover", (e) => {
      if ((e.target as HTMLElement)?.closest("[data-cursor-hover]")) {
        onHoverIn();
      }
    });
    window.addEventListener("mouseout", (e) => {
      if (!(e.relatedTarget as HTMLElement)?.closest("[data-cursor-hover]")) {
        onHoverOut();
      }
    });

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", onHoverIn);
      window.removeEventListener("mouseout", onHoverOut);
    };
  }, []);

  useEffect(() => {
    if (!cursorRef.current || !dotRef.current) return;
    const cursor = cursorRef.current;
    const dot = dotRef.current;

    const animate = () => {
      dot.style.left = `${pos.x}px`;
      dot.style.top = `${pos.y}px`;
      cursor.style.left = `${pos.x}px`;
      cursor.style.top = `${pos.y}px`;
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [pos.x, pos.y]);

  return (
    <>
      <div
        ref={cursorRef}
        className="cursor-outline fixed pointer-events-none z-[9999] rounded-full bg-dark -translate-x-1/2 -translate-y-1/2 w-8 h-8 opacity-10 transition-all duration-200 ease-out mix-blend-difference"
        data-cursor-hover={hover ? "true" : "false"}
      />
      <div
        ref={dotRef}
        className="cursor-dot fixed pointer-events-none z-[10000] rounded-full bg-dark -translate-x-1/2 -translate-y-1/2 w-2 h-2 transition-all duration-100 ease-out"
      />
    </>
  );
}

export function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    setX((clientX - centerX) * 0.45);
    setY((clientY - centerY) * 0.45);
  };

  const handleMouseLeave = () => {
    setX(0);
    setY(0);
  };

  return (
    <button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor-hover
      style={{
        transform: `translate(${x}px, ${y}px)`,
        transition: "transform 0.1s cubic-bezier(0.25, 1, 0.5, 1)",
      }}
      className="relative overflow-hidden magnetic-glow"
    >
      <span className="relative z-10">{children}</span>
      <div
        className="absolute inset-0 bg-gold/15 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
    </button>
  );
}
