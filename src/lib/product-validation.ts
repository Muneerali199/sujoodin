import { Product } from "@/lib/types/product";

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export type ValidationResult =
  | { ok: true; data: ValidProductInput }
  | { ok: false; message: string };

export interface ValidProductInput {
  name: string;
  slug: string;
  category: string;
  price: number;
  originalPrice: number | null;
  description: string;
  images: string[];
  badge: string | null;
  sizes: string[] | null;
  colors: { name: string; hex: string }[] | null;
  inStock: boolean;
  featured: boolean;
}

const HEX = /^#[0-9a-fA-F]{6}$/;

export function validateProduct(body: Record<string, unknown>): ValidationResult {
  const name = typeof body.name === "string" ? body.name.trim() : "";
  if (!name) return { ok: false, message: "Product name is required" };

  const category =
    typeof body.category === "string" ? body.category.trim() : "";
  if (!category) return { ok: false, message: "Category is required" };

  const description =
    typeof body.description === "string" ? body.description.trim() : "";
  if (!description)
    return { ok: false, message: "Description is required" };

  const price = Number(body.price);
  if (!Number.isFinite(price) || price < 0)
    return { ok: false, message: "Price must be a valid number" };

  const originalPrice =
    body.originalPrice === undefined ||
    body.originalPrice === null ||
    body.originalPrice === ""
      ? null
      : Number(body.originalPrice);
  if (originalPrice !== null && !Number.isFinite(originalPrice)) {
    return { ok: false, message: "Original price must be a valid number" };
  }
  if (originalPrice !== null && originalPrice <= price) {
    return {
      ok: false,
      message: "Original price must be higher than the sale price",
    };
  }

  const rawImages = Array.isArray(body.images) ? body.images : [];
  const images = rawImages.filter(
    (i): i is string => typeof i === "string" && i.length > 0
  );

  const sizes = Array.isArray(body.sizes)
    ? body.sizes.filter((s): s is string => typeof s === "string" && !!s.trim())
    : null;

  let colors: ValidProductInput["colors"] = null;
  if (Array.isArray(body.colors) && body.colors.length > 0) {
    const parsed = body.colors
      .filter(
        (c): c is { name: string; hex: string } =>
          typeof c === "object" &&
          c !== null &&
          typeof (c as { name?: unknown }).name === "string"
      )
      .map((c) => ({
        name: c.name.trim(),
        hex: HEX.test(c.hex ?? "") ? c.hex : "#000000",
      }))
      .filter((c) => c.name);
    colors = parsed.length > 0 ? parsed : null;
  }

  const slugInput =
    typeof body.slug === "string" && body.slug.trim()
      ? body.slug
      : name;
  const slug = slugify(slugInput);
  if (!slug) return { ok: false, message: "Could not generate a valid slug" };

  return {
    ok: true,
    data: {
      name,
      slug,
      category,
      price,
      originalPrice,
      description,
      images,
      badge: typeof body.badge === "string" && body.badge.trim() ? body.badge.trim() : null,
      sizes,
      colors,
      inStock: body.inStock === undefined ? true : Boolean(body.inStock),
      featured: body.featured === undefined ? false : Boolean(body.featured),    },
  };
}

export function serializeProduct(p: {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number | null;
  description: string;
  images: string;
  badge: string | null;
  sizes: string | null;
  colors: string | null;
  inStock: boolean;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}): Product {
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    category: p.category,
    price: p.price,
    originalPrice: p.originalPrice ?? undefined,
    description: p.description,
    images: parseJson<string[]>(p.images, []),
    badge: (p.badge ?? undefined) as Product["badge"],
    sizes: parseJson<string[] | null>(p.sizes, null) ?? undefined,
    colors: parseJson<{ name: string; hex: string }[] | null>(p.colors, null) ?? undefined,
    inStock: p.inStock,
    featured: p.featured,
    createdAt: p.createdAt.toISOString(),
  };
}

function parseJson<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}
