"use client";

import { motion } from "framer-motion";
import { ArabicWatermark } from "@/components/shared/ArabicWatermark";
import { fadeInUp, staggerContainer } from "@/lib/framer-variants";

export default function AboutPage() {
  const values = [
    {
      title: "Faith",
      description:
        "Every product we curate is rooted in Islamic values and traditions. We believe that modesty and beauty are not mutually exclusive.",
    },
    {
      title: "Craft",
      description:
        "We work with skilled artisans across India and the Middle East to bring you products that are handcrafted with love and precision.",
    },
    {
      title: "Community",
      description:
        "Sujood is more than a brand — it's a community of mindful Muslims who value quality, ethics, and purpose in everything they choose.",
    },
  ];

  const timeline = [
    { year: "2020", event: "Sujood founded with a vision to redefine modest fashion" },
    { year: "2021", event: "Expanded into Islamic home decor and prayer essentials" },
    { year: "2022", event: "Reached 5,000 happy families across India" },
    { year: "2023", event: "Launched our artisan partnership program" },
    { year: "2024", event: "10,000+ families and growing — the journey continues" },
  ];

  return (
    <div className="pt-20">
      <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-stone">
        <div className="absolute inset-0 bg-gradient-to-br from-stone via-sand/40 to-clay/20" />
        <ArabicWatermark
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[180px] md:text-[280px] text-earth select-none pointer-events-none"
          opacity={0.08}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative max-w-3xl mx-auto px-6 text-center py-32"
        >
          <p className="font-body text-[10px] tracking-[0.28em] uppercase text-earth mb-6">
            Our Story
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light leading-tight">
            A Brand Born from{" "}
            <span className="italic text-gold">Devotion</span>
          </h1>
          <p className="font-body text-base text-text-muted mt-8 leading-relaxed max-w-2xl mx-auto">
            Sujood — meaning &quot;prostration&quot; in Arabic — represents the
            highest form of closeness to Allah. We chose this name because every
            product we create is designed to help you live your faith with grace,
            dignity, and purpose.
          </p>
        </motion.div>
      </section>

      <section className="py-24 lg:py-32 px-6 lg:px-12 max-w-[1440px] mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.p
            variants={fadeInUp}
            className="font-body text-[10px] tracking-[0.28em] uppercase text-earth mb-4"
          >
            Why Sujood
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="font-display text-3xl md:text-4xl font-light"
          >
            Our Core Values
          </motion.h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center"
            >
              <h3 className="font-display text-2xl font-light mb-4">
                {value.title}
              </h3>
              <p className="font-body text-sm text-text-muted leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-dark text-cream">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.p
              variants={fadeInUp}
              className="font-body text-[10px] tracking-[0.28em] uppercase text-gold mb-4"
            >
              Our Journey
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="font-display text-3xl md:text-4xl font-light"
            >
              The Sujood Timeline
            </motion.h2>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-8 pb-12 last:pb-0 relative"
              >
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 bg-gold rounded-full" />
                  {i < timeline.length - 1 && (
                    <div className="w-px flex-1 bg-gold/20 mt-3" />
                  )}
                </div>
                <div className="pb-2">
                  <p className="font-display text-xl text-gold">{item.year}</p>
                  <p className="font-body text-sm text-cream/60 mt-2">
                    {item.event}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 px-6 lg:px-12 max-w-[1440px] mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <motion.p
            variants={fadeInUp}
            className="font-body text-[10px] tracking-[0.28em] uppercase text-earth mb-6"
          >
            Founder&apos;s Note
          </motion.p>
          <motion.blockquote
            variants={fadeInUp}
            className="font-display text-2xl md:text-3xl font-light italic leading-relaxed"
          >
            &ldquo;We started Sujood with a simple mission: to make it easier for
            Muslims to find beautiful, high-quality products that align with their
            values. Every piece in our collection is chosen with care, because we
            believe that what surrounds us should reflect who we are.&rdquo;
          </motion.blockquote>
          <motion.div
            variants={fadeInUp}
            className="mt-8 flex flex-col items-center"
          >
            <div className="w-16 h-px bg-gold mb-4" />
            <p className="font-body text-sm font-medium">The Sujood Team</p>
            <p className="font-body text-xs text-text-muted mt-1">
              Founders
            </p>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
