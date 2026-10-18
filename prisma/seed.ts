import { PrismaClient } from "@prisma/client";
import { products } from "@/lib/data";

const prisma = new PrismaClient();

async function main() {
  // Idempotent: clear existing products before seeding
  await prisma.product.deleteMany();

  for (const p of products) {
    await prisma.product.create({
      data: {
        name: p.name,
        slug: p.slug,
        category: p.category,
        price: p.price,
        originalPrice: p.originalPrice || null,
        description: p.description,
        images: JSON.stringify(p.images),
        badge: p.badge || null,
        sizes: p.sizes ? JSON.stringify(p.sizes) : null,
        colors: p.colors ? JSON.stringify(p.colors) : null,
        inStock: p.inStock,
        featured: p.featured ?? false,
      },
    });
  }

  const count = await prisma.product.count();
  console.log(`Seeded ${count} products successfully.`);
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
