"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, Lock, User } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

type Mode = "login" | "register";

export function CustomerAuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requested = searchParams.get("next") || "/account";
  const next =
    requested.startsWith("/") && !requested.startsWith("//")
      ? requested
      : "/account";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isRegister = mode === "register";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        isRegister ? "/api/customer/register" : "/api/customer/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(
            isRegister ? { name, email, phone, password } : { email, password }
          ),
        }
      );
      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.success) {
        setError(data?.message || "Something went wrong. Please try again.");
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

  const switchHref = `${isRegister ? "/account/login" : "/account/register"}${
    next !== "/account" ? `?next=${encodeURIComponent(next)}` : ""
  }`;

  return (
    <div className="min-h-screen bg-cream grid lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-between bg-dark text-cream p-12 xl:p-16">
        <Link href="/" className="inline-flex items-center gap-1 w-fit">
          <span className="font-display text-3xl font-light tracking-wide">
            Sujood
          </span>
          <span className="text-gold text-3xl">.</span>
        </Link>

        <div>
          <p className="font-display text-3xl xl:text-4xl font-light leading-snug max-w-sm">
            {isRegister
              ? "A quieter way to shop."
              : "Welcome back to Sujood."}
          </p>
          <p className="font-body text-sm text-sand leading-relaxed mt-6 max-w-sm">
            {isRegister
              ? "Create an account to save your details, place order requests and keep your purchase history in one place."
              : "Sign in to place an order request and view your previous orders."}
          </p>
        </div>

        <p className="font-body text-[10px] tracking-[0.2em] uppercase text-sand/70">
          Modest essentials · India
        </p>
      </div>

      <div className="flex flex-col justify-center px-6 py-16 sm:px-12">
        <div className="w-full max-w-sm mx-auto">
          <div className="inline-flex items-center justify-center w-11 h-11 border border-sand text-earth mb-8">
            {isRegister ? <User size={18} /> : <Lock size={18} />}
          </div>
          <h1 className="font-display text-3xl font-light text-dark">
            {isRegister ? "Create your account" : "Sign in"}
          </h1>
          <p className="font-body text-sm text-text-muted mt-2 mb-8">
            {isRegister
              ? "Your details stay with your account for faster checkout."
              : "Enter your email and password to continue."}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {isRegister && (
              <Input
                label="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                autoComplete="name"
                required
              />
            )}
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
            {isRegister && (
              <Input
                label="Mobile number (optional)"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="10-digit number"
                autoComplete="tel"
              />
            )}
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={isRegister ? "At least 8 characters" : "Your password"}
              autoComplete={isRegister ? "new-password" : "current-password"}
              minLength={isRegister ? 8 : undefined}
              required
            />

            {error && (
              <p
                className="font-body text-xs text-red-600 leading-relaxed"
                role="alert"
              >
                {error}
              </p>
            )}

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={
                loading ||
                !email ||
                !password ||
                (isRegister && name.trim().length < 2)
              }
            >
              {loading
                ? isRegister
                  ? "Creating account..."
                  : "Signing in..."
                : isRegister
                  ? "Create account"
                  : "Sign in"}
              {!loading && <ArrowRight size={15} className="ml-2" />}
            </Button>
          </form>

          <p className="font-body text-sm text-text-muted mt-8">
            {isRegister ? "Already have an account?" : "New to Sujood?"}{" "}
            <Link
              href={switchHref}
              className="text-dark underline underline-offset-4 hover:text-gold transition-colors"
            >
              {isRegister ? "Sign in" : "Create one"}
            </Link>
          </p>

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
