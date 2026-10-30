import { getProducts } from "@/lib/server-data";
import { HomeHeader } from "@/components/home/HomeHeader";
import { HomeHero } from "@/components/home/HomeHero";
import { QuoteSection } from "@/components/home/QuoteSection";
import { PromiseStrip } from "@/components/home/PromiseStrip";
import { OccasionGifts } from "@/components/home/OccasionGifts";
import { CircleRail } from "@/components/home/CircleRail";
import { GiftFinderBanner } from "@/components/home/GiftFinderBanner";
import { CuratedSets } from "@/components/home/CuratedSets";
import { NewArrivals } from "@/components/home/NewArrivals";
import { TrustStrip } from "@/components/home/TrustStrip";
import { PrayerEdit } from "@/components/home/PrayerEdit";
import { StoryBanner } from "@/components/home/StoryBanner";
import { ThoughtfulBento } from "@/components/home/ThoughtfulBento";
import { LovedOnes } from "@/components/home/LovedOnes";
import { CategoryDirectory } from "@/components/home/CategoryDirectory";
import { CategoryGroups } from "@/components/home/CategoryGroups";
import { ValuesStrip } from "@/components/home/ValuesStrip";
import { DeliveryStrip } from "@/components/home/DeliveryStrip";
import { SeenAndShared } from "@/components/home/SeenAndShared";
import { Testimonials } from "@/components/home/Testimonials";
import { BlogPreview } from "@/components/home/BlogPreview";
import { SeoContent } from "@/components/home/SeoContent";
import { FaqSection } from "@/components/home/FaqSection";
import { Newsletter } from "@/components/home/Newsletter";

export const dynamic = "force-dynamic";

const faithItems = [
  {
    label: "Prayer Mats",
    sublabel: "Soft & supportive",
    image:
      "https://images.unsplash.com/photo-1761958150507-7bcc80840cf9?auto=format&fit=crop&w=500&q=80",
    href: "/shop/collections/prayer-mats",
  },
  {
    label: "Tasbeeh",
    sublabel: "For quiet remembrance",
    image:
      "https://images.unsplash.com/photo-1556760647-90d218f7ca5b?auto=format&fit=crop&w=500&q=80",
    href: "/shop/collections/tasbeeh",
  },
  {
    label: "Prayer Caps",
    sublabel: "Hand-finished",
    image:
      "https://images.unsplash.com/photo-1770153811845-399cae8d49af?auto=format&fit=crop&w=500&q=80",
    href: "/shop/collections/prayer-caps",
  },
  {
    label: "Abayas",
    sublabel: "Quietly elegant",
    image:
      "https://images.unsplash.com/photo-1772474569781-2fb1c6539f8c?auto=format&fit=crop&w=500&q=80",
    href: "/shop/collections/abayas",
  },
  {
    label: "Hijabs",
    sublabel: "Everyday colour",
    image:
      "https://images.unsplash.com/photo-1578973915942-f82bfcfedaba?auto=format&fit=crop&w=500&q=80",
    href: "/shop/collections/hijabs",
  },
  {
    label: "Wall Art",
    sublabel: "Words for your home",
    image:
      "https://images.unsplash.com/photo-1771909752761-d26abe4e60ba?auto=format&fit=crop&w=500&q=80",
    href: "/shop/collections/wall-art",
  },
  {
    label: "Home & Decor",
    sublabel: "Quiet corners",
    image:
      "https://images.unsplash.com/photo-1772805498407-69163cc34bc9?auto=format&fit=crop&w=500&q=80",
    href: "/shop/home-decor",
  },
  {
    label: "Candles",
    sublabel: "Warmth after Maghrib",
    image:
      "https://images.unsplash.com/photo-1772805498407-69163cc34bc9?auto=format&fit=crop&w=500&q=80",
    href: "/shop/collections/candles",
  },
  {
    label: "Kids Thobes",
    sublabel: "Comfort & cotton",
    image:
      "https://images.unsplash.com/photo-1616147147027-60d49d3582c4?auto=format&fit=crop&w=500&q=80",
    href: "/shop/collections/kids-thobes",
  },
  {
    label: "Gift Sets",
    sublabel: "Wrapped with intention",
    image:
      "https://images.unsplash.com/photo-1608755728617-aefab37d2edd?auto=format&fit=crop&w=500&q=80",
    href: "/shop/collections/gift-sets",
  },
  {
    label: "The Journal",
    sublabel: "Stories for slow living",
    image:
      "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=500&q=80",
    href: "/journal",
  },
  {
    label: "New Arrivals",
    sublabel: "Fresh from the atelier",
    image:
      "https://images.unsplash.com/photo-1760083545495-b297b1690672?auto=format&fit=crop&w=500&q=80",
    href: "/shop/collections/new-arrivals",
  },
];

const uniqueItems = [
  {
    label: "Home & Decor",
    sublabel: "Quiet corners",
    image:
      "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=500&q=80",
    href: "/shop/home-decor",
  },
  {
    label: "Modest Fashion",
    sublabel: "Layers for living",
    image:
      "https://images.unsplash.com/photo-1760083545495-b297b1690672?auto=format&fit=crop&w=500&q=80",
    href: "/shop/modest-fashion",
  },
  {
    label: "Ramadan",
    sublabel: "Seasonal rituals",
    image:
      "https://images.unsplash.com/photo-1771909752761-d26abe4e60ba?auto=format&fit=crop&w=500&q=80",
    href: "/shop/collections/ramadan-eid-gifts",
  },
  {
    label: "Gift Edit",
    sublabel: "Wrapped with care",
    image:
      "https://images.unsplash.com/photo-1608755728617-aefab37d2edd?auto=format&fit=crop&w=500&q=80",
    href: "/shop/collections/gift-edit",
  },
  {
    label: "The Journal",
    sublabel: "Stories for slow living",
    image:
      "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=500&q=80",
    href: "/journal",
  },
  {
    label: "Little Ones",
    sublabel: "Comfort & cotton",
    image:
      "https://images.unsplash.com/photo-1616147147027-60d49d3582c4?auto=format&fit=crop&w=500&q=80",
    href: "/shop/collections/for-kids",
  },
  {
    label: "Prayer Essentials",
    sublabel: "For the daily ritual",
    image:
      "https://images.unsplash.com/photo-1761958150507-7bcc80840cf9?auto=format&fit=crop&w=500&q=80",
    href: "/shop/collections/prayer-sets",
  },
  {
    label: "Abayas",
    sublabel: "Quietly elegant",
    image:
      "https://images.unsplash.com/photo-1772474569781-2fb1c6539f8c?auto=format&fit=crop&w=500&q=80",
    href: "/shop/collections/abayas",
  },
  {
    label: "Hijabs",
    sublabel: "Everyday colour",
    image:
      "https://images.unsplash.com/photo-1578973915942-f82bfcfedaba?auto=format&fit=crop&w=500&q=80",
    href: "/shop/collections/hijabs",
  },
  {
    label: "Candles",
    sublabel: "Warmth after Maghrib",
    image:
      "https://images.unsplash.com/photo-1772805498407-69163cc34bc9?auto=format&fit=crop&w=500&q=80",
    href: "/shop/collections/candles",
  },
  {
    label: "Wall Art",
    sublabel: "Words for your home",
    image:
      "https://images.unsplash.com/photo-1771909752761-d26abe4e60ba?auto=format&fit=crop&w=500&q=80",
    href: "/shop/collections/wall-art",
  },
  {
    label: "New Arrivals",
    sublabel: "Fresh from the atelier",
    image:
      "https://images.unsplash.com/photo-1760083545495-b297b1690672?auto=format&fit=crop&w=500&q=80",
    href: "/shop/collections/new-arrivals",
  },
];

export default async function Home() {
  const products = await getProducts();
  const featuredProducts = products.filter((p) => p.featured);
  const arrivals = featuredProducts.length > 0 ? featuredProducts : products;

  const counts = products.reduce<Record<string, number>>((acc, p) => {
    acc[p.category] = (acc[p.category] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <>
      <HomeHeader />
      <HomeHero />
      <QuoteSection />
      <PromiseStrip />
      <OccasionGifts />
      <CircleRail
        eyebrow="For the everyday"
        title="Faith Inspired Gifts"
        items={faithItems}
        viewAll={{
          label: "Shop prayer & modest",
          href: "/shop/collections/faith-inspired-gifts",
        }}
      />
      <CircleRail
        eyebrow="A little different"
        title="Unique Gifts"
        items={uniqueItems}
        viewAll={{
          label: "Explore all gifts",
          href: "/shop/collections/unique-gifts",
        }}
      />
      <GiftFinderBanner />
      <CuratedSets />
      <NewArrivals products={arrivals} />
      <TrustStrip />
      <PrayerEdit products={products} />
      <StoryBanner />
      <ThoughtfulBento />
      <LovedOnes />
      <CategoryDirectory counts={counts} />
      <CategoryGroups />
      <ValuesStrip />
      <DeliveryStrip />
      <SeenAndShared />
      <Testimonials />
      <BlogPreview />
      <SeoContent />
      <FaqSection />
      <Newsletter />
    </>
  );
}
