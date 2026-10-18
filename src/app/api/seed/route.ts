import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { products } from "@/lib/data";

export async function POST(req: NextRequest) {
  try {
    const force =
      new URL(req.url).searchParams.get("force") === "true" ||
      (await req.json().then((b) => b?.force === true).catch(() => false));

    if (force) {
      await prisma.product.deleteMany();
    } else {
      const existing = await prisma.product.count();
      if (existing > 0) {
        return NextResponse.json({
          success: true,
          message: `Already seeded (${existing} products)`,
        });
      }
    }

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

    return NextResponse.json({
      success: true,
      message: `Seeded ${products.length} products successfully`,
    });
  } catch (err) {
    console.error("Seed error:", err);
    return NextResponse.json(
      { success: false, message: "Seed failed" },
      { status: 500 }
    );
  }
}
