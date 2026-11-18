import type { ComponentProps } from "react";

/**
 * CTA editorial: texto en mayúsculas espaciadas con línea que se dibuja,
 * o versión "solid" (rectángulo plano, sin radios ni sombras).
 */
type Props = ComponentProps<"a"> & {
  variant?: "line" | "solid" | "outline";
  arrow?: boolean;
};

export function CtaLink({ variant = "line", arrow = true, className = "", children, ...rest }: Props) {
  const base =
    "group relative inline-flex items-center gap-3 t-label transition-colors duration-500 ease-[var(--ease-soft)]";
  const styles = {
    line: "py-2",
    solid:
      "bg-carmesi text-marfil px-6 py-4 hover:bg-granate active:bg-granate/90",
    outline:
      "border border-current px-6 py-4 hover:bg-current/10",
  }[variant];
  return (
    <a className={`${base} ${styles} ${className}`} {...rest}>
      <span className="relative">
        {children}
        {variant === "line" && (
          <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-100 bg-current transition-transform duration-500 ease-[var(--ease-soft)] group-hover:scale-x-0" />
        )}
      </span>
      {arrow && (
        <span
          aria-hidden
          className="inline-block transition-transform duration-500 ease-[var(--ease-soft)] group-hover:translate-x-1.5"
        >
          →
        </span>
      )}
    </a>
  );
}
