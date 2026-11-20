"use client";

import { useRef } from "react";
import { Foto as Image } from "@/components/ui/Foto";
import { resenas, type Resena } from "@/data/resenas";
import { useLang } from "@/lib/i18n";

function Estrellas({ nota }: { nota: number }) {
  const { lang } = useLang();
  return (
    <span className="flex gap-1" role="img" aria-label={lang === "es" ? `${nota} de 5 estrellas` : `${nota} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-4 w-4" aria-hidden>
          <path d="M10 1.8l2.5 5.3 5.7.7-4.2 3.9 1.1 5.7L10 14.6l-5.1 2.8 1.1-5.7L1.8 7.8l5.7-.7z" fill={i < Math.round(nota) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.1" />
        </svg>
      ))}
    </span>
  );
}

/** Avatar genérico (silueta gris en círculo); con reseñas reales se usa la foto del huésped (campo `foto`) */
function Avatar({ r }: { r: Resena }) {
  if (r.foto) {
    return (
      <span className="relative block h-10 w-10 shrink-0 overflow-hidden rounded-full">
        <Image src={r.foto} alt="" fill sizes="40px" className="object-cover" />
      </span>
    );
  }
  return (
    <svg viewBox="0 0 40 40" className="h-10 w-10 shrink-0" aria-hidden>
      <circle cx="20" cy="20" r="20" fill="#cfcfcd" />
      <circle cx="20" cy="15.5" r="6.2" fill="#9a9a98" />
      <path d="M8.6 33.5c1.6-6 6.1-9.3 11.4-9.3s9.8 3.3 11.4 9.3A19.9 19.9 0 0 1 20 40a19.9 19.9 0 0 1-11.4-6.5z" fill="#9a9a98" />
    </svg>
  );
}

/**
 * Reseñas (estructura de Casa Momo): título enorme en bucle con contador
 * y fila de tarjetas deslizable (arrastre / rueda horizontal / flechas).
 */
export function Resenas() {
  const { lang } = useLang();
  const track = useRef<HTMLUListElement>(null);
  const promedio = resenas.reduce((s, r) => s + r.nota, 0) / resenas.length;

  // Arrastre con el ratón (en táctil el desplazamiento nativo ya funciona)
  const drag = useRef<{ x: number; left: number } | null>(null);
  const onDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !track.current) return;
    drag.current = { x: e.clientX, left: track.current.scrollLeft };
    track.current.setPointerCapture(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    if (!drag.current || !track.current) return;
    track.current.scrollLeft = drag.current.left - (e.clientX - drag.current.x);
  };
  const onUp = () => (drag.current = null);
  const mover = (d: number) => track.current?.scrollBy({ left: d * track.current.clientWidth * 0.6, behavior: "smooth" });

  const titulo = (
    <span className="flex shrink-0 items-start gap-4 pr-16">
      <span className="font-[family-name:var(--font-display)] text-[clamp(3.4rem,9vw,9rem)] leading-none text-granate">
        {lang === "es" ? <>Reseñas <span className="t-italic">recientes</span></> : <>Recent <span className="t-italic">reviews</span></>}
      </span>
      <span className="mt-3 grid h-9 min-w-9 place-items-center bg-marfil px-2 text-[0.92rem] text-granate">{resenas.length}</span>
    </span>
  );

  return (
    <section id="resenas" aria-labelledby="resenas-title" className="overflow-hidden border-t border-granate/15 py-24 sm:py-32">
      <h2 id="resenas-title" className="sr-only">
        {lang === "es" ? "Reseñas recientes" : "Recent reviews"}
      </h2>

      {/* Título en bucle */}
      <div aria-hidden className="flex w-max animate-[marquee_38s_linear_infinite] motion-reduce:animate-none">
        {titulo}
        {titulo}
        {titulo}
        {titulo}
      </div>

      {/* Controles */}
      <div className="mt-14 flex items-center justify-between px-[var(--gutter)]">
        <p className="text-granate">
          <span>{promedio.toFixed(2)}</span> / 5 · {resenas.length} {lang === "es" ? "reseñas" : "reviews"}
        </p>
        <div className="flex gap-3">
          <button type="button" onClick={() => mover(-1)} aria-label={lang === "es" ? "Reseñas anteriores" : "Previous reviews"} className="grid h-11 w-11 place-items-center rounded-full border border-granate/40 text-granate transition-colors hover:bg-granate hover:text-crema">
            <svg viewBox="0 0 16 16" className="h-4 w-4 rotate-180" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M2 8h11M9 4l4 4-4 4" /></svg>
          </button>
          <button type="button" onClick={() => mover(1)} aria-label={lang === "es" ? "Reseñas siguientes" : "Next reviews"} className="grid h-11 w-11 place-items-center rounded-full border border-granate/40 text-granate transition-colors hover:bg-granate hover:text-crema">
            <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M2 8h11M9 4l4 4-4 4" /></svg>
          </button>
        </div>
      </div>

      {/* Tarjetas */}
      <ul
        ref={track}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        className="mt-8 flex cursor-grab snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--gutter)] pb-4 active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {resenas.map((r) => (
          <li key={r.id} className="flex min-h-[420px] w-[min(86vw,460px)] shrink-0 snap-start select-none flex-col bg-marfil p-9">
            <div className="flex items-center justify-between text-granate">
              <Estrellas nota={r.nota} />
              <span className="text-[0.98rem] text-granate">{r.nota.toFixed(2)} / 5</span>
            </div>
            <blockquote className="mt-8 flex-1 text-[1.2rem] leading-[1.45] text-granate">“{r.texto[lang]}”</blockquote>
            <div className="mt-10 flex items-center gap-3">
              <Avatar r={r} />
              <span className="text-granate">
                {r.autor} · {r.detalle[lang]}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
