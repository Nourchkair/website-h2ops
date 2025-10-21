// src/components/ui/scroll-expansion-hero.tsx
'use client';

import React, { useEffect, useRef, useState, ReactNode } from 'react';
import { motion } from 'framer-motion';

export interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
}

const clamp = (v: number, min = 0, max = 1) => Math.min(Math.max(v, min), max);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const ScrollExpandMedia = ({
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  children,
}: ScrollExpandMediaProps) => {
  // Scroller region (drives the animation)
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0); // 0..1 inside scroller
  const [isMobile, setIsMobile] = useState(false);
  const [vw, setVw] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [vh, setVh] = useState<number>(typeof window !== 'undefined' ? window.innerHeight : 800);

  // Video + audio control (local MP4)
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [userWantsSound, setUserWantsSound] = useState(false); // true after user clicks Unmute
  const prevProgressRef = useRef(0);

  const isYouTube = /youtube\.com|youtu\.be/.test(mediaSrc);

  // Map progress to audible volume (fade in near fully-expanded)
  const calcAudibility = (p: number, inView: boolean) => {
    if (!inView) return 0; // out of section => silent
    const start = 0.85; // begin fade-in
    const end = 0.98;   // fully audible
    if (p <= start) return 0;
    if (p >= end) return 1;
    return (p - start) / (end - start);
  };

  // Apply effective audio to <video>
  const applyAudio = (inView: boolean) => {
    const el = videoRef.current;
    if (!el || isYouTube) return;

    if (!userWantsSound) {
      el.muted = true;
      try { el.volume = 0; } catch {}
      return;
    }

    const aud = calcAudibility(progress, inView);
    try { el.volume = aud; } catch {}
    el.muted = aud === 0;
    if (aud > 0) {
      try { void el.play(); } catch {}
    }
  };

  // Scroll/resize observers -> update progress & audio
  useEffect(() => {
    const onScroll = () => {
      const el = scrollerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = Math.max(rect.height - window.innerHeight, 1);
      const scrolled = clamp(-rect.top, 0, total);
      setProgress(scrolled / total);

      const inView = rect.bottom > 0 && rect.top < window.innerHeight;
      applyAudio(inView);
    };
    const onResize = () => {
      setIsMobile(window.innerWidth < 768);
      setVw(window.innerWidth);
      setVh(window.innerHeight);
      const rect = scrollerRef.current?.getBoundingClientRect();
      const inView = !!rect && rect.bottom > 0 && rect.top < window.innerHeight;
      applyAudio(inView);
    };

    onResize();
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userWantsSound]);

  // Re-apply audio on progress change
  useEffect(() => {
    const rect = scrollerRef.current?.getBoundingClientRect();
    const inView = !!rect && rect.bottom > 0 && rect.top < window.innerHeight;
    applyAudio(inView);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress]);

  // Instantly mute when collapsing (scrolling up)
  useEffect(() => {
    const el = videoRef.current;
    if (!el || isYouTube) {
      prevProgressRef.current = progress;
      return;
    }
    const prev = prevProgressRef.current;
    const collapsing = progress < prev - 0.003; // small threshold to avoid jitter
    if (collapsing) {
      try { el.volume = 0; } catch {}
      el.muted = true; // keep userWantsSound flag; fade can resume on next downward scroll
    }
    prevProgressRef.current = progress;
  }, [progress, isYouTube]);

  // ---- Portrait → Landscape morph (match your original start size) ----
  // Start ~300x400 desktop, ~270x360 mobile (3:4 portrait), end at 16:9 landscape
  const START_H = isMobile ? 360 : 400; // starting HEIGHT
  const ASP_START = 3 / 4;              // 3:4 portrait
  const START_W = Math.round(START_H * ASP_START);

  const END_W = isMobile ? 900 : 1400;  // target landscape width
  const ASP_END = 16 / 9;               // 16:9 landscape

  // Interpolate width & aspect
  const targetW = lerp(START_W, END_W, progress);
  const targetAspect = lerp(ASP_START, ASP_END, progress);
  const targetH = targetW / targetAspect;

  // Constrain to viewport (preserve aspect)
  const maxW = vw * 0.95;
  const maxH = vh * 0.85;
  const scale = Math.min(maxW / targetW, maxH / targetH, 1);
  const mediaWidth = Math.round(targetW * scale);
  const mediaHeight = Math.round(targetH * scale);

  const textTranslateX = progress * (isMobile ? 180 : 150);
  const showContent = progress >= 0.85; // reveal content + show mute button

  const firstWord = title ? title.split(' ')[0] : '';
  const restOfTitle = title ? title.split(' ').slice(1).join(' ') : '';

  const toggleSound = () => {
    if (isYouTube) return; // handled separately if needed
    const el = videoRef.current;
    if (!el) return;
    const next = !userWantsSound;
    setUserWantsSound(next);
    if (next) {
      // user opted-in to sound; actual volume handled by applyAudio()
      try {
        el.muted = false;
        void el.play();
      } catch {}
    } else {
      try { el.volume = 0; } catch {}
      el.muted = true;
    }
  };

  return (
    <div className="relative">
      {/* Shorter scroller: 160vh with a 90dvh sticky stage offset 5vh from the top */}
      <div ref={scrollerRef} className="relative h-[250vh]">
        <div className="sticky top-[5vh] h-[90dvh]">
          {/* Background */}
          <motion.div
            className="absolute inset-0 z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 - progress }}
            transition={{ duration: 0.2 }}
          >
            <img
              src={bgImageSrc}
              alt="Background"
              className="w-screen h-screen object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-black/10" />
          </motion.div>

          {/* Foreground */}
          <div className="relative z-10 w-full h-full">
            <div className="container mx-auto flex flex-col items-center justify-center w-full h-full relative">
              {/* Expanding media with aspect morph */}
              <div
                className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl"
                style={{
                  width: `${mediaWidth}px`,
                  height: `${mediaHeight}px`,
                  boxShadow: '0 0 50px rgba(0,0,0,0.35)',
                }}
              >
                {mediaType === 'video' ? (
                  isYouTube ? (
                    <div className="relative w-full h-full pointer-events-none">
                      <iframe
                        width="100%"
                        height="100%"
                        src={
                          mediaSrc.includes('embed')
                            ? mediaSrc + (mediaSrc.includes('?') ? '&' : '?') +
                              'autoplay=1&mute=1&loop=1&controls=0&rel=0&disablekb=1&modestbranding=1'
                            : (mediaSrc.includes('watch?v=')
                                ? mediaSrc.replace('watch?v=', 'embed/')
                                : `https://www.youtube.com/embed/${mediaSrc.split('/').pop()}`) +
                              '?autoplay=1&mute=1&loop=1&controls=0&rel=0&disablekb=1&modestbranding=1'
                        }
                        className="w-full h-full rounded-xl"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                      <motion.div
                        className="absolute inset-0 bg-black/30 rounded-xl"
                        initial={{ opacity: 0.7 }}
                        animate={{ opacity: 0.5 - progress * 0.3 }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                  ) : (
                    <>
                      <div className="relative w-full h-full pointer-events-none">
                        <video
                          ref={videoRef}
                          src={mediaSrc}
                          poster={posterSrc}
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload="auto"
                          className="w-full h-full object-cover rounded-xl"
                        />
                        <motion.div
                          className="absolute inset-0 bg-black/30 rounded-xl"
                          initial={{ opacity: 0.7 }}
                          animate={{ opacity: 0.5 - progress * 0.3 }}
                          transition={{ duration: 0.2 }}
                        />
                      </div>

                      {/* Mute/Unmute button — only after expansion */}
                      {showContent && (
                        <button
                          type="button"
                          onClick={toggleSound}
                          aria-label={userWantsSound ? 'Mute video' : 'Unmute video'}
                          className="absolute bottom-3 right-3 z-30 px-3 py-2 rounded-full border border-white/20 bg-black/60 text-white text-sm backdrop-blur hover:bg-black/70 focus:outline-none focus-visible:ring focus-visible:ring-white/30"
                        >
                          <span className="inline-flex items-center gap-2">
                            {userWantsSound ? (
                              // volume-2
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5L6 9H3v6h3l5 4V5z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.54 8.46a5 5 0 010 7.07M19.07 4.93a10 10 0 010 14.14" />
                              </svg>
                            ) : (
                              // volume-x
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5L6 9H3v6h3l5 4V5zM22 9l-6 6M16 9l6 6" />
                              </svg>
                            )}
                            {userWantsSound ? 'Mute' : 'Unmute'}
                          </span>
                        </button>
                      )}
                    </>
                  )
                ) : (
                  <div className="relative w-full h-full">
                    <img
                      src={mediaSrc}
                      alt={title || 'Media content'}
                      className="w-full h-full object-cover rounded-xl"
                      loading="lazy"
                    />
                    <motion.div
                      className="absolute inset-0 bg-black/50 rounded-xl"
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: 0.7 - progress * 0.3 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                )}

                {/* Helper text under media */}
                <div className="flex flex-col items-center text-center relative z-20 mt-4">
                  {date && (
                    <p
                      className="text-2xl text-blue-200"
                      style={{ transform: `translateX(-${textTranslateX}vw)` }}
                    >
                      {date}
                    </p>
                  )}
                  {scrollToExpand && (
                    <p
                      className="text-blue-200 font-medium text-center"
                      style={{ transform: `translateX(${textTranslateX}vw)` }}
                    >
                      {scrollToExpand}
                    </p>
                  )}
                </div>
              </div>

              {/* Split title */}
              <div
                className={`flex items-center justify-center text-center gap-4 w-full relative z-20 flex-col ${
                  textBlend ? 'mix-blend-difference' : 'mix-blend-normal'
                }`}
              >
                <motion.h2
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-200"
                  style={{ transform: `translateX(-${textTranslateX}vw)` }}
                >
                  {firstWord}
                </motion.h2>
                <motion.h2
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-200"
                  style={{ transform: `translateX(${textTranslateX}vw)` }}
                >
                  {restOfTitle}
                </motion.h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content after expansion */}
      <motion.section
        className="flex flex-col w-full px-8 py-8 md:px-12 lg:py-14"
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 1 }}
        transition={{ duration: 0.4 }}
      >
        {children}
      </motion.section>
    </div>
  );
};

export default ScrollExpandMedia;
