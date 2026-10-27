"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import {
  LayoutDashboard,
  Package,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
];

function Sidebar({
  mobile,
  pathname,
  onNavigate,
  onLogout,
  loading,
}: {
  mobile?: boolean;
  pathname: string;
  onNavigate: () => void;
  onLogout: () => void;
  loading: boolean;
}) {
  return (
    <div
      className={`bg-dark text-cream flex flex-col h-full ${
        mobile ? "w-full" : "w-64"
      }`}
    >
      <div className="p-6 border-b border-earth flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-light tracking-wide">
            Sujood
          </h1>
          <p className="font-body text-[10px] tracking-[0.24em] uppercase text-sand mt-1">
            Admin Panel
          </p>
        </div>
        {mobile && (
          <button
            onClick={onNavigate}
            className="text-sand hover:text-cream transition-colors"
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        )}
      </div>

      <nav className="flex-1 p-4 space-y-1" aria-label="Admin navigation">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              aria-current={isActive ? "page" : undefined}
              className={`flex items-center gap-3 px-4 py-3 font-body text-sm transition-colors border-l-2 ${
                isActive
                  ? "border-gold bg-earth/60 text-cream"
                  : "border-transparent text-sand hover:bg-earth/40 hover:text-cream"
              }`}
            >
              <Icon size={17} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-earth space-y-2">
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          onClick={onNavigate}
          className="flex items-center gap-3 px-4 py-2.5 font-body text-xs tracking-wide text-sand hover:text-cream transition-colors"
        >
          <ExternalLink size={15} />
          View store
        </Link>
        <Button
          variant="ghost"
          className="w-full justify-start text-sand hover:text-cream"
          onClick={onLogout}
          disabled={loading}
        >
          <LogOut size={17} className="mr-3" />
          {loading ? "Signing out..." : "Sign Out"}
        </Button>
      </div>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } finally {
      router.push("/admin/login");
      router.refresh();
    }
  };

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-cream flex">
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-dark/60 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside className="hidden lg:flex flex-col fixed inset-y-0 left-0 z-50">
        <Sidebar
          pathname={pathname}
          onNavigate={() => setMobileOpen(false)}
          onLogout={handleLogout}
          loading={loading}
        />
      </aside>

      <aside className="fixed inset-0 z-50 lg:hidden pointer-events-none">
        <div
          className={`h-full transition-transform duration-300 pointer-events-auto ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar
            mobile
            pathname={pathname}
            onNavigate={() => setMobileOpen(false)}
            onLogout={handleLogout}
            loading={loading}
          />
        </div>
      </aside>

      <div className="flex-1 flex flex-col lg:ml-64">
        <header className="lg:hidden bg-dark text-cream px-4 py-3 flex items-center justify-between gap-3 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="text-sand hover:text-cream transition-colors"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
            <h1 className="font-display text-lg font-light">Sujood Admin</h1>
          </div>
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sand hover:text-cream transition-colors"
            aria-label="View store"
          >
            <ExternalLink size={17} />
          </Link>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-10 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
