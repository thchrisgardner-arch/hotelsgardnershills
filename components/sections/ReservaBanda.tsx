import { Lines } from "@/components/ui/Lines";
import { Pill } from "@/components/ui/Pill";

/** Banda «Reserva tu estancia» entre líneas finas (wireframes V2) */
export function ReservaBanda({ texto = "Tu próxima escapada comienza aquí." }: { texto?: string }) {
  return (
    <section aria-label="Reservar" className="border-y border-granate/15 px-[var(--gutter)] py-28 text-center sm:py-36">
      <p data-reveal className="mx-auto mb-8 max-w-md text-granate/80">
        {texto}
      </p>
      <Lines
        as="p"
        className="font-[family-name:var(--font-display)] text-[clamp(4rem,8.4vw,8.6rem)] leading-[0.95] text-granate"
        lines={[<span key="i" className="t-italic">Reserva</span>, "tu estancia"]}
      />
      <div data-reveal className="mt-14">
        <Pill href="/reservas">Reservar ahora</Pill>
      </div>
    </section>
  );
}
