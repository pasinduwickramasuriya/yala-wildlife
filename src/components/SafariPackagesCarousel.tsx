"use client";

import { useState, useEffect, useCallback, useRef, memo } from "react";
import PackageCard from "@/components/PackageCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Package {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  price?: number | null;
  imageUrl?: string | null;
}

interface SafariPackagesCarouselProps {
  packages: Package[];
}

// Memoized individual slide item for 60fps rendering performance
const CarouselSlideItem = memo(function CarouselSlideItem({
  pkg,
  visibleCount,
  isPriority,
}: {
  pkg: Package;
  visibleCount: number;
  isPriority: boolean;
}) {
  return (
    <div
      className="flex-shrink-0 px-1.5 sm:px-2 [contain:layout_style]"
      style={{ width: `${100 / visibleCount}%` }}
    >
      <div className="h-full flex justify-center transform scale-[0.92] sm:scale-95 transition-transform duration-300 hover:scale-[0.98]">
        <PackageCard pkg={pkg} slug={pkg.slug} isPriority={isPriority} />
      </div>
    </div>
  );
});

export default function SafariPackagesCarousel({ packages = [] }: SafariPackagesCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Debounced responsive count updater to prevent layout thrashing on low-end devices
  const updateVisibleCount = useCallback(() => {
    if (typeof window === "undefined") return;
    const width = window.innerWidth;
    if (width < 640) {
      setVisibleCount(1);
    } else if (width < 1024) {
      setVisibleCount(2);
    } else {
      setVisibleCount(3);
    }
  }, []);

  useEffect(() => {
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateVisibleCount, 100);
    };

    updateVisibleCount();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
    };
  }, [updateVisibleCount]);

  const maxIndex = Math.max(0, packages.length - visibleCount);

  // Keep index valid when viewport changes
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [currentIndex, maxIndex]);

  // High-performance Auto-slide (4s interval, pauses on hover)
  useEffect(() => {
    if (packages.length <= visibleCount || isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(timer);
  }, [packages.length, visibleCount, maxIndex, isPaused]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Ultra-fast Passive Touch Handlers
  const minSwipeDistance = 40;

  const onTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }
  };

  if (!packages || packages.length === 0) {
    return (
      <div className="flex justify-center items-center py-6">
        <div className="bg-black/80 px-6 py-3 rounded-full border border-white/5 shadow-2xl">
          <p className="text-white/60 text-[11px] font-medium italic">No safari packages available.</p>
        </div>
      </div>
    );
  }

  const totalDots = maxIndex + 1;

  return (
    <div 
      className="relative w-full py-2 select-none group/carousel max-w-6xl mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* --- MAIN CAROUSEL ROW: LEFT ARROW + CAROUSEL TRACK + RIGHT ARROW --- */}
      <div className="relative flex items-center justify-between w-full">
        
        {/* Left Arrow Button */}
        {packages.length > visibleCount && (
          <button
            onClick={handlePrev}
            aria-label="Previous Slide"
            className="absolute -left-1 sm:-left-4 lg:-left-6 z-40 flex items-center justify-center w-14 h-14 sm:w-14 sm:h-14 md:w-15 md:h-15 rounded-full bg-black/90 border-2 border-black text-white hover:text-black hover:bg-[#00ff00] transition-all duration-300 shadow-2xl active:scale-95 hover:scale-110 backdrop-blur-md cursor-pointer hover:shadow-[0_0_25px_rgba(0,255,0,0.7)]"
          >
            <ChevronLeft className="w-8 h-8 sm:w-8 sm:h-8 -translate-x-0.5 stroke-[3.5]" />
          </button>
        )}

        {/* Carousel Track Window (GPU Accelerated & Containment Protected) */}
        <div 
          className="overflow-hidden w-full rounded-[2rem] py-1 px-1 touch-pan-y [contain:layout_paint_style]"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform transform-gpu"
            style={{
              transform: `translate3d(-${currentIndex * (100 / visibleCount)}%, 0, 0)`,
            }}
          >
            {packages.map((pkg, idx) => (
              <CarouselSlideItem
                key={pkg.id}
                pkg={pkg}
                visibleCount={visibleCount}
                isPriority={idx < visibleCount}
              />
            ))}
          </div>
        </div>

        {/* Right Arrow Button */}
        {packages.length > visibleCount && (
          <button
            onClick={handleNext}
            aria-label="Next Slide"
            className="absolute -right-1 sm:-right-4 lg:-right-6 z-40 flex items-center justify-center w-14 h-14 sm:w-14 sm:h-14 md:w-15 md:h-15 rounded-full bg-black/90 border-2 border-black text-white hover:text-black hover:bg-[#00ff00] transition-all duration-300 shadow-2xl active:scale-95 hover:scale-110 backdrop-blur-md cursor-pointer hover:shadow-[0_0_25px_rgba(0,255,0,0.7)]"
          >
            <ChevronRight className="w-8 h-8 sm:w-8 sm:h-8 translate-x-0.5 stroke-[3.5]" />
          </button>
        )}
      </div>

      {/* --- CUTEST PETITE DOTS INDICATOR --- */}
      {packages.length > visibleCount && (
        <div className="flex justify-center items-center mt-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-black/90 border-2 border-black rounded-full shadow-xl backdrop-blur-md">
            {Array.from({ length: totalDots }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  currentIndex === idx
                    ? "w-6 h-2 bg-[#00ff00] shadow-[0_0_8px_#00ff00]"
                    : "w-2 h-2 bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
