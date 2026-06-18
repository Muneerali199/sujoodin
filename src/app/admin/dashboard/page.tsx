"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Package, TrendingUp, Eye, Plus } from "lucide-react";

interface Product {
  _id?: string;
  id: string;
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

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setProducts(data.products);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const stats = {
    total: products.length,
    inStock: products.filter((p) => p.inStock).length,
    outOfStock: products.filter((p) => !p.inStock).length,
    featured: products.filter((p) => p.featured).length,
  };

  const statCards = [
    { label: "Total Products", value: stats.total, icon: Package, color: "bg-gold" },
    { label: "In Stock", value: stats.inStock, icon: TrendingUp, color: "bg-green-600" },
    { label: "Out of Stock", value: stats.outOfStock, icon: Eye, color: "bg-red-500" },
    { label: "Featured", value: stats.featured, icon: Package, color: "bg-earth" },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-semibold text-dark">Dashboard</h1>
          <p className="font-body text-sm text-text-muted mt-1">Overview of your store</p>
        </div>
        <Link href="/admin/products/new">
          <Button variant="primary"><Plus size={16} className="mr-2" />Add Product</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-warm-white rounded-xl p-4 sm:p-6 border border-sand">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center text-cream`}>
                  <Icon size={20} />
                </div>
              </div>
              <p className="font-display text-2xl sm:text-3xl font-semibold text-dark">{stat.value}</p>
              <p className="font-body text-xs text-text-muted mt-1 uppercase tracking-wider">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-warm-white rounded-xl border border-sand">
        <div className="p-4 sm:p-6 border-b border-sand">
          <h2 className="font-display text-lg sm:text-xl font-semibold text-dark">Recent Products</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-sand">
                <th className="text-left p-3 sm:p-4 font-body text-xs uppercase tracking-wider text-text-muted">Product</th>
                <th className="text-left p-3 sm:p-4 font-body text-xs uppercase tracking-wider text-text-muted">Category</th>
                <th className="text-left p-3 sm:p-4 font-body text-xs uppercase tracking-wider text-text-muted">Price</th>
                <th className="text-left p-3 sm:p-4 font-body text-xs uppercase tracking-wider text-text-muted">Stock</th>
              </tr>
            </thead>
            <tbody>
              {products.slice(0, 5).map((product) => (
                <tr key={product.id} className="border-b border-sand/50">
                  <td className="p-3 sm:p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-sand rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center text-text-muted text-xs">
                        {product.images.length > 0 ? (
                          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                        ) : "N/A"}
                      </div>
                      <span className="font-body text-sm text-dark">{product.name}</span>
                    </div>
                  </td>
                  <td className="p-3 sm:p-4 font-body text-sm text-text-muted">{product.category}</td>
                  <td className="p-3 sm:p-4 font-body text-sm text-dark">₹{product.price}</td>
                  <td className="p-3 sm:p-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-body rounded-full ${product.inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {loading && <div className="p-8 sm:p-12 text-center"><p className="font-body text-text-muted">Loading...</p></div>}
      </div>
    </div>
  );
}
