import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { privacidad, ACTUALIZADO } from "@/data/legales";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: "Política de privacidad de Gardners Hills, hotel boutique en Villanueva, La Guajira.",
  alternates: { canonical: "/privacidad" },
};

export default function Page() {
  return <LegalPage titulo="Privacidad" ruta="/privacidad" actualizado={ACTUALIZADO} intro={privacidad.intro} secciones={privacidad.secciones} />;
}
