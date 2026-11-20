/**
 * MAQUETA VISUAL (solo local). Con NEXT_PUBLIC_FOTOS_MAQUETA=1 en .env.local, los espacios de foto
 * se llenan con fotografías de referencia copiadas en public/maqueta/ para ver cómo luce la página.
 *
 * ⚠ Esas fotos son de otros hoteles (no son de Gardners Hills ni tenemos derechos sobre ellas): son solo
 * para el prototipo y deben reemplazarse por fotos propias antes de publicar el sitio. Están en el repo
 * (decisión del usuario, 2026-11-20), pero solo se muestran si la variable está activa.
 * Sin la variable, el sitio se comporta como siempre (espacios en gris).
 */
export const MAQUETA = process.env.NEXT_PUBLIC_FOTOS_MAQUETA === "1";

const TOTAL_AMBIENTE = 70;

/** Foto de ambiente estable para cada espacio (misma semilla → misma foto en servidor y navegador) */
export function fotoAmbiente(semilla: string) {
  let h = 0;
  for (let i = 0; i < semilla.length; i++) h = (h * 31 + semilla.charCodeAt(i)) >>> 0;
  return `/maqueta/ambiente/ambiente-${String((h % TOTAL_AMBIENTE) + 1).padStart(2, "0")}.webp`;
}

/** Juegos de fotos por cabaña (en el orden de data/cabanas.ts) */
const JUEGOS: [number, number][] = [
  [1, 3], [2, 3], [3, 3], [5, 3], [6, 3], [7, 3], [9, 3], [10, 3], [11, 3],
];
export function fotosCabana(indice: number) {
  const [n, total] = JUEGOS[indice % JUEGOS.length];
  return Array.from({ length: total }, (_, k) => `/maqueta/cabanas/cabana-${String(n).padStart(2, "0")}-${k + 1}.jpg`);
}
