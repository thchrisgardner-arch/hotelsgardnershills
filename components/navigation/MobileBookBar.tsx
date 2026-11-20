"use client";

import { usePathname } from "next/navigation";
import { L } from "@/components/ui/L";
import { useLang } from "@/lib/i18n";
import { canonica } from "@/lib/routes";

/**
 * Botón Reservar fijo abajo en móvil y tablet (< 1024 px). Lleva al mismo flujo que el resto del sitio
 * (/reservas). En la página de reserva no se muestra porque el buscador ya está ahí.
 */
export function MobileBookBar() {
  const pathname = usePathname();
  const { t } = useLang();
  if (canonica(pathname ?? "/").path.startsWith("/reservas")) return null;

  return (
    <div data-chrome className="fixed inset-x-0 bottom-0 z-30 border-t border-granate/15 bg-crema/95 p-3 backdrop-blur lg:hidden">
      <L href="/reservas" className="flex min-h-12 w-full items-center justify-between bg-granate px-5 text-[0.95rem] uppercase tracking-[0.16em] text-crema">
        <span>{t("reservarEstancia")}</span>
        <span aria-hidden>→</span>
      </L>
    </div>
  );
}
