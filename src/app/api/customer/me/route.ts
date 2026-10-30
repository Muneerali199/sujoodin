import { NextResponse } from "next/server";
import { getCurrentCustomer } from "@/lib/customer-auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const customer = await getCurrentCustomer();
    return NextResponse.json({ success: true, customer });
  } catch (err) {
    console.error("GET /api/customer/me error:", err);
    return NextResponse.json(
      { success: false, message: "Could not load account" },
      { status: 500 }
    );
  }
}
