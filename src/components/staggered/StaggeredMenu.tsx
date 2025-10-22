import React, { useCallback, useLayoutEffect, useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import "../../styles/StaggeredMenu.css";
import LightRays from "../ui/LightRays";

type ChildItem = { label: string; link: string; ariaLabel?: string };
type MenuItem = {
  label: string;
  link?: string;
  ariaLabel?: string;
  children?: ChildItem[];
};

type Props = {
  position?: "left" | "right";
  colors?: string[];
  items?: MenuItem[];
  socialItems?: { label: string; link: string }[];
  displaySocials?: boolean;
  /** Numbering is now ignored and the top line/number are removed */
  displayItemNumbering?: boolean;
  className?: string;
  logoUrl?: string;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  accentColor?: string;
  changeMenuColorOnOpen?: boolean;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
};

export const StaggeredMenu: React.FC<Props> = ({
  position = "right",
  colors = ["#B19EEF", "#5227FF"],
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = false, // ← ignored; numbering removed
  className,
  logoUrl = "/src/assets/logos/reactbits-gh-white.svg",
  menuButtonColor = "#fff",
  openMenuButtonColor = "#fff",
  accentColor = "#5227FF",
  changeMenuColorOnOpen = true,
  onMenuOpen,
  onMenuClose,
}) => {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);

  // which submenu is expanded
  const [openSub, setOpenSub] = useState<number | null>(null);

  const panelRef = useRef<HTMLDivElement | null>(null);
  const preLayersRef = useRef<HTMLDivElement | null>(null);
  const preLayerElsRef = useRef<HTMLElement[]>([]);
  const plusHRef = useRef<HTMLSpanElement | null>(null);
  const plusVRef = useRef<HTMLSpanElement | null>(null);
  const iconRef = useRef<HTMLSpanElement | null>(null);
  const textInnerRef = useRef<HTMLSpanElement | null>(null);
  const textWrapRef = useRef<HTMLSpanElement | null>(null);
  const [textLines, setTextLines] = useState(["Menu", "Close"]);

  const openTlRef = useRef<gsap.core.Timeline | null>(null);
  const closeTweenRef = useRef<gsap.core.Tween | null>(null);
  const spinTweenRef = useRef<gsap.core.Tween | null>(null);
  const textCycleAnimRef = useRef<gsap.core.Tween | null>(null);
  const colorTweenRef = useRef<gsap.core.Tween | null>(null);
  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);
  const busyRef = useRef(false);
  const itemEntranceTweenRef = useRef<gsap.core.Tween | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;
      const plusH = plusHRef.current;
      const plusV = plusVRef.current;
      const icon = iconRef.current;
      const textInner = textInnerRef.current;
      if (!panel || !plusH || !plusV || !icon || !textInner) return;

      let preLayers: HTMLElement[] = [];
      if (preContainer) {
        preLayers = Array.from(preContainer.querySelectorAll(".sm-prelayer")) as HTMLElement[];
      }
      preLayerElsRef.current = preLayers;

      const offscreen = position === "left" ? -100 : 100;
      gsap.set([panel, ...preLayers], { xPercent: offscreen });
      gsap.set(plusH, { transformOrigin: "50% 50%", rotate: 0 });
      gsap.set(plusV, { transformOrigin: "50% 50%", rotate: 90 });
      gsap.set(icon, { rotate: 0, transformOrigin: "50% 50%" });
      gsap.set(textInner, { yPercent: 0 });
      if (toggleBtnRef.current) gsap.set(toggleBtnRef.current, { color: menuButtonColor });
    });
    return () => ctx.revert();
  }, [menuButtonColor, position]);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    if (closeTweenRef.current) {
      closeTweenRef.current.kill();
      closeTweenRef.current = null;
    }
    itemEntranceTweenRef.current?.kill();

    // labels (text) only — numbering removed
    const itemEls = Array.from(panel.querySelectorAll(".sm-panel-itemLabel"));
    const socialTitle = panel.querySelector(".sm-socials-title") as HTMLElement | null;
    const socialLinks = Array.from(panel.querySelectorAll(".sm-socials-link"));

    const layerStates = layers.map((el) => ({ el, start: Number(gsap.getProperty(el, "xPercent")) }));
    const panelStart = Number(gsap.getProperty(panel, "xPercent"));

    if (itemEls.length) {
      gsap.set(itemEls, { yPercent: 140, rotate: 10 });
    }
    if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
    if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    layerStates.forEach((ls, i) => {
      tl.fromTo(ls.el, { xPercent: ls.start }, { xPercent: 0, duration: 0.5, ease: "power4.out" }, i * 0.07);
    });
    const lastTime = layerStates.length ? (layerStates.length - 1) * 0.07 : 0;
    const panelInsertTime = lastTime + (layerStates.length ? 0.08 : 0);
    const panelDuration = 0.65;
    tl.fromTo(
      panel,
      { xPercent: panelStart },
      { xPercent: 0, duration: panelDuration, ease: "power4.out" },
      panelInsertTime
    );

    if (itemEls.length) {
      const itemsStart = panelInsertTime + panelDuration * 0.15;
      tl.to(
        itemEls,
        {
          yPercent: 0,
          rotate: 0,
          duration: 1,
          ease: "power4.out",
          stagger: { each: 0.1, from: "start" },
        },
        itemsStart
      );
    }

    if (socialTitle || socialLinks.length) {
      const socialsStart = panelInsertTime + panelDuration * 0.4;
      if (socialTitle) {
        tl.to(socialTitle, { opacity: 1, duration: 0.5, ease: "power2.out" }, socialsStart);
      }
      if (socialLinks.length) {
        tl.to(
          socialLinks,
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: "power3.out",
            stagger: { each: 0.08, from: "start" },
            onComplete: () => gsap.set(socialLinks, { clearProps: "opacity" }),
          },
          socialsStart + 0.04
        );
      }
    }

    openTlRef.current = tl;
    return tl;
  }, []);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const tl = buildOpenTimeline();
    if (tl) {
      tl.eventCallback("onComplete", () => (busyRef.current = false));
      tl.play(0);
    } else {
      busyRef.current = false;
    }
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;
    itemEntranceTweenRef.current?.kill();

    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return;

    const all = [...layers, panel];
    closeTweenRef.current?.kill();
    const offscreen = position === "left" ? -100 : 100;

    setOpenSub(null);

    closeTweenRef.current = gsap.to(all, {
      xPercent: offscreen,
      duration: 0.32,
      ease: "power3.in",
      overwrite: "auto",
      onComplete: () => {
        const itemEls = Array.from(panel.querySelectorAll(".sm-panel-itemLabel"));
        if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
        const socialTitle = panel.querySelector(".sm-socials-title") as HTMLElement | null;
        const socialLinks = Array.from(panel.querySelectorAll(".sm-socials-link"));
        if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
        if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });
        busyRef.current = false;
      },
    });
  }, [position]);

  const animateIcon = useCallback((opening: boolean) => {
    const icon = iconRef.current;
    if (!icon) return;
    spinTweenRef.current?.kill();
    spinTweenRef.current = gsap.to(icon, {
      rotate: opening ? 225 : 0,
      duration: opening ? 0.8 : 0.35,
      ease: opening ? "power4.out" : "power3.inOut",
      overwrite: "auto",
    });
  }, []);

  const animateColor = useCallback(
    (opening: boolean) => {
      const btn = toggleBtnRef.current;
      if (!btn) return;
      colorTweenRef.current?.kill();
      if (changeMenuColorOnOpen) {
        const targetColor = opening ? openMenuButtonColor : menuButtonColor;
        colorTweenRef.current = gsap.to(btn, { color: targetColor, delay: 0.18, duration: 0.3, ease: "power2.out" });
      } else {
        gsap.set(btn, { color: menuButtonColor });
      }
    },
    [openMenuButtonColor, menuButtonColor, changeMenuColorOnOpen]
  );

  useEffect(() => {
    if (toggleBtnRef.current) {
      if (changeMenuColorOnOpen) {
        const targetColor = openRef.current ? openMenuButtonColor : menuButtonColor;
        gsap.set(toggleBtnRef.current, { color: targetColor });
      } else {
        gsap.set(toggleBtnRef.current, { color: menuButtonColor });
      }
    }
  }, [changeMenuColorOnOpen, menuButtonColor, openMenuButtonColor]);

  const animateText = useCallback((opening: boolean) => {
    const inner = textInnerRef.current;
    if (!inner) return;
    textCycleAnimRef.current?.kill();

    const currentLabel = opening ? "Menu" : "Close";
    const targetLabel = opening ? "Close" : "Menu";
    const cycles = 3;
    const seq = [currentLabel];
    let last = currentLabel;
    for (let i = 0; i < cycles; i++) {
      last = last === "Menu" ? "Close" : "Menu";
      seq.push(last);
    }
    if (last !== targetLabel) seq.push(targetLabel);
    seq.push(targetLabel);
    setTextLines(seq);

    gsap.set(inner, { yPercent: 0 });
    const lineCount = seq.length;
    const finalShift = ((lineCount - 1) / lineCount) * 100;
    textCycleAnimRef.current = gsap.to(inner, {
      yPercent: -finalShift,
      duration: 0.5 + lineCount * 0.07,
      ease: "power4.out",
    });
  }, []);

  const closeMenuHard = useCallback(() => {
    openRef.current = false;
    setOpen(false);
    setOpenSub(null);
    onMenuClose?.();
    playClose();
    animateIcon(false);
    animateColor(false);
    animateText(false);
  }, [animateColor, animateIcon, animateText, onMenuClose, playClose]);

  const toggleMenu = useCallback(() => {
    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);
    if (target) {
      onMenuOpen?.();
      playOpen();
      animateIcon(true);
      animateColor(true);
      animateText(true);
    } else {
      setOpenSub(null);
      onMenuClose?.();
      playClose();
      animateIcon(false);
      animateColor(false);
      animateText(false);
    }
  }, [playOpen, playClose, animateIcon, animateColor, animateText, onMenuOpen, onMenuClose]);

  useEffect(() => {
    if (!open) setOpenSub(null);
  }, [open]);

  const handleParentClick = (e: React.MouseEvent, idx: number, hasChildren: boolean, href?: string) => {
    if (hasChildren) {
      e.preventDefault();
      setOpenSub((cur) => (cur === idx ? null : idx));
      return;
    }
    closeMenuHard();
  };

  const handleChildClick = (e: React.MouseEvent, href: string) => {
    if (href?.startsWith("#")) {
      e.preventDefault();
      window.location.hash = href;
    }
    closeMenuHard();
  };

  return (
    <div
      className={(className ? className + " " : "") + "staggered-menu-wrapper"}
      style={accentColor ? { ["--sm-accent" as any]: accentColor } : undefined}
      data-position={position}
      data-open={open || undefined}
    >
      {/* prelayers */}
      <div ref={preLayersRef} className="sm-prelayers" aria-hidden="true">
        {(() => {
          const raw = colors && colors.length ? colors.slice(0, 4) : ["#1e1e22", "#35353c"];
          let arr = [...raw];
          if (arr.length >= 3) {
            const mid = Math.floor(arr.length / 2);
            arr.splice(mid, 1);
          }
          return arr.map((c, i) => <div key={i} className="sm-prelayer" style={{ background: c }} />);
        })()}
      </div>

      {/* header */}
      <header className="staggered-menu-header" aria-label="Main navigation header">
        <div className="sm-logo" aria-label="Logo">
          <img
            src={logoUrl || "/src/assets/logos/reactbits-gh-white.svg"}
            alt="Logo"
            className="sm-logo-img"
            draggable={false}
            width={130}
            height={28}
          />
        </div>
        <button
          ref={toggleBtnRef}
          className="sm-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="staggered-menu-panel"
          onClick={toggleMenu}
          type="button"
        >
          <span ref={textWrapRef} className="sm-toggle-textWrap" aria-hidden="true">
            <span ref={textInnerRef} className="sm-toggle-textInner">
              {textLines.map((l, i) => (
                <span className="sm-toggle-line" key={i}>
                  {l}
                </span>
              ))}
            </span>
          </span>
          <span ref={iconRef} className="sm-icon" aria-hidden="true">
            <span ref={plusHRef} className="sm-icon-line" />
            <span ref={plusVRef} className="sm-icon-line sm-icon-line-v" />
          </span>
        </button>
      </header>

      {/* panel */}
      <aside id="staggered-menu-panel" ref={panelRef} className="staggered-menu-panel" aria-hidden={!open}>
        <div style={{ width: '100%', height: '600px', position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
          <LightRays
            raysOrigin="top-center"
            raysColor="#FFC800"
            raysSpeed={0.5}
            lightSpread={1.5}
            rayLength={8}
            followMouse={true}
            mouseInfluence={0.1}
            noiseAmount={0}
            distortion={0}
            className="custom-rays"
          />
        </div>
        <div className="sm-panel-inner">
          {/* NOTE: no data-numbering attribute anymore */}
          <ul className="sm-panel-list" role="list">
            {items && items.length ? (
              items.map((it, idx) => {
                const hasChildren = !!it.children && it.children.length > 0;
                const isOpen = openSub === idx;
                return (
                  <li
                    className={`sm-panel-itemWrap${hasChildren ? " has-children" : ""}`}
                    key={it.label + idx}
                    data-subopen={isOpen || undefined}
                  >
                    <a
                      className="sm-panel-item"
                      href={it.link || "#"}
                      aria-label={it.ariaLabel || it.label}
                      onClick={(e) => handleParentClick(e, idx, hasChildren, it.link)}
                    >
                      <span className="sm-panel-itemLabel">{it.label}</span>
                    </a>

                    {hasChildren && (
                      <ul
                        className="sm-sublist"
                        aria-hidden={!isOpen}
                        style={{
                          maxHeight: isOpen ? 280 : 0,
                          opacity: isOpen ? 1 : 0,
                          transition: "max-height 280ms ease, opacity 220ms ease",
                          overflow: "hidden",
                        }}
                      >
                        {it.children!.map((sub, sIdx) => (
                          <li key={`${it.label}-sub-${sIdx}`} className="sm-subitemWrap">
                            <a
                              className="sm-subitem"
                              href={sub.link}
                              aria-label={sub.ariaLabel || sub.label}
                              onClick={(e) => handleChildClick(e, sub.link)}
                            >
                              <span className="sm-subitemLabel">{sub.label}</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })
            ) : (
              <li className="sm-panel-itemWrap" aria-hidden="true">
                <span className="sm-panel-item">
                  <span className="sm-panel-itemLabel">No items</span>
                </span>
              </li>
            )}
          </ul>

        </div>
      </aside>
    </div>
  );
};

export default StaggeredMenu;
