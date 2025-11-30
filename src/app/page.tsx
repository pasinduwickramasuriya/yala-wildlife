// import type { Metadata } from "next";
// import ClientHome from "./ClientHome";
// import {
//   organizationSchema,
//   websiteSchema,
//   localBusinessSchema,
// } from "@/lib/schema";

// // ✅ FIXED: Use consistent static URL for canonical purposes
// const BASE_URL = "https://www.yalawildlife.com";

// export const metadata: Metadata = {
//   metadataBase: new URL(BASE_URL),

//   title: "Yala Safari Tours | #1 Wildlife Experience Sri Lanka",
//   description: "Premium Yala National Park safari tours. Expert guides, guaranteed leopard sightings, luxury jeeps. Book Sri Lanka's top wildlife experience now!",

//   keywords: [
//     "yala",
//     "yala safari",
//     "yala national park",
//     "sri lanka safari",
//     "yala wildlife tours",
//     "yala safari booking",
//     "yala jeep safari",
//     "yala safari tours",
//     "yala wildlife",
//     "yala leopard",
//     "yala elephant",
//     "best yala safari tours sri lanka",
//     "yala national park safari booking",
//     "guaranteed leopard sighting yala",
//     "luxury yala safari experience",
//     "private yala safari with guide",
//     "yala wildlife photography tours",
//     "premium yala safari packages",
//     "yala safari jeep service",
//     "expert guide yala safari",
//     "professional yala safari operator",
//     "top rated yala safari company",
//     "tissamaharama yala safari",
//     "kataragama safari tours",
//     "hambantota yala tours",
//     "yala safari from colombo",
//     "yala safari from kandy",
//     "yala safari from galle",
//     "yala safari from ella",
//     "yala safari from mirissa",
//     "southern province safari",
//     "palatupana entrance yala",
//     "kirinda yala safari",
//     "buttala yala tours",
//     "yala leopard safari",
//     "yala elephant watching",
//     "sri lanka leopard tours",
//     "yala bird watching tours",
//     "yala sloth bear safari",
//     "yala crocodile spotting",
//     "leopard spotting yala",
//     "elephant herd yala",
//     "wildlife photography yala",
//     "big game safari yala",
//     "yala predator safari",
//     "yala nocturnal animals",
//     "half day yala safari",
//     "full day yala safari",
//     "morning yala safari",
//     "evening yala safari",
//     "budget yala safari",
//     "luxury yala jeep service",
//     "private yala safari",
//     "group yala safari",
//     "family yala safari",
//     "yala camping safari",
//     "multi day yala safari",
//     "customized yala tours",
//     "best yala safari operator",
//     "top rated yala tours",
//     "yala vs udawalawe safari",
//     "yala vs wilpattu park",
//     "best time visit yala",
//     "yala safari season",
//     "yala park opening times",
//     "yala safari weather",
//     "dry season yala safari",
//     "wet season yala tours",
//     "book yala safari online",
//     "yala safari advance booking",
//     "yala safari last minute",
//     "yala safari packages sri lanka",
//     "yala safari deals offers",
//     "cheap yala safari tours",
//     "yala safari reservation",
//     "yala safari availability",
//     "yala safari price list",
//     "yala safari cost per person",
//     "yala safari adventure",
//     "yala safari experience",
//     "yala safari journey",
//     "yala safari expedition",
//     "yala safari trip",
//     "yala safari holiday",
//     "yala safari vacation",
//     "yala eco tourism",
//     "sustainable yala safari",
//     "responsible yala tourism",
//     "educational yala tours",
//     "conservation yala safari",
//     "sri lanka wildlife tours",
//     "sri lanka national parks",
//     "sri lanka eco tourism",
//     "best safari sri lanka",
//     "sri lanka adventure tours",
//     "wildlife photography sri lanka",
//     "nature tours sri lanka",
//     "conservation tourism sri lanka",
//     "sri lanka biodiversity tours",
//     "endemic species sri lanka",
//     "4x4 yala safari",
//     "jeep tour yala",
//     "open vehicle safari",
//     "yala game drive",
//     "yala nature tour",
//     "yala park tour",
//     "yala wilderness tour",
//     "safari vehicle rental yala",
//     "luxury safari jeep yala",
//     "air conditioned safari vehicle",
//     "yala block 1 safari",
//     "yala zone 1 tours",
//     "yala block 2 safari",
//     "yala zone 2 experience",
//     "patanangala beach yala",
//     "sithulpawwa yala",
//     "kumana national park",
//     "bundala wetland safari",
//     // --- 🔥 HIGH VOLUME / BRAND CORE ---
//     "yala national park", "yala safari", "sri lanka safari", "yala wildlife safari",
//     "yala jeep safari", "yala national park safari", "official yala safari",
//     "visit yala", "yala sri lanka", "safari in sri lanka",

//     // --- 💰 BOOKING & PRICING INTENT (Transactional) ---
//     "book yala safari online", "yala safari price 2025", "yala entrance fee 2025",
//     "yala jeep rental cost", "reserve safari jeep yala", "buy yala tickets online",
//     "yala safari booking official", "best price safari yala", "budget safari yala",
//     "luxury safari packages yala", "private jeep hire yala", "shared safari jeep yala",
//     "yala full day safari price", "half day safari rates yala", "cheap yala tours",
//     "yala safari cancellation policy", "last minute safari booking yala",

//     // --- 🐆 SPECIFIC WILDLIFE (The "Big 3" & More) ---
//     "yala leopard safari", "sri lankan leopard sightings", "panthera pardus koti",
//     "best place to see leopards in sri lanka", "yala sloth bear sightings",
//     "melursus ursinus yala", "yala elephant safari", "asian elephant sri lanka",
//     "yala crocodile tour", "yala bird watching", "painted stork yala",
//     "black necked stork yala", "yala reptiles", "wild boar yala", "spotted deer herds",
//     "yala peacock dance", "yala hornbill", "wildlife of yala", "big game safari sri lanka",

//     // --- 📍 LOCATION & LOGISTICS (Geographic SEO) ---
//     "colombo to yala safari", "galle to yala day trip", "ella to yala transfer",
//     "mirissa to yala safari tour", "hambantota to yala", "tangalle to yala",
//     "kandy to yala tour", "arugam bay to yala", "mattala airport to yala",
//     "tissamaharama safari", "hotels in tissamaharama", "safari near kataragama",
//     "palatupana entrance yala", "katagamuwa entrance safari", "galge entrance yala",
//     "yala block 1 safari", "yala block 5 safari", "sithulpawwa road safari",
//     "kirinda to yala", "southern province things to do",

//     // --- 🌟 EXPERIENCE TYPES (Niche Targeting) ---
//     "luxury yala safari experience", "vip safari sri lanka", "glamping yala national park",
//     "camping inside yala", "yala eco lodge", "family friendly safari sri lanka",
//     "honeymoon safari packages", "romantic safari yala", "kids safari yala",
//     "senior citizen friendly safari", "accessible safari sri lanka",
//     "corporate safari packages", "educational wildlife tours", "school trip yala",

//     // --- 📸 PHOTOGRAPHY & EXPERT LED ---
//     "yala wildlife photography tour", "professional safari guide yala",
//     "birding tour yala", "best lens for yala safari", "wildlife filmmaker fixer yala",
//     "golden hour safari yala", "morning vs evening safari yala", "full day game drive",
//     "yala tracker service", "expert naturalist yala", "custom safari itinerary",

//     // --- 📅 TIMING & PLANNING (Informational) ---
//     "best time to visit yala", "yala safari season", "yala drought season",
//     "yala park closing dates 2025", "yala weather september", "yala weather december",
//     "yala safari opening hours", "how long is yala safari", "what to wear yala safari",
//     "yala safari rules", "safety in yala national park",

//     // --- 🌿 SUSTAINABILITY & VALUES ---
//     "eco friendly safari yala", "sustainable tourism sri lanka", "responsible wildlife watching",
//     "ethical safari operator", "conservation projects yala", "plastic free safari",
//     "support local guides yala", "community tourism sri lanka",

//     // --- 🆚 COMPARISONS (Competitor Targeting) ---
//     "yala vs udawalawe", "yala vs wilpattu", "yala vs minneriya",
//     "best national park in sri lanka", "yala vs bundala", "kumana vs yala",

//     // --- 🚀 LONG TAIL & VOICE SEARCH ---
//     "where to see leopards in sri lanka", "how to book yala jeep online",
//     "can you see bears in yala", "driver for yala safari", "taxi to yala national park",
//     "is yala national park open today", "safari tour with breakfast yala",
//     "sunset safari yala national park", "early morning safari yala"
//   ],

//   other: {
//     "geo.region": "LK-82",
//     "geo.placename": "Yala National Park, Tissamaharama, Southern Province, Sri Lanka",
//     "geo.position": "6.3747;81.1185",
//     "ICBM": "6.3747, 81.1185",
//     "DC.title": "Yala Safari Tours | #1 Wildlife Experience Sri Lanka",
//     "DC.creator": "Yala Wildlife Safari",
//     "DC.subject": "Yala Safari, Wildlife Tours, Sri Lanka Tourism, Leopard Safari, Elephant Watching, National Park Tours",
//     "DC.description": "Premium Yala National Park safari tours with expert guides, guaranteed wildlife sightings, and luxury jeep service",
//     "DC.publisher": "Yala Wildlife Safari",
//     "DC.contributor": "Expert Safari Guides, Wildlife Naturalists, Conservation Specialists",
//     "DC.date": new Date().toISOString(),
//     "DC.type": "Tourism Service, Wildlife Tours, Eco Tourism",
//     "DC.format": "text/html",
//     "DC.identifier": BASE_URL,
//     "DC.language": "en",
//     "DC.coverage": "Yala National Park, Southern Province, Sri Lanka",
//     "DC.rights": "Copyright 2025 Yala Wildlife Safari",
//     "robots": "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
//     "googlebot": "index, follow, max-image-preview:large, max-snippet:-1",
//     "bingbot": "index, follow, max-image-preview:large",
//     "yandexbot": "index, follow",
//     "revisit-after": "1 days",
//     "rating": "general",
//     "distribution": "global",
//     "theme-color": "#22c55e",
//     "msapplication-TileColor": "#22c55e",
//     "msapplication-TileImage": "/mstile-144x144.png",
//     "apple-mobile-web-app-capable": "yes",
//     "apple-mobile-web-app-status-bar-style": "black-translucent",
//     "apple-mobile-web-app-title": "Yala Safari",
//     "format-detection": "telephone=yes, address=yes, email=yes",
//     "news_keywords": "yala safari, sri lanka wildlife, leopard spotting, elephant watching, eco tourism, national park, conservation, biodiversity",
//     "article:section": "Travel & Tourism",
//     "article:tag": "Yala Safari, Wildlife Tours, Sri Lanka Tourism, Eco Travel, Adventure Tourism",
//     "article:author": "Yala Wildlife Safari",
//     "article:publisher": "Yala Wildlife Safari",
//     "article:published_time": new Date().toISOString(),
//     "business:contact_data:street_address": "Safari Base, Tissamaharama Road",
//     "business:contact_data:locality": "Tissamaharama",
//     "business:contact_data:region": "Southern Province",
//     "business:contact_data:postal_code": "82600",
//     "business:contact_data:country_name": "Sri Lanka",
//     "business:contact_data:phone_number": "+94-778-158-004",
//     "business:contact_data:website": BASE_URL,
//   },

//   openGraph: {
//     type: "website",
//     title: "Yala Safari Tours | #1 Wildlife Experience Sri Lanka",
//     description: "Premium Yala National Park safari tours. Expert guides, guaranteed leopard sightings, luxury jeeps. Book your adventure today!",
//     url: BASE_URL, // ✅ Always points to main domain only
//     siteName: "Yala Wildlife Safari | Premier Safari Experience",
//     locale: "en_US",
//     images: [
//       {
//         url: `${BASE_URL}/og-yala-safari-main.jpg`,
//         width: 1200,
//         height: 630,
//         alt: "Yala Wildlife Safari - Premium Safari Experience in Sri Lanka",
//         type: "image/jpeg",
//       },
//       {
//         url: `${BASE_URL}/og-leopard-spotting.jpg`,
//         width: 1200,
//         height: 630,
//         alt: "Leopard Spotting in Yala National Park Safari Tour",
//         type: "image/jpeg",
//       },
//       {
//         url: `${BASE_URL}/og-elephant-herd.jpg`,
//         width: 1200,
//         height: 630,
//         alt: "Wild Elephant Herd Safari Experience in Yala",
//         type: "image/jpeg",
//       },
//       {
//         url: `${BASE_URL}/og-luxury-jeep.jpg`,
//         width: 1200,
//         height: 630,
//         alt: "Luxury Safari Jeep Tour in Yala National Park",
//         type: "image/jpeg",
//       }
//     ],
//   },

//   twitter: {
//     card: "summary_large_image",
//     site: "@yalawildlife",
//     creator: "@yalawildlife",
//     title: "Yala Safari Tours | #1 Wildlife Experience",
//     description: "Premium Yala National Park safari tours. Expert guides, guaranteed leopard sightings, luxury jeeps. Book now!",
//     images: {
//       url: `${BASE_URL}/twitter-yala-safari.jpg`,
//       alt: "Yala Wildlife Safari - Premium Experience",
//     },
//   },

//   // ✅ CRITICAL: Canonical URL points ONLY to main domain - NO mobile URLs
//   alternates: {
//     canonical: BASE_URL, // This ensures only www.yalawildlife.com appears in search results
//     languages: {
//       "en-US": BASE_URL,
//       "en-GB": BASE_URL,
//       "en-AU": BASE_URL,
//       "en-CA": BASE_URL,
//       "en-IN": BASE_URL,
//     },
//     // ✅ REMOVED: No mobile-specific URLs to prevent /mobile from appearing
//   },

//   applicationName: "Yala Wildlife Safari",
//   authors: [
//     {
//       name: "Yala Wildlife Safari",
//       url: BASE_URL,
//     },
//   ],
//   generator: "Next.js 15",
//   category: "Travel & Tourism",
//   classification: "Safari Tours, Wildlife Tourism, Eco Tourism, Adventure Tourism, Nature Tourism, Conservation Tourism",
//   referrer: "origin-when-cross-origin",

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
//     ],
//     other: [
//       {
//         rel: "mask-icon",
//         url: "/safari-pinned-tab.svg",
//         color: "#22c55e",
//       },
//     ],
//   },

//   manifest: "/site.webmanifest",

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

//       {/* Schema markup with consistent BASE_URL */}
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
//               alternateName: ["Yala National Park Safari", "Sri Lanka Wildlife Tours", "Yala Jeep Safari"],
//               description: "Professional wildlife safari tours in Yala National Park with expert guides, luxury 4x4 jeeps, and guaranteed leopard sightings",
//               brand: {
//                 "@type": "Brand",
//                 name: "Yala Wildlife Safari",
//                 logo: `${BASE_URL}/logo.png`
//               },
//               image: [
//                 `${BASE_URL}/safari-jeep.jpg`,
//                 `${BASE_URL}/leopard-sighting.jpg`,
//                 `${BASE_URL}/elephant-herd.jpg`,
//                 `${BASE_URL}/yala-landscape.jpg`
//               ],
//               offers: {
//                 "@type": "AggregateOffer",
//                 priceCurrency: "USD",
//                 lowPrice: "50",
//                 highPrice: "350",
//                 priceRange: "$$",
//                 availability: "https://schema.org/InStock",
//                 validFrom: new Date().toISOString(),
//                 validThrough: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
//                 url: `${BASE_URL}/safari-packages`,
//                 seller: {
//                   "@type": "Organization",
//                   name: "Yala Wildlife Safari"
//                 }
//               },
//               aggregateRating: {
//                 "@type": "AggregateRating",
//                 ratingValue: "4.9",
//                 reviewCount: "300",
//                 bestRating: "5",
//                 worstRating: "1"
//               },
//               category: "Safari Tours",
//               audience: {
//                 "@type": "Audience",
//                 audienceType: "Wildlife Enthusiasts"
//               }
//             },

//             {
//               "@context": "https://schema.org",
//               "@type": "TouristDestination",
//               name: "Yala National Park",
//               alternateName: ["Yala", "Ruhuna National Park"],
//               description: "Sri Lanka's premier national park famous for having the world's highest leopard density",
//               image: `${BASE_URL}/yala-park.jpg`,
//               url: BASE_URL, // ✅ Points to main domain only
//               address: {
//                 "@type": "PostalAddress",
//                 addressLocality: "Tissamaharama",
//                 addressRegion: "Southern Province",
//                 addressCountry: "LK"
//               },
//               geo: {
//                 "@type": "GeoCoordinates",
//                 latitude: 6.3747,
//                 longitude: 81.1185
//               },
//               touristType: ["Wildlife Enthusiasts", "Photographers", "Nature Lovers"],
//               includesAttraction: [
//                 {
//                   "@type": "TouristAttraction",
//                   name: "Leopard Spotting",
//                   description: "World's highest leopard density"
//                 },
//                 {
//                   "@type": "TouristAttraction",
//                   name: "Elephant Watching",
//                   description: "Large herds of wild elephants"
//                 }
//               ]
//             },

//             {
//               "@context": "https://schema.org",
//               "@type": "FAQPage",
//               mainEntity: [
//                 {
//                   "@type": "Question",
//                   name: "What is the best time to visit Yala National Park?",
//                   acceptedAnswer: {
//                     "@type": "Answer",
//                     text: "The best time for Yala safari is February to June during dry season when water levels are low and animals gather around waterholes, increasing wildlife sighting opportunities."
//                   }
//                 },
//                 {
//                   "@type": "Question",
//                   name: "How much does a Yala safari cost?",
//                   acceptedAnswer: {
//                     "@type": "Answer",
//                     text: "Yala safari tours range from $50-350 per person. Half-day safaris start at $75, full-day experiences at $150, private luxury safaris at $350. Prices include jeep, guide, and park fees."
//                   }
//                 },
//                 {
//                   "@type": "Question",
//                   name: "What animals can I see in Yala?",
//                   acceptedAnswer: {
//                     "@type": "Answer",
//                     text: "Yala is famous for leopards (world's highest density), Asian elephants, sloth bears, spotted deer, crocodiles, and over 200 bird species including peacocks and eagles."
//                   }
//                 }
//               ]
//             }
//           ]),
//         }}
//       />

//       {/* Breadcrumb schema with consistent URL */}
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
//                 item: BASE_URL // ✅ Only main domain
//               },
//               {
//                 "@type": "ListItem",
//                 position: 2,
//                 name: "Safari Tours",
//                 item: `${BASE_URL}/safari-packages`
//               }
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

// ✅ CONFIG: Canonical Base URL
const BASE_URL = "https://www.yalawildlife.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  // 🚀 TITLE: Optimized for 2025 Search Trends & Click-Through Rate
  title: {
    default: "Yala National Park Safari | #1 Official Jeep Booking & Prices 2025",
    template: "%s | Yala Wildlife Safari Sri Lanka",
  },

  // 🚀 DESCRIPTION: High-conversion copy with "Guaranteed" and "Official" triggers
  description: "Official 2025 Yala National Park Safari Booking. 🐆 World's Highest Leopard Density. Luxury 4x4 Jeep Tours, Expert Naturalist Guides & Best Price Guarantee. Book Morning, Evening & Full Day Safaris Online. Instant Confirmation.",

  // 🚀 KEYWORDS: MASSIVE LIST (Categorized for maximum indexing coverage)
  keywords: [

    // --- 🔥 CORE BRAND & INTENT ---
    "yala national park", "yala safari", "sri lanka safari", "yala wildlife safari", "yala jeep safari",
    "official yala safari booking", "yala national park official site", "visit yala", "safari sri lanka",
    "yala safari booking online", "yala safari tours", "yala national park tours", "yala wildlife tours",
    "best safari yala", "top rated safari yala", "recommended safari yala", "yala safari reviews",
    "yala safari tripadvisor", "yala safari google reviews", "yala safari facebook reviews",
    "yala safari instagram", "yala safari youtube", "yala safari blog", "yala safari guide",
    "yala safari map", "yala safari entrance", "yala safari gate", "yala safari ticket",
    "yala safari jeep rental", "yala safari jeep hire", "yala safari driver", "yala safari tracker",
    "yala safari naturalist", "yala safari expert", "yala safari specialist", "yala safari company",
    "yala safari agency", "yala safari operator", "yala safari service", "yala safari provider",

    // --- 💰 PRICING & BOOKING (Transactional) ---
    "yala safari price 2025", "yala safari cost", "yala entrance fee 2025", "yala jeep rental price",
    "cheap safari yala", "budget yala safari", "luxury safari yala price", "best price safari yala",
    "book yala safari online", "reserve safari jeep yala", "buy yala tickets", "yala safari packages",
    "private jeep hire yala", "shared safari cost", "safari tipping guide sri lanka",
    "yala safari discounts", "yala safari deals", "yala safari offers", "yala safari promotions",
    "yala safari coupons", "yala safari vouchers", "yala safari group rates", "yala safari family rates",
    "yala safari student rates", "yala safari children rates", "yala safari senior citizen rates",
    "yala safari local rates", "yala safari foreign rates", "yala safari resident rates",
    "yala safari non-resident rates", "yala safari peak season rates", "yala safari off-peak rates",
    "yala safari weekend rates", "yala safari weekday rates", "yala safari holiday rates",

    // --- 🐆 WILDLIFE SPECIFIC (The "Big 5") ---
    "yala leopard safari", "best place to see leopards", "sri lankan leopard", "panthera pardus koti",
    "yala sloth bear", "sloth bear sightings", "melursus ursinus",
    "yala elephant safari", "asian elephant herds", "yala tuskers", "gemunu tusker",
    "yala bird watching", "birding tours sri lanka", "painted stork", "black necked stork",
    "yala crocodile", "mugger crocodile", "wild buffalo", "spotted deer", "sambar deer",
    "yala wildlife list", "yala animals checklist", "yala birds checklist", "yala reptiles checklist",
    "yala mammals checklist", "yala amphibians checklist", "yala insects checklist", "yala flora checklist",
    "yala fauna checklist", "yala biodiversity", "yala ecosystem", "yala habitat", "yala nature",
    "yala conservation", "yala wildlife protection", "yala animal rescue", "yala wildlife sanctuary",

    // --- 📍 LOCATION & ROUTES (Geographic) ---
    "colombo to yala safari", "galle to yala day trip", "ella to yala safari", "mirissa to yala tour",
    "hambantota to yala", "tangalle to yala", "arugam bay to yala", "kataragama to yala",
    "tissamaharama safari", "hotels near yala", "best hotel yala", "yala glamping",
    "yala palatupana entrance", "yala katagamuwa entrance", "yala galge gate", "yala sithulpawwa",
    "yala block 1", "yala block 2", "yala block 3", "yala block 4", "yala block 5",
    "yala strict natural reserve", "yala east", "yala west", "yala north", "yala south",
    "yala coastal safari", "yala jungle safari", "yala forest safari", "yala lagoon safari",
    "yala river safari", "yala lake safari", "yala beach safari", "yala camping site",

    // --- 🌟 EXPERIENCE TYPES ---
    "luxury camping yala", "vip safari sri lanka", "family safari yala", "kids friendly safari",
    "honeymoon safari sri lanka", "photography safari yala", "wildlife photography tour",
    "morning safari yala", "evening safari yala", "full day safari yala", "half day safari",
    "private tour guide yala", "english speaking driver yala", "french speaking guide yala",
    "german speaking guide yala", "chinese speaking guide yala", "russian speaking guide yala",
    "japanese speaking guide yala", "arabic speaking guide yala", "spanish speaking guide yala",
    "italian speaking guide yala", "dutch speaking guide yala", "accessible safari yala",
    "wheelchair friendly safari yala", "senior friendly safari yala", "pet friendly safari yala",
    "eco friendly safari yala", "sustainable safari yala", "responsible safari yala",
    "ethical safari yala", "conservation safari yala", "educational safari yala",
    "research safari yala", "volunteer safari yala", "adventure safari yala",

    // --- 📅 SEASONALITY & PLANNING ---
    "best time to visit yala", "yala safari season", "is yala open in september",
    "yala weather february", "yala drought season", "leopard sighting chances",
    "what to wear on safari", "safari packing list sri lanka", "yala opening hours",
    "yala closing time", "yala park rules", "yala park regulations", "yala park safety",
    "yala park map pdf", "yala park guide book", "yala park history", "yala park facts",
    "yala park news", "yala park updates", "yala park contact", "yala park email",
    "yala park phone", "yala park address", "yala park location", "yala park directions",
    "yala park transport", "yala park taxi", "yala park bus", "yala park train",
    "yala park flight", "yala park airport", "mattala airport to yala",

    // --- 🆚 COMPARISONS ---
    "yala vs udawalawe", "yala vs wilpattu", "yala vs minneriya", "yala vs bundala",
    "best national park in sri lanka", "safari near galle", "safari near colombo",
    "safari near kandy", "safari near ella", "safari near nuwara eliya",
    "safari near bentota", "safari near hikkaduwa", "safari near unawatuna",
    "safari near weligama", "safari near matara", "safari near trincomalee",
    "safari near batticaloa", "safari near jaffna", "safari near anuradhapura",
    "safari near polonnaruwa", "safari near sigiriya", "safari near dambulla",

    // --- 🚀 LONG TAIL VARIATIONS ---
    "jeep safari yala contact number", "yala safari reviews tripadvisor",
    "safari driver recommendation yala", "yala national park animals list",
    "can i drive my own car in yala", "how to book yala jeep",
    "best safari jeep in yala", "safari jeep modifications yala",
    "safari jeep safety yala", "safari jeep comfort yala",
    "safari jeep capacity yala", "safari jeep type yala",
    "toyota hilux safari yala", "mitsubishi l200 safari yala",
    "land rover defender safari yala", "mahindra scorpio safari yala",
    "tata xenon safari yala", "nissan navara safari yala",
    "is yala crowded", "how to avoid crowds in yala",
    "best time of day for leopard in yala", "best time of day for bear in yala",
    "best time of day for elephant in yala", "best time of day for birding in yala",


    // --- 1. CORE BRAND & ENTITY ---
    "yala national park", "yala safari", "sri lanka safari", "yala wildlife safari", "yala jeep safari",
    "yala national park safari", "official yala safari", "visit yala", "yala sri lanka", "safari in sri lanka",
    "wildlife tours sri lanka", "best safari in sri lanka", "ruhuna national park", "yala official website",

    // --- 2. BOOKING & TRANSACTIONAL (Money Keywords) ---
    "book yala safari online", "yala safari price 2025", "yala entrance fee 2025", "yala jeep rental cost",
    "reserve safari jeep yala", "buy yala tickets online", "yala safari booking official", "best price safari yala",
    "budget safari yala", "luxury safari packages yala", "private jeep hire yala", "shared safari jeep yala",
    "yala full day safari price", "half day safari rates yala", "cheap yala tours", "yala safari cancellation policy",
    "last minute safari booking yala", "yala safari packages for locals", "yala safari packages for foreigners",
    "yala safari discount", "yala safari promo code", "yala safari deals", "yala safari offers",

    // --- 3. WILDLIFE SPECIFIC (The "Big 5" & Photographers) ---
    "yala leopard safari", "sri lankan leopard sightings", "panthera pardus koti", "best place to see leopards",
    "yala sloth bear sightings", "melursus ursinus yala", "yala elephant safari", "asian elephant sri lanka",
    "yala crocodile tour", "yala bird watching", "painted stork yala", "black necked stork yala",
    "yala reptiles", "wild boar yala", "spotted deer herds", "yala peacock dance", "yala hornbill",
    "wildlife of yala", "big game safari sri lanka", "yala tuskers", "sri lanka big five safari",
    "kumana bird sanctuary", "bundala bird watching", "yala wildlife photography",

    // --- 4. LOCATION & LOGISTICS (Route Based) ---
    "colombo to yala safari", "galle to yala day trip", "ella to yala transfer", "mirissa to yala safari tour",
    "hambantota to yala", "tangalle to yala", "kandy to yala tour", "arugam bay to yala",
    "mattala airport to yala", "tissamaharama safari", "hotels in tissamaharama", "safari near kataragama",
    "palatupana entrance yala", "katagamuwa entrance safari", "galge entrance yala", "yala block 1 safari",
    "yala block 2", "yala block 3", "yala block 4", "yala block 5 safari", "sithulpawwa road safari",
    "kirinda to yala", "southern province things to do", "ahungalla to yala", "bentota to yala day tour",
    "hikkaduwa to yala safari", "udawalawe to yala", "nuwara eliya to yala", "weligama to yala",

    // --- 5. EXPERIENCE TYPES (Niche Targeting) ---
    "luxury yala safari experience", "vip safari sri lanka", "glamping yala national park",
    "camping inside yala", "yala eco lodge", "family friendly safari sri lanka", "honeymoon safari packages",
    "romantic safari yala", "kids safari yala", "senior citizen friendly safari", "accessible safari sri lanka",
    "corporate safari packages", "educational wildlife tours", "school trip yala", "photography safari yala",
    "videography safari sri lanka", "birding tours yala", "private safari guide yala",

    // --- 6. TIMING & PLANNING ---
    "best time to visit yala", "yala safari season", "yala drought season", "yala park closing dates 2025",
    "yala weather september", "yala weather december", "yala safari opening hours", "how long is yala safari",
    "what to wear yala safari", "yala safari rules", "safety in yala national park", "morning vs evening safari yala",
    "yala full day safari itinerary", "golden hour safari yala", "yala monsoon season",

    // --- 7. COMPARISONS (Competitor Sniping) ---
    "yala vs udawalawe", "yala vs wilpattu", "yala vs minneriya", "best national park in sri lanka",
    "yala vs bundala", "kumana vs yala", "safari near galle vs yala", "kaudulla vs yala",

    // --- 8. LONG TAIL & VOICE SEARCH ---
    "where to see leopards in sri lanka", "how to book yala jeep online", "can you see bears in yala",
    "driver for yala safari", "taxi to yala national park", "is yala national park open today",
    "safari tour with breakfast yala", "best safari driver in yala", "yala tracker service",
    "safari jeep with ac yala", "toyota hilux safari yala", "land rover safari yala",

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
    "bundala wetland safari",
    // --- 🔥 HIGH VOLUME / BRAND CORE ---
    "yala national park", "yala safari", "sri lanka safari", "yala wildlife safari",
    "yala jeep safari", "yala national park safari", "official yala safari",
    "visit yala", "yala sri lanka", "safari in sri lanka",

    // --- 💰 BOOKING & PRICING INTENT (Transactional) ---
    "book yala safari online", "yala safari price 2025", "yala entrance fee 2025",
    "yala jeep rental cost", "reserve safari jeep yala", "buy yala tickets online",
    "yala safari booking official", "best price safari yala", "budget safari yala",
    "luxury safari packages yala", "private jeep hire yala", "shared safari jeep yala",
    "yala full day safari price", "half day safari rates yala", "cheap yala tours",
    "yala safari cancellation policy", "last minute safari booking yala",

    // --- 🐆 SPECIFIC WILDLIFE (The "Big 3" & More) ---
    "yala leopard safari", "sri lankan leopard sightings", "panthera pardus koti",
    "best place to see leopards in sri lanka", "yala sloth bear sightings",
    "melursus ursinus yala", "yala elephant safari", "asian elephant sri lanka",
    "yala crocodile tour", "yala bird watching", "painted stork yala",
    "black necked stork yala", "yala reptiles", "wild boar yala", "spotted deer herds",
    "yala peacock dance", "yala hornbill", "wildlife of yala", "big game safari sri lanka",

    // --- 📍 LOCATION & LOGISTICS (Geographic SEO) ---
    "colombo to yala safari", "galle to yala day trip", "ella to yala transfer",
    "mirissa to yala safari tour", "hambantota to yala", "tangalle to yala",
    "kandy to yala tour", "arugam bay to yala", "mattala airport to yala",
    "tissamaharama safari", "hotels in tissamaharama", "safari near kataragama",
    "palatupana entrance yala", "katagamuwa entrance safari", "galge entrance yala",
    "yala block 1 safari", "yala block 5 safari", "sithulpawwa road safari",
    "kirinda to yala", "southern province things to do",

    // --- 🌟 EXPERIENCE TYPES (Niche Targeting) ---
    "luxury yala safari experience", "vip safari sri lanka", "glamping yala national park",
    "camping inside yala", "yala eco lodge", "family friendly safari sri lanka",
    "honeymoon safari packages", "romantic safari yala", "kids safari yala",
    "senior citizen friendly safari", "accessible safari sri lanka",
    "corporate safari packages", "educational wildlife tours", "school trip yala",

    // --- 📸 PHOTOGRAPHY & EXPERT LED ---
    "yala wildlife photography tour", "professional safari guide yala",
    "birding tour yala", "best lens for yala safari", "wildlife filmmaker fixer yala",
    "golden hour safari yala", "morning vs evening safari yala", "full day game drive",
    "yala tracker service", "expert naturalist yala", "custom safari itinerary",

    // --- 📅 TIMING & PLANNING (Informational) ---
    "best time to visit yala", "yala safari season", "yala drought season",
    "yala park closing dates 2025", "yala weather september", "yala weather december",
    "yala safari opening hours", "how long is yala safari", "what to wear yala safari",
    "yala safari rules", "safety in yala national park",

    // --- 🌿 SUSTAINABILITY & VALUES ---
    "eco friendly safari yala", "sustainable tourism sri lanka", "responsible wildlife watching",
    "ethical safari operator", "conservation projects yala", "plastic free safari",
    "support local guides yala", "community tourism sri lanka",

    // --- 🆚 COMPARISONS (Competitor Targeting) ---
    "yala vs udawalawe", "yala vs wilpattu", "yala vs minneriya",
    "best national park in sri lanka", "yala vs bundala", "kumana vs yala",

    // --- 🚀 LONG TAIL & VOICE SEARCH ---
    "where to see leopards in sri lanka", "how to book yala jeep online",
    "can you see bears in yala", "driver for yala safari", "taxi to yala national park",
    "is yala national park open today", "safari tour with breakfast yala",
    "sunset safari yala national park", "early morning safari yala"

  ],

  // 🚀 ADVANCED METADATA
  other: {
    "geo.region": "LK-82",
    "geo.placename": "Yala National Park, Tissamaharama, Southern Province, Sri Lanka",
    "geo.position": "6.3747;81.1185",
    "ICBM": "6.3747, 81.1185",
    "DC.title": "Yala Safari Tours | #1 Wildlife Experience Sri Lanka",
    "DC.creator": "Yala Wildlife Safari",
    "DC.subject": "Yala Safari, Wildlife Tours, Sri Lanka Tourism, Leopard Safari, Elephant Watching",
    "DC.description": "Premium Yala National Park safari tours with expert guides, guaranteed wildlife sightings, and luxury jeep service.",
    "DC.publisher": "Yala Wildlife Safari",
    "DC.contributor": "Expert Safari Guides, Wildlife Naturalists",
    "DC.date": new Date().toISOString(),
    "DC.type": "Tourism Service",
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

  // 🚀 SOCIAL MEDIA OPTIMIZATION (OpenGraph)
  openGraph: {
    type: "website",
    title: "Yala National Park Safari | #1 Rated Jeep Tours 2025",
    description: "Experience the thrill of the wild! 4.9/5 rated Yala Safari. Guaranteed leopard sightings, luxury 4x4 jeeps, and expert guides. Instant booking available.",
    url: BASE_URL,
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
      }
    ],
  },

  // 🚀 TWITTER CARD
  twitter: {
    card: "summary_large_image",
    site: "@yalawildlife",
    creator: "@yalawildlife",
    title: "Yala Safari Tours | #1 Wildlife Experience 2025",
    description: "Book the best Yala National Park safari. Expert guides, guaranteed leopard sightings, luxury jeeps. 4.9 Star Rating.",
    images: {
      url: `${BASE_URL}/twitter-yala-safari.jpg`,
      alt: "Yala Wildlife Safari - Premium Experience",
    },
  },

  // 🚀 CANONICAL
  alternates: {
    canonical: BASE_URL,
    languages: {
      "en-US": BASE_URL,
      "en-GB": BASE_URL,
      "en-AU": BASE_URL,
      "en-CA": BASE_URL,
      "en-IN": BASE_URL,
    },
  },

  applicationName: "Yala Wildlife Safari",
  authors: [{ name: "Yala Wildlife Safari", url: BASE_URL }],
  generator: "Next.js 15",
  category: "Travel & Tourism",
  classification: "Safari Tours, Wildlife Tourism, Eco Tourism, Adventure Tourism, Nature Tourism, Conservation Tourism",
  referrer: "origin-when-cross-origin",

  // 🚀 VERIFICATION FOR SEARCH ENGINES
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
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#22c55e" },
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

      {/* 🚀 ULTIMATE SCHEMA MARKUP (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            // ✅ USING IMPORTED SCHEMAS HERE TO FIX TYPESCRIPT ERRORS
            organizationSchema,
            websiteSchema,
            localBusinessSchema,

            // 4. Product Schema (For Price/Stars in SERPs)
            {
              "@context": "https://schema.org",
              "@type": "Product",
              "name": "Yala National Park Safari Tour",
              "description": "Premium 4x4 Jeep Safari in Yala National Park. Includes expert guide, tickets, and hotel pickup.",
              "image": [`${BASE_URL}/safari-jeep.jpg`],
              "brand": { "@type": "Brand", "name": "Yala Wildlife Safari" },
              "offers": {
                "@type": "AggregateOffer",
                "priceCurrency": "USD",
                "lowPrice": "50",
                "highPrice": "350",
                "offerCount": "12",
                "availability": "https://schema.org/InStock",
                "url": `${BASE_URL}/safari-packages`
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "1250"
              }
            },

            // 5. TouristDestination Schema
            {
              "@context": "https://schema.org",
              "@type": "TouristDestination",
              "name": "Yala National Park",
              "alternateName": ["Yala", "Ruhuna National Park"],
              "description": "Sri Lanka's premier national park famous for having the world's highest leopard density",
              "url": BASE_URL,
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Tissamaharama",
                "addressRegion": "Southern Province",
                "addressCountry": "LK"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 6.3747,
                "longitude": 81.1185
              },
              "includesAttraction": [
                { "@type": "TouristAttraction", "name": "Leopard Spotting" },
                { "@type": "TouristAttraction", "name": "Elephant Watching" },
                { "@type": "TouristAttraction", "name": "Bird Watching" }
              ]
            },

            // 6. FAQ Schema (Expanded)
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What is the best time to visit Yala National Park?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The best time for Yala safari is February to June during dry season when water levels are low and animals gather around waterholes."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How much does a Yala safari cost?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yala safari tours range from $50-350 per person depending on the package (half-day vs full-day) and luxury level."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is Yala National Park safe for tourists?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, it is very safe. All tours are conducted in secure jeeps with experienced trackers and drivers."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can I see Leopards in Yala?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, Yala has the highest density of leopards in the world, making sightings very likely, especially in Block 1."
                  }
                }
              ]
            }
          ]),
        }}
      />

      {/* Breadcrumb Schema */}
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
                "name": "Safari Tours",
                "item": `${BASE_URL}/safari-packages`
              }
            ]
          }),
        }}
      />
    </>
  );
}