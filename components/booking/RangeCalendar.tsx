"use client";

import { useMemo, useState } from "react";
import { reservas } from "@/data/reservas";

/** Utilidades de fecha en hora local, formato AAAA-MM-DD */
export const iso = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const MESES = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const DIAS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

const precio = (v: number) =>
  v >= 1_000_000 ? `${(v / 1_000_000).toFixed(1).replace(".", ",")}M $` : `${(v / 1000).toFixed(1).replace(".", ",")}K $`;

type Props = {
  llegada: string;
  salida: string;
  onChange: (llegada: string, salida: string) => void;
  onComplete?: () => void;
};

/** Calendario de dos meses con selección de rango (entrada → salida) */
export function RangeCalendar({ llegada, salida, onChange, onComplete }: Props) {
  const hoy = useMemo(() => iso(new Date()), []);
  const base = useMemo(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  }, []);
  const [offset, setOffset] = useState(0);
  const [hover, setHover] = useState<string | null>(null);

  function pick(d: string) {
    if (!llegada || salida || d <= llegada) {
      onChange(d, "");
    } else {
      onChange(llegada, d);
      onComplete?.();
    }
  }

  const finRango = salida || (llegada && hover && hover > llegada ? hover : "");

  const mes = (k: number) => {
    const first = new Date(base.getFullYear(), base.getMonth() + offset + k, 1);
    const dias = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();
    const lead = (first.getDay() + 6) % 7; // lunes = 0
    const celdas: (string | null)[] = [...Array(lead).fill(null)];
    for (let i = 1; i <= dias; i++) celdas.push(iso(new Date(first.getFullYear(), first.getMonth(), i)));
    return (
      <div key={k} className="min-w-0">
        <p className="mb-5 text-center font-[family-name:var(--font-display)] text-[1.7rem] leading-none text-granate">
          {MESES[first.getMonth()]} <span className="t-italic">{first.getFullYear()}</span>
        </p>
        <div className="grid grid-cols-7 text-center">
          {DIAS.map((d) => (
            <span key={d} className="pb-3 text-[0.82rem] font-normal uppercase tracking-[0.14em] text-granate/55">
              {d}
            </span>
          ))}
          {celdas.map((d, i) => {
            if (!d) return <span key={`v${i}`} />;
            const pasado = d < hoy;
            const esInicio = d === llegada;
            const esFin = d === finRango;
            const enRango = llegada && finRango && d > llegada && d < finRango;
            const tarifa = reservas.tarifas[d];
            return (
              <button
                key={d}
                type="button"
                disabled={pasado}
                onClick={() => pick(d)}
                onMouseEnter={() => setHover(d)}
                aria-label={`${Number(d.slice(8))} de ${MESES[Number(d.slice(5, 7)) - 1]}${esInicio ? ", entrada" : ""}${esFin ? ", salida" : ""}`}
                aria-pressed={esInicio || esFin}
                className={`relative flex h-14 flex-col items-center justify-center transition-colors ${
                  pasado ? "cursor-not-allowed text-granate/25" : "text-granate hover:bg-rosa/40"
                } ${enRango ? "bg-rosa/45" : ""} ${esInicio || esFin ? "!bg-granate !text-crema" : ""} ${
                  esInicio ? "rounded-l-full" : ""
                } ${esFin ? "rounded-r-full" : ""} ${esInicio && !finRango ? "rounded-full" : ""}`}
              >
                <span className={`text-[1.16rem] leading-none ${d === hoy ? "font-semibold underline underline-offset-4" : ""}`}>
                  {Number(d.slice(8))}
                </span>
                {tarifa && !pasado && <span className="mt-1 text-[0.75rem] opacity-70">{precio(tarifa)}</span>}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div onMouseLeave={() => setHover(null)}>
      <div className="relative grid gap-10 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => setOffset((o) => Math.max(0, o - 1))}
          disabled={offset === 0}
          aria-label="Meses anteriores"
          className="absolute left-0 top-0 grid h-8 w-8 place-items-center rounded-full border border-granate/30 text-granate transition-colors hover:bg-granate hover:text-crema disabled:pointer-events-none disabled:opacity-0"
        >
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 rotate-180" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M2 8h11M9 4l4 4-4 4" /></svg>
        </button>
        <button
          type="button"
          onClick={() => setOffset((o) => o + 1)}
          aria-label="Meses siguientes"
          className="absolute right-0 top-0 grid h-8 w-8 place-items-center rounded-full border border-granate/30 text-granate transition-colors hover:bg-granate hover:text-crema"
        >
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M2 8h11M9 4l4 4-4 4" /></svg>
        </button>
        {mes(0)}
        {mes(1)}
      </div>
    </div>
  );
}
