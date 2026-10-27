"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
  Package,
  TrendingUp,
  Eye,
  Plus,
  ArrowUpRight,
  Loader2,
} from "lucide-react";

interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  images: string[];
  inStock: boolean;
  featured: boolean;
}

export default function AdminDashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        if (data?.success) setProducts(data.products);
        else setError(data?.message || "Could not load products");
      })
      .catch(() => {
        if (!cancelled) setError("Could not load products");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const stats = {
    total: products.length,
    inStock: products.filter((p) => p.inStock).length,
    outOfStock: products.filter((p) => !p.inStock).length,
    featured: products.filter((p) => p.featured).length,
  };

  const statCards = [
    { label: "Total products", value: stats.total, icon: Package },
    { label: "In stock", value: stats.inStock, icon: TrendingUp },
    { label: "Out of stock", value: stats.outOfStock, icon: Eye },
    { label: "Featured", value: stats.featured, icon: Package },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
        <div>
          <p className="font-body text-[10px] tracking-[0.24em] uppercase text-earth mb-2">
            Overview
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-light text-dark">
            Dashboard
          </h1>
        </div>
        <Link href="/admin/products/new">
          <Button variant="primary">
            <Plus size={16} className="mr-2" />
            Add product
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-sand border border-sand mb-10">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-warm-white p-5 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="font-body text-[10px] tracking-[0.18em] uppercase text-text-muted">
                  {stat.label}
                </p>
                <Icon size={16} className="text-earth" />
              </div>
              <p className="font-display text-3xl sm:text-4xl font-light text-dark">
                {loading ? "—" : stat.value}
              </p>
            </div>
          );
        })}
      </div>

      <div className="bg-warm-white border border-sand">
        <div className="p-5 sm:p-6 border-b border-sand flex items-center justify-between gap-4">
          <h2 className="font-display text-xl font-light text-dark">
            Recent products
          </h2>
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-1.5 font-body text-[10px] tracking-[0.16em] uppercase text-earth hover:text-dark transition-colors"
          >
            View all
            <ArrowUpRight size={13} />
          </Link>
        </div>

        {loading ? (
          <div className="p-10 sm:p-14 flex items-center justify-center gap-3 text-text-muted">
            <Loader2 size={18} className="animate-spin" />
            <p className="font-body text-sm">Loading products...</p>
          </div>
        ) : error ? (
          <div className="p-10 sm:p-14 text-center">
            <p className="font-body text-sm text-red-600">{error}</p>
          </div>
        ) : products.length === 0 ? (
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
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px]">
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
                  <th className="p-4" />
                </tr>
              </thead>
              <tbody>
                {products.slice(0, 6).map((product) => (
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
                          {product.featured && (
                            <span className="font-body text-[10px] tracking-[0.12em] uppercase text-gold">
                              Featured
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-body text-sm text-text-muted">
                      {product.category}
                    </td>
                    <td className="p-4 font-body text-sm text-dark">
                      ₹{product.price}
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex px-2 py-1 font-body text-[10px] tracking-[0.08em] uppercase ${
                          product.inStock
                            ? "bg-dark/5 text-earth"
                            : "bg-red-50 text-red-700"
                        }`}
                      >
                        {product.inStock ? "In stock" : "Out of stock"}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <Link
                        href={`/admin/products/${product.id}`}
                        className="font-body text-[10px] tracking-[0.14em] uppercase text-earth hover:text-dark transition-colors"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
