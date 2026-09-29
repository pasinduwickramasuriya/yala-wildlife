"use client";

import React, { memo } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface GalleryImage {
  id: number;
  url: string;
  title: string;
  location: string;
  gridClass: string;
}

// Cloudinary URL auto-optimization: f_auto (AVIF/WebP), q_auto:eco, low bandwidth friendly
const optimizeCloudinary = (url: string, width: number) => {
  return url.replace("/upload/", `/upload/f_auto,q_auto:eco,w_${width},c_limit/`);
};

const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: 1,
    url: "https://res.cloudinary.com/dkfnpmzpv/image/upload/v1784789489/blogs/cey5tcc2jkxwzj4kd9dc.jpg",
    title: "leopards Of Yala",
    location: "Yala Block 1",
    gridClass: "md:col-span-2 md:row-span-2",
  },
  {
    id: 2,
    url: "https://res.cloudinary.com/dkfnpmzpv/image/upload/v1786355872/blogs/amvi8vrath9rtjzrk01m.jpg",
    title: "Gentle Giants",
    location: "Elephant Rock",
    gridClass: "md:col-span-1 md:row-span-1",
  },
  {
    id: 3,
    url: "https://res.cloudinary.com/dkfnpmzpv/image/upload/v1767588167/blogs/wblxwqyj0xbumohdvqpz.jpg",
    title: "Golden Hour",
    location: "Yala National Park",
    gridClass: "md:col-span-1 md:row-span-1",
  },
  {
    id: 4,
    url: "https://res.cloudinary.com/dkfnpmzpv/image/upload/v1777690831/blogs/ituwsxwpjiy93mlmmctx.jpg",
    title: "Safari Vibes",
    location: "Palatupana",
    gridClass: "md:col-span-2 md:row-span-1",
  },
];

const GalleryCard = memo(function GalleryCard({
  image,
  index,
}: {
  image: GalleryImage;
  index: number;
}) {
  const isLarge = index === 0 || index === 3;
  const targetWidth = isLarge ? 800 : 500;
  const optimizedUrl = optimizeCloudinary(image.url, targetWidth);

  return (
    <div
      className={`group relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-[#1a1c1e] cursor-pointer [contain:strict] transform-gpu will-change-transform ${image.gridClass}`}
    >
      <Image
        src={optimizedUrl}
        alt={image.title}
        fill
        loading="lazy"
        decoding="async"
        sizes={
          isLarge
            ? "(max-width: 768px) 100vw, 66vw"
            : "(max-width: 768px) 100vw, 33vw"
        }
        quality={65}
        className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
      />

      {/* Static linear gradient with zero compositing lag */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

      {/* Static bottom layout without hover translateY recalculations */}
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 flex items-end justify-between gap-3 pointer-events-none">
        <div className="min-w-0">
          <span className="text-[14px] font-semibold text-white tracking-tight block truncate mb-1">
            {image.location}
          </span>
          <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white leading-tight truncate">
            {image.title}
          </h3>
        </div>

        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white text-black flex items-center justify-center shrink-0 group-hover:bg-[#00ff00] transition-colors duration-150">
          <ArrowUpRight size={18} className="stroke-[2.5]" />
        </div>
      </div>
    </div>
  );
});
GalleryCard.displayName = "GalleryCard";

export default function GallerySection() {
  return (
    <section
      className="w-full py-16 sm:py-24 px-4 sm:px-8 md:px-12 selection:bg-[#00ff00] selection:text-black [content-visibility:auto] [contain-intrinsic-size:1px_750px]"
      style={{
        fontFamily:
          '"Google Sans", "Open Sans", Roboto, -apple-system, BlinkMacSystemFont, Arial, sans-serif',
      }}
    >
      <div className="max-w-[1300px] mx-auto">
        {/* --- GOOGLE CENTERED HEADLINE --- */}
        <div className="flex flex-col items-center justify-center text-center mb-12 sm:mb-14">
          <h2 className="text-3xl sm:text-5xl font-bold text-black tracking-tight leading-[1.15]">
            Into The Wild
          </h2>
          <p className="mt-3 text-[17px] sm:text-[18px] text-black leading-relaxed font-semibold max-w-2xl">
            Experience the untold stories of Yala through our lens. Every snapshot is an authentic memory captured in the wild.
          </p>
        </div>

        {/* --- GPU-FRIENDLY BENTO GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 auto-rows-[240px] sm:auto-rows-[280px]">
          {GALLERY_IMAGES.map((image, idx) => (
            <GalleryCard key={image.id} image={image} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}