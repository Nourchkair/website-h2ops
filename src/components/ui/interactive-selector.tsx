// src/components/ui/interactive-selector.tsx
"use client";

import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type SelectorOption = {
  title: string;
  description: string;
  image: string;
  icon?: React.ReactNode;
  onOpen?: () => void; // Services.tsx passes this to open the detail modal
};

type Props = {
  options: SelectorOption[];
  headerTitle?: string;
  headerSubtitle?: string;
  className?: string;
  initialActiveIndex?: number;
  stickyTopClass?: string;   // e.g. "top-8 md:top-10"
  cardsOffsetClass?: string; // e.g. "mt-0"
};

const InteractiveSelector: React.FC<Props> = ({
  options,
  headerTitle = "Premium Services",
  headerSubtitle = "Tap a panel or use the button to see details",
  className,
  initialActiveIndex = 0,
  stickyTopClass = "top-8 md:top-10",
  cardsOffsetClass = "mt-0",
}) => {
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const headerRef  = useRef<HTMLDivElement | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const stripRef   = useRef<HTMLDivElement | null>(null);

  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  cardRefs.current = useMemo(() => options.map(() => null), [options]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const strip   = stripRef.current;
    const sentinel = sentinelRef.current;
    if (!section || !strip || !sentinel) return;

    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!cards.length) return;

    // Right → Left order (rightmost expands first)
    const order = [...cards].reverse();

    // Accordion widths
    const W_COLLAPSED = 60;   // tailwind w-[60px] feel
    const W_EXPANDED  = 400;  // tailwind w-[400px] feel

    // Initial look
    gsap.set(cards, {
      width: W_COLLAPSED,
      opacity: 0.75,
      filter: "grayscale(30%)",
      borderColor: "rgba(255,255,255,0.12)",
    });
    // first active card (rightmost)
    gsap.set(order[0], {
      width: W_EXPANDED,
      opacity: 1,
      filter: "grayscale(0%)",
      borderColor: "rgba(255,255,255,0.8)",
    });

    // Build accordion timeline: expand current, collapse previous
    const tl = gsap.timeline({ defaults: { ease: "power2.out", duration: 0.6 } });
    for (let i = 1; i < order.length; i++) {
      const prev = order[i - 1];
      const curr = order[i];
      tl.to(curr, { width: W_EXPANDED, opacity: 1, filter: "grayscale(0%)", borderColor: "rgba(255,255,255,0.8)" }, "+=0")
        .to(prev, { width: W_COLLAPSED, opacity: 0.75, filter: "grayscale(30%)", borderColor: "rgba(255,255,255,0.12)" }, "<");
    }

    const steps = order.length - 1;
    const headerH = () => headerRef.current?.offsetHeight ?? 0;
    const endDistance = Math.max(900, Math.round(window.innerHeight * 0.65 * steps));

    const st = ScrollTrigger.create({
      trigger: sentinel,
      pin: strip,
      start: () => `top+=${headerH()} top`,
      end: () => `+=${endDistance}`,
      scrub: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      animation: tl,
      snap: {
        snapTo: (p) => {
          const idx = Math.round(p * steps);
          return idx / steps;
        },
        duration: { min: 0.08, max: 0.2 },
        ease: "power1.out",
      },
      onUpdate: (self) => {
        const iInOrder = Math.round(self.progress * steps);
        const activeEl = order[Math.min(Math.max(iInOrder, 0), steps)];
        const originalIndex = cards.indexOf(activeEl);
        if (originalIndex !== -1 && originalIndex !== activeIndex) {
          setActiveIndex(originalIndex);
        }
      },
    });

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      st.kill();
      tl.kill();
      ScrollTrigger.refresh();
    };
  }, [options.length]); // re-init if # of cards changes

  return (
    <div ref={sectionRef} className={cn("relative flex flex-col items-center justify-start w-full bg-transparent", className)}>
      {/* Sticky header */}
      <div ref={headerRef} className={cn("w-full max-w-2xl px-6 z-20 sticky", stickyTopClass)}>
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-semibold text-white mb-2 tracking-tight">
            {headerTitle}
          </h2>
          <p className="text-lg md:text-xl text-white/70 font-medium max-w-xl mx-auto">
            {headerSubtitle}
          </p>
        </div>
      </div>

      {/* Sentinel sits right under the header to align the pin start */}
      <div ref={sentinelRef} aria-hidden className="h-0 w-px" />

      {/* Pinned strip: RIGHT → LEFT image accordion */}
      <div
        ref={stripRef}
        className={cn(
          "z-10 flex w-full max-w-[1100px] min-w-[300px] h-[450px] items-stretch overflow-hidden relative px-6 justify-end gap-4",
          cardsOffsetClass
        )}
      >
        {options.map((opt, index) => {
          const isActive = index === activeIndex;
          return (
            <div
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              className={cn(
                "group relative flex flex-col justify-end overflow-hidden rounded-2xl border bg-black/40 backdrop-blur-sm transition-colors duration-300",
                isActive ? "border-white/80" : "border-white/10"
              )}
              style={{
                width: 60, // GSAP controls actual width while scrolling
                minWidth: 60,
                maxWidth: 480,
                boxShadow: isActive ? "0 24px 70px rgba(0,0,0,0.55)" : "0 12px 36px rgba(0,0,0,0.35)",
                cursor: "pointer",
              }}
              onClick={() => opt.onOpen?.()}
            >
              {/* Background image */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url('${opt.image}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              {/* Gradient floor for legibility */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.3) 35%, rgba(0,0,0,0) 60%)",
                  opacity: isActive ? 1 : 0.8,
                }}
              />
              {/* Caption + CTA */}
              <div className="relative z-10 flex items-center gap-3 px-4 pb-5">
                {!!opt.icon && (
                  <div className="min-w-[42px] h-[42px] flex items-center justify-center rounded-full bg-[rgba(18,18,18,0.78)] border border-white/15 shadow">
                    {opt.icon}
                  </div>
                )}
                <div className="text-white whitespace-pre">
                  <div className="font-semibold text-lg md:text-xl drop-shadow">{opt.title}</div>
                  <div
                    className="text-sm md:text-base text-white/85 transition-all"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? "translateX(0)" : "translateX(14px)",
                    }}
                  >
                    {opt.description}
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    opt.onOpen?.();
                  }}
                  className="ml-auto text-xs md:text-sm px-3 py-1 rounded-md border border-white/20 bg-white/5 hover:bg-white/10 text-white transition-colors"
                >
                  Learn more
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InteractiveSelector;
