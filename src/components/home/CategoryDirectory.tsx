import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories } from "@/lib/data";
import { OrnamentHeading } from "./OrnamentHeading";

const details: Record<
  string,
  { description: string; items: string[] }
> = {
  "modest-fashion": {
    description: "Quietly elegant layers for every day and every occasion.",
    items: ["Abayas", "Hijabs", "Thobes", "Kids"],
  },
  "home-decor": {
    description: "Bring a little stillness and beauty into your space.",
    items: ["Wall Art", "Candles", "Cushions", "Table"],
  },
  "prayer-essentials": {
    description: "Everything you need for a softer, more present ritual.",
    items: ["Prayer Mats", "Tasbeeh", "Caps", "Sets"],
  },
  "ramadan-specials": {
    description: "Gifts and essentials for the month of mercy.",
    items: ["Eid Gifts", "Decor", "Prayer", "Hampers"],
  },
};

export function CategoryDirectory({
  counts,
}: {
  counts: Record<string, number>;
}) {
  return (
    <section
      id="categories"
      className="scroll-mt-20 sm:scroll-mt-32 py-20 lg:py-28 px-6 lg:px-10 max-w-[1440px] mx-auto"
    >
      <OrnamentHeading
        align="left"
        eyebrow="Find your ritual"
        title="Shop by Category"
        subtitle="A considered collection for the way you live, pray, and gather."
        action={{ label: "View all products", href: "/shop" }}
      />

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
        {categories.map((category) => {
          const detail = details[category.slug];
          const count = counts[category.name] ?? 0;

          return (
            <Link
              key={category.id}
              href={`/shop/${category.slug}`}
              className="group flex bg-warm-white border border-sand/70 overflow-hidden"
            >
              <div className="relative w-[38%] sm:w-[42%] min-h-[190px] bg-stone overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex-1 p-5 sm:p-7 flex flex-col">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-2xl sm:text-[28px] font-light text-dark group-hover:text-gold transition-colors">
                    {category.name}
                  </h3>
                  <ArrowRight
                    size={16}
                    className="text-earth/50 mt-1 shrink-0 transition-transform group-hover:translate-x-1 group-hover:text-gold"
                  />
                </div>
                <p className="font-body text-xs text-text-muted leading-relaxed mt-2">
                  {detail?.description}
                </p>
                <ul className="flex flex-wrap gap-x-3 gap-y-1 mt-4">
                  {detail?.items.map((item) => (
                    <li
                      key={item}
                      className="font-body text-[9px] tracking-[0.1em] uppercase text-earth/70"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="font-body text-[9px] tracking-[0.16em] uppercase text-gold mt-auto pt-5">
                  {count > 0 ? `${count} ${count === 1 ? "piece" : "pieces"}` : "Seasonal edit"}
                </p>
              </div>
            </Link>
          );
        })}

        <Link
          href="/shop/collections/hamper-sets"
          className="group flex md:col-span-2 bg-warm-white border border-sand/70 overflow-hidden"
        >
          <div className="relative w-[38%] sm:w-[42%] min-h-[190px] bg-stone overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1607344645866-009c320b63e0?auto=format&fit=crop&w=900&q=85"
              alt="Sujood hamper sets"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="flex-1 p-5 sm:p-7 flex flex-col">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-display text-2xl sm:text-[28px] font-light text-dark group-hover:text-gold transition-colors">
                Hamper Sets
              </h3>
              <ArrowRight
                size={16}
                className="text-earth/50 mt-1 shrink-0 transition-transform group-hover:translate-x-1 group-hover:text-gold"
              />
            </div>
            <p className="font-body text-xs text-text-muted leading-relaxed mt-2">
              Layered gifts for weddings, Eid, new homes, and the people who
              make your everyday beautiful.
            </p>
            <ul className="flex flex-wrap gap-x-3 gap-y-1 mt-4">
              {["Janamaz & Tasbeeh", "Itr & Tasbeeh", "Hadiya Sets", "Hijab & Bouquet", "Custom"].map((item) => (
                <li
                  key={item}
                  className="font-body text-[9px] tracking-[0.1em] uppercase text-earth/70"
                >
                  {item}
                </li>
              ))}
            </ul>
            <p className="font-body text-[9px] tracking-[0.16em] uppercase text-gold mt-auto pt-5">
              5 curated sets
            </p>
          </div>
        </Link>
      </div>
    </section>
  );
}
