import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function PromiseStrip() {
  return (
    <section className="bg-sage">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-10 sm:py-12 grid grid-cols-1 lg:grid-cols-[0.8fr_1.4fr_0.8fr] items-center gap-8">
        <p className="font-body text-[10px] tracking-[0.26em] uppercase text-forest/70">
          Our Promise
        </p>

        <div className="text-center">
          <p className="font-display text-2xl sm:text-3xl lg:text-[34px] font-light italic leading-snug text-forest-deep">
            You make the niyyah. We make it meaningful.
          </p>
          <p className="font-body text-[11px] tracking-[0.1em] uppercase text-earth mt-3">
            Considered gifts · Ethically sourced · Packed with care
          </p>
        </div>

        <Link
          href="/about"
          className="group justify-self-start lg:justify-self-end inline-flex items-center gap-2 font-body text-[10px] tracking-[0.2em] uppercase text-forest border-b border-forest/30 pb-1 hover:border-gold hover:text-gold transition-colors"
        >
          Our story
          <ArrowRight
            size={14}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>
    </section>
  );
}
