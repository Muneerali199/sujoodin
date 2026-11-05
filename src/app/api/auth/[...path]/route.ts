import { NextResponse } from "next/server";
import { getNeonAuth } from "@/lib/auth/server";

type RouteContext = { params: Promise<{ path: string[] }> };

let handlers: ReturnType<NonNullable<ReturnType<typeof getNeonAuth>>["handler"]> | null =
  null;

function getHandlers() {
  if (handlers) return handlers;
  const auth = getNeonAuth();
  if (!auth) return null;
  handlers = auth.handler();
  return handlers;
}

function unavailable() {
  return NextResponse.json(
    { success: false, message: "Google sign-in is not configured." },
    { status: 503 }
  );
}

export async function GET(request: Request, context: RouteContext) {
  return getHandlers()?.GET(request, context) ?? unavailable();
}

export async function POST(request: Request, context: RouteContext) {
  return getHandlers()?.POST(request, context) ?? unavailable();
}

export async function PUT(request: Request, context: RouteContext) {
  return getHandlers()?.PUT(request, context) ?? unavailable();
}

export async function PATCH(request: Request, context: RouteContext) {
  return getHandlers()?.PATCH(request, context) ?? unavailable();
}

export async function DELETE(request: Request, context: RouteContext) {
  return getHandlers()?.DELETE(request, context) ?? unavailable();
}
