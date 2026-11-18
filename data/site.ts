/**
 * Datos generales del hotel.
 * Lo que es `null` está PENDIENTE de confirmar: la interfaz lo muestra como "Por confirmar".
 * Teléfono, WhatsApp y correo confirmados por el cliente (2026-11-18).
 */
export const site = {
  name: "Gardners Hills",
  descriptor: "Hotel in Villanueva",
  location: {
    town: "Villanueva",
    region: "La Guajira",
    country: "Colombia",
    address: null as string | null,
    mapsUrl: null as string | null,
  },
  contact: {
    /** Formato internacional sin "+" ni espacios */
    /** Número único de WhatsApp para todo el sitio (unificado por el cliente 2026-11-18) */
    whatsapp: "573001458356" as string | null,
    whatsappLabel: "+57 300 145 8356",
    email: "hotel@gardnerhills.co" as string | null,
    phone: "+57 300 145 8356" as string | null,
    whatsappFlotante: "573001458356",
  },
  instagram: null as string | null,
  facebook: null as string | null,
  bookingEngine: null as string | null,
  url: "https://gardnerhills.co", // dominio inferido del correo; confirmar
};

/** Navegación repartida a ambos lados del logo (wireframe V2) */
export const navLeft = [
  { label: "La casa", href: "#casa" },
  { label: "Esencia", href: "#esencia" },
  { label: "Servicios", href: "#servicios" },
];
export const navRight = [
  { label: "Entorno", href: "#entorno" },
  { label: "Actividades", href: "#actividades" },
  { label: "Galería", href: "#galeria" },
];
/**
 * Menú a pantalla completa. Estructura inspirada en Grand Hotel Miramare;
 * el contenido es el de Gardners Hills (secciones del wireframe V2).
 */
export const menuPrincipal = [
  { label: "La casa", href: "#casa" },
  { label: "Cabañas", href: "#cabanas" },
  { label: "Esencia", href: "#esencia" },
  { label: "Servicios", href: "#servicios" },
  { label: "Entorno", href: "#entorno" },
  { label: "Actividades", href: "#actividades" },
  { label: "Galería", href: "#galeria" },
];
export const menuSecundario = [
  { label: "WhatsApp +57 300 145 8356", href: "https://wa.me/573001458356" },
  { label: "hotel@gardnerhills.co", href: "mailto:hotel@gardnerhills.co" },
];

export const nav = [
  { label: "Inicio", href: "#inicio" },
  ...navLeft,
  { label: "Cabañas", href: "#cabanas" },
  ...navRight,
  { label: "Reservas", href: "#reservas" },
  { label: "Contacto", href: "#contacto" },
];
