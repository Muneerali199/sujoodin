"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export function ProductGallery({ images, name }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const allImages = images.filter(Boolean);

  const go = (dir: 1 | -1) =>
    setActiveIndex(
      (prev) => (prev + dir + allImages.length) % allImages.length
    );

  useEffect(() => {
    if (!lightboxOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightboxOpen(false);
      if (event.key === "ArrowLeft") {
        setActiveIndex(
          (prev) => (prev - 1 + allImages.length) % allImages.length
        );
      }
      if (event.key === "ArrowRight") {
        setActiveIndex((prev) => (prev + 1) % allImages.length);
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [lightboxOpen, allImages.length]);

  if (allImages.length === 0) {
    return (
      <div className="relative aspect-[3/4] bg-stone mb-4 flex items-center justify-center">
        <p className="font-body text-xs text-text-muted">No image</p>
      </div>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setLightboxOpen(true)}
        aria-label={`Open image viewer for ${name}`}
        className="group relative block w-full aspect-[3/4] bg-stone cursor-zoom-in mb-3 overflow-hidden"
      >
        <img
          src={allImages[activeIndex]}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <span className="absolute bottom-3 right-3 w-9 h-9 flex items-center justify-center bg-cream/90 text-dark opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity pointer-events-none">
          <ZoomIn size={16} />
        </span>
      </button>

      {allImages.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {allImages.map((img, i) => (
            <button
              key={img + i}
              onClick={() => setActiveIndex(i)}
              aria-label={`View image ${i + 1} of ${allImages.length}`}
              aria-current={i === activeIndex}
              className={`relative aspect-[3/4] bg-stone transition-opacity duration-300 overflow-hidden ${
                i === activeIndex
                  ? "opacity-100 ring-1 ring-dark"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={img}
                alt={`${name} thumbnail ${i + 1}`}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
            </button>
          ))}
        </div>
      )}

      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-dark/95 z-[70] flex items-center justify-center p-6"
            onClick={() => setLightboxOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label={`${name} image viewer`}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              aria-label="Close image viewer"
              className="absolute top-6 right-6 text-cream/60 hover:text-cream transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            {allImages.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    go(-1);
                  }}
                  aria-label="Previous image"
                  className="absolute left-4 md:left-8 text-cream/60 hover:text-cream transition-colors z-10"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    go(1);
                  }}
                  aria-label="Next image"
                  className="absolute right-4 md:right-8 text-cream/60 hover:text-cream transition-colors z-10"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </>
            )}

            <div
              className="relative max-w-4xl max-h-[85vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={allImages[activeIndex]}
                alt={name}
                className="w-full h-auto max-h-[85vh] object-contain"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
