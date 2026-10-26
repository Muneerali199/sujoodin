"use client";

import { useCallback, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { X, Image as ImageIcon, Star } from "lucide-react";

const MAX_IMAGES = 10;
export const CATEGORIES = [
  "Modest Fashion",
  "Home Decor",
  "Prayer Essentials",
  "Ramadan Specials",
];

export interface ProductFormValues {
  name: string;
  category: string;
  price: string;
  originalPrice: string;
  description: string;
  sizes: string;
  colors: string;
  badge: string;
  inStock: boolean;
  featured: boolean;
  images: string[];
}

export function colorsToInput(
  colors: { name: string; hex: string }[] | null
): string {
  return colors?.map((c) => `${c.name}:${c.hex}`).join(", ") ?? "";
}

export function parseColors(input: string) {
  const parts = input
    .split(",")
    .map((c) => c.trim())
    .filter(Boolean);
  const parsed = parts
    .map((c) => {
      const [name, hex] = c.split(":");
      return { name: name.trim(), hex: (hex || "#000000").trim() };
    })
    .filter((c) => c.name);
  return parsed.length ? parsed : undefined;
}

export function parseSizes(input: string) {
  const sizes = input
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return sizes.length ? sizes : undefined;
}

interface Props {
  initial: ProductFormValues;
  submitLabel: string;
  busyLabel: string;
  onSubmit: (payload: Record<string, unknown>) => Promise<void>;
  onCancel?: () => void;
}

export function ProductForm({
  initial,
  submitLabel,
  busyLabel,
  onSubmit,
  onCancel,
}: Props) {
  const [form, setForm] = useState<ProductFormValues>(initial);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const set = <K extends keyof ProductFormValues>(
    key: K,
    value: ProductFormValues[K]
  ) => setForm((f) => ({ ...f, [key]: value }));

  const handleFiles = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      const room = MAX_IMAGES - form.images.length - newFiles.length;
      const picked = files.slice(0, Math.max(0, room));
      if (!picked.length) return;
      setNewFiles((prev) => [...prev, ...picked]);
      setPreviews((prev) => [
        ...prev,
        ...picked.map((f) => URL.createObjectURL(f)),
      ]);
      e.target.value = "";
    },
    [form.images.length, newFiles.length]
  );

  const removeNewFile = (index: number) => {
    URL.revokeObjectURL(previews[index]);
    setNewFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = (index: number) =>
    setForm((f) => ({
      ...f,
      images: f.images.filter((_, i) => i !== index),
    }));

  const moveImage = (from: number, to: number) =>
    setForm((f) => {
      if (to < 0 || to >= f.images.length) return f;
      const images = [...f.images];
      const [item] = images.splice(from, 1);
      images.splice(to, 0, item);
      return { ...f, images };
    });

  const uploadFiles = async (): Promise<string[]> => {
    const urls: string[] = [];
    for (const file of newFiles) {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.success) {
        throw new Error(data?.message || `Failed to upload ${file.name}`);
      }
      urls.push(data.url);
    }
    return urls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const uploaded = await uploadFiles();
      await onSubmit({
        name: form.name,
        category: form.category,
        price: form.price === "" ? NaN : Number(form.price),
        originalPrice:
          form.originalPrice === "" ? undefined : Number(form.originalPrice),
        description: form.description,
        images: [...form.images, ...uploaded],
        badge: form.badge || undefined,
        sizes: parseSizes(form.sizes),
        colors: parseColors(form.colors),
        inStock: form.inStock,
        featured: form.featured,
      });
      setSuccess("Saved successfully");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setLoading(false);
    }
  };

  const totalImages = form.images.length + newFiles.length;

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl">
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 font-body text-sm">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 font-body text-sm">
          {success}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-warm-white rounded-xl p-4 sm:p-6 border border-sand">
            <h2 className="font-display text-lg font-semibold text-dark mb-4">
              Basic Information
            </h2>
            <div className="space-y-4">
              <Input
                label="Product Name"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="e.g., Premium Prayer Cap"
                required
              />
              <div>
                <label className="block font-body text-xs tracking-[0.15em] uppercase text-earth mb-2">
                  Category
                </label>
                <select
                  value={form.category}
                  onChange={(e) => set("category", e.target.value)}
                  className="w-full font-body text-sm bg-transparent border-b border-sand py-3 px-0 focus:outline-none focus:border-gold transition-colors"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-body text-xs tracking-[0.15em] uppercase text-earth mb-2">
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => set("description", e.target.value)}
                  placeholder="Product description..."
                  rows={4}
                  required
                  className="w-full font-body text-sm bg-transparent border border-sand rounded-lg p-3 focus:outline-none focus:border-gold transition-colors resize-none"
                />
              </div>
            </div>
          </div>

          <div className="bg-warm-white rounded-xl p-4 sm:p-6 border border-sand">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-lg font-semibold text-dark">
                Images
              </h2>
              <span className="font-body text-xs text-text-muted">
                {totalImages}/{MAX_IMAGES}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 mb-4">
              {form.images.map((src, i) => (
                <div
                  key={src}
                  className="relative aspect-square rounded-lg overflow-hidden border border-sand group"
                >
                  <img
                    src={src}
                    alt={`Product image ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {i === 0 && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 bg-dark/80 text-cream text-[10px] font-body rounded">
                      Main
                    </span>
                  )}
                  <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {i > 0 && (
                      <button
                        type="button"
                        onClick={() => moveImage(i, i - 1)}
                        title="Move earlier"
                        className="w-6 h-6 bg-dark/80 text-cream rounded flex items-center justify-center text-xs"
                      >
                        &larr;
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => removeExistingImage(i)}
                      title="Remove image"
                      className="w-6 h-6 bg-red-600/90 text-cream rounded flex items-center justify-center"
                    >
                      <X size={12} />
                    </button>
                  </div>
                </div>
              ))}

              {newFiles.map((file, i) => (
                <div
                  key={`${file.name}-${i}`}
                  className="relative aspect-square rounded-lg overflow-hidden border-2 border-gold group"
                >
                  <img
                    src={previews[i]}
                    alt={`New upload ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 bg-gold text-dark text-[10px] font-body rounded">
                    New
                  </span>
                  <button
                    type="button"
                    onClick={() => removeNewFile(i)}
                    className="absolute top-2 right-2 w-6 h-6 bg-red-600/90 text-cream rounded-full flex items-center justify-center"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}

              {totalImages < MAX_IMAGES && (
                <label className="aspect-square rounded-lg border-2 border-dashed border-sand flex flex-col items-center justify-center cursor-pointer hover:border-gold transition-colors">
                  <ImageIcon size={24} className="text-sand mb-2" />
                  <span className="font-body text-xs text-text-muted">
                    Add
                  </span>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/avif"
                    multiple
                    onChange={handleFiles}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {totalImages === 0 && (
              <p className="font-body text-xs text-text-muted">
                No images yet. The first image is used as the main product image.
              </p>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-warm-white rounded-xl p-4 sm:p-6 border border-sand">
            <h2 className="font-display text-lg font-semibold text-dark mb-4">
              Pricing
            </h2>
            <div className="space-y-4">
              <Input
                label="Price (₹)"
                type="number"
                min="0"
                step="1"
                value={form.price}
                onChange={(e) => set("price", e.target.value)}
                placeholder="0"
                required
              />
              <Input
                label="Original Price (₹) - Optional"
                type="number"
                min="0"
                step="1"
                value={form.originalPrice}
                onChange={(e) => set("originalPrice", e.target.value)}
                placeholder="Leave empty if not on sale"
              />
            </div>
          </div>

          <div className="bg-warm-white rounded-xl p-4 sm:p-6 border border-sand">
            <h2 className="font-display text-lg font-semibold text-dark mb-4">
              Organization
            </h2>
            <div className="space-y-4">
              <Input
                label="Badge"
                value={form.badge}
                onChange={(e) => set("badge", e.target.value)}
                placeholder="New, Bestseller, or Sale"
              />
              <Input
                label="Sizes (comma-separated)"
                value={form.sizes}
                onChange={(e) => set("sizes", e.target.value)}
                placeholder="S, M, L, XL"
              />
              <Input
                label="Colors (name:hex, comma-separated)"
                value={form.colors}
                onChange={(e) => set("colors", e.target.value)}
                placeholder="White:#FFFFFF, Black:#000000"
              />
            </div>
          </div>

          <div className="bg-warm-white rounded-xl p-4 sm:p-6 border border-sand space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="font-body text-sm text-dark">In Stock</span>
              <input
                type="checkbox"
                checked={form.inStock}
                onChange={(e) => set("inStock", e.target.checked)}
                className="w-5 h-5 accent-gold"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="font-body text-sm text-dark flex items-center gap-1.5">
                <Star size={14} className="text-gold" /> Featured
              </span>
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => set("featured", e.target.checked)}
                className="w-5 h-5 accent-gold"
              />
            </label>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={loading || !form.name || !form.price}
            >
              {loading ? busyLabel : submitLabel}
            </Button>
            {onCancel && (
              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={onCancel}
                disabled={loading}
              >
                Cancel
              </Button>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
