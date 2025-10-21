'use client';

import * as React from 'react';
import Lenis from '@studio-freight/lenis';
import { ZoomParallax } from '../ui/zoom-parallax';

export default function About(): JSX.Element {
  // Optional smooth scrolling
  React.useEffect(() => {
    const lenis = new Lenis();
    let raf = requestAnimationFrame(function loop(t: number) {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  const images = [
    { src: "/media/collage/01-center.jpg", alt: "Center" },
    { src: "/media/collage/02-top-left-wide.jpg", alt: "Top-left (wide)" },
    { src: "/media/collage/03-upper-left-tall.jpg", alt: "Upper-left (tall)" },
    { src: "/media/collage/04-mid-right.jpg", alt: "Mid-right" },
    { src: "/media/collage/05-lower-left.jpg", alt: "Lower-left" },
    { src: "/media/collage/06-lower-far-left-wide.jpg", alt: "Lower far-left (wide)" },
    { src: "/media/collage/07-upper-right-small.jpg", alt: "Upper-right (small)" },
  ];

  return (
    <section id="about" className="w-full bg-transparent pt-20 pb-4">
      <div className="max-w-7xl mx-auto px-6">
        <header className="pt-8 pb-6 md:pt-10 md:pb-8 text-center">
          <h2 className="text-3xl md:text-5xl font-semibold font-display text-white">
            Meet the Team
          </h2>
          <p className="text-white/70 text-lg mt-3 max-w-2xl mx-auto">
            Operators first. We build AI + ops that actually move revenue.
          </p>
        </header>

        {/* Anchor for menu link */}
        <div id="about-team" className="mt-8">
          <ZoomParallax images={images} />
        </div>
      </div>
    </section>
  );
}
