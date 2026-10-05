import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { ArrowLeft, ArrowRight, Calendar, Clock, Share2, Tag } from "lucide-react";
import { Metadata } from "next";
import ReviewPhotoGallery from "@/components/ReviewPhotoGallery";
import DiscountPopup from "@/components/DiscountPopup";
import ShareButton from "@/components/ShareButton";
// import AdUnit from "@/components/AdUnit";

// --- Types ---
interface Blog {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  slug: string;
  createdAt: Date;
  author?: string;
  updatedAt?: Date; // Made optional as it might be null in DB
}

interface BlogPostProps {
  params: Promise<{ slug: string }>;
}

// --- Helper: Calculate Reading Time ---
function getReadingTime(content: string) {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const time = Math.ceil(words / wordsPerMinute);
  return `${time} min read`;
}

// --- Data Fetching ---
async function getBlog(slug: string): Promise<Blog | null> {
  try {
    const blog = await prisma.blog.findUnique({
      where: { slug },
    });
    return blog;
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
}

// =====================================================================
// 🚀 SEO POWERHOUSE: ULTIMATE METADATA CONFIGURATION
// =====================================================================
export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  const slug = (await params).slug;
  const blog = await getBlog(slug);

  if (!blog) {
    return { title: "Blog Not Found | Yala Wildlife" };
  }

  const description = blog.content.substring(0, 160).replace(/\n/g, ' ') + "...";
  const url = `https://yalawildlife.com/blog/${blog.slug}`;
  const images = [
    {
      url: blog.imageUrl || "https://yalawildlife.com/default-og.jpg",
      width: 1200,
      height: 630,
      alt: `${blog.title} - Yala Wildlife Safari Sri Lanka`,
      type: "image/jpeg",
    },
  ];

  // Huge keyword list for long-tail ranking
  const keywords = [
    // Core Keywords
    "Yala National Park", "Yala Safari", "Sri Lanka Wildlife", "Leopard Safari", "Yala Jeep Safari",
    // Animals
    "Sri Lankan Leopard", "Panthera pardus kotiya", "Asian Elephant", "Sloth Bear", "Mugger Crocodile", "Painted Stork", "Peacock", "Spotted Deer",
    // Locations
    "Yala Block 1", "Yala Block 5", "Yala East", "Kumana National Park", "Tissamaharama", "Kataragama", "Hambantota", "Kirinda", "Situlpawwa",
    // Intent Specific
    "Best Safari in Sri Lanka", "Yala Safari Cost 2025", "Yala Entrance Fees", "Jeep Hire Yala", "Luxury Safari Camping", "Budget Safari Yala", "Private Jeep Tour", "Morning Safari Yala", "Full Day Safari Yala",
    // Photography
    "Wildlife Photography Sri Lanka", "Bird Watching Yala", "Nature Photography", "Safari Photography Tips",
    // Blog Specific
    blog.title, ...blog.title.split(" "),
    // General Travel
    "Sri Lanka Tourism", "Visit Sri Lanka", "Adventure Travel Asia", "Eco Tourism Sri Lanka", "Sustainable Travel", "Wildlife Conservation",
    // Misspellings (for catch-all ranking)
    "Yala Park", "Yala Nationalpark", "Sri Lanka Safari Tour", "Yala Hotel",
  ];

  return {
    // title: `${blog.title} | Top Rated Yala Safari Guide`,
    title: `Yala National Park | ${blog.title}`,
    description: description,
    applicationName: "Yala Wildlife",
    authors: [{ name: "Yala Wildlife Team", url: "https://yalawildlife.com" }],
    generator: "Next.js",
    keywords: keywords,
    referrer: "origin-when-cross-origin",
    creator: "Yala Wildlife Team",
    publisher: "Yala Wildlife",
    category: "Travel",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical: url,
      languages: {
        "en-US": url,
      },
    },
    // Enhanced Open Graph
    openGraph: {
      title: blog.title,
      description: description,
      url: url,
      siteName: "Yala National Park",
      images: images,
      locale: "en_US",
      type: "article",
      publishedTime: blog.createdAt.toISOString(),
      modifiedTime: blog.updatedAt ? blog.updatedAt.toISOString() : blog.createdAt.toISOString(),
      authors: ["Yala Wildlife Team"],
      section: "Wildlife & Travel",
      tags: keywords.slice(0, 10), // Pass top keywords as tags
    },
    // Enhanced Twitter Card
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: description,
      images: images,
      creator: "@yalawildlife",
      site: "@yalawildlife",
    },
    // 🌍 Geo-Tagging for Local SEO (Crucial for Yala)
    other: {
      "geo.region": "LK-32", // Southern Province
      "geo.placename": "Tissamaharama",
      "geo.position": "6.28;81.28", // Lat;Long
      "ICBM": "6.28, 81.28",
      // Dublin Core Metadata for Archival/Academic Ranking
      "DC.title": blog.title,
      "DC.creator": "Yala Wildlife Team",
      "DC.subject": "Wildlife Safari",
      "DC.description": description,
      "DC.publisher": "Yala Wildlife",
      "DC.date": blog.createdAt.toISOString(),
      "DC.language": "en",
      "rating": "General",
      "distribution": "Global",
      "revisit-after": "7 days",
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

// --- Main Component ---
export default async function BlogPost({ params }: BlogPostProps) {
  const slug = (await params).slug;
  const blog = await getBlog(slug);

  if (!blog) {
    notFound();
  }

  // =====================================================================
  // 🧠 SEO: RICH STRUCTURED DATA (JSON-LD)
  // =====================================================================

  // 1. Enhanced Article Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    image: [blog.imageUrl],
    datePublished: blog.createdAt.toISOString(),
    dateModified: blog.updatedAt ? blog.updatedAt.toISOString() : blog.createdAt.toISOString(),
    author: {
      "@type": "Organization",
      name: "Yala Wildlife Team",
      url: "https://yalawildlife.com"
    },
    publisher: {
      "@type": "Organization",
      name: "Yala Wildlife",
      logo: {
        "@type": "ImageObject",
        url: "https://yalawildlife.com/logo.png",
      },
    },
    description: blog.content.substring(0, 160),
    articleBody: blog.content,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://yalawildlife.com/blog/${blog.slug}`
    },
    keywords: "Yala Safari, Sri Lanka Wildlife, Leopard",
    isAccessibleForFree: true,
    inLanguage: "en-US",
    // Speakable Schema for Voice Search (Siri/Google Assistant)
    speakable: {
      "@type": "SpeakableSpecification",
      xpath: [
        "/html/head/title",
        "/html/head/meta[@name='description']/@content"
      ]
    }
  };

  // 2. Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://yalawildlife.com"
    }, {
      "@type": "ListItem",
      "position": 2,
      "name": "Blog",
      "item": "https://yalawildlife.com/blog"
    }, {
      "@type": "ListItem",
      "position": 3,
      "name": blog.title,
      "item": `https://yalawildlife.com/blog/${blog.slug}`
    }]
  };

  return (
    <>
      <DiscountPopup />
      {/* Inject Schema for Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main
        className="w-full bg-white text-[#1f1f1f] selection:bg-[#00ff00] selection:text-black antialiased overflow-x-hidden"
        style={{
          fontFamily:
            '"Google Sans", "Open Sans", Roboto, -apple-system, BlinkMacSystemFont, Arial, sans-serif',
        }}
        role="main"
      >
        <div className="pt-20 sm:pt-24 md:pt-28 pb-16 sm:pb-20 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto flex flex-col gap-8 sm:gap-12 md:gap-14 bg-white">

          {/* =========================================
            TOP CORNER BAR: ALL STORIES (LEFT) & SHARE (RIGHT)
        ========================================= */}
          <div className="w-full max-w-5xl mx-auto flex items-center justify-between [contain:paint]">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 bg-[#f8f9fa] hover:bg-[#00ff00] text-[#1f1f1f] hover:text-black font-semibold text-[12px] sm:text-[13px] px-3.5 sm:px-4 py-0 rounded-full transition-colors duration-150 active:scale-95 shadow-none"
            >
              <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>All Stories</span>
            </Link>

            <ShareButton title={blog.title} />
          </div>

          {/* =========================================
            1. HERO STAGE (IMAGE -> TITLE -> METADATA)
        ========================================= */}
          <section className="w-full max-w-5xl mx-auto flex flex-col items-center [contain:paint]">

            {/* Top Featured Hero Image (High visual priority, isolated paint & size containment) */}
            <div className="relative max-w-3xl w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] max-h-[320px] sm:max-h-[460px] md:max-h-[560px] rounded-[1.75rem] sm:rounded-[2.5rem] md:rounded-[3.25rem] overflow-hidden bg-[#f1f3f4] shadow-sm mb-6 sm:mb-8 [contain:strict]">
              <Image
                src={blog.imageUrl || "/placeholder-image.jpg"}
                alt={`${blog.title} - Yala Wildlife Safari`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1024px"
                quality={70}
                priority
                fetchPriority="high"
                className="object-cover object-center"
              />
            </div>

            {/* Headline Stage (Refined bit smaller typography for cleaner editorial aesthetic) */}
            <div className="w-full text-center max-w-2xl mb-6 sm:mb-8 px-2">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-[34px] font-bold text-[#1f1f1f] tracking-tight leading-[1.25] break-words">
                {blog.title}
              </h1>
            </div>

            {/* Unified Metadata Row (Centered & Balanced) */}
            <div className="w-full max-w-[720px] flex items-center justify-center gap-2.5 sm:gap-3.5 py-3.5 sm:py-4 border-y border-[#f1f3f4] [contain:paint]">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#f8f9fa] px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full shrink-0">
                <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center font-bold text-[10px] sm:text-[11px] text-[#1f1f1f] shadow-xs">
                  Y
                </div>
                <span className="text-[12px] sm:text-[13px] font-bold text-[#1f1f1f]">
                  Yala Naturalist Team
                </span>
              </div>

              <span className="text-[#dadce0]">•</span>

              <div className="flex items-center gap-1.5 text-[12px] sm:text-[13px] font-medium text-[#5f6368] shrink-0">
                <span className="w-2 h-2 rounded-full bg-[#00ff00] shrink-0" />
                <time>
                  {new Date(blog.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
              </div>

              <span className="text-[#dadce0]">•</span>

              <span className="inline-flex items-center gap-1 text-[12px] sm:text-[13px] font-semibold text-[#5f6368] shrink-0">
                <Clock className="w-3.5 h-3.5 text-[#5f6368]" />
                {getReadingTime(blog.content)}
              </span>
            </div>
          </section>

          {/* =========================================
            2. EDITORIAL PROSE SECTION (READABLE 720px COLUMN)
        ========================================= */}
          <section className="w-full max-w-[720px] mx-auto flex flex-col items-start text-left [contain:paint]">
            <article className="w-full space-y-6 sm:space-y-7 px-1 sm:px-0">
              {blog.content.split("\n").map((paragraph: string, index: number) => {
                const trimmed = paragraph.trim();
                if (!trimmed) return null;
                const isBullet = trimmed.startsWith("*") || trimmed.startsWith("-");

                if (isBullet) {
                  return (
                    <div key={index} className="flex items-start gap-3 sm:gap-3.5 pl-1.5 sm:pl-4">
                      <span className="w-2 h-2 rounded-full bg-[#00ff00] mt-2.5 shrink-0" />
                      <p className="text-[16px] sm:text-[18px] text-[#000] font-semibold leading-[1.75] sm:leading-[1.8] break-words">
                        {trimmed.replace(/^[*-\s]+/, "")}
                      </p>
                    </div>
                  );
                }

                return (
                  <p
                    key={index}
                    className="text-[16px] sm:text-[18px] text-[#000] font-semibold leading-[1.75] sm:leading-[1.85] break-words"
                  >
                    {trimmed}
                  </p>
                );
              })}
            </article>

            {/* In-Line Action Card */}
            <div className="mt-10 sm:mt-14 w-full bg-[#fff] rounded-[1.75rem] sm:rounded-[2.25rem] p-6 sm:p-8 md:p-9 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 sm:gap-6 [contain:paint]">
              <div className="flex flex-col text-left">
                <span className="text-[11px] sm:text-[12px] font-bold  tracking-wider text-[#5f6368] mb-1 text-center">
                  Private Park Permit & Expeditions
                </span>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#1f1f1f] tracking-tight leading-snug text-center">
                  Experience Yala with our naturalists
                </h3>
                <p className="text-[18px] sm:text-[18px] text-[#5f6368] font-semibold mt-1 text-center">
                  Custom 4×4 elevated jeeps with certified leopard-tracking drivers.
                </p>
              </div>

              <Link
                href="/safari-packages"
                className="inline-flex items-center justify-center gap-2 bg-[#000000] hover:bg-[#00ff00] text-white hover:text-black font-bold text-[13px] sm:text-[14px] px-5 sm:px-6 py-3 sm:py-3.5 rounded-full transition-colors duration-150 active:scale-95 shrink-0 w-full sm:w-auto shadow-none"
              >
                <span>View Tours</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </Link>
            </div>
          </section>

          {/* =========================================
            3. ATTACHED REVIEWS & GALLERY
        ========================================= */}
          <section className="w-full border-t border-[#f1f3f4] pt-10 sm:pt-12 [content-visibility:auto] [contain-intrinsic-size:1px_600px]">
            <ReviewPhotoGallery />
          </section>

        </div>
      </main>
    </>
  );
}

// Enable ISR: Re-generate page every hour to keep SEO fresh
export const revalidate = 0;
