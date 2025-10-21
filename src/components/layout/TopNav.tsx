"use client";

import React from "react";
import { ButtonColorful } from "@/components/ui/button-colorful";

export default function TopNav() {
  const toggleMenu = () => {
    window.dispatchEvent(new CustomEvent("h2ops:toggleMenu"));
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-[90] pointer-events-none">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between pointer-events-auto">
        {/* Logo */}
        <a href="/" className="inline-flex items-center gap-2">
          <img src="/media/h2ops.png" alt="H2Ops" className="h-7 w-auto" />
        </a>

        {/* Right cluster: CTA + Menu */}
        <div className="flex items-center gap-3">
          {/* Same CTA style as Hero */}
          <a
            href="#contact"
            className="hover:scale-[1.03] active:scale-[0.99] transition-transform touch-manipulation"
            style={{ minHeight: "44px", minWidth: "44px" }}
          >
            <ButtonColorful
              label="Let’s talk"
              variant="blue"
              className="font-semibold text-sm sm:text-base px-5"
            />
          </a>

          {/* Menu button */}
          <button
            type="button"
            onClick={toggleMenu}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-2 text-white backdrop-blur-md hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-white/60"
            aria-label="Open menu"
          >
            <span className="relative block h-3 w-4" aria-hidden="true">
              <span className="absolute inset-x-0 top-0 h-[2px] bg-current" />
              <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px] bg-current" />
              <span className="absolute inset-x-0 bottom-0 h-[2px] bg-current" />
            </span>
            <span className="text-sm font-semibold tracking-wide">Menu</span>
          </button>
        </div>
      </div>
    </div>
  );
}
