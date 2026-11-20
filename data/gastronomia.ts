/**
 * Gastronomía & Bar. Estructura tomada de la página de restaurantes de Grand Hotel Miramare;
 * el contenido es de Gardners Hills en voz de marca. Carta, horarios y chef por confirmar (no se inventan).
 */
type Texto = { es: string; en: string };
export type Espacio = {
  id: string;
  titulo: Texto;
  texto: Texto;
  detalles: { icono: "plato" | "reloj" | "sierra" | "copa"; texto: Texto }[];
  foto: string | null;
};

export const gastronomiaIntro: Texto = {
  es: "Un café al amanecer frente a la sierra. Una mesa larga sin prisa. Una copa cuando cae la tarde. En Gardners Hills, la buena mesa es otra forma de quedarse.",
  en: "Coffee at sunrise facing the mountains. A long, unhurried table. A drink as the afternoon fades. At Gardners Hills, good food is another way of staying.",
};

export const gastronomiaFrase: Texto = {
  es: "Sabores sencillos, servidos sin prisa. El detalle está en lo esencial.",
  en: "Simple flavours, served unhurried. The detail lies in the essentials.",
};

export const espacios: Espacio[] = [
  {
    id: "restaurante",
    titulo: { es: "Restaurante", en: "Restaurant" },
    texto: {
      es: "La cocina como encuentro: platos sencillos, ingredientes de la región y el tiempo justo para disfrutarlos, con la luz y el viento de la sierra como compañía.",
      en: "Cooking as a meeting point: simple dishes, regional ingredients and just the right time to enjoy them, with the light and the mountain breeze for company.",
    },
    detalles: [{ icono: "sierra", texto: { es: "Con la sierra a la vista.", en: "With the mountains in view." } }],
    foto: null,
  },
  {
    id: "bar",
    titulo: { es: "Bar", en: "Bar" },
    texto: {
      es: "Cuando el día se apaga, el bar abre la conversación. Una bebida fría, una copa tranquila y la calma de la noche en Villanueva.",
      en: "As the day winds down, the bar opens the conversation. A cold drink, a quiet glass and the calm of the Villanueva night.",
    },
    detalles: [],
    foto: null,
  },
];
