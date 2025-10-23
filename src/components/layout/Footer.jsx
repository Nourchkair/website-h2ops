// src/components/layout/Footer.tsx
import React from "react";
import { ButtonColorful } from "@/components/ui/button-colorful";
import { useNavigate } from "react-router-dom";

export function Footer() {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-black">
      {/* Top: left (headline+CTA) | right (tree above socials) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12 md:pt-14">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          {/* LEFT: headline + CTA (moved down a bit) */}
          <div className="w-full md:w-1/2 md:mt-4">
            <div className="text-xs sm:text-sm uppercase tracking-widest text-white/60">
              Work with us
            </div>

            <h2
              className="mt-3 text-left text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-white"
              style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}
            >
              Move Toward the Horizon
            </h2>

            <div className="mt-6">
              <button
                onClick={() => navigate('/contact')}
                className="inline-flex hover:scale-[1.03] active:scale-[0.99] transition-transform touch-manipulation"
                style={{ minHeight: "44px", minWidth: "44px" }}
                aria-label="Let's talk"
              >
                <ButtonColorful
                  label="Let's talk"
                  variant="blue"
                  className="font-semibold text-sm sm:text-base px-6"
                />
              </button>
            </div>
          </div>

          {/* RIGHT: tree (smaller) above socials */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-end">
            <img
              src="/tree_logo_transparent.png"
              alt="H2Ops mark"
              className="w-[180px] sm:w-[220px] md:w-[240px] h-auto select-none pointer-events-none"
              draggable={false}
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Bottom: links on left, © on right (below divider) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 sm:pb-12 md:pb-14">
        <div className="pt-6 sm:pt-8 border-t border-white/20">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <button
                type="button"
                onClick={() => navigate('/privacy-policy')}
                className="cursor-pointer text-white/60 hover:text-white transition-colors text-xs sm:text-sm min-h-[44px] flex items-center touch-manipulation"
                aria-label="Privacy Policy"
              >
                Privacy Policy
              </button>
              <span className="hidden sm:inline text-white/30">•</span>
              <button
                type="button"
                onClick={() => navigate('/terms-of-use')}
                className="cursor-pointer text-white/60 hover:text-white transition-colors text-xs sm:text-sm min-h-[44px] flex items-center touch-manipulation"
                aria-label="Terms of Use"
              >
                Terms of Use
              </button>
            </div>

            <div className="text-white/60 text-xs sm:text-sm text-right w-full sm:w-auto">
              © {currentYear} H2Ops. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
