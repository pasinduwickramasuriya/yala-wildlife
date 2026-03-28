"use client";

import { AutoSEOWrapper } from "@/components/AutoSEOWrapper";
import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";
import PackageCard from "@/components/PackageCard";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const GallerySection = dynamic(() => import("@/components/GallerySection"), { ssr: false });
const HomeBlogSection = dynamic(() => import("@/components/HomeBlogSection"), { ssr: false });
const MemoryGallery = dynamic(() => import("@/components/MemoryGallery"), { ssr: false });
const ModernReviews = dynamic(() => import("@/components/ModernReviews"), { ssr: false });
const PhotoGallery = dynamic(() => import("@/components/PhotoGallery"), { ssr: false });
const ReviewSlider = dynamic(() => import("@/components/ReviewSlider"), { ssr: false });
const WhyChooseUs = dynamic(() => import("@/components/WhyChooseUs"), { ssr: false });
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
  // We no longer fetch on mount, just use the server-provided packages.
  // This drastically reduces waterfall requests and main-thread blockage on load.
  const packages = initialPackages;

  // Defer below-the-fold heavy components to free up the main thread
  // during the critical initial load & hero animation phase.
  const [mountHeavy, setMountHeavy] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setMountHeavy(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Header />

      <HeroSlider />
      <div className="container mx-auto px-4 py-8 overflow-hidden z-10 relative">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          className="text-3xl font-bold mb-6 text-lime-400 px-6 py-3 rounded-3xl bg-black/70 mx-auto w-fit text-center">
          Our Safari Packages
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg, idx) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: idx * 0.15, ease: [0.25, 1, 0.5, 1] }}
            >
              <PackageCard slug={pkg.slug} />
            </motion.div>
          ))}
        </div>
      </div>
      {mountHeavy ? (
        <>
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
        </>
      ) : (
        <div className="h-screen w-full" /> // Placeholder to maintain scroll height
      )}
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
