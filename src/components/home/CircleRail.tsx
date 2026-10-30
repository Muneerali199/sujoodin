"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { OrnamentHeading } from "./OrnamentHeading";

interface RailItem {
  label: string;
  sublabel?: string;
  image: string;
  href: string;
}

interface CircleRailProps {
  id?: string;
  eyebrow: string;
  title: string;
  items: RailItem[];
  viewAll?: { label: string; href: string };
  className?: string;
}

export function CircleRail({
  id,
  eyebrow,
  title,
  items,
  viewAll,
  className = "",
}: CircleRailProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    trackRef.current?.scrollBy({
      left: direction === "left" ? -340 : 340,
      behavior: "smooth",
    });
  };

  return (
    <section id={id} className={`py-16 lg:py-20 px-6 lg:px-10 max-w-[1440px] mx-auto ${className}`}>
      <OrnamentHeading eyebrow={eyebrow} title={title} />

      <div className="relative mt-10">
        <button
          onClick={() => scroll("left")}
          aria-label="Scroll left"
          className="hidden md:flex absolute -left-2 lg:-left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full border border-forest/20 bg-cream text-forest items-center justify-center hover:bg-forest hover:text-cream hover:border-forest transition-colors"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={() => scroll("right")}
          aria-label="Scroll right"
          className="hidden md:flex absolute -right-2 lg:-right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full border border-forest/20 bg-cream text-forest items-center justify-center hover:bg-forest hover:text-cream hover:border-forest transition-colors"
        >
          <ChevronRight size={18} />
        </button>

        <div
          ref={trackRef}
          className="no-scrollbar flex gap-6 sm:gap-9 overflow-x-auto scroll-smooth px-1 py-1"
        >
          {items.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group shrink-0 flex flex-col items-center text-center w-[132px] sm:w-[156px]"
            >
              <span className="w-[124px] h-[124px] sm:w-[150px] sm:h-[150px] rounded-full p-[3px] border border-gold/45 group-hover:border-gold transition-colors">
                <span className="block w-full h-full rounded-full overflow-hidden bg-stone">
                  <img
                    src={item.image}
                    alt=""
                    loading="lazy"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                </span>
              </span>
              <h3 className="font-display text-base sm:text-lg font-light mt-4 group-hover:text-gold transition-colors leading-snug">
                {item.label}
              </h3>
              {item.sublabel && (
                <p className="font-body text-[9px] tracking-[0.12em] uppercase text-text-muted mt-1">
                  {item.sublabel}
                </p>
              )}
            </Link>
          ))}
        </div>
      </div>

      {viewAll && (
        <div className="text-center mt-8">
          <Link
            href={viewAll.href}
            className="font-body text-[10px] tracking-[0.2em] uppercase text-forest border-b border-forest/30 pb-1 hover:border-gold hover:text-gold transition-colors"
          >
            {viewAll.label}
          </Link>
        </div>
      )}
    </section>
  );
}
