"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import PackageCard from "@/components/PackageCard";
import { OrganizationJsonLd, LocalBusinessJsonLd } from "@/components/JsonLd";
import { FAQJsonLd, defaultFAQs } from "@/components/FAQJsonLd";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { SafariPackageJsonLd } from "@/components/SafariPackageJsonLd";
import { AutoSEOWrapper } from "@/components/AutoSEOWrapper";
import { Compass, Map, Shield, Star, Sparkles } from "lucide-react";
import AdvancePaymentButton from "@/components/AdvancePaymentButton";
// import AdUnit from "@/components/AdUnit";

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
            {/* Badge
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00ff00]/10 backdrop-blur-md mb-8 shadow-[0_0_15px_rgba(0,255,0,0.15)]">
              <span className="w-2 h-2 rounded-full bg-[#00ff00] animate-pulse"></span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#00ff00]">Premium Expeditions</span>
            </div> */}


            <h1 className="flex justify-center items-center mb-10 selection:bg-[#00ff00] selection:text-black">
              <div className="inline-block bg-black/80 px-6 py-2.5 rounded-full backdrop-blur-md shadow-2xl">
                <span className="text-[15px] sm:text-base font-bold text-white tracking-wider leading-snug">
                  Yala Safari Packages
                </span>
              </div>
            </h1>



            <div className="flex flex-col items-center gap-1.5 max-w-5xl mx-auto px-4 mb-16">

              {/* BLOCK_01: PRIMARY_DATA */}
              <div className="inline-block bg-black/80 px-6 py-1.5 rounded-full backdrop-blur-md shadow-xl">
                <p className="text-[13px] md:text-[13px] text-white font-medium tracking-wide leading-snug text-center">
                  Explore the breathtaking beauty of Yala National Park with our expert-guided safari packages.
                </p>
              </div>

              {/* BLOCK_02: SECONDARY_DATA */}
              <div className="inline-block bg-black/80 px-6 py-1.5 rounded-full backdrop-blur-md shadow-xl">
                <p className="text-[13px] md:text-[13px] text-white font-medium tracking-wide leading-snug text-center">
                  Witness the park&apos;s rich biodiversity, including elusive leopards and majestic elephants.
                </p>
              </div>

              {/* DATA_BLOCK_04: TECHNICAL_INSIGHT */}
              <div className="inline-block bg-black/80 px-6 py-1.5 rounded-full backdrop-blur-md shadow-xl">
                <p className="text-[13px] md:text-[13px] text-white font-medium tracking-wide leading-snug text-center">
                  Apex predator surveillance and habitat monitoring protocols managed by senior field guides.
                </p>
              </div>

              {/* FEATURE_PILLS */}
              <div className="flex flex-wrap justify-center gap-3 pt-4 mb-10">

                {/* PILL_01 */}
                <div className="group flex items-center gap-2 bg-black/80 px-4 py-2 rounded-full backdrop-blur-md shadow-lg">
                  <Shield className="text-[#00ff00] w-4 h-4 drop-shadow-[0_0_6px_#00ff00]" />
                  <span className="text-[12px] font-bold uppercase tracking-wider text-white">
                    SECURE PROTOCOL
                  </span>
                </div>

                {/* PILL_02 */}
                <div className="group flex items-center gap-2 bg-black/80 px-4 py-2 rounded-full backdrop-blur-md shadow-lg">
                  <Compass className="text-[#00ff00] w-4 h-4 drop-shadow-[0_0_6px_#00ff00]" />
                  <span className="text-[12px] font-bold uppercase tracking-wider text-white">
                    EXPERT GUIDE
                  </span>
                </div>

                {/* PILL_03 */}
                <div className="group flex items-center gap-2 bg-black/80 px-4 py-2 rounded-full backdrop-blur-md shadow-lg">
                  <Map className="text-[#00ff00] w-4 h-4 drop-shadow-[0_0_6px_#00ff00]" />
                  <span className="text-[12px] font-bold uppercase tracking-wider text-white">
                    PRIME ZONES
                  </span>
                </div>

              </div>

              {/* ADVANCE PAYMENT STRIP */}
              <div className="flex flex-col items-center justify-center gap-4 animate-in slide-in-from-bottom duration-700">

                {/* 1. Heading Pill */}
                <div className="inline-block bg-black/80 px-6 py-2 rounded-full backdrop-blur-md shadow-md">
                  <h3 className="text-[#00ff00] font-bold tracking-wider text-[10px] sm:text-xs">
                    Custom Expeditions Only
                  </h3>
                </div>

                {/* 2. Description Pill */}
                <div className="inline-block bg-black/80 px-8 py-3.5 rounded-full max-w-sm shadow-xl">
                  <p className="text-white text-[11px] sm:text-xs font-normal leading-relaxed text-center">
                    Have a pre-arranged custom expedition with our team? <br />
                    Secure your booking directly right here.
                  </p>
                </div>

                {/* 3. Button */}
                <div className="inline-block animate-pulse-slow">
                  <AdvancePaymentButton />
                </div>

              </div>
            </div>
          </div>

          {/* --- INTELLIGENCE TRACK: PACKAGES GRID --- */}
          <div className="max-w-[1440px] mx-auto px-6 md:px-24 lg:px-48 pb-20 relative z-10">

            {loading ? (
              /* --- SKELETON GRID --- */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                {Array(3).fill(null).map((_, i) => (
                  <div
                    key={i}
                    className="w-[280px] md:w-full aspect-[3/4] bg-black/80 rounded-[2.5rem] animate-pulse"
                  />
                ))}
              </div>
            ) : error ? (
              /* --- ERROR PILL --- */
              <div className="flex justify-center">
                <div className="bg-black/80 px-6 py-3 rounded-2xl shadow-2xl">
                  <p className="text-red-400 text-[10px] font-bold uppercase tracking-widest leading-none flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-red-500 animate-ping"></span>
                    System Error: {error}
                  </p>
                </div>
              </div>
            ) : packages.length > 0 ? (
              /* --- THE GRID: 3-Col Desktop | Petite Mobile --- */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 lg:gap-x-10 justify-items-center">
                {packages.map((pkg) => (
                  <div
                    key={pkg.id}
                    /* ✅ THE CUTTER FIX: Fixed 280px width on mobile, fills grid cell on desktop */
                    className="w-[280px] md:w-full max-w-[340px] transition-all duration-700 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <div className="h-full">
                      <PackageCard slug={pkg.slug} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* --- EMPTY DATA PILL --- */
              <div className="flex justify-center">
                <div className="bg-black/80 px-10 py-5 rounded-full shadow-2xl">
                  <p className="text-neutral-400 text-[9px] font-bold uppercase tracking-widest text-center italic">
                    No expeditions currently available.
                  </p>
                </div>
              </div>
            )}

          </div>

          {/* Ad unit after packages grid */}
          {/* <div className="max-w-5xl mx-auto px-4 pb-8">
            <AdUnit />
          </div> */}

          <div className="flex flex-col items-center gap-1.5 max-w-6xl mx-auto px-4 mt-20 mb-24 selection:bg-[#00ff00] selection:text-black">

            {/* PROTOCOL_HEADER */}
            <div className="inline-block bg-black/80 px-5 py-1.5 rounded-full backdrop-blur-md mb-1 shadow-md">
              <h2 className="text-[13px] md:text-[13px] font-bold text-[#00ff00] tracking-wider flex items-center gap-2">
                 Expedition Intelligence Notes
              </h2>
            </div>

            {/* MISSION_OVERVIEW_STRIP */}
            <div className="inline-block bg-black/80 px-6 py-1.5 rounded-full backdrop-blur-md shadow-xl">
              <p className="text-[13px] md:text-[13px] text-white font-medium tracking-wide leading-snug text-center">
                Explore curated Yala National Park safari packages designed for mission-specific traveler requirements and budgets.
              </p>
            </div>

            {/* SECTOR_01: HALF_DAY_LOG */}
            <div className="inline-block bg-black/80 px-6 py-1.5 rounded-full backdrop-blur-md shadow-xl">
              <p className="text-[13px] md:text-[13px] text-white font-medium tracking-wide leading-snug text-center">
                Half-day excursions: 4-hour deep-penetration missions into Block 1. Witness leopards and elephants with expert naturalist guides.
              </p>
            </div>

            {/* SECTOR_02: FULL_DAY_LOG */}
            <div className="inline-block bg-black/80 px-6 py-1.5 rounded-full backdrop-blur-md shadow-xl">
              <p className="text-[13px] md:text-[13px] text-white font-medium tracking-wide leading-snug text-center">
                Full-day expeditions: 10-hour comprehensive multi-zone coverage. Includes premium photography support and tactical logistics.
              </p>
            </div>

            {/* OPERATIONAL_TRUST_STRIPS */}
            <div className="flex flex-wrap justify-center gap-2 pt-4">
              {[
                "SLTDA LICENSED OPERATOR",
                "CERTIFIED NATURALIST INTELLIGENCE",
                "ALL INCLUSIVE EXPEDITION LOGISTICS",
                "PREMIUM WILDLIFE PHOTOGRAPHY SUPPORT"
              ].map((status, i) => (
                <div key={i} className="bg-black/80 px-4 py-1.5 rounded-full shadow-md">
                  <span className="text-[7px] md:text-[9px] font-semibold uppercase tracking-wider text-neutral-300">
                    {status}
                  </span>
                </div>
              ))}
            </div>

            {/* STEALTH_SEO_LAYER (Preserves your original Wrapper for Google) */}
            <div className="sr-only">
              <AutoSEOWrapper
                pageTitle="Yala Safari Packages | Half Day, Full Day & Private Tours"
                pageDescription="Choose from half-day, full-day, and private Yala safari packages. All-inclusive tours with expert guides and luxury jeeps."
                pageType="package"
              >
                <p>Explore our carefully curated Yala National Park safari packages designed to suit every travelers needs and budget. From budget-friendly half-day excursions to luxury full-day expeditions, we offer the best safari experiences in Sri Lanka.</p>
                <p>Our half-day safari package is perfect for travelers with limited time. Departing at dawn or afternoon, this 4-hour adventure takes you deep into Block 1 of Yala National Park. Witness leopards, elephants, crocodiles, and exotic birds in their natural habitat with our expert naturalist guides.</p>
              </AutoSEOWrapper>
            </div>
          </div>

        </section>
      </div>
    </>
  );
}