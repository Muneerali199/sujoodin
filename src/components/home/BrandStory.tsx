"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArabicWatermark } from "@/components/shared/ArabicWatermark";
import { fadeInUp, staggerContainer } from "@/lib/framer-variants";

export function BrandStory() {
  const stats = [
    { value: "4+", label: "Years of Faith" },
    { value: "10K+", label: "Families Served" },
    { value: "100%", label: "Ethically Sourced" },
  ];

  return (
    <section className="py-24 lg:py-32 bg-dark text-cream relative overflow-hidden">
      <ArabicWatermark
        className="absolute top-1/2 right-12 -translate-y-1/2 text-[200px] lg:text-[300px] text-gold select-none pointer-events-none"
        opacity={0.06}
      />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.p
              variants={fadeInUp}
              className="font-body text-[10px] tracking-[0.28em] uppercase text-gold mb-6"
            >
              Our Story
            </motion.p>

            <motion.h2
              variants={fadeInUp}
              className="font-display text-3xl md:text-4xl lg:text-5xl font-light leading-tight"
            >
              Where Faith Meets{" "}
              <span className="italic text-gold">Elegance</span>
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="font-body text-sm text-cream/60 mt-6 leading-relaxed max-w-lg"
            >
              Sujood was born from a simple belief: that living your faith
              shouldn&apos;t mean compromising on style or quality. We curate
              products that honor Islamic traditions while embracing contemporary
              design — because devotion and beauty go hand in hand.
            </motion.p>

            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-cream/10"
            >
              {stats.map((stat) => (
                <motion.div key={stat.label} variants={fadeInUp}>
                  <p className="font-display text-3xl lg:text-4xl font-light text-gold">
                    {stat.value}
                  </p>
                  <p className="font-body text-xs text-cream/50 mt-2 tracking-wide">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-12">
              <Link href="/about">
                <Button variant="gold" size="lg">
                  Discover More
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative aspect-square max-w-md mx-auto lg:mx-0"
          >
            <div className="absolute inset-0 border border-gold/20 rounded-full" />
            <div className="absolute inset-8 border border-gold/15 rounded-full" />
            <div className="absolute inset-16 border border-gold/10 rounded-full" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-7xl lg:text-8xl text-gold/80 italic tracking-wider">
                SUJOOD
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
