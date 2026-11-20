import { NextResponse, type NextRequest } from "next/server";
import { interna } from "@/lib/routes";

/**
 * Idiomas por URL:
 *  - /…          → español (reescribe a /es/…)
 *  - /en/…       → inglés, con slugs propios (/en/cabins → /en/cabanas)
 *  - /es/…       → redirige a la versión sin prefijo
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/es" || pathname.startsWith("/es/")) {
    const url = req.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }

  const url = req.nextUrl.clone();
  url.pathname = interna(pathname);
  return NextResponse.rewrite(url);
}

export const config = {
  // Todo menos archivos estáticos, internos de Next y rutas de API
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
