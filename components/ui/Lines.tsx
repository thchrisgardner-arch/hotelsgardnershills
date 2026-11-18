import type { ElementType, ReactNode } from "react";

/**
 * Título dividido en líneas para el revelado (cada línea sube desde una máscara).
 * Uso: <Lines as="h2" className="t-display ..." lines={["El arte de", "volver a lo", "esencial."]} />
 */
export function Lines({
  as: Tag = "h2",
  lines,
  className = "",
  id,
}: {
  as?: ElementType;
  lines: ReactNode[];
  className?: string;
  id?: string;
}) {
  return (
    <Tag id={id} data-reveal-lines="" className={className}>
      {lines.map((l, i) => (
        <span className="line" key={i}>
          <span>{l}</span>
        </span>
      ))}
    </Tag>
  );
}
