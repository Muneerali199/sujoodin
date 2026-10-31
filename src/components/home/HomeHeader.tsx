"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Baby,
  BookOpen,
  ChevronDown,
  Gem,
  Gift,
  Heart,
  Home,
  Menu,
  MoonStar,
  Search,
  ShoppingBag,
  Sparkles,
  Truck,
  User,
  X,
} from "lucide-react";
import { useCartStore } from "@/lib/store/cart";
import { useWishlistStore } from "@/lib/store/wishlist";
import { useStoreHydrated } from "@/lib/store/use-store-hydrated";
import { categories, products } from "@/lib/data";
import { MobileMenu } from "@/components/layout/MobileMenu";

type NavChild = { label: string; href: string };
type NavLink = { label: string; href: string; children?: NavChild[] };

const navLinks: NavLink[] = [
  {
    label: "New Arrivals",
    href: "/shop/collections/new-arrivals",
  },
  { label: "Gift Sets", href: "/shop/collections/gift-sets" },
  { label: "Best Sellers", href: "/shop/collections/best-sellers" },
  {
    label: "Shop",
    href: "/shop",
    children: [
      { label: "All Products", href: "/shop" },
      { label: "Prayer Essentials", href: "/shop/prayer-essentials" },
      { label: "Modest Fashion", href: "/shop/modest-fashion" },
      { label: "Home & Decor", href: "/shop/home-decor" },
      { label: "Ramadan Specials", href: "/shop/ramadan-specials" },
      { label: "Wishlist", href: "/wishlist" },
    ],
  },
  {
    label: "Occasions",
    href: "/shop/collections/gift-edit",
    children: [
      {
        label: "Wedding Gifts",
        href: "/shop/collections/wedding-gifts",
      },
      { label: "Umrah Gifts", href: "/shop/collections/umrah-gifts" },
      {
        label: "Eid & Ramadan",
        href: "/shop/collections/ramadan-eid-gifts",
      },
      {
        label: "Housewarming",
        href: "/shop/collections/housewarming-gifts",
      },
      {
        label: "Congratulations",
        href: "/shop/collections/congratulations-gifts",
      },
      { label: "Gifting Edit", href: "/shop/collections/gift-edit" },
    ],
  },
  {
    label: "Categories",
    href: "/shop",
    children: [
      { label: "Modest Fashion", href: "/shop/modest-fashion" },
      { label: "Home & Decor", href: "/shop/home-decor" },
      { label: "Prayer Essentials", href: "/shop/prayer-essentials" },
      { label: "Ramadan Specials", href: "/shop/ramadan-specials" },
      {
        label: "New Arrivals",
        href: "/shop/collections/new-arrivals",
      },
      { label: "The Journal", href: "/journal" },
    ],
  },
  {
    label: "Recipients",
    href: "/shop/collections/for-family",
    children: [
      { label: "For Her", href: "/shop/collections/for-wife" },
      { label: "For Him", href: "/shop/collections/for-husband" },
      { label: "For Kids", href: "/shop/collections/for-kids" },
      { label: "For Mother", href: "/shop/collections/for-mother" },
      { label: "For Father", href: "/shop/collections/for-father" },
      { label: "For Friends", href: "/shop/collections/for-friends" },
    ],
  },
];

const navPromo: Record<string, string> = {
  Shop: categories[0].image,
  Occasions:
    "https://images.unsplash.com/photo-1608755728617-aefab37d2edd?auto=format&fit=crop&w=700&q=80",
  Categories: categories[1].image,
  Recipients:
    "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=700&q=80",
};

const iconLinks = [
  {
    label: "Wedding",
    href: "/shop/collections/wedding-gifts",
    icon: Gem,
  },
  {
    label: "Gift Sets",
    href: "/shop/collections/gift-sets",
    icon: Gift,
  },
  {
    label: "Ramadan",
    href: "/shop/collections/ramadan-eid-gifts",
    icon: MoonStar,
  },
  { label: "Home", href: "/shop/home-decor", icon: Home },
  {
    label: "Gifting",
    href: "/shop/collections/gift-edit",
    icon: Sparkles,
  },
  { label: "Kids", href: "/shop/collections/for-kids", icon: Baby },
  { label: "Journal", href: "/journal", icon: BookOpen },
];

const railItems = [
  {
    label: "New Arrivals",
    href: "/shop/collections/new-arrivals",
    image: products[1].images[0],
  },
  {
    label: "Bestsellers",
    href: "/shop/collections/best-sellers",
    image: products[7].images[0],
  },
  {
    label: "Wedding Gifts",
    href: "/shop/collections/wedding-gifts",
    image:
      "https://images.unsplash.com/photo-1608755728617-aefab37d2edd?auto=format&fit=crop&w=400&q=80",
  },
  {
    label: "Ramadan",
    href: "/shop/collections/ramadan-eid-gifts",
    image: categories[3].image,
  },
  {
    label: "Modest Fashion",
    href: "/shop/modest-fashion",
    image: categories[0].image,
  },
  {
    label: "Home & Decor",
    href: "/shop/home-decor",
    image: categories[1].image,
  },
  {
    label: "Prayer Essentials",
    href: "/shop/prayer-essentials",
    image: products[3].images[0],
  },
  {
    label: "Gift Edit",
    href: "/shop/collections/gift-edit",
    image:
      "https://images.unsplash.com/photo-1607344645866-009c320b63e0?auto=format&fit=crop&w=600&q=90",
  },
  {
    label: "Journal",
    href: "/journal",
    image: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=400&q=80",
  },
];

export function HomeHeader() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const totalItems = useCartStore((state) => state.totalItems());
  const wishlistCount = useWishlistStore((state) => state.items.length);
  const hydrated = useStoreHydrated(useCartStore);
  const toggleCart = useCartStore((state) => state.toggleCart);

  const activeNav = navLinks.find((link) => link.label === openDropdown);

  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const value = query.trim();
    setMobileSearchOpen(false);
    router.push(value ? `/shop?q=${encodeURIComponent(value)}` : "/shop");
  };

  return (
    <>
      <div className="bg-forest-deep text-cream/75">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 h-9 flex items-center justify-between gap-4">
          <p className="flex items-center gap-2 font-body text-[10px] tracking-[0.14em] uppercase">
            <Truck size={12} className="text-gold" />
            Express delivery across India
          </p>
          <p className="hidden sm:block font-body text-[10px] tracking-[0.14em] uppercase">
            Free shipping over ₹999
          </p>
          <p className="font-body text-[10px] tracking-[0.14em] uppercase">
            IN <span className="text-gold">₹</span> INR
          </p>
        </div>
      </div>

      <header className="sticky top-0 z-50">
        <div className="bg-forest text-cream">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
            <div className="h-16 sm:h-[72px] flex items-center gap-4 lg:gap-8">
              <Link
                href="/"
                className="flex items-center gap-1 shrink-0"
                aria-label="Sujood home"
              >
                <span className="font-display text-2xl sm:text-[28px] font-light tracking-wide">
                  Sujood
                </span>
                <span className="text-gold text-2xl">.</span>
              </Link>

              <div className="hidden md:flex flex-1 justify-center px-4">
                <form
                  onSubmit={submitSearch}
                  role="search"
                  className="flex w-full max-w-xl items-center gap-2 bg-[#F7F3EA] text-dark rounded-full px-4 h-10"
                >
                  <Search size={16} className="text-earth shrink-0" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for gifts, prayer mats, abayas..."
                    aria-label="Search products"
                    className="flex-1 bg-transparent font-body text-xs outline-none placeholder:text-earth/60"
                  />
                </form>
              </div>

              <div className="flex items-center gap-4 sm:gap-5 ml-auto">
                <button
                  type="button"
                  onClick={() => setMobileSearchOpen((open) => !open)}
                  aria-label="Search"
                  aria-expanded={mobileSearchOpen}
                  className="md:hidden text-cream/80 hover:text-gold transition-colors"
                >
                  <Search size={19} />
                </button>
                <Link
                  href="/account"
                  aria-label="Account"
                  className="hidden sm:block text-cream/80 hover:text-gold transition-colors"
                >
                  <User size={19} />
                </Link>
                <Link
                  href="/wishlist"
                  aria-label="Wishlist"
                  className="relative hidden sm:block text-cream/80 hover:text-gold transition-colors"
                >
                  <Heart size={19} />
                  {hydrated && wishlistCount > 0 && (
                    <span className="absolute -top-2 -right-2 min-w-4 h-4 px-1 bg-gold text-forest-deep text-[9px] font-medium rounded-full flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </Link>
                <button
                  onClick={toggleCart}
                  aria-label="Open cart"
                  className="relative text-cream/80 hover:text-gold transition-colors"
                >
                  <ShoppingBag size={19} />
                  {hydrated && totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 min-w-4 h-4 px-1 bg-gold text-forest-deep text-[9px] font-medium rounded-full flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => {
                    setMobileSearchOpen(false);
                    setMobileOpen(true);
                  }}
                  aria-label="Open menu"
                  className="md:hidden text-cream/80 hover:text-gold transition-colors"
                >
                  <Menu size={21} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#FBF8F2] border-b border-sand/70">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
            {mobileSearchOpen && (
              <form
                onSubmit={submitSearch}
                role="search"
                className="md:hidden flex items-center gap-2 py-3"
              >
                <div className="flex flex-1 items-center gap-2 border border-sand bg-cream px-3 h-10">
                  <Search size={15} className="text-earth shrink-0" />
                  <input
                    autoFocus
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search for gifts..."
                    aria-label="Search products"
                    className="min-w-0 flex-1 bg-transparent font-body text-xs outline-none placeholder:text-earth/60"
                  />
                  <button
                    type="button"
                    onClick={() => setMobileSearchOpen(false)}
                    aria-label="Close search"
                    className="text-earth hover:text-forest transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
                <button
                  type="submit"
                  className="h-10 bg-forest px-4 font-body text-[9px] tracking-[0.16em] uppercase text-cream"
                >
                  Search
                </button>
              </form>
            )}
            <nav
              aria-label="Main navigation"
              onMouseLeave={() => setOpenDropdown(null)}
              className="relative hidden md:flex items-center justify-center gap-7 lg:gap-10 h-11"
            >
              {navLinks.map((link) =>
                link.children ? (
                  <div
                    key={link.label}
                    className="h-full flex items-center"
                    onMouseEnter={() => setOpenDropdown(link.label)}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenDropdown((current) =>
                          current === link.label ? null : link.label
                        )
                      }
                      aria-expanded={openDropdown === link.label}
                      aria-haspopup="true"
                      className={`inline-flex items-center gap-1.5 font-body text-[10px] lg:text-[11px] tracking-[0.16em] uppercase transition-colors ${
                        openDropdown === link.label
                          ? "text-forest"
                          : "text-earth hover:text-forest"
                      }`}
                    >
                      {link.label}
                      <ChevronDown
                        size={11}
                        className={`transition-transform ${
                          openDropdown === link.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="font-body text-[10px] lg:text-[11px] tracking-[0.16em] uppercase text-earth hover:text-forest transition-colors"
                  >
                    {link.label}
                  </Link>
                )
              )}

              {activeNav?.children && (
                <div className="absolute left-0 right-0 top-full z-50 border-t border-sand/70 bg-[#FBF8F2] shadow-[0_24px_60px_rgba(12,62,35,0.14)]">
                  <div className="grid grid-cols-[1.35fr_0.65fr] gap-10 px-8 py-8">
                    <div>
                      <p className="font-body text-[9px] tracking-[0.24em] uppercase text-gold">
                        Shop {activeNav.label}
                      </p>
                      <div className="mt-4 grid grid-cols-2 gap-x-8">
                        {activeNav.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            onClick={() => setOpenDropdown(null)}
                            className="group flex items-center justify-between border-b border-sand/60 py-2.5 font-body text-xs text-earth hover:text-forest transition-colors"
                          >
                            {child.label}
                            <ArrowUpRight
                              size={12}
                              className="opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0"
                            />
                          </Link>
                        ))}
                      </div>
                    </div>

                    <Link
                      href={activeNav.href}
                      onClick={() => setOpenDropdown(null)}
                      className="group relative min-h-[188px] overflow-hidden bg-stone"
                    >
                      <img
                        src={navPromo[activeNav.label] ?? categories[0].image}
                        alt=""
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 via-forest-deep/10 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-5">
                        <p className="font-body text-[9px] tracking-[0.18em] uppercase text-cream/60">
                          Explore the edit
                        </p>
                        <p className="font-display text-2xl font-light text-cream mt-1">
                          {activeNav.label}
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </nav>
          </div>
        </div>
      </header>

      <div className="bg-[#FBF8F2] border-b border-sand/70">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-4">
          <div className="no-scrollbar overflow-x-auto">
            <div className="flex items-start gap-5 sm:gap-8 min-w-max mx-auto w-fit px-1">
              {iconLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="group flex flex-col items-center gap-2 w-[58px]"
                  >
                    <span className="w-11 h-11 border border-gold/45 text-earth flex items-center justify-center group-hover:bg-forest group-hover:text-cream group-hover:border-forest transition-colors">
                      <Icon size={18} strokeWidth={1.4} />
                    </span>
                    <span className="font-body text-[9px] tracking-[0.08em] uppercase text-earth group-hover:text-forest text-center leading-tight">
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="no-scrollbar overflow-x-auto mt-4">
            <div className="flex items-start gap-3 sm:gap-5 min-w-max mx-auto w-fit">
              {railItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group flex flex-col items-center gap-2 w-[78px] sm:w-[92px]"
                >
                  <span className="arch-shape block w-[72px] sm:w-[84px] h-[92px] sm:h-[108px] overflow-hidden bg-stone border border-gold/35 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-gold/70 group-hover:shadow-[0_8px_24px_rgba(12,62,35,0.12)]">
                    <img
                      src={item.image}
                      alt=""
                      loading="lazy"
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  </span>
                  <span className="font-body text-[9px] sm:text-[10px] tracking-[0.06em] text-earth group-hover:text-forest text-center leading-tight">
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
