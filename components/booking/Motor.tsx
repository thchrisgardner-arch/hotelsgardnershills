"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { RangeCalendar } from "./RangeCalendar";
import { Arch } from "@/components/ui/Arch";
import { L } from "@/components/ui/L";
import { FiltroCategorias } from "@/components/rooms/FiltroCategorias";
import { cabanasL, getCabana, getCategoria, nombreCorto, type Cabana, type CategoriaSlug } from "@/data/cabanas";
import { cop, desde, getTarifa, tarifasConCabanas, tarifasIntro, tarifasNota } from "@/data/tarifas";
import { site } from "@/data/site";
import { useLang } from "@/lib/i18n";

/**
 * Página de reserva (estructura del motor D-Edge de Grand Hotel Miramare + listado de Casa Momo +
 * tarifas de Hillbrook). Un solo camino de reserva para todo el sitio:
 *   Tu estancia → Tus datos → Solicitud enviada.
 * No hay motor con disponibilidad en tiempo real: es una SOLICITUD de reserva y el hotel responde en
 * menos de 24 horas. Se envía con /api/reserva (correo al hotel); WhatsApp queda como apoyo opcional.
 */
type Paso = 1 | 2 | 3;
type Panel = "fechas" | "huespedes" | null;
type Envio = "idle" | "enviando" | "ok" | "manual";

const MESES = {
  es: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
};

const TXT = {
  es: {
    pasos: ["Tu estancia", "Tus datos", "Solicitud enviada"],
    pasosAria: "Pasos de la reserva",
    kicker: "Reservas",
    titulo: ["Tu próxima escapada", "la encuentras en", "Gardners Hills"],
    aviso: "Solicitud de reserva: te confirmamos disponibilidad y tarifa en menos de 24 horas. No se hace ningún cobro en línea.",
    entrada: "Entrada", salida: "Salida", huespedes: "Huéspedes", elige: "Elige fecha",
    abrirFechas: "Elegir fechas de entrada y salida", abrirHuespedes: "Elegir número de huéspedes",
    adultos: "Adultos", ninos: "Niños", adulto: "adulto", adultosPl: "adultos", nino: "niño", ninosPl: "niños",
    listo: "Listo", buscar: "Buscar", codigo: "Código promocional", aplicarCodigo: "Aplicar un código promocional",
    errorFechas: "Elige tus fechas de entrada y salida.",
    garantias: ["Reserva directa con el hotel", "Respuesta en menos de 24 horas", "Sin cobros en línea"],
    nuestras: "Nuestras cabañas", sinFechas: "Elige tus fechas para ver el precio de tu estancia.",
    noche: "noche", noches: "noches", huesped: "huésped", huespedesPl: "huéspedes",
    desde: "Desde", porNoche: "por noche", total: "Total estimado", para: "para",
    eligeFechasVer: "Elige tus fechas para continuar", capacidadMax: "Capacidad máxima",
    elegirFechas: "Elegir fechas", seleccionar: "Seleccionar", elegida: "Cabaña elegida", cambiar: "Ver otras",
    continuarCon: "Continuar con",
    tarifasTitulo: ["Tarifas en", "Gardners Hills"], capacidad: "Capacidad", cabanas: "Cabañas", reservar: "Reservar",
    datos: "Tus datos", volver: "← Cambiar cabaña o fechas", datosNota: "Los usamos solo para gestionar tu solicitud, según nuestra política de privacidad.",
    campos: { nombre: "Nombre y apellido", correo: "Correo electrónico", telefono: "Teléfono", pais: "País", notas: "Solicitudes especiales (opcional)" },
    acepto: ["Acepto los", "términos y condiciones", "y la", "política de privacidad"],
    enviar: "Enviar solicitud", enviando: "Enviando…",
    errores: { nombre: "Escribe tu nombre.", correo: "Escribe un correo válido.", telefono: "Escribe un teléfono de contacto.", acepto: "Debes aceptar los términos para continuar." },
    tuReserva: "Tu solicitud", llegada: "Entrada", salidaR: "Salida", nochesR: "Noches", huespedesR: "Huéspedes", codigoR: "Código",
    resumenNota: "Precio estimado según la temporada. El hotel confirma disponibilidad y tarifa final en menos de 24 horas.",
    okKicker: "Solicitud enviada", okTitulo: "Gracias,", okTexto: "Recibimos tu solicitud de reserva. Te responderemos a tu correo en menos de 24 horas con la disponibilidad y la tarifa final.",
    manualKicker: "Último paso", manualTitulo: "Envía tu solicitud,", manualTexto: "No pudimos enviarla automáticamente. Envíala por correo con un clic; el hotel te responde en menos de 24 horas.",
    porCorreo: "Enviar por correo", apoyoWa: "¿Prefieres WhatsApp? También puedes escribirnos", nuevo: "Hacer otra solicitud",
    pais: "Colombia", mensajeHola: "Hola, Gardners Hills. Quiero solicitar una reserva:", estado: "Solicitud",
  },
  en: {
    pasos: ["Your stay", "Your details", "Request sent"],
    pasosAria: "Booking steps",
    kicker: "Book",
    titulo: ["Your next getaway", "is waiting at", "Gardners Hills"],
    aviso: "Booking request: we confirm availability and rate within 24 hours. No payment is taken online.",
    entrada: "Check-in", salida: "Check-out", huespedes: "Guests", elige: "Choose date",
    abrirFechas: "Choose check-in and check-out dates", abrirHuespedes: "Choose number of guests",
    adultos: "Adults", ninos: "Children", adulto: "adult", adultosPl: "adults", nino: "child", ninosPl: "children",
    listo: "Done", buscar: "Search", codigo: "Promo code", aplicarCodigo: "Apply a promo code",
    errorFechas: "Choose your check-in and check-out dates.",
    garantias: ["Book directly with the hotel", "Reply within 24 hours", "No online payment"],
    nuestras: "Our cabins", sinFechas: "Choose your dates to see the price of your stay.",
    noche: "night", noches: "nights", huesped: "guest", huespedesPl: "guests",
    desde: "From", porNoche: "per night", total: "Estimated total", para: "for",
    eligeFechasVer: "Choose your dates to continue", capacidadMax: "Maximum capacity",
    elegirFechas: "Choose dates", seleccionar: "Select", elegida: "Selected cabin", cambiar: "See others",
    continuarCon: "Continue with",
    tarifasTitulo: ["Rates at", "Gardners Hills"], capacidad: "Capacity", cabanas: "Cabins", reservar: "Book",
    datos: "Your details", volver: "← Change cabin or dates", datosNota: "We only use them to handle your request, as set out in our privacy policy.",
    campos: { nombre: "Full name", correo: "Email", telefono: "Phone", pais: "Country", notas: "Special requests (optional)" },
    acepto: ["I accept the", "terms and conditions", "and the", "privacy policy"],
    enviar: "Send request", enviando: "Sending…",
    errores: { nombre: "Please enter your name.", correo: "Please enter a valid email.", telefono: "Please enter a contact phone.", acepto: "You must accept the terms to continue." },
    tuReserva: "Your request", llegada: "Check-in", salidaR: "Check-out", nochesR: "Nights", huespedesR: "Guests", codigoR: "Code",
    resumenNota: "Estimated price by season. The hotel confirms availability and final rate within 24 hours.",
    okKicker: "Request sent", okTitulo: "Thank you,", okTexto: "We have received your booking request. We will reply to your email within 24 hours with availability and the final rate.",
    manualKicker: "Last step", manualTitulo: "Send your request,", manualTexto: "We couldn’t send it automatically. Send it by email in one click; the hotel replies within 24 hours.",
    porCorreo: "Send by email", apoyoWa: "Prefer WhatsApp? You can also message us", nuevo: "Make another request",
    pais: "", mensajeHola: "Hello, Gardners Hills. I would like to request a booking:", estado: "Request",
  },
};

/** Precio estimado de la estancia: cada noche según su temporada (ene–ago / sep–dic) */
function totalEstancia(c: Cabana, llegada: string, salida: string) {
  const t = getTarifa(c.tarifa);
  let total = 0;
  const d = new Date(llegada + "T12:00:00");
  const fin = new Date(salida + "T12:00:00");
  while (d < fin) {
    total += d.getMonth() <= 7 ? t.temporadas[0].valor : t.temporadas[1].valor;
    d.setDate(d.getDate() + 1);
  }
  return total;
}

export function Motor() {
  const { lang } = useLang();
  const T = TXT[lang];
  const params = useSearchParams();
  const [paso, setPaso] = useState<Paso>(1);
  const [llegada, setLlegada] = useState(params.get("llegada") ?? "");
  const [salida, setSalida] = useState(params.get("salida") ?? "");
  const [adultos, setAdultos] = useState(Number(params.get("adultos") ?? 2) || 2);
  const [ninos, setNinos] = useState(Number(params.get("ninos") ?? 0) || 0);
  const [codigo, setCodigo] = useState(params.get("codigo") ?? "");
  const [verCodigo, setVerCodigo] = useState(Boolean(params.get("codigo")));
  const [panel, setPanel] = useState<Panel>(null);
  const [buscado, setBuscado] = useState(Boolean(params.get("llegada") && params.get("salida")));
  const [filtro, setFiltro] = useState<CategoriaSlug | "todas">("todas");
  const [slugElegida, setSlugElegida] = useState<string | null>(params.get("cabana"));
  const [error, setError] = useState<string | null>(null);
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [envio, setEnvio] = useState<Envio>("idle");
  const [datos, setDatos] = useState({ nombre: "", correo: "", telefono: "", pais: TXT[lang].pais, notas: "", acepto: false });
  const card = useRef<HTMLDivElement>(null);
  const resultados = useRef<HTMLDivElement>(null);
  const titulo = useRef<HTMLHeadingElement>(null);

  const elegida = slugElegida ? getCabana(slugElegida, lang) ?? null : null;

  useEffect(() => {
    const onDown = (e: MouseEvent) => card.current && !card.current.contains(e.target as Node) && setPanel(null);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setPanel(null);
    document.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  // Al cambiar de paso, el foco va al título del paso (lectores de pantalla)
  useEffect(() => {
    if (paso > 1) titulo.current?.focus();
  }, [paso]);

  const noches = llegada && salida ? Math.round((+new Date(salida) - +new Date(llegada)) / 86400000) : 0;
  const huespedes = adultos + ninos;
  const listo = buscado && noches > 0;
  const lista = useMemo(() => cabanasL(lang).filter((c) => filtro === "todas" || c.categoria === filtro), [filtro, lang]);
  const plural = (n: number, a: string, b: string) => `${n} ${n === 1 ? a : b}`;
  const fecha = (d: string) => {
    const x = new Date(d + "T12:00:00");
    return { mes: MESES[lang][x.getMonth()], dia: x.getDate(), anio: x.getFullYear() };
  };
  const largo = (d: string) =>
    new Date(d + "T12:00:00").toLocaleDateString(lang === "es" ? "es-CO" : "en-US", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const huespedesTexto = `${plural(adultos, T.adulto, T.adultosPl)}${ninos ? `, ${plural(ninos, T.nino, T.ninosPl)}` : ""}`;

  function abrirFechas() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => setPanel("fechas"), 450);
  }

  function buscar() {
    if (!llegada || !salida) {
      setPanel("fechas");
      return setError(T.errorFechas);
    }
    setError(null);
    setPanel(null);
    setBuscado(true);
    setTimeout(() => resultados.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  }

  function elegir(c: Cabana) {
    setSlugElegida(c.slug);
    setPaso(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const resumenTexto = () =>
    [
      T.mensajeHola,
      elegida ? `• ${elegida.nombre} (${getCategoria(elegida.categoria, lang).nombre})` : "",
      `• ${T.llegada}: ${largo(llegada)}`,
      `• ${T.salidaR}: ${largo(salida)} (${plural(noches, T.noche, T.noches)})`,
      `• ${T.huespedesR}: ${huespedesTexto}`,
      elegida && noches ? `• ${T.total}: ${cop(totalEstancia(elegida, llegada, salida))} COP` : "",
      codigo ? `• ${T.codigoR}: ${codigo}` : "",
      `• ${T.campos.nombre}: ${datos.nombre}`,
      `• ${T.campos.correo}: ${datos.correo}`,
      `• ${T.campos.telefono}: ${datos.telefono}`,
      datos.pais ? `• ${T.campos.pais}: ${datos.pais}` : "",
      datos.notas ? `• ${T.campos.notas}: ${datos.notas}` : "",
    ]
      .filter(Boolean)
      .join("\n");

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    const err: Record<string, string> = {};
    if (!datos.nombre.trim()) err.nombre = T.errores.nombre;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.correo)) err.correo = T.errores.correo;
    if (!datos.telefono.trim()) err.telefono = T.errores.telefono;
    if (!datos.acepto) err.acepto = T.errores.acepto;
    setErrores(err);
    if (Object.keys(err).length) {
      document.getElementById(`campo-${Object.keys(err)[0]}`)?.focus();
      return;
    }
    setEnvio("enviando");
    try {
      const r = await fetch("/api/reserva", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...datos, cabana: elegida?.nombre, llegada, salida, adultos, ninos, codigo, idioma: lang, resumen: resumenTexto() }),
      });
      setEnvio(r.ok ? "ok" : "manual");
    } catch {
      setEnvio("manual");
    }
    setPaso(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const campo = "text-[0.875rem] uppercase tracking-[0.18em] text-granate";
  const contador =
    "grid h-11 w-11 place-items-center border border-granate/50 text-granate transition-colors hover:bg-granate hover:text-crema disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-granate";
  const input =
    "mt-2 w-full border-0 border-b border-granate/50 bg-transparent pb-2.5 pt-1 text-[1.1rem] text-granate outline-none transition-colors placeholder:text-granate/50 focus:border-granate";
  const boton = "inline-flex min-h-11 items-center gap-4 bg-granate px-8 py-4 text-[0.875rem] uppercase tracking-[0.18em] text-crema transition-colors hover:bg-carmesi disabled:cursor-not-allowed disabled:bg-granate/30";
  const botonLinea = "inline-flex min-h-11 items-center gap-4 border border-granate/60 px-8 py-4 text-[0.875rem] uppercase tracking-[0.18em] text-granate transition-colors hover:bg-granate hover:text-crema";

  const Fecha = ({ d }: { d: string }) =>
    d ? (
      <span className="mt-1 flex items-baseline gap-2 text-granate">
        <span className="text-[1.1rem] capitalize">{fecha(d).mes}</span>
        <span className="font-[family-name:var(--font-display)] text-[2.4rem] leading-none">{fecha(d).dia}</span>
        <span className="text-[1.1rem]">{fecha(d).anio}</span>
      </span>
    ) : (
      <span className="mt-1 block font-[family-name:var(--font-display)] text-[1.9rem] leading-[1.3] text-granate">{T.elige}</span>
    );

  const Resumen = () => (
    <aside className="border border-granate/20 bg-marfil/60 p-6 sm:p-8 lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
      <p className={campo}>{T.tuReserva}</p>
      {elegida && (
        <>
          <Arch src={elegida.fotos[0]} alt={elegida.nombre} className="mt-5 aspect-[16/10] w-full" sizes="(min-width: 1024px) 30vw, 100vw" reveal={false} />
          <p className="mt-5 text-[0.875rem] uppercase tracking-[0.18em] text-granate">{getCategoria(elegida.categoria, lang).nombre}</p>
          <p className="mt-1 font-[family-name:var(--font-display)] text-[2rem] leading-none text-granate">{nombreCorto(elegida)}</p>
        </>
      )}
      <dl className="mt-6 divide-y divide-granate/10 border-y border-granate/10 text-[1rem]">
        {[
          [T.llegada, llegada ? largo(llegada) : "—"],
          [T.salidaR, salida ? largo(salida) : "—"],
          [T.nochesR, noches ? String(noches) : "—"],
          [T.huespedesR, huespedesTexto],
          ...(codigo ? [[T.codigoR, codigo]] : []),
          ...(elegida && noches ? [[T.total, `${cop(totalEstancia(elegida, llegada, salida))} COP`]] : []),
        ].map(([k, v]) => (
          <div key={k} className="flex justify-between gap-4 py-3">
            <dt className="text-granate">{k}</dt>
            <dd className="text-right text-granate">{v}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-6 text-[0.95rem] leading-[1.45] text-granate">{T.resumenNota}</p>
    </aside>
  );

  const waHref = `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(resumenTexto())}`;

  return (
    <div className="pt-[var(--header-h)]">
      {/* Pasos */}
      <nav aria-label={T.pasosAria} className="border-b border-granate/15 px-[var(--gutter)]">
        <ol className="flex items-center justify-center gap-2 py-4 text-[0.875rem] uppercase tracking-[0.1em] sm:gap-5 sm:tracking-[0.16em]">
          {T.pasos.map((p, i) => (
            <li key={p} className="flex min-w-0 items-center gap-2 sm:gap-5">
              {i > 0 && <span aria-hidden className="h-px w-4 shrink-0 bg-granate/40 sm:w-16" />}
              <span className={`flex items-center gap-2 ${paso === i + 1 ? "text-granate" : "text-granate/60"}`} aria-current={paso === i + 1 ? "step" : undefined}>
                <span aria-hidden className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border text-[0.875rem] ${paso === i + 1 ? "border-granate bg-granate text-crema" : "border-granate/50"}`}>
                  {i + 1}
                </span>
                <span className={paso === i + 1 ? "" : "max-sm:sr-only"}>{p}</span>
              </span>
            </li>
          ))}
        </ol>
      </nav>

      {paso === 1 && (
        <>
          {/* Portada con el buscador en tarjeta */}
          <section className="relative bg-granate px-[var(--gutter)] pb-44 pt-16 text-center text-marfil sm:pb-48 sm:pt-20">
            <p className="text-[0.92rem] uppercase tracking-[0.3em] text-marfil">{T.kicker}</p>
            <h1 className="t-hero t-italic mt-10 text-[clamp(2.6rem,6.4vw,6.8rem)] leading-[0.95]">
              {T.titulo[0]}
              <br />
              {T.titulo[1]}
              <br />
              {T.titulo[2]}
            </h1>
          </section>

          <div className="relative z-10 -mt-28 px-[var(--gutter)] sm:-mt-24">
            <div ref={card} className="relative mx-auto max-w-6xl bg-crema shadow-[0_24px_60px_-24px_rgba(16,15,14,0.35)]">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_0.8fr_auto]">
                <button
                  type="button"
                  onClick={() => setPanel(panel === "fechas" ? null : "fechas")}
                  aria-expanded={panel === "fechas"}
                  aria-haspopup="dialog"
                  aria-label={`${T.abrirFechas}. ${T.entrada}: ${llegada ? largo(llegada) : T.elige}`}
                  className="border-b border-granate/10 px-6 py-5 text-left transition-colors hover:bg-granate/[0.03] sm:border-r sm:px-8 sm:py-7 lg:border-b-0"
                >
                  <span className={`${campo} block`}>{T.entrada}</span>
                  <Fecha d={llegada} />
                </button>
                <button
                  type="button"
                  onClick={() => setPanel(panel === "fechas" ? null : "fechas")}
                  aria-expanded={panel === "fechas"}
                  aria-haspopup="dialog"
                  aria-label={`${T.abrirFechas}. ${T.salida}: ${salida ? largo(salida) : T.elige}`}
                  className="border-b border-granate/10 px-6 py-5 text-left transition-colors hover:bg-granate/[0.03] sm:px-8 sm:py-7 lg:border-b-0 lg:border-r"
                >
                  <span className={`${campo} block`}>{T.salida}</span>
                  <Fecha d={salida} />
                </button>
                <button
                  type="button"
                  onClick={() => setPanel(panel === "huespedes" ? null : "huespedes")}
                  aria-expanded={panel === "huespedes"}
                  aria-haspopup="dialog"
                  aria-label={`${T.abrirHuespedes}. ${huespedesTexto}`}
                  className="border-b border-granate/10 px-6 py-5 text-left transition-colors hover:bg-granate/[0.03] sm:border-r sm:px-8 sm:py-7 lg:border-b-0 lg:border-r-0"
                >
                  <span className={`${campo} block`}>{T.huespedes}</span>
                  <span className="mt-1 flex items-baseline gap-2 text-granate">
                    <span className="font-[family-name:var(--font-display)] text-[2.4rem] leading-none">{huespedes}</span>
                    <span className="text-[1.05rem]">{ninos ? `${adultos} ${T.adultosPl} · ${ninos} ${T.ninosPl}` : T.adultosPl}</span>
                  </span>
                </button>
                <div className="flex items-center p-5 sm:px-6">
                  <button type="button" onClick={buscar} className={`${boton} w-full justify-center lg:w-auto`}>
                    {T.buscar} <span aria-hidden>→</span>
                  </button>
                </div>
              </div>

              <div className="border-t border-granate/10 px-6 py-3 text-center sm:px-8">
                {verCodigo ? (
                  <label className="inline-flex flex-wrap items-center justify-center gap-4 text-granate">
                    <span className={campo}>{T.codigo}</span>
                    <input value={codigo} onChange={(e) => setCodigo(e.target.value.toUpperCase())} className="min-h-11 w-48 border-b border-granate/50 bg-transparent text-center uppercase tracking-[0.12em] outline-none focus:border-granate" />
                  </label>
                ) : (
                  <button type="button" onClick={() => setVerCodigo(true)} className="inline-flex min-h-11 items-center text-[0.95rem] text-granate underline-offset-4 hover:underline">
                    {T.aplicarCodigo} ↓
                  </button>
                )}
              </div>
              {error && (
                <p role="alert" className="border-t border-granate/10 px-8 py-3 text-center text-granate">
                  {error}
                </p>
              )}

              {panel === "fechas" && (
                <div role="dialog" aria-label={T.abrirFechas} className="absolute left-0 right-0 top-full z-20 mt-2 max-h-[80vh] overflow-y-auto border border-granate/10 bg-crema px-4 pb-6 pt-7 shadow-[0_24px_60px_-24px_rgba(16,15,14,0.35)] sm:px-8">
                  <RangeCalendar
                    llegada={llegada}
                    salida={salida}
                    onChange={(a, b) => {
                      setLlegada(a);
                      setSalida(b);
                      setError(null);
                    }}
                    onComplete={() => setTimeout(() => setPanel("huespedes"), 250)}
                  />
                </div>
              )}
              {panel === "huespedes" && (
                <div role="dialog" aria-label={T.abrirHuespedes} className="absolute right-0 top-full z-20 mt-2 w-full border border-granate/10 bg-crema p-6 shadow-[0_24px_60px_-24px_rgba(16,15,14,0.35)] sm:w-[380px] sm:p-7">
                  {[
                    { k: T.adultos, v: adultos, set: setAdultos, min: 1 },
                    { k: T.ninos, v: ninos, set: setNinos, min: 0 },
                  ].map((r) => (
                    <div key={r.k} className="flex items-center justify-between border-b border-granate/10 py-4">
                      <span className="text-[1.1rem] text-granate">{r.k}</span>
                      <span className="flex items-center gap-4">
                        <button type="button" className={contador} disabled={r.v <= r.min} onClick={() => r.set(r.v - 1)} aria-label={`− ${r.k}`}>−</button>
                        <span className="w-6 text-center text-[1.1rem] text-granate" aria-live="polite">{r.v}</span>
                        <button type="button" className={contador} disabled={adultos + ninos >= 8} onClick={() => r.set(r.v + 1)} aria-label={`+ ${r.k}`}>+</button>
                      </span>
                    </div>
                  ))}
                  <button type="button" onClick={() => setPanel(null)} className={`${botonLinea} mt-5 w-full justify-center`}>
                    {T.listo}
                  </button>
                </div>
              )}
            </div>

            <p className="mx-auto mt-6 max-w-3xl text-center text-granate">{T.aviso}</p>
            <ul className="mx-auto mt-4 flex max-w-6xl flex-wrap justify-center gap-x-12 gap-y-2 text-[1rem] text-granate">
              {T.garantias.map((g) => (
                <li key={g} className="flex items-center gap-3">
                  <span aria-hidden className="h-1.5 w-1.5 bg-granate" />
                  {g}
                </li>
              ))}
            </ul>
          </div>

          {/* Cabaña elegida desde la ficha (?cabana=) */}
          {elegida && (
            <div className="mx-auto mt-12 max-w-6xl px-[var(--gutter)]">
              <div className="flex flex-wrap items-center justify-between gap-4 border border-granate px-6 py-5">
                <p className="text-granate">
                  <span className={`${campo} mr-3`}>{T.elegida}</span>
                  <span className="font-[family-name:var(--font-display)] text-[1.6rem]">{nombreCorto(elegida)}</span>
                  {listo && <span className="ml-3">· {T.total}: {cop(totalEstancia(elegida, llegada, salida))}</span>}
                </p>
                <div className="flex flex-wrap gap-3">
                  {listo && elegida.maxHuespedes >= huespedes ? (
                    <button type="button" onClick={() => elegir(elegida)} className={boton}>
                      {T.continuarCon} {nombreCorto(elegida)} <span aria-hidden>→</span>
                    </button>
                  ) : (
                    !listo && (
                      <button type="button" onClick={abrirFechas} className={boton}>
                        {T.elegirFechas} <span aria-hidden>→</span>
                      </button>
                    )
                  )}
                  <button type="button" onClick={() => setSlugElegida(null)} className={botonLinea}>
                    {T.cambiar}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Todas las cabañas (estructura de la página de reserva de Casa Momo) */}
          <section ref={resultados} id="resultados" className="scroll-mt-28 px-[var(--gutter)] pb-24 pt-20 sm:pb-28">
            <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-6 border-b border-granate/15 pb-6">
              <div>
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.2rem,3.6vw,3.6rem)] leading-none text-granate">{T.nuestras}</h2>
                <p className="mt-3 text-granate">
                  {listo ? `${plural(noches, T.noche, T.noches)} · ${plural(huespedes, T.huesped, T.huespedesPl)} · ${largo(llegada)}` : T.sinFechas}
                </p>
              </div>
              <FiltroCategorias valor={filtro} onChange={setFiltro} />
            </div>

            <ul className="mx-auto max-w-6xl divide-y divide-granate/15">
              {lista.map((c) => {
                const cabe = huespedes <= c.maxHuespedes;
                return (
                  <li key={c.slug} className={`grid gap-6 py-10 md:grid-cols-2 lg:grid-cols-[0.95fr_1.25fr_0.8fr] lg:items-start lg:gap-10 ${listo && !cabe ? "opacity-60" : ""} ${elegida?.slug === c.slug ? "bg-marfil/50" : ""}`}>
                    <div>
                      <Arch src={c.fotos[0]} alt={c.nombre} className="aspect-[4/3] w-full" sizes="(min-width: 1024px) 30vw, (min-width: 768px) 50vw, 100vw" reveal={false} />
                      <div className="mt-5 flex flex-wrap items-baseline justify-between gap-3">
                        <h3 className="font-[family-name:var(--font-display)] text-[2rem] leading-none text-granate">{nombreCorto(c)}</h3>
                        <span className="flex gap-4 text-[0.95rem] text-granate">
                          <span>{c.area.split(" ")[0]} m²</span>
                          <span>
                            {c.maxHuespedes} {T.huespedesPl}
                          </span>
                        </span>
                      </div>
                    </div>
                    <div className="lg:pt-2">
                      <p className="text-[0.875rem] uppercase tracking-[0.2em] text-granate">{getCategoria(c.categoria, lang).nombre}</p>
                      <p className="mt-3 text-granate">{c.resumen}</p>
                      <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[0.98rem] text-granate">
                        <li>{c.camas}</li>
                        {c.instalaciones.map((x) => <li key={x}>{x}</li>)}
                      </ul>
                      <L href={`/cabanas/${c.slug}`} className="mt-4 inline-flex min-h-11 items-center border-b border-granate/50 text-[0.875rem] uppercase tracking-[0.16em] text-granate hover:border-granate">
                        {lang === "es" ? "Descubre más" : "Discover more"}
                      </L>
                    </div>
                    <div className="md:col-span-2 lg:col-span-1 lg:pt-2 lg:text-right">
                      <p className="text-granate">
                        {T.desde} <span className="font-[family-name:var(--font-display)] text-[1.6rem]">{cop(desde(c.tarifa))}</span> {T.porNoche}
                      </p>
                      {listo && cabe && (
                        <p className="mt-1 text-granate">
                          {T.total} {T.para} {plural(noches, T.noche, T.noches)}: <strong className="font-normal">{cop(totalEstancia(c, llegada, salida))}</strong>
                        </p>
                      )}
                      {listo && !cabe && (
                        <p className="mt-1 text-granate">
                          {T.capacidadMax}: {c.maxHuespedes} {T.huespedesPl}
                        </p>
                      )}
                      {listo ? (
                        <button type="button" disabled={!cabe} onClick={() => elegir(c)} className={`${boton} mt-5`}>
                          {T.seleccionar} <span aria-hidden>→</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setSlugElegida(c.slug);
                            abrirFechas();
                          }}
                          className={`${botonLinea} mt-5`}
                          aria-label={`${T.elegirFechas}: ${nombreCorto(c)}`}
                        >
                          {T.elegirFechas} <span aria-hidden>→</span>
                        </button>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>

          {/* Tarifas: categoría y capacidad leídas de las cabañas (estructura de Hillbrook) */}
          <section id="tarifas" className="border-t border-granate/15 px-[var(--gutter)] py-24 sm:py-36">
            <h2 className="text-center font-[family-name:var(--font-display)] text-[clamp(2.4rem,4.4vw,4.6rem)] leading-[1.02] text-granate">
              {T.tarifasTitulo[0]} <span className="t-italic">{T.tarifasTitulo[1]}</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-center text-[0.92rem] uppercase leading-[1.7] tracking-[0.2em] text-granate">{tarifasIntro[lang]}</p>

            <ul className="mx-auto mt-16 grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
              {tarifasConCabanas(lang).map((t) => (
                <li key={t.id} className="flex flex-col border border-granate/25 p-6 sm:p-8">
                  <h3 className="border-b border-granate/15 pb-5 text-center text-[1rem] uppercase tracking-[0.24em] text-granate">{t.nombre[lang]}</h3>
                  <div className="grid grid-cols-2 border-b border-granate/15">
                    <div className="flex flex-col justify-center gap-3 border-r border-granate/15 py-5 pr-4 text-center">
                      <div>
                        <span className="block text-granate">{T.capacidad}</span>
                        <span className="mt-1 block text-[0.9rem] uppercase tracking-[0.2em] text-granate">{t.capacidad}</span>
                      </div>
                      <div>
                        <span className="block text-granate">{t.categorias.join(" · ")}</span>
                      </div>
                    </div>
                    <div className="space-y-3 py-5 pl-4 text-center">
                      {t.temporadas.map((x) => (
                        <div key={x.nombre.es}>
                          <span className="block text-[0.875rem] text-granate">{x.nombre[lang]}</span>
                          <span className="block font-[family-name:var(--font-display)] text-[1.9rem] leading-none text-granate">{cop(x.valor)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="mt-5 text-granate">
                    <span className="text-[0.875rem] uppercase tracking-[0.18em]">{T.cabanas}: </span>
                    {t.nombresCabanas.join(", ")}
                  </p>
                  <ul className="mt-5 flex-1 space-y-2 text-granate">
                    {t.incluye.map((x) => (
                      <li key={x.es} className="flex items-center gap-3">
                        <span aria-hidden className="h-1.5 w-1.5 shrink-0 bg-granate" />
                        {x[lang]}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 border-t border-granate/15 pt-5 text-[0.95rem] leading-[1.5] text-granate">
                    {T.desde} {cop(Math.min(...t.temporadas.map((x) => x.valor)))} {T.porNoche}. {tarifasNota[lang]}
                  </p>
                  <div className="mt-6 flex justify-center">
                    <button type="button" onClick={abrirFechas} className={botonLinea}>
                      {T.reservar} <span aria-hidden>→</span>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}

      {paso === 2 && elegida && (
        <section className="grid gap-12 px-[var(--gutter)] py-16 lg:grid-cols-[1.4fr_1fr] lg:gap-16 lg:py-20">
          <form onSubmit={enviar} noValidate>
            <button type="button" onClick={() => setPaso(1)} className="inline-flex min-h-11 items-center text-[0.875rem] uppercase tracking-[0.16em] text-granate hover:underline">
              {T.volver}
            </button>
            <h1 ref={titulo} tabIndex={-1} className="mt-6 font-[family-name:var(--font-display)] text-[clamp(2.4rem,4vw,4rem)] leading-none text-granate outline-none">
              {T.datos}
            </h1>
            <p className="mt-4 max-w-lg text-granate">{T.datosNota}</p>
            <p className="mt-2 max-w-lg text-granate">{T.aviso}</p>
            <div className="mt-10 grid gap-x-10 gap-y-9 sm:grid-cols-2">
              {(
                [
                  { k: "nombre", t: "text", ac: "name" },
                  { k: "correo", t: "email", ac: "email" },
                  { k: "telefono", t: "tel", ac: "tel" },
                  { k: "pais", t: "text", ac: "country-name" },
                ] as const
              ).map((f) => (
                <label key={f.k} className="block">
                  <span className={campo}>{T.campos[f.k]}</span>
                  <input
                    id={`campo-${f.k}`}
                    type={f.t}
                    autoComplete={f.ac}
                    required={f.k !== "pais"}
                    aria-invalid={Boolean(errores[f.k])}
                    aria-describedby={errores[f.k] ? `error-${f.k}` : undefined}
                    value={datos[f.k]}
                    onChange={(e) => setDatos({ ...datos, [f.k]: e.target.value })}
                    className={input}
                  />
                  {errores[f.k] && (
                    <span id={`error-${f.k}`} role="alert" className="mt-2 block text-[0.95rem] text-granate underline decoration-dotted underline-offset-4">
                      {errores[f.k]}
                    </span>
                  )}
                </label>
              ))}
              <label className="block sm:col-span-2">
                <span className={campo}>{T.campos.notas}</span>
                <textarea rows={3} value={datos.notas} onChange={(e) => setDatos({ ...datos, notas: e.target.value })} className={`${input} resize-none`} />
              </label>
            </div>
            <label className="mt-10 flex items-start gap-3 text-[1rem] text-granate">
              <input
                id="campo-acepto"
                type="checkbox"
                checked={datos.acepto}
                onChange={(e) => setDatos({ ...datos, acepto: e.target.checked })}
                aria-invalid={Boolean(errores.acepto)}
                className="mt-1 h-6 w-6 shrink-0 accent-[#100f0e]"
              />
              <span>
                {T.acepto[0]} <L href="/terminos" className="underline underline-offset-4">{T.acepto[1]}</L> {T.acepto[2]}{" "}
                <L href="/privacidad" className="underline underline-offset-4">{T.acepto[3]}</L>.
              </span>
            </label>
            {errores.acepto && (
              <p role="alert" className="mt-2 text-[0.95rem] text-granate underline decoration-dotted underline-offset-4">
                {errores.acepto}
              </p>
            )}
            <button type="submit" disabled={envio === "enviando"} className={`${boton} mt-10`}>
              {envio === "enviando" ? T.enviando : T.enviar} <span aria-hidden>→</span>
            </button>
          </form>
          <Resumen />
        </section>
      )}

      {paso === 3 && elegida && (
        <section className="grid gap-12 px-[var(--gutter)] py-16 lg:grid-cols-[1.4fr_1fr] lg:gap-16 lg:py-20">
          <div role="status">
            <p className="text-[0.92rem] uppercase tracking-[0.3em] text-granate">{envio === "ok" ? T.okKicker : T.manualKicker}</p>
            <h1 ref={titulo} tabIndex={-1} className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2.4rem,4vw,4rem)] leading-[1.02] text-granate outline-none">
              {envio === "ok" ? T.okTitulo : T.manualTitulo} {datos.nombre.split(" ")[0]}
            </h1>
            <p className="mt-6 max-w-xl text-granate">{envio === "ok" ? T.okTexto : T.manualTexto}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              {envio !== "ok" && (
                <a
                  href={`mailto:${site.contact.email}?subject=${encodeURIComponent(`${T.estado} · ${elegida.nombre}`)}&body=${encodeURIComponent(resumenTexto())}`}
                  className={boton}
                >
                  {T.porCorreo} <span aria-hidden>→</span>
                </a>
              )}
              {envio === "ok" && (
                <L href="/" className={botonLinea}>
                  Gardners Hills
                </L>
              )}
            </div>
            <p className="mt-8 text-granate">
              {T.apoyoWa}{" "}
              <a href={waHref} target="_blank" rel="noreferrer" className="underline underline-offset-4">
                WhatsApp {site.contact.whatsappLabel}
              </a>
              .
            </p>
          </div>
          <Resumen />
        </section>
      )}
    </div>
  );
}
