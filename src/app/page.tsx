// import type { Metadata } from "next";
// import { siteConfig } from "@/lib/seo-config";
// import ClientHome from "./ClientHome";

// export const metadata: Metadata = {
//   title:
//     siteConfig.name ||
//     "Book Yala Safari Jeeps | Best Wildlife Tours in Yala National Park",
//   description:
//     siteConfig.description ||
//     "Expert-guided Yala National Park safari tours with comfortable jeeps. Book your wildlife adventure to spot leopards, elephants, and more. Best rates guaranteed.",
//   openGraph: {
//     title:
//       siteConfig.name ||
//       "Book Yala Safari Jeeps | Best Wildlife Tours in Yala National Park",
//     description:
//       siteConfig.description ||
//       "Expert-guided Yala National Park safari tours with comfortable jeeps. Book your wildlife adventure to spot leopards, elephants, and more.",
//     url: siteConfig.url || "/",
//     type: "website",
//   },
// };
// export default function Home() {
//   return <ClientHome />;
// }

import type { Metadata } from "next";
import { siteConfig } from "@/lib/seo-config";
import ClientHome from "./ClientHome";
import {
  organizationSchema,
  websiteSchema,
  localBusinessSchema,
} from "@/lib/schema";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url || "https://yalawildlife.com"),

  title:
    "Best Yala Safari Tours & Jeep Service | #1 Wildlife Experience in Sri Lanka",

  description:
    "Experience unforgettable Yala National Park safari tours with Sri Lanka's top-rated wildlife guides. Guaranteed leopard sightings, luxury 4x4 jeeps, and expert naturalists. Book your adventure today! Best rates for Yala safari packages.",

  keywords: [
    // Primary keywords
    "yala",
    "yala safari",
    "yala national park",
    "yala wildlife",
    "yala safari tours",
    "yala jeep service",

    // Location keywords
    "yala sri lanka",
    "yala wildlife tours",
    "safari yala",
    "visit yala",

    // Service keywords
    "yala safari booking",
    "yala tour packages",
    "yala safari prices",
    "best yala tours",

    // Wildlife keywords
    "yala leopard safari",
    "yala elephant safari",
    "wildlife tours sri lanka",
    "leopard watching yala",
  ],

  openGraph: {
    type: "website",
    title:
      "Best Yala Safari Tours & Jeep Service | #1 Wildlife Experience in Sri Lanka",
    description:
      "Experience unforgettable Yala National Park safari tours with Sri Lanka's top-rated wildlife guides. Guaranteed leopard sightings, luxury 4x4 jeeps, and expert naturalists.",
    url: siteConfig.url,
    siteName: "Yala Wildlife Safari",
    images: [
      {
        url: `${siteConfig.url}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Yala Wildlife Safari - Premium Safari Experience in Sri Lanka",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Best Yala Safari Tours & Jeep Service | #1 Wildlife Experience",
    description:
      "Experience unforgettable Yala National Park safari tours. Guaranteed leopard sightings, luxury jeeps, expert guides.",
    images: [`${siteConfig.url}/og-image.jpg`],
    creator: "@yalawildlife",
  },

  alternates: {
    canonical: siteConfig.url,
  },
};

export default function Home() {
  return (
    <>
      <ClientHome />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            organizationSchema,
            websiteSchema,
            localBusinessSchema,
            {
              "@context": "https://schema.org",
              "@type": "Product",
              name: "Yala Safari Tours",
              description:
                "Professional wildlife safari tours in Yala National Park with expert guides and luxury jeeps",
              image: `${siteConfig.url}/safari-jeep.jpg`,
              offers: {
                "@type": "AggregateOffer",
                priceCurrency: "LKR",
                priceRange: "$$",
                availability: "https://schema.org/InStock",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "150",
              },
            },
          ]),
        }}
      />
    </>
  );
}
