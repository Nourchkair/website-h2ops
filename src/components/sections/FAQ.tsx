// src/components/sections/FAQ.tsx
"use client";
import * as React from "react";
import FullScreenScrollFX from "@/components/ui/full-screen-scroll-fx";

// Minimal accordion for answers (no extra deps)
function QAList({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = React.useState<number | null>(0);

  return (
    <div className="w-full max-w-3xl mx-auto text-left">
      {/* Smaller title: FAQ */}
      <h3 className="mb-3 text-white/90 text-sm md:text-base font-semibold tracking-wider uppercase">
        FAQ
      </h3>

      <div className="space-y-2 md:space-y-3">
        {items.map((it, i) => {
          const isOpen = open === i;
          return (
            <div
              key={i}
              className="rounded-xl border border-white/10 bg-black/35 backdrop-blur-sm overflow-hidden"
            >
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-3 md:gap-4 px-4 md:px-5 py-3 md:py-4 text-left"
              >
                <span className="text-white/90 text-[15px] md:text-base font-medium normal-case">
                  {it.q}
                </span>
                <span
                  className={`inline-grid place-items-center w-5 h-5 rounded-full border border-white/25 text-white/80 transition-transform ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>

              <div
                className={`grid transition-[grid-template-rows] duration-400 ease-out ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-4 md:px-5 pb-4 md:pb-5 text-white/70 leading-relaxed text-[13px] md:text-sm">
                    {it.a}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Smaller helper line; won’t overlay */}
      <p className="mt-3 md:mt-4 text-[10px] md:text-xs text-white/45 uppercase tracking-wide">
        Click a service on the side. Tap a question to expand.
      </p>
    </div>
  );
}

/* ---------- Service data (labels, backgrounds, FAQs) ---------- */
/* Use the exact same images as your Services section */
const BG = {
  agents: "/media/ai-agents.jpg",
  crm:
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format&fit=crop",
  systems: "/media/systems-management.jpg",
  ops:
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop",
  marketing: "/media/automated-marketing.jpg",
};

const SERVICES: Array<{
  key: string;
  label: string;
  background: string;
  faqs: { q: string; a: string }[];
}> = [
  {
    key: "agents",
    label: "AI Agents",
    background: BG.agents,
    faqs: [
      { q: "How fast can the agent pick up and reply?", a: "Sub-second on web/SMS and ~300–600ms on voice after greeting. Latency depends on provider and your scripts." },
      { q: "What integrations do you support?", a: "Calendars (Google/Outlook), CRMs (HubSpot, Salesforce, Pipedrive, GoHighLevel), Zapier/webhooks, Stripe, Slack, and custom REST." },
      { q: "Can the agent hand off to a human?", a: "Yes. Warm transfers on voice, Slack alerts, and human takeover on chat/SMS with transcript logging." },
      { q: "Is it compliant and safe?", a: "Event logging, optional PII redaction, and hosting in your cloud. You approve scripts and escalation rules." },
      { q: "How long to go live?", a: "Typically 1–2 weeks including discovery, scoping, build, QA, and training." },
    ],
  },
  {
    key: "crm",
    label: "CRM Optimization",
    background: BG.crm,
    faqs: [
      { q: "Which CRMs do you optimize?", a: "HubSpot, Salesforce, Pipedrive, Close, Zoho, GoHighLevel—and multi-tool data unification." },
      { q: "What deliverables should we expect?", a: "Data model & field mapping, pipeline design, SLAs/automations, dashboards, governance/runbook." },
      { q: "Will you migrate our data?", a: "Yes—schema mapping, dedupe, enrichment, historical import with rollbacks & QA." },
      { q: "How do you measure success?", a: "Speed-to-lead, conversion by stage, time-to-first-response, owner SLAs, reporting adoption." },
      { q: "Can you work with our RevOps team?", a: "Absolutely. We co-build, document, and hand off with training." },
    ],
  },
  {
    key: "systems",
    label: "Systems Management",
    background: BG.systems,
    faqs: [
      { q: "What’s included in ‘management’?", a: "Monitoring, bug fixes, small improvements, bi-weekly dashboards, structured change requests." },
      { q: "Is this 24/7?", a: "Default is business-hours SLAs; 24/7 options available for production-critical systems." },
      { q: "How do you communicate updates?", a: "Shared Slack channel + fortnightly exec summaries with metrics and recommendations." },
      { q: "What if we need a bigger change?", a: "Larger projects are scoped separately & scheduled without disrupting BAU." },
      { q: "Can you work within our security policies?", a: "Yes—least-privilege access, SSO, audit logs, vendor security reviews." },
    ],
  },
  {
    key: "ops",
    label: "Automated Processes (Ops)",
    background: BG.ops,
    faqs: [
      { q: "What ops workflows do you automate?", a: "Scheduling, billing, contract/doc workflows, approvals, notifications, data sync across tools." },
      { q: "Do you also build pages/funnels?", a: "Yes—conversion-first pages tied to CRM, calendars, payment, analytics; A/B tests & heatmaps." },
      { q: "How do you handle errors/failures?", a: "Retries, dead-letter queues (when needed), alerting and runbooks for fast recovery." },
      { q: "What’s the typical ROI?", a: "Often 2–5× in saved time and recovered revenue within 90 days." },
      { q: "Can we self-serve changes later?", a: "Everything is documented; we design safe configuration via env vars & admin UIs." },
    ],
  },
  {
    key: "marketing",
    label: "Automated Marketing",
    background: BG.marketing,
    faqs: [
      { q: "Which channels are supported?", a: "Email, SMS, voice drop, chat, and retargeting audiences—orchestrated by lead context." },
      { q: "How do you handle deliverability?", a: "Domain warmup, DMARC/SPF/DKIM, list hygiene, and cadence design to maximize inboxing." },
      { q: "Do you write sequences and objections?", a: "Yes—co-authored scripts & prompts, piloted and iterated from performance data." },
      { q: "Can you reactivate old leads?", a: "Core playbook. Segment by recency/intent; run personalized nudges to drive replies & bookings." },
      { q: "How is performance reported?", a: "Dashboards for reply rate, booking rate, pipeline influence, revenue attribution." },
    ],
  },
];

export function FAQ() {
  const sections = SERVICES.map((svc) => ({
    id: svc.key,
    background: svc.background, // ← FullScreenScrollFX uses this per section
    leftLabel: <span className="text-white">{svc.label}</span>,
    title: <QAList items={svc.faqs} />, // center content is the FAQ list for that service
    rightLabel: <span className="text-white">{svc.label}</span>,
  }));

  return (
    <section id="faq" className="relative bg-black">
      <FullScreenScrollFX
        sections={sections}
        header={
          <>
            {/* tiny overline */}
            <div className="text-white/60 text-[10px] md:text-xs tracking-[0.2em] uppercase">
              FAQ
            </div>
            {/* main line — smaller */}
            <div className="text-white text-[clamp(1rem,2.2vw,1.75rem)] leading-tight mt-1">
              Have questions? We’ve got answers
            </div>
          </>
        }
        footer={<div />}
        showProgress
        durations={{ change: 0.7, snap: 800 }}
        colors={{
          pageBg: "#000000",
          stageBg: "#000000",
          overlay: "rgba(0,0,0,0.20)",
          text: "rgba(255,255,255,0.95)",
        }}
      />
    </section>
  );
}

export default FAQ;
