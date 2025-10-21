"use client";
import React from "react";
import Aurora from "@/components/ui/backgrounds/Aurora";
import Particles from "@/components/ui/particles/Particles";

export default function BackgroundAuroraParticles() {
  return (
    <>
      {/* Aurora behind */}
      <div className="pointer-events-none fixed inset-0 -z-20">
        <Aurora
          colorStops={["#3B0075", "#000000", "#0E0075"]}
          blend={1.0}
          amplitude={1.0}
          speed={0.1}
        />
      </div>

      {/* Particles in front */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <Particles
          className="w-full h-full"
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={600}
          particleSpread={30}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>
    </>
  );
}
