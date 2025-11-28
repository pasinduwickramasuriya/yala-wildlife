"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import PackageCard from "@/components/PackageCard";
import { OrganizationJsonLd, LocalBusinessJsonLd } from "@/components/JsonLd";
import { FAQJsonLd, defaultFAQs } from "@/components/FAQJsonLd";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { SafariPackageJsonLd } from "@/components/SafariPackageJsonLd";
import { AutoSEOWrapper } from "@/components/AutoSEOWrapper";
import { Compass, Map, Shield, Star } from "lucide-react";

// Define the Package interface
interface SafariPackage {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price?: number;
  imageUrl?: string;
  mealPrice: number;
  ticketPrice: number;
}

export default function ClientSafariPackages() {
  const [packages, setPackages] = useState<SafariPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch("/api/package", { cache: "no-store" });
        if (!response.ok) throw new Error("Failed to fetch packages");
        const data = await response.json();
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
      {/* JSON-LD Data */}
      <OrganizationJsonLd />
      <LocalBusinessJsonLd />
      <FAQJsonLd faqs={defaultFAQs} />
      <BreadcrumbJsonLd items={breadcrumbItems} />
      {packages.map((pkg) => (
        // <SafariPackageJsonLd
        //   key={pkg.id}
        //   package={{
        //     ...pkg,
        //     description: pkg.description || "",
        //     price: pkg.price || 0,
        //     imageUrl: pkg.imageUrl || "",
        //   }}
        // />
        <SafariPackageJsonLd
          key={pkg.id}
          package={{
            ...pkg,
            description: pkg.description || "",
            price: pkg.price || 0,
            imageUrl: pkg.imageUrl || "",
            // ✅ ADD THESE TWO LINES TO FIX THE BUILD ERROR
            mealPrice: pkg.mealPrice || 0,
            ticketPrice: pkg.ticketPrice || 0,
          }}
        />
      ))}

      <div className="min-h-screen bg-[#050505] relative text-white overflow-hidden selection:bg-green-500/30">
        <Header />

        {/* =========================================
            BACKGROUND IMAGE SECTION - UPDATED FOR VISIBILITY
        ========================================= */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Image
            src="/uploads/1748935199061-20250603_1239_Leopard Emerges from Darkness_simple_compose_01jwt9yv7qect8krxy794bcr23.webp"
            alt="Yala Leopard Background"
            fill
            priority
            // ✅ Increased opacity from 60 to 90 so the image is clearly visible
            className="object-cover opacity-90"
            quality={90}
          />
          {/* ✅ Softer Gradients: Transparent middle to let the image show through */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80" />
          {/* ✅ Lighter Vignette: Reduced intensity on the corners */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_20%,_rgba(0,0,0,0.6)_100%)]" />
        </div>

        {/* =========================================
            MAIN CONTENT
        ========================================= */}
        <section className="relative z-10 w-full py-24 px-4 md:px-6">

          {/* HERO HEADER */}
          <div className="container max-w-7xl mx-auto mb-16 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 backdrop-blur-md mb-8 shadow-[0_0_15px_rgba(34,197,94,0.2)]">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-green-400 font-bold">Premium Expeditions</span>
            </div>

            {/* Title - Added subtle text shadow for better readability against brighter background */}
            {/* <h1 className="text-5xl md:text-4xl font-black text-white mb-8 tracking-tighter leading-[0.9] drop-shadow-lg">
              YALA <span className="text-transparent bg-clip-text bg-gradient-to-br from-green-400 to-emerald-600 drop-shadow-none">Safari Packages</span>
            </h1> */}
            <h1 className="text-5xl md:text-4xl font-black text-white mb-8 tracking-tighter leading-[0.9] drop-shadow-lg">
              YALA{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-green-400 to-emerald-600 drop-shadow-none">
                <span className="mr-4">Safari</span>
                <span>Packages</span>
              </span>
            </h1>


            {/* Intro Card - Borderless Glass */}
            <div className="backdrop-blur-xl bg-white/5 rounded-[2.5rem] p-8 md:p-12 max-w-4xl mx-auto shadow-2xl ring-1 ring-white/5">
              <p className="text-lg md:text-xl leading-relaxed text-neutral-300 mb-8 font-light">
                Explore the breathtaking beauty of <strong className="text-white font-medium">Yala National Park</strong> with our expert-guided safari packages.
                Witness the park&apos;s rich biodiversity, including the elusive leopard and majestic elephants, in complete luxury.
              </p>

              {/* Feature Icons */}
              <div className="flex flex-wrap justify-center gap-10 md:gap-16 pt-4">
                <div className="group flex flex-col items-center gap-3">
                  <Shield className="text-green-500 w-6 h-6 drop-shadow-[0_0_10px_rgba(34,197,94,0.4)]" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 group-hover:text-white transition-colors">Secure</span>
                </div>
                <div className="group flex flex-col items-center gap-3">
                  <Compass className="text-green-500 w-6 h-6 drop-shadow-[0_0_10px_rgba(34,197,94,0.4)]" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 group-hover:text-white transition-colors">Expert</span>
                </div>
                <div className="group flex flex-col items-center gap-3">
                  <Map className="text-green-500 w-6 h-6 drop-shadow-[0_0_10px_rgba(34,197,94,0.4)]" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 group-hover:text-white transition-colors">Prime Zones</span>
                </div>
              </div>
            </div>
          </div>

          {/* PACKAGES LIST - Centered & Compact */}
          <div className="container max-w-7xl mx-auto">
            {loading ? (
              <div className="flex flex-wrap justify-center gap-8">
                {Array(3).fill(null).map((_, index) => (
                  <div key={index} className="w-full max-w-[340px] rounded-[2rem] bg-white/5 h-[450px] animate-pulse" />
                ))}
              </div>
            ) : error ? (
              <div className="text-center p-12 bg-red-500/10 rounded-3xl backdrop-blur-md mx-auto max-w-2xl">
                <p className="text-red-400 text-lg font-medium">System Error: {error}</p>
              </div>
            ) : packages.length > 0 ? (
              // ✅ FLEXBOX CENTERING: Perfectly centers items regardless of count
              <div className="flex flex-wrap justify-center gap-8">
                {packages.map((pkg) => (
                  // ✅ COMPACT CARD WRAPPER: max-w-[340px] makes them smaller/sleeker
                  <div key={pkg.id} className="w-full max-w-[340px] flex-shrink-0 transform hover:-translate-y-2 transition-transform duration-500">
                    <div className="h-full">
                      <PackageCard slug={pkg.slug} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-12 bg-white/5 rounded-3xl backdrop-blur-md mx-auto max-w-md">
                <p className="text-neutral-400 text-lg">No expeditions currently available.</p>
              </div>
            )}
          </div>

          {/* SEO Content (Hidden Visually) */}
          <div className="container max-w-7xl mx-auto mt-32 opacity-100  transition-opacity duration-500">
            <div className="text-center max-w-4xl mx-auto backdrop-blur-sm bg-black/20 rounded-3xl p-8">
              <AutoSEOWrapper
                pageTitle="Yala Safari Packages | Half Day, Full Day & Private Tours"
                pageDescription="Choose from half-day, full-day, and private Yala safari packages. All-inclusive tours with expert guides and luxury jeeps."
                pageType="package"
              >
                <div className="text-neutral-500 text-sm font-mono leading-relaxed">
                  <h2 className="text-green-500/50 text-xs font-bold uppercase mb-4 tracking-widest flex items-center justify-center gap-2">
                    <Star size={12} /> Expedition Notes
                  </h2>
                  <div className="space-y-4">
                    <p>
                      Explore our carefully curated Yala National Park safari packages designed to
                      suit every travelers needs and budget. From budget-friendly half-day excursions
                      to luxury full-day expeditions, we offer the best safari experiences in Sri Lanka.
                    </p>
                    <p>
                      Our half-day safari package is perfect for travelers with limited time. Departing
                      at dawn or afternoon, this 4-hour adventure takes you deep into Block 1 of Yala
                      National Park. Witness leopards, elephants, crocodiles, and exotic birds in their
                      natural habitat with our expert naturalist guides.
                    </p>
                    <p>
                      For the ultimate experience, choose our full-day safari package covering multiple
                      zones of the national park. This 8-10 hour comprehensive tour maximizes your
                      wildlife encounter opportunities. Includes breakfast, packed lunch, expert guide,
                      and premium wildlife photography support.
                    </p>
                  </div>
                </div>
              </AutoSEOWrapper>
            </div>
          </div>

        </section>
      </div>
    </>
  );
}