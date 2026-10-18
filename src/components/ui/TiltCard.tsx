"use client";

import { useRef, useState, useEffect } from "react";
import { useMotionValue, useTransform, useSpring, motion } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export function TiltCard({ children, className = "", intensity = 15 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const scale = useSpring(hovered ? 1.02 : 1, { damping: 15, stiffness: 200 });

  const xProp = useTransform(rotateX, (x) => x * intensity);
  const yProp = useTransform(rotateY, (y) => y * intensity);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const handleMove = (e: MouseEvent) => {
      const { left, top, width, height } = el.getBoundingClientRect();
      const x = (e.clientX - left - width / 2) / width;
      const y = (e.clientY - top - height / 2) / height;
      rotateX.set(-y * 10);
      rotateY.set(x * 10);
    };
    const handleLeave = () => {
      rotateX.set(0);
      rotateY.set(0);
    };
    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [rotateX, rotateY]);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative group ${className}`}
      style={{
        transform: `rotateX(${xProp.get()}deg) rotateY(${yProp.get()}deg)`,
      }}
    >
        <motion.div
          initial={false}
          style={{ scale }}
          transition={{ type: "spring", damping: 15, stiffness: 200 }}
          className="relative transition-transform duration-300"
        >
        {children}
      </motion.div>
    </div>
  );
}
