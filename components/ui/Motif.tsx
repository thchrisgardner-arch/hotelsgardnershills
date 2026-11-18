/**
 * Motivos lineales de trazo fino inspirados en la arquitectura del proyecto
 * (fachadas en arco del plano de cabañas, la sierra, el sol).
 * Se usan dentro de los bloques de color mientras no hay fotografía oficial.
 */
export type MotifName = "arcos" | "arco" | "sierra" | "sol" | "ventana" | "hoja";

export function Motif({ name, className = "" }: { name: MotifName; className?: string }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1,
    vectorEffect: "non-scaling-stroke" as const,
  };
  switch (name) {
    case "arcos":
      return (
        <svg viewBox="0 0 400 160" preserveAspectRatio="xMidYMax meet" className={className} aria-hidden>
          {[0, 1, 2, 3].map((i) => {
            const x = 20 + i * 95;
            return (
              <g key={i} {...common}>
                <path d={`M${x} 160 V70 a35 35 0 0 1 70 0 V160`} />
                <path d={`M${x + 12} 160 V76 a23 23 0 0 1 46 0 V160`} />
              </g>
            );
          })}
          <line x1="0" y1="159.5" x2="400" y2="159.5" {...common} />
        </svg>
      );
    case "arco":
      return (
        <svg viewBox="0 0 120 200" preserveAspectRatio="xMidYMax meet" className={className} aria-hidden>
          <path d="M10 200 V60 a50 50 0 0 1 100 0 V200" {...common} />
          <path d="M26 200 V64 a34 34 0 0 1 68 0 V200" {...common} />
        </svg>
      );
    case "sierra":
      return (
        <svg viewBox="0 0 400 120" preserveAspectRatio="xMidYMax meet" className={className} aria-hidden>
          <path d="M0 120 L60 60 L95 85 L160 25 L215 75 L260 45 L330 95 L365 70 L400 92" {...common} />
          <path d="M0 120 L80 88 L140 104 L210 80 L290 108 L400 96" {...common} />
        </svg>
      );
    case "sol":
      return (
        <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet" className={className} aria-hidden>
          <circle cx="100" cy="120" r="44" {...common} />
          <line x1="0" y1="164.5" x2="200" y2="164.5" {...common} />
          <line x1="20" y1="180.5" x2="180" y2="180.5" {...common} />
        </svg>
      );
    case "ventana":
      return (
        <svg viewBox="0 0 160 220" preserveAspectRatio="xMidYMid meet" className={className} aria-hidden>
          <path d="M20 210 V80 a60 60 0 0 1 120 0 V210 Z" {...common} />
          <line x1="80" y1="20" x2="80" y2="210" {...common} />
          <line x1="20" y1="120" x2="140" y2="120" {...common} />
        </svg>
      );
    case "hoja":
      return (
        <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet" className={className} aria-hidden>
          <path d="M100 190 C40 140 40 60 100 10 C160 60 160 140 100 190 Z" {...common} />
          <line x1="100" y1="10" x2="100" y2="190" {...common} />
          {[50, 80, 110, 140].map((y) => (
            <g key={y} {...common}>
              <path d={`M100 ${y + 20} L${72 - (y - 50) / 8} ${y}`} />
              <path d={`M100 ${y + 20} L${128 + (y - 50) / 8} ${y}`} />
            </g>
          ))}
        </svg>
      );
  }
}
