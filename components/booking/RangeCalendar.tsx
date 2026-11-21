"use client";

import { useMemo, useState } from "react";
import { reservas } from "@/data/reservas";
import { useLang } from "@/lib/i18n";

/** Utilidades de fecha en hora local, formato AAAA-MM-DD */
export const iso = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const MESES_ES = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const DIAS_ES = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

const MESES_EN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DIAS_EN = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const precio = (v: number) =>
  v >= 1_000_000 ? `${(v / 1_000_000).toFixed(1).replace(".", ",")}M $` : `${(v / 1000).toFixed(1).replace(".", ",")}K $`;

type Props = {
  llegada: string;
  salida: string;
  onChange: (llegada: string, salida: string) => void;
  onComplete?: () => void;
  /** Versión reducida para el panel flotante de la barra de reserva */
  compacto?: boolean;
};

/** Calendario de dos meses con selección de rango (entrada → salida) */
export function RangeCalendar({ llegada, salida, onChange, onComplete, compacto = false }: Props) {
  const { lang } = useLang();
  const MESES = lang === "es" ? MESES_ES : MESES_EN;
  const DIAS = lang === "es" ? DIAS_ES : DIAS_EN;
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
        <p className={`text-center font-[family-name:var(--font-display)] leading-none text-granate ${compacto ? "mb-3 text-[1.3rem]" : "mb-5 text-[1.7rem]"}`}>
          {MESES[first.getMonth()]} <span className="t-italic">{first.getFullYear()}</span>
        </p>
        <div className="grid grid-cols-7 text-center">
          {DIAS.map((d) => (
            <span key={d} className={`font-normal uppercase tracking-[0.14em] text-granate ${compacto ? "pb-1.5 text-[0.75rem]" : "pb-3 text-[0.875rem]"}`}>
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
                aria-label={lang === "es" ? `${Number(d.slice(8))} de ${MESES[Number(d.slice(5, 7)) - 1]}${esInicio ? ", entrada" : ""}${esFin ? ", salida" : ""}` : `${MESES[Number(d.slice(5, 7)) - 1]} ${Number(d.slice(8))}${esInicio ? ", check-in" : ""}${esFin ? ", check-out" : ""}`}
                aria-pressed={esInicio || esFin}
                className={`relative flex flex-col items-center ${compacto ? "h-9" : "h-11 sm:h-14"} justify-center transition-colors ${
                  pasado ? "cursor-not-allowed text-granate/25" : "text-granate hover:bg-rosa/40"
                } ${enRango ? "bg-rosa/45" : ""} ${esInicio || esFin ? "!bg-granate !text-crema" : ""} ${
                  esInicio ? "rounded-l-full" : ""
                } ${esFin ? "rounded-r-full" : ""} ${esInicio && !finRango ? "rounded-full" : ""}`}
              >
                <span className={`leading-none ${compacto ? "text-[0.98rem]" : "text-[1.16rem]"} ${d === hoy ? "font-semibold underline underline-offset-4" : ""}`}>
                  {Number(d.slice(8))}
                </span>
                {tarifa && !pasado && <span className="mt-1 text-[0.875rem] opacity-70">{precio(tarifa)}</span>}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div onMouseLeave={() => setHover(null)}>
      <div className={`relative grid sm:grid-cols-2 ${compacto ? "gap-8" : "gap-10"}`}>
        <button
          type="button"
          onClick={() => setOffset((o) => Math.max(0, o - 1))}
          disabled={offset === 0}
          aria-label={lang === "es" ? "Meses anteriores" : "Previous months"}
          className={`absolute left-0 grid place-items-center ${compacto ? "-top-1.5 h-9 w-9" : "-top-2 h-11 w-11"} rounded-full border border-granate/30 text-granate transition-colors hover:bg-granate hover:text-crema disabled:pointer-events-none disabled:opacity-0`}
        >
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 rotate-180" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M2 8h11M9 4l4 4-4 4" /></svg>
        </button>
        <button
          type="button"
          onClick={() => setOffset((o) => o + 1)}
          aria-label={lang === "es" ? "Meses siguientes" : "Next months"}
          className={`absolute right-0 grid place-items-center rounded-full border border-granate/30 text-granate transition-colors hover:bg-granate hover:text-crema ${compacto ? "-top-1.5 h-9 w-9" : "-top-2 h-11 w-11"}`}
        >
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M2 8h11M9 4l4 4-4 4" /></svg>
        </button>
        {mes(0)}
        {mes(1)}
      </div>
    </div>
  );
}
