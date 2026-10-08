"use client";

import { useState, useCallback, memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Memory {
  id: number;
  title: string;
  desc: string;
  tag: string;
  heroImage: string;
  linkText: string;
  href: string;
}

const MEMORIES: readonly Memory[] = [
  {
    id: 1,
    title: "Discover the Elusive Leopards of Yala",
    desc: "Yala National Park is world-renowned for having one of the highest leopard densities on the planet. Our experienced trackers specialize in locating the elusive Panthera pardus kotiya across the iconic granite outcrops of Block 1.",
    tag: "Yala Leopard Sightings",
    heroImage: "/uploads/yala.jpeg",
    linkText: "Read field story",
    href: "/blog",
  },
  {
    id: 2,
    title: "Encounter Ancient Elephant Herds",
    desc: "Witness majestic Asian elephant herds as they migrate towards ancient water reservoirs. These gentle giants are the heart of the dry zone ecosystem, often seen moving in large family groups with experienced matriarchs.",
    tag: "Menik River Corridors",
    heroImage: "/uploads/yala1.webp",
    linkText: "Read field story",
    href: "/blog",
  },
  {
    id: 3,
    title: "Expedition-Grade Custom 4x4 Fleet",
    desc: "Our safari experience is defined by our equipment. We utilize custom-modified 4x4 Toyota Hilux jeeps featuring elevated stadium seating for 360-degree views, photography beanbag mounts, and heavy-duty suspension.",
    tag: "4x4 Hilux Safari Fleet",
    heroImage: "/uploads/yala2.webp",
    linkText: "Read field story",
    href: "/blog",
  },
];

const SlideCard = memo(function SlideCard({ current }: { current: Memory }) {
  return (
    <div className="relative w-full bg-white rounded-[3.25rem] p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14 overflow-hidden [contain:paint] transform-gpu">
      {/* Left Column: Editorial Content */}
      <div className="flex-1 flex flex-col items-center text-center lg:items-start lg:text-left max-w-lg z-10 bg-white">
        <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-bold text-[#1f1f1f] tracking-tight leading-[1.12] mb-5">
          {current.title}
        </h2>

        <p className="text-[18px] text-[#444746] leading-relaxed font-semibold mb-8 max-w-md">
          {current.desc}
        </p>

        <Link
          href={current.href}
          prefetch={false}
          className="inline-flex items-center justify-center bg-[#000000] hover:bg-[#00ff00] text-white hover:text-black rounded-full px-8 py-3.5 text-[18px] font-bold tracking-wide transition-colors duration-150 active:scale-95 cursor-pointer shadow-none"
        >
          {current.linkText}
        </Link>
      </div>

      {/* Right Column: Centered Image Wrapper for Mobile */}
      <div className="relative w-full lg:w-[620px] h-[300px] xs:h-[340px] sm:h-[400px] lg:h-[450px] flex items-center justify-center shrink-0 bg-white [contain:strict]">
        {/* Rounded Canvas Frame */}
        <div className="relative lg:absolute lg:right-0 top-0 bottom-0 w-full sm:w-[90%] lg:w-[80%] h-full rounded-[2.5rem] overflow-hidden bg-white [contain:strict]">
          <Image
            src={current.heroImage}
            alt={current.title}
            fill
            sizes="(max-width: 1024px) 100vw, 520px"
            quality={60}
            loading="lazy"
            decoding="async"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/10 pointer-events-none" />
        </div>
      </div>
    </div>
  );
});
SlideCard.displayName = "SlideCard";

export default function GoogleMemoriesShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? MEMORIES.length - 1 : prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev === MEMORIES.length - 1 ? 0 : prev + 1));
  }, []);

  return (
    <section
      className="w-full bg-white text-[#1f1f1f] py-16 sm:py-24 selection:bg-[#00ff00] selection:text-black [content-visibility:auto] [contain-intrinsic-size:1px_750px]"
      style={{
        fontFamily:
          '"Google Sans", "Open Sans", Roboto, -apple-system, BlinkMacSystemFont, Arial, sans-serif',
      }}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 bg-white">
        {/* Main Google Merchant Style Slide Card */}
        <SlideCard current={MEMORIES[activeIndex]} />

        {/* Carousel Navigation Bottom Controls (Centered on Mobile & Desktop) */}
        <div className="w-full mt-6 px-4 flex items-center justify-center bg-white">
          {/* Centered Prev / Next Arrow Buttons */}
          <div className="flex items-center gap-3 bg-white">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous Highlight"
              className="w-12 h-12 rounded-full bg-white hover:bg-[#f8f9fa] text-[#444746] flex items-center justify-center transition-colors duration-150 cursor-pointer shadow-xs active:scale-95"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next Highlight"
              className="w-12 h-12 rounded-full bg-[#00ff00] hover:bg-[#00ff00] text-[#444746] flex items-center justify-center transition-colors duration-150 cursor-pointer shadow-xs active:scale-95"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}