import type { Metadata } from "next";
import { MotionController } from "@/components/layout/MotionController";
import { HeroIntro } from "@/components/sections/HeroIntro";
import { Destino } from "@/components/sections/Destino";
import { CabanasResumen } from "@/components/sections/CabanasResumen";
import { Esencia } from "@/components/sections/Esencia";
import { Servicios } from "@/components/sections/Servicios";
import { Refugio } from "@/components/sections/Refugio";
import { Experiencias } from "@/components/sections/Experiencias";
import { Alrededores } from "@/components/sections/Alrededores";
import { Galeria } from "@/components/sections/Galeria";
import { Resenas } from "@/components/sections/Resenas";
import { getLang, type LangParams } from "@/lib/lang";
import { alternativos } from "@/lib/routes";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await getLang(params);
  return { alternates: alternativos("/", lang) };
}

/**
 * Portada. CTA de reserva: el del hero, la barra flotante y el del footer
 * (se quitó la banda «Reserva tu estancia» porque repetía el del footer justo después).
 */
export default async function Home({ params }: LangParams) {
  const lang = await getLang(params);
  return (
    <>
      <MotionController intro />
      <main>
        <HeroIntro />
        <Destino lang={lang} />
        <CabanasResumen lang={lang} />
        <Esencia lang={lang} />
        <Servicios />
        <Refugio lang={lang} />
        <Experiencias lang={lang} />
        <Alrededores lang={lang} />
        <Galeria lang={lang} />
        <Resenas />
      </main>
    </>
  );
}
