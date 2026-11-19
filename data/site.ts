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

/**
 * Menú a pantalla completa. Estructura inspirada en Grand Hotel Miramare;
 * el contenido es el de Gardners Hills (secciones del wireframe V2).
 */
export const menuPrincipal = [
  { label: "Inicio", href: "/" },
  { label: "La casa", href: "/la-casa" },
  { label: "Cabañas", href: "/cabanas" },
  { label: "Servicios", href: "/servicios" },
  { label: "Actividades", href: "/actividades" },
  { label: "Galería", href: "/galeria" },
  { label: "Reservas", href: "/reservas" },
  { label: "Contacto", href: "/contacto" },
];
export const menuSecundario = [
  { label: "WhatsApp +57 300 145 8356", href: "https://wa.me/573001458356" },
  { label: "hotel@gardnerhills.co", href: "mailto:hotel@gardnerhills.co" },
];
