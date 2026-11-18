import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";

// Provisional hasta recibir Palo Compressed Medium (ver AUDITORIA-FASE-1.md §4)
const title = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-title",
  display: "swap",
});

// Respaldo para equipos sin Helvetica Neue (Inter: ancho normal, como Helvetica)
const bodyFallback = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body-fallback",
  display: "swap",
});

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
    <html lang="es" className={`${title.variable} ${bodyFallback.variable}`}>
      <body>{children}</body>
    </html>
  );
}
