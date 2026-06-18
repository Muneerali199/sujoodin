"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { IslamicPattern } from "@/components/shared/IslamicPattern";
import { ArabicWatermark } from "@/components/shared/ArabicWatermark";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { categories } from "@/lib/data";
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/framer-variants";

export function CategoryGrid() {
  return (
    <section className="py-24 lg:py-32 px-6 lg:px-12 max-w-[1440px] mx-auto">
      <SectionHeader
        eyebrow="Curated Collections"
        title="Shop by Category"
        subtitle="Explore our thoughtfully curated collections designed for the modern Muslim lifestyle."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6"
      >
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            variants={index === 0 ? scaleIn : fadeInUp}
            className={`group relative overflow-hidden bg-stone cursor-pointer ${
              index === 0 ? "md:row-span-2 aspect-[3/4] md:aspect-auto" : "aspect-[4/3]"
            }`}
          >
            <Link href={`/shop/${category.slug}`} className="absolute inset-0 z-10" />

            <div className="absolute inset-0 bg-gradient-to-br from-stone via-sand/30 to-clay/20 transition-transform duration-700 group-hover:scale-105" />

            <IslamicPattern className="absolute inset-0 w-full h-full text-clay" opacity={0.1} />

            <ArabicWatermark
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl md:text-8xl text-earth select-none pointer-events-none"
              opacity={0.08}
            />

            <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/20 transition-colors duration-500" />

            <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8">
              <motion.h3
                className="font-display text-2xl lg:text-3xl font-light text-dark group-hover:text-cream transition-colors duration-500"
              >
                {category.name}
              </motion.h3>
              <p className="font-body text-xs tracking-[0.15em] uppercase text-earth mt-2 group-hover:text-cream/70 transition-colors duration-500">
                {category.itemCount} Products
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
