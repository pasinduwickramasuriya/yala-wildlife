"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin, ShieldCheck } from "lucide-react";

interface Package {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  price?: number | null;
  imageUrl?: string | null;
}

export default function PackageCard({
  slug,
  pkg: initialPkg,
  isPriority = false,
}: {
  slug: string;
  pkg?: Package | null;
  isPriority?: boolean;
}) {
  const [pkg, setPackage] = useState<Package | null>(initialPkg || null);
  const [loading, setLoading] = useState(!initialPkg);

  useEffect(() => {
    if (initialPkg) {
      setPackage(initialPkg);
      setLoading(false);
      return;
    }
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
  }, [slug, initialPkg]);

  if (loading) {
    return (
      <div className="w-[265px] h-[340px] bg-neutral-900/40 animate-pulse rounded-[2rem] mx-auto my-3" />
    );
  }
  if (!pkg) return null;

  return (
    <div
      className="px-2 sm:px-3 py-3 select-none [contain:paint]"
      style={{
        fontFamily: '"Google Sans", Arial, Helvetica, sans-serif',
      }}
    >
      <Link
        href={`/safari-packages/${pkg.slug}`}
        className="block group mx-auto max-w-[270px] [contain:layout_style]"
      >
        {/* Borderless & Backgroundless Wrapper with GPU Isolation */}
        <div className="relative overflow-hidden rounded-[2rem] bg-black p-2.5 transition-transform duration-200 z-0 [transform:translateZ(0)]">
          
          {/* --- 1. PETITE INNER CAPSULE IMAGE --- */}
          <div className="relative w-full aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-neutral-900 [contain:strict]">
            <Image
              src={pkg.imageUrl || "/placeholder-image.jpg"}
              alt={pkg.name}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              sizes="(max-width: 270px) 100vw, 270px"
              priority={isPriority}
              loading={isPriority ? "eager" : "lazy"}
              quality={65}
            />
            {/* Soft Bottom Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            {/* Cute Floating Price Pill */}
            <div className="absolute top-2.5 right-2.5 bg-black/80 backdrop-blur-md px-2.5 py-0.5 rounded-full z-10 shadow-sm">
              <span className="text-[#00ff00] text-[11.5px] font-bold tracking-tight">
                ${pkg.price || "00"}
              </span>
            </div>
          </div>

          {/* --- 2. CENTERED COMPACT GOOGLE-STYLE CONTENT --- */}
          <div className="px-2 pt-3 pb-1.5 flex flex-col items-center gap-2 bg-black relative z-10 text-center">
            
            {/* Centered Mini Status Pills */}
            <div className="flex items-center justify-center gap-1.5">
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#00ff00]/10">
                <ShieldCheck size={9} className="text-[#00ff00]" />
                <span className="text-[8.5px] font-semibold text-[#00ff00] tracking-wide text-nowrap">
                  Official Yala Tour
                </span>
              </div>
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/5 text-white/45">
                <MapPin size={8} />
                <span className="text-[8.5px] font-medium tracking-wide">
                  Block 01
                </span>
              </div>
            </div>

            {/* Centered Google Sans Title */}
            <h3 className="text-[15px] font-bold text-white tracking-tight leading-snug group-hover:text-[#00ff00] transition-colors line-clamp-1">
              {pkg.name}
            </h3>

            {/* Centered Petite Description */}
            <p className="text-[11px] text-white/60 leading-relaxed line-clamp-2 font-normal">
              {pkg.description ||
                "Premium safari experience guided by our expert Sri Lankan naturalists."}
            </p>

            {/* --- 3. CENTERED MINI ACTION BUTTON --- */}
            <div className="w-full mt-1 pt-2.5 flex flex-col items-center justify-center gap-1.5 border-t border-white/5">
              <div className="inline-flex items-center justify-center gap-1.5 bg-white text-black pl-3.5 pr-1 py-0.5 rounded-full group-hover:bg-[#00ff00] transition-colors duration-150 shadow-sm">
                <span className="text-[9.5px] font-bold tracking-wide">
                  Explore
                </span>
                <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center text-white">
                  <ArrowUpRight
                    size={11}
                    className="stroke-[2.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-150"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Subtle Ambient Glow */}
          <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-[#00ff00]/5 blur-[40px] rounded-full pointer-events-none z-0" />
        </div>
      </Link>
    </div>
  );
}










