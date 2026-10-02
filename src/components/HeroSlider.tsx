"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useThermalOptimization } from "@/hooks/useThermalOptimization";

export interface HeroSection {
  id: string;
  imageUrl: string;
  title: string;
  subtitle: string;
}

const DEFAULT_HERO_SECTIONS: HeroSection[] = [
  {
    id: "default-1",
    title: "YALA WILDLIFE SAFARI",
    subtitle:
      "Experience Sri Lanka's premier national park with guaranteed leopard sightings, verified tracker intelligence, and custom luxury 4x4 game drives.",
    imageUrl: "/uploads/yala1.webp",
  },
  {
    id: "default-2",
    title: "WILD ELEPHANT HERDS",
    subtitle:
      "Watch majestic Asian elephants gathering along the scenic Menik River bank at dusk, tracked live with minimum visitor interference.",
    imageUrl: "/uploads/yala2.webp",
  },
  {
    id: "default-3",
    title: "EXPERT SAFARI GUIDES",
    subtitle:
      "Custom tailored wildlife game drives led by top naturalist trackers and biology researchers in Yala Block 1.",
    imageUrl:
      "https://images.unsplash.com/photo-1547970810-dc92b3848368?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function HeroSlider({
  initialHeroSections = [],
}: {
  initialHeroSections?: HeroSection[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { shouldAnimate } = useThermalOptimization(containerRef);

  const heroSections =
    initialHeroSections.length > 0 ? initialHeroSections : DEFAULT_HERO_SECTIONS;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(true);

  // Pick next / prev slide with boundary guard
  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % heroSections.length);
  }, [heroSections.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + heroSections.length) % heroSections.length);
  }, [heroSections.length]);

  // Pause when tab is not active to prevent background GPU/CPU burn
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabVisible(document.visibilityState === "visible");
    };

    document.addEventListener("visibilitychange", handleVisibilityChange, { passive: true });
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // Low-spec & battery saver detection: stop loop if Save-Data is enabled or user wants reduced motion
  const [isLowSpecDevice, setIsLowSpecDevice] = useState(false);
  useEffect(() => {
    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    };
    const isSaveData = nav.connection?.saveData === true;
    const isSlowConn = nav.connection?.effectiveType === "2g" || nav.connection?.effectiveType === "slow-2g";
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isSaveData || isSlowConn || prefersReducedMotion) {
      setIsLowSpecDevice(true);
    }
  }, []);

  // Safe auto-cycle timer (aborts during thermal load, background tab, or battery conservation mode)
  useEffect(() => {
    if (
      heroSections.length <= 1 ||
      isHovered ||
      !shouldAnimate ||
      !isTabVisible ||
      isLowSpecDevice
    ) {
      return;
    }

    const interval = setInterval(() => {
      handleNext();
    }, 30000);

    return () => clearInterval(interval);
  }, [heroSections.length, isHovered, shouldAnimate, isTabVisible, isLowSpecDevice, handleNext]);

  if (!heroSections || heroSections.length === 0) return null;

  const currentSlide = heroSections[currentIndex] || heroSections[0];

  // 3 preview thumbnails following current slide
  const upcomingPreviews = [1, 2, 3].map((offset) => {
    const index = (currentIndex + offset) % heroSections.length;
    return { slide: heroSections[index], index };
  });

  return (
    <section
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-full bg-white text-[#1f1f1f] pt-20 sm:pt-16 md:pt-20 pb-8 sm:pb-12 md:pb-16 px-4 sm:px-8 md:px-12 lg:px-16 overflow-hidden antialiased selection:bg-[#00ff00] selection:text-black [content-visibility:auto] [contain:style_layout]"
      style={{
        fontFamily: '"Google Sans", Roboto, Arial, sans-serif',
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-6 sm:gap-10">

        {/* Top Centered Headline */}
        <div className="w-full text-center pb-2">
          <h1
            className="inline text-center [text-wrap:pretty] [overflow-wrap:break-word] antialiased"
            style={{
              fontSize: "48px",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "56px",
              letterSpacing: "-1px",
              color: "#1f1f1f",
              textRendering: "optimizeLegibility",
              WebkitFontSmoothing: "antialiased",
            }}
          >
            Yala Wildlife
          </h1>
          <p className="text-[18px] text-[#5f6368] font-semibold line-clamp-3 leading-relaxed w-full max-w-4xl mx-auto mt-2">
            Experience Sri Lanka&apos;s premier national park with guaranteed leopard sightings, verified tracker intelligence, and custom luxury 4x4 game drives.
          </p>
        </div>

        {/* Top Cards Showcase: Large Main Card + Vertical Pill Thumbnails */}
        <div className="flex items-stretch gap-2.5 sm:gap-4 md:gap-6 w-full h-[260px] xs:h-[300px] sm:h-[380px] md:h-[430px] lg:h-[480px]">

          {/* Main Card: Isolated compositor layer prevents re-rendering parent layout tree */}
          <div className="relative w-[48%] xs:w-[50%] sm:w-[52%] md:w-[54%] h-full rounded-[22px] sm:rounded-[36px] md:rounded-[44px] overflow-hidden bg-[#f1f3f4] shrink-0 transform-gpu [backface-visibility:hidden] [contain:paint_layout]">
            {currentSlide.imageUrl ? (
              <Image
                src={currentSlide.imageUrl}
                alt={currentSlide.title}
                fill
                priority={currentIndex === 0}
                className="object-cover object-center transition-transform duration-500 ease-out sm:group-hover:scale-105 will-change-transform"
                sizes="(max-width: 640px) 48vw, (max-width: 1024px) 52vw, 680px"
                quality={68}
              />
            ) : (
              <div className="w-full h-full bg-[#f1f3f4] flex items-center justify-center text-[#5f6368] text-[18px] font-medium">
                No Preview Available
              </div>
            )}

            {/* Gradient overlay for contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10 opacity-75 group-hover:opacity-85 transition-opacity pointer-events-none" />

            {/* Pill Action Button */}
            <div className="absolute bottom-3 left-3 sm:bottom-6 sm:left-6 md:bottom-8 md:left-8 z-10">
              <Link
                href="/safari-packages"
                className="inline-flex items-center gap-2 bg-white text-[#1f1f1f] hover:bg-[#f8f9fa] px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium text-[16px] sm:text-[18px] tracking-normal shadow-md hover:shadow-lg active:scale-95 transition-all duration-200"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#00ff00]" />
                <span className="font-medium">Book Now</span>
              </Link>
            </div>
          </div>

          {/* Vertical Pill Thumbnails */}
          {/* <div className="flex-1 flex items-stretch gap-2 sm:gap-3.5 md:gap-5 h-full min-w-0">
            {upcomingPreviews.map(({ slide: previewSlide, index }, i) => (
              <button
                key={previewSlide.id || index}
                onClick={() => setCurrentIndex(index)}
                className={`relative flex-1 h-full rounded-full overflow-hidden bg-[#f1f3f4] border border-[#e0e2e5] transition-all duration-200 hover:scale-[1.02] active:scale-95 cursor-pointer shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1a73e8] transform-gpu [backface-visibility:hidden] [contain:paint_layout]
                  ${i === 2 ? "hidden sm:block" : ""}
                  ${i === 1 ? "hidden xs:block" : ""}
                `}
                aria-label={`Select ${previewSlide.title}`}
              >
                {previewSlide.imageUrl ? (
                  <Image
                    src={previewSlide.imageUrl}
                    alt={previewSlide.title}
                    fill
                    loading="lazy"
                    className="object-cover object-center"
                    sizes="(max-width: 640px) 20vw, (max-width: 1024px) 15vw, 160px"
                    quality={55}
                  />
                ) : (
                  <div className="w-full h-full bg-[#f1f3f4]" />
                )}
                <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors pointer-events-none" />
              </button>
            ))}
          </div> */}

          {/* Vertical Pill Thumbnails */}
          <div className="flex-1 flex items-stretch gap-2 sm:gap-3.5 md:gap-5 h-full min-w-0">
            {upcomingPreviews.map(({ slide: previewSlide, index }, i) => (
              <button
                key={previewSlide.id || index}
                onClick={() => setCurrentIndex(index)}
                className={`relative flex-1 h-full rounded-full overflow-hidden bg-[#f1f3f4] transition-transform duration-200 hover:scale-[1.02] active:scale-95 cursor-pointer  focus:outline-none focus:ring-2 focus:ring-[#1a73e8]
        ${i === 2 ? "hidden sm:block" : ""}
        ${i === 1 ? "hidden xs:block" : ""}
      `}
                aria-label={`Select ${previewSlide.title}`}
              >
                {previewSlide.imageUrl ? (
                  <Image
                    src={previewSlide.imageUrl}
                    alt={previewSlide.title}
                    fill
                    className="object-cover object-center"
                    // Increased size allocation to account for tall aspect ratios on 2x/3x Retina screens
                    sizes="(max-width: 640px) 35vw, (max-width: 1024px) 25vw, 320px"
                    // Boosted quality from 55 to 85 to remove compression blur
                    quality={85}
                  />
                ) : (
                  <div className="w-full h-full bg-[#f1f3f4]" />
                )}
                {/* Optional subtle hover highlight without permanent dulling tint */}
                <div className="absolute inset-0 bg-transparent hover:bg-white/10 transition-colors pointer-events-none" />
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Details & Navigation Row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 pt-1 sm:pt-2">

          {/* Slide Title and Description */}
          <div className="max-w-3xl space-y-2 [contain:content]">
            <h2 className="text-[24px] sm:text-[32px] md:text-[38px] lg:text-[42px] font-medium tracking-tight text-[#1f1f1f] leading-snug line-clamp-2">
              {currentSlide.title}
            </h2>
            {currentSlide.subtitle && (
              <p className="text-[18px] text-[#5f6368] font-semibold line-clamp-2 leading-relaxed">
                {currentSlide.subtitle}
              </p>
            )}
          </div>

          {/* Prev / Next Circular Navigation Buttons */}
          <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
            <button
              onClick={handlePrev}
              aria-label="Previous Slide"
              className="w-12 h-12 sm:w-13 sm:h-13 p-3.5 rounded-full bg-[#f1f3f4] hover:bg-[#e8eaed] text-[#444746] hover:text-[#1f1f1f] active:scale-90 transition-transform duration-150 shadow-none border border-transparent cursor-pointer flex items-center justify-center transform-gpu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.2}
                stroke="currentColor"
                className="w-5 h-5 pointer-events-none"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            </button>

            <button
              onClick={handleNext}
              aria-label="Next Slide"
              className="w-12 h-12 sm:w-13 sm:h-13 p-3.5 rounded-full bg-[#f1f3f4] hover:bg-[#e8eaed] text-[#444746] hover:text-[#1f1f1f] active:scale-90 transition-transform duration-150 shadow-none border border-transparent cursor-pointer flex items-center justify-center transform-gpu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.2}
                stroke="currentColor"
                className="w-5 h-5 pointer-events-none"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}