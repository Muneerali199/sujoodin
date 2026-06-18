"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { LayoutDashboard, Package, LogOut, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    setLoading(true);
    sessionStorage.removeItem("admin-auth");
    router.push("/admin/login");
  };

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const navItems = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/products", label: "Products", icon: Package },
  ];

  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <div className={`bg-dark text-cream flex flex-col h-full ${mobile ? "w-full" : "w-64"}`}>
      <div className="p-6 border-b border-earth flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold">Sujood</h1>
          <p className="font-body text-xs text-sand mt-1">Admin Panel</p>
        </div>
        {mobile && (
          <button onClick={() => setMobileOpen(false)} className="text-sand hover:text-cream">
            <X size={24} />
          </button>
        )}
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-body text-sm transition-colors ${
                isActive
                  ? "bg-earth text-cream"
                  : "text-sand hover:bg-earth/50 hover:text-cream"
              }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-earth">
        <Button
          variant="ghost"
          className="w-full justify-start text-sand hover:text-cream"
          onClick={handleLogout}
          disabled={loading}
        >
          <LogOut size={18} className="mr-3" />
          {loading ? "Signing out..." : "Sign Out"}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-cream flex">
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside className="hidden lg:flex flex-col fixed inset-y-0 left-0 z-50">
        <Sidebar />
      </aside>

      <aside className="fixed inset-0 z-50 lg:hidden">
        <div className={`h-full transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <Sidebar mobile />
        </div>
      </aside>

      <div className="flex-1 flex flex-col lg:ml-64">
        <header className="lg:hidden bg-dark text-cream px-4 py-3 flex items-center gap-3 sticky top-0 z-30">
          <button onClick={() => setMobileOpen(true)} className="text-sand hover:text-cream">
            <Menu size={24} />
          </button>
          <h1 className="font-display text-lg font-semibold">Sujood Admin</h1>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
