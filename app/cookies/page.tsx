import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { cookies, ACTUALIZADO } from "@/data/legales";

export const metadata: Metadata = {
  title: "Política de cookies",
  description: "Política de cookies de Gardners Hills, hotel boutique en Villanueva, La Guajira.",
  alternates: { canonical: "/cookies" },
};

export default function Page() {
  return <LegalPage titulo="Cookies" ruta="/cookies" actualizado={ACTUALIZADO} intro={cookies.intro} secciones={cookies.secciones} />;
}
