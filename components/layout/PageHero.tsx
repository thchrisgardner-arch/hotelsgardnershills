import Image from "next/image";
import { Lines } from "@/components/ui/Lines";

/**
 * Cabecera de página interna (wireframes V2: bloque granate con título enorme abajo a la izquierda).
 * Opcionalmente lleva una foto a la derecha en arco.
 */
export function PageHero({
  titulo,
  kicker,
  foto,
  alt = "",
}: {
  titulo: string;
  kicker?: string;
  foto?: string;
  alt?: string;
}) {
  return (
    <section data-header-light className="relative overflow-hidden bg-granate text-marfil">
      <div className="grid min-h-[78vh] items-end gap-10 px-[var(--gutter)] pb-14 pt-[calc(var(--header-h)+3rem)] lg:grid-cols-[1fr_auto]">
        <div>
          {kicker && (
            <p data-reveal className="mb-6 text-[0.72rem] font-medium uppercase tracking-[0.28em] text-rosa">
              {kicker}
            </p>
          )}
          <Lines
            as="h1"
            className="font-[family-name:var(--font-display)] text-[clamp(4rem,11vw,11.5rem)] uppercase leading-[0.86]"
            lines={[titulo]}
          />
        </div>
        {foto && (
          <figure data-reveal-media className="relative mb-2 hidden aspect-[3/4] w-[clamp(14rem,22vw,22rem)] overflow-hidden rounded-t-[999px] lg:block">
            <div data-media-inner className="absolute inset-0">
              <Image src={foto} alt={alt} fill sizes="22vw" priority className="object-cover" />
            </div>
          </figure>
        )}
      </div>
    </section>
  );
}
