import Link from "next/link";
import { Mail } from "lucide-react";

export function Footer() {
  const shopLinks = [
    { label: "All Products", href: "/shop" },
    { label: "New Arrivals", href: "/shop/collections/new-arrivals" },
    { label: "Best Sellers", href: "/shop/collections/best-sellers" },
    { label: "Hamper Sets", href: "/shop/collections/hamper-sets" },
    { label: "Prayer Essentials", href: "/shop/prayer-essentials" },
    { label: "Modest Fashion", href: "/shop/modest-fashion" },
    { label: "Home & Decor", href: "/shop/home-decor" },
  ];

  const occasionLinks = [
    { label: "Wedding Gifts", href: "/shop/collections/wedding-gifts" },
    {
      label: "Ramadan Gifts",
      href: "/shop/collections/ramadan-eid-gifts",
    },
    { label: "Eid Gifts", href: "/shop/collections/ramadan-eid-gifts" },
    {
      label: "Housewarming",
      href: "/shop/collections/housewarming-gifts",
    },
    { label: "Aqiqah", href: "/shop/collections/aqiqah-gifts" },
    { label: "The Gift Edit", href: "/shop/collections/gift-edit" },
  ];

  const helpLinks = [
    { label: "Track Order", href: "/account#orders" },
    { label: "Contact Us", href: "/about#contact" },
    { label: "Bulk Gifting", href: "/about#contact" },
    { label: "About Sujood", href: "/about" },
    { label: "Journal", href: "/journal" },
    { label: "Wishlist", href: "/wishlist" },
  ];

  const policyLinks = [
    { label: "Shipping Policy", href: "/shipping-returns#shipping" },
    { label: "Returns & Refunds", href: "/shipping-returns#returns" },
    { label: "Size Guide", href: "/size-guide" },
    { label: "FAQs", href: "/faq" },
  ];

  const connectLinks = [
    { label: "Instagram", href: "https://instagram.com/sujood.in" },
    {
      label: "Email",
      href: "mailto:hello@sujood.in",
      icon: <Mail className="w-4 h-4" />,
    },
  ];

  return (
    <footer className="bg-forest text-cream">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-10 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-1 mb-6">
              <span className="font-display text-2xl font-light tracking-wide">
                Sujood
              </span>
              <span className="text-gold text-2xl">.</span>
            </Link>
            <p className="font-body text-sm text-cream/60 leading-relaxed max-w-xs">
              Thoughtful, elegant, and personalised Islamic gifts that bring
              hearts closer to the beauty of Islam.
            </p>
            <p className="font-body text-[10px] tracking-[0.2em] uppercase text-gold mt-6">
              Share the Barakah!
            </p>
          </div>

          <div>
            <h3 className="font-body text-[10px] tracking-[0.25em] uppercase text-gold mb-6">
              Shop
            </h3>
            <ul className="flex flex-col gap-3">
              {shopLinks.map((link) => (
                <li key={link.label}>
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
              Occasions
            </h3>
            <ul className="flex flex-col gap-3">
              {occasionLinks.map((link) => (
                <li key={link.label}>
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
              Help
            </h3>
            <ul className="flex flex-col gap-3">
              {helpLinks.map((link) => (
                <li key={link.label}>
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
              Policies
            </h3>
            <ul className="flex flex-col gap-3">
              {policyLinks.map((link) => (
                <li key={link.label}>
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
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      link.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
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
            Made with faith in India · Secure checkout
          </p>
        </div>
      </div>
    </footer>
  );
}
