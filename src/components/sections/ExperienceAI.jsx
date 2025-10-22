// src/components/sections/ExperienceAI.jsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SplineScene } from "../ui/splite";
import { MagnetizeButton } from "@/components/ui/magnetize-button";
import { useNavigate } from "react-router-dom";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export function ExperienceAI() {
  const navigate = useNavigate();
  const [showWidget, setShowWidget] = useState(false);

  const handleStartNow = () => {
    navigate('/contact');
  };

  return (
    <section id="experience-ai" className="py-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <motion.h2
          className="text-4xl font-bold text-center mb-12 font-display"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          Experience AI in Action
        </motion.h2>

        <div className="relative mx-auto w-full max-w-5xl h-[520px] rounded-3xl overflow-hidden">
          {/* Background */}
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="absolute inset-0 w-full h-full"
          />

          {/* CTA */}
          <div className="absolute z-30 left-1/2 -translate-x-1/2 top-[0.03%]">
            <MagnetizeButton
              onClick={handleStartNow}
              className="px-6 py-2.5 text-sm sm:text-base font-medium"
              particleCount={8}
            >
              Start Now
            </MagnetizeButton>
          </div>

          {/* Synthflow Widget */}
          <AnimatePresence initial={false} mode="popLayout">
            {showWidget && (
              <motion.div
                key="synthflow-widget"
                className="absolute left-10 top-[25%] -translate-y-1/2 z-30"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <iframe
                  id="audio_iframe"
                  src="https://widget.synthflow.ai/widget/v2/6b91a803-69da-4e59-88cd-348724b95538/1759080003539x599550244772135400"
                  allow="microphone"
                  width="400px"
                  height="550px"
                  style={{
                    position: 'relative',
                    background: 'transparent',
                    border: 'none',
                    zIndex: 999,
                    pointerEvents: 'auto'
                  }}
                  scrolling="no"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
