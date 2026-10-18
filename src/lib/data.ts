import { Product, Category, BlogPost, Testimonial } from "@/lib/types/product";

export const categories: Category[] = [
  {
    id: "1",
    slug: "modest-fashion",
    name: "Modest Fashion",
    itemCount: 48,
    image: "https://images.unsplash.com/photo-1760083545495-b297b1690672?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "2",
    slug: "home-decor",
    name: "Home Decor",
    itemCount: 32,
    image: "https://images.unsplash.com/photo-1772805498407-69163cc34bc9?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "3",
    slug: "prayer-essentials",
    name: "Prayer Essentials",
    itemCount: 24,
    image: "https://images.unsplash.com/photo-1556760647-90d218f7ca5b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "4",
    slug: "ramadan-specials",
    name: "Ramadan Specials",
    itemCount: 18,
    image: "https://images.unsplash.com/photo-1771909752761-d26abe4e60ba?auto=format&fit=crop&w=800&q=80",
  },
];

export const products: Product[] = [
  {
    id: "1",
    slug: "premium-prayer-cap-white",
    name: "Premium Prayer Cap",
    category: "Prayer Essentials",
    price: 499,
    originalPrice: 699,
    description: "Handcrafted premium cotton prayer cap with subtle embroidery.",
    images: [
      "https://images.unsplash.com/photo-1770153811845-399cae8d49af?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1757035546085-bb186e26b9f9?auto=format&fit=crop&w=600&q=80"
    ],
    badge: "Bestseller",
    sizes: ["S", "M", "L"],
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Cream", hex: "#FAF8F4" },
      { name: "Black", hex: "#2A2420" },
    ],
    inStock: true,
    featured: true,
  },
  {
    id: "2",
    slug: "embroidered-abaya-black",
    name: "Embroidered Abaya",
    category: "Modest Fashion",
    price: 2499,
    description: "Elegant black abaya with gold thread embroidery along the cuffs.",
    images: [
      "https://images.unsplash.com/photo-1772474569781-2fb1c6539f8c?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1760083545495-b297b1690672?auto=format&fit=crop&w=600&q=80"
    ],
    badge: "New",
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Black", hex: "#2A2420" }],
    inStock: true,
    featured: true,
  },
  {
    id: "3",
    slug: "islamic-wall-art-calligraphy",
    name: "Islamic Wall Art — Calligraphy",
    category: "Home Decor",
    price: 1899,
    description: "Beautiful Arabic calligraphy wall art on premium canvas.",
    images: [
      "https://images.unsplash.com/photo-1771909752761-d26abe4e60ba?auto=format&fit=crop&w=600&q=80"
    ],
    inStock: true,
    featured: true,
  },
  {
    id: "4",
    slug: "premium-prayer-mat-cream",
    name: "Premium Prayer Mat",
    category: "Prayer Essentials",
    price: 1299,
    originalPrice: 1599,
    description: "Ultra-soft prayer mat with memory foam cushioning.",
    images: [
      "https://images.unsplash.com/photo-1761958150507-7bcc80840cf9?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1760072986251-d4bf6d68da6f?auto=format&fit=crop&w=600&q=80"
    ],
    badge: "Sale",
    colors: [
      { name: "Cream", hex: "#FAF8F4" },
      { name: "Green", hex: "#4A5D3A" },
    ],
    inStock: true,
    featured: true,
  },
  {
    id: "5",
    slug: "hijab-chiffon-dusty-rose",
    name: "Chiffon Hijab — Dusty Rose",
    category: "Modest Fashion",
    price: 799,
    description: "Lightweight chiffon hijab in a beautiful dusty rose shade.",
    images: [
      "https://images.unsplash.com/photo-1578973915942-f82bfcfedaba?auto=format&fit=crop&w=600&q=80"
    ],
    badge: "New",
    colors: [
      { name: "Dusty Rose", hex: "#C4A4A4" },
      { name: "Sage", hex: "#9CAF88" },
      { name: "Nude", hex: "#D4B8A0" },
    ],
    inStock: true,
  },
  {
    id: "6",
    slug: "arabic-oud-candle",
    name: "Arabic Oud Candle",
    category: "Home Decor",
    price: 599,
    description: "Hand-poured soy candle with authentic Arabic oud fragrance.",
    images: [
      "https://images.unsplash.com/photo-1772805498407-69163cc34bc9?auto=format&fit=crop&w=600&q=80"
    ],
    inStock: true,
  },
  {
    id: "7",
    slug: "kids-thobe-white",
    name: "Kids Thobe — White",
    category: "Modest Fashion",
    price: 999,
    description: "Comfortable cotton thobe for boys, perfect for daily wear and prayers.",
    images: [
      "https://images.unsplash.com/photo-1616147147027-60d49d3582c4?auto=format&fit=crop&w=600&q=80"
    ],
    sizes: ["4Y", "6Y", "8Y", "10Y", "12Y"],
    colors: [{ name: "White", hex: "#FFFFFF" }],
    inStock: true,
  },
  {
    id: "8",
    slug: "tasbeeh-crystal-beads",
    name: "Crystal Tasbeeh",
    category: "Prayer Essentials",
    price: 349,
    description: "33-bead crystal tasbeeh with gold-plated accents.",
    images: [
      "https://images.unsplash.com/photo-1556760647-90d218f7ca5b?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1762894110127-87fee1d11a57?auto=format&fit=crop&w=600&q=80"
    ],
    badge: "Bestseller",
    inStock: true,
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Fatima Ahmed",
    location: "Mumbai",
    rating: 5,
    quote: "The quality of the abaya is exceptional. The fabric feels luxurious and the embroidery is so delicate. Sujood has become my go-to brand.",
  },
  {
    id: "2",
    name: "Ayesha Khan",
    location: "Delhi",
    rating: 5,
    quote: "Beautiful prayer mats! The memory foam makes such a difference during long prayers. My entire family now uses Sujood products.",
  },
  {
    id: "3",
    name: "Mohammed Rizvi",
    location: "Hyderabad",
    rating: 5,
    quote: "Ordered the Islamic wall art for our new home. The calligraphy is stunning and the quality exceeded expectations. Highly recommend!",
  },
  {
    id: "4",
    name: "Zainab Patel",
    location: "Bangalore",
    rating: 5,
    quote: "The hijabs are so soft and the colors are exactly as shown. Fast delivery and beautiful packaging. Will definitely order again.",
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "modest-fashion-trends-2024",
    title: "Modest Fashion Trends to Watch in 2024",
    excerpt: "Explore the evolving landscape of modest fashion and how contemporary designers are redefining elegance.",
    content: "Full article content here...",
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1760083545495-b297b1690672?auto=format&fit=crop&w=800&q=80",
    author: "Ayesha Rahman",
    date: "2024-03-15",
    featured: true,
  },
  {
    id: "2",
    slug: "ramadan-home-decor-ideas",
    title: "Transform Your Home for Ramadan",
    excerpt: "Simple yet impactful decor ideas to create a spiritually uplifting space for the holy month.",
    content: "Full article content here...",
    category: "Decor",
    image: "https://images.unsplash.com/photo-1772805498407-69163cc34bc9?auto=format&fit=crop&w=800&q=80",
    author: "Fatima Noor",
    date: "2024-03-10",
  },
  {
    id: "3",
    slug: "choosing-right-prayer-mat",
    title: "How to Choose the Right Prayer Mat",
    excerpt: "A comprehensive guide to finding the perfect prayer mat for comfort, durability, and spiritual connection.",
    content: "Full article content here...",
    category: "Lifestyle",
    image: "https://images.unsplash.com/photo-1556760647-90d218f7ca5b?auto=format&fit=crop&w=800&q=80",
    author: "Imran Siddiqui",
    date: "2024-03-05",
  },
];
