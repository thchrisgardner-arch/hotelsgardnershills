/**
 * Actividades cercanas a Villanueva, La Guajira.
 * NO se publican distancias, horarios ni operadores hasta verificarlos.
 */
type Texto = { es: string; en: string };
export type Actividad = {
  id: string;
  titulo: Texto;
  texto: Texto;
  icono: "mountain" | "music" | "footprints" | "utensils" | "droplets" | "landmark";
};

export const actividades: Actividad[] = [
  {
    // El id es también el ancla en Servicios (/servicios#… y /en/services#…), enlazada desde la portada
    id: "serrania-del-perija",
    titulo: { es: "Serranía del Perijá", en: "Serranía del Perijá" },
    texto: {
      es: "La montaña que enmarca Villanueva. Paisaje, aire fresco y caminos para recorrer sin prisa.",
      en: "The mountain range that frames Villanueva. Scenery, fresh air and trails to explore unhurried.",
    },
    icono: "mountain",
  },
  {
    id: "cultura-vallenata",
    titulo: { es: "Cultura vallenata", en: "Vallenato culture" },
    texto: {
      es: "Villanueva es tierra de acordeoneros. Su música se vive en la calle y en el Festival Cuna de Acordeones.",
      en: "Villanueva is a land of accordion players. Its music lives in the streets and at the Cuna de Acordeones Festival.",
    },
    icono: "music",
  },
  {
    id: "senderos",
    titulo: { es: "Senderos y caminatas", en: "Trails and walks" },
    texto: { es: "Rutas de naturaleza en los alrededores.", en: "Nature routes in the surrounding area." },
    icono: "footprints",
  },
  {
    id: "rios",
    titulo: { es: "Ríos y balnearios", en: "Rivers and swimming spots" },
    texto: { es: "Agua fría que baja de la sierra.", en: "Cool water flowing down from the mountains." },
    icono: "droplets",
  },
  {
    id: "gastronomia-local",
    titulo: { es: "Cocina de la región", en: "Regional cuisine" },
    texto: { es: "Sabores guajiros y del Cesar a pocos pasos.", en: "Flavours of La Guajira and Cesar just steps away." },
    icono: "utensils",
  },
  {
    id: "pueblo",
    titulo: { es: "El pueblo", en: "The town" },
    texto: { es: "Calles tranquilas, plaza y vida local para descubrir a pie.", en: "Quiet streets, a main square and local life to discover on foot." },
    icono: "landmark",
  },
];
