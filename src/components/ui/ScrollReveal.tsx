"use client";

import React, { useEffect, useRef, useMemo } from "react";
import type { RefObject, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ScrollReveal.module.css";

gsap.registerPlugin(ScrollTrigger);

type ScrollRevealProps<TTag extends keyof JSX.IntrinsicElements = "div"> = {
  children: string | ReactNode;
  as?: TTag; // NEW: choose the element tag, defaults to 'div'
  scrollContainerRef?: RefObject<HTMLElement>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
} & JSX.IntrinsicElements[TTag];

const ScrollReveal = <TTag extends keyof JSX.IntrinsicElements = "div">({
  children,
  as,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = "",
  textClassName = "",
  rotationEnd = "bottom bottom",
  wordAnimationEnd = "bottom bottom",
  ...rest
}: ScrollRevealProps<TTag>) => {
  const Tag = (as || "div") as any;
  const containerRef = useRef<HTMLElement | null>(null);
  const tweensRef = useRef<gsap.core.Tween[]>([]);

  const splitText = useMemo(() => {
    if (typeof children !== "string") return children;
    return children.split(/(\s+)/).map((chunk, i) => {
      if (/^\s+$/.test(chunk)) return <React.Fragment key={`ws-${i}`}>{chunk}</React.Fragment>;
      return (
        <span className={styles.word} key={`w-${i}`}>
          {chunk}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current as HTMLElement | null;
    if (!el) return;

    const scroller =
      scrollContainerRef?.current ?? (typeof window !== "undefined" ? window : undefined);
    if (!scroller) return;

    // kill previous tweens (hot reload safe)
    tweensRef.current.forEach((t) => {
      t.scrollTrigger?.kill();
      t.kill();
    });
    tweensRef.current = [];

    const rotateTween = gsap.fromTo(
      el,
      { transformOrigin: "0% 50%", rotate: baseRotation },
      {
        ease: "none",
        rotate: 0,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: "top bottom",
          end: rotationEnd,
          scrub: true,
        },
      }
    );

    const words = el.querySelectorAll<HTMLElement>(`.${styles.word}`);
    const fadeTween = gsap.fromTo(
      words,
      { opacity: baseOpacity, willChange: "opacity" },
      {
        ease: "none",
        opacity: 1,
        stagger: 0.05,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: "top bottom-=20%",
          end: wordAnimationEnd,
          scrub: true,
        },
      }
    );

    let blurTween: gsap.core.Tween | null = null;
    if (enableBlur) {
      blurTween = gsap.fromTo(
        words,
        { filter: `blur(${blurStrength}px)` },
        {
          ease: "none",
          filter: "blur(0px)",
          stagger: 0.05,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: "top bottom-=20%",
            end: wordAnimationEnd,
            scrub: true,
          },
        }
      );
    }

    tweensRef.current = [rotateTween, fadeTween, ...(blurTween ? [blurTween] : [])];

    return () => {
      tweensRef.current.forEach((t) => {
        t.scrollTrigger?.kill();
        t.kill();
      });
      tweensRef.current = [];
    };
  }, [
    scrollContainerRef,
    enableBlur,
    baseOpacity,
    baseRotation,
    blurStrength,
    rotationEnd,
    wordAnimationEnd,
  ]);

  return (
    <Tag
      ref={containerRef as any}
      className={`${styles.scrollReveal} ${styles.text} ${containerClassName} ${textClassName}`}
      {...rest}
    >
      {splitText}
    </Tag>
  );
};

export default ScrollReveal;
