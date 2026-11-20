import type { Metadata } from "next";
import { MotionController } from "@/components/layout/MotionController";
import { PageHero } from "@/components/layout/PageHero";
import { Gallery } from "@/components/gallery/Gallery";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { Lines } from "@/components/ui/Lines";
import { ReservaBanda } from "@/components/sections/ReservaBanda";

export const metadata: Metadata = {
  title: "Galería",
  description: "Fotografías de las cabañas y el entorno de Gardners Hills en Villanueva, La Guajira.",
  alternates: { canonical: "/galeria" },
};

/** Wireframe «Nuestra Galería»: carrusel en arcos + cuadrícula alineada con visor */
export default function GaleriaPage() {
  return (
    <>
      <MotionController />
      <main>
        <PageHero titulo="Galería" kicker="Cabañas · Entorno" />
        <section id="galeria" className="py-28 sm:py-36">
          <Lines
            as="h2"
            className="t-recto text-center font-[family-name:var(--font-display)] text-[clamp(2.8rem,5.4vw,5.4rem)] leading-none text-granate"
            lines={[<>Nuestra <span key="i" className="t-italic">galería</span></>]}
          />
          <div className="mt-16">
            <Gallery />
          </div>
        </section>
        <section aria-label="Todas las fotos" className="border-t border-granate/15 px-[var(--gutter)] py-28 sm:py-36">
          <GalleryGrid />
        </section>
        <ReservaBanda />
      </main>
    </>
  );
}
