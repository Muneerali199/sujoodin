"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Ruler, HelpCircle, Truck, RotateCcw } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/framer-variants";

const sizeCharts = [
  {
    title: "Abaya & Kaftan",
    note: "Measurements in inches. Models are 5'8\" and wear size M.",
    columns: ["Size", "Bust", "Waist", "Length", "Sleeve"],
    rows: [
      ["XS", "32", "26", "52", "22"],
      ["S", "34", "28", "53", "22.5"],
      ["M", "36", "30", "54", "23"],
      ["L", "38", "32", "55", "23.5"],
      ["XL", "40", "34", "56", "24"],
    ],
  },
  {
    title: "Thobe & Kurta",
    note: "Measurements in inches. Add 1–2\" for comfort if between sizes.",
    columns: ["Size", "Chest", "Length", "Shoulder", "Sleeve"],
    rows: [
      ["4Y", "26", "30", "12", "18"],
      ["6Y", "28", "32", "13", "19"],
      ["8Y", "30", "34", "14", "20"],
      ["10Y", "32", "36", "15", "21"],
      ["12Y", "34", "38", "16", "22"],
    ],
  },
  {
    title: "Hijab & Scarf",
    note: "One size fits most. Length measured from one end to the other.",
    columns: ["Size", "Length", "Width", "Material"],
    rows: [
      ["Standard", "70\"", "18\"", "Chiffon / Nida"],
      ["Premium", "75\"", "20\"", "Silk blend / Jersey"],
      ["Jersey", "68\"", "17\"", "Cotton jersey"],
    ],
  },
];

const howToMeasure = [
  {
    step: "01",
    title: "Bust",
    text: "Measure around the fullest part of your chest, keeping the tape level all the way around.",
  },
  {
    step: "02",
    title: "Waist",
    text: "Measure around your natural waistline, just above the navel. Do not pull the tape tight.",
  },
  {
    step: "03",
    title: "Shoulder",
    text: "Measure across the shoulders, from the edge of one shoulder to the other.",
  },
  {
    step: "04",
    title: "Length",
    text: "Measure from the top of the shoulder down to where you want the garment to end.",
  },
];

const help = [
  {
    icon: Ruler,
    title: "Between two sizes?",
    text: "Size up for a relaxed fit, or size down for a closer silhouette. Modest fits are designed with ease built in.",
  },
  {
    icon: Truck,
    title: "First order?",
    text: "Most customers find their size by starting with their usual size in everyday clothing and adjusting from the chart.",
  },
  {
    icon: RotateCcw,
    title: "Not quite right?",
    text: "Returns are free within 7 days on unworn items with tags attached, so you can try the fit at home.",
  },
];

export default function SizeGuidePage() {
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
            Fit &amp; Sizing
          </motion.p>
          <motion.h1
            variants={fadeInUp}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-light leading-tight"
          >
            Size Guide
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="font-body text-sm md:text-base text-text-muted mt-6 leading-relaxed"
          >
            Every Sujood piece is cut with ease so it drapes rather than clings.
            Use the charts below to find your size, and reach out if you need a
            hand.
          </motion.p>
        </motion.div>
      </section>

      {sizeCharts.map((chart, i) => (
        <section
          key={chart.title}
          className={`py-16 lg:py-20 px-6 lg:px-12 max-w-[1440px] mx-auto ${
            i % 2 === 1 ? "bg-warm-white" : ""
          }`}
        >
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
              {chart.title}
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="font-body text-sm text-text-muted mb-8"
            >
              {chart.note}
            </motion.p>

            <motion.div variants={fadeInUp} className="overflow-x-auto">
              <table className="w-full min-w-[560px] border-collapse">
                <thead>
                  <tr className="border-b border-dark/20">
                    {chart.columns.map((c) => (
                      <th
                        key={c}
                        className="text-left py-3 pr-6 font-body text-[10px] tracking-[0.2em] uppercase text-earth font-normal"
                      >
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {chart.rows.map((row) => (
                    <tr
                      key={row[0]}
                      className="border-b border-sand/60 transition-colors hover:bg-stone/40"
                    >
                      {row.map((cell, ci) => (
                        <td
                          key={ci}
                          className={`py-4 pr-6 font-body text-sm ${
                            ci === 0
                              ? "text-dark font-medium"
                              : "text-text-muted"
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </motion.div>
        </section>
      ))}

      <section className="py-16 lg:py-24 px-6 lg:px-12 max-w-[1440px] mx-auto">
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
            How to Measure
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="font-body text-sm text-text-muted mb-10"
          >
            Use a soft measuring tape and wear the kind of layers you would
            normally wear underneath.
          </motion.p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {howToMeasure.map((m) => (
              <motion.div key={m.step} variants={fadeInUp}>
                <p className="font-display text-3xl text-gold/40 mb-3">
                  {m.step}
                </p>
                <h3 className="font-display text-lg font-light mb-2">
                  {m.title}
                </h3>
                <p className="font-body text-sm text-text-muted leading-relaxed">
                  {m.text}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="py-16 lg:py-24 px-6 lg:px-12 max-w-[1440px] mx-auto border-t border-sand">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid md:grid-cols-3 gap-8 lg:gap-12"
        >
          {help.map((h) => {
            const Icon = h.icon;
            return (
              <motion.div
                key={h.title}
                variants={fadeInUp}
                className="flex gap-4"
              >
                <Icon className="w-5 h-5 text-gold flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-display text-lg font-light mb-2">
                    {h.title}
                  </h3>
                  <p className="font-body text-sm text-text-muted leading-relaxed">
                    {h.text}
                  </p>
                </div>
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
            <HelpCircle size={15} className="text-earth" />
            Read the FAQ
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
          <Link
            href="/shop"
            className="font-body text-xs tracking-[0.15em] uppercase text-earth hover:text-dark transition-colors"
          >
            Continue shopping
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
