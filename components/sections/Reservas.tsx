import { Lines } from "@/components/ui/Lines";
import { BookingForm } from "@/components/booking/BookingForm";
import { site } from "@/data/site";

/** «Reserva en Gardner Hills» (wireframe Home / Booking) */
export function Reservas() {
  return (
    <section id="reservas" aria-labelledby="res-title" className="bg-marfil/40 px-[var(--gutter)] py-28 sm:py-36">
      <div className="grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p data-reveal className="text-[0.86rem] font-normal uppercase tracking-[0.24em] text-granate/70">
            Petición de reserva
          </p>
          <Lines
            id="res-title"
            className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2.8rem,4.8vw,4.8rem)] leading-[1] text-granate"
            lines={["Reserva en", <span key="i" className="t-italic">Gardners Hills</span>]}
          />
          <p data-reveal className="mt-8 max-w-md leading-[1.4] text-granate/85">
            Tu próxima escapada comienza aquí. Tras recibir tu solicitud nos pondremos en contacto lo antes posible para
            confirmar la reserva y coordinar los detalles.
          </p>
          <dl data-reveal className="mt-10 space-y-3 text-granate">
            <div className="flex gap-4">
              <dt className="w-24 text-[0.82rem] font-normal uppercase tracking-[0.18em] text-granate/60">WhatsApp</dt>
              <dd><a href={`https://wa.me/${site.contact.whatsapp}`} target="_blank" rel="noreferrer" className="hover:text-carmesi">{site.contact.whatsappLabel}</a></dd>
            </div>
            <div className="flex gap-4">
              <dt className="w-24 text-[0.82rem] font-normal uppercase tracking-[0.18em] text-granate/60">Correo</dt>
              <dd><a href={`mailto:${site.contact.email}`} className="hover:text-carmesi">{site.contact.email}</a></dd>
            </div>
          </dl>
        </div>
        <div data-reveal className="lg:col-span-6 lg:col-start-7">
          <BookingForm />
        </div>
      </div>
    </section>
  );
}
