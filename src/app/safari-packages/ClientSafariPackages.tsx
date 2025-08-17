"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import PackageCard from "@/components/PackageCard";
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

export default function ClientSafariPackages() {
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
          <h1 className="text-3xl md:text-2xl font-extrabold text-center text-foreground mb-8 tracking-tight text-green-400">
            Yala National Park Safari Packages
          </h1>

          {/* NEW CONTENT SECTION - ADD THIS */}
          <div className="max-w-4xl mx-auto mb-12 text-center">
            <p className="text-lg leading-relaxed text-muted-foreground mb-6">
              Explore the breathtaking beauty of <strong>Yala National Park</strong> with our expert-guided safari packages.
              <strong>Yala National Park</strong> is renowned for its diverse wildlife, including the elusive leopard and
              majestic elephants. Our safari jeep service in <strong>Yala National Park</strong> offers a once-in-a-lifetime
              {/* FIXED: Escaped apostrophe in "park's" */}
              opportunity to witness the park&apos;s rich biodiversity up close.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              {/* FIXED: Escaped apostrophe in "you're" */}
              Whether you&apos;re a wildlife enthusiast or a nature lover, our <strong>Yala National Park</strong> safari
              packages provide an unforgettable experience with comfortable transportation and knowledgeable guides.
              Choose from our carefully crafted safari tours designed to maximize your wildlife viewing opportunities.
            </p>
          </div>
          {/* END NEW CONTENT SECTION */}

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
        <SafariPackageJsonLd
          key={pkg.id}
          package={{
            ...pkg,
            description: pkg.description || "",
            price: pkg.price || 0,
            imageUrl: pkg.imageUrl || "",
          }}
        />
      ))}
    </>
  );
}
