import { Package } from "@prisma/client";

interface SafariPackageJsonLdProps {
  package: Package;
}

export function SafariPackageJsonLd({
  package: pkg,
}: SafariPackageJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TourPackage",
    name: pkg.name,
    description: pkg.description,
    image: pkg.imageUrl,
    url: `https://yalawildlife.com/safari-packages/${pkg.slug}`,

    // ✅ NEW: Enhanced Pricing Structure for SEO
    offers: {
      "@type": "Offer",
      price: pkg.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `https://yalawildlife.com/safari-packages/${pkg.slug}`,
      priceSpecification: [
        {
          "@type": "UnitPriceSpecification",
          price: pkg.price,
          priceCurrency: "USD",
          name: "Jeep Base Price (Fixed)",
        },
        {
          "@type": "UnitPriceSpecification",
          price: pkg.mealPrice || 0,
          priceCurrency: "USD",
          name: "Meal Cost (Per Person)",
        },
        {
          "@type": "UnitPriceSpecification",
          price: pkg.ticketPrice || 0,
          priceCurrency: "USD",
          name: "Park Entrance Ticket (Per Person)",
        }
      ]
    },

    provider: {
      "@type": "TourOperator",
      name: "Yala Wildlife Safari",
      url: "https://yalawildlife.com",
      areaServed: {
        "@type": "TouristAttraction",
        name: "Yala National Park",
        address: {
          "@type": "PostalAddress",
          addressCountry: "Sri Lanka",
          addressRegion: "Southern Province",
        },
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}