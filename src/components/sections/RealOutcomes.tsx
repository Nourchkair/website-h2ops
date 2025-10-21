// src/components/sections/RealOutcomes.tsx
"use client";

import * as React from "react";
import { FocusCards, type FocusCardItem } from "@/components/ui/focus-cards";

export default function RealOutcomes() {
  const cards: FocusCardItem[] = [
    {
      title: "The Butcher Shop and Grill",
      src: "/media/butcher-shop.png",    // make sure this exists in public/media/
      href: "/case/butcher-shop",
    },
  ];

  return (
    <section id="outcomes" className="relative isolate w-full bg-transparent py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="w-full text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
            <span className= "text-white">Businesses part of the horizon</span>
          </h2>
          <p className="mt-3 text-white/70 max-w-2xl mx-auto">
            Click a card to see the story
          </p>
        </div>

        <div className="mt-10">
          <FocusCards cards={cards} />
        </div>
      </div>
    </section>
  );
}
