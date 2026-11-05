import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { getNeonAuth } from "@/lib/auth/server";
import {
  CUSTOMER_COOKIE,
  verifyCustomerToken,
} from "@/lib/customer-session";

const PROTECTED_API = ["/api/upload", "/api/seed"];
const PUBLIC_ACCOUNT_PATHS = ["/account/login", "/account/register"];

function isProtectedApi(pathname: string, method: string): boolean {
  if (PROTECTED_API.some((p) => pathname.startsWith(p))) return true;
  if (pathname === "/api/products" && method !== "GET") return true;
  if (pathname.startsWith("/api/products/")) return true;
  return false;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const method = request.method;

  if (pathname === "/api/auth/complete") {
    const auth = getNeonAuth();
    if (!auth) {
      return NextResponse.json(
        { success: false, message: "Google sign-in is not configured." },
        { status: 503 }
      );
    }
    return auth.middleware()(request);
  }

  const needsAdmin =
    (pathname === "/admin" || pathname.startsWith("/admin/")) &&
    !pathname.startsWith("/admin/login")
      ? true
      : isProtectedApi(pathname, method);

  if (needsAdmin) {
    const token = request.cookies.get(SESSION_COOKIE)?.value;
    if (!verifySessionToken(token)) {
      if (pathname.startsWith("/admin")) {
        const login = new URL("/admin/login", request.url);
        login.searchParams.set("next", pathname);
        return NextResponse.redirect(login);
      }
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
    return NextResponse.next();
  }

  const isAccountPath =
    pathname === "/account" || pathname.startsWith("/account/");
  const isPublicAccount = PUBLIC_ACCOUNT_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );
  const needsCustomer =
    (isAccountPath && !isPublicAccount) ||
    pathname === "/api/orders" ||
    pathname.startsWith("/api/orders/");

  if (!needsCustomer) return NextResponse.next();

  const customerToken = request.cookies.get(CUSTOMER_COOKIE)?.value;
  if (!verifyCustomerToken(customerToken)) {
    if (isAccountPath) {
      const login = new URL("/account/login", request.url);
      login.searchParams.set("next", pathname);
      return NextResponse.redirect(login);
    }
    return NextResponse.json(
      { success: false, message: "Please sign in to continue." },
      { status: 401 }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/account/:path*", "/api/:path*"],
};
