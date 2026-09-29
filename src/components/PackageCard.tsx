"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

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
    let isMounted = true;
    const fetchPackage = async () => {
      try {
        const response = await fetch(`/api/package?slug=${slug}`);
        if (!response.ok) throw new Error("Failed to fetch");
        const data: Package = await response.json();
        if (isMounted) setPackage(data);
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchPackage();
    return () => {
      isMounted = false;
    };
  }, [slug, initialPkg]);

  if (loading) {
    return (
      <div className="w-full max-w-[360px] h-[520px] bg-white animate-pulse rounded-[2.5rem] mx-auto my-4" />
    );
  }
  if (!pkg) return null;

  return (
    <div
      className="p-4 selection:bg-[#00ff00] selection:text-black [content-visibility:auto]"
      style={{
        fontFamily:
          '"Google Sans", "Open Sans", Roboto, -apple-system, BlinkMacSystemFont, Arial, sans-serif',
      }}
    >
      <Link
        href={`/safari-packages/${pkg.slug}`}
        className="block group mx-auto max-w-[360px] text-left"
      >
        {/* Google Card Surface: Pure White, Smooth Rounded Edges, Zero Outlines */}
        <div className="relative overflow-hidden rounded-[2.5rem] bg-white transition-all duration-300 flex flex-col p-6 [contain:paint] transform-gpu hover:scale-[1.01]">
          
          {/* Header Row: Google Badge + Starting Price */}
          <div className="flex items-center justify-between mb-4">
            <div className="inline-flex items-center gap-2 bg-[#f8f9fa] px-3.5 py-1.5 rounded-full">
              <span className="text-[14px] font-semibold text-[#202124]">
                Official Safari
              </span>
            </div>

            <div className="flex items-baseline gap-1">
              <span className="text-[13px] text-[#5f6368] font-medium">from</span>
              <span className="text-[18px] font-bold text-[#000000]">
                ${pkg.price || "120"}
              </span>
            </div>
          </div>

          {/* Clean Rounded Image Canvas */}
          <div className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden bg-[#f1f3f4] mb-5">
            <Image
              src={pkg.imageUrl || "/uploads/yala1.webp"}
              alt={pkg.name}
              fill
              sizes="(max-width: 768px) 100vw, 360px"
              priority={isPriority}
              loading={isPriority ? undefined : "lazy"}
              quality={75}
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 transform-gpu"
            />
          </div>

          {/* Editorial Content Section */}
          <div className="flex flex-col flex-1 justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold text-[#000000] tracking-tight leading-snug mb-2 group-hover:text-[#000000] transition-colors">
                {pkg.name}
              </h3>

              <p className="text-[18px] text-[#3c4043] leading-relaxed font-medium line-clamp-2">
                {pkg.description ||
                  "Experience the premier wildlife tracks of Yala with our certified naturalists and custom 4x4 Hilux vehicles."}
              </p>
            </div>

            {/* Bottom Row: Location Tag & Google Button */}
            <div className="pt-2 flex items-center justify-between border-t border-[#f1f3f4]">
              <span className="text-[14px] text-[#5f6368] font-medium">
                Block 01 Ruhuna
              </span>

              <div className="inline-flex items-center gap-2 bg-[#000000] group-hover:bg-[#00ff00] group-hover:text-black text-white px-5 py-2.5 rounded-full transition-all duration-200">
                <span className="text-[14px] font-bold">Explore</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </div>
            </div>
          </div>

        </div>
      </Link>
    </div>
  );
}