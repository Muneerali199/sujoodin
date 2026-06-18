"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Lock } from "lucide-react";

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "sujood-admin-2024";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    await new Promise((r) => setTimeout(r, 300));

    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("admin-auth", "true");
      router.push("/admin/dashboard");
    } else {
      setError("Invalid password");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-dark text-cream mb-4">
            <Lock size={28} />
          </div>
          <h1 className="font-display text-3xl font-semibold text-dark">
            Admin Access
          </h1>
          <p className="font-body text-sm text-text-muted mt-2">
            Enter your admin password to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            error={error}
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
      </div>
    </div>
  );
}
