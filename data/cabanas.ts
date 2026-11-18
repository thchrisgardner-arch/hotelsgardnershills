/**
 * Cabañas. Fotos: fotogramas del video oficial (public/video/hero-banner.mp4).
 * Nombres, capacidad, tamaño y características NO están confirmados → "Por confirmar".
 * Vista a la sierra: documentada en el manual de marca (p. 4).
 */
export type Cabana = {
  id: string;
  numero: string;
  nombre: string | null;
  descripcion: string;
  capacidad: string | null;
  tamano: string | null;
  vista: string;
  fotos: string[];
};

const F = (n: string) => `/images/cabanas/${n}.jpg`;

export const cabanas: Cabana[] = [
  {
    id: "cabana-01",
    numero: "01",
    nombre: null,
    descripcion: "Arquitectura blanca y madera frente a la sierra. Un refugio para detenerse, respirar y encontrar equilibrio.",
    capacidad: null,
    tamano: null,
    vista: "Vista a la sierra",
    fotos: [F("cabana-fachada"), F("cabanas-panoramica"), F("cabana-terraza")],
  },
  {
    id: "cabana-02",
    numero: "02",
    nombre: null,
    descripcion: "Un ventanal en arco que deja entrar la luz de la mañana y una terraza propia para ver caer la tarde.",
    capacidad: null,
    tamano: null,
    vista: "Vista a la sierra",
    fotos: [F("cabana-arco"), F("cabanas-jardin"), F("cabanas-fila")],
  },
  {
    id: "cabana-03",
    numero: "03",
    nombre: null,
    descripcion: "Diseño minimalista y funcional que no impone su presencia: dialoga con el jardín y con la montaña.",
    capacidad: null,
    tamano: null,
    vista: "Vista a la sierra",
    fotos: [F("cabana-terraza"), F("cabanas-sierra"), F("cabana-fachada")],
  },
  {
    id: "cabana-04",
    numero: "04",
    nombre: null,
    descripcion: "Aquí, el lujo es el tiempo, el espacio y el silencio. Cada amanecer es una nueva historia que contar.",
    capacidad: null,
    tamano: null,
    vista: "Vista a la sierra",
    fotos: [F("cabanas-fila"), F("cabana-arco"), F("cabanas-panoramica")],
  },
];
