/**
 * Gastronomía & Bar. Estructura tomada de la página de restaurantes de Grand Hotel Miramare;
 * el contenido es de Gardners Hills en voz de marca.
 * Nombres de espacios, carta, horarios, chef y modalidad están POR CONFIRMAR con el cliente:
 * no se inventan (se muestran como «por confirmar»).
 */
export type Espacio = {
  id: string;
  titulo: string;
  texto: string;
  detalles: { icono: "plato" | "reloj" | "sierra" | "copa"; texto: string }[];
  foto: string | null;
};

export const gastronomiaIntro =
  "Un café al amanecer frente a la sierra. Una mesa larga sin prisa. Una copa cuando cae la tarde. En Gardners Hills, la buena mesa es otra forma de quedarse.";

export const gastronomiaFrase = "Sabores sencillos, servidos sin prisa. El detalle está en lo esencial.";

export const espacios: Espacio[] = [
  {
    id: "restaurante",
    titulo: "Restaurante",
    texto:
      "La cocina como encuentro: platos sencillos, ingredientes de la región y el tiempo justo para disfrutarlos, con la luz y el viento de la sierra como compañía.",
    detalles: [
      { icono: "plato", texto: "Carta por confirmar." },
      { icono: "reloj", texto: "Horarios por confirmar." },
      { icono: "sierra", texto: "Con la sierra a la vista." },
    ],
    foto: null,
  },
  {
    id: "bar",
    titulo: "Bar",
    texto:
      "Cuando el día se apaga, el bar abre la conversación. Una bebida fría, una copa tranquila y la calma de la noche en Villanueva.",
    detalles: [
      { icono: "copa", texto: "Bebidas y coctelería por confirmar." },
      { icono: "reloj", texto: "Horarios por confirmar." },
      { icono: "sierra", texto: "Ubicación y ambiente por confirmar." },
    ],
    foto: null,
  },
];
