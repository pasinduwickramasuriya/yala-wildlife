"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { Tour } from "./TourPackageCard";

interface TourHeroSliderProps {
    tourPackages: Tour[];
}

export function TourHeroSlider({ tourPackages }: TourHeroSliderProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    const activeTour = tourPackages[activeIndex] || tourPackages[0];

    // Auto Slider Logic (7 seconds)
    useEffect(() => {
        if (tourPackages.length <= 1) return;

        const timeout = setTimeout(() => {
            setActiveIndex((prev) => (prev + 1) % tourPackages.length);
        }, 7000);

        return () => clearTimeout(timeout);
    }, [tourPackages.length, activeIndex]);

    if (!activeTour) return null;

    const durationText = activeTour.duration || "Custom Tour";
    const nextSlideIndex = (activeIndex + 1) % tourPackages.length;
    const nextNextSlideIndex = (activeIndex + 2) % tourPackages.length;

    const card1Data = tourPackages[nextSlideIndex];
    const card2Data = tourPackages[nextNextSlideIndex];

    const titleWords = activeTour.title ? activeTour.title.split(" ") : ["EXPEDITION", "TOUR"];
    const firstWord = titleWords[0];
    const restTitleWords = titleWords.slice(1).join(" ");

    return (
        <div className="relative w-full min-h-[50vh] sm:min-h-[60vh] lg:min-h-[65vh] overflow-hidden font-sans bg-transparent selection:bg-[#00ff00] selection:text-black">

            {/* 2. MAIN CONTENT */}
            <div className="relative z-20 container mx-auto px-4 sm:px-6 md:px-12 h-full flex flex-col justify-center min-h-[50vh] sm:min-h-[60vh] lg:min-h-[65vh] py-8 sm:py-12">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full h-full">

                    {/* LEFT COLUMN: Text Content (With high contrast inline bg-black/80 blocks) */}
                    <div className="lg:col-span-7 space-y-4 relative flex flex-col items-center lg:items-start w-full text-center lg:text-left transition-all duration-700 fade-in z-20">

                        {/* Counter */}
                        <div className="inline-flex items-center gap-3 px-3 py-1.5 bg-black/80 rounded-full shadow-xl">
                            <span className="text-[#00ff00] font-mono text-sm md:text-[10px] font-bold drop-shadow-[0_0_10px_rgba(0,255,0,1)]">
                                0{activeIndex + 1}
                            </span>
                            <div className="w-8 h-[1px] bg-[#00ff00]/80 shadow-[0_0_8px_rgba(0,255,0,0.8)]"></div>
                            <span className="text-white font-mono text-sm md:text-[10px]">
                                0{tourPackages.length}
                            </span>
                        </div>

                        {/* Main Title (Italic, Modern, Smaller and Cuter, with bg-black/80 blocks!) */}
                        <div className="relative w-full space-y-2">
                            <div className="inline-block bg-black/80 px-4 py-2 rounded-xl shadow-xl">
                                <h1 className="text-2xl sm:text-3xl md:text-4xl font-light italic leading-[1.0] tracking-tight text-white">
                                    {firstWord}
                                </h1>
                            </div>
                            <br />
                            <div className="inline-block bg-black/80 px-4 py-2 rounded-xl shadow-xl">
                                <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold italic leading-[1.0] tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#00ff00] to-[#00ff00]">
                                    {restTitleWords}
                                </h1>
                            </div>
                        </div>

                        {/* Subtitle & CTA (With bg-black/80 block!) */}
                        <div className="flex flex-col gap-5 items-center lg:flex-row lg:items-center pt-1 w-full lg:w-auto">
                            <div className="hidden md:inline-block max-w-md p-3 bg-black/80 rounded-xl border-l-2 border-[#00ff00] shadow-xl text-left">
                                <p className="text-xs sm:text-xs md:text-sm text-neutral-300 font-medium italic leading-relaxed tracking-wide">
                                    {activeTour.description}
                                </p>
                            </div>

                            <div className="flex-shrink-0 hover:scale-105 active:scale-95 transition-transform duration-300">
                                <Link href={`/tours`} className="group block relative">
                                    <div className="absolute inset-0 bg-[#00ff00] opacity-60 group-hover:opacity-80 transition-opacity duration-500 rounded-full"></div>
                                    <div className="relative bg-[#00ff00] text-black px-6 py-2.5 shadow-xl hover:bg-white hover:text-black transition-all rounded-full flex items-center gap-2">
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] italic">Explore Package</span>
                                        <div className="bg-black text-white rounded-full p-0.5 group-hover:bg-[#00ff00] group-hover:text-black transition-colors">
                                            <ArrowRight className="w-2.5 h-2.5 group-hover:rotate-45 transition-transform duration-300" />
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        {/* Location Pin */}
                        {activeTour.route && (
                            <div className="pt-1 w-full flex justify-center lg:justify-start">
                                <div className="inline-flex items-center gap-3 px-3 py-2 bg-black/80 rounded-xl shadow-xl">
                                    <div className="w-5 h-5 flex items-center justify-center bg-[#00ff00]/20 border border-[#00ff00] rounded-full shadow-[0_0_8px_#00ff00]">
                                        <MapPin className="w-3.5 h-3.5 text-[#00ff00]" />
                                    </div>
                                    <div className="flex flex-col text-left">
                                        <span className="text-[#00ff00] font-mono text-[9px] font-bold uppercase tracking-widest leading-none italic">
                                            {activeTour.route}
                                        </span>
                                        <span className="text-white/80 text-[8.5px] font-mono uppercase tracking-wider leading-tight mt-0.5 font-bold italic">
                                            🕒 {durationText} • Starting from ${activeTour.price} USD
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* RIGHT COLUMN (Visible on all viewports, layout adapts to screen size) */}
                    <div className="flex lg:col-span-5 flex-row lg:flex-col xl:flex-row gap-4 sm:gap-6 justify-center lg:justify-end mt-10 lg:mt-0 items-center perspective-1000 w-full lg:w-auto">
                        {/* Next Card */}
                        {card1Data && (
                            <div
                                onClick={() => setActiveIndex(nextSlideIndex)}
                                className="group relative w-36 h-56 xs:w-44 xs:h-64 sm:w-64 sm:h-96 flex-shrink-0 cursor-pointer z-20"
                            >
                                <div className="w-full h-full relative rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-2xl bg-neutral-900/80 transition-transform duration-300 hover:-translate-y-2">
                                    <Image
                                        src={card1Data.imageUrl || "https://res.cloudinary.com/dkfnpmzpv/image/upload/v1771401761/hero_sections/dcjjvovjfbgidkiydjgw.jpg"}
                                        alt={card1Data.title}
                                        fill
                                        unoptimized
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        sizes="(max-width: 640px) 40vw, 25vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

                                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                                        <div className="bg-black/60 backdrop-blur-md px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[8px] sm:text-[9px] font-bold text-[#00ff00] uppercase tracking-widest shadow-lg">
                                            Next
                                        </div>
                                    </div>

                                    <div className="absolute bottom-0 left-0 w-full p-4 sm:p-6">
                                        <div className="drop-shadow-lg">
                                            <h3 className="text-white text-xs sm:text-base font-black uppercase tracking-tight leading-none mb-1 group-hover:text-[#00ff00] transition-colors drop-shadow-md">
                                                {card1Data.title}
                                            </h3>
                                            <div className="h-1 w-6 sm:w-8 bg-[#00ff00] rounded-full mt-1.5 sm:mt-2 shadow-[0_0_10px_#00ff00]" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Incoming Card */}
                        {card2Data && (
                            <div
                                onClick={() => setActiveIndex(nextNextSlideIndex)}
                                className="group relative w-28 h-44 xs:w-36 xs:h-52 sm:w-48 sm:h-72 flex-shrink-0 cursor-pointer opacity-100 hover:opacity-100 transition-all duration-500 z-20"
                            >
                                <div className="relative w-full h-full rounded-[1rem] sm:rounded-[1.5rem] overflow-hidden transition-all shadow-xl bg-neutral-900/80">
                                    <Image
                                        src={card2Data.imageUrl || "https://res.cloudinary.com/dkfnpmzpv/image/upload/v1771401761/hero_sections/dcjjvovjfbgidkiydjgw.jpg"}
                                        alt={card2Data.title}
                                        fill
                                        unoptimized
                                        className="object-cover"
                                        sizes="(max-width: 640px) 30vw, 20vw"
                                    />
                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors" />

                                    <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4">
                                        <div className="bg-black/60 backdrop-blur-sm p-2 sm:p-3 rounded-lg text-center">
                                            <span className="text-[8px] sm:text-[10px] font-bold text-white/70 uppercase tracking-widest">Up Next</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
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
