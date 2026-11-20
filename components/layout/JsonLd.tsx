import { site } from "@/data/site";
import { cabanasL, totalCabanas } from "@/data/cabanas";
import { localizar, type Lang } from "@/lib/routes";

/**
 * Datos estructurados (schema.org) del hotel para buscadores, en el idioma de la página.
 * Dirección exacta, geolocalización y redes se añaden al confirmarlas en data/site.ts.
 */
export function JsonLd({ lang }: { lang: Lang }) {
  const es = lang === "es";
  const data = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: site.name,
    inLanguage: es ? "es-CO" : "en",
    description: es
      ? "Hotel de cabañas en Villanueva, La Guajira. Un refugio en la naturaleza donde el tiempo se detiene."
      : "Cabin hotel in Villanueva, La Guajira, Colombia. A refuge in nature where time stands still.",
    url: `${site.url}${localizar("/", lang)}`,
    image: `${site.url}/opengraph-image`,
    email: site.contact.email ?? undefined,
    telephone: site.contact.phone ?? undefined,
    address: {
      "@type": "PostalAddress",
      ...(site.location.address ? { streetAddress: site.location.address } : {}),
      addressLocality: site.location.town,
      addressRegion: site.location.region,
      addressCountry: "CO",
    },
    numberOfRooms: totalCabanas,
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Spa", value: true },
      { "@type": "LocationFeatureSpecification", name: es ? "Gimnasio" : "Gym", value: true },
      { "@type": "LocationFeatureSpecification", name: es ? "Restaurante y bar" : "Restaurant and bar", value: true },
    ],
    containsPlace: cabanasL(lang).map((c) => ({
      "@type": "HotelRoom",
      name: c.nombre,
      url: `${site.url}${localizar(`/cabanas/${c.slug}`, lang)}`,
      floorSize: { "@type": "QuantitativeValue", value: parseInt(c.area), unitCode: "MTK" },
      occupancy: { "@type": "QuantitativeValue", maxValue: c.maxHuespedes, description: c.capacidad },
    })),
    sameAs: [site.instagram, site.facebook, site.youtube, site.linkedin].filter(Boolean),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
