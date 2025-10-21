// at top
import React, { forwardRef, useImperativeHandle, useMemo, useRef, useState } from "react";

export type FullScreenScrollFXHandle = {
  /** Jump to a section by id or index (0-based) */
  goTo: (idOrIndex: string | number) => void;
};

type FxSection = {
  id: string;
  background: string;
  leftLabel?: React.ReactNode;
  title?: React.ReactNode;
  rightLabel?: React.ReactNode;
  // if you added bgFilter earlier:
  bgFilter?: string;
};

type Props = {
  sections: FxSection[];
  header?: React.ReactNode;
  footer?: React.ReactNode;
  showProgress?: boolean;
  durations?: { change?: number; snap?: number };
  colors?: { pageBg?: string; stageBg?: string; overlay?: string; text?: string };
  // NEW (optional): start on a specific section
  initialId?: string;
};

// turn your component into forwardRef
const FullScreenScrollFX = forwardRef<FullScreenScrollFXHandle, Props>(function FullScreenScrollFX(
  { sections, header, footer, showProgress, durations, colors, initialId },
  ref
) {
  const idToIndex = useMemo(() => {
    const map = new Map<string, number>();
    sections.forEach((s, i) => map.set(s.id, i));
    return map;
  }, [sections]);

  const [activeIndex, setActiveIndex] = useState<number>(() => {
    if (initialId && idToIndex.has(initialId)) return idToIndex.get(initialId)!;
    return 0;
  });

  // imperative API
  useImperativeHandle(ref, () => ({
    goTo: (idOrIndex) => {
      const idx =
        typeof idOrIndex === "number"
          ? Math.max(0, Math.min(sections.length - 1, idOrIndex))
          : idToIndex.get(idOrIndex) ?? 0;
      setActiveIndex(idx);
      // if you have an internal scroll container, you can scroll it to top:
      // scrollerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    },
  }));

  // …your existing layout/render here…

  return (
    <div className="relative">
      {/* header ... */}

      <div className="flex">
        {/* LEFT NAV — IMPORTANT: use <button>, no href */}
        <aside className="mr-4">
          <ul className="space-y-2">
            {sections.map((s, i) => (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  className={`px-3 py-1.5 rounded ${
                    i === activeIndex ? "bg-white/15 text-white" : "text-white/80 hover:text-white"
                  }`}
                >
                  {/* render whatever you passed in */}
                  {s.leftLabel ?? s.id}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* STAGE / BACKGROUND */}
        <div className="relative grow rounded-xl overflow-hidden">
          <img
            src={sections[activeIndex].background}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: sections[activeIndex].bgFilter }}
          />
          <div
            className="absolute inset-0"
            style={{ background: colors?.overlay ?? "rgba(0,0,0,0.45)" }}
          />

          {/* CENTER CONTENT (FAQs) */}
          <div className="relative z-10 p-6">
            {sections[activeIndex].title}
          </div>
        </div>

        {/* RIGHT NAV — same button treatment */}
        <aside className="ml-4">
          <ul className="space-y-2">
            {sections.map((s, i) => (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  className={`px-3 py-1.5 rounded ${
                    i === activeIndex ? "bg-white/15 text-white" : "text-white/80 hover:text-white"
                  }`}
                >
                  {s.rightLabel ?? s.id}
                </button>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      {/* footer ... */}
    </div>
  );
});

export default FullScreenScrollFX;
