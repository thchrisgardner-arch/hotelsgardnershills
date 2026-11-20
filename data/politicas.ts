/**
 * Resumen de políticas de estancia (fichas de cabaña y /reservas).
 * ⚠ TEXTO DE EJEMPLO: horarios, cancelación, estancia mínima, niños y mascotas deben confirmarse
 * con el hotel. En la interfaz se muestra la marca «Texto de ejemplo» mientras EJEMPLO = true.
 */
export const POLITICAS_EJEMPLO = true;

type Texto = { es: string; en: string };
export type Politica = { id: string; titulo: Texto; texto: Texto };

export const politicas: Politica[] = [
  {
    id: "horarios",
    titulo: { es: "Check-in y check-out", en: "Check-in and check-out" },
    texto: { es: "Check-in desde las 3:00 p. m. · Check-out hasta las 12:00 m.", en: "Check-in from 3:00 pm · Check-out until 12:00 pm." },
  },
  {
    id: "cancelacion",
    titulo: { es: "Cancelación", en: "Cancellation" },
    texto: {
      es: "Gratis hasta 7 días antes de la llegada. Después, se cobra la primera noche.",
      en: "Free up to 7 days before arrival. After that, the first night is charged.",
    },
  },
  {
    id: "minima",
    titulo: { es: "Estancia mínima", en: "Minimum stay" },
    texto: { es: "1 noche · 2 noches en fines de semana festivos y temporada alta.", en: "1 night · 2 nights on holiday weekends and in high season." },
  },
  {
    id: "ninos",
    titulo: { es: "Niños", en: "Children" },
    texto: {
      es: "Bienvenidos en las cabañas Premium. Menores de 18 años, con documento y acompañados por un adulto.",
      en: "Welcome in the Premium cabins. Guests under 18 must bring ID and stay with an adult.",
    },
  },
  {
    id: "mascotas",
    titulo: { es: "Mascotas", en: "Pets" },
    texto: { es: "No se admiten mascotas, salvo perros de asistencia.", en: "Pets are not allowed, except assistance dogs." },
  },
];
