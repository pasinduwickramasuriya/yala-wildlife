"use client";

import { AutoSEOWrapper } from "@/components/AutoSEOWrapper";
// import ElfsightReviews from "@/components/ElfsightReviews";
// import FeaturableReviews from "@/components/FeaturableReviews";
import GallerySection from "@/components/GallerySection";
import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";
import HomeBlogSection from "@/components/HomeBlogSection";
import MemoryGallery from "@/components/MemoryGallery";
import ModernReviews from "@/components/ModernReviews";
import PackageCard from "@/components/PackageCard";
import PhotoGallery from "@/components/PhotoGallery";
import ReviewSlider from "@/components/ReviewSlider";
// import ReviewsSection from "@/components/ReviewsSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import YalaMapExplorer from "@/components/YalaMapExplorer";
import { useState, useEffect } from "react";

interface Package {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price?: number;
  imageUrl?: string;
}

export default function ClientHome() {
  const [packages, setPackages] = useState<Package[]>([]);

  useEffect(() => {
    const fetchPackages = async () => {
      const response = await fetch("/api/package", { cache: "no-store" });
      if (response.ok) {
        setPackages(await response.json());
      }
    };
    fetchPackages();
  }, []);

  return (
    <>
      <Header />

      <HeroSlider />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-lime-400 px-6 py-3 rounded-3xl bg-black/70 mx-auto w-fit text-center">
          Our Safari Packages
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} slug={pkg.slug} />
          ))}
        </div>
      </div>
      <YalaMapExplorer />
      <HomeBlogSection />
      <MemoryGallery />
      <ModernReviews />
      {/* <ElfsightReviews /> */}
      <PhotoGallery />
      {/* <ReviewsSection /> */}

      <WhyChooseUs />
      <GallerySection />

      {/* <FeaturableReviews/> */}
      <ReviewSlider />
      <AutoSEOWrapper
        pageTitle="Yala Safari Tours | #1 Wildlife Experience Sri Lanka"
        pageDescription="Premium Yala National Park safari tours. Expert guides, guaranteed leopard sightings, luxury jeeps."
        pageType="home"
      >
        <div className="container mx-auto px-4 py-12 text-center space-y-1">
          {/* Main Title */}
          <h1 className="text-[#00ff00] text-xl md:text-2
          xl  mb-8   inline-block bg-black/70 rounded-full px-6 py-3">
            Yala Wildlife Safari
          </h1>

          {/* Block 01 */}
          <div className="inline-block bg-black/70  px-6 py-3 rounded-full">
            <p className="text-white text-[13px] md:text-sm leading-relaxed tracking-tight font-light">
              Welcome to **Yala Wildlife Safari** - Your gateway to unforgettable wildlife
              experiences in Sri Lankas premier national park. Our expert guides ensure
              safe adventures with guaranteed leopard sightings.
            </p>
          </div>

          {/* Block 02 */}
          <div className="inline-block bg-black/70 px-6 py-3 rounded-full">
            <p className="text-white text-[13px] md:text-sm leading-relaxed tracking-tight font-light">
              Discover the magic of **Yala National Park** with our premium safari packages.
              Experience the thrill of spotting elusive leopards, majestic elephants, and
              over 200 species of birds in their natural habitat. Book your adventure today!
            </p>
          </div>

          {/* Block 03 */}
          <div className="inline-block bg-black/70  px-6 py-3 rounded-full">
            <p className="text-white text-[13px] md:text-sm leading-relaxed tracking-tight font-light">
              Yala boasts the **highest leopard density** in the world. Our professional guides
              know the best routes and times for wildlife spotting. We use luxury 4x4 jeeps
              equipped with safety features and optimal viewing configurations.
            </p>
          </div>
        </div>
      </AutoSEOWrapper>

    </>
  );
}
