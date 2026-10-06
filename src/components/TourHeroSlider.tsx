"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { Tour } from "./TourPackageCard";
import { useThermalOptimization } from "@/hooks/useThermalOptimization";

interface TourHeroSliderProps {
    tourPackages: Tour[];
}

const FALLBACK_IMAGE =
    "https://res.cloudinary.com/dkfnpmzpv/image/upload/v1771401761/hero_sections/dcjjvovjfbgidkiydjgw.jpg";

export function TourHeroSlider({ tourPackages }: TourHeroSliderProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { shouldAnimate } = useThermalOptimization(containerRef);

    const [activeIndex, setActiveIndex] = useState(0);

    const totalTours = tourPackages?.length || 0;
    const activeTour = tourPackages?.[activeIndex] || tourPackages?.[0];

    const handleSelectSlide = useCallback((idx: number) => {
        setActiveIndex(idx);
    }, []);

    // Battery & CPU Protection: Auto-pause slider on background tab or when thermal mode kicks in
    useEffect(() => {
        if (totalTours <= 1 || !shouldAnimate) return;

        let interval: NodeJS.Timeout | null = null;

        const startTimer = () => {
            if (document.hidden) return;
            interval = setInterval(() => {
                setActiveIndex((prev) => (prev + 1) % totalTours);
            }, 7000);
        };

        const handleVisibilityChange = () => {
            if (interval) clearInterval(interval);
            if (!document.hidden) startTimer();
        };

        startTimer();
        document.addEventListener("visibilitychange", handleVisibilityChange, { passive: true });

        return () => {
            if (interval) clearInterval(interval);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [totalTours, shouldAnimate]);

    if (!activeTour) return null;

    const durationText = activeTour.duration || "Custom Tour";
    const nextSlideIndex = (activeIndex + 1) % totalTours;
    const card1Data = tourPackages[nextSlideIndex];

    const titleWords = activeTour.title ? activeTour.title.split(" ") : ["ISLAND", "EXPEDITION"];
    const firstWord = titleWords[0];
    const restTitleWords = titleWords.slice(1).join(" ");

    return (
        <div
            ref={containerRef}
            className="relative w-full bg-white text-[#1f1f1f] selection:bg-[#00ff00] selection:text-black py-4 sm:py-6 [contain:paint]"
            style={{
                fontFamily:
                    '"Google Sans", "Open Sans", Roboto, -apple-system, BlinkMacSystemFont, Arial, sans-serif',
            }}
        >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center w-full">

                {/* LEFT COLUMN: Hardware-isolated Text Layout */}
                <div className="lg:col-span-7 space-y-4 flex flex-col items-center lg:items-start text-center lg:text-left [contain:layout_paint]">

                    {/* Step Counter Tag */}
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f8f9fa] text-[13px] font-semibold text-[#5f6368] select-none">
                        <span className="text-[#137333] font-bold">
                            {String(activeIndex + 1).padStart(2, "0")}
                        </span>
                        <span>/</span>
                        <span>{String(totalTours).padStart(2, "0")}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#137333] ml-1" />
                        <span>Curated Route</span>
                    </div>

                    {/* Main Headline */}
                    <h1 className="text-3xl sm:text-4xl md:text-4xl font-bold tracking-tight text-[#1f1f1f] leading-[1.15] break-words">
                        <span>{firstWord}</span>{" "}
                        <span className="text-[#1f1f1f]">{restTitleWords}</span>
                    </h1>

                    {/* Description Paragraph */}
                    <p className="text-[16px] sm:text-[18px] text-[#3c4043] font-semibold leading-[1.7] max-w-xl break-words">
                        {activeTour.description}
                    </p>

                    {/* Route & Price Meta Pill */}
                    {activeTour.route && (
                        <div className="inline-flex items-center gap-3 bg-[#f8f9fa] px-4 py-2.5 rounded-2xl text-[14px] font-semibold text-[#1f1f1f] select-none">
                            <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center shrink-0">
                                <MapPin className="w-4 h-4 text-[#137333]" />
                            </div>
                            <div className="flex flex-col text-left">
                                <span className="font-bold text-[#1f1f1f]">
                                    {activeTour.route}
                                </span>
                                <span className="text-[12px] text-[#5f6368]">
                                    {durationText} • Starting from ${activeTour.price} USD
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Action CTA & Navigation Dots */}
                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                        <Link
                            href="/tours"
                            prefetch={false}
                            className="inline-flex items-center gap-2 bg-[#00ff00] hover:brightness-105 active:scale-95 text-black px-6 py-3 rounded-full text-[15px] font-bold transition-colors duration-150 [transform:translateZ(0)]"
                        >
                            <span>Explore Itinerary</span>
                            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                        </Link>

                        {/* Pagination Dots */}
                        <div className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#f8f9fa] select-none">
                            {tourPackages.map((_, idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    onClick={() => handleSelectSlide(idx)}
                                    aria-label={`Jump to expedition ${idx + 1}`}
                                    className={`h-2 rounded-full transition-[width,background-color] duration-200 cursor-pointer ${idx === activeIndex
                                        ? "w-6 bg-[#00ff00]"
                                        : "w-2 bg-[#dadce0] hover:bg-[#bdc1c6]"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: GPU Accelerated & Memory Cached Image Island */}
                <div className="lg:col-span-5 flex items-center justify-center lg:justify-end gap-4 w-full [contain:layout_paint]">

                    {/* Active Visual Surface */}
                    <div className="relative w-full max-w-[340px] aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-[#f8f9fa] [contain:strict] [transform:translateZ(0)] [backface-visibility:hidden]">
                        <Image
                            key={activeTour.id || activeTour.slug || activeIndex}
                            src={activeTour.imageUrl || FALLBACK_IMAGE}
                            alt={activeTour.title}
                            fill
                            priority
                            fetchPriority="high"
                            unoptimized
                            sizes="(max-width: 640px) 90vw, 340px"
                            className="object-cover object-center [will-change:auto]"
                        />
                    </div>

                    {/* Up-Next Compact Preview Card */}
                    {card1Data && (
                        <button
                            type="button"
                            onClick={() => handleSelectSlide(nextSlideIndex)}
                            className="hidden sm:flex flex-col relative w-[130px] md:w-[150px] aspect-[3/4] rounded-[2rem] overflow-hidden bg-[#f8f9fa] shrink-0 text-left transition-transform duration-150 hover:scale-[1.02] active:scale-95 cursor-pointer [contain:strict] [transform:translateZ(0)] [backface-visibility:hidden]"
                            aria-label={`Next expedition: ${card1Data.title}`}
                        >
                            <Image
                                key={card1Data.id || card1Data.slug || nextSlideIndex}
                                src={card1Data.imageUrl || FALLBACK_IMAGE}
                                alt={card1Data.title}
                                fill
                                loading="lazy"
                                unoptimized
                                sizes="150px"
                                className="object-cover object-center"
                            />
                            <div className="absolute inset-0 bg-white/20 hover:bg-transparent transition-colors duration-150" />
                        </button>
                    )}

                </div>

            </div>
        </div>
    );
}