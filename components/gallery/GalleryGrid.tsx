"use client";

import { useState } from "react";
import { Foto as Image } from "@/components/ui/Foto";
import { Visor } from "@/components/gallery/Visor";
import { galeria } from "@/data/galeria";
import { useLang } from "@/lib/i18n";

/** Cuadrícula alineada (3 columnas) con el visor individual compartido con la portada */
export function GalleryGrid() {
  const { lang } = useLang();
  const alt = (p: (typeof galeria)[number]) => (lang === "es" ? p.alt : p.altEn ?? p.alt);
  const [abierta, setAbierta] = useState<number | null>(null);

  return (
    <>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {galeria.map((p, i) => (
          <li key={p.id}>
            <button
              type="button"
              onClick={() => setAbierta(i)}
              data-cursor={lang === "es" ? "Ver foto · Gardners Hills · " : "View photo · Gardners Hills · "}
              aria-label={`${lang === "es" ? "Ampliar" : "Enlarge"}: ${alt(p)}`}
              className="group relative block aspect-[4/5] w-full overflow-hidden bg-rosa"
            >
              {p.src && (
                <Image src={p.src} alt={alt(p)} fill sizes="(min-width: 1024px) 32vw, 50vw" className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-soft)] group-hover:scale-[1.05]" />
              )}
            </button>
            <p className="mt-4 text-[1.08rem] text-granate">{alt(p)}</p>
          </li>
        ))}
      </ul>
      <Visor abierta={abierta} setAbierta={setAbierta} />
    </>
  );
}
