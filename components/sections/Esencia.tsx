import { Foto as Image } from "@/components/ui/Foto";
import { Lines } from "@/components/ui/Lines";

/** «Esencia — Un encuentro entre pasado y presente» (wireframe Home). Textos del manual. */
export function Esencia() {
  return (
    <section id="esencia" aria-labelledby="esencia-title" className="grid lg:grid-cols-2">
      <figure data-reveal-media className="relative min-h-[60vh] overflow-hidden bg-rosa lg:min-h-[90vh]">
        <div data-media-inner className="absolute inset-0">
          <Image src="/images/cabanas/cabanas-jardin.jpg" alt="Jardín y cabañas de Gardners Hills" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        </div>
      </figure>
      <div className="flex flex-col justify-between gap-16 bg-granate px-[var(--gutter)] py-20 text-marfil sm:px-16 lg:py-24">
        <div>
          <p data-reveal className="text-[0.86rem] font-normal uppercase tracking-[0.24em] text-rosa">
            Esencia
          </p>
          <Lines
            id="esencia-title"
            className="t-recto mt-5 font-[family-name:var(--font-display)] text-[clamp(2.6rem,4.4vw,4.6rem)] leading-[1]"
            lines={["Un encuentro entre", <span key="p" className="t-italic text-rosa">pasado y presente.</span>]}
          />
        </div>
        <div className="max-w-lg space-y-6 text-[1.2rem] leading-[1.4] text-marfil/90">
          <p data-reveal>
            Antes de convertirse en un espacio de alojamiento exclusivo, el terreno donde hoy se encuentran las cabañas
            era la casa de los abuelos: un lugar lleno de recuerdos y tradición familiar. Esta transformación le otorgó
            un nuevo propósito, manteniendo viva la esencia de sus raíces.
          </p>
          <p data-reveal>
            El nombre nace del apellido de Christopher Gardner, cuya historia inspiró la película{" "}
            <em className="t-italic text-[1.15em]">En busca de la felicidad</em>: perseverancia, sueños y nuevos
            comienzos.
          </p>
        </div>
      </div>
    </section>
  );
}
