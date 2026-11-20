import type { MetadataRoute } from "next";
import { site } from "@/data/site";

const rutas = ["", "/cabanas", "/cabanas/medium", "/cabanas/premium", "/servicios", "/gastronomia","/galeria", "/reservas", "/contacto", "/terminos", "/privacidad", "/cookies"];

export default function sitemap(): MetadataRoute.Sitemap {
  return rutas.map((r) => ({
    url: `${site.url}${r}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: r === "" ? 1 : 0.8,
  }));
}
