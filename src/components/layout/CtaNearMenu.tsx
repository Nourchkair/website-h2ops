"use client";

import React from "react";
import { ButtonColorful } from "@/components/ui/button-colorful";
import { useNavigate } from "react-router-dom";

/** Small nav CTA placed near the StaggeredMenu button */
export default function CtaNearMenu() {
  const navigate = useNavigate();

  return (
    <div
      className="
        fixed z-[85] pointer-events-none
        top-5 right-[92px] sm:right-[120px]
      "
    >
      <div className="pointer-events-auto">
        <button
          onClick={() => navigate('/contact')}
          className="hover:scale-[1.02] active:scale-[0.99] transition-transform touch-manipulation"
          style={{ minHeight: 44, minWidth: 44 }}
        >
          <ButtonColorful
            label="Let's talk"
            variant="blue"
            className="text-xs sm:text-sm px-3 py-2 font-semibold"
          />
        </button>
      </div>
    </div>
  );
}
