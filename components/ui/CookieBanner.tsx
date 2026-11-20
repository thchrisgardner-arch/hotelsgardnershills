"use client";

import { useEffect, useState } from "react";
import { L } from "@/components/ui/L";
import Script from "next/script";
import { useLang } from "@/lib/i18n";

/**
 * Aviso de cookies. «Solo necesarias» es la opción por defecto; la analítica (GA4) se carga
 * únicamente si el visitante acepta y existe NEXT_PUBLIC_GA_ID en las variables de entorno.
 */
const GA = process.env.NEXT_PUBLIC_GA_ID;

export function CookieBanner() {
  const { t } = useLang();
  const [estado, setEstado] = useState<"pendiente" | "aceptadas" | "necesarias" | null>(null);

  useEffect(() => {
    try {
      const v = localStorage.getItem("gh-cookies");
      setEstado(v === "aceptadas" || v === "necesarias" ? v : "pendiente");
    } catch {
      setEstado("pendiente");
    }
  }, []);

  const elegir = (v: "aceptadas" | "necesarias") => {
    setEstado(v);
    try {
      localStorage.setItem("gh-cookies", v);
    } catch {}
  };

  return (
    <>
      {estado === "aceptadas" && GA && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA}`} strategy="afterInteractive" />
          <Script id="ga" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA}',{anonymize_ip:true});`}
          </Script>
        </>
      )}
      {estado === "pendiente" && (
        <div
          data-chrome
          role="region"
          aria-label="Cookies"
          className="fixed bottom-[112px] left-4 max-lg:bottom-[92px] z-[45] w-[min(380px,calc(100vw-2rem))] border border-granate/15 bg-crema p-6 text-granate shadow-[0_18px_50px_-18px_rgba(16,15,14,0.35)]"
        >
          <p className="text-[1rem] leading-[1.45] text-granate/85">
            {t("cookiesTexto")}{" "}
            <L href="/cookies" className="underline underline-offset-4 hover:text-carmesi">{t("cookiesMas")}</L>
          </p>
          <div className="mt-5 flex gap-3">
            <button
              type="button"
              onClick={() => elegir("aceptadas")}
              className="flex-1 bg-granate min-h-11 py-2.5 text-[0.875rem] uppercase tracking-[0.16em] text-crema transition-colors hover:bg-carmesi"
            >
              {t("cookiesAceptar")}
            </button>
            <button
              type="button"
              onClick={() => elegir("necesarias")}
              className="flex-1 border border-granate/40 min-h-11 py-2.5 text-[0.875rem] uppercase tracking-[0.16em] transition-colors hover:bg-granate hover:text-crema"
            >
              {t("cookiesRechazar")}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
