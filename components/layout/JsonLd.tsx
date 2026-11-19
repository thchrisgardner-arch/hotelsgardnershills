import { site } from "@/data/site";
import { cabanas, totalCabanas } from "@/data/cabanas";

/**
 * Datos estructurados (schema.org) del hotel para buscadores.
 * Dirección exacta, geolocalización y redes se añaden al confirmarlas en data/site.ts.
 */
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: site.name,
    description: "Hotel boutique de cabañas en Villanueva, La Guajira. Un refugio en la naturaleza donde el tiempo se detiene.",
    url: site.url,
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
      { "@type": "LocationFeatureSpecification", name: "Gimnasio", value: true },
      { "@type": "LocationFeatureSpecification", name: "Restaurante y bar", value: true },
    ],
    containsPlace: cabanas.map((c) => ({
      "@type": "HotelRoom",
      name: c.nombre,
      url: `${site.url}/cabanas/${c.slug}`,
      floorSize: { "@type": "QuantitativeValue", value: parseInt(c.area), unitCode: "MTK" },
    })),
    sameAs: [site.instagram, site.facebook].filter(Boolean),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
