import React from "react";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";
import BackgroundAuroraParticles from "@/components/layout/BackgroundAuroraParticles";

export function ContactPage() {
  return (
    <>
      <BackgroundAuroraParticles />

      <main className="relative z-10 min-h-screen w-full text-white">
        <div className="pt-20">
          <Contact />
        </div>
        <Footer />
      </main>
    </>
  );
}

export default ContactPage;
