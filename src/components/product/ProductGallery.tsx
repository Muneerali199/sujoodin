"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export function ProductGallery({ images, name }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const allImages = images.length > 0 ? images : ["/images/products/placeholder.jpg"];

  return (
    <div>
      <div
        className="relative aspect-[4/3] bg-stone cursor-zoom-in mb-4 overflow-hidden"
        onClick={() => setLightboxOpen(true)}
      >
        {allImages[activeIndex] && (
          <img
            src={allImages[activeIndex]}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-stone/10 via-sand/5 to-clay/20" />
      </div>

      {allImages.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {allImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`relative aspect-square bg-stone transition-all duration-300 overflow-hidden ${
                i === activeIndex ? "ring-2 ring-dark" : "opacity-60 hover:opacity-100"
              }`}
            >
              {img && (
                <img
                  src={img}
                  alt={`${name} thumbnail ${i + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-br from-stone/10 via-transparent to-transparent" />
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
            className="fixed inset-0 bg-dark/95 z-[70] flex items-center justify-center"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 text-cream/60 hover:text-cream transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex((prev) =>
                  prev === 0 ? allImages.length - 1 : prev - 1
                );
              }}
              className="absolute left-6 text-cream/60 hover:text-cream transition-colors"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex((prev) =>
                  prev === allImages.length - 1 ? 0 : prev + 1
                );
              }}
              className="absolute right-6 text-cream/60 hover:text-cream transition-colors"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            <div className="relative max-w-4xl max-h-[80vh] aspect-[4/3] bg-stone overflow-hidden">
              {allImages[activeIndex] && (
                <img
                  src={allImages[activeIndex]}
                  alt={name}
                  className="absolute inset-0 w-full h-full object-contain"
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
