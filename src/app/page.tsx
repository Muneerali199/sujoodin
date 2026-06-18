import { HeroSection } from "@/components/home/HeroSection";
import { MarqueeStrip } from "@/components/home/MarqueeStrip";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { BrandStory } from "@/components/home/BrandStory";
import { Testimonials } from "@/components/home/Testimonials";
import { BlogPreview } from "@/components/home/BlogPreview";
import { Newsletter } from "@/components/home/Newsletter";

export default function Home() {
  return (
    <>
      <HeroSection />
      <MarqueeStrip />
      <CategoryGrid />
      <FeaturedProducts />
      <BrandStory />
      <Testimonials />
      <BlogPreview />
      <Newsletter />
    </>
  );
}
