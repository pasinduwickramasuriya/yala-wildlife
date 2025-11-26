
// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useState, useEffect } from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";

// interface Package {
//   id: string;
//   name: string;
//   slug: string;
//   description?: string | null;
//   price?: number | null;
//   imageUrl?: string | null;
// }

// export default function PackageCard({ slug }: { slug: string }) {
//   const [pkg, setPackage] = useState<Package | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchPackage = async () => {
//       try {
//         const response = await fetch(`/api/package?slug=${slug}`, {
//           cache: "no-store",
//         });
//         if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(errorData.error || "Failed to fetch package");
//         }
//         const packageData: Package = await response.json();
//         setPackage(packageData);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "An error occurred");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPackage();
//   }, [slug]);

//   // Loading state
//   if (loading) {
//     return (
//       <Card className="w-full max-w-[20rem] sm:max-w-[24rem] md:max-w-[28rem] mx-auto overflow-hidden transition-all duration-300 hover:shadow-xl animate-pulse">
//         <div className="relative h-40 sm:h-48 md:h-56 w-full bg-gray-200 rounded-t-lg" />
//         <CardHeader className="space-y-3">
//           <div className="h-6 sm:h-7 bg-gray-200 rounded w-3/4" />
//           <div className="h-4 sm:h-5 bg-gray-200 rounded w-full" />
//         </CardHeader>
//         <CardContent>
//           <div className="h-4 sm:h-5 bg-gray-200 rounded w-5/6" />
//         </CardContent>
//         <CardFooter>
//           <div className="h-10 sm:h-12 bg-gray-200 rounded-md w-full" />
//         </CardFooter>
//       </Card>
//     );
//   }

//   // Error or no package state
//   if (error || !pkg) {
//     return (
//       <Card className="w-full max-w-[20rem] sm:max-w-[24rem] md:max-w-[28rem] mx-auto overflow-hidden">
//         <div className="relative h-40 sm:h-48 md:h-56 w-full bg-gray-100 rounded-t-lg" />
//         <CardHeader>
//           <CardTitle className="text-xl sm:text-2xl text-destructive">
//             Error
//           </CardTitle>
//           <CardDescription className="text-sm sm:text-base">
//             {error || "Package not found"}
//           </CardDescription>
//         </CardHeader>
//       </Card>
//     );
//   }

//   return (
//     <Link href={`/safari-packages/${pkg.slug}`} className="block">
//       <Card className="shadow-none bg-transparent w-full max-w-[20rem] sm:max-w-[24rem] md:max-w-[28rem] mx-auto overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer group border-none rounded-2xl">
//         <div className="relative h-40 sm:h-48 md:h-56 w-full">
//           <Image
//             src={pkg.imageUrl || "/placeholder-image.jpg"}
//             alt={pkg.name}
//             fill
//             className="object-cover rounded-t-lg transition-transform duration-500 group-hover:scale-105"
//             sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 28rem"
//             priority={slug === "hero-package"}
//             onError={(e) => (e.currentTarget.src = "/placeholder-image.jpg")}
//           />
//           {pkg.price && (
//             <Badge
//               variant="secondary"
//               className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-green-600 text-white text-xs sm:text-sm px-2 sm:px-3 py-1"
//             >
//               ${pkg.price.toFixed(2)}
//             </Badge>
//           )}
//         </div>
//         <CardHeader className="pb-2 sm:pb-3 space-y-2">
//           <CardTitle className="text-xl sm:text-2xl font-semibold truncate">
//             {pkg.name}
//           </CardTitle>
//           <CardDescription className="text-sm sm:text-base line-clamp-2">
//             {pkg.description || "No description available"}
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="pt-0">
//           <p className="text-sm sm:text-base font-medium text-muted-foreground">
//             Price:{" "}
//             <span className="text-green-600 font-bold">
//               $
//               {pkg.price !== undefined && pkg.price !== null
//                 ? pkg.price.toFixed(2)
//                 : "N/A"}
//             </span>
//           </p>
//         </CardContent>
//         <CardFooter>



//           <Button
//             className="w-full bg-transparent hover:bg-green-500/20 transition-all duration-300 text-green-500 text-sm sm:text-base py-5 sm:py-6 rounded-full hover:scale-105 transform font-semibold"
//             aria-label={`View details for ${pkg.name}`}
//           >
//             View Details
//           </Button>
//         </CardFooter>
//       </Card>
//     </Link>
//   );
// }


// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useState, useEffect } from "react";
// import { ArrowRight, Sparkles, Heart } from "lucide-react"; 
// import { Skeleton } from "@/components/ui/skeleton";
// import { cn } from "@/lib/utils";

// interface Package {
//   id: string;
//   name: string;
//   slug: string;
//   description?: string | null;
//   price?: number | null;
//   imageUrl?: string | null;
// }

// export default function PackageCard({ slug }: { slug: string }) {
//   const [pkg, setPackage] = useState<Package | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchPackage = async () => {
//       try {
//         const response = await fetch(`/api/package?slug=${slug}`, { cache: "no-store" });
//         if (!response.ok) throw new Error("Failed to fetch package");
//         const packageData: Package = await response.json();
//         setPackage(packageData);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "An error occurred");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPackage();
//   }, [slug]);

//   // --- 1. Loading Skeleton (Bubble Shape) ---
//   if (loading) {
//     return (
//       <div className="w-full h-full rounded-[2.5rem] overflow-hidden bg-white border border-neutral-100 p-4 shadow-sm">
//         <Skeleton className="h-[240px] w-full rounded-[2rem]" />
//         <div className="p-2 space-y-3 mt-4">
//           <div className="flex justify-between items-center">
//             <Skeleton className="h-8 w-1/2 rounded-full" />
//             <Skeleton className="h-8 w-1/4 rounded-full" />
//           </div>
//           <Skeleton className="h-4 w-full rounded-full" />
//           <Skeleton className="h-4 w-3/4 rounded-full" />
//           <Skeleton className="h-14 w-full rounded-[1.5rem] mt-4" />
//         </div>
//       </div>
//     );
//   }

//   // --- 2. Error State ---
//   if (error || !pkg) {
//     return (
//       <div className="w-full h-[400px] rounded-[2.5rem] flex flex-col items-center justify-center bg-red-50/50 border border-red-100 text-center p-8 dashed-border">
//         <div className="bg-white p-4 rounded-full shadow-sm mb-3">
//             <span className="text-4xl">🏝️</span>
//         </div>
//         <h3 className="text-xl font-extrabold text-red-400">Package Missing</h3>
//         <p className="text-sm text-red-300 mt-1 font-medium">We couldnt locate this safari.</p>
//       </div>
//     );
//   }

//   // --- 3. The "Ultra-Modern & Cute" Card ---
//   return (
//     <Link 
//       href={`/safari-packages/${pkg.slug}`} 
//       className="group block h-full w-full focus:outline-none active:scale-[0.98] transition-transform duration-200"
//     >
//       <div className={cn(
//         "relative h-full w-full flex flex-col",
//         "bg-white dark:bg-neutral-900",
//         "rounded-[2.5rem] p-4", // Extra padding creates the "Frame" look
//         "border border-neutral-100 dark:border-neutral-800",
//         // The "Pop" Shadow Effect
//         "shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)]", 
//         "transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1)", // Bouncy animation
//         "hover:-translate-y-2 hover:shadow-[0_20px_40px_-10px_rgba(34,197,94,0.2)]" // Green glow on hover
//       )}>
        
//         {/* Image Container - The "Window" */}
//         <div className="relative w-full aspect-[4/3] overflow-hidden rounded-[2rem] bg-neutral-100">
//           <Image
//             src={pkg.imageUrl || "/placeholder-image.jpg"}
//             alt={pkg.name}
//             fill
//             className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110 group-hover:rotate-1"
//             sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//             priority={slug === "hero-package"}
//           />
          
//           {/* Floating Sticker Price Tag */}
//           {pkg.price && (
//             <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-white/50 transition-transform duration-300 group-hover:scale-110">
//               <span className="text-green-600 dark:text-green-400 text-[10px] uppercase font-bold tracking-wider mr-1">USD</span>
//               <span className="text-neutral-900 dark:text-white font-black text-lg tracking-tight">
//                 {pkg.price.toFixed(0)}
//               </span>
//             </div>
//           )}

//           {/* Wishlist Heart (Interactive-looking) */}
//           <div className="absolute top-4 left-4 bg-white/30 backdrop-blur-sm p-2.5 rounded-full text-white transition-all duration-300 hover:bg-white hover:text-red-500 hover:scale-110 cursor-pointer">
//              <Heart className="w-5 h-5 fill-transparent hover:fill-red-500 transition-colors" />
//           </div>
//         </div>

//         {/* Card Content */}
//         <div className="flex flex-col flex-grow pt-5 px-2 pb-1">
//           <div className="flex justify-between items-start gap-2 mb-2">
//             <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-800 dark:text-neutral-100 leading-tight group-hover:text-green-600 transition-colors">
//               {pkg.name}
//             </h3>
//           </div>

//           <p className="text-neutral-500 dark:text-neutral-400 text-sm line-clamp-2 mb-6 font-medium leading-relaxed">
//             {pkg.description || "An unforgettable journey through the wild awaits you."}
//           </p>

//           <div className="mt-auto">
//             {/* The "Cutter" Button - High Contrast & Rounded */}
//             <div className={cn(
//               "relative w-full overflow-hidden",
//               "flex items-center justify-between",
//               "py-4 px-6 rounded-[1.5rem]",
//               "bg-neutral-100 dark:bg-neutral-800",
//               "group-hover:bg-green-600", // Full color fill on hover
//               "transition-colors duration-500 ease-out"
//             )}>
//               <span className="font-bold text-neutral-700 dark:text-neutral-200 group-hover:text-white transition-colors z-10">
//                 Explore Package
//               </span>
              
//               <div className="flex items-center justify-center w-8 h-8 bg-white rounded-full shadow-sm group-hover:translate-x-1 transition-transform duration-300 z-10">
//                 <ArrowRight className="w-4 h-4 text-neutral-900 group-hover:text-green-600" />
//               </div>

//               {/* Sparkle Icon appearing on hover */}
//               <Sparkles className="absolute left-32 w-12 h-12 text-white opacity-0 group-hover:opacity-20 transition-opacity duration-500 rotate-12" />
//             </div>
//           </div>
//         </div>

//       </div>
//     </Link>
//   );
// }









"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowUpRight, Star } from "lucide-react"; 
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
        const response = await fetch(`/api/package?slug=${slug}`, { cache: "no-store" });
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

  // --- Loading State (Cute Pulse) ---
  if (loading) {
    return (
      <div className="w-full max-w-[320px] h-[380px] rounded-3xl bg-white/5 border border-white/10 p-3 flex flex-col gap-3 animate-pulse">
        <div className="w-full h-[200px] bg-white/10 rounded-2xl" />
        <div className="space-y-2 px-1">
          <div className="h-6 w-2/3 bg-white/10 rounded-full" />
          <div className="h-3 w-full bg-white/5 rounded-full" />
          <div className="h-3 w-4/5 bg-white/5 rounded-full" />
        </div>
      </div>
    );
  }

  // --- Error State ---
  if (error || !pkg) {
    return null; // Hide completely if broken to keep grid clean
  }

  // --- The "Compact & Cute" Card ---
  return (
    <Link 
      href={`/safari-packages/${pkg.slug}`} 
      className="group block w-full max-w-[320px] mx-auto focus:outline-none active:scale-95 transition-transform duration-300"
    >
      <div className={cn(
        "relative flex flex-col h-full overflow-hidden",
        "bg-neutral-900/60 backdrop-blur-md", // Dark glass background
        "border border-white/10", // Subtle border
        "rounded-3xl", // Very round corners (Cute factor)
        "hover:border-green-500/30 hover:bg-neutral-900/80",
        "hover:shadow-[0_20px_40px_-15px_rgba(34,197,94,0.15)]", // Soft Green Glow
        "transition-all duration-500"
      )}>
        
        {/* Image Section */}
        <div className="relative w-full aspect-[4/3] overflow-hidden m-1 rounded-[1.25rem] bg-neutral-800">
          <Image
            src={pkg.imageUrl || "/placeholder-image.jpg"}
            alt={pkg.name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 300px"
          />
          
          {/* Cute Price Tag */}
          {pkg.price && (
            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full flex items-baseline gap-1">
              <span className="text-[10px] text-neutral-400 font-bold">$</span>
              <span className="text-sm font-black text-white tracking-tight">{pkg.price}</span>
            </div>
          )}

          {/* "Popular" Star Badge (Optional visual flair) */}
          <div className="absolute top-3 left-3 w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-yellow-400 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-50 group-hover:scale-100">
             <Star size={14} fill="currentColor" />
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5 flex flex-col flex-grow">
          {/* Title */}
          <h3 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-green-400 transition-colors">
            {pkg.name}
          </h3>

          {/* Description - Compact */}
          <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed mb-6 font-medium">
            {pkg.description || "Experience the wild like never before."}
          </p>

          {/* Action Footer */}
          <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5 group-hover:border-green-500/20 transition-colors">
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 group-hover:text-white transition-colors">
              View Details
            </span>
            
            {/* Circle Button Icon */}
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-neutral-400 group-hover:bg-green-500 group-hover:text-white transition-all duration-300 group-hover:rotate-45">
              <ArrowUpRight size={16} />
            </div>
          </div>
        </div>

      </div>
    </Link>
  );
}