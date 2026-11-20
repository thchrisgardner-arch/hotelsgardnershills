import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { MotionController } from "@/components/layout/MotionController";
import { Lines } from "@/components/ui/Lines";
import { Arch } from "@/components/ui/Arch";
import { Pill } from "@/components/ui/Pill";
import { CabanaCard } from "@/components/rooms/CabanaCard";
import { ReservaBanda } from "@/components/sections/ReservaBanda";
import { cabanas, cabanasDe, getCabana, getCategoria } from "@/data/cabanas";

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

/** Elementos que van en la columna «En el baño» de las comodidades */
const DEL_BANO = /baño|ducha|tina|amenidades|batas|secador|espejo/i;

const Icono = ({ d }: { d: React.ReactNode }) => (
  <svg viewBox="0 0 24 24" aria-hidden className="h-[18px] w-[18px] shrink-0 text-granate" fill="none" stroke="currentColor" strokeWidth="1.3">
    {d}
  </svg>
);
const iconos = {
  area: <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />,
  personas: <><circle cx="12" cy="8" r="3.5" /><path d="M5 20c.8-4 3.6-6 7-6s6.2 2 7 6" /></>,
  cama: <path d="M3 18v-6h18v6M3 15h18M5 12V8h14v4" />,
  punto: <circle cx="12" cy="12" r="2.2" fill="currentColor" stroke="none" />,
};

/**
 * Ficha de cada cabaña. Hero propio + estructura de la página de habitación de Grand Hotel Miramare:
 * barra de secciones centrada, frase grande centrada, texto + datos con íconos, botón de reserva,
 * tríptico de imágenes, comodidades en dos columnas y «Otras cabañas».
 */
export default async function CabanaPage({ params }: Props) {
  const { slug } = await params;
  // Rutas antiguas por categoría → su bloque en el listado
  if (slug === "medium" || slug === "refugio" || slug === "premium") redirect(`/cabanas#${slug === "medium" ? "refugio" : slug}`);
  const c = getCabana(slug);
  if (!c) notFound();
  const categoria = getCategoria(c.categoria);
  const otras = cabanasDe(c.categoria).filter((o) => o.slug !== c.slug);
  const reservar = `/reservas?cabana=${c.slug}`;

  // Frase grande = primera oración; el resto va como párrafo
  const corte = c.descripcion.indexOf(". ");
  const frase = corte > 0 ? c.descripcion.slice(0, corte + 1) : c.descripcion;
  const resto = corte > 0 ? c.descripcion.slice(corte + 2) : "";

  const datos: { icono: keyof typeof iconos; texto: string }[] = [
    { icono: "area", texto: c.area },
    { icono: "personas", texto: c.capacidad },
    { icono: "cama", texto: c.camas },
    ...c.instalaciones.map((t) => ({ icono: "punto" as const, texto: t })),
  ];
  const mitad = Math.ceil(datos.length / 2);
  const enCabana = c.servicios.filter((s) => !DEL_BANO.test(s));
  const enBano = c.servicios.filter((s) => DEL_BANO.test(s));

  const anclas = [
    { id: "descripcion", label: "Descripción" },
    { id: "galeria", label: "Galería" },
    { id: "comodidades", label: "Comodidades" },
    { id: "otras", label: "Otras cabañas" },
  ];

  return (
    <>
      <MotionController />
      <main>
        {/* Portada */}
        <section data-header-light className="bg-granate text-marfil">
          <div className="flex min-h-[86vh] flex-col items-center justify-center px-[var(--gutter)] pb-24 pt-[calc(var(--header-h)+4rem)] text-center">
            <p data-reveal className="text-[0.92rem] font-normal uppercase tracking-[0.3em] text-marfil/90">
              <Link href={`/cabanas#${c.categoria}`} className="hover:text-marfil">{categoria.nombre}</Link>
            </p>
            <Lines
              as="h1"
              className="t-hero t-italic mt-8 text-[clamp(4.6rem,10vw,10.5rem)] leading-[0.92]"
              lines={[c.nombre.replace("Cabaña ", "")]}
            />
            <p data-reveal className="mt-10 text-marfil/90">{c.frase}</p>
            <div data-reveal className="mt-7">
              <Pill href={reservar} tone="marfil">Reservar</Pill>
            </div>
          </div>
        </section>

        {/* Barra de secciones (centrada) */}
        <nav aria-label="Secciones de la cabaña" className="sticky top-[var(--header-h)] z-20 border-b border-granate/15 bg-crema/95 px-[var(--gutter)] backdrop-blur">
          <ul className="flex justify-center gap-12 py-4 text-center text-[0.86rem] uppercase tracking-[0.18em] text-granate/70">
            <li>
              <Link href="/cabanas" className="transition-colors hover:text-granate">← Todas las cabañas</Link>
            </li>
            {anclas.map((a) => (
              <li key={a.id}><a href={`#${a.id}`} className="transition-colors hover:text-granate">{a.label}</a></li>
            ))}
          </ul>
        </nav>

        {/* Descripción: frase grande centrada + texto y datos */}
        <section id="descripcion" className="scroll-mt-40 px-[var(--gutter)] py-28 sm:py-36">
          <Lines
            as="h2"
            className="mx-auto max-w-5xl text-center font-[family-name:var(--font-display)] text-[clamp(2.4rem,4vw,4.2rem)] leading-[1.08] text-granate"
            lines={[frase]}
          />

          <div className="mx-auto mt-20 grid max-w-6xl gap-14 lg:grid-cols-2">
            <div data-reveal className="space-y-5 text-granate/85">
              {resto ? <p>{resto}</p> : <p>{c.frase}</p>}
              <ul className="flex flex-wrap gap-3 pt-2">
                {c.destacados.map((d) => (
                  <li key={d} className="border border-granate/30 px-4 py-2 text-[0.86rem] uppercase tracking-[0.14em] text-granate">{d}</li>
                ))}
              </ul>
            </div>
            <div data-reveal className="grid grid-cols-2 gap-x-10 gap-y-4 self-start text-granate/85">
              {[datos.slice(0, mitad), datos.slice(mitad)].map((col, k) => (
                <ul key={k} className="space-y-4">
                  {col.map((d) => (
                    <li key={d.texto} className="flex items-center gap-3">
                      <Icono d={iconos[d.icono]} />
                      {d.texto}
                    </li>
                  ))}
                  {k === 1 && (
                    <li>
                      <a href="#comodidades" className="border-b border-granate/40 pb-0.5 text-granate transition-colors hover:border-granate">
                        Ver todas las comodidades
                      </a>
                    </li>
                  )}
                </ul>
              ))}
            </div>
          </div>

          <div data-reveal className="mt-16 flex justify-center">
            <Pill href={reservar} tone="solid">Reservar</Pill>
          </div>
        </section>

        {/* Galería: tríptico alineado */}
        <section id="galeria" aria-label="Galería" className="scroll-mt-40 px-[var(--gutter)]">
          <div className="grid grid-cols-3 gap-4 sm:gap-6">
            {c.fotos.map((f, k) => (
              <Arch key={f + k} src={f} alt={`${c.nombre}, foto ${k + 1}`} className="aspect-[4/5] w-full" sizes="32vw" />
            ))}
          </div>
        </section>

        {/* Comodidades en dos columnas */}
        <section id="comodidades" className="scroll-mt-40 px-[var(--gutter)] py-28 sm:py-36">
          <div className="mx-auto grid max-w-6xl gap-14 sm:grid-cols-2">
            {[
              { titulo: "En la cabaña", items: enCabana },
              { titulo: "En el baño", items: enBano },
            ].map((g) => (
              <div key={g.titulo}>
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,2.8vw,2.8rem)] leading-none text-granate">{g.titulo}</h2>
                <ul data-reveal className="mt-8 space-y-3 text-granate/85">
                  {g.items.map((s) => (
                    <li key={s} className="flex items-center gap-3 border-b border-granate/10 pb-3">
                      <span aria-hidden className="h-1.5 w-1.5 shrink-0 bg-granate" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Otras cabañas de la misma categoría */}
        <section id="otras" className="scroll-mt-40 border-t border-granate/15 px-[var(--gutter)] py-28 sm:py-36">
          <p data-reveal className="text-center text-[0.92rem] uppercase tracking-[0.3em] text-granate/70">Otras cabañas</p>
          <h2 className="mt-4 text-center font-[family-name:var(--font-display)] text-[clamp(2.6rem,4.4vw,4.4rem)] leading-[1.02] text-granate">
            {categoria.nombre}
          </h2>
          <ul className="mt-16 grid gap-x-8 gap-y-20 lg:grid-cols-2">
            {otras.slice(0, 2).map((o) => (
              <li key={o.slug}>
                <CabanaCard cabana={o} />
              </li>
            ))}
          </ul>
          {otras.length > 2 && (
            <div className="mt-16 flex justify-center">
              <Pill href={`/cabanas#${c.categoria}`}>Ver todas</Pill>
            </div>
          )}
        </section>

        <ReservaBanda texto={`Elige tus fechas y reserva la ${c.nombre}.`} />
      </main>
    </>
  );
}
