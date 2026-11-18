"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import { Logo } from "@/components/ui/Logo";
import { Pill } from "@/components/ui/Pill";
import { menuPrincipal, menuSecundario } from "@/data/site";
import { motion } from "@/lib/motion";

/**
 * Navegación inspirada en Grand Hotel Miramare:
 *  - barra fija: hamburguesa (izq.), logo centrado, «Reservar ahora» (der.)
 *  - menú a pantalla completa sobre crema: lista grande a la izquierda,
 *    enlaces secundarios abajo y tarjeta con video a la derecha.
 */
export function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const menu = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = menu.current;
    if (!el) return;
    if (open) {
      motion.lenis?.stop();
      gsap.set(el, { display: "grid" });
      const tl = gsap.timeline();
      tl.fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.45, ease: "power2.out" })
        .fromTo(el.querySelectorAll("[data-m-link]"), { yPercent: 110 }, { yPercent: 0, duration: 0.9, ease: "power4.out", stagger: 0.05 }, 0.1)
        .fromTo(el.querySelectorAll("[data-m-fade]"), { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.06 }, 0.35)
        .fromTo(el.querySelector("[data-m-card]"), { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "expo.out" }, 0.2);
      el.querySelector<HTMLButtonElement>("[data-m-close]")?.focus();
    } else {
      motion.lenis?.start();
      gsap.to(el, { autoAlpha: 0, duration: 0.35, ease: "power2.in", onComplete: () => void gsap.set(el, { display: "none" }) });
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const color = solid ? "text-granate" : "text-marfil";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-700 ease-[var(--ease-soft)] ${
          solid ? "border-b border-granate/15 bg-crema/95 backdrop-blur-sm" : "border-b border-transparent"
        }`}
      >
        <div className={`grid h-[var(--header-h)] grid-cols-[1fr_auto_1fr] items-center px-[var(--gutter)] ${color}`}>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="menu-principal"
            aria-label="Abrir menú"
            className="group flex h-11 w-12 flex-col justify-center gap-[7px] justify-self-start"
          >
            <span className="h-px w-11 bg-current" />
            <span className="h-px w-11 bg-current transition-[width] duration-500 group-hover:w-8" />
            <span className="h-px w-11 bg-current" />
          </button>

          <a href="#inicio" aria-label="Gardners Hills, inicio" className="block w-[112px] sm:w-[136px]">
            <Logo className="w-full" />
          </a>

          <a
            href="#reservas"
            className="group relative justify-self-end text-[0.78rem] font-medium uppercase tracking-[0.16em]"
          >
            Reservar
            <span className="absolute -bottom-1.5 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-500 ease-[var(--ease-soft)] group-hover:origin-left group-hover:scale-x-100" />
          </a>
        </div>
      </header>

      {/* Menú a pantalla completa */}
      <div
        id="menu-principal"
        ref={menu}
        role="dialog"
        aria-modal="true"
        aria-label="Menú"
        style={{ display: "none" }}
        className="fixed inset-0 z-[60] grid-rows-[auto_1fr] overflow-y-auto bg-crema text-carmesi"
        onClick={(e) => (e.target as HTMLElement).closest("a") && setOpen(false)}
      >
        <div className="grid h-[var(--header-h)] grid-cols-[1fr_auto_1fr] items-center px-[var(--gutter)]">
          <button
            data-m-close
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Cerrar menú"
            className="relative h-11 w-11 justify-self-start"
          >
            <span className="absolute left-1/2 top-1/2 h-px w-8 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-current" />
            <span className="absolute left-1/2 top-1/2 h-px w-8 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-current" />
          </button>
          <a href="#inicio" aria-label="Gardners Hills, inicio" className="block w-[112px] sm:w-[136px]">
            <Logo className="w-full" />
          </a>
          <span />
        </div>

        <div className="grid gap-12 px-[var(--gutter)] pb-12 pt-6 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-16 lg:pt-10">
          <div className="flex flex-col justify-between gap-14 lg:h-full">
            <nav aria-label="Principal">
              <ul>
                {menuPrincipal.map((n) => (
                  <li key={n.href} className="overflow-hidden">
                    <a
                      data-m-link
                      href={n.href}
                      className="group inline-flex items-baseline gap-4 py-0.5 font-[family-name:var(--font-display)] text-[clamp(2.4rem,4.4vw,4.4rem)] leading-[1.05] text-granate transition-colors hover:text-carmesi"
                    >
                      <span className="transition-transform duration-500 ease-[var(--ease-soft)] group-hover:translate-x-2 group-hover:italic">{n.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div data-m-fade className="flex flex-wrap items-center gap-x-10 gap-y-3 border-t border-granate/15 pt-6 text-[0.78rem] font-medium uppercase tracking-[0.16em] text-granate">
              <span>Villanueva · La Guajira</span>
              {menuSecundario.map((n) => (
                <a key={n.href} href={n.href} target={n.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="normal-case tracking-normal text-[1.125rem] hover:text-carmesi">
                  {n.label}
                </a>
              ))}
            </div>
          </div>

          {/* Tarjeta propia: arco de la marca + frase del manual */}
          <div data-m-card className="mx-auto flex w-full max-w-[380px] flex-col items-center text-center">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-[999px] bg-rosa">
              <Image src="/images/cabanas/cabana-arco.jpg" alt="Cabaña de Gardners Hills frente a la sierra" fill sizes="460px" className="object-cover" />
            </div>
            <p className="t-italic mt-8 text-[clamp(1.8rem,2.6vw,2.6rem)] leading-[1.05] text-granate">
              Un refugio donde
              <br />
              el tiempo se detiene.
            </p>
            <div className="mt-7">
              <Pill href="#reservas">Reservar tu estancia</Pill>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
