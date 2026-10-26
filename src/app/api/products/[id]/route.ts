import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { serializeProduct, validateProduct } from "@/lib/product-validation";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, { params }: Ctx) {
  try {
    const { id } = await params;

    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid JSON body" },
        { status: 400 }
      );
    }

    // images/sizes/colors are stored as JSON strings, so they must be parsed
    // before merging the partial payload or they'd be dropped as non-arrays.
    const current = serializeProduct(existing);
    const result = validateProduct({ ...current, ...body });
    if (!result.ok) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 400 }
      );
    }
    const data = result.data;

    if (data.slug !== existing.slug) {
      const clash = await prisma.product.findUnique({
        where: { slug: data.slug },
        select: { id: true },
      });
      if (clash) {
        return NextResponse.json(
          {
            success: false,
            message: "Another product already uses this slug",
          },
          { status: 409 }
        );
      }
    }

    const product = await prisma.product.update({
      where: { id },
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

    return NextResponse.json({
      success: true,
      product: serializeProduct(product),
    });
  } catch (err) {
    console.error("PATCH /api/products/[id] error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(_req: NextRequest, { params }: Ctx) {
  try {
    const { id } = await params;

    const existing = await prisma.product.findUnique({
      where: { id },
      select: { id: true },
    });
    if (!existing) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    await prisma.product.delete({ where: { id } });

    return NextResponse.json({ success: true, message: "Deleted" });
  } catch (err) {
    console.error("DELETE /api/products/[id] error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to delete" },
      { status: 500 }
    );
  }
}
