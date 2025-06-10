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

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url || 'https://yalawildlife.com'),
  
  title: "Yala Wildlife | #1 Yala National Park Safari Tours & Jeep Services Sri Lanka",
  
  description: "Experience Sri Lanka's best Yala National Park safari tours! Expert guides, luxury 4WD jeeps, guaranteed leopard & elephant sightings. Book your Yala wildlife adventure today with 5-star rated operators. Best prices guaranteed!",
  
  keywords: [
    // Primary Yala keywords
    "yala safari",
    "yala national park",
    "yala wildlife",
    "yala safari tours",
    "yala jeep services",
    "yala safari sri lanka",
    
    // Secondary keywords
    "yala leopard safari",
    "yala elephant tours",
    "yala game drive",
    "yala safari booking",
    "best yala safari",
    "yala wildlife tours",
    
    // Location-based keywords
    "sri lanka safari",
    "sri lanka wildlife tours",
    "tissamaharama safari",
    "southern province safari",
    
    // Service keywords
    "safari jeep rental yala",
    "yala park tours",
    "wildlife photography yala",
    "luxury safari yala"
  ],

  authors: [{ name: "Yala Wildlife Tours" }],
  creator: "Yala Wildlife",
  publisher: "Yala Wildlife Tours",
  
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

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url || 'https://yalawildlife.com',
    siteName: 'Yala Wildlife',
    title: 'Yala Wildlife | Premier Yala National Park Safari Experience Sri Lanka',
    description: 'Discover Sri Lanka\'s most famous national park with our expert-guided Yala safari tours. Spot leopards, elephants, and exotic wildlife in their natural habitat. Book your premium Yala adventure today!',
    images: [
      {
        url: '/images/yala-leopard-safari-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Leopard spotted during Yala National Park safari tour',
        type: 'image/jpeg',
      },
      {
        url: '/images/yala-elephant-herd.jpg',
        width: 1200,
        height: 630,
        alt: 'Elephant herd in Yala National Park',
        type: 'image/jpeg',
      },
      {
        url: '/images/yala-safari-jeep.jpg',
        width: 1200,
        height: 630,
        alt: 'Luxury safari jeep in Yala National Park',
        type: 'image/jpeg',
      }
    ],
  },

  twitter: {
    card: 'summary_large_image',
    site: '@yalawildlife',
    creator: '@yalawildlife',
    title: 'Yala Wildlife | Best Yala National Park Safari Tours Sri Lanka',
    description: 'Experience the ultimate Yala safari adventure! Expert guides, luxury jeeps, guaranteed wildlife sightings. Book your Yala National Park tour today!',
    images: ['/images/yala-leopard-safari-hero.jpg'],
  },

  verification: {
    google: 'your-google-search-console-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },

  alternates: {
    canonical: siteConfig.url || 'https://yalawildlife.com',
    languages: {
      'en-US': siteConfig.url || 'https://yalawildlife.com',
      'si-LK': `${siteConfig.url || 'https://yalawildlife.com'}/si`,
    },
  },

  category: 'travel',
  classification: 'Tourism & Travel',

  other: {
    'geo.region': 'LK-82',
    'geo.placename': 'Yala National Park, Southern Province, Sri Lanka',
    'geo.position': '6.3725;81.5185',
    'ICBM': '6.3725, 81.5185',
    'distribution': 'global',
    'rating': 'general',
    'revisit-after': '1 day',
  },
};

export default function Home() {
  return (
    <>
      {/* Enhanced Structured Data for Homepage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "TravelAgency",
                "@id": `${siteConfig.url || 'https://yalawildlife.com'}/#organization`,
                "name": "Yala Wildlife",
                "url": siteConfig.url || 'https://yalawildlife.com',
                "logo": {
                  "@type": "ImageObject",
                  "url": `${siteConfig.url || 'https://yalawildlife.com'}/logo.png`,
                  "width": 300,
                  "height": 100
                },
                "description": "Premier Yala National Park safari tours and wildlife experiences in Sri Lanka",
                "address": {
                  "@type": "PostalAddress",
                  "addressCountry": "LK",
                  "addressRegion": "Southern Province",
                  "addressLocality": "Tissamaharama"
                },
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": "6.3725",
                  "longitude": "81.5185"
                },
                "telephone": "+94-XXX-XXX-XXX",
                "email": "info@yalawildlife.com",
                "priceRange": "$$-$$$",
                "areaServed": {
                  "@type": "Place",
                  "name": "Yala National Park"
                },
                "serviceType": [
                  "Safari Tours",
                  "Wildlife Photography Tours", 
                  "Jeep Safari Services",
                  "Nature Tours"
                ],
                "hasOfferCatalog": {
                  "@type": "OfferCatalog",
                  "name": "Yala Safari Tours & Services",
                  "itemListElement": [
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "TouristTrip",
                        "name": "Half Day Yala Safari",
                        "description": "3-4 hour morning or evening safari in Yala National Park"
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "TouristTrip", 
                        "name": "Full Day Yala Safari",
                        "description": "6-8 hour comprehensive Yala wildlife experience"
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Yala Jeep Rental Services",
                        "description": "Professional driver and 4WD jeep rental for Yala National Park"
                      }
                    }
                  ]
                }
              },
              {
                "@type": "WebSite",
                "@id": `${siteConfig.url || 'https://yalawildlife.com'}/#website`,
                "url": siteConfig.url || 'https://yalawildlife.com',
                "name": "Yala Wildlife",
                "description": "Sri Lanka's premier Yala National Park safari operator",
                "publisher": {
                  "@id": `${siteConfig.url || 'https://yalawildlife.com'}/#organization`
                },
                "inLanguage": "en-US",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": `${siteConfig.url || 'https://yalawildlife.com'}/search?q={search_term_string}`
                  },
                  "query-input": "required name=search_term_string"
                }
              },
              {
                "@type": "WebPage",
                "@id": `${siteConfig.url || 'https://yalawildlife.com'}/#webpage`,
                "url": siteConfig.url || 'https://yalawildlife.com',
                "name": "Yala Wildlife | Best Yala National Park Safari Tours Sri Lanka",
                "isPartOf": {
                  "@id": `${siteConfig.url || 'https://yalawildlife.com'}/#website`
                },
                "about": {
                  "@id": `${siteConfig.url || 'https://yalawildlife.com'}/#organization`
                },
                "description": "Experience Sri Lanka's best Yala National Park safari tours with expert guides and luxury jeeps",
                "breadcrumb": {
                  "@type": "BreadcrumbList",
                  "itemListElement": [
                    {
                      "@type": "ListItem",
                      "position": 1,
                      "name": "Home",
                      "item": siteConfig.url || 'https://yalawildlife.com'
                    }
                  ]
                },
                "mainEntity": {
                  "@type": "FAQPage",
                  "mainEntity": [
                    {
                      "@type": "Question",
                      "name": "What is the best time for Yala safari?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "The best time for Yala safari is from February to July when the weather is dry and wildlife sightings are at their peak."
                      }
                    },
                    {
                      "@type": "Question", 
                      "name": "Can I see leopards in Yala National Park?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes! Yala has the highest leopard density in the world. Our expert guides know the best spots for leopard sightings."
                      }
                    }
                  ]
                }
              }
            ]
          })
        }}
      />

      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#22c55e" />
      <meta name="msapplication-TileColor" content="#22c55e" />
      <meta name="application-name" content="Yala Wildlife" />
      <meta name="apple-mobile-web-app-title" content="Yala Safari" />
      <meta name="format-detection" content="telephone=no" />

      <ClientHome />
    </>
  );
}
