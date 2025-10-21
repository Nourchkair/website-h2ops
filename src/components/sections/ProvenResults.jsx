import React from "react";
import { TrendingUp, Clock, Target, Shield } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { SectionTitle } from "../ui/SectionTitle";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const scaleIn = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

function Counter({ end, duration = 2, suffix = "", prefix = "" }) {
  const [count, setCount] = React.useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  React.useEffect(() => {
    if (!isInView) return;
    let startTime;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration, isInView]);

  return <span ref={ref} className="tabular-nums">{prefix}{count}{suffix}</span>;
}

export function ProvenResults() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const metrics = [
    { icon: <TrendingUp className="w-8 h-3.5" />, value: 500, suffix: "+", label: "Leads Captured", description: "Daily automated lead capture across all channels" },
    { icon: <Clock className="w-8 h-8" />, value: 99.9, suffix: "%", label: "Uptime", description: "Enterprise-grade system reliability" },
    { icon: <Target className="w-8 h-8" />, value: 24, suffix: "/7", label: "AI Support", description: "Round-the-clock intelligent assistance" },
    { icon: <Shield className="w-8 h-8" />, value: 3, suffix: "x", label: "ROI Increase", description: "Average revenue growth for our clients" }
  ];

  return (
    <section className="relative py-32 overflow-hidden bg-black">
      {/* Animated Background Elements (kept). Add pointer-events-none so they don't block clicks */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: Math.random() * 2, ease: "easeInOut" }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
        <SectionTitle
          title="Proven Results"
          subtitle="Real metrics from businesses that chose premium automation"
          className="mb-20"
        />

        <motion.div
          ref={ref}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {metrics.map((metric, index) => (
            <motion.div key={metric.label} className="text-center group" variants={scaleIn} custom={index * 0.1}>
              <div className="glass-effect p-6 rounded-2xl premium-shadow group-hover:scale-105 transition-all duration-300">
                <div className="text-blue-400 mb-4 flex justify-center group-hover:text-purple-400 transition-colors duration-300">
                  {metric.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2 font-display">
                  <Counter end={metric.value} suffix={metric.suffix} />
                </div>
                <div className="text-white/70 text-sm uppercase tracking-wide mb-2">{metric.label}</div>
                <div className="text-white/60 text-xs leading-relaxed">{metric.description}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
