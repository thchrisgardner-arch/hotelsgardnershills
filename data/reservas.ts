/**
 * Configuración del buscador de reservas.
 * NO se inventan tarifas ni políticas: todo lo que es null/vacío queda sin mostrar.
 */
export const reservas = {
  /**
   * Tarifa aproximada por noche en COP, por fecha "AAAA-MM-DD".
   * Cuando el hotel entregue tarifas (o el motor de reservas las exponga), se rellenan aquí
   * y aparecen debajo de cada día del calendario.
   */
  tarifas: {} as Record<string, number>,
  /** Política de edades (p. ej. "Desde 8 años" / "Hasta 7 años"): pendiente de confirmar */
  edadAdultos: null as string | null,
  edadNinos: null as string | null,
  maxAdultosPorCabana: 6,
  maxNinosPorCabana: 6,
  /** Límite de la interfaz, no la cantidad real de cabañas */
  maxCabanas: 6,
  nota: "Tarifas por confirmar. Te enviaremos la cotización por WhatsApp.",
};
