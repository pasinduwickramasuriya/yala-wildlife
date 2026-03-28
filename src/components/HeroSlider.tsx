"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

interface HeroSection {
  id: string;
  imageUrl: string;
  title: string;
  subtitle: string;
}

export default function HeroSlider() {
  const [heroSections, setHeroSections] = useState<HeroSection[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // --- Data Fetching ---
  const fetchHeroSections = useCallback(async () => {
    try {
      const res = await fetch("/api/hero", {
        next: { revalidate: 60 } // Removed cache: 'no-store' to allow CDN/Server caching for instant load
      });
      if (!res.ok) throw new Error(`Failed to fetch`);
      const data = await res.json();

      if (Array.isArray(data) && data.length > 0) {
        setHeroSections(prev => {
          // Only update if data changed to prevent re-renders
          if (JSON.stringify(prev) !== JSON.stringify(data)) return data;
          return prev;
        });
        // PERFORMANCE FIX: Only reset slide if it's the first load
        if (heroSections.length === 0) setCurrentSlide(0);
      } else {
        setError("No data found");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("System Offline");
    } finally {
      setLoading(false);
    }
  }, [heroSections.length]);

  useEffect(() => {
    setMounted(true);
    fetchHeroSections();
    // Reduce fetch frequency to save bandwidth/performance
    const interval = setInterval(fetchHeroSections, 60000);
    return () => clearInterval(interval);
  }, [fetchHeroSections]);

  // --- Auto Slider Logic ---
  useEffect(() => {
    if (heroSections.length <= 1 || !mounted) return;
    
    // Using setTimeout and dependency on currentSlide ensures 
    // the timer resets flawlessly on auto-slides or manual clicks, 
    // and prevents background-tab interval throttling bugs.
    const timeout = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSections.length);
    }, 7000);
    
    return () => clearTimeout(timeout);
  }, [heroSections.length, mounted, currentSlide]);

  // --- Loading State ---
  if (!mounted || loading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center gap-4 p-4">
        <div className="w-12 h-12 border-4 border-lime-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // --- Error State ---
  if (error || heroSections.length === 0) {
    return (
      <div className="min-h-screen w-full bg-black flex items-center justify-center text-white p-4">
        <p className="text-xs font-mono tracking-widest text-lime-500 border border-lime-500/30 px-6 py-3 rounded-full">
          NO SIGNAL
        </p>
      </div>
    );
  }

  // --- Data Setup ---
  const section = heroSections[currentSlide];
  const nextSlideIndex = (currentSlide + 1) % heroSections.length;
  const nextNextSlideIndex = (currentSlide + 2) % heroSections.length;

  // PERFORMANCE: Calculate next image for preloading
  const nextImageToPreload = heroSections[nextSlideIndex]?.imageUrl;

  const card1Data = heroSections[nextSlideIndex];
  const card2Data = heroSections[nextNextSlideIndex];

  const titleWords = section.title ? section.title.split(" ") : ["YALA", "WILDLIFE"];
  const firstWord = titleWords[0];
  const restTitleWords = titleWords.slice(1).join(" ");

  return (
    <div className="relative w-full min-h-screen overflow-hidden font-sans bg-black selection:bg-lime-400 selection:text-black">

      {/* 0. PERFORMANCE HACK: <link rel="preload"> (Instead of rendering hidden images)
          Let the browser handle native preloading of the next hero image.
      */}
      {nextImageToPreload && (
        <link rel="preload" as="image" href={nextImageToPreload} />
      )}

      {/* 1. BACKGROUND IMAGE - GPU OPTIMIZED */}
      <div className="absolute inset-0 w-full h-full bg-black z-0">
        {heroSections.map((slide, idx) => {
          const isActive = idx === currentSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full bg-black transition-opacity duration-1000 ease-in-out ${isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'}`}
            >
              <div className="w-full h-full relative">
                <Image
                  src={slide.imageUrl}
                  alt={slide.title}
                  fill
                  priority={isActive || idx === 0} // Preload active/first frames
                  unoptimized // Crucial: Bypasses Next.js image optimization delay (fixes black flashes)
                  className="object-cover object-center brightness-[0.85]"
                  style={{ objectFit: 'cover' }}
                  sizes="100vw"
                  quality={60} // Reduced for better low-end device performance
                />
              </div>

              {/* Static Overlays (Faster than animating divs) */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            </div>
          );
        })}
      </div>

      {/* 2. MAIN CONTENT */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 md:px-12 h-full flex flex-col justify-center min-h-screen py-12 sm:py-20">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full h-full">
          {/* LEFT COLUMN: Text Content */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 relative flex flex-col items-center lg:items-start w-full text-center lg:text-left transition-all duration-700 fade-in">

            {/* Counter */}
            <div className="inline-flex items-center gap-3 px-2 py-1 drop-shadow-xl">
              <span className="text-lime-400 font-mono text-sm md:text-[10px] font-bold drop-shadow-[0_0_10px_rgba(163,230,53,1)]">
                0{currentSlide + 1}
              </span>
              <div className="w-8 h-[2px] bg-lime-400/80 shadow-[0_0_8px_rgba(163,230,53,0.8)]"></div>
              <span className="text-white font-mono text-sm md:text-[10px] drop-shadow-md">
                0{heroSections.length}
              </span>
            </div>

            {/* Main Title */}
            <div className="relative w-full">
              <div className="inline-block">
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl leading-[0.9] tracking-tight uppercase drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
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

            {/* Subtitle & CTA */}
            <div className="flex flex-col gap-6 items-center lg:flex-row lg:items-center pt-2">
              <div className="hidden md:block max-w-md p-2 border-l-0 lg:border-l-4 border-lime-500 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                <p className="text-lg md:text-xl text-white font-medium leading-relaxed tracking-wide">
                  {section.subtitle}
                </p>
              </div>

              <div className="flex-shrink-0 hover:scale-105 active:scale-95 transition-transform duration-300">
                <Link href="/safari-packages" className="group block relative">
                  <div className="absolute inset-0 bg-lime-500 blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500 rounded-full"></div>
                  <div className="relative bg-lime-500 text-black px-8 py-4 lg:px-8 lg:py-4 shadow-xl hover:bg-white hover:text-black transition-all rounded-full flex items-center gap-3">
                    <span className="text-sm font-bold uppercase tracking-[0.2em]">Book Now</span>
                    <div className="bg-black text-white rounded-full p-1 group-hover:bg-lime-500 group-hover:text-black transition-colors">
                      <ArrowRight className="w-3 h-3 group-hover:rotate-45 transition-transform duration-300" />
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Location Pin */}
            <div className="pt-4 w-full flex justify-center lg:justify-start">
              <div className="inline-flex items-center gap-3 px-2 py-1 drop-shadow-[0_4px_6px_rgba(0,0,0,0.9)]">
                <div className="w-8 h-8 flex items-center justify-center bg-lime-500/20 border border-lime-500 rounded-full shadow-[0_0_15px_#84cc16]">
                  <MapPin className="w-4 h-4 text-lime-400" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-lime-300 font-mono text-[10px] font-bold uppercase tracking-widest leading-none drop-shadow-md">
                    Yala National Park
                  </span>
                  <span className="text-white text-[9px] font-mono uppercase tracking-wider leading-tight mt-0.5 font-bold">
                    Southern Province • Sri Lanka
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (Hidden on Mobile) */}
          <div className="hidden lg:flex lg:col-span-5 flex-col sm:flex-row gap-6 justify-center lg:justify-end mt-12 lg:mt-0 items-center perspective-1000">
            {/* Next Card */}
            <div
              onClick={() => setCurrentSlide(nextSlideIndex)}
              className="group relative w-64 h-96 flex-shrink-0 cursor-pointer"
            >
              <div className="w-full h-full relative rounded-[3rem] overflow-hidden shadow-2xl bg-neutral-900 transition-transform duration-300 hover:-translate-y-2">
                <Image
                  key={card1Data.imageUrl}
                  src={card1Data.imageUrl}
                  alt={card1Data.title}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="25vw"
                  quality={50}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

                <div className="absolute top-4 right-4">
                  <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-bold text-lime-400 uppercase tracking-widest shadow-lg">
                    Next
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-6">
                  <div className="drop-shadow-lg">
                    <h3 className="text-white text-lg font-black uppercase tracking-tight leading-none mb-1 group-hover:text-lime-400 transition-colors drop-shadow-md">
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
              className="group relative w-48 h-72 flex-shrink-0 cursor-pointer opacity-100 hover:opacity-100 transition-all duration-500 hidden xl:block"
            >
              <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden transition-all shadow-xl">
                <Image
                  key={card2Data.imageUrl}
                  src={card2Data.imageUrl}
                  alt={card2Data.title}
                  fill
                  unoptimized
                  className="object-cover"
                  sizes="20vw"
                  quality={40}
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors" />

                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-black/60 backdrop-blur-sm p-3 rounded-lg">
                    <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest">Up Next</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1.5 bg-white/10 z-30 flex pointer-events-none">
        {heroSections.map((_, idx) => (
          <div key={idx} className="flex-1 h-full border-r border-black/20 relative bg-black/20 backdrop-blur-sm">
            {idx === currentSlide && (
              <div 
                className="h-full bg-lime-500 shadow-[0_0_15px_#84cc16] w-full origin-left" 
                style={{ animation: "hero-progress 7s linear" }}
              />
            )}
          </div>
        ))}
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
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