"use client";
import { MapPin, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

// 1. Define the shape of your data (The "Source of Truth")
export interface Tour {
    id: string;
    title: string;
    slug: string;
    route: string;
    price: number;
    description: string;
    highlights: string[];
}

// 2. Apply the interface to the component props
export function TourPackageCard({ tour }: { tour: Tour }) {
    return (
        <div className="group flex flex-col items-start gap-3 w-full">
            {/* HEADER PILL */}
            <div className="inline-block bg-black/70 backdrop-blur-xl px-5 py-3 border border-white/10 rounded-2xl group-hover:border-[#00ff00]/50 transition-all duration-500">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="w-3 h-3 text-[#00ff00]" />
                        <span className="text-[6px] font-black uppercase tracking-[0.5em] text-[#00ff00]">Verified_Package</span>
                    </div>
                    <h3 className="text-xl font-black text-white uppercase tracking-tighter leading-none">
                        {tour.title}
                    </h3>
                </div>
            </div>

            {/* ROUTE PILL */}
            <div className="inline-block bg-black/70 backdrop-blur-xl px-4 py-2 border border-white/5 rounded-xl">
                <div className="flex items-center gap-2">
                    <MapPin className="w-3 h-3 text-[#00ff00]" />
                    <span className="text-[12px] font-bold text-neutral-300 uppercase tracking-widest">
                        {tour.route}
                    </span>
                </div>
            </div>

            {/* DESCRIPTION PILL */}
            <div className="inline-block bg-black/60 backdrop-blur-md px-4 py-3 rounded-xl border border-white/5 max-w-md">
                <p className="text-[12px] md:text-[12px] text-neutral-400 font-bold uppercase tracking-widest leading-relaxed mb-4">
                    {tour.description}
                </p>

                {/* ACTION ROW */}
                <div className="flex items-center justify-between gap-6 pt-2 border-t border-white/5">
                    <div className="flex items-center gap-1">
                        {/* <DollarSign className="w-3 h-3 text-[#00ff00]" /> */}
                        {/* <span className="text-lg font-black text-white tracking-tighter">${tour.price}</span> */}
                    </div>
                    <Link href={`/tours/${tour.slug}`} className="flex items-center gap-2 text-[12px] font-black text-[#00ff00] uppercase tracking-[0.3em] hover:text-white transition-colors">
                        Explore Full Details <ArrowRight className="w-3 h-3" />
                    </Link>
                </div>
            </div>
        </div>
    );
}