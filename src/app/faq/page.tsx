"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Mail } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/framer-variants";

const faqs = [
  {
    group: "Orders",
    items: [
      {
        q: "How do I track my order?",
        a: "Once we confirm your order by email, we send a tracking link to the same address as soon as your parcel is collected. If you need an update in the meantime, email hello@sujood.in with your name and order details.",
      },
      {
        q: "Can I change or cancel my order?",
        a: "Email us within 4 hours of sending your order request and we can usually change or cancel it before it is packed. After dispatch, you can still return it under our 7-day return policy.",
      },
      {
        q: "Do you ship outside India?",
        a: "Not yet. We are preparing international shipping for the Gulf and UK, and will announce it in the newsletter before launch.",
      },
    ],
  },
  {
    group: "Products & Fit",
    items: [
      {
        q: "How do I choose the right size?",
        a: "Start with the Size Guide, which lists garment measurements rather than body measurements. If you are between two sizes, size up for a relaxed fit or size down for a closer silhouette. Most modest pieces are cut with ease built in.",
      },
      {
        q: "What is your fabric like?",
        a: "We use natural fibres wherever possible — cotton, linen, viscose and silk blends — chosen for breathability and drape. Every product page lists the exact composition.",
      },
      {
        q: "Are your products colour accurate?",
        a: "We photograph in natural daylight with minimal editing, so what you see is close to what arrives. Screens vary, so if you need exact shade guidance, email us with the product name and we will send additional photos.",
      },
    ],
  },
  {
    group: "Returns & Refunds",
    items: [
      {
        q: "What is your return policy?",
        a: "Return any unworn item with tags attached within 7 days of delivery. Return pickup is free, and you can choose a refund or an exchange for a different size.",
      },
      {
        q: "When do I get my refund?",
        a: "Refunds are issued within 5 working days of the item reaching our warehouse. Your bank may take a further 3–5 days to show it.",
      },
      {
        q: "Which items can't be returned?",
        a: "Worn or washed items, anything missing its tags or packaging, final-sale pieces, and opened candles or fragrances for hygiene reasons.",
      },
    ],
  },
  {
    group: "Payments & Support",
    items: [
      {
        q: "How do payments work?",
        a: "Checkout sends us an order request by email. Once we confirm stock and delivery, we reply with a secure payment link. UPI, all major credit and debit cards, netbanking, and wallets including Paytm and PhonePe are supported. We never see your card details.",
      },
      {
        q: "Do you offer cash on delivery?",
        a: "Cash on delivery is not available right now. All orders are prepaid through the secure payment link we email after confirming your order.",
      },
      {
        q: "How do I reach you?",
        a: "Email hello@sujood.in. We reply Monday to Saturday between 10am and 6pm IST, usually within a few hours.",
      },
    ],
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-sand">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full flex items-start justify-between gap-6 py-5 text-left group"
      >
        <span
          className={`font-display text-lg font-light transition-colors ${
            open ? "text-earth" : "text-dark group-hover:text-earth"
          }`}
        >
          {q}
        </span>
        <Plus
          size={18}
          className={`flex-shrink-0 mt-1 text-earth transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="font-body text-sm text-text-muted leading-relaxed pb-6 pr-10 max-w-2xl">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FaqPage() {
  return (
    <div className="pt-20">
      <section className="py-16 lg:py-24 px-6 lg:px-12 max-w-[1440px] mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-2xl"
        >
          <motion.p
            variants={fadeInUp}
            className="font-body text-[10px] tracking-[0.28em] uppercase text-earth mb-4"
          >
            Help Centre
          </motion.p>
          <motion.h1
            variants={fadeInUp}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-light leading-tight"
          >
            Frequently Asked
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="font-body text-sm md:text-base text-text-muted mt-6 leading-relaxed"
          >
            Everything about ordering, sizing, delivery and returns. If your
            question is not here, we are one message away.
          </motion.p>
        </motion.div>
      </section>

      {faqs.map((section) => (
        <section
          key={section.group}
          className="py-14 lg:py-16 px-6 lg:px-12 max-w-[1440px] mx-auto"
        >
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid lg:grid-cols-[240px_1fr] gap-8 lg:gap-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="font-body text-[10px] tracking-[0.25em] uppercase text-earth pt-6"
            >
              {section.group}
            </motion.h2>
            <motion.div variants={fadeInUp}>
              {section.items.map((item) => (
                <FaqItem key={item.q} q={item.q} a={item.a} />
              ))}
            </motion.div>
          </motion.div>
        </section>
      ))}

      <section className="py-16 lg:py-24 px-6 lg:px-12 max-w-[1440px] mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center bg-warm-white border border-sand p-10 lg:p-14"
        >
          <motion.div variants={fadeInUp} className="flex justify-center mb-5">
            <Mail className="w-7 h-7 text-gold" />
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="font-display text-2xl md:text-3xl font-light mb-3"
          >
            Still need a hand?
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="font-body text-sm text-text-muted leading-relaxed mb-8"
          >
            Our team answers every message personally. Email us and we will sort
            it out.
          </motion.p>
          <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-5">
            <a
              href="mailto:hello@sujood.in"
              className="font-body text-xs tracking-[0.15em] uppercase bg-dark text-cream px-6 py-3 hover:bg-earth transition-colors"
            >
              Email us
            </a>
            <Link
              href="/shipping-returns"
              className="font-body text-xs tracking-[0.15em] uppercase text-earth hover:text-dark transition-colors self-center border-b border-transparent hover:border-gold pb-1"
            >
              Shipping &amp; returns
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
