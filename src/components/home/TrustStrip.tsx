import Link from "next/link";
import { Leaf, ShieldCheck, Star, Truck } from "lucide-react";

const stats = [
  {
    icon: Star,
    value: "4.9 / 5",
    label: "Loved by our community",
    href: "/#reviews",
  },
  {
    icon: Truck,
    value: "Pan-India",
    label: "Delivered to your door",
    href: "/shipping-returns#shipping",
  },
  {
    icon: ShieldCheck,
    value: "Secure",
    label: "Order requests, handled with care",
    href: "/faq",
  },
  {
    icon: Leaf,
    value: "Ethical",
    label: "Considered materials & making",
    href: "/about",
  },
];

export function TrustStrip() {
  return (
    <section className="bg-forest text-cream">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-12 sm:py-14">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <p className="font-body text-[10px] tracking-[0.26em] uppercase text-gold mb-3">
            Why choose Sujood?
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-light text-cream">
            Gifts that feel personal, made to be kept.
          </h2>
          <p className="font-body text-[10px] tracking-[0.14em] uppercase text-cream/50 mt-4">
            4.9 rating · 10K+ families · Pan-India delivery · Ethically sourced
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Link
                key={stat.value}
                href={stat.href}
                className={`flex flex-col items-center text-center px-3 ${
                  index > 0 ? "lg:border-l lg:border-cream/15" : ""
                } group`}
              >
                <Icon
                  size={20}
                  strokeWidth={1.2}
                  className="text-gold mb-3 transition-transform group-hover:-translate-y-1"
                />
                <p className="font-display text-xl sm:text-2xl font-light group-hover:text-gold transition-colors">
                  {stat.value}
                </p>
                <p className="font-body text-[9px] sm:text-[10px] tracking-[0.14em] uppercase text-cream/55 mt-1.5">
                  {stat.label}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
