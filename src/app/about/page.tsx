"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, MapPin, Clock } from "lucide-react";
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
      <section className="grid lg:grid-cols-2 min-h-[70vh]">
        <div className="flex items-center px-6 lg:px-12 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <p className="font-body text-[10px] tracking-[0.28em] uppercase text-earth mb-6">
              Our Story
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light leading-tight">
              A Brand Born from{" "}
              <span className="italic text-gold">Devotion</span>
            </h1>
            <p className="font-body text-base text-text-muted mt-8 leading-relaxed">
              Sujood — meaning &quot;prostration&quot; in Arabic — represents the
              highest form of closeness to Allah. We chose this name because every
              product we create is designed to help you live your faith with grace,
              dignity, and purpose.
            </p>
          </motion.div>
        </div>
        <div className="relative min-h-[50vh] lg:min-h-full bg-stone overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1760083545495-b297b1690672?auto=format&fit=crop&w=1400&q=80"
            alt="Sujood modest fashion collection"
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
        </div>
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

      <section id="contact" className="py-24 lg:py-32 px-6 lg:px-12 max-w-[1440px] mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.p
            variants={fadeInUp}
            className="font-body text-[10px] tracking-[0.28em] uppercase text-earth mb-4"
          >
            Get in Touch
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="font-display text-3xl md:text-4xl font-light"
          >
            Contact Us
          </motion.h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            className="flex flex-col gap-6"
          >
            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-gold flex-shrink-0" />
              <div>
                <p className="font-display text-lg font-light">Email</p>
                <a
                  href="mailto:hello@sujood.in"
                  className="font-body text-sm text-text-muted hover:text-dark transition-colors"
                >
                  hello@sujood.in
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Clock className="w-6 h-6 text-gold flex-shrink-0" />
              <div>
                <p className="font-display text-lg font-light">Hours</p>
                <p className="font-body text-sm text-text-muted">
                  Monday – Saturday, 10am – 6pm IST
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-gold flex-shrink-0" />
              <div>
                <p className="font-display text-lg font-light">Address</p>
                <p className="font-body text-sm text-text-muted">
                  Mumbai, Maharashtra, India
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            className="flex flex-col gap-6"
          >
            <div className="bg-warm-white p-6 border border-sand">
              <p className="font-display text-lg font-light mb-4">
                Shipping &amp; Returns
              </p>
              <p className="font-body text-sm text-text-muted leading-relaxed">
                Free shipping on all orders above ₹999 across India. Standard
                delivery takes 5-7 business days. Express delivery available
                for urgent orders within 2-3 business days (₹99).
              </p>
              <p className="font-body text-sm text-text-muted leading-relaxed mt-4">
                Easy 7-day return policy. Products must be unused, in original
                packaging, with all tags intact. Contact us within 24 hours of
                delivery to initiate a return.
              </p>
              <Link
                href="/shipping-returns"
                className="inline-block mt-4 font-body text-xs tracking-[0.15em] uppercase text-dark underline underline-offset-4 hover:text-gold transition-colors"
              >
                Full policy
              </Link>
            </div>
            <div className="bg-warm-white p-6 border border-sand">
              <p className="font-display text-lg font-light mb-4">
                Privacy Policy
              </p>
              <p className="font-body text-sm text-text-muted leading-relaxed">
                We respect your privacy and do not share your personal
                information with third parties. Your details are used only to
                process your order and to communicate with you about it. You can
                ask us to delete your information at any time by emailing{" "}
                <a
                  href="mailto:hello@sujood.in"
                  className="text-dark underline underline-offset-2"
                >
                  hello@sujood.in
                </a>
                .
              </p>
            </div>
          </motion.div>
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
          <motion.h2
            variants={fadeInUp}
            className="font-display text-3xl md:text-4xl font-light"
          >
            From the Founder
          </motion.h2>
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
