"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { IslamicPattern } from "@/components/shared/IslamicPattern";
import { fadeInUp, staggerContainer } from "@/lib/framer-variants";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-stone">
        <IslamicPattern className="w-full h-full text-clay" opacity={0.06} />
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.04 }}>
          <defs>
            <pattern
              id="diagonal"
              patternUnits="userSpaceOnUse"
              width="8"
              height="8"
            >
              <path d="M0 8L8 0" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diagonal)" />
        </svg>
      </div>

      <div className="relative max-w-2xl mx-auto px-6 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.p
            variants={fadeInUp}
            className="font-body text-[10px] tracking-[0.28em] uppercase text-earth mb-6"
          >
            Stay Connected
          </motion.p>

          <motion.h2
            variants={fadeInUp}
            className="font-display text-3xl md:text-4xl lg:text-5xl font-light leading-tight"
          >
            Join the <span className="italic text-gold">Sujood</span> Community
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="font-body text-sm text-text-muted mt-4 leading-relaxed"
          >
            Be the first to know about new collections, exclusive offers, and
            stories that inspire your faith journey.
          </motion.p>

          <motion.form
            variants={fadeInUp}
            onSubmit={handleSubmit}
            className="mt-10 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 font-body text-sm bg-transparent border-b border-sand py-3 px-0 placeholder:text-text-muted focus:outline-none focus:border-gold transition-colors duration-300"
              required
            />
            <button
              type="submit"
              className="font-body text-xs tracking-[0.15em] uppercase bg-dark text-cream px-6 py-3 hover:bg-earth transition-colors duration-300 whitespace-nowrap"
            >
              Subscribe
            </button>
          </motion.form>

          {submitted && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-body text-sm text-gold mt-4"
            >
              Welcome to the Sujood family ✦
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
