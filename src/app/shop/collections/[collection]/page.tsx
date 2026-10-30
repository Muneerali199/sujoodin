import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { ShopBrowser } from "@/components/shop/ShopBrowser";
import { getProducts } from "@/lib/server-data";
import {
  getCollectionProducts,
  getShopCollection,
} from "@/lib/shop-collections";

export const dynamic = "force-dynamic";

type CollectionPageProps = {
  params: Promise<{ collection: string }>;
};

export async function generateMetadata({
  params,
}: CollectionPageProps): Promise<Metadata> {
  const { collection: slug } = await params;
  const collection = getShopCollection(slug);

  if (!collection) return {};

  return {
    title: collection.title,
    description: collection.description,
  };
}

export default async function ShopCollectionPage({
  params,
}: CollectionPageProps) {
  const { collection: slug } = await params;
  const collection = getShopCollection(slug);

  if (!collection) notFound();

  const allProducts = await getProducts();
  const products = getCollectionProducts(allProducts, collection);

  return (
    <div className="pt-20">
      <section className="border-b border-sand/60 bg-parchment px-6 py-14 lg:px-12 lg:py-20">
        <div className="max-w-[1440px] mx-auto">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 font-body text-[10px] tracking-[0.12em] uppercase text-text-muted"
          >
            <Link href="/" className="hover:text-forest transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-forest transition-colors">
              Shop
            </Link>
            <span>/</span>
            <span className="text-earth">{collection.title}</span>
          </nav>

          <div className="mt-9 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div className="max-w-2xl">
              <p className="font-body text-[10px] tracking-[0.28em] uppercase text-gold mb-4">
                {collection.eyebrow}
              </p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-forest-deep">
                {collection.title}
              </h1>
              <p className="font-body text-sm text-text-muted mt-5 max-w-xl leading-relaxed">
                {collection.description}
              </p>
            </div>

            <Link
              href="/shop"
              className="group inline-flex w-fit items-center gap-2 border-b border-forest/30 pb-1 font-body text-[10px] tracking-[0.18em] uppercase text-forest hover:border-gold hover:text-gold transition-colors"
            >
              <ArrowLeft
                size={13}
                className="transition-transform group-hover:-translate-x-1"
              />
              Browse all products
            </Link>
          </div>
        </div>
      </section>

      <div className="pt-12">
        <ShopBrowser
          key={collection.slug}
          products={products}
          initialSort={collection.defaultSort}
        />
      </div>
    </div>
  );
}
