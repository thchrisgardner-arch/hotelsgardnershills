import type { BrandColor } from "@/lib/brand";

/**
 * Actividades cercanas a Villanueva, La Guajira.
 * NO se publican distancias, horarios ni operadores hasta verificarlos:
 * `distancia` y `enlace` quedan en null.
 * Para añadir una actividad basta con agregar un objeto a esta lista.
 */
export type Actividad = {
  id: string;
  titulo: string;
  texto: string;
  icono: "mountain" | "music" | "footprints" | "utensils" | "droplets" | "landmark";
  tono: BrandColor;
  distancia: string | null;
  enlace: string | null;
};

export const actividades: Actividad[] = [
  {
    id: "perija",
    titulo: "Serranía del Perijá",
    texto: "La montaña que enmarca Villanueva. Paisaje, aire fresco y caminos para recorrer sin prisa.",
    icono: "mountain",
    tono: "verde",
    distancia: null,
    enlace: null,
  },
  {
    id: "vallenato",
    titulo: "Cultura vallenata",
    texto: "Villanueva es tierra de acordeoneros. Su música se vive en la calle y en el Festival Cuna de Acordeones.",
    icono: "music",
    tono: "carmesi",
    distancia: null,
    enlace: null,
  },
  {
    id: "senderos",
    titulo: "Senderos y caminatas",
    texto: "Rutas de naturaleza en los alrededores.",
    icono: "footprints",
    tono: "dorado",
    distancia: null,
    enlace: null,
  },
  {
    id: "rios",
    titulo: "Ríos y balnearios",
    texto: "Agua fría que baja de la sierra.",
    icono: "droplets",
    tono: "rosa",
    distancia: null,
    enlace: null,
  },
  {
    id: "gastronomia-local",
    titulo: "Cocina de la región",
    texto: "Sabores guajiros y del Cesar a pocos pasos.",
    icono: "utensils",
    tono: "coral",
    distancia: null,
    enlace: null,
  },
  {
    id: "pueblo",
    titulo: "El pueblo",
    texto: "Calles tranquilas, plaza y vida local para descubrir a pie.",
    icono: "landmark",
    tono: "granate",
    distancia: null,
    enlace: null,
  },
];
