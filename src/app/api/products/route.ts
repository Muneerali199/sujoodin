import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });

    const mapped = products.map((p) => ({
      ...p,
      images: JSON.parse(p.images),
      sizes: p.sizes ? JSON.parse(p.sizes) : null,
      colors: p.colors ? JSON.parse(p.colors) : null,
    }));

    return NextResponse.json({ success: true, products: mapped });
  } catch (err) {
    console.error("GET /api/products error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const product = await prisma.product.create({
      data: {
        name: body.name,
        slug: body.slug,
        category: body.category,
        price: parseFloat(body.price),
        originalPrice: body.originalPrice ? parseFloat(body.originalPrice) : null,
        description: body.description,
        images: JSON.stringify(body.images || []),
        badge: body.badge || null,
        sizes: body.sizes ? JSON.stringify(body.sizes) : null,
        colors: body.colors ? JSON.stringify(body.colors) : null,
        inStock: body.inStock ?? true,
        featured: body.featured ?? false,
      },
    });

    return NextResponse.json(
      { success: true, product },
      { status: 201 }
    );
  } catch (err) {
    console.error("POST /api/products error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to create product" },
      { status: 500 }
    );
  }
}
