"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ArrowLeft, Upload, X, Image as ImageIcon } from "lucide-react";
import Link from "next/link";

const MAX_IMAGES = 10;
const categories = ["Modest Fashion", "Home Decor", "Prayer Essentials", "Ramadan Specials"];

export default function NewProductPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("Modest Fashion");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [description, setDescription] = useState("");
  const [sizes, setSizes] = useState("");
  const [colors, setColors] = useState("");
  const [badge, setBadge] = useState("");
  const [inStock, setInStock] = useState(true);
  const [featured, setFeatured] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const remaining = MAX_IMAGES - imageFiles.length;
    const newFiles = files.slice(0, remaining);
    if (newFiles.length === 0) return;

    const newPreviews = newFiles.map((f) => URL.createObjectURL(f));
    setImageFiles((prev) => [...prev, ...newFiles]);
    setPreviews((prev) => [...prev, ...newPreviews]);
  }, [imageFiles.length]);

  const removeImage = useCallback((index: number) => {
    URL.revokeObjectURL(previews[index]);
    setPreviews((prev) => prev.filter((_, i) => i !== index));
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  }, [previews]);

  const generateSlug = (name: string) =>
    name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const uploadImages = async (): Promise<string[]> => {
    if (imageFiles.length === 0) return [];
    const urls: string[] = [];

    for (const file of imageFiles) {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if (!res.ok) throw new Error("Image upload failed");
      const data = await res.json();
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
      const imageUrls = imageFiles.length > 0 ? await uploadImages() : [];

      const colorArray = colors
        ? colors.split(",").map((c) => {
            const [n, h] = c.trim().split(":");
            return { name: n.trim(), hex: h?.trim() || "#000000" };
          })
        : undefined;

      const sizeArray = sizes ? sizes.split(",").map((s) => s.trim()) : undefined;

      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, slug: generateSlug(name), category,
          price: parseFloat(price),
          originalPrice: originalPrice ? parseFloat(originalPrice) : undefined,
          description, images: imageUrls,
          badge: badge || undefined,
          sizes: sizeArray, colors: colorArray,
          inStock, featured,
        }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Failed to create");

      setSuccess("Product added successfully!");
      setTimeout(() => router.push("/admin/products"), 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
        <Link href="/admin/products"><Button variant="ghost" size="sm"><ArrowLeft size={16} className="mr-2" />Back</Button></Link>
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-semibold text-dark">Add New Product</h1>
          <p className="font-body text-sm text-text-muted mt-1">Fill in the details to add a new product</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-warm-white rounded-xl p-4 sm:p-6 border border-sand">
              <h2 className="font-display text-lg font-semibold text-dark mb-4">Basic Information</h2>
              <div className="space-y-4">
                <Input label="Product Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Premium Prayer Cap" required />
                <div>
                  <label className="block font-body text-xs tracking-[0.15em] uppercase text-earth mb-2">Category</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)}
                    className="w-full font-body text-sm bg-transparent border-b border-sand py-3 px-0 focus:outline-none focus:border-gold transition-colors">
                    {categories.map((c) => (<option key={c} value={c}>{c}</option>))}
                  </select>
                </div>
                <div>
                  <label className="block font-body text-xs tracking-[0.15em] uppercase text-earth mb-2">Description</label>
                  <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Product description..." rows={4} required
                    className="w-full font-body text-sm bg-transparent border border-sand rounded-lg p-3 focus:outline-none focus:border-gold transition-colors resize-none" />
                </div>
              </div>
            </div>

            <div className="bg-warm-white rounded-xl p-4 sm:p-6 border border-sand">
              <h2 className="font-display text-lg font-semibold text-dark mb-4">Images</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 mb-4">
                {previews.map((preview, i) => (
                  <div key={i} className="relative aspect-square rounded-lg overflow-hidden border border-sand group">
                    <img src={preview} alt={`Preview ${i + 1}`} className="w-full h-full object-cover" />
                    <button type="button" onClick={() => removeImage(i)}
                      className="absolute top-2 right-2 w-6 h-6 bg-dark/80 text-cream rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><X size={14} /></button>
                  </div>
                ))}
                {imageFiles.length < MAX_IMAGES && (
                  <label className="aspect-square rounded-lg border-2 border-dashed border-sand flex flex-col items-center justify-center cursor-pointer hover:border-gold transition-colors">
                    <ImageIcon size={24} className="text-sand mb-2" />
                    <span className="font-body text-xs text-text-muted">{imageFiles.length}/{MAX_IMAGES}</span>
                    <input type="file" accept="image/*" multiple onChange={handleImageChange} className="hidden" />
                  </label>
                )}
              </div>
              <label className="inline-flex items-center gap-2 px-4 py-2 bg-dark text-cream rounded-lg cursor-pointer hover:bg-earth transition-colors font-body text-sm">
                <Upload size={16} /> Upload Images
                <input type="file" accept="image/*" multiple onChange={handleImageChange} className="hidden" />
              </label>
              <p className="font-body text-xs text-text-muted mt-2">Upload up to {MAX_IMAGES} images (JPG, PNG, WebP)</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-warm-white rounded-xl p-4 sm:p-6 border border-sand">
              <h2 className="font-display text-lg font-semibold text-dark mb-4">Pricing</h2>
              <div className="space-y-4">
                <Input label="Price (₹)" type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="0.00" required />
                <Input label="Original Price (₹) - Optional" type="number" value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value)} placeholder="0.00" />
              </div>
            </div>

            <div className="bg-warm-white rounded-xl p-4 sm:p-6 border border-sand">
              <h2 className="font-display text-lg font-semibold text-dark mb-4">Organization</h2>
              <div className="space-y-4">
                <Input label="Badge" value={badge} onChange={(e) => setBadge(e.target.value)} placeholder="New, Bestseller, or Sale" />
                <Input label="Sizes (comma-separated)" value={sizes} onChange={(e) => setSizes(e.target.value)} placeholder="S, M, L, XL" />
                <Input label="Colors (name:hex, comma-separated)" value={colors} onChange={(e) => setColors(e.target.value)} placeholder="White:#FFFFFF, Black:#000000" />
              </div>
            </div>

            <div className="bg-warm-white rounded-xl p-4 sm:p-6 border border-sand space-y-4">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="font-body text-sm text-dark">In Stock</span>
                <input type="checkbox" checked={inStock} onChange={(e) => setInStock(e.target.checked)} className="w-5 h-5 accent-gold" />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="font-body text-sm text-dark">Featured</span>
                <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} className="w-5 h-5 accent-gold" />
              </label>
            </div>

            {error && <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 font-body text-sm">{error}</div>}
            {success && <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 font-body text-sm">{success}</div>}

            <Button type="submit" variant="primary" className="w-full" disabled={loading || !name || !price}>
              {loading ? "Adding Product..." : "Add Product"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
