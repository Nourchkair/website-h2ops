"use client";

import React, { useState } from "react";

export type StripItem = {
  /** The label shown on the tile */
  title: string;
  /** Background image URL */
  image: string;
  /** Called when the tile is clicked (open your modal, route, etc.) */
  onOpen?: () => void;
};

type Props = {
  /** Items to render in the strip (order matters) */
  items: StripItem[];
  /** Which tile starts expanded */
  initialActiveIndex?: number;
  className?: string;
};

/**
 * ImageAccordionStrip
 * - Hover to expand a panel.
 * - Click to fire `onOpen()` for that panel (used to open your service details modal).
 * - Pure Tailwind; no extra deps.
 */
export function ImageAccordionStrip({
  items,
  initialActiveIndex = 2,
  className = "",
}: Props) {
  const [activeIndex, setActiveIndex] = useState(
    Math.min(Math.max(initialActiveIndex, 0), Math.max(items.length - 1, 0))
  );

  if (!items?.length) return null;

  return (
    <div className={`w-full ${className}`}>
      <div className="flex flex-row items-center justify-center gap-4 overflow-x-auto p-4">
        {items.map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={`${item.title}-${index}`}
              type="button"
              onMouseEnter={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              onClick={() => item.onOpen?.()}
              aria-label={item.title}
              className={[
                "relative h-[450px] rounded-2xl overflow-hidden cursor-pointer",
                "transition-all duration-700 ease-in-out focus:outline-none",
                isActive ? "w-[400px]" : "w-[60px]",
                "group"
              ].join(" ")}
            >
              {/* Background image */}
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                  const t = e.currentTarget as HTMLImageElement;
                  t.onerror = null;
                  t.src =
                    "https://placehold.co/400x450/111111/ffffff?text=Image";
                }}
                draggable={false}
              />

              {/* Dark overlay for text contrast */}
              <div className="absolute inset-0 bg-black/45" />

              {/* Soft inner vignette when active */}
              <div
                className={`absolute inset-0 transition-opacity duration-500 ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  boxShadow:
                    "inset 0 -140px 140px -80px rgba(0,0,0,0.9), inset 0 -140px 140px -120px rgba(0,0,0,0.9)",
                }}
              />

              {/* Caption */}
              <span
                className={[
                  "absolute text-white font-semibold whitespace-nowrap",
                  "transition-all duration-300 ease-in-out",
                  "drop-shadow-[0_1px_2px_rgba(0,0,0,0.75)]",
                  isActive
                    ? "bottom-6 left-1/2 -translate-x-1/2 rotate-0 text-base md:text-lg"
                    : "bottom-24 left-1/2 -translate-x-1/2 rotate-90 text-sm md:text-base",
                ].join(" ")}
              >
                {item.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ImageAccordionStrip;
