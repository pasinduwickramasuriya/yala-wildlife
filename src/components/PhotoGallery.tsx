"use client";

import Image from "next/image";
import { useState, useEffect, memo, useCallback } from "react";
import { ArrowUpRight, Camera, X } from "lucide-react";

interface Photo {
  id: number | string;
  title: string;
  content: string;
  imageUrl: string;
  slug?: string;
}

const FALLBACK_PHOTOS: Photo[] = [
  {
    id: 1,
    title: "Elusive Leopard on Granite Rock",
    content: "Spotting a Sri Lankan leopard basking on Patanangala rock in Yala Block 1.",
    imageUrl: "/uploads/yala1.webp",
  },
  {
    id: 2,
    title: "Elephant Herd by Menik River",
    content: "Wild Asian elephants gathering along the banks of the Menik River at sunset.",
    imageUrl: "/uploads/yala2.webp",
  },
  {
    id: 3,
    title: "Sloth Bear Foraging",
    content: "Rare sighting of a sloth bear searching for termites in dry scrub jungle.",
    imageUrl:
      "https://images.unsplash.com/photo-1547970810-dc92b3848368?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Painted Storks at Lagoon",
    content: "Vibrant birdlife wading in the saline coastal lagoons of Yala National Park.",
    imageUrl:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function AppleCuteGallery({ initialPhotos }: { initialPhotos?: Photo[] }) {
  const [displayPhotos, setDisplayPhotos] = useState<Photo[]>(
    initialPhotos && initialPhotos.length > 0 ? initialPhotos.slice(0, 5) : FALLBACK_PHOTOS
  );
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  // Lazy-load API data on idle frame to prevent blocking main thread & initial paint
  useEffect(() => {
    if (initialPhotos && initialPhotos.length > 0) {
      const shuffled = [...initialPhotos].sort(() => 0.5 - Math.random()).slice(0, 5);
      setDisplayPhotos(shuffled);
      return;
    }

    let isMounted = true;
    const fetchPhotos = async () => {
      try {
        const response = await fetch("/api/blogs/featured");
        if (response.ok) {
          const data = await response.json();
          if (isMounted && Array.isArray(data) && data.length > 0) {
            const shuffled = [...data].sort(() => 0.5 - Math.random());
            setDisplayPhotos(shuffled.slice(0, 5));
          }
        }
      } catch (error) {
        console.warn("Gallery sync notice (using fallback data):", error);
      }
    };

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      const idleId = (window as Window).requestIdleCallback(() => fetchPhotos());
      return () => {
        isMounted = false;
        (window as Window).cancelIdleCallback(idleId);
      };
    } else {
      const timeoutId = setTimeout(fetchPhotos, 200);
      return () => {
        isMounted = false;
        clearTimeout(timeoutId);
      };
    }
  }, [initialPhotos]);

  const handleSelectPhoto = useCallback((photo: Photo) => {
    setSelectedPhoto(photo);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedPhoto(null);
  }, []);

  return (
    <section
      className="relative w-full py-16 sm:py-24 px-4 sm:px-8 md:px-12 selection:bg-[#00ff00] selection:text-black [content-visibility:auto] [contain-intrinsic-size:1px_800px]"
      style={{
        fontFamily:
          '"Google Sans", "Open Sans", Roboto, -apple-system, BlinkMacSystemFont, Arial, sans-serif',
      }}
    >
      <div className="max-w-[1300px] mx-auto">
        {/* --- GOOGLE CENTERED TITLE & HEADLINE (BORDERLESS) --- */}
        <div className="flex flex-col items-center justify-center text-center mb-14">
          <h2 className="text-3xl sm:text-5xl font-bold text-black tracking-tight leading-[1.15]">
            Moments From The Wilderness
          </h2>
          <p className="mt-3 text-[18px] text-black leading-relaxed font-semibold max-w-5xl">
            Explore fascinating wildlife stories and expert photography tips curated by our expert guides. We specialize in conservation insights and technical field analysis to preserve the wild heart of Sri Lanka through transparent reporting and sustainable methodology
          </p>
        </div>

        {/* --- BORDERLESS GPU-ACCELERATED BENTO GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-5 h-auto md:h-[760px]">
          {/* Card 1: Main Hero */}
          <div className="h-[340px] sm:h-[420px] md:h-auto md:col-span-8 md:row-span-2 relative overflow-hidden rounded-[2.5rem] bg-white p-3 [contain:strict] transform-gpu">
            <ImageCard photo={displayPhotos[0]} priority={true} onClick={handleSelectPhoto} />
          </div>

          {/* Card 2 */}
          <div className="h-[260px] md:h-auto md:col-span-4 md:row-span-1 relative overflow-hidden rounded-[2.5rem] bg-white p-3 [contain:strict] transform-gpu">
            <ImageCard photo={displayPhotos[1]} onClick={handleSelectPhoto} />
          </div>

          {/* Card 3 */}
          <div className="h-[260px] md:h-auto md:col-span-4 md:row-span-1 relative overflow-hidden rounded-[2.5rem] bg-white p-3 [contain:strict] transform-gpu">
            <ImageCard photo={displayPhotos[2]} onClick={handleSelectPhoto} />
          </div>

          {/* Card 4 */}
          <div className="h-[260px] md:h-auto md:col-span-5 md:row-span-1 relative overflow-hidden rounded-[2.5rem] bg-white p-3 [contain:strict] transform-gpu">
            <ImageCard photo={displayPhotos[3]} onClick={handleSelectPhoto} />
          </div>

          {/* Card 5 */}
          <div className="h-[260px] md:h-auto md:col-span-7 md:row-span-1 relative overflow-hidden rounded-[2.5rem] bg-white p-3 [contain:strict] transform-gpu">
            <ImageCard photo={displayPhotos[4] || displayPhotos[0]} onClick={handleSelectPhoto} />
          </div>
        </div>
      </div>

      {/* --- ZERO-BLUR HIGH SPEED MODAL (NO BACKDROP-BLUR TO PREVENT OVERHEATING) --- */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-[100] bg-black/85 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150 transform-gpu"
          onClick={handleCloseModal}
        >
          <div
            className="relative w-full max-w-4xl bg-white rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row max-h-[90vh] [contain:paint]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image Section */}
            <div className="relative w-full md:flex-1 h-[280px] sm:h-[380px] md:h-auto bg-[#f1f3f4]">
              <Image
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.title}
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                quality={75}
                className="object-cover"
              />
            </div>

            {/* Modal Content Section */}
            <div className="w-full md:w-[360px] p-6 sm:p-8 flex flex-col justify-between bg-white overflow-y-auto">
              <div>
                <div className="inline-flex items-center gap-2 bg-[#f8f9fa] px-3.5 py-1.5 rounded-full mb-4">
                  <Camera size={14} className="text-[#000000]" />
                  <span className="text-[13px] font-bold text-[#000000] uppercase tracking-wider">
                    Capture Details
                  </span>
                </div>

                <h3 className="text-2xl font-bold tracking-tight text-[#000000] mb-3 leading-snug">
                  {selectedPhoto.title}
                </h3>
                <p className="text-[#3c4043] text-[18px] leading-relaxed font-normal">
                  {selectedPhoto.content}
                </p>
              </div>

              <div className="mt-8 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="w-full py-3.5 bg-[#00ff00] hover:bg-[#000000] text-black hover:text-white font-bold text-[18px] rounded-full transition-colors active:scale-95 cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>

            {/* Modal Close Button */}
            <button
              type="button"
              aria-label="Close Photo Modal"
              className="absolute top-4 right-4 text-black active:scale-95 bg-[#00ff00] rounded-full p-2 cursor-pointer"
              onClick={handleCloseModal}
            >
              <X size={20} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

const ImageCard = memo(function ImageCard({
  photo,
  onClick,
  priority = false,
}: {
  photo: Photo | null;
  onClick: (p: Photo) => void;
  priority?: boolean;
}) {
  if (!photo) {
    return <div className="w-full h-full bg-[#f8f9fa] rounded-[2rem]" />;
  }

  return (
    <div
      className="relative w-full h-full rounded-[2rem] overflow-hidden cursor-pointer bg-[#f1f3f4] group transform-gpu will-change-transform"
      onClick={() => onClick(photo)}
    >
      <Image
        src={photo.imageUrl}
        alt={photo.title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        quality={75}
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300 pointer-events-none" />

      {/* Bottom Anchored Overlay Info */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end pointer-events-none">
        <div className="flex items-end justify-between gap-3 w-full">
          <h3 className="text-[16px] font-bold tracking-tight text-white leading-tight">
            {photo.title}
          </h3>

          <div className="h-10 w-10 rounded-full bg-white text-black flex items-center justify-center shrink-0 group-hover:bg-[#00ff00] transition-colors duration-200">
            <ArrowUpRight size={18} className="stroke-[2.5]" />
          </div>
        </div>
      </div>
    </div>
  );
});
ImageCard.displayName = "ImageCard";