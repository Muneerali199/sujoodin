"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { blogPosts } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/framer-variants";

const categories = ["All", "Lifestyle", "Fashion", "Decor", "Ramadan & Eid"];

export default function JournalPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const featuredPost = blogPosts.find((p) => p.featured);
  const filteredPosts =
    activeCategory === "All"
      ? blogPosts.filter((p) => !p.featured)
      : blogPosts.filter(
          (p) => p.category === activeCategory && !p.featured
        );

  return (
    <div className="pt-20">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="py-16 px-6 lg:px-12 max-w-[1440px] mx-auto"
      >
        <p className="font-body text-[10px] tracking-[0.28em] uppercase text-earth mb-4">
          Journal
        </p>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light">
          Stories & <span className="italic text-gold">Inspiration</span>
        </h1>
      </motion.section>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pb-24">
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-body text-xs tracking-[0.15em] uppercase px-4 py-2 border transition-all duration-300 ${
                activeCategory === cat
                  ? "border-dark bg-dark text-cream"
                  : "border-sand text-earth hover:border-dark hover:text-dark"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {featuredPost && activeCategory === "All" && (
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16 group"
          >
            <Link href={`/journal/${featuredPost.slug}`}>
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="aspect-[3/2] bg-stone overflow-hidden">
                  {featuredPost.image && (
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                </div>
                <div>
                  <span className="font-body text-[10px] tracking-[0.2em] uppercase text-gold">
                    {featuredPost.category}
                  </span>
                  <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-light mt-3 group-hover:text-gold transition-colors duration-300">
                    {featuredPost.title}
                  </h2>
                  <p className="font-body text-sm text-text-muted mt-4 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-4 mt-6">
                    <span className="font-body text-xs text-earth">
                      {featuredPost.author}
                    </span>
                    <span className="font-body text-xs text-sand">•</span>
                    <span className="font-body text-xs text-earth">
                      {new Date(featuredPost.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.article>
        )}

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
        >
          {filteredPosts.map((post) => (
            <motion.article
              key={post.id}
              variants={fadeInUp}
              className="group"
            >
              <Link href={`/journal/${post.slug}`}>
                <div className="aspect-[3/2] bg-stone mb-6 overflow-hidden">
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
                <div className="flex items-center gap-4 mt-4">
                  <span className="font-body text-xs text-earth">
                    {post.author}
                  </span>
                  <span className="font-body text-xs text-sand">•</span>
                  <span className="font-body text-xs text-earth">
                    {new Date(post.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
