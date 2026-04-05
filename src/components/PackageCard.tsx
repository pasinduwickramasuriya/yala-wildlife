"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowUpRight, MapPin, ShieldCheck } from "lucide-react";
import "@/app/style/packagecard.css";

interface Package {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  price?: number | null;
  imageUrl?: string | null;
}

export default function PackageCard({ slug }: { slug: string }) {
  const [pkg, setPackage] = useState<Package | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const response = await fetch(`/api/package?slug=${slug}`);
        if (!response.ok) throw new Error("Failed to fetch");
        const data: Package = await response.json();
        setPackage(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPackage();
  }, [slug]);

  if (loading) return <div className="w-[300px] h-[400px] bg-white/5 animate-pulse rounded-[2rem] mx-auto" />;
  if (!pkg) return null;

  return (
    <div className="px-6 md:px-6 py-4">
      <Link
        href={`/safari-packages/${pkg.slug}`}
        className="block group mx-auto max-w-[320px]"
      >
        <div className="relative overflow-hidden rounded-[2.5rem] bg-black shadow-2xl transition-all duration-500  z-0">

          {/* --- 1. IMAGE SECTION (Fixed Scaling) --- */}
          <div className="relative w-full aspect-[4/3] overflow-hidden rounded-t-[2.5rem]">
            <Image
              src={pkg.imageUrl || "/placeholder-image.jpg"}
              alt={pkg.name}
              fill
              // Added transform-gpu and will-change to prevent flickering/shrinking issues on desktop
              className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-100 group-hover:opacity-100 transform-gpu will-change-transform"
              sizes="(max-width: 320px) 100vw, 320px"
              priority
            />
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent pointer-events-none" />

            {/* Floating Price Pill (Surgical) */}
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full z-10">
              <span className="text-[#00ff00] text-[12px] font-black font-mono tracking-tighter">
                ${pkg.price || '00'}
              </span>
            </div>
          </div>

          {/* --- 2. CONTENT SECTION --- */}
          <div className="p-6 flex flex-col gap-3 bg-black relative z-10">

            {/* Status Badge */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#00ff00]/10">
                <ShieldCheck size={8} className="text-[#00ff00]" />
                <span className="text-[8px] font-black text-[#00ff00] uppercase tracking-widest text-nowrap">Official Yala Tour</span>
              </div>
              <div className="flex items-center gap-1 text-white/30">
                <MapPin size={8} />
                <span className="text-[8px] font-bold uppercase tracking-widest">Block 01</span>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-lg font-black text-white  tracking-tight italic leading-tight group-hover:text-[#00ff00] transition-colors">
              {pkg.name}
            </h3>

            {/* Description */}
            <p className="text-[11px] text-white/50 leading-relaxed line-clamp-2 font-medium">
              {pkg.description || "Premium safari experience guided by our expert Sri Lankan naturalists."}
            </p>

            {/* --- 3. ACTION BUTTON --- */}
            <div className="mt-2 pt-4  flex items-center justify-between">
              <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em]">Discovery Protocol</span>

              <div className="flex items-center gap-2 bg-white text-black pl-4 pr-1 py-1 rounded-full group-hover:bg-[#00ff00] transition-all duration-300">
                <span className="text-[9px] font-black uppercase tracking-widest">Explore</span>
                <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center text-white">
                  <ArrowUpRight size={12} className="group-hover:rotate-45 transition-transform" />
                </div>
              </div>
            </div>

          </div>

          {/* Decorative Glow Orb */}
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#00ff00]/5 blur-[50px] rounded-full pointer-events-none z-0" />
        </div>
      </Link>
    </div>
  );
}