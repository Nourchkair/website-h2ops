// src/components/sections/Services.tsx
"use client";

import * as React from "react";
import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ButtonColorful } from "@/components/ui/button-colorful";

type SubService = { name: string; bullets: string[] };

type CardData = {
  id: string;
  frontTitle: "Acquire" | "Convert" | "Deliver";
  backTitle: string;
  gradientFrom: string;
  gradientTo: string;
  image?: string;
  frontBubbles?: string[];
  subServices: SubService[];
};

function Dots({
  count,
  index,
  onJump,
}: {
  count: number;
  index: number;
  onJump: (i: number) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          aria-label={`Go to slide ${i + 1}`}
          onClick={() => onJump(i)}
          className={`h-2.5 w-2.5 rounded-full transition ${
            i === index ? "bg-white" : "bg-white/30 hover:bg-white/60"
          }`}
        />
      ))}
    </div>
  );
}

function ctaLabel(frontTitle: CardData["frontTitle"]) {
  switch (frontTitle) {
    case "Acquire":
      return "Start Aquiring Now";
    case "Convert":
      return "Start Converting Now";
    case "Deliver":
      return "Start Delivering Now";
  }
}

function FlipCardInPlace({
  data,
  isFlipped,
  onOpen,
  onClose,
  className,
}: {
  data: CardData;
  isFlipped: boolean;
  onOpen: () => void;
  onClose: () => void;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  const [slide, setSlide] = useState(0);
  const [dir, setDir] = useState(0);

  useEffect(() => {
    if (isFlipped) setSlide(0);
  }, [isFlipped]);

  useEffect(() => {
    if (!isFlipped) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setSlide((s) => Math.max(0, s - 1));
      if (e.key === "ArrowRight") setSlide((s) => Math.min(data.subServices.length - 1, s + 1));
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isFlipped, data.subServices.length, onClose]);

  const go = (n: number) => {
    const clamped = Math.max(0, Math.min(data.subServices.length - 1, n));
    setDir(clamped > slide ? 1 : -1);
    setSlide(clamped);
  };

  return (
    <div className={className}>
      <div className="relative h-full w-full" style={{ perspective: 1000 }}>
        <motion.div
          className="relative h-full w-full rounded-2xl"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.55, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* FRONT */}
          <div
            role="button"
            tabIndex={0}
            aria-label={`Open ${data.frontTitle}`}
            className={`absolute inset-0 z-10 rounded-2xl border border-white/10 bg-gradient-to-br ${data.gradientFrom} ${data.gradientTo} p-4 text-center outline-none focus-visible:ring-2 focus-visible:ring-white/70 overflow-hidden`}
            style={{ backfaceVisibility: "hidden" as any }}
            onClick={onOpen}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onOpen();
              }
            }}
          >
            {data.image && (
              <>
                <div
                  aria-hidden="true"
                  className="absolute inset-0 z-0"
                  style={{
                    backgroundImage: `url('${data.image}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "saturate(1.05) brightness(0.95)",
                  }}
                />
                <div aria-hidden="true" className="absolute inset-0 z-0 bg-black/45" />
              </>
            )}

            <div className="relative z-10 flex h-full flex-col">
              <div className="flex-1 grid place-items-center">
                <div className="flex flex-col items-center">
                  <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-white drop-shadow">
                    {data.frontTitle}
                  </h3>

                  {!!data.frontBubbles?.length && (
                    <div className="mt-3 flex flex-wrap justify-center gap-2">
                      {data.frontBubbles!.slice(0, 4).map((b) => (
                        <span
                          key={b}
                          className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[12px] sm:text-sm text-white/90"
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-auto mb-1 flex w-full items-center justify-center">
                <Link
                  to="/contact"
                  onClick={(e) => e.stopPropagation()}
                  className="hover:scale-[1.03] active:scale-[0.99] transition-transform"
                  style={{ minHeight: "44px", minWidth: "44px" }}
                  aria-label={ctaLabel(data.frontTitle)}
                >
                  <ButtonColorful label={ctaLabel(data.frontTitle)} variant="blue" className="font-semibold text-sm sm:text-base px-6" />
                </Link>
              </div>
            </div>
          </div>

          {/* BACK */}
          <div
            className="absolute inset-0 rounded-2xl border border-white/10 bg-white/5 p-4 text-center"
            style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={onClose}
              className="absolute right-2 top-2 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/90 backdrop-blur hover:bg-black/60"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="pt-1">
              <div className="text-base sm:text-lg font-semibold tracking-wide text-white/90">{data.backTitle}</div>
            </div>

            {/* Carousel area */}
            <div className="relative mt-3 h-[calc(100%-96px)] min-h-[180px]">
              <div className="relative h-full overflow-hidden rounded-xl border border-white/10 bg-neutral-900/40 p-4">
                <AnimatePresence custom={dir} mode="popLayout">
                  <motion.div
                    key={slide}
                    custom={dir}
                    variants={{
                      enter: (d: number) => ({ x: d > 0 ? 40 : -40, opacity: 0 }),
                      center: { x: 0, opacity: 1 },
                      exit: (d: number) => ({ x: d > 0 ? -40 : 40, opacity: 0 }),
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: prefersReducedMotion ? 0 : 0.35, ease: "easeOut" }}
                    className="h-full flex items-center justify-center"
                  >
                    <div className="w-full max-w-[560px] text-center px-4">
                      {/* smaller title on mobile, same on desktop */}
                      <div className="text-sm sm:text-lg font-semibold text-white/90">
                        {data.subServices[slide].name}
                      </div>

                      <ul className="mt-3 space-y-2 text-white/85 text-left mx-auto max-w-[560px]">
                        {data.subServices[slide].bullets.map((b, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="mt-1.5 inline-block h-2.5 w-2.5 rounded-full bg-white/70 flex-shrink-0" />
                            {/* smaller text inside box on mobile */}
                            <span className="text-xs sm:text-base">{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Desktop hover zones (inside box) */}
                <button
                  type="button"
                  aria-label="Previous"
                  disabled={slide === 0}
                  onClick={() => go(slide - 1)}
                  className={`hidden sm:block group/left pointer-events-auto absolute left-0 top-0 h-full w-[12%] transition ${
                    slide === 0 ? "opacity-0 cursor-default" : "cursor-pointer"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`absolute inset-0 rounded-l-xl bg-black/0 transition ${
                      slide === 0 ? "" : "group-hover/left:bg-black/25"
                    }`}
                  />
                  <ChevronLeft
                    className={`absolute left-2 top-1/2 -translate-y-1/2 h-5 w-5 opacity-0 transition ${
                      slide === 0 ? "" : "group-hover/left:opacity-100"
                    }`}
                  />
                </button>

                <button
                  type="button"
                  aria-label="Next"
                  disabled={slide === data.subServices.length - 1}
                  onClick={() => go(slide + 1)}
                  className={`hidden sm:block group/right pointer-events-auto absolute right-0 top-0 h-full w-[12%] transition ${
                    slide === data.subServices.length - 1 ? "opacity-0 cursor-default" : "cursor-pointer"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`absolute inset-0 rounded-r-xl bg-black/0 transition ${
                      slide === data.subServices.length - 1 ? "" : "group-hover/right:bg-black/25"
                    }`}
                  />
                  <ChevronRight
                    className={`absolute right-2 top-1/2 -translate-y-1/2 h-5 w-5 opacity-0 transition ${
                      slide === data.subServices.length - 1 ? "" : "group-hover/right:opacity-100"
                    }`}
                  />
                </button>
              </div>

              {/* ⬇️ Mobile controls OUTSIDE the box, flanking the dots */}
              <div className="mt-3 sm:mt-4 flex items-center justify-center gap-3">
                <button
                  aria-label="Previous"
                  onClick={() => go(slide - 1)}
                  disabled={slide === 0}
                  className={`sm:hidden h-9 w-9 grid place-items-center rounded-full bg-white/10 ring-1 ring-white/20 text-white transition active:scale-[0.98] ${
                    slide === 0 ? "opacity-40 cursor-not-allowed" : "hover:bg-white/20"
                  }`}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <Dots count={data.subServices.length} index={slide} onJump={go} />

                <button
                  aria-label="Next"
                  onClick={() => go(slide + 1)}
                  disabled={slide === data.subServices.length - 1}
                  className={`sm:hidden h-9 w-9 grid place-items-center rounded-full bg-white/10 ring-1 ring-white/20 text-white transition active:scale-[0.98] ${
                    slide === data.subServices.length - 1 ? "opacity-40 cursor-not-allowed" : "hover:bg-white/20"
                  }`}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function Services() {
  const [activeId, setActiveId] = useState<string | null>(null);

  const CARDS: CardData[] = useMemo(
    () => [
      {
        id: "service-mkt",
        frontTitle: "Acquire",
        backTitle: "Growth Systems",
        gradientFrom: "from-sky-600/50",
        gradientTo: "to-blue-500/40",
        image: "/media/services/acquire.jpg",
        frontBubbles: ["AI Cold Email Engine", "SMS Outreach", "Outbound Calling", "Prospect Enrichment"],
        subServices: [
          {
            name: "AI Cold Email Engine",
            bullets: [
              "Generates multi-variant emails; rotates senders.",
              "Monitors replies, tags intent, routes to CRM.",
              "Deliverability guardrails; A/B test copy.",
              "Tracks bounce, reply & booking rates.",
            ],
          },
          {
            name: "SMS Outreach & Reactivation",
            bullets: [
              "Re-engages quietly with compliant, conversational SMS.",
              "Triggers on time-lapse, events, or missed calls.",
              "Qualifies & books via link or agent handoff.",
              "Opt-out tracking & suppression hygiene.",
            ],
          },
          {
            name: "Outbound Calling Agents",
            bullets: [
              "AI voice agents with goal-based scripts.",
              "Live transfer or calendar booking on qualify.",
              "Voicemail + SMS fallback; CRM summaries.",
              "Local time windows & smart retries.",
            ],
          },
          {
            name: "Prospect List & Enrichment",
            bullets: [
              "Translate ICP to filters; source decision-makers.",
              "Append emails/phones, firmographics, tech stack.",
              "Deduplicate vs CRM; label validity/risk.",
              "Deliver CSV/CRM push with segments.",
            ],
          },
        ],
      },
      {
        id: "service-ai",
        frontTitle: "Convert",
        backTitle: "Revenue Systems",
        gradientFrom: "from-fuchsia-600/50",
        gradientTo: "to-purple-500/40",
        image: "/media/services/convert.jpg",
        frontBubbles: ["Custom CRM", "Optimizations", "Inbound Capture", "Attribution"],
        subServices: [
          {
            name: "Custom CRM",
            bullets: [
              "Design pipelines, fields, roles/permissions.",
              "Automations: assignment, SLAs, tasks.",
              "Integrate forms, inbox, phone, calendars, ads.",
              "Dashboards for pipeline, velocity, revenue.",
            ],
          },
          {
            name: "CRM Optimizations",
            bullets: [
              "Clean model; merge dupes; normalize stages.",
              "Connect tools with two-way sync.",
              "Automate follow-ups, renewals, handoffs.",
              "Tailored views to lift adoption.",
            ],
          },
          {
            name: "Inbound Capture & Routing",
            bullets: [
              "Forms/chat/ad hooks with UTM capture.",
              "Real-time scoring; owner/queue routing.",
              "Instant auto-response + booking; SMS fallback.",
              "Webhook retries & error alerts.",
            ],
          },
          {
            name: "Dashboards & Attribution",
            bullets: [
              "Leads → meetings → revenue by channel.",
              "First/last-touch via UTMs & campaign tags.",
              "Rep/team scorecards & SLA metrics.",
              "Export/embed for weekly reviews.",
            ],
          },
        ],
      },
      {
        id: "service-ops",
        frontTitle: "Deliver",
        backTitle: "Operation Systems",
        gradientFrom: "from-emerald-600/50",
        gradientTo: "to-teal-500/40",
        image: "/media/services/deliver.jpg",
        frontBubbles: ["Fulfillment", "SMS Agent", "Calling Agent", "PM Systems"],
        subServices: [
          {
            name: "AI Automated Fulfillment",
            bullets: [
              "Auto-generate quotes & deliverables from triggers.",
              "Orchestrate tasks, approvals, file moves.",
              "Client status updates via email/SMS/portal.",
              "Exceptions queues & safe rollback.",
            ],
          },
          {
            name: "Inbound SMS Agent",
            bullets: [
              "Answers FAQs, captures info, books via text.",
              "Detects intent; routes edge cases to humans.",
              "Pulls account data for personalization.",
              "Logs transcripts & outcomes in CRM.",
            ],
          },
          {
            name: "Inbound Calling Agent",
            bullets: [
              "Answers, verifies, routes or books appts.",
              "Missed-call flow: voicemail → SMS follow-up.",
              "Summaries + next actions to CRM.",
              "After-hours rules & escalation paths.",
            ],
          },
          {
            name: "Performance Management Systems",
            bullets: [
              "Live scorecards (activity, first-response).",
              "Weekly targets with off-pace alerts.",
              "Coaching loops: review queues.",
              "Leaderboards & incentive-ready metrics.",
            ],
          },
        ],
      },
    ],
    []
  );

  return (
    <section id="services" className="relative isolate w-full bg-transparent pt-0 pb-8 sm:pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {CARDS.map((c) => (
            <div key={c.id} className="aspect-square">
              <FlipCardInPlace
                data={c}
                isFlipped={activeId === c.id}
                onOpen={() => setActiveId(c.id)}
                onClose={() => setActiveId((id) => (id === c.id ? null : id))}
                className="h-full w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
