"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { X, MessageCircle } from "lucide-react";
import { staggerContainer, fadeInUp } from "@/lib/framer-variants";

interface MobileMenuProps {
  onClose: () => void;
}

export function MobileMenu({ onClose }: MobileMenuProps) {
  const links = [
    { label: "Collection", href: "/shop" },
    { label: "Home & Decor", href: "/shop/home-decor" },
    { label: "About", href: "/about" },
    { label: "Journal", href: "/journal" },
    { label: "Size Guide", href: "/size-guide" },
    { label: "Shipping & Returns", href: "/shipping-returns" },
    { label: "FAQ", href: "/faq" },
    { label: "Wishlist", href: "/wishlist" },
    { label: "Cart", href: "/cart" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[60] bg-cream"
    >
      <div className="flex flex-col h-full px-6 pt-6 pb-12">
        <div className="flex items-center justify-between mb-16">
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
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-8 flex-1"
        >
          {links.map((link) => (
            <motion.div key={link.href} variants={fadeInUp}>
              <Link
                href={link.href}
                onClick={onClose}
                className="font-display text-4xl font-light text-dark hover:text-gold transition-colors duration-300"
              >
                {link.label}
              </Link>
            </motion.div>
          ))}        </motion.nav>

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
            href="https://wa.me/919999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="text-earth hover:text-dark transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
}
