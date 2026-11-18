import { Arch } from "@/components/ui/Arch";
import { Lines } from "@/components/ui/Lines";

/** «Descubre un destino exclusivo…» (wireframe Home) con dos arcos alineados */
export function Destino() {
  return (
    <section id="casa" aria-labelledby="casa-title" className="px-[var(--gutter)] py-28 text-center sm:py-36">
      <Lines
        id="casa-title"
        className="mx-auto max-w-5xl font-[family-name:var(--font-display)] text-[clamp(2.4rem,4.6vw,4.6rem)] leading-[1.02] text-granate"
        lines={[
          <>Descubre <span key="a" className="text-carmesi">un destino exclusivo</span></>,
          "donde la sofisticación y la naturaleza",
          <span key="b" className="t-italic">se encuentran.</span>,
        ]}
      />
      <p data-reveal className="mx-auto mt-10 max-w-2xl text-[1.125rem] leading-[1.4] text-granate/85">
        Gardners Hills nació con la idea de ofrecer un refugio íntimo en la naturaleza, donde la serenidad del entorno
        se combina con un diseño moderno y funcional. Nuestras cabañas brindan vistas panorámicas a la sierra en
        Villanueva, La Guajira.
      </p>

      <div className="mt-20 grid gap-6 sm:mt-24 sm:grid-cols-2">
        <Arch src="/images/cabanas/cabana-fachada.jpg" alt="Fachada en arco de una cabaña" className="aspect-[4/5] w-full" sizes="(min-width: 640px) 48vw, 100vw" />
        <Arch src="/images/cabanas/cabanas-fila.jpg" alt="Cabañas frente al jardín" className="aspect-[4/5] w-full" sizes="(min-width: 640px) 48vw, 100vw" />
      </div>
    </section>
  );
}
