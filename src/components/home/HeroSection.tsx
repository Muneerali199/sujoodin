"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { fadeInUp, staggerContainer } from "@/lib/framer-variants";

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 w-full pt-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-80px)]">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="relative z-10"
          >
            <motion.p
              variants={fadeInUp}
              className="font-body text-[10px] tracking-[0.28em] uppercase text-earth mb-6"
            >
              Islamic Lifestyle Brand — India
            </motion.p>

            <motion.h1
              variants={fadeInUp}
              className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-[80px] font-light leading-[1.05] tracking-tight"
            >
              Live in Faith,{" "}
              <span className="italic text-gold">Dress with Purpose.</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="font-body text-sm md:text-base text-text-muted mt-6 max-w-md leading-relaxed"
            >
              Curating modest fashion, Islamic home decor, and prayer essentials
              that blend faith with contemporary elegance. Every piece tells a
              story of devotion and craftsmanship.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center gap-4 mt-10"
            >
              <Link href="/shop">
                <Button variant="primary" size="lg">
                  Explore Collection
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="ghost" size="lg">
                  Our Story
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <div className="relative hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative aspect-[3/4] bg-stone overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-stone via-sand/50 to-clay/30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-[120px] text-dark/10 italic tracking-wider">
                  SUJOOD
                </span>
              </div>
            </motion.div>

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
          </div>
        </div>
      </div>
    </section>
  );
}
