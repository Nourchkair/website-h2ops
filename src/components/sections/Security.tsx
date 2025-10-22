"use client";

import React from "react";
import { SectionTitle } from "../ui/SectionTitle";
import DatabaseWithRestApi from "@/components/ui/database-with-rest-api";

export function Security() {
  return (
    <section className="relative py-32 overflow-hidden bg-transparent">
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
        <SectionTitle
          title="Security = Success"
          subtitle="Safeguards to keep your Automations safe, compliant, and resilient"
          className="mb-12 text-center"            // ⬅️ center the heading block
        />

        {/* Center the diagram */}
        <div className="mx-auto w-full max-w-[820px] flex justify-center">
          <DatabaseWithRestApi
            className="mx-auto bg-transparent"      // ⬅️ ensure the component itself centers
            lightsInSync
            lightDuration={3.5}
            lightSize={2}
            glowStrength={8}
            title="Where Security & Reliability create Success and Trust"
            pillClassName="px-5 py-2 md:px-6 md:py-2.5 text-sm md:text-base font-medium min-w-[240px] text-center"
            pillGapClassName="gap-4 md:gap-6"
          />
        </div>
      </div>
    </section>
  );
}

export default Security;
