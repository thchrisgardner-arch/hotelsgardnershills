/**
 * Cabañas de Gardners Hills: 4 Medium y 6 Premium (confirmado por el cliente, 2026-11-19).
 * Las Premium incluyen tina y patio (confirmado).
 *
 * ⚠ DATOS PROVISIONALES: medidas, camas, capacidad y dotación son una propuesta del equipo
 * (el cliente autorizó inventarlos para modificarlos después). Las medidas se tomaron como
 * referencia de las habitaciones de OSH Hotel (Cartagena). Cambiar aquí cuando lleguen los reales.
 *
 * Fotos: fotogramas del video oficial; ocultas mientras MOSTRAR_FOTOS = false.
 */
export type CabanaTipo = {
  slug: "medium" | "premium";
  nombre: string;
  unidades: number;
  frase: string;
  descripcion: string;
  descripcionLarga: string[];
  area: string;
  capacidad: string;
  camas: string;
  instalaciones: string[];
  destacados: string[];
  servicios: string[];
  fotos: string[];
};

const F = (n: string) => `/images/cabanas/${n}.jpg`;

const serviciosBase = [
  "Wi-Fi",
  "Aire acondicionado",
  "Baño privado",
  "Ducha tipo lluvia",
  "Caja fuerte",
  "Minibar",
  "Cafetera",
  "Secador de pelo",
  "Amenities de baño",
  "Ropa de cama de algodón",
];

export const cabanas: CabanaTipo[] = [
  {
    slug: "medium",
    nombre: "Cabaña Medium",
    unidades: 4,
    frase: "Lo esencial, frente a la sierra.",
    descripcion:
      "Arquitectura blanca y madera, un ventanal en arco y una terraza propia para ver caer la tarde. Todo lo necesario para descansar, nada que sobre.",
    descripcionLarga: [
      "La Cabaña Medium es la forma más sencilla de quedarse en Gardners Hills. Una cama king, luz natural todo el día y un ventanal en arco que enmarca la sierra desde la cama.",
      "Afuera, una terraza con dos sillas para el café de la mañana o la conversación de la noche. Adentro, un diseño minimalista y funcional que no impone su presencia: dialoga con el entorno.",
    ],
    area: "28 m²",
    capacidad: "2 adultos",
    camas: "1 King",
    instalaciones: ["Terraza privada"],
    destacados: ["Ventanal en arco", "Terraza con vista a la sierra"],
    servicios: serviciosBase,
    fotos: [F("cabana-fachada"), F("cabanas-panoramica"), F("cabana-terraza")],
  },
  {
    slug: "premium",
    nombre: "Cabaña Premium",
    unidades: 6,
    frase: "Un patio y una tina solo para ti.",
    descripcion:
      "Más espacio, un patio privado y una tina para dejar que el tiempo se detenga. La sierra al fondo, el silencio alrededor.",
    descripcionLarga: [
      "La Cabaña Premium toma lo mejor de la Medium y le suma un patio privado con tina: el lugar para un baño al atardecer, leer sin prisa o simplemente quedarse mirando la montaña.",
      "Una cama king, una zona de estar con sofá cama y un baño amplio. Un refugio pensado para estancias largas, celebraciones o escapadas en pareja.",
    ],
    area: "36 m² + patio de 14 m²",
    capacidad: "2 adultos + 1 niño",
    camas: "1 King + sofá cama",
    instalaciones: ["Patio privado", "Tina"],
    destacados: ["Tina en el patio", "Patio privado", "Zona de estar"],
    servicios: [...serviciosBase, "Batas y pantuflas", "Smart TV"],
    fotos: [F("cabana-arco"), F("cabanas-jardin"), F("cabanas-sierra")],
  },
];

export const totalCabanas = cabanas.reduce((s, c) => s + c.unidades, 0);
export const getCabana = (slug: string) => cabanas.find((c) => c.slug === slug);
