import "server-only";
import { randomBytes, scrypt, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  CUSTOMER_COOKIE,
  verifyCustomerToken,
} from "@/lib/customer-session";

export {
  CUSTOMER_COOKIE,
  createCustomerToken,
  customerCookieOptions,
  verifyCustomerToken,
} from "@/lib/customer-session";

const scryptAsync = promisify(scrypt) as (
  password: string,
  salt: string,
  keylen: number
) => Promise<Buffer>;

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const hash = await scryptAsync(password, salt, 64);
  return `${salt}:${hash.toString("hex")}`;
}

export async function verifyPassword(
  password: string,
  stored: string
): Promise<boolean> {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const expected = Buffer.from(hash, "hex");
  const candidate = await scryptAsync(password, salt, 64);
  if (candidate.length !== expected.length) return false;
  return timingSafeEqual(candidate, expected);
}

export function getCustomerIdFromRequest(request: NextRequest): string | null {
  return verifyCustomerToken(request.cookies.get(CUSTOMER_COOKIE)?.value);
}

export async function getCurrentCustomer() {
  const store = await cookies();
  const customerId = verifyCustomerToken(store.get(CUSTOMER_COOKIE)?.value);
  if (!customerId) return null;

  return prisma.customer.findUnique({
    where: { id: customerId },
    select: { id: true, name: true, email: true, phone: true },
  });
}

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
