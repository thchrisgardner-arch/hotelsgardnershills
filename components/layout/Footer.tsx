"use client";

import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Lines } from "@/components/ui/Lines";
import { Pill } from "@/components/ui/Pill";
import { site, menuPrincipal, legales } from "@/data/site";
import { useLang, type Clave } from "@/lib/i18n";

const conInicio = [{ label: "Inicio", en: "Home", href: "/" }, ...menuPrincipal];
const porRuta = (hrefs: string[]) => conInicio.filter((m) => hrefs.includes(m.href));
const cols: { titulo: Clave; links: typeof menuPrincipal }[] = [
  { titulo: "hotel", links: porRuta(["/", "/cabanas", "/servicios", "/gastronomia"]) },
  { titulo: "explorar", links: porRuta(["/galeria", "/reservas", "/contacto"]) },
];

/** Footer del wireframe / XD: «Una experiencia que nunca olvidarás» + logo a todo el ancho */
export function Footer() {
  const { contact, instagram, facebook } = site;
  const { lang, t } = useLang();
  return (
    <footer id="contacto" className="border-t border-granate/15 px-[var(--gutter)] pb-28 pt-20 text-granate sm:pt-24">
      <div className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Lines
            as="p"
            className="t-recto font-[family-name:var(--font-display)] text-[clamp(2.6rem,4.6vw,4.6rem)] leading-[1]"
            lines={[t("experiencia1"), <span key="i">{t("experiencia2a")} <span className="t-italic">{t("experiencia2b")}</span></span>]}
          />
          <div data-reveal className="mt-10">
            <Pill href="/reservas">{t("reservarAhora")}</Pill>
          </div>
        </div>

        {cols.map((c) => (
          <nav key={c.titulo} aria-label={c.titulo} className="lg:col-span-2">
            <h2 className="mb-5 text-[0.84rem] font-normal uppercase tracking-[0.2em] text-granate/60">{t(c.titulo)}</h2>
            <ul className="space-y-2.5 text-[1.2rem]">
              {c.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="transition-colors hover:text-carmesi">{lang === "en" ? l.en : l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div className="lg:col-span-3">
          <h2 className="mb-5 text-[0.84rem] font-normal uppercase tracking-[0.2em] text-granate/60">{t("contacto")}</h2>
          <ul className="space-y-2.5 text-[1.2rem]">
            <li><a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noreferrer" className="hover:text-carmesi">WhatsApp {contact.whatsappLabel}</a></li>
            <li><a href={`mailto:${contact.email}`} className="hover:text-carmesi">{contact.email}</a></li>
            <li className="text-granate/75">{t("ubicacion")}</li>
          </ul>
        </div>
      </div>

      {/* Logo limitado por alto de pantalla para que todo el footer quepa en una vista */}
      <div data-reveal className="mt-14 sm:mt-16">
        <Logo className="mx-auto w-[min(100%,62vh,820px)]" />
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-6 text-[1rem] font-normal uppercase tracking-[0.16em] text-granate">
        <div className="flex gap-10">
          {legales.map((l) => (
            <Link key={l.href} href={l.href} className="transition-colors hover:text-carmesi">{t(l.clave)}</Link>
          ))}
        </div>
        <div className="flex items-center gap-6">
          {/* Íconos en línea negra; se activan al confirmar las redes en data/site.ts */}
          <a href={instagram ?? undefined} aria-label="Instagram" className={`text-granate transition-colors hover:text-carmesi ${instagram ? "" : "pointer-events-none"}`}>
            <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" /></svg>
          </a>
          <a href={facebook ?? undefined} aria-label="Facebook" className={`text-granate transition-colors hover:text-carmesi ${facebook ? "" : "pointer-events-none"}`}>
            <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"><path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.4H8v3h2.6V21h2.9z" /></svg>
          </a>
          <span className="normal-case tracking-normal text-[1.1rem]">© 2027 Gardners Hills</span>
        </div>
      </div>
    </footer>
  );
}
