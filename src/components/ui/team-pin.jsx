"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function TeamPin({ children, className, containerClassName }) {
  const [transform, setTransform] = useState("translate(-50%,-50%) rotateX(0deg)");

  const onMouseEnter = () => setTransform("translate(-50%,-50%) rotateX(40deg) scale(0.8)");
  const onMouseLeave = () => setTransform("translate(-50%,-50%) rotateX(0deg) scale(1)");

  return (
    <div
      className={cn("relative group/pin z-10 cursor-pointer", containerClassName)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* 3D panel */}
      <div
        style={{ perspective: "1000px", transform: "rotateX(70deg) translateZ(0deg)" }}
        className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2"
      >
        <div
          style={{ transform }}
          className="absolute left-1/2 top-1/2 p-4 flex justify-start items-start rounded-2xl shadow-[0_8px_16px_rgb(0,0,0/0.4)] bg-black border border-white/10 group-hover/pin:border-white/20 transition duration-700 overflow-hidden"
        >
          <div className={cn("relative z-50", className)}>{children}</div>
        </div>
      </div>

      {/* Hover overlay: two founder cards */}
      <motion.div
        className="pointer-events-none w-[34rem] max-w-[92vw] h-80 flex items-center justify-center opacity-0 group-hover/pin:opacity-100 z-[60] transition duration-500"
        initial={false}
      >
        <div className="w-full h-full -mt-7 relative">
          <div
            style={{ perspective: "1000px", transform: "rotateX(70deg) translateZ(0)" }}
            className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0, x: "-50%", y: "-50%" }}
              animate={{ opacity: [0, 1, 0.5, 0], scale: 1 }}
              transition={{ duration: 6, repeat: Infinity, delay: 0 }}
              className="absolute left-1/2 top-1/2 h-[11.25rem] w-[11.25rem] rounded-[50%] bg-sky-500/10 shadow-[0_8px_16px_rgb(0,0,0/0.4)]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0, x: "-50%", y: "-50%" }}
              animate={{ opacity: [0, 1, 0.5, 0], scale: 1 }}
              transition={{ duration: 6, repeat: Infinity, delay: 2 }}
              className="absolute left-1/2 top-1/2 h-[11.25rem] w-[11.25rem] rounded-[50%] bg-sky-500/10 shadow-[0_8px_16px_rgb(0,0,0/0.4)]"
            />
          </div>

          <div className="absolute inset-x-0 top-8 mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 px-4 pointer-events-none">
            <HoverCard
              name="Sammi Ali"
              title="Co-Founder • Managing Partner"
              img="https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=400&auto=format&fit=crop"
            />
            <HoverCard
              name="Nour Chkair"
              title="Co-Founder • Managing Partner"
              img="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop"
            />
          </div>

          <motion.div className="absolute right-1/2 bottom-1/2 bg-gradient-to-b from-transparent to-cyan-500 translate-y-[14px] w-px h-20 group-hover/pin:h-40 blur-[2px]" />
          <motion.div className="absolute right-1/2 bottom-1/2 bg-gradient-to-b from-transparent to-cyan-500 translate-y-[14px] w-px h-20 group-hover/pin:h-40" />
          <motion.div className="absolute right-1/2 translate-x-[1.5px] bottom-1/2 bg-cyan-600 translate-y-[14px] w-[4px] h-[4px] rounded-full z-40 blur-[3px]" />
          <motion.div className="absolute right-1/2 translate-x-[0.5px] bottom-1/2 bg-cyan-300 translate-y-[14px] w-[2px] h-[2px] rounded-full z-40" />
        </div>
      </motion.div>
    </div>
  );
}

function HoverCard({ name, title, img }) {
  return (
    <div className="pointer-events-none backdrop-blur-sm bg-white/[0.04] border border-white/10 rounded-2xl p-4 flex items-center gap-4 shadow-[0_8px_24px_rgba(0,0,0,0.45)]">
      <img
        src={img}
        alt={name}
        className="h-14 w-14 rounded-xl object-cover border border-white/10"
        draggable={false}
      />
      <div>
        <div className="text-white font-semibold">{name}</div>
        <div className="text-white/70 text-sm">{title}</div>
      </div>
    </div>
  );
}

export default TeamPin;