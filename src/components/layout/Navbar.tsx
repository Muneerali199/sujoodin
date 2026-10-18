"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/lib/store/cart";
import { MagneticButton } from "@/components/ui/CustomCursor";
import { MobileMenu } from "./MobileMenu";

const navLinks = [
  { label: "Collection", href: "/shop" },
  { label: "Home & Decor", href: "/shop/home-decor" },
  { label: "About", href: "/about" },
  { label: "Journal", href: "/journal" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const totalItems = useCartStore((state) => state.totalItems());
  const toggleCart = useCartStore((state) => state.toggleCart);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
                  data-cursor-hover
                  className="font-body text-xs tracking-[0.2em] uppercase text-earth hover:text-dark transition-colors duration-300 group relative"
                >
                  <span className="relative z-10">{link.label}</span>
                  <div
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 bg-gold rounded-full transition-all duration-300 group-hover:w-full"
                  />
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-6">
              <button
                onClick={toggleCart}
                className="relative font-body text-xs tracking-[0.2em] uppercase text-earth hover:text-dark transition-colors duration-300 hidden md:block group relative"
              >
                <span className="relative z-10">
                  <ShoppingBag className="w-5 h-5" />
                </span>
                <div
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 bg-gold rounded-full transition-all duration-300 group-hover:w-full"
                />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-gold text-dark text-[9px] font-medium rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
              <Link
                href="/shop"
                className="font-body text-xs tracking-[0.2em] uppercase bg-dark text-cream px-5 py-2.5 hover:bg-earth transition-colors duration-300 relative group overflow-hidden"
              >
                <span className="relative z-10">Shop Now</span>
                <div
                  className="absolute inset-0 bg-gold/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
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
