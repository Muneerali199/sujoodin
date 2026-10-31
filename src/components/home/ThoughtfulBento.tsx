import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { OrnamentHeading } from "./OrnamentHeading";

const tiles = [
  {
    title: "Prayer Essentials",
    label: "A softer daily ritual",
    image:
      "https://images.unsplash.com/photo-1761958150507-7bcc80840cf9?auto=format&fit=crop&w=1200&q=80",
    href: "/shop/prayer-essentials",
    span: "col-span-2 row-span-2",
  },
  {
    title: "Home & Decor",
    label: "Quiet corners",
    image:
      "https://images.unsplash.com/photo-1772805498407-69163cc34bc9?auto=format&fit=crop&w=1200&q=80",
    href: "/shop/home-decor",
    span: "col-span-2",
  },
  {
    title: "Modest Fashion",
    label: "Everyday layers",
    image:
      "https://images.unsplash.com/photo-1772474569781-2fb1c6539f8c?auto=format&fit=crop&w=900&q=80",
    href: "/shop/modest-fashion",
    span: "col-span-1",
  },
  {
    title: "Ramadan",
    label: "Seasonal rituals",
    image:
      "https://images.unsplash.com/photo-1771909752761-d26abe4e60ba?auto=format&fit=crop&w=900&q=80",
    href: "/shop/collections/ramadan-eid-gifts",
    span: "col-span-1",
  },
  {
    title: "Gifts & Hampers",
    label: "Wrapped with intention",
    image:
      "https://images.unsplash.com/photo-1608755728617-aefab37d2edd?auto=format&fit=crop&w=1200&q=80",
    href: "/shop/collections/hamper-sets",
    span: "col-span-2",
  },
  {
    title: "The Journal",
    label: "Stories for slow living",
    image:
      "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=1200&q=80",
    href: "/journal",
    span: "col-span-2",
  },
];

export function ThoughtfulBento() {
  return (
    <section className="py-20 lg:py-28 px-6 lg:px-10 max-w-[1440px] mx-auto">
      <OrnamentHeading
        eyebrow="A little more intention"
        title="Thoughtful Gifting"
        subtitle="Beautiful, useful pieces that fit naturally into the lives of the people you love."
      />

      <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 auto-rows-[150px] sm:auto-rows-[180px] lg:auto-rows-[200px] gap-3 sm:gap-4">
        {tiles.map((tile) => (
          <Link
            key={tile.title}
            href={tile.href}
            className={`group relative overflow-hidden bg-stone ${tile.span}`}
          >
            <img
              src={tile.image}
              alt={tile.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 via-forest-deep/10 to-transparent" />
            <span className="absolute top-4 right-4 w-8 h-8 border border-cream/40 text-cream flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowUpRight size={15} />
            </span>
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
              <p className="font-body text-[8px] sm:text-[9px] tracking-[0.16em] uppercase text-cream/60">
                {tile.label}
              </p>
              <h3 className="font-display text-lg sm:text-2xl font-light text-cream mt-1">
                {tile.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
