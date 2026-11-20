import Link from "next/link";
import { categorias, cabanasDe } from "@/data/cabanas";
import { Lines } from "@/components/ui/Lines";
import { Arch } from "@/components/ui/Arch";
import { Pill } from "@/components/ui/Pill";

/** Resumen de cabañas para la portada; la ficha completa vive en /cabanas */
export function CabanasResumen() {
  return (
    <section id="cabanas" aria-labelledby="cabanas-res-title" className="border-t border-granate/15 px-[var(--gutter)] py-28 sm:py-36">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
        <div>
          <p data-reveal className="text-[0.86rem] font-normal uppercase tracking-[0.24em] text-carmesi/80">
            Cabañas
          </p>
          <Lines
            id="cabanas-res-title"
            className="t-recto t-italic mt-5 text-[clamp(2.8rem,5vw,5rem)] leading-[1] text-carmesi"
            lines={["Un refugio propio", "frente a la sierra"]}
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

      {/* Solo las dos categorías; el detalle de cada cabaña vive en /cabanas */}
      <ul className="mt-20 grid gap-x-8 gap-y-14 sm:grid-cols-2">
        {categorias.map((cat) => {
          const lista = cabanasDe(cat.slug);
          return (
            <li key={cat.slug}>
              <Link href={`/cabanas#${cat.slug}`} className="group block">
                <Arch src={lista[0]?.fotos[0]} alt={cat.nombre} className="aspect-[16/10] w-full" sizes="(min-width: 640px) 48vw, 100vw" hoverZoom />
                <div className="mt-7 flex items-baseline justify-between gap-6 border-b border-granate/20 pb-4">
                  <span className="font-[family-name:var(--font-display)] text-[clamp(2.2rem,3vw,3rem)] leading-none text-carmesi">{cat.nombre}</span>
                  <span className="whitespace-nowrap text-[0.86rem] uppercase tracking-[0.18em] text-granate/60">
                    {lista.length} cabañas
                    <span aria-hidden className="ml-3 inline-block text-granate transition-transform duration-500 group-hover:translate-x-1">→</span>
                  </span>
                </div>
                <p className="mt-4 max-w-lg text-granate/80">{cat.intro}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
