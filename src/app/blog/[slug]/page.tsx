// import { notFound } from "next/navigation";
// import Image from "next/image";
// import Link from "next/link";
// import Header from "@/components/Header";
// import prisma from "@/lib/prisma";
// import { ArrowLeft, Calendar, Clock, Share2, Tag } from "lucide-react";
// import { Metadata } from "next";

// // --- Types ---
// interface Blog {
//   id: string;
//   title: string;
//   content: string;
//   imageUrl: string;
//   slug: string;
//   createdAt: Date;
//   author?: string;
// }

// interface BlogPostProps {
//   params: Promise<{ slug: string }>;
// }

// // --- Helper: Calculate Reading Time ---
// function getReadingTime(content: string) {
//   const wordsPerMinute = 200;
//   const words = content.trim().split(/\s+/).length;
//   const time = Math.ceil(words / wordsPerMinute);
//   return `${time} min read`;
// }

// // --- Data Fetching ---
// async function getBlog(slug: string): Promise<Blog | null> {
//   try {
//     const blog = await prisma.blog.findUnique({
//       where: { slug },
//     });
//     return blog;
//   } catch (error) {
//     console.error("Error fetching blog:", error);
//     return null;
//   }
// }

// // --- 1. SEO: Maximum Meta Data Configuration ---
// export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
//   const slug = (await params).slug;
//   const blog = await getBlog(slug);

//   if (!blog) {
//     return { title: "Blog Not Found | Yala Wildlife" };
//   }

//   const description = blog.content.substring(0, 160).replace(/\n/g, ' ') + "...";
//   const url = `https://yala-wildlife.com/blog/${blog.slug}`;

//   return {
//     title: `${blog.title} | Yala Wildlife Safari`,
//     description: description,
//     keywords: [
//       "Yala National Park", "Sri Lanka Safari", "Leopard Safari Yala", "Wildlife Photography", 
//       "Yala Jeep Safari", "Best Safari Sri Lanka", "Yala Safari Cost", "Yala Hotels", 
//       "Tissamaharama", "Elephant Sightings", "Sloth Bear Yala", "Bird Watching Sri Lanka",
//       "Safari Packages", "Eco Tourism Sri Lanka", "Adventure Travel", "Nature Blog",
//       "Wildlife Conservation", "Safari Guide", "Yala Block 1", "Yala Block 5",
//       blog.title, "Yala Wildlife"
//     ],
//     authors: [{ name: "Yala Wildlife Team", url: "https://yala-wildlife.com" }],
//     creator: "Yala Wildlife",
//     publisher: "Yala Wildlife",
//     alternates: {
//       canonical: url,
//     },
//     openGraph: {
//       title: blog.title,
//       description: description,
//       url: url,
//       siteName: "Yala Wildlife",
//       images: [
//         {
//           url: blog.imageUrl || "/placeholder-image.jpg",
//           width: 1200,
//           height: 630,
//           alt: blog.title,
//         },
//       ],
//       locale: "en_US",
//       type: "article",
//       publishedTime: blog.createdAt.toISOString(),
//       authors: ["Yala Wildlife Team"],
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: blog.title,
//       description: description,
//       images: [blog.imageUrl || "/placeholder-image.jpg"],
//       creator: "@yalawildlife",
//     },
//     robots: {
//       index: true,
//       follow: true,
//       googleBot: {
//         index: true,
//         follow: true,
//         "max-video-preview": -1,
//         "max-image-preview": "large",
//         "max-snippet": -1,
//       },
//     },
//   };
// }

// // --- Main Component ---
// export default async function BlogPost({ params }: BlogPostProps) {
//   const slug = (await params).slug;
//   const blog = await getBlog(slug);

//   if (!blog) {
//     notFound();
//   }

//   // --- 2. SEO: JSON-LD Structured Data ---
//   const jsonLd = {
//     "@context": "https://schema.org",
//     "@type": "BlogPosting",
//     headline: blog.title,
//     image: [blog.imageUrl],
//     datePublished: blog.createdAt.toISOString(),
//     dateModified: blog.createdAt.toISOString(),
//     author: {
//       "@type": "Organization",
//       name: "Yala Wildlife Team",
//       url: "https://yala-wildlife.com"
//     },
//     publisher: {
//       "@type": "Organization",
//       name: "Yala Wildlife",
//       logo: {
//         "@type": "ImageObject",
//         url: "https://yala-wildlife.com/logo.png",
//       },
//     },
//     description: blog.content.substring(0, 160),
//     mainEntityOfPage: {
//       "@type": "WebPage",
//       "@id": `https://yala-wildlife.com/blog/${blog.slug}`
//     }
//   };

//   return (
//     <>
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
//       />

//       <Header />

//       <main className="relative min-h-screen w-full text-white overflow-x-hidden selection:bg-green-400 selection:text-black font-sans">

//         {/* --- 3. Background Layer (Visible & High Quality) --- */}
//         <div className="fixed inset-0 z-0">
//           <Image
//             src="/uploads/1748935199061-20250603_1239_Leopard%20Emerges%20from%20Darkness_simple_compose_01jwt9yv7qect8krxy794bcr23.webp"
//             alt="Yala Wilderness Background"
//             fill
//             priority
//             quality={90}
//             className="object-cover object-center"
//           />
//           {/* Subtle Overlay: Only darkens bottom for readability, keeps top visible */}
//           <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/80" />
//           <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" />
//         </div>

//         {/* --- Content Container --- */}
//         <div className="relative z-10 container mx-auto px-4 py-24 md:py-32 flex justify-center">

//           <div className="w-full max-w-3xl">
//             {/* Back Button (Floating Pill) */}
//             <Link
//               href="/blog"
//               className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/30 backdrop-blur-md text-xs font-bold text-white hover:bg-green-500 hover:text-black transition-all mb-8 shadow-lg hover:shadow-green-500/20"
//             >
//               <ArrowLeft className="w-3 h-3" />
//               <span>Back</span>
//             </Link>

//             {/* --- The Glass Card (Borderless & Cute) --- */}
//             <article className="relative bg-black/40 backdrop-blur-2xl rounded-[3rem] overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-700">

//               {/* Hero Image inside Card */}
//               <div className="relative w-full aspect-[16/9] md:h-[450px] m-2 rounded-[2.5rem] overflow-hidden shadow-inner">
//                 <Image
//                   src={blog.imageUrl || "/placeholder-image.jpg"}
//                   alt={blog.title}
//                   fill
//                   className="object-cover hover:scale-105 transition-transform duration-1000"
//                 />

//                 {/* Floating Date Badge */}
//                 <div className="absolute top-4 left-4 flex gap-2">
//                    <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-bold text-white uppercase tracking-wider shadow-sm">
//                       <Calendar className="w-3 h-3 text-green-400" />
//                       {blog.createdAt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
//                    </div>
//                 </div>
//               </div>

//               {/* Content Body */}
//               <div className="px-6 py-8 md:px-10 md:py-10">

//                 <header className="mb-8 text-center">
//                   <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-[10px] font-bold uppercase tracking-widest mb-4">
//                     <Tag className="w-3 h-3" /> Wildlife Story
//                   </div>
//                   <h1 className="text-3xl md:text-4xl font-black text-white leading-tight mb-6 drop-shadow-sm">
//                     {blog.title}
//                   </h1>

//                   {/* Author / Stats Row */}
//                   <div className="flex items-center justify-center gap-6 text-xs font-medium text-neutral-300">
//                       <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full">
//                           <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-black font-bold text-[10px]">Y</div>
//                           <span>Yala Team</span>
//                       </div>
//                       <div className="flex items-center gap-1.5">
//                           <Clock className="w-3.5 h-3.5 text-blue-400" />
//                           {getReadingTime(blog.content)}
//                       </div>
//                       <button className="flex items-center gap-1.5 hover:text-white transition-colors">
//                           <Share2 className="w-3.5 h-3.5" /> Share
//                       </button>
//                   </div>
//                 </header>

//                 {/* Divider */}
//                 <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

//                 {/* Prose Content */}
//                 <div className="prose prose-invert prose-lg max-w-none">
//                   {blog.content.split("\n").map((paragraph, index) => (
//                     <p 
//                       key={index} 
//                       className="text-neutral-200 leading-8 mb-5 font-light text-[1.05rem] first-letter:text-3xl first-letter:font-bold first-letter:text-green-400 first-letter:mr-1 first-letter:float-left"
//                     >
//                       {paragraph}
//                     </p>
//                   ))}
//                 </div>

//                 {/* Footer CTA */}
//                 <div className="mt-12 relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-green-600 to-emerald-800 p-8 text-center shadow-lg group hover:shadow-green-500/20 transition-all">
//                   <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
//                   <div className="relative z-10">
//                     <h3 className="text-lg font-bold text-white mb-2">Ready to see this in real life?</h3>
//                     <p className="text-green-100 text-sm mb-6 max-w-sm mx-auto">Book your Yala safari today and experience the magic firsthand.</p>
//                     <Link 
//                         href="/safari-packages"
//                         className="inline-block bg-white text-green-800 font-bold text-sm py-3 px-8 rounded-full transition-transform hover:scale-105 shadow-md"
//                     >
//                         Explore Packages
//                     </Link>
//                   </div>
//                 </div>

//               </div>
//             </article>
//           </div>
//         </div>
//       </main>
//     </>
//   );
// }

// // Enable ISR: Re-generate page every hour to keep SEO fresh
// export const revalidate = 3600;















import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import prisma from "@/lib/prisma";
import { ArrowLeft, Calendar, Clock, Share2, Tag } from "lucide-react";
import { Metadata } from "next";

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
    title: `${blog.title} | Top Rated Yala Safari Guide`,
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
      siteName: "Yala Wildlife Safari",
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
      {/* Inject Schema for Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Header />

      <main className="relative min-h-screen w-full text-white overflow-x-hidden selection:bg-green-400 selection:text-black font-sans">

        {/* --- 3. Background Layer (High Visibility + Fixed) --- */}
        <div className="fixed inset-0 z-0">
          <Image
            src="/uploads/1748935199061-20250603_1239_Leopard%20Emerges%20from%20Darkness_simple_compose_01jwt9yv7qect8krxy794bcr23.webp"
            alt="Yala Wilderness Background - Sri Lankan Leopard"
            fill
            priority
            quality={100}
            className="object-cover object-center"
          />
          {/* Minimal Overlay for text readability at bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/80" />
          <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" />
        </div>

        {/* --- Content Container --- */}
        <div className="relative z-10 container mx-auto px-4 py-24 md:py-32 flex justify-center">

          <div className="w-full max-w-3xl">
            {/* Back Button */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/30 backdrop-blur-md text-xs font-bold text-white hover:bg-green-500 hover:text-black transition-all mb-8 shadow-lg hover:shadow-green-500/20"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Back</span>
            </Link>

            {/* --- The Glass Card (Borderless & Cute) --- */}
            <article className="relative bg-black/40 backdrop-blur-2xl rounded-[3rem] overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-700">

              {/* Hero Image inside Card */}
              <div className="relative w-full aspect-[16/9] md:h-[450px] m-2 rounded-[2.5rem] overflow-hidden shadow-inner">
                <Image
                  src={blog.imageUrl || "/placeholder-image.jpg"}
                  alt={`${blog.title} - Yala National Park Blog`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-1000"
                />

                {/* Floating Date Badge */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-bold text-white uppercase tracking-wider shadow-sm">
                    <Calendar className="w-3 h-3 text-green-400" />
                    {blog.createdAt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </div>
                </div>
              </div>

              {/* Content Body */}
              <div className="px-6 py-8 md:px-10 md:py-10">

                <header className="mb-8 text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-[10px] font-bold uppercase tracking-widest mb-4">
                    <Tag className="w-3 h-3" /> Wildlife Story
                  </div>
                  <h1 className="text-3xl md:text-4xl font-black text-white leading-tight mb-6 drop-shadow-sm">
                    {blog.title}
                  </h1>

                  {/* Author / Stats Row */}
                  <div className="flex items-center justify-center gap-6 text-xs font-medium text-neutral-300">
                    <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-black font-bold text-[10px]">Y</div>
                      <span>Yala Team</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-blue-400" />
                      {getReadingTime(blog.content)}
                    </div>
                    <button className="flex items-center gap-1.5 hover:text-white transition-colors">
                      <Share2 className="w-3.5 h-3.5" /> Share
                    </button>
                  </div>
                </header>

                {/* Divider */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

                {/* Prose Content */}
                <div className="prose prose-invert prose-lg max-w-none">
                  {blog.content.split("\n").map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-neutral-200 leading-8 mb-5 font-light text-[1.05rem] first-letter:text-3xl first-letter:font-bold first-letter:text-green-400 first-letter:mr-1 first-letter:float-left"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Footer CTA */}
                <div className="mt-12 relative overflow-hidden rounded-[2rem] p-8 text-center shadow-lg group hover:shadow-green-500/20 transition-all bg-transparent">
                  <div className="relative z-10">
                    <h3 className="text-lg font-bold text-white mb-2">Ready to see this in real life?</h3>
                    <p className="text-green-100 text-sm mb-6 max-w-sm mx-auto">
                      Book your Yala safari today and experience the magic firsthand.
                    </p>
                    <Link
                      href="/safari-packages"
                      className="inline-block bg-white text-green-800 font-bold text-sm py-3 px-8 rounded-full transition-transform hover:scale-105 shadow-md"
                    >
                      Explore Packages
                    </Link>
                  </div>
                </div>


              </div>
            </article>
          </div>
        </div>
      </main>
    </>
  );
}

// Enable ISR: Re-generate page every hour to keep SEO fresh
export const revalidate = 3600;