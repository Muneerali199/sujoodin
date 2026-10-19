"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface SortDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const options = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  const [open, setOpen] = useState(false);

  const selectedLabel = options.find((o) => o.value === value)?.label;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 font-body text-xs tracking-[0.15em] uppercase text-earth hover:text-dark transition-colors"
      >
        {selectedLabel}
        <ChevronDown className="w-4 h-4" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-2 w-48 bg-cream border border-sand z-20 py-2">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className={`w-full text-left px-4 py-2 font-body text-sm transition-colors ${
                  value === option.value
                    ? "text-dark bg-stone"
                    : "text-text-muted hover:text-dark hover:bg-stone/50"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
