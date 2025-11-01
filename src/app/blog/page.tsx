
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

// ✅ SEO-OPTIMIZED: Base URL for consistency
const BASE_URL = "https://www.yalawildlife.com";

// ✅ ENHANCED: Blog page metadata
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
    "historical sites blog"
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
    take: 50, // ✅ ENHANCED: Limit for performance
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

      {/* ✅ ADDED: Breadcrumb navigation for SEO */}
      {/* <nav aria-label="Breadcrumb" className="py-4 px-4 md:px-6">
        <div className="container max-w-7xl mx-auto">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/" className="text-green-600 hover:text-green-500 hover:underline transition-colors">
                Home
              </Link>
            </li>
            <li className="text-muted-foreground">/</li>
            <li className="text-foreground font-medium">Wildlife Blog</li>
          </ol>
        </div>
      </nav> */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">

        {/* ✅ ENHANCED: Hero section with SEO-optimized content */}
        <header className="text-center mb-12 mt-12">
          <h1 className="text-3xl md:text-4xl font-bold text-green-600 mb-4 ">
            Yala Wildlife Blog - Expert Safari Stories & Insights
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover fascinating wildlife stories, expert photography tips, conservation insights, and the latest updates from Sri Lanka&apos;s premier national park through our expert guides&apos; experiences.
          </p>
        </header>

        <SEOContentBlock
          title="Expert Wildlife Content & Safari Insights"
          description="Our blog features in-depth articles about Yala's incredible biodiversity, professional wildlife photography techniques, animal behavior patterns, conservation efforts, and practical safari tips from our certified naturalist guides with over 10 years of field experience."
          keywords={keywords}
          relatedLinks={relatedLinks}
          showKeywords={true}
        />

        {/* ✅ ENHANCED: Blog posts with better SEO structure */}
        <main className="mt-12">
          <h2 className="text-2xl font-bold text-green-600 mb-8">Latest Wildlife Stories & Safari Insights</h2>

          {posts.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <article key={post.id} className="group">
                  <Link href={`/blog/${post.slug}`} className="block">
                    <div className="relative aspect-[16/9] overflow-hidden rounded-lg mb-4">
                      <Image
                        src={post.imageUrl}
                        alt={`${post.title} - Yala Wildlife Safari Blog Story`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <header>
                      <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-green-600 transition-colors">
                        {post.title}
                      </h3>
                    </header>
                    <p className="text-muted-foreground line-clamp-3 mb-3">
                      {post.content.substring(0, 150)}...
                    </p>
                    <footer className="flex items-center justify-between">
                      <time
                        className="text-sm text-muted-foreground"
                        dateTime={new Date(post.createdAt).toISOString()}
                      >
                        {new Date(post.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                      <span className="text-sm text-green-600 font-medium group-hover:underline">
                        Read More →
                      </span>
                    </footer>
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-muted-foreground mb-4">
                Coming Soon - Exciting Wildlife Stories
              </h3>
              <p className="text-muted-foreground mb-6">
                Our expert guides are preparing fascinating stories and insights from their latest Yala safari adventures.
              </p>
              <Link
                href="/safari-packages"
                className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-semibold transition-colors"
              >
                Book Your Safari Experience
              </Link>
            </div>
          )}
        </main>

        {/* ✅ ADDED: Newsletter signup section */}
        <section className="mt-16 text-center py-12 rounded-xl">
          <h2 className="text-2xl font-bold text-green-600 mb-4">
            Stay Updated with Latest Wildlife Stories
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Subscribe to receive the latest wildlife stories, safari tips, photography guides, and conservation updates directly from our expert naturalist guides.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-semibold transition-colors"
          >
            Contact Us for Updates
          </Link>
        </section>
      </div>

      {/* ✅ ENHANCED: Comprehensive Schema markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            organizationSchema,
            websiteSchema,
            localBusinessSchema,

            {
              "@context": "https://schema.org",
              "@type": "Blog",
              "name": "Yala Wildlife Blog",
              "headline": "Expert Safari Stories & Wildlife Insights from Yala National Park",
              "description": "Comprehensive wildlife blog featuring expert safari stories, conservation insights, photography tips, and educational content about Sri Lanka's premier national park",
              "url": `${BASE_URL}/blog`,
              "inLanguage": "en-US",
              "publisher": {
                "@type": "Organization",
                "name": "Yala Wildlife Safari",
                "logo": {
                  "@type": "ImageObject",
                  "url": `${BASE_URL}/logo.png`,
                  "width": 200,
                  "height": 60
                },
                "url": BASE_URL
              },
              "author": {
                "@type": "Organization",
                "name": "Yala Wildlife Safari Expert Team",
                "url": BASE_URL
              },
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `${BASE_URL}/blog`
              },
              "blogPost": posts.map((post) => ({
                "@type": "BlogPosting",
                "headline": post.title,
                "description": post.content.substring(0, 160),
                "image": {
                  "@type": "ImageObject",
                  "url": post.imageUrl,
                  "width": 1200,
                  "height": 630
                },
                "datePublished": new Date(post.createdAt).toISOString(),
                "dateModified": new Date(post.createdAt).toISOString(),
                "author": {
                  "@type": "Organization",
                  "name": "Yala Wildlife Safari"
                },
                "publisher": {
                  "@type": "Organization",
                  "name": "Yala Wildlife Safari",
                  "logo": {
                    "@type": "ImageObject",
                    "url": `${BASE_URL}/logo.png`
                  }
                },
                "url": `${BASE_URL}/blog/${post.slug}`,
                "mainEntityOfPage": `${BASE_URL}/blog/${post.slug}`,
                "articleSection": "Wildlife & Safari",
                "keywords": "yala safari, wildlife stories, conservation, nature photography"
              })),
              "about": {
                "@type": "Thing",
                "name": "Yala National Park Wildlife",
                "description": "Wildlife conservation, safari experiences, and biodiversity education"
              },
              "audience": {
                "@type": "Audience",
                "audienceType": "Wildlife Enthusiasts, Nature Photographers, Conservation Advocates, Safari Travelers"
              }
            },

            {
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "name": "Yala Wildlife Blog Articles",
              "description": "Collection of expert wildlife articles, safari stories, and conservation insights from Yala National Park",
              "url": `${BASE_URL}/blog`,
              "mainEntity": {
                "@type": "ItemList",
                "name": "Wildlife Blog Posts",
                "numberOfItems": posts.length,
                "itemListElement": posts.map((post, index) => ({
                  "@type": "ListItem",
                  "position": index + 1,
                  "item": {
                    "@type": "Article",
                    "name": post.title,
                    "url": `${BASE_URL}/blog/${post.slug}`,
                    "datePublished": new Date(post.createdAt).toISOString()
                  }
                }))
              }
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
                "name": "Wildlife Blog",
                "item": `${BASE_URL}/blog`
              }
            ]
          }),
        }}
      />

      <AutoSEOWrapper
        pageTitle="Yala Wildlife Blog | Safari Tips & Wildlife Guides"
        pageDescription="Expert wildlife blog featuring Yala safari tips, leopard tracking guides, photography techniques, and Sri Lanka conservation news. Updated weekly!"
        pageType="blog"
      >
        <div className="container mx-auto px-4 py-8">
          <h1>Yala Wildlife Blog</h1>

          <p>
            Welcome to the Yala Wildlife Safari blog, your comprehensive resource for
            expert safari advice, wildlife photography tips, conservation updates, and
            fascinating stories from Sri Lankas premier national park.
          </p>

          <p>
            Our experienced naturalist guides share insider knowledge about Yalas
            incredible biodiversity, best wildlife viewing seasons, tracking techniques,
            and sustainable tourism practices. Whether planning your first safari or are
            a seasoned enthusiast, our blog provides valuable insights.
          </p>

          <p>
            Discover essential safari planning tips covering best times to visit, what
            to pack for tropical adventures, recommended camera equipment, suitable clothing,
            and health precautions. Learn about park regulations, booking procedures, and
            accommodation options near Yala National Park.
          </p>

          <p>
            Explore in-depth articles about Yalas famous wildlife including Sri Lankan
            leopards, Asian elephants, sloth bears, spotted deer, and over 215 bird species.
            Learn to identify tracks, understand behavior patterns, and discover the best
            locations for specific wildlife sightings throughout the year.
          </p>

          <p>
            Master wildlife photography with detailed tutorials covering camera settings,
            composition techniques, optimal lighting conditions, and ethical photography
            practices. Stay informed about conservation initiatives protecting Yalas
            wildlife and discover how you can support environmental preservation efforts.
          </p>
        </div>
      </AutoSEOWrapper>


    </>
  );
}
