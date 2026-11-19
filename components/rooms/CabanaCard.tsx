"use client";

import { useState } from "react";
import { Foto as Image } from "@/components/ui/Foto";
import Link from "next/link";
import type { CabanaTipo } from "@/data/cabanas";

/**
 * Ficha de cabaña (estructura de la referencia de alojamiento):
 * galería en arco con flechas, nombre grande y, debajo, descripción + datos con íconos.
 */
export function CabanaCard({ cabana }: { cabana: CabanaTipo }) {
  const [i, setI] = useState(0);
  const n = cabana.fotos.length;
  const go = (d: number) => setI((v) => (v + d + n) % n);
  const nombre = cabana.nombre;
  const id = `cab-${cabana.slug}`;

  const icon = "h-[18px] w-[18px] shrink-0 text-carmesi";

  return (
    <article aria-labelledby={`${id}-t`} className="flex flex-col">
      {/* Galería en arco */}
      <div className="group relative aspect-[5/4] overflow-hidden bg-rosa" data-reveal-media>
        <div data-media-inner className="absolute inset-0">
          {cabana.fotos.map((src, k) => (
            <Image
              key={src + k}
              src={src}
              alt={`${nombre}, foto ${k + 1} de ${n}`}
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
              aria-label={`Foto anterior de ${nombre}`}
              className="absolute bottom-6 left-6 grid h-11 w-11 place-items-center rounded-full bg-crema/85 text-granate transition-colors hover:bg-granate hover:text-crema"
            >
              <svg viewBox="0 0 16 16" className="h-4 w-4 rotate-180" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M2 8h11M9 4l4 4-4 4" /></svg>
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label={`Foto siguiente de ${nombre}`}
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
        data-reveal
        className="mt-8 font-[family-name:var(--font-display)] text-[clamp(2.4rem,3.4vw,3.4rem)] uppercase leading-none text-carmesi"
      >
        {nombre}
      </h3>

      <p data-reveal className="mt-3 text-[0.86rem] font-normal uppercase tracking-[0.2em] text-granate/60">
        {cabana.unidades} cabañas · {cabana.frase}
      </p>

      <div data-reveal className="mt-6 grid gap-8 sm:grid-cols-[1fr_auto] sm:gap-12">
        <div>
          <p className="max-w-md text-granate/85">{cabana.descripcion}</p>
          <div className="mt-6 flex flex-wrap gap-6">
            <Link
              href={`/cabanas/${cabana.slug}`}
              className="inline-block border-b border-carmesi/60 pb-1 text-[0.88rem] font-normal uppercase tracking-[0.16em] text-carmesi transition-colors hover:border-granate hover:text-granate"
            >
              Ver la cabaña
            </Link>
            <Link
              href="/reservas"
              className="inline-block border-b border-granate/25 pb-1 text-[0.88rem] font-normal uppercase tracking-[0.16em] text-granate/70 transition-colors hover:border-granate hover:text-granate"
            >
              Reservar
            </Link>
          </div>
        </div>
        <ul className="space-y-3 text-[1.12rem] text-granate/80 sm:min-w-[210px]">
          <li className="flex items-center gap-3">
            <svg viewBox="0 0 24 24" className={icon} fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" /></svg>
            <span><span className="sr-only">Tamaño: </span>{cabana.area}</span>
          </li>
          <li className="flex items-center gap-3">
            <svg viewBox="0 0 24 24" className={icon} fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden><circle cx="12" cy="8" r="3.5" /><path d="M5 20c.8-4 3.6-6 7-6s6.2 2 7 6" /></svg>
            <span><span className="sr-only">Capacidad: </span>{cabana.capacidad}</span>
          </li>
          <li className="flex items-center gap-3">
            <svg viewBox="0 0 24 24" className={icon} fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden><path d="M3 18v-6h18v6M3 15h18M5 12V8h14v4" /></svg>
            <span><span className="sr-only">Camas: </span>{cabana.camas}</span>
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
