
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
      <Card className="w-full max-w-[20rem] sm:max-w-[24rem] md:max-w-[28rem] mx-auto overflow-hidden transition-all duration-300 hover:shadow-xl animate-pulse">
        <div className="relative h-40 sm:h-48 md:h-56 w-full bg-gray-200 rounded-t-lg" />
        <CardHeader className="space-y-3">
          <div className="h-6 sm:h-7 bg-gray-200 rounded w-3/4" />
          <div className="h-4 sm:h-5 bg-gray-200 rounded w-full" />
        </CardHeader>
        <CardContent>
          <div className="h-4 sm:h-5 bg-gray-200 rounded w-5/6" />
        </CardContent>
        <CardFooter>
          <div className="h-10 sm:h-12 bg-gray-200 rounded-md w-full" />
        </CardFooter>
      </Card>
    );
  }

  // Error or no package state
  if (error || !pkg) {
    return (
      <Card className="w-full max-w-[20rem] sm:max-w-[24rem] md:max-w-[28rem] mx-auto overflow-hidden">
        <div className="relative h-40 sm:h-48 md:h-56 w-full bg-gray-100 rounded-t-lg" />
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl text-destructive">
            Error
          </CardTitle>
          <CardDescription className="text-sm sm:text-base">
            {error || "Package not found"}
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Link href={`/safari-packages/${pkg.slug}`} className="block">
      <Card className="shadow-none bg-transparent w-full max-w-[20rem] sm:max-w-[24rem] md:max-w-[28rem] mx-auto overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer group border-none rounded-2xl">
        <div className="relative h-40 sm:h-48 md:h-56 w-full">
          <Image
            src={pkg.imageUrl || "/placeholder-image.jpg"}
            alt={pkg.name}
            fill
            className="object-cover rounded-t-lg transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 28rem"
            priority={slug === "hero-package"}
            onError={(e) => (e.currentTarget.src = "/placeholder-image.jpg")}
          />
          {pkg.price && (
            <Badge
              variant="secondary"
              className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-green-600 text-white text-xs sm:text-sm px-2 sm:px-3 py-1"
            >
              ${pkg.price.toFixed(2)}
            </Badge>
          )}
        </div>
        <CardHeader className="pb-2 sm:pb-3 space-y-2">
          <CardTitle className="text-xl sm:text-2xl font-semibold truncate">
            {pkg.name}
          </CardTitle>
          <CardDescription className="text-sm sm:text-base line-clamp-2">
            {pkg.description || "No description available"}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm sm:text-base font-medium text-muted-foreground">
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
            // Changed: Set background to transparent and hover to green with 20% opacity
            // Changed: Set text color to green-500 for visibility
            // Changed: Added rounded-full for a modern, pill-shaped button
            // Changed: Added hover:scale-105 transform for a subtle modern hover effect
            // Changed: Adjusted padding to px-6 sm:px-8 for balanced spacing
            // Changed: Added font-semibold for a bolder, modern text style
            className="w-full bg-transparent hover:bg-green-500/20 transition-all duration-300 text-green-500 text-sm sm:text-base py-5 sm:py-6 rounded-full hover:scale-105 transform font-semibold"
            aria-label={`View details for ${pkg.name}`}
          >
            View Details
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
