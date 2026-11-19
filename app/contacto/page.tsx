import type { Metadata } from "next";
import { MotionController } from "@/components/layout/MotionController";
import { PageHero } from "@/components/layout/PageHero";
import { Lines } from "@/components/ui/Lines";
import { ContactForm } from "@/components/contact/ContactForm";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Contacta a Gardners Hills por WhatsApp o correo. Villanueva, La Guajira, Colombia.",
  alternates: { canonical: "/contacto" },
};

/** Wireframe «Contacto»: datos a la izquierda, formulario a la derecha y mapa en píldora */
export default function ContactoPage() {
  const { contact, location } = site;
  const titulo = "font-[family-name:var(--font-display)] text-[2rem] leading-none text-granate";
  return (
    <>
      <MotionController />
      <main>
        <PageHero titulo="Contacto" kicker="Estamos para ayudarte" />

        <section className="px-[var(--gutter)] py-28 sm:py-36">
          <Lines
            as="h2"
            className="mx-auto max-w-4xl text-center font-[family-name:var(--font-display)] text-[clamp(2.6rem,4.8vw,4.8rem)] leading-[1.02] text-granate"
            lines={["¿Tienes preguntas?", <span key="i" className="t-italic">Estamos aquí para ayudarte</span>]}
          />

          <div className="mt-20 grid gap-16 lg:grid-cols-12">
            <div className="space-y-12 lg:col-span-4">
              <div data-reveal>
                <h3 className={`t-italic ${titulo}`}>Contacto</h3>
                <p className="mt-4 text-granate/85">Escríbenos y te ayudamos a planear tu estancia.</p>
                <ul className="mt-6 space-y-2 text-granate">
                  <li><span className="mr-3 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-granate/60">WhatsApp</span><a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noreferrer" className="hover:text-carmesi">{contact.whatsappLabel}</a></li>
                  <li><span className="mr-3 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-granate/60">Correo</span><a href={`mailto:${contact.email}`} className="hover:text-carmesi">{contact.email}</a></li>
                </ul>
              </div>
              <div data-reveal>
                <h3 className={`t-italic ${titulo}`}>Dirección</h3>
                <p className="mt-4 text-granate/85">
                  {location.address ?? "Dirección por confirmar"}
                  <br />
                  {location.town}, {location.region} · {location.country}
                </p>
              </div>
            </div>
            <div data-reveal className="lg:col-span-7 lg:col-start-6">
              <ContactForm />
            </div>
          </div>

          {/* Mapa en píldora (wireframe): se activa cuando haya ubicación confirmada */}
          <div data-reveal className="mt-28 flex min-h-[320px] items-center justify-center overflow-hidden rounded-full border border-granate/30 bg-marfil/40 px-10 text-center">
            {location.mapsUrl ? (
              <a href={location.mapsUrl} target="_blank" rel="noreferrer" className="text-[0.78rem] font-medium uppercase tracking-[0.2em] text-granate hover:text-carmesi">Ver ubicación en el mapa →</a>
            ) : (
              <p className="text-[0.78rem] font-medium uppercase tracking-[0.2em] text-granate/60">Mapa · ubicación por confirmar</p>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
