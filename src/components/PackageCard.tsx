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
//       <Card className="w-fit max-w-md mx-auto overflow-hidden transition-all duration-300 hover:shadow-xl animate-pulse">
//         <div className="relative h-40 w-full bg-gray-200 rounded-t-lg" />
//         <CardHeader>
//           <div className="h-6 bg-gray-200 rounded w-3/4" />
//           <div className="h-4 bg-gray-200 rounded w-full mt-2" />
//         </CardHeader>
//         <CardContent>
//           <div className="h-4 bg-gray-200 rounded w-5/6" />
//         </CardContent>
//         <CardFooter>
//           <div className="h-10 bg-gray-300 rounded-md w-full" />
//         </CardFooter>
//       </Card>
//     );
//   }

//   // Error or no package state
//   if (error || !pkg) {
//     return (
//       <Card className="w-fit max-w-md mx-auto overflow-hidden">
//         <div className="relative h-40 w-full bg-gray-100 rounded-t-lg" />
//         <CardHeader>
//           <CardTitle className="text-destructive">Error</CardTitle>
//           <CardDescription>{error || "Package not found"}</CardDescription>
//         </CardHeader>
//       </Card>
//     );
//   }

//   return (
//     <Link href={`/safari-packages/${pkg.slug}`} className="block">
//       <Card className="w-fit max-w-md mx-auto overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer group">
//         <div className="relative h-40 w-full">
//           <Image
//             src={pkg.imageUrl || "/placeholder-image.jpg"}
//             alt={pkg.name}
//             fill
//             className="object-cover rounded-t-lg transition-transform duration-500 group-hover:scale-105"
//             sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
//             priority={slug === "hero-package"}
//             onError={(e) => (e.currentTarget.src = "/placeholder-image.jpg")}
//           />
//           {pkg.price && (
//             <Badge
//               variant="secondary"
//               className="absolute top-2 right-2 bg-green-600 text-white"
//             >
//               ${pkg.price.toFixed(2)}
//             </Badge>
//           )}
//         </div>
//         <CardHeader className="pb-2">
//           <CardTitle className="text-xl font-semibold truncate">
//             {pkg.name}
//           </CardTitle>
//           <CardDescription className="line-clamp-2 text-sm">
//             {pkg.description || "No description available"}
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="pt-0">
//           <p className="text-sm font-medium text-muted-foreground">
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
//             className="w-full bg-primary hover:bg-primary/90 transition-all duration-300"
//             aria-label={`View details for ${pkg.name}`}
//           >
//             View Details
//           </Button>
//         </CardFooter>
//       </Card>
//     </Link>
//   );
// }

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
        const response = await fetch(`/api/package?slug=${slug}`, {
          cache: "no-store",
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch package");
        }
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

  // Loading state
  if (loading) {
    return (
      <Card className="w-full max-w-lg mx-auto overflow-hidden transition-all duration-300 hover:shadow-xl animate-pulse">
        <div className="relative h-48 w-full bg-gray-200 rounded-t-lg" />
        <CardHeader className="space-y-3">
          <div className="h-7 bg-gray-200 rounded w-3/4" />
          <div className="h-5 bg-gray-200 rounded w-full" />
        </CardHeader>
        <CardContent>
          <div className="h-5 bg-gray-200 rounded w-5/6" />
        </CardContent>
        <CardFooter>
          <div className="h-12 bg-black-200 rounded-md w-full" />
        </CardFooter>
      </Card>
    );
  }

  // Error or no package state
  if (error || !pkg) {
    return (
      <Card className="w-full max-w-lg mx-auto overflow-hidden">
        <div className="relative h-48 w-full bg-gray-100 rounded-t-lg" />
        <CardHeader>
          <CardTitle className="text-destructive text-2xl">Error</CardTitle>
          <CardDescription className="text-base">
            {error || "Package not found"}
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Link href={`/safari-packages/${pkg.slug}`} className="block">
      <Card className="shadow-none bg-transparent w-90 max-w-lg mx-auto overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer group border-none rounded-2xl">
        <div className="relative h-58 w-full">
          <Image
            src={pkg.imageUrl || "/placeholder-image.jpg"}
            alt={pkg.name}
            fill
            className="object-cover rounded-t-lg transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={slug === "hero-package"}
            onError={(e) => (e.currentTarget.src = "/placeholder-image.jpg")}
          />
          {pkg.price && (
            <Badge
              variant="secondary"
              className="absolute top-3 right-3 bg-green-600 text-white text-sm px-3 py-1"
            >
              ${pkg.price.toFixed(2)}
            </Badge>
          )}
        </div>
        <CardHeader className="pb-3 space-y-2">
          <CardTitle className="text-2xl font-semibold truncate">
            {pkg.name}
          </CardTitle>
          <CardDescription className="text-base line-clamp-2">
            {pkg.description || "No description available"}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-base font-medium text-muted-foreground">
            Price:{" "}
            <span className="text-green-600 font-bold">
              $
              {pkg.price !== undefined && pkg.price !== null
                ? pkg.price.toFixed(2)
                : "N/A"}
            </span>
          </p>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full bg-primary hover:bg-primary/90 transition-all duration-300 text-base py-6"
            aria-label={`View details for ${pkg.name}`}
          >
            View Details
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}