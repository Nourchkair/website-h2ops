"use client" 

import * as React from "react"

import { cn } from "@/lib/utils";
import { motion, useAnimation } from "framer-motion";
import { Magnet } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";

interface MagnetizeButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    particleCount?: number;
    attractRadius?: number;
}

interface Particle {
    id: number;
    x: number;
    y: number;
}

function MagnetizeButton({
    className,
    particleCount = 12,
    attractRadius = 50,
    children,
    ...props
}: MagnetizeButtonProps) {
    const [isAttracting, setIsAttracting] = useState(false);
    const [particles, setParticles] = useState<Particle[]>([]);
    const particlesControl = useAnimation();

    useEffect(() => {
        const newParticles = Array.from({ length: particleCount }, (_, i) => ({
            id: i,
            x: Math.random() * 360 - 180,
            y: Math.random() * 360 - 180,
        }));
        setParticles(newParticles);
    }, [particleCount]);

    const handleInteractionStart = useCallback(async () => {
        setIsAttracting(true);
        await particlesControl.start({
            x: 0,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 50,
                damping: 10,
            },
        });
    }, [particlesControl]);

    const handleInteractionEnd = useCallback(async () => {
        setIsAttracting(false);
        await particlesControl.start((i) => ({
            x: particles[i]?.x || 0,
            y: particles[i]?.y || 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
            },
        }));
    }, [particlesControl, particles]);

    return (
        <Button
            className={cn(
                "min-w-40 relative touch-none",
                "bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900 dark:to-cyan-900",
                "hover:from-blue-200 hover:to-cyan-200 dark:hover:from-blue-800 dark:hover:to-cyan-800",
                "text-blue-600 dark:text-cyan-300",
                "border border-blue-300 dark:border-cyan-700",
                "transition-all duration-300",
                className
            )}
            onMouseEnter={handleInteractionStart}
            onMouseLeave={handleInteractionEnd}
            onTouchStart={handleInteractionStart}
            onTouchEnd={handleInteractionEnd}
            {...props}
        >
            {particles.map((particle, index) => (
                <motion.div
                    key={index}
                    custom={index}
                    initial={{ x: particle.x, y: particle.y }}
                    animate={particlesControl}
                    className={cn(
                        "absolute w-1.5 h-1.5 rounded-full",
                        "bg-gradient-to-r from-blue-400 to-cyan-400 dark:from-blue-300 dark:to-cyan-300",
                        "transition-opacity duration-300",
                        isAttracting ? "opacity-100" : "opacity-40"
                    )}
                />
            ))}
            <span className="relative w-full flex items-center justify-center gap-2">
                {children || (
                    <>
                        <Magnet
                            className={cn(
                                "w-4 h-4 transition-transform duration-300",
                                isAttracting && "scale-110"
                            )}
                        />
                        {isAttracting ? "Attracting" : "Hover me"}
                    </>
                )}
            </span>
        </Button>
    );
}

export { MagnetizeButton }