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
  // ... (keeping your extensive keywords and other metadata as is for SEO)
  keywords: [
    // --- Brand & Core Services ---
    "about yala safari", "yala safari company", "yala wildlife safari", "about yala national park",
    "yala safari operator", "sri lanka safari company", "yala safari guides", "expert safari guides yala",
    "professional safari operator", "yala safari experience", "about yala tours", "yala safari history",
    "yala national park information", "yala wildlife information", "yala safari services", "premium safari operator sri lanka",
    "luxury yala safari", "yala safari team", "experienced safari guides", "naturalist guides yala",

    // --- Booking & Pricing Intents (High Conversion) ---
    "book yala safari online", "yala safari price 2025", "yala jeep safari cost", "yala entrance fee",
    "best safari rates yala", "cheap safari yala", "budget safari sri lanka", "luxury safari packages price",
    "yala safari booking contact", "reserve yala jeep", "hire safari guide yala", "private jeep rental yala",
    "shared safari jeep cost", "yala full day safari price", "half day safari rates", "yala ticket booking",

    // --- Location & Travel Routes ---
    "colombo to yala safari", "galle to yala day trip", "ella to yala transfer", "mirissa to yala safari",
    "hambantota to yala", "mattala airport to yala", "kandy to yala tour", "tangalle to yala",
    "arugam bay to yala", "yala national park map", "tissamaharama safari hotels", "hotels near yala park",
    "katagamuwa entrance safari", "palatupana entrance booking", "galge entrance yala", "sithulpawwa road safari",

    // --- Wildlife Specifics (Long Tail) ---
    "sri lankan leopard safari", "panthera pardus koti", "sloth bear sightings yala", "melursus ursinus",
    "asian elephant safari sri lanka", "elephas maximus maximus", "mugger crocodile yala", "saltwater crocodile sri lanka",
    "yala bird watching list", "black necked stork yala", "painted stork colony", "peacock dance yala",
    "spotted deer herds", "sambar deer yala", "wild buffalo sri lanka", "golden jackal yala",
    "wild boar sightings", "mongoose species sri lanka", "jungle fowl sri lanka", "hornbill sightings yala",
    "yala big three", "yala big four", "yala reptiles", "yala amphibians",

    // --- Photography & Specialized Tours ---
    "wildlife photography tour sri lanka", "yala photography safari", "birding tours yala", "ornithology tours sri lanka",
    "professional photographer guide yala", "best lens for yala safari", "golden hour safari yala",
    "sunrise photography yala", "wildlife videography sri lanka", "nature documentary fixer yala",

    // --- Audience Specific ---
    "family safari sri lanka", "kids friendly safari yala", "honeymoon safari packages", "romantic safari yala",
    "solo traveler safari sri lanka", "group safari deals", "senior citizen safari tours", "accessible safari sri lanka",
    "corporate team outing yala", "school trip yala national park", "educational wildlife tours",

    // --- Sustainability & Conservation ---
    "eco friendly safari yala", "sustainable tourism sri lanka", "carbon neutral safari", "wildlife conservation projects yala",
    "responsible travel sri lanka", "ethical wildlife tourism", "no plastic safari", "community based tourism yala",
    "environmental protection yala", "biodiversity hotspot sri lanka", "flora and fauna yala",

    // --- Accommodation Styles ---
    "yala camping safari", "luxury tented camp yala", "glamping yala national park", "tree house yala",
    "eco lodge yala", "bungalow booking yala", "wildlife resort yala", "camping inside yala",

    // --- Comparison & Planning ---
    "yala vs wilpattu", "yala vs udawalawe", "yala vs minneriya", "best national park in sri lanka",
    "best time to visit yala", "yala safari rules", "what to wear on safari sri lanka", "safari packing list",
    "yala closing dates", "yala drought season", "yala monsoon season", "safari safety tips",

    // --- Reviews & Trust ---
    "best safari operator tripadvisor", "yala safari reviews", "highly rated safari yala", "trusted safari company",
    "award winning safari sri lanka", "customer testimonials yala", "safe safari operator",

    // --- Specific Zones & Geography ---
    "yala block 1 safari", "yala block 2 sightings", "yala block 3 adventure", "yala block 4", "yala block 5",
    "kumana national park", "lunugamvehera national park", "bundala national park", "yala strict natural reserve",
    "menik ganga safari", "kumbukkan oya", "patangala rock", "elephant rock yala", "yala lagoon",

    // --- Original Keywords (Preserved) ---
    "wildlife experts yala", "conservation safari tours", "eco tourism yala", "sustainable safari tourism",
    "responsible wildlife tourism", "yala park facts", "yala biodiversity", "yala leopard population",
    "yala elephant herds", "yala bird species", "yala flora fauna", "yala ecosystems", "yala conservation",
    "yala wildlife protection", "yala national park zones", "yala block 1", "yala zone 1", "yala block 2",
    "yala zone 2", "palatupana entrance", "tissamaharama yala", "southern province safari", "yala park entrance",
    "yala safari routes", "yala game drives", "yala jeep tours", "4x4 safari yala", "open vehicle safari",
    "luxury safari jeeps", "comfortable safari vehicles", "safe safari transport", "modern safari equipment",
    "safari photography equipment", "binoculars safari", "wildlife tracking", "animal behavior expertise",
    "bird identification yala", "leopard tracking yala", "elephant behavior yala", "yala safari tips",
    "safari preparation yala", "what to expect yala", "yala safari duration", "best time yala safari",
    "yala safari seasons", "dry season yala", "wet season yala", "yala weather information", "yala climate",
    "yala safari timing", "morning safari yala", "evening safari yala", "full day safari yala", "half day safari yala",
    "private safari yala", "group safari yala", "family safari yala", "educational safari tours",
    "wildlife conservation education", "nature education yala", "environmental awareness", "biodiversity conservation",
    "habitat protection yala", "wildlife corridor protection", "human wildlife conflict", "community conservation",
    "local employment safari", "sustainable tourism benefits", "economic impact tourism"
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

      <div className="min-h-screen text-white relative overflow-hidden font-sans">
        {/* =========================================
            BACKGROUND IMAGE SECTION
        ========================================= */}
        <div className="fixed inset-0 z-0">
          <Image
            src="/uploads/1748935199061-20250603_1239_Leopard Emerges from Darkness_simple_compose_01jwt9yv7qect8krxy794bcr23.webp"
            alt="Yala Leopard Emerging from Darkness"
            fill
            priority // Critical for LCP
            sizes="100vw" // Helps browser select right image size
            className="object-cover opacity-90 md:opacity-80"
            quality={85} // Reduced slightly for better performance without noticeable quality loss
          />
          {/* Cinematic Gradients */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/50 to-black/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />
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
            <div className="backdrop-blur-sm rounded-3xl p-8 md:p-12 relative overflow-hidden">
              {/* Decorative glow */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-green-500/10 rounded-full blur-3xl pointer-events-none"></div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <header className="mb-8">
                    {/* Badge: Removed Border, Smaller Font */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 backdrop-blur-md mb-4">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                      </span>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-green-400">Since 2015</span>
                    </div>
                    {/* H1: Smaller */}
                    <h1 id="about-title" className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                      We Are <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">Yala Wildlife Safari</span>
                    </h1>
                    {/* Subtitle: Smaller */}
                    <p className="text-sm md:text-base text-neutral-300 font-light leading-relaxed">
                      Expert guides, luxury jeeps, and guaranteed wildlife sightings in Sri Lanka&apos;s premier national park.
                    </p>
                  </header>

                  <div className="space-y-6 text-sm text-neutral-300 leading-relaxed font-light">
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

                {/* Image Container: Removed Border */}
                <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl group">
                  <Image
                    src="https://images.unsplash.com/photo-1553524082-82690780f842?w=1000&auto=format&fit=crop&q=60"
                    alt="Yala National Park landscape showing diverse wildlife habitat with expert safari guides"
                    fill
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105 filter grayscale-30 group-hover:grayscale-0"
                    sizes="(max-width: 768px) 100vw, 50vw" // Optimized sizes
                    priority // Load this image ASAP
                  />
                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <p className="text-[10px] font-mono uppercase tracking-widest text-green-400 mb-1">Experience The Wild</p>
                    <h3 className="text-xl font-bold">Expert-Guided Adventures</h3>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =========================================
              THE YALA EXPERIENCE SECTION
          ========================================= */}
          <section className="mb-20">
            {/* Removed Border */}
            <div className="backdrop-blur-md bg-white/5 rounded-3xl p-8 md:p-12 shadow-xl">
              <div className="max-w-4xl mx-auto text-center mb-12">
                <Shield className="w-10 h-10 text-green-500 mx-auto mb-4 opacity-80" />
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 tracking-tight">
                  Yala National Park: <span className="text-green-500">A Wildlife Paradise</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* Left Column: Text Content (Smaller Font) */}
                <div className="space-y-6 text-sm text-neutral-300 leading-relaxed font-light order-2 md:order-1">
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

                {/* Right Column: Stats/Visuals (Removed Borders, Smaller Fonts) */}
                <div className="grid grid-cols-2 gap-4 order-1 md:order-2">
                  <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 text-center hover:bg-white/10 transition-colors duration-300">
                    <span className="block text-3xl md:text-4xl font-bold text-green-500 mb-2">979</span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">Sq. Kilometers</span>
                  </div>
                  <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 text-center hover:bg-white/10 transition-colors duration-300">
                    <span className="block text-3xl md:text-4xl font-bold text-green-500 mb-2">44+</span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">Mammal Species</span>
                  </div>
                  <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 text-center hover:bg-white/10 transition-colors duration-300 col-span-2">
                    <span className="block text-3xl md:text-4xl font-bold text-green-500 mb-2">Highest</span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">Leopard Density Globally</span>
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
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 tracking-tight">
                Why Choose Our <span className="text-green-500">Premium Safari Services</span>
              </h2>
              <p className="text-sm md:text-base text-neutral-300 font-light">
                We combine expert local knowledge with modern luxury and safety standards for an unforgettable wildlife experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Service Card 1 (Removed Border, Smaller Font) */}
              <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-8 hover:bg-white/10 transition-all duration-500 group relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-green-500/20 transition-colors"></div>
                <Users className="w-8 h-8 text-green-500 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-semibold text-white mb-4">Certified Naturalist Guides</h3>
                <p className="text-xs text-neutral-300 font-light leading-relaxed mb-6">
                  Passionate experts with 5-15 years of field experience. They provide fascinating insights into animal behavior and conservation.
                </p>
              </div>

              {/* Service Card 2 (Removed Border, Smaller Font) */}
              <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-8 hover:bg-white/10 transition-all duration-500 group relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-green-500/20 transition-colors"></div>
                <Camera className="w-8 h-8 text-green-500 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-semibold text-white mb-4">Luxury Safari Vehicles</h3>
                <p className="text-xs text-neutral-300 font-light leading-relaxed mb-6">
                  Modern 4x4 jeeps with elevated seating, panoramic windows, and professional-grade photography support for the best views.
                </p>
              </div>

              {/* Service Card 3 (Removed Border, Smaller Font) */}
              <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-8 hover:bg-white/10 transition-all duration-500 group relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-green-500/20 transition-colors"></div>
                <Leaf className="w-8 h-8 text-green-500 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-semibold text-white mb-4">Customizable Packages</h3>
                <p className="text-xs text-neutral-300 font-light leading-relaxed mb-6">
                  From 3-hour drives to multi-day adventures. Small groups ensure personalized attention and minimal environmental impact.
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link
                href="/safari-packages"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-full p-3 px-6 text-sm font-bold text-white transition-all duration-300 hover:scale-105 focus:outline-none"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-500 transition-transform duration-300 group-hover:scale-105"></span>
                <span className="relative flex items-center gap-2">
                  Explore Safari Packages <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </div>
          </section>

          {/* =========================================
              CONSERVATION SECTION
          ========================================= */}
          <section className="mb-20">
            {/* Removed Border */}
            <div className="backdrop-blur-md bg-white/5 rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden">
              {/* Decorative Background Element */}
              <div className="absolute top-0 left-0 w-full h-full bg-[url('/pattern-leaf.svg')] opacity-[0.03] pointer-events-none"></div>

              <div className="max-w-4xl mx-auto text-center">
                <HeartHandshake className="w-10 h-10 text-green-500 mx-auto mb-6 opacity-80" />
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 tracking-tight">
                  Conservation Commitment & <span className="text-green-500">Community Impact</span>
                </h2>

                <div className="space-y-6 text-sm text-neutral-300 leading-relaxed font-light">
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