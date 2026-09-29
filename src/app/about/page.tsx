import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  organizationSchema,
  websiteSchema,
  localBusinessSchema,
} from "@/lib/schema";
import { ArrowRight, Shield, Camera, Users, Leaf, HeartHandshake, Sparkles } from "lucide-react";

export const revalidate = 3600; // Enable ISR cache for 1 hour for instant TTFB

// ✅ SEO-OPTIMIZED: Base URL for consistency
const BASE_URL = "https://www.yalawildlife.com";

// ✅ ENHANCED: About page metadata (UNTOUCHED)
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "About Yala National Park | Official Guides & Premium Tours Sri Lanka",
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
    siteName: "Yala National Park",
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

export default function AboutPageContent() {
  return (
    <>
      <div
        className="w-full bg-white text-[#1f1f1f] selection:bg-[#00ff00] selection:text-black antialiased overflow-x-hidden [content-visibility:auto]"
        style={{
          fontFamily:
            '"Google Sans", "Open Sans", Roboto, -apple-system, BlinkMacSystemFont, Arial, sans-serif',
        }}
      >
        <main
          role="main"
          aria-labelledby="about-title"
          className="pt-28 sm:pt-32 pb-20 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto flex flex-col gap-16 sm:gap-24 bg-white"
        >

          {/* =========================================
           1. HERO / INTRODUCTION SECTION (1 PRIMARY + 1 PILL PEEK)
          ========================================= */}
          <section className="w-full bg-white [content-visibility:auto]">
            <div className="max-w-7xl mx-auto flex flex-col gap-6 sm:gap-8 bg-white">
              {/* Visual Strip: 1 Primary Landscape Frame + 1 Vertical Pill Peek */}
              <div className="w-full flex gap-3 sm:gap-4 md:gap-5 h-[280px] xs:h-[340px] sm:h-[440px] md:h-[500px] [contain:strict] transform-gpu">
                {/* Primary Landscape Frame (Fills viewport smoothly across mobile & desktop) */}
                <div className="relative flex-1 h-full rounded-[2rem] sm:rounded-[3rem] overflow-hidden bg-[#f1f3f4] [contain:strict]">
                  <Image
                    src="https://images.unsplash.com/photo-1553524082-82690780f842?w=1200&auto=format&fit=crop&q=75"
                    alt="Yala National Park landscape habitat with safari jeeps"
                    fill
                    priority
                    sizes="(max-width: 640px) 78vw, (max-width: 1024px) 75vw, 880px"
                    quality={75}
                    decoding="async"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                  {/* Floating Indicator Badge */}
                  <div className="absolute top-4 left-4 sm:top-7 sm:left-7 pointer-events-none">
                    <span className="inline-flex items-center gap-1.5 sm:gap-2 bg-white/95 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[18px] sm:text-[18px] font-semibold text-[#1f1f1f] tracking-tight">
                      {/* <span className="w-2 h-2 rounded-full bg-[#00ff00]" /> */}
                      Since 2015
                    </span>
                  </div>
                </div>

                {/* Pill Peek 1 (Proportional on mobile, stadium pill on tablet/desktop) */}
                <div className="relative w-[70px] xs:w-[90px] sm:w-[140px] md:w-[170px] lg:w-[210px] shrink-0 h-full rounded-[2rem] sm:rounded-full overflow-hidden bg-[#f1f3f4] [contain:strict]">
                  <Image
                    src="https://images.unsplash.com/photo-1553524082-82690780f842?w=1200&auto=format&fit=crop&q=75"
                    alt="Sri Lankan leopard on granite rock"
                    fill
                    sizes="(max-width: 640px) 22vw, 210px"
                    quality={65}
                    loading="lazy"
                    decoding="async"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/10 pointer-events-none" />
                </div>
              </div>

              {/* Title & Circular Action Controls Row (Centered) */}
              <div className="w-full flex flex-col items-center justify-center text-center pt-2 bg-white">
                <div className="max-w-3xl flex flex-col items-center">
                  <h1
                    id="about-title"
                    className="text-4xl sm:text-5xl lg:text-5xl font-bold text-[#1f1f1f] tracking-tight"
                  >
                    We Are Yala Wildlife
                  </h1>
                  <p className="mt-2.5 sm:mt-3 text-[18px] sm:text-[18px] text-[#5f6368] font-semibold leading-relaxed">
                    Expert guides, expedition-grade 4x4 jeeps, and verified tracker intelligence in Sri Lanka&apos;s premier national park.
                  </p>
                </div>
              </div>

              {/* Narrative Paragraphs (Centered) */}
              <div className="w-full max-w-4xl mx-auto text-center text-[18px] text-[#5f6368] leading-relaxed font-semibold space-y-4 pt-1 sm:pt-2 bg-white">
                <p className="text-[18px] text-[#5f6368] font-semibold ">
                  Yala Wildlife Safari is Sri Lanka&apos;s premier safari team, specializing in ethical, naturalist-led wildlife expeditions through Yala National Park. Backed by 8+ years of field intelligence and a 4.9/5 rating across 300+ global travelers, we provide respectful, direct access to the world&apos;s densest leopard habitat.
                </p>
                <p className="text-[18px] text-[#5f6368] font-semibold ">
                  Our certified naturalists combine generational tracking wisdom with biological research. Every drive is operated using custom-modified 4x4 Toyota Hilux jeeps built with elevated stadium seating, heavy-duty suspension, and photography beanbag mounts.
                </p>
                <p className="text-[18px] text-[#5f6368] font-semibold ">
                  We uphold a strict{" "}
                  Nature First conservation policy, maintaining generous animal buffer zones and directly supporting park habitat protection initiatives.
                </p>
              </div>
            </div>
          </section>

          {/* =========================================
              2. THE YALA HABITAT STATS SECTION
          ========================================= */}
          <section className="w-full bg-white">
            <div className="bg-white rounded-[2.5rem] sm:rounded-[3.25rem] p-6 sm:p-10 lg:p-14 [contain:paint] transform-gpu">
              {/* Centered Icon & Section Title */}
              <div className="flex flex-col items-center justify-center text-center mb-12 bg-white">
                <div className="w-12 h-12 rounded-2xl bg-[#f8f9fa] flex items-center justify-center mb-4">
                  <Shield className="w-10 h-10 text-[#000000]" />
                </div>

                <h2 className="text-4xl sm:text-5xl font-bold text-[#000000] tracking-relax">
                  Yala National Park A Wildlife Paradise
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center bg-white">
                {/* Left Description */}
                <div className="space-y-4 text-[18px] text-[#5f6368] leading-relaxed font-normal bg-white text-center">
                  <p className="text-[18px] text-[#5f6368] font-semibold ">
                    Nestled in Sri Lanka&apos;s southeastern dry zone,{" "}
                    Yala National Park encompasses 979 square kilometers of coastal scrub, monsoon forest, and granite inselbergs. It is recognized internationally for harboring the highest wild leopard concentration on Earth.
                  </p>
                  <p className="text-[18px] text-[#5f6368] font-semibold ">
                    Beyond leopards, the park supports more than{" "}
                    <strong className="text-[#1f1f1f] font-semibold">
                      44 mammal species
                    </strong>{" "}
                    and{" "}
                    <strong className="text-[#1f1f1f] font-semibold">
                      215 bird varieties
                    </strong>
                    . Visitors encounter herds of Asian elephants along the Menik River, sloth bears foraging termite mounds, and marsh crocodiles basking in tidal lagoons.
                  </p>
                  <p className="text-[18px] text-[#5f6368] font-semibold ">
                    Our trackers coordinate responsibly with wildlife conservation wardens to monitor migration corridors and preserve these pristine ecosystems.
                  </p>
                </div>

                {/* Right 2x2 Metric Cards (All White, No Shadows, No Borders) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white">
                  <div className="bg-[#f8f9fa] rounded-3xl p-6 text-center flex flex-col items-center justify-center">
                    <span className="block text-4xl sm:text-5xl font-bold text-[#1f1f1f] mb-1">
                      979
                    </span>
                    <span className="text-[13px] font-bold text-[#5f6368] uppercase tracking-wider">
                      Sq. Kilometers
                    </span>
                  </div>

                  <div className="bg-[#f8f9fa] rounded-3xl p-6 text-center flex flex-col items-center justify-center">
                    <span className="block text-4xl sm:text-5xl font-bold text-[#1f1f1f] mb-1">
                      44+
                    </span>
                    <span className="text-[13px] font-bold text-[#5f6368] uppercase tracking-wider">
                      Mammal Species
                    </span>
                  </div>

                  <div className="bg-[#f8f9fa] rounded-3xl p-6 text-center sm:col-span-2 flex flex-col items-center justify-center">
                    <span className="block text-3xl sm:text-4xl font-bold text-[#1f1f1f] mb-1">
                      Global #1 Density
                    </span>
                    <span className="text-[13px] font-bold text-[#5f6368] uppercase tracking-wider">
                      Panthera Pardus Kotiya Habitat
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =========================================
              3. SERVICE VALUES BENTO GRID
          ========================================= */}
          <section className="w-full bg-white">
            {/* Header Section Centered */}
            <div className="flex flex-col items-center justify-center text-center mb-12 bg-white">
              <h2 className="text-4xl sm:text-5xl font-bold text-[#000000] tracking-tight leading-snug mb-3">
                Why Choose Our Safari Expeditions
              </h2>
              <p className="text-[18px] text-[#5f6368] font-semibold max-w-2xl">
                We combine field naturalist knowledge with luxury equipment and strict wildlife welfare standards.
              </p>
            </div>

            {/* 3 Pure White Bento Cards Centered */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 bg-white">
              {/* Card 1 */}
              <div className="bg-[#fff] rounded-[2.5rem] p-8 sm:p-10 flex flex-col items-center justify-between text-center [contain:paint] transform-gpu hover:scale-[1.01] transition-transform duration-200">
                <div className="flex flex-col items-center w-full">
                  <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-6 mx-auto">
                    <Users className="w-7 h-7 text-[#000000]" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#1f1f1f] tracking-tight leading-snug mb-3">
                    Certified Naturalist Guides
                  </h3>
                  <p className="text-[16px] text-[#5f6368] leading-relaxed font-semibold max-w-sm">
                    Seasoned trackers with 5 to 15 years of daily field experience, offering deep insights into animal corridors and bird calls.
                  </p>
                </div>
                <div className="mt-8 pt-4 flex items-center justify-center gap-2 w-full">
                  <span className="text-[13px] font-semibold text-[#5f6368]">
                    Naturalist Certified
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#00ff00]" />
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-[#ffffff] rounded-[2.5rem] p-8 sm:p-10 flex flex-col items-center justify-between text-center [contain:paint] transform-gpu hover:scale-[1.01] transition-transform duration-200">
                <div className="flex flex-col items-center w-full">
                  <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-6 mx-auto">
                    <Camera className="w-7 h-7 text-[#000000]" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#1f1f1f] tracking-tight leading-snug mb-3">
                    Expedition 4x4 Jeeps
                  </h3>
                  <p className="text-[16px] text-[#5f6368] leading-relaxed font-semibold max-w-sm">
                    Custom Hilux rigs with elevated stadium seating, photography beanbag rests, and USB charging for full-day field convenience.
                  </p>
                </div>
                <div className="mt-8 pt-4 flex items-center justify-center gap-2 w-full">
                  <span className="text-[13px] font-semibold text-[#5f6368]">
                    Comfort Optimized
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#00ff00]" />
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-[#ffffff] rounded-[2.5rem] p-8 sm:p-10 flex flex-col items-center justify-between text-center [contain:paint] transform-gpu hover:scale-[1.01] transition-transform duration-200">
                <div className="flex flex-col items-center w-full">
                  <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-6 mx-auto">
                    <Leaf className="w-7 h-7 text-[#000000]" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#1f1f1f] tracking-tight leading-snug mb-3">
                    Flexible Packages
                  </h3>
                  <p className="text-[16px] text-[#5f6368] leading-relaxed font-semibold max-w-sm">
                    Half-day morning tracking, full-day deep sector drives, and all-inclusive round-trip transfers with park tickets handled in advance.
                  </p>
                </div>
                <div className="mt-8 pt-4 flex items-center justify-center gap-2 w-full">
                  <span className="text-[13px] font-semibold text-[#5f6368]">
                    All Inclusive
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#00ff00]" />
                </div>
              </div>
            </div>

            {/* Pill CTA Button Centered */}
            <div className="flex justify-center text-center mt-12 bg-white">
              <Link
                href="/safari-packages"
                className="inline-flex items-center gap-2 bg-[#f8f9fa] hover:bg-[#00ff00] text-black hover:text-black font-bold text-[16px] px-8 py-3.5 rounded-full transition-colors duration-150 active:scale-95 cursor-pointer shadow-none"
              >
                <span>Explore Safari Packages</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </Link>
            </div>
          </section>

          {/* =========================================
              4. CONSERVATION & COMMUNITY SECTION
          ========================================= */}
          <section className="w-full bg-white">
            <div className="bg-white rounded-[2.5rem] sm:rounded-[3.25rem] p-8 sm:p-12 lg:p-16 text-center flex flex-col items-center [contain:paint] transform-gpu">
              <div className="w-14 h-14 rounded-2xl bg-[#f8f9fa] flex items-center justify-center mb-6">
                <HeartHandshake className="w-10 h-10 text-[#000000]" />
              </div>

              <h2 className="text-4xl sm:text-5xl font-bold text-[#000] tracking-tight leading-snug mb-6 max-w-2xl">
                Conservation Commitment
              </h2>

              <div className="space-y-5 text-[18px] text-[#5f6368] leading-relaxed font-semibold">
                <p className="text-[18px] text-[#5f6368] font-semibold ">
                  Sustainable eco-tourism is the cornerstone of our operations. We work in direct coordination with the Department of Wildlife Conservation and local village councils in Tissamaharama to promote habitat preservation and anti-poaching vigilance.
                </p>
                <p className="text-[18px] text-[#5f6368] font-semibold ">
                  Our game drives observe strict operational protocols: zero-litter compliance, speed limits inside park sectors, animal right-of-way priority, and small group quotas to keep noise footprint minimal.
                </p>
                <p className="text-[18px] text-[#5f6368] font-semibold ">
                  By joining our safaris, you actively contribute to community trackers, local driver livelihood programs, and the ongoing conservation of Sri Lanka&apos;s wildlife heritage.
                </p>
              </div>

              {/* Verified Tag Strip (No Borders) */}
              <div className="mt-8 pt-6 flex flex-wrap items-center justify-center gap-4 text-[13px] font-semibold text-[#5f6368]">
                <span className="inline-flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#000000]" />
                  Zero Animal Disturbance
                </span>
                <span>•</span>
                <span>Licensed Drivers</span>
                <span>•</span>
                <span>Eco Conservation Contributor</span>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Structured Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "AboutPage",
              "name": "About Yala Wildlife Safari",
              "description":
                "Learn about Sri Lanka's premier safari operator offering expert-guided Yala National Park tours since 2015",
              "url": "https://yalawildlife.com/about",
              "mainEntity": {
                "@type": "Organization",
                "name": "Yala Wildlife Safari",
                "foundingDate": "2015",
                "description":
                  "Premier safari operator specializing in Yala National Park wildlife tours with expert guides and luxury vehicles",
                "url": "https://yalawildlife.com",
                "telephone": "+94-778-158-004",
                "email": "info@yalawildlife.com",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Safari Base, Tissamaharama Road",
                  "addressLocality": "Tissamaharama",
                  "addressRegion": "Southern Province",
                  "postalCode": "82600",
                  "addressCountry": "LK",
                },
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.9",
                  "reviewCount": "300",
                  "bestRating": "5",
                },
              },
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://yalawildlife.com" },
                { "@type": "ListItem", "position": 2, "name": "About Us", "item": "https://yalawildlife.com/about" },
              ],
            },
          ]),
        }}
      />
    </>
  );
}