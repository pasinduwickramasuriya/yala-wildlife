"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

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

  // Fetch hero sections from /api/hero
  useEffect(() => {
    const fetchHeroSections = async () => {
      try {
        const res = await fetch("/api/hero");
        if (!res.ok) {
          throw new Error(`Failed to fetch hero sections: ${res.statusText}`);
        }
        const data = await res.json();
        setHeroSections(data);
      } catch (err) {
        const errorMsg =
          err instanceof Error ? err.message : "An error occurred";
        setError(errorMsg);
        console.error("Fetch hero sections error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroSections();
  }, []);

  // Auto-sliding effect
  useEffect(() => {
    if (heroSections.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSections.length);
    }, 4000); // 4 seconds interval

    return () => clearInterval(interval);
  }, [heroSections.length]);

  // Navigation functions
  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSections.length) % heroSections.length
    );
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSections.length);
  };

  // Loading state
  if (loading) {
    return (
      <div className="h-[600px] w-full bg-muted flex items-center justify-center">
        <p className="text-muted-foreground">Loading hero sections...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="h-[600px] w-full bg-muted flex items-center justify-center">
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  // Empty state
  if (heroSections.length === 0) {
    return (
      <div className="h-[600px] w-full bg-muted flex items-center justify-center">
        <p className="text-muted-foreground">No hero sections available</p>
      </div>
    );
  }

  return (
    <>
      <div className="relative w-full">
        {/* Slider Container */}
        <div className="relative h-[600px] w-full overflow-hidden">
          {heroSections.map((hs, index) => (
            <div
              key={hs.id}
              className="absolute h-full w-full transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(${(index - currentSlide) * 100}%)`,
              }}
            >
              <Image
                src={hs.imageUrl}
                alt={hs.title}
                fill
                className="object-cover"
                loading="lazy"
                onError={(e) => (e.currentTarget.src = "/fallback-image.jpg")}
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="container mx-auto px-4 text-center text-white">
                  {/* <h2 className="mb-5 text-xl font-bold tracking-tight md:text-2xl">
                    {hs.title}
                  </h2> */}
                  <h2 className="mb-5 text-xl font-bold tracking-tight md:text-2xl text-green-400">
                {/* Changed: Set font color to dark mode green (text-green-400), no light mode variant */}
                {hs.title}
              </h2>
                  <p className="mb-8 text-lg md:text-xl">{hs.subtitle}</p>
                  <Link
                    href="/safari-packages"
                    className="inline-block rounded-full bg-transparent px-8 py-3 font-semibold text-white transition-colors hover:bg-black/70"
                  >
                    Explore Packages
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows (hidden if only one slide) */}
        {heroSections.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/25 p-2 hover:bg-white transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6 text-gray-800" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/25 p-2 hover:bg-white transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6 text-gray-800" />
            </button>
          </>
        )}

        {/* Dots (hidden if only one slide) */}
        {heroSections.length > 1 && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {heroSections.map((_, index) => (
              <button
                key={heroSections[index].id}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 w-2 rounded-full transition-colors ${
                  index === currentSlide
                    ? "bg-white"
                    : "bg-white/50 hover:bg-white/75"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
