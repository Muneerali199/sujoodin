import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { serializeProduct, validateProduct } from "@/lib/product-validation";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      products: products.map(serializeProduct),
    });
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
    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid JSON body" },
        { status: 400 }
      );
    }

    const result = validateProduct(body);
    if (!result.ok) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 400 }
      );
    }
    const data = result.data;

    const clash = await prisma.product.findUnique({
      where: { slug: data.slug },
      select: { id: true },
    });
    if (clash) {
      return NextResponse.json(
        { success: false, message: "A product with this slug already exists" },
        { status: 409 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name: data.name,
        slug: data.slug,
        category: data.category,
        price: data.price,
        originalPrice: data.originalPrice,
        description: data.description,
        images: JSON.stringify(data.images),
        badge: data.badge,
        sizes: data.sizes ? JSON.stringify(data.sizes) : null,
        colors: data.colors ? JSON.stringify(data.colors) : null,
        inStock: data.inStock,
        featured: data.featured,
      },
    });

    return NextResponse.json(
      { success: true, product: serializeProduct(product) },
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
