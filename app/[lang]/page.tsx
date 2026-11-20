import type { Metadata } from "next";
import { MotionController } from "@/components/layout/MotionController";
import { HeroIntro } from "@/components/sections/HeroIntro";
import { Destino } from "@/components/sections/Destino";
import { CabanasResumen } from "@/components/sections/CabanasResumen";
import { Servicios } from "@/components/sections/Servicios";
import { Refugio } from "@/components/sections/Refugio";
import { Experiencias } from "@/components/sections/Experiencias";
import { Alrededores } from "@/components/sections/Alrededores";
import { Galeria } from "@/components/sections/Galeria";
import { Resenas } from "@/components/sections/Resenas";
import { ReservaBanda } from "@/components/sections/ReservaBanda";
import { getLang, type LangParams } from "@/lib/lang";
import { alternativos } from "@/lib/routes";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await getLang(params);
  return { alternates: alternativos("/", lang) };
}

/**
 * Portada. Solo cuatro botones de reserva visibles (2026-11-20): cabecera, barra de reserva del hero,
 * cierre «Tu próxima escapada comienza aquí» y barra fija de móvil. El botón del hero lleva a las cabañas.
 */
export default async function Home({ params }: LangParams) {
  const lang = await getLang(params);
  return (
    <>
      <MotionController intro />
      <main>
        <HeroIntro />
        <CabanasResumen lang={lang} />
        <Experiencias lang={lang} />
        <Alrededores lang={lang} />
        <Destino lang={lang} />
        <Servicios />
        <Refugio lang={lang} />
        <Galeria lang={lang} />
        <Resenas />
        <ReservaBanda lang={lang} />
      </main>
    </>
  );
}
