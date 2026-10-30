import type { Metadata } from "next";
import { Suspense } from "react";
import { CustomerAuthForm } from "@/components/account/CustomerAuthForm";

export const metadata: Metadata = {
  title: "Create account | Sujood",
  description: "Create a Sujood account to place order requests.",
};

export default function AccountRegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-cream">
          <p className="font-body text-sm text-text-muted">Loading...</p>
        </div>
      }
    >
      <CustomerAuthForm mode="register" />
    </Suspense>
  );
}
