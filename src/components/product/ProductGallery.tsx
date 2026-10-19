"use client";

import { useState } from "react";
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

  if (allImages.length === 0) {
    return (
      <div className="relative aspect-[3/4] bg-stone mb-4 flex items-center justify-center">
        <p className="font-body text-xs text-text-muted">No image</p>
      </div>
    );
  }

  const go = (dir: 1 | -1) =>
    setActiveIndex(
      (prev) => (prev + dir + allImages.length) % allImages.length
    );

  return (
    <div>
      <div
        className="relative aspect-[3/4] bg-stone cursor-zoom-in mb-3 overflow-hidden"
        onClick={() => setLightboxOpen(true)}
      >
        <img
          src={allImages[activeIndex]}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 hover:scale-[1.03]"
        />
        <span className="absolute bottom-3 right-3 w-9 h-9 flex items-center justify-center bg-cream/85 backdrop-blur-sm text-dark opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <ZoomIn size={16} />
        </span>
      </div>

      {allImages.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {allImages.map((img, i) => (
            <button
              key={img + i}
              onClick={() => setActiveIndex(i)}
              aria-label={`View image ${i + 1} of ${allImages.length}`}
              className={`relative aspect-[3/4] bg-stone transition-opacity duration-300 overflow-hidden ${
                i === activeIndex
                  ? "opacity-100 ring-1 ring-dark"
                  : "opacity-55 hover:opacity-100"
              }`}
            >
              <img
                src={img}
                alt={`${name} thumbnail ${i + 1}`}
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
          >
            <button
              onClick={() => setLightboxOpen(false)}
              aria-label="Close"
              className="absolute top-6 right-6 text-cream/60 hover:text-cream transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

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
