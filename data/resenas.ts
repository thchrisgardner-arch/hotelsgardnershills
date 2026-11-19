/**
 * Reseñas de huéspedes. NO se inventan: solo reseñas reales (Google, Booking, Airbnb…),
 * copiadas tal cual y con permiso. Mientras la lista esté vacía, la sección muestra
 * tarjetas de espacio reservado.
 *
 * Ejemplo de entrada:
 * { id: "r1", autor: "Nombre", foto: "/images/resenas/nombre.jpg", nota: 5, texto: "…", fuente: "Google" }
 */
export type Resena = {
  id: string;
  autor: string;
  foto?: string | null;
  nota: number; // sobre 5
  texto: string;
  fuente?: string;
};

export const resenas: Resena[] = [];

/** Cantidad de tarjetas de espacio reservado mientras no haya reseñas */
export const resenasPlaceholder = 4;
