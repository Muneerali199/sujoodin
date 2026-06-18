import Link from "next/link";
import { MessageCircle, Mail } from "lucide-react";

export function Footer() {
  const shopLinks = [
    { label: "All Products", href: "/shop" },
    { label: "Modest Fashion", href: "/shop/modest-fashion" },
    { label: "Home & Decor", href: "/shop/home-decor" },
    { label: "Prayer Essentials", href: "/shop/prayer-essentials" },
    { label: "Ramadan Specials", href: "/shop/ramadan-specials" },
  ];

  const companyLinks = [
    { label: "Our Story", href: "/about" },
    { label: "Journal", href: "/journal" },
    { label: "Contact Us", href: "/about#contact" },
    { label: "Shipping & Returns", href: "/about#shipping" },
    { label: "Privacy Policy", href: "/about#privacy" },
  ];

  const connectLinks = [
    { label: "Instagram", href: "https://instagram.com/sujood.in" },
    { label: "WhatsApp", href: "https://wa.me/919999999999", icon: <MessageCircle className="w-4 h-4" /> },
    { label: "Email", href: "mailto:hello@sujood.in", icon: <Mail className="w-4 h-4" /> },
  ];

  return (
    <footer className="bg-dark text-cream">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-1 mb-6">
              <span className="font-display text-2xl font-light tracking-wide">
                Sujood
              </span>
              <span className="text-gold text-2xl">.</span>
            </Link>
            <p className="font-body text-sm text-cream/60 leading-relaxed max-w-xs">
              Live in faith, dress with purpose. Curating modest fashion and
              Islamic lifestyle essentials for the modern Muslim.
            </p>
          </div>

          <div>
            <h3 className="font-body text-[10px] tracking-[0.25em] uppercase text-gold mb-6">
              Shop
            </h3>
            <ul className="flex flex-col gap-3">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-cream/60 hover:text-cream transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-body text-[10px] tracking-[0.25em] uppercase text-gold mb-6">
              Company
            </h3>
            <ul className="flex flex-col gap-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-cream/60 hover:text-cream transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-body text-[10px] tracking-[0.25em] uppercase text-gold mb-6">
              Connect
            </h3>
            <ul className="flex flex-col gap-3">
              {connectLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 font-body text-sm text-cream/60 hover:text-cream transition-colors duration-300"
                  >
                    {"icon" in link && link.icon}
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="py-6 border-t border-cream/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-cream/40">
            © {new Date().getFullYear()} Sujood. All rights reserved.
          </p>
          <p className="font-body text-xs text-cream/40">
            Made with faith in India
          </p>
        </div>
      </div>
    </footer>
  );
}
