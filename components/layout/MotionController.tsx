"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { finishIntro, motion, onIntroDone, prefersReducedMotion, scrollToHash } from "@/lib/motion";

/**
 * Orquesta todo el movimiento del sitio a partir de atributos data-*:
 *  - data-reveal-lines   → cada .line > span sube desde una máscara
 *  - data-reveal-media   → la imagen se descubre con clip-path y zoom suave
 *  - data-reveal         → aparición sutil (opacidad + desplazamiento)
 *  - data-parallax="n"   → parallax moderado (n = intensidad, p. ej. 0.12)
 *  - data-hero-*         → se animan al terminar el preloader
 */
export function MotionController({ intro = false }: { intro?: boolean }) {
  useEffect(() => {
    const reduced = prefersReducedMotion();
    gsap.registerPlugin(ScrollTrigger);
    // Páginas internas: no hay preloader, el contenido arranca de inmediato
    if (!intro) finishIntro();

    // La intro siempre abre en el hero (sin restaurar scroll), salvo que se llegue con un ancla
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    if (!location.hash) window.scrollTo(0, 0);

    // Navegación por anclas (también funciona sin Lenis)
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const hash = a.getAttribute("href")!;
      if (hash.length < 2) return;
      e.preventDefault();
      scrollToHash(hash);
      history.replaceState(null, "", hash);
    };
    document.addEventListener("click", onClick);

    if (reduced) {
      onIntroDone(() => {});
      return () => document.removeEventListener("click", onClick);
    }

    // Lenis: scroll suave sincronizado con ScrollTrigger
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    motion.lenis = lenis;
    if (!motion.introDone) lenis.stop(); // el preloader lo reanuda al terminar
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      // Estados iniciales. Al navegar sin recargar, GSAP podía heredar un desplazamiento en px
      // (y) además del yPercent; se limpia y se fija y: 0 para que el título siempre vuelva a su sitio.
      gsap.set("[data-reveal-lines] .line > span, [data-hero-lines] .line > span", { clearProps: "transform" });
      gsap.set("[data-reveal-lines] .line > span, [data-hero-lines] .line > span", { yPercent: 110, y: 0 });
      gsap.set("[data-reveal]", { autoAlpha: 0, y: 28 });
      gsap.set("[data-hero-fade]", { autoAlpha: 0, y: 16 });
      gsap.set("[data-reveal-media]", { clipPath: "inset(100% 0% 0% 0%)" });
      gsap.set("[data-reveal-media] [data-media-inner]", { scale: 1.18 });

      // Títulos por líneas
      gsap.utils.toArray<HTMLElement>("[data-reveal-lines]").forEach((el) => {
        gsap.to(el.querySelectorAll(".line > span"), {
          yPercent: 0,
          y: 0,
          duration: 1.2,
          ease: "power4.out",
          stagger: 0.09,
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      // Bloques fotográficos (excepto el del hero, que tiene su propia secuencia)
      gsap.utils.toArray<HTMLElement>("[data-reveal-media]:not([data-hero-media])").forEach((el) => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 85%" } });
        tl.to(el, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.out" }).to(
          el.querySelector("[data-media-inner]"),
          { scale: 1, duration: 1.8, ease: "expo.out" },
          0
        );
      });

      // Apariciones sutiles
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.to(el, {
          autoAlpha: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          delay: Number(el.dataset.revealDelay || 0),
          scrollTrigger: { trigger: el, start: "top 90%" },
        });
      });

      // Parallax moderado
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const k = Number(el.dataset.parallax || 0.1);
        gsap.fromTo(
          el,
          { yPercent: k * 100 },
          {
            yPercent: -k * 100,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      });

      // Hero: el bloque panorámico se expande a sangre al hacer scroll
      const heroMedia = document.querySelector<HTMLElement>("[data-hero-expand]");
      if (heroMedia) {
        gsap.fromTo(
          heroMedia,
          { clipPath: "inset(0% 6% 0% 6%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
            scrollTrigger: { trigger: heroMedia, start: "top 85%", end: "top 15%", scrub: true },
          }
        );
      }
    });

    // Secuencia del hero tras la intro
    const off = onIntroDone(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.to("[data-hero-lines] .line > span", { yPercent: 0, y: 0, duration: 1.4, stagger: 0.12 })
        .to("[data-hero-fade]", { autoAlpha: 1, y: 0, duration: 1, stagger: 0.08 }, "-=0.9")
        .to("[data-hero-media]", { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "expo.inOut" }, "-=1.2")
        .to("[data-hero-media] [data-media-inner]", { scale: 1, duration: 2, ease: "expo.out" }, "<");
    });

    /*
     * Recalcular posiciones de los disparadores. Antes solo se hacía en «load», que espera a que
     * baje el video del hero (11 MB): hasta entonces los títulos de abajo quedaban con posiciones
     * viejas (la galería fijada añade alto después) y no aparecían. Ahora se recalcula pronto,
     * cuando cargan las fuentes y cada vez que cambia el alto de la página.
     */
    let lastH = 0;
    let raf = 0;
    const refresh = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        lastH = document.body.scrollHeight;
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
      });
    };
    // Respaldo para la navegación interna: lo que ya está en pantalla se muestra aunque el disparador no salte
    const mostrarVisibles = () => {
      document.querySelectorAll<HTMLElement>("[data-reveal-lines]").forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) gsap.to(el.querySelectorAll(".line > span"), { yPercent: 0, y: 0, duration: 1.2, ease: "power4.out", stagger: 0.09 });
      });
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) gsap.to(el, { autoAlpha: 1, y: 0, duration: 1.1, ease: "power3.out" });
      });
    };
    const timers = [setTimeout(refresh, 150), setTimeout(refresh, 800), setTimeout(refresh, 2000), setTimeout(mostrarVisibles, 900)];
    document.fonts?.ready.then(refresh).catch(() => {});
    let debounce: ReturnType<typeof setTimeout> | undefined;
    const ro = new ResizeObserver(() => {
      if (Math.abs(document.body.scrollHeight - lastH) < 2) return;
      clearTimeout(debounce);
      debounce = setTimeout(refresh, 200);
    });
    ro.observe(document.body);
    window.addEventListener("load", refresh);

    return () => {
      off();
      timers.forEach(clearTimeout);
      clearTimeout(debounce);
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener("click", onClick);
      window.removeEventListener("load", refresh);
      ctx.revert();
      gsap.ticker.remove(tick);
      lenis.destroy();
      motion.lenis = null;
    };
  }, [intro]);

  return null;
}
