import React from "react";
import { motion } from "framer-motion";

/**
 * ElectricTree
 * - Draws each path sequentially using stroke pathLength animation.
 * - No pulsing/coloring; pure line draw.
 *
 * Props:
 *  - paths: Array<{ d: string, startFromEnd?: boolean }>
 *  - stroke: CSS color (default "#FFFFFF")
 *  - strokeWidth: number (default 10)
 *  - duration: seconds per path (default 0.9)
 *  - stagger: seconds between paths (default 0.15)
 *  - className: sizing from parent (e.g., "h-[300px] w-auto")
 */
export default function ElectricTree({
  paths,
  stroke = "#FFFFFF",
  strokeWidth = 10,
  duration = 0.9,
  stagger = 0.15,
  className = "",
}) {
  return (
    <svg
      viewBox="0 0 1024 1024"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {paths.map(({ d, startFromEnd }, i) => (
        <motion.path
          key={i}
          d={d}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          initial={
            startFromEnd
              ? { pathLength: 0, pathOffset: 1 }
              : { pathLength: 0, pathOffset: 0 }
          }
          animate={{ pathLength: 1, pathOffset: 0 }}
          transition={{
            duration,
            ease: "easeInOut",
            delay: i * stagger,
          }}
        />
      ))}
    </svg>
  );
}