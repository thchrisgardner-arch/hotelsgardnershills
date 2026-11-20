import { redirect } from "next/navigation";

/** Las actividades ahora viven dentro de Servicios */
export default function ActividadesPage() {
  redirect("/servicios#actividades");
}
