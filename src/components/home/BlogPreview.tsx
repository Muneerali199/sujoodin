"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { blogPosts } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/framer-variants";

export function BlogPreview() {
  const recentPosts = blogPosts.slice(0, 3);

  return (
    <section className="py-24 lg:py-32 px-6 lg:px-12 max-w-[1440px] mx-auto">
      <SectionHeader
        eyebrow="Journal"
        title="Stories & Inspiration"
        subtitle="Thoughtful perspectives on faith, fashion, and mindful living."
        link={{ label: "Read Journal", href: "/journal" }}
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
      >
        {recentPosts.map((post) => (
          <motion.article key={post.id} variants={fadeInUp} className="group">
            <Link href={`/journal/${post.slug}`}>
              <div className="relative aspect-[3/2] bg-stone mb-6 overflow-hidden">
                {post.image && (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
              </div>

              <span className="font-body text-[10px] tracking-[0.2em] uppercase text-gold">
                {post.category}
              </span>

              <h3 className="font-display text-xl font-light mt-3 group-hover:text-gold transition-colors duration-300 leading-snug">
                {post.title}
              </h3>

              <p className="font-body text-sm text-text-muted mt-3 leading-relaxed line-clamp-2">
                {post.excerpt}
              </p>

              <span className="font-body text-xs tracking-[0.1em] uppercase text-dark inline-flex items-center gap-2 mt-4 group/link">
                Read more
                <span className="inline-block transition-transform duration-300 group-hover/link:translate-x-1">
                  →
                </span>
              </span>
            </Link>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
