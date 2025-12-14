// import type { Metadata } from "next";
// import Image from "next/image";
// import Header from "@/components/Header";
// import ContactForm from "@/components/ContactForm";
// import LocationMap from "@/components/LocationMap";
// import { Phone, MapPin, Clock, ShieldCheck } from "lucide-react";
// import { AutoSEOWrapper } from "@/components/AutoSEOWrapper";

// // ✅ SEO-OPTIMIZED: Base URL for consistency
// const BASE_URL = "https://www.yalawildlife.com";

// // ✅ SEO-ENHANCED: Contact page metadata (UNTOUCHED)
// export const metadata: Metadata = {
//   metadataBase: new URL(BASE_URL),

//   title: "Contact Yala Safari Tours | Book Your Wildlife Adventure Now",
//   description: "Contact Yala Wildlife Safari for bookings and inquiries. Expert guides, guaranteed leopard sightings, luxury jeeps. Call +94-778-158-004 or email us today!",

//   keywords: [
//     "contact yala safari",
//     "yala safari jeep",
//     "yala national park",
//     "yala safari national park",
//     "book yala safari",
//     "yala safari contact number",
//     "yala safari booking",
//     "yala safari phone number",
//     "yala safari email",
//     "yala safari tissamaharama contact",
//     "sri lanka safari booking",
//     "yala wildlife contact",
//     "safari tours contact sri lanka",
//     "yala national park booking",
//     "wildlife safari contact",
//     "yala safari reservation",
//     "contact yala tours",
//     "safari guide contact yala",
//     "yala jeep safari booking",
//     "private safari booking yala",
//     "luxury safari contact yala",
//     "yala safari customer service", "yala safari booking",
//     "yala safari phone number",
//     "yala safari email",
//     "yala safari tissamaharama contact",
//     "sri lanka safari booking",
//     "yala wildlife contact",
//     "safari tours contact sri lanka",
//     "yala national park booking",
//     "wildlife safari contact",
//     "yala safari reservation",
//     "contact yala tours",
//     "safari guide contact yala",
//     "yala jeep safari booking",
//     "private safari booking yala",
//     "luxury safari contact yala",
//     "yala safari customer service",
//     "wildlife tours sri lanka contact",
//     // --- Booking Intents ---
//     "contact yala safari", "book yala safari online", "yala jeep booking number",
//     "yala safari price 2025", "reserve safari jeep yala", "yala national park contact",
//     "safari reservation sri lanka", "yala ticket booking", "buy yala tickets",
//     "private jeep hire yala", "luxury safari booking", "budget safari yala contact",

//     // --- Location Specifics ---
//     "safari from tissamaharama", "safari from kataragama", "safari from hambantota",
//     "yala safari from colombo", "yala safari from galle", "yala safari from ella",
//     "palatupana entrance contact", "katagamuwa entrance safari", "galge entrance booking",

//     // --- Wildlife & Experience ---
//     "leopard safari booking", "best safari guide yala", "yala bird watching tour",
//     "yala photography tour", "camping in yala contact", "family safari yala",
//     "morning safari booking", "full day safari price", "afternoon safari yala",

//     // --- Service & Trust ---
//     "yala safari customer care", "best rated safari operator", "safe safari yala",
//     "experienced driver yala", "english speaking guide yala", "french speaking guide yala",
//     "german speaking guide yala", "yala safari whatsapp number"
//   ],

//   other: {
//     "geo.region": "LK-82",
//     "geo.placename": "Tissamaharama, Southern Province, Sri Lanka",
//     "geo.position": "6.3747;81.1185",
//     "ICBM": "6.3747, 81.1185",
//     "DC.title": "Contact Yala Safari Tours | Book Your Wildlife Adventure",
//     "DC.creator": "Yala Wildlife Safari",
//     "DC.subject": "Contact Information, Safari Booking, Yala Tours",
//     "DC.description": "Contact Yala Wildlife Safari for expert-guided tours, luxury jeep services, and guaranteed wildlife sightings",
//     "DC.publisher": "Yala Wildlife Safari",
//     "DC.type": "Contact Page, Tourism Service",
//     "DC.format": "text/html",
//     "DC.identifier": `${BASE_URL}/contact`,
//     "DC.language": "en",
//     "business:contact_data:street_address": "Wickrama Kasingama, Tissamaharama Road",
//     "business:contact_data:locality": "Tissamaharama",
//     "business:contact_data:region": "Southern Province",
//     "business:contact_data:postal_code": "82600",
//     "business:contact_data:country_name": "Sri Lanka",
//     "business:contact_data:phone_number": "+94-778-158-004",
//     "business:contact_data:email": "pasindusadanjana17@gmail.com",
//     "business:contact_data:website": BASE_URL,
//     "robots": "index, follow, max-image-preview:large",
//     "googlebot": "index, follow, max-image-preview:large",
//   },

//   openGraph: {
//     type: "website",
//     title: "Contact Yala Safari Tours | Book Your Wildlife Adventure",
//     description: "Contact us for expert-guided Yala safari tours. Guaranteed leopard sightings, luxury jeeps, professional guides. Book your adventure today!",
//     url: `${BASE_URL}/contact`,
//     siteName: "Yala Wildlife Safari",
//     locale: "en_US",
//     images: [
//       {
//         url: `${BASE_URL}/contact-yala-safari.jpg`,
//         width: 1200,
//         height: 630,
//         alt: "Contact Yala Wildlife Safari for Expert Tours",
//         type: "image/jpeg",
//       }
//     ],
//   },

//   twitter: {
//     card: "summary_large_image",
//     site: "@yalawildlife",
//     creator: "@yalawildlife",
//     title: "Contact Yala Safari Tours | Book Wildlife Adventure",
//     description: "Contact us for expert-guided Yala safari tours. Call +94-778-158-004 or email for bookings.",
//     images: {
//       url: `${BASE_URL}/contact-yala-safari.jpg`,
//       alt: "Contact Yala Wildlife Safari",
//     },
//   },

//   alternates: {
//     canonical: `${BASE_URL}/contact`,
//   },

//   applicationName: "Yala Wildlife Safari",
//   category: "Travel & Tourism",
//   robots: {
//     index: true,
//     follow: true,
//     googleBot: {
//       index: true,
//       follow: true,
//       'max-image-preview': 'large',
//       'max-snippet': -1,
//     },
//   },
// };

// export default function ContactPage() { ///////////////////////////////////
//   return (
//     <>
//       <Header />

//       <main className="relative min-h-screen text-white bg-black selection:bg-green-500/50" role="main" aria-labelledby="contact-title">

//         {/* =========================================
//             BACKGROUND IMAGE SECTION
//         ========================================= */}
//         <div className="fixed inset-0 z-0">
//           <Image
//             src="/uploads/1748935199061-20250603_1239_Leopard Emerges from Darkness_simple_compose_01jwt9yv7qect8krxy794bcr23.webp"
//             alt="Yala Leopard Emerging from Darkness"
//             fill
//             priority
//             className="object-cover opacity-80"
//             quality={90}
//           />
//           {/* Cinematic Gradients */}
//           <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90" />
//           <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />
//           {/* Noise Texture for Modern Feel */}
//           <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
//         </div>

//         {/* Content Wrapper */}
//         <div className="relative z-10 pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">

//           {/* Header */}
//           <div className="text-center mb-16 space-y-4">
//             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 backdrop-blur-md mb-4">
//               <span className="relative flex h-2 w-2">
//                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
//                 <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
//               </span>
//               <span className="text-xs font-mono uppercase tracking-widest text-green-400">Bookings Open 24/7</span>
//             </div>
//             <h1 id="contact-title" className="text-5xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
//               Begin Your <span className="text-green-500">Expedition</span>
//             </h1>
//             <p className="text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto font-light">
//               Experience the raw intensity of Yala. Secure your private safari jeep and guaranteed leopard tracking expert today.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

//             {/* LEFT COLUMN: Contact Cards & Info */}
//             <div className="lg:col-span-5 space-y-6">

//               {/* Glass Card 1: Direct Contact */}
//               <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-colors duration-500 group">
//                 <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
//                   <Phone className="text-green-500 w-5 h-5" /> Direct Lines
//                 </h3>
//                 <div className="space-y-4">
//                   <a href="tel:+94778158004" className="block">
//                     <div className="text-sm text-neutral-400 uppercase tracking-wider mb-1">Hotline (WhatsApp Available)</div>
//                     <div className="text-3xl font-mono text-white group-hover:text-green-400 transition-colors">+94 778 158 004</div>
//                   </a>
//                   <div className="w-full h-px bg-white/10" />
//                   <a href="mailto:pasindusadanjana17@gmail.com" className="block">
//                     <div className="text-sm text-neutral-400 uppercase tracking-wider mb-1">Email Reservations</div>
//                     <div className="text-lg text-white group-hover:text-green-400 transition-colors">pasindusadanjana17@gmail.com</div>
//                   </a>
//                 </div>
//               </div>

//               {/* Glass Card 2: Location Map Wrapper */}
//               <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-1 overflow-hidden h-[300px] relative">
//                 <div className="absolute top-4 left-4 z-20 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-xs font-mono text-green-400 flex items-center gap-2">
//                   <MapPin size={12} /> BASE: YALA National Park
//                 </div>
//                 <div className="w-full h-full rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 opacity-80 hover:opacity-100">
//                   {/* The LocationMap component goes here. 
//                         We wrap it to control styling. */}
//                   <LocationMap />
//                 </div>
//               </div>

//               {/* Glass Card 3: Quick Stats */}
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="backdrop-blur-md bg-green-900/20 border border-green-500/20 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
//                   <Clock className="mb-2 text-green-400" />
//                   <span className="text-2xl font-bold text-white">20 mins</span>
//                   <span className="text-xs text-neutral-400 uppercase">From Park Entrance</span>
//                 </div>
//                 <div className="backdrop-blur-md bg-green-900/20 border border-green-500/20 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
//                   <ShieldCheck className="mb-2 text-green-400" />
//                   <span className="text-2xl font-bold text-white">100%</span>
//                   <span className="text-xs text-neutral-400 uppercase">Verified Guides</span>
//                 </div>
//               </div>

//             </div>

//             {/* RIGHT COLUMN: The Form */}
//             <div className="lg:col-span-7">
//               <div className="backdrop-blur-xl bg-black/40  rounded-3xl p-8 md:p-10 shadow-2xl ring-1 ring-white/5 relative overflow-hidden">

//                 <div className="absolute -top-20 -right-20 w-64 h-64 bg-green-500/10 rounded-full blur-3xl pointer-events-none"></div>

//                 <div className="relative z-10 mb-8">
//                   <h2 className="text-3xl font-bold text-white mb-2">Secure Your Safari</h2>
//                   <p className="text-neutral-400">Fill out the details below. Our team responds within 2 hours with a curated itinerary.</p>
//                 </div>

//                 <div className="contact-form-wrapper">
//                   <ContactForm />
//                 </div>
//               </div>
//             </div>

//           </div>
//         </div>
//       </main>

//       {/* ✅ SEO-ENHANCED: Structured Data for Contact Page (UNTOUCHED) */}
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{
//           __html: JSON.stringify({
//             "@context": "https://schema.org",
//             "@type": "ContactPage",
//             "name": "Contact Yala Wildlife Safari",
//             "description": "Contact information for Yala Wildlife Safari tours and bookings",
//             "url": `${BASE_URL}/contact`,
//             "mainEntity": {
//               "@type": "LocalBusiness",
//               "name": "Yala Wildlife Safari",
//               "image": `${BASE_URL}/yala-safari-office.jpg`,
//               "telephone": "+94-778-158-004",
//               "email": "pasindusadanjana17@gmail.com",
//               "address": {
//                 "@type": "PostalAddress",
//                 "streetAddress": "Wickrama Kasingama, Tissamaharama Road",
//                 "addressLocality": "Tissamaharama",
//                 "addressRegion": "Southern Province",
//                 "postalCode": "82600",
//                 "addressCountry": "LK"
//               },
//               "geo": {
//                 "@type": "GeoCoordinates",
//                 "latitude": 6.3747,
//                 "longitude": 81.1185
//               },
//               "openingHoursSpecification": [
//                 {
//                   "@type": "OpeningHoursSpecification",
//                   "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
//                   "opens": "06:00",
//                   "closes": "20:00"
//                 }
//               ],
//               "serviceType": "Safari Tours",
//               "areaServed": "Yala National Park, Sri Lanka"
//             }
//           }),
//         }}
//       />

//       {/* ✅ SEO-ENHANCED: Breadcrumb Schema (UNTOUCHED) */}
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
//                 "name": "Contact",
//                 "item": `${BASE_URL}/contact`
//               }
//             ]
//           }),
//         }}
//       />

//       <AutoSEOWrapper
//         pageTitle="Contact Yala Wildlife Safari | Book Your Tour +94 778 158 004"
//         pageDescription="Contact Yala Wildlife Safari for bookings and inquiries. Available 24/7 via phone, WhatsApp, and email. Based in Tissamaharama, Sri Lanka."
//         pageType="contact"
//       >

//         <div className="container mx-auto px-4 py-8">
//           {/* Glass Container */}
//           <div className="backdrop-blur-xl bg-black/40  rounded-3xl p-8 md:p-12 shadow-2xl">


//             <h1 className="text-3xl md:text-2xl font-bold text-green-400 mb-6 tracking-tight text-center">
//               Contact Yala Wildlife Safari
//             </h1>

//             <div className="space-y-6 text-neutral-200 text-lg leading-relaxed font-light">
//               <p>
//                 Ready to experience the thrill of Yala National Park? Contact our friendly
//                 team to book your safari, ask questions, or request custom tour packages.
//                 We are available <span className="text-green-400 font-medium">24/7</span> to assist with all your safari needs.
//               </p>

//               <p>
//                 Our office is conveniently located in Tissamaharama, just minutes from Yala
//                 National Park entrance. Reach us via <span className="text-white font-medium">Phone, WhatsApp, or Email</span> for instant
//                 booking confirmations and personalized travel advice from our experienced team.
//               </p>

//               <p>
//                 Booking your Yala safari is simple and hassle-free. Contact us with your
//                 preferred date, group size, and package choice. Well confirm availability
//                 instantly and send booking confirmation with payment details. We accept bank
//                 transfers, credit cards, and cash payments.
//               </p>

//               <p>
//                 Looking for a personalized safari experience? Contact us for custom tour packages
//                 tailored to your interests — <span className="text-white font-medium">wildlife photography tours, bird watching expeditions</span>,
//                 multi-day safaris, or combined tours visiting multiple Sri Lankan national parks.
//               </p>

//               <p>
//                 Yala National Park is located approximately 300 km from Colombo and 3 hours from
//                 Galle. We can arrange transportation from major cities. Contact us for travel
//                 advice, accommodation recommendations, and detailed directions to make your journey
//                 smooth and enjoyable.
//               </p>
//             </div>

//           </div>
//         </div>
//       </AutoSEOWrapper>
//     </>
//   );
// }


import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import ContactForm from "@/components/ContactForm";
import LocationMap from "@/components/LocationMap";
import { Phone, Clock, ShieldCheck, UserCheck, MessageCircle, Mail, Landmark, Globe, Printer } from "lucide-react";
import { AutoSEOWrapper } from "@/components/AutoSEOWrapper";

const BASE_URL = "https://www.yalawildlife.com";

// ✅ SEO-ENHANCED: Contact page metadata (UNTOUCHED)
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: "Contact Yala Safari Tours | Book Your Wildlife Adventure Now",
  description: "Contact Yala Wildlife Safari for bookings and inquiries. Expert guides, guaranteed leopard sightings, luxury jeeps. Call +94-778-158-004 or email us today!",

  keywords: [
    "contact yala safari",
    "yala safari jeep",
    "yala national park",
    "yala safari national park",
    "book yala safari",
    "yala safari contact number",
    "yala safari booking",
    "yala safari phone number",
    "yala safari email",
    "yala safari tissamaharama contact",
    "sri lanka safari booking",
    "yala wildlife contact",
    "safari tours contact sri lanka",
    "yala national park booking",
    "wildlife safari contact",
    "yala safari reservation",
    "contact yala tours",
    "safari guide contact yala",
    "yala jeep safari booking",
    "private safari booking yala",
    "luxury safari contact yala",
    "yala safari customer service", "yala safari booking",
    "yala safari phone number",
    "yala safari email",
    "yala safari tissamaharama contact",
    "sri lanka safari booking",
    "yala wildlife contact",
    "safari tours contact sri lanka",
    "yala national park booking",
    "wildlife safari contact",
    "yala safari reservation",
    "contact yala tours",
    "safari guide contact yala",
    "yala jeep safari booking",
    "private safari booking yala",
    "luxury safari contact yala",
    "yala safari customer service",
    "wildlife tours sri lanka contact",
    // --- Booking Intents ---
    "contact yala safari", "book yala safari online", "yala jeep booking number",
    "yala safari price 2025", "reserve safari jeep yala", "yala national park contact",
    "safari reservation sri lanka", "yala ticket booking", "buy yala tickets",
    "private jeep hire yala", "luxury safari booking", "budget safari yala contact",

    // --- Location Specifics ---
    "safari from tissamaharama", "safari from kataragama", "safari from hambantota",
    "yala safari from colombo", "yala safari from galle", "yala safari from ella",
    "palatupana entrance contact", "katagamuwa entrance safari", "galge entrance booking",

    // --- Wildlife & Experience ---
    "leopard safari booking", "best safari guide yala", "yala bird watching tour",
    "yala photography tour", "camping in yala contact", "family safari yala",
    "morning safari booking", "full day safari price", "afternoon safari yala",

    // --- Service & Trust ---
    "yala safari customer care", "best rated safari operator", "safe safari yala",
    "experienced driver yala", "english speaking guide yala", "french speaking guide yala",
    "german speaking guide yala", "yala safari whatsapp number"
  ],

  other: {
    "geo.region": "LK-82",
    "geo.placename": "Tissamaharama, Southern Province, Sri Lanka",
    "geo.position": "6.3747;81.1185",
    "ICBM": "6.3747, 81.1185",
    "DC.title": "Contact Yala Safari Tours | Book Your Wildlife Adventure",
    "DC.creator": "Yala Wildlife Safari",
    "DC.subject": "Contact Information, Safari Booking, Yala Tours",
    "DC.description": "Contact Yala Wildlife Safari for expert-guided tours, luxury jeep services, and guaranteed wildlife sightings",
    "DC.publisher": "Yala Wildlife Safari",
    "DC.type": "Contact Page, Tourism Service",
    "DC.format": "text/html",
    "DC.identifier": `${BASE_URL}/contact`,
    "DC.language": "en",
    "business:contact_data:street_address": "Wickrama Kasingama, Tissamaharama Road",
    "business:contact_data:locality": "Tissamaharama",
    "business:contact_data:region": "Southern Province",
    "business:contact_data:postal_code": "82600",
    "business:contact_data:country_name": "Sri Lanka",
    "business:contact_data:phone_number": "+94-778-158-004",
    "business:contact_data:email": "pasindusadanjana17@gmail.com",
    "business:contact_data:website": BASE_URL,
    "robots": "index, follow, max-image-preview:large",
    "googlebot": "index, follow, max-image-preview:large",
  },

  openGraph: {
    type: "website",
    title: "Contact Yala Safari Tours | Book Your Wildlife Adventure",
    description: "Contact us for expert-guided Yala safari tours. Guaranteed leopard sightings, luxury jeeps, professional guides. Book your adventure today!",
    url: `${BASE_URL}/contact`,
    siteName: "Yala Wildlife Safari",
    locale: "en_US",
    images: [
      {
        url: `${BASE_URL}/contact-yala-safari.jpg`,
        width: 1200,
        height: 630,
        alt: "Contact Yala Wildlife Safari for Expert Tours",
        type: "image/jpeg",
      }
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@yalawildlife",
    creator: "@yalawildlife",
    title: "Contact Yala Safari Tours | Book Wildlife Adventure",
    description: "Contact us for expert-guided Yala safari tours. Call +94-778-158-004 or email for bookings.",
    images: {
      url: `${BASE_URL}/contact-yala-safari.jpg`,
      alt: "Contact Yala Wildlife Safari",
    },
  },

  alternates: {
    canonical: `${BASE_URL}/contact`,
  },

  applicationName: "Yala Wildlife Safari",
  category: "Travel & Tourism",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};



export default function ContactPage() {
  return (
    <>
      <Header />

      <main className="relative min-h-screen text-white bg-black selection:bg-[#00ff00]/50 selection:text-black font-sans" role="main">

        {/* =========================================
            BACKGROUND
        ========================================= */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Image
            src="/uploads/1748935199061-20250603_1239_Leopard Emerges from Darkness_simple_compose_01jwt9yv7qect8krxy794bcr23.webp"
            alt="Yala Leopard Emerging from Darkness"
            fill
            priority
            className="object-cover opacity-60 transition-all duration-[3s]"
            quality={95}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black" />
        </div>

        {/* Content Wrapper */}
        <div className="relative z-10 pt-32 pb-12 px-4 md:px-8 max-w-7xl mx-auto">

          {/* Header */}
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff00] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00ff00]"></span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#00ff00]">
                24/7 Live Support
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#00ff00] leading-tight drop-shadow-xl">
              Let's Plan Your{" "}
              <span className="text-[#00ff00]">Adventure</span>
            </h1>


            <p className="text-sm md:text-base text-neutral-200 max-w-lg mx-auto font-medium leading-relaxed drop-shadow-md">
              Experience the raw intensity of Yala. Secure your private safari jeep with our expert human agents.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* ================= LEFT COLUMN ================= */}
            <div className="lg:col-span-5 space-y-5">

              {/* 1. Quick Customer Support Card (Transparent, Blurred, Linked) */}
              <div className="backdrop-blur-xl bg-transparent rounded-3xl p-6 relative overflow-hidden group transition-all duration-500">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-[#00ff00]/10 flex items-center justify-center text-[#00ff00]">
                    <UserCheck size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white leading-none">Customer Service</h3>
                    <p className="text-xs text-[#00ff00] mt-1 uppercase tracking-wider font-bold">Online Human Agent • Instant Reply</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* WhatsApp Link */}
                  <a
                    href="https://wa.me/94778158004"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between group/link hover:pl-2 transition-all duration-300 bg-white/5 p-4 rounded-2xl hover:bg-white/10 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <MessageCircle size={20} className="text-[#00ff00]" />
                      <div>
                        <div className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold">WhatsApp Hotline</div>
                        <div className="text-lg font-bold text-white group-hover/link:text-[#00ff00] transition-colors">
                          +94 778 158 004
                        </div>
                      </div>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-[#00ff00] animate-pulse shadow-[0_0_10px_#00ff00]"></div>
                  </a>

                  {/* Email Link */}
                  <a
                    href="mailto:pasindusadanjana17@gmail.com"
                    className="flex items-center gap-3 group/link hover:pl-2 transition-all duration-300 bg-white/5 p-4 rounded-2xl hover:bg-white/10 cursor-pointer"
                  >
                    <Mail size={20} className="text-[#00ff00]" />
                    <div className="overflow-hidden">
                      <div className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold">Email Reservations</div>
                      <div className="text-sm font-bold text-white truncate group-hover/link:text-[#00ff00] transition-colors">
                        pasindusadanjana17@gmail.com
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              {/* 2. Official Authority Card (DWC) (Transparent, Blurred, Linked) */}
              <div className="backdrop-blur-xl bg-transparent rounded-3xl p-6 relative overflow-hidden group hover:bg-transparent transition-colors">
                <div className="absolute left-0 top-6 bottom-6 w-1 bg-[#00ff00] rounded-r-full shadow-[0_0_15px_#00ff00]"></div>
                <div className="pl-4">
                  <h3 className="text-xs font-bold text-[#00ff00] mb-3 uppercase tracking-widest flex items-center gap-2">
                    <Landmark size={14} /> Official Authority
                  </h3>

                  <a href="https://www.dwc.gov.lk/" target="_blank" rel="noopener noreferrer" className="block mb-3 hover:opacity-80 transition-opacity">
                    <p className="text-sm font-bold text-white mb-1">Department of Wildlife Conservation</p>
                    <div className="text-xs text-neutral-300 leading-relaxed font-medium">
                      <p>811A, Jayanthipura,</p>
                      <p>Battaramulla, Sri Lanka.</p>
                    </div>
                  </a>

                  <div className="grid grid-cols-1 gap-2 text-xs text-neutral-300">
                    <div className="flex gap-4">
                      <a href="tel:+94112888585" className="flex items-center gap-2 hover:text-[#00ff00] transition-colors py-1">
                        <Phone size={12} /> <span className="font-mono font-bold">+94 11 2 888 585</span>
                      </a>
                      <a href="tel:+94112883355" className="flex items-center gap-2 hover:text-[#00ff00] transition-colors py-1">
                        <Printer size={12} /> <span className="font-mono font-bold">+94 11 2 883 355</span>
                      </a>
                    </div>
                    <a href="mailto:dg@dwc.gov.lk" className="flex items-center gap-2 hover:text-[#00ff00] transition-colors py-1 w-fit">
                      <Mail size={12} /> <span className="font-bold">dg@dwc.gov.lk</span>
                    </a>
                    <a
                      href="https://www.dwc.gov.lk/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 py-1 w-fit
             font-bold
             text-neutral-200
             hover:text-[#00ff00]
             transition-colors"
                    >
                      <Globe size={12} />
                      <span>dwc.gov.lk</span>
                    </a>

                  </div>
                </div>
              </div>

              {/* 3. Stats Row */}
              <div className="grid grid-cols-2 gap-3">
                <div className="backdrop-blur-xl bg-transparent rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                  <Clock className="mb-2 text-[#00ff00]" size={20} />
                  <span className="text-xl font-bold text-white">20 <span className="text-xs font-normal text-neutral-400">mins</span></span>
                  <span className="text-[9px] text-neutral-400 font-bold uppercase tracking-wider mt-1">To Park Gate</span>
                </div>
                <div className="backdrop-blur-xl bg-transparent rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                  <ShieldCheck className="mb-2 text-[#00ff00]" size={20} />
                  <span className="text-xl font-bold text-white">100%</span>
                  <span className="text-[9px] text-neutral-400 font-bold uppercase tracking-wider mt-1">Verified</span>
                </div>
              </div>

            </div>

            {/* ================= RIGHT COLUMN (FORM) ================= */}
            <div className="lg:col-span-7">
              <div className="backdrop-blur-3xl bg-black/50 rounded-[2rem] p-6 md:p-8 shadow-2xl relative">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-white">Secure Your Safari</h2>
                  <p className="text-xs text-neutral-400 mt-1">Response time: <span className="text-[#00ff00] font-bold">~15 mins</span> during business hours.</p>
                </div>
                <div className="contact-form-wrapper">
                  <ContactForm />
                </div>
              </div>
            </div>

          </div>

          {/* ================= BIG CUTTER MAP SECTION ================= */}
          <div className="mt-12 w-full h-[450px] md:h-[550px] rounded-[2.5rem] overflow-hidden relative shadow-2xl group bg-black/20 backdrop-blur-sm">
            {/* Tech Overlay */}
            <div className="absolute top-6 left-6 z-20 bg-black/90 backdrop-blur-xl px-5 py-2.5 rounded-full border border-[#00ff00]/30 shadow-[0_0_20px_rgba(0,255,0,0.2)] flex items-center gap-3 pointer-events-none">
              <div className="w-2.5 h-2.5 rounded-full bg-[#00ff00] animate-pulse"></div>
              <span className="text-xs font-bold text-white tracking-widest">YALA HQ LOCATION</span>
            </div>

            {/* Map Container - Starts Dark, Brightens on Hover/Interaction */}
            <div className="w-full h-full filter brightness-[0.6] contrast-[1.1] group-hover:brightness-100 group-hover:contrast-100 transition-all duration-700 ease-in-out">
              <LocationMap />
            </div>

            {/* Cutter Corners Overlay (Visual Effect) */}
            <div className="absolute inset-0 pointer-events-none rounded-[2.5rem] ring-1 ring-white/5"></div>
          </div>

        </div>
      </main>

      {/* ================= SEO CONTENT (Frosted & Readable) ================= */}
      <AutoSEOWrapper
        pageTitle="Contact Yala Wildlife Safari | Book Your Tour +94 778 158 004"
        pageDescription="Contact Yala Wildlife Safari for bookings and inquiries. Available 24/7 via phone, WhatsApp, and email. Based in Tissamaharama, Sri Lanka."
        pageType="contact"
      >
        <div className="container mx-auto px-4 py-16  bg-transparent relative">
          {/* Frosted Glass Container for Text Readability */}
          <div className="max-w-5xl mx-auto backdrop-blur-xl bg-white/[0.03]  rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">

            {/* Glow Accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-[#00ff00] shadow-[0_0_30px_#00ff00]"></div>

            <h1 className="text-2xl md:text-3xl font-black text-white mb-8 tracking-tight text-center uppercase">
              Contact <span className="text-[#00ff00]">Yala Wildlife Safari</span>
            </h1>

            <div className="space-y-6 text-neutral-300 text-lg leading-relaxed font-light text-center">
              <p>
                Ready to experience the thrill of Yala National Park? Contact our friendly
                team to book your safari, ask questions, or request custom tour packages.
                We are available <span className="text-[#00ff00] font-bold">24/7</span> to assist with all your safari needs.
              </p>

              <p>
                Our office is conveniently located in Tissamaharama, just minutes from Yala
                National Park entrance. Reach us via <span className="text-white font-bold border-b border-[#00ff00]">Phone, WhatsApp, or Email</span> for instant
                booking confirmations and personalized travel advice from our experienced team.
              </p>
            </div>
          </div>
        </div>
      </AutoSEOWrapper>
    </>
  );
}