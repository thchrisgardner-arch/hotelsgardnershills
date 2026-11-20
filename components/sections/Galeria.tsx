import { HorizontalGallery } from "@/components/gallery/HorizontalGallery";
import type { Lang } from "@/lib/routes";

/** Galería de la portada: carrusel con scroll horizontal (referencia Grand Hotel Miramare) */
export function Galeria({ lang }: { lang: Lang }) {
  return (
    <HorizontalGallery
      titulo={
        <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.4rem,5.4vw,5.4rem)] leading-none text-granate">
          {lang === "es" ? <>Nuestra <span className="t-italic">galería</span></> : <>Our <span className="t-italic">gallery</span></>}
        </h2>
      }
    />
  );
}
