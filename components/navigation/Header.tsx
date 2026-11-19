"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Foto as Image } from "@/components/ui/Foto";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { Pill } from "@/components/ui/Pill";
import { menuPrincipal, menuSecundario } from "@/data/site";
import { motion } from "@/lib/motion";
import { useLang } from "@/lib/i18n";

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

  const pathname = usePathname();
  const { lang, setLang, t } = useLang();

  // Claro sobre la cabecera oscura de cada página ([data-header-light]); sólido al pasarla.
  // Páginas sin cabecera oscura: sólido desde el inicio.
  useEffect(() => {
    let limite = 0;
    const medir = () => {
      const hero = document.querySelector<HTMLElement>("[data-header-light]");
      limite = hero ? Math.max(hero.offsetHeight - 90, 0) : 0;
    };
    const onScroll = () => setSolid(!limite || window.scrollY > limite);
    medir();
    onScroll();
    const onResize = () => { medir(); onScroll(); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [pathname]);

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
        data-chrome
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
            aria-label={t("abrirMenu")}
            className="group flex h-11 w-12 flex-col justify-center gap-[7px] justify-self-start"
          >
            <span className="h-px w-11 bg-current" />
            <span className="h-px w-11 bg-current transition-[width] duration-500 group-hover:w-8" />
            <span className="h-px w-11 bg-current" />
          </button>

          {/* data-logo-menu: destino final de la intro del hero */}
          <Link href="/" aria-label="Gardners Hills, inicio" className="block w-[112px] sm:w-[136px]">
            <span data-logo-menu className="block">
              <Logo className="w-full" />
            </span>
          </Link>

          <div className="flex items-center gap-7 justify-self-end">
            {/* Cambio de idioma */}
            <div role="group" aria-label={t("idioma")} className="flex items-center gap-1.5 text-[0.92rem] font-normal uppercase tracking-[0.16em]">
              {(["es", "en"] as const).map((l, k) => (
                <span key={l} className="flex items-center gap-1.5">
                  {k > 0 && <span aria-hidden className="opacity-40">/</span>}
                  <button
                    type="button"
                    onClick={() => setLang(l)}
                    aria-pressed={lang === l}
                    className={`transition-opacity ${lang === l ? "opacity-100" : "opacity-45 hover:opacity-100"}`}
                  >
                    {l}
                  </button>
                </span>
              ))}
            </div>
            <Link
              href="/reservas"
              className="group relative text-[0.92rem] font-normal uppercase tracking-[0.16em]"
            >
              {t("reservar")}
              <span className="absolute -bottom-1.5 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-500 ease-[var(--ease-soft)] group-hover:origin-left group-hover:scale-x-100" />
            </Link>
          </div>
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
            aria-label={t("cerrarMenu")}
            className="relative h-11 w-11 justify-self-start"
          >
            <span className="absolute left-1/2 top-1/2 h-px w-8 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-current" />
            <span className="absolute left-1/2 top-1/2 h-px w-8 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-current" />
          </button>
          <Link href="/" aria-label="Gardners Hills, inicio" className="block w-[112px] sm:w-[136px]">
            <Logo className="w-full" />
          </Link>
          <span />
        </div>

        <div className="grid gap-12 px-[var(--gutter)] pb-12 pt-6 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-16 lg:pt-10">
          <div className="flex flex-col justify-between gap-14 lg:h-full">
            <nav aria-label="Principal">
              <ul>
                {menuPrincipal.map((n) => (
                  <li key={n.href} className="overflow-hidden">
                    <Link
                      data-m-link
                      href={n.href}
                      aria-current={pathname === n.href ? "page" : undefined}
                      className={`group inline-flex items-baseline gap-4 py-0.5 font-[family-name:var(--font-menu)] text-[clamp(2.4rem,4.2vw,4.2rem)] leading-[1.04] transition-colors hover:text-carmesi ${
                        pathname === n.href ? "italic text-carmesi" : "text-granate"
                      }`}
                    >
                      <span className="transition-transform duration-500 ease-[var(--ease-soft)] group-hover:translate-x-2 group-hover:italic">{lang === "en" ? n.en : n.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div data-m-fade className="flex flex-wrap items-center gap-x-10 gap-y-3 border-t border-granate/15 pt-6 text-[0.92rem] font-normal uppercase tracking-[0.16em] text-granate">
              <span>Villanueva · La Guajira</span>
              {menuSecundario.map((n) => (
                <a key={n.href} href={n.href} target={n.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="normal-case tracking-normal text-[1.2rem] hover:text-carmesi">
                  {n.label}
                </a>
              ))}
            </div>
          </div>

          {/* Tarjeta propia: arco de la marca + frase del manual */}
          <div data-m-card className="mx-auto flex w-full max-w-[380px] flex-col items-center text-center">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-rosa">
              <Image src="/images/cabanas/cabana-arco.jpg" alt="Cabaña de Gardners Hills frente a la sierra" fill sizes="460px" className="object-cover" />
            </div>
            <p className="t-italic mt-8 text-[clamp(1.8rem,2.6vw,2.6rem)] leading-[1.05] text-granate">
              {t("frase1")}
              <br />
              {t("frase2")}
            </p>
            <div className="mt-7">
              <Pill href="/reservas">{t("reservarEstancia")}</Pill>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
