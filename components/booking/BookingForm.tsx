"use client";

import { useMemo, useState } from "react";
import { site } from "@/data/site";

/**
 * Solicitud de reserva (wireframe «Reserva en Gardner Hills»).
 * NO simula disponibilidad: compone el mensaje y lo envía por WhatsApp (o correo si no hay WhatsApp).
 * Cuando exista motor de reservas, sustituir `submit` por su integración.
 */
export function BookingForm() {
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const [f, setF] = useState({ nombre: "", apellido: "", llegada: "", salida: "", huespedes: "2", mensaje: "" });
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setF((v) => ({ ...v, [k]: e.target.value }));

  const fmt = (d: string) =>
    new Date(d + "T12:00:00").toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric" });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!f.nombre.trim()) return setError("Escribe tu nombre.");
    if (!f.llegada || !f.salida) return setError("Elige tus fechas de llegada y salida.");
    if (f.salida <= f.llegada) return setError("La fecha de salida debe ser posterior a la de llegada.");

    const msg = [
      `Hola, Gardners Hills. Soy ${f.nombre} ${f.apellido}`.trim() + ".",
      "Quisiera consultar disponibilidad:",
      `• Llegada: ${fmt(f.llegada)}`,
      `• Salida: ${fmt(f.salida)}`,
      `• Huéspedes: ${f.huespedes}`,
      f.mensaje ? `\n${f.mensaje}` : "",
    ].join("\n");

    if (site.contact.whatsapp) {
      window.open(`https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
    } else if (site.contact.email) {
      window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent("Solicitud de reserva")}&body=${encodeURIComponent(msg)}`;
    }
    setSent(true);
  }

  const label = "text-[0.875rem] font-normal uppercase tracking-[0.18em] text-granate/75";
  const field =
    "mt-2 w-full appearance-none rounded-none border-0 border-b border-granate/35 bg-transparent pb-2.5 pt-1 text-[1.2rem] text-granate outline-none transition-colors placeholder:text-granate/35 focus:border-granate";

  return (
    <form onSubmit={submit} noValidate className="grid gap-x-8 gap-y-9 sm:grid-cols-2">
      <label className="block">
        <span className={label}>Nombre*</span>
        <input value={f.nombre} onChange={set("nombre")} autoComplete="given-name" className={field} required />
      </label>
      <label className="block">
        <span className={label}>Apellido</span>
        <input value={f.apellido} onChange={set("apellido")} autoComplete="family-name" className={field} />
      </label>
      <label className="block">
        <span className={label}>Fecha de llegada*</span>
        <input type="date" min={today} value={f.llegada} onChange={set("llegada")} className={`${field} [color-scheme:light]`} required />
      </label>
      <label className="block">
        <span className={label}>Fecha de salida*</span>
        <input type="date" min={f.llegada || today} value={f.salida} onChange={set("salida")} className={`${field} [color-scheme:light]`} required />
      </label>
      <label className="block sm:col-span-2">
        <span className={label}>Huéspedes</span>
        <select value={f.huespedes} onChange={set("huespedes")} className={`${field} cursor-pointer`}>
          {["1", "2", "3", "4", "5", "6 o más"].map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </label>
      <label className="block sm:col-span-2">
        <span className={label}>Mensaje</span>
        <textarea value={f.mensaje} onChange={set("mensaje")} rows={3} className={`${field} resize-none`} />
      </label>

      <div className="flex flex-wrap items-center gap-6 sm:col-span-2">
        <button
          type="submit"
          className="group inline-flex items-center gap-5 rounded-full border border-granate bg-granate py-1.5 pl-6 pr-1.5 text-[0.875rem] font-normal uppercase tracking-[0.16em] text-crema transition-colors duration-500 hover:border-carmesi hover:bg-carmesi"
        >
          Consultar disponibilidad
          <span aria-hidden className="grid h-8 w-8 place-items-center rounded-full border border-current transition-transform duration-500 group-hover:translate-x-0.5">
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.1"><path d="M2 8h11M9 4l4 4-4 4" /></svg>
          </span>
        </button>
        <p className="text-base text-granate/60">Se abrirá WhatsApp con tu solicitud.</p>
      </div>

      <div aria-live="polite" className="sm:col-span-2">
        {error && <p className="text-carmesi">{error}</p>}
        {sent && !error && <p className="text-granate">Gracias. Te responderemos para confirmar disponibilidad y tarifas.</p>}
      </div>
    </form>
  );
}
