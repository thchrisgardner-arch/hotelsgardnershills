import { Foto as Image } from "@/components/ui/Foto";
import { tone, PLACEHOLDER_COLOR, MOSTRAR_FOTOS } from "@/lib/brand";

/**
 * Marco en arco (lenguaje del XD y los wireframes, eco de las fachadas de las cabañas).
 * Con `src` muestra la foto; sin ella, el bloque de color único de marca.
 */
type Props = {
  src?: string | null;
  alt?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  shape?: "arch" | "circle" | "pill";
  reveal?: boolean;
  hoverZoom?: boolean;
};

export function Arch({
  src,
  alt = "",
  className = "",
  sizes = "50vw",
  priority,
  shape = "arch",
  reveal = true,
  hoverZoom = false,
}: Props) {
  // Todas las imágenes van con esquinas rectas (decisión del cliente 2026-11-19); `shape` se conserva por compatibilidad.
  const radius = { arch: "", circle: "", pill: "" }[shape];
  const t = tone[PLACEHOLDER_COLOR ?? "rosa"];
  return (
    <figure
      data-reveal-media={reveal ? "" : undefined}
      className={`relative overflow-hidden ${radius} ${src && MOSTRAR_FOTOS ? "bg-rosa/40" : t.bg} ${className}`}
    >
      <div
        data-media-inner
        className={`absolute inset-0 ${hoverZoom ? "transition-transform duration-[1.4s] ease-[var(--ease-soft)] group-hover:scale-[1.05]" : ""}`}
      >
        {src && <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />}
      </div>
    </figure>
  );
}
