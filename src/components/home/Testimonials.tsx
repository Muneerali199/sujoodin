"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { testimonials } from "@/lib/data";
import { fadeIn } from "@/lib/framer-variants";

export function Testimonials() {
  const [active, setActive] = useState(0);

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="py-24 lg:py-32 px-6 lg:px-12 max-w-[1440px] mx-auto">
      <SectionHeader
        eyebrow="Testimonials"
        title="What Our Customers Say"
      />

      <div className="max-w-3xl mx-auto">
        <div className="relative min-h-[200px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="text-center"
            >
              <div className="flex items-center justify-center gap-1 mb-6">
                {Array.from({ length: testimonials[active].rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>

              <blockquote className="font-display text-xl md:text-2xl lg:text-3xl font-light italic leading-relaxed text-dark/80">
                &ldquo;{testimonials[active].quote}&rdquo;
              </blockquote>

              <div className="mt-8">
                <p className="font-body text-sm font-medium">{testimonials[active].name}</p>
                <p className="font-body text-xs text-text-muted mt-1">
                  {testimonials[active].location}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-3 mt-12">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === active ? "bg-gold w-6" : "bg-sand hover:bg-clay"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
