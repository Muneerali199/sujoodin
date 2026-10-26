"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/Toast";
import { fadeInUp, staggerContainer } from "@/lib/framer-variants";

type Status = "idle" | "loading" | "success";

export function Newsletter() {
  const { addToast } = useToast();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === "loading") return;

    setStatus("loading");
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.message ?? "Something went wrong.");
      }

      setStatus("success");
      setEmail("");
      addToast({
        type: "success",
        title: "You're on the list",
        description: "We'll email you when new collections arrive.",
      });
    } catch (error) {
      setStatus("idle");
      addToast({
        type: "error",
        title: "Subscription failed",
        description:
          error instanceof Error ? error.message : "Please try again.",
      });
    }
  };

  return (
    <section className="py-24 lg:py-32 bg-stone border-y border-sand">
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
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 font-body text-sm bg-transparent border-b border-sand py-3 px-0 placeholder:text-text-muted focus:outline-none focus:border-gold transition-colors duration-300"
              required
              disabled={status === "loading"}
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="font-body text-xs tracking-[0.15em] uppercase bg-dark text-cream px-6 py-3 hover:bg-earth transition-colors duration-300 whitespace-nowrap disabled:opacity-60 disabled:pointer-events-none"
            >
              {status === "loading" ? "Joining…" : "Subscribe"}
            </button>
          </motion.form>

          {status === "success" && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-body text-sm text-earth mt-4"
            >
              You&apos;re in. Look out for our next letter.
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
