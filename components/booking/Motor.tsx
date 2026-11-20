"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { RangeCalendar } from "./RangeCalendar";
import { Arch } from "@/components/ui/Arch";
import { cabanas, categorias, getCabana, getCategoria, type Cabana, type CategoriaSlug } from "@/data/cabanas";
import { site } from "@/data/site";
import { tarifas, tarifasIntro, tarifasNota, cop } from "@/data/tarifas";

/**
 * Motor de reservas propio (estructura del motor D-Edge de Grand Hotel Miramare):
 * pasos «Tu estancia → Tus datos → Confirmación», buscador en tarjeta sobre la portada,
 * listado de cabañas y resumen lateral.
 *
 * No hay motor real conectado ni tarifas publicadas: la solicitud final se envía por WhatsApp o correo
 * y el hotel confirma disponibilidad y tarifa. No se muestran precios inventados.
 */
type Paso = 1 | 2 | 3;
type Panel = "fechas" | "huespedes" | null;

const MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
const fecha = (d: string) => {
  const x = new Date(d + "T12:00:00");
  return { mes: MESES[x.getMonth()], dia: x.getDate(), anio: x.getFullYear() };
};
const largo = (d: string) =>
  new Date(d + "T12:00:00").toLocaleDateString("es-CO", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
const plural = (n: number, a: string, b: string) => `${n} ${n === 1 ? a : b}`;

export function Motor() {
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
  const [elegida, setElegida] = useState<Cabana | null>(getCabana(params.get("cabana") ?? "") ?? null);
  const [error, setError] = useState<string | null>(null);
  const [datos, setDatos] = useState({ nombre: "", correo: "", telefono: "", pais: "Colombia", notas: "" });
  const card = useRef<HTMLDivElement>(null);
  const resultados = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDown = (e: MouseEvent) => card.current && !card.current.contains(e.target as Node) && setPanel(null);
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const noches = llegada && salida ? Math.round((+new Date(salida) - +new Date(llegada)) / 86400000) : 0;
  const huespedes = adultos + ninos;
  const lista = useMemo(
    () => cabanas.filter((c) => (filtro === "todas" || c.categoria === filtro)),
    [filtro]
  );

  function buscar() {
    if (!llegada || !salida) {
      setPanel("fechas");
      return setError("Elige tus fechas de entrada y salida.");
    }
    setError(null);
    setPanel(null);
    setBuscado(true);
    setTimeout(() => resultados.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  }

  function elegir(c: Cabana) {
    setElegida(c);
    setPaso(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const resumenTexto = () =>
    [
      "Hola, Gardners Hills. Quiero reservar:",
      elegida ? `• Cabaña: ${elegida.nombre} (${getCategoria(elegida.categoria).nombre})` : "",
      `• Entrada: ${largo(llegada)}`,
      `• Salida: ${largo(salida)} (${plural(noches, "noche", "noches")})`,
      `• Huéspedes: ${plural(adultos, "adulto", "adultos")}${ninos ? `, ${plural(ninos, "niño", "niños")}` : ""}`,
      codigo ? `• Código de promoción: ${codigo}` : "",
      `• Nombre: ${datos.nombre}`,
      `• Correo: ${datos.correo}`,
      `• Teléfono: ${datos.telefono}`,
      `• País: ${datos.pais}`,
      datos.notas ? `• Solicitudes: ${datos.notas}` : "",
    ]
      .filter(Boolean)
      .join("\n");

  const pasos = ["Tu estancia", "Tus datos", "Confirmación"];
  const campo = "text-[0.78rem] uppercase tracking-[0.18em] text-granate/60";
  const contador =
    "grid h-9 w-9 place-items-center border border-granate/40 text-granate transition-colors hover:bg-granate hover:text-crema disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-granate";
  const input =
    "mt-2 w-full border-0 border-b border-granate/35 bg-transparent pb-2.5 pt-1 text-[1.1rem] text-granate outline-none transition-colors placeholder:text-granate/35 focus:border-granate";

  const Fecha = ({ d, vacio }: { d: string; vacio: string }) =>
    d ? (
      <span className="mt-1 flex items-baseline gap-2 text-granate">
        <span className="text-[1.1rem] capitalize">{fecha(d).mes}</span>
        <span className="font-[family-name:var(--font-display)] text-[2.6rem] leading-none">{fecha(d).dia}</span>
        <span className="text-[1.1rem]">{fecha(d).anio}</span>
      </span>
    ) : (
      <span className="mt-1 block font-[family-name:var(--font-display)] text-[2rem] leading-[1.3] text-granate/40">{vacio}</span>
    );

  const Resumen = () => (
    <aside className="border border-granate/15 bg-marfil/60 p-8 lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
      <p className={campo}>Tu reserva</p>
      {elegida && (
        <>
          <Arch src={elegida.fotos[0]} alt={elegida.nombre} className="mt-5 aspect-[16/10] w-full" sizes="30vw" reveal={false} />
          <p className="mt-5 text-[0.78rem] uppercase tracking-[0.18em] text-granate/60">{getCategoria(elegida.categoria).nombre}</p>
          <p className="mt-1 font-[family-name:var(--font-display)] text-[2rem] leading-none text-granate">{elegida.nombre.replace("Cabaña ", "")}</p>
        </>
      )}
      <dl className="mt-6 divide-y divide-granate/10 border-y border-granate/10 text-[1rem]">
        {[
          ["Entrada", llegada ? largo(llegada) : "—"],
          ["Salida", salida ? largo(salida) : "—"],
          ["Noches", noches ? String(noches) : "—"],
          ["Huéspedes", `${plural(adultos, "adulto", "adultos")}${ninos ? `, ${plural(ninos, "niño", "niños")}` : ""}`],
          ...(codigo ? [["Código", codigo]] : []),
        ].map(([k, v]) => (
          <div key={k} className="flex justify-between gap-4 py-3">
            <dt className="text-granate/60">{k}</dt>
            <dd className="text-right text-granate">{v}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-6 text-[0.95rem] leading-[1.45] text-granate/70">
        La tarifa final y la disponibilidad te las confirmamos al recibir tu solicitud. No se hace ningún cobro en este paso.
      </p>
    </aside>
  );

  return (
    <div className="pt-[var(--header-h)]">
      {/* Pasos */}
      <nav aria-label="Pasos de la reserva" className="border-b border-granate/15 px-[var(--gutter)]">
        <ol className="flex items-center justify-center gap-5 py-5 text-[0.9rem] uppercase tracking-[0.16em]">
          {pasos.map((p, i) => (
            <li key={p} className="flex items-center gap-5">
              {i > 0 && <span aria-hidden className="h-px w-16 bg-granate/25" />}
              <span className={paso === i + 1 ? "text-granate" : "text-granate/40"} aria-current={paso === i + 1 ? "step" : undefined}>
                {p}
              </span>
            </li>
          ))}
        </ol>
      </nav>

      {paso === 1 && (
        <>
          {/* Portada con el buscador en tarjeta */}
          <section className="relative bg-granate px-[var(--gutter)] pb-48 pt-20 text-center text-marfil">
            <p className="text-[0.92rem] uppercase tracking-[0.3em] text-marfil/90">Reservas</p>
            <h1 className="t-hero t-italic mt-10 text-[clamp(3.6rem,6.4vw,6.8rem)] leading-[0.95]">
              Tu próxima escapada
              <br />
              la encuentras en
              <br />
              Gardners Hills
            </h1>
          </section>

          <div className="relative z-10 -mt-24 px-[var(--gutter)]">
            <div ref={card} className="relative mx-auto max-w-6xl bg-crema shadow-[0_24px_60px_-24px_rgba(16,15,14,0.35)]">
              <div className="grid grid-cols-[1fr_1fr_0.8fr_auto] items-stretch">
                <button type="button" onClick={() => setPanel(panel === "fechas" ? null : "fechas")} className="border-r border-granate/10 px-8 py-7 text-left transition-colors hover:bg-granate/[0.03]">
                  <span className={campo}>Entrada</span>
                  <Fecha d={llegada} vacio="Elige fecha" />
                </button>
                <button type="button" onClick={() => setPanel(panel === "fechas" ? null : "fechas")} className="border-r border-granate/10 px-8 py-7 text-left transition-colors hover:bg-granate/[0.03]">
                  <span className={campo}>Salida</span>
                  <Fecha d={salida} vacio="Elige fecha" />
                </button>
                <button type="button" onClick={() => setPanel(panel === "huespedes" ? null : "huespedes")} className="px-8 py-7 text-left transition-colors hover:bg-granate/[0.03]">
                  <span className={campo}>Huéspedes</span>
                  <span className="mt-1 flex items-baseline gap-2 text-granate">
                    <span className="font-[family-name:var(--font-display)] text-[2.6rem] leading-none">{huespedes}</span>
                    <span className="text-[1.05rem] text-granate/70">{ninos ? `${adultos} adultos · ${ninos} niños` : "adultos"}</span>
                  </span>
                </button>
                <div className="flex items-center px-6">
                  <button type="button" onClick={buscar} className="inline-flex items-center gap-4 bg-granate px-10 py-5 text-[0.9rem] uppercase tracking-[0.18em] text-crema transition-colors hover:bg-carmesi">
                    Buscar <span aria-hidden>→</span>
                  </button>
                </div>
              </div>

              <div className="border-t border-granate/10 px-8 py-4 text-center">
                {verCodigo ? (
                  <label className="inline-flex items-center gap-4 text-granate">
                    <span className={campo}>Código promocional</span>
                    <input value={codigo} onChange={(e) => setCodigo(e.target.value.toUpperCase())} className="w-48 border-b border-granate/35 bg-transparent pb-1 text-center uppercase tracking-[0.12em] outline-none focus:border-granate" />
                  </label>
                ) : (
                  <button type="button" onClick={() => setVerCodigo(true)} className="text-[0.95rem] text-granate/70 underline-offset-4 hover:text-granate hover:underline">
                    Aplicar un código promocional ↓
                  </button>
                )}
              </div>
              {error && <p className="border-t border-granate/10 px-8 py-3 text-center text-carmesi">{error}</p>}

              {panel === "fechas" && (
                <div className="absolute left-0 right-0 top-full z-20 mt-2 border border-granate/10 bg-crema px-8 pb-6 pt-7 shadow-[0_24px_60px_-24px_rgba(16,15,14,0.35)]">
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
                <div className="absolute right-0 top-full z-20 mt-2 w-[380px] border border-granate/10 bg-crema p-7 shadow-[0_24px_60px_-24px_rgba(16,15,14,0.35)]">
                  {[
                    { k: "Adultos", v: adultos, set: setAdultos, min: 1 },
                    { k: "Niños", v: ninos, set: setNinos, min: 0 },
                  ].map((r) => (
                    <div key={r.k} className="flex items-center justify-between border-b border-granate/10 py-4">
                      <span className="text-[1.1rem] text-granate">{r.k}</span>
                      <span className="flex items-center gap-4">
                        <button type="button" className={contador} disabled={r.v <= r.min} onClick={() => r.set(r.v - 1)} aria-label={`Quitar ${r.k.toLowerCase()}`}>−</button>
                        <span className="w-6 text-center text-[1.1rem] text-granate">{r.v}</span>
                        <button type="button" className={contador} disabled={adultos + ninos >= 8} onClick={() => r.set(r.v + 1)} aria-label={`Añadir ${r.k.toLowerCase()}`}>+</button>
                      </span>
                    </div>
                  ))}
                  <button type="button" onClick={() => setPanel(null)} className="mt-5 w-full border border-granate/50 py-3 text-[0.86rem] uppercase tracking-[0.16em] text-granate transition-colors hover:bg-granate hover:text-crema">
                    Listo
                  </button>
                </div>
              )}
            </div>

            {/* Garantías */}
            <ul className="mx-auto mt-8 flex max-w-6xl justify-center gap-16 text-[1rem] text-granate/80">
              {["Reserva directa con el hotel", "Sitio oficial de Gardners Hills", `Atención por WhatsApp ${site.contact.whatsappLabel}`].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <span aria-hidden className="h-1.5 w-1.5 bg-granate" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Todas las cabañas (estructura de la página de reserva de Casa Momo) */}
          <section ref={resultados} id="resultados" className="scroll-mt-28 px-[var(--gutter)] pb-28 pt-24">
            <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-6 border-b border-granate/15 pb-6">
              <div>
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.4rem,3.6vw,3.6rem)] leading-none text-granate">Nuestras cabañas</h2>
                <p className="mt-3 text-granate/70">
                  {buscado && noches
                    ? `${plural(noches, "noche", "noches")} · ${plural(huespedes, "huésped", "huéspedes")} · ${largo(llegada)}`
                    : "Elige tus fechas para reservar la cabaña que prefieras."}
                </p>
              </div>
              <div className="flex gap-2" role="tablist" aria-label="Categoría">
                {[{ slug: "todas" as const, nombre: "Todas" }, ...categorias.map((c) => ({ slug: c.slug, nombre: c.nombre.replace("Cabañas ", "") }))].map((f) => (
                  <button
                    key={f.slug}
                    type="button"
                    role="tab"
                    aria-selected={filtro === f.slug}
                    onClick={() => setFiltro(f.slug)}
                    className={`border px-5 py-2 text-[0.86rem] uppercase tracking-[0.16em] transition-colors ${filtro === f.slug ? "border-granate bg-granate text-crema" : "border-granate/30 text-granate hover:border-granate"}`}
                  >
                    {f.nombre}
                  </button>
                ))}
              </div>
            </div>

            <ul className="mx-auto max-w-6xl divide-y divide-granate/15">
              {lista.map((c) => {
                const cabe = huespedes <= c.maxHuespedes;
                const listo = buscado && Boolean(noches);
                return (
                  <li key={c.slug} className={`grid gap-10 py-10 lg:grid-cols-[0.95fr_1.25fr_0.8fr] lg:items-start ${listo && !cabe ? "opacity-50" : ""}`}>
                    {/* Imagen + nombre + datos con íconos */}
                    <div>
                      <Arch src={c.fotos[0]} alt={c.nombre} className="aspect-[4/3] w-full" sizes="30vw" reveal={false} />
                      <div className="mt-5 flex flex-wrap items-baseline justify-between gap-3">
                        <h3 className="font-[family-name:var(--font-display)] text-[2rem] leading-none text-granate">{c.nombre.replace("Cabaña ", "")}</h3>
                        <span className="flex gap-4 text-[0.95rem] text-granate/70">
                          <span>{c.area.split(" ")[0]} m²</span>
                          <span>{c.maxHuespedes} huésp.</span>
                        </span>
                      </div>
                    </div>
                    {/* Descripción */}
                    <div className="lg:pt-2">
                      <p className="text-[0.78rem] uppercase tracking-[0.2em] text-granate/60">{getCategoria(c.categoria).nombre}</p>
                      <p className="mt-3 text-granate/85">{c.resumen}</p>
                      <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[0.98rem] text-granate/70">
                        <li>{c.camas}</li>
                        {c.instalaciones.map((x) => <li key={x}>{x}</li>)}
                      </ul>
                      <Link href={`/cabanas/${c.slug}`} className="mt-5 inline-block border-b border-granate/40 pb-0.5 text-[0.86rem] uppercase tracking-[0.16em] text-granate hover:border-granate">
                        Descubre más
                      </Link>
                    </div>
                    {/* Acción */}
                    <div className="lg:pt-2 lg:text-right">
                      <p className="text-[0.95rem] text-granate/70">
                        {!listo ? "Elige tus fechas para ver la disponibilidad" : cabe ? "Tarifa según temporada, confirmada por el hotel" : `Capacidad máxima: ${c.maxHuespedes} huéspedes`}
                      </p>
                      {listo ? (
                        <button
                          type="button"
                          disabled={!cabe}
                          onClick={() => elegir(c)}
                          className="mt-5 inline-flex items-center gap-4 bg-granate px-8 py-4 text-[0.86rem] uppercase tracking-[0.18em] text-crema transition-colors hover:bg-carmesi disabled:cursor-not-allowed disabled:bg-granate/30"
                        >
                          Seleccionar <span aria-hidden>→</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setElegida(c);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                            setTimeout(() => setPanel("fechas"), 450);
                          }}
                          className="mt-5 inline-flex items-center gap-4 border border-granate/50 px-8 py-4 text-[0.86rem] uppercase tracking-[0.18em] text-granate transition-colors hover:bg-granate hover:text-crema"
                        >
                          Elegir fechas <span aria-hidden>→</span>
                        </button>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>

          {/* Tarifas (estructura de Hillbrook; datos del cliente) */}
          <section id="tarifas" className="border-t border-granate/15 px-[var(--gutter)] py-28 sm:py-36">
            <h2 className="text-center font-[family-name:var(--font-display)] text-[clamp(2.6rem,4.4vw,4.6rem)] leading-[1.02] text-granate">
              Tarifas en <span className="t-italic">Gardners Hills</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-center text-[0.92rem] uppercase leading-[1.7] tracking-[0.2em] text-granate/75">{tarifasIntro}</p>

            <ul className="mx-auto mt-16 grid max-w-6xl gap-6 lg:grid-cols-3">
              {tarifas.map((t) => (
                <li key={t.id} className="flex flex-col border border-granate/20 p-8">
                  <h3 className="border-b border-granate/15 pb-5 text-center text-[1rem] uppercase tracking-[0.24em] text-granate">{t.nombre}</h3>
                  <div className="grid grid-cols-2 border-b border-granate/15">
                    <div className="flex flex-col justify-center border-r border-granate/15 py-5 pr-4 text-center">
                      <span className="text-granate/60">Capacidad</span>
                      <span className="mt-1 text-[0.9rem] uppercase tracking-[0.2em] text-granate">{t.capacidad}</span>
                    </div>
                    <div className="space-y-3 py-5 pl-4 text-center">
                      {t.temporadas.map((x) => (
                        <div key={x.nombre}>
                          <span className="block text-[0.86rem] text-granate/60">{x.nombre}</span>
                          <span className="block font-[family-name:var(--font-display)] text-[1.9rem] leading-none text-granate">{cop(x.valor)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <ul className="mt-6 flex-1 space-y-2 text-granate/85">
                    {t.incluye.map((x) => (
                      <li key={x} className="flex items-center gap-3">
                        <span aria-hidden className="h-1.5 w-1.5 shrink-0 bg-granate" />
                        {x}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 border-t border-granate/15 pt-5 text-[0.9rem] leading-[1.5] text-granate/65">
                    Desde {cop(t.temporadas[0].valor)} por noche. {tarifasNota}
                  </p>
                  <div className="mt-6 flex justify-center">
                    <button
                      type="button"
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                        setTimeout(() => setPanel("fechas"), 450);
                      }}
                      className="inline-flex items-center gap-4 border border-granate/50 px-8 py-3 text-[0.86rem] uppercase tracking-[0.18em] text-granate transition-colors hover:bg-granate hover:text-crema"
                    >
                      Reservar <span aria-hidden>→</span>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}

      {paso === 2 && elegida && (
        <section className="grid gap-16 px-[var(--gutter)] py-20 lg:grid-cols-[1.4fr_1fr]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setPaso(3);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <button type="button" onClick={() => setPaso(1)} className="text-[0.86rem] uppercase tracking-[0.16em] text-granate/60 hover:text-granate">
              ← Cambiar cabaña o fechas
            </button>
            <h1 className="mt-8 font-[family-name:var(--font-display)] text-[clamp(2.6rem,4vw,4rem)] leading-none text-granate">Tus datos</h1>
            <p className="mt-4 max-w-lg text-granate/75">Los usamos solo para gestionar tu reserva, según nuestra política de privacidad.</p>
            <div className="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2">
              {[
                { k: "nombre", l: "Nombre y apellido", t: "text", req: true },
                { k: "correo", l: "Correo electrónico", t: "email", req: true },
                { k: "telefono", l: "Teléfono / WhatsApp", t: "tel", req: true },
                { k: "pais", l: "País", t: "text", req: true },
              ].map((f) => (
                <label key={f.k} className="block">
                  <span className={campo}>{f.l}</span>
                  <input
                    type={f.t}
                    required={f.req}
                    value={datos[f.k as keyof typeof datos]}
                    onChange={(e) => setDatos({ ...datos, [f.k]: e.target.value })}
                    className={input}
                  />
                </label>
              ))}
              <label className="block sm:col-span-2">
                <span className={campo}>Solicitudes especiales (opcional)</span>
                <textarea rows={3} value={datos.notas} onChange={(e) => setDatos({ ...datos, notas: e.target.value })} className={`${input} resize-none`} />
              </label>
            </div>
            <label className="mt-10 flex items-start gap-3 text-[1rem] text-granate/80">
              <input type="checkbox" required className="mt-1.5 h-4 w-4 accent-[#100f0e]" />
              <span>
                Acepto los <Link href="/terminos" className="underline underline-offset-4">términos y condiciones</Link> y la{" "}
                <Link href="/privacidad" className="underline underline-offset-4">política de privacidad</Link>.
              </span>
            </label>
            <button type="submit" className="mt-10 inline-flex items-center gap-4 bg-granate px-10 py-5 text-[0.9rem] uppercase tracking-[0.18em] text-crema transition-colors hover:bg-carmesi">
              Continuar <span aria-hidden>→</span>
            </button>
          </form>
          <Resumen />
        </section>
      )}

      {paso === 3 && elegida && (
        <section className="grid gap-16 px-[var(--gutter)] py-20 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <button type="button" onClick={() => setPaso(2)} className="text-[0.86rem] uppercase tracking-[0.16em] text-granate/60 hover:text-granate">
              ← Editar mis datos
            </button>
            <p className="mt-10 text-[0.92rem] uppercase tracking-[0.3em] text-granate/70">Casi listo</p>
            <h1 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2.6rem,4vw,4rem)] leading-[1.02] text-granate">
              Envía tu solicitud, {datos.nombre.split(" ")[0]}
            </h1>
            <p className="mt-6 max-w-xl text-granate/80">
              Recibimos tu solicitud por el canal que prefieras y te respondemos con la disponibilidad y la tarifa final de la{" "}
              {elegida.nombre} para tus fechas.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={`https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(resumenTexto())}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-4 bg-granate px-10 py-5 text-[0.9rem] uppercase tracking-[0.18em] text-crema transition-colors hover:bg-carmesi"
              >
                Enviar por WhatsApp <span aria-hidden>→</span>
              </a>
              <a
                href={`mailto:${site.contact.email}?subject=${encodeURIComponent(`Reserva · ${elegida.nombre}`)}&body=${encodeURIComponent(resumenTexto())}`}
                className="inline-flex items-center gap-4 border border-granate/50 px-10 py-5 text-[0.9rem] uppercase tracking-[0.18em] text-granate transition-colors hover:bg-granate hover:text-crema"
              >
                Enviar por correo
              </a>
            </div>
          </div>
          <Resumen />
        </section>
      )}
    </div>
  );
}
