import type { Metadata } from "next";
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
import { Calendar, ArrowUpRight, BookOpen, Tag, Globe, ArrowRight } from "lucide-react";
// import AdUnit from "@/components/AdUnit";

export const revalidate = 3600; // Enable ISR cache for 1 hour for instant TTFB

// SEO-OPTIMIZED: Base URL for consistency
const BASE_URL = "https://www.yalawildlife.com";

// ✅ ENHANCED: Blog page metadata (UNTOUCHED)
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Yala National Park | Wildlife Blogs | Expert Safari Stories Sri Lanka",
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
    siteName: "Yala National Park",
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
  const rawPosts = await prisma.blog.findMany({
    select: {
      id: true,
      title: true,
      slug: true,
      content: true,
      imageUrl: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const posts = rawPosts.map((post) => {
    const plainText = post.content
      ? post.content.replace(/[#*`_~]/g, "").replace(/\s+/g, " ").trim()
      : "";
    const excerpt =
      plainText.length > 180 ? `${plainText.slice(0, 180).trim()}...` : plainText;

    return {
      ...post,
      excerpt,
    };
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
      <main
        className="w-full bg-white text-[#1f1f1f] selection:bg-[#00ff00] selection:text-black antialiased overflow-x-hidden"
        style={{
          fontFamily:
            '"Google Sans", "Open Sans", Roboto, -apple-system, BlinkMacSystemFont, Arial, sans-serif',
        }}
        role="main"
      >
        <div className="pt-28 sm:pt-32 pb-20 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto flex flex-col gap-12 sm:gap-16 bg-white">
          {/* =========================================
            HERO HEADER SECTION (GOOGLE STYLE CENTERED)
        ========================================= */}
          <section className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto bg-white">
            <h1 className="text-4xl sm:text-5xl lg:text-5xl font-bold text-[#1f1f1f] tracking-tight leading-tight mb-4 text-center">
              Wildlife Chronicles
            </h1>

            <p className="text-[18px] text-[#5f6368] font-semibold leading-relaxed mb-6 text-center">
              Explore fascinating wildlife stories, photography field guides, and conservation insights curated by our expert guides in Yala National Park.
            </p>

            {/* Hidden SEO Shadow Layer */}
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

          {/* =========================================================================
            MODERN GOOGLE EDITORIAL LAYOUT (HERO SPOTLIGHT + CURATED DISCOVERY GRID)
        ========================================================================= */}
          <section className="w-full bg-white [contain:paint]">
            {posts.length > 0 ? (
              <div className="flex flex-col gap-12 sm:gap-16 w-full">
                {/* 1. LEAD SPOTLIGHT HERO FEATURE */}
                {(() => {
                  const lead = posts[0];
                  return (
                    <Link
                      key={lead.id}
                      href={`/blog/${lead.slug}`}
                      className="group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center text-left cursor-pointer transition-transform duration-200 active:scale-[0.99] [contain:paint]"
                    >
                      <div className="lg:col-span-7 relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-[2.5rem] sm:rounded-[3.5rem] overflow-hidden bg-[#f1f3f4] [contain:strict]">
                        {lead.imageUrl ? (
                          <Image
                            src={lead.imageUrl}
                            alt={lead.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 60vw"
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            priority
                          />
                        ) : (
                          <div className="w-full h-full bg-[#f1f3f4] flex items-center justify-center text-[#5f6368] font-bold text-[15px]">
                            Yala Wildlife Safari
                          </div>
                        )}
                      </div>

                      <div className="lg:col-span-5 flex flex-col items-start text-left">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f8f9fa] mb-4">
                          <span className="w-2 h-2 rounded-full bg-[#00ff00]" />
                          <span className="text-[12px] font-bold text-[#1f1f1f] uppercase tracking-wider">
                            Featured Dispatch
                          </span>
                        </div>

                        <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#1f1f1f] group-hover:text-black tracking-tight leading-[1.25] mb-4">
                          “{lead.title}”
                        </h2>

                        {lead.excerpt && (
                          <p className="text-[16px] sm:text-[17px] text-[#5f6368] font-semibold leading-relaxed line-clamp-3 mb-6">
                            {lead.excerpt}
                          </p>
                        )}

                        <div className="flex items-center gap-2 text-[14px] text-[#5f6368] font-semibold mb-6">
                          <span>Field Tracker Guide</span>
                          <span>•</span>
                          <time>
                            {new Date(lead.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </time>
                        </div>

                        <div className="inline-flex items-center justify-center gap-2 bg-[#000000] group-hover:bg-[#00ff00] text-white group-hover:text-black font-bold text-[14px] px-7 py-3.5 rounded-full transition-colors duration-150 shadow-none">
                          <span>Explore Story</span>
                          <ArrowRight className="w-4 h-4 stroke-[2.5] transition-transform duration-200 group-hover:translate-x-1" />
                        </div>
                      </div>
                    </Link>
                  );
                })()}

                {/* 2. SUBSEQUENT DISCOVERY EDITORIAL GRID */}
                {posts.length > 1 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 pt-4">
                    {posts.slice(1).map((post, idx) => (
                      <Link
                        key={post.id}
                        href={`/blog/${post.slug}`}
                        className="group flex flex-col items-start text-left cursor-pointer transition-transform duration-200 active:scale-[0.99] [contain:paint]"
                      >
                        <div className="relative w-full aspect-[16/11] rounded-[2.25rem] sm:rounded-[2.75rem] overflow-hidden bg-[#f1f3f4] mb-5 [contain:strict]">
                          {post.imageUrl ? (
                            <Image
                              src={post.imageUrl}
                              alt={post.title}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                              loading={idx < 2 ? "eager" : "lazy"}
                            />
                          ) : (
                            <div className="w-full h-full bg-[#f1f3f4] flex items-center justify-center text-[#5f6368] font-bold text-[14px]">
                              Yala Wildlife Safari
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col items-start text-left w-full px-1">
                          <h3 className="text-xl sm:text-[22px] font-bold text-[#1f1f1f] group-hover:text-black tracking-tight leading-[1.3] mb-2 line-clamp-2">
                            “{post.title}”
                          </h3>

                          {post.excerpt && (
                            <p className="text-[15px] text-[#5f6368] font-semibold leading-relaxed line-clamp-2 mb-3">
                              {post.excerpt}
                            </p>
                          )}

                          <div className="flex items-center gap-2 text-[13px] text-[#5f6368] font-semibold mt-auto pt-1">
                            <span>Field Observation</span>
                            <span>•</span>
                            <time>
                              {new Date(post.createdAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </time>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full flex flex-col items-center justify-center py-24 bg-[#f8f9fa] rounded-[2.25rem] text-center [contain:paint]">
                <h3 className="text-2xl font-bold text-[#1f1f1f] tracking-tight mb-2 text-center">
                  Field Reports Incoming
                </h3>
                <p className="text-[18px] text-[#5f6368] font-semibold text-center">
                  Compiling wildlife observations and tracking stories. Check back soon.
                </p>
              </div>
            )}
          </section>

          {/* =========================================
            NEWSLETTER / CONTACT ACTION CARD
        ========================================= */}
          <section className="w-full bg-white rounded-[2.25rem] p-8 sm:p-12 flex flex-col items-center justify-center text-center [contain:paint]">
            <h2 className="text-4xl sm:text-5xl font-bold text-[#1f1f1f] tracking-tight mb-3 text-center">
              Stay Updated From The Field
            </h2>

            <p className="text-[18px] text-[#5f6368] font-semibold leading-relaxed mb-8 max-w-xl text-center">
              Receive seasonal leopard movements, photographic guides, and conservation announcements straight from our active driver-guides.
            </p>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2.5 bg-[#000000] hover:bg-[#00ff00] text-white hover:text-black font-bold text-[16px] px-8 py-4 rounded-full transition-colors duration-150 active:scale-95 cursor-pointer shadow-none"
            >
              <span>Connect With Our Desk</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </Link>
          </section>
        </div>

        {/* =========================================
          SEO CONTENT WRAPPER
      ========================================= */}
        <AutoSEOWrapper
          pageTitle="Yala Wildlife Blog | Safari Tips & Wildlife Guides"
          pageDescription="Expert wildlife blog featuring Yala safari tips, leopard tracking guides, photography techniques, and Sri Lanka conservation news. Updated weekly!"
          pageType="blog"
        >
          <section className="w-full bg-white text-[#1f1f1f] py-16 px-4 sm:px-8 md:px-12 border-t border-[#f1f3f4] [content-visibility:auto] [contain-intrinsic-size:1px_400px]">
            <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
              <h2 className="text-4xl sm:text-5xl font-bold text-[#1f1f1f] tracking-tight leading-tight mb-4 text-center">
                Yala Wildlife Blog
              </h2>

              <div className="space-y-4 text-[18px] text-[#5f6368] font-semibold leading-relaxed text-center max-w-3xl mb-8">
                <p className="text-[18px] text-[#5f6368] font-semibold leading-relaxed mb-6 text-center">
                  Welcome to the official Yala Wildlife Safari editorial portal. Yala National Park features one of the highest documented leopard densities on earth, alongside major populations of Asian elephants, sloth bears, mugger crocodiles, and over 200 species of migratory and endemic avifauna.
                </p>
                <p className="text-[18px] text-[#5f6368] font-semibold leading-relaxed mb-6 text-center">
                  Our naturalist drivers and trackers contribute original field observations, best visiting seasons, entrance gate logistics, and photography vehicle positioning recommendations to ensure travelers explore responsibly and sustainably.
                </p>
              </div>

              <div className="inline-flex items-center gap-2 bg-[#fff] px-5 py-2 rounded-full">
                <Globe className="w-4 h-4 text-[#1f1f1f]" />
                <span className="text-[13px] font-bold text-[#5f6368] uppercase tracking-wider">
                  Updated Bi-Weekly • Field Verified
                </span>
              </div>
            </div>
          </section>
        </AutoSEOWrapper>
      </main>

      {/* Comprehensive Schema markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            organizationSchema,
            websiteSchema,
            localBusinessSchema,
          ]),
        }}
      />

      {/* Breadcrumb schema */}
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
                item: BASE_URL,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Wildlife Blog",
                item: `${BASE_URL}/blog`,
              },
            ],
          }),
        }}
      />
    </>
  );
}