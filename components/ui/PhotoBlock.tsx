import { Foto as Image } from "@/components/ui/Foto";
import { PLACEHOLDER_COLOR, tone, type BrandColor } from "@/lib/brand";
import { Motif, type MotifName } from "./Motif";

/**
 * Contenedor fotográfico. Si hay `src` muestra la foto oficial;
 * si no, un bloque de color de marca con motivo lineal y la descripción de la toma.
 */
type Props = {
  color: BrandColor;
  motif?: MotifName;
  caption?: string;
  src?: string | null;
  alt?: string;
  className?: string;
  motifClassName?: string;
  sizes?: string;
  priority?: boolean;
  /** atributo para animación de revelado */
  reveal?: boolean;
  /** bloque principal del hero: se anima al terminar la intro */
  hero?: boolean;
  captionClassName?: string;
};

export function PhotoBlock({
  color,
  motif,
  caption,
  src,
  alt = "",
  className = "",
  motifClassName = "w-3/5 max-h-[70%]",
  sizes = "100vw",
  priority,
  reveal = true,
  hero,
  captionClassName = "left-4 top-4 right-4",
}: Props) {
  const t = tone[!src && PLACEHOLDER_COLOR ? PLACEHOLDER_COLOR : color];
  return (
    <figure
      data-reveal-media={reveal ? "" : undefined}
      data-hero-media={hero ? "" : undefined}
      className={`relative overflow-hidden ${t.bg} ${t.fg} ${className}`}
    >
      <div data-media-inner className="absolute inset-0">
        {src ? (
          <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
        ) : (
          motif && (
            <div className="absolute inset-0 flex items-end justify-center p-[8%] opacity-70">
              <Motif name={motif} className={motifClassName} />
            </div>
          )
        )}
      </div>
      {!src && caption && (
        <figcaption className={`absolute ${captionClassName} text-[0.82rem] uppercase tracking-[0.2em] opacity-80`}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
