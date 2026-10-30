import Link from "next/link";
import { Globe2 } from "lucide-react";
import { Ornament } from "./OrnamentHeading";

const countries = [
  "Qatar",
  "Kuwait",
  "Australia",
  "USA",
  "Canada",
  "Saudi",
  "UAE",
  "UK",
];

export function DeliveryStrip() {
  return (
    <section className="bg-parchment py-16 sm:py-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <Globe2
          size={22}
          strokeWidth={1.2}
          className="text-forest mx-auto mb-4"
        />
        <p className="font-body text-[10px] tracking-[0.26em] uppercase text-gold mb-3">
          Across borders
        </p>
        <h2 className="font-display text-3xl sm:text-4xl font-light text-forest-deep">
          Send Gifts Worldwide
        </h2>
        <Ornament className="mt-5" />
        <p className="font-body text-sm text-text-muted leading-relaxed mt-5 max-w-xl mx-auto">
          Express delivery across India today. International shipping is coming
          soon to the places our community calls home — join the newsletter to
          be the first to know.
        </p>
        <div className="flex flex-wrap justify-center gap-2 mt-7">
          {countries.map((country) => (
            <Link
              key={country}
              href="/shipping-returns#shipping"
              aria-label={`${country} shipping information`}
              className="font-body text-[10px] tracking-[0.08em] text-earth border border-sand px-3 py-1.5 hover:border-forest hover:text-forest transition-colors"
            >
              {country}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
