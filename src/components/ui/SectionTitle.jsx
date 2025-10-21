import React from "react";
import { motion, useInView } from "framer-motion";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
  }
};

export function SectionTitle({ title, subtitle, centered = true, className = "" }) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      className={`${centered ? 'text-center' : ''} ${className}`}
      variants={staggerContainer}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.h2
        className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-white mb-6 leading-tight"
        variants={fadeInUp}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed"
          variants={fadeInUp}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}