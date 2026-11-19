import Link from "next/link";
import { MotionController } from "@/components/layout/MotionController";
import { PageHero } from "@/components/layout/PageHero";

export type Seccion = { titulo: string; parrafos?: string[]; lista?: string[] };

const otras = [
  { label: "Términos y condiciones", href: "/terminos" },
  { label: "Política de privacidad", href: "/privacidad" },
  { label: "Política de cookies", href: "/cookies" },
];

/** Plantilla de página legal: índice a la izquierda (fijo) y texto a la derecha */
export function LegalPage({
  titulo,
  actualizado,
  intro,
  secciones,
  ruta,
}: {
  titulo: string;
  actualizado: string;
  intro: string;
  secciones: Seccion[];
  ruta: string;
}) {
  const id = (i: number) => `s-${i + 1}`;
  return (
    <>
      <MotionController />
      <main>
        <PageHero titulo={titulo} kicker="Legal" />
        <section className="grid gap-16 px-[var(--gutter)] py-24 sm:py-32 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
              <p className="text-[0.86rem] uppercase tracking-[0.2em] text-granate/60">Contenido</p>
              <ol className="mt-5 space-y-2.5 text-[1.02rem] text-granate/80">
                {secciones.map((s, i) => (
                  <li key={s.titulo}>
                    <a href={`#${id(i)}`} className="transition-colors hover:text-granate">
                      {i + 1}. {s.titulo}
                    </a>
                  </li>
                ))}
              </ol>
              <div className="mt-10 border-t border-granate/15 pt-6">
                <p className="text-[0.86rem] uppercase tracking-[0.2em] text-granate/60">Otros documentos</p>
                <ul className="mt-4 space-y-2 text-[1.02rem]">
                  {otras
                    .filter((o) => o.href !== ruta)
                    .map((o) => (
                      <li key={o.href}>
                        <Link href={o.href} className="text-granate/80 transition-colors hover:text-granate">{o.label}</Link>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </aside>

          <article className="max-w-3xl lg:col-span-8 lg:col-start-5">
            <p className="text-[0.86rem] uppercase tracking-[0.2em] text-granate/60">Última actualización: {actualizado}</p>
            <p className="mt-6 text-[1.3rem] leading-[1.45] text-granate">{intro}</p>
            {secciones.map((s, i) => (
              <section key={s.titulo} id={id(i)} className="scroll-mt-32 border-t border-granate/15 pt-10 mt-12">
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.9rem,2.6vw,2.6rem)] leading-[1.05] text-granate">
                  {i + 1}. {s.titulo}
                </h2>
                <div className="mt-5 space-y-4 text-granate/85">
                  {s.parrafos?.map((t) => <p key={t}>{t}</p>)}
                  {s.lista && (
                    <ul className="space-y-2.5 pl-5 [list-style:square]">
                      {s.lista.map((t) => <li key={t}>{t}</li>)}
                    </ul>
                  )}
                </div>
              </section>
            ))}
          </article>
        </section>
      </main>
    </>
  );
}
