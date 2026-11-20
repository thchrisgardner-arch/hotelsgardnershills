import { redirect } from "next/navigation";
import { getLang, type LangParams } from "@/lib/lang";
import { localizar } from "@/lib/routes";

/** Las actividades ahora viven dentro de Servicios */
export default async function ActividadesPage({ params }: LangParams) {
  const lang = await getLang(params);
  redirect(localizar("/servicios#actividades", lang));
}
