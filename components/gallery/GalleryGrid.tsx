"use client";

import { useCallback, useEffect, useState } from "react";
import { Foto as Image } from "@/components/ui/Foto";
import { galeria } from "@/data/galeria";
import { useLang } from "@/lib/i18n";
import { motion } from "@/lib/motion";

/** Cuadrícula alineada de arcos (3 columnas) con visor a pantalla completa */
export function GalleryGrid() {
  const { lang } = useLang();
  const alt = (p: (typeof galeria)[number]) => (lang === "es" ? p.alt : p.altEn ?? p.alt);
  const [open, setOpen] = useState<number | null>(null);
  const n = galeria.length;
  const go = useCallback((d: number) => setOpen((v) => (v === null ? v : (v + d + n) % n)), [n]);

  useEffect(() => {
    if (open === null) {
      motion.lenis?.start();
      return;
    }
    motion.lenis?.stop();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go]);

  return (
    <>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {galeria.map((p, i) => (
          <li key={p.id}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`${lang === "es" ? "Ampliar" : "Enlarge"}: ${alt(p)}`}
              className="group relative block aspect-[4/5] w-full overflow-hidden bg-rosa"
            >
              {p.src && (
                <Image src={p.src} alt={alt(p)} fill sizes="(min-width: 1024px) 32vw, 50vw" className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-soft)] group-hover:scale-[1.05]" />
              )}
            </button>
            <p className="mt-4 text-[1.08rem] text-granate/75">{p.alt}</p>
          </li>
        ))}
      </ul>

      {open !== null && (
        <div role="dialog" aria-modal="true" aria-label={alt(galeria[open])} className="fixed inset-0 z-[80] flex flex-col bg-granate text-marfil" onClick={(e) => e.target === e.currentTarget && setOpen(null)}>
          <div className="flex items-center justify-between px-[var(--gutter)] py-5">
            <span className="text-[0.875rem] font-normal uppercase tracking-[0.2em] text-rosa">
              {String(open + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
            </span>
            <button type="button" autoFocus onClick={() => setOpen(null)} className="text-[0.875rem] font-normal uppercase tracking-[0.2em]">
              {lang === "es" ? "Cerrar" : "Close"} ✕
            </button>
          </div>
          <div className="relative mx-[var(--gutter)] flex-1">
            {galeria[open].src && <Image src={galeria[open].src!} alt={alt(galeria[open])} fill sizes="100vw" className="object-contain" />}
          </div>
          <div className="flex items-center justify-between px-[var(--gutter)] py-6">
            <button type="button" onClick={() => go(-1)} className="min-h-11 text-[0.875rem] font-normal uppercase tracking-[0.2em]">← {lang === "es" ? "Anterior" : "Previous"}</button>
            <p className="t-italic text-xl">{galeria[open].alt}</p>
            <button type="button" onClick={() => go(1)} className="min-h-11 text-[0.875rem] font-normal uppercase tracking-[0.2em]">{lang === "es" ? "Siguiente" : "Next"} →</button>
          </div>
        </div>
      )}
    </>
  );
}
