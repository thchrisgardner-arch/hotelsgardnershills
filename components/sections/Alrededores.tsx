import { actividades } from "@/data/actividades";
import { Lines } from "@/components/ui/Lines";
import { Arch } from "@/components/ui/Arch";
import { Pill } from "@/components/ui/Pill";

/** Actividades cercanas con arcos alineados (wireframe Actividades) */
export function Alrededores() {
  const items = actividades.slice(0, 4);
  return (
    <section id="actividades" aria-labelledby="act-title" className="border-t border-granate/15 px-[var(--gutter)] py-28 sm:py-36">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
        <Lines
          id="act-title"
          className="font-[family-name:var(--font-display)] text-[clamp(2.4rem,4.6vw,4.6rem)] leading-[1.02] text-granate"
          lines={[<>Explora las actividades</>, <span key="i">que te esperan <span className="t-italic">cerca.</span></span>]}
        />
        <div className="lg:justify-self-end lg:text-right">
          <p data-reveal className="max-w-md leading-[1.4] text-granate/85 lg:ml-auto">
            Villanueva, a los pies de la Serranía del Perijá: montaña, música vallenata y vida local para descubrir sin
            prisa.
          </p>
          <div data-reveal className="mt-8">
            <Pill href="/actividades">Ver actividades</Pill>
          </div>
        </div>
      </div>

      <ul className="mt-20 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((a) => (
          <li key={a.id} className="flex flex-col">
            <Arch className="aspect-[3/4] w-full" />
            <h3 data-reveal className="mt-7 border-b border-granate/20 pb-3 text-[0.92rem] font-normal uppercase tracking-[0.2em] text-granate">
              {a.titulo}
            </h3>
            <p data-reveal className="mt-4 text-[1.2rem] leading-[1.4] text-granate/80">
              {a.texto}
            </p>
          </li>
        ))}
      </ul>
      <p data-reveal className="mt-12 text-base text-granate/55">Distancias y recomendaciones por confirmar.</p>
    </section>
  );
}
