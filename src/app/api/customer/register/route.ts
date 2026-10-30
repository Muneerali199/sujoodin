import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  CUSTOMER_COOKIE,
  EMAIL_PATTERN,
  createCustomerToken,
  customerCookieOptions,
  hashPassword,
} from "@/lib/customer-auth";

export async function POST(req: NextRequest) {
  try {
    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid request" },
        { status: 400 }
      );
    }

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email =
      typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const password = typeof body.password === "string" ? body.password : "";
    const phoneRaw = typeof body.phone === "string" ? body.phone : "";
    const phone = phoneRaw.replace(/\D/g, "");

    if (name.length < 2 || name.length > 80) {
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
    if (password.length < 8 || password.length > 128) {
      return NextResponse.json(
        { success: false, message: "Password must be at least 8 characters." },
        { status: 400 }
      );
    }
    if (phone && phone.length !== 10) {
      return NextResponse.json(
        { success: false, message: "Enter a 10-digit mobile number." },
        { status: 400 }
      );
    }

    const existing = await prisma.customer.findUnique({
      where: { email },
      select: { id: true },
    });
    if (existing) {
      return NextResponse.json(
        {
          success: false,
          message: "An account with this email already exists. Please sign in.",
        },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);
    const customer = await prisma.customer.create({
      data: {
        name,
        email,
        passwordHash,
        phone: phone || null,
      },
      select: { id: true, name: true, email: true, phone: true },
    });

    const res = NextResponse.json({ success: true, customer }, { status: 201 });
    res.cookies.set(
      CUSTOMER_COOKIE,
      createCustomerToken(customer.id),
      customerCookieOptions
    );
    return res;
  } catch (err) {
    console.error("POST /api/customer/register error:", err);
    return NextResponse.json(
      { success: false, message: "Could not create your account. Try again." },
      { status: 500 }
    );
  }
}
