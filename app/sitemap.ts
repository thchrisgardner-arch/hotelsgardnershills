import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { cabanas } from "@/data/cabanas";
import { localizar } from "@/lib/routes";

/** Sitemap con las dos versiones (es en la raíz, en en /en) y sus alternativas hreflang */
const rutas = ["/", "/cabanas", ...cabanas.map((c) => `/cabanas/${c.slug}`), "/servicios", "/gastronomia", "/galeria", "/reservas", "/contacto", "/terminos", "/privacidad", "/cookies"];

export default function sitemap(): MetadataRoute.Sitemap {
  return rutas.flatMap((r) =>
    (["es", "en"] as const).map((lang) => ({
      url: `${site.url}${localizar(r, lang)}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: r === "/" ? 1 : 0.8,
      alternates: { languages: { es: `${site.url}${localizar(r, "es")}`, en: `${site.url}${localizar(r, "en")}` } },
    }))
  );
}
