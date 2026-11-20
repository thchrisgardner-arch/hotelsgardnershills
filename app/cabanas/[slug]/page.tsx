import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MotionController } from "@/components/layout/MotionController";
import { Lines } from "@/components/ui/Lines";
import { Arch } from "@/components/ui/Arch";
import { Pill } from "@/components/ui/Pill";
import { ReservaBanda } from "@/components/sections/ReservaBanda";
import { cabanas, getCabana } from "@/data/cabanas";
import { site } from "@/data/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return cabanas.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = getCabana((await params).slug);
  if (!c) return {};
  return {
    title: c.nombre,
    description: `${c.nombre} en Gardners Hills, Villanueva, La Guajira: ${c.area}, ${c.capacidad.toLowerCase()}, ${c.camas}.`,
    alternates: { canonical: `/cabanas/${c.slug}` },
  };
}

/** Ficha de categoría con la estructura de las páginas de habitación de OSH Hotels */
export default async function CabanaPage({ params }: Props) {
  const c = getCabana((await params).slug);
  if (!c) notFound();
  const otras = cabanas.filter((o) => o.slug !== c.slug);
  const wa = `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(`Hola, quiero reservar una ${c.nombre} en Gardners Hills.`)}`;
  const anclas = [
    { id: "descripcion", label: "Descripción" },
    { id: "detalles", label: "Detalles" },
    { id: "galeria", label: "Galería" },
    { id: "relacionadas", label: "Relacionadas" },
  ];
  const datos = [
    { k: "Tamaño", v: c.area },
    { k: "Capacidad", v: c.capacidad },
    { k: "Camas", v: c.camas },
    { k: "Instalaciones", v: c.instalaciones.join(" · ") },
    { k: "Unidades", v: `${c.unidades} cabañas` },
  ];

  return (
    <>
      <MotionController />
      <main>
        {/* Portada */}
        <section data-header-light className="bg-granate text-marfil">
          <div className="flex min-h-[86vh] flex-col items-center justify-center px-[var(--gutter)] pb-24 pt-[calc(var(--header-h)+4rem)] text-center">
            <p data-reveal className="text-[0.92rem] font-normal uppercase tracking-[0.3em] text-marfil/90">
              <Link href="/cabanas" className="hover:text-marfil">Cabañas</Link> · {c.unidades} unidades
            </p>
            <Lines
              as="h1"
              className="t-hero t-italic mt-8 text-[clamp(4.6rem,10vw,10.5rem)] leading-[0.92]"
              lines={[c.nombre]}
            />
            <p data-reveal className="mt-10 text-marfil/90">{c.frase}</p>
            <div data-reveal className="mt-7">
              <Pill href={wa} target="_blank" rel="noreferrer" tone="marfil">Quiero reservar</Pill>
            </div>
          </div>
        </section>

        {/* Navegación interna */}
        <nav aria-label="Secciones de la cabaña" className="sticky top-[var(--header-h)] z-20 border-b border-granate/15 bg-crema/95 px-[var(--gutter)] backdrop-blur">
          <ul className="flex gap-10 py-4 text-[0.86rem] uppercase tracking-[0.18em] text-granate/70">
            {anclas.map((a) => (
              <li key={a.id}><a href={`#${a.id}`} className="transition-colors hover:text-granate">{a.label}</a></li>
            ))}
          </ul>
        </nav>

        {/* Descripción */}
        <section id="descripcion" className="scroll-mt-40 grid gap-12 px-[var(--gutter)] py-28 sm:py-36 lg:grid-cols-12 lg:items-center">
          <Arch src={c.fotos[1]} alt={c.nombre} className="aspect-[4/5] w-full lg:col-span-5" sizes="40vw" />
          <div className="lg:col-span-6 lg:col-start-7">
            <Lines
              as="h2"
              className="font-[family-name:var(--font-display)] text-[clamp(2.6rem,4.4vw,4.4rem)] leading-[1.02] text-granate"
              lines={["Descripción"]}
            />
            <div className="mt-8 max-w-xl space-y-5 text-granate/85">
              {c.descripcionLarga.map((t) => <p key={t} data-reveal>{t}</p>)}
            </div>
            <ul data-reveal className="mt-8 flex flex-wrap gap-3">
              {c.destacados.map((d) => (
                <li key={d} className="border border-granate/30 px-4 py-2 text-[0.86rem] uppercase tracking-[0.14em] text-granate">{d}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Detalles */}
        <section id="detalles" className="scroll-mt-40 border-t border-granate/15 px-[var(--gutter)] py-28 sm:py-36">
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Lines
                as="h2"
                className="font-[family-name:var(--font-display)] text-[clamp(2.6rem,4.4vw,4.4rem)] leading-[1.02] text-granate"
                lines={["Detalles"]}
              />
              <dl data-reveal className="mt-10 divide-y divide-granate/15 border-y border-granate/15">
                {datos.map((d) => (
                  <div key={d.k} className="flex items-baseline justify-between gap-6 py-4">
                    <dt className="text-[0.86rem] uppercase tracking-[0.18em] text-granate/60">{d.k}</dt>
                    <dd className="text-right text-granate">{d.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <h3 data-reveal className="text-[0.86rem] uppercase tracking-[0.2em] text-granate/60">Características y servicios</h3>
              <ul data-reveal className="mt-8 grid grid-cols-2 gap-x-8 gap-y-4 text-granate/85">
                {c.servicios.map((s) => (
                  <li key={s} className="flex items-center gap-3 border-b border-granate/10 pb-3">
                    <span aria-hidden className="h-1.5 w-1.5 shrink-0 bg-granate" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Galería */}
        <section id="galeria" className="scroll-mt-40 border-t border-granate/15 px-[var(--gutter)] py-28 sm:py-36">
          <Lines
            as="h2"
            className="font-[family-name:var(--font-display)] text-[clamp(2.6rem,4.4vw,4.4rem)] leading-[1.02] text-granate"
            lines={["Galería"]}
          />
          <div className="mt-14 grid grid-cols-3 gap-6">
            {c.fotos.map((f, k) => (
              <Arch key={f + k} src={f} alt={`${c.nombre}, foto ${k + 1}`} className="aspect-[4/5] w-full" sizes="32vw" />
            ))}
          </div>
        </section>

        {/* Relacionadas */}
        <section id="relacionadas" className="scroll-mt-40 border-t border-granate/15 px-[var(--gutter)] py-28 sm:py-36">
          <Lines
            as="h2"
            className="font-[family-name:var(--font-display)] text-[clamp(2.6rem,4.4vw,4.4rem)] leading-[1.02] text-granate"
            lines={[<>También te puede <span key="i" className="t-italic">gustar</span></>]}
          />
          <ul className="mt-14 grid gap-6 lg:grid-cols-2">
            {otras.map((o) => (
              <li key={o.slug}>
                <Link href={`/cabanas/${o.slug}`} className="group block">
                  <Arch src={o.fotos[0]} alt={o.nombre} className="aspect-[4/3] w-full" sizes="48vw" hoverZoom />
                  <div className="mt-6 flex items-baseline justify-between border-b border-granate/20 pb-3">
                    <span className="font-[family-name:var(--font-display)] text-[2.2rem] leading-none text-granate">{o.nombre}</span>
                    <span className="text-[0.86rem] uppercase tracking-[0.18em] text-granate/60">{o.area} <span aria-hidden className="ml-2 inline-block transition-transform duration-500 group-hover:translate-x-1">→</span></span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <ReservaBanda texto={`Elige tus fechas y te confirmamos disponibilidad de la ${c.nombre} por WhatsApp.`} />
      </main>
    </>
  );
}
