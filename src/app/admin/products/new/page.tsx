"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ProductForm } from "@/components/admin/ProductForm";

export default function NewProductPage() {
  const router = useRouter();

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
            Add New Product
          </h1>
          <p className="font-body text-sm text-text-muted mt-1">
            Fill in the details to add a new product
          </p>
        </div>
      </div>

      <ProductForm
        initial={{
          name: "",
          category: "Modest Fashion",
          price: "",
          originalPrice: "",
          description: "",
          sizes: "",
          colors: "",
          badge: "",
          inStock: true,
          featured: false,
          images: [],
        }}
        submitLabel="Add Product"
        busyLabel="Adding Product..."
        onSubmit={async (payload) => {
          const res = await fetch("/api/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
          const data = await res.json().catch(() => null);
          if (!res.ok || !data?.success) {
            throw new Error(data?.message || "Failed to create product");
          }
          router.push("/admin/products");
          router.refresh();
        }}
      />
    </div>
  );
}
