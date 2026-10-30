import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Ornament } from "./OrnamentHeading";

export function QuoteSection() {
  return (
    <section className="bg-parchment py-20 sm:py-24 border-y border-sand/60">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <div className="mx-auto mb-7 w-12 h-12 rounded-full border border-gold/40 flex items-center justify-center text-gold">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path d="M15.5 3.5a8.5 8.5 0 1 0 5 14.8 7 7 0 1 1-5-14.8Z" />
            <path d="M19 6.5v3M17.5 8h3" />
          </svg>
        </div>
        <p className="font-body text-[10px] tracking-[0.26em] uppercase text-gold mb-5">
          Gifting, the Sujood way
        </p>
        <h2 className="font-display text-4xl sm:text-5xl lg:text-[56px] font-light leading-[1.05] text-forest-deep">
          Unique Islamic Gifts Online
        </h2>
        <Ornament className="mt-7" />
        <blockquote className="font-display text-xl sm:text-2xl font-light italic text-earth leading-relaxed mt-7">
          &ldquo;Give gifts and you will love one another.&rdquo;
        </blockquote>
        <p className="font-body text-[10px] tracking-[0.18em] uppercase text-text-muted mt-4">
          Al-Adab Al-Mufrad 594
        </p>
        <Link
          href="/shop/collections/gift-edit"
          className="group mt-8 inline-flex items-center gap-2 border-b border-forest/30 pb-1 font-body text-[10px] tracking-[0.18em] uppercase text-forest hover:border-gold hover:text-gold transition-colors"
        >
          Explore Islamic gifts
          <ArrowRight
            size={13}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>
    </section>
  );
}
