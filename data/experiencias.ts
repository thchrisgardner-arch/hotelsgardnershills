/**
 * Categorías editoriales de experiencia. SUJETAS A CONFIRMACIÓN:
 * se presentan como concepto, no como servicios disponibles.
 * Textos basados en la identidad verbal del manual de marca.
 */
export type Experiencia = {
  id: string;
  titulo: string;
  texto: string;
  icono: "moon" | "trees" | "utensils" | "sunrise";
  confirmada: boolean;
};

export const experiencias: Experiencia[] = [
  {
    id: "descanso",
    titulo: "Descanso",
    texto: "Aquí, el lujo es el tiempo, el espacio y el silencio.",
    icono: "moon",
    confirmada: false,
  },
  {
    id: "naturaleza",
    titulo: "Naturaleza",
    texto: "Cierra los ojos, escucha el viento, siente la brisa. La sierra a la vista, siempre.",
    icono: "trees",
    confirmada: false,
  },
  {
    id: "gastronomia",
    titulo: "Gastronomía",
    texto: "Sabores sencillos, servidos sin prisa. El detalle está en lo esencial.",
    icono: "utensils",
    confirmada: false,
  },
  {
    id: "momentos",
    titulo: "Momentos especiales",
    texto: "Cada amanecer desde la terraza es una promesa de renovación.",
    icono: "sunrise",
    confirmada: false,
  },
];
