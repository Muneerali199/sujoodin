import { getProducts } from "@/lib/server-data";
import { ShopBrowser } from "@/components/shop/ShopBrowser";

export const dynamic = "force-dynamic";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const [params, products] = await Promise.all([searchParams, getProducts()]);
  const query = typeof params.q === "string" ? params.q.trim() : "";

  return (
    <div className="pt-20">
      <section className="py-16 px-6 lg:px-12 max-w-[1440px] mx-auto">
        <p className="font-body text-[10px] tracking-[0.28em] uppercase text-earth mb-4">
          {query ? "Search" : "Collection"}
        </p>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light">
          {query ? `Results for “${query}”` : "Shop All"}
        </h1>
        <p className="font-body text-sm text-text-muted mt-4 max-w-lg">
          {query
            ? "Browse matching products, then refine the results by category, price, or sort order."
            : "Discover our complete collection of modest fashion, Islamic home decor, and prayer essentials."}
        </p>
      </section>

      <ShopBrowser
        key={query || "all"}
        products={products}
        initialSearch={query}
      />
    </div>
  );
}
