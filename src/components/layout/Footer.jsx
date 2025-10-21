// src/components/layout/Footer.tsx
import React from "react";
import { ButtonColorful } from "@/components/ui/button-colorful";

export function Footer() {
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
              <a
                href="https://calendar.app.google/R6XMd5ipbBTu3LXL8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex hover:scale-[1.03] active:scale-[0.99] transition-transform touch-manipulation"
                style={{ minHeight: "44px", minWidth: "44px" }}
                aria-label="Let's talk"
              >
                <ButtonColorful
                  label="Let’s talk"
                  variant="blue"
                  className="font-semibold text-sm sm:text-base px-6"
                />
              </a>
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

            {/* Socials: moved left a bit on desktop */}
            <div className="mt-4 flex items-center gap-3 md:justify-end md:mr-6">
              <a
                href="https://www.instagram.com/horizon2operations?igsh=NGdpOGJ6cXFxaGps"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="h-10 w-10 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 hover:ring-2 hover:ring-white/20 transition-colors grid place-items-center"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>

              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok"
                className="h-10 w-10 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 hover:ring-2 hover:ring-white/20 transition-colors grid place-items-center"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="currentColor" aria-hidden="true">
                  <path d="M21 8.5c-2.3 0-4.3-.9-5.7-2.4V16a6.5 6.5 0 1 1-6.5-6.5c.3 0 .6 0 .9.1v3.2c-.3-.1-.6-.1-.9-.1a3.3 3.3 0 1 0 3.3 3.3V2.8h3.1c.4 2.1 2.1 3.8 4.2 4.2V8.5z" />
                </svg>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="h-10 w-10 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 hover:ring-2 hover:ring-white/20 transition-colors grid place-items-center"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="currentColor" aria-hidden="true">
                  <path d="M6.94 6.5a1.94 1.94 0 1 1 0-3.88 1.94 1.94 0 0 1 0 3.88ZM3.5 21.5h6.9V9H3.5v12.5ZM13 9h6.62v2.23h.09c.92-1.65 3.18-2.23 4.63-2.23 4.95 0 5.86 3.13 5.86 7.2V21.5h-6.9v-6.66c0-1.59-.03-3.64-2.22-3.64-2.22 0-2.56 1.73-2.56 3.52V21.5H13V9Z" />
                </svg>
              </a>
            </div>
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
                onClick={() => {}}
                className="cursor-default text-white/60 hover:text-white transition-colors text-xs sm:text-sm min-h-[44px] flex items-center touch-manipulation"
                aria-label="Privacy Policy (disabled)"
              >
                Privacy Policy
              </button>
              <span className="hidden sm:inline text-white/30">•</span>
              <button
                type="button"
                onClick={() => {}}
                className="cursor-default text-white/60 hover:text-white transition-colors text-xs sm:text-sm min-h-[44px] flex items-center touch-manipulation"
                aria-label="Terms of Service (disabled)"
              >
                Terms of Service
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
