import type { Metadata } from "next";
import { Suspense } from "react";
import { MotionController } from "@/components/layout/MotionController";
import { Motor } from "@/components/booking/Motor";

export const metadata: Metadata = {
  title: "Reservas",
  description: "Reserva tu cabaña en Gardners Hills, hotel boutique en Villanueva, La Guajira.",
  alternates: { canonical: "/reservas" },
};

/** Página de reserva (estructura del motor D-Edge de la referencia). Todos los CTA «Reservar» llegan aquí. */
export default function ReservasPage() {
  return (
    <>
      <MotionController />
      <main>
        <Suspense>
          <Motor />
        </Suspense>
      </main>
    </>
  );
}
