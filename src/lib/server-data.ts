"use server";

import { prisma } from "@/lib/prisma";
import { serializeProduct } from "@/lib/product-validation";

export async function getProducts() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });
  return products.map(serializeProduct);
}

export async function getProductBySlug(slug: string) {
  const product = await prisma.product.findUnique({
    where: { slug },
  });
  return product ? serializeProduct(product) : null;
}

export async function getProductsByCategory(category: string) {
  const products = await prisma.product.findMany({
    where: { category },
    orderBy: { createdAt: "desc" },
  });
  return products.map(serializeProduct);
}
