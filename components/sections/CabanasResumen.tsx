import Link from "next/link";
import { cabanas } from "@/data/cabanas";
import { Lines } from "@/components/ui/Lines";
import { Arch } from "@/components/ui/Arch";
import { Pill } from "@/components/ui/Pill";

/** Resumen de cabañas para la portada; la ficha completa vive en /cabanas */
export function CabanasResumen() {
  return (
    <section id="cabanas" aria-labelledby="cabanas-res-title" className="border-t border-granate/15 px-[var(--gutter)] py-28 sm:py-36">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
        <div>
          <p data-reveal className="text-[0.72rem] font-medium uppercase tracking-[0.24em] text-carmesi/80">
            Cabañas
          </p>
          <Lines
            id="cabanas-res-title"
            className="t-italic mt-5 text-[clamp(2.8rem,5vw,5rem)] leading-[1] text-carmesi"
            lines={["Cada cabaña,", "un refugio propio"]}
          />
        </div>
        <div className="lg:justify-self-end lg:text-right">
          <p data-reveal className="max-w-md text-granate/85 lg:ml-auto">
            Arquitectura blanca y madera frente a la sierra. Una invitación a detenerse, respirar y encontrar equilibrio.
          </p>
          <div data-reveal className="mt-8">
            <Pill href="/cabanas">Ver todas las cabañas</Pill>
          </div>
        </div>
      </div>

      <ul className="mt-20 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
        {cabanas.map((c) => (
          <li key={c.id}>
            <Link href="/cabanas" className="group block">
              <Arch src={c.fotos[0]} alt={c.nombre ?? `Cabaña ${c.numero}`} className="aspect-[3/4] w-full" sizes="(min-width: 1024px) 24vw, 50vw" hoverZoom />
              <div className="mt-6 flex items-baseline justify-between border-b border-granate/20 pb-3">
                <span className="font-[family-name:var(--font-display)] text-[1.9rem] uppercase leading-none text-carmesi">
                  {c.nombre ?? `Cabaña ${c.numero}`}
                </span>
                <span aria-hidden className="text-granate transition-transform duration-500 group-hover:translate-x-1">→</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
