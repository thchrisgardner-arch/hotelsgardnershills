"use client";

import { useEffect, useRef } from "react";
import { Foto as Image } from "@/components/ui/Foto";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { galeria } from "@/data/galeria";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Carrusel con scroll horizontal (referencia: Grand Hotel Miramare, «Pool, Beach, Wellness & Fitness»):
 * la sección se fija y, al hacer scroll vertical, las fotos avanzan en horizontal.
 * Fotos de igual altura, alineadas y con separación mínima.
 * Con movimiento reducido (o sin JS) queda como fila desplazable nativa.
 */
export function HorizontalGallery({ titulo }: { titulo: React.ReactNode }) {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const s = section.current!;
    const t = track.current!;
    if (prefersReducedMotion()) {
      // sin animación: fila con desplazamiento horizontal nativo
      s.style.overflowX = "auto";
      return;
    }
    gsap.registerPlugin(ScrollTrigger);
    const distancia = () => Math.max(t.scrollWidth - window.innerWidth, 0);

    const ctx = gsap.context(() => {
      gsap.to(t, {
        x: () => -distancia(),
        ease: "none",
        scrollTrigger: {
          trigger: s,
          start: "top top",
          end: () => `+=${distancia()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    }, s);
    // recalcular cuando carguen las imágenes
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="galeria"
      ref={section}
      aria-label="Nuestra galería"
      className="flex h-[100svh] flex-col justify-center overflow-hidden border-t border-granate/15 bg-crema"
    >
      <div className="mb-10 flex items-end justify-between gap-6 px-[var(--gutter)]">
        {titulo}
        <p className="hidden text-granate/60 md:block">Desliza para recorrer →</p>
      </div>
      <ul
        ref={track}
        className="flex w-max gap-2 px-[var(--gutter)] will-change-transform"
      >
        {galeria.map((p, i) => (
          <li
            key={p.id}
            className={`relative h-[min(68vh,720px)] shrink-0 overflow-hidden bg-rosa ${i % 3 === 1 ? "aspect-[4/3]" : "aspect-[4/5]"}`}
          >
            {p.src && <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 50vw, 90vw" className="object-cover" />}
          </li>
        ))}
      </ul>
    </section>
  );
}
