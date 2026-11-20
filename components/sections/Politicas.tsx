import { politicas, POLITICAS_EJEMPLO } from "@/data/politicas";
import type { Lang } from "@/lib/routes";

/** Resumen de políticas de estancia, con el estilo de las listas de comodidades */
export function Politicas({ lang, className = "" }: { lang: Lang; className?: string }) {
  const t = {
    es: { titulo: "Políticas de estancia", ejemplo: "Texto de ejemplo · por confirmar con el hotel", mas: "Ver términos y condiciones" },
    en: { titulo: "Stay policies", ejemplo: "Sample text · to be confirmed by the hotel", mas: "See terms and conditions" },
  }[lang];
  return (
    <section id="politicas" aria-labelledby="politicas-titulo" className={`scroll-mt-40 px-[var(--gutter)] py-24 sm:py-28 ${className}`}>
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-granate/15 pb-6">
          <h2 id="politicas-titulo" className="font-[family-name:var(--font-display)] text-[clamp(2rem,2.8vw,2.8rem)] leading-none text-granate">
            {t.titulo}
          </h2>
          {POLITICAS_EJEMPLO && (
            <span className="border border-granate px-3 py-1 text-[0.875rem] uppercase tracking-[0.16em] text-granate">{t.ejemplo}</span>
          )}
        </div>
        <dl className="grid gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
          {politicas.map((p) => (
            <div key={p.id} className="border-b border-granate/10 py-6">
              <dt className="text-[0.875rem] uppercase tracking-[0.2em] text-granate">{p.titulo[lang]}</dt>
              <dd className="mt-2 text-granate">{p.texto[lang]}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
