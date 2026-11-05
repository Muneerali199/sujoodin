"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, Lock, User } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { authClient } from "@/lib/auth/client";

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
  const [error, setError] = useState(
    searchParams.get("error") === "google"
      ? "Google sign-in could not be completed. Please try again."
      : ""
  );
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const isRegister = mode === "register";

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setError("");

    try {
      const callback = new URL("/api/auth/complete", window.location.origin);
      callback.searchParams.set("next", next);

      await authClient.signIn.social({
        provider: "google",
        callbackURL: callback.toString(),
        errorCallbackURL: `${window.location.origin}/account/login?error=google`,
      });
    } catch {
      setError("Could not start Google sign-in. Please try again.");
    } finally {
      setGoogleLoading(false);
    }
  };

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

          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={googleLoading || loading}
            className="w-full inline-flex items-center justify-center gap-3 border border-sand bg-warm-white px-5 py-3.5 font-body text-sm text-dark transition-colors hover:border-earth disabled:opacity-50 disabled:pointer-events-none"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              <path
                fill="#4285F4"
                d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62Z"
              />
              <path
                fill="#34A853"
                d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18Z"
              />
              <path
                fill="#FBBC05"
                d="M3.97 10.72A5.41 5.41 0 0 1 3.69 9c0-.6.1-1.18.28-1.72V4.95H.96A9 9 0 0 0 0 9c0 1.45.35 2.82.96 4.05l3.01-2.33Z"
              />
              <path
                fill="#EA4335"
                d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58A8.65 8.65 0 0 0 9 0 9 9 0 0 0 .96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58Z"
              />
            </svg>
            {googleLoading ? "Connecting..." : "Continue with Google"}
          </button>

          <div className="flex items-center gap-4 my-7">
            <span className="h-px flex-1 bg-sand" />
            <span className="font-body text-[10px] tracking-[0.18em] uppercase text-text-muted">
              or
            </span>
            <span className="h-px flex-1 bg-sand" />
          </div>

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
