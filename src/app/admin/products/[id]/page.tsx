"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { use } from "react";
import { Button } from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ProductForm, colorsToInput } from "@/components/admin/ProductForm";

interface Product {
  id: string;
  name: string;
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

function EditProduct({ id }: { id: string }) {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        const found = data?.products?.find((p: Product) => p.id === id);
        if (!found) setError("Product not found");
        else setProduct(found);
      })
      .catch(() => !cancelled && setError("Failed to load product"));
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (error) {
    return (
      <div className="py-12 text-center">
        <p className="font-body text-sm text-red-600">{error}</p>
        <Link href="/admin/products" className="mt-4 inline-block">
          <Button variant="secondary" size="sm">
            Back to products
          </Button>
        </Link>
      </div>
    );
  }

  if (!product) {
    return <p className="py-12 text-center font-body text-text-muted">Loading...</p>;
  }

  return (
    <ProductForm
      initial={{
        name: product.name,
        category: product.category,
        price: String(product.price),
        originalPrice: product.originalPrice ? String(product.originalPrice) : "",
        description: product.description,
        sizes: product.sizes?.join(", ") ?? "",
        colors: colorsToInput(product.colors),
        badge: product.badge ?? "",
        inStock: product.inStock,
        featured: product.featured,
        images: product.images,
      }}
      submitLabel="Save Changes"
      busyLabel="Saving..."
      onCancel={() => router.push("/admin/products")}
      onSubmit={async (payload) => {
        const res = await fetch(`/api/products/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json().catch(() => null);
        if (!res.ok || !data?.success) {
          throw new Error(data?.message || "Failed to update product");
        }
        router.push("/admin/products");
        router.refresh();
      }}
    />
  );
}

export default function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  return (
    <div>
      <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
        <Link href="/admin/products">
          <Button variant="ghost" size="sm">
            <ArrowLeft size={16} className="mr-2" />
            Back
          </Button>
        </Link>
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-semibold text-dark">
            Edit Product
          </h1>
          <p className="font-body text-sm text-text-muted mt-1">
            Update product details, images and pricing
          </p>
        </div>
      </div>

      <EditProduct id={id} />
    </div>
  );
}
