import { NextResponse } from "next/server";
import {
  CUSTOMER_COOKIE,
  customerCookieOptions,
} from "@/lib/customer-auth";

export async function POST() {
  const res = NextResponse.json({ success: true });
  res.cookies.set(CUSTOMER_COOKIE, "", {
    ...customerCookieOptions,
    maxAge: 0,
  });
  return res;
}
