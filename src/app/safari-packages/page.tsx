"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import PackageCard from "@/components/PackageCard";
import { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";
import { OrganizationJsonLd } from "@/components/JsonLd";
import { FAQJsonLd, defaultFAQs } from "@/components/FAQJsonLd";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { LocalBusinessJsonLd } from "@/components/JsonLd";
import { SafariPackageJsonLd } from "@/components/SafariPackageJsonLd";

// Define the Package interface to match your API response
interface SafariPackage {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price?: number;
  imageUrl?: string;
}

export const metadata: Metadata = generateMetadata(
  "Yala Safari Packages | Best Wildlife Tours in Sri Lanka",
  "Book your perfect Yala safari package. Morning, evening, and full-day safari tours available with expert guides and comfortable jeeps. Best rates guaranteed.",
  "/safari-packages"
);

export default function SafariPackages() {
  const [packages, setPackages] = useState<SafariPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch("/api/package", { cache: "no-store" });
        if (!response.ok) {
          throw new Error(`Failed to fetch packages: ${response.statusText}`);
        }
        const data: SafariPackage[] = await response.json();
        setPackages(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  const breadcrumbItems = [
    { name: "Home", item: "/" },
    { name: "Safari Packages", item: "/safari-packages" },
  ];

  return (
    <>
      <OrganizationJsonLd />
      <LocalBusinessJsonLd />
      <FAQJsonLd faqs={defaultFAQs} />
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <div className="min-h-screen bg-background">
        <Header />
        <section className="w-full py-16 px-4 md:px-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-center text-foreground mb-12 tracking-tight">
            Our Safari Packages
          </h1>
          {loading ? (
            <div className="container max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
              {Array(4)
                .fill(null)
                .map((_, index) => (
                  <div
                    key={index}
                    className="rounded-xl overflow-hidden shadow-lg bg-card"
                  >
                    <div className="h-56 bg-muted" />
                    <div className="p-6">
                      <div className="h-6 bg-muted rounded w-3/4 mb-2" />
                      <div className="h-4 bg-muted rounded w-full mb-1" />
                      <div className="h-4 bg-muted rounded w-5/6 mb-4" />
                      <div className="h-5 bg-muted rounded w-1/2" />
                    </div>
                  </div>
                ))}
            </div>
          ) : error ? (
            <p className="text-center text-destructive">{error}</p>
          ) : packages.length > 0 ? (
            <div className="container max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {packages.map((pkg) => (
                <PackageCard key={pkg.id} slug={pkg.slug} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">
              No safari packages available at the moment.
            </p>
          )}
        </section>
      </div>
      {packages.map((pkg) => (
        <SafariPackageJsonLd key={pkg.id} package={pkg} />
      ))}
    </>
  );
}
