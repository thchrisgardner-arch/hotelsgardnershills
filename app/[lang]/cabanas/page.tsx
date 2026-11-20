import type { Metadata } from "next";
import { Suspense } from "react";
import { MotionController } from "@/components/layout/MotionController";
import { PageHero } from "@/components/layout/PageHero";
import { Cabanas } from "@/components/sections/Cabanas";
import { ReservaBanda } from "@/components/sections/ReservaBanda";
import { getLang, meta, type LangParams } from "@/lib/lang";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await getLang(params);
  return meta(lang, "/cabanas", {
    es: { title: "Cabañas", description: "8 cabañas Refugio y Premium de arquitectura blanca y madera con vista a la sierra en Villanueva, La Guajira." },
    en: { title: "Cabins", description: "8 Refugio and Premium cabins of white architecture and wood with mountain views in Villanueva, La Guajira." },
  });
}

export default async function CabanasPage({ params }: LangParams) {
  const lang = await getLang(params);
  const t = {
    es: { kicker: "Bienvenidos", alt: "Cabaña de Gardners Hills con ventanal en arco", banda: "Elige tus fechas y reserva tu cabaña." },
    en: { kicker: "Welcome", alt: "Gardners Hills cabin with an arched window", banda: "Choose your dates and book your cabin." },
  }[lang];
  return (
    <>
      <MotionController />
      <main>
        <PageHero titulo="Gardners Hills" kicker={t.kicker} foto="/images/cabanas/cabana-arco.jpg" alt={t.alt} />
        <Suspense>
          <Cabanas />
        </Suspense>
        <ReservaBanda lang={lang} texto={t.banda} />
      </main>
    </>
  );
}
