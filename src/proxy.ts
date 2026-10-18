import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

const PROTECTED_API = ["/api/upload", "/api/seed"];

function isProtectedApi(pathname: string, method: string): boolean {
  if (PROTECTED_API.some((p) => pathname.startsWith(p))) return true;
  if (pathname === "/api/products" && method !== "GET") return true;
  if (pathname.startsWith("/api/products/")) return true;
  return false;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const method = request.method;

  const needsAuth =
    (pathname === "/admin" || pathname.startsWith("/admin/")) &&
    !pathname.startsWith("/admin/login")
      ? true
      : isProtectedApi(pathname, method);

  if (!needsAuth) return NextResponse.next();

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

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
};
