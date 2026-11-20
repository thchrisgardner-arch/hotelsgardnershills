import { Lines } from "@/components/ui/Lines";
import { Pill } from "@/components/ui/Pill";
import type { Lang } from "@/lib/routes";

/** Banda «Reserva tu estancia» entre líneas finas */
export function ReservaBanda({ lang, texto }: { lang: Lang; texto?: string }) {
  const t = {
    es: { texto: "Tu próxima escapada comienza aquí.", l1: "Reserva", l2: "tu estancia", cta: "Reservar ahora", aria: "Reservar" },
    en: { texto: "Your next getaway starts here.", l1: "Book", l2: "your stay", cta: "Book now", aria: "Book" },
  }[lang];
  return (
    <section aria-label={t.aria} className="border-y border-granate/15 px-[var(--gutter)] py-28 text-center sm:py-36">
      <p data-reveal className="mx-auto mb-8 max-w-md text-granate">
        {texto ?? t.texto}
      </p>
      <Lines
        as="p"
        className="font-[family-name:var(--font-display)] text-[clamp(3.2rem,8.4vw,8.6rem)] leading-[0.95] text-granate"
        lines={[<span key="i" className="t-italic">{t.l1}</span>, t.l2]}
      />
      <div data-reveal className="mt-14">
        <Pill href="/reservas">{t.cta}</Pill>
      </div>
    </section>
  );
}
