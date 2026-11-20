import { Foto as Image } from "@/components/ui/Foto";
import { Lines } from "@/components/ui/Lines";
import { MOSTRAR_FOTOS } from "@/lib/brand";

/** Imagen a sangre «Un refugio privado — Inmerso en la naturaleza» (XD) */
export function Refugio() {
  return (
    <section
      id="entorno"
      aria-labelledby="entorno-title"
      className={`relative h-[90vh] min-h-[560px] overflow-hidden ${MOSTRAR_FOTOS ? "text-marfil" : "bg-rosa text-granate"}`}
    >
      <div data-parallax="0.08" className="absolute inset-[-8%_0]">
        <Image src="/images/cabanas/cabanas-sierra.jpg" alt="Cabañas de Gardners Hills con la sierra al fondo" fill sizes="100vw" className="object-cover" />
      </div>
      {MOSTRAR_FOTOS && <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-black/40" />}
      <div className="relative flex h-full flex-col items-center justify-between px-[var(--gutter)] py-20 text-center">
        <div>
          <p data-reveal className="text-[0.86rem] font-normal uppercase tracking-[0.3em]">
            Un refugio privado
          </p>
          <Lines id="entorno-title" className="t-italic mt-3 text-[clamp(3rem,6.4vw,6.4rem)] leading-none" lines={["Inmerso en", "la naturaleza"]} />
        </div>
        <p data-reveal className="max-w-2xl text-[1.2rem] leading-[1.4] opacity-90">
          Cierra los ojos, escucha el viento, siente la brisa. Aquí, la vida se experimenta a otro ritmo.
        </p>
      </div>
    </section>
  );
}
