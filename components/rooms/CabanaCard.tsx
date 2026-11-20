"use client";

import { useState } from "react";
import { Foto as Image } from "@/components/ui/Foto";
import { L } from "@/components/ui/L";
import { getCategoria, type Cabana } from "@/data/cabanas";
import { cop, desde } from "@/data/tarifas";
import { useLang } from "@/lib/i18n";

/**
 * Ficha de cabaña (estructura de la referencia de alojamiento):
 * galería en arco con flechas, nombre grande y, debajo, descripción + datos con íconos.
 */
export function CabanaCard({ cabana }: { cabana: Cabana }) {
  const { lang } = useLang();
  const T = {
    es: { foto: "foto", de: "de", ant: "Foto anterior de", sig: "Foto siguiente de", mas: "Descubre más", res: "Reservar", tam: "Tamaño", cap: "Capacidad", cam: "Camas", desde: "Desde", noche: "noche" },
    en: { foto: "photo", de: "of", ant: "Previous photo of", sig: "Next photo of", mas: "Discover more", res: "Book", tam: "Size", cap: "Capacity", cam: "Beds", desde: "From", noche: "night" },
  }[lang];
  const [i, setI] = useState(0);
  const n = cabana.fotos.length;
  const go = (d: number) => setI((v) => (v + d + n) % n);
  const nombre = cabana.nombre;
  const id = `cab-${cabana.slug}`;

  const icon = "h-[18px] w-[18px] shrink-0 text-carmesi";

  return (
    <article aria-labelledby={`${id}-t`} className="flex flex-col">
      {/* Galería en arco */}
      <div className="group relative aspect-[16/9] overflow-hidden bg-rosa" data-reveal-media data-cursor>
        <div data-media-inner className="absolute inset-0">
          {cabana.fotos.map((src, k) => (
            <Image
              key={src + k}
              src={src}
              alt={`${nombre}, ${T.foto} ${k + 1} ${T.de} ${n}`}
              fill
              sizes="(min-width: 1024px) 46vw, 100vw"
              className={`object-cover transition-opacity duration-700 ease-[var(--ease-soft)] ${k === i ? "opacity-100" : "opacity-0"}`}
            />
          ))}
        </div>
        {n > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label={`${T.ant} ${nombre}`}
              className="absolute bottom-6 left-6 grid h-11 w-11 place-items-center rounded-full bg-crema/85 text-granate transition-colors hover:bg-granate hover:text-crema"
            >
              <svg viewBox="0 0 16 16" className="h-4 w-4 rotate-180" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M2 8h11M9 4l4 4-4 4" /></svg>
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label={`${T.sig} ${nombre}`}
              className="absolute bottom-6 right-6 grid h-11 w-11 place-items-center rounded-full bg-crema/85 text-granate transition-colors hover:bg-granate hover:text-crema"
            >
              <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M2 8h11M9 4l4 4-4 4" /></svg>
            </button>
            <div className="absolute bottom-9 left-1/2 flex -translate-x-1/2 gap-2" aria-hidden>
              {cabana.fotos.map((_, k) => (
                <span key={k} className={`h-1.5 rounded-full bg-crema transition-all duration-500 ${k === i ? "w-6" : "w-1.5 opacity-60"}`} />
              ))}
            </div>
          </>
        )}
      </div>

      <h3
        id={`${id}-t`}
        className="mt-6 font-[family-name:var(--font-display)] text-[clamp(2rem,2.6vw,2.7rem)] leading-none text-carmesi"
      >
        {nombre}
      </h3>

      <p data-reveal className="mt-3 text-[0.875rem] font-normal uppercase tracking-[0.2em] text-granate">
        {getCategoria(cabana.categoria, lang).nombre} · {cabana.frase}
      </p>

      <div data-reveal className="mt-5 grid gap-6 sm:grid-cols-[1fr_auto] sm:gap-10">
        <div>
          <p className="max-w-md text-[1.05rem] leading-[1.45] text-granate">{cabana.resumen}</p>
          <p className="mt-3 text-[1rem] text-granate">
            {T.desde} <span className="font-[family-name:var(--font-display)] text-[1.5rem]">{cop(desde(cabana.tarifa))}</span> / {T.noche}
          </p>
          <div className="mt-6 flex flex-wrap gap-6">
            <L
              href={`/cabanas/${cabana.slug}`}
              className="inline-flex min-h-11 items-center border-b border-carmesi/60 text-[0.875rem] font-normal uppercase tracking-[0.16em] text-carmesi transition-colors hover:border-granate hover:text-granate"
            >
              {T.mas}
            </L>
            <L
              href={`/reservas?cabana=${cabana.slug}`}
              className="inline-flex min-h-11 items-center border-b border-granate/40 text-[0.875rem] font-normal uppercase tracking-[0.16em] text-granate transition-colors hover:border-granate"
            >
              {T.res}
            </L>
          </div>
        </div>
        <ul className="space-y-2.5 text-[1.02rem] text-granate sm:min-w-[210px]">
          <li className="flex items-center gap-3">
            <svg viewBox="0 0 24 24" className={icon} fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" /></svg>
            <span><span className="sr-only">{T.tam}: </span>{cabana.area}</span>
          </li>
          <li className="flex items-center gap-3">
            <svg viewBox="0 0 24 24" className={icon} fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden><circle cx="12" cy="8" r="3.5" /><path d="M5 20c.8-4 3.6-6 7-6s6.2 2 7 6" /></svg>
            <span><span className="sr-only">{T.cap}: </span>{cabana.capacidad}</span>
          </li>
          <li className="flex items-center gap-3">
            <svg viewBox="0 0 24 24" className={icon} fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden><path d="M3 18v-6h18v6M3 15h18M5 12V8h14v4" /></svg>
            <span><span className="sr-only">{T.cam}: </span>{cabana.camas}</span>
          </li>
          <li className="flex items-center gap-3">
            <svg viewBox="0 0 24 24" className={icon} fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden><path d="M2.5 19.5 9 10l4 5 3-3.5 5.5 8" /><circle cx="17" cy="6" r="2" /></svg>
            <span>{cabana.instalaciones.join(" · ")}</span>
          </li>
        </ul>
      </div>
    </article>
  );
}
