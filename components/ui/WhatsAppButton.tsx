"use client";

import { site } from "@/data/site";
import { useLang } from "@/lib/i18n";

/** Botón flotante de WhatsApp (apoyo, no paso obligatorio de la reserva) */
export function WhatsAppButton() {
  const { t } = useLang();
  const msg = encodeURIComponent(t("whatsappMsg"));
  return (
    <a
      data-chrome
      href={`https://wa.me/${site.contact.whatsappFlotante}?text=${msg}`}
      target="_blank"
      rel="noreferrer"
      aria-label={t("whatsapp")}
      className="fixed bottom-4 right-4 z-40 grid h-[72px] w-[72px] place-items-center rounded-full bg-black text-white transition-transform duration-500 ease-[var(--ease-soft)] hover:scale-105 active:scale-95 max-lg:bottom-[88px] max-lg:h-14 max-lg:w-14"
    >
      <svg viewBox="0 0 32 32" className="h-9 w-9 max-lg:h-7 max-lg:w-7" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" aria-hidden>
        <path d="M16 3.5A12.5 12.5 0 0 0 5.2 22.3L3.6 28.4l6.3-1.6A12.5 12.5 0 1 0 16 3.5z" />
        <path d="M11.6 9.9c-.4 0-1 .1-1.4.7-.5.6-1.4 1.6-1.2 3.4.3 2 1.6 4 3.6 5.8 2.2 2 4.3 3 6.3 3.1 1.6.1 2.6-.7 3-1.3.3-.5.3-1.1.2-1.4-.1-.2-.4-.3-.8-.5l-2.6-1.2c-.4-.2-.7-.2-1 .2l-.9 1.1c-.2.3-.5.3-.8.2-1-.4-2-1-2.8-1.8-.8-.8-1.4-1.7-1.8-2.6-.1-.3 0-.6.2-.8l.8-.9c.3-.3.3-.6.2-1l-1.1-2.6c-.2-.5-.5-.6-.9-.6h-1z" fill="currentColor" stroke="none" />
      </svg>
    </a>
  );
}
