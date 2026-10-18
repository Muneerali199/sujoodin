import { getProducts } from "@/lib/server-data";
import { HeroSection } from "@/components/home/HeroSection";
import { MarqueeStrip } from "@/components/home/MarqueeStrip";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { BrandStory } from "@/components/home/BrandStory";
import { Testimonials } from "@/components/home/Testimonials";
import { BlogPreview } from "@/components/home/BlogPreview";
import { Newsletter } from "@/components/home/Newsletter";

export default async function Home() {
  const products = await getProducts();
  const featuredProducts = products.filter((p) => p.featured);

  return (
    <>
      <HeroSection />
      <MarqueeStrip />
      <CategoryGrid />
      <FeaturedProducts products={featuredProducts} />
      <BrandStory />
      <Testimonials />
      <BlogPreview />
      <Newsletter />
    </>
  );
}
