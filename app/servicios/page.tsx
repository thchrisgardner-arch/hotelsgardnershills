import type { Metadata } from "next";
import { MotionController } from "@/components/layout/MotionController";
import { PageHero } from "@/components/layout/PageHero";
import { Lines } from "@/components/ui/Lines";
import { Arch } from "@/components/ui/Arch";
import { Pill } from "@/components/ui/Pill";
import { Experiencias } from "@/components/sections/Experiencias";
import { ReservaBanda } from "@/components/sections/ReservaBanda";
import { servicios } from "@/data/servicios";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Servicios",
  description: "Hotel, spa y gimnasio en Gardners Hills, Villanueva, La Guajira.",
  alternates: { canonical: "/servicios" },
};

/** Estructura del wireframe «Servicios»: intro, tarjetas en arco, banda en píldora y experiencias */
export default function ServiciosPage() {
  return (
    <>
      <MotionController />
      <main>
        <PageHero titulo="Servicios" kicker="Hotel · Spa · Gym" foto="/images/cabanas/cabanas-jardin.jpg" alt="Jardín de Gardners Hills" />

        {/* Intro */}
        <section className="px-[var(--gutter)] py-28 sm:py-36">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
            <Lines
              as="h2"
              className="font-[family-name:var(--font-display)] text-[clamp(2.6rem,4.8vw,4.8rem)] leading-[1.02] text-granate"
              lines={["Descubre nuestros servicios", <>en <span key="i" className="t-italic">Gardners Hills</span></>]}
            />
            <div className="lg:justify-self-end">
              <p data-reveal className="max-w-md text-granate/85">
                Todo lo que necesitas para que la calma continúe más allá de la cabaña. Escríbenos y te ayudamos a
                preparar tu estancia.
              </p>
              <div data-reveal className="mt-8">
                <Pill href="/reservas">Reservar ahora</Pill>
              </div>
            </div>
          </div>

          <ul className="mt-20 grid gap-x-6 gap-y-16 md:grid-cols-3">
            {servicios.map((s) => (
              <li key={s.id} id={s.id} className="flex flex-col">
                <Arch src={s.foto} alt={s.titulo} className="aspect-[3/4] w-full" sizes="(min-width: 768px) 32vw, 100vw" />
                <h3 data-reveal className="mt-7 flex items-baseline gap-4 border-b border-granate/20 pb-3 text-granate">
                  <span className="text-[0.86rem] font-normal uppercase tracking-[0.24em]">Hills</span>
                  <span className="t-italic text-[2.6rem] leading-none">{s.titulo}</span>
                </h3>
                <p data-reveal className="mt-4 text-granate/80">{s.texto}</p>
              </li>
            ))}
          </ul>
          <p data-reveal className="mt-12 text-base text-granate/55">Tratamientos, horarios y equipamiento por confirmar.</p>
        </section>

        {/* Banda en píldora */}
        <section className="px-[var(--gutter)] pb-28 sm:pb-36">
          <div className="mx-auto flex min-h-[340px] max-w-6xl flex-col items-center justify-center rounded-full border border-granate/30 px-10 py-16 text-center">
            <Lines
              as="p"
              className="font-[family-name:var(--font-display)] text-[clamp(2.6rem,5vw,5rem)] leading-none text-granate"
              lines={[<><span key="i" className="t-italic">Diseña</span> tu experiencia</>]}
            />
            <p data-reveal className="mt-6 max-w-lg text-granate/80">
              Cuéntanos qué buscas —descanso, celebración o desconexión— y preparamos tu estancia contigo.
            </p>
            <div data-reveal className="mt-8">
              <Pill href={`https://wa.me/${site.contact.whatsapp}`} target="_blank" rel="noreferrer">
                Escríbenos por WhatsApp
              </Pill>
            </div>
          </div>
        </section>

        <Experiencias />
        <ReservaBanda />
      </main>
    </>
  );
}
