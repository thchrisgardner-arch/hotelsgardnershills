"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { servicios } from "@/data/servicios";
import { Arch } from "@/components/ui/Arch";
import { Pill } from "@/components/ui/Pill";

/** Pestañas Hotel / Spa / Gym del XD: texto a la izquierda, imagen en arco a la derecha */
export function Servicios() {
  const [i, setI] = useState(0);
  const panel = useRef<HTMLDivElement>(null);
  const s = servicios[i];

  function select(n: number) {
    if (n === i) return;
    const el = panel.current;
    if (!el) return setI(n);
    gsap.to(el, {
      autoAlpha: 0,
      y: 12,
      duration: 0.35,
      ease: "power2.in",
      onComplete: () => {
        setI(n);
        gsap.fromTo(el, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out" });
      },
    });
  }

  return (
    <section id="servicios" aria-label="Servicios" className="bg-marfil/40 px-[var(--gutter)] py-28 sm:py-36">
      <div className="grid items-center gap-16 lg:grid-cols-2">
        <div className="flex h-full flex-col">
          <div role="tablist" aria-label="Servicios" className="flex gap-10">
            {servicios.map((x, n) => (
              <button
                key={x.id}
                role="tab"
                aria-selected={n === i}
                aria-controls="servicio-panel"
                onClick={() => select(n)}
                className={`relative py-2 text-[0.88rem] font-normal uppercase tracking-[0.24em] transition-colors ${
                  n === i ? "text-granate" : "text-granate/45 hover:text-granate/80"
                }`}
              >
                {x.tab}
                <span
                  className={`absolute -bottom-0.5 left-0 h-px w-full origin-left bg-granate transition-transform duration-500 ${
                    n === i ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </button>
            ))}
          </div>

          <div id="servicio-panel" role="tabpanel" ref={panel} className="mt-auto pt-24">
            <h2 className="flex items-baseline gap-5 text-granate">
              <span className="text-[0.92rem] font-normal uppercase tracking-[0.24em]">Hills</span>
              <span className="t-italic text-[clamp(3.4rem,6vw,6rem)] leading-none">{s.titulo}</span>
            </h2>
            <p className="mt-8 max-w-md leading-[1.4] text-granate/85">{s.texto}</p>
            <div className="mt-10">
              <Pill href={s.cta.href}>{s.cta.label}</Pill>
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[560px]">
          <Arch key={s.id} src={s.foto} alt={s.titulo} reveal={false} className="aspect-[4/5] w-full" sizes="(min-width: 1024px) 40vw, 100vw" />
        </div>
      </div>
    </section>
  );
}
