"use client";

import { use, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { blogPosts } from "@/lib/data";
import { fadeInUp } from "@/lib/framer-variants";

export default function JournalPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [progress, setProgress] = useState(0);
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setProgress(Math.round(latest * 100));
  });

  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="pt-20 min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
        <h1 className="font-display text-4xl font-light mb-4">Article not found</h1>
        <Link
          href="/journal"
          className="font-body text-xs tracking-[0.15em] uppercase text-earth hover:text-dark transition-colors"
        >
          ← Back to Journal
        </Link>
      </div>
    );
  }

  const relatedPosts = blogPosts.filter((p) => p.id !== post.id).slice(0, 2);

  return (
    <div className="pt-20">
      <motion.div
        className="fixed top-20 left-0 right-0 h-0.5 bg-sand z-40"
        style={{ transformOrigin: "left" }}
      >
        <motion.div
          className="h-full bg-gold"
          style={{ scaleX: scrollYProgress }}
        />
      </motion.div>

      <div className="flex items-center justify-between px-6 lg:px-12 py-3 bg-cream/90 backdrop-blur-sm border-b border-sand/50 sticky top-20 z-30">
        <Link
          href="/journal"
          className="font-body text-xs tracking-[0.15em] uppercase text-earth hover:text-dark transition-colors"
        >
          ← Back to Journal
        </Link>
        <span className="font-body text-xs text-text-muted">{progress}%</span>
      </div>

      <article className="max-w-3xl mx-auto px-6 py-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-body text-[10px] tracking-[0.28em] uppercase text-gold">
            {post.category}
          </span>

          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-light mt-4 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 mt-6 pb-8 border-b border-sand">
            <span className="font-body text-sm text-earth">{post.author}</span>
            <span className="font-body text-xs text-sand">•</span>
            <span className="font-body text-sm text-earth">
              {new Date(post.date).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="relative aspect-[3/2] bg-stone mb-12 overflow-hidden"
        >
          {post.image && (
            <img
              src={post.image}
              alt={post.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.05 },
            },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="prose prose-lg max-w-none"
        >
          <motion.p variants={fadeInUp} className="font-body text-base text-text-muted leading-relaxed mb-6">
            {post.excerpt}
          </motion.p>
          <motion.p variants={fadeInUp} className="font-body text-base text-dark/80 leading-relaxed mb-6">
            In the ever-evolving landscape of modern Muslim life, finding products
            and practices that honor our faith while embracing contemporary
            aesthetics has become increasingly important. At Sujood, we believe
            that modesty and beauty are not opposing forces — they are
            complementary expressions of a life well-lived.
          </motion.p>
          <motion.p variants={fadeInUp} className="font-body text-base text-dark/80 leading-relaxed mb-6">
            Our journey began with a simple observation: many Muslims struggle to
            find high-quality, beautifully designed products that align with their
            values. We set out to change that by curating a collection that speaks
            to both the heart and the soul.
          </motion.p>
          <motion.h2 variants={fadeInUp} className="font-display text-2xl font-light mt-12 mb-6">
            The Art of Mindful Living
          </motion.h2>
          <motion.p variants={fadeInUp} className="font-body text-base text-dark/80 leading-relaxed mb-6">
            Every product in our collection is chosen with intention. We work
            closely with artisans who share our commitment to quality,
            sustainability, and ethical production. From the cotton in our
            garments to the materials in our home decor, every element is
            considered and carefully selected.
          </motion.p>
          <motion.p variants={fadeInUp} className="font-body text-base text-dark/80 leading-relaxed">
            We invite you to explore our collection and discover pieces that
            resonate with your faith and your sense of style. Because at Sujood,
            we believe that living your faith should be a beautiful experience.
          </motion.p>
        </motion.div>

        <div className="mt-16 pt-8 border-t border-sand">
          <p className="font-body text-xs tracking-[0.15em] uppercase text-earth mb-4">
            Share this article
          </p>
          <div className="flex items-center gap-4">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-xs text-earth hover:text-dark transition-colors"
            >
              Twitter
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://sujood.in/journal/${post.slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-xs text-earth hover:text-dark transition-colors"
            >
              Facebook
            </a>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`${post.title} — https://sujood.in/journal/${post.slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-xs text-earth hover:text-dark transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <section className="py-16 px-6 lg:px-12 max-w-[1440px] mx-auto border-t border-sand">
          <h3 className="font-display text-2xl font-light mb-10">
            Related Articles
          </h3>
          <div className="grid md:grid-cols-2 gap-10">
            {relatedPosts.map((relatedPost) => (
              <Link
                key={relatedPost.id}
                href={`/journal/${relatedPost.slug}`}
                className="group"
              >
                <div className="aspect-[3/2] bg-stone mb-4 overflow-hidden">
                  {relatedPost.image && (
                    <img
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                </div>
                <span className="font-body text-[10px] tracking-[0.2em] uppercase text-gold">
                  {relatedPost.category}
                </span>
                <h4 className="font-display text-xl font-light mt-2 group-hover:text-gold transition-colors duration-300">
                  {relatedPost.title}
                </h4>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
