import type { Metadata } from "next";
import ClientHome from "./ClientHome";
import {
  organizationSchema,
  websiteSchema,
  localBusinessSchema,
} from "@/lib/schema";
import DotsBackground from "@/components/DotsBackground";

// ✅ FIXED: Use consistent static URL for canonical purposes
const BASE_URL = "https://www.yalawildlife.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: "Yala Safari Tours | #1 Wildlife Experience Sri Lanka",
  description: "Premium Yala National Park safari tours. Expert guides, guaranteed leopard sightings, luxury jeeps. Book Sri Lanka's top wildlife experience now!",

  keywords: [
    "yala",
    "yala safari",
    "yala national park",
    "sri lanka safari",
    "yala wildlife tours",
    "yala safari booking",
    "yala jeep safari",
    "yala safari tours",
    "yala wildlife",
    "yala leopard",
    "yala elephant",
    "best yala safari tours sri lanka",
    "yala national park safari booking",
    "guaranteed leopard sighting yala",
    "luxury yala safari experience",
    "private yala safari with guide",
    "yala wildlife photography tours",
    "premium yala safari packages",
    "yala safari jeep service",
    "expert guide yala safari",
    "professional yala safari operator",
    "top rated yala safari company",
    "tissamaharama yala safari",
    "kataragama safari tours",
    "hambantota yala tours",
    "yala safari from colombo",
    "yala safari from kandy",
    "yala safari from galle",
    "yala safari from ella",
    "yala safari from mirissa",
    "southern province safari",
    "palatupana entrance yala",
    "kirinda yala safari",
    "buttala yala tours",
    "yala leopard safari",
    "yala elephant watching",
    "sri lanka leopard tours",
    "yala bird watching tours",
    "yala sloth bear safari",
    "yala crocodile spotting",
    "leopard spotting yala",
    "elephant herd yala",
    "wildlife photography yala",
    "big game safari yala",
    "yala predator safari",
    "yala nocturnal animals",
    "half day yala safari",
    "full day yala safari",
    "morning yala safari",
    "evening yala safari",
    "budget yala safari",
    "luxury yala jeep service",
    "private yala safari",
    "group yala safari",
    "family yala safari",
    "yala camping safari",
    "multi day yala safari",
    "customized yala tours",
    "best yala safari operator",
    "top rated yala tours",
    "yala vs udawalawe safari",
    "yala vs wilpattu park",
    "best time visit yala",
    "yala safari season",
    "yala park opening times",
    "yala safari weather",
    "dry season yala safari",
    "wet season yala tours",
    "book yala safari online",
    "yala safari advance booking",
    "yala safari last minute",
    "yala safari packages sri lanka",
    "yala safari deals offers",
    "cheap yala safari tours",
    "yala safari reservation",
    "yala safari availability",
    "yala safari price list",
    "yala safari cost per person",
    "yala safari adventure",
    "yala safari experience",
    "yala safari journey",
    "yala safari expedition",
    "yala safari trip",
    "yala safari holiday",
    "yala safari vacation",
    "yala eco tourism",
    "sustainable yala safari",
    "responsible yala tourism",
    "educational yala tours",
    "conservation yala safari",
    "sri lanka wildlife tours",
    "sri lanka national parks",
    "sri lanka eco tourism",
    "best safari sri lanka",
    "sri lanka adventure tours",
    "wildlife photography sri lanka",
    "nature tours sri lanka",
    "conservation tourism sri lanka",
    "sri lanka biodiversity tours",
    "endemic species sri lanka",
    "4x4 yala safari",
    "jeep tour yala",
    "open vehicle safari",
    "yala game drive",
    "yala nature tour",
    "yala park tour",
    "yala wilderness tour",
    "safari vehicle rental yala",
    "luxury safari jeep yala",
    "air conditioned safari vehicle",
    "yala block 1 safari",
    "yala zone 1 tours",
    "yala block 2 safari",
    "yala zone 2 experience",
    "patanangala beach yala",
    "sithulpawwa yala",
    "kumana national park",
    "bundala wetland safari"
  ],

  other: {
    "geo.region": "LK-82",
    "geo.placename": "Yala National Park, Tissamaharama, Southern Province, Sri Lanka",
    "geo.position": "6.3747;81.1185",
    "ICBM": "6.3747, 81.1185",
    "DC.title": "Yala Safari Tours | #1 Wildlife Experience Sri Lanka",
    "DC.creator": "Yala Wildlife Safari",
    "DC.subject": "Yala Safari, Wildlife Tours, Sri Lanka Tourism, Leopard Safari, Elephant Watching, National Park Tours",
    "DC.description": "Premium Yala National Park safari tours with expert guides, guaranteed wildlife sightings, and luxury jeep service",
    "DC.publisher": "Yala Wildlife Safari",
    "DC.contributor": "Expert Safari Guides, Wildlife Naturalists, Conservation Specialists",
    "DC.date": new Date().toISOString(),
    "DC.type": "Tourism Service, Wildlife Tours, Eco Tourism",
    "DC.format": "text/html",
    "DC.identifier": BASE_URL,
    "DC.language": "en",
    "DC.coverage": "Yala National Park, Southern Province, Sri Lanka",
    "DC.rights": "Copyright 2025 Yala Wildlife Safari",
    "robots": "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    "googlebot": "index, follow, max-image-preview:large, max-snippet:-1",
    "bingbot": "index, follow, max-image-preview:large",
    "yandexbot": "index, follow",
    "revisit-after": "1 days",
    "rating": "general",
    "distribution": "global",
    "theme-color": "#22c55e",
    "msapplication-TileColor": "#22c55e",
    "msapplication-TileImage": "/mstile-144x144.png",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "Yala Safari",
    "format-detection": "telephone=yes, address=yes, email=yes",
    "news_keywords": "yala safari, sri lanka wildlife, leopard spotting, elephant watching, eco tourism, national park, conservation, biodiversity",
    "article:section": "Travel & Tourism",
    "article:tag": "Yala Safari, Wildlife Tours, Sri Lanka Tourism, Eco Travel, Adventure Tourism",
    "article:author": "Yala Wildlife Safari",
    "article:publisher": "Yala Wildlife Safari",
    "article:published_time": new Date().toISOString(),
    "business:contact_data:street_address": "Safari Base, Tissamaharama Road",
    "business:contact_data:locality": "Tissamaharama",
    "business:contact_data:region": "Southern Province",
    "business:contact_data:postal_code": "82600",
    "business:contact_data:country_name": "Sri Lanka",
    "business:contact_data:phone_number": "+94-778-158-004",
    "business:contact_data:website": BASE_URL,
  },

  openGraph: {
    type: "website",
    title: "Yala Safari Tours | #1 Wildlife Experience Sri Lanka",
    description: "Premium Yala National Park safari tours. Expert guides, guaranteed leopard sightings, luxury jeeps. Book your adventure today!",
    url: BASE_URL, // ✅ Always points to main domain only
    siteName: "Yala Wildlife Safari | Premier Safari Experience",
    locale: "en_US",
    images: [
      {
        url: `${BASE_URL}/og-yala-safari-main.jpg`,
        width: 1200,
        height: 630,
        alt: "Yala Wildlife Safari - Premium Safari Experience in Sri Lanka",
        type: "image/jpeg",
      },
      {
        url: `${BASE_URL}/og-leopard-spotting.jpg`,
        width: 1200,
        height: 630,
        alt: "Leopard Spotting in Yala National Park Safari Tour",
        type: "image/jpeg",
      },
      {
        url: `${BASE_URL}/og-elephant-herd.jpg`,
        width: 1200,
        height: 630,
        alt: "Wild Elephant Herd Safari Experience in Yala",
        type: "image/jpeg",
      },
      {
        url: `${BASE_URL}/og-luxury-jeep.jpg`,
        width: 1200,
        height: 630,
        alt: "Luxury Safari Jeep Tour in Yala National Park",
        type: "image/jpeg",
      }
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@yalawildlife",
    creator: "@yalawildlife",
    title: "Yala Safari Tours | #1 Wildlife Experience",
    description: "Premium Yala National Park safari tours. Expert guides, guaranteed leopard sightings, luxury jeeps. Book now!",
    images: {
      url: `${BASE_URL}/twitter-yala-safari.jpg`,
      alt: "Yala Wildlife Safari - Premium Experience",
    },
  },

  // ✅ CRITICAL: Canonical URL points ONLY to main domain - NO mobile URLs
  alternates: {
    canonical: BASE_URL, // This ensures only www.yalawildlife.com appears in search results
    languages: {
      "en-US": BASE_URL,
      "en-GB": BASE_URL,
      "en-AU": BASE_URL,
      "en-CA": BASE_URL,
      "en-IN": BASE_URL,
    },
    // ✅ REMOVED: No mobile-specific URLs to prevent /mobile from appearing
  },

  applicationName: "Yala Wildlife Safari",
  authors: [
    {
      name: "Yala Wildlife Safari",
      url: BASE_URL,
    },
  ],
  generator: "Next.js 15",
  category: "Travel & Tourism",
  classification: "Safari Tours, Wildlife Tourism, Eco Tourism, Adventure Tourism, Nature Tourism, Conservation Tourism",
  referrer: "origin-when-cross-origin",

  verification: {
    google: "vobQq0klynTsOpNnRKtuAD0BDLjmwpS5e2OrmSjojzU",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
    other: {
      "msvalidate.01": "your-bing-verification-code",
      "p:domain_verify": "your-pinterest-verification-code",
    }
  },

  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#22c55e",
      },
    ],
  },

  manifest: "/site.webmanifest",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function Home() {
  return (
    <>
      <ClientHome />

      {/* Schema markup with consistent BASE_URL */}
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
              alternateName: ["Yala National Park Safari", "Sri Lanka Wildlife Tours", "Yala Jeep Safari"],
              description: "Professional wildlife safari tours in Yala National Park with expert guides, luxury 4x4 jeeps, and guaranteed leopard sightings",
              brand: {
                "@type": "Brand",
                name: "Yala Wildlife Safari",
                logo: `${BASE_URL}/logo.png`
              },
              image: [
                `${BASE_URL}/safari-jeep.jpg`,
                `${BASE_URL}/leopard-sighting.jpg`,
                `${BASE_URL}/elephant-herd.jpg`,
                `${BASE_URL}/yala-landscape.jpg`
              ],
              offers: {
                "@type": "AggregateOffer",
                priceCurrency: "USD",
                lowPrice: "50",
                highPrice: "350",
                priceRange: "$$",
                availability: "https://schema.org/InStock",
                validFrom: new Date().toISOString(),
                validThrough: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
                url: `${BASE_URL}/safari-packages`,
                seller: {
                  "@type": "Organization",
                  name: "Yala Wildlife Safari"
                }
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "300",
                bestRating: "5",
                worstRating: "1"
              },
              category: "Safari Tours",
              audience: {
                "@type": "Audience",
                audienceType: "Wildlife Enthusiasts"
              }
            },

            {
              "@context": "https://schema.org",
              "@type": "TouristDestination",
              name: "Yala National Park",
              alternateName: ["Yala", "Ruhuna National Park"],
              description: "Sri Lanka's premier national park famous for having the world's highest leopard density",
              image: `${BASE_URL}/yala-park.jpg`,
              url: BASE_URL, // ✅ Points to main domain only
              address: {
                "@type": "PostalAddress",
                addressLocality: "Tissamaharama",
                addressRegion: "Southern Province",
                addressCountry: "LK"
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 6.3747,
                longitude: 81.1185
              },
              touristType: ["Wildlife Enthusiasts", "Photographers", "Nature Lovers"],
              includesAttraction: [
                {
                  "@type": "TouristAttraction",
                  name: "Leopard Spotting",
                  description: "World's highest leopard density"
                },
                {
                  "@type": "TouristAttraction",
                  name: "Elephant Watching",
                  description: "Large herds of wild elephants"
                }
              ]
            },

            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What is the best time to visit Yala National Park?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "The best time for Yala safari is February to June during dry season when water levels are low and animals gather around waterholes, increasing wildlife sighting opportunities."
                  }
                },
                {
                  "@type": "Question",
                  name: "How much does a Yala safari cost?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yala safari tours range from $50-350 per person. Half-day safaris start at $75, full-day experiences at $150, private luxury safaris at $350. Prices include jeep, guide, and park fees."
                  }
                },
                {
                  "@type": "Question",
                  name: "What animals can I see in Yala?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yala is famous for leopards (world's highest density), Asian elephants, sloth bears, spotted deer, crocodiles, and over 200 bird species including peacocks and eagles."
                  }
                }
              ]
            }
          ]),
        }}
      />

      {/* Breadcrumb schema with consistent URL */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: BASE_URL // ✅ Only main domain
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Safari Tours",
                item: `${BASE_URL}/safari-packages`
              }
            ]
          }),
        }}
      />
      <DotsBackground/>
    </>
  );
}
