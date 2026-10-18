import { getProductBySlug, getProducts } from "@/lib/server-data";
import { notFound } from "next/navigation";
import ProductClient from "@/components/product/ProductClient";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const allProducts = await getProducts();
  const related = allProducts.filter((p) => p.id !== product.id).slice(0, 4);

  return <ProductClient product={product} related={related} />;
}
