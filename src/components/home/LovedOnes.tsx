import Link from "next/link";
import { OrnamentHeading } from "./OrnamentHeading";

const people = [
  {
    label: "For Husband",
    note: "Prayer caps & everyday pieces",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    href: "/shop/collections/for-husband",
  },
  {
    label: "For Wife",
    note: "Abayas, hijabs & soft layers",
    image:
      "https://images.unsplash.com/photo-1578973915942-f82bfcfedaba?auto=format&fit=crop&w=800&q=80",
    href: "/shop/collections/for-wife",
  },
  {
    label: "For Relatives",
    note: "A gift for the whole home",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    href: "/shop/collections/for-relatives",
  },
  {
    label: "For Kids",
    note: "Comfortable, considered thobes",
    image:
      "https://images.unsplash.com/photo-1616147147027-60d49d3582c4?auto=format&fit=crop&w=800&q=80",
    href: "/shop/collections/for-kids",
  },
  {
    label: "For Mother",
    note: "Quiet pieces for her home",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
    href: "/shop/collections/for-mother",
  },
  {
    label: "For Father",
    note: "Prayer essentials, thoughtfully chosen",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    href: "/shop/collections/for-father",
  },
  {
    label: "For Friends",
    note: "Small gestures, big du'a",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
    href: "/shop/collections/for-friends",
  },
];

export function LovedOnes() {
  return (
    <section
      id="loved-ones"
      className="scroll-mt-20 sm:scroll-mt-32 bg-[#F7F2E8] py-20 lg:py-24 border-y border-sand/60"
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <OrnamentHeading
          eyebrow="Gift by relationship"
          title="For Your Loved Ones"
          subtitle="Sometimes the hardest part is choosing. Start with who you're thinking of."
        />

        <div className="no-scrollbar mt-12 flex gap-5 sm:gap-7 overflow-x-auto px-1 pb-2 lg:justify-center">
          {people.map((person) => (
            <Link
              key={person.label}
              href={person.href}
              className="group shrink-0 w-[150px] sm:w-[180px] text-center"
            >
              <span className="arch-shape block bg-gold/60 p-[3px]">
                <span className="arch-shape block overflow-hidden bg-stone">
                  <img
                    src={person.image}
                    alt={person.label}
                    loading="lazy"
                    className="w-full h-[210px] sm:h-[245px] object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                </span>
              </span>
              <h3 className="font-display text-lg sm:text-xl font-light mt-5 group-hover:text-gold transition-colors">
                {person.label}
              </h3>
              <p className="font-body text-[9px] tracking-[0.1em] uppercase text-text-muted mt-1.5 leading-relaxed">
                {person.note}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
