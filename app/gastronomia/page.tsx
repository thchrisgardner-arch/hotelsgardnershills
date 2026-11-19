import type { Metadata } from "next";
import Link from "next/link";
import { MotionController } from "@/components/layout/MotionController";
import { Lines } from "@/components/ui/Lines";
import { Arch } from "@/components/ui/Arch";
import { Pill } from "@/components/ui/Pill";
import { ReservaBanda } from "@/components/sections/ReservaBanda";
import { espacios, gastronomiaFrase, gastronomiaIntro, type Espacio } from "@/data/gastronomia";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Gastronomía & Bar",
  description: "Restaurante y bar en Gardners Hills, Villanueva, La Guajira.",
  alternates: { canonical: "/gastronomia" },
};

const iconos: Record<Espacio["detalles"][number]["icono"], React.ReactNode> = {
  plato: <><circle cx="12" cy="12" r="7" /><circle cx="12" cy="12" r="3.5" /></>,
  reloj: <><circle cx="12" cy="12" r="8" /><path d="M12 7.5V12l3 2" /></>,
  sierra: <path d="M3 18l5.5-8 3.5 5 2.5-3.5L21 18z" />,
  copa: <path d="M7 4h10l-5 7zM12 11v8M8.5 19h7" />,
};

const masAlla = [
  { titulo: "Cabañas", texto: "Arquitectura blanca y madera frente a la sierra.", href: "/cabanas" },
  { titulo: "Actividades", texto: "Ríos, pueblo y cocina de la región a pocos pasos.", href: "/actividades" },
  { titulo: "Servicios", texto: "Spa y gimnasio para que la calma continúe.", href: "/servicios" },
];

/** Estructura de la página de restaurantes de Grand Hotel Miramare con el lenguaje visual de Gardners Hills */
export default function GastronomiaPage() {
  const wa = (espacio: string) =>
    `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(`Hola, quiero información sobre el ${espacio} de Gardners Hills.`)}`;

  return (
    <>
      <MotionController />
      <main>
        {/* Portada: rótulo + título en cursiva centrado, como la referencia */}
        <section data-header-light className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-granate px-[var(--gutter)] text-center text-marfil">
          <div>
            <p data-reveal className="text-[0.86rem] font-normal uppercase tracking-[0.28em] text-marfil/70">
              Gastronomía &amp; Bar
            </p>
            <Lines
              as="h1"
              className="mt-8 font-[family-name:var(--font-display)] text-[clamp(4rem,10vw,10.5rem)] leading-[0.9]"
              lines={[<span key="a" className="t-italic">El sabor</span>, <span key="b" className="t-italic">de la sierra</span>]}
            />
          </div>
        </section>

        {/* Intro: imagen a la izquierda, texto en mayúsculas a la derecha */}
        <section className="grid gap-12 px-[var(--gutter)] py-28 sm:py-36 lg:grid-cols-12 lg:items-center">
          <Arch className="aspect-[4/5] w-full lg:col-span-5" sizes="(min-width: 1024px) 40vw, 100vw" />
          <p
            data-reveal
            className="font-[family-name:var(--font-display)] text-[clamp(2rem,3.3vw,3.4rem)] uppercase leading-[1.08] text-granate lg:col-span-6 lg:col-start-7"
          >
            {gastronomiaIntro}
          </p>
        </section>

        <section className="px-[var(--gutter)] pb-28 text-center sm:pb-36">
          <Lines
            as="p"
            className="mx-auto max-w-5xl font-[family-name:var(--font-display)] text-[clamp(2rem,3.6vw,3.6rem)] uppercase leading-[1.08] text-granate"
            lines={[gastronomiaFrase]}
          />
        </section>

        {/* Espacios: bloques alternos imagen / texto */}
        <section aria-label="Espacios" className="space-y-28 px-[var(--gutter)] pb-28 sm:space-y-36 sm:pb-36">
          {espacios.map((e) => (
            <article key={e.id} id={e.id} className="grid gap-12 lg:grid-cols-12 lg:items-center">
              <Arch
                src={e.foto}
                alt={e.titulo}
                className="aspect-[4/5] w-full lg:col-span-5"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
              <div className="lg:col-span-6 lg:col-start-7">
                <Lines
                  as="h2"
                  className="font-[family-name:var(--font-display)] text-[clamp(3rem,5vw,5.2rem)] uppercase leading-[0.95] text-granate"
                  lines={[e.titulo]}
                />
                <p data-reveal className="mt-8 max-w-md text-granate/85">{e.texto}</p>
                <ul data-reveal className="mt-8 space-y-3 text-granate/85">
                  {e.detalles.map((d) => (
                    <li key={d.texto} className="flex items-center gap-4">
                      <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round">
                        {iconos[d.icono]}
                      </svg>
                      {d.texto}
                    </li>
                  ))}
                </ul>
                <div data-reveal className="mt-10 flex flex-wrap gap-4">
                  <Pill href={wa(e.titulo.toLowerCase())} target="_blank" rel="noreferrer" tone="solid">
                    Reservar mesa
                  </Pill>
                  <Pill href="/reservas">Reservar estancia</Pill>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* Más allá de la mesa: tarjetas editoriales */}
        <section className="border-t border-granate/15 px-[var(--gutter)] py-28 sm:py-36">
          <Lines
            as="h2"
            className="font-[family-name:var(--font-display)] text-[clamp(2.6rem,4.8vw,4.8rem)] leading-[1.02] text-granate"
            lines={[<>Más allá <span key="i" className="t-italic">de la mesa</span></>]}
          />
          <ul className="mt-16 grid gap-x-6 gap-y-14 md:grid-cols-3">
            {masAlla.map((m) => (
              <li key={m.href}>
                <Link href={m.href} className="group block">
                  <Arch shape="pill" className="aspect-[4/5] w-full" sizes="(min-width: 768px) 32vw, 100vw" hoverZoom />
                  <h3 data-reveal className="mt-7 border-b border-granate/20 pb-3 t-italic text-[2.6rem] leading-none text-granate transition-colors group-hover:text-carmesi">
                    {m.titulo}
                  </h3>
                  <p data-reveal className="mt-4 text-granate/80">{m.texto}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <ReservaBanda texto="Una mesa sin prisa te espera en Gardners Hills." />
      </main>
    </>
  );
}
