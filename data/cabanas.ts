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
import type { Lang } from "@/lib/routes";

export type CategoriaSlug = "refugio" | "premium";

export type Categoria = { slug: CategoriaSlug; nombre: string; intro: string };
export type TarifaId = "basica" | "media" | "premium";

export type Cabana = {
  slug: string;
  nombre: string;
  categoria: CategoriaSlug;
  frase: string;
  descripcion: string;
  /** Versión corta (unas 3 líneas) para las tarjetas del listado */
  resumen: string;
  area: string;
  capacidad: string;
  /** Huéspedes máximos (para el buscador de reservas) */
  maxHuespedes: number;
  /** Nivel de tarifa (data/tarifas.ts). ⚠ Asignación de ejemplo: confirmar con el cliente */
  tarifa: TarifaId;
  camas: string;
  instalaciones: string[];
  destacados: string[];
  servicios: string[];
  fotos: string[];
};

export const categorias: Categoria[] = [
  {
    slug: "refugio",
    nombre: "Refugio",
    intro: "Comodidad y practicidad frente a la sierra: cama Queen, ducha tipo lluvia y todo lo necesario para descansar.",
  },
  {
    slug: "premium",
    nombre: "Premium",
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
    resumen: "Moderna y funcional: cama Queen, ducha tipo lluvia y espejo de piso a techo. 18–20 m² para el descanso perfecto.",
    area: "18–20 m²",
    capacidad: "2 adultos",
    maxHuespedes: 2,
    tarifa: "basica",
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
    resumen: "Un refugio sencillo y acogedor para dos: cama Queen, ducha tipo lluvia y todo en su lugar. 18–20 m² de calma.",
    area: "18–20 m²",
    capacidad: "2 adultos",
    maxHuespedes: 2,
    tarifa: "basica",
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
    resumen: "Más espacio para tomártelo con calma: cama Queen y una terraza con jacuzzi para el café de la mañana o el atardecer.",
    area: "22–24 m²",
    capacidad: "2 adultos",
    maxHuespedes: 2,
    tarifa: "media",
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
    resumen: "Baño amplio, mucha luz natural y jacuzzi en la terraza. 22–24 m² con las amenidades exclusivas de Gardners Hills.",
    area: "22–24 m²",
    capacidad: "2 adultos",
    maxHuespedes: 2,
    tarifa: "media",
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
    resumen: "La mansión del rey, ese lugar donde todos quieren estar: más espacio, más aire fresco y un patio privado para relajarte a tu manera.",
    area: "36 m² + patio",
    capacidad: "2 adultos + 1 niño",
    maxHuespedes: 3,
    tarifa: "premium",
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
    resumen: "Amplia y abierta, con patio privado para tomar el sol y sentir la brisa mientras las horas pasan sin prisa.",
    area: "36 m² + patio",
    capacidad: "2 adultos + 1 niño",
    maxHuespedes: 3,
    tarifa: "premium",
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
    resumen: "Un impresionante dúplex de dos niveles para quienes buscan el máximo espacio y comodidad.",
    area: "48 m² en dos niveles + patio",
    capacidad: "4 personas",
    maxHuespedes: 4,
    tarifa: "premium",
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
    resumen: "La cabaña más grande y exclusiva de Gardners Hills, pensada para la privacidad y el descanso sin interrupciones.",
    area: "60 m² + patio",
    capacidad: "4 personas",
    maxHuespedes: 4,
    tarifa: "premium",
    camas: "1 King + 2 sencillas",
    instalaciones: ["Patio privado", "Tina"],
    destacados: ["La más grande", "Máxima privacidad", "Patio privado"],
    servicios: serviciosPremium,
    fotos: [F("cabana-fachada"), F("cabanas-panoramica"), F("cabanas-jardin")],
  },
];

/* ───────────── Inglés ─────────────
 * Los nombres propios de las cabañas no se traducen. */
type Trad = Pick<Cabana, "frase" | "descripcion" | "resumen" | "area" | "capacidad" | "camas" | "instalaciones" | "destacados" | "servicios">;

const T: Record<string, string> = {
  "Wi-Fi": "Wi-Fi",
  "Aire acondicionado": "Air conditioning",
  "Baño privado": "Private bathroom",
  "Ducha tipo lluvia": "Rain shower",
  "Espejo de piso a techo": "Floor-to-ceiling mirror",
  Armario: "Wardrobe",
  "Amenidades de baño": "Bath amenities",
  "Ropa de cama de algodón": "Cotton bed linen",
  "Terraza con jacuzzi": "Terrace with jacuzzi",
  "Amenidades exclusivas Gardners Hills": "Exclusive Gardners Hills amenities",
  "Patio privado": "Private patio",
  Tina: "Bathtub",
  "Batas y pantuflas": "Bathrobes and slippers",
  "Smart TV": "Smart TV",
  Terraza: "Terrace",
  Jacuzzi: "Jacuzzi",
  Dúplex: "Duplex",
  "Cama Queen": "Queen bed",
  "Jacuzzi en la terraza": "Jacuzzi on the terrace",
  "Amenidades exclusivas": "Exclusive amenities",
  "Baño amplio": "Spacious bathroom",
  "Luz natural": "Natural light",
  "Zona de estar": "Lounge area",
  "Espacio abierto": "Open space",
  "Dúplex de dos niveles": "Two-level duplex",
  "La más grande": "The largest",
  "Máxima privacidad": "Maximum privacy",
};
const tr = (l: string[]) => l.map((x) => T[x] ?? x);

const EN: Record<string, Omit<Trad, "instalaciones" | "destacados" | "servicios">> = {
  "cabo-de-la-vela": {
    frase: "Comfort and practicality.",
    descripcion: "Perfect for those looking for comfort and practicality. With a modern, functional design, it has a Queen bed, rain shower, floor-to-ceiling mirror and a practical wardrobe. At 18–20 m², it is the ideal space for travellers looking for the perfect rest.",
    resumen: "Modern and functional: Queen bed, rain shower and floor-to-ceiling mirror. 18–20 m² for the perfect rest.",
    area: "18–20 m²", capacidad: "2 adults", camas: "1 Queen",
  },
  "dunas-de-taroa": {
    frase: "The essentials, in just the right measure.",
    descripcion: "The essentials, in just the right measure. A Queen bed to rest unhurried, a rain shower to start the day, a floor-to-ceiling mirror and a wardrobe to keep everything in its place. At 18–20 m², it is a simple, cosy refuge for two.",
    resumen: "A simple, cosy refuge for two: Queen bed, rain shower and everything in its place. 18–20 m² of calm.",
    area: "18–20 m²", capacidad: "2 adults", camas: "1 Queen",
  },
  "pilon-de-azucar": {
    frase: "More space to take it easy.",
    descripcion: "More space to settle in and take it easy. A Queen bed, a rain shower and a quiet terrace to enjoy a coffee or breathe deeply. The terrace jacuzzi is there for whatever comes up, and the exclusive Gardners Hills amenities take care of the rest. 22–24 m². Simple, easy, just what you need.",
    resumen: "More space to take it easy: a Queen bed and a terrace with jacuzzi for morning coffee or sunset.",
    area: "22–24 m²", capacidad: "2 adults", camas: "1 Queen",
  },
  "serrania-del-perija": {
    frase: "More space, more experiences.",
    descripcion: "More space, more experiences, more of everything you love. At 22–24 m², the Serranía del Perijá cabin has a Queen bed, a spacious bathroom with an amazing shower, a jacuzzi on the terrace, plenty of natural light from its windows and the exclusive Gardners Hills amenities.",
    resumen: "Spacious bathroom, plenty of natural light and a jacuzzi on the terrace. 22–24 m² with exclusive Gardners Hills amenities.",
    area: "22–24 m²", capacidad: "2 adults", camas: "1 Queen",
  },
  "golden-dunes": {
    frase: "The king's mansion.",
    descripcion: "The king's mansion, the place everyone wants to be. More space, more fresh air, more ways to relax. Golden Dunes, with its private patio, has everything you love.",
    resumen: "The king's mansion, the place everyone wants to be: more space, more fresh air and a private patio to relax your way.",
    area: "36 m² + patio", capacidad: "2 adults + 1 child", camas: "1 King + sofa bed",
  },
  "wind-of-jepira": {
    frase: "Let the wind carry you.",
    descripcion: "Let the wind carry you. A wide, open space with a private patio to sunbathe, feel the breeze and let the hours go by unhurried. Wind of Jepira is ideal for those who want to disconnect without giving anything up.",
    resumen: "Wide and open, with a private patio to sunbathe and feel the breeze while the hours go by unhurried.",
    area: "36 m² + patio", capacidad: "2 adults + 1 child", camas: "1 King + sofa bed",
  },
  "sunset-ridge": {
    frase: "A duplex designed to surprise.",
    descripcion: "For travellers seeking maximum space and comfort, Sunset Ridge is an impressive two-level duplex designed to surprise.",
    resumen: "An impressive two-level duplex for those seeking maximum space and comfort.",
    area: "48 m² on two levels + patio", capacidad: "4 guests", camas: "1 King + 1 Queen",
  },
  "spirit-of-the-cape": {
    frase: "The largest and most exclusive.",
    descripcion: "The largest and most exclusive cabin at Gardners Hills, designed for those seeking privacy and uninterrupted rest.",
    resumen: "The largest and most exclusive cabin at Gardners Hills, designed for privacy and uninterrupted rest.",
    area: "60 m² + patio", capacidad: "4 guests", camas: "1 King + 2 singles",
  },
};

const CAT_EN: Record<CategoriaSlug, string> = {
  refugio: "Comfort and practicality facing the mountains: Queen bed, rain shower and everything you need to rest.",
  premium: "More space, a private patio and a bathtub to let time stand still.",
};

/** Cabaña en el idioma pedido (los nombres propios no cambian) */
export function enIdioma(c: Cabana, lang: Lang): Cabana {
  if (lang === "es") return c;
  return { ...c, ...EN[c.slug], instalaciones: tr(c.instalaciones), destacados: tr(c.destacados), servicios: tr(c.servicios) };
}
export const cabanasL = (lang: Lang = "es") => cabanas.map((c) => enIdioma(c, lang));
export const categoriasL = (lang: Lang = "es"): Categoria[] =>
  lang === "es" ? categorias : categorias.map((c) => ({ ...c, intro: CAT_EN[c.slug] }));

export const totalCabanas = cabanas.length;
export const getCabana = (slug: string, lang: Lang = "es") => {
  const c = cabanas.find((x) => x.slug === slug);
  return c ? enIdioma(c, lang) : undefined;
};
export const getCategoria = (slug: CategoriaSlug, lang: Lang = "es") => categoriasL(lang).find((c) => c.slug === slug)!;
export const cabanasDe = (slug: CategoriaSlug, lang: Lang = "es") => cabanasL(lang).filter((c) => c.categoria === slug);
/** «Cabaña Golden Dunes» → «Golden Dunes» */
export const nombreCorto = (c: Cabana) => c.nombre.replace(/^Cabaña /, "");
