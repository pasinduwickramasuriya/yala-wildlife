// "use client";

// import React, { useState, useEffect, useCallback } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
// import { format } from "date-fns";

// export type Blog = {
//   id: string;
//   title: string;
//   content: string;
//   imageUrl: string;
//   slug: string;
//   createdAt: string;
// };

// const FALLBACK_BLOGS: Blog[] = [
//   {
//     id: "fb-1",
//     title: "Leopard Spotting in Yala Block 1",
//     content:
//       "Discover the best granite outcrops and watering holes for spotting Sri Lankan leopards.",
//     imageUrl: "/uploads/yala1.webp",
//     slug: "leopard-spotting-yala-block-1",
//     createdAt: new Date().toISOString(),
//   },
//   {
//     id: "fb-2",
//     title: "The Wild Elephant Herds of Menik River",
//     content:
//       "Experience Asian elephants gathering along the Menik River banks during dusk safaris.",
//     imageUrl: "/uploads/yala2.webp",
//     slug: "wild-elephant-herds-menik-river",
//     createdAt: new Date().toISOString(),
//   },
//   {
//     id: "fb-3",
//     title: "Complete Guide to Yala Safari Seasons",
//     content:
//       "Plan your wildlife trip with expert tips on climate, waterhole activity, and block access.",
//     imageUrl:
//       "https://res.cloudinary.com/dkfnpmzpv/image/upload/v1784456381/blogs/jqbr6khinkvptii7ax0c.jpg",
//     slug: "yala-safari-seasons-guide",
//     createdAt: new Date().toISOString(),
//   },
//   {
//     id: "fb-4",
//     title: "Sloth Bears & Rare Birdlife of Yala",
//     content:
//       "Uncover Yala's incredible biodiversity beyond the famous big cat tracks.",
//     imageUrl:
//       "https://res.cloudinary.com/dkfnpmzpv/image/upload/v1784789489/blogs/cey5tcc2jkxwzj4kd9dc.jpg",
//     slug: "sloth-bears-rare-birdlife",
//     createdAt: new Date().toISOString(),
//   },
//   {
//     id: "fb-5",
//     title: "Luxury 4x4 Jeep Safari Experience",
//     content:
//       "Why an upgraded custom 4x4 jeep makes all the difference during full-day game drives.",
//     imageUrl:
//       "https://res.cloudinary.com/dkfnpmzpv/image/upload/v1784792078/blogs/q9pbmwka9hce9zfydocc.jpg",
//     slug: "luxury-4x4-jeep-safari",
//     createdAt: new Date().toISOString(),
//   },
// ];

// export default function BlogCaseStudyCarousel({
//   initialBlogs = [],
// }: {
//   initialBlogs?: Blog[];
// }) {
//   const [blogs, setBlogs] = useState<Blog[]>(
//     initialBlogs.length > 0 ? initialBlogs : FALLBACK_BLOGS
//   );
//   const [activeIndex, setActiveIndex] = useState(0);

//   // Fetch from backend API if initialBlogs wasn't provided
//   useEffect(() => {
//     if (initialBlogs.length > 0) {
//       setBlogs(initialBlogs);
//       return;
//     }

//     async function fetchBlogs() {
//       try {
//         const res = await fetch("/api/blogs/featured");
//         if (!res.ok) throw new Error("Failed to load featured blogs");
//         const data = await res.json();
//         if (Array.isArray(data) && data.length > 0) {
//           setBlogs(data);
//         }
//       } catch {
//         // Fallback to FALLBACK_BLOGS on failure
//       }
//     }

//     fetchBlogs();
//   }, [initialBlogs]);

//   const handleNext = useCallback(() => {
//     setBlogs((prev) => {
//       if (prev.length === 0) return prev;
//       setActiveIndex((idx) => (idx + 1) % prev.length);
//       return prev;
//     });
//   }, []);

//   const handlePrev = useCallback(() => {
//     setBlogs((prev) => {
//       if (prev.length === 0) return prev;
//       setActiveIndex((idx) => (idx - 1 + prev.length) % prev.length);
//       return prev;
//     });
//   }, []);

//   // Keyboard navigation
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.key === "ArrowLeft") handlePrev();
//       if (e.key === "ArrowRight") handleNext();
//     };
//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [handleNext, handlePrev]);

//   if (!blogs || blogs.length === 0) return null;

//   // Derive cards relative to activeIndex (Hero, Next 1, Next 2)
//   const current = blogs[activeIndex % blogs.length];
//   const next1 = blogs[(activeIndex + 1) % blogs.length];
//   const next2 = blogs[(activeIndex + 2) % blogs.length];

//   // Helper date formatter
//   const formattedDate = (dateStr?: string) => {
//     try {
//       return format(new Date(dateStr || Date.now()), "MMM dd, yyyy");
//     } catch {
//       return "Recent Story";
//     }
//   };

//   return (
//     <>
//       <link rel="preconnect" href="https://fonts.googleapis.com" />
//       <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
//       <link
//         href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&family=Roboto:wght@400;500;700&display=swap"
//         rel="stylesheet"
//       />

//       <section
//         className="w-full bg-white text-[#202124] py-16 sm:py-24 overflow-hidden selection:bg-[#00ff00] selection:text-black [content-visibility:auto]"
//         style={{
//           fontFamily: '"Google Sans", "Open Sans", Roboto, Arial, sans-serif',
//         }}
//       >
//         <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14">
          
//           {/* 1. TOP CARDS STAGE (EXPANDED HERO + 2 OVERFLOW PILL CARDS) */}
//           <div className="relative w-full flex items-center gap-4 sm:gap-6 lg:gap-8">
            
//             {/* CARD 1: PRIMARY BIG EXPANDED HERO */}
//             <Link
//               href={`/blog/${current.slug}`}
//               className="relative flex-1 min-w-[300px] h-[340px] sm:h-[480px] lg:h-[540px] rounded-[2.5rem] sm:rounded-[3.5rem] overflow-hidden bg-neutral-100 flex-shrink-0 group"
//             >
//               <Image
//                 key={current.id}
//                 src={current.imageUrl || "/uploads/yala1.webp"}
//                 alt={current.title}
//                 fill
//                 priority
//                 sizes="(max-width: 1024px) 70vw, 55vw"
//                 className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
//                 quality={75}
//               />

//               {/* Floating Story Pill */}
//               <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl flex items-center gap-3 shadow-xs">
//                 <div className="w-8 h-8 rounded-full bg-[#00ff00] flex items-center justify-center font-bold text-black text-xs">
//                   {current.title.charAt(0)}
//                 </div>
//                 <div className="flex flex-col">
//                   <span className="text-xs font-bold text-[#202124] leading-tight line-clamp-1 max-w-[200px]">
//                     {current.title}
//                   </span>
//                   <span className="text-[10px] text-[#5f6368] font-medium">
//                     {formattedDate(current.createdAt)}
//                   </span>
//                 </div>
//               </div>
//             </Link>

//             {/* CARD 2: PORTRAIT PILL (NEXT ITEM) */}
//             {blogs.length > 1 && (
//               <div
//                 onClick={handleNext}
//                 className="relative w-44 sm:w-60 lg:w-72 h-[340px] sm:h-[480px] lg:h-[540px] rounded-full overflow-hidden bg-neutral-100 flex-shrink-0 cursor-pointer group transition-all duration-500 hover:opacity-90"
//               >
//                 <Image
//                   key={next1.id}
//                   src={next1.imageUrl || "/uploads/yala2.webp"}
//                   alt={next1.title}
//                   fill
//                   sizes="(max-width: 1024px) 25vw, 20vw"
//                   className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
//                   quality={60}
//                 />
//                 <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />

//                 {/* Bottom Initial Floating Avatar */}
//                 <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-[#202124] shadow-xs">
//                   {next1.title.charAt(0)}
//                 </div>
//               </div>
//             )}

//             {/* CARD 3: TALL CUTOFF PILL (PEEKING OVER RIGHT EDGE) */}
//             {blogs.length > 2 && (
//               <div
//                 onClick={() => setActiveIndex((prev) => (prev + 2) % blogs.length)}
//                 className="relative hidden sm:block w-36 sm:w-48 lg:w-56 h-[340px] sm:h-[480px] lg:h-[540px] rounded-full overflow-hidden bg-neutral-100 flex-shrink-0 cursor-pointer group transition-all duration-500 opacity-80 hover:opacity-100"
//               >
//                 <Image
//                   key={next2.id}
//                   src={next2.imageUrl || "/uploads/yala1.webp"}
//                   alt={next2.title}
//                   fill
//                   sizes="15vw"
//                   className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
//                   quality={50}
//                 />
//                 <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
//               </div>
//             )}

//           </div>

//           {/* 2. BOTTOM DETAILS ROW (INDEX/DATE PILL, STORY TITLE/EXCERPT, CONTROLS) */}
//           <div className="mt-8 sm:mt-12 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            
//             {/* Left Text Block */}
//             <div className="max-w-3xl space-y-4">
//               {/* Badge Tag */}
//               <div className="inline-flex items-center rounded-full overflow-hidden bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
//                 <span className="bg-[#00ff00] text-black text-xs sm:text-sm font-bold px-3.5 py-1.5 rounded-full">
//                   Story 0{activeIndex + 1}
//                 </span>
//                 <span className="px-4 py-1.5 text-xs sm:text-sm font-semibold text-[#202124]">
//                   {formattedDate(current.createdAt)}
//                 </span>
//               </div>

//               {/* Title / Quote Headline */}
//               <h3 className="text-2xl sm:text-4xl lg:text-[2.5rem] font-bold text-[#202124] tracking-tight leading-[1.2]">
//                 “{current.title}”
//               </h3>

//               {/* Description / Content Excerpt */}
//               <p className="text-sm sm:text-base text-[#5f6368] line-clamp-2 leading-relaxed font-normal">
//                 {current.content}
//               </p>
//             </div>

//             {/* Right Action: Read Link + Circle Navigation Controls */}
//             <div className="flex items-center gap-4 self-start lg:self-end">
//               <Link
//                 href={`/blog/${current.slug}`}
//                 className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#202124] hover:text-black mr-2 group"
//               >
//                 <span>Read article</span>
//                 <ArrowUpRight className="w-4 h-4 text-[#00ff00] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
//               </Link>

//               {/* Previous Slide Button */}
//               <button
//                 onClick={handlePrev}
//                 aria-label="Previous article"
//                 className="w-12 h-12 rounded-full bg-[#f1f3f4] hover:bg-[#e8eaed] text-[#202124] flex items-center justify-center transition-colors cursor-pointer"
//               >
//                 <ChevronLeft className="w-5 h-5 -translate-x-0.5" />
//               </button>

//               {/* Next Slide Button */}
//               <button
//                 onClick={handleNext}
//                 aria-label="Next article"
//                 className="w-12 h-12 rounded-full bg-[#00ff00] hover:bg-[#00e600] text-black flex items-center justify-center transition-all cursor-pointer shadow-[0_2px_12px_rgba(0,255,0,0.35)] active:scale-95"
//               >
//                 <ChevronRight className="w-5 h-5 translate-x-0.5" />
//               </button>
//             </div>

//           </div>

//         </div>
//       </section>
//     </>
//   );
// }








"use client";

import React, { useState, useEffect, useCallback, useRef, memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { useThermalOptimization } from "@/hooks/useThermalOptimization";

export type Blog = {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  slug: string;
  createdAt: string;
};

const FALLBACK_BLOGS: Blog[] = [
  {
    id: "fb-1",
    title: "Leopard Spotting in Yala Block 1",
    content:
      "Discover the best granite outcrops and watering holes for spotting Sri Lankan leopards.",
    imageUrl: "/uploads/yala1.webp",
    slug: "leopard-spotting-yala-block-1",
    createdAt: "2026-03-15T00:00:00.000Z",
  },
  {
    id: "fb-2",
    title: "The Wild Elephant Herds of Menik River",
    content:
      "Experience Asian elephants gathering along the Menik River banks during dusk safaris.",
    imageUrl: "/uploads/yala2.webp",
    slug: "wild-elephant-herds-menik-river",
    createdAt: "2026-03-20T00:00:00.000Z",
  },
  {
    id: "fb-3",
    title: "Complete Guide to Yala Safari Seasons",
    content:
      "Plan your wildlife trip with expert tips on climate, waterhole activity, and block access.",
    imageUrl:
      "https://res.cloudinary.com/dkfnpmzpv/image/upload/w_1000,q_auto:eco,f_auto/v1784456381/blogs/jqbr6khinkvptii7ax0c.jpg",
    slug: "yala-safari-seasons-guide",
    createdAt: "2026-04-01T00:00:00.000Z",
  },
  {
    id: "fb-4",
    title: "Sloth Bears & Rare Birdlife of Yala",
    content:
      "Uncover Yala's incredible biodiversity beyond the famous big cat tracks.",
    imageUrl:
      "https://res.cloudinary.com/dkfnpmzpv/image/upload/w_1000,q_auto:eco,f_auto/v1784789489/blogs/cey5tcc2jkxwzj4kd9dc.jpg",
    slug: "sloth-bears-rare-birdlife",
    createdAt: "2026-04-10T00:00:00.000Z",
  },
  {
    id: "fb-5",
    title: "Luxury 4x4 Jeep Safari Experience",
    content:
      "Why an upgraded custom 4x4 jeep makes all the difference during full-day game drives.",
    imageUrl:
      "https://res.cloudinary.com/dkfnpmzpv/image/upload/w_1000,q_auto:eco,f_auto/v1784792078/blogs/q9pbmwka9hce9zfydocc.jpg",
    slug: "luxury-4x4-jeep-safari",
    createdAt: "2026-04-18T00:00:00.000Z",
  },
];

// Lightweight, allocation-free date parser (avoids importing heavy date-fns on low-end CPUs)
function formatDateSafe(dateStr?: string): string {
  if (!dateStr) return "Recent Story";
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  } catch {
    return "Recent Story";
  }
}

// Subcomponent: Isolated preview card with CSS content containment
const CardItem = memo(function CardItem({
  blog,
  onClick,
  isHero = false,
  isSecondary = false,
}: {
  blog: Blog;
  onClick?: () => void;
  isHero?: boolean;
  isSecondary?: boolean;
}) {
  if (isHero) {
    return (
      <Link
        href={`/blog/${blog.slug}`}
        className="relative flex-1 min-w-[280px] h-[320px] sm:h-[460px] lg:h-[520px] rounded-[2.5rem] sm:rounded-[3.5rem] overflow-hidden bg-[#f1f3f4] flex-shrink-0 group transform-gpu [contain:paint]"
      >
        <Image
          src={blog.imageUrl || "/uploads/yala1.webp"}
          alt={blog.title}
          fill
          loading="lazy"
          decoding="async"
          sizes="(max-width: 768px) 90vw, (max-width: 1200px) 60vw, 50vw"
          className="object-cover object-center will-change-transform group-hover:scale-105 transition-transform duration-700 ease-out"
          quality={55}
        />

        <div className="absolute bottom-5 left-5 sm:bottom-8 sm:left-8 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#00ff00] flex items-center justify-center font-bold text-black text-xs shrink-0">
            {blog.title.charAt(0)}
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-[#1f1f1f] leading-tight line-clamp-1 max-w-[180px] sm:max-w-[240px]">
              {blog.title}
            </span>
            <span className="text-[11px] text-[#444746] font-medium">
              {formatDateSafe(blog.createdAt)}
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`relative h-[320px] sm:h-[460px] lg:h-[520px] rounded-full overflow-hidden bg-[#f1f3f4] flex-shrink-0 cursor-pointer group transform-gpu [contain:paint] transition-opacity duration-300 ${
        isSecondary
          ? "w-40 sm:w-56 lg:w-64 hover:opacity-90"
          : "hidden sm:block w-32 sm:w-44 lg:w-52 opacity-80 hover:opacity-100"
      }`}
    >
      <Image
        src={blog.imageUrl || "/uploads/yala2.webp"}
        alt={blog.title}
        fill
        loading="lazy"
        sizes="25vw"
        className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        quality={40}
      />
      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />

      {isSecondary && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-[#1f1f1f]">
          {blog.title.charAt(0)}
        </div>
      )}
    </div>
  );
});

export default function BlogCaseStudyCarousel({
  initialBlogs = [],
}: {
  initialBlogs?: Blog[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { shouldAnimate } = useThermalOptimization(containerRef);

  const [blogs, setBlogs] = useState<Blog[]>(
    initialBlogs.length > 0 ? initialBlogs : FALLBACK_BLOGS
  );
  const [activeIndex, setActiveIndex] = useState(0);

  // Background fetch without layout shift
  useEffect(() => {
    if (initialBlogs.length > 0) return;

    let isMounted = true;
    async function fetchBlogs() {
      try {
        const res = await fetch("/api/blogs/featured");
        if (!res.ok) return;
        const data = await res.json();
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setBlogs(data);
        }
      } catch {
        // Fallback remains stable
      }
    }

    fetchBlogs();
    return () => {
      isMounted = false;
    };
  }, [initialBlogs]);

  const handleNext = useCallback(() => {
    setBlogs((prev) => {
      if (prev.length === 0) return prev;
      setActiveIndex((curr) => (curr + 1) % prev.length);
      return prev;
    });
  }, []);

  const handlePrev = useCallback(() => {
    setBlogs((prev) => {
      if (prev.length === 0) return prev;
      setActiveIndex((curr) => (curr - 1 + prev.length) % prev.length);
      return prev;
    });
  }, []);

  // Keyboard navigation bound only when animating is permitted
  useEffect(() => {
    if (!shouldAnimate) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown, { passive: true });
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev, shouldAnimate]);

  if (!blogs || blogs.length === 0) return null;

  const current = blogs[activeIndex % blogs.length];
  const next1 = blogs[(activeIndex + 1) % blogs.length];
  const next2 = blogs[(activeIndex + 2) % blogs.length];

  return (
    <section
      ref={containerRef}
      className="w-full bg-white text-[#1f1f1f] py-14 sm:py-20 overflow-hidden selection:bg-[#00ff00] selection:text-black [content-visibility:auto]"
      style={{
        fontFamily:
          '"Google Sans", "Open Sans", Roboto, -apple-system, BlinkMacSystemFont, Arial, sans-serif',
      }}
    >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 bg-white">
          
          {/* 1. CAROUSEL STAGE: MAIN HERO + TWO ROUNDED OVERFLOW PILLS */}
          <div className="relative w-full flex items-center gap-4 sm:gap-6 lg:gap-8 [contain:layout_style]">
            <CardItem blog={current} isHero />
            {blogs.length > 1 && (
              <CardItem blog={next1} onClick={handleNext} isSecondary />
            )}
            {blogs.length > 2 && (
              <CardItem
                blog={next2}
                onClick={() =>
                  setActiveIndex((prev) => (prev + 2) % blogs.length)
                }
              />
            )}
          </div>

          {/* 2. STORY DETAILS & CONTROLS */}
          <div className="mt-8 sm:mt-12 flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8 bg-white">
            
            {/* Story Text Information */}
            <div className="max-w-3xl space-y-3 sm:space-y-4">
              {/* Badge Tag */}
              <div className="inline-flex items-center rounded-full bg-white p-0.5">
                <span className="bg-[#00ff00] text-black text-xs sm:text-sm font-bold px-3.5 py-1.5 rounded-full">
                  Story 0{activeIndex + 1}
                </span>
                <span className="px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-[#1f1f1f]">
                  {formatDateSafe(current.createdAt)}
                </span>
              </div>

              {/* Title / Headline */}
              <h3 className="text-2xl sm:text-4xl lg:text-[2.5rem] font-bold text-[#1f1f1f] tracking-tight leading-[1.2] drop-shadow-xs">
                “{current.title}”
              </h3>

              {/* Excerpt */}
              <p className="text-lg sm:text-lg text-[#000000] line-clamp-2 leading-relaxed font-medium">
                {current.content}
              </p>
            </div>

            {/* Actions & Navigation Controls */}
            <div className="flex items-center gap-3 sm:gap-4 self-start lg:self-end pt-2">
              <Link
                href={`/blog/${current.slug}`}
                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#1f1f1f] hover:text-black mr-2 transition-colors"
              >
                <span>Read article</span>
                <ArrowUpRight className="w-4 h-4 text-black" />
              </Link>

              {/* Previous Slide Button */}
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous article"
                className="w-12 h-12 rounded-full bg-[#f1f3f4] hover:bg-[#e8eaed] active:bg-[#dadce0] text-[#1f1f1f] flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5 -translate-x-0.5 stroke-[2.5]" />
              </button>

              {/* Next Slide Button */}
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next article"
                className="w-12 h-12 rounded-full bg-[#00ff00] hover:bg-[#00e600] active:scale-95 text-black flex items-center justify-center transition-all cursor-pointer shadow-[0_2px_12px_rgba(0,255,0,0.35)]"
              >
                <ChevronRight className="w-5 h-5 translate-x-0.5 stroke-[2.5]" />
              </button>
            </div>

          </div>

        </div>
      </section>
  );
}