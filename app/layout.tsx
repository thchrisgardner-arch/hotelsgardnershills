import type { Metadata, Viewport } from "next";
/*
 * Fuentes autoalojadas (paquetes @fontsource): no dependen de Google Fonts al compilar,
 * que es lo que rompía el build en Vercel ("An error occurred in next/font").
 * - Instrument Serif: provisional hasta recibir Palo Compressed Medium (AUDITORIA-FASE-1.md §4)
 * - Inter: respaldo para equipos sin Helvetica Neue
 */
import "@fontsource/instrument-serif/latin-400.css";
import "@fontsource/instrument-serif/latin-400-italic.css";
import "@fontsource-variable/inter/wght.css";
import "./globals.css";
import { site } from "@/data/site";

const description =
  "Hotel boutique de cabañas en Villanueva, La Guajira. Un refugio en la naturaleza donde el tiempo se detiene.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Gardners Hills · Hotel boutique en Villanueva, La Guajira",
    template: "%s · Gardners Hills",
  },
  description,
  keywords: [
    "hotel boutique en La Guajira",
    "cabañas en Villanueva La Guajira",
    "hospedaje en Villanueva",
    "escapadas en La Guajira",
    "alojamiento en contacto con la naturaleza",
  ],
  openGraph: {
    type: "website",
    locale: "es_CO",
    siteName: "Gardners Hills",
    title: "Gardners Hills · Un refugio en la naturaleza",
    description,
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#d1111c",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
