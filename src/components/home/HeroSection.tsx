"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Heart, Sparkles } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/framer-variants";

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [floating, setFloating] = useState(false);
  const [heroX, setHeroX] = useState(0);
  const [heroY, setHeroY] = useState(0);

  const { scrollYProgress } = useScroll();
  const yRotate = useTransform(scrollYProgress, [0, 1], [0, 5]);

  useEffect(() => {
    const updateHeroPos = () => {
      const x = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--hero-x")
      );
      const y = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--hero-y")
      );
      setHeroX(x);
      setHeroY(y);
    };
    updateHeroPos();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const { left, top, width, height } = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / width;
    const y = (e.clientY - top - height / 2) / height;
    setFloating(true);
    document.documentElement.style.setProperty(
      "--hero-x",
      `${x * 15}px`
    );
    document.documentElement.style.setProperty(
      "--hero-y",
      `${y * 15}px`
    );
  };

  const handleMouseLeave = () => {
    setFloating(false);
    document.documentElement.style.setProperty("--hero-x", "0px");
    document.documentElement.style.setProperty("--hero-y", "0px");
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="absolute inset-0 z-0 bg-gradient-to-b from-cream/40 via-cream to-stone/10 pointer-events-none"
      />
      <div
        className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_30%_70%,rgba(201,169,110,0.12)_0px,transparent_50%)] pointer-events-none"
        style={{
          transform: `translate(var(--hero-x, 0px), var(--hero-y, 0px))`,
          transition: "transform 0.1s ease-out",
        }}
      />
      <div
        className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_70%_30%,rgba(122,107,85,0.08)_0px,transparent_40%)] pointer-events-none"
        style={{
          transform: `translate(${heroX * -1.5}px, ${heroY * -1.5}px)`,
          transition: "transform 0.1s ease-out",
        }}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12 w-full pt-20">
        <div
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-80px)]"
        >
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="relative z-10"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2 font-body text-[10px] tracking-[0.28em] uppercase text-earth mb-6"
            >
              <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
              Islamic Lifestyle Brand — India
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-[80px] font-light leading-[1.05] tracking-tight line-clamp-3"
            >
              Live in Faith,{" "}
              <span className="italic text-gold relative">
                Dress with Purpose.
                <span className="absolute -inset-px bg-gold/20 rounded-full blur-md -z-10" />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-body text-sm md:text-base text-text-muted mt-6 max-w-md leading-relaxed"
            >
              Curating modest fashion, Islamic home decor, and prayer essentials
              that blend faith with contemporary elegance. Every piece tells a
              story of devotion and craftsmanship.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 mt-10"
            >
              <Link href="/shop">
                <Button variant="primary" size="lg" className="group relative overflow-hidden">
                  <Sparkles className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                  Explore Collection
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="ghost" size="lg" className="relative overflow-hidden group">
                  Our Story
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ transform: `rotateX(${yRotate.get()}deg)` }}
            className="relative hidden lg:block z-10"
          >
            <div
              className="relative aspect-[3/4] bg-stone overflow-hidden rounded-2xl group"
              style={{
                transform: `translate3d(var(--hero-x, 0px), var(--hero-y, 0px), 0)`,
                transition: "transform 0.1s ease-out",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1561442748-c50715dc32f6?q=80&w=1200&auto=format&fit=crop"
                alt="Sujood — modest fashion, crafted with purpose"
                className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-dark/40 via-transparent to-transparent rounded-2xl" />
              <div className="absolute inset-0 flex items-center justify-center rounded-2xl overflow-hidden">
                <span className="font-display text-[120px] text-dark/10 italic tracking-wider">
                  SUJOOD
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-dark/20" />
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="absolute bottom-8 right-8 flex flex-col items-center gap-2"
            >
              <span className="font-body text-[10px] tracking-[0.2em] uppercase text-earth rotate-90 origin-center translate-y-8">
                Scroll
              </span>
              <div className="w-px h-12 bg-earth/30 relative overflow-hidden">
                <motion.div
                  className="w-full h-4 bg-gold"
                  animate={{ y: [-16, 32] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
