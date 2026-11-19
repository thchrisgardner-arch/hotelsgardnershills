import { HorizontalGallery } from "@/components/gallery/HorizontalGallery";

/** Galería de la portada: carrusel con scroll horizontal (referencia Grand Hotel Miramare) */
export function Galeria() {
  return (
    <HorizontalGallery
      titulo={
        <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.8rem,5.4vw,5.4rem)] leading-none text-granate">
          Nuestra <span className="t-italic">galería</span>
        </h2>
      }
    />
  );
}
