/**
 * Pestañas Hotel / Spa / Gym (diseño del XD). Spa y gimnasio confirmados por el cliente;
 * tratamientos, horarios y equipamiento POR CONFIRMAR (no se detallan).
 * Las fotos del XD de spa y gym son de MAJA Canggu (Bali): no se usan; van en bloque de color.
 */
export type Servicio = {
  id: string;
  tab: string;
  titulo: string;
  texto: string;
  cta: { label: string; href: string };
  foto: string | null;
};

export const servicios: Servicio[] = [
  {
    id: "hotel",
    tab: "Hotel",
    titulo: "Hotel",
    texto:
      "Cabañas de arquitectura blanca y madera frente a la sierra. Un diseño minimalista y funcional que no impone su presencia: dialoga con el entorno y deja que la luz, el viento y la montaña sean protagonistas.",
    cta: { label: "Explorar", href: "/cabanas" },
    foto: "/images/cabanas/cabana-arco.jpg",
  },
  {
    id: "spa",
    tab: "Spa",
    titulo: "Spa",
    texto:
      "Un espacio dedicado al cuidado del cuerpo y al descanso consciente, pensado para que la calma continúe más allá de la cabaña.",
    cta: { label: "Explorar", href: "/servicios" },
    foto: null,
  },
  {
    id: "gym",
    tab: "Gym",
    titulo: "Gym",
    texto:
      "Movimiento y bienestar en medio de la naturaleza: un lugar para entrenar a tu ritmo, con la sierra como paisaje.",
    cta: { label: "Explorar", href: "/servicios" },
    foto: null,
  },
];
