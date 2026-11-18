import { Logo } from "@/components/ui/Logo";
import { Lines } from "@/components/ui/Lines";
import { Pill } from "@/components/ui/Pill";
import { site } from "@/data/site";

const cols = [
  {
    titulo: "Hotel",
    links: [
      { label: "La casa", href: "#casa" },
      { label: "Cabañas", href: "#cabanas" },
      { label: "Esencia", href: "#esencia" },
      { label: "Reservar", href: "#reservas" },
    ],
  },
  {
    titulo: "Explorar",
    links: [
      { label: "Servicios", href: "#servicios" },
      { label: "Entorno", href: "#entorno" },
      { label: "Actividades", href: "#actividades" },
      { label: "Galería", href: "#galeria" },
    ],
  },
];

/** Footer del wireframe / XD: «Una experiencia que nunca olvidarás» + logo a todo el ancho */
export function Footer() {
  const { contact, instagram, facebook } = site;
  return (
    <footer id="contacto" className="border-t border-granate/15 px-[var(--gutter)] pb-28 pt-24 text-granate sm:pt-32">
      <div className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Lines
            as="p"
            className="font-[family-name:var(--font-display)] text-[clamp(2.6rem,4.6vw,4.6rem)] leading-[1]"
            lines={["Una experiencia", <span key="i" className="pl-[1.2em]">que <span className="t-italic">nunca olvidarás</span></span>]}
          />
          <div data-reveal className="mt-10">
            <Pill href="#reservas">Reservar ahora</Pill>
          </div>
        </div>

        {cols.map((c) => (
          <nav key={c.titulo} aria-label={c.titulo} className="lg:col-span-2">
            <h2 className="mb-5 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-granate/60">{c.titulo}</h2>
            <ul className="space-y-2.5 text-[1.125rem]">
              {c.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="transition-colors hover:text-carmesi">{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div className="lg:col-span-3">
          <h2 className="mb-5 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-granate/60">Contacto</h2>
          <ul className="space-y-2.5 text-[1.125rem]">
            <li><a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noreferrer" className="hover:text-carmesi">WhatsApp {contact.whatsappLabel}</a></li>
            <li><a href={`mailto:${contact.email}`} className="hover:text-carmesi">{contact.email}</a></li>
            <li className="text-granate/75">Villanueva, La Guajira · Colombia</li>
          </ul>
        </div>
      </div>

      <div data-reveal className="mt-24 sm:mt-28">
        <Logo className="w-full" />
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-6 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-granate/70">
        <div className="flex gap-8">
          <span>Términos y condiciones</span>
          <span>Política de privacidad</span>
        </div>
        <div className="flex items-center gap-5">
          <a href={instagram ?? undefined} aria-label="Instagram (por confirmar)" className={instagram ? "hover:text-carmesi" : "pointer-events-none opacity-50"}>
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.3"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" /></svg>
          </a>
          <a href={facebook ?? undefined} aria-label="Facebook (por confirmar)" className={facebook ? "hover:text-carmesi" : "pointer-events-none opacity-50"}>
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.4H8v3h2.6V21h2.9z" /></svg>
          </a>
          <span className="normal-case tracking-normal">© {new Date().getFullYear()} Gardners Hills</span>
        </div>
      </div>
    </footer>
  );
}
