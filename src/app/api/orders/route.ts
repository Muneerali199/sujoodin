import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { prisma } from "@/lib/prisma";
import { getCustomerIdFromRequest, EMAIL_PATTERN } from "@/lib/customer-auth";
import { computeTotals, COUPON_CODE } from "@/lib/commerce";

interface OrderItemInput {
  id: string;
  quantity: number;
  size?: string;
  color?: string;
}

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const customerId = getCustomerIdFromRequest(req);
    if (!customerId) {
      return NextResponse.json(
        { success: false, message: "Please sign in to place an order." },
        { status: 401 }
      );
    }

    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid request" },
        { status: 400 }
      );
    }

    const details = (body.details ?? {}) as Record<string, unknown>;
    const name = typeof details.name === "string" ? details.name.trim() : "";
    const email =
      typeof details.email === "string" ? details.email.trim().toLowerCase() : "";
    const phoneRaw = typeof details.phone === "string" ? details.phone : "";
    const phone = phoneRaw.replace(/\D/g, "");
    const address =
      typeof details.address === "string" ? details.address.trim() : "";
    const city = typeof details.city === "string" ? details.city.trim() : "";
    const state = typeof details.state === "string" ? details.state.trim() : "";
    const pincode =
      typeof details.pincode === "string" ? details.pincode.trim() : "";
    const notes =
      typeof details.notes === "string" ? details.notes.trim().slice(0, 500) : "";

    if (name.length < 2) {
      return NextResponse.json(
        { success: false, message: "Please enter your full name." },
        { status: 400 }
      );
    }
    if (!EMAIL_PATTERN.test(email) || email.length > 254) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email address." },
        { status: 400 }
      );
    }
    if (phone.length !== 10) {
      return NextResponse.json(
        { success: false, message: "Enter a 10-digit mobile number." },
        { status: 400 }
      );
    }
    if (address.length < 10) {
      return NextResponse.json(
        { success: false, message: "Please enter your full address." },
        { status: 400 }
      );
    }
    if (!city || !state) {
      return NextResponse.json(
        { success: false, message: "Please enter your city and state." },
        { status: 400 }
      );
    }
    if (!/^\d{6}$/.test(pincode)) {
      return NextResponse.json(
        { success: false, message: "Enter a valid 6-digit PIN code." },
        { status: 400 }
      );
    }

    const rawItems = Array.isArray(body.items) ? body.items : [];
    if (rawItems.length === 0 || rawItems.length > 50) {
      return NextResponse.json(
        { success: false, message: "Your cart is empty." },
        { status: 400 }
      );
    }

    const parsed: OrderItemInput[] = [];
    for (const raw of rawItems) {
      if (typeof raw !== "object" || raw === null) {
        return NextResponse.json(
          { success: false, message: "Invalid cart item." },
          { status: 400 }
        );
      }
      const item = raw as Record<string, unknown>;
      const id = typeof item.id === "string" ? item.id : "";
      const quantity = Number(item.quantity);
      const size =
        typeof item.size === "string" ? item.size.trim().slice(0, 60) : undefined;
      const color =
        typeof item.color === "string"
          ? item.color.trim().slice(0, 60)
          : undefined;

      if (!id || !Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
        return NextResponse.json(
          { success: false, message: "Invalid cart item quantity." },
          { status: 400 }
        );
      }
      parsed.push({ id, quantity, size, color });
    }

    const products = await prisma.product.findMany({
      where: { id: { in: [...new Set(parsed.map((item) => item.id))] } },
    });
    const productMap = new Map(products.map((product) => [product.id, product]));

    const lineItems = parsed.map((item) => {
      const product = productMap.get(item.id);
      if (!product) throw new Error("A product in your cart is no longer available.");
      if (!product.inStock) {
        throw new Error(`${product.name} is currently out of stock.`);
      }
      return {
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        size: item.size || null,
        color: item.color || null,
      };
    });

    const subtotal = lineItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const coupon =
      typeof body.coupon === "string" && body.coupon === COUPON_CODE
        ? COUPON_CODE
        : null;
    const totals = computeTotals(subtotal, coupon);

    const customer = await prisma.customer.findUnique({
      where: { id: customerId },
      select: { id: true },
    });
    if (!customer) {
      return NextResponse.json(
        { success: false, message: "Please sign in again." },
        { status: 401 }
      );
    }

    const number = `SJ-${new Date().getFullYear()}-${randomBytes(4)
      .toString("hex")
      .toUpperCase()}`;

    const order = await prisma.order.create({
      data: {
        number,
        customerId,
        name,
        email,
        phone,
        address,
        city,
        state,
        pincode,
        notes: notes || null,
        subtotal: totals.subtotal,
        discount: totals.discount,
        shipping: totals.shipping,
        total: totals.total,
        coupon,
        items: { create: lineItems },
      },
      select: {
        id: true,
        number: true,
        total: true,
        status: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ success: true, order }, { status: 201 });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Could not place your order.";
    const isStockIssue =
      message.includes("out of stock") || message.includes("no longer available");
    console.error("POST /api/orders error:", err);
    return NextResponse.json(
      {
        success: false,
        message: isStockIssue
          ? message
          : "Could not place your order. Please try again.",
      },
      { status: isStockIssue ? 409 : 500 }
    );
  }
}
