/**
 * Rutas por idioma. El español vive en la raíz (/cabanas) y el inglés en /en con slugs propios
 * (/en/cabins). Internamente todas las páginas están en app/[lang]/<slug-en-español>; el middleware
 * traduce la URL pública a la interna. Este módulo no usa React: sirve en servidor, cliente y middleware.
 */
export type Lang = "es" | "en";
export const LANGS: Lang[] = ["es", "en"];

/** Primer segmento en español → slug público en inglés */
const EN: Record<string, string> = {
  cabanas: "cabins",
  servicios: "services",
  gastronomia: "food-bar",
  galeria: "gallery",
  reservas: "book",
  contacto: "contact",
  terminos: "terms",
  privacidad: "privacy",
  cookies: "cookies",
  actividades: "activities",
};
const ES: Record<string, string> = Object.fromEntries(Object.entries(EN).map(([k, v]) => [v, k]));

/** Separa ruta, query y ancla */
function partes(href: string) {
  const m = href.match(/^([^?#]*)(\?[^#]*)?(#.*)?$/)!;
  return { path: m[1] || "/", query: m[2] ?? "", hash: m[3] ?? "" };
}

/** Ruta canónica (en español, sin prefijo) → URL pública en el idioma pedido */
export function localizar(href: string, lang: Lang): string {
  if (!href.startsWith("/")) return href;
  if (lang === "es") return href;
  const { path, query, hash } = partes(href);
  const segs = path.split("/").filter(Boolean);
  if (segs[0]) segs[0] = EN[segs[0]] ?? segs[0];
  return `/en${segs.length ? "/" + segs.join("/") : ""}${query}${hash}`;
}

/** URL pública → idioma + ruta canónica en español */
export function canonica(pathname: string): { lang: Lang; path: string } {
  const segs = pathname.split("/").filter(Boolean);
  if (segs[0] === "en") {
    const rest = segs.slice(1);
    if (rest[0]) rest[0] = ES[rest[0]] ?? rest[0];
    return { lang: "en", path: "/" + rest.join("/") };
  }
  return { lang: "es", path: pathname || "/" };
}

/** La misma página en el otro idioma */
export function cambiarIdioma(pathname: string, destino: Lang): string {
  return localizar(canonica(pathname).path, destino);
}

/** URL interna (app/[lang]/…) a la que el middleware reescribe una URL pública */
export function interna(pathname: string): string {
  const { lang, path } = canonica(pathname);
  return `/${lang}${path === "/" ? "" : path}`;
}

/** Metadatos de idiomas para una ruta canónica (hreflang) */
export function alternativos(path: string, lang: Lang) {
  return {
    canonical: localizar(path, lang),
    languages: { es: localizar(path, "es"), en: localizar(path, "en"), "x-default": localizar(path, "es") },
  };
}

export const esLang = (v: string): v is Lang => v === "es" || v === "en";
