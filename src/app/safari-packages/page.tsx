import type { Metadata } from "next";
import ClientSafariPackages from "./ClientSafariPackages";
import {
  organizationSchema,
  websiteSchema,
  localBusinessSchema,
} from "@/lib/schema";

// ✅ SEO-OPTIMIZED: Base URL for consistency
const BASE_URL = "https://www.yalawildlife.com";

// ✅ ENHANCED: Safari Packages page metadata
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: "Yala Safari Packages | Best Wildlife Tours Sri Lanka 2025",
  description: "Book premium Yala safari packages with expert guides. Half-day, full-day & private leopard safaris from $75. Guaranteed wildlife sightings & luxury jeeps. Best rates!",

  keywords: [
    "yala safari packages",
    "yala safari tours",
    "yala safari booking",
    "best yala safari packages",
    "yala safari price",
    "yala safari cost",
    "yala safari deals",
    "sri lanka safari packages",
    "yala national park tours",
    "yala wildlife tours",
    "leopard safari packages",
    "elephant safari tours",
    "half day yala safari",
    "full day yala safari",
    "morning yala safari",
    "evening yala safari",
    "private yala safari",
    "luxury yala safari",
    "budget yala safari",
    "group yala safari",
    "family yala safari",
    "yala jeep safari packages",
    "yala safari with guide",
    "expert yala safari guide",
    "professional yala safari",
    "guaranteed leopard sighting",
    "yala safari photography tours",
    "wildlife photography safari",
    "yala bird watching tours",
    "yala safari adventure packages",
    "customized yala safari",
    "yala safari experience",
    "premium yala safari",
    "top rated yala safari",
    "best yala safari operator",
    "yala safari booking online",
    "advance yala safari booking",
    "last minute yala safari",
    "yala safari availability",
    "yala safari reservation",
    "yala safari packages sri lanka",
    "tissamaharama safari packages",
    "southern province safari",
    "yala zone 1 safari",
    "yala block 1 tours",
    "yala zone 2 experience",
    "palatupana entrance safari",
    "kirinda yala tours",
    "yala safari from colombo",
    "yala safari from kandy",
    "yala safari from galle",
    "yala safari from ella",
    "yala safari from mirissa",
    "yala safari package deals",
    "yala safari offers",
    "cheap yala safari packages",
    "affordable yala safari",
    "yala safari best price",
    "yala safari comparison",
    "yala safari reviews",
    "yala safari testimonials",
    "what to expect yala safari",
    "yala safari itinerary",
    "yala safari duration",
    "yala safari timing",
    "best time yala safari",
    "yala safari season",
    "dry season yala safari",
    "yala safari weather",
    "yala safari preparation",
    "yala safari tips",
    "yala safari guide",
    "what to bring yala safari",
    "yala safari clothing",
    "yala safari equipment",
    "yala safari vehicle",
    "4x4 yala safari jeep",
    "open vehicle safari yala",
    "air conditioned safari jeep",
    "luxury safari vehicle",
    "comfortable safari jeep",
    "safe safari vehicle",
    "yala game drive",
    "yala nature tour",
    "yala wilderness experience",
    "yala eco tourism",
    "sustainable yala safari",
    "responsible wildlife tourism",
    "conservation safari tours",
    "educational safari experience",
    "yala safari for beginners",
    "first time yala safari",
    "yala safari solo traveler",
    "yala safari couples",
    "honeymoon safari yala",
    "yala safari children",
    "family friendly safari",
    "yala safari seniors",
    "accessible yala safari",
    "yala safari disabilities"
  ],

  other: {
    "geo.region": "LK-82",
    "geo.placename": "Yala National Park, Tissamaharama, Southern Province, Sri Lanka",
    "geo.position": "6.3747;81.1185",
    "ICBM": "6.3747, 81.1185",
    "DC.title": "Yala Safari Packages | Best Wildlife Tours Sri Lanka",
    "DC.creator": "Yala Wildlife Safari",
    "DC.subject": "Safari Packages, Wildlife Tours, Yala National Park, Leopard Safari, Elephant Tours",
    "DC.description": "Premium Yala safari packages with expert guides, luxury jeeps, and guaranteed wildlife sightings. Best rates and authentic experiences.",
    "DC.publisher": "Yala Wildlife Safari",
    "DC.contributor": "Expert Safari Guides, Wildlife Naturalists, Conservation Specialists",
    "DC.date": new Date().toISOString(),
    "DC.type": "Tourism Service, Safari Packages, Wildlife Tours",
    "DC.format": "text/html",
    "DC.identifier": `${BASE_URL}/safari-packages`,
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
    "apple-mobile-web-app-title": "Yala Safari Packages",
    "format-detection": "telephone=yes, address=yes, email=yes",
    "news_keywords": "yala safari packages, wildlife tours, leopard safari, elephant watching, eco tourism, national park tours",
    "article:section": "Travel & Tourism",
    "article:tag": "Safari Packages, Wildlife Tours, Yala National Park, Adventure Tourism, Eco Travel",
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
    title: "Yala Safari Packages | Best Wildlife Tours Sri Lanka 2025",
    description: "Book premium Yala safari packages with expert guides. Half-day, full-day & private leopard safaris from $75. Guaranteed wildlife sightings & luxury jeeps!",
    url: `${BASE_URL}/safari-packages`,
    siteName: "Yala Wildlife Safari | Premier Safari Experience",
    locale: "en_US",
    images: [
      {
        url: `${BASE_URL}/og-safari-packages-main.jpg`,
        width: 1200,
        height: 630,
        alt: "Yala Safari Packages - Premium Wildlife Tours Sri Lanka",
        type: "image/jpeg",
      },
      {
        url: `${BASE_URL}/og-half-day-safari.jpg`,
        width: 1200,
        height: 630,
        alt: "Half Day Yala Safari Package - Leopard Spotting Tours",
        type: "image/jpeg",
      },
      {
        url: `${BASE_URL}/og-full-day-safari.jpg`,
        width: 1200,
        height: 630,
        alt: "Full Day Yala Safari Package - Complete Wildlife Experience",
        type: "image/jpeg",
      },
      {
        url: `${BASE_URL}/og-private-safari.jpg`,
        width: 1200,
        height: 630,
        alt: "Private Yala Safari Package - Luxury Wildlife Tours",
        type: "image/jpeg",
      }
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@yalawildlife",
    creator: "@yalawildlife",
    title: "Yala Safari Packages | Best Wildlife Tours Sri Lanka",
    description: "Book premium Yala safari packages from $75. Half-day, full-day & private tours with expert guides. Guaranteed leopard sightings!",
    images: {
      url: `${BASE_URL}/twitter-safari-packages.jpg`,
      alt: "Yala Safari Packages - Premium Wildlife Tours",
    },
  },

  alternates: {
    canonical: `${BASE_URL}/safari-packages`,
    languages: {
      "en-US": `${BASE_URL}/safari-packages`,
      "en-GB": `${BASE_URL}/safari-packages`,
      "en-AU": `${BASE_URL}/safari-packages`,
      "en-CA": `${BASE_URL}/safari-packages`,
      "en-IN": `${BASE_URL}/safari-packages`,
    },
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
  classification: "Safari Packages, Wildlife Tourism, Eco Tourism, Adventure Tourism, Nature Tourism",
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

export default function SafariPackages() {
  return (
    <>
      <ClientSafariPackages />

      {/* ✅ ENHANCED: Schema markup for Safari Packages */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            organizationSchema,
            websiteSchema,
            localBusinessSchema,

            {
              "@context": "https://schema.org",
              "@type": "ItemList",
              name: "Yala Safari Packages",
              description: "Premium safari packages for Yala National Park with expert guides and guaranteed wildlife sightings",
              url: `${BASE_URL}/safari-packages`,
              numberOfItems: 6,
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  item: {
                    "@type": "Product",
                    name: "Half Day Morning Safari",
                    description: "Early morning safari tour from 5:30 AM to 9:30 AM with high chances of leopard sightings",
                    offers: {
                      "@type": "Offer",
                      priceCurrency: "USD",
                      price: "75",
                      availability: "https://schema.org/InStock",
                      url: `${BASE_URL}/safari-packages/half-day-morning-safari`
                    }
                  }
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  item: {
                    "@type": "Product",
                    name: "Half Day Evening Safari",
                    description: "Afternoon safari tour from 2:30 PM to 6:30 PM perfect for wildlife photography",
                    offers: {
                      "@type": "Offer",
                      priceCurrency: "USD",
                      price: "75",
                      availability: "https://schema.org/InStock",
                      url: `${BASE_URL}/safari-packages/half-day-evening-safari`
                    }
                  }
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  item: {
                    "@type": "Product",
                    name: "Full Day Safari Experience",
                    description: "Complete 8-hour safari covering both morning and evening game drives with lunch included",
                    offers: {
                      "@type": "Offer",
                      priceCurrency: "USD",
                      price: "150",
                      availability: "https://schema.org/InStock",
                      url: `${BASE_URL}/safari-packages/full-day-safari`
                    }
                  }
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  item: {
                    "@type": "Product",
                    name: "Private Safari Tour",
                    description: "Exclusive private jeep safari with dedicated guide for personalized wildlife experience",
                    offers: {
                      "@type": "Offer",
                      priceCurrency: "USD",
                      price: "200",
                      availability: "https://schema.org/InStock",
                      url: `${BASE_URL}/safari-packages/private-safari`
                    }
                  }
                },
                {
                  "@type": "ListItem",
                  position: 5,
                  item: {
                    "@type": "Product",
                    name: "Photography Safari Package",
                    description: "Specialized safari for wildlife photographers with extended stops at prime locations",
                    offers: {
                      "@type": "Offer",
                      priceCurrency: "USD",
                      price: "250",
                      availability: "https://schema.org/InStock",
                      url: `${BASE_URL}/safari-packages/photography-safari`
                    }
                  }
                },
                {
                  "@type": "ListItem",
                  position: 6,
                  item: {
                    "@type": "Product",
                    name: "Luxury Safari Experience",
                    description: "Premium safari package with luxury vehicle, gourmet meals, and VIP service",
                    offers: {
                      "@type": "Offer",
                      priceCurrency: "USD",
                      price: "350",
                      availability: "https://schema.org/InStock",
                      url: `${BASE_URL}/safari-packages/luxury-safari`
                    }
                  }
                }
              ]
            },

            {
              "@context": "https://schema.org",
              "@type": "Service",
              name: "Yala Safari Package Services",
              provider: {
                "@type": "Organization",
                name: "Yala Wildlife Safari"
              },
              areaServed: {
                "@type": "Place",
                name: "Yala National Park, Sri Lanka"
              },
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Safari Package Catalog",
                itemListElement: [
                  {
                    "@type": "OfferCatalog",
                    name: "Half Day Safaris",
                    description: "Morning and evening safari options"
                  },
                  {
                    "@type": "OfferCatalog",
                    name: "Full Day Safaris", 
                    description: "Complete day wildlife experiences"
                  },
                  {
                    "@type": "OfferCatalog",
                    name: "Private Safaris",
                    description: "Exclusive personalized tours"
                  },
                  {
                    "@type": "OfferCatalog",
                    name: "Specialized Safaris",
                    description: "Photography and luxury experiences"
                  }
                ]
              },
              serviceType: "Safari Tour Packages",
              description: "Comprehensive safari packages for Yala National Park with various durations and experience levels"
            },

            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What safari packages do you offer in Yala?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "We offer half-day morning safaris ($75), half-day evening safaris ($75), full-day experiences ($150), private tours ($200), photography safaris ($250), and luxury packages ($350). All include expert guides, jeep, and park fees."
                  }
                },
                {
                  "@type": "Question",
                  name: "Which is the best safari package for first-time visitors?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "The half-day morning safari (5:30 AM - 9:30 AM) is ideal for first-time visitors. Animals are most active during early hours, offering the best chances for leopard and elephant sightings at an affordable price."
                  }
                },
                {
                  "@type": "Question",
                  name: "Do your safari packages include transportation and guide?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, all our safari packages include 4x4 jeep transportation, expert naturalist guide, park entrance fees, and refreshments. Pickup from nearby hotels can be arranged for an additional fee."
                  }
                },
                {
                  "@type": "Question",
                  name: "Can I customize my safari package?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Absolutely! We offer customized safari packages tailored to your interests, duration preferences, and budget. Contact us to design your perfect Yala wildlife experience."
                  }
                },
                {
                  "@type": "Question",
                  name: "What's included in the luxury safari package?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Our luxury safari package ($350) includes premium air-conditioned jeep, dedicated expert guide, gourmet meals, refreshments, binoculars, photography assistance, and VIP park entry with extended game drive duration."
                  }
                }
              ]
            }
          ]),
        }}
      />

      {/* ✅ ENHANCED: Breadcrumb schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": BASE_URL
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Safari Packages",
                "item": `${BASE_URL}/safari-packages`
              }
            ]
          }),
        }}
      />

      {/* ✅ ENHANCED: Package-specific Local Business schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TouristInformationCenter",
            "name": "Yala Wildlife Safari Packages",
            "description": "Premier safari package provider for Yala National Park with guaranteed wildlife sightings",
            "url": `${BASE_URL}/safari-packages`,
            "telephone": "+94-778-158-004",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Safari Base, Tissamaharama Road",
              "addressLocality": "Tissamaharama", 
              "addressRegion": "Southern Province",
              "postalCode": "82600",
              "addressCountry": "LK"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 6.3747,
              "longitude": 81.1185
            },
            "priceRange": "$$",
            "paymentAccepted": ["Cash", "Credit Card", "Bank Transfer"],
            "currenciesAccepted": "USD, LKR",
            "openingHours": [
              "Mo-Su 05:30-20:00"
            ],
            "serviceArea": {
              "@type": "GeoCircle",
              "geoMidpoint": {
                "@type": "GeoCoordinates",
                "latitude": 6.3747,
                "longitude": 81.1185
              },
              "geoRadius": 50000
            }
          }),
        }}
      />
    </>
  );
}
