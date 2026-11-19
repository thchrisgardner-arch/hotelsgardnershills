# Gardners Hills — Pendientes

Estado al 2026-11-18: el Home se rehízo siguiendo el XD («Home - Gardner Hills») y los wireframes V2 (`Downloads\TeraBox\Wireframe Web\V2`). Está revisado **en escritorio**. La versión móvil está construida, pero todavía no se ha revisado.

Para arrancarlo: `npm run dev` → http://localhost:5206 (preview "gardners-hills").

## Recursos usados

| Recurso | Origen | Notas |
|---|---|---|
| `public/video/hero-banner.mp4` | `TeraBox\Video Pagina\Banner Principal - Gardners Hills.mp4` | 2560×1440, 16 s, 11 MB. El video trae franjas negras (158 px arriba y abajo); se recortan con `scale-[1.3]`. **Comprimir para producción** a 1920 px y unos 3–4 MB, y exportarlo sin franjas |
| `public/video/video-001.mp4` | `TeraBox\Video Pagina\Video 001.mp4` | No se usa: es una grabación de pantalla de celular, en vertical y con la interfaz visible. Se puede borrar |
| `public/images/cabanas/*.jpg` | Fotogramas del video del hero (cabañas reales, confirmado por el cliente) | Provisionales hasta tener fotografía profesional |
| Fotos de spa, gym, piscina y bañera del XD | Son de **MAJA Canggu (Bali)** | **No se usan.** Spa y Gym van en bloque rosa hasta tener fotos propias |
| Textos del XD y de los wireframes | Muchos son de MAJA, Mas Girbau o Hillbrook (Barcelona, Whangamata, NZD) | Solo se tomó la estructura; los textos salen del manual de marca |

## Dónde se cambia cada cosa

| Qué | Archivo |
|---|---|
| Contacto (WhatsApp, correo y teléfono ya confirmados), Instagram, Facebook, dirección | `data/site.ts` |
| Pestañas Hotel / Spa / Gym | `data/servicios.ts` |
| Cabañas | `data/cabanas.ts` |
| Experiencias | `data/experiencias.ts` |
| Actividades cercanas | `data/actividades.ts` |
| Galería (carrusel en arcos) | `data/galeria.ts` |
| Color único de los espacios sin foto | `lib/brand.ts` → `PLACEHOLDER_COLOR` (rosa) |

## Falta del cliente

- [ ] Dirección real. La del wireframe («162F Whitipirorua Road») es de Nueva Zelanda, de una plantilla
- [ ] Instagram y Facebook
- [ ] Dominio definitivo (se usa `gardnerhills.co`, deducido del correo)
- [ ] Fotos de spa, gym, interiores y actividades
- [ ] Spa y gym: tratamientos, horarios y equipamiento
- [ ] Cabañas: validar los datos provisionales de `data/cabanas.ts` (4 Medium de 28 m² y 6 Premium de 36 m² + patio de 14 m² con tina; camas, capacidad y dotación inventadas con autorización, tomando como referencia las habitaciones de OSH)
- [ ] Experiencias y actividades confirmadas
- [ ] Logo en SVG; archivo de Palo Compressed Medium y licencias web de las fuentes
- [ ] Motor de reservas. Por ahora el formulario abre WhatsApp con la solicitud ya escrita
- [ ] Textos legales: borrador en `data/legales.ts`. Faltan razón social, NIT, RNT, dirección, horarios de check-in/out y política de cancelación. Que lo revise un abogado
- [ ] ID de Google Analytics (`NEXT_PUBLIC_GA_ID` en Vercel). Solo se carga si el visitante acepta cookies

## Páginas (2026-11-19)

Sitio multipágina: `/`, `/cabanas`, `/cabanas/medium`, `/cabanas/premium`, `/servicios`, `/gastronomia`, `/actividades`, `/galeria`, `/reservas`, `/contacto`, `/terminos`, `/privacidad`, `/cookies`.
Cabecera (con selector ES / EN), footer, barra de reservas, WhatsApp y aviso de cookies son comunes (en `app/layout.tsx`).

Sitio multipágina: `/`, `/la-casa`, `/cabanas`, `/servicios`, `/actividades`, `/galeria`, `/reservas`, `/contacto`.
Cabecera, footer, barra de reservas y WhatsApp son comunes (en `app/layout.tsx`).

- `/reservas`: no hay tarifas publicadas hasta tenerlas (aparecerán en el calendario vía `data/reservas.ts`)
- `/contacto`: el mapa se activa al rellenar `location.mapsUrl` en `data/site.ts`; el formulario abre el correo
- `/servicios` y `/actividades`: Spa, Gym y actividades siguen en bloque rosa hasta tener fotos

## Siguiente en desarrollo

- [ ] Revisar móvil y tablet de todas las páginas (en pausa: por ahora solo escritorio)
- [ ] Inglés: el selector ya traduce cabecera, menú, footer y aviso de cookies; falta el contenido de cada página y la barra de reservas
- [ ] Comprimir `public/video/hero-banner.mp4` (11 MB) a unos 3–4 MB; requiere ffmpeg
- [ ] Diario/blog con SEO local
- [x] Datos estructurados (Hotel) e imagen Open Graph
