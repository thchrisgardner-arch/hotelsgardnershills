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
- [ ] Cabañas: nombres, capacidad, características
- [ ] Experiencias y actividades confirmadas
- [ ] Logo en SVG; archivo de Palo Compressed Medium y licencias web de las fuentes
- [ ] Motor de reservas. Por ahora el formulario abre WhatsApp con la solicitud ya escrita
- [ ] Textos legales

## Siguiente en desarrollo

- [ ] Revisar móvil y tablet
- [ ] Páginas interiores de los wireframes: Actividades, Servicios, Tarifas/Booking, Galería, Contacto (con mapa)
- [ ] Datos estructurados `LodgingBusiness` e imagen Open Graph
