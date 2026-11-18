"use client";

import { useEffect, useState } from "react";

/** Barra fija de reserva en móvil: aparece tras el hero y se oculta en reservas y footer */
export function MobileBookBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const visible = new Set<string>();
    const update = () => setShow(window.scrollY > window.innerHeight * 0.7 && visible.size === 0);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? visible.add(e.target.id) : visible.delete(e.target.id)));
        update();
      },
      { threshold: 0.05 }
    );
    ["reservas", "contacto"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", update);
    };
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-30 p-3 transition-transform duration-700 ease-[var(--ease-soft)] md:hidden ${
        show ? "translate-y-0" : "translate-y-[120%]"
      }`}
    >
      <a
        href="#reservas"
        tabIndex={show ? 0 : -1}
        aria-hidden={!show}
        className="t-label flex w-full items-center justify-between bg-carmesi px-5 py-4 text-marfil"
      >
        <span>Reservar</span>
        <span aria-hidden>→</span>
      </a>
    </div>
  );
}
