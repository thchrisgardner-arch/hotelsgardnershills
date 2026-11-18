# Gardners Hills — Fase 1: Auditoría

Fecha: 2026-11-18
Fuente de marca: `Proyecto Hotel - Gardners Hills 6,80 GB\Branding Gardners Hills\Manual de marca - Gardners Hills V2.pdf` (90 págs; con contenido hasta la 81, las págs. 82–90 están en blanco)

---

## 1. Estado del proyecto web

- La carpeta de destino existe y está **vacía**, así que el proyecto arranca desde cero.
- Los recursos de marca están en `Documentos\Proyectos Personales\Proyecto Hotel - Gardners Hills 6,80 GB`, fuera de esta carpeta. Al empezar copiaré a `public/` solo lo que se use.

## 2. Manual de marca: lo que dice

**Historia (p. 4–6).** Gardners Hills es un refugio íntimo en la naturaleza en Villanueva, La Guajira, con vistas panorámicas a la sierra. El terreno era la casa de los abuelos. El nombre viene de Christopher Gardner (*En busca de la felicidad*) y representa perseverancia, sueños y nuevos comienzos.

**Concepto (p. 8–10).** «Un refugio en la naturaleza.» / «Un espacio donde el tiempo se detiene.» / «Aquí, el lujo es el tiempo, el espacio y el silencio.»

**Objetivos (p. 12–16).** Conexión auténtica con la naturaleza, diseño minimalista y sostenibilidad, turismo responsable, desconexión digital y ser un referente de hospedaje exclusivo en Villanueva.

**Público (p. 19–21).** Viajeros que buscan privacidad, parejas, profesionales y creativos, turistas con conciencia ecológica, amantes del diseño y la arquitectura, y personas que buscan bienestar y desconexión digital.

**Personalidad (p. 24–27).** Sofisticada, minimalista, auténtica y exclusiva.

**Voz (p. 29).** Inspiradora, minimalista, sensitiva, auténtica y natural.

**Copys aprobados (p. 32–34), en ES y EN:**
- «Bienvenido a un refugio donde el tiempo se detiene y la naturaleza cobra vida. Cada amanecer es una nueva historia que contar.»
- «Descubre la tranquilidad absoluta en un espacio diseñado para que cada detalle hable de paz y exclusividad.»
- «Cierra los ojos, escucha el viento, siente la brisa. Aquí, la vida se experimenta a otro ritmo.»
- «Cada rincón de Gardners Hills es una invitación a respirar profundo y disfrutar el presente.»

**Logo (p. 44–51).**
- Dos versiones: con descriptor «VILLANUEVA · LA GUAJIRA» y sin descriptor (para tamaños pequeños). En Instagram existe una tercera, «HOTEL *in* VILLANUEVA».
- Tamaño mínimo digital: 230×117 px con descriptor y 119×55 px sin descriptor.
- Lleva área de reserva. No se puede deformar, ni aplicarle efectos, ni cambiarle el color fuera de la paleta, ni cambiarle la tipografía.

**Uso del color (p. 54).** Predomina el **rojo carmesí**. El naranja se usa pocas veces, para dar contraste. El rosa nostalgia sirve de complemento. El coral ardiente se usa como fondo en piezas informativas.

**Dirección de arte (p. 68–72).** Fotografía limpia, sutil y con vida, en una paleta cercana a la de la marca. El manual aclara que **las imágenes que muestra son de referencia**.

**Páginas sin contenido.** Relación de tamaños (p. 57), diagramaciones (p. 60–63), recursos gráficos (p. 65–66), valla (p. 74–76) y feed (p. 81).

## 3. Paleta verificada en las muestras

En el PDF, los ocho colores llevan escrito el mismo HEX (#781005), así que el texto no sirve. Medí los píxeles de las muestras en la p. 59 y en los fondos de las páginas de sección, y los valores coinciden entre ambas fuentes:

| Token | Nombre | HEX medido |
|---|---|---|
| `--granate` | Granate imperial | **#781006** |
| `--carmesi` | Rojo carmesí (principal) | **#D1111C** |
| `--coral` | Coral ardiente | **#E84621** |
| `--marfil` | Marfil suave (fondo del manual) | **#FFE9CF** |
| `--rosa` | Rosa nostalgia | **#F5AEBC** |
| `--verde` | Verde bosque | **#005326** |
| `--dorado` | Dorado amanecer | **#F6A000** |
| `--blanco` | Blanco | **#FFFFFF** |

**Contraste (WCAG AA, cálculo aproximado):**
- Granate sobre marfil: ≈ 9,6:1. Válido para cualquier texto.
- Carmesí sobre marfil: ≈ 4,6:1. Válido para texto normal, pero justo en el límite. En cuerpo de texto conviene peso medio y 16 px o más.
- Marfil sobre carmesí: ≈ 4,6:1, igual que el anterior.
- Rosa sobre carmesí (así están las portadas del manual): ≈ 3:1. **Solo vale para títulos grandes.**
- Coral con marfil: ≈ 3:1. **Solo vale para títulos grandes**, nunca para cuerpo de texto.

## 4. Tipografía

| Rol (manual) | Estado | Propuesta provisional |
|---|---|---|
| Títulos: **Palo Compressed Medium** | **No está** ni en el proyecto ni instalada | Instrument Serif (Google Fonts): serif condensada de alto contraste y con cursiva real. Es la más cercana al estilo de los títulos del manual. Se cambia por Palo en cuanto llegue el archivo |
| Subtítulos y cuerpo: **Helvetica Neue / Medium** | Instalada en el PC (licencia de escritorio) | Se carga como pila local (`"Helvetica Neue", Helvetica, Arial`). Para publicar hace falta licencia webfont o un sustituto libre |
| Números y precios: **AKU & AMU** | Instalada como `Aku&Kamu.otf` | Hay que revisar su licencia web antes de incrustarla |
| Carpeta `Font/` | Solo tiene **Androgy Demo** (versión demo, probablemente la del logo) | No se usa en la web: su licencia demo no permite uso comercial, y el logo irá como imagen vectorial |

## 5. Recursos visuales disponibles

- **Logo:** solo en `.ai` (`Logo Oficial.ai`, `Logo.ai`) y 3 JPG de 2000 px para Instagram (en granate, carmesí y una tercera versión). **Hace falta exportarlo a SVG** en versión carmesí, marfil y granate, con y sin descriptor.
- **Fotografía real del hotel: no hay ninguna.**
  - Los archivos «Fotografía Gardners Hills Hotels» son collages de **referencia**: cabañas blancas con arcos, pérgolas de madera y jacuzzi, con el mismo estilo que Garden Hill.
  - Las fotos de las p. 69–72 del manual también son de referencia.
- **Modelo 3D:** renders de SketchUp sin materiales. Sirven para entender la volumetría (cabañas con fachada de arco, piscina, cocina común, muro de cerramiento con puerta en arco y logo), pero no para la web.
- **Planos:**
  - «Primer lote 4 cabañas»: 4 cabañas en dos pares espejados, más un módulo de cocina y sala.
  - Cocina común con isla.
  - Cerramiento con puerta en arco de 200 cm.
  - El render V2 muestra más volúmenes y una piscina. **No sé cuál es la versión final.**
- **Otros archivos:** `Hills Catalogo Precios.ai`, ingresos y gastos, cotizaciones. Son documentos internos y **no los usaré** para precios públicos sin tu confirmación.

## 6. Referencias

| Ref. | Acceso | Lo que tomo |
|---|---|---|
| Hillbrook Estate | ✅ | Títulos cortos de 1–4 palabras, hero partido en dos líneas, bloques que alternan imagen a sangre y texto, actividades en lista con miniaturas, «Book Now» persistente |
| Paisana Living | ⚠️ | La URL carga la web de la agencia PAISANA. Las transiciones no se pueden juzgar desde el texto: las reviso en el navegador en la Fase 3 |
| OSH Hotels | ✅ | Ficha de habitación con foto, nombre, datos clave en viñetas y «Ver habitación», más widget de reserva con llegada, salida y huéspedes |
| MAJA | ⚠️ | Solo se lee la estructura (Hotel / Spa / Studio): es una web hecha con JS. Footer y fondo blanco: los reviso visualmente |
| Casa Momo | ✅ | Revelado de texto palabra por palabra o letra por letra, carrusel de imágenes con contador, tarjetas que entran con el scroll |
| Mas Girbau | ✅ | Índice por anclas (La casa · Esencia · Servicios · Entorno · Actividades · Galería), «Reservar» en el header, en el hero y en una sección de petición de reserva, y cuadrícula de actividades con íconos |
| Grand Hotel Miramare | ✅ | Display grande partido en dos líneas, frases cortas en cursiva y footer con dirección, contacto y frase de cierre |
| 23 Hotel | ✅ | Menú: Habitaciones · Rooftop · Descubre · Cultura · Contacto, «Book Now» en el header y footer con enlaces rápidos, legales, WhatsApp e Instagram |
| Garden Hill (Instagram) | ❌ | Instagram exige iniciar sesión. **Necesito capturas** de sus publicaciones (exterior, interiores, terrazas) |

## 7. Arquitectura propuesta (Home)

Navegación (adaptada de 23 Hotel y Mas Girbau):

**Inicio · El refugio · Cabañas · Experiencias · Alrededores · Galería · Contacto**, con **RESERVAR** fijo.
- En escritorio: header fino que se vuelve sólido (marfil) al hacer scroll, con RESERVAR en carmesí.
- En móvil: menú a pantalla completa sobre carmesí, con enlaces grandes en serif y barra inferior fija «Reservar».

Secciones, en orden:
1. **Preloader:** fondo carmesí, el logo se dibuja o aparece, y la transición abre una máscara hacia el hero. Dura menos de 2 s y se salta si ya se vio en la sesión.
2. **Hero:** imagen panorámica (provisional), «UN REFUGIO / EN LA NATURALEZA.», «Un espacio donde el tiempo se detiene.», «Villanueva · La Guajira · Colombia» y RESERVAR. Composición asimétrica: titular abajo a la izquierda, sin velo oscuro uniforme.
3. **El refugio (Nuestra esencia):** «EL ARTE DE VOLVER A LO ESENCIAL.», historia de la casa de los abuelos, origen del nombre y dos fotos en composición desfasada.
4. **Cabañas:** componente `RoomCard` alimentado por `data/cabanas.ts`. Nombre, capacidad y características quedan en «Por confirmar» hasta tener los datos.
5. **Experiencias:** «EL TIEMPO PARA DISFRUTAR.» con 4 categorías editoriales (Descanso, Naturaleza, Gastronomía, Momentos). Se muestran como concepto, sin presentarlas como servicios disponibles.
6. **Alrededores:** «EXPLORA LAS ACTIVIDADES QUE TE ESPERAN CERCA.» Lista con íconos de trazo fino alimentada por `data/actividades.ts`. Sin distancias hasta que estén verificadas.
7. **Galería:** mosaico editorial de proporciones mixtas con visor a pantalla completa.
8. **Reservas:** «TU PRÓXIMA ESCAPADA COMIENZA AQUÍ.» con llegada, salida, huéspedes y «Consultar disponibilidad». Por ahora abre WhatsApp o correo con los datos ya escritos. No simula disponibilidad.
9. **Footer:** logo grande, «VILLANUEVA · LA GUAJIRA», «Nos vemos donde el tiempo se detiene.», enlaces, contacto, Instagram y legales. Para el fondo propongo granate, que equilibra la página marfil.

## 8. Stack propuesto

Next.js (App Router) + TypeScript + Tailwind + GSAP/ScrollTrigger + Lenis + Lucide.

Estructura de carpetas: `components/{layout,navigation,sections,rooms,gallery,booking,ui}`, `data/`, `hooks/`, `lib/`, `public/{images,fonts}`.

Incluye además:
- Movimiento reducido (`prefers-reduced-motion`).
- Metadatos y Open Graph, `sitemap.ts` y `robots.ts`.
- `next/image` para optimizar las imágenes.
- Preview en el puerto **5205**.

## 9. Lo que falta (bloquea contenido real, no el diseño)

1. **Logo en SVG**, en sus variantes.
2. **Archivo de Palo Compressed Medium** y licencias web de Helvetica Neue y AKU & AMU.
3. **Fotografía:** el hotel todavía no tiene fotos. Hay que decidir si se usan imágenes provisionales generadas con IA (cabañas blancas con arco, sierra, madera, al estilo del manual), marcadas en `data/` como provisionales, o bloques de color de marca sin foto.
4. **Cabañas:** cuántas habrá en la apertura (¿las 4 del primer lote?), nombres, capacidad y características (¿jacuzzi o terraza propia?).
5. **Instalaciones confirmadas:** ¿piscina?, ¿cocina común?, ¿desayuno?
6. **Experiencias confirmadas** y lista de **actividades cercanas** con datos verificados.
7. **Contacto:** WhatsApp, correo, Instagram, dirección o ubicación en el mapa.
8. **Motor de reservas** (proveedor) o confirmación de que por ahora será WhatsApp.
9. **Capturas de Garden Hill** (Instagram).
10. Textos legales (privacidad y términos).
11. ¿Versión en inglés? El manual tiene copys bilingües.
