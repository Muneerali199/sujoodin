import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/framer-variants";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  link?: { label: string; href: string };
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  link,
}: SectionHeaderProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={`mb-12 lg:mb-16 ${align === "center" ? "text-center" : "text-left"}`}
    >
      {eyebrow && (
        <motion.p
          variants={fadeInUp}
          className="font-body text-[10px] tracking-[0.25em] uppercase text-earth mb-4"
        >
          {eyebrow}
        </motion.p>
      )}
      <motion.h2
        variants={fadeInUp}
        className="font-display text-3xl md:text-4xl lg:text-5xl font-light leading-tight"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={fadeInUp}
          className="font-body text-sm text-text-muted mt-4 max-w-xl mx-auto leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
      {link && (
        <motion.div variants={fadeInUp} className="mt-6">
          <a
            href={link.href}
            className="font-body text-xs tracking-[0.15em] uppercase text-dark inline-flex items-center gap-2 group"
          >
            {link.label}
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </motion.div>
      )}
    </motion.div>
  );
}
