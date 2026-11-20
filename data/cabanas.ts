/**
 * Cabañas de Gardners Hills: 8 en total, 4 Refugio (antes «Medium»; sin tina ni patio, más pequeñas) y 4 Premium.
 * Nombres y descripciones enviados por el cliente (2026-11-20). «Dunas de Taroa» y «Wind of Jepira»
 * vienen marcados por el cliente como [propuesta].
 *
 * Confirmado por el cliente: medidas de las Refugio (18–20 m² y 22–24 m²), cama Queen, ducha tipo
 * lluvia, espejo de piso a techo y armario; jacuzzi en la terraza de Pilón de Azúcar y Serranía del
 * Perijá; patio privado en las Premium; Sunset Ridge es dúplex de dos niveles; Spirit of the Cape es
 * la más grande.
 *
 * ⚠ PROVISIONAL (inventado con autorización para ajustar después): medidas, camas y capacidad de las
 * Premium, capacidad de las Refugio y la lista de servicios.
 *
 * Fotos: fotogramas del video oficial; ocultas mientras MOSTRAR_FOTOS = false.
 */
export type CategoriaSlug = "refugio" | "premium";

export type Categoria = { slug: CategoriaSlug; nombre: string; intro: string };

export type Cabana = {
  slug: string;
  nombre: string;
  categoria: CategoriaSlug;
  frase: string;
  descripcion: string;
  area: string;
  capacidad: string;
  /** Huéspedes máximos (para el buscador de reservas) */
  maxHuespedes: number;
  camas: string;
  instalaciones: string[];
  destacados: string[];
  servicios: string[];
  fotos: string[];
};

export const categorias: Categoria[] = [
  {
    slug: "refugio",
    nombre: "Cabañas Refugio",
    intro: "Comodidad y practicidad frente a la sierra: cama Queen, ducha tipo lluvia y todo lo necesario para descansar.",
  },
  {
    slug: "premium",
    nombre: "Cabañas Premium",
    intro: "Más espacio, patio privado y tina para dejar que el tiempo se detenga.",
  },
];

const F = (n: string) => `/images/cabanas/${n}.jpg`;

const serviciosMedium = [
  "Wi-Fi",
  "Aire acondicionado",
  "Baño privado",
  "Ducha tipo lluvia",
  "Espejo de piso a techo",
  "Armario",
  "Amenidades de baño",
  "Ropa de cama de algodón",
];
const serviciosMediumPlus = [...serviciosMedium, "Terraza con jacuzzi", "Amenidades exclusivas Gardners Hills"];
const serviciosPremium = [
  ...serviciosMedium,
  "Patio privado",
  "Tina",
  "Amenidades exclusivas Gardners Hills",
  "Batas y pantuflas",
  "Smart TV",
];

export const cabanas: Cabana[] = [
  // ── Refugio ──
  {
    slug: "cabo-de-la-vela",
    nombre: "Cabaña Cabo de la Vela",
    categoria: "refugio",
    frase: "Comodidad y practicidad.",
    descripcion:
      "Perfecta para quienes buscan comodidad y practicidad. Con un diseño moderno y funcional, tiene cama Queen, ducha tipo lluvia, espejo de piso a techo y un armario práctico. Con 18-20 m², es el espacio ideal para viajeros que buscan el descanso perfecto.",
    area: "18–20 m²",
    capacidad: "2 adultos",
    maxHuespedes: 2,
    camas: "1 Queen",
    instalaciones: ["Armario", "Espejo de piso a techo"],
    destacados: ["Cama Queen", "Espejo de piso a techo", "Ducha tipo lluvia"],
    servicios: serviciosMedium,
    fotos: [F("cabana-fachada"), F("cabanas-panoramica"), F("cabana-terraza")],
  },
  {
    slug: "dunas-de-taroa",
    nombre: "Cabaña Dunas de Taroa",
    categoria: "refugio",
    frase: "Lo esencial, en su justa medida.",
    descripcion:
      "Lo esencial, en su justa medida. Una cama Queen para descansar sin prisa, una ducha tipo lluvia para empezar el día, un espejo de piso a techo y un armario para dejarlo todo en su lugar. Con 18-20 m², es un refugio sencillo y acogedor para dos.",
    area: "18–20 m²",
    capacidad: "2 adultos",
    maxHuespedes: 2,
    camas: "1 Queen",
    instalaciones: ["Armario", "Espejo de piso a techo"],
    destacados: ["Cama Queen", "Espejo de piso a techo", "Ducha tipo lluvia"],
    servicios: serviciosMedium,
    fotos: [F("cabana-arco"), F("cabanas-fila"), F("cabanas-jardin")],
  },
  {
    slug: "pilon-de-azucar",
    nombre: "Cabaña Pilón de Azúcar",
    categoria: "refugio",
    frase: "Más espacio para tomártelo con calma.",
    descripcion:
      "Más espacio para instalarte y tomártelo con calma. Una cama Queen, una ducha tipo lluvia y una terraza tranquila para disfrutar de un café o respirar profundo. El jacuzzi de la terraza está ahí para lo que surja, y las amenidades exclusivas de Gardners Hills se encargan del resto. Con 22-24 m². Simple, fácil, justo lo que necesitas.",
    area: "22–24 m²",
    capacidad: "2 adultos",
    maxHuespedes: 2,
    camas: "1 Queen",
    instalaciones: ["Terraza", "Jacuzzi"],
    destacados: ["Jacuzzi en la terraza", "Cama Queen", "Amenidades exclusivas"],
    servicios: serviciosMediumPlus,
    fotos: [F("cabana-terraza"), F("cabanas-sierra"), F("cabana-fachada")],
  },
  {
    slug: "serrania-del-perija",
    nombre: "Cabaña Serranía del Perijá",
    categoria: "refugio",
    frase: "Más espacio, más experiencias.",
    descripcion:
      "Más espacio, más experiencias, más de todo lo que te encanta. Con 22-24 m², la cabaña Serranía del Perijá tiene cama Queen, un baño amplio con una ducha increíble, jacuzzi en la terraza, mucha luz natural gracias a sus ventanas y las amenidades exclusivas de Gardners Hills.",
    area: "22–24 m²",
    capacidad: "2 adultos",
    maxHuespedes: 2,
    camas: "1 Queen",
    instalaciones: ["Terraza", "Jacuzzi"],
    destacados: ["Jacuzzi en la terraza", "Baño amplio", "Luz natural"],
    servicios: serviciosMediumPlus,
    fotos: [F("cabanas-sierra"), F("cabana-arco"), F("cabanas-panoramica")],
  },
  // ── Premium ──
  {
    slug: "golden-dunes",
    nombre: "Cabaña Golden Dunes",
    categoria: "premium",
    frase: "La mansión del rey.",
    descripcion:
      "La mansión del rey, ese lugar donde todos quieren estar. Más espacio, más aire fresco, más formas de relajarse. Golden Dunes, con su patio privado, tiene todo lo que te encanta.",
    area: "36 m² + patio",
    capacidad: "2 adultos + 1 niño",
    maxHuespedes: 3,
    camas: "1 King + sofá cama",
    instalaciones: ["Patio privado", "Tina"],
    destacados: ["Patio privado", "Tina", "Zona de estar"],
    servicios: serviciosPremium,
    fotos: [F("cabanas-jardin"), F("cabana-terraza"), F("cabana-arco")],
  },
  {
    slug: "wind-of-jepira",
    nombre: "Cabaña Wind of Jepira",
    categoria: "premium",
    frase: "Para dejarse llevar por el viento.",
    descripcion:
      "Para dejarse llevar por el viento. Un espacio amplio y abierto, con patio privado para tomar el sol, sentir la brisa y dejar que las horas pasen sin prisa. Wind of Jepira es ideal para quienes quieren desconectarse sin renunciar a nada.",
    area: "36 m² + patio",
    capacidad: "2 adultos + 1 niño",
    maxHuespedes: 3,
    camas: "1 King + sofá cama",
    instalaciones: ["Patio privado", "Tina"],
    destacados: ["Patio privado", "Espacio abierto", "Tina"],
    servicios: serviciosPremium,
    fotos: [F("cabanas-panoramica"), F("cabanas-jardin"), F("cabanas-fila")],
  },
  {
    slug: "sunset-ridge",
    nombre: "Cabaña Sunset Ridge",
    categoria: "premium",
    frase: "Un dúplex diseñado para sorprender.",
    descripcion:
      "Para los viajeros que buscan el máximo espacio y comodidad, Sunset Ridge es un impresionante dúplex de dos niveles diseñado para sorprender.",
    area: "48 m² en dos niveles + patio",
    capacidad: "4 personas",
    maxHuespedes: 4,
    camas: "1 King + 1 Queen",
    instalaciones: ["Dúplex", "Patio privado", "Tina"],
    destacados: ["Dúplex de dos niveles", "Patio privado", "Tina"],
    servicios: serviciosPremium,
    fotos: [F("cabanas-fila"), F("cabanas-sierra"), F("cabana-terraza")],
  },
  {
    slug: "spirit-of-the-cape",
    nombre: "Cabaña Spirit of the Cape",
    categoria: "premium",
    frase: "La más grande y exclusiva.",
    descripcion:
      "La cabaña más grande y exclusiva de Gardners Hills, diseñada para quienes buscan privacidad y un descanso sin interrupciones.",
    area: "60 m² + patio",
    capacidad: "4 personas",
    maxHuespedes: 4,
    camas: "1 King + 2 sencillas",
    instalaciones: ["Patio privado", "Tina"],
    destacados: ["La más grande", "Máxima privacidad", "Patio privado"],
    servicios: serviciosPremium,
    fotos: [F("cabana-fachada"), F("cabanas-panoramica"), F("cabanas-jardin")],
  },
];

export const totalCabanas = cabanas.length;
export const getCabana = (slug: string) => cabanas.find((c) => c.slug === slug);
export const getCategoria = (slug: CategoriaSlug) => categorias.find((c) => c.slug === slug)!;
export const cabanasDe = (slug: CategoriaSlug) => cabanas.filter((c) => c.categoria === slug);
