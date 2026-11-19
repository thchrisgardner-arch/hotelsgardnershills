import type { Metadata } from "next";
import { MotionController } from "@/components/layout/MotionController";
import { PageHero } from "@/components/layout/PageHero";
import { Lines } from "@/components/ui/Lines";
import { Arch } from "@/components/ui/Arch";
import { Pill } from "@/components/ui/Pill";
import { Refugio } from "@/components/sections/Refugio";
import { ReservaBanda } from "@/components/sections/ReservaBanda";
import { actividades } from "@/data/actividades";

export const metadata: Metadata = {
  title: "Actividades",
  description: "Qué hacer cerca de Gardners Hills: la Serranía del Perijá, la cultura vallenata y la vida de Villanueva, La Guajira.",
  alternates: { canonical: "/actividades" },
};

/** Estructura del wireframe «Actividades»: intro, arcos alineados y banda de reserva */
export default function ActividadesPage() {
  return (
    <>
      <MotionController />
      <main>
        <PageHero titulo="Actividades" kicker="Alrededores" foto="/images/cabanas/cabanas-sierra.jpg" alt="La sierra detrás de las cabañas" />

        <section className="px-[var(--gutter)] py-28 sm:py-36">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
            <Lines
              as="h2"
              className="font-[family-name:var(--font-display)] text-[clamp(2.6rem,4.8vw,4.8rem)] leading-[1.02] text-granate"
              lines={["Explora las actividades", <>que te esperan <span key="i" className="t-italic">cerca</span></>]}
            />
            <div className="lg:justify-self-end">
              <p data-reveal className="max-w-md text-granate/85">
                Villanueva está a los pies de la Serranía del Perijá: montaña, música vallenata y vida local para
                descubrir sin prisa, y volver a la calma de la cabaña al final del día.
              </p>
              <div data-reveal className="mt-8">
                <Pill href="/reservas">Reserva más</Pill>
              </div>
            </div>
          </div>

          <ul className="mt-20 grid gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {actividades.map((a, i) => (
              <li key={a.id} className="flex flex-col">
                <Arch className="aspect-[4/5] w-full" />
                <div data-reveal className="mt-7 flex items-baseline justify-between border-b border-granate/20 pb-3">
                  <h3 className="font-[family-name:var(--font-display)] text-[2rem] leading-none text-granate">{a.titulo}</h3>
                  <span className="text-[0.86rem] font-normal tracking-[0.18em] text-granate/50">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <p data-reveal className="mt-4 text-granate/80">{a.texto}</p>
                {a.distancia && <p className="mt-2 text-[0.98rem] uppercase tracking-[0.16em] text-carmesi">{a.distancia}</p>}
              </li>
            ))}
          </ul>
          <p data-reveal className="mt-12 text-base text-granate/55">Distancias, recorridos y recomendaciones por confirmar.</p>
        </section>

        <Refugio />
        <ReservaBanda />
      </main>
    </>
  );
}
