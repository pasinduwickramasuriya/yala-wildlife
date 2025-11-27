

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react"; 
import { cn } from "@/lib/utils";

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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        // FIX 1: Removed 'no-store' to allow caching. 
        // This makes the card load instantly on revisits or navigation.
        const response = await fetch(`/api/package?slug=${slug}`, { 
          next: { revalidate: 3600 } // Cache for 1 hour
        });
        
        if (!response.ok) throw new Error("Failed to fetch package");
        const packageData: Package = await response.json();
        setPackage(packageData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchPackage();
  }, [slug]);

  // --- Loading State (Compact Pulse) ---
  if (loading) {
    return (
      <div className="w-full max-w-[280px] h-[320px] rounded-2xl bg-black/40 border border-white/5 p-2 flex flex-col gap-3 animate-pulse">
        <div className="w-full h-[160px] bg-white/10 rounded-xl" />
        <div className="space-y-2 px-2 mt-2">
          <div className="h-4 w-3/4 bg-white/5 rounded-md" />
          <div className="h-2 w-full bg-white/5 rounded-md" />
          <div className="h-2 w-1/2 bg-white/5 rounded-md" />
        </div>
      </div>
    );
  }

  // --- Error State ---
  if (error || !pkg) {
    return null; 
  }

  // --- The "Cutter" Modern Card ---
  return (
    <Link 
      href={`/safari-packages/${pkg.slug}`} 
      className="group block w-full max-w-[280px] mx-auto focus:outline-none"
    >
      <div className={cn(
        "relative flex flex-col h-full overflow-hidden",
        "bg-black/40 backdrop-blur-xl", // Deep glass
        "border border-white/10", // Subtle initial border
        "rounded-2xl", // Sharp but friendly corners
        "hover:border-green-500/50 hover:bg-black/60", // Interaction state
        "hover:shadow-[0_0_30px_-10px_rgba(34,197,94,0.2)]", // Green glow
        "transition-all duration-500 ease-out"
      )}>
        
        {/* Image Section */}
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-neutral-900">
          <Image
            src={pkg.imageUrl || "/placeholder-image.jpg"}
            alt={pkg.name}
            fill
            // FIX 2: 'priority' forces the browser to load this image ASAP
            priority={true}
            unoptimized 
            sizes="(max-width: 768px) 100vw, 280px"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:opacity-80"
          />
          
          {/* Gradient Overlay for text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

          {/* Technical Price Badge */}
          {pkg.price && (
            <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/60 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-lg group-hover:border-green-500/50 transition-colors">
              <span className="text-[10px] text-green-400 font-mono">$</span>
              <span className="text-sm font-bold text-green-400 font-mono tracking-tight">{pkg.price}</span>
            </div>
          )}

          {/* Top Right Accent */}
          <div className="absolute top-3 right-3 w-6 h-6 bg-white/5 backdrop-blur-sm rounded-full flex items-center justify-center text-white/50 group-hover:bg-green-500 group-hover:text-black transition-all duration-300">
             <Sparkles size={10} />
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4 flex flex-col flex-grow">
          {/* Title */}
          <h3 className="text-base font-bold text-green-400 mb-1.5 leading-snug group-hover:text-green-400 transition-colors">
            {pkg.name}
          </h3>

          {/* Description */}
          <p className="text-[11px] text-neutral-400 line-clamp-2 leading-relaxed font-light mb-4">
            {pkg.description || "Experience the wild like never before."}
          </p>

          {/* Cutter Footer */}
          <div className="mt-auto pt-3 border-t border-white/5 flex items-center justify-between group-hover:border-green-500/20 transition-colors">
            <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-500 group-hover:text-white transition-colors">
              Explore
            </span>
            
            {/* Arrow Interaction */}
            <ArrowUpRight 
              size={14} 
              className="text-neutral-500 group-hover:text-green-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" 
            />
          </div>
        </div>

      </div>
    </Link>
  );
}