"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n";

/**
 * Mapa embebido dentro del marco en píldora + pestañas de rutas (carro, avión, bus).
 * ⚠ Rutas, tiempos y aeropuertos: TEXTO DE EJEMPLO, verificar con el hotel antes de publicar.
 * El mapa apunta a Villanueva, La Guajira hasta tener la dirección exacta (data/site.ts → location).
 */
type Modo = "carro" | "avion" | "bus";

const RUTAS: Record<Modo, { es: { titulo: string; pasos: string[] }; en: { titulo: string; pasos: string[] } }> = {
  carro: {
    es: {
      titulo: "En carro",
      pasos: [
        "Desde Valledupar: unos 70 km por la vía Valledupar – San Juan del Cesar, alrededor de 1 h 15 min.",
        "Desde Riohacha: unos 200 km por la Troncal del Caribe y la vía a San Juan del Cesar, alrededor de 3 h 30 min.",
        "Al llegar a Villanueva te compartimos por WhatsApp la ubicación exacta y las indicaciones finales.",
      ],
    },
    en: {
      titulo: "By car",
      pasos: [
        "From Valledupar: about 70 km along the Valledupar – San Juan del Cesar road, around 1 h 15 min.",
        "From Riohacha: about 200 km via the Troncal del Caribe and the road to San Juan del Cesar, around 3 h 30 min.",
        "When you reach Villanueva we will share the exact location and final directions on WhatsApp.",
      ],
    },
  },
  avion: {
    es: {
      titulo: "En avión",
      pasos: [
        "Aeropuerto más cercano: Alfonso López Pumarejo, en Valledupar (VUP), con vuelos desde Bogotá.",
        "Alternativa: aeropuerto Almirante Padilla de Riohacha (RCH).",
        "Desde el aeropuerto puedes seguir en carro o taxi; podemos ayudarte a coordinar el traslado.",
      ],
    },
    en: {
      titulo: "By plane",
      pasos: [
        "Nearest airport: Alfonso López Pumarejo in Valledupar (VUP), with flights from Bogotá.",
        "Alternative: Almirante Padilla airport in Riohacha (RCH).",
        "From the airport you can continue by car or taxi; we can help you arrange a transfer.",
      ],
    },
  },
  bus: {
    es: {
      titulo: "En bus",
      pasos: [
        "Desde la terminal de transportes de Valledupar salen buses y busetas hacia Villanueva y San Juan del Cesar.",
        "El trayecto toma alrededor de 1 h 30 min.",
        "Avísanos tu hora de llegada y te indicamos cómo llegar desde el pueblo hasta las cabañas.",
      ],
    },
    en: {
      titulo: "By bus",
      pasos: [
        "Buses and minibuses leave Valledupar’s bus terminal for Villanueva and San Juan del Cesar.",
        "The journey takes around 1 h 30 min.",
        "Let us know your arrival time and we will tell you how to get from the town to the cabins.",
      ],
    },
  },
};

export function RutasMapa({ mapsUrl }: { mapsUrl?: string | null }) {
  const { lang } = useLang();
  const [modo, setModo] = useState<Modo>("carro");
  const t = {
    es: { tabs: "Cómo llegar", mapa: "Mapa de Villanueva, La Guajira", abrir: "Abrir en Google Maps", ejemplo: "Rutas de ejemplo · verificar con el hotel" },
    en: { tabs: "How to get here", mapa: "Map of Villanueva, La Guajira", abrir: "Open in Google Maps", ejemplo: "Sample routes · to be confirmed by the hotel" },
  }[lang];
  const q = encodeURIComponent("Villanueva, La Guajira, Colombia");
  const embed = `https://maps.google.com/maps?q=${q}&z=13&hl=${lang}&output=embed`;
  const abrir = mapsUrl ?? `https://www.google.com/maps/search/?api=1&query=${q}`;
  const ruta = RUTAS[modo][lang];

  return (
    <div className="space-y-8">
      {/* Mapa embebido dentro del marco en píldora */}
      <div className="relative h-[320px] overflow-hidden rounded-[999px] border border-granate/30 bg-marfil/40 sm:h-[360px]">
        <iframe
          title={t.mapa}
          src={embed}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 h-full w-full grayscale"
        />
      </div>
      <a href={abrir} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center text-[0.92rem] uppercase tracking-[0.2em] text-granate underline-offset-4 hover:underline">
        {t.abrir} →
      </a>

      {/* Pestañas de rutas */}
      <div>
        <div role="tablist" aria-label={t.tabs} className="flex flex-wrap gap-x-8 gap-y-2">
          {(Object.keys(RUTAS) as Modo[]).map((m) => (
            <button
              key={m}
              id={`tab-ruta-${m}`}
              role="tab"
              type="button"
              aria-selected={modo === m}
              aria-controls="panel-ruta"
              onClick={() => setModo(m)}
              className={`relative min-h-11 text-[0.92rem] uppercase tracking-[0.2em] transition-colors ${modo === m ? "text-carmesi" : "text-granate/70 hover:text-granate"}`}
            >
              {RUTAS[m][lang].titulo}
              <span className={`absolute -bottom-px left-0 h-px w-full origin-left bg-carmesi transition-transform duration-500 ${modo === m ? "scale-x-100" : "scale-x-0"}`} />
            </button>
          ))}
        </div>
        <div id="panel-ruta" role="tabpanel" aria-labelledby={`tab-ruta-${modo}`} className="mt-6">
          <ol className="space-y-3 text-granate">
            {ruta.pasos.map((p, i) => (
              <li key={p} className="flex gap-4">
                <span aria-hidden className="font-[family-name:var(--font-display)] text-[1.4rem] leading-none text-carmesi">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {p}
              </li>
            ))}
          </ol>
          <p className="mt-6 inline-block border border-granate px-3 py-1 text-[0.875rem] uppercase tracking-[0.16em] text-granate">{t.ejemplo}</p>
        </div>
      </div>
    </div>
  );
}
