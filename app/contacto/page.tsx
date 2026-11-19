import type { Metadata } from "next";
import { MotionController } from "@/components/layout/MotionController";
import { Lines } from "@/components/ui/Lines";
import { ContactTabs } from "@/components/contact/ContactTabs";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Contacta a Gardners Hills por WhatsApp o correo. Villanueva, La Guajira, Colombia.",
  alternates: { canonical: "/contacto" },
};

/**
 * Estructura de la página «Contact & Arrival» de la referencia, con contenido propio:
 * apertura tipográfica centrada + datos, secciones a dos columnas
 * (título en mayúsculas a la izquierda, contenido a la derecha) y lista de contacto directo.
 */
export default function ContactoPage() {
  const { contact, location } = site;
  const h2 = "font-[family-name:var(--font-display)] text-[clamp(2.6rem,4vw,4.2rem)] uppercase leading-[0.95] text-carmesi";

  return (
    <>
      <MotionController />
      <main>
        {/* Apertura tipográfica */}
        <section className="flex min-h-[86vh] flex-col items-center justify-center px-[var(--gutter)] pb-20 pt-[calc(var(--header-h)+5rem)] text-center">
          <Lines
            as="h1"
            className="t-italic text-[clamp(4.2rem,10vw,10rem)] leading-[0.92] text-carmesi"
            lines={["Contacto", "y llegada"]}
          />
          <address data-reveal className="mt-12 space-y-1 not-italic text-carmesi">
            <p>{location.address ?? "Dirección por confirmar"}</p>
            <p>
              {location.town}, {location.region} · {location.country}
            </p>
            <p>
              <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-granate">
                {contact.whatsappLabel}
              </a>
            </p>
            <p>
              <a href={`mailto:${contact.email}`} className="underline underline-offset-4 hover:text-granate">
                {contact.email}
              </a>
            </p>
          </address>
        </section>

        {/* Escríbenos: título + pestañas */}
        <section className="grid gap-14 px-[var(--gutter)] pb-28 sm:pb-36 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Lines as="h2" className={h2} lines={["Escríbenos"]} />
            <p data-reveal className="mt-8 max-w-sm text-granate/85">
              Elige el canal que prefieras. Te ayudamos a planear tu estancia en Gardners Hills.
            </p>
          </div>
          <div data-reveal className="lg:col-span-7 lg:col-start-6">
            <ContactTabs />
          </div>
        </section>

        {/* Cómo llegar */}
        <section className="grid gap-14 border-t border-granate/15 px-[var(--gutter)] py-28 sm:py-36 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Lines as="h2" className={h2} lines={["Cómo llegar a", "Gardners Hills"]} />
          </div>
          <div className="space-y-8 lg:col-span-7 lg:col-start-6">
            <div data-reveal className="max-w-xl">
              <p className="text-carmesi">Dónde estamos</p>
              <p className="mt-2 text-granate/85">
                En Villanueva, La Guajira, a los pies de la Serranía del Perijá. Escríbenos y te compartimos la ubicación
                exacta y las indicaciones para llegar.
              </p>
            </div>
            <div data-reveal className="flex min-h-[280px] items-center justify-center overflow-hidden rounded-full border border-granate/30 bg-marfil/40 px-10 text-center">
              {location.mapsUrl ? (
                <a href={location.mapsUrl} target="_blank" rel="noreferrer" className="text-[0.78rem] font-medium uppercase tracking-[0.2em] text-granate hover:text-carmesi">
                  Ver ubicación en el mapa →
                </a>
              ) : (
                <p className="text-[0.78rem] font-medium uppercase tracking-[0.2em] text-granate/60">Mapa · ubicación por confirmar</p>
              )}
            </div>
          </div>
        </section>

        {/* Contacto directo (como la lista de correos de la referencia) */}
        <section className="border-t border-granate/15 px-[var(--gutter)] py-24 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-12">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,3vw,3rem)] uppercase leading-none text-carmesi lg:col-span-4">
              Contacto directo
            </h2>
            <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:col-span-7 lg:col-start-6 lg:grid-cols-3">
              <li>
                <p className="text-[0.85rem] text-granate/60">Reservas y consultas</p>
                <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noreferrer" className="mt-1 block text-carmesi underline decoration-carmesi/40 underline-offset-4 hover:text-granate">
                  WhatsApp {contact.whatsappLabel}
                </a>
              </li>
              <li>
                <p className="text-[0.85rem] text-granate/60">Teléfono</p>
                <a href={`tel:${contact.phone?.replace(/\s/g, "")}`} className="mt-1 block text-carmesi underline decoration-carmesi/40 underline-offset-4 hover:text-granate">
                  {contact.phone}
                </a>
              </li>
              <li>
                <p className="text-[0.85rem] text-granate/60">Correo</p>
                <a href={`mailto:${contact.email}`} className="mt-1 block text-carmesi underline decoration-carmesi/40 underline-offset-4 hover:text-granate">
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
