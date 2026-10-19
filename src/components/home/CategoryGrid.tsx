"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { categories } from "@/lib/data";
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/framer-variants";

interface CategoryGridProps {
  counts?: Record<string, number>;
}

export function CategoryGrid({ counts = {} }: CategoryGridProps) {
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

            {category.image && (
              <img
                src={category.image}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-dark/75 via-dark/25 to-transparent" />

            <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8">
              <motion.h3 className="font-display text-2xl lg:text-3xl font-light text-cream group-hover:text-gold transition-colors duration-500">
                {category.name}
              </motion.h3>
              <p className="font-body text-xs tracking-[0.15em] uppercase text-sand mt-2 group-hover:text-cream/80 transition-colors duration-500">
                {counts[category.name] ?? 0}{" "}
                {counts[category.name] === 1 ? "Product" : "Products"}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
