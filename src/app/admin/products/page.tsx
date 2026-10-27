"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/Button";
import {
  Plus,
  Search,
  Trash2,
  Pencil,
  Loader2,
  ExternalLink,
} from "lucide-react";
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
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
        <div>
          <p className="font-body text-[10px] tracking-[0.24em] uppercase text-earth mb-2">
            Catalogue
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-light text-dark">
            Products
          </h1>
          <p className="font-body text-sm text-text-muted mt-2">
            {loading
              ? "Loading your catalogue..."
              : `${products.length} product${products.length === 1 ? "" : "s"} in the store`}
          </p>
        </div>
        <Link href="/admin/products/new">
          <Button variant="primary">
            <Plus size={16} className="mr-2" />
            Add product
          </Button>
        </Link>
      </div>

      <div className="bg-warm-white border border-sand">
        <div className="p-4 sm:p-5 border-b border-sand flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between">
          <div className="relative w-full max-w-md">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-sand"
            />
            <input
              type="search"
              placeholder="Search by name or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search products"
              className="w-full font-body text-sm bg-transparent border border-sand pl-9 pr-3 py-2.5 focus:outline-none focus:border-gold transition-colors"
            />
          </div>
          {!loading && products.length > 0 && (
            <p className="font-body text-[10px] tracking-[0.12em] uppercase text-text-muted">
              Showing {filtered.length} of {products.length}
            </p>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px]">
            <thead>
              <tr className="border-b border-sand">
                <th className="text-left p-4 font-body text-[10px] uppercase tracking-[0.16em] text-text-muted">
                  Product
                </th>
                <th className="text-left p-4 font-body text-[10px] uppercase tracking-[0.16em] text-text-muted">
                  Category
                </th>
                <th className="text-left p-4 font-body text-[10px] uppercase tracking-[0.16em] text-text-muted">
                  Price
                </th>
                <th className="text-left p-4 font-body text-[10px] uppercase tracking-[0.16em] text-text-muted">
                  Stock
                </th>
                <th className="text-left p-4 font-body text-[10px] uppercase tracking-[0.16em] text-text-muted">
                  Badge
                </th>
                <th className="text-right p-4 font-body text-[10px] uppercase tracking-[0.16em] text-text-muted">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-sand/60 last:border-0"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-14 bg-sand overflow-hidden flex-shrink-0 flex items-center justify-center text-text-muted text-[10px]">
                        {product.images[0] ? (
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            loading="lazy"
                            className="w-full h-full object-cover object-top"
                          />
                        ) : (
                          "N/A"
                        )}
                      </div>
                      <div>
                        <span className="font-body text-sm text-dark block">
                          {product.name}
                        </span>
                        <span className="font-body text-[10px] text-text-muted">
                          {product.images.length} image
                          {product.images.length === 1 ? "" : "s"}
                          {product.featured ? " · Featured" : ""}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-body text-sm text-text-muted">
                    {product.category}
                  </td>
                  <td className="p-4 font-body text-sm text-dark">
                    ₹{product.price}
                    {product.originalPrice && (
                      <span className="ml-2 text-xs text-text-muted line-through">
                        ₹{product.originalPrice}
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleToggleStock(product)}
                      disabled={deletingId === product.id}
                      title="Toggle stock"
                      className={`inline-flex px-2 py-1 font-body text-[10px] tracking-[0.08em] uppercase transition-opacity hover:opacity-70 disabled:opacity-40 ${
                        product.inStock
                          ? "bg-dark/5 text-earth"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {product.inStock ? "In stock" : "Out of stock"}
                    </button>
                  </td>
                  <td className="p-4">
                    {product.badge ? (
                      <span className="inline-flex px-2 py-1 font-body text-[10px] tracking-[0.08em] uppercase bg-gold/15 text-earth">
                        {product.badge}
                      </span>
                    ) : (
                      <span className="font-body text-sm text-text-muted">—</span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/product/${product.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-earth hover:bg-stone transition-colors"
                        title="View on store"
                        aria-label={`View ${product.name} on store`}
                      >
                        <ExternalLink size={15} />
                      </Link>
                      <Link
                        href={`/admin/products/${product.id}`}
                        className="p-2 text-earth hover:bg-stone transition-colors"
                        title="Edit product"
                        aria-label={`Edit ${product.name}`}
                      >
                        <Pencil size={15} />
                      </Link>
                      <button
                        onClick={() => handleDelete(product)}
                        disabled={deletingId === product.id}
                        title="Delete product"
                        aria-label={`Delete ${product.name}`}
                        className="p-2 text-red-500 hover:bg-red-50 transition-colors disabled:opacity-40"
                      >
                        {deletingId === product.id ? (
                          <Loader2 size={15} className="animate-spin" />
                        ) : (
                          <Trash2 size={15} />
                        )}
                      </button>
                    </div>
                    {rowError[product.id] && (
                      <p className="mt-1 text-right text-[10px] text-red-600">
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
          <div className="p-10 sm:p-14 flex items-center justify-center gap-3 text-text-muted">
            <Loader2 size={18} className="animate-spin" />
            <p className="font-body text-sm">Loading products...</p>
          </div>
        )}
        {loadError && !loading && (
          <div className="p-10 sm:p-14 text-center">
            <p className="font-body text-sm text-red-600">{loadError}</p>
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
          <div className="p-10 sm:p-14 text-center">
            <p className="font-body text-sm text-text-muted mb-4">
              No products yet.
            </p>
            <Link href="/admin/products/new">
              <Button variant="secondary" size="sm">
                Add your first product
              </Button>
            </Link>
          </div>
        )}
        {!loading &&
          !loadError &&
          products.length > 0 &&
          filtered.length === 0 && (
            <div className="p-10 sm:p-14 text-center">
              <p className="font-body text-sm text-text-muted">
                No products match &ldquo;{search}&rdquo;.
              </p>
            </div>
          )}
      </div>
    </div>
  );
}
