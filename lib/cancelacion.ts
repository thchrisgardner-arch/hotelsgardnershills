/**
 * Plazo de cancelación gratuita (⚠ regla de ejemplo, confirmar con el hotel — data/politicas.ts).
 *
 * Regla: el huésped puede cancelar gratis durante las 24 horas siguientes a su reserva, pero el plazo
 * nunca pasa de 24 horas antes del check-in (3:00 p. m., hora de Colombia). Gana la fecha que llegue primero:
 *   · Reserva el miércoles 10:00 para llegar el sábado → hasta el jueves 10:00 (24 h después de reservar).
 *   · Reserva el miércoles 10:00 para llegar el jueves → hasta el miércoles 3:00 p. m. (24 h antes del check-in).
 *   · Reserva con menos de 24 h para el check-in → sin cancelación gratuita.
 * Fuera del plazo se cobra la primera noche.
 */
export const HORAS_TRAS_RESERVA = 24;
export const HORAS_ANTES_CHECKIN = 24;
export const HORA_CHECKIN = 15; // 3:00 p. m.

const H = 3600000;

/** Fecha límite para cancelar gratis, o null si la reserva ya no tiene cancelación gratuita */
export function limiteCancelacion(llegada: string, reserva: Date = new Date()): Date | null {
  if (!llegada) return null;
  const checkin = new Date(`${llegada}T${String(HORA_CHECKIN).padStart(2, "0")}:00:00-05:00`);
  const limite = new Date(Math.min(reserva.getTime() + HORAS_TRAS_RESERVA * H, checkin.getTime() - HORAS_ANTES_CHECKIN * H));
  return limite.getTime() > reserva.getTime() ? limite : null;
}

/** «miércoles 20 de noviembre, 3:00 p. m.» en hora de Colombia */
export function formatoLimite(d: Date, lang: "es" | "en") {
  return d.toLocaleString(lang === "es" ? "es-CO" : "en-US", {
    weekday: "long", day: "numeric", month: "long", hour: "numeric", minute: "2-digit", timeZone: "America/Bogota",
  });
}
