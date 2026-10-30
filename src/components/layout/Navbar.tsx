"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, Heart, Search, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/lib/store/cart";
import { useWishlistStore } from "@/lib/store/wishlist";
import { useStoreHydrated } from "@/lib/store/use-store-hydrated";
import { MobileMenu } from "./MobileMenu";

const navLinks = [
  { label: "Collection", href: "/shop" },
  { label: "Home & Decor", href: "/shop/home-decor" },
  { label: "About", href: "/about" },
  { label: "Journal", href: "/journal" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const totalItems = useCartStore((state) => state.totalItems());
  const wishlistCount = useWishlistStore((state) => state.items.length);
  const hydrated = useStoreHydrated(useCartStore);
  const toggleCart = useCartStore((state) => state.toggleCart);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname === "/") return null;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-cream/95 backdrop-blur-md border-b border-sand/50"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-1 group">
              <span className="font-display text-2xl font-light tracking-wide text-dark group-hover:text-gold transition-colors duration-300">
                Sujood
              </span>
              <span className="text-gold text-2xl">.</span>
            </Link>

            <div className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-body text-xs tracking-[0.2em] uppercase text-earth hover:text-dark transition-colors duration-300 group relative"
                >
                  <span className="relative z-10">{link.label}</span>
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-5 sm:gap-6">
              <Link
                href="/shop#shop-search"
                aria-label="Search products"
                className="hidden md:block text-earth hover:text-dark transition-colors duration-300"
              >
                <Search className="w-5 h-5" />
              </Link>
              <Link
                href="/account"
                aria-label="Account"
                className="hidden md:block text-earth hover:text-dark transition-colors duration-300"
              >
                <User className="w-5 h-5" />
              </Link>
              <Link
                href="/wishlist"
                aria-label="Wishlist"
                className="relative hidden md:block text-earth hover:text-dark transition-colors duration-300"
              >
                <Heart className="w-5 h-5" />
                {hydrated && wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-gold text-dark text-[9px] font-medium rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <button
                onClick={toggleCart}
                aria-label="Open cart"
                className="relative text-earth hover:text-dark transition-colors duration-300"
              >
                <ShoppingBag className="w-5 h-5" />
                {hydrated && totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-gold text-dark text-[9px] font-medium rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
              <Link
                href="/shop"
                className="hidden lg:inline-flex font-body text-xs tracking-[0.2em] uppercase bg-dark text-cream px-5 py-2.5 hover:bg-earth transition-colors duration-300"
              >
                Shop Now
              </Link>
              <button
                onClick={() => setMobileOpen(true)}
                className="md:hidden text-dark hover:text-gold transition-colors duration-300"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
