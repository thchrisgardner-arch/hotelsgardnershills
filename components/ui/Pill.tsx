"use client";

import type { ComponentProps } from "react";
import { L } from "@/components/ui/L";

/**
 * Botón en píldora con flecha en círculo. Rutas internas con el idioma activo (componente L).
 * Altura mínima 44 px para que sea un objetivo táctil cómodo.
 */
type Props = ComponentProps<"a"> & { href: string; tone?: "granate" | "marfil" | "blanco" | "solid" };

export function Pill({ tone = "granate", className = "", children, href, ...rest }: Props) {
  const styles = {
    granate: "border-granate/50 text-granate hover:bg-granate hover:text-crema",
    marfil: "border-marfil/60 text-marfil hover:bg-marfil hover:text-granate",
    blanco: "border-blanco bg-blanco text-granate hover:bg-marfil hover:border-marfil",
    solid: "border-granate bg-granate text-crema hover:bg-carmesi hover:border-carmesi",
  }[tone];
  const cls = `group inline-flex min-h-11 items-center gap-5 rounded-full border py-1.5 pl-6 pr-1.5 text-[0.875rem] font-normal uppercase tracking-[0.16em] transition-colors duration-500 ease-[var(--ease-soft)] ${styles} ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      <span
        aria-hidden
        className="grid h-8 w-8 place-items-center rounded-full border border-current transition-transform duration-500 ease-[var(--ease-soft)] group-hover:translate-x-0.5"
      >
        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.1">
          <path d="M2 8h11M9 4l4 4-4 4" />
        </svg>
      </span>
    </>
  );
  if (href.startsWith("/")) {
    return (
      <L href={href} className={cls} {...rest}>
        {inner}
      </L>
    );
  }
  return (
    <a href={href} className={cls} {...rest}>
      {inner}
    </a>
  );
}
