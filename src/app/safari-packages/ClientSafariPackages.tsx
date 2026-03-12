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
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00ff00]/10 backdrop-blur-md mb-8 shadow-[0_0_15px_rgba(34,197,94,0.2)]">
              <span className="w-2 h-2 rounded-full bg-[#00ff00] animate-pulse"></span>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#00ff00] font-bold">Premium Expeditions</span>
            </div>


            <h1 className="flex flex-col items-center gap-3 mb-12 selection:bg-[#00ff00] selection:text-black">
              {/* YALA SEGMENT */}
              <div className="inline-block bg-black/60 px-6 py-2 rounded-full border border-white/5 backdrop-blur-md shadow-2xl">
                <span className="text-2xl md:text-2xl font-black text-white uppercase tracking-[-0.05em] leading-none">
                  Yala
                </span>
              </div>

              {/* SAFARI PACKAGES SEGMENT */}
              <div className="inline-block bg-black/60 px-6 py-2 rounded-full ">
                <span className="text-2xl md:text-2xl font-black text-[#00ff00] uppercase tracking-[-0.05em] leading-none">
                  Safari&nbsp;&nbsp;&nbsp;Packages
                </span>
              </div>
            </h1>



            <div className="flex flex-col items-center gap-3 max-w-5xl mx-auto px-4 mb-16">

              {/* BLOCK_01: PRIMARY_DATA */}
              <div className="inline-block bg-black/60 px-5 py-2 rounded-full">
                <p className="text-[12px] md:text-[12px] text-white font-black tracking-[0.2em] leading-none">
                  Explore the breathtaking beauty of Yala National Park with our expert-guided safari packages.
                </p>
              </div>

              {/* BLOCK_02: SECONDARY_DATA */}
              <div className="inline-block bg-black/60 px-5 py-2 rounded-full ">
                <p className="text-[12px] md:text-[12px] text-white font-black tracking-[0.2em] leading-none">
                  Witness the park&apos;s rich biodiversity, including elusive leopards and majestic elephants.
                </p>
              </div>

              {/* DATA_BLOCK_04: TECHNICAL_INSIGHT */}
              <div className="inline-block bg-black/60 px-5 py-2 rounded-full ">
                <p className="text-[12px] md:text-[12px] text-white font-black  tracking-[0.2em] leading-none">
                  Apex predator surveillance and habitat monitoring protocols managed by senior field guides.
                </p>
              </div>

              {/* FEATURE_PILLS */}
              <div className="flex flex-wrap justify-center gap-2 pt-4">

                {/* PILL_01 */}
                <div className="group flex items-center gap-2 bg-black/70 px-4 py-1.5 rounded-full">
                  <Shield className="text-[#00ff00] w-5 h-5 drop-shadow-[0_0_8px_#00ff00]" />
                  <span className="text-[12px] font-black uppercase tracking-[0.3em] text-white/70">
                    SECURE PROTOCOL
                  </span>
                </div>

                {/* PILL_02 */}
                <div className="group flex items-center gap-2 bg-black/70 px-4 py-1.5 rounded-full">
                  <Compass className="text-[#00ff00] w-5 h-5 drop-shadow-[0_0_8px_#00ff00]" />
                  <span className="text-[12px] font-black uppercase tracking-[0.3em] text-white/70">
                    EXPERT GUIDE
                  </span>
                </div>

                {/* PILL_03 */}
                <div className="group flex items-center gap-2 bg-black/70 px-4 py-1.5 rounded-full">
                  <Map className="text-[#00ff00] w-5 h-5 drop-shadow-[0_0_8px_#00ff00]" />
                  <span className="text-[12px] font-black uppercase tracking-[0.3em] text-white/70">
                    PRIME ZONES
                  </span>
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
          {/* <div className="container max-w-7xl mx-auto mt-32 opacity-100  transition-opacity duration-500">
            <div className="text-center max-w-4xl mx-auto backdrop-blur-sm bg-black/20 rounded-3xl p-8">
              <AutoSEOWrapper
                pageTitle="Yala Safari Packages | Half Day, Full Day & Private Tours"
                pageDescription="Choose from half-day, full-day, and private Yala safari packages. All-inclusive tours with expert guides and luxury jeeps."
                pageType="package"
              >
                <div className="text-neutral-500 text-sm font-mono leading-relaxed">
                  <h2 className="text-green-500 text-xs font-bold uppercase mb-4 tracking-widest flex items-center justify-center gap-2">
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
          </div> */}
          <div className="flex flex-col items-center gap-3 max-w-6xl mx-auto px-4 mt-20 mb-24 selection:bg-[#00ff00] selection:text-black">

            {/* PROTOCOL_HEADER */}
            <div className="inline-block bg-black/70 px-4 py-1.5 rounded-full mb-2">
              <h2 className="text-[12px] md:text-[12px] font-black text-[#00ff00]  tracking-[0.5em] flex items-center gap-2">
                <Star size={10} className="animate-pulse" /> Expedition Intelligence Notes
              </h2>
            </div>

            {/* MISSION_OVERVIEW_STRIP */}
            <div className="inline-block bg-black/60 px-5 py-2 rounded-full">
              <p className="text-[12px] md:text-[12px] text-white font-black tracking-[0.15em] leading-none">
                Explore curated Yala National Park safari packages designed for mission-specific traveler requirements and budgets.
              </p>
            </div>

            {/* SECTOR_01: HALF_DAY_LOG */}
            <div className="inline-block bg-black/60 px-5 py-2 rounded-full">
              <p className="text-[12px] md:text-[12px] text-white font-black tracking-[0.15em] leading-none">
                Half-day excursions: 4-hour deep-penetration missions into Block 1. Witness leopards and elephants with expert naturalist guides.
              </p>
            </div>

            {/* SECTOR_02: FULL_DAY_LOG */}
            <div className="inline-block bg-black/60 px-5 py-2 rounded-full ">
              <p className="text-[12px] md:text-[12px] text-white font-black tracking-[0.15em] leading-none">
                Full-day expeditions: 10-hour comprehensive multi-zone coverage. Includes premium photography support and tactical logistics.
              </p>
            </div>

            {/* OPERATIONAL_TRUST_STRIPS */}
            <div className="flex flex-wrap justify-center gap-2 pt-4">
              {[
                "SLTDA_LICENSED_OPERATOR",
                "CERTIFIED_NATURALIST_INTELLIGENCE",
                "ALL_INCLUSIVE_EXPEDITION_LOGISTICS",
                "PREMIUM_WILDLIFE_PHOTOGRAPHY_SUPPORT"
              ].map((status, i) => (
                <div key={i} className="bg-black/80 px-4 py-1.5 rounded-full">
                  <span className="text-[7px] md:text-[9px] font-black uppercase tracking-[0.3em] text-neutral-400">
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