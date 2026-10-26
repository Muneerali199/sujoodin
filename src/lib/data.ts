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
    slug: "modest-fashion-trends-2026",
    title: "Modest Fashion Trends to Watch in 2026",
    excerpt:
      "Quiet luxury, breathable layers, and a return to real fabric — the shifts shaping how we dress with purpose this year.",
    content:
      "From quiet luxury to breathable layering, modest fashion in 2026 is moving toward fewer, better pieces.",
    sections: [
      {
        body: "Modest fashion has never been short of ideas, but this year the conversation has shifted from what looks new to what lasts. Designers and customers alike are asking better questions: Will this fabric survive an Indian summer? Can this abaya be worn to work, to a wedding, and to Jummah? The answers are shaping a quieter, more considered season.",
      },
      {
        heading: "Quiet luxury, louder values",
        body: "The most interesting collections this year are not the loudest. Unlined abayas, tonal embroidery, and restrained colour palettes are replacing heavy embellishment. What stands out is the fabric: washed cotton, bamboo jersey, and linen blends that breathe. Buyers are reading labels, asking where a piece was made, and choosing fewer items they intend to keep for years.",
      },
      {
        heading: "Layering that actually works",
        body: "The practical layering trend is a gift for modest dressing. Think wide-leg trousers under a long shirt, a light kimono over a column dress, or a knit vest over a collared tunic. The trick is proportion: keep one layer relaxed and the other close to the body so the silhouette stays clean rather than bulky.",
      },
      {
        heading: "Colour with intention",
        body: "Cream, clay, olive, and deep oxblood are moving in as the default palette. These are forgiving, flattering colours that work across seasons and photograph beautifully without looking trend-driven. If you want to experiment, do it in accessories — a printed scarf, a woven bag, or a single piece of gold jewellery.",
      },
      {
        heading: "What to buy first",
        body: "Start with one well-cut everyday abaya and one pair of trousers you can wear three ways. Add a breathable long-sleeve layer for summer and a heavier overshirt for winter. Build from there. A small wardrobe of pieces that fit properly will always feel more elegant than a full rail of things that almost work.",
      },
    ],
    category: "Fashion",
    image:
      "https://images.unsplash.com/photo-1760083545495-b297b1690672?auto=format&fit=crop&w=1200&q=80",
    author: "Ayesha Rahman",
    date: "2026-09-18",
    featured: true,
  },
  {
    id: "2",
    slug: "calmer-home-for-ramadan",
    title: "A Calmer Home for Ramadan",
    excerpt:
      "You do not need a full redecorating project. A few thoughtful changes can make your home feel ready for the month.",
    content:
      "Small, intentional changes — light, scent, and a clear surface — can prepare a home for Ramadan without a full redecorating project.",
    sections: [
      {
        body: "There is a particular kind of pressure that arrives before Ramadan: the urge to transform every room at once. In practice, the homes that feel most peaceful during the month are rarely the most decorated. They are the ones with a clear surface to pray on, a place to sit together, and a rhythm that leaves room for rest.",
      },
      {
        heading: "Begin with one corner",
        body: "Choose a single spot for prayer and make it feel intentional. A clean mat, a small side table for a tasbeeh and a glass of water, and a lamp you can switch on without overhead light is enough. Keep the area free of clutter so it stays inviting at every prayer time, not just the first week.",
      },
      {
        heading: "Light and scent, softly",
        body: "Warm, low lighting changes a room more than new furniture. Use a floor lamp or a pair of small table lamps instead of ceiling lights after Maghrib. Scent should be subtle: oud, amber, or a simple beeswax candle. Strong fragrance in a shared room can overwhelm, especially when people are fasting.",
      },
      {
        heading: "Prepare for gathering",
        body: "If you host iftar, set out what you need before the day begins. A stack of plates, a jug of water, and dates on a tray remove a hundred small decisions at sunset. Keep the table simple. The point is presence, not performance, and a calm host makes a calmer gathering.",
      },
      {
        heading: "Leave room for quiet",
        body: "Not every evening needs to be planned. Protect one or two nights a week for nothing more than Quran, tea, and an early sleep. A home prepared for Ramadan is not a showroom; it is a place that makes worship easier. Start there, and the rest will follow.",
      },
    ],
    category: "Decor",
    image:
      "https://images.unsplash.com/photo-1772805498407-69163cc34bc9?auto=format&fit=crop&w=1200&q=80",
    author: "Fatima Noor",
    date: "2026-08-30",
  },
  {
    id: "3",
    slug: "choosing-right-prayer-mat",
    title: "How to Choose a Prayer Mat You Will Keep for Years",
    excerpt:
      "Cushioning, size, care, and the details that matter more than pattern. A practical guide to buying well once.",
    content:
      "A good prayer mat is a long-term purchase. Here is what to check before you buy.",
    sections: [
      {
        body: "A prayer mat is one of the few things you will use every single day, often several times. It is worth choosing carefully. The right mat supports your knees and forehead, stays flat on the floor, and is easy to keep clean. The wrong one slides, traps heat, or looks worn within a season.",
      },
      {
        heading: "Start with thickness, not pattern",
        body: "Memory foam and dense cotton padding are comfortable, but too much thickness can make sujood feel unstable. Look for a mat that compresses slightly under the knees while staying firm enough to keep its shape. If you pray on a hard floor, a 10–15mm pad is usually the sweet spot. On carpet, a thinner mat is often better.",
      },
      {
        heading: "Check the size against how you pray",
        body: "Standard mats are around 110 × 70cm, which suits most adults. If you are taller, look for a longer mat rather than a wider one; the extra length is what keeps your feet and forehead on the mat during sujood. For children, a smaller mat is easier to manage and helps them set up their own space.",
      },
      {
        heading: "Look at the backing",
        body: "A non-slip backing matters more than most buyers expect. Smooth marble and tile floors are unforgiving, and a mat that shifts mid-prayer is distracting. Check that the base has a textured grip or a rubberised layer. If the mat is reversible, make sure both sides sit flat without curling at the edges.",
      },
      {
        heading: "Care that keeps it beautiful",
        body: "Vacuum gently or shake the mat outside once a week. Spot-clean spills with a damp cloth and mild soap, then let it dry flat and fully before folding. Avoid machine washing padded mats unless the care label explicitly allows it. Stored rolled rather than folded, a good mat will keep its shape for years.",
      },
    ],
    category: "Lifestyle",
    image:
      "https://images.unsplash.com/photo-1556760647-90d218f7ca5b?auto=format&fit=crop&w=1200&q=80",
    author: "Imran Siddiqui",
    date: "2026-08-12",
  },
];
