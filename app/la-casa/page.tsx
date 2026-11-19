import type { Metadata } from "next";
import { MotionController } from "@/components/layout/MotionController";
import { PageHero } from "@/components/layout/PageHero";
import { Destino } from "@/components/sections/Destino";
import { Esencia } from "@/components/sections/Esencia";
import { Refugio } from "@/components/sections/Refugio";
import { Experiencias } from "@/components/sections/Experiencias";
import { ReservaBanda } from "@/components/sections/ReservaBanda";

export const metadata: Metadata = {
  title: "La casa",
  description: "La historia de Gardners Hills: de la casa de los abuelos a un refugio de cabañas frente a la sierra en Villanueva, La Guajira.",
  alternates: { canonical: "/la-casa" },
};

export default function LaCasaPage() {
  return (
    <>
      <MotionController />
      <main>
        <PageHero titulo="La casa" kicker="Villanueva · La Guajira" foto="/images/cabanas/cabana-fachada.jpg" alt="Fachada en arco de una cabaña" />
        <Destino />
        <Esencia />
        <Refugio />
        <Experiencias />
        <ReservaBanda />
      </main>
    </>
  );
}
