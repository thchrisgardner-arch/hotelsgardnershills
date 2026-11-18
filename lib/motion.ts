"use client";

import type Lenis from "lenis";

/** Estado compartido de movimiento (Lenis + fin de la intro) */
export const motion = {
  lenis: null as Lenis | null,
  introDone: false,
};

export const INTRO_EVENT = "gh:intro-done";

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function onIntroDone(cb: () => void) {
  if (motion.introDone) {
    cb();
    return () => {};
  }
  const h = () => cb();
  window.addEventListener(INTRO_EVENT, h, { once: true });
  return () => window.removeEventListener(INTRO_EVENT, h);
}

export function finishIntro() {
  motion.introDone = true;
  window.dispatchEvent(new Event(INTRO_EVENT));
}

export function scrollToHash(hash: string) {
  const el = hash === "#inicio" ? document.body : document.querySelector(hash);
  if (!el) return;
  // force: el menú a pantalla completa detiene Lenis mientras está abierto
  if (motion.lenis) motion.lenis.scrollTo(el as HTMLElement, { offset: 0, duration: 1.4, force: true });
  else (el as HTMLElement).scrollIntoView({ behavior: "smooth" });
}
