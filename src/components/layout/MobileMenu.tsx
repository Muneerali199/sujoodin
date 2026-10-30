"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { X } from "lucide-react";

const menuContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.05 },
  },
};

const menuItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.28 } },
};

interface MobileMenuProps {
  onClose: () => void;
}

export function MobileMenu({ onClose }: MobileMenuProps) {
  const links = [
    { label: "New Arrivals", href: "/shop/collections/new-arrivals" },
    { label: "Gift Sets", href: "/shop/collections/gift-sets" },
    { label: "Best Sellers", href: "/shop/collections/best-sellers" },
    { label: "Shop All", href: "/shop" },
    { label: "Search Products", href: "/shop#shop-search" },
    { label: "Occasions", href: "/#occasions" },
    { label: "Categories", href: "/#categories" },
    { label: "For Your Loved Ones", href: "/#loved-ones" },
    { label: "Journal", href: "/journal" },
    { label: "About", href: "/about" },
    { label: "FAQ", href: "/faq" },
    { label: "Wishlist", href: "/wishlist" },
    { label: "Account", href: "/account" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[60] bg-cream overflow-y-auto"
    >
      <div className="flex flex-col min-h-full px-6 pt-6 pb-10">
        <div className="flex items-center justify-between mb-12">
          <Link href="/" className="flex items-center gap-1" onClick={onClose}>
            <span className="font-display text-2xl font-light tracking-wide text-dark">
              Sujood
            </span>
            <span className="text-gold text-2xl">.</span>
          </Link>
          <button onClick={onClose} aria-label="Close menu">
            <X className="w-6 h-6 text-dark" />
          </button>
        </div>

        <motion.nav
          variants={menuContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-5 flex-1"
        >
          {links.map((link) => (
            <motion.div key={link.label} variants={menuItem}>
              <Link
                href={link.href}
                onClick={onClose}
                className="font-display text-3xl font-light text-dark hover:text-gold transition-colors duration-300"
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </motion.nav>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex items-center gap-6 pt-8 border-t border-sand"
        >
          <a
            href="https://instagram.com/sujood.in"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-sm text-earth hover:text-dark transition-colors"
          >
            Instagram
          </a>
          <a
            href="mailto:hello@sujood.in"
            className="font-body text-sm text-earth hover:text-dark transition-colors"
          >
            hello@sujood.in
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
}
