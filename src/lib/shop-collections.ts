import "server-only";

import type { Product } from "@/lib/types/product";

type ProductMatcher = (product: Product) => boolean;

export type CollectionSort =
  | "featured"
  | "newest"
  | "price-asc"
  | "price-desc";

export interface ShopCollection {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  defaultSort: CollectionSort;
  matches: ProductMatcher;
  fallback?: ProductMatcher;
}

const productText = (product: Product) =>
  `${product.name} ${product.category} ${product.description}`.toLowerCase();

const inCategories = (...categories: string[]): ProductMatcher =>
  (product) => categories.includes(product.category);

const hasTerms = (...terms: string[]): ProductMatcher =>
  (product) => terms.some((term) => productText(product).includes(term));

const any = (...matchers: ProductMatcher[]): ProductMatcher =>
  (product) => matchers.some((matcher) => matcher(product));

const prayer = inCategories("Prayer Essentials");
const modest = inCategories("Modest Fashion");
const home = inCategories("Home Decor");
const ramadan = inCategories("Ramadan Specials");
const featured: ProductMatcher = (product) => Boolean(product.featured);
const badged: ProductMatcher = (product) => Boolean(product.badge);

const collections: ShopCollection[] = [
  {
    slug: "new-arrivals",
    eyebrow: "Just landed",
    title: "New Arrivals",
    description:
      "The newest pieces to join Sujood, from considered modest layers to daily prayer essentials.",
    defaultSort: "newest",
    matches: (product) => product.badge === "New",
    fallback: featured,
  },
  {
    slug: "best-sellers",
    eyebrow: "Community favourites",
    title: "Best Sellers",
    description:
      "The pieces our community returns to most, chosen for everyday usefulness and lasting quality.",
    defaultSort: "featured",
    matches: (product) => product.badge === "Bestseller",
    fallback: featured,
  },
  {
    slug: "gift-sets",
    eyebrow: "Curated with care",
    title: "Gift Sets",
    description:
      "Meaningful combinations for prayer, home, Ramadan, weddings, and the people you love.",
    defaultSort: "featured",
    matches: any(prayer, home, ramadan, featured),
  },
  {
    slug: "gift-edit",
    eyebrow: "Made for giving",
    title: "The Gift Edit",
    description:
      "A considered selection of useful, beautiful gifts for every relationship and occasion.",
    defaultSort: "featured",
    matches: any(featured, badged),
    fallback: () => true,
  },
  {
    slug: "faith-inspired-gifts",
    eyebrow: "For the everyday",
    title: "Faith Inspired Gifts",
    description:
      "Prayer essentials and quiet home pieces designed to support daily worship and remembrance.",
    defaultSort: "featured",
    matches: any(prayer, home),
  },
  {
    slug: "unique-gifts",
    eyebrow: "A little different",
    title: "Unique Gifts",
    description:
      "Distinctive pieces for people who appreciate thoughtful details, craft, and quiet beauty.",
    defaultSort: "featured",
    matches: any(home, badged),
    fallback: featured,
  },
  {
    slug: "wedding-gifts",
    eyebrow: "For the nikah",
    title: "Wedding Gifts",
    description:
      "Keepsakes, prayer essentials, home pieces, and modest layers for a beautiful new beginning.",
    defaultSort: "featured",
    matches: any(modest, home, prayer),
  },
  {
    slug: "umrah-gifts",
    eyebrow: "For the journey",
    title: "Umrah Gifts",
    description:
      "Prayer essentials and meaningful keepsakes for pilgrims before they leave or when they return.",
    defaultSort: "featured",
    matches: prayer,
    fallback: any(prayer, home),
  },
  {
    slug: "ramadan-eid-gifts",
    eyebrow: "For blessed days",
    title: "Ramadan & Eid Gifts",
    description:
      "Thoughtful pieces for worship, hosting, Eid morning, and sharing the month with people you love.",
    defaultSort: "featured",
    matches: any(ramadan, prayer, home),
  },
  {
    slug: "congratulations-gifts",
    eyebrow: "Celebrate their moment",
    title: "Congratulations Gifts",
    description:
      "Small and meaningful ways to celebrate a milestone, new chapter, or answered du'a.",
    defaultSort: "featured",
    matches: any(featured, badged),
    fallback: () => true,
  },
  {
    slug: "bismillah-ceremony-gifts",
    eyebrow: "A beautiful beginning",
    title: "Bismillah Ceremony Gifts",
    description:
      "Gentle, faith-led gifts to mark a child's first steps into learning and remembrance.",
    defaultSort: "price-asc",
    matches: any(prayer, (product) => home(product) && product.price < 2000),
  },
  {
    slug: "aqiqah-gifts",
    eyebrow: "Welcome, little one",
    title: "Aqiqah Gifts",
    description:
      "Useful and heartfelt gifts for a growing family and a much-prayed-for new arrival.",
    defaultSort: "price-asc",
    matches: any(
      hasTerms("kids", "child", "thobe"),
      (product) => home(product) && product.price < 1000
    ),
    fallback: any(home, modest),
  },
  {
    slug: "housewarming-gifts",
    eyebrow: "For a new home",
    title: "Housewarming Gifts",
    description:
      "Calm, considered pieces that bring warmth, faith, and a sense of belonging to a new space.",
    defaultSort: "featured",
    matches: home,
  },
  {
    slug: "khatm-al-quran-gifts",
    eyebrow: "Mark the milestone",
    title: "Khatm-al-Quran Gifts",
    description:
      "Meaningful prayer and home pieces to honour a beautiful achievement in faith.",
    defaultSort: "featured",
    matches: any(prayer, home),
  },
  {
    slug: "gifts-under-999",
    eyebrow: "Small gesture, big du'a",
    title: "Gifts Under ₹999",
    description:
      "Thoughtful gifting at an easy budget, without compromising on usefulness or presentation.",
    defaultSort: "price-asc",
    matches: (product) => product.price < 1000,
  },
  {
    slug: "for-husband",
    eyebrow: "Gift by relationship",
    title: "Gifts for Husband",
    description:
      "Practical prayer essentials and modest everyday pieces he will genuinely use.",
    defaultSort: "featured",
    matches: any(prayer, hasTerms("thobe")),
  },
  {
    slug: "for-wife",
    eyebrow: "Gift by relationship",
    title: "Gifts for Wife",
    description:
      "Modest layers and beautiful home pieces chosen to make an everyday moment feel special.",
    defaultSort: "featured",
    matches: any(modest, home),
  },
  {
    slug: "for-relatives",
    eyebrow: "Gift by relationship",
    title: "Gifts for Relatives",
    description:
      "Easy-to-love prayer and home gifts for the family members who always show up.",
    defaultSort: "featured",
    matches: any(home, prayer),
  },
  {
    slug: "for-kids",
    eyebrow: "Gift by relationship",
    title: "Gifts for Kids",
    description:
      "Comfortable, faith-friendly pieces chosen for little ones and growing families.",
    defaultSort: "price-asc",
    matches: hasTerms("kids", "child", "thobe"),
    fallback: modest,
  },
  {
    slug: "for-mother",
    eyebrow: "Gift by relationship",
    title: "Gifts for Mother",
    description:
      "Quietly beautiful pieces for her home, wardrobe, and moments of worship.",
    defaultSort: "featured",
    matches: any(home, modest),
  },
  {
    slug: "for-father",
    eyebrow: "Gift by relationship",
    title: "Gifts for Father",
    description:
      "Useful prayer essentials and timeless everyday pieces, selected with care.",
    defaultSort: "featured",
    matches: any(prayer, hasTerms("thobe")),
  },
  {
    slug: "for-family",
    eyebrow: "Gift by relationship",
    title: "Gifts for Family",
    description:
      "Thoughtful pieces for shared homes, daily rituals, and family celebrations.",
    defaultSort: "featured",
    matches: any(home, prayer, modest),
  },
  {
    slug: "for-friends",
    eyebrow: "Gift by relationship",
    title: "Gifts for Friends",
    description:
      "Small gestures with meaning, chosen for the friends who make ordinary days better.",
    defaultSort: "price-asc",
    matches: (product) => product.price < 1500,
  },
  {
    slug: "prayer-sets",
    eyebrow: "The daily ritual",
    title: "Prayer Sets",
    description:
      "Comfortable, considered essentials for a quieter and more present prayer routine.",
    defaultSort: "featured",
    matches: prayer,
  },
  {
    slug: "prayer-mats",
    eyebrow: "Prayer essentials",
    title: "Prayer Mats",
    description:
      "Supportive prayer mats selected for comfort, stability, and daily use.",
    defaultSort: "featured",
    matches: hasTerms("prayer mat", "janamaz"),
    fallback: prayer,
  },
  {
    slug: "tasbeeh",
    eyebrow: "Prayer essentials",
    title: "Tasbeeh",
    description:
      "Beautifully balanced beads for quiet remembrance at home or on the move.",
    defaultSort: "price-asc",
    matches: hasTerms("tasbeeh", "bead"),
    fallback: prayer,
  },
  {
    slug: "prayer-caps",
    eyebrow: "Prayer essentials",
    title: "Prayer Caps",
    description:
      "Comfortable, hand-finished prayer caps for daily wear, Jummah, and gifting.",
    defaultSort: "price-asc",
    matches: hasTerms("prayer cap", "cap"),
    fallback: prayer,
  },
  {
    slug: "abayas",
    eyebrow: "Modest fashion",
    title: "Abayas",
    description:
      "Considered silhouettes and breathable layers for everyday ease and special occasions.",
    defaultSort: "featured",
    matches: hasTerms("abaya"),
    fallback: modest,
  },
  {
    slug: "hijabs",
    eyebrow: "Modest fashion",
    title: "Hijabs",
    description:
      "Soft, versatile hijabs in easy colours for work, worship, and everyday wear.",
    defaultSort: "featured",
    matches: hasTerms("hijab"),
    fallback: modest,
  },
  {
    slug: "wall-art",
    eyebrow: "Home & sanctuary",
    title: "Islamic Wall Art",
    description:
      "Calligraphy and considered artwork that bring meaning to the walls of your home.",
    defaultSort: "featured",
    matches: hasTerms("wall art", "calligraphy", "frame"),
    fallback: home,
  },
  {
    slug: "candles",
    eyebrow: "Home & sanctuary",
    title: "Candles & Fragrance",
    description:
      "Warm, restrained scent for quiet evenings, gatherings, and meaningful gifting.",
    defaultSort: "price-asc",
    matches: hasTerms("candle", "oud", "fragrance"),
    fallback: home,
  },
  {
    slug: "kids-thobes",
    eyebrow: "For little ones",
    title: "Kids Thobes",
    description:
      "Comfortable modest pieces made for movement, prayer, celebrations, and everyday wear.",
    defaultSort: "price-asc",
    matches: hasTerms("kids thobe", "thobe"),
    fallback: modest,
  },
  {
    slug: "home-accents",
    eyebrow: "Home & sanctuary",
    title: "Home Accents",
    description:
      "Quiet details for the spaces where you gather, rest, remember, and pray.",
    defaultSort: "featured",
    matches: home,
  },
];

export function getShopCollection(slug: string) {
  return collections.find((collection) => collection.slug === slug) ?? null;
}

export function getCollectionProducts(
  products: Product[],
  collection: ShopCollection
) {
  const matches = products.filter(collection.matches);
  if (matches.length > 0) return matches;

  const fallback = collection.fallback
    ? products.filter(collection.fallback)
    : products.filter(featured);

  return fallback.length > 0 ? fallback : products;
}
