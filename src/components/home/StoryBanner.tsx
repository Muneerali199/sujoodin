import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Ornament } from "./OrnamentHeading";

export function StoryBanner() {
  return (
    <>
      <section className="relative h-[440px] sm:h-[520px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1772805498407-69163cc34bc9?auto=format&fit=crop&w=2000&q=80"
          alt="A quiet, considered corner of a home"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-forest-deep/60" />
        <div className="relative h-full max-w-4xl mx-auto px-6 flex flex-col items-center justify-center text-center">
          <p className="font-body text-[10px] tracking-[0.28em] uppercase text-gold mb-5">
            Because you deserve the best
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-[64px] font-light leading-[1.02] text-cream">
            Gifts that become
            <br />
            memories.
          </h2>
          <Ornament className="mt-7" />
          <p className="font-body text-sm text-cream/70 leading-relaxed mt-6 max-w-lg">
            Every piece is chosen to bring a little more stillness, beauty, and
            intention into your home.
          </p>
          <Link
            href="/about"
            className="group inline-flex items-center gap-2 mt-8 border border-cream/40 text-cream px-6 py-3.5 font-body text-[10px] tracking-[0.2em] uppercase hover:bg-cream hover:text-forest transition-colors"
          >
            Read our story
            <ArrowRight
              size={14}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </section>

      <section className="bg-parchment py-14 sm:py-16 border-b border-sand/60">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="font-body text-[10px] tracking-[0.26em] uppercase text-gold mb-4">
            From us, for you
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-light text-forest-deep">
            Share the Barakah!
          </h2>
          <p className="font-body text-sm text-text-muted leading-relaxed mt-5 max-w-xl mx-auto">
            Gifting is a sunnah — a small, tangible way of saying I see you, I
            care for you, and I make du&apos;a for you. We hope every Sujood
            parcel carries a little of that.
          </p>
        </div>
      </section>
    </>
  );
}
