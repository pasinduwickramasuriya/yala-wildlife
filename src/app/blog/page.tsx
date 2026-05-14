import type { Metadata } from "next";
import Header from "@/components/Header";
import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import SEOContentBlock from "@/components/SEOContentBlock";
import {
  organizationSchema,
  websiteSchema,
  localBusinessSchema,
} from "@/lib/schema";
import { AutoSEOWrapper } from "@/components/AutoSEOWrapper";
import { Calendar, ArrowUpRight, BookOpen, Tag, Globe } from "lucide-react";
// import AdUnit from "@/components/AdUnit";

// ✅ SEO-OPTIMIZED: Base URL for consisten
const BASE_URL = "https://www.yalawildlife.com";

// ✅ ENHANCED: Blog page metadata (UNTOUCHED)
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Yala Wildlife Blog | Expert Safari Stories & Wildlife Insights Sri Lanka",
  description: "Discover expert Yala safari stories, wildlife photography tips, leopard spotting guides, and conservation insights from Sri Lanka's premier national park. Latest wildlife updates & safari advice.",
  keywords: [
    "yala safari blog",
    "yala wildlife blog",
    "yala national park blog",
    "sri lanka safari blog",
    "yala wildlife stories",
    "yala safari stories",
    "leopard spotting blog",
    "elephant watching blog",
    "yala photography blog",
    "wildlife photography tips",
    "safari photography guide",
    "yala safari tips",
    "yala safari guide",
    "best time visit yala",
    "yala safari seasons",
    "yala wildlife updates",
    "yala park news",
    "conservation blog sri lanka",
    "wildlife conservation stories",
    "yala ecosystem blog",
    "biodiversity blog sri lanka",
    "animal behavior blog",
    "wildlife research blog",
    "yala safari experiences",
    "safari adventure stories",
    "wildlife encounters blog",
    "nature photography blog",
    "bird watching blog yala",
    "yala flora fauna blog",
    "endangered species blog",
    "wildlife tracking blog",
    "safari guide insights",
    "naturalist blog yala",
    "eco tourism blog",
    "sustainable tourism blog",
    "responsible safari blog",
    "wildlife education blog",
    "conservation awareness blog",
    "habitat protection blog",
    "yala research updates",
    "wildlife monitoring blog",
    "animal migration blog",
    "breeding season blog",
    "wildlife behavior patterns",
    "safari equipment blog",
    "wildlife viewing tips",
    "safari preparation blog",
    "yala travel blog",
    "sri lanka nature blog",
    "wildlife documentary blog",
    "safari safety tips",
    "yala weather updates",
    "park regulations blog",
    "wildlife first aid blog",
    "safari ethics blog",
    "photography equipment blog",
    "camera settings wildlife",
    "telephoto lens guide",
    "wildlife composition tips",
    "golden hour photography",
    "action photography tips",
    "wildlife lighting guide",
    "safari journal blog",
    "field notes blog",
    "wildlife identification guide",
    "track identification blog",
    "animal sounds guide",
    "bird calls identification",
    "reptiles yala blog",
    "mammals yala blog",
    "amphibians yala blog",
    "insects yala blog",
    "plant species yala blog",
    "medicinal plants yala",
    "endemic species blog",
    "invasive species blog",
    "climate change impact",
    "habitat restoration blog",
    "community conservation blog",
    "local wildlife stories",
    "traditional knowledge blog",
    "cultural heritage blog",
    "archaeology yala blog",
    "historical sites blog",
    // --- 🔥 TOP TIER: High Volume & Main Intent (The "Big" Keywords) ---
    "yala safari blog", "yala national park safari", "sri lanka safari guide",
    "best safari in sri lanka", "yala wildlife tours", "yala jeep safari booking",
    "visit yala national park", "yala safari price 2025", "yala entrance fee",
    "safari holidays sri lanka", "wildlife holiday sri lanka", "yala park tickets",

    // --- 🐆 WILDLIFE SPECIFIC (Targeting Animal Lovers) ---
    "leopard safari sri lanka", "best place to see leopards", "sri lankan leopard",
    "panthera pardus koti", "sloth bear sightings yala", "asian elephant safari",
    "yala bird watching", "yala crocodile safari", "spotted deer yala",
    "wild boar sightings", "yala peacock dance", "black necked stork yala",
    "painted stork colony", "sri lanka big five", "yala reptiles guide",
    "mugger crocodile yala", "golden jackal sri lanka", "wild buffalo yala",

    // --- 📸 PHOTOGRAPHY NICHE (High Value / Pro Audience) ---
    "wildlife photography tips sri lanka", "best lens for yala safari",
    "camera settings for safari", "yala golden hour photography",
    "bird photography yala", "leopard photography tips", "safari photography gear guide",
    "sony a7rv wildlife settings", "canon r5 safari settings", "nikon z9 wildlife tips",
    "bean bag for safari photography", "monopod vs tripod for safari",
    "best camera for sri lanka wildlife", "photographing black bears yala",

    // --- 📅 PLANNING & LOGISTICS ("How To" & "When To") ---
    "best time to visit yala 2025", "yala safari morning vs afternoon",
    "full day safari yala worth it", "yala safari duration", "yala park opening hours",
    "yala block 1 vs block 5", "palatupana entrance yala", "katagamuwa entrance",
    "galge gate yala", "sithulpawwa road safari", "how to get to yala from colombo",
    "ella to yala safari trip", "galle to yala day tour", "mirissa to yala taxi",
    "safari jeep hire cost", "yala safari shared jeep price",

    // --- 🏨 ACCOMMODATION & LIFESTYLE (Luxury vs Budget) ---
    "luxury safari camping yala", "glamping yala national park", "eco lodges yala",
    "budget safari yala", "best hotels near yala national park",
    "tissamaharama safari hotels", "chena huts yala review", "wild coast tented lodge",
    "camping inside yala park", "treehouse stay yala", "family friendly safari hotels",
    "honeymoon safari packages yala", "sustainable hotels yala",

    // --- 🌍 CONSERVATION & EDUCATION (Building Authority) ---
    "yala conservation projects", "human elephant conflict sri lanka",
    "sustainable tourism yala", "eco friendly safari tips", "plastic free yala",
    "protecting sri lanka leopards", "wildlife ranger stories",
    "biodiversity of yala", "endemic species sri lanka", "dry zone ecosystem",
    "yala flora and fauna", "invasive plants yala", "responsible wildlife watching",

    // --- 🆚 COMPARISON KEYWORDS (Helping Users Choose) ---
    "yala vs udawalawe safari", "yala vs wilpattu for leopards",
    "yala vs minneriya for elephants", "yala vs bundala bird watching",
    "best national park sri lanka for kids", "yala vs kumana national park",

    // --- ❓ LONG TAIL QUESTIONS (Voice Search Optimization) ---
    "is yala national park open today", "what to wear on yala safari",
    "is yala safe for tourists", "do i need a guide for yala safari",
    "can you drive your own car in yala", "how many leopards in yala block 1",
    "likelihood of seeing a leopard in yala", "tipping safari guides sri lanka",
    "breakfast in yala national park", "toilet facilities yala park",

    // --- 🏛️ CULTURE & HISTORY (Local Context) ---
    "sithulpawwa rock temple history", "magul maha viharaya yala",
    "ancient civilizations yala", "monastic ruins sri lanka",
    "kataragama temple visit", "history of ruhuna kingdom",

    // --- 🌦️ WEATHER & SEASONS ---
    "yala weather february", "yala drought season", "yala monsoon safari",
    "yala safari in rain", "best month for yala safari", "yala park closing dates 2025"
  ],
  other: {
    "geo.region": "LK-82",
    "geo.placename": "Yala National Park, Tissamaharama, Southern Province, Sri Lanka",
    "geo.position": "6.3747;81.1185",
    "ICBM": "6.3747, 81.1185",
    "DC.title": "Yala Wildlife Blog | Expert Safari Stories & Wildlife Insights",
    "DC.creator": "Yala Wildlife Safari",
    "DC.subject": "Wildlife Blog, Safari Stories, Conservation Articles, Photography Tips, Nature Education",
    "DC.description": "Expert wildlife blog featuring Yala safari stories, conservation insights, photography tips, and educational content about Sri Lanka's biodiversity",
    "DC.publisher": "Yala Wildlife Safari",
    "DC.contributor": "Expert Safari Guides, Wildlife Photographers, Conservation Specialists, Naturalists",
    "DC.date": new Date().toISOString(),
    "DC.type": "Blog, Wildlife Articles, Educational Content",
    "DC.format": "text/html",
    "DC.identifier": `${BASE_URL}/blog`,
    "DC.language": "en",
    "DC.coverage": "Yala National Park, Southern Province, Sri Lanka",
    "DC.rights": "Copyright 2025 Yala Wildlife Safari",
    "robots": "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    "googlebot": "index, follow, max-image-preview:large, max-snippet:-1",
    "bingbot": "index, follow, max-image-preview:large",
    "yandexbot": "index, follow",
    "revisit-after": "3 days",
    "rating": "general",
    "distribution": "global",
    "theme-color": "#22c55e",
    "apple-mobile-web-app-title": "Yala Wildlife Blog",
    "format-detection": "telephone=yes, address=yes, email=yes",
    "news_keywords": "yala safari, wildlife conservation, leopard spotting, elephant watching, eco tourism, nature photography, biodiversity, endangered species",
    "article:section": "Wildlife Blog",
    "article:tag": "Safari Stories, Wildlife Photography, Conservation, Nature Education, Animal Behavior",
    "article:author": "Yala Wildlife Safari Team",
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
    title: "Yala Wildlife Blog | Expert Safari Stories & Wildlife Insights Sri Lanka",
    description: "Discover expert Yala safari stories, wildlife photography tips, leopard spotting guides, and conservation insights from Sri Lanka's premier national park.",
    url: `${BASE_URL}/blog`,
    siteName: "Yala Wildlife Safari | Premier Safari Experience",
    locale: "en_US",
    images: [
      {
        url: `${BASE_URL}/og-blog-main.jpg`,
        width: 1200,
        height: 630,
        alt: "Yala Wildlife Blog - Expert Safari Stories & Photography Tips",
        type: "image/jpeg",
      },
      {
        url: `${BASE_URL}/og-wildlife-stories.jpg`,
        width: 1200,
        height: 630,
        alt: "Wildlife Stories from Yala National Park Safari Adventures",
        type: "image/jpeg",
      },
      {
        url: `${BASE_URL}/og-photography-tips.jpg`,
        width: 1200,
        height: 630,
        alt: "Wildlife Photography Tips and Safari Guides Yala",
        type: "image/jpeg",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@yalawildlife",
    creator: "@yalawildlife",
    title: "Yala Wildlife Blog | Expert Safari Stories & Wildlife Insights",
    description: "Discover expert Yala safari stories, wildlife photography tips, leopard spotting guides, and conservation insights from Sri Lanka's premier national park.",
    images: {
      url: `${BASE_URL}/twitter-blog.jpg`,
      alt: "Yala Wildlife Blog - Expert Safari Stories",
    },
  },
  alternates: {
    canonical: `${BASE_URL}/blog`,
    languages: {
      "en-US": `${BASE_URL}/blog`,
      "en-GB": `${BASE_URL}/blog`,
      "en-AU": `${BASE_URL}/blog`,
      "en-CA": `${BASE_URL}/blog`,
      "en-IN": `${BASE_URL}/blog`,
    },
  },
  applicationName: "Yala Wildlife Safari",
  authors: [
    {
      name: "Yala Wildlife Safari Team",
      url: BASE_URL,
    },
  ],
  generator: "Next.js 15",
  category: "Travel & Tourism",
  classification: "Wildlife Blog, Safari Stories, Nature Education, Conservation Articles",
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

export default async function BlogPage() {
  const posts = await prisma.blog.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const keywords = [
    "yala safari blog",
    "yala national park guide",
    "wildlife photography tips",
    "sri lanka safari blog",
    "yala wildlife stories",
    "leopard spotting guide",
    "best time to visit yala",
    "elephant watching tips",
    "safari preparation guide",
    "wildlife conservation stories",
    "yala park updates",
    "nature photography blog",
    "animal behavior insights",
    "eco tourism blog",
    "responsible safari practices",
    "wildlife tracking tips",
    "bird watching yala",
    "safari equipment guide",
    "yala weather information",
    "conservation awareness"
  ];

  const relatedLinks = [
    {
      title: "Book a Safari Package",
      href: "/safari-packages",
    },
    {
      title: "About Our Expert Guides",
      href: "/about",
    },
    {
      title: "Customer Reviews",
      href: "/reviews",
    },
    {
      title: "Contact Us",
      href: "/contact",
    },
  ];

  return (
    <>
      <Header />

      <div className="min-h-screen text-white relative">

        {/* =========================================
            BACKGROUND IMAGE SECTION
        ========================================= */}
        <div className="fixed inset-0 z-0">
          <Image
            src="/uploads/1748935199061-20250603_1239_Leopard Emerges from Darkness_simple_compose_01jwt9yv7qect8krxy794bcr23.webp"
            alt="Yala Leopard Emerging from Darkness"
            fill
            priority
            className="object-cover opacity-100 md:opacity-100"
            quality={90}
          />
          {/* Cinematic Gradients */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/5 to-black/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />
          {/* Noise Texture */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
        </div>

        {/* =========================================
            MAIN CONTENT
        ========================================= */}
        {/* <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20"> */}
        <div className="relative z-10">

          {/* HERO SECTION (Removed box container for cleaner look) */}
          <section className="relative w-full py-20 mt-30 md:py-32 overflow-hidden selection:bg-[#00ff00] selection:text-black">

            {/* --- 1. HERO COMPONENT: PETITE PILL REBUILD --- */}
            <div className="relative z-10 flex flex-col items-center gap-4 text-center mb-16 md:mb-24 px-4 animate-in fade-in slide-in-from-bottom-6 duration-1000 ease-out">


              {/* MAIN TITLE PILL */}
              <div className="inline-block bg-black/80 px-8 py-3 rounded-full shadow-2xl border border-white/5">
                <h1 className="text-[18px] md:text-[24px] font-black text-white uppercase tracking-[0.25em] leading-none">
                  Wildlife <span className="text-white">Chronicles</span>
                </h1>
              </div>

              {/* DESCRIPTION PILL (The "Cuter" larger block) */}
              <div className="inline-block bg-black/80 px-8 py-6 rounded-[2rem] max-w-[850px] mx-auto shadow-2xl border border-white/5 backdrop-blur-sm">
                <p className="text-[14px] md:text-[15px] text-white/80 font-medium leading-relaxed italic">
                  "Explore fascinating wildlife stories and expert photography tips curated by our expert guides.
                  We specialize in conservation insights and technical field analysis to preserve the wild heart
                  of Sri Lanka through transparent reporting and sustainable methodology."
                </p>
              </div>

              {/* MODULAR DATA STRIPS (Refined to match Pill style) */}
              <div className="flex flex-wrap justify-center gap-2 mt-2 max-w-4xl">
                {[
                  "Discover fascinating wildlife stories and expert photography tips,",
                  "and conservation insights from our expert guides."
                ].map((text, i) => (
                  <div key={i} className="bg-black/80 px-6 py-2 rounded-full border border-white/10 shadow-lg">
                    <p className="text-[9px] md:text-[13px] text-neutral-300 font-medium  tracking-[0.2em] leading-relax italic">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* --- 3. SEO SHADOW LAYER --- */}
            <div className="sr-only">
              <SEOContentBlock
                title="Expert Wildlife Content & Safari Insights Sri Lanka"
                description="In-depth articles about Yala's biodiversity, photography techniques, and conservation from guides with 10 years of experience."
                keywords={keywords}
                relatedLinks={relatedLinks}
                showKeywords={false}
              />
            </div>

          </section>





          {/* BLOG GRID - Smaller, Cutter, No Borders */}

          <main className="w-full p-0 m-0 overflow-hidden bg-transparent selection:bg-[#00ff00] selection:text-black">

            {posts.length > 0 ? (
              /* 
                 FORCE FULL WIDTH: w-screen + left-1/2 -translate-x-1/2 
                 This ensures it breaks out of any parent containers.
              */
              <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-0 p-0 m-0 border-none grid-flow-row-dense">
                  {posts.map((post, index) => (
                    <Link
                      key={post.id}
                      href={`/blog/${post.slug}`}
                      className={`group relative overflow-hidden w-full p-0 m-0 border-none transition-all duration-700 ${index % 7 === 0
                        ? "col-span-2 row-span-2 aspect-square md:aspect-auto min-h-[50vh]"
                        : "col-span-1 row-span-1 aspect-square"
                        }`}
                    >
                      {/* IMAGE LAYER */}
                      <div className="absolute inset-0 z-0">
                        {post.imageUrl ? (
                          <Image
                            src={post.imageUrl}
                            alt={post.title}
                            fill
                            sizes="100vw"
                            className="object-cover transition-transform duration-[2.5s] cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-105"
                            priority={index < 4}
                          />
                        ) : (
                          <div className="w-full h-full bg-neutral-900" />
                        )}
                      </div>

                      {/* CINEMATIC OVERLAY */}
                      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/5 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-700" />

                      {/* CONTENT LAYER: HUD STYLE */}
                      <div className="absolute inset-0 z-20 p-4 md:p-6 flex flex-col justify-end">
                        <div className="space-y-2">
                          <div className="inline-block bg-black/40 px-2 py-0.5 rounded-sm mb-1">
                            <span className="text-[7px] md:text-[8px] font-black uppercase tracking-[0.2em] text-[#00ff00]">
                              Story-{index + 1}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-[10px] font-bold text-white uppercase tracking-tight">
                            {new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                          </div>

                          <h3 className={`font-bold text-white tracking-wide leading-[1.2] group-hover:text-[#00ff00] transition-colors duration-500 max-w-[240px] ${index % 7 === 0 ? "text-sm md:text-xl" : "text-[9px] md:text-[11px]"
                            }`}>
                            {post.title}
                          </h3>

                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 translate-x-[-5px] group-hover:translate-x-0 transition-all duration-700">
                            <div className="h-[1px] w-4 bg-[#00ff00]" />
                            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40">
                              Access
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              /* --- EMPTY STATE --- */
              <div className="w-full flex flex-col items-center py-48 bg-black border-y border-white/5">
                <h3 className="text-lg font-black text-white uppercase tracking-[0.4em] mb-4">
                  Incoming Signal
                </h3>
                <p className="text-[10px] text-white/40 font-medium uppercase tracking-widest">
                  Compiling field reports... Standby.
                </p>
              </div>
            )}
          </main>

          {/* Ad unit between blog grid and newsletter */}
          {/* <div className="mt-12">
            <AdUnit />
          </div> */}

          {/* NEWSLETTER SECTION - Simplified */}
          <section className="mt-16 flex flex-col items-center gap-2 animate-in slide-in-from-bottom duration-1000 ease-out">
            {/* 1. TINY TITLE ISLAND */}
            <div className="inline-block bg-black/80 px-4 py-1.5 rounded-full shadow-2xl">
              <h2 className="text-[15px] font-black text-white uppercase tracking-[0.2em]">
                Stay Updated
              </h2>
            </div>

            {/* 2. MINI DESCRIPTION PILL */}
            <div className="inline-block bg-black/80 px-6 py-3 rounded-2xl max-w-[660px] text-center shadow-2xl">
              <p className="text-[15px] text-white/80 font-medium leading-relaxed italic">
                "Wildlife stories and conservation updates from our expert guides.Subscribe to receive the latest wildlife stories and conservation updates directly from our expert guides."
              </p>
            </div>

            {/* 3. SMALLEST ACTION BUTTON */}
            <div className="inline-block">
              <Link
                href="/contact"
                className="group flex items-center gap-2 bg-white text-black px-5 py-2 rounded-full shadow-lg hover:bg-[#00ff00] transition-all active:scale-95"
              >
                <span className="text-[10px] font-black uppercase tracking-widest">
                  Get Updates
                </span>
                <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </section>

          {/* SEO CONTENT WRAPPER (Hidden Visual Style, Visible for SEO) */}
          <div className="mt-16 flex flex-col items-center gap-3 opacity-90 text-center animate-in slide-in-from-bottom duration-1000 ease-out">
            <AutoSEOWrapper
              pageTitle="Yala Wildlife Blog | Safari Tips & Wildlife Guides"
              pageDescription="Expert wildlife blog featuring Yala safari tips, leopard tracking guides, photography techniques, and Sri Lanka conservation news. Updated weekly!"
              pageType="blog"
            >
              {/* 1. TITLE PILL */}
              <div className="inline-block bg-black/80 px-5 py-2 rounded-full shadow-2xl">
                <h1 className="text-[15px] font-black text-white uppercase tracking-[0.2em]">
                  Yala Wildlife Blog
                </h1>
              </div>

              {/* 2. DESCRIPTION PILL (The "Cuter" larger block) */}
              <div className="inline-block bg-black/80 px-8 py-5 rounded-[2rem] max-w-[850px] mx-auto shadow-2xl">
                <p className="text-[15px] text-white/80 font-medium leading-relaxed italic text-center">
                  "Welcome to the Yala Wildlife Safari blog...Yala boasts the highest leopard density in the world. Our professional guides
                  know the best routes and times for wildlife spotting. We use luxury 4x4 jeeps
                  equipped with safety features and optimal viewing configurations. Discover the magic of Yala National Park with our premium safari packages.
                  Experience the thrill of spotting elusive leopards, majestic elephants, and
                  over 200 species of birds in their natural habitat. Book your adventure today!"
                </p>
              </div>

              {/* 3. CTA PILL */}
              <div className="inline-block">
                <div className="flex items-center gap-2.5 bg-black/80 text-white/60 px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.2em]">
                  <Globe className="w-3 h-3 text-[#00ff00]" />
                  Optimized for Discovery
                </div>
              </div>
            </AutoSEOWrapper>
          </div>

        </div>
      </div>

      {/*  ENHANCED: Comprehensive Schema markup (UNTOUCHED) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            organizationSchema,
            websiteSchema,
            localBusinessSchema,
            // ... (Schema content remains untouched) ...
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
                "name": "Wildlife Blog",
                "item": `${BASE_URL}/blog`
              }
            ]
          }),
        }}
      />
    </>
  );
}