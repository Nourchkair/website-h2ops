// src/components/sections/WhyUs.tsx
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import ScrollExpandMedia from "../ui/scroll-expansion-hero";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play, Pause } from "lucide-react";

/** Light emphasis inside the paragraph */
const Highlight = ({ children }: { children: React.ReactNode }) => (
  <strong className="font-semibold text-[1.06em] sm:text-[1.07em] md:text-[1.08em]">
    {children}
  </strong>
);

// Base-aware helper (works with Vite dev + production subpaths)
const pub = (file: string) => `${import.meta.env.BASE_URL}${file}`;

const WhyUs: React.FC = () => {
  const videoSrc = useMemo(() => {
    if (typeof window === "undefined") return "/media/why-us-1080.mp4";
    return window.innerWidth < 1024 ? "/media/why-us-720.mp4" : "/media/why-us-1080.mp4";
  }, []);

  const contentScrollerRef = useRef<HTMLDivElement | null>(null);

  // ▶️ Video refs/state
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Lock to prevent scroll-driven autoplay after user paused
  const userPausedLockRef = useRef(false);
  const internalActionRef = useRef(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const id1 = requestAnimationFrame(() => ScrollTrigger.refresh());
    const id2 = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      cancelAnimationFrame(id1);
      cancelAnimationFrame(id2);
    };
  }, []);

  const playVideo = () => {
    const vid = videoRef.current;
    if (!vid) return;
    internalActionRef.current = true;
    userPausedLockRef.current = false;
    vid.play().catch(() => {}).finally(() => {
      setTimeout(() => (internalActionRef.current = false), 0);
    });
  };

  const pauseVideo = () => {
    const vid = videoRef.current;
    if (!vid) return;
    internalActionRef.current = true;
    userPausedLockRef.current = true;
    vid.pause();
    setTimeout(() => (internalActionRef.current = false), 0);
  };

  const togglePlay = () => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.paused ? playVideo() : pauseVideo();
  };

  // Wire up the underlying <video>
  useEffect(() => {
    if (!sectionRef.current) return;
    const vid = sectionRef.current.querySelector("video") as HTMLVideoElement | null;
    videoRef.current = vid || null;
    if (!vid) return;

    const onPlay = () => {
      if (userPausedLockRef.current && !internalActionRef.current) {
        vid.pause(); // cancel external autoplay
        return;
      }
      setIsPlaying(true);
    };
    const onPause = () => setIsPlaying(false);
    const onClick = (e: Event) => {
      e.preventDefault();
      togglePlay();
    };

    setIsPlaying(!vid.paused);
    const prevCursor = vid.style.cursor;
    vid.style.cursor = "pointer";

    vid.addEventListener("play", onPlay);
    vid.addEventListener("pause", onPause);
    vid.addEventListener("click", onClick);

    return () => {
      vid.removeEventListener("play", onPlay);
      vid.removeEventListener("pause", onPause);
      vid.removeEventListener("click", onClick);
      vid.style.cursor = prevCursor;
    };
  }, [videoSrc]);

  return (
    <section className="relative" id="why-us" ref={sectionRef}>
      <ScrollExpandMedia
        mediaType="video"
        mediaSrc={videoSrc}
        posterSrc="/media/why-bg.jpg"
        bgImageSrc="/media/why-bg.jpg"
        title="Why H2Ops"
        date="Scroll to expand video"
        scrollToExpand="Scroll to reveal our edge"
        textBlend
        contentRef={contentScrollerRef}
        onAfterExpand={() => ScrollTrigger.refresh()}
      >
        {/* Overlay lives INSIDE the media container, so it stays on the video */}
        <div className="pointer-events-none absolute inset-0">
          {/* Play/Pause — higher on mobile, next to mute on larger screens */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
            aria-label={isPlaying ? "Pause video" : "Play video"}
            className="
              pointer-events-auto absolute
              bottom-20 right-[4.5rem]      /* mobile: higher */
              sm:bottom-3 sm:right-[4.5rem] /* desktop/tablet: near mute */
              z-30 inline-flex items-center justify-center
              h-9 w-9 rounded-full
              bg-black/60 hover:bg-black/70
              border border-white/20 text-white
              backdrop-blur transition
            "
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
        </div>
      </ScrollExpandMedia>

      {/* Post-video content */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12 md:py-14">
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
