export type BrandColor =
  | "granate"
  | "carmesi"
  | "coral"
  | "marfil"
  | "rosa"
  | "verde"
  | "dorado"
  | "blanco";

/**
 * Color único para todos los espacios de foto mientras no haya fotografía oficial.
 * Cambiar a `null` para volver a usar el tono definido en cada dato.
 */
export const PLACEHOLDER_COLOR: BrandColor | null = "rosa";

/** Fondo + color de línea/texto con contraste suficiente sobre ese fondo */
export const tone: Record<BrandColor, { bg: string; fg: string }> = {
  granate: { bg: "bg-granate", fg: "text-rosa" },
  carmesi: { bg: "bg-carmesi", fg: "text-marfil" },
  coral: { bg: "bg-coral", fg: "text-marfil" },
  marfil: { bg: "bg-marfil", fg: "text-carmesi" },
  rosa: { bg: "bg-rosa", fg: "text-granate" },
  verde: { bg: "bg-verde", fg: "text-dorado" },
  dorado: { bg: "bg-dorado", fg: "text-granate" },
  blanco: { bg: "bg-blanco", fg: "text-carmesi" },
};
