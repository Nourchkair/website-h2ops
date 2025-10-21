'use client';

import React, {
  useCallback, useEffect, useMemo, useRef, useState, memo,
  type CSSProperties, type ReactNode
} from 'react';

type IconLogo = { node: ReactNode; title?: string; href?: string; ariaLabel?: string };
type ImageLogo = {
  src: string; alt?: string; href?: string; title?: string;
  srcSet?: string; sizes?: string; width?: number; height?: number;
};
type LogoItem = IconLogo | ImageLogo;

const ANIMATION_CONFIG = { SMOOTH_TAU: 0.25, MIN_COPIES: 2, COPY_HEADROOM: 2 };

const toCssLength = (v: number | string | undefined) =>
  typeof v === 'number' ? `${v}px` : v ?? undefined;

const useResizeObserver = (cb: () => void, els: React.RefObject<HTMLElement>[], deps: unknown[]) => {
  useEffect(() => {
    if (!(window as any).ResizeObserver) {
      const onWin = () => cb();
      window.addEventListener('resize', onWin);
      cb();
      return () => window.removeEventListener('resize', onWin);
    }
    const observers = els.map(r => {
      if (!r.current) return null;
      const o = new ResizeObserver(cb);
      o.observe(r.current);
      return o;
    });
    cb();
    return () => observers.forEach(o => o?.disconnect());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

const useImageLoader = (seqRef: React.RefObject<HTMLElement>, onLoad: () => void, deps: unknown[]) => {
  useEffect(() => {
    const imgs = (seqRef.current?.querySelectorAll('img') ?? []) as NodeListOf<HTMLImageElement>;
    if (!imgs.length) { onLoad(); return; }
    let remaining = imgs.length;
    const done = () => { remaining -= 1; if (remaining === 0) onLoad(); };
    imgs.forEach(img => {
      if (img.complete) done();
      else {
        img.addEventListener('load', done, { once: true });
        img.addEventListener('error', done, { once: true });
      }
    });
    return () => imgs.forEach(img => {
      img.removeEventListener('load', done);
      img.removeEventListener('error', done);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

const useAnimationLoop = (
  trackRef: React.RefObject<HTMLDivElement>,
  targetVelocity: number,
  seqWidth: number,
  isHovered: boolean,
  pauseOnHover: boolean
) => {
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const velRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    if (seqWidth > 0) {
      offsetRef.current = ((offsetRef.current % seqWidth) + seqWidth) % seqWidth;
      track.style.transform = `translate3d(${-offsetRef.current}px,0,0)`;
    }

    const animate = (ts: number) => {
      if (lastRef.current === null) lastRef.current = ts;
      const dt = Math.max(0, ts - lastRef.current) / 1000;
      lastRef.current = ts;

      const target = pauseOnHover && isHovered ? 0 : targetVelocity;
      const ease = 1 - Math.exp(-dt / ANIMATION_CONFIG.SMOOTH_TAU);
      velRef.current += (target - velRef.current) * ease;

      if (seqWidth > 0) {
        let next = offsetRef.current + velRef.current * dt;
        next = ((next % seqWidth) + seqWidth) % seqWidth;
        offsetRef.current = next;
        track.style.transform = `translate3d(${-next}px,0,0)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); lastRef.current = null; };
  }, [targetVelocity, seqWidth, isHovered, pauseOnHover, trackRef]);
};

const LogoLoop = memo(function LogoLoop({
  logos,
  speed = 120,
  direction = 'left',
  width = '100%',
  logoHeight = 28,
  gap = 32,
  pauseOnHover = true,
  fadeOut = false,
  fadeOutColor,
  scaleOnHover = false,
  ariaLabel = 'Partner logos',
  className,
  style
}: {
  logos: LogoItem[];
  speed?: number;
  direction?: 'left' | 'right';
  width?: number | string;
  logoHeight?: number;
  gap?: number;
  pauseOnHover?: boolean;
  fadeOut?: boolean;
  fadeOutColor?: string;
  scaleOnHover?: boolean;
  ariaLabel?: string;
  className?: string;
  style?: CSSProperties;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const seqRef = useRef<HTMLUListElement>(null);

  const [seqWidth, setSeqWidth] = useState(0);
  const [copies, setCopies] = useState(ANIMATION_CONFIG.MIN_COPIES);
  const [hovered, setHovered] = useState(false);

  const targetVelocity = useMemo(() => {
    const mag = Math.abs(speed);
    const dir = direction === 'left' ? 1 : -1;
    const sgn = speed < 0 ? -1 : 1;
    return mag * dir * sgn;
  }, [speed, direction]);

  const updateDims = useCallback(() => {
    const containerW = containerRef.current?.clientWidth ?? 0;
    const seqW = seqRef.current?.getBoundingClientRect?.().width ?? 0;
    if (seqW > 0) {
      setSeqWidth(Math.ceil(seqW));
      const need = Math.ceil(containerW / seqW) + ANIMATION_CONFIG.COPY_HEADROOM;
      setCopies(Math.max(ANIMATION_CONFIG.MIN_COPIES, need));
    }
  }, []);

  useResizeObserver(updateDims, [containerRef, seqRef], [logos, gap, logoHeight]);
  useImageLoader(seqRef, updateDims, [logos, gap, logoHeight]);
  useAnimationLoop(trackRef, targetVelocity, seqWidth, hovered, pauseOnHover);

  const cssVars: CSSProperties = {
    ['--logoloop-gap' as any]: `${gap}px`,
    ['--logoloop-logoHeight' as any]: `${logoHeight}px`,
    ...(fadeOutColor ? { ['--logoloop-fadeColor' as any]: fadeOutColor } : {})
  };

  const rootClass = [
    'logoloop',
    fadeOut && 'logoloop--fade',
    scaleOnHover && 'logoloop--scale-hover',
    className
  ].filter(Boolean).join(' ');

  const onEnter = useCallback(() => { if (pauseOnHover) setHovered(true); }, [pauseOnHover]);
  const onLeave = useCallback(() => { if (pauseOnHover) setHovered(false); }, [pauseOnHover]);

  const renderLogoItem = useCallback((item: LogoItem, key: string) => {
    const isNode = (item as IconLogo).node !== undefined;
    const content = isNode ? (
      <span className="logoloop__node" aria-hidden={(item as any).href && !(item as any).ariaLabel}>
        {(item as IconLogo).node}
      </span>
    ) : (
      <img
        src={(item as ImageLogo).src}
        srcSet={(item as ImageLogo).srcSet}
        sizes={(item as ImageLogo).sizes}
        width={(item as ImageLogo).width}
        height={(item as ImageLogo).height}
        alt={(item as ImageLogo).alt ?? ''}
        title={(item as ImageLogo).title}
        loading="lazy"
        decoding="async"
        draggable={false}
      />
    );

    const aria = isNode
      ? ((item as IconLogo).ariaLabel ?? (item as IconLogo).title)
      : ((item as ImageLogo).alt ?? (item as ImageLogo).title);

    const inner = (item as any).href ? (
      <a className="logoloop__link" href={(item as any).href} aria-label={aria || 'logo link'} target="_blank" rel="noreferrer noopener">
        {content}
      </a>
    ) : content;

    return <li className="logoloop__item" key={key} role="listitem">{inner}</li>;
  }, []);

  const lists = useMemo(() =>
    Array.from({ length: copies }, (_, i) => (
      <ul
        className="logoloop__list"
        key={`copy-${i}`}
        role="list"
        aria-hidden={i > 0}
        ref={i === 0 ? seqRef : undefined}
      >
        {logos.map((l, idx) => renderLogoItem(l, `${i}-${idx}`))}
      </ul>
    )),
  [copies, logos, renderLogoItem]);

  const containerStyle: CSSProperties = { width: toCssLength(width) ?? '100%', ...cssVars, ...style };

  return (
    <div
      ref={containerRef}
      className={rootClass}
      style={containerStyle}
      role="region"
      aria-label={ariaLabel}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className="logoloop__track" ref={trackRef}>
        {lists}
      </div>
    </div>
  );
});

export default LogoLoop;
