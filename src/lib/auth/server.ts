import "server-only";
import { createNeonAuth, type NeonAuth } from "@neon/auth/next/server";

const baseUrl = process.env.NEON_AUTH_BASE_URL;
const cookieSecret = process.env.NEON_AUTH_COOKIE_SECRET;

export const neonAuthConfigured = Boolean(
  baseUrl && cookieSecret && cookieSecret.length >= 32
);

let auth: NeonAuth | null = null;

export function getNeonAuth(): NeonAuth | null {
  if (!baseUrl || !cookieSecret || cookieSecret.length < 32) return null;
  auth ??= createNeonAuth({
    baseUrl,
    cookies: { secret: cookieSecret },
  });
  return auth;
}
