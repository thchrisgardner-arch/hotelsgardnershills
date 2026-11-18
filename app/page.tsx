import { Preloader } from "@/components/layout/Preloader";
import { MotionController } from "@/components/layout/MotionController";
import { Header } from "@/components/navigation/Header";
import { MobileBookBar } from "@/components/navigation/MobileBookBar";
import { Hero } from "@/components/sections/Hero";
import { Destino } from "@/components/sections/Destino";
import { Cabanas } from "@/components/sections/Cabanas";
import { Esencia } from "@/components/sections/Esencia";
import { Servicios } from "@/components/sections/Servicios";
import { Refugio } from "@/components/sections/Refugio";
import { Experiencias } from "@/components/sections/Experiencias";
import { Alrededores } from "@/components/sections/Alrededores";
import { Galeria } from "@/components/sections/Galeria";
import { Reservas } from "@/components/sections/Reservas";
import { Footer } from "@/components/layout/Footer";
import { BookingBar } from "@/components/booking/BookingBar";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Preloader />
      <MotionController />
      <a href="#casa" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-crema focus:p-3">
        Saltar al contenido
      </a>
      <Header />
      <main>
        <Hero />
        <Destino />
        <Cabanas />
        <Esencia />
        <Servicios />
        <Refugio />
        <Experiencias />
        <Alrededores />
        <Galeria />
        <Reservas />
      </main>
      <Footer />
      <MobileBookBar />
      <BookingBar />
      <WhatsAppButton />
    </>
  );
}
