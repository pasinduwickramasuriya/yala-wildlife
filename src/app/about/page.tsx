


// import type { Metadata } from "next";
// import Image from "next/image";
// import Link from "next/link";
// import Header from "@/components/Header";
// import {
//   organizationSchema,
//   websiteSchema,
//   localBusinessSchema,
// } from "@/lib/schema";

// // ✅ SEO-OPTIMIZED: Base URL for consistency
// const BASE_URL = "https://www.yalawildlife.com";

// // ✅ ENHANCED: About page metadata
// export const metadata: Metadata = {
//   metadataBase: new URL(BASE_URL),

//   title: "About Yala Wildlife Safari | Expert Guides & Premium Tours Sri Lanka",
//   description: "Learn about Yala Wildlife Safari - Sri Lanka's premier safari operator. Expert naturalist guides, luxury jeeps, guaranteed leopard sightings since 2015. 4.9/5 rating with 300+ reviews.",

//   keywords: [
//     "about yala safari",
//     "yala safari company",
//     "yala wildlife safari",
//     "about yala national park",
//     "yala safari operator",
//     "sri lanka safari company",
//     "yala safari guides",
//     "expert safari guides yala",
//     "professional safari operator",
//     "yala safari experience",
//     "about yala tours",
//     "yala safari history",
//     "yala national park information",
//     "yala wildlife information",
//     "yala safari services",
//     "premium safari operator sri lanka",
//     "luxury yala safari",
//     "yala safari team",
//     "experienced safari guides",
//     "naturalist guides yala",
//     "wildlife experts yala",
//     "conservation safari tours",
//     "eco tourism yala",
//     "sustainable safari tourism",
//     "responsible wildlife tourism",
//     "yala park facts",
//     "yala biodiversity",
//     "yala leopard population",
//     "yala elephant herds",
//     "yala bird species",
//     "yala flora fauna",
//     "yala ecosystems",
//     "yala conservation",
//     "yala wildlife protection",
//     "yala national park zones",
//     "yala block 1",
//     "yala zone 1",
//     "yala block 2",
//     "yala zone 2",
//     "palatupana entrance",
//     "tissamaharama yala",
//     "southern province safari",
//     "yala park entrance",
//     "yala safari routes",
//     "yala game drives",
//     "yala jeep tours",
//     "4x4 safari yala",
//     "open vehicle safari",
//     "luxury safari jeeps",
//     "comfortable safari vehicles",
//     "safe safari transport",
//     "modern safari equipment",
//     "safari photography equipment",
//     "binoculars safari",
//     "wildlife tracking",
//     "animal behavior expertise",
//     "bird identification yala",
//     "leopard tracking yala",
//     "elephant behavior yala",
//     "yala safari tips",
//     "safari preparation yala",
//     "what to expect yala",
//     "yala safari duration",
//     "best time yala safari",
//     "yala safari seasons",
//     "dry season yala",
//     "wet season yala",
//     "yala weather information",
//     "yala climate",
//     "yala safari timing",
//     "morning safari yala",
//     "evening safari yala",
//     "full day safari yala",
//     "half day safari yala",
//     "private safari yala",
//     "group safari yala",
//     "family safari yala",
//     "educational safari tours",
//     "wildlife conservation education",
//     "nature education yala",
//     "environmental awareness",
//     "biodiversity conservation",
//     "habitat protection yala",
//     "wildlife corridor protection",
//     "human wildlife conflict",
//     "community conservation",
//     "local employment safari",
//     "sustainable tourism benefits",
//     "economic impact tourism"
//   ],

//   other: {
//     "geo.region": "LK-82",
//     "geo.placename": "Yala National Park, Tissamaharama, Southern Province, Sri Lanka",
//     "geo.position": "6.3747;81.1185",
//     "ICBM": "6.3747, 81.1185",
//     "DC.title": "About Yala Wildlife Safari | Expert Guides & Premium Tours",
//     "DC.creator": "Yala Wildlife Safari",
//     "DC.subject": "About Company, Safari Services, Yala National Park Information, Wildlife Conservation",
//     "DC.description": "Learn about Yala Wildlife Safari - premier safari operator with expert guides, luxury vehicles, and conservation commitment",
//     "DC.publisher": "Yala Wildlife Safari",
//     "DC.contributor": "Expert Safari Guides, Wildlife Naturalists, Conservation Specialists",
//     "DC.date": new Date().toISOString(),
//     "DC.type": "About Page, Company Information, Tourism Service",
//     "DC.format": "text/html",
//     "DC.identifier": `${BASE_URL}/about`,
//     "DC.language": "en",
//     "DC.coverage": "Yala National Park, Southern Province, Sri Lanka",
//     "DC.rights": "Copyright 2025 Yala Wildlife Safari",
//     "robots": "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
//     "googlebot": "index, follow, max-image-preview:large, max-snippet:-1",
//     "bingbot": "index, follow, max-image-preview:large",
//     "yandexbot": "index, follow",
//     "revisit-after": "7 days",
//     "rating": "general",
//     "distribution": "global",
//     "theme-color": "#22c55e",
//     "apple-mobile-web-app-title": "About Yala Safari",
//     "format-detection": "telephone=yes, address=yes, email=yes",
//     "news_keywords": "yala safari company, wildlife conservation, eco tourism, expert guides, premium safari services",
//     "article:section": "About Us",
//     "article:tag": "About Company, Safari Services, Wildlife Conservation, Expert Guides, Yala National Park",
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
//     title: "About Yala Wildlife Safari | Expert Guides & Premium Tours Sri Lanka",
//     description: "Learn about Sri Lanka's premier safari operator. Expert naturalist guides, luxury jeeps, guaranteed leopard sightings. 4.9/5 rating with 300+ reviews.",
//     url: `${BASE_URL}/about`,
//     siteName: "Yala Wildlife Safari | Premier Safari Experience",
//     locale: "en_US",
//     images: [
//       {
//         url: `${BASE_URL}/og-about-yala-safari.jpg`,
//         width: 1200,
//         height: 630,
//         alt: "About Yala Wildlife Safari - Expert Guides & Premium Tours",
//         type: "image/jpeg",
//       },
//       {
//         url: `${BASE_URL}/og-safari-guides-team.jpg`,
//         width: 1200,
//         height: 630,
//         alt: "Expert Safari Guides Team - Yala Wildlife Safari",
//         type: "image/jpeg",
//       },
//       {
//         url: `${BASE_URL}/og-yala-park-landscape.jpg`,
//         width: 1200,
//         height: 630,
//         alt: "Yala National Park Beautiful Landscape - Premium Safari Tours",
//         type: "image/jpeg",
//       }
//     ],
//   },

//   twitter: {
//     card: "summary_large_image",
//     site: "@yalawildlife",
//     creator: "@yalawildlife",
//     title: "About Yala Wildlife Safari | Expert Guides & Premium Tours",
//     description: "Learn about Sri Lanka's premier safari operator. Expert guides, luxury jeeps, guaranteed leopard sightings. 4.9/5 rating.",
//     images: {
//       url: `${BASE_URL}/twitter-about-yala-safari.jpg`,
//       alt: "About Yala Wildlife Safari - Expert Safari Services",
//     },
//   },

//   alternates: {
//     canonical: `${BASE_URL}/about`,
//     languages: {
//       "en-US": `${BASE_URL}/about`,
//       "en-GB": `${BASE_URL}/about`,
//       "en-AU": `${BASE_URL}/about`,
//       "en-CA": `${BASE_URL}/about`,
//       "en-IN": `${BASE_URL}/about`,
//     },
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
//   classification: "About Company, Safari Services, Wildlife Tourism, Eco Tourism",
//   referrer: "origin-when-cross-origin",

//   verification: {
//     google: "vobQq0klynTsOpNnRKtuAD0BDLjmwpS5e2OrmSjojzU",
//   },

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

// export default function AboutPage() {
//   return (
//     <>
//       <Header />

//       <div className="min-h-screen text-foreground">
//         {/* ✅ REMOVED: All background colors from breadcrumb */}
//         {/* <nav aria-label="Breadcrumb" className="py-4 px-4 md:px-6">
//           <div className="container max-w-7xl mx-auto">
//             <ol className="flex items-center space-x-2 text-sm">
//               <li>
//                 <Link href="/" className="text-green-600 hover:text-green-500 hover:underline transition-colors">
//                   Home
//                 </Link>
//               </li>
//               <li className="text-muted-foreground">/</li>
//               <li className="text-foreground font-medium">About Us</li>
//             </ol>
//           </div>
//         </nav> */}

//         {/* ✅ REMOVED: All background colors from main content */}
//         <main role="main" aria-labelledby="about-title">

//           {/* ✅ REMOVED: Background colors from hero section */}
//           <section className="py-16">
//             <div className="container mx-auto px-4 md:px-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
//                 <div>
//                   <header className="mb-8">
//                     <h1 id="about-title" className="text-3xl md:text-4xl font-bold text-green-600 mb-4">
//                       About Yala Wildlife Safari
//                     </h1>
//                     <p className="text-xl text-muted-foreground">
//                       Expert guides, luxury jeeps, and guaranteed wildlife sightings since 2015
//                     </p>
//                   </header>

//                   <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
//                     <p>
//                       <strong>Yala Wildlife Safari</strong> is Sri Lanka&apos;s most trusted safari operator, specializing in premium wildlife tours through Yala National Park. With over 8 years of experience and a 4.9/5 rating from 300+ satisfied guests, we provide unparalleled access to the world&apos;s highest leopard density park.
//                     </p>

//                     <p>
//                       Our team of certified naturalist guides brings deep expertise in wildlife behavior, conservation, and Yala&apos;s unique ecosystems. Every safari is conducted in modern, comfortable 4x4 vehicles equipped with safety features and optimal viewing configurations for photography and wildlife observation.
//                     </p>

//                     <p>
//                       We are committed to <strong>sustainable eco-tourism</strong> and actively support local conservation efforts while providing authentic, educational wildlife experiences that connect visitors with Sri Lanka&apos;s incredible biodiversity.
//                     </p>
//                   </div>
//                 </div>

//                 <div className="relative h-64 md:h-96 rounded-xl overflow-hidden shadow-lg">
//                   <Image
//                     src="https://images.unsplash.com/photo-1553524082-82690780f842?w=1000&auto=format&fit=crop&q=60"
//                     alt="Yala National Park landscape showing diverse wildlife habitat with expert safari guides"
//                     fill
//                     className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
//                     sizes="(max-width: 768px) 100vw, 50vw"
//                     priority
//                   />
//                 </div>
//               </div>
//             </div>
//           </section>

//           {/* ✅ REMOVED: Background colors from Yala Park info section */}
//           <section className="py-16">
//             <div className="container mx-auto px-4 md:px-6 max-w-4xl">
//               <h2 className="text-2xl md:text-3xl font-bold text-center text-green-600 mb-8">
//                 Yala National Park - A Wildlife Paradise
//               </h2>

//               <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
//                 <p>
//                   Nestled in Sri Lanka&apos;s southeastern region, <strong>Yala National Park</strong> spans over 979 square kilometers of pristine wilderness, making it the country&apos;s most visited and second-largest national park. This remarkable biodiversity hotspot is globally renowned for hosting the world&apos;s highest concentration of leopards, with an estimated 25-30 leopards per 100 square kilometers.
//                 </p>

//                 <p>
//                   The park&apos;s diverse ecosystems include tropical dry forests, grasslands, coastal lagoons, and rocky outcrops, creating ideal habitats for over 44 mammal species and 215 bird species. Beyond leopards, visitors regularly encounter Asian elephants, sloth bears, spotted deer, sambars, wild boars, and numerous reptile species including mugger crocodiles.
//                 </p>

//                 <p>
//                   <strong>Yala&apos;s conservation significance</strong> extends beyond wildlife diversity. The park plays a crucial role in protecting Sri Lanka&apos;s endemic species and serves as an important wildlife corridor connecting coastal and inland ecosystems. Our <strong>expert safari guides</strong> share in-depth knowledge about these conservation efforts and the park&apos;s role in regional biodiversity protection.
//                 </p>

//                 <p>
//                   Whether you&apos;re captivated by the stealth of a hunting leopard, the majesty of elephant herds, or the vibrant birdlife at dawn, Yala promises transformative encounters with nature&apos;s most spectacular wildlife in their natural habitat.
//                 </p>
//               </div>
//             </div>
//           </section>

//           {/* ✅ REMOVED: Background colors from Premium Safari Services section */}
//           <section className="py-16">
//             <div className="container mx-auto px-4 md:px-6 max-w-4xl">
//               <h2 className="text-2xl md:text-3xl font-bold text-center text-green-600 mb-8">
//                 Why Choose Our Premium Safari Services
//               </h2>

//               <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
//                 <p>
//                   Our <strong>premium Yala safari experience</strong> combines expert local knowledge with modern comfort and safety standards. Each safari is led by certified naturalist guides who possess intimate knowledge of animal behavior patterns, optimal viewing locations, and the best times for wildlife photography.
//                 </p>

//                 <p>
//                   Our <strong>luxury safari jeeps</strong> are specially modified for wildlife viewing, featuring elevated seating, 360-degree visibility, and professional-grade photography support equipment. Every vehicle undergoes regular safety inspections and is equipped with first aid supplies, communication devices, and comfortable seating for extended game drives.
//                 </p>

//                 <p>
//                   We offer <strong>customizable safari packages</strong> ranging from half-day morning expeditions to multi-day adventures, each designed to maximize wildlife encounters while respecting the natural environment. Our small group sizes ensure personalized attention and minimal environmental impact.
//                 </p>

//                 <p className="text-center font-semibold">
//                   <Link href="/safari-packages" className="text-green-600 hover:text-green-500 underline">
//                     Discover our complete range of safari packages
//                   </Link> and book your unforgettable Yala wildlife adventure today.
//                 </p>
//               </div>
//             </div>
//           </section>

//           {/* ✅ REMOVED: Background colors from Our Services section */}
//           <section className="py-16">
//             <div className="container mx-auto px-4 md:px-6">
//               <h2 className="text-2xl md:text-3xl font-bold text-center text-green-600 mb-12">
//                 Expert Safari Services & Experiences
//               </h2>

//               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//                 <article className="p-6 rounded-xl hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 text-center">
//                   <h3 className="text-xl font-semibold text-foreground mb-4">
//                     Customized Safari Packages
//                   </h3>
//                   <p className="text-muted-foreground leading-relaxed">
//                     Tailored safari experiences from 3-hour morning drives to 3-day wilderness adventures. Perfect for solo travelers, families, photographers, and wildlife enthusiasts seeking personalized encounters with Yala&apos;s incredible biodiversity.
//                   </p>
//                 </article>

//                 <article className="p-6 rounded-xl hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 text-center">
//                   <h3 className="text-xl font-semibold text-foreground mb-4">
//                     Certified Naturalist Guides
//                   </h3>
//                   <p className="text-muted-foreground leading-relaxed">
//                     Our passionate expert guides hold wildlife biology certifications and possess 5-15 years of field experience. They provide fascinating insights into animal behavior, conservation efforts, and Yala&apos;s ecological significance while ensuring your safety.
//                   </p>
//                 </article>

//                 <article className="p-6 rounded-xl hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 text-center">
//                   <h3 className="text-xl font-semibold text-foreground mb-4">
//                     Premium Safari Vehicles
//                   </h3>
//                   <p className="text-muted-foreground leading-relaxed">
//                     Modern 4x4 safari jeeps with elevated seating, panoramic windows, and photography platforms. All vehicles feature safety equipment, communication systems, and comfortable amenities for optimal wildlife viewing through Yala&apos;s diverse terrain.
//                   </p>
//                 </article>
//               </div>

//               <div className="text-center mt-12">
//                 <Link
//                   href="/safari-packages"
//                   className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-semibold shadow-lg transform hover:scale-105 transition-all duration-300 text-lg"
//                 >
//                   Explore Our Safari Packages
//                 </Link>
//               </div>
//             </div>
//           </section>

//           {/* ✅ REMOVED: Background colors from Conservation section */}
//           <section className="py-16">
//             <div className="container mx-auto px-4 md:px-6 max-w-4xl">
//               <h2 className="text-2xl md:text-3xl font-bold text-center text-green-600 mb-8">
//                 Conservation Commitment & Community Impact
//               </h2>

//               <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
//                 <p>
//                   <strong>Sustainable eco-tourism</strong> is at the heart of our mission. We actively collaborate with the Department of Wildlife Conservation and local communities to support habitat protection, anti-poaching efforts, and wildlife research initiatives in Yala National Park.
//                 </p>

//                 <p>
//                   Our responsible tourism practices include limiting group sizes, maintaining safe distances from wildlife, supporting local employment, and contributing to conservation funding. We believe that authentic wildlife experiences should benefit both visitors and the natural ecosystems we explore.
//                 </p>

//                 <p>
//                   Through educational safari experiences, we raise awareness about Sri Lanka&apos;s unique biodiversity, the challenges facing wildlife conservation, and the positive impact that responsible tourism can have on protecting these precious natural resources for future generations.
//                 </p>
//               </div>
//             </div>
//           </section>
//         </main>
//       </div>

//       {/* ✅ ENHANCED: Schema markup for About page */}
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{
//           __html: JSON.stringify([
//             organizationSchema,
//             websiteSchema,
//             localBusinessSchema,

//             {
//               "@context": "https://schema.org",
//               "@type": "AboutPage",
//               "name": "About Yala Wildlife Safari",
//               "description": "Learn about Sri Lanka's premier safari operator offering expert-guided Yala National Park tours since 2015",
//               "url": `${BASE_URL}/about`,
//               "mainEntity": {
//                 "@type": "Organization",
//                 "name": "Yala Wildlife Safari",
//                 "foundingDate": "2015",
//                 "description": "Premier safari operator specializing in Yala National Park wildlife tours with expert guides and luxury vehicles",
//                 "url": BASE_URL,
//                 "logo": `${BASE_URL}/logo.png`,
//                 "image": `${BASE_URL}/about-company.jpg`,
//                 "telephone": "+94-778-158-004",
//                 "email": "info@yalawildlife.com",
//                 "address": {
//                   "@type": "PostalAddress",
//                   "streetAddress": "Safari Base, Tissamaharama Road",
//                   "addressLocality": "Tissamaharama",
//                   "addressRegion": "Southern Province",
//                   "postalCode": "82600",
//                   "addressCountry": "LK"
//                 },
//                 "aggregateRating": {
//                   "@type": "AggregateRating",
//                   "ratingValue": "4.9",
//                   "reviewCount": "300",
//                   "bestRating": "5"
//                 },
//                 "serviceArea": {
//                   "@type": "Place",
//                   "name": "Yala National Park, Southern Province, Sri Lanka"
//                 },
//                 "hasOfferCatalog": {
//                   "@type": "OfferCatalog",
//                   "name": "Safari Tour Services",
//                   "itemListElement": [
//                     {
//                       "@type": "OfferCatalog",
//                       "name": "Half Day Safari Tours"
//                     },
//                     {
//                       "@type": "OfferCatalog",
//                       "name": "Full Day Safari Adventures"
//                     },
//                     {
//                       "@type": "OfferCatalog",
//                       "name": "Private Safari Experiences"
//                     },
//                     {
//                       "@type": "OfferCatalog",
//                       "name": "Photography Safari Tours"
//                     }
//                   ]
//                 }
//               }
//             },

//             {
//               "@context": "https://schema.org",
//               "@type": "TouristInformationCenter",
//               "name": "Yala Wildlife Safari Information",
//               "description": "Comprehensive information about Yala National Park and premium safari services",
//               "url": `${BASE_URL}/about`,
//               "knowsAbout": [
//                 "Yala National Park Wildlife",
//                 "Leopard Conservation",
//                 "Sri Lankan Biodiversity",
//                 "Eco Tourism",
//                 "Wildlife Photography",
//                 "Conservation Efforts"
//               ],
//               "serviceArea": {
//                 "@type": "Place",
//                 "name": "Yala National Park, Sri Lanka",
//                 "geo": {
//                   "@type": "GeoCoordinates",
//                   "latitude": 6.3747,
//                   "longitude": 81.1185
//                 }
//               }
//             }
//           ]),
//         }}
//       />

//       {/* ✅ ENHANCED: Breadcrumb schema */}
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{
//           __html: JSON.stringify({
//             "@context": "https://schema.org",
//             "@type": "BreadcrumbList",
//             "itemListElement": [
//               {
//                 "@type": "ListItem",
//                 "position": 1,
//                 "name": "Home",
//                 "item": BASE_URL
//               },
//               {
//                 "@type": "ListItem",
//                 "position": 2,
//                 "name": "About Us",
//                 "item": `${BASE_URL}/about`
//               }
//             ]
//           }),
//         }}
//       />
//     </>
//   );
// }










import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import {
  organizationSchema,
  websiteSchema,
  localBusinessSchema,
} from "@/lib/schema";
import { ArrowRight, Shield, Camera, Users, Leaf, HeartHandshake } from "lucide-react";

// ✅ SEO-OPTIMIZED: Base URL for consistency
const BASE_URL = "https://www.yalawildlife.com";

// ✅ ENHANCED: About page metadata (UNTOUCHED)
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "About Yala Wildlife Safari | Expert Guides & Premium Tours Sri Lanka",
  description: "Learn about Yala Wildlife Safari - Sri Lanka's premier safari operator. Expert naturalist guides, luxury jeeps, guaranteed leopard sightings since 2015. 4.9/5 rating with 300+ reviews.",
  keywords: [
    "about yala safari",
    "yala safari company",
    "yala wildlife safari",
    "about yala national park",
    "yala safari operator",
    "sri lanka safari company",
    "yala safari guides",
    "expert safari guides yala",
    "professional safari operator",
    "yala safari experience",
    "about yala tours",
    "yala safari history",
    "yala national park information",
    "yala wildlife information",
    "yala safari services",
    "premium safari operator sri lanka",
    "luxury yala safari",
    "yala safari team",
    "experienced safari guides",
    "naturalist guides yala",
    "wildlife experts yala",
    "conservation safari tours",
    "eco tourism yala",
    "sustainable safari tourism",
    "responsible wildlife tourism",
    "yala park facts",
    "yala biodiversity",
    "yala leopard population",
    "yala elephant herds",
    "yala bird species",
    "yala flora fauna",
    "yala ecosystems",
    "yala conservation",
    "yala wildlife protection",
    "yala national park zones",
    "yala block 1",
    "yala zone 1",
    "yala block 2",
    "yala zone 2",
    "palatupana entrance",
    "tissamaharama yala",
    "southern province safari",
    "yala park entrance",
    "yala safari routes",
    "yala game drives",
    "yala jeep tours",
    "4x4 safari yala",
    "open vehicle safari",
    "luxury safari jeeps",
    "comfortable safari vehicles",
    "safe safari transport",
    "modern safari equipment",
    "safari photography equipment",
    "binoculars safari",
    "wildlife tracking",
    "animal behavior expertise",
    "bird identification yala",
    "leopard tracking yala",
    "elephant behavior yala",
    "yala safari tips",
    "safari preparation yala",
    "what to expect yala",
    "yala safari duration",
    "best time yala safari",
    "yala safari seasons",
    "dry season yala",
    "wet season yala",
    "yala weather information",
    "yala climate",
    "yala safari timing",
    "morning safari yala",
    "evening safari yala",
    "full day safari yala",
    "half day safari yala",
    "private safari yala",
    "group safari yala",
    "family safari yala",
    "educational safari tours",
    "wildlife conservation education",
    "nature education yala",
    "environmental awareness",
    "biodiversity conservation",
    "habitat protection yala",
    "wildlife corridor protection",
    "human wildlife conflict",
    "community conservation",
    "local employment safari",
    "sustainable tourism benefits",
    "economic impact tourism"
  ],
  other: {
    "geo.region": "LK-82",
    "geo.placename": "Yala National Park, Tissamaharama, Southern Province, Sri Lanka",
    "geo.position": "6.3747;81.1185",
    "ICBM": "6.3747, 81.1185",
    "DC.title": "About Yala Wildlife Safari | Expert Guides & Premium Tours",
    "DC.creator": "Yala Wildlife Safari",
    "DC.subject": "About Company, Safari Services, Yala National Park Information, Wildlife Conservation",
    "DC.description": "Learn about Yala Wildlife Safari - premier safari operator with expert guides, luxury vehicles, and conservation commitment",
    "DC.publisher": "Yala Wildlife Safari",
    "DC.contributor": "Expert Safari Guides, Wildlife Naturalists, Conservation Specialists",
    "DC.date": new Date().toISOString(),
    "DC.type": "About Page, Company Information, Tourism Service",
    "DC.format": "text/html",
    "DC.identifier": `${BASE_URL}/about`,
    "DC.language": "en",
    "DC.coverage": "Yala National Park, Southern Province, Sri Lanka",
    "DC.rights": "Copyright 2025 Yala Wildlife Safari",
    "robots": "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    "googlebot": "index, follow, max-image-preview:large, max-snippet:-1",
    "bingbot": "index, follow, max-image-preview:large",
    "yandexbot": "index, follow",
    "revisit-after": "7 days",
    "rating": "general",
    "distribution": "global",
    "theme-color": "#22c55e",
    "apple-mobile-web-app-title": "About Yala Safari",
    "format-detection": "telephone=yes, address=yes, email=yes",
    "news_keywords": "yala safari company, wildlife conservation, eco tourism, expert guides, premium safari services",
    "article:section": "About Us",
    "article:tag": "About Company, Safari Services, Wildlife Conservation, Expert Guides, Yala National Park",
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
    title: "About Yala Wildlife Safari | Expert Guides & Premium Tours Sri Lanka",
    description: "Learn about Sri Lanka's premier safari operator. Expert naturalist guides, luxury jeeps, guaranteed leopard sightings. 4.9/5 rating with 300+ reviews.",
    url: `${BASE_URL}/about`,
    siteName: "Yala Wildlife Safari | Premier Safari Experience",
    locale: "en_US",
    images: [
      {
        url: `${BASE_URL}/og-about-yala-safari.jpg`,
        width: 1200,
        height: 630,
        alt: "About Yala Wildlife Safari - Expert Guides & Premium Tours",
        type: "image/jpeg",
      },
      {
        url: `${BASE_URL}/og-safari-guides-team.jpg`,
        width: 1200,
        height: 630,
        alt: "Expert Safari Guides Team - Yala Wildlife Safari",
        type: "image/jpeg",
      },
      {
        url: `${BASE_URL}/og-yala-park-landscape.jpg`,
        width: 1200,
        height: 630,
        alt: "Yala National Park Beautiful Landscape - Premium Safari Tours",
        type: "image/jpeg",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@yalawildlife",
    creator: "@yalawildlife",
    title: "About Yala Wildlife Safari | Expert Guides & Premium Tours",
    description: "Learn about Sri Lanka's premier safari operator. Expert guides, luxury jeeps, guaranteed leopard sightings. 4.9/5 rating.",
    images: {
      url: `${BASE_URL}/twitter-about-yala-safari.jpg`,
      alt: "About Yala Wildlife Safari - Expert Safari Services",
    },
  },
  alternates: {
    canonical: `${BASE_URL}/about`,
    languages: {
      "en-US": `${BASE_URL}/about`,
      "en-GB": `${BASE_URL}/about`,
      "en-AU": `${BASE_URL}/about`,
      "en-CA": `${BASE_URL}/about`,
      "en-IN": `${BASE_URL}/about`,
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
  classification: "About Company, Safari Services, Wildlife Tourism, Eco Tourism",
  referrer: "origin-when-cross-origin",
  verification: {
    google: "vobQq0klynTsOpNnRKtuAD0BDLjmwpS5e2OrmSjojzU",
  },
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

export default function AboutPage() {
  return (
    <>
      <Header />

      <div className="min-h-screen text-white relative overflow-hidden">
        {/* =========================================
            BACKGROUND IMAGE SECTION
        ========================================= */}
        <div className="fixed inset-0 z-0">
          <Image
            src="/uploads/1748935199061-20250603_1239_Leopard Emerges from Darkness_simple_compose_01jwt9yv7qect8krxy794bcr23.webp"
            alt="Yala Leopard Emerging from Darkness"
            fill
            priority
            className="object-cover opacity-90 md:opacity-80"
            quality={90}
          />
          {/* Cinematic Gradients for depth and readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/50 to-black/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />
          {/* Noise Texture for a modern, tactical feel */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
        </div>

        {/* =========================================
            MAIN CONTENT CONTAINER
        ========================================= */}
        <main role="main" aria-labelledby="about-title" className="relative z-10 pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">

          {/* =========================================
              HERO / INTRODUCTION SECTION
          ========================================= */}
          <section className="mb-20">
            <div className="backdrop-blur-s  rounded-3xl p-8 md:p-12 relative overflow-hidden">
              {/* Decorative glow */}
              <div className="absolute -top-20 -right-20 w-64 h-64  rounded-full blur-3xl pointer-events-none"></div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <header className="mb-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 backdrop-blur-md mb-4">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </span>
                      <span className="text-xs font-mono uppercase tracking-widest text-green-400">Since 2015</span>
                    </div>
                    <h1 id="about-title" className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                      We Are <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">Yala Wildlife Safari</span>
                    </h1>
                    <p className="text-xl text-neutral-300 font-light leading-relaxed">
                      Expert guides, luxury jeeps, and guaranteed wildlife sightings in Sri Lankas premier national park.
                    </p>
                  </header>

                  <div className="space-y-6 text-base md:text-lg text-neutral-300 leading-relaxed font-light">
                    <p>
                      <strong className="text-white font-medium">Yala Wildlife Safari</strong> is Sri Lanka&apos;s most trusted safari operator, specializing in premium wildlife tours through Yala National Park. With over <span className="text-green-400 font-semibold">8 years of experience</span> and a <span className="text-green-400 font-semibold">4.9/5 rating</span> from 300+ satisfied guests, we provide unparalleled access to the world&apos;s highest leopard density park.
                    </p>
                    <p>
                      Our team of certified naturalist guides brings deep expertise in wildlife behavior, conservation, and Yala&apos;s unique ecosystems. Every safari is conducted in modern, comfortable 4x4 vehicles equipped with safety features and optimal viewing configurations.
                    </p>
                    <p>
                      We are committed to <strong className="text-white font-medium">sustainable eco-tourism</strong> and actively support local conservation efforts while providing authentic, educational wildlife experiences.
                    </p>
                  </div>
                </div>

                <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
                  <Image
                    src="https://images.unsplash.com/photo-1553524082-82690780f842?w=1000&auto=format&fit=crop&q=60"
                    alt="Yala National Park landscape showing diverse wildlife habitat with expert safari guides"
                    fill
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105 filter grayscale-30 group-hover:grayscale-0"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <p className="text-sm font-mono uppercase tracking-widest text-green-400 mb-1">Experience The Wild</p>
                    <h3 className="text-2xl font-bold">Expert-Guided Adventures</h3>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =========================================
              THE YALA EXPERIENCE SECTION
          ========================================= */}
          <section className="mb-20">
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 shadow-xl">
              <div className="max-w-4xl mx-auto text-center mb-12">
                <Shield className="w-12 h-12 text-green-500 mx-auto mb-4 opacity-80" />
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
                  Yala National Park: <span className="text-green-500">A Wildlife Paradise</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* Left Column: Text Content */}
                <div className="space-y-6 text-base md:text-lg text-neutral-300 leading-relaxed font-light order-2 md:order-1">
                  <p>
                    Nestled in Sri Lanka&apos;s southeastern region, <strong className="text-white font-medium">Yala National Park</strong> spans over 979 square kilometers of pristine wilderness. It is globally renowned for hosting the world&apos;s highest concentration of leopards.
                  </p>
                  <p>
                    The park&apos;s diverse ecosystems include tropical dry forests, grasslands, coastal lagoons, and rocky outcrops, creating ideal habitats for over <span className="text-green-400 font-semibold">44 mammal species</span> and <span className="text-green-400 font-semibold">215 bird species</span>. Beyond leopards, visitors regularly encounter Asian elephants, sloth bears, spotted deer, sambars, and mugger crocodiles.
                  </p>
                  <p>
                    <strong className="text-white font-medium">Yala&apos;s conservation significance</strong> extends beyond wildlife diversity. It serves as a crucial wildlife corridor. Our expert guides share in-depth knowledge about these conservation efforts.
                  </p>
                </div>

                {/* Right Column: Stats/Visuals */}
                <div className="grid grid-cols-2 gap-4 order-1 md:order-2">
                  <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-colors duration-300">
                    <span className="block text-4xl md:text-5xl font-bold text-green-500 mb-2">979</span>
                    <span className="text-sm font-mono uppercase tracking-wider text-neutral-400">Sq. Kilometers</span>
                  </div>
                  <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-colors duration-300">
                    <span className="block text-4xl md:text-5xl font-bold text-green-500 mb-2">44+</span>
                    <span className="text-sm font-mono uppercase tracking-wider text-neutral-400">Mammal Species</span>
                  </div>
                  <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-colors duration-300 col-span-2">
                    <span className="block text-4xl md:text-5xl font-bold text-green-500 mb-2">Highest</span>
                    <span className="text-sm font-mono uppercase tracking-wider text-neutral-400">Leopard Density Globally</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =========================================
              PREMIUM SERVICES SECTION
          ========================================= */}
          <section className="mb-20">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
                Why Choose Our <span className="text-green-500">Premium Safari Services</span>
              </h2>
              <p className="text-lg text-neutral-300 font-light">
                We combine expert local knowledge with modern luxury and safety standards for an unforgettable wildlife experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Service Card 1 */}
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-green-500/30 transition-all duration-500 group relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-green-500/20 transition-colors"></div>
                <Users className="w-10 h-10 text-green-500 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold text-white mb-4">Certified Naturalist Guides</h3>
                <p className="text-neutral-300 font-light leading-relaxed mb-6">
                  Passionate experts with 5-15 years of field experience. They provide fascinating insights into animal behavior and conservation.
                </p>
              </div>

              {/* Service Card 2 */}
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-green-500/30 transition-all duration-500 group relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-green-500/20 transition-colors"></div>
                <Camera className="w-10 h-10 text-green-500 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold text-white mb-4">Luxury Safari Vehicles</h3>
                <p className="text-neutral-300 font-light leading-relaxed mb-6">
                  Modern 4x4 jeeps with elevated seating, panoramic windows, and professional-grade photography support for the best views.
                </p>
              </div>

              {/* Service Card 3 */}
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-green-500/30 transition-all duration-500 group relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-green-500/20 transition-colors"></div>
                <Leaf className="w-10 h-10 text-green-500 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold text-white mb-4">Customizable Packages</h3>
                <p className="text-neutral-300 font-light leading-relaxed mb-6">
                  From 3-hour drives to multi-day adventures. Small groups ensure personalized attention and minimal environmental impact.
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link
                href="/safari-packages"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-full p-4 px-8 font-bold text-white transition-all duration-300 hover:scale-105 focus:outline-none"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-500 transition-transform duration-300 group-hover:scale-105"></span>
                <span className="relative flex items-center gap-2">
                  Explore Safari Packages <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </div>
          </section>

          {/* =========================================
              CONSERVATION SECTION
          ========================================= */}
          <section className="mb-20">
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden">
              {/* Decorative Background Element */}
              <div className="absolute top-0 left-0 w-full h-full bg-[url('/pattern-leaf.svg')] opacity-[0.03] pointer-events-none"></div>

              <div className="max-w-4xl mx-auto text-center">
                <HeartHandshake className="w-12 h-12 text-green-500 mx-auto mb-6 opacity-80" />
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 tracking-tight">
                  Conservation Commitment & <span className="text-green-500">Community Impact</span>
                </h2>

                <div className="space-y-6 text-base md:text-lg text-neutral-300 leading-relaxed font-light">
                  <p>
                    <strong className="text-white font-medium">Sustainable eco-tourism</strong> is at the heart of our mission. We actively collaborate with the Department of Wildlife Conservation and local communities to support habitat protection, anti-poaching efforts, and wildlife research.
                  </p>
                  <p>
                    Our responsible tourism practices include limiting group sizes, maintaining safe distances from wildlife, supporting local employment, and contributing to conservation funding.
                  </p>
                  <p>
                    Through educational safari experiences, we raise awareness about Sri Lanka&apos;s unique biodiversity and the positive impact that responsible tourism can have on protecting these precious natural resources.
                  </p>
                </div>
              </div>
            </div>
          </section>

        </main>
      </div>

      {/* ✅ ENHANCED: Schema markup (UNTOUCHED) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            organizationSchema,
            websiteSchema,
            localBusinessSchema,
            {
              "@context": "https://schema.org",
              "@type": "AboutPage",
              "name": "About Yala Wildlife Safari",
              "description": "Learn about Sri Lanka's premier safari operator offering expert-guided Yala National Park tours since 2015",
              "url": `${BASE_URL}/about`,
              "mainEntity": {
                "@type": "Organization",
                "name": "Yala Wildlife Safari",
                "foundingDate": "2015",
                "description": "Premier safari operator specializing in Yala National Park wildlife tours with expert guides and luxury vehicles",
                "url": BASE_URL,
                "logo": `${BASE_URL}/logo.png`,
                "image": `${BASE_URL}/about-company.jpg`,
                "telephone": "+94-778-158-004",
                "email": "info@yalawildlife.com",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Safari Base, Tissamaharama Road",
                  "addressLocality": "Tissamaharama",
                  "addressRegion": "Southern Province",
                  "postalCode": "82600",
                  "addressCountry": "LK"
                },
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.9",
                  "reviewCount": "300",
                  "bestRating": "5"
                },
                "serviceArea": {
                  "@type": "Place",
                  "name": "Yala National Park, Southern Province, Sri Lanka"
                },
                "hasOfferCatalog": {
                  "@type": "OfferCatalog",
                  "name": "Safari Tour Services",
                  "itemListElement": [
                    { "@type": "OfferCatalog", "name": "Half Day Safari Tours" },
                    { "@type": "OfferCatalog", "name": "Full Day Safari Adventures" },
                    { "@type": "OfferCatalog", "name": "Private Safari Experiences" },
                    { "@type": "OfferCatalog", "name": "Photography Safari Tours" }
                  ]
                }
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "TouristInformationCenter",
              "name": "Yala Wildlife Safari Information",
              "description": "Comprehensive information about Yala National Park and premium safari services",
              "url": `${BASE_URL}/about`,
              "knowsAbout": [
                "Yala National Park Wildlife",
                "Leopard Conservation",
                "Sri Lankan Biodiversity",
                "Eco Tourism",
                "Wildlife Photography",
                "Conservation Efforts"
              ],
              "serviceArea": {
                "@type": "Place",
                "name": "Yala National Park, Sri Lanka",
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": 6.3747,
                  "longitude": 81.1185
                }
              }
            }
          ]),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL },
              { "@type": "ListItem", "position": 2, "name": "About Us", "item": `${BASE_URL}/about` }
            ]
          }),
        }}
      />
    </>
  );
}