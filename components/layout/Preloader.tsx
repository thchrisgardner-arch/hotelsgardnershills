"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Logo } from "@/components/ui/Logo";
import { finishIntro, motion, prefersReducedMotion } from "@/lib/motion";

const KEY = "gh-intro-seen";

/**
 * Introducción de marca: fondo carmesí, el logotipo aparece desde una máscara,
 * una línea fina marca el progreso y el panel se abre hacia el hero.
 * En visitas repetidas de la sesión se reduce a un fundido breve.
 */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
      sessionStorage.setItem(KEY, "1");
    } catch {}

    const el = root.current!;
    const done = () => {
      setGone(true);
      motion.lenis?.start();
      finishIntro();
    };
    motion.lenis?.stop();

    if (prefersReducedMotion() || seen) {
      gsap.to(el, { autoAlpha: 0, duration: 0.5, delay: 0.1, onComplete: done });
      return;
    }

    const tl = gsap.timeline({ onComplete: done });
    tl.fromTo(
      el.querySelector("[data-pl-logo]"),
      { clipPath: "inset(100% 0% 0% 0%)", y: 30 },
      { clipPath: "inset(0% 0% 0% 0%)", y: 0, duration: 1.3, ease: "expo.out" }
    )
      .fromTo(el.querySelector("[data-pl-bar]"), { scaleX: 0 }, { scaleX: 1, duration: 1.1, ease: "power2.inOut" }, 0.2)
      .to(el.querySelector("[data-pl-meta]"), { autoAlpha: 1, duration: 0.6 }, 0.5)
      .to(el.querySelector("[data-pl-inner]"), { y: -40, autoAlpha: 0, duration: 0.7, ease: "power3.in" }, "+=0.25")
      .to(el, { yPercent: -100, duration: 1.1, ease: "expo.inOut" }, "-=0.25");

    return () => {
      tl.kill();
    };
  }, []);

  if (gone) return null;

  return (
    <div
      ref={root}
      aria-hidden
      className="fixed inset-0 z-[100] flex items-center justify-center bg-carmesi text-marfil"
    >
      <div data-pl-inner className="flex w-full flex-col items-center px-8">
        <div data-pl-logo style={{ clipPath: "inset(100% 0% 0% 0%)" }} className="w-[min(70vw,420px)]">
          <Logo variant="descriptor" className="w-full text-rosa" />
        </div>
        <div className="mt-10 h-px w-[min(50vw,220px)] bg-marfil/25">
          <div data-pl-bar className="h-px w-full origin-left scale-x-0 bg-marfil" />
        </div>
        <p data-pl-meta className="t-label mt-5 text-marfil/80 opacity-0">
          Villanueva · La Guajira
        </p>
      </div>
    </div>
  );
}
