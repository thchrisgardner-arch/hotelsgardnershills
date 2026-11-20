/**
 * Reseñas de huéspedes.
 *
 * ⚠ TEXTOS DE EJEMPLO (2026-11-20): el cliente pidió 10 reseñas inventadas para ver el diseño y
 * cambiarlas después. NO son reseñas reales. Antes de lanzar el sitio hay que reemplazarlas por
 * reseñas reales (Google, Booking, Airbnb…), copiadas tal cual y con permiso: publicar reseñas
 * inventadas como si fueran reales puede ser engañoso para los clientes y contrario a las normas de
 * protección al consumidor. No se les pone «fuente» para no atribuirlas a ninguna plataforma.
 */
export type Resena = {
  id: string;
  autor: string;
  foto?: string | null;
  nota: number; // sobre 5
  texto: string;
  fuente?: string;
};

export const resenas: Resena[] = [
  { id: "r1", autor: "Laura M. · Bogotá", nota: 5, texto: "Despertar con la sierra enfrente no tiene precio. La cabaña impecable, el silencio total y el equipo pendiente de todo sin ser invasivo." },
  { id: "r2", autor: "Andrés P. · Medellín", nota: 5, texto: "Nos quedamos en Pilón de Azúcar y el jacuzzi en la terraza al atardecer fue lo mejor del viaje. Volveremos." },
  { id: "r3", autor: "Camila R. · Barranquilla", nota: 5, texto: "Un lugar para desconectarse de verdad. Arquitectura bonita, cama comodísima y una atención muy cálida." },
  { id: "r4", autor: "Javier y Sofía · Cali", nota: 5, texto: "Celebramos nuestro aniversario en Spirit of the Cape. Privacidad absoluta y todos los detalles cuidados." },
  { id: "r5", autor: "Mariana L. · Valledupar", nota: 4, texto: "Muy cerca de Valledupar y a la vez en otro mundo. Las noches son frescas y el cielo, increíble." },
  { id: "r6", autor: "Daniel G. · Santa Marta", nota: 5, texto: "La atención por WhatsApp desde la reserva fue rapidísima. Llegamos y todo estaba listo, como lo habíamos pedido." },
  { id: "r7", autor: "Valentina H. · Cartagena", nota: 5, texto: "Golden Dunes tiene un patio precioso. Pasamos la tarde leyendo con la brisa de la montaña. Paz total." },
  { id: "r8", autor: "Felipe O. · Bucaramanga", nota: 5, texto: "Fuimos en familia a Sunset Ridge y el dúplex nos quedó perfecto: espacio para todos y una vista espectacular." },
  { id: "r9", autor: "Isabella T. · Riohacha", nota: 4, texto: "Un refugio tranquilo en Villanueva. Ideal para descansar unos días y conocer la cultura vallenata del pueblo." },
  { id: "r10", autor: "Sebastián C. · Bogotá", nota: 5, texto: "Diseño minimalista, mucha luz y la sensación de que el tiempo va más lento. Exactamente lo que buscábamos." },
];

/** Cantidad de tarjetas de espacio reservado mientras no haya reseñas */
export const resenasPlaceholder = 4;
