"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useThermalOptimization } from "@/hooks/useThermalOptimization";

interface HeroSection {
  id: string;
  imageUrl: string;
  title: string;
  subtitle: string;
}

const DEFAULT_HERO_SECTIONS: HeroSection[] = [
  {
    id: "default-1",
    title: "YALA WILDLIFE SAFARI",
    subtitle: "Experience Sri Lanka's premier national park with guaranteed leopard sightings and luxury 4x4 jeeps.",
    imageUrl: "/uploads/yala1.webp",
  },
  {
    id: "default-2",
    title: "WILD ELEPHANT HERDS",
    subtitle: "Watch majestic Asian elephants gathering along the scenic Menik River bank at dusk.",
    imageUrl: "/uploads/yala2.webp",
  },
  {
    id: "default-3",
    title: "EXPERT SAFARI GUIDES",
    subtitle: "Custom tailored wildlife game drives led by top naturalist trackers in Yala Block 1.",
    imageUrl: "https://images.unsplash.com/photo-1547970810-dc92b3848368?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function HeroSlider({ initialHeroSections = [] }: { initialHeroSections?: HeroSection[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { shouldAnimate } = useThermalOptimization(containerRef);

  const [heroSections] = useState<HeroSection[]>(
    initialHeroSections.length > 0 ? initialHeroSections : DEFAULT_HERO_SECTIONS
  );
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const onUserInteract = () => setHasInteracted(true);
    window.addEventListener("scroll", onUserInteract, { passive: true, once: true });
    window.addEventListener("touchstart", onUserInteract, { passive: true, once: true });
    window.addEventListener("pointerdown", onUserInteract, { passive: true, once: true });

    return () => {
      window.removeEventListener("scroll", onUserInteract);
      window.removeEventListener("touchstart", onUserInteract);
      window.removeEventListener("pointerdown", onUserInteract);
    };
  }, []);

  // --- Auto Slider Logic ---
  useEffect(() => {
    if (!hasInteracted || heroSections.length <= 1 || !mounted || !shouldAnimate) return;

    const timeout = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSections.length);
    }, 6000);

    return () => clearTimeout(timeout);
  }, [heroSections.length, mounted, currentSlide, shouldAnimate, hasInteracted]);

  // --- Data Setup ---
  const section = heroSections[currentSlide] || DEFAULT_HERO_SECTIONS[0];
  const nextSlideIndex = (currentSlide + 1) % heroSections.length;
  const nextNextSlideIndex = (currentSlide + 2) % heroSections.length;

  const card1Data = heroSections[nextSlideIndex] || DEFAULT_HERO_SECTIONS[1] || section;
  const card2Data = heroSections[nextNextSlideIndex] || DEFAULT_HERO_SECTIONS[2] || section;

  const titleWords = section.title ? section.title.split(" ") : ["YALA", "WILDLIFE"];
  const firstWord = titleWords[0];
  const restTitleWords = titleWords.slice(1).join(" ");

  const getOptUrl = useCallback((url: string) => {
    if (url && url.includes("res.cloudinary.com") && url.includes("/upload/") && !url.includes("f_auto")) {
      return url.replace("/upload/", "/upload/f_auto,q_auto,w_1200/");
    }
    return url;
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[100svh] min-h-[500px] overflow-hidden font-sans bg-black selection:bg-lime-400 selection:text-black [contain:paint]"
    >
      {/* 1. BACKGROUND IMAGE - FULL SCREEN GPU OPTIMIZED */}
      <div className="absolute inset-0 w-full h-full bg-black z-0 [contain:strict]">
        {heroSections.map((slide, idx) => {
          const isActive = idx === currentSlide;
          const isNext = idx === nextSlideIndex;
          if (!isActive && (!mounted || !isNext)) return null;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full bg-black transition-opacity duration-1000 ease-in-out transform-gpu [backface-visibility:hidden] ${isActive ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"
                }`}
            >
              <div className="w-full h-full relative">
                <Image
                  src={getOptUrl(slide.imageUrl)}
                  alt={slide.title}
                  fill
                  priority={idx === 0}
                  loading={idx === 0 ? "eager" : "lazy"}
                  fetchPriority={idx === 0 ? "high" : "low"}
                  decoding="async"
                  className="object-cover object-center brightness-[0.85]"
                  style={{ objectFit: "cover" }}
                  sizes="100vw"
                  quality={idx === 0 ? 60 : 50}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* 2. MAIN CONTENT - FULL SCREEN MOBILE LAYOUT, CENTERED CONTENT & NO MOBILE SUBTITLE */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 md:px-12 h-full flex flex-col justify-center items-center text-center lg:items-start lg:text-left min-h-[100svh] py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">

          {/* LEFT COLUMN: Text Content (Centered on Mobile, Left-aligned on Desktop) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 relative flex flex-col items-center lg:items-start w-full transition-all duration-700 fade-in transform-gpu">

            {/* Main Title */}
            <div className="relative w-full">
              <div className="inline-block">
                <h1 className="text-5xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl leading-[0.9] tracking-tight drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
                  {/* Part 1: White Text */}
                  <div className="block font-fredoka text-white pb-2">
                    {firstWord}
                  </div>

                  {/* Part 2: Gradient Text */}
                  <div className="block font-poppins text-transparent bg-clip-text bg-gradient-to-r from-lime-300 to-lime-500 pb-2">
                    {restTitleWords}
                  </div>
                </h1>
              </div>
            </div>

            {/* Subtitle (Hidden on Mobile) & Centered Book Now Button */}
            <div className="flex flex-col gap-6 items-center lg:flex-row lg:items-center pt-2 w-full">
              <div className="hidden md:block max-w-md p-2 border-l-0 lg:border-l-4 border-lime-500 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] text-left">
                <p className="text-lg md:text-xl text-white font-medium leading-relaxed tracking-wide">
                  {section.subtitle}
                </p>
              </div>

              <div className="flex-shrink-0 hover:scale-105 active:scale-95 transition-transform duration-300 transform-gpu mx-auto lg:mx-0">
                <Link href="/safari-packages" className="group block relative">
                  <div className="absolute inset-0 bg-lime-500 opacity-60 group-hover:opacity-80 transition-opacity duration-500 rounded-full"></div>
                  <div className="relative bg-lime-500 text-black px-8 py-4 lg:px-8 lg:py-4 shadow-xl hover:bg-white hover:text-black transition-all rounded-full flex items-center gap-3">
                    <span className="text-sm font-bold uppercase tracking-[0.2em]">Book Now</span>
                    <div className="bg-black text-white rounded-full p-1 group-hover:bg-lime-500 group-hover:text-black transition-colors">
                      <ArrowRight className="w-3 h-3 group-hover:rotate-45 transition-transform duration-300" />
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (Hidden on Mobile) */}
          <div className="hidden lg:flex lg:col-span-5 flex-col sm:flex-row gap-6 justify-center lg:justify-end items-center perspective-1000">
            {/* Next Card */}
            <div
              onClick={() => setCurrentSlide(nextSlideIndex)}
              className="group relative w-64 h-96 flex-shrink-0 cursor-pointer transform-gpu [contain:layout_paint]"
            >
              <div className="w-full h-full relative rounded-[3rem] overflow-hidden shadow-2xl bg-neutral-900 transition-transform duration-300 hover:-translate-y-2">
                <Image
                  key={card1Data.imageUrl}
                  src={getOptUrl(card1Data.imageUrl)}
                  alt={card1Data.title}
                  fill
                  loading="lazy"
                  decoding="async"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="25vw"
                  quality={50}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

                <div className="absolute bottom-0 left-0 w-full p-6">
                  <div className="drop-shadow-lg">
                    <h3 className="text-white text-lg font-black tracking-tight leading-none mb-1 group-hover:text-lime-400 transition-colors drop-shadow-md">
                      {card1Data.title}
                    </h3>
                    <div className="h-1 w-8 bg-lime-500 rounded-full mt-2 shadow-[0_0_10px_#84cc16]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Incoming Card */}
            <div
              onClick={() => setCurrentSlide(nextNextSlideIndex)}
              className="group relative w-48 h-72 flex-shrink-0 cursor-pointer opacity-100 hover:opacity-100 transition-all duration-500 hidden xl:block transform-gpu [contain:layout_paint]"
            >
              <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden transition-all shadow-xl">
                <Image
                  key={card2Data.imageUrl}
                  src={getOptUrl(card2Data.imageUrl)}
                  alt={card2Data.title}
                  fill
                  loading="lazy"
                  decoding="async"
                  className="object-cover"
                  sizes="20vw"
                  quality={40}
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1.5 bg-white/10 z-30 flex pointer-events-none">
        {heroSections.map((_, idx) => (
          <div key={idx} className="flex-1 h-full border-r border-black/20 relative bg-black/20">
            {idx === currentSlide && (
              <div
                className="h-full bg-lime-500 shadow-[0_0_15px_#84cc16] w-full origin-left transform-gpu will-change-transform"
                style={{ animation: "hero-progress 7s linear" }}
              />
            )}
          </div>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes hero-progress {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .fade-in {
          animation: fade-in 1s ease-out forwards;
        }
      `}} />
    </div>
  );
}