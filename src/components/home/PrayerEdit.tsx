import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Product } from "@/lib/types/product";
import { OrnamentHeading } from "./OrnamentHeading";
import { ProductCard } from "./ProductCard";

export function PrayerEdit({ products }: { products: Product[] }) {
  const prayer = products.filter((p) => p.category === "Prayer Essentials");
  const selection = [...prayer, ...products.filter((p) => p.category !== "Prayer Essentials")].slice(0, 4);

  if (selection.length === 0) return null;

  return (
    <section
      id="prayer-sets"
      className="scroll-mt-20 sm:scroll-mt-32 bg-[#F7F2E8] py-20 lg:py-24 border-y border-sand/60"
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <OrnamentHeading
          eyebrow="The daily ritual"
          title="Prayer Sets"
          subtitle="Everything you need for a quieter, more present prayer — chosen for comfort and craft."
        />

        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-8">
          {selection.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/shop/collections/prayer-sets"
            className="group inline-flex items-center gap-2 border border-forest/30 text-forest px-6 py-3.5 font-body text-[10px] tracking-[0.2em] uppercase hover:bg-forest hover:text-cream hover:border-forest transition-colors"
          >
            View all prayer sets
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
