"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";

/**
 * Sello que sigue al cursor sobre las tarjetas marcadas con [data-cursor]
 * (como el «Italy's Bright Side» de Grand Hotel Miramare): texto circular que gira alrededor de un sol.
 * Solo con ratón (pointer: fine); con movimiento reducido no gira. Es decorativo (aria-hidden).
 */
export function CursorSello() {
  const { lang } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const [activo, setActivo] = useState(false);
  const [propio, setPropio] = useState<string | null>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const el = ref.current!;
    let x = 0;
    let y = 0;
    let cx = 0;
    let cy = 0;
    let raf = 0;
    const seguir = () => {
      cx += (x - cx) * 0.22;
      cy += (y - cy) * 0.22;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      raf = requestAnimationFrame(seguir);
    };
    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const sobre = (e.target as HTMLElement | null)?.closest?.("[data-cursor]");
      setActivo(Boolean(sobre));
      // data-cursor="texto" cambia el texto del sello (p. ej. «Ver foto» en la galería)
      if (sobre) setPropio(sobre.getAttribute("data-cursor") || null);
    };
    const onLeave = () => setActivo(false);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(seguir);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  const texto = propio && propio !== "true" ? propio : lang === "es" ? "Descubre más · Gardners Hills · " : "Discover more · Gardners Hills · ";

  return (
    <div ref={ref} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[70] hidden mix-blend-difference [@media(pointer:fine)]:block">
      <div
        className={`-ml-[62px] -mt-[62px] h-[124px] w-[124px] transition-[opacity,transform] duration-500 ease-[var(--ease-soft)] ${
          activo ? "scale-100 opacity-100" : "scale-50 opacity-0"
        }`}
      >
        <svg viewBox="0 0 124 124" className="h-full w-full overflow-visible">
          <defs>
            <path id="sello-circulo" d="M62 62m-47 0a47 47 0 1 1 94 0a47 47 0 1 1-94 0" />
          </defs>
          {/* Texto circular que gira */}
          <g className="origin-center animate-[sello_14s_linear_infinite] motion-reduce:animate-none" style={{ transformBox: "fill-box" }}>
            <text fill="#ffffff" fontSize="11.5" letterSpacing="3.2" style={{ textTransform: "uppercase", fontFamily: "var(--font-rotulo)" }}>
              <textPath href="#sello-circulo">{texto}</textPath>
            </text>
          </g>
          {/* Sol central */}
          <g fill="#ffffff">
            {Array.from({ length: 16 }).map((_, i) => (
              <path key={i} d="M62 37 L64.4 50 L59.6 50 Z" transform={`rotate(${i * 22.5} 62 62)`} />
            ))}
            <circle cx="62" cy="62" r="11" />
          </g>
        </svg>
      </div>
    </div>
  );
}
