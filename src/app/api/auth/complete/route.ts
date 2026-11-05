import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getNeonAuth } from "@/lib/auth/server";
import {
  CUSTOMER_COOKIE,
  createCustomerToken,
  customerCookieOptions,
} from "@/lib/customer-session";

export const dynamic = "force-dynamic";

function safeNext(value: string | null): string {
  return value && value.startsWith("/") && !value.startsWith("//")
    ? value
    : "/account";
}

export async function GET(request: NextRequest) {
  const auth = getNeonAuth();
  if (!auth) {
    return NextResponse.redirect(
      new URL("/account/login?error=google", request.url)
    );
  }

  const { data, error } = await auth.getSession();
  const user = data?.user;
  if (error || !user?.email) {
    return NextResponse.redirect(
      new URL("/account/login?error=google", request.url)
    );
  }

  const email = user.email.trim().toLowerCase();
  const name = (user.name?.trim() || email.split("@")[0] || "Sujood customer")
    .slice(0, 80);

  try {
    const customer = await prisma.customer.upsert({
      where: { email },
      update: {},
      create: { name, email, passwordHash: "" },
      select: { id: true },
    });

    const next = safeNext(request.nextUrl.searchParams.get("next"));
    const res = NextResponse.redirect(new URL(next, request.url));
    res.cookies.set(
      CUSTOMER_COOKIE,
      createCustomerToken(customer.id),
      customerCookieOptions
    );
    return res;
  } catch (err) {
    console.error("GET /api/auth/complete error:", err);
    return NextResponse.redirect(
      new URL("/account/login?error=google", request.url)
    );
  }
}
