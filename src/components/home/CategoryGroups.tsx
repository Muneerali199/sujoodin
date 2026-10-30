import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { OrnamentHeading } from "./OrnamentHeading";

const groups = [
  {
    title: "Faith & Home Gifts",
    links: [
      { label: "Prayer Essentials", href: "/shop/prayer-essentials" },
      { label: "Home & Decor", href: "/shop/home-decor" },
      { label: "Modest Fashion", href: "/shop/modest-fashion" },
      { label: "Ramadan Specials", href: "/shop/ramadan-specials" },
    ],
  },
  {
    title: "Gifts & Hampers",
    links: [
      { label: "The Gift Edit", href: "/shop/collections/gift-edit" },
      {
        label: "New Arrivals",
        href: "/shop/collections/new-arrivals",
      },
      { label: "Best Sellers", href: "/shop/collections/best-sellers" },
      {
        label: "Wedding Gifts",
        href: "/shop/collections/wedding-gifts",
      },
    ],
  },
  {
    title: "For Every Bond",
    links: [
      { label: "For Her", href: "/shop/collections/for-wife" },
      { label: "For Him", href: "/shop/collections/for-husband" },
      { label: "For Kids", href: "/shop/collections/for-kids" },
      { label: "For Family", href: "/shop/collections/for-family" },
    ],
  },
  {
    title: "Scent & Sanctuary",
    links: [
      { label: "Candles", href: "/shop/collections/candles" },
      { label: "Wall Art", href: "/shop/collections/wall-art" },
      { label: "Home Accents", href: "/shop/collections/home-accents" },
      { label: "The Journal", href: "/journal" },
    ],
  },
];

export function CategoryGroups() {
  return (
    <section className="bg-warm-white border-y border-sand/60 py-20 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <OrnamentHeading
          eyebrow="Browse the full edit"
          title="Categories"
          subtitle="Explore the collections by the way you live, pray, gift, and gather."
          action={{ label: "Shop all products", href: "/shop" }}
        />

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {groups.map((group) => (
            <div key={group.title}>
              <h3 className="font-display text-xl font-light text-forest-deep">
                {group.title}
              </h3>
              <ul className="mt-4">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group flex items-center justify-between border-b border-sand/60 py-2.5 font-body text-xs text-earth hover:text-forest transition-colors"
                    >
                      {link.label}
                      <ArrowUpRight
                        size={12}
                        className="opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
