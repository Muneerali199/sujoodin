"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Lock } from "lucide-react";
import Link from "next/link";

function LoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const requested = searchParams.get("next") || "/admin/dashboard";
  const next =
    requested.startsWith("/admin") && !requested.startsWith("//")
      ? requested
      : "/admin/dashboard";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "Unable to sign in");
        return;
      }
      router.push(next);
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream grid lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-between bg-dark text-cream p-12 xl:p-16">
        <div>
          <p className="font-display text-3xl font-light tracking-wide">Sujood</p>
          <p className="font-body text-[10px] tracking-[0.28em] uppercase text-sand mt-2">
            Modest essentials
          </p>
        </div>
        <div>
          <p className="font-display text-3xl xl:text-4xl font-light leading-snug max-w-sm">
            Manage the collection with care.
          </p>
          <p className="font-body text-sm text-sand leading-relaxed mt-6 max-w-sm">
            Products, pricing, stock and featured pieces — all from one quiet
            place.
          </p>
        </div>
        <p className="font-body text-[10px] tracking-[0.2em] uppercase text-sand/70">
          Authorised access only
        </p>
      </div>

      <div className="flex flex-col justify-center px-6 py-16 sm:px-12">
        <div className="w-full max-w-sm mx-auto">
          <div className="inline-flex items-center justify-center w-11 h-11 border border-sand text-earth mb-8">
            <Lock size={18} />
          </div>
          <h1 className="font-display text-3xl font-light text-dark">
            Admin access
          </h1>
          <p className="font-body text-sm text-text-muted mt-2 mb-8">
            Enter your admin password to continue.
          </p>

          <form onSubmit={handleSubmit} className="space-y-7">
            <Input
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              error={error}
              autoComplete="current-password"
              autoFocus
            />

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={loading || !password}
            >
              {loading ? "Verifying..." : "Sign In"}
            </Button>
          </form>

          <Link
            href="/"
            className="inline-flex items-center gap-2 mt-10 font-body text-xs tracking-[0.12em] uppercase text-earth hover:text-dark transition-colors"
          >
            <ArrowLeft size={14} />
            Back to store
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-cream">
          <p className="font-body text-sm text-text-muted">Loading...</p>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
