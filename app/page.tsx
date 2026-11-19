import { Preloader } from "@/components/layout/Preloader";
import { MotionController } from "@/components/layout/MotionController";
import { Hero } from "@/components/sections/Hero";
import { Destino } from "@/components/sections/Destino";
import { CabanasResumen } from "@/components/sections/CabanasResumen";
import { Esencia } from "@/components/sections/Esencia";
import { Servicios } from "@/components/sections/Servicios";
import { Refugio } from "@/components/sections/Refugio";
import { Experiencias } from "@/components/sections/Experiencias";
import { Alrededores } from "@/components/sections/Alrededores";
import { Galeria } from "@/components/sections/Galeria";
import { ReservaBanda } from "@/components/sections/ReservaBanda";

export default function Home() {
  return (
    <>
      <Preloader />
      <MotionController intro />
      <main>
        <Hero />
        <Destino />
        <CabanasResumen />
        <Esencia />
        <Servicios />
        <Refugio />
        <Experiencias />
        <Alrededores />
        <Galeria />
        <ReservaBanda />
      </main>
    </>
  );
}
