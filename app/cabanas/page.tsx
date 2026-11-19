import type { Metadata } from "next";
import { MotionController } from "@/components/layout/MotionController";
import { PageHero } from "@/components/layout/PageHero";
import { Cabanas } from "@/components/sections/Cabanas";
import { ReservaBanda } from "@/components/sections/ReservaBanda";

export const metadata: Metadata = {
  title: "Cabañas",
  description: "Cabañas de arquitectura blanca y madera con vista a la sierra en Villanueva, La Guajira.",
  alternates: { canonical: "/cabanas" },
};

export default function CabanasPage() {
  return (
    <>
      <MotionController />
      <main>
        <PageHero titulo="Cabañas" kicker="Alojamiento" foto="/images/cabanas/cabana-arco.jpg" alt="Cabaña con ventanal en arco" />
        <Cabanas />
        <ReservaBanda texto="Elige tus fechas y te confirmamos disponibilidad por WhatsApp." />
      </main>
    </>
  );
}
