import type { Metadata } from "next";
import { MotionController } from "@/components/layout/MotionController";
import { PageHero } from "@/components/layout/PageHero";
import { Lines } from "@/components/ui/Lines";
import { Reservas } from "@/components/sections/Reservas";

export const metadata: Metadata = {
  title: "Reservas",
  description: "Solicita tu reserva en Gardners Hills, hotel boutique de cabañas en Villanueva, La Guajira.",
  alternates: { canonical: "/reservas" },
};

/** Wireframe «Booking»: tarifas + formulario de solicitud. Las tarifas aún no están confirmadas. */
export default function ReservasPage() {
  return (
    <>
      <MotionController />
      <main>
        <PageHero titulo="Reservas" kicker="Tu próxima escapada" foto="/images/cabanas/cabana-terraza.jpg" alt="Terrazas de las cabañas" />

        <section className="px-[var(--gutter)] py-28 sm:py-36">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
            <Lines
              as="h2"
              className="font-[family-name:var(--font-display)] text-[clamp(2.6rem,4.8vw,4.8rem)] leading-[1.02] text-granate"
              lines={[<>Tarifas en <span key="i" className="t-italic">Gardners Hills</span></>]}
            />
            <p data-reveal className="max-w-md text-granate/85 lg:justify-self-end">
              Las tarifas por temporada se publicarán muy pronto. Mientras tanto, envíanos tus fechas y te enviamos la
              cotización por WhatsApp.
            </p>
          </div>
          <ul className="mt-16 grid gap-6 md:grid-cols-3">
            {["Fechas", "Huéspedes", "Confirmación"].map((t, i) => (
              <li key={t} data-reveal className="flex flex-col items-center border border-granate/25 px-8 pb-10 pt-24 text-center">
                <span className="text-[0.86rem] font-normal tracking-[0.2em] text-granate/50">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-3 font-[family-name:var(--font-display)] text-[2.2rem] uppercase leading-none text-carmesi">{t}</p>
                <p className="mt-5 text-granate/80">
                  {i === 0 && "Elige tu entrada y salida en el buscador o en el formulario."}
                  {i === 1 && "Indica cuántas personas y cuántas cabañas necesitas."}
                  {i === 2 && "Te respondemos por WhatsApp con disponibilidad y tarifa."}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <Reservas />
      </main>
    </>
  );
}
