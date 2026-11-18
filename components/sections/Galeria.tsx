import { Lines } from "@/components/ui/Lines";
import { Gallery } from "@/components/gallery/Gallery";

export function Galeria() {
  return (
    <section id="galeria" aria-labelledby="gal-title" className="border-t border-granate/15 py-28 sm:py-36">
      <Lines
        id="gal-title"
        className="text-center font-[family-name:var(--font-display)] text-[clamp(2.8rem,5.4vw,5.4rem)] leading-none text-granate"
        lines={[<>Nuestra <span key="i" className="t-italic">galería</span></>]}
      />
      <div className="mt-16">
        <Gallery />
      </div>
    </section>
  );
}
