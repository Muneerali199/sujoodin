"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

const slides = [
  {
    eyebrow: "The Sujood Gift Edit",
    title: "Gifts that carry a little du'a.",
    description:
      "Thoughtful pieces for weddings, Ramadan, new homes, and the people who make your everyday beautiful.",
    cta: "Shop the gift edit",
    href: "/shop/collections/gift-edit",
    image:
      "https://images.unsplash.com/photo-1608755728617-aefab37d2edd?auto=format&fit=crop&w=1600&q=80",
    tone: "bg-[#F4EFE6]",
  },
  {
    eyebrow: "Prayer Essentials",
    title: "A softer place to pray.",
    description:
      "Memory-foam prayer mats, hand-finished tasbeeh, and quiet essentials made for your daily ritual.",
    cta: "Explore prayer",
    href: "/shop/prayer-essentials",
    image:
      "https://images.unsplash.com/photo-1761958150507-7bcc80840cf9?auto=format&fit=crop&w=1600&q=80",
    tone: "bg-[#E9EDE5]",
  },
  {
    eyebrow: "Modest Fashion",
    title: "Modest layers, made to last.",
    description:
      "Breatheable fabrics and considered silhouettes, designed to move with you from Jummah to everyday.",
    cta: "Shop modest",
    href: "/shop/modest-fashion",
    image:
      "https://images.unsplash.com/photo-1772474569781-2fb1c6539f8c?auto=format&fit=crop&w=1600&q=80",
    tone: "bg-[#F4EFE6]",
  },
];

export function HomeHero() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const child = track.children[index] as HTMLElement | undefined;
    if (!child) return;
    track.scrollTo({
      left: child.offsetLeft - track.offsetLeft,
      behavior: "smooth",
    });
    setActive(index);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      scrollToIndex((active + 1) % slides.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [active, paused, scrollToIndex]);

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const center = track.scrollLeft + track.clientWidth / 2;
    let closest = 0;
    let smallest = Number.POSITIVE_INFINITY;
    Array.from(track.children).forEach((child, index) => {
      const el = child as HTMLElement;
      const midpoint = el.offsetLeft + el.offsetWidth / 2;
      const distance = Math.abs(midpoint - center);
      if (distance < smallest) {
        smallest = distance;
        closest = index;
      }
    });
    setActive(closest);
  };

  return (
    <section className="bg-parchment py-5 sm:py-7">
      <h1 className="sr-only">
        Sujood — Islamic lifestyle gifts, prayer essentials, and modest fashion
      </h1>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div
          ref={trackRef}
          onScroll={handleScroll}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          className="no-scrollbar flex gap-3 sm:gap-4 overflow-x-auto snap-x snap-mandatory"
          aria-roledescription="carousel"
          aria-label="Featured collections"
        >
          {slides.map((slide, index) => (
            <article
              key={slide.title}
              className="relative snap-start shrink-0 w-[88%] sm:w-[76%] lg:w-[72%] h-[480px] sm:h-[540px] lg:h-[590px] overflow-hidden bg-stone"
            >
              <img
                src={slide.image}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                loading={index === 0 ? "eager" : "lazy"}
              />
              {index === active && (
                <div className="absolute inset-0 bg-gradient-to-r from-[#F4EFE6]/95 via-[#F4EFE6]/55 to-transparent" />
              )}
              <div className="relative h-full flex items-center">
                {index === active && (
                  <div className="w-[calc(100%-2rem)] sm:w-auto max-w-[420px] ml-4 mr-4 sm:ml-9 sm:mr-9 lg:ml-12 p-5 sm:p-8 lg:p-10 bg-[#F4EFE6]/92 backdrop-blur-[2px] border border-white/40">
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <span className="inline-flex items-center gap-1 bg-forest text-cream px-2.5 py-1 font-body text-[8px] tracking-[0.14em] uppercase">
                        <Star size={9} className="fill-gold text-gold" />
                        Top Rated
                      </span>
                      <span className="font-body text-[9px] tracking-[0.1em] uppercase text-earth">
                        4.9/5 · From 5,000+ ratings
                      </span>
                    </div>
                    <p className="font-body text-[9px] sm:text-[10px] tracking-[0.24em] uppercase text-gold mb-4">
                      {slide.eyebrow}
                    </p>
                    <h2 className="font-display text-[32px] sm:text-[48px] lg:text-[58px] font-light leading-[1.02] sm:leading-[0.98] text-forest-deep break-words">
                      {slide.title}
                    </h2>
                    <p className="font-body text-[11px] sm:text-sm text-earth leading-relaxed mt-4 sm:mt-5 max-w-sm">
                      {slide.description}
                    </p>
                    <Link
                      href={slide.href}
                      className="group inline-flex items-center gap-3 mt-6 sm:mt-8 bg-forest text-cream px-5 sm:px-6 py-3 sm:py-3.5 font-body text-[9px] sm:text-[10px] tracking-[0.2em] uppercase hover:bg-forest-deep transition-colors"
                    >
                      {slide.cta}
                      <ArrowRight
                        size={14}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </Link>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.title}
                onClick={() => scrollToIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === active}
                className={`h-1.5 transition-all duration-300 ${
                  index === active
                    ? "w-8 bg-forest"
                    : "w-4 bg-forest/20 hover:bg-forest/40"
                }`}
              />
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={12} className="fill-gold text-gold" />
              ))}
            </span>
            <p className="font-body text-[10px] tracking-[0.1em] uppercase text-earth">
              Loved by 10,000+ families across India
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
