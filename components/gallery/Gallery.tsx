"use client";

import { useEffect, useState } from "react";
import { Foto as Image } from "@/components/ui/Foto";
import { galeria } from "@/data/galeria";

/**
 * Carrusel en arcos del wireframe «Nuestra Galería»: arco central grande,
 * arcos laterales asomando y flechas en círculo.
 */
export function Gallery() {
  // empieza en la segunda foto para que asomen arcos a ambos lados (wireframe)
  const [i, setI] = useState(1);
  const n = galeria.length;
  const go = (d: number) => setI((v) => (v + d + n) % n);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const g = document.getElementById("galeria");
      if (!g) return;
      const r = g.getBoundingClientRect();
      if (r.top > window.innerHeight || r.bottom < 0) return;
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  // ancho de slide y separación en vw
  const W = 46, GAP = 1.2;
  const offset = 50 - W / 2 - i * (W + GAP);

  return (
    <div className="relative" aria-roledescription="carrusel" aria-label="Galería de fotos">
      <div className="overflow-hidden">
        <ul
          className="flex transition-transform duration-[1.1s] ease-[var(--ease-soft)]"
          style={{ transform: `translateX(${offset}vw)`, gap: `${GAP}vw` }}
        >
          {galeria.map((p, k) => (
            <li
              key={p.id}
              aria-hidden={k !== i}
              className={`relative shrink-0 overflow-hidden bg-rosa transition-opacity duration-700 ${k === i ? "opacity-100" : "opacity-60"}`}
              style={{ width: `${W}vw`, height: `${W * 0.72}vw` }}
            >
              {p.src && <Image src={p.src} alt={p.alt} fill sizes="46vw" className="object-cover" />}
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        onClick={() => go(-1)}
        aria-label="Foto anterior"
        className="absolute left-[calc(27vw-24px)] top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-granate/50 bg-crema/80 text-granate transition-colors hover:bg-granate hover:text-crema"
      >
        <svg viewBox="0 0 16 16" className="h-4 w-4 rotate-180" fill="none" stroke="currentColor" strokeWidth="1.1"><path d="M2 8h11M9 4l4 4-4 4" /></svg>
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        aria-label="Foto siguiente"
        className="absolute right-[calc(27vw-24px)] top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-granate/50 bg-crema/80 text-granate transition-colors hover:bg-granate hover:text-crema"
      >
        <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.1"><path d="M2 8h11M9 4l4 4-4 4" /></svg>
      </button>

      <p className="mt-8 text-center text-[0.86rem] font-normal uppercase tracking-[0.24em] text-granate/70" aria-live="polite">
        {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")} · {galeria[i].alt}
      </p>
    </div>
  );
}
