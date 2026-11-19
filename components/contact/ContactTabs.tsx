"use client";

import { useState } from "react";
import { site } from "@/data/site";
import { ContactForm } from "./ContactForm";
import { Pill } from "@/components/ui/Pill";

type Tab = "whatsapp" | "correo" | "formulario";

/** Pestañas de canal de contacto (estructura de pestañas de la referencia, contenido propio) */
export function ContactTabs() {
  const [tab, setTab] = useState<Tab>("whatsapp");
  const { contact } = site;
  const tabs: { id: Tab; label: string }[] = [
    { id: "whatsapp", label: "WhatsApp" },
    { id: "correo", label: "Correo" },
    { id: "formulario", label: "Formulario" },
  ];

  return (
    <div>
      <div role="tablist" aria-label="Canales de contacto" className="flex gap-9">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            aria-controls={`panel-${t.id}`}
            onClick={() => setTab(t.id)}
            className={`relative pb-2 text-[0.88rem] font-normal uppercase tracking-[0.2em] transition-colors ${
              tab === t.id ? "text-carmesi" : "text-granate/45 hover:text-granate/80"
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
              <p className="text-carmesi">La forma más rápida</p>
              <p className="mt-2 text-granate/85">
                Escríbenos por WhatsApp para consultar disponibilidad, resolver dudas o preparar tu llegada. Te
                respondemos en el mismo chat.
              </p>
            </div>
            <div>
              <p className="text-carmesi">Número</p>
              <p className="mt-2 text-granate/85">{contact.whatsappLabel}</p>
            </div>
            <Pill href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noreferrer">
              Abrir WhatsApp
            </Pill>
          </div>
        )}
        {tab === "correo" && (
          <div className="space-y-6">
            <div>
              <p className="text-carmesi">Para solicitudes con más detalle</p>
              <p className="mt-2 text-granate/85">
                Celebraciones, estancias largas o grupos: cuéntanos por correo lo que necesitas y te respondemos lo
                antes posible.
              </p>
            </div>
            <div>
              <p className="text-carmesi">Dirección de correo</p>
              <p className="mt-2 text-granate/85">{contact.email}</p>
            </div>
            <Pill href={`mailto:${contact.email}`}>Escribir un correo</Pill>
          </div>
        )}
        {tab === "formulario" && <ContactForm />}
      </div>
    </div>
  );
}
