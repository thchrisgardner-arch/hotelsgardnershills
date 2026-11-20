/**
 * Reseñas de huéspedes.
 *
 * ⚠ TEXTOS DE EJEMPLO (2026-11-20): nombres, fechas y textos inventados a pedido del cliente para ver el
 * diseño. NO son reseñas reales ni de personas reales; los avatares son ilustraciones, no fotos.
 * Antes de lanzar el sitio hay que reemplazarlas por reseñas reales (Airbnb, Booking, Google…), con permiso,
 * y entonces sí con la foto de cada huésped (campo `foto`) y la `fuente`.
 */
type Texto = { es: string; en: string };
export type Resena = {
  id: string;
  autor: string;
  /** Línea secundaria bajo el nombre (ciudad o «Huésped desde…») */
  detalle: Texto;
  /** Mes y año de la estancia */
  fecha: Texto;
  foto?: string | null;
  nota: number; // sobre 5
  texto: Texto;
  fuente?: string;
};

export const resenas: Resena[] = [
  {
    id: "r1", autor: "Mariana", nota: 5,
    detalle: { es: "Bogotá, Colombia", en: "Bogotá, Colombia" },
    fecha: { es: "octubre de 2026", en: "October 2026" },
    texto: {
      es: "¡Tuvimos una estancia increíble en Gardners Hills! La Cabaña Golden Dunes era impresionante, impecable e incluso mejor que en las fotos. Fue el refugio privado perfecto y, al caer la tarde, el patio con la sierra al fondo se volvió nuestro lugar favorito.",
      en: "We had an incredible stay at Gardners Hills! The Golden Dunes cabin was stunning, spotless and even better than in the photos. It was the perfect private refuge and, as the afternoon fell, the patio with the mountains behind became our favourite spot.",
    },
  },
  {
    id: "r2", autor: "Julián", nota: 5,
    detalle: { es: "Huésped desde 2024", en: "Guest since 2024" },
    fecha: { es: "septiembre de 2026", en: "September 2026" },
    texto: {
      es: "Cabañas muy bien pensadas dentro de un entorno tranquilo. Fue una gran ventaja tener restaurante y bar en el hotel, al que podíamos ir o pedir servicio a la cabaña sin salir de Villanueva.",
      en: "Very well thought-out cabins in a peaceful setting. Having a restaurant and bar at the hotel was a big plus: we could go there or order to the cabin without leaving Villanueva.",
    },
  },
  {
    id: "r3", autor: "Daniela", nota: 5,
    detalle: { es: "Medellín, Colombia", en: "Medellín, Colombia" },
    fecha: { es: "agosto de 2026", en: "August 2026" },
    texto: {
      es: "¡El mejor lugar en el que me he alojado en toda mi vida! No puedo recomendarlo más. Cada vez que entraba a la cabaña tomaba una foto porque es hermosa. Inmediatamente me sentí relajada y en paz.",
      en: "The best place I have ever stayed! I can’t recommend it enough. Every time I walked into the cabin I took a photo because it is so beautiful. I felt relaxed and at peace straight away.",
    },
  },
  {
    id: "r4", autor: "Andrés y Laura", nota: 5,
    detalle: { es: "Huéspedes desde 2025", en: "Guests since 2025" },
    fecha: { es: "julio de 2026", en: "July 2026" },
    texto: {
      es: "Excelente ubicación, hermosas cabañas y un equipo que hizo que la estancia fuera súper fácil y agradable.",
      en: "Excellent location, beautiful cabins and a team that made the stay super easy and enjoyable.",
    },
  },
  {
    id: "r5", autor: "Catalina", nota: 5,
    detalle: { es: "Barranquilla, Colombia", en: "Barranquilla, Colombia" },
    fecha: { es: "junio de 2026", en: "June 2026" },
    texto: {
      es: "Las cabañas son exactamente como se muestran en las imágenes, limpias y cuidadas al detalle. Llegamos temprano y nos guardaron el equipaje sin problema mientras preparaban la Cabaña Pilón de Azúcar.",
      en: "The cabins are exactly as shown in the pictures, clean and cared for down to the last detail. We arrived early and they kept our luggage without any problem while they got the Pilón de Azúcar cabin ready.",
    },
  },
  {
    id: "r6", autor: "Santiago", nota: 5,
    detalle: { es: "Cali, Colombia", en: "Cali, Colombia" },
    fecha: { es: "mayo de 2026", en: "May 2026" },
    texto: {
      es: "¡Absoluta perfección! Tenemos muchas ganas de volver y alojarnos en la misma cabaña. Nos enamoramos de la calma de la sierra. ¡Gracias al equipo de Gardners Hills por cada detalle!",
      en: "Absolute perfection! We can’t wait to come back and stay in the same cabin. We fell in love with the calm of the mountains. Thank you to the Gardners Hills team for every detail!",
    },
  },
  {
    id: "r7", autor: "Valeria", nota: 5,
    detalle: { es: "Huésped desde 2026", en: "Guest since 2026" },
    fecha: { es: "abril de 2026", en: "April 2026" },
    texto: {
      es: "Excelente ubicación: a pocos minutos del pueblo para conocer la plaza, comer y escuchar vallenato, y de vuelta al silencio de la cabaña.",
      en: "Excellent location: a few minutes from town to see the square, eat and listen to vallenato, then back to the silence of the cabin.",
    },
  },
  {
    id: "r8", autor: "Felipe", nota: 5,
    detalle: { es: "Santa Marta, Colombia", en: "Santa Marta, Colombia" },
    fecha: { es: "marzo de 2026", en: "March 2026" },
    texto: { es: "Fabuloso 👌", en: "Fabulous 👌" },
  },
  {
    id: "r9", autor: "Gabriel", nota: 5,
    detalle: { es: "Valledupar, Colombia", en: "Valledupar, Colombia" },
    fecha: { es: "enero de 2026", en: "January 2026" },
    texto: {
      es: "El equipo fue excelente y Gardners Hills es uno de los mejores alojamientos de La Guajira. Lo recomendaría a cualquier persona que busque descanso: es un lugar sólido y elegante. La atención es lo más destacado para mí.",
      en: "The team was excellent and Gardners Hills is one of the best places to stay in La Guajira. I would recommend it to anyone looking for rest: it is a solid, elegant place. The service is the highlight for me.",
    },
  },
  {
    id: "r10", autor: "Isabella", nota: 5,
    detalle: { es: "Cartagena, Colombia", en: "Cartagena, Colombia" },
    fecha: { es: "diciembre de 2025", en: "December 2025" },
    texto: {
      es: "Diseño minimalista, mucha luz y la sensación de que el tiempo va más lento. Exactamente lo que buscábamos para cerrar el año.",
      en: "Minimalist design, lots of light and the feeling that time slows down. Exactly what we were looking for to end the year.",
    },
  },
];

/** Cantidad de tarjetas de espacio reservado mientras no haya reseñas */
export const resenasPlaceholder = 4;
