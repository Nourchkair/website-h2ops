// src/components/sections/Hero.jsx
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ButtonColorful } from "@/components/ui/button-colorful";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { SplineScene } from "../ui/splite";
import { useNavigate } from "react-router-dom";

const ROTATING = ["Trades", "Brokerages", "B2B"];
const ROTATE_MS = 2000; // slow rotation

export default function Hero() {
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const wrapRef = useRef(null);

  const [ready, setReady] = useState(false);
  const DELAY = prefersReducedMotion ? 0.1 : isMobile ? 0.6 : 1.0;

  useEffect(() => {
    const t = setTimeout(() => setReady(true), DELAY * 1000);
    return () => clearTimeout(t);
  }, [DELAY]);

  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (prefersReducedMotion) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % ROTATING.length), ROTATE_MS);
    return () => clearInterval(id);
  }, [prefersReducedMotion]);

  return (
    <section
      id="home"
      className="relative min-h-[100svh] w-full overflow-hidden flex items-center justify-center px-4 md:px-6"
    >
      {/* BACKGROUND ROBOT — interactive */}
      <div
        ref={wrapRef}
        className="absolute inset-0 z-10 grid place-items-center" // <— pointer events enabled
      >
        <div className="w-[92vw] max-w-[1200px] aspect-[16/10] sm:aspect-[16/9] cursor-grab active:cursor-grabbing">
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
        {/* Vignette should NOT block the canvas */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.25)_0%,rgba(0,0,0,0.55)_60%,rgba(0,0,0,0.75)_100%)]" />
      </div>

      {/* FOREGROUND CONTENT */}
      <div className="relative z-30 w-full max-w-4xl mx-auto text-center mt-[12vh] sm:mt-[14vh] lg:mt-[18vh]">

        {/* H1 */}
        <motion.h1
          className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-tight"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 8 }}
          animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : (prefersReducedMotion ? 0 : 8) }}
          transition={{ delay: DELAY + 0.1, duration: prefersReducedMotion ? 0.15 : 0.6, ease: "easeOut" }}
        >
          Acquire. Convert. Deliver.{" "}
          <span className="opacity-90"> Automatically.</span>
        </motion.h1>

        {/* Subhead with rotating term (left-aligned within fixed width) */}
        <motion.p
          className="mt-3 sm:mt-4 text-base xs:text-lg sm:text-xl md:text-2xl text-white/85 leading-relaxed"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 8 }}
          animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : (prefersReducedMotion ? 0 : 8) }}
          transition={{ delay: DELAY + 0.35, duration: prefersReducedMotion ? 0.15 : 0.6, ease: "easeOut" }}
        >
          The AI growth partner for fast-moving{" "}
          <span className="relative inline-block align-baseline">
            {/* invisible width calibrator */}
            <span className="invisible block text-xl sm:text-2xl md:text-3xl font-semibold px-2">
              Brokerages
            </span>
            {/* rotating, left-aligned word */}
            <span className="absolute inset-y-0 left-0 flex items-center">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={idx}
                  initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  animate={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.45, ease: "easeOut" }}
                  className="px-2"
                >
                  <span className="text-xl sm:text-2xl md:text-3xl font-semibold text-sky-300">
                    {ROTATING[idx]}
                  </span>
                </motion.span>
              </AnimatePresence>
            </span>
          </span>
        </motion.p>

        {/* CTA */}
        <motion.div
          className="mt-6 sm:mt-8 flex items-center justify-center"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
          animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : (prefersReducedMotion ? 0 : 16) }}
          transition={{ delay: DELAY + 0.6, duration: prefersReducedMotion ? 0.2 : 0.7, ease: "easeOut" }}
        >
          <button
            onClick={() => navigate('/contact')}
            className="hover:scale-[1.03] active:scale-[0.99] transition-transform touch-manipulation"
            style={{ minHeight: "44px", minWidth: "44px" }}
          >
            <ButtonColorful
              label="Let's talk"
              variant="blue"
              className="font-semibold text-sm sm:text-base px-6"
            />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
