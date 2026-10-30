import type { Metadata } from "next";
import { Suspense } from "react";
import { CustomerAuthForm } from "@/components/account/CustomerAuthForm";

export const metadata: Metadata = {
  title: "Sign in | Sujood",
  description: "Sign in to your Sujood account to place an order request.",
};

export default function AccountLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-cream">
          <p className="font-body text-sm text-text-muted">Loading...</p>
        </div>
      }
    >
      <CustomerAuthForm mode="login" />
    </Suspense>
  );
}
