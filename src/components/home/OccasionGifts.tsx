"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { OrnamentHeading } from "./OrnamentHeading";

const occasionChips = [
  {
    label: "Congratulations gifts",
    href: "/shop/collections/congratulations-gifts",
  },
  {
    label: "Bismillah Ceremony",
    href: "/shop/collections/bismillah-ceremony-gifts",
  },
  { label: "Aqiqah", href: "/shop/collections/aqiqah-gifts" },
  {
    label: "House Warming",
    href: "/shop/collections/housewarming-gifts",
  },
  {
    label: "Khatm-al-Quran",
    href: "/shop/collections/khatm-al-quran-gifts",
  },
];

const tabs = [
  {
    id: "wedding",
    label: "Wedding",
    cards: [
      {
        title: "Nikah Keepsakes",
        subtitle: "Gifts for the couple",
        image:
          "https://images.unsplash.com/photo-1608755728617-aefab37d2edd?auto=format&fit=crop&w=800&q=80",
        href: "/shop/collections/wedding-gifts",
      },
      {
        title: "A New Home",
        subtitle: "Decor for a new beginning",
        image:
          "https://images.unsplash.com/photo-1771909752761-d26abe4e60ba?auto=format&fit=crop&w=800&q=80",
        href: "/shop/collections/housewarming-gifts",
      },
      {
        title: "Modest Ceremony",
        subtitle: "Quietly elegant layers",
        image:
          "https://images.unsplash.com/photo-1772474569781-2fb1c6539f8c?auto=format&fit=crop&w=800&q=80",
        href: "/shop/collections/wedding-gifts",
      },
      {
        title: "The Gift Edit",
        subtitle: "Wrapped with intention",
        image:
          "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=800&q=80",
        href: "/shop/collections/gift-edit",
      },
    ],
  },
  {
    id: "umrah",
    label: "Umrah",
    cards: [
      {
        title: "Welcome Home",
        subtitle: "For the returning pilgrim",
        image:
          "https://images.unsplash.com/photo-1761958150507-7bcc80840cf9?auto=format&fit=crop&w=800&q=80",
        href: "/shop/collections/umrah-gifts",
      },
      {
        title: "Prayer on the Move",
        subtitle: "Mats, tasbeeh & caps",
        image:
          "https://images.unsplash.com/photo-1556760647-90d218f7ca5b?auto=format&fit=crop&w=800&q=80",
        href: "/shop/collections/umrah-gifts",
      },
      {
        title: "A Gift of Du'a",
        subtitle: "Something to keep close",
        image:
          "https://images.unsplash.com/photo-1608755728617-aefab37d2edd?auto=format&fit=crop&w=800&q=80",
        href: "/shop/collections/umrah-gifts",
      },
      {
        title: "The Homecoming",
        subtitle: "A quiet corner at home",
        image:
          "https://images.unsplash.com/photo-1772805498407-69163cc34bc9?auto=format&fit=crop&w=800&q=80",
        href: "/shop/collections/umrah-gifts",
      },
    ],
  },
  {
    id: "celebrations",
    label: "Celebrations",
    cards: [
      {
        title: "The Ramadan Edit",
        subtitle: "For the month of mercy",
        image:
          "https://images.unsplash.com/photo-1771909752761-d26abe4e60ba?auto=format&fit=crop&w=800&q=80",
        href: "/shop/collections/ramadan-eid-gifts",
      },
      {
        title: "Eid Gifting",
        subtitle: "Make someone's morning",
        image:
          "https://images.unsplash.com/photo-1608755728617-aefab37d2edd?auto=format&fit=crop&w=800&q=80",
        href: "/shop/collections/ramadan-eid-gifts",
      },
      {
        title: "Prayer at Home",
        subtitle: "A softer place to pray",
        image:
          "https://images.unsplash.com/photo-1556760647-90d218f7ca5b?auto=format&fit=crop&w=800&q=80",
        href: "/shop/collections/prayer-sets",
      },
      {
        title: "Hosting Gifts",
        subtitle: "For iftar tables",
        image:
          "https://images.unsplash.com/photo-1772805498407-69163cc34bc9?auto=format&fit=crop&w=800&q=80",
        href: "/shop/collections/ramadan-eid-gifts",
      },
    ],
  },
  {
    id: "congratulations",
    label: "Congratulations",
    cards: [
      {
        title: "Gifts Under ₹999",
        subtitle: "Small things, big du'a",
        image:
          "https://images.unsplash.com/photo-1608755728617-aefab37d2edd?auto=format&fit=crop&w=800&q=80",
        href: "/shop/collections/gifts-under-999",
      },
      {
        title: "Best Sellers",
        subtitle: "The ones everyone loves",
        image:
          "https://images.unsplash.com/photo-1556760647-90d218f7ca5b?auto=format&fit=crop&w=800&q=80",
        href: "/shop/collections/best-sellers",
      },
      {
        title: "New Arrivals",
        subtitle: "Fresh from the atelier",
        image:
          "https://images.unsplash.com/photo-1772474569781-2fb1c6539f8c?auto=format&fit=crop&w=800&q=80",
        href: "/shop/collections/new-arrivals",
      },
      {
        title: "The Gift Edit",
        subtitle: "Curated for every bond",
        image:
          "https://images.unsplash.com/photo-1608755728617-aefab37d2edd?auto=format&fit=crop&w=800&q=80",
        href: "/shop/collections/gift-edit",
      },
    ],
  },
];

export function OccasionGifts() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const active = tabs.find((tab) => tab.id === activeTab) ?? tabs[0];

  return (
    <section
      id="occasions"
      className="scroll-mt-20 sm:scroll-mt-32 py-20 lg:py-28 px-6 lg:px-10 max-w-[1440px] mx-auto"
    >
      <OrnamentHeading
        eyebrow="Curated for the moment"
        title="Gifts for Every Occasion"
        subtitle="From quiet everyday rituals to the milestones that deserve a little extra care."
      />

      <div className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`font-body text-[10px] tracking-[0.18em] uppercase pb-2 border-b transition-colors ${
              activeTab === tab.id
                ? "text-forest border-gold"
                : "text-text-muted border-transparent hover:text-forest"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
        {occasionChips.map((chip) => (
          <Link
            key={chip.label}
            href={chip.href}
            className="font-body text-[9px] tracking-[0.1em] uppercase text-earth/70 hover:text-forest transition-colors"
          >
            {chip.label}
          </Link>
        ))}
      </div>

      <div className="mt-9 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {active.cards.map((card) => (
          <Link key={card.title} href={card.href} className="group">
            <div className="relative aspect-[4/3] overflow-hidden bg-stone">
              <img
                src={card.image}
                alt={card.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute bottom-3 right-3 w-8 h-8 bg-cream/90 text-forest flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <ArrowUpRight size={15} />
              </span>
            </div>
            <div className="bg-warm-white border border-sand/70 border-t-0 px-4 py-4">
              <h3 className="font-display text-lg font-light text-dark group-hover:text-gold transition-colors">
                {card.title}
              </h3>
              <p className="font-body text-[10px] tracking-[0.08em] uppercase text-text-muted mt-1">
                {card.subtitle}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
