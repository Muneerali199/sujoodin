import { getProducts, getProductsByCategory } from "@/lib/server-data";
import { ShopBrowser } from "@/components/shop/ShopBrowser";
import { categories } from "@/lib/data";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ShopCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categorySlug } = await params;

  if (categorySlug === "all") {
    const products = await getProducts();
    return (
      <div className="pt-20">
        <section className="py-16 px-6 lg:px-12 max-w-[1440px] mx-auto">
          <p className="font-body text-[10px] tracking-[0.28em] uppercase text-earth mb-4">
            Collection
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light">
            Shop All
          </h1>
        </section>
        <ShopBrowser products={products} />
      </div>
    );
  }

  const category = categories.find((c) => c.slug === categorySlug);
  if (!category) {
    notFound();
  }

  let products = await getProductsByCategory(category.name);
  let activeCategory: string | null = categorySlug;
  const isSeasonalPreview = products.length === 0;

  if (isSeasonalPreview) {
    const allProducts = await getProducts();
    const related =
      categorySlug === "ramadan-specials"
        ? allProducts.filter((product) =>
            ["Prayer Essentials", "Home Decor"].includes(product.category)
          )
        : allProducts.filter((product) => product.featured);

    products = related.length > 0 ? related : allProducts;
    activeCategory = null;
  }

  return (
    <div className="pt-20">
      <section className="py-16 px-6 lg:px-12 max-w-[1440px] mx-auto">
        <p className="font-body text-[10px] tracking-[0.28em] uppercase text-earth mb-4">
          Collection
        </p>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light">
          {category.name}
        </h1>
        <p className="font-body text-sm text-text-muted mt-4 max-w-lg">
          {isSeasonalPreview
            ? "A curated seasonal preview while the full collection is being prepared."
            : `${products.length} ${
                products.length === 1 ? "piece" : "pieces"
              } in this collection.`}
        </p>
      </section>

      <ShopBrowser products={products} activeCategory={activeCategory} />
    </div>
  );
}
