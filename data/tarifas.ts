/**
 * Tarifas de Gardners Hills, tomadas del diseño enviado por el cliente (2026-11-20):
 * Tarifa Básica, Media y Premium. Valores por noche, en pesos colombianos (COP) e impuestos incluidos.
 *
 * Las tarjetas ya no muestran un «2 personas» fijo: la categoría y la capacidad salen de las cabañas
 * que tienen asignado cada nivel (campo `tarifa` en data/cabanas.ts).
 */
import { cabanasL, categoriasL, nombreCorto, type Cabana, type TarifaId } from "@/data/cabanas";
import type { Lang } from "@/lib/routes";

type Texto = { es: string; en: string };
export type Tarifa = {
  id: TarifaId;
  nombre: Texto;
  temporadas: { nombre: Texto; valor: number }[];
  incluye: Texto[];
};

const ENE_AGO = { es: "Enero – Agosto", en: "January – August" };
const SEP_DIC = { es: "Septiembre – Diciembre", en: "September – December" };
const X = (es: string, en: string): Texto => ({ es, en });

export const tarifasIntro: Texto = {
  es: "No podemos esperar para recibirte. Todos los precios se muestran por el valor total y en COP.",
  en: "We can't wait to welcome you. All prices are shown as the total amount in Colombian pesos (COP).",
};

export const tarifasNota: Texto = {
  es: "Las tarifas están en pesos colombianos e incluyen impuestos.",
  en: "Rates are in Colombian pesos and include taxes.",
};

export const tarifas: Tarifa[] = [
  {
    id: "basica",
    nombre: X("Tarifa Básica", "Basic Rate"),
    temporadas: [{ nombre: ENE_AGO, valor: 90000 }, { nombre: SEP_DIC, valor: 110000 }],
    incluye: [X("Baño privado", "Private bathroom"), X("Tocador", "Vanity"), X("Wi-Fi", "Wi-Fi"), X("Aire acondicionado", "Air conditioning"), X("Room service", "Room service"), X("Ventanas con excelente luz", "Windows with great light")],
  },
  {
    id: "media",
    nombre: X("Tarifa Media", "Standard Rate"),
    temporadas: [{ nombre: ENE_AGO, valor: 100000 }, { nombre: SEP_DIC, valor: 120000 }],
    incluye: [X("Baño privado", "Private bathroom"), X("Desayuno para dos", "Breakfast for two"), X("Bata de baño", "Bathrobe"), X("Tocador", "Vanity"), X("Wi-Fi", "Wi-Fi"), X("Aire acondicionado", "Air conditioning"), X("Room service", "Room service"), X("Ventanas con excelente luz", "Windows with great light")],
  },
  {
    id: "premium",
    nombre: X("Tarifa Premium", "Premium Rate"),
    temporadas: [{ nombre: ENE_AGO, valor: 130000 }, { nombre: SEP_DIC, valor: 150000 }],
    incluye: [X("Suite con baño privado", "Suite with private bathroom"), X("Brunch para dos", "Brunch for two"), X("Bata de baño", "Bathrobe"), X("Tocador", "Vanity"), X("Wi-Fi", "Wi-Fi"), X("Aire acondicionado", "Air conditioning"), X("Room service", "Room service"), X("Ventanas con excelente luz", "Windows with great light"), X("Piscina", "Pool")],
  },
];

/** Formato COP con punto de miles, igual en servidor y navegador */
export const cop = (v: number) => "$" + String(v).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

export const getTarifa = (id: TarifaId) => tarifas.find((t) => t.id === id)!;
export const desde = (id: TarifaId) => Math.min(...getTarifa(id).temporadas.map((t) => t.valor));

/** Tarifas con la categoría, la capacidad y las cabañas que las usan, leídas de los datos */
export function tarifasConCabanas(lang: Lang) {
  const lista = cabanasL(lang);
  const cats = categoriasL(lang);
  return tarifas.map((t) => {
    const suyas: Cabana[] = lista.filter((c) => c.tarifa === t.id);
    const min = Math.min(...suyas.map((c) => c.maxHuespedes));
    const max = Math.max(...suyas.map((c) => c.maxHuespedes));
    const personas = lang === "es" ? "personas" : "guests";
    return {
      ...t,
      cabanas: suyas,
      nombresCabanas: suyas.map(nombreCorto),
      categorias: [...new Set(suyas.map((c) => cats.find((k) => k.slug === c.categoria)!.nombre))],
      capacidad: min === max ? `${max} ${personas}` : `${min}–${max} ${personas}`,
    };
  });
}
