// src/components/nav/Nav.tsx (or wherever your Nav lives)
"use client";

import React from "react";
import StaggeredMenu from "../staggered/StaggeredMenu"; // adjust the path to where your StaggeredMenu.tsx is

export function Nav() {
  // These IDs should match your page sections
  const menuItems = [
    { label: "Home", ariaLabel: "Go to home", link: "#home" },
    { label: "Results", ariaLabel: "Go to results", link: "#results" },
    { label: "Services", ariaLabel: "Go to services", link: "#services" },
    { label: "Experience AI", ariaLabel: "Go to Experience AI", link: "#experience-ai" },
    { label: "About", ariaLabel: "Go to about", link: "#about" },
    { label: "Security", ariaLabel: "Go to security", link: "#security" },
    { label: "FAQ", ariaLabel: "Go to FAQ", link: "#faq" },
    { label: "Contact", ariaLabel: "Go to contact", link: "#contact" },
  ];

  const socialItems = [
    { label: "Twitter", link: "https://twitter.com" },
    { label: "GitHub", link: "https://github.com" },
    { label: "LinkedIn", link: "https://linkedin.com" },
  ];

  return (
    // Fixed, full-viewport mount so the panel can slide over the page
    <div className="fixed inset-0 z-[60] pointer-events-none">
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
        colors={["#B19EEF", "#5227FF"]}
        logoUrl="/IMG_4985.png"          // your logo
        accentColor="#4f46e5"            // indigo-600
        // These callbacks are optional
        onMenuOpen={() => console.log("Menu opened")}
        onMenuClose={() => console.log("Menu closed")}
        // NEW props (if you use the enhanced StaggeredMenu below):
        closeOnItemClick={true}
        onItemClick={(item) => {
          // Smooth-scroll for hash links; otherwise let normal navigation happen
          if (item.link?.startsWith("#")) {
            const id = item.link.slice(1);
            const el = document.getElementById(id);
            if (el) {
              el.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
            }
          }
        }}
      />
    </div>
  );
}

export default Nav;
