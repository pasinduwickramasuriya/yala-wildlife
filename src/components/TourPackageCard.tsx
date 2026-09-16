"use client";
import { MapPin, ArrowRight, ShieldCheck, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// 1. Unified dynamic interface mapping perfectly to Prisma & Static data
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
            className={`group flex flex-col w-full bg-black/80 rounded-2xl overflow-hidden transition-all duration-500 hover:bg-black/90 ${compact ? "hover:-translate-y-0.5 p-3" : "hover:-translate-y-1 p-4 md:p-5"} hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] ${horizontal ? "lg:flex-row lg:items-stretch gap-6" : ""} ${horizontal && reverse ? "lg:flex-row-reverse" : ""}`}
        >
            {/* 1. VISUAL COVER IMAGE */}
            <div className={`relative overflow-hidden bg-neutral-900 rounded-xl shrink-0 ${horizontal ? "w-full lg:w-[45%] h-56 sm:h-64 lg:h-auto min-h-[220px]" : compact ? "w-full h-28 md:h-32" : "w-full h-40 md:h-44"}`}>
                <Image
                    src={coverImage}
                    alt={tour.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 brightness-[0.85] group-hover:brightness-[0.95]"
                    unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

                {/* Floating Badges inside Image */}
                <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
                    {/* Featured Badge */}
                    {tour.isFeatured && (
                        <div className={`flex items-center gap-1 bg-[#00ff00] text-black font-black rounded-full tracking-wider shadow-lg animate-pulse ${compact ? "text-[7px] px-2 py-0.5" : "text-[8px] px-2.5 py-1"}`}>
                            <Star className={`${compact ? "w-2 h-2" : "w-2.5 h-2.5"} fill-black`} />
                            <span>Featured Expedition</span>
                        </div>
                    )}
                    {/* Verified Badge */}
                    <div className={`flex items-center gap-1 bg-black/85 rounded-full shadow-md ${compact ? "px-1.5 py-0.5" : "px-2 py-1"}`}>
                        <ShieldCheck className={`${compact ? "w-2 h-2" : "w-2.5 h-2.5"} text-[#00ff00]`} />
                        <span className={`font-bold tracking-wider text-white ${compact ? "text-[6.5px]" : "text-[7px]"}`}>Verified</span>
                    </div>
                </div>

                {/* Floating Duration in Bottom Right */}
                <div className={`absolute bottom-2.5 right-2.5 bg-black/85 rounded-full z-10 shadow-md ${compact ? "px-2 py-0.5" : "px-2.5 py-1"}`}>
                    <p className={`font-bold text-[#00ff00] tracking-wider leading-none ${compact ? "text-[8px]" : "text-[9px]"}`}>
                        🕒 {durationText}
                    </p>
                </div>
            </div>

            {/* 2. CARD BODY & CONTENT */}
            <div className="flex-grow flex flex-col justify-between pt-2 lg:pt-0 gap-4">
                <div className="space-y-3">
                    {/* Title */}
                    <h3 className={`font-bold text-white tracking-tight leading-snug group-hover:text-[#00ff00] transition-colors duration-300 ${compact ? "text-sm md:text-base" : "text-lg md:text-xl"}`}>
                        {tour.title}
                    </h3>

                    {/* Route summary */}
                    {tour.route && (
                        <div className={`flex items-center gap-1.5 bg-white/5 rounded-md w-fit ${compact ? "py-0.5 px-2" : "py-1 px-2.5"}`}>
                            <MapPin className={`${compact ? "w-2.5 h-2.5" : "w-3.5 h-3.5"} text-[#00ff00]`} />
                            <span className={`font-semibold text-neutral-300 tracking-wide ${compact ? "text-[9px]" : "text-[11px] md:text-[12px]"}`}>
                                {tour.route}
                            </span>
                        </div>
                    )}

                    {/* Short Description */}
                    <p className={`text-neutral-400 font-normal leading-relaxed ${compact ? "text-[11.5px] line-clamp-2" : "text-[13px] md:text-[14px] line-clamp-3"}`}>
                        {tour.description}
                    </p>

                    {/* Highlights (Only shown in horizontal non-compact layout) */}
                    {horizontal && !compact && tour.highlights && tour.highlights.length > 0 && (
                        <div className="pt-2 hidden sm:block">
                            <span className="text-[9px] font-black text-[#00ff00] uppercase tracking-widest block mb-2">Highlights</span>
                            <div className="flex flex-wrap gap-1.5">
                                {tour.highlights.slice(0, 4).map((hl, idx) => (
                                    <span key={idx} className="bg-white/5 border border-white/10 px-2 py-0.5 rounded text-[10px] text-white/70 font-medium">
                                        ✦ {hl}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* ACTION ROW */}
                <div className="flex items-center justify-between gap-4 pt-3 border-t border-white/5 mt-auto">
                    {/* Price Tag */}
                    <div className="flex flex-col">
                        <span className={`font-bold tracking-wider text-neutral-500 uppercase ${compact ? "text-[7px]" : "text-[8px] md:text-[9px]"}`}>Starting from</span>
                        <span className={`font-extrabold text-white tracking-tight ${compact ? "text-sm md:text-base" : "text-base md:text-xl"}`}>
                            ${tour.price} <span className={`font-medium text-neutral-400 tracking-normal ${compact ? "text-[9px]" : "text-[10px]"}`}>USD</span>
                        </span>
                    </div>

                    {/* Explore Details CTA */}
                    <div
                        className={`flex items-center gap-1 font-bold text-white bg-white/10 group-hover:bg-[#00ff00] group-hover:text-black rounded-full transition-all duration-300 active:scale-95 shadow-md ${compact ? "text-[9px] px-3 py-1" : "text-[10px] md:text-[11px] px-4 py-2"}`}
                    >
                        Explore Details <ArrowRight className={`${compact ? "w-2.5 h-2.5" : "w-3.5 h-3.5"}`} />
                    </div>
                </div>
            </div>
        </Link>
    );
}