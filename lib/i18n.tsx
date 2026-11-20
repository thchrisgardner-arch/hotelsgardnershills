"use client";

import { createContext, useContext, useEffect, useState } from "react";

/**
 * Idioma del sitio (ES / EN). Se guarda en localStorage y actualiza <html lang>.
 * Por ahora se traducen las piezas comunes (cabecera, menú, footer, aviso de cookies).
 * El contenido de cada página sigue en español: traducirlo es la siguiente fase.
 */
export type Lang = "es" | "en";

const dict = {
  reservar: { es: "Reservar", en: "Book" },
  abrirMenu: { es: "Abrir menú", en: "Open menu" },
  cerrarMenu: { es: "Cerrar menú", en: "Close menu" },
  idioma: { es: "Cambiar idioma", en: "Change language" },
  frase1: { es: "Un refugio donde", en: "A refuge where" },
  frase2: { es: "el tiempo se detiene.", en: "time stands still." },
  reservarEstancia: { es: "Reservar tu estancia", en: "Book your stay" },
  reservarAhora: { es: "Reservar ahora", en: "Book now" },
  villanueva1: { es: "Villanueva", en: "Villanueva" },
  villanueva2: { es: "El corazón", en: "The beating" },
  villanueva3: { es: "palpitante del", en: "heart of the" },
  villanueva4: { es: "hotel", en: "hotel" },
  hotel: { es: "Hotel", en: "Hotel" },
  explorar: { es: "Explorar", en: "Explore" },
  contacto: { es: "Contacto", en: "Contact" },
  ubicacion: { es: "Villanueva, La Guajira · Colombia", en: "Villanueva, La Guajira · Colombia" },
  terminos: { es: "Términos y condiciones", en: "Terms and conditions" },
  privacidad: { es: "Política de privacidad", en: "Privacy policy" },
  cookies: { es: "Política de cookies", en: "Cookie policy" },
  cookiesTexto: {
    es: "Usamos cookies propias para que el sitio funcione y, si lo aceptas, cookies de analítica para entender cómo lo usas.",
    en: "We use our own cookies to make the site work and, if you accept, analytics cookies to understand how you use it.",
  },
  cookiesAceptar: { es: "Aceptar", en: "Accept" },
  cookiesRechazar: { es: "Solo necesarias", en: "Necessary only" },
  cookiesMas: { es: "Más información", en: "Learn more" },
} as const;

export type Clave = keyof typeof dict;

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({ lang: "es", setLang: () => {} });

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");

  useEffect(() => {
    try {
      const guardado = localStorage.getItem("gh-lang");
      if (guardado === "en" || guardado === "es") setLangState(guardado);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("gh-lang", l);
    } catch {}
  };

  return <Ctx.Provider value={{ lang, setLang }}>{children}</Ctx.Provider>;
}

export function useLang() {
  const { lang, setLang } = useContext(Ctx);
  const t = (k: Clave) => dict[k][lang];
  return { lang, setLang, t };
}
