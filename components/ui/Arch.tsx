import Image from "next/image";
import { tone, PLACEHOLDER_COLOR } from "@/lib/brand";

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
  const radius = { arch: "rounded-t-[999px]", circle: "rounded-full", pill: "rounded-[999px]" }[shape];
  const t = tone[PLACEHOLDER_COLOR ?? "rosa"];
  return (
    <figure
      data-reveal-media={reveal ? "" : undefined}
      className={`relative overflow-hidden ${radius} ${src ? "bg-rosa/40" : t.bg} ${className}`}
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
