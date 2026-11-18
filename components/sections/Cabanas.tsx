import { cabanas } from "@/data/cabanas";
import { Lines } from "@/components/ui/Lines";
import { Arch } from "@/components/ui/Arch";
import { CabanaCard } from "@/components/rooms/CabanaCard";

/**
 * Cabañas — estructura de la página de alojamiento de la referencia:
 * introducción centrada + tríptico de imágenes (aquí en arcos alineados)
 * y fichas en dos columnas. Contenido propio de Gardners Hills.
 */
export function Cabanas() {
  return (
    <section id="cabanas" aria-labelledby="cabanas-title" className="border-t border-granate/15 py-28 sm:py-36">
      {/* Introducción */}
      <div className="px-[var(--gutter)] text-center">
        <p data-reveal className="text-[0.72rem] font-medium uppercase tracking-[0.24em] text-carmesi/80">
          Cabañas
        </p>
        <Lines
          id="cabanas-title"
          className="t-italic mx-auto mt-6 max-w-4xl text-[clamp(3rem,6vw,6.2rem)] leading-[0.98] text-carmesi"
          lines={["Cada cabaña,", "un refugio propio"]}
        />
        <p data-reveal className="mx-auto mt-10 max-w-md text-[0.9rem] font-medium uppercase leading-[1.5] tracking-[0.12em] text-granate">
          Abre el ventanal y deja que la luz y el viento de la sierra entren contigo.
        </p>
        <p data-reveal className="mx-auto mt-6 max-w-xl text-granate/85">
          Cada cabaña es más que un refugio: es una invitación a detenerse, respirar y encontrar equilibrio. Un diseño
          minimalista y funcional que dialoga con el entorno.
        </p>
      </div>

      {/* Tríptico en arcos, alineado */}
      <div className="mt-20 grid grid-cols-[1fr_1.45fr_1fr] gap-4 px-[var(--gutter)] sm:gap-6">
        <Arch src="/images/cabanas/cabanas-jardin.jpg" alt="Jardín frente a las cabañas" className="h-[clamp(16rem,34vw,36rem)] w-full" sizes="25vw" />
        <Arch src="/images/cabanas/cabana-fachada.jpg" alt="Fachada en arco de una cabaña" className="h-[clamp(16rem,34vw,36rem)] w-full" sizes="40vw" />
        <Arch src="/images/cabanas/cabana-terraza.jpg" alt="Terrazas de las cabañas" className="h-[clamp(16rem,34vw,36rem)] w-full" sizes="25vw" />
      </div>

      {/* Fichas */}
      <div className="mt-28 px-[var(--gutter)] sm:mt-36">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6 border-b border-granate/15 pb-6">
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,3vw,3rem)] uppercase leading-none text-carmesi">
            Encuentra tu cabaña
          </h2>
          <span className="text-[0.75rem] font-medium uppercase tracking-[0.18em] text-granate/60">
            Villanueva · La Guajira
          </span>
        </div>
        <ul className="grid gap-x-8 gap-y-24 lg:grid-cols-2">
          {cabanas.map((c) => (
            <li key={c.id}>
              <CabanaCard cabana={c} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
