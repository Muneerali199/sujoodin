import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    await prisma.product.delete({ where: { id } });

    return NextResponse.json({ success: true, message: "Deleted" });
  } catch (err) {
    console.error("DELETE error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to delete" },
      { status: 500 }
    );
  }
}
