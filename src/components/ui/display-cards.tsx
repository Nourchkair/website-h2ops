"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Sparkles, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type CardData = {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
};

interface DisplayCardsProps {
  cards: CardData[];
  spacingX?: number;   // horizontal offset between stacked cards (px)
  spacingY?: number;   // vertical offset between stacked cards (px)
  scaleStep?: number;  // scale reduction for depth
  hoverLift?: number;  // how much a hovered card lifts (px)
}

function CardSurface({
  icon = <Sparkles className="size-4 text-blue-300" />,
  title = "Featured",
  description = "Discover amazing content",
  expanded = false,
  className,
}: CardData & { expanded?: boolean; className?: string }) {
  return (
    <div
      className={cn(
        "relative select-none rounded-xl border border-white/10 bg-black/75 text-white backdrop-blur-[2px]",
        expanded
          ? "skew-y-0 w-full min-h-[14rem] p-6 shadow-2xl shadow-black/50"
          : "-skew-y-[6deg] h-40 w-[22rem] px-4 py-3 overflow-hidden shadow-lg shadow-black/30",
        "after:pointer-events-none after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem] after:bg-gradient-to-l after:from-black/70 after:to-transparent after:content-['']",
        className
      )}
    >
      <div className="mb-2 flex items-center gap-2">
        <span className="inline-flex rounded-full bg-white/10 p-1">{icon}</span>
        <p className="text-base font-medium sm:text-lg">{title}</p>
      </div>
      <p
        className={cn(
          "text-sm sm:text-base leading-snug text-white/90",
          expanded ? "whitespace-normal break-words" : "overflow-hidden"
        )}
        style={
          expanded
            ? undefined
            : {
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }
        }
      >
        {description}
      </p>
    </div>
  );
}

export default function DisplayCards({
  cards,
  spacingX = 36,
  spacingY = 28,
  scaleStep = 0.03,
  hoverLift = 14,
}: DisplayCardsProps) {
  const [active, setActive] = React.useState<number | null>(null);
  const [hovered, setHovered] = React.useState<number | null>(null);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Keep z-index fixed by stack order; do NOT raise on hover
  const getStackStyle = (i: number, isHovered: boolean) => {
    const x = i * spacingX;
    const y = i * spacingY;
    const scale = 1 - i * scaleStep;
    const lift = isHovered ? -hoverLift : 0;
    const z = 10 + i;
    return {
      transform: `translate(${x}px, ${y + lift}px) scale(${scale})`,
      zIndex: z,
    } as React.CSSProperties;
  };

  // Compute a real width so the stack can be centered
  const stackWidth = `calc(22rem + ${spacingX * (cards.length - 1)}px)`;
  const containerHeight = 160 + (cards.length - 1) * spacingY + 40;

  return (
    // removed `bg-black` so this inherits your app/site background
    <div className="relative grid place-items-center min-h-[60vh] w-full">
      {/* Stacked deck — centered */}
      <div
        className="relative overflow-visible mx-auto"
        style={{ height: containerHeight, width: stackWidth }}
      >
        {cards.map((c, i) => {
          const isHovered = hovered === i;
          const isActive = active === i;
          return (
            <motion.button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="absolute left-0 top-0 transition-transform duration-300 will-change-transform"
              style={{
                ...getStackStyle(i, isHovered),
                visibility: isActive ? "hidden" : "visible",
              }}
              aria-label={`Open ${c.title ?? "card"}`}
              whileHover={{ boxShadow: "0px 16px 30px rgba(0,0,0,0.45)" }}
            >
              <motion.div layoutId={`card-${i}`} layout>
                <CardSurface icon={c.icon} title={c.title} description={c.description} />
              </motion.div>
            </motion.button>
          );
        })}
      </div>

      {/* Expanded view */}
      <AnimatePresence>
        {active !== null && (
          <div className="fixed inset-0 z-50">
            {/* Backdrop keeps focus on the card; keep this unless you want it transparent too */}
            <motion.button
              aria-label="Close"
              className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActive(null)}
            />
            {/* Foreground */}
            <div
              className="relative z-10 mx-auto flex min-h-screen w-full max-w-2xl items-center justify-center p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute right-6 top-6 inline-flex items-center rounded-md border border-white/15 bg-black/60 px-2 py-1 text-sm text-white/85 hover:bg-black/70"
                onClick={() => setActive(null)}
              >
                <X className="mr-1 size-4" />
                Close
              </button>

              <motion.div
                layoutId={`card-${active}`}
                layout
                className="w-full"
                transition={{ type: "spring", stiffness: 230, damping: 28, mass: 0.6 }}
              >
                <CardSurface
                  expanded
                  icon={cards[active!]?.icon}
                  title={cards[active!]?.title}
                  description={cards[active!]?.description}
                />
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
