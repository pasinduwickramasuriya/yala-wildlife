interface Package {
  id: string
  name: string
  description: string
  imageUrl: string
  price: number
  slug: string
}

interface SafariPackageJsonLdProps {
  package: Package
}t { Package } from "@prisma/client";

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
    price: pkg.price,
    priceCurrency: "USD",
    image: pkg.imageUrl,
    url: `https://yalawildlife.com/safari-packages/${pkg.slug}`,
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
