import React from "react";
import { motion } from "framer-motion";

export function MagneticButton({ 
  children, 
  className = "", 
  variant = "primary", 
  size = "md",
  onClick,
  ...props 
}) {
  const ref = React.useRef(null);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) * 0.15;
    const deltaY = (e.clientY - centerY) * 0.15;
    
    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseClasses = "relative overflow-hidden font-medium transition-all duration-300 rounded-full cursor-pointer";
  
  const variants = {
    primary: "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-xl hover:shadow-blue-500/25",
    secondary: "glass-effect text-white border border-white/20 hover:border-white/40",
    outline: "border-2 border-white/30 text-white hover:bg-white/10"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
    xl: "px-10 py-5 text-xl"
  };

  return (
    <motion.button
      ref={ref}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 20
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 hover:opacity-100 transition-opacity duration-300" />
    </motion.button>
  );
}