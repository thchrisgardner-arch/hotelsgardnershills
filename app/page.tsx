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
import { ReservaBanda } from "@/components/sections/ReservaBanda";
import { Resenas } from "@/components/sections/Resenas";

export default function Home() {
  return (
    <>
      <MotionController intro />
      <main>
        <HeroIntro />
        <Destino />
        <CabanasResumen />
        <Esencia />
        <Servicios />
        <Refugio />
        <Experiencias />
        <Alrededores />
        <Galeria />
        <Resenas />
        <ReservaBanda />
      </main>
    </>
  );
}
