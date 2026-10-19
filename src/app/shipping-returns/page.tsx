"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Truck, PackageCheck, RotateCcw, CreditCard, Headphones } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/framer-variants";

const shippingRates = [
  { method: "Standard", time: "5–7 business days", cost: "₹99", free: "Free over ₹999" },
  { method: "Express", time: "2–3 business days", cost: "₹199", free: "Free over ₹1999" },
  { method: "Same Day", time: "Within 6 hours", cost: "₹349", free: "Metro cities only" },
];

const timelines = [
  {
    title: "Order confirmed",
    text: "You receive an email with your order number right after checkout.",
  },
  {
    title: "Packed with care",
    text: "Your pieces are wrapped in tissue and sealed within 24 hours of ordering.",
  },
  {
    title: "Handed to courier",
    text: "You get a tracking link by email and SMS once the parcel is collected.",
  },
  {
    title: "Delivered",
    text: "Inspect your order, then confirm delivery in the app or on the tracking page.",
  },
];

const returns = [
  {
    title: "7 days to return",
    text: "Request a return within 7 days of delivery for any reason.",
  },
  {
    title: "Free return pickup",
    text: "We arrange a courier pickup from your address at no cost to you.",
  },
  {
    title: "Refunded in 5 days",
    text: "Once we receive and inspect the item, refunds are issued to the original payment method.",
  },
  {
    title: "Exchanges included",
    text: "Prefer a different size? Exchange instead of a refund, at no extra cost.",
  },
];

const notReturnable = [
  "Items that have been worn, washed, altered or laundered",
  "Products without their original tags and packaging",
  "Items marked as final sale at the time of purchase",
  "Perfumes, candles and other opened home-fragrance items",
];

export default function ShippingReturnsPage() {
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
            Orders &amp; Delivery
          </motion.p>
          <motion.h1
            variants={fadeInUp}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-light leading-tight"
          >
            Shipping &amp; Returns
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="font-body text-sm md:text-base text-text-muted mt-6 leading-relaxed"
          >
            We ship across India, and most orders reach you within a week. If
            something is not right, sending it back is free.
          </motion.p>
        </motion.div>
      </section>

      <section className="py-16 lg:py-20 px-6 lg:px-12 max-w-[1440px] mx-auto bg-warm-white">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.h2
            variants={fadeInUp}
            className="font-display text-2xl md:text-3xl font-light mb-2"
          >
            Shipping rates
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="font-body text-sm text-text-muted mb-10"
          >
            Timelines start from the day your order is packed, not the day it is
            placed.
          </motion.p>

          <motion.div variants={fadeInUp} className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse">
              <thead>
                <tr className="border-b border-dark/20">
                  {["Method", "Delivery time", "Cost", "Free shipping"].map(
                    (c) => (
                      <th
                        key={c}
                        className="text-left py-3 pr-6 font-body text-[10px] tracking-[0.2em] uppercase text-earth font-normal"
                      >
                        {c}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {shippingRates.map((r) => (
                  <tr
                    key={r.method}
                    className="border-b border-sand/60 transition-colors hover:bg-stone/40"
                  >
                    <td className="py-4 pr-6 font-body text-sm text-dark font-medium">
                      {r.method}
                    </td>
                    <td className="py-4 pr-6 font-body text-sm text-text-muted">
                      {r.time}
                    </td>
                    <td className="py-4 pr-6 font-body text-sm text-dark">
                      {r.cost}
                    </td>
                    <td className="py-4 pr-6 font-body text-sm text-text-muted">
                      {r.free}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          <motion.p
            variants={fadeInUp}
            className="font-body text-sm text-text-muted mt-8 leading-relaxed"
          >
            We ship to most Indian PIN codes. Remote areas may add 2–4 days.
            International shipping is coming soon — join the newsletter to be
            notified.
          </motion.p>
        </motion.div>
      </section>

      <section className="py-16 lg:py-24 px-6 lg:px-12 max-w-[1440px] mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.h2
            variants={fadeInUp}
            className="font-display text-2xl md:text-3xl font-light mb-10"
          >
            What happens after you order
          </motion.h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {timelines.map((t, i) => (
              <motion.div key={t.title} variants={fadeInUp} className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-6 h-6 rounded-full border border-gold text-gold text-[10px] flex items-center justify-center font-body">
                    {i + 1}
                  </span>
                  {i < timelines.length - 1 && (
                    <span className="hidden lg:block flex-1 h-px bg-sand" />
                  )}
                </div>
                <h3 className="font-display text-lg font-light mb-2">
                  {t.title}
                </h3>
                <p className="font-body text-sm text-text-muted leading-relaxed">
                  {t.text}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="py-16 lg:py-24 px-6 lg:px-12 max-w-[1440px] mx-auto bg-dark text-cream">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.p
            variants={fadeInUp}
            className="font-body text-[10px] tracking-[0.28em] uppercase text-gold mb-4"
          >
            Returns
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="font-display text-3xl md:text-4xl font-light mb-10"
          >
            Changed your mind? No problem.
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-x-16 gap-y-8 mb-14">
            {returns.map((r) => (
              <motion.div
                key={r.title}
                variants={fadeInUp}
                className="flex gap-4"
              >
                <RotateCcw className="w-5 h-5 text-gold flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-display text-lg font-light mb-1.5">
                    {r.title}
                  </h3>
                  <p className="font-body text-sm text-cream/60 leading-relaxed">
                    {r.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeInUp}>
            <h3 className="font-display text-xl font-light mb-4">
              What we can&apos;t accept
            </h3>
            <ul className="grid sm:grid-cols-2 gap-3">
              {notReturnable.map((n) => (
                <li
                  key={n}
                  className="font-body text-sm text-cream/50 leading-relaxed flex gap-3"
                >
                  <span className="text-gold/60">—</span>
                  {n}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </section>

      <section className="py-16 lg:py-24 px-6 lg:px-12 max-w-[1440px] mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10"
        >
          {[
            { icon: Truck, label: "Dispatch", value: "Within 24 hours" },
            { icon: PackageCheck, label: "Delivery", value: "5–7 business days" },
            { icon: CreditCard, label: "Payment", value: "UPI, cards, netbanking" },
            { icon: Headphones, label: "Support", value: "Mon–Sat, 10am–7pm" },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <motion.div key={s.label} variants={fadeInUp}>
                <Icon className="w-5 h-5 text-gold mb-3" />
                <p className="font-body text-[10px] tracking-[0.2em] uppercase text-earth mb-1.5">
                  {s.label}
                </p>
                <p className="font-display text-lg font-light">{s.value}</p>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          className="mt-14 flex flex-wrap items-center gap-6"
        >
          <Link
            href="/faq"
            className="font-body text-xs tracking-[0.15em] uppercase text-dark inline-flex items-center gap-2 group border-b border-transparent hover:border-gold pb-1 transition-colors"
          >
            Read the FAQ
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
          <Link
            href="/size-guide"
            className="font-body text-xs tracking-[0.15em] uppercase text-earth hover:text-dark transition-colors"
          >
            Size guide
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
