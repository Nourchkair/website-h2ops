// src/pages/CaseDetail.tsx
"use client";

import * as React from "react";
import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import StaggeredMenu from "@/components/staggered/StaggeredMenu";
import { Footer } from "@/components/layout/Footer";

type CaseDef = {
  slug: string;
  name: string;
  eyebrow: string;
  description: string;
  image?: string;
  challenge: string[];
  solution: string[];
  impact: string[];
  services: string[];
};

const CASES: CaseDef[] = [
  {
    slug: "butcher-shop",
    name: "The Butcher Shop and Grill",
    eyebrow: "F&B • Riyadh/Dubai",
    description:
      "The Butcher Shop & Grill proved that wiring data pipelines with an AI analyst can turn manual research and deck-building into a push-button process—an approach the team is now scaling across daily operations.",
    image: "/media/butcher-shop.png",
    challenge: [
      "Hours lost to research, data pulls, analysis, and dashboard builds.",
      "Scattered sources (POS, spreadsheets, suppliers, marketing) → slow, inconsistent reports.",
      "After-hours workload draining focus from service and growth.",
    ],
    solution: [
      "Built interconnected pipelines to ingest data from POS, suppliers, marketing, and ops tools.",
      "Deployed a trained AI analysis agent to reconcile, compare, and surface insights/exceptions.",
      "Auto-packaging to PDF, Excel, and slide decks—on schedule or on demand.",
      "Human-in-the-loop checks with audit trails for accuracy and trust.",
    ],
    impact: [
      "86% less time spent on reporting/analysis tasks.",
      "Faster turnarounds; updates available same-day with near-zero prep.",
      "Fewer errors and consistent outputs vs. single-analyst workflows.",
      "Higher morale and less after-hours work as AI becomes part of daily ops.",
    ],
    services: [
      "AI Automated Fulfillment",
      "Data Pipelines & Integrations",
      "AI Knowledge/Analysis Agent",
      "Performance Dashboards",
    ],
  },
  {
    slug: "dads-printing",
    name: "Dad’s Printing",
    eyebrow: "Custom-merch producer pivoting to DTC [DUMMY]",
    description:
      "1SecondCopy proved that end-to-end automation plus targeted AI augmentation can turn a thin-margin service into a high-leverage, scalable business—an approach Nick and Noah now replicate for clients across industries.",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2400&auto=format&fit=crop",
    challenge: [
      "Low margins, slow turnarounds; production not built for high-mix personalization. [DUMMY]",
    ],
    solution: [
      "Launched niche storefronts; scripted mockups auto-generated SKUs. [DUMMY]",
      "Pipeline: storefront → PM board → offshore design → API print sheet with embedded order ID + barcode. [DUMMY]",
      "Barcode scan = one-touch label/manifest; closes order + pushes tracking. [DUMMY]",
      "Abandon-cart + database reactivation (SMS); AI agent handles FAQs/ETA. [DUMMY]",
      "Ops dashboards: WIP, station load, on-time %, reprint rate. [DUMMY]",
    ],
    impact: [
      "+38% conversion; −27% turnaround time; +14pt gross margin. [DUMMY]",
      "<5-min speed-to-lead achieved 92% of business hours. [DUMMY]",
      "Rework −41%; repeat orders +22% QoQ. [DUMMY]",
    ],
    services: [
      "E-Commerce Launch Systems",
      "Automated SKU Generation",
      "Barcode Fulfillment Systems",
      "CRM Build & Integrations",
      "SMS Reactivation & Abandon-Cart",
    ],
  },
  {
    slug: "northstar-realty-group",
    name: "Northstar Realty Group",
    eyebrow: "45-agent brokerage needing faster follow-up [DUMMY]",
    description:
      "1SecondCopy proved that end-to-end automation plus targeted AI augmentation can turn a thin-margin service into a high-leverage, scalable business—an approach Nick and Noah now replicate for clients across industries.",
    image:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=2400&auto=format&fit=crop",
    challenge: [
      "Slow response to portal/IDX leads; no attribution to GCI. [DUMMY]",
    ],
    solution: [
      "5-min SLA with routing by zip/price/tier; auto-reply + booking. [DUMMY]",
      "ISA voice agent for after-hours + overflow; SMS nurture for sphere/reactivation. [DUMMY]",
      "CRM dashboards: lead→appt, appt→agreement, GCI attribution. [DUMMY]",
    ],
    impact: [
      "+31% appt-set rate in 30 days; <5-min response at 89% coverage. [DUMMY]",
      "+18% signed agreements; clear channel-to-GCI reporting. [DUMMY]",
    ],
    services: [
      "Inbound Capture & Routing",
      "AI Nurture Systems",
      "Inbound Calling Agent (ISA)",
      "CRM Optimization",
      "Dashboards & Attribution",
    ],
  },
  {
    slug: "polar-hvac",
    name: "Polar HVAC",
    eyebrow: "Residential HVAC with high missed-call volume [DUMMY]",
    description:
      "1SecondCopy proved that end-to-end automation plus targeted AI augmentation can turn a thin-margin service into a high-leverage, scalable business—an approach Nick and Noah now replicate for clients across industries.",
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2400&auto=format&fit=crop",
    challenge: [
      "Missed calls, slow callbacks, empty shoulder-season schedule. [DUMMY]",
    ],
    solution: [
      "Receptionist agent + missed-call → SMS safety net; live transfer or booking link. [DUMMY]",
      "Database reactivation (tune-ups, promos); outbound list build for PMs/GCs. [DUMMY]",
      "Estimate→invoice automation; technician scorecards. [DUMMY]",
    ],
    impact: [
      "+44% booked jobs MoM during pilot; −22% no-show rate. [DUMMY]",
      "First-response under 3 min during business hours. [DUMMY]",
    ],
    services: [
      "Inbound Calling Agent",
      "SMS Outreach & Reactivation",
      "AI Automated Fulfillment",
      "Performance Management Systems",
      "Prospect List Build & Enrichment",
    ],
  },
];

export default function CaseDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const idx = useMemo(() => CASES.findIndex((c) => c.slug === slug), [slug]);
  const data = idx >= 0 ? CASES[idx] : null;

  // Same menu as home
  const menuItems = [
    { label: "Home", ariaLabel: "Go to home", link: "#home" },
    {
      label: "Services",
      ariaLabel: "Go to services",
      link: "#services",
      children: [
        { label: "AI Agents", link: "#service-ai" },
        { label: "CRM Optimization", link: "#service-crm" },
        { label: "Automated Marketing", link: "#service-mkt" },
        { label: "Ops Automation", link: "#service-ops" },
        { label: "Systems Management", link: "#service-sys" },
      ],
    },
    { label: "About", ariaLabel: "Go to about", link: "#why-us-anchor" },
    { label: "Security", ariaLabel: "Go to security", link: "#security" },
    { label: "Contact", ariaLabel: "Go to contact", link: "#contact" },
    { label: "Outcomes", ariaLabel: "Go to outcomes", link: "#outcomes" },
  ];

  const socialItems = [
    { label: "TikTok", link: "https://tiktok.com" },
    {
      label: "Instagram",
      link: "https://www.instagram.com/horizon2operations?igsh=NGdpOGJ6cXFxaGps",
    },
    { label: "LinkedIn", link: "https://linkedin.com" },
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  // Helper: always return to home Outcomes section
  const goBackToOutcomes = React.useCallback(() => {
    navigate("/");
    setTimeout(() => {
      const outcomesSection = document.getElementById("outcomes");
      if (outcomesSection) {
        outcomesSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  }, [navigate]);

  if (!data) {
    return (
      <div className="min-h-[60vh] grid place-items-center px-4 bg-black text-white">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-semibold">Case not found</h1>
          <button
            onClick={goBackToOutcomes}
            className="mt-3 inline-block underline"
          >
            ← Back to real Outcomes
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="relative min-h-[100svh] w-full text-white bg-black">
      {/* Top menu */}
      <div className="fixed inset-0 z-[80] pointer-events-none">
        <StaggeredMenu
          className="pointer-events-auto"
          position="right"
          items={menuItems}
          socialItems={socialItems}
          displaySocials={true}
          displayItemNumbering={true}
          menuButtonColor="#fff"
          openMenuButtonColor="#fff"
          changeMenuColorOnOpen={true}
          colors={["#000", "#000", "#000"]}
          logoUrl="/h2ops.png"
          accentColor="#4f46e5"
        />
      </div>

      <section className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 py-8 sm:py-10">
        {/* HERO IMAGE with hover overlay description */}
        <div className="group relative w-full overflow-hidden rounded-3xl border border-white/10 mt-6">
          {/* Image */}
          <div className="relative w-full h-[54vh] sm:h-[62vh] md:h-[68vh] lg:h-[72vh]">
            {data.image ? (
              <img
                src={data.image}
                alt={data.name}
                className={
                  // Mobile: blur always ON; Desktop: blur only on hover
                  "absolute inset-0 w-full h-full object-cover transition duration-300 blur-[2px] sm:blur-0 sm:group-hover:blur-[2px]"
                }
              />
            ) : (
              <div className="absolute inset-0 grid place-items-center text-white/70">
                No image provided
              </div>
            )}
          </div>

          {/* Dark overlay — Mobile always ON; Desktop only on hover */}
          <div className="pointer-events-none absolute inset-0 bg-black/45 sm:bg-black/0 sm:group-hover:bg-black/45 transition-colors duration-300" />

          {/* Overlay content — Mobile always VISIBLE; Desktop on hover */}
          <div className="absolute inset-0 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
            <div className="h-full w-full flex items-center">
              <div className="mx-6 sm:mx-10">
                <button
                  onClick={goBackToOutcomes}
                  className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-4 py-2 text-sm hover:bg-white/25 transition pointer-events-auto"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Go back
                </button>

                <div className="mt-4 max-w-xl rounded-2xl bg-black/55 backdrop-blur-md p-5 sm:p-6 pointer-events-none">
                  <div className="text-sm text-white/70">{data.eyebrow}</div>
                  <p className="mt-2 text-xl sm:text-2xl leading-7 sm:leading-8 text-white">
                    {data.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DETAILS: Services + Story */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Services Adopted — sticky, blurred image background */}
          <aside className="lg:col-span-1">
            <div className="relative rounded-3xl border border-white/10 overflow-hidden lg:sticky lg:top-6">
              {/* Blurred image background */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-center bg-cover blur-[5px] opacity-50 scale-110"
                style={{
                  backgroundImage: data.image ? `url('${data.image}')` : "none",
                }}
              />
              {/* subtle dark overlay for contrast */}
              <div className="absolute inset-0 bg-black/30" />
              {/* Content */}
              <div className="relative p-6 md:p-7">
                <h3 className="text-lg font-semibold">Services Adopted</h3>
                <ul className="mt-3 space-y-2">
                  {data.services.map((s) => (
                    <li
                      key={s}
                      className="flex items-center gap-2 text-[16px] sm:text-[17px] text-white/95"
                    >
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/80" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
                {/* ❌ removed Back to grid / Prev / Next buttons */}
              </div>
            </div>
          </aside>

          {/* Story blocks — no boxes, larger type */}
          <div className="lg:col-span-2 space-y-10">
            <h2 className="text-3xl md:text-4xl font-semibold">{data.name}</h2>

            <StorySection title="Challenge" items={data.challenge} />
            <StorySection title="Solution" items={data.solution} />
            <StorySection title="Impact" items={data.impact} />
          </div>
        </div>
      </section>

      {/* Footer available to scroll to */}
      <Footer />
    </main>
  );
}

function StorySection({ title, items }: { title: string; items: string[] }) {
  return (
    <section>
      <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h3>
      <ul className="mt-4 space-y-3 text-[18px] md:text-[20px] leading-relaxed">
        {items.map((it, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-white/80" />
            <span className="text-white/95">{it}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
