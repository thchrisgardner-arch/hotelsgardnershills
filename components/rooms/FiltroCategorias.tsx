"use client";

import { categoriasL, type CategoriaSlug } from "@/data/cabanas";
import { useLang } from "@/lib/i18n";

/** Filtros Todas / Refugio / Premium, compartidos por /cabanas y /reservas */
export function FiltroCategorias({
  valor,
  onChange,
}: {
  valor: CategoriaSlug | "todas";
  onChange: (v: CategoriaSlug | "todas") => void;
}) {
  const { lang } = useLang();
  const opciones = [{ slug: "todas" as const, nombre: lang === "es" ? "Todas" : "All" }, ...categoriasL(lang).map((c) => ({ slug: c.slug, nombre: c.nombre }))];
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label={lang === "es" ? "Filtrar por categoría" : "Filter by category"}>
      {opciones.map((f) => (
        <button
          key={f.slug}
          type="button"
          aria-pressed={valor === f.slug}
          onClick={() => onChange(f.slug)}
          className={`min-h-11 border px-5 text-[0.875rem] uppercase tracking-[0.16em] transition-colors ${
            valor === f.slug ? "border-granate bg-granate text-crema" : "border-granate/40 text-granate hover:border-granate"
          }`}
        >
          {f.nombre}
        </button>
      ))}
    </div>
  );
}
