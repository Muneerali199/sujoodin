import { createHmac, timingSafeEqual } from "crypto";

export const CUSTOMER_COOKIE = "sujood_customer_session";
export const CUSTOMER_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

function getSecret(): string | null {
  return process.env.CUSTOMER_SESSION_SECRET || process.env.SESSION_SECRET || null;
}

function sign(payload: string, secret: string): string {
  return createHmac("sha256", secret)
    .update(`customer.${payload}`)
    .digest("base64url");
}

export function createCustomerToken(customerId: string): string {
  const secret = getSecret();
  if (!secret) throw new Error("CUSTOMER_SESSION_SECRET is not configured");
  const expiresAt = Date.now() + CUSTOMER_MAX_AGE_SECONDS * 1000;
  const payload = Buffer.from(
    JSON.stringify({ sub: customerId, exp: expiresAt })
  ).toString("base64url");
  return `${payload}.${sign(payload, secret)}`;
}

export function verifyCustomerToken(
  token: string | undefined
): string | null {
  const secret = getSecret();
  if (!secret || !token) return null;

  const dot = token.lastIndexOf(".");
  if (dot === -1) return null;

  const payload = token.slice(0, dot);
  const signature = token.slice(dot + 1);
  const expected = sign(payload, secret);

  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  try {
    const parsed = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8")
    ) as { sub?: unknown; exp?: unknown };
    if (
      typeof parsed.sub !== "string" ||
      typeof parsed.exp !== "number" ||
      Date.now() >= parsed.exp
    ) {
      return null;
    }
    return parsed.sub;
  } catch {
    return null;
  }
}

export const customerCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: CUSTOMER_MAX_AGE_SECONDS,
};
