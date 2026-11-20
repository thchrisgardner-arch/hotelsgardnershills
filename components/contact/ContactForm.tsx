"use client";

import { useState } from "react";
import { site } from "@/data/site";
import { useLang } from "@/lib/i18n";

const TXT = {
  es: { faltan: "Escribe tu nombre y tu mensaje.", correoMal: "Revisa tu correo electrónico.", asunto: "Contacto web", nombre: "Nombre*", apellido: "Apellido", correo: "Correo", telefono: "Teléfono", mensaje: "Mensaje*", enviar: "Enviar mensaje", nota: "Se abrirá tu correo con el mensaje listo.", gracias: "Gracias. Te responderemos lo antes posible." },
  en: { faltan: "Please enter your name and your message.", correoMal: "Please check your email address.", asunto: "Website contact", nombre: "First name*", apellido: "Last name", correo: "Email", telefono: "Phone", mensaje: "Message*", enviar: "Send message", nota: "Your email app will open with the message ready.", gracias: "Thank you. We will reply as soon as possible." },
};

/** Formulario de contacto: abre el correo del hotel con el mensaje (sin servidor propio por ahora) */
export function ContactForm() {
  const { lang } = useLang();
  const T = TXT[lang];
  const [f, setF] = useState({ nombre: "", apellido: "", email: "", telefono: "", mensaje: "" });
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setF((v) => ({ ...v, [k]: e.target.value }));

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!f.nombre.trim() || !f.mensaje.trim()) return setError(T.faltan);
    if (f.email && !/^\S+@\S+\.\S+$/.test(f.email)) return setError(T.correoMal);
    const body = `${f.mensaje}\n\n${f.nombre} ${f.apellido}\n${f.email}\n${f.telefono}`.trim();
    window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent(`${T.asunto} · ${f.nombre}`)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  const label = "text-[0.875rem] font-normal uppercase tracking-[0.18em] text-granate";
  const field =
    "mt-2 w-full rounded-none border-0 border-b border-granate/50 bg-transparent pb-2.5 pt-1 text-granate outline-none transition-colors focus:border-granate";

  return (
    <form onSubmit={submit} noValidate className="grid gap-x-8 gap-y-9 sm:grid-cols-2">
      <label className="block"><span className={label}>{T.nombre}</span><input value={f.nombre} onChange={set("nombre")} autoComplete="given-name" className={field} /></label>
      <label className="block"><span className={label}>{T.apellido}</span><input value={f.apellido} onChange={set("apellido")} autoComplete="family-name" className={field} /></label>
      <label className="block"><span className={label}>{T.correo}</span><input type="email" value={f.email} onChange={set("email")} autoComplete="email" className={field} /></label>
      <label className="block"><span className={label}>{T.telefono}</span><input type="tel" value={f.telefono} onChange={set("telefono")} autoComplete="tel" className={field} /></label>
      <label className="block sm:col-span-2"><span className={label}>{T.mensaje}</span><textarea rows={4} value={f.mensaje} onChange={set("mensaje")} className={`${field} resize-none`} /></label>
      <div className="flex flex-wrap items-center gap-6 sm:col-span-2">
        <button type="submit" className="group inline-flex items-center gap-5 rounded-full border border-granate bg-granate py-1.5 pl-6 pr-1.5 min-h-11 text-[0.875rem] font-normal uppercase tracking-[0.16em] text-crema transition-colors duration-500 hover:border-carmesi hover:bg-carmesi">
          {T.enviar}
          <span aria-hidden className="grid h-8 w-8 place-items-center rounded-full border border-current">
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.1"><path d="M2 8h11M9 4l4 4-4 4" /></svg>
          </span>
        </button>
        <p className="text-base text-granate">{T.nota}</p>
      </div>
      <div aria-live="polite" className="sm:col-span-2">
        {error && <p role="alert" className="text-carmesi">{error}</p>}
        {sent && !error && <p className="text-granate">{T.gracias}</p>}
      </div>
    </form>
  );
}
