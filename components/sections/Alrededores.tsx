import { actividades } from "@/data/actividades";
import { Lines } from "@/components/ui/Lines";
import { Arch } from "@/components/ui/Arch";
import { Pill } from "@/components/ui/Pill";
import type { Lang } from "@/lib/routes";

/** Actividades cercanas con imágenes alineadas */
export function Alrededores({ lang }: { lang: Lang }) {
  const items = actividades.slice(0, 4);
  const t = {
    es: { l1: "Explora las actividades", l2a: "que te esperan", l2b: "cerca.", p: "Villanueva, a los pies de la Serranía del Perijá: montaña, música vallenata y vida local para descubrir sin prisa.", cta: "Ver actividades" },
    en: { l1: "Explore the activities", l2a: "waiting for you", l2b: "nearby.", p: "Villanueva, at the foot of the Serranía del Perijá: mountains, vallenato music and local life to discover unhurried.", cta: "See activities" },
  }[lang];
  return (
    <section id="actividades" aria-labelledby="act-title" className="border-t border-granate/15 px-[var(--gutter)] py-28 sm:py-36">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
        <Lines
          id="act-title"
          className="t-recto font-[family-name:var(--font-display)] text-[clamp(2.2rem,4.6vw,4.6rem)] leading-[1.02] text-granate"
          lines={[t.l1, <span key="i">{t.l2a} <span className="t-italic">{t.l2b}</span></span>]}
        />
        <div className="lg:justify-self-end lg:text-right">
          <p data-reveal className="max-w-md leading-[1.4] text-granate lg:ml-auto">
            {t.p}
          </p>
          <div data-reveal className="mt-8">
            <Pill href="/servicios#actividades">{t.cta}</Pill>
          </div>
        </div>
      </div>

      <ul className="mt-20 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((a) => (
          <li key={a.id} className="flex flex-col">
            <Arch alt={a.titulo[lang]} className="aspect-[3/4] w-full" />
            <h3 data-reveal className="mt-7 border-b border-granate/20 pb-3 text-[0.92rem] font-normal uppercase tracking-[0.2em] text-granate">
              {a.titulo[lang]}
            </h3>
            <p data-reveal className="mt-4 text-[1.2rem] leading-[1.4] text-granate">
              {a.texto[lang]}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
