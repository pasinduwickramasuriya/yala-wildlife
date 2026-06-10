"use client";

import { AutoSEOWrapper } from "@/components/AutoSEOWrapper";
import DiscountPopup from "@/components/DiscountPopup";
import HeroSlider from "@/components/HeroSlider";
import PackageCard from "@/components/PackageCard";
import ReviewFeed from "@/components/ReviewFeed";
import WhyChooseUs from "@/components/WhyChooseUs";
import dynamic from "next/dynamic";

const GallerySection = dynamic(() => import("@/components/GallerySection"), { ssr: false });
const HomeBlogSection = dynamic(() => import("@/components/HomeBlogSection"), { ssr: false });
const MemoryGallery = dynamic(() => import("@/components/MemoryGallery"), { ssr: false });
const ModernReviews = dynamic(() => import("@/components/ModernReviews"), { ssr: false });
const PhotoGallery = dynamic(() => import("@/components/PhotoGallery"), { ssr: false });
const ReviewSlider = dynamic(() => import("@/components/ReviewSlider"), { ssr: false });
const YalaMapExplorer = dynamic(() => import("@/components/YalaMapExplorer"), { ssr: false });

interface Package {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price?: number;
  imageUrl?: string;
}

export default function ClientHome({ initialPackages = [] }: { initialPackages?: Package[] }) {
  const packages = initialPackages;

  return (
    <>
      <HeroSlider />
      <ReviewFeed />

      <div className="max-w-[1440px] mx-auto px-10 md:px-24 lg:px-48 py-16 overflow-hidden z-10 relative">

        {/* --- 1. TITLE ISLAND --- */}
        <div className="flex flex-col items-center justify-center w-full mb-10 animate-in fade-in zoom-in duration-1000">

          {/* 1. PETITE SIGNAL BADGE (15px Text) */}
          <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-black/80  rounded-full mb-3 shadow-xl">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff00] animate-pulse shadow-[0_0_8px_#00ff00]"></span>
            <span className="text-[15px] font-black  tracking-[0.2em] text-[#00ff00] leading-none">
              Safari   Packages
            </span>
          </div>

        </div>

        {/* --- 2. GRID TRACK --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-8 lg:gap-10">
          {packages.map((pkg) => (
            <div key={pkg.id} className="flex justify-center">
              <PackageCard slug={pkg.slug} />
            </div>
          ))}
        </div>

      </div>

      <YalaMapExplorer />
      <HomeBlogSection />
      <MemoryGallery />
      <ModernReviews />
      <PhotoGallery />
      <WhyChooseUs />
      <GallerySection />
      <ReviewSlider />
      <DiscountPopup />

      <AutoSEOWrapper
        pageTitle="Yala Safari Tours | #1 Wildlife Experience Sri Lanka"
        pageDescription="Premium Yala National Park safari tours. Expert guides, guaranteed leopard sightings, luxury jeeps."
        pageType="home"
      >
        <section className="mt-16 flex flex-col items-center gap-2 animate-in slide-in-from-bottom duration-1000 ease-out selection:bg-[#00ff00] selection:text-black">

          <div className="inline-block bg-black/80 px-4 py-1.5 rounded-full shadow-2xl">
            <h1 className="text-[15px] font-black text-white uppercase tracking-[0.2em]">
              Yala Wildlife
            </h1>
          </div>

          <div className="inline-block bg-black/80 px-6 py-4 rounded-2xl max-w-[850px] text-center shadow-2xl">
            <p className="text-[15px] text-white/80 font-medium leading-relaxed italic">
              "Welcome to Yala Wildlife Safari Your gateway to unforgettable wildlife experiences in Sri Lanka's premier national park. Our expert guides ensure safe adventures with guaranteed leopard sightings."
            </p>
          </div>

          <div className="inline-block bg-black/80 px-6 py-4 rounded-2xl max-w-[850px] text-center shadow-2xl">
            <p className="text-[15px] text-white/80 font-medium leading-relaxed italic">
              "Discover the magic of Yala National Park with our premium safari packages. Experience the thrill of spotting elusive leopards, majestic elephants, and over 200 species of birds in their natural habitat."
            </p>
          </div>

          <div className="inline-block bg-black/80 px-6 py-4 rounded-2xl max-w-[850px] text-center shadow-2xl">
            <p className="text-[15px] text-white/80 font-medium leading-relaxed italic">
              "Yala boasts the highest leopard density in the world. Our professional guides know the best routes and times for spotting. We use luxury 4x4 jeeps equipped with safety features and optimal viewing configurations."
            </p>
          </div>
        </section>
      </AutoSEOWrapper>
    </>
  );
}
