"use client";

import { useState } from "react";
import { site } from "@/data/site";
import { ContactForm } from "./ContactForm";
import { Pill } from "@/components/ui/Pill";
import { useLang } from "@/lib/i18n";

const TXT = {
  es: { aria: "Canales de contacto", correo: "Correo", formulario: "Formulario", rapida: "La forma más rápida", rapidaP: "Escríbenos por WhatsApp para consultar disponibilidad, resolver dudas o preparar tu llegada. Te respondemos en el mismo chat.", numero: "Número", abrir: "Abrir WhatsApp", detalle: "Para solicitudes con más detalle", detalleP: "Celebraciones, estancias largas o grupos: cuéntanos por correo lo que necesitas y te respondemos lo antes posible.", dir: "Dirección de correo", escribir: "Escribir un correo" },
  en: { aria: "Contact channels", correo: "Email", formulario: "Form", rapida: "The fastest way", rapidaP: "Message us on WhatsApp to check availability, ask questions or prepare your arrival. We reply in the same chat.", numero: "Number", abrir: "Open WhatsApp", detalle: "For more detailed requests", detalleP: "Celebrations, long stays or groups: tell us by email what you need and we will reply as soon as possible.", dir: "Email address", escribir: "Write an email" },
};

type Tab = "whatsapp" | "correo" | "formulario";

/** Pestañas de canal de contacto (estructura de pestañas de la referencia, contenido propio) */
export function ContactTabs() {
  const { lang } = useLang();
  const T = TXT[lang];
  const [tab, setTab] = useState<Tab>("whatsapp");
  const { contact } = site;
  const tabs: { id: Tab; label: string }[] = [
    { id: "whatsapp", label: "WhatsApp" },
    { id: "correo", label: T.correo },
    { id: "formulario", label: T.formulario },
  ];

  return (
    <div>
      <div role="tablist" aria-label={T.aria} className="flex flex-wrap gap-x-9 gap-y-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            aria-controls={`panel-${t.id}`}
            onClick={() => setTab(t.id)}
            className={`relative min-h-11 pb-2 text-[0.92rem] font-normal uppercase tracking-[0.2em] transition-colors ${
              tab === t.id ? "text-carmesi" : "text-granate/70 hover:text-granate"
            }`}
          >
            {t.label}
            <span className={`absolute -bottom-px left-0 h-px w-full origin-left bg-carmesi transition-transform duration-500 ${tab === t.id ? "scale-x-100" : "scale-x-0"}`} />
          </button>
        ))}
      </div>

      <div key={tab} id={`panel-${tab}`} role="tabpanel" className="mt-8 max-w-xl animate-[fadeUp_0.7s_var(--ease-soft)_both]">
        {tab === "whatsapp" && (
          <div className="space-y-6">
            <div>
              <p className="text-carmesi">{T.rapida}</p>
              <p className="mt-2 text-granate">{T.rapidaP}</p>
            </div>
            <div>
              <p className="text-carmesi">{T.numero}</p>
              <p className="mt-2 text-granate">{contact.whatsappLabel}</p>
            </div>
            <Pill href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noreferrer">
              {T.abrir}
            </Pill>
          </div>
        )}
        {tab === "correo" && (
          <div className="space-y-6">
            <div>
              <p className="text-carmesi">{T.detalle}</p>
              <p className="mt-2 text-granate">{T.detalleP}</p>
            </div>
            <div>
              <p className="text-carmesi">{T.dir}</p>
              <p className="mt-2 break-all text-granate">{contact.email}</p>
            </div>
            <Pill href={`mailto:${contact.email}`}>{T.escribir}</Pill>
          </div>
        )}
        {tab === "formulario" && <ContactForm />}
      </div>
    </div>
  );
}
