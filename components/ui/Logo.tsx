/**
 * Logotipo oficial extraído de "Logo Oficial.ai" como máscara alfa.
 * La forma no se altera; el color se toma de `currentColor` (solo colores de paleta).
 * TODO: reemplazar por los SVG oficiales cuando se exporten desde Illustrator.
 */
type Props = {
  variant?: "wordmark" | "descriptor";
  className?: string;
  label?: string;
};

const SRC = {
  wordmark: { src: "/brand/logo-wordmark.png", ratio: 1769 / 746 },
  descriptor: { src: "/brand/logo-hotel-villanueva.png", ratio: 1769 / 843 },
};

export function Logo({ variant = "wordmark", className = "", label = "Gardners Hills" }: Props) {
  const { src, ratio } = SRC[variant];
  return (
    <span
      role="img"
      aria-label={label}
      className={`logo-mask ${className}`}
      style={{
        aspectRatio: String(ratio),
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
      }}
    />
  );
}
