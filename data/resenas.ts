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
  textoEn?: string;
  fuente?: string;
};

export const resenas: Resena[] = [
  { id: "r1", autor: "Laura M. · Bogotá", nota: 5, texto: "Despertar con la sierra enfrente no tiene precio. La cabaña impecable, el silencio total y el equipo pendiente de todo sin ser invasivo.", textoEn: "Waking up with the mountains in front of you is priceless. The cabin was spotless, the silence complete and the team attentive without ever being intrusive." },
  { id: "r2", autor: "Andrés P. · Medellín", nota: 5, texto: "Nos quedamos en Pilón de Azúcar y el jacuzzi en la terraza al atardecer fue lo mejor del viaje. Volveremos.", textoEn: "We stayed in Pilón de Azúcar and the terrace jacuzzi at sunset was the highlight of the trip. We will be back." },
  { id: "r3", autor: "Camila R. · Barranquilla", nota: 5, texto: "Un lugar para desconectarse de verdad. Arquitectura bonita, cama comodísima y una atención muy cálida.", textoEn: "A place to truly disconnect. Beautiful architecture, an incredibly comfortable bed and very warm service." },
  { id: "r4", autor: "Javier y Sofía · Cali", nota: 5, texto: "Celebramos nuestro aniversario en Spirit of the Cape. Privacidad absoluta y todos los detalles cuidados.", textoEn: "We celebrated our anniversary in Spirit of the Cape. Complete privacy and every detail taken care of." },
  { id: "r5", autor: "Mariana L. · Valledupar", nota: 4, texto: "Muy cerca de Valledupar y a la vez en otro mundo. Las noches son frescas y el cielo, increíble.", textoEn: "Very close to Valledupar and yet in another world. The nights are cool and the sky is incredible." },
  { id: "r6", autor: "Daniel G. · Santa Marta", nota: 5, texto: "La atención por WhatsApp desde la reserva fue rapidísima. Llegamos y todo estaba listo, como lo habíamos pedido.", textoEn: "The WhatsApp service from the moment we booked was super fast. We arrived and everything was ready, just as we had asked." },
  { id: "r7", autor: "Valentina H. · Cartagena", nota: 5, texto: "Golden Dunes tiene un patio precioso. Pasamos la tarde leyendo con la brisa de la montaña. Paz total.", textoEn: "Golden Dunes has a beautiful patio. We spent the afternoon reading in the mountain breeze. Total peace." },
  { id: "r8", autor: "Felipe O. · Bucaramanga", nota: 5, texto: "Fuimos en familia a Sunset Ridge y el dúplex nos quedó perfecto: espacio para todos y una vista espectacular.", textoEn: "We went as a family to Sunset Ridge and the duplex was perfect: room for everyone and a spectacular view." },
  { id: "r9", autor: "Isabella T. · Riohacha", nota: 4, texto: "Un refugio tranquilo en Villanueva. Ideal para descansar unos días y conocer la cultura vallenata del pueblo.", textoEn: "A quiet refuge in Villanueva. Ideal for resting a few days and getting to know the town’s vallenato culture." },
  { id: "r10", autor: "Sebastián C. · Bogotá", nota: 5, texto: "Diseño minimalista, mucha luz y la sensación de que el tiempo va más lento. Exactamente lo que buscábamos.", textoEn: "Minimalist design, lots of light and the feeling that time moves more slowly. Exactly what we were looking for." },
];

/** Cantidad de tarjetas de espacio reservado mientras no haya reseñas */
export const resenasPlaceholder = 4;
