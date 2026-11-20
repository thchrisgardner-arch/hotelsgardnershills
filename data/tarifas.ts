/**
 * Tarifas de Gardners Hills, tomadas del diseño enviado por el cliente (2026-11-20):
 * «Tarifas en Gardners Hills» con Tarifa Básica, Media y Premium.
 * Valores por noche, en pesos colombianos (COP) e impuestos incluidos.
 */
export type Tarifa = {
  id: string;
  nombre: string;
  capacidad: string;
  temporadas: { nombre: string; valor: number }[];
  incluye: string[];
};

export const tarifasIntro = "No podemos esperar para recibirte. Todos los precios se muestran por el valor total y en COP.";

export const tarifasNota =
  "Gardners Hills tiene capacidad para 16 huéspedes y cuenta con 8 cabañas. Las tarifas están en pesos colombianos e incluyen impuestos.";

export const tarifas: Tarifa[] = [
  {
    id: "basica",
    nombre: "Tarifa Básica",
    capacidad: "2 personas",
    temporadas: [
      { nombre: "Enero – Agosto", valor: 90000 },
      { nombre: "Septiembre – Diciembre", valor: 110000 },
    ],
    incluye: ["Baño privado", "Tocador", "Wi-Fi", "Aire acondicionado", "Room service", "Ventanas con excelente luz"],
  },
  {
    id: "media",
    nombre: "Tarifa Media",
    capacidad: "2 personas",
    temporadas: [
      { nombre: "Enero – Agosto", valor: 100000 },
      { nombre: "Septiembre – Diciembre", valor: 120000 },
    ],
    incluye: ["Baño privado", "Desayuno para dos", "Bata de baño", "Tocador", "Wi-Fi", "Aire acondicionado", "Room service", "Ventanas con excelente luz"],
  },
  {
    id: "premium",
    nombre: "Tarifa Premium",
    capacidad: "2 personas",
    temporadas: [
      { nombre: "Enero – Agosto", valor: 130000 },
      { nombre: "Septiembre – Diciembre", valor: 150000 },
    ],
    incluye: ["Suite con baño privado", "Brunch para dos", "Bata de baño", "Tocador", "Wi-Fi", "Aire acondicionado", "Room service", "Ventanas con excelente luz", "Piscina"],
  },
];

/** Formato COP con punto de miles, igual en servidor y navegador */
export const cop = (v: number) => "$" + String(v).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
