import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { OrnamentHeading } from "./OrnamentHeading";

const sets = [
  {
    title: "The Prayer Edit",
    subtitle: "Mats, tasbeeh & prayer caps",
    image:
      "https://images.unsplash.com/photo-1761958150507-7bcc80840cf9?auto=format&fit=crop&w=900&q=80",
    href: "/shop/collections/prayer-sets",
  },
  {
    title: "Modest Layers",
    subtitle: "Abayas, hijabs & thobes",
    image:
      "https://images.unsplash.com/photo-1760083545495-b297b1690672?auto=format&fit=crop&w=900&q=80",
    href: "/shop/modest-fashion",
  },
  {
    title: "Home & Sanctuary",
    subtitle: "Art, candles & quiet corners",
    image:
      "https://images.unsplash.com/photo-1772805498407-69163cc34bc9?auto=format&fit=crop&w=900&q=80",
    href: "/shop/home-decor",
  },
  {
    title: "Ramadan & Eid",
    subtitle: "Seasonal gifts & essentials",
    image:
      "https://images.unsplash.com/photo-1771909752761-d26abe4e60ba?auto=format&fit=crop&w=900&q=80",
    href: "/shop/collections/ramadan-eid-gifts",
  },
];

export function CuratedSets() {
  return (
    <section
      id="gift-sets"
      className="scroll-mt-20 sm:scroll-mt-32 py-20 lg:py-28 px-6 lg:px-10 max-w-[1440px] mx-auto"
    >
      <OrnamentHeading
        eyebrow="Choose a set"
        title="Gift Sets by Type"
        subtitle="Four edits to begin with — each one built around the way faith lives in your everyday."
        action={{
          label: "Shop all",
          href: "/shop/collections/gift-sets",
        }}
      />

      <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {sets.map((set, index) => (
          <Link
            key={set.title}
            href={set.href}
            className={`group relative overflow-hidden bg-stone ${
              index % 2 === 1 ? "lg:mt-10" : ""
            }`}
          >
            <div className="relative aspect-[3/4]">
              <img
                src={set.image}
                alt={set.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/85 via-forest-deep/10 to-transparent" />
              <span className="absolute top-4 right-4 w-9 h-9 border border-cream/40 text-cream flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight size={16} />
              </span>
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <h3 className="font-display text-xl sm:text-2xl font-light text-cream">
                  {set.title}
                </h3>
                <p className="font-body text-[9px] sm:text-[10px] tracking-[0.12em] uppercase text-cream/70 mt-1.5">
                  {set.subtitle}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
