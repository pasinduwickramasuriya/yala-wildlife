/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useEffect, useMemo, useCallback, memo } from 'react';
import { X, ChevronLeft, ChevronRight, Plus, Camera, Star, Maximize2 } from 'lucide-react';

interface ReviewPhoto {
  reviewId: string;
  authorName: string;
  rating: number;
  relativeTime: string;
  reviewText: string;
  url: string;
  thumbnailUrl: string;
}

const INITIAL_FALLBACK_PHOTOS: ReviewPhoto[] = [
  {
    reviewId: "1",
    authorName: "Jc_Haaland",
    rating: 5,
    relativeTime: "Edited 18 hours ago",
    reviewText: "I recently visited Yala National Park, and it was an unforgettable wildlife adventure 🍂🐾",
    url: "https://lh3.googleusercontent.com/grass-cs/ANxoTn3iYrL-81ORrAUIE_DJFOnG7ukDe0yFvrmHIm5UbWvhf19CKSVjn8-NaJPHgnoi4yZjPXBBODnaTEuf_DhUZ29AkX842IGi0w576jyvQu-hQW1DIFsrONPLJmJfsZuKL5Rp2cnOOlum9rtN=w1200-h900",
    thumbnailUrl: "https://lh3.googleusercontent.com/grass-cs/ANxoTn3iYrL-81ORrAUIE_DJFOnG7ukDe0yFvrmHIm5UbWvhf19CKSVjn8-NaJPHgnoi4yZjPXBBODnaTEuf_DhUZ29AkX842IGi0w576jyvQu-hQW1DIFsrONPLJmJfsZuKL5Rp2cnOOlum9rtN=w200-h200-p-k-no"
  },
  {
    reviewId: "2",
    authorName: "יניב אבוחצירא",
    rating: 5,
    relativeTime: "2 days ago",
    reviewText: "Amazing park, real wild nature! A little hot, it's worth bringing water",
    url: "https://lh3.googleusercontent.com/grass-cs/ANxoTn0PK3VwCNtPHNp4auSx2WCt4TD_nSdTToDXOeC5VsiAc3CjBgBEFoicUhmBakWlcn4uvd8BIZFy06g0hKBOSJIPczc6JLOeGQyW9hvTM4V3L8Vt_R5bELc2x1jvTI8Uru36X2-BJCVvHUC0=w1200-h900",
    thumbnailUrl: "https://lh3.googleusercontent.com/grass-cs/ANxoTn0PK3VwCNtPHNp4auSx2WCt4TD_nSdTToDXOeC5VsiAc3CjBgBEFoicUhmBakWlcn4uvd8BIZFy06g0hKBOSJIPczc6JLOeGQyW9hvTM4V3L8Vt_R5bELc2x1jvTI8Uru36X2-BJCVvHUC0=w200-h200-p-k-no"
  },
  {
    reviewId: "3",
    authorName: "Yala Pathum Leopard Safari",
    rating: 5,
    relativeTime: "4 days ago",
    reviewText: "Unbelievable sightings of the Sri Lankan leopard basking near Patanangala Rock.",
    url: "https://lh3.googleusercontent.com/grass-cs/ANxoTn3d8W9z_yZARBXxh7LNjE7QOfrmPN_GSz8YnK4r08E7KFsUcusH9gZKWWmt5ZgMY9Vxg3rjfAUTtcv78rZ-L5w6ndCXEOSF4KCXbC5gGzB5ve5I4ViAuMIdmdhbRlwRZAXuJ0Sb1859hRfk=w1200-h900",
    thumbnailUrl: "https://lh3.googleusercontent.com/grass-cs/ANxoTn3d8W9z_yZARBXxh7LNjE7QOfrmPN_GSz8YnK4r08E7KFsUcusH9gZKWWmt5ZgMY9Vxg3rjfAUTtcv78rZ-L5w6ndCXEOSF4KCXbC5gGzB5ve5I4ViAuMIdmdhbRlwRZAXuJ0Sb1859hRfk=w200-h200-p-k-no"
  }
];

function getOptimizedThumbnail(url: string, width = 200): string {
  if (!url) return '';
  if (url.includes('googleusercontent.com')) {
    return url.replace(/=w\d+.*$/, `=w${width}-h${width}-p-k-no`);
  }
  return url;
}

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}

interface PhotoCardProps {
  photo: ReviewPhoto;
  index: number;
  onSelect: (index: number) => void;
}

const PhotoCard = memo(function PhotoCard({ photo, index, onSelect }: PhotoCardProps) {
  const thumbUrl = useMemo(
    () => getOptimizedThumbnail(photo.thumbnailUrl || photo.url, 200),
    [photo.thumbnailUrl, photo.url]
  );

  return (
    <div
      role="listitem"
      onClick={() => onSelect(index)}
      className="relative aspect-square group cursor-pointer overflow-hidden rounded-2xl bg-[#f8f9fa] [contain:strict]"
    >
      <img
        src={thumbUrl}
        className="w-full h-full object-cover"
        alt={`Yala Safari review photo by ${photo.authorName}`}
        loading="lazy"
        decoding="async"
        width={200}
        height={200}
      />
      <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
        <Maximize2 className="w-5 h-5 text-white" aria-label="View larger image" />
      </div>
    </div>
  );
});

export default function PetiteGallery() {
  const [allPhotos, setAllPhotos] = useState<ReviewPhoto[]>(INITIAL_FALLBACK_PHOTOS);
  const [visibleCount, setVisibleCount] = useState(12);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  useEffect(() => {
    let isMounted = true;
    fetch('/api/greview-photos')
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;
        if (Array.isArray(data) && data.length > 0) {
          const valid = data.filter((p: any) => p && p.url);
          setAllPhotos(shuffleArray(valid));
        }
      })
      .catch((err) => {
        if (isMounted) console.error('Error loading review photos:', err);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const visiblePhotos = useMemo(() => allPhotos.slice(0, visibleCount), [allPhotos, visibleCount]);

  const loadMore = useCallback(() => {
    setVisibleCount((prev) => prev + 6);
  }, []);

  const closeLightbox = useCallback(() => {
    setSelectedIdx(null);
  }, []);

  const handleSelect = useCallback((idx: number) => {
    setSelectedIdx(idx);
  }, []);

  const handlePrev = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIdx((prev) => (prev !== null ? (prev - 1 + visiblePhotos.length) % visiblePhotos.length : null));
  }, [visiblePhotos.length]);

  const handleNext = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIdx((prev) => (prev !== null ? (prev + 1) % visiblePhotos.length : null));
  }, [visiblePhotos.length]);

  useEffect(() => {
    if (selectedIdx === null || visiblePhotos.length === 0) return;
    const nextIdx = (selectedIdx + 1) % visiblePhotos.length;
    const prevIdx = (selectedIdx - 1 + visiblePhotos.length) % visiblePhotos.length;

    if (visiblePhotos[nextIdx]?.url) {
      const imgNext = new Image();
      imgNext.src = visiblePhotos[nextIdx].url;
    }
    if (visiblePhotos[prevIdx]?.url) {
      const imgPrev = new Image();
      imgPrev.src = visiblePhotos[prevIdx].url;
    }
  }, [selectedIdx, visiblePhotos]);

  return (
    <section
      className="py-16 bg-white text-[#1f1f1f] [content-visibility:auto] [contain-intrinsic-size:1px_600px]"
      aria-labelledby="gallery-title"
      style={{
        fontFamily: '"Google Sans", "Open Sans", Roboto, -apple-system, BlinkMacSystemFont, Arial, sans-serif',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12">

        {/* --- Header Section (Google Centered Layout) --- */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
          <h2 id="gallery-title" className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1f1f1f] mb-3 text-center">
            Guest Snapshots
          </h2>
          <p className="text-[18px] text-[#5f6368] font-semibold leading-relaxed mb-6 text-center">
            Authentic moments from the wild captured by our safari travelers. Don't just take our word for it—read authentic reviews from thousands of satisfied travelers who experienced unforgettable wildlife adventures with Yala Wildlife.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#f8f9fa] rounded-full [contain:paint]">
              <Camera className="w-4 h-4 text-[#1f1f1f]" aria-hidden="true" />
              <span className="text-[14px] sm:text-[15px] font-bold text-[#1f1f1f]">
                {allPhotos.length} Photos Captured
              </span>
            </div>

            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#f8f9fa] rounded-full [contain:paint]">
              <Star className="w-4 h-4 text-[#e37400] fill-[#e37400]" aria-hidden="true" />
              <span className="text-[14px] sm:text-[15px] font-bold text-[#1f1f1f]">
                5.0 Average Rating
              </span>
            </div>
          </div>
        </div>

        {/* --- Photo Grid --- */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4 [contain:paint]" role="list">
          {visiblePhotos.map((photo, i) => (
            <PhotoCard
              key={photo.url || photo.reviewId || i}
              photo={photo}
              index={i}
              onSelect={handleSelect}
            />
          ))}
        </div>

        {/* --- Load More Action --- */}
        {visibleCount < allPhotos.length && (
          <div className="flex justify-center mt-12">
            <button
              onClick={loadMore}
              aria-label="Load more guest photos"
              className="inline-flex items-center gap-2.5 bg-[#000000] hover:bg-[#00ff00] text-white hover:text-black font-bold text-[16px] px-8 py-4 rounded-full transition-colors duration-150 active:scale-95 shadow-none cursor-pointer"
            >
              <span>Discover More</span>
              <Plus className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>

      {/* --- Lightbox Dialog (Transparent background, no dark overlay, no blur) --- */}
      {selectedIdx !== null && visiblePhotos[selectedIdx] && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[300] bg-transparent flex items-center justify-center p-4 [contain:strict]"
          onClick={closeLightbox}
        >
          <div
            className="bg-white rounded-[2.25rem] sm:rounded-[2.5rem] max-w-4xl w-full overflow-hidden flex flex-col md:flex-row shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-[#e8eaed] [contain:paint]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Preview Canvas */}
            <div className="relative flex-1 bg-[#f8f9fa] flex items-center justify-center p-6 min-h-[320px]">
              <img
                key={visiblePhotos[selectedIdx].url}
                src={visiblePhotos[selectedIdx].url}
                className="max-h-[60vh] rounded-2xl object-contain select-none"
                alt={`Full size review photo by ${visiblePhotos[selectedIdx].authorName}`}
                decoding="async"
              />

              <button
                onClick={handlePrev}
                aria-label="Previous image"
                className="absolute left-4 w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#1f1f1f] hover:bg-[#00ff00] hover:text-black transition-colors active:scale-95 cursor-pointer shadow-sm border border-[#e8eaed]"
              >
                <ChevronLeft size={20} strokeWidth={2.5} />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next image"
                className="absolute right-4 w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#1f1f1f] hover:bg-[#00ff00] hover:text-black transition-colors active:scale-95 cursor-pointer shadow-sm border border-[#e8eaed]"
              >
                <ChevronRight size={20} strokeWidth={2.5} />
              </button>
            </div>

            {/* Sidebar Details Panel */}
            <div className="w-full md:w-80 p-6 sm:p-8 flex flex-col gap-4 bg-white text-left">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[18px] font-bold text-[#1f1f1f] leading-snug">
                    {visiblePhotos[selectedIdx].authorName}
                  </p>
                  <p className="text-[12px] text-[#5f6368] font-bold uppercase tracking-wider mt-0.5">
                    {visiblePhotos[selectedIdx].relativeTime}
                  </p>
                </div>
                <button
                  onClick={closeLightbox}
                  aria-label="Close dialog"
                  className="w-8 h-8 rounded-full bg-[#f8f9fa] hover:bg-[#e8eaed] flex items-center justify-center text-[#1f1f1f] transition-colors cursor-pointer"
                >
                  <X size={16} strokeWidth={2.5} />
                </button>
              </div>

              <div className="flex gap-1" aria-label={`Rated ${visiblePhotos[selectedIdx].rating} out of 5 stars`}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < visiblePhotos[selectedIdx].rating ? 'text-[#e37400] fill-[#e37400]' : 'text-[#dadce0]'}`}
                  />
                ))}
              </div>

              <blockquote className="text-[15px] sm:text-[16px] text-[#5f6368] font-semibold leading-relaxed line-clamp-6">
                &ldquo;{visiblePhotos[selectedIdx].reviewText}&rdquo;
              </blockquote>

              <div className="mt-auto pt-6">
                <button
                  onClick={closeLightbox}
                  className="w-full py-3.5 bg-[#f8f9fa] hover:bg-[#00ff00] text-black font-bold text-[15px] rounded-full transition-colors active:scale-95 cursor-pointer shadow-none"
                >
                  Close Discovery
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}