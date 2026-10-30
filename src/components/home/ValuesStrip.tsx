import Link from "next/link";
import { HeartHandshake, Leaf, MoonStar, Users } from "lucide-react";
import { Ornament } from "./OrnamentHeading";

const values = [
  {
    icon: MoonStar,
    title: "Rooted in faith",
    text: "Pieces chosen to fit naturally into your daily practice.",
    href: "/shop/collections/faith-inspired-gifts",
  },
  {
    icon: HeartHandshake,
    title: "Gifts with purpose",
    text: "Thoughtful objects that say more than a message ever could.",
    href: "/shop/collections/gift-edit",
  },
  {
    icon: Users,
    title: "For every bond",
    text: "From nikah to Ramadan, something for everyone you love.",
    href: "/shop/collections/for-family",
  },
  {
    icon: Leaf,
    title: "Made to be kept",
    text: "Considered materials and timeless design, not trends.",
    href: "/about",
  },
];

export function ValuesStrip() {
  return (
    <section className="bg-sage border-y border-forest/10">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-16 sm:py-20">
        <div className="text-center">
          <p className="font-body text-[10px] tracking-[0.26em] uppercase text-forest/60 mb-4">
            The Sujood difference
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-light text-forest-deep">
            Gifts with a Higher Purpose
          </h2>
          <Ornament className="mt-6" />
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <Link
                key={value.title}
                href={value.href}
                className={`text-center px-2 ${
                  index > 0 ? "lg:border-l lg:border-forest/10" : ""
                } group`}
              >
                <Icon
                  size={22}
                  strokeWidth={1.2}
                  className="text-forest mx-auto mb-4 transition-transform group-hover:-translate-y-1"
                />
                <h3 className="font-display text-xl font-light text-forest-deep group-hover:text-gold transition-colors">
                  {value.title}
                </h3>
                <p className="font-body text-xs text-earth leading-relaxed mt-2 max-w-[220px] mx-auto">
                  {value.text}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
