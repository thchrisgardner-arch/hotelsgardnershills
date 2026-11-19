import Link from "next/link";

/**
 * Hero del XD: video oficial a pantalla completa, titular centrado
 * («Tu sueño en Gardners Hills / Quédate con nosotros») y accesos inferiores.
 * El video trae franjas negras (158 px arriba y abajo de 1440): se recortan con scale.
 */
export function Hero() {
  return (
    <section id="inicio" data-header-light aria-labelledby="hero-title" className="relative h-[100svh] min-h-[620px] overflow-hidden bg-granate text-marfil">
      <div data-hero-media className="absolute inset-0" style={{ clipPath: "inset(0% 0% 0% 0%)" }}>
        <div data-media-inner className="absolute inset-0">
          <video
            className="absolute inset-0 h-full w-full scale-[1.3] object-cover"
            src="/video/hero-banner.mp4"
            poster="/images/cabanas/hero-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden
          />
        </div>
      </div>
      {/* Degradado inferior solo para legibilidad del texto (no velo uniforme) */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black/45 via-black/15 to-transparent" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/30 to-transparent" />

      <div className="relative flex h-full flex-col items-center justify-end px-[var(--gutter)] pb-10 text-center md:pb-32">
        <p data-hero-fade className="text-[0.86rem] font-normal uppercase tracking-[0.3em] text-marfil/90">
          Tu sueño en Gardners Hills
        </p>
        <h1
          id="hero-title"
          data-hero-lines=""
          className="t-italic mt-3 text-[clamp(3.2rem,7.4vw,7.5rem)] leading-[0.95]"
        >
          <span className="line">
            <span>Quédate con nosotros</span>
          </span>
        </h1>

        <nav aria-label="Accesos" data-hero-fade className="mt-16 grid w-full grid-cols-3 text-[0.86rem] font-normal uppercase tracking-[0.24em]">
          <Link href="/la-casa" className="justify-self-start hover:text-rosa transition-colors">Acerca de.</Link>
          <Link href="/cabanas" className="justify-self-center hover:text-rosa transition-colors">Cabañas.</Link>
          <Link href="/reservas" className="justify-self-end hover:text-rosa transition-colors">Reserva.</Link>
        </nav>
      </div>
    </section>
  );
}
