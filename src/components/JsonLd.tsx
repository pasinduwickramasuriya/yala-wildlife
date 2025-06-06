import { siteConfig } from "@/lib/seo-config";

export function OrganizationJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TravelAgency",
          name: "Yala Wildlife Safari",
          url: siteConfig.url,
          logo: `${siteConfig.url}/logo.png`,
          description: siteConfig.description,
          address: {
            "@type": "PostalAddress",
            addressCountry: "Sri Lanka",
            addressRegion: "Southern Province",
            addressLocality: "Yala",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: "6.3016",
            longitude: "81.4289",
          },
          sameAs: [siteConfig.links.facebook, siteConfig.links.instagram],
        }),
      }}
    />
  );
}

export function SafariPackageJsonLd({
  name,
  description,
  price,
  image,
  slug,
}: {
  name: string;
  description: string;
  price: number;
  image: string;
  slug: string;
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TourPackage",
          name: name,
          description: description,
          price: price,
          priceCurrency: "USD",
          image: image,
          url: `${siteConfig.url}/safari-packages/${slug}`,
          provider: {
            "@type": "TravelAgency",
            name: "Yala Wildlife Safari",
            url: siteConfig.url,
          },
          areaServed: {
            "@type": "TouristAttraction",
            name: "Yala National Park",
            address: {
              "@type": "PostalAddress",
              addressCountry: "Sri Lanka",
              addressRegion: "Southern Province",
            },
          },
        }),
      }}
    />
  );
}

export function LocalBusinessJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Yala Wildlife Safari",
          image: `${siteConfig.url}/logo.png`,
          "@id": siteConfig.url,
          url: siteConfig.url,
          telephone: "+94-XX-XXX-XXXX",
          priceRange: "$$",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Your Street Address",
            addressLocality: "Yala",
            addressRegion: "Southern Province",
            postalCode: "XXXXX",
            addressCountry: "LK",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 6.3016,
            longitude: 81.4289,
          },
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ],
              opens: "05:00",
              closes: "18:30",
            },
          ],
          sameAs: [siteConfig.links.facebook, siteConfig.links.instagram],
        }),
      }}
    />
  );
}
