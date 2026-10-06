"use client";

import { MapPin, ArrowRight, ShieldCheck, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export interface Tour {
    id: string;
    title: string;
    slug: string;
    route: string | null;
    price: number;
    description: string;
    highlights?: string[];
    duration?: string | null;
    imageUrl?: string | null;
    isFeatured?: boolean;
}

const getOptimizedImageUrl = (url: string, width: number = 600) => {
    if (url && url.includes("res.cloudinary.com") && url.includes("/upload/")) {
        return url.replace("/upload/", `/upload/f_auto,q_auto,w_${width}/`);
    }
    return url;
};

export function TourPackageCard({
    tour,
    compact = false,
    horizontal = false,
    reverse = false
}: {
    tour: Tour;
    compact?: boolean;
    horizontal?: boolean;
    reverse?: boolean;
}) {
    const durationText = tour.duration || "Custom Tour";
    const rawImage = tour.imageUrl || "https://res.cloudinary.com/dkfnpmzpv/image/upload/v1771401761/hero_sections/dcjjvovjfbgidkiydjgw.jpg";
    const coverImage = getOptimizedImageUrl(rawImage, compact ? 400 : 800);

    return (
        <Link
            href={`/tours/${tour.slug}`}
            className={`group flex flex-col w-full bg-white rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden transition-colors duration-150 ${compact ? "p-3 sm:p-4" : "p-4 sm:p-6"
                } ${horizontal ? "lg:flex-row lg:items-stretch gap-6 sm:gap-8" : "gap-4 sm:gap-5"} ${horizontal && reverse ? "lg:flex-row-reverse" : ""
                }`}
            style={{
                fontFamily:
                    '"Google Sans", "Open Sans", Roboto, -apple-system, BlinkMacSystemFont, Arial, sans-serif',
            }}
        >
            {/* 1. VISUAL COVER IMAGE CONTAINER */}
            <div
                className={`relative overflow-hidden bg-[#f8f9fa] rounded-2xl sm:rounded-3xl shrink-0 ${horizontal
                        ? "w-full lg:w-[44%] min-h-[220px] sm:min-h-[260px] lg:min-h-[280px]"
                        : compact
                            ? "w-full aspect-[16/10]"
                            : "w-full aspect-[16/10] sm:aspect-[16/9]"
                    }`}
            >
                <Image
                    src={coverImage}
                    alt={tour.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                    unoptimized
                />

                {/* Floating Badges */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex flex-wrap gap-1.5 z-10">
                    {tour.isFeatured && (
                        <div className="inline-flex items-center gap-1.5 bg-white text-[#1f1f1f] font-bold rounded-full px-3 py-1 text-[11px] sm:text-[12px] tracking-wide">
                            <Star className="w-3 h-3 text-[#137333] fill-[#137333]" />
                            <span>Featured</span>
                        </div>
                    )}
                    <div className="inline-flex items-center gap-1.5 bg-white text-[#1f1f1f] font-semibold rounded-full px-3 py-1 text-[11px] sm:text-[12px]">
                        <ShieldCheck className="w-3 h-3 text-[#137333]" />
                        <span>Verified Tour</span>
                    </div>
                </div>

                {/* Floating Duration Badge */}
                <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 bg-white/95 text-[#1f1f1f] rounded-full px-3 py-1 z-10">
                    <p className="font-bold text-[11px] sm:text-[12px] tracking-wide leading-none">
                        🕒 {durationText}
                    </p>
                </div>
            </div>

            {/* 2. CARD BODY & EDITORIAL CONTENT */}
            <div className="flex-grow flex flex-col justify-between gap-4">
                <div className="space-y-3">
                    {/* Route Meta Pill */}
                    {tour.route && (
                        <div className="inline-flex items-center gap-1.5 bg-[#f8f9fa] rounded-full px-3 py-1 w-fit">
                            <MapPin className="w-3 h-3 text-[#137333] shrink-0" />
                            <span className="font-semibold text-[#5f6368] text-[12px] sm:text-[13px] tracking-wide">
                                {tour.route}
                            </span>
                        </div>
                    )}

                    {/* Title */}
                    <h3 className={`font-bold text-[#1f1f1f] tracking-tight leading-snug group-hover:text-[#1f1f1f] transition-colors ${compact ? "text-base sm:text-lg" : "text-xl sm:text-2xl"
                        }`}>
                        {tour.title}
                    </h3>

                    {/* Description */}
                    <p className={`font-semibold text-[#3c4043] leading-relaxed ${compact ? "text-[13px] line-clamp-2" : "text-[14px] sm:text-[15px] line-clamp-3"
                        }`}>
                        {tour.description}
                    </p>

                    {/* Highlights Pill Tags */}
                    {horizontal && !compact && tour.highlights && tour.highlights.length > 0 && (
                        <div className="pt-1 hidden sm:block">
                            <span className="text-[11px] font-bold text-[#5f6368] uppercase tracking-wider block mb-2">
                                Expedition Highlights
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                                {tour.highlights.slice(0, 4).map((hl, idx) => (
                                    <span
                                        key={idx}
                                        className="bg-[#f8f9fa] text-[#1f1f1f] px-3 py-1 rounded-full text-[12px] font-semibold"
                                    >
                                        ✓ {hl}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* ACTION & PRICING ROW */}
                <div className="flex items-center justify-between gap-4 pt-4 border-t border-[#f1f3f4] mt-auto">
                    {/* Price Column */}
                    <div className="flex flex-col">
                        <span className="text-[11px] sm:text-[12px] font-semibold text-[#5f6368] uppercase tracking-wider">
                            Starting from
                        </span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-xl sm:text-2xl font-bold text-[#1f1f1f] tracking-tight">
                                ${tour.price}
                            </span>
                            <span className="text-[12px] font-semibold text-[#5f6368]">
                                USD
                            </span>
                        </div>
                    </div>

                    {/* CTA Pill */}
                    <div className="inline-flex items-center gap-2 bg-[#f8f9fa] group-hover:bg-[#00ff00] text-[#1f1f1f] group-hover:text-black font-bold rounded-full px-5 py-2.5 text-[13px] transition-colors duration-150 shrink-0">
                        <span>Explore Details</span>
                        <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                </div>
            </div>
        </Link>
    );
}