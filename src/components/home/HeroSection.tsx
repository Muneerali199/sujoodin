"use client";

import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const imageX = useSpring(
    useTransform(pointerX, [-0.5, 0.5], [-10, 10]),
    { stiffness: 150, damping: 22 }
  );
  const imageY = useSpring(
    useTransform(pointerY, [-0.5, 0.5], [-10, 10]),
    { stiffness: 150, damping: 22 }
  );

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        pointerX.set(0);
        pointerY.set(0);
      }}
    >
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12 w-full pt-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-80px)]">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } },
            }}
            className="relative z-10"
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 font-body text-[10px] tracking-[0.28em] uppercase text-earth mb-6"
            >
              <span className="w-8 h-px bg-gold" />
              Islamic Lifestyle Brand — India
            </motion.div>

            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.7 }}
              className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-[80px] font-light leading-[1.05] tracking-tight"
            >
              Live in Faith,{" "}
              <span className="italic text-gold">Dress with Purpose.</span>
            </motion.h1>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6 }}
              className="font-body text-sm md:text-base text-text-muted mt-6 max-w-md leading-relaxed"
            >
              Curating modest fashion, Islamic home decor, and prayer essentials
              that blend faith with contemporary elegance. Every piece tells a
              story of devotion and craftsmanship.
            </motion.p>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap items-center gap-6 mt-10"
            >
              <Link
                href="/shop"
                className="group inline-flex items-center gap-3 bg-dark text-cream font-body text-xs tracking-[0.15em] uppercase px-7 py-4 hover:bg-earth transition-colors duration-300"
              >
                Explore Collection
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/about"
                className="font-body text-xs tracking-[0.15em] uppercase text-dark border-b border-dark/30 pb-1 hover:border-dark transition-colors duration-300"
              >
                Our Story
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative hidden lg:block z-10"
          >
            <motion.div
              style={{ x: imageX, y: imageY }}
              className="relative aspect-[3/4] bg-stone overflow-hidden group"
            >
              <img
                src="https://images.unsplash.com/photo-1561442748-c50715dc32f6?q=80&w=1200&auto=format&fit=crop"
                alt="Sujood — modest fashion, crafted with purpose"
                loading="eager"
                className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-[1.04]"
              />
            </motion.div>

            <div className="mt-5 flex items-center justify-between border-t border-sand pt-4">
              <span className="font-body text-[10px] tracking-[0.22em] uppercase text-earth">
                The Everyday Collection
              </span>
              <span className="font-body text-[10px] tracking-[0.22em] uppercase text-text-muted">
                Est. 2020 — India
              </span>
            </div>

            <div className="absolute -bottom-14 right-0 flex items-center gap-3">
              <span className="font-body text-[10px] tracking-[0.2em] uppercase text-earth">
                Scroll
              </span>
              <div className="w-px h-10 bg-earth/30 relative overflow-hidden">
                <motion.div
                  className="w-full h-3 bg-gold"
                  animate={{ y: [-12, 40] }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
