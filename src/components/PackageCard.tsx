"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

interface Package {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price?: number;
  imageUrl?: string;
}

export default function PackageCard({ slug }: { slug: string }) {
  const [pkg, setPkg] = useState<Package | null>(null);
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
        setPkg(packageData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchPackage();
  }, [slug]);

  if (loading) {
    return (
      <div className="group rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 max-w-sm mx-auto shadow-lg animate-pulse">
        <div className="relative h-56 w-full bg-muted rounded-t-xl" />
        <div className="p-6 bg-card">
          <div className="h-6 bg-muted rounded w-3/4 mb-2" />
          <div className="h-4 bg-muted rounded w-full mb-1" />
          <div className="h-4 bg-muted rounded w-5/6 mb-4" />
          <div className="h-5 bg-muted rounded w-1/2" />
        </div>
      </div>
    );
  }

  if (error || !pkg) {
    return (
      <div className="group rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 max-w-sm mx-auto shadow-lg">
        <div className="relative h-56 w-full bg-muted rounded-t-xl" />
        <div className="p-6 bg-card text-center">
          <p className="text-destructive">{error || "Package not found"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="group rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 max-w-sm mx-auto ">
      <div className="relative h-56 w-full">
        <Image
          src={pkg.imageUrl || "/placeholder-image.jpg"}
          alt={pkg.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105 rounded-t-xl"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="p-6 ">
        <h3 className="text-xl font-semibold text-foreground truncate">
          {pkg.name}
        </h3>
        <p className="text-muted-foreground mt-2 line-clamp-2">
          {pkg.description || "No description available"}
        </p>
        <p className="text-lg font-bold text-green-600 mt-4">
          Price: ${pkg.price !== undefined ? pkg.price.toFixed(2) : "N/A"}
        </p>
        <div className="mt-4 flex justify-center">
          <Link
            href={`/safari-packages/${pkg.slug}`}
            className="inline-block bg-primary text-primary-foreground px-5 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-primary/90 hover:shadow-md"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
