// /components/ui/database-with-rest-api.tsx
"use client";

import React, { useId, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles as SparklesIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/** Security nodes shown inside the main box */
export type SecurityNode = {
  key: string;
  label: string;
  description: string;
};

interface DatabaseWithRestApiProps {
  className?: string;
  /** Title chip above the box (defaults to security tagline) */
  title?: string;
  /** Blue glow color for moving light */
  lightColor?: string;
  /** Keep all lights in sync (start together) */
  lightsInSync?: boolean;
  /** Light animation duration (seconds) */
  lightDuration?: number;
  /** Light circle radius (px in SVG space) */
  lightSize?: number;
  /** Blur strength for glow (SVG filter gaussian blur) */
  glowStrength?: number;
  /** Provide your own nodes; otherwise defaults to security set */
  nodes?: SecurityNode[];
  /** Called when a node is selected */
  onNodeSelect?: (node: SecurityNode) => void;
  /** Header pill labels (top row). Defaults to Security/Reliability/Success/Trust */
  badgeTexts?: { first?: string; second?: string; third?: string; fourth?: string };
}

const DEFAULT_NODES: SecurityNode[] = [
  {
    key: "hardening",
    label: "Best-Practice Hardening",
    description:
      "Secure defaults with least-privilege roles, change approvals, and isolated environments to reduce blast radius.",
  },
  {
    key: "reliability",
    label: "Reliability & Backups",
    description:
      "Monitored uptime with encrypted, scheduled backups and tested restore runbooks so recovery is predictable.",
  },
  {
    key: "secrets",
    label: "Secrets Management",
    description:
      "Managed vaults, short-lived and scoped API keys, automated rotation, and zero secrets in code or logs.",
  },
  {
    key: "byok",
    label: "Owned Credentials",
    description:
      "Use your own vendor accounts (Twilio/Stripe/Airtable, etc.). You can rotate or revoke access at any time.",
  },
  {
    key: "isolation",
    label: "Tenant Isolation",
    description:
      "Dedicated workspaces and data stores per client with strict network, role, and runtime boundaries.",
  },
  {
    key: "messaging",
    label: "Messaging Compliance",
    description:
      "Opt-in capture, STOP/HELP handling, quiet hours, 10DLC registration, and CAN-SPAM/CASL-friendly flows.",
  },
];

const DatabaseWithRestApi = ({
  className,
  title = "Where Security & Reliability create Success and Trust",
  lightColor = "#00A6F5",
  lightsInSync = true,
  lightDuration = 3.5,
  lightSize = 2,
  glowStrength = 8,
  nodes,
  onNodeSelect,
  badgeTexts,
}: DatabaseWithRestApiProps) => {
  const uid = useId();
  const ids = {
    track1: `db-track-1-${uid}`,
    track2: `db-track-2-${uid}`,
    track3: `db-track-3-${uid}`,
    track4: `db-track-4-${uid}`,
    mask1: `db-mask-1-${uid}`,
    mask2: `db-mask-2-${uid}`,
    mask3: `db-mask-3-${uid}`,
    mask4: `db-mask-4-${uid}`,
    grad: `db-blue-grad-${uid}`,
    glow: `db-glow-${uid}`,
  };

  const begins = lightsInSync ? ["0s", "0s", "0s", "0s"] : ["0.1s", "0.3s", "0.5s", "0.7s"];
  const items = useMemo(() => nodes ?? DEFAULT_NODES, [nodes]);

  const [activeKey, setActiveKey] = useState<string | null>(null);
  const active = items.find((n) => n.key === activeKey) || null;

  const handleSelect = (key: string) => {
    const n = items.find((x) => x.key === key);
    setActiveKey((prev) => (prev === key ? null : key));
    if (n) onNodeSelect?.(n);
  };

  const header = {
    first: badgeTexts?.first ?? "Security",
    second: badgeTexts?.second ?? "Reliability",
    third: badgeTexts?.third ?? "Success",
    fourth: badgeTexts?.fourth ?? "Trust",
  };

  return (
    <div className={cn("relative flex w-full max-w-[720px] flex-col items-center", className)}>
      {/* ===== SVG: tracks + moving glow + header pills ===== */}
      <svg className="h-[350px] sm:w-full text-muted" width="100%" height="100%" viewBox="0 0 200 100">
        <defs>
          {/* Paths (tracks) */}
          <path id={ids.track1} d="M 31 10 v 15 q 0 5 5 5 h 59 q 5 0 5 5 v 10" />
          <path id={ids.track2} d="M 77 10 v 10 q 0 5 5 5 h 13 q 5 0 5 5 v 10" />
          <path id={ids.track3} d="M 124 10 v 10 q 0 5 -5 5 h -14 q -5 0 -5 5 v 10" />
          <path id={ids.track4} d="M 170 10 v 15 q 0 5 -5 5 h -60 q -5 0 -5 5 v 10" />
          {/* Wider masks so glow isn't clipped */}
          <mask id={ids.mask1} maskContentUnits="userSpaceOnUse">
            <use href={`#${ids.track1}`} stroke="white" strokeWidth="6" fill="none" />
          </mask>
          <mask id={ids.mask2} maskContentUnits="userSpaceOnUse">
            <use href={`#${ids.track2}`} stroke="white" strokeWidth="6" fill="none" />
          </mask>
          <mask id={ids.mask3} maskContentUnits="userSpaceOnUse">
            <use href={`#${ids.track3}`} stroke="white" strokeWidth="6" fill="none" />
          </mask>
          <mask id={ids.mask4} maskContentUnits="userSpaceOnUse">
            <use href={`#${ids.track4}`} stroke="white" strokeWidth="6" fill="none" />
          </mask>
          {/* Punchy gradient + glow */}
          <radialGradient id={ids.grad} fx="0.85" fy="0.2">
            <stop offset="0%" stopColor={lightColor} stopOpacity="1" />
            <stop offset="40%" stopColor={lightColor} stopOpacity="0.55" />
            <stop offset="85%" stopColor={lightColor} stopOpacity="0.2" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <filter id={ids.glow} x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur in="SourceGraphic" stdDeviation={glowStrength} result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Visible tracks */}
        <g stroke="currentColor" fill="none" strokeWidth="0.4">
          <use href={`#${ids.track1}`} />
          <use href={`#${ids.track2}`} />
          <use href={`#${ids.track3}`} />
          <use href={`#${ids.track4}`} />
          <animate
            attributeName="stroke-dashoffset"
            from="100"
            to="0"
            dur="1s"
            fill="freeze"
            calcMode="spline"
            keySplines="0.25,0.1,0.5,1"
            keyTimes="0;1"
          />
        </g>

        {/* Moving lights (glow circles) */}
        {[
          { mask: ids.mask1, path: ids.track1, begin: begins[0] },
          { mask: ids.mask2, path: ids.track2, begin: begins[1] },
          { mask: ids.mask3, path: ids.track3, begin: begins[2] },
          { mask: ids.mask4, path: ids.track4, begin: begins[3] },
        ].map((t, i) => (
          <g key={i} mask={`url(#${t.mask})`}>
            <circle r={lightSize} fill={`url(#${ids.grad})`} filter={`url(#${ids.glow})`}>
              <animateMotion
                dur={`${lightDuration}s`}
                begin={t.begin}
                repeatCount="indefinite"
                keySplines="0.25,0.1,0.25,1"
                calcMode="spline"
              >
                <mpath href={`#${t.path}`} xlinkHref={`#${t.path}`} />
              </animateMotion>
            </circle>
          </g>
        ))}

        {/* Header pills (top row) */}
        <g stroke="currentColor" fill="none" strokeWidth="0.4">
          <g>
            <rect fill="#18181B" x="14" y="5" width="34" height="10" rx="5" />
            <text x="31" y="12" textAnchor="middle" fill="white" stroke="none" fontSize="5" fontWeight="500">
              {header.first}
            </text>
          </g>
          <g>
            <rect fill="#18181B" x="60" y="5" width="38" height="10" rx="5" />
            <text x="79" y="12" textAnchor="middle" fill="white" stroke="none" fontSize="5" fontWeight="500">
              {header.second}
            </text>
          </g>
          <g>
            <rect fill="#18181B" x="108" y="5" width="32" height="10" rx="5" />
            <text x="124" y="12" textAnchor="middle" fill="white" stroke="none" fontSize="5" fontWeight="500">
              {header.third}
            </text>
          </g>
          <g>
            <rect fill="#18181B" x="150" y="5" width="34" height="10" rx="5" />
            <text x="167" y="12" textAnchor="middle" fill="white" stroke="none" fontSize="5" fontWeight="500">
              {header.fourth}
            </text>
          </g>
        </g>
      </svg>

      {/* Title chip (above the box) */}
      <div className="pointer-events-none absolute top-[163px] left-1/2 -translate-x-1/2 z-30">
        <div className="flex items-center justify-center rounded-lg border bg-[#101112] px-4 py-1.5 sm:py-2">
          <SparklesIcon className="size-3" />
          <span className="ml-2 text-xs whitespace-nowrap">{title}</span>
        </div>
      </div>

      {/* ===== MAIN BOX ===== */}
      <div className="relative -mt-[170px] z-10 flex h-[190px] w-full items-center justify-center overflow-hidden rounded-lg border bg-background shadow-md">
        {/* Node chips - 3x2 grid */}
        <div className="grid grid-cols-2 grid-rows-3 gap-4 md:gap-5 px-6 w-full">
          {items.map((n) => {
            const isActive = n.key === activeKey;
            return (
              <button
                key={n.key}
                type="button"
                onClick={() => handleSelect(n.key)}
                className={cn(
                  "group inline-flex items-center justify-center gap-1.5 rounded-full border",
                  "px-2 py-1 md:px-3 md:py-1.5 text-[9px] md:text-sm font-medium w-full transition",
                  "border-white/12 bg-white/5 text-white/90 hover:bg-white/10 hover:border-white/20",
                  isActive && "border-white/30 bg-white/10"
                )}
              >
                <span
                  className={cn(
                    "inline-block size-[6px] rounded-full flex-shrink-0",
                    isActive ? "bg-emerald-400" : "bg-blue-400"
                  )}
                />
                <span className="whitespace-nowrap group-hover:underline underline-offset-[2px] text-center">
                  {n.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Description card below box */}
      <AnimatePresence initial={false} mode="wait">
        {active && (
          <motion.div
            key={active.key}
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="mt-4 w-full rounded-xl border border-white/10 bg-[#0E0F10] p-4 text-sm text-white/85 shadow-lg"
          >
            <div className="flex items-start justify-between gap-3">
              <h4 className="font-medium text-white">{active.label}</h4>
              <button
                type="button"
                onClick={() => setActiveKey(null)}
                className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs text-white/80 hover:bg-white/10"
              >
                Close
              </button>
            </div>
            <p className="mt-2 leading-relaxed">{active.description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DatabaseWithRestApi;
