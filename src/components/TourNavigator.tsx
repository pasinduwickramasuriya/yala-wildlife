"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Compass, Search } from "lucide-react";
// Import the data and the card component
import { tourPackages } from "@/data/tours"; // Adjust this path to your actual data file
import { TourPackageCard } from "./TourPackageCard";

export default function TourNavigator() {
    const steps = [
        { label: "Explore", detail: "Browse curated Sri Lankan adventures" },
        { label: "Book", detail: "Reserve instantly or enquire for details" },
        { label: "Customize", detail: "Personalize itineraries to your dream" },
        { label: "Arrive", detail: "Land in paradise and enjoy the journey" },
    ];

    return (
        <section className="relative w-full min-h-screen overflow-hidden selection:bg-[#00ff00] selection:text-black">

            {/* --- HIGH-VISIBILITY BACKGROUND --- */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://res.cloudinary.com/dkfnpmzpv/image/upload/v1771636100/blogs/vrbgk9djfy59uaf6ol4p.jpg"
                    alt="Wildlife Chronicles Background"
                    fill
                    priority
                    unoptimized={true}
                    className="object-cover brightness-[0.9] transition-transform duration-[40s] scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />
            </div>

            {/* --- CONTENT LAYER --- */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-24 flex flex-col items-center">

                {/* HEADER BLOCK */}
                <header className="text-center mb-20 space-y-6">
                    <div className="inline-block px-3 py-1 bg-black/70 backdrop-blur-md rounded-full border border-[#00ff00]/20">
                        <span className="text-[7px] font-black uppercase tracking-[0.5em] text-[#00ff00]">Intelligence_Feed_V2.6</span>
                    </div>

                    <h2 className="text-4xl md:text-4xl font-black text-white tracking-[-0.08em] uppercase leading-[0.8] block">
                        <span className="inline-block bg-black/70 px-6 py-3 mb-2 rounded-2xl">Select Your</span>
                        <br />
                        <span className="inline-block bg-black/70 px-6 py-3 text-[#00ff00] rounded-2xl">Expedition</span>
                    </h2>

                    <div className="inline-block bg-black/60 px-6 py-3 backdrop-blur-md rounded-xl border border-white/5 max-w-xl">
                        <p className="text-[11px] md:text-[13px] text-neutral-300 leading-relaxed font-bold tracking-[0.15em] uppercase">
                            Deploying curated island wide itineraries. From the ancient northern ruins to the southern surf coast.
                        </p>
                    </div>
                </header>

                {/* TOUR GRID - DYNAMICALLY MAPPED FROM tourPackages */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16 mb-24 w-full">
                    {tourPackages.map((tour) => (
                        <TourPackageCard key={tour.id} tour={tour} />
                    ))}
                </div>

                {/* HOW IT WORKS (MICRO DATA FEED) */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 mb-20 w-full max-w-4xl">
                    {steps.map((item, i) => (
                        <div key={i} className="bg-black/70 backdrop-blur-md px-5 py-4 rounded-xl border border-white/5 group hover:border-[#00ff00]/30 transition-all">
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-3">
                                    <span className="text-[14px] font-mono text-[#00ff00] font-bold">0{i + 1}</span>
                                    <span className="text-[11px] font-black text-white uppercase tracking-widest">{item.label}</span>
                                </div>
                                <p className="text-[9px] text-neutral-500 font-bold uppercase tracking-tighter leading-tight">{item.detail}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* PRIMARY ACTION */}
                <div className="flex flex-col items-center gap-8">
                    <Link href="/tours" className="group relative">
                        <div className="absolute inset-0 bg-[#00ff00]/40 blur-[80px] opacity-0 group-hover:opacity-100 transition-all duration-700" />
                        <button className="relative bg-white hover:bg-[#00ff00] text-black px-7 py-4 rounded-full flex items-center gap-6 transition-all duration-500 group-hover:scale-105 shadow-2xl overflow-hidden">
                            <Search className="w-4 h-4" />
                            <span className="text-[11px] font-black uppercase tracking-[0.6em]">All Packages</span>
                            <Compass className="w-4 h-4 animate-[spin_8s_linear_infinite]" />
                        </button>
                    </Link>

                    <p className="text-[8px] font-mono text-white/30 tracking-[0.5em] uppercase">End_Of_Intelligence_Feed</p>
                </div>

            </div>

            {/* DECORATIVE NEEDLE */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-40">
                <div className="w-[1px] h-20 bg-gradient-to-b from-[#00ff00] via-[#00ff00]/50 to-transparent" />
            </div>
        </section>
    );
}