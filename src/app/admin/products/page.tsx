"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/Button";
import { Plus, Search, Trash2, Pencil, Loader2 } from "lucide-react";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number | null;
  images: string[];
  inStock: boolean;
  featured: boolean;
  badge?: string | null;
  slug: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [rowError, setRowError] = useState<Record<string, string>>({});

  const fetchProducts = useCallback(async () => {
    try {
      setLoadError("");
      const res = await fetch("/api/products");
      const data = await res.json();
      if (!res.ok || !data?.success) {
        throw new Error(data?.message || "Failed to load products");
      }
      setProducts(data.products);
    } catch (err) {
      setLoadError(
        err instanceof Error ? err.message : "Failed to load products"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleToggleStock = async (product: Product) => {
    setRowError((e) => ({ ...e, [product.id]: "" }));
    const next = !product.inStock;
    setProducts((prev) =>
      prev.map((p) => (p.id === product.id ? { ...p, inStock: next } : p))
    );
    try {
      const res = await fetch(`/api/products/${product.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inStock: next }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.success) {
        throw new Error(data?.message || "Update failed");
      }
    } catch (err) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === product.id ? { ...p, inStock: !next } : p
        )
      );
      setRowError((e) => ({
        ...e,
        [product.id]: err instanceof Error ? err.message : "Update failed",
      }));
    }
  };

  const handleDelete = async (product: Product) => {
    const confirmed = window.confirm(
      `Delete "${product.name}"? This cannot be undone.`
    );
    if (!confirmed) return;

    setRowError((e) => ({ ...e, [product.id]: "" }));
    setDeletingId(product.id);
    const snapshot = products;
    setProducts((prev) => prev.filter((p) => p.id !== product.id));

    try {
      const res = await fetch(`/api/products/${product.id}`, {
        method: "DELETE",
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.success) {
        throw new Error(data?.message || "Delete failed");
      }
    } catch (err) {
      setProducts(snapshot);
      setRowError((e) => ({
        ...e,
        [product.id]: err instanceof Error ? err.message : "Delete failed",
      }));
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-semibold text-dark">Products</h1>
          <p className="font-body text-sm text-text-muted mt-1">Manage your product catalog</p>
        </div>
        <Link href="/admin/products/new">
          <Button variant="primary"><Plus size={16} className="mr-2" />Add Product</Button>
        </Link>
      </div>

      <div className="bg-warm-white rounded-xl border border-sand">
        <div className="p-4 sm:p-6 border-b border-sand">
          <div className="relative max-w-md">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-sand" />
            <input type="text" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full font-body text-sm bg-transparent border border-sand rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-gold transition-colors" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-sand">
                <th className="text-left p-3 sm:p-4 font-body text-xs uppercase tracking-wider text-text-muted">Product</th>
                <th className="text-left p-3 sm:p-4 font-body text-xs uppercase tracking-wider text-text-muted">Category</th>
                <th className="text-left p-3 sm:p-4 font-body text-xs uppercase tracking-wider text-text-muted">Price</th>
                <th className="text-left p-3 sm:p-4 font-body text-xs uppercase tracking-wider text-text-muted">Stock</th>
                <th className="text-left p-3 sm:p-4 font-body text-xs uppercase tracking-wider text-text-muted">Badge</th>
                <th className="text-right p-3 sm:p-4 font-body text-xs uppercase tracking-wider text-text-muted">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => (
                <tr key={product.id} className="border-b border-sand/50">
                  <td className="p-3 sm:p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-sand rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center text-text-muted text-xs">
                        {product.images.length > 0 ? (
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          "N/A"
                        )}
                      </div>
                      <div>
                        <span className="font-body text-sm text-dark block">
                          {product.name}
                          {product.featured && (
                            <span className="ml-2 text-[10px] font-body text-gold">
                              Featured
                            </span>
                          )}
                        </span>
                        <span className="font-body text-xs text-text-muted">
                          {product.images.length} image(s)
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 sm:p-4 font-body text-sm text-text-muted">
                    {product.category}
                  </td>
                  <td className="p-3 sm:p-4 font-body text-sm text-dark">
                    ₹{product.price}
                    {product.originalPrice && (
                      <span className="ml-2 text-xs text-text-muted line-through">
                        ₹{product.originalPrice}
                      </span>
                    )}
                  </td>
                  <td className="p-3 sm:p-4">
                    <button
                      onClick={() => handleToggleStock(product)}
                      disabled={deletingId === product.id}
                      className="inline-flex px-2 py-1 text-xs font-body rounded-full transition-opacity hover:opacity-70 disabled:opacity-40"
                      title="Toggle stock"
                    >
                      <span
                        className={
                          product.inStock
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }
                      >
                        {product.inStock ? "In Stock" : "Out of Stock"}
                      </span>
                    </button>
                  </td>
                  <td className="p-3 sm:p-4">
                    {product.badge ? (
                      <span className="inline-flex px-2 py-1 text-xs font-body rounded-full bg-gold/20 text-earth">
                        {product.badge}
                      </span>
                    ) : (
                      <span className="text-text-muted text-sm">-</span>
                    )}
                  </td>
                  <td className="p-3 sm:p-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/products/${product.id}`}
                        className="p-2 hover:bg-stone rounded-lg transition-colors"
                        title="Edit product"
                      >
                        <Pencil size={16} className="text-earth" />
                      </Link>
                      <button
                        onClick={() => handleDelete(product)}
                        disabled={deletingId === product.id}
                        title="Delete product"
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-40"
                      >
                        {deletingId === product.id ? (
                          <Loader2 size={16} className="text-text-muted animate-spin" />
                        ) : (
                          <Trash2 size={16} className="text-red-500" />
                        )}
                      </button>
                    </div>
                    {rowError[product.id] && (
                      <p className="mt-1 text-right text-xs text-red-600">
                        {rowError[product.id]}
                      </p>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {loading && (
          <div className="p-8 sm:p-12 text-center">
            <p className="font-body text-text-muted">Loading...</p>
          </div>
        )}
        {loadError && !loading && (
          <div className="p-8 sm:p-12 text-center">
            <p className="font-body text-red-600">{loadError}</p>
            <Button
              variant="secondary"
              size="sm"
              className="mt-4"
              onClick={() => {
                setLoading(true);
                fetchProducts();
              }}
            >
              Retry
            </Button>
          </div>
        )}
        {!loading && !loadError && products.length === 0 && (
          <div className="p-8 sm:p-12 text-center">
            <p className="font-body text-text-muted">No products found</p>
          </div>
        )}
        {!loading && !loadError && products.length > 0 && filtered.length === 0 && (
          <div className="p-8 sm:p-12 text-center">
            <p className="font-body text-text-muted">
              No products match &ldquo;{search}&rdquo;
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
