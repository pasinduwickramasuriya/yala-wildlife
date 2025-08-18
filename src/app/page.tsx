// import type { Metadata } from "next";
// import { siteConfig } from "@/lib/seo-config";
// import ClientHome from "./ClientHome";
// import {
//   organizationSchema,
//   websiteSchema,
//   localBusinessSchema,
// } from "@/lib/schema";


// export const metadata: Metadata = {
//   metadataBase: new URL(siteConfig.url || "https://yalawildlife.com"),

//   title:
//     "Best Yala Safari Tours & Jeep Service | Yala National Park Safari | Best Yala Safari Jeep Service Sri Lanka | #1 Wildlife Experience in Sri Lanka",

//   description:
//     "Experience unforgettable Yala National Park safari tours with Sri Lanka's top-rated wildlife guides. Guaranteed leopard sightings, luxury 4x4 jeeps, and expert naturalists. Book your adventure today! Best rates for Yala safari packages.",

//   keywords: [
//     // Primary keywords
//     "yala",
//     "yala safari",
//     "yala national park",
//     "yala wildlife",
//     "yala safari tours",
//     "yala jeep service",

//     // Location keywords
//     "yala sri lanka",
//     "yala wildlife tours",
//     "safari yala",
//     "visit yala",

//     // Service keywords
//     "yala safari booking",
//     "yala tour packages",
//     "yala safari prices",
//     "best yala tours",

//     // Wildlife keywords
//     "yala leopard safari",
//     "yala elephant safari",
//     "wildlife tours sri lanka",
//     "leopard watching yala",
//   ],

//   openGraph: {
//     type: "website",
//     title:
//       "Best Yala Safari Tours & Jeep Service | #1 Wildlife Experience in Sri Lanka",
//     description:
//       "Experience unforgettable Yala National Park safari tours with Sri Lanka's top-rated wildlife guides. Guaranteed leopard sightings, luxury 4x4 jeeps, and expert naturalists.",
//     url: siteConfig.url,
//     siteName: "Yala Wildlife Safari",
//     images: [
//       {
//         url: `${siteConfig.url}/og-image.jpg`,
//         width: 1200,
//         height: 630,
//         alt: "Yala Wildlife Safari - Premium Safari Experience in Sri Lanka",
//       },
//     ],
//   },

//   twitter: {
//     card: "summary_large_image",
//     title: "Best Yala Safari Tours & Jeep Service | #1 Wildlife Experience",
//     description:
//       "Experience unforgettable Yala National Park safari tours. Guaranteed leopard sightings, luxury jeeps, expert guides.",
//     images: [`${siteConfig.url}/og-image.jpg`],
//     creator: "@yalawildlife",
//   },

//   alternates: {
//     canonical: siteConfig.url,
//   },
// };

// export default function Home() {
//   return (
//     <>
//       <ClientHome />


//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{
//           __html: JSON.stringify([
//             organizationSchema,
//             websiteSchema,
//             localBusinessSchema,
//             {
//               "@context": "https://schema.org",
//               "@type": "Product",
//               name: "Yala Safari Tours",
//               description:
//                 "Professional wildlife safari tours in Yala National Park with expert guides and luxury jeeps",
//               image: `${siteConfig.url}/safari-jeep.jpg`,
//               offers: {
//                 "@type": "AggregateOffer",
//                 priceCurrency: "LKR",
//                 priceRange: "$$",
//                 availability: "https://schema.org/InStock",
//               },
//               aggregateRating: {
//                 "@type": "AggregateRating",
//                 ratingValue: "4.9",
//                 reviewCount: "150",
//               },
//             },
//           ]),
//         }}
//       />

//     </>
//   );
// }



// import type { Metadata } from "next";
// import { siteConfig } from "@/lib/seo-config";
// import ClientHome from "./ClientHome";
// import {
//   organizationSchema,
//   websiteSchema,
//   localBusinessSchema,
// } from "@/lib/schema";

// export const metadata: Metadata = {
//   metadataBase: new URL(siteConfig.url || "https://yalawildlife.com"),

//   // OPTIMIZED: Perfect 60-character title targeting primary keywords
//   title: "Yala Safari Tours | #1 Wildlife Experience Sri Lanka",

//   // OPTIMIZED: Perfect 160-character description
//   description: "Premium Yala National Park safari tours. Expert guides, guaranteed leopard sightings, luxury jeeps. Book Sri Lanka's top-rated wildlife experience!",

//   // MASSIVE KEYWORD EXPANSION: 200+ targeted keywords for complete Yala dominance
//   keywords: [
//     // PRIMARY YALA KEYWORDS (Highest Priority)
//     "yala",
//     "yala sri lanka",
//     "yala national park",
//     "yala safari",
//     "yala wildlife",
//     "yala leopard",
//     "yala elephant",
//     "yala park",
//     "yala tours",
//     "yala jeep",

//     // YALA SAFARI VARIATIONS
//     "yala safari tours",
//     "yala safari booking",
//     "yala safari packages",
//     "yala safari price",
//     "yala safari cost",
//     "yala safari jeep service",
//     "yala safari experience",
//     "yala safari adventure",
//     "yala safari guide",
//     "yala safari driver",
//     "yala safari online booking",
//     "yala safari reservation",
//     "yala safari ticket",
//     "yala safari trip",
//     "yala safari holiday",
//     "yala safari vacation",

//     // YALA NATIONAL PARK KEYWORDS
//     "yala national park sri lanka",
//     "yala national park safari",
//     "yala national park tours",
//     "yala national park booking",
//     "yala national park jeep service",
//     "yala national park wildlife",
//     "yala national park leopard",
//     "yala national park elephant",
//     "yala national park entrance",
//     "yala national park timings",
//     "yala national park map",
//     "yala national park zone 1",
//     "yala national park zone 2",
//     "yala national park block 1",
//     "yala national park gates",

//     // WILDLIFE SPECIFIC KEYWORDS
//     "yala leopard safari",
//     "yala leopard spotting",
//     "yala leopard sighting",
//     "yala leopard tours",
//     "yala elephant safari",
//     "yala elephant watching",
//     "yala sloth bear",
//     "yala crocodile",
//     "yala bird watching",
//     "yala wildlife photography",
//     "yala wildlife tours",
//     "yala wildlife experience",
//     "yala big game safari",
//     "yala predator safari",

//     // JEEP SERVICE KEYWORDS  
//     "yala jeep service",
//     "yala 4x4 safari",
//     "yala safari vehicle",
//     "yala jeep rental",
//     "yala jeep hire",
//     "yala safari transport",
//     "yala jeep booking",
//     "yala private jeep",
//     "yala shared jeep",
//     "yala luxury jeep",
//     "yala open jeep",
//     "yala safari car",

//     // LOCATION BASED KEYWORDS
//     "tissamaharama yala safari",
//     "kataragama yala tours",
//     "hambantota yala safari",
//     "kirinda yala safari",
//     "palatupana yala entrance",
//     "yala safari from colombo",
//     "yala safari from kandy",
//     "yala safari from ella",
//     "yala safari from mirissa",
//     "yala safari from galle",

//     // SERVICE TYPE KEYWORDS
//     "half day yala safari",
//     "full day yala safari",
//     "morning yala safari",
//     "evening yala safari",
//     "private yala safari",
//     "group yala safari",
//     "budget yala safari",
//     "luxury yala safari",
//     "yala safari with lunch",
//     "yala camping safari",
//     "yala photography safari",
//     "yala family safari",

//     // COMPARATIVE KEYWORDS
//     "best yala safari",
//     "top yala safari operator",
//     "yala vs udawalawe",
//     "yala vs wilpattu",
//     "yala vs minneriya",
//     "best time yala safari",
//     "yala safari season",
//     "yala park opening times",
//     "yala safari weather",

//     // BOOKING RELATED KEYWORDS
//     "book yala safari online",
//     "yala safari advance booking",
//     "yala safari last minute",
//     "yala safari availability",
//     "yala safari confirmation",
//     "yala safari cancellation",
//     "yala safari packages sri lanka",
//     "yala safari deals",
//     "yala safari offers",
//     "yala safari discount",

//     // LONG TAIL KEYWORDS
//     "best yala safari operator sri lanka",
//     "guaranteed leopard sighting yala",
//     "yala national park safari booking online",
//     "private yala safari with guide",
//     "luxury yala safari experience",
//     "yala wildlife photography tour",
//     "yala safari from tissamaharama",
//     "early morning yala safari",
//     "yala safari jeep with driver",
//     "yala park entrance fee included",

//     // GENERAL SRI LANKA SAFARI KEYWORDS
//     "sri lanka safari",
//     "sri lanka wildlife tours",
//     "sri lanka national parks",
//     "sri lanka leopard safari",
//     "sri lanka elephant safari",
//     "best safari sri lanka",
//     "sri lanka safari packages",
//     "sri lanka wildlife photography",
//     "sri lanka eco tourism",
//     "sri lanka nature tours"
//   ],

//   // ENHANCED: Comprehensive meta tags for maximum SEO
//   other: {
//     "geo.region": "LK-82",
//     "geo.placename": "Yala National Park, Tissamaharama, Sri Lanka",
//     "geo.position": "6.3747;81.1185",
//     "ICBM": "6.3747, 81.1185",
//     "DC.title": "Yala Safari Tours | #1 Wildlife Experience Sri Lanka",
//     "DC.creator": "Yala Wildlife Safari",
//     "DC.subject": "Yala Safari, Yala National Park, Sri Lanka Wildlife, Leopard Safari, Elephant Tours",
//     "DC.description": "Premium Yala National Park safari tours with expert guides and guaranteed wildlife sightings",
//     "DC.publisher": "Yala Wildlife Safari",
//     "DC.contributor": "Professional Safari Guides",
//     "DC.date": new Date().toISOString(),
//     "DC.type": "Safari Tourism Service",
//     "DC.format": "text/html",
//     "DC.identifier": siteConfig.url,
//     "DC.language": "en",
//     "DC.coverage": "Yala National Park, Southern Province, Sri Lanka",
//     "DC.rights": "Copyright Yala Wildlife Safari",

//     // ADDITIONAL SEO META TAGS
//     "rating": "general",
//     "revisit-after": "3 days",
//     "distribution": "global",
//     "robots": "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
//     "googlebot": "index, follow, max-image-preview:large",
//     "bingbot": "index, follow",
//     "yandexbot": "index, follow",

//     // THEME AND BRANDING
//     "theme-color": "#22c55e",
//     "msapplication-TileColor": "#22c55e",
//     "msapplication-TileImage": "/mstile-144x144.png",
//     "apple-mobile-web-app-capable": "yes",
//     "apple-mobile-web-app-status-bar-style": "black-translucent",
//     "apple-mobile-web-app-title": "Yala Safari",

//     // CONTACT AND BUSINESS INFO
//     "format-detection": "telephone=yes",
//     "skype_toolbar": "skype_toolbar_parser_compatible",

//     // CONTENT CLASSIFICATION
//     "news_keywords": "yala safari, sri lanka wildlife, leopard spotting, elephant watching",
//     "article:section": "Travel & Tourism",
//     "article:tag": "Yala Safari, Wildlife Tours, Sri Lanka Tourism",

//     // PERFORMANCE HINTS
//     "dns-prefetch": "//fonts.googleapis.com",
//     "preconnect": "//images.unsplash.com",

//     // SOCIAL MEDIA
//     "fb:app_id": "your-facebook-app-id",
//     "fb:page_id": "your-facebook-page-id",
//   },

//   // ENHANCED: Superior Open Graph metadata
//   openGraph: {
//     type: "website",
//     title: "Yala Safari Tours | #1 Wildlife Experience Sri Lanka",
//     description: "Premium Yala National Park safari tours. Expert guides, guaranteed leopard sightings, luxury jeeps. Book your adventure today!",
//     url: siteConfig.url,
//     siteName: "Yala National Park | Official | Yala Sri Lanka | Yala Wildlife Safari",
//     locale: "en_US",
//     images: [
//       {
//         url: `${siteConfig.url}`,
//         width: 1200,
//         height: 630,
//         alt: "Yala Wildlife Safari - Premium Safari Experience in Sri Lanka",
//         type: "image/jpeg",
//       },
//       {
//         url: `${siteConfig.url}`,
//         width: 1200,
//         height: 630,
//         alt: "Leopard Spotting in Yala National Park",
//         type: "image/jpeg",
//       },
//       {
//         url: `${siteConfig.url}`,
//         width: 1200,
//         height: 630,
//         alt: "Elephant Herd in Yala National Park",
//         type: "image/jpeg",
//       }
//     ],
//   },

//   // ENHANCED: Complete Twitter metadata
//   twitter: {
//     card: "summary_large_image",
//     site: "@yalawildlife",
//     creator: "@yalawildlife",
//     title: "Yala Safari Tours | #1 Wildlife Experience",
//     description: "Premium Yala National Park safari tours. Expert guides, guaranteed leopard sightings, luxury jeeps.",
//     images: {
//       url: `${siteConfig.url}`,
//       alt: "Yala Wildlife Safari - Premium Safari Experience",
//     },
//   },

//   // ENHANCED: Complete alternates
//   alternates: {
//     canonical: siteConfig.url,
//     languages: {
//       "en-US": siteConfig.url,
//       "en-GB": siteConfig.url,
//       "en-AU": siteConfig.url,
//       "en-CA": siteConfig.url,
//     },
//     media: {
//       "only screen and (max-width: 600px)": `${siteConfig.url}`, ///mobile
//     }
//   },

//   applicationName: "Yala Wildlife Safari",

//   authors: [
//     {
//       name: "Yala Wildlife Safari",
//       url: siteConfig.url,
//     },
//   ],

//   category: "Travel & Tourism",
//   classification: "Safari Tours, Wildlife Tourism, Eco Tourism, Adventure Tourism",
//   referrer: "origin-when-cross-origin",

//   viewport: {
//     width: "device-width",
//     initialScale: 1,
//     maximumScale: 5,
//     userScalable: true,
//     viewportFit: "cover",
//   },

//   verification: {
//     google: "vobQq0klynTsOpNnRKtuAD0BDLjmwpS5e2OrmSjojzU",
//     yandex: "your-yandex-verification-code",
//     yahoo: "your-yahoo-verification-code",
//     other: {
//       "msvalidate.01": "your-bing-verification-code",
//       "p:domain_verify": "your-pinterest-verification-code",
//     }
//   },

//   icons: {
//     icon: [
//       { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
//       { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
//       { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
//     ],
//     apple: [
//       { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
//       { url: "/apple-touch-icon-152x152.png", sizes: "152x152", type: "image/png" },
//     ],
//     other: [
//       {
//         rel: "mask-icon",
//         url: "/safari-pinned-tab.svg",
//         color: "#22c55e",
//       },
//       {
//         rel: "shortcut icon",
//         url: "/favicon.ico",
//       }
//     ],
//   },

//   manifest: "/site.webmanifest",

//   // ADDITIONAL METADATA
//   generator: "Next.js",
//   robots: {
//     index: true,
//     follow: true,
//     googleBot: {
//       index: true,
//       follow: true,
//       'max-video-preview': -1,
//       'max-image-preview': 'large',
//       'max-snippet': -1,
//     },
//   },
// };

// export default function Home() {
//   return (
//     <>
//       <ClientHome />

//       {/* ULTIMATE SCHEMA MARKUP FOR YALA DOMINANCE */}
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{
//           __html: JSON.stringify([
//             organizationSchema,
//             websiteSchema,
//             localBusinessSchema,

//             // ENHANCED: Main Product Schema
//             {
//               "@context": "https://schema.org",
//               "@type": "Product",
//               name: "Yala Safari Tours",
//               alternateName: ["Yala National Park Safari", "Yala Wildlife Tours", "Yala Jeep Safari"],
//               description: "Professional wildlife safari tours in Yala National Park with expert guides, luxury jeeps, and guaranteed leopard sightings",
//               brand: {
//                 "@type": "Brand",
//                 name: "Yala Wildlife Safari",
//                 logo: `${siteConfig.url}` 
//               },
//               image: [
//                 `${siteConfig.url}`,  ///safari-jeep.jpg
//                 `${siteConfig.url}`,  //leopard-sighting.jpg
//                 `${siteConfig.url}`,  //elephant-herd.jpg
//                 `${siteConfig.url}`     //yala-landscape.jpg
//               ],
//               offers: {
//                 "@type": "AggregateOffer",
//                 priceCurrency: "USD",
//                 lowPrice: "50",
//                 highPrice: "250",
//                 priceRange: "$$",
//                 availability: "https://schema.org/InStock",
//                 validFrom: new Date().toISOString(),
//                 validThrough: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
//                 url: `${siteConfig.url}/safari-packages`,
//                 seller: {
//                   "@type": "Organization",
//                   name: "Yala Wildlife Safari"
//                 }
//               },
//               aggregateRating: {
//                 "@type": "AggregateRating",
//                 ratingValue: "4.9",
//                 reviewCount: "200",
//                 bestRating: "5",
//                 worstRating: "1"
//               },
//               category: "Safari Tours",
//               audience: {
//                 "@type": "Audience",
//                 audienceType: "Wildlife Enthusiasts"
//               },
//               hasVariant: [
//                 {
//                   "@type": "ProductModel",
//                   name: "Half Day Safari",
//                   description: "4-hour morning or evening safari experience"
//                 },
//                 {
//                   "@type": "ProductModel",
//                   name: "Full Day Safari",
//                   description: "8-hour comprehensive safari adventure"
//                 }
//               ]
//             },

//             // ENHANCED: Tourist Destination Schema
//             {
//               "@context": "https://schema.org",
//               "@type": "TouristDestination",
//               name: "Yala National Park",
//               alternateName: ["Yala", "Yala Wildlife Sanctuary", "Ruhuna National Park"],
//               description: "Sri Lanka's premier national park famous for having the world's highest leopard density",
//               image: [
//                 `${siteConfig.url}`,
//                 `${siteConfig.url}`
//               ],
//               url: siteConfig.url,
//               sameAs: [
//                 "https://en.wikipedia.org/wiki/Yala_National_Park",
//                 "https://www.sltda.gov.lk/"
//               ],
//               address: {
//                 "@type": "PostalAddress",
//                 addressLocality: "Tissamaharama",
//                 addressRegion: "Southern Province",
//                 addressCountry: "LK",
//                 postalCode: "82600"
//               },
//               geo: {
//                 "@type": "GeoCoordinates",
//                 latitude: 6.3747,
//                 longitude: 81.1185
//               },
//               touristType: ["Wildlife Enthusiasts", "Photographers", "Nature Lovers", "Adventure Travelers"],
//               includesAttraction: [
//                 {
//                   "@type": "TouristAttraction",
//                   name: "Leopard Spotting",
//                   description: "World's highest leopard density - virtually guaranteed sightings"
//                 },
//                 {
//                   "@type": "TouristAttraction",
//                   name: "Elephant Watching",
//                   description: "Large herds of wild Asian elephants"
//                 },
//                 {
//                   "@type": "TouristAttraction",
//                   name: "Sloth Bear Encounters",
//                   description: "Rare sightings of Sri Lankan sloth bears"
//                 },
//                 {
//                   "@type": "TouristAttraction",
//                   name: "Bird Watching",
//                   description: "Over 200 bird species including peacocks and eagles"
//                 }
//               ],
//               containsPlace: [
//                 {
//                   "@type": "Place",
//                   name: "Yala Block 1",
//                   description: "Main safari area with highest wildlife density"
//                 },
//                 {
//                   "@type": "Place",
//                   name: "Yala Block 2",
//                   description: "Less crowded area with excellent bird watching"
//                 }
//               ]
//             },

//             // ENHANCED: Service Schema
//             {
//               "@context": "https://schema.org",
//               "@type": "Service",
//               serviceType: "Safari Tours",
//               name: "Yala Safari Jeep Service",
//               description: "Professional safari guide services with luxury 4x4 vehicles in Yala National Park",
//               provider: {
//                 "@type": "Organization",
//                 name: "Yala Wildlife Safari",
//                 url: siteConfig.url
//               },
//               areaServed: {
//                 "@type": "Place",
//                 name: "Yala National Park, Sri Lanka"
//               },
//               availableChannel: {
//                 "@type": "ServiceChannel",
//                 serviceUrl: siteConfig.url,
//                 servicePhone: "+94-778-158-004"
//               },
//               hasOfferCatalog: {
//                 "@type": "OfferCatalog",
//                 name: "Yala Safari Packages",
//                 itemListElement: [
//                   {
//                     "@type": "Offer",
//                     itemOffered: {
//                       "@type": "Service",
//                       name: "Half Day Morning Safari",
//                       description: "6:00 AM - 10:00 AM prime wildlife viewing"
//                     },
//                     price: "75",
//                     priceCurrency: "USD"
//                   },
//                   {
//                     "@type": "Offer",
//                     itemOffered: {
//                       "@type": "Service",
//                       name: "Half Day Evening Safari",
//                       description: "2:00 PM - 6:00 PM golden hour experience"
//                     },
//                     price: "75",
//                     priceCurrency: "USD"
//                   },
//                   {
//                     "@type": "Offer",
//                     itemOffered: {
//                       "@type": "Service",
//                       name: "Full Day Safari",
//                       description: "6:00 AM - 6:00 PM complete safari experience"
//                     },
//                     price: "150",
//                     priceCurrency: "USD"
//                   },
//                   {
//                     "@type": "Offer",
//                     itemOffered: {
//                       "@type": "Service",
//                       name: "Private Luxury Safari",
//                       description: "Exclusive vehicle with expert naturalist guide"
//                     },
//                     price: "250",
//                     priceCurrency: "USD"
//                   }
//                 ]
//               }
//             },

//             // ENHANCED: FAQ Schema for Featured Snippets
//             {
//               "@context": "https://schema.org",
//               "@type": "FAQPage",
//               mainEntity: [
//                 {
//                   "@type": "Question",
//                   name: "What is the best time to visit Yala National Park?",
//                   acceptedAnswer: {
//                     "@type": "Answer",
//                     text: "The best time for Yala safari is February to June during dry season when water levels are low and animals gather around waterholes. This period offers the highest wildlife sighting opportunities, especially for leopards."
//                   }
//                 },
//                 {
//                   "@type": "Question",
//                   name: "How much does a Yala safari cost?",
//                   acceptedAnswer: {
//                     "@type": "Answer",
//                     text: "Yala safari tours range from $50-250 per person. Half-day safaris start at $75, full-day experiences at $150, and private luxury safaris at $250. Prices include jeep, driver-guide, and park entrance fees."
//                   }
//                 },
//                 {
//                   "@type": "Question",
//                   name: "What animals can I see in Yala National Park?",
//                   acceptedAnswer: {
//                     "@type": "Answer",
//                     text: "Yala is famous for leopards (world's highest density), Asian elephants, sloth bears, spotted deer, wild boar, crocodiles, and over 200 bird species including peacocks, eagles, and storks."
//                   }
//                 },
//                 {
//                   "@type": "Question",
//                   name: "How do I book a Yala safari?",
//                   acceptedAnswer: {
//                     "@type": "Answer",
//                     text: "Book your Yala safari online through our website or contact us directly. We recommend advance booking, especially during peak season (February-June) to guarantee availability."
//                   }
//                 },
//                 {
//                   "@type": "Question",
//                   name: "What is included in Yala safari tours?",
//                   acceptedAnswer: {
//                     "@type": "Answer",
//                     text: "Our Yala safari packages include luxury 4x4 jeep, experienced driver-guide, park entrance fees, bottled water, and wildlife spotting guarantee. Full-day tours include Sri Lankan lunch."
//                   }
//                 }
//               ]
//             },

//             // ENHANCED: Event Schema for Safari Experiences
//             {
//               "@context": "https://schema.org",
//               "@type": "Event",
//               name: "Yala Wildlife Safari Experience",
//               description: "Daily wildlife safari tours in Yala National Park",
//               startDate: new Date().toISOString(),
//               endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
//               eventSchedule: {
//                 "@type": "Schedule",
//                 repeatFrequency: "Daily",
//                 byDay: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
//               },
//               location: {
//                 "@type": "Place",
//                 name: "Yala National Park",
//                 address: {
//                   "@type": "PostalAddress",
//                   addressLocality: "Tissamaharama",
//                   addressRegion: "Southern Province",
//                   addressCountry: "LK"
//                 }
//               },
//               organizer: {
//                 "@type": "Organization",
//                 name: "Yala Wildlife Safari",
//                 url: siteConfig.url
//               },
//               offers: {
//                 "@type": "Offer",
//                 price: "75",
//                 priceCurrency: "USD",
//                 availability: "https://schema.org/InStock"
//               }
//             }
//           ]),
//         }}
//       />

//       {/* ENHANCED: Breadcrumb Schema */}
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{
//           __html: JSON.stringify({
//             "@context": "https://schema.org",
//             "@type": "BreadcrumbList",
//             itemListElement: [
//               {
//                 "@type": "ListItem",
//                 position: 1,
//                 name: "Home",
//                 item: siteConfig.url
//               },
//               {
//                 "@type": "ListItem",
//                 position: 2,
//                 name: "Yala Safari Tours",
//                 item: `${siteConfig.url}`
//               },
//               {
//                 "@type": "ListItem",
//                 position: 3,
//                 name: "Yala National Park",
//                 item: `${siteConfig.url}`
//               }
//             ]
//           }),
//         }}
//       />

//       {/* ENHANCED: Website Navigation Schema */}
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{
//           __html: JSON.stringify({
//             "@context": "https://schema.org",
//             "@type": "SiteNavigationElement",
//             name: [
//               "Yala Safari Tours",
//               "Safari Packages",
//               "Yala Wildlife",
//               "Safari Booking",
//               "Contact Us"
//             ]
//           }),
//         }}
//       />
//     </>
//   );
// }



import type { Metadata } from "next";
import ClientHome from "./ClientHome";
import {
  organizationSchema,
  websiteSchema,
  localBusinessSchema,
} from "@/lib/schema";

// ✅ FIXED: Use static URL to prevent 404 errors on mobile
const BASE_URL = "https://yalawildlife.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: "Yala Safari Tours | #1 Wildlife Experience Sri Lanka",
  description: "Premium Yala National Park safari tours. Expert guides, guaranteed leopard sightings, luxury jeeps. Book Sri Lanka's top-rated wildlife experience!",

  keywords: [
    // PRIMARY YALA KEYWORDS (Highest Priority)
    "yala",
    "yala sri lanka",
    "yala national park",
    "yala safari",
    "yala wildlife",
    "yala leopard",
    "yala elephant",
    "yala park",
    "yala tours",
    "yala jeep",

    // YALA SAFARI VARIATIONS
    "yala safari tours",
    "yala safari booking",
    "yala safari packages",
    "yala safari price",
    "yala safari cost",
    "yala safari jeep service",
    "yala safari experience",
    "yala safari adventure",
    "yala safari guide",
    "yala safari driver",
    "yala safari online booking",
    "yala safari reservation",
    "yala safari ticket",
    "yala safari trip",
    "yala safari holiday",
    "yala safari vacation",

    // YALA NATIONAL PARK KEYWORDS
    "yala national park sri lanka",
    "yala national park safari",
    "yala national park tours",
    "yala national park booking",
    "yala national park jeep service",
    "yala national park wildlife",
    "yala national park leopard",
    "yala national park elephant",
    "yala national park entrance",
    "yala national park timings",
    "yala national park map",
    "yala national park zone 1",
    "yala national park zone 2",
    "yala national park block 1",
    "yala national park gates",

    // WILDLIFE SPECIFIC KEYWORDS
    "yala leopard safari",
    "yala leopard spotting",
    "yala leopard sighting",
    "yala leopard tours",
    "yala elephant safari",
    "yala elephant watching",
    "yala sloth bear",
    "yala crocodile",
    "yala bird watching",
    "yala wildlife photography",
    "yala wildlife tours",
    "yala wildlife experience",
    "yala big game safari",
    "yala predator safari",

    // JEEP SERVICE KEYWORDS  
    "yala jeep service",
    "yala 4x4 safari",
    "yala safari vehicle",
    "yala jeep rental",
    "yala jeep hire",
    "yala safari transport",
    "yala jeep booking",
    "yala private jeep",
    "yala shared jeep",
    "yala luxury jeep",
    "yala open jeep",
    "yala safari car",

    // LOCATION BASED KEYWORDS
    "tissamaharama yala safari",
    "kataragama yala tours",
    "hambantota yala safari",
    "kirinda yala safari",
    "palatupana yala entrance",
    "yala safari from colombo",
    "yala safari from kandy",
    "yala safari from ella",
    "yala safari from mirissa",
    "yala safari from galle",

    // SERVICE TYPE KEYWORDS
    "half day yala safari",
    "full day yala safari",
    "morning yala safari",
    "evening yala safari",
    "private yala safari",
    "group yala safari",
    "budget yala safari",
    "luxury yala safari",
    "yala safari with lunch",
    "yala camping safari",
    "yala photography safari",
    "yala family safari",

    // COMPARATIVE KEYWORDS
    "best yala safari",
    "top yala safari operator",
    "yala vs udawalawe",
    "yala vs wilpattu",
    "yala vs minneriya",
    "best time yala safari",
    "yala safari season",
    "yala park opening times",
    "yala safari weather",

    // BOOKING RELATED KEYWORDS
    "book yala safari online",
    "yala safari advance booking",
    "yala safari last minute",
    "yala safari availability",
    "yala safari confirmation",
    "yala safari cancellation",
    "yala safari packages sri lanka",
    "yala safari deals",
    "yala safari offers",
    "yala safari discount",

    // LONG TAIL KEYWORDS
    "best yala safari operator sri lanka",
    "guaranteed leopard sighting yala",
    "yala national park safari booking online",
    "private yala safari with guide",
    "luxury yala safari experience",
    "yala wildlife photography tour",
    "yala safari from tissamaharama",
    "early morning yala safari",
    "yala safari jeep with driver",
    "yala park entrance fee included",

    // GENERAL SRI LANKA SAFARI KEYWORDS
    "sri lanka safari",
    "sri lanka wildlife tours",
    "sri lanka national parks",
    "sri lanka leopard safari",
    "sri lanka elephant safari",
    "best safari sri lanka",
    "sri lanka safari packages",
    "sri lanka wildlife photography",
    "sri lanka eco tourism",
    "sri lanka nature tours"
  ],

  other: {
    "geo.region": "LK-82",
    "geo.placename": "Yala National Park, Tissamaharama, Sri Lanka",
    "geo.position": "6.3747;81.1185",
    "ICBM": "6.3747, 81.1185",
    "DC.title": "Yala Safari Tours | #1 Wildlife Experience Sri Lanka",
    "DC.creator": "Yala Wildlife Safari",
    "DC.subject": "Yala Safari, Yala National Park, Sri Lanka Wildlife, Leopard Safari, Elephant Tours",
    "DC.description": "Premium Yala National Park safari tours with expert guides and guaranteed wildlife sightings",
    "DC.publisher": "Yala Wildlife Safari",
    "DC.contributor": "Professional Safari Guides",
    "DC.date": new Date().toISOString(),
    "DC.type": "Safari Tourism Service",
    "DC.format": "text/html",
    "DC.identifier": BASE_URL, // ✅ FIXED
    "DC.language": "en",
    "DC.coverage": "Yala National Park, Southern Province, Sri Lanka",
    "DC.rights": "Copyright Yala Wildlife Safari",
    "rating": "general",
    "revisit-after": "3 days",
    "distribution": "global",
    "robots": "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    "googlebot": "index, follow, max-image-preview:large",
    "bingbot": "index, follow",
    "yandexbot": "index, follow",
    "theme-color": "#22c55e",
    "msapplication-TileColor": "#22c55e",
    "msapplication-TileImage": "/mstile-144x144.png",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "Yala Safari",
    "format-detection": "telephone=yes",
    "skype_toolbar": "skype_toolbar_parser_compatible",
    "news_keywords": "yala safari, sri lanka wildlife, leopard spotting, elephant watching",
    "article:section": "Travel & Tourism",
    "article:tag": "Yala Safari, Wildlife Tours, Sri Lanka Tourism",
    "dns-prefetch": "//fonts.googleapis.com",
    "preconnect": "//images.unsplash.com",
    "fb:app_id": "your-facebook-app-id",
    "fb:page_id": "your-facebook-page-id",
  },

  openGraph: {
    type: "website",
    title: "Yala Safari Tours | #1 Wildlife Experience Sri Lanka",
    description: "Premium Yala National Park safari tours. Expert guides, guaranteed leopard sightings, luxury jeeps. Book your adventure today!",
    url: BASE_URL, // ✅ FIXED
    siteName: "Yala National Park | Official | Yala Sri Lanka | Yala Wildlife Safari",
    locale: "en_US",
    images: [
      {
        url: `${BASE_URL}/og-image.jpg`, // ✅ FIXED
        width: 1200,
        height: 630,
        alt: "Yala Wildlife Safari - Premium Safari Experience in Sri Lanka",
        type: "image/jpeg",
      },
      {
        url: `${BASE_URL}/yala-leopard-og.jpg`, // ✅ FIXED
        width: 1200,
        height: 630,
        alt: "Leopard Spotting in Yala National Park",
        type: "image/jpeg",
      },
      {
        url: `${BASE_URL}/yala-elephant-og.jpg`, // ✅ FIXED
        width: 1200,
        height: 630,
        alt: "Elephant Herd in Yala National Park",
        type: "image/jpeg",
      }
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@yalawildlife",
    creator: "@yalawildlife",
    title: "Yala Safari Tours | #1 Wildlife Experience",
    description: "Premium Yala National Park safari tours. Expert guides, guaranteed leopard sightings, luxury jeeps.",
    images: {
      url: `${BASE_URL}/og-image.jpg`, // ✅ FIXED
      alt: "Yala Wildlife Safari - Premium Safari Experience",
    },
  },

  alternates: {
    canonical: BASE_URL, // ✅ FIXED
    languages: {
      "en-US": BASE_URL, // ✅ FIXED
      "en-GB": BASE_URL, // ✅ FIXED
      "en-AU": BASE_URL, // ✅ FIXED
      "en-CA": BASE_URL, // ✅ FIXED
    },
    // ✅ REMOVED: Mobile alternate URL to avoid 404 errors
  },

  applicationName: "Yala Wildlife Safari",
  authors: [
    {
      name: "Yala Wildlife Safari",
      url: BASE_URL, // ✅ FIXED
    },
  ],
  category: "Travel & Tourism",
  classification: "Safari Tours, Wildlife Tourism, Eco Tourism, Adventure Tourism",
  referrer: "origin-when-cross-origin",

  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    viewportFit: "cover",
  },

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
      { url: "/apple-touch-icon-152x152.png", sizes: "152x152", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#22c55e",
      },
      {
        rel: "shortcut icon",
        url: "/favicon.ico",
      }
    ],
  },

  manifest: "/site.webmanifest",
  generator: "Next.js",
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

      {/* ✅ FIXED: All schema URLs use BASE_URL */}
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
              alternateName: ["Yala National Park Safari", "Yala Wildlife Tours", "Yala Jeep Safari"],
              description: "Professional wildlife safari tours in Yala National Park with expert guides, luxury jeeps, and guaranteed leopard sightings",
              brand: {
                "@type": "Brand",
                name: "Yala Wildlife Safari",
                logo: `${BASE_URL}/logo.png` // ✅ FIXED
              },
              image: [
                `${BASE_URL}/safari-jeep.jpg`, // ✅ FIXED
                `${BASE_URL}/leopard-sighting.jpg`, // ✅ FIXED
                `${BASE_URL}/elephant-herd.jpg`, // ✅ FIXED
                `${BASE_URL}/yala-landscape.jpg` // ✅ FIXED
              ],
              offers: {
                "@type": "AggregateOffer",
                priceCurrency: "USD",
                lowPrice: "50",
                highPrice: "250",
                priceRange: "$$",
                availability: "https://schema.org/InStock",
                validFrom: new Date().toISOString(),
                validThrough: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
                url: `${BASE_URL}/safari-packages`, // ✅ FIXED
                seller: {
                  "@type": "Organization",
                  name: "Yala Wildlife Safari"
                }
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "200",
                bestRating: "5",
                worstRating: "1"
              },
              category: "Safari Tours",
              audience: {
                "@type": "Audience",
                audienceType: "Wildlife Enthusiasts"
              },
              hasVariant: [
                {
                  "@type": "ProductModel",
                  name: "Half Day Safari",
                  description: "4-hour morning or evening safari experience"
                },
                {
                  "@type": "ProductModel",
                  name: "Full Day Safari",
                  description: "8-hour comprehensive safari adventure"
                }
              ]
            },

            {
              "@context": "https://schema.org",
              "@type": "TouristDestination",
              name: "Yala National Park",
              alternateName: ["Yala", "Yala Wildlife Sanctuary", "Ruhuna National Park"],
              description: "Sri Lanka's premier national park famous for having the world's highest leopard density",
              image: [
                `${BASE_URL}/yala-park.jpg`, // ✅ FIXED
                `${BASE_URL}/yala-wildlife.jpg` // ✅ FIXED
              ],
              url: BASE_URL, // ✅ FIXED
              sameAs: [
                "https://en.wikipedia.org/wiki/Yala_National_Park",
                "https://www.sltda.gov.lk/"
              ],
              address: {
                "@type": "PostalAddress",
                addressLocality: "Tissamaharama",
                addressRegion: "Southern Province",
                addressCountry: "LK",
                postalCode: "82600"
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 6.3747,
                longitude: 81.1185
              },
              touristType: ["Wildlife Enthusiasts", "Photographers", "Nature Lovers", "Adventure Travelers"],
              includesAttraction: [
                {
                  "@type": "TouristAttraction",
                  name: "Leopard Spotting",
                  description: "World's highest leopard density - virtually guaranteed sightings"
                },
                {
                  "@type": "TouristAttraction",
                  name: "Elephant Watching",
                  description: "Large herds of wild Asian elephants"
                },
                {
                  "@type": "TouristAttraction",
                  name: "Sloth Bear Encounters",
                  description: "Rare sightings of Sri Lankan sloth bears"
                },
                {
                  "@type": "TouristAttraction",
                  name: "Bird Watching",
                  description: "Over 200 bird species including peacocks and eagles"
                }
              ],
              containsPlace: [
                {
                  "@type": "Place",
                  name: "Yala Block 1",
                  description: "Main safari area with highest wildlife density"
                },
                {
                  "@type": "Place",
                  name: "Yala Block 2",
                  description: "Less crowded area with excellent bird watching"
                }
              ]
            },

            {
              "@context": "https://schema.org",
              "@type": "Service",
              serviceType: "Safari Tours",
              name: "Yala Safari Jeep Service",
              description: "Professional safari guide services with luxury 4x4 vehicles in Yala National Park",
              provider: {
                "@type": "Organization",
                name: "Yala Wildlife Safari",
                url: BASE_URL // ✅ FIXED
              },
              areaServed: {
                "@type": "Place",
                name: "Yala National Park, Sri Lanka"
              },
              availableChannel: {
                "@type": "ServiceChannel",
                serviceUrl: BASE_URL, // ✅ FIXED
                servicePhone: "+94-778-158-004"
              },
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Yala Safari Packages",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Half Day Morning Safari",
                      description: "6:00 AM - 10:00 AM prime wildlife viewing"
                    },
                    price: "75",
                    priceCurrency: "USD"
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Half Day Evening Safari",
                      description: "2:00 PM - 6:00 PM golden hour experience"
                    },
                    price: "75",
                    priceCurrency: "USD"
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Full Day Safari",
                      description: "6:00 AM - 6:00 PM complete safari experience"
                    },
                    price: "150",
                    priceCurrency: "USD"
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Private Luxury Safari",
                      description: "Exclusive vehicle with expert naturalist guide"
                    },
                    price: "250",
                    priceCurrency: "USD"
                  }
                ]
              }
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
                    text: "The best time for Yala safari is February to June during dry season when water levels are low and animals gather around waterholes. This period offers the highest wildlife sighting opportunities, especially for leopards."
                  }
                },
                {
                  "@type": "Question",
                  name: "How much does a Yala safari cost?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yala safari tours range from $50-250 per person. Half-day safaris start at $75, full-day experiences at $150, and private luxury safaris at $250. Prices include jeep, driver-guide, and park entrance fees."
                  }
                },
                {
                  "@type": "Question",
                  name: "What animals can I see in Yala National Park?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yala is famous for leopards (world's highest density), Asian elephants, sloth bears, spotted deer, wild boar, crocodiles, and over 200 bird species including peacocks, eagles, and storks."
                  }
                },
                {
                  "@type": "Question",
                  name: "How do I book a Yala safari?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Book your Yala safari online through our website or contact us directly. We recommend advance booking, especially during peak season (February-June) to guarantee availability."
                  }
                },
                {
                  "@type": "Question",
                  name: "What is included in Yala safari tours?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Our Yala safari packages include luxury 4x4 jeep, experienced driver-guide, park entrance fees, bottled water, and wildlife spotting guarantee. Full-day tours include Sri Lankan lunch."
                  }
                }
              ]
            },

            {
              "@context": "https://schema.org",
              "@type": "Event",
              name: "Yala Wildlife Safari Experience",
              description: "Daily wildlife safari tours in Yala National Park",
              startDate: new Date().toISOString(),
              endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
              eventSchedule: {
                "@type": "Schedule",
                repeatFrequency: "Daily",
                byDay: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
              },
              location: {
                "@type": "Place",
                name: "Yala National Park",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Tissamaharama",
                  addressRegion: "Southern Province",
                  addressCountry: "LK"
                }
              },
              organizer: {
                "@type": "Organization",
                name: "Yala Wildlife Safari",
                url: BASE_URL // ✅ FIXED
              },
              offers: {
                "@type": "Offer",
                price: "75",
                priceCurrency: "USD",
                availability: "https://schema.org/InStock"
              }
            }
          ]),
        }}
      />

      {/* ✅ FIXED: Breadcrumb Schema with BASE_URL */}
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
                item: BASE_URL // ✅ FIXED
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Yala Safari Tours",
                item: `${BASE_URL}/safari-packages` // ✅ FIXED
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Yala National Park",
                item: `${BASE_URL}/yala-national-park` // ✅ FIXED
              }
            ]
          }),
        }}
      />

      {/* Website Navigation Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SiteNavigationElement",
            name: [
              "Yala Safari Tours",
              "Safari Packages",
              "Yala Wildlife",
              "Safari Booking",
              "Contact Us"
            ]
          }),
        }}
      />
    </>
  );
}
