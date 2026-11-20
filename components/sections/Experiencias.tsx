import { experiencias } from "@/data/experiencias";
import { Lines } from "@/components/ui/Lines";
import { Arch } from "@/components/ui/Arch";

/** «Ofrecemos todas las comodidades…» del wireframe: fila de círculos alineados */
export function Experiencias() {
  return (
    <section id="experiencias" aria-labelledby="exp-title" className="px-[var(--gutter)] py-28 text-center sm:py-36">
      <p data-reveal className="text-[0.86rem] font-normal uppercase tracking-[0.24em] text-granate/70">
        Experiencias
      </p>
      <Lines
        id="exp-title"
        className="t-recto mx-auto mt-4 max-w-4xl font-[family-name:var(--font-display)] text-[clamp(2.4rem,4.6vw,4.6rem)] leading-[1.02] text-granate"
        lines={["El tiempo para", <>disfrutar <span key="i" className="t-italic">sin prisa.</span></>]}
      />

      <ul className="mt-20 grid grid-cols-2 gap-x-6 gap-y-14 lg:grid-cols-4">
        {experiencias.map((e) => (
          <li key={e.id} className="flex flex-col items-center">
            <Arch shape="circle" className="aspect-square w-full max-w-[260px]" />
            <h3 data-reveal className="mt-7 text-[0.92rem] font-normal uppercase tracking-[0.2em] text-granate">
              {e.titulo}
            </h3>
            <p data-reveal className="mt-3 max-w-[18rem] text-[1.2rem] leading-[1.4] text-granate/75">
              {e.texto}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
