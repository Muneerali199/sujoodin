import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Product } from "@/lib/types/product";
import { OrnamentHeading } from "./OrnamentHeading";
import { ProductCard } from "./ProductCard";

export function NewArrivals({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <section
      id="new-arrivals"
      className="scroll-mt-20 sm:scroll-mt-32 py-20 lg:py-28 px-6 lg:px-10 max-w-[1440px] mx-auto border-t border-sand/60"
    >
      <OrnamentHeading
        eyebrow="Just landed"
        title="New Arrivals"
        subtitle="New pieces, same intention — considered design for a life lived in faith."
      />

      <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-8">
        {products.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="text-center mt-10">
        <Link
          href="/shop/collections/new-arrivals"
          className="group inline-flex items-center gap-2 border border-forest/30 text-forest px-6 py-3.5 font-body text-[10px] tracking-[0.2em] uppercase hover:bg-forest hover:text-cream hover:border-forest transition-colors"
        >
          View all new arrivals
          <ArrowRight
            size={14}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>
    </section>
  );
}
