// src/App.tsx
import "./styles/logoloop.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Footer } from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import WhyUs from "./components/sections/WhyUs";
import Services from "./components/sections/Services";
import PoweredBy from "./components/sections/PoweredBy";
import About from "./components/sections/About"; // (ok to remove if unused)
import { Security } from "./components/sections/Security";
import BackgroundAuroraParticles from "./components/layout/BackgroundAuroraParticles";
import StaggeredMenu from "./components/staggered/StaggeredMenu";
import RealOutcomes from "./components/sections/RealOutcomes";
import CtaNearMenu from "./components/layout/CtaNearMenu";

// ✅ Same button used in Hero (matches earlier usage)
import { ButtonColorful } from "@/components/ui/button-colorful";

function App() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const id = "app-fonts-link";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.href =
        "https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap";
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
  }, []);

  const menuItems = [
    { label: "Home", ariaLabel: "Go to home", link: "#home" },
    { label: "About", ariaLabel: "Go to about", link: "#why-us-anchor" },
    { label: "Outcomes", ariaLabel: "Go to outcomes", link: "#outcomes" },
    { label: "Services", ariaLabel: "Go to services", link: "#services" },
    { label: "Security", ariaLabel: "Go to security", link: "#security" },
  ];

  const socialItems = [
    { label: "TikTok", link: "https://tiktok.com" },
    { label: "Instagram", link: "https://www.instagram.com/horizon2operations?igsh=NGdpOGJ6cXFxaGps" },
    { label: "LinkedIn", link: "https://linkedin.com" },
  ];

  return (
    <>
      <BackgroundAuroraParticles />

      {/* Desktop CTA (unchanged) */}
      <div className="hidden sm:block">
        <CtaNearMenu />
      </div>

      {/* Mobile CTA: show ONLY when the menu is open, under the Close/Menu button */}
      {menuOpen && (
        <div className="sm:hidden fixed z-[96] right-4 top-16 pointer-events-auto">
          <button
            onClick={() => navigate('/contact')}
            className="block"
          >
            <ButtonColorful label="Let's talk" variant="blue" className="font-semibold" />
          </button>
        </div>
      )}

      {/* Staggered menu overlay */}
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
          onMenuOpen={() => setMenuOpen(true)}
          onMenuClose={() => setMenuOpen(false)}
        />
      </div>

      {/* SINGLE main */}
      <main id="main-content" className="relative z-10 min-h-[100svh] w-full text-white bg-transparent">
        <section id="home">
          <Hero />
        </section>

        <section id="why-us-anchor">
          <WhyUs />
        </section>

        {/* Real Outcomes */}
        <RealOutcomes />

        <div id="services">
          <section
            id="services-title"
            className="relative isolate w-full bg-transparent pt-6 sm:pt-8 md:pt-10 lg:pt-2 pb-0"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="w-full max-w-2xl z-20 text-center mx-auto">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-2 sm:mb-3 tracking-tight leading-tight">
                  Our Solutions
                </h2>
              </div>
            </div>
          </section>
        </div>

        <div id="service-cards">
          <Services />
        </div>

        <PoweredBy />

        <div id="security">
          <Security />
        </div>

        <Footer />
      </main>
    </>
  );
}

export default App;
