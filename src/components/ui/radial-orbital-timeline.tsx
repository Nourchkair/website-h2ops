// src/components/ui/radial-orbital-timeline.tsx
"use client";

import * as React from "react";
import { ArrowRight, Link as LinkIcon, Clock, ListChecks } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/** Timeline item shape used by the orbital component */
export interface TimelineItem {
  id: number;
  title: string;
  content: string;
  category: string;
  icon: React.ComponentType<{ size?: number }>;
  relatedIds: number[];

  // NEW: duration + mini bar
  durationLabel: string;          // e.g., "1–3 days", "1 week"
  durationMinDays: number;        // e.g., 1
  durationMaxDays: number;        // e.g., 3

  // NEW: deliverables list
  deliverables?: string[];

  // optional; used only for subtle glow size (not shown)
  energy?: number;

  // legacy (ignored in UI, safe to keep in your data)
  date?: string;
  status?: "completed" | "in-progress" | "pending";
  owner?: string;
  next?: string;
}

export interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
  className?: string;
}

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}

function useAutoRotate(enabled: boolean) {
  const [angle, setAngle] = React.useState(0);
  React.useEffect(() => {
    if (!enabled) return;
    const id = setInterval(() => {
      setAngle((prev) => Number(((prev + 0.3) % 360).toFixed(3)));
    }, 50);
    return () => clearInterval(id);
  }, [enabled]);
  return [angle, setAngle] as const;
}

export default function RadialOrbitalTimeline({
  timelineData,
  className,
}: RadialOrbitalTimelineProps) {
  const [expanded, setExpanded] = React.useState<Record<number, boolean>>({});
  const [autoRotate, setAutoRotate] = React.useState(true);
  const [pulse, setPulse] = React.useState<Record<number, boolean>>({});
  const [activeId, setActiveId] = React.useState<number | null>(null);

  const [rotationAngle, setRotationAngle] = useAutoRotate(autoRotate);

  const containerRef = React.useRef<HTMLDivElement>(null);
  const orbitRef = React.useRef<HTMLDivElement>(null);
  const nodeRefs = React.useRef<Record<number, HTMLDivElement | null>>({});

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpanded({});
      setActiveId(null);
      setPulse({});
      setAutoRotate(true);
    }
  };

  const getRelated = (id: number) =>
    timelineData.find((i) => i.id === id)?.relatedIds ?? [];

  const centerOn = (id: number) => {
    const idx = timelineData.findIndex((i) => i.id === id);
    if (idx < 0) return;
    const total = timelineData.length;
    const targetAngle = (idx / total) * 360;
    setRotationAngle(270 - targetAngle);
  };

  const toggle = (id: number) => {
    setExpanded((prev) => {
      const next: Record<number, boolean> = {};
      Object.keys(prev).forEach((k) => (next[Number(k)] = false));
      const willOpen = !prev[id];
      next[id] = willOpen;

      if (willOpen) {
        setActiveId(id);
        setAutoRotate(false);
        const rel = getRelated(id);
        const p: Record<number, boolean> = {};
        rel.forEach((rid) => (p[rid] = true));
        setPulse(p);
        centerOn(id);
      } else {
        setActiveId(null);
        setAutoRotate(true);
        setPulse({});
      }
      return next;
    });
  };

  const calcPos = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const isMobile = window.innerWidth < 768;
    const r = isMobile ? 140 : 200;
    const rad = (angle * Math.PI) / 180;
    const x = r * Math.cos(rad);
    const y = r * Math.sin(rad);
    const zIndex = Math.round(100 + 50 * Math.cos(rad));
    const opacity = Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(rad)) / 2)));
    return { x, y, zIndex, opacity };
  };

  const isRelatedToActive = (id: number) =>
    activeId ? getRelated(activeId).includes(id) : false;

  // For the mini duration bar we normalize to the longest step
  const maxDays =
    Math.max(
      ...timelineData.map((i) => Math.max(i.durationMinDays, i.durationMaxDays))
    ) || 1;

  return (
    <div
      ref={containerRef}
      onClick={handleContainerClick}
      className={cn(
        "w-full h-screen flex flex-col items-center justify-center overflow-hidden px-4",
        className
      )}
    >
      <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
        <div
          ref={orbitRef}
          className="absolute w-full h-full flex items-center justify-center scale-75 md:scale-100"
          style={{ perspective: "1000px" }}
        >
          {/* Label */}
          {/* Center nucleus */}
          <div className="absolute w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-teal-500 animate-pulse flex items-center justify-center z-10">
            <div className="absolute w-16 h-16 md:w-20 md:h-20 rounded-full border border-white/20 animate-ping opacity-70" />
            <div className="absolute w-20 h-20 md:w-24 md:h-24 rounded-full border border-white/10 animate-ping opacity-50 [animation-delay:.5s]" />
            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white/80 backdrop-blur-lg" />
          </div>

          {/* Orbit ring */}
          <div className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full border border-white/10" />

          {/* Nodes */}
          {timelineData.map((item, i) => {
            const pos = calcPos(i, timelineData.length);
            const open = !!expanded[item.id];
            const related = isRelatedToActive(item.id);
            const glowing = !!pulse[item.id];
            const Icon = item.icon;
            const glow = typeof item.energy === "number" ? item.energy : 60;

            // Mini duration bar numbers
            const leftPct = (item.durationMinDays / maxDays) * 100;
            const rangePct = Math.max(
              (item.durationMaxDays - item.durationMinDays) / maxDays * 100,
              6 // ensure visible even when min == max
            );

            return (
              <div
                key={item.id}
                ref={(el) => (nodeRefs.current[item.id] = el)}
                className="absolute transition-all duration-700 cursor-pointer"
                style={{
                  transform: `translate(${pos.x}px, ${pos.y}px)`,
                  zIndex: open ? 200 : pos.zIndex,
                  opacity: open ? 1 : pos.opacity,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  toggle(item.id);
                }}
              >
                {/* Glow */}
                <div
                  className={`absolute rounded-full -inset-1 ${glowing ? "animate-pulse duration-1000" : ""}`}
                  style={{
                    background: `radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)`,
                    width: `${glow * 0.5 + 40}px`,
                    height: `${glow * 0.5 + 40}px`,
                    left: `-${(glow * 0.5 + 40 - 40) / 2}px`,
                    top: `-${(glow * 0.5 + 40 - 40) / 2}px`,
                  }}
                />

                {/* Dot */}
                <div
                  className={[
                    "w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                    open
                      ? "bg-white text-black border-white shadow-lg shadow-white/30 scale-150"
                      : related
                      ? "bg-white/50 text-black border-white animate-pulse"
                      : "bg-black text-white border-white/40",
                  ].join(" ")}
                >
                  <Icon size={14} className="md:w-4 md:h-4" />
                </div>

                {/* Label */}
                <div
                  className={[
                    "absolute top-10 md:top-12 whitespace-nowrap text-[10px] md:text-xs font-semibold tracking-wider transition-all duration-300",
                    open ? "text-white scale-125" : "text-white/70",
                  ].join(" ")}
                >
                  {item.title}
                </div>

                {/* Expanded card */}
                {open && (
                  <Card className="absolute top-16 md:top-20 left-1/2 -translate-x-1/2 w-64 md:w-72 bg-black/90 backdrop-blur-lg border-white/30 shadow-xl shadow-white/10 overflow-visible max-h-[60vh] md:max-h-none overflow-y-auto">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-white/50" />
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <Badge variant="outline" className="px-2 text-xs text-white/80 border-white/30">
                          {item.category}
                        </Badge>
                      </div>
                      <CardTitle className="text-sm mt-2">{item.title}</CardTitle>
                    </CardHeader>

                    <CardContent className="text-xs text-white/80">
                      {/* Content */}
                      <p>{item.content}</p>

                      {/* Duration + mini bar */}
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center gap-2">
                          <Clock size={12} className="text-white/70" />
                          <span>{item.durationLabel}</span>
                        </div>
                        <div className="relative h-1.5 rounded-full bg-white/10 overflow-hidden">
                          <div
                            className="absolute inset-y-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                            style={{ left: `${leftPct}%`, width: `${rangePct}%` }}
                          />
                          {/* optional markers */}
                          <div
                            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-white/70"
                            style={{ left: `${leftPct}%` }}
                          />
                          <div
                            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-white/60"
                            style={{ left: `${leftPct + rangePct}%` }}
                          />
                        </div>
                      </div>

                      {/* Deliverables */}
                      {item.deliverables && item.deliverables.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-white/10">
                          <div className="flex items-center mb-2">
                            <ListChecks size={12} className="text-white/70 mr-1" />
                            <h4 className="text-xs uppercase tracking-wider font-medium text-white/70">
                              Deliverables
                            </h4>
                          </div>
                          <ul className="list-disc list-inside space-y-1">
                            {item.deliverables.map((d, idx) => (
                              <li key={idx} className="text-white/80">
                                {d}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Connected nodes */}
                      {item.relatedIds.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-white/10">
                          <div className="flex items-center mb-2">
                            <LinkIcon size={10} className="text-white/70 mr-1" />
                            <h4 className="text-xs uppercase tracking-wider font-medium text-white/70">
                              Connected Nodes
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {item.relatedIds.map((rid) => {
                              const rel = timelineData.find((i) => i.id === rid);
                              return (
                                <Button
                                  key={rid}
                                  variant="outline"
                                  size="sm"
                                  className="flex items-center h-6 px-2 py-0 text-xs rounded-none border-white/20 bg-transparent hover:bg-white/10 text-white/80 hover:text-white transition-all"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggle(rid);
                                  }}
                                >
                                  {rel?.title}
                                  <ArrowRight size={8} className="ml-1 text-white/60" />
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Also export a named alias so you can import either way.
export { RadialOrbitalTimeline };
export type { TimelineItem };
