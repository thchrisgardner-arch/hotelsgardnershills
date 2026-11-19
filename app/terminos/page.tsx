import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { terminos, ACTUALIZADO } from "@/data/legales";

export const metadata: Metadata = {
  title: "Términos y condiciones",
  description: "Términos y condiciones de Gardners Hills, hotel boutique en Villanueva, La Guajira.",
  alternates: { canonical: "/terminos" },
};

export default function Page() {
  return <LegalPage titulo="Términos" ruta="/terminos" actualizado={ACTUALIZADO} intro={terminos.intro} secciones={terminos.secciones} />;
}
