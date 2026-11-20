"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { site } from "@/data/site";
import { reservas } from "@/data/reservas";
import { RangeCalendar } from "./RangeCalendar";

type Panel = "fechas" | "quien" | null;
type Cabana = { adultos: number; ninos: number };

/**
 * Barra de reservas fija en la parte baja (Cuándo · Quién · Promoción · Buscar).
 * - Cuándo: calendario de dos meses con selección de rango.
 * - Quién: huéspedes por cabaña, con opción de añadir cabañas.
 * No simula disponibilidad: «Buscar» envía la solicitud por WhatsApp.
 */
export function BookingBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [llegada, setLlegada] = useState("");
  const [salida, setSalida] = useState("");
  const [cabanas, setCabanas] = useState<Cabana[]>([{ adultos: 2, ninos: 0 }]);
  const [codigo, setCodigo] = useState("");
  const [panel, setPanel] = useState<Panel>(null);
  const [error, setError] = useState<string | null>(null);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (root.current && !root.current.contains(e.target as Node)) setPanel(null);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setPanel(null);
    document.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const corto = (d: string) =>
    new Date(d + "T12:00:00").toLocaleDateString("es-CO", { day: "numeric", month: "short" }).replace(".", "").replace(" de ", " ");
  const largo = (d: string) =>
    new Date(d + "T12:00:00").toLocaleDateString("es-CO", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const noches = llegada && salida ? Math.round((+new Date(salida) - +new Date(llegada)) / 86400000) : 0;

  const totalAdultos = cabanas.reduce((s, c) => s + c.adultos, 0);
  const totalNinos = cabanas.reduce((s, c) => s + c.ninos, 0);
  const plural = (n: number, a: string, b: string) => `${n} ${n === 1 ? a : b}`;

  const fechasLabel = llegada && salida ? `${corto(llegada)} — ${corto(salida)}` : llegada ? `${corto(llegada)} — Salida` : "Entrada — Salida";
  const quienLabel = [
    plural(totalAdultos, "adulto", "adultos"),
    totalNinos ? plural(totalNinos, "niño", "niños") : null,
    plural(cabanas.length, "cabaña", "cabañas"),
  ]
    .filter(Boolean)
    .join(" · ");

  const setCab = (i: number, k: keyof Cabana, v: number) =>
    setCabanas((cs) => cs.map((c, j) => (j === i ? { ...c, [k]: v } : c)));

  function buscar() {
    setError(null);
    if (!llegada || !salida) {
      setPanel("fechas");
      return setError("Elige tus fechas de entrada y salida.");
    }
    // Lleva a la página de reserva con la búsqueda ya cargada
    const q = new URLSearchParams({
      llegada,
      salida,
      adultos: String(totalAdultos),
      ninos: String(totalNinos),
      ...(codigo ? { codigo } : {}),
    });
    router.push(`/reservas?${q.toString()}#resultados`);
    setPanel(null);
  }

  const panelBox = "absolute bottom-full mb-3 rounded-md border border-granate/12 bg-crema shadow-[0_18px_50px_-18px_rgba(16,15,14,0.35)]";
  const cell = "flex items-center gap-3.5 px-6 py-3 text-left transition-colors hover:bg-granate/[0.04]";
  const small = "block text-[0.92rem] leading-tight text-granate/60";
  const value = "block whitespace-nowrap text-[1.16rem] leading-snug text-granate";
  const step =
    "grid h-9 w-9 place-items-center rounded-[4px] border border-granate/50 text-granate transition-colors hover:bg-granate hover:text-crema disabled:border-transparent disabled:bg-granate/10 disabled:text-granate/30 disabled:hover:bg-granate/10";

  // En la página de reserva el buscador ya está en la propia página
  if (pathname?.startsWith("/reservas")) return null;

  return (
    <div ref={root} data-chrome className="fixed bottom-4 left-1/2 z-40 hidden -translate-x-1/2 md:block" role="search" aria-label="Buscar disponibilidad">
      {/* ── Calendario ── */}
      {panel === "fechas" && (
        <div role="dialog" aria-label="Elige tus fechas" className={`${panelBox} left-1/2 w-[min(880px,calc(100vw-2rem))] -translate-x-1/2 px-8 pb-6 pt-7`}>
          <RangeCalendar
            llegada={llegada}
            salida={salida}
            onChange={(a, b) => {
              setLlegada(a);
              setSalida(b);
              setError(null);
            }}
            onComplete={() => setTimeout(() => setPanel("quien"), 250)}
          />
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-granate/12 pt-5 text-[1.02rem] text-granate/70">
            <p className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8v.5" /></svg>
              {reservas.nota}
            </p>
            <p className="text-granate" aria-live="polite">
              {error ? <span className="text-carmesi">{error}</span> : noches ? plural(noches, "noche", "noches") : llegada ? "Elige la fecha de salida" : "Elige la fecha de entrada"}
            </p>
          </div>
        </div>
      )}

      {/* ── Huéspedes por cabaña ── */}
      {panel === "quien" && (
        <div role="dialog" aria-label="Huéspedes" className={`${panelBox} left-[190px] w-[380px] overflow-hidden`}>
          <div className="max-h-[56vh] overflow-y-auto">
            {cabanas.map((c, i) => (
              <div key={i} className="border-b border-granate/12 px-6 pb-5 pt-5">
                <div className="mb-3 flex items-center justify-between">
                  <p className="font-[family-name:var(--font-display)] text-[1.5rem] leading-none text-granate">
                    Cabaña <span className="t-italic">{i + 1}</span>
                  </p>
                  {cabanas.length > 1 && (
                    <button type="button" onClick={() => setCabanas((cs) => cs.filter((_, j) => j !== i))} className="text-[0.84rem] font-normal uppercase tracking-[0.14em] text-granate/60 underline underline-offset-4 hover:text-carmesi">
                      Quitar
                    </button>
                  )}
                </div>
                {([
                  { k: "adultos", label: "Adultos", sub: reservas.edadAdultos, min: 1, max: reservas.maxAdultosPorCabana },
                  { k: "ninos", label: "Niños", sub: reservas.edadNinos, min: 0, max: reservas.maxNinosPorCabana },
                ] as const).map((r) => (
                  <div key={r.k} className="flex items-center justify-between py-2.5">
                    <div>
                      <p className="text-granate">{r.label}</p>
                      {r.sub && <p className="text-[0.98rem] text-granate/60">{r.sub}</p>}
                    </div>
                    <div className="flex items-center gap-4">
                      <button type="button" className={step} disabled={c[r.k] <= r.min} onClick={() => setCab(i, r.k, c[r.k] - 1)} aria-label={`Quitar ${r.label.toLowerCase()} en cabaña ${i + 1}`}>
                        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" stroke="currentColor" strokeWidth="1.4"><path d="M3 8h10" /></svg>
                      </button>
                      <span className="w-5 text-center text-[1.2rem] text-granate" aria-live="polite">{c[r.k]}</span>
                      <button type="button" className={step} disabled={c[r.k] >= r.max} onClick={() => setCab(i, r.k, c[r.k] + 1)} aria-label={`Añadir ${r.label.toLowerCase()} en cabaña ${i + 1}`}>
                        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" stroke="currentColor" strokeWidth="1.4"><path d="M3 8h10M8 3v10" /></svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="space-y-3 p-5">
            <button
              type="button"
              disabled={cabanas.length >= reservas.maxCabanas}
              onClick={() => setCabanas((cs) => [...cs, { adultos: 2, ninos: 0 }])}
              className="w-full rounded-[4px] border border-granate/60 py-3 text-[1.08rem] text-granate transition-colors hover:bg-granate hover:text-crema disabled:opacity-40"
            >
              Añadir cabaña
            </button>
            <button type="button" onClick={() => setPanel(null)} className="w-full py-1 text-[0.86rem] font-normal uppercase tracking-[0.16em] text-granate/70 hover:text-carmesi">
              Listo
            </button>
          </div>
        </div>
      )}

      {/* ── Barra ── */}
      <div className="flex items-stretch rounded-md border border-granate/10 bg-crema p-2 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.35)]">
        <button type="button" onClick={() => setPanel(panel === "fechas" ? null : "fechas")} aria-expanded={panel === "fechas"} aria-haspopup="dialog" className={`${cell} ${panel === "fechas" ? "bg-granate/[0.06]" : ""}`}>
          <svg viewBox="0 0 24 24" className="h-6 w-6 text-granate" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden><rect x="3.5" y="5" width="17" height="15" rx="1.5" /><path d="M3.5 9.5h17M8 3v4M16 3v4" /></svg>
          <span>
            <span className={small}>Cuándo</span>
            <span className={value}>{fechasLabel}</span>
          </span>
        </button>
        <span aria-hidden className="my-2 w-px bg-granate/12" />
        <button type="button" onClick={() => setPanel(panel === "quien" ? null : "quien")} aria-expanded={panel === "quien"} aria-haspopup="dialog" className={`${cell} ${panel === "quien" ? "bg-granate/[0.06]" : ""}`}>
          <svg viewBox="0 0 24 24" className="h-6 w-6 text-granate" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden><circle cx="9" cy="8.5" r="3.2" /><path d="M3.5 19c.6-3.2 2.8-5 5.5-5s4.9 1.8 5.5 5" /><circle cx="16.8" cy="9.5" r="2.5" /><path d="M16.5 14c2.2.1 3.6 1.6 4 4" /></svg>
          <span>
            <span className={small}>Quién</span>
            <span className={value}>{quienLabel}</span>
          </span>
        </button>
        <span aria-hidden className="my-2 w-px bg-granate/12" />
        <label className={`${cell} cursor-text`}>
          <svg viewBox="0 0 24 24" className="h-6 w-6 text-granate" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden><path d="M3.5 12.2V4.5a1 1 0 0 1 1-1h7.7l8.3 8.3-8.7 8.7-8.3-8.3z" /><circle cx="8.3" cy="8.3" r="1.4" /></svg>
          <span>
            <span className={small}>Promoción</span>
            <input
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              onFocus={() => setPanel(null)}
              placeholder="Código"
              aria-label="Código de promoción"
              className="block w-28 bg-transparent text-[1.16rem] leading-snug text-granate outline-none placeholder:text-granate/45"
            />
          </span>
        </label>
        <button type="button" onClick={buscar} className="ml-2 rounded-[4px] bg-granate px-8 text-[1.12rem] font-normal text-crema transition-colors duration-500 hover:bg-carmesi active:bg-carmesi/90">
          Buscar
        </button>
      </div>
    </div>
  );
}
