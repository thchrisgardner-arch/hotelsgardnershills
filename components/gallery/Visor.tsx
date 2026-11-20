"use client";

import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Foto as Image } from "@/components/ui/Foto";
import { galeria } from "@/data/galeria";
import { useLang } from "@/lib/i18n";
import { motion } from "@/lib/motion";
import { MOSTRAR_FOTOS } from "@/lib/brand";

/**
 * Visor individual de la galería (estructura del de Grand Hotel Miramare):
 * fondo crema a pantalla completa, foto centrada, X fina arriba a la derecha y flechas a los lados.
 * Teclado: Esc cierra, ← → cambian de foto. Al cerrar, el foco vuelve a la miniatura.
 */
export function Visor({ abierta, setAbierta }: { abierta: number | null; setAbierta: (i: number | null) => void }) {
  const { lang } = useLang();
  const n = galeria.length;
  const origen = useRef<HTMLElement | null>(null);
  const cerrarRef = useRef<HTMLButtonElement>(null);
  const ir = useCallback((d: number) => abierta !== null && setAbierta((abierta + d + n) % n), [abierta, n, setAbierta]);

  useEffect(() => {
    if (abierta === null) return;
    if (!origen.current) origen.current = document.activeElement as HTMLElement;
    motion.lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    cerrarRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAbierta(null);
      if (e.key === "ArrowRight") ir(1);
      if (e.key === "ArrowLeft") ir(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [abierta, ir, setAbierta]);

  useEffect(() => {
    if (abierta !== null) return;
    motion.lenis?.start();
    document.documentElement.style.overflow = "";
    origen.current?.focus({ preventScroll: true });
    origen.current = null;
  }, [abierta]);

  if (abierta === null || typeof document === "undefined") return null;
  const p = galeria[abierta];
  const alt = lang === "es" ? p.alt : p.altEn ?? p.alt;
  const flecha = "flex h-12 w-12 items-center justify-center text-carmesi transition-opacity hover:opacity-60";

  // Portal al <body>: la sección de la portada está fijada por GSAP y un fixed dentro de ella quedaría desplazado
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-crema px-4 py-20 sm:px-20"
      onClick={(e) => e.target === e.currentTarget && setAbierta(null)}
    >
      <button
        ref={cerrarRef}
        type="button"
        onClick={() => setAbierta(null)}
        aria-label={lang === "es" ? "Cerrar galería" : "Close gallery"}
        className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center text-carmesi transition-opacity hover:opacity-60 sm:right-8 sm:top-6"
      >
        <svg viewBox="0 0 24 24" aria-hidden className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.3">
          <path d="M4 4l16 16M20 4L4 20" />
        </svg>
      </button>

      <figure className="relative h-full max-h-[78vh] w-full max-w-[1100px]">
        <div className={`relative h-full w-full ${p.src && MOSTRAR_FOTOS ? "" : "bg-rosa"}`}>
          {p.src && <Image key={p.id} src={p.src} alt={alt} fill sizes="80vw" className="object-contain" />}
        </div>
        <figcaption className="absolute -bottom-12 left-0 right-0 flex items-baseline justify-between gap-6 text-granate">
          <span className="truncate text-[0.95rem]">{alt}</span>
          <span className="shrink-0 text-[0.875rem] uppercase tracking-[0.2em]">
            {String(abierta + 1).padStart(2, "0")} {lang === "es" ? "de" : "of"} {String(n).padStart(2, "0")}
          </span>
        </figcaption>
      </figure>

      <button type="button" onClick={() => ir(-1)} aria-label={lang === "es" ? "Foto anterior" : "Previous photo"} className={`absolute left-2 top-1/2 -translate-y-1/2 sm:left-6 ${flecha}`}>
        <svg viewBox="0 0 24 24" aria-hidden className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M15 4l-8 8 8 8" /></svg>
      </button>
      <button type="button" onClick={() => ir(1)} aria-label={lang === "es" ? "Foto siguiente" : "Next photo"} className={`absolute right-2 top-1/2 -translate-y-1/2 sm:right-6 ${flecha}`}>
        <svg viewBox="0 0 24 24" aria-hidden className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M9 4l8 8-8 8" /></svg>
      </button>
    </div>,
    document.body,
  );
}
