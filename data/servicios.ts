/**
 * Pestañas Hotel / Spa / Gym. Spa y gimnasio confirmados por el cliente;
 * tratamientos, horarios y equipamiento por confirmar (no se detallan).
 * Las fotos del XD de spa y gym son de MAJA Canggu (Bali): no se usan.
 */
type Texto = { es: string; en: string };
export type Servicio = {
  id: string;
  titulo: Texto;
  texto: Texto;
  cta: { label: Texto; href: string };
  foto: string | null;
};

const EXPLORAR = { es: "Explorar", en: "Explore" };

export const servicios: Servicio[] = [
  {
    id: "hotel",
    titulo: { es: "Hotel", en: "Hotel" },
    texto: {
      es: "Cabañas de arquitectura blanca y madera frente a la sierra. Un diseño minimalista y funcional que no impone su presencia: dialoga con el entorno y deja que la luz, el viento y la montaña sean protagonistas.",
      en: "Cabins of white architecture and wood facing the mountains. A minimalist, functional design that never imposes itself: it converses with the surroundings and lets light, wind and mountain take centre stage.",
    },
    cta: { label: EXPLORAR, href: "/cabanas" },
    foto: "/images/cabanas/cabana-arco.jpg",
  },
  {
    id: "spa",
    titulo: { es: "Spa", en: "Spa" },
    texto: {
      es: "Un espacio dedicado al cuidado del cuerpo y al descanso consciente, pensado para que la calma continúe más allá de la cabaña.",
      en: "A space devoted to body care and mindful rest, designed so the calm continues beyond the cabin.",
    },
    cta: { label: EXPLORAR, href: "/servicios" },
    foto: null,
  },
  {
    id: "gym",
    titulo: { es: "Gym", en: "Gym" },
    texto: {
      es: "Movimiento y bienestar en medio de la naturaleza: un lugar para entrenar a tu ritmo, con la sierra como paisaje.",
      en: "Movement and wellbeing in the middle of nature: a place to train at your own pace, with the mountains as your view.",
    },
    cta: { label: EXPLORAR, href: "/servicios" },
    foto: null,
  },
];
