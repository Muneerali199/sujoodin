import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  CUSTOMER_COOKIE,
  EMAIL_PATTERN,
  createCustomerToken,
  customerCookieOptions,
  verifyPassword,
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

    const email =
      typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const password = typeof body.password === "string" ? body.password : "";

    if (!EMAIL_PATTERN.test(email) || !password) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password." },
        { status: 401 }
      );
    }

    const customer = await prisma.customer.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        passwordHash: true,
      },
    });

    const valid = customer
      ? await verifyPassword(password, customer.passwordHash)
      : false;

    if (!customer || !valid) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password." },
        { status: 401 }
      );
    }

    const res = NextResponse.json({
      success: true,
      customer: {
        id: customer.id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
      },
    });
    res.cookies.set(
      CUSTOMER_COOKIE,
      createCustomerToken(customer.id),
      customerCookieOptions
    );
    return res;
  } catch (err) {
    console.error("POST /api/customer/login error:", err);
    return NextResponse.json(
      { success: false, message: "Could not sign in. Try again." },
      { status: 500 }
    );
  }
}
