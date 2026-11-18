/** Galería: fotogramas reales del video oficial. Añadir nuevas fotos aquí. */
export type Pieza = { id: string; src: string | null; alt: string };

export const galeria: Pieza[] = [
  { id: "g1", src: "/images/cabanas/cabanas-panoramica.jpg", alt: "Cabañas de Gardners Hills frente a la sierra" },
  { id: "g2", src: "/images/cabanas/cabana-fachada.jpg", alt: "Fachada en arco de una cabaña" },
  { id: "g3", src: "/images/cabanas/cabanas-jardin.jpg", alt: "Jardín y cabañas al amanecer" },
  { id: "g4", src: "/images/cabanas/cabana-terraza.jpg", alt: "Terrazas de las cabañas" },
  { id: "g5", src: "/images/cabanas/cabanas-sierra.jpg", alt: "La sierra detrás de las cabañas" },
  { id: "g6", src: "/images/cabanas/cabana-arco.jpg", alt: "Ventanal en arco y terraza" },
];
