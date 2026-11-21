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
    // Móvil: los tres filtros en una sola línea (sin salto), con texto y relleno más cortos
    <div className="flex flex-nowrap justify-center gap-1.5 sm:flex-wrap sm:gap-2" role="group" aria-label={lang === "es" ? "Filtrar por categoría" : "Filter by category"}>
      {opciones.map((f) => (
        <button
          key={f.slug}
          type="button"
          aria-pressed={valor === f.slug}
          onClick={() => onChange(f.slug)}
          className={`min-h-11 whitespace-nowrap border px-3 text-[0.8rem] uppercase tracking-[0.12em] transition-colors sm:px-5 sm:text-[0.875rem] sm:tracking-[0.16em] ${
            valor === f.slug ? "border-granate bg-granate text-crema" : "border-granate/40 text-granate hover:border-granate"
          }`}
        >
          {f.nombre}
        </button>
      ))}
    </div>
  );
}
