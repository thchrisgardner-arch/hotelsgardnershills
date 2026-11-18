"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { site } from "@/data/site";

type Panel = "fechas" | "quien" | null;

/**
 * Barra de reservas fija en la parte baja (Cuándo · Quién · Promoción · Buscar).
 * No simula disponibilidad: «Buscar» envía la solicitud por WhatsApp.
 * Al integrar el motor de reservas, sustituir `buscar` por su URL de búsqueda.
 */
export function BookingBar() {
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const [llegada, setLlegada] = useState("");
  const [salida, setSalida] = useState("");
  const [adultos, setAdultos] = useState(2);
  const [ninos, setNinos] = useState(0);
  const [habitaciones, setHabitaciones] = useState(1);
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
    new Date(d + "T12:00:00").toLocaleDateString("es-CO", { day: "numeric", month: "short" }).replace(".", "");
  const largo = (d: string) =>
    new Date(d + "T12:00:00").toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric" });

  const fechasLabel = llegada && salida ? `${corto(llegada)} — ${corto(salida)}` : llegada ? `${corto(llegada)} — Salida` : "Entrada — Salida";
  const quienLabel = `${adultos} ${adultos === 1 ? "adulto" : "adultos"}${ninos ? ` · ${ninos} ${ninos === 1 ? "niño" : "niños"}` : ""} · ${habitaciones} ${habitaciones === 1 ? "cabaña" : "cabañas"}`;

  function buscar() {
    setError(null);
    if (!llegada || !salida) {
      setPanel("fechas");
      return setError("Elige tus fechas de entrada y salida.");
    }
    if (salida <= llegada) {
      setPanel("fechas");
      return setError("La salida debe ser posterior a la entrada.");
    }
    const msg = [
      "Hola, Gardners Hills. Quisiera consultar disponibilidad:",
      `• Entrada: ${largo(llegada)}`,
      `• Salida: ${largo(salida)}`,
      `• Huéspedes: ${adultos} adultos${ninos ? `, ${ninos} niños` : ""}`,
      `• Cabañas: ${habitaciones}`,
      codigo ? `• Código de promoción: ${codigo}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    window.open(`https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
    setPanel(null);
  }

  const cell = "flex items-center gap-3.5 px-6 py-3 text-left transition-colors hover:bg-granate/[0.04] focus-visible:bg-granate/[0.06]";
  const small = "block text-[0.78rem] leading-tight text-granate/60";
  const value = "block whitespace-nowrap text-[1.125rem] leading-snug text-granate";

  return (
    <div
      ref={root}
      className="fixed bottom-4 left-1/2 z-40 hidden -translate-x-1/2 md:block"
      role="search"
      aria-label="Buscar disponibilidad"
    >
      {/* Paneles */}
      {panel === "fechas" && (
        <div className="absolute bottom-full left-0 mb-3 w-[380px] rounded-md border border-granate/10 bg-blanco p-6 shadow-[0_12px_40px_-12px_rgba(120,16,6,0.35)]">
          <p className="mb-4 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-granate/60">Fechas de estancia</p>
          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className={small}>Entrada</span>
              <input type="date" min={today} value={llegada} onChange={(e) => { setLlegada(e.target.value); if (salida && e.target.value >= salida) setSalida(""); }} className="mt-1 w-full border-b border-granate/30 bg-transparent py-1.5 text-granate outline-none [color-scheme:light] focus:border-granate" />
            </label>
            <label className="block">
              <span className={small}>Salida</span>
              <input type="date" min={llegada || today} value={salida} onChange={(e) => setSalida(e.target.value)} className="mt-1 w-full border-b border-granate/30 bg-transparent py-1.5 text-granate outline-none [color-scheme:light] focus:border-granate" />
            </label>
          </div>
          {error && <p className="mt-4 text-sm text-carmesi">{error}</p>}
          <button type="button" onClick={() => setPanel(null)} className="mt-5 text-[0.7rem] font-medium uppercase tracking-[0.16em] text-granate underline underline-offset-4">
            Listo
          </button>
        </div>
      )}
      {panel === "quien" && (
        <div className="absolute bottom-full left-[200px] mb-3 w-[320px] rounded-md border border-granate/10 bg-blanco p-6 shadow-[0_12px_40px_-12px_rgba(120,16,6,0.35)]">
          {[
            { label: "Adultos", v: adultos, set: setAdultos, min: 1 },
            { label: "Niños", v: ninos, set: setNinos, min: 0 },
            { label: "Cabañas", v: habitaciones, set: setHabitaciones, min: 1 },
          ].map((r) => (
            <div key={r.label} className="flex items-center justify-between border-b border-granate/10 py-3 last:border-0">
              <span className="text-granate">{r.label}</span>
              <div className="flex items-center gap-4">
                <button type="button" aria-label={`Quitar ${r.label.toLowerCase()}`} disabled={r.v <= r.min} onClick={() => r.set(r.v - 1)} className="grid h-8 w-8 place-items-center rounded-full border border-granate/40 text-granate disabled:opacity-30">−</button>
                <span className="w-4 text-center text-granate" aria-live="polite">{r.v}</span>
                <button type="button" aria-label={`Añadir ${r.label.toLowerCase()}`} disabled={r.v >= 12} onClick={() => r.set(r.v + 1)} className="grid h-8 w-8 place-items-center rounded-full border border-granate/40 text-granate disabled:opacity-30">+</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Barra */}
      <div className="flex items-stretch rounded-md border border-granate/10 bg-blanco p-2 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.35)]">
        <button type="button" onClick={() => setPanel(panel === "fechas" ? null : "fechas")} aria-expanded={panel === "fechas"} className={cell}>
          <svg viewBox="0 0 24 24" className="h-6 w-6 text-granate" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden><rect x="3.5" y="5" width="17" height="15" rx="1.5" /><path d="M3.5 9.5h17M8 3v4M16 3v4" /></svg>
          <span>
            <span className={small}>Cuándo</span>
            <span className={value}>{fechasLabel}</span>
          </span>
        </button>
        <span aria-hidden className="my-2 w-px bg-granate/12" />
        <button type="button" onClick={() => setPanel(panel === "quien" ? null : "quien")} aria-expanded={panel === "quien"} className={cell}>
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
              placeholder="Código"
              aria-label="Código de promoción"
              className="block w-28 bg-transparent text-[1.125rem] leading-snug text-granate outline-none placeholder:text-granate/45"
            />
          </span>
        </label>
        <button
          type="button"
          onClick={buscar}
          className="ml-2 rounded-[4px] bg-granate px-8 text-[1.125rem] font-medium text-crema transition-colors duration-500 hover:bg-carmesi active:bg-carmesi/90"
        >
          Buscar
        </button>
      </div>
    </div>
  );
}
