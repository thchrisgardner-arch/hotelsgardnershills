/**
 * Categorías editoriales de experiencia (concepto, no servicios cerrados).
 * Textos basados en la identidad verbal del manual de marca. Cada una enlaza a la página relacionada.
 */
type Texto = { es: string; en: string };
export type Experiencia = {
  id: string;
  titulo: Texto;
  texto: Texto;
  href: string;
  icono: "moon" | "trees" | "utensils" | "sunrise";
};

export const experiencias: Experiencia[] = [
  {
    id: "descanso",
    titulo: { es: "Descanso", en: "Rest" },
    texto: { es: "Aquí, el lujo es el tiempo, el espacio y el silencio.", en: "Here, luxury is time, space and silence." },
    href: "/cabanas",
    icono: "moon",
  },
  {
    id: "naturaleza",
    titulo: { es: "Naturaleza", en: "Nature" },
    texto: {
      es: "Cierra los ojos, escucha el viento, siente la brisa. La sierra a la vista, siempre.",
      en: "Close your eyes, listen to the wind, feel the breeze. The mountains always in sight.",
    },
    href: "/servicios#actividades",
    icono: "trees",
  },
  {
    id: "gastronomia",
    titulo: { es: "Gastronomía", en: "Food" },
    texto: { es: "Sabores sencillos, servidos sin prisa. El detalle está en lo esencial.", en: "Simple flavours, served unhurried. The detail lies in the essentials." },
    href: "/gastronomia",
    icono: "utensils",
  },
  {
    id: "momentos",
    titulo: { es: "Momentos especiales", en: "Special moments" },
    texto: { es: "Cada amanecer desde la terraza es una promesa de renovación.", en: "Every sunrise from the terrace is a promise of renewal." },
    href: "/servicios",
    icono: "sunrise",
  },
];
