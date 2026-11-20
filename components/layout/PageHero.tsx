import { Foto as Image } from "@/components/ui/Foto";
import { Lines } from "@/components/ui/Lines";

/**
 * Cabecera de página interna con el mismo esquema del hero del home:
 * rótulo pequeño recto arriba y título en cursiva inclinado, centrados.
 * La foto (si hay y MOSTRAR_FOTOS está activo) va de fondo con un velo oscuro.
 */
export function PageHero({
  titulo,
  kicker,
  foto,
  alt = "",
}: {
  /** Una línea o varias (cada elemento es una línea del título inclinado) */
  titulo: string | string[];
  kicker?: string;
  foto?: string;
  alt?: string;
}) {
  return (
    <section data-header-light className="relative overflow-hidden bg-granate text-marfil">
      {foto && (
        <div aria-hidden className="absolute inset-0">
          <Image src={foto} alt={alt} fill sizes="100vw" priority className="object-cover" />
          <div className="absolute inset-0 bg-black/45" />
        </div>
      )}
      <div className="relative flex min-h-[86vh] flex-col items-center justify-center px-[var(--gutter)] pb-24 pt-[calc(var(--header-h)+4rem)] text-center">
        {kicker && (
          <p data-reveal className="text-[0.92rem] font-normal uppercase tracking-[0.3em] text-marfil">
            {kicker}
          </p>
        )}
        <Lines
          as="h1"
          className="t-hero t-italic mt-8 text-[clamp(4.6rem,10vw,10.5rem)] leading-[0.92]"
          lines={Array.isArray(titulo) ? titulo : [titulo]}
        />
      </div>
    </section>
  );
}
