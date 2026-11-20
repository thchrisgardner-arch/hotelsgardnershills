import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { alternativos, esLang, type Lang } from "@/lib/routes";

/** Utilidades de servidor para las páginas de app/[lang] */
export type LangParams = { params: Promise<{ lang: string }> };

export async function getLang(params: LangParams["params"]): Promise<Lang> {
  const { lang } = await params;
  if (!esLang(lang)) notFound();
  return lang;
}

/** Elige la versión del idioma de un objeto { es, en } */
export const pick = <T,>(lang: Lang, v: { es: T; en: T }): T => v[lang];

/** Metadatos de página con canonical y hreflang ES/EN */
export function meta(lang: Lang, path: string, m: { es: { title: string; description: string }; en: { title: string; description: string } }): Metadata {
  const t = m[lang];
  return {
    title: t.title,
    description: t.description,
    alternates: alternativos(path, lang),
    openGraph: { title: t.title, description: t.description, locale: lang === "es" ? "es_CO" : "en_US" },
  };
}
