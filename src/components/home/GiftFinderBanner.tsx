import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function GiftFinderBanner() {
  return (
    <section className="bg-sage border-y border-forest/10">
      <div className="max-w-[1200px] mx-auto px-6 py-14 sm:py-16 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-8 sm:gap-10">
        <div className="text-center md:text-right">
          <p className="font-body text-[10px] tracking-[0.26em] uppercase text-forest/60 mb-3">
            Not sure where to start?
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-light leading-[1.05] text-forest-deep">
            Find a gift
            <br />
            they&apos;ll keep.
          </h2>
        </div>

        <div className="arch-shape w-40 sm:w-48 h-52 sm:h-60 overflow-hidden bg-stone mx-auto">
          <img
            src="https://images.unsplash.com/photo-1608755728617-aefab37d2edd?auto=format&fit=crop&w=700&q=80"
            alt="A thoughtfully wrapped gift"
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="text-center md:text-left">
          <p className="font-body text-sm text-earth leading-relaxed max-w-xs mx-auto md:mx-0">
            Browse our curated gift edit, or tell us who it&apos;s for and
            we&apos;ll help you find something meaningful.
          </p>
          <Link
            href="/shop/collections/gift-edit"
            className="group inline-flex items-center gap-2 mt-6 bg-forest text-cream px-6 py-3.5 font-body text-[10px] tracking-[0.2em] uppercase hover:bg-forest-deep transition-colors"
          >
            Explore the gift edit
            <ArrowRight
              size={14}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
