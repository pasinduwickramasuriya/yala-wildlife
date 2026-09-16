/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
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

// Ultra-compact initial fallback photos for 0ms initial render speed
const INITIAL_FALLBACK_PHOTOS: ReviewPhoto[] = [
  {
    reviewId: "1",
    authorName: "Jc_Haaland",
    rating: 5,
    relativeTime: "Edited 18 hours ago",
    reviewText: "I recently visited Yala National Park, and it was an unforgettable wildlife adventure 🍂🐾",
    url: "https://lh3.googleusercontent.com/grass-cs/ANxoTn3iYrL-81ORrAUIE_DJFOnG7ukDe0yFvrmHIm5UbWvhf19CKSVjn8-NaJPHgnoi4yZjPXBBODnaTEuf_DhUZ29AkX842IGi0w576jyvQu-hQW1DIFsrONPLJmJfsZuKL5Rp2cnOOlum9rtN=w1200-h900",
    thumbnailUrl: "https://lh3.googleusercontent.com/grass-cs/ANxoTn3iYrL-81ORrAUIE_DJFOnG7ukDe0yFvrmHIm5UbWvhf19CKSVjn8-NaJPHgnoi4yZjPXBBODnaTEuf_DhUZ29AkX842IGi0w576jyvQu-hQW1DIFsrONPLJmJfsZuKL5Rp2cnOOlum9rtN=w250-h250-p-k-no"
  },
  {
    reviewId: "2",
    authorName: "יניב אבוחצירא",
    rating: 5,
    relativeTime: "2 days ago",
    reviewText: "Amazing park, real wild nature! A little hot, it's worth bringing water",
    url: "https://lh3.googleusercontent.com/grass-cs/ANxoTn0PK3VwCNtPHNp4auSx2WCt4TD_nSdTToDXOeC5VsiAc3CjBgBEFoicUhmBakWlcn4uvd8BIZFy06g0hKBOSJIPczc6JLOeGQyW9hvTM4V3L8Vt_R5bELc2x1jvTI8Uru36X2-BJCVvHUC0=w1200-h900",
    thumbnailUrl: "https://lh3.googleusercontent.com/grass-cs/ANxoTn0PK3VwCNtPHNp4auSx2WCt4TD_nSdTToDXOeC5VsiAc3CjBgBEFoicUhmBakWlcn4uvd8BIZFy06g0hKBOSJIPczc6JLOeGQyW9hvTM4V3L8Vt_R5bELc2x1jvTI8Uru36X2-BJCVvHUC0=w250-h250-p-k-no"
  },
  {
    reviewId: "3",
    authorName: "Yala Pathum Leopard Safari",
    rating: 5,
    relativeTime: "4 days ago",
    reviewText: "Unbelievable sightings of the Sri Lankan leopard basking near Patanangala Rock.",
    url: "https://lh3.googleusercontent.com/grass-cs/ANxoTn3d8W9z_yZARBXxh7LNjE7QOfrmPN_GSz8YnK4r08E7KFsUcusH9gZKWWmt5ZgMY9Vxg3rjfAUTtcv78rZ-L5w6ndCXEOSF4KCXbC5gGzB5ve5I4ViAuMIdmdhbRlwRZAXuJ0Sb1859hRfk=w1200-h900",
    thumbnailUrl: "https://lh3.googleusercontent.com/grass-cs/ANxoTn3d8W9z_yZARBXxh7LNjE7QOfrmPN_GSz8YnK4r08E7KFsUcusH9gZKWWmt5ZgMY9Vxg3rjfAUTtcv78rZ-L5w6ndCXEOSF4KCXbC5gGzB5ve5I4ViAuMIdmdhbRlwRZAXuJ0Sb1859hRfk=w250-h250-p-k-no"
  }
];

// Helper to convert Google image URLs to ultra-low payload 250px grid thumbnails (shrinks image size by 90%!)
function getOptimizedThumbnail(url: string, width = 250): string {
  if (!url) return '';
  if (url.includes('googleusercontent.com')) {
    return url.replace(/=w\d+.*$/, `=w${width}-h${width}-p-k-no`);
  }
  return url;
}

// Ultra-fast O(n) Fisher-Yates shuffle
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

export default function PetiteGallery() {
  const [allPhotos, setAllPhotos] = useState<ReviewPhoto[]>(INITIAL_FALLBACK_PHOTOS);
  const [visibleCount, setVisibleCount] = useState(12);
  const [loading, setLoading] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  // Fetch full photo set asynchronously and shuffle dynamically
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

  const handlePrev = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIdx((prev) => (prev !== null ? (prev - 1 + visiblePhotos.length) % visiblePhotos.length : null));
  }, [visiblePhotos.length]);

  const handleNext = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIdx((prev) => (prev !== null ? (prev + 1) % visiblePhotos.length : null));
  }, [visiblePhotos.length]);

  // Pre-load next/prev high-res images in background for 0ms latency in Lightbox
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
    <section className="py-16 bg-transparent" aria-labelledby="gallery-title">
      <div className="max-w-6xl mx-auto px-6">

        {/* --- Header Section --- */}
        <div className="flex flex-col items-center text-center gap-3 mb-12">

          {/* 1. THE BADGE  */}
          {/* <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/70 shadow-2xl">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00ff00] animate-pulse" aria-hidden="true" />
            <span className="text-[9px] font-black text-[#00ff00] uppercase tracking-[0.3em]">
              Guest Chronicles
            </span>
          </div> */}

          {/* 2. THE MAIN TITLE & DESC ISLAND */}
          <div className="inline-block px-10 py-2 rounded-[2.5rem] bg-black/80 shadow-2xl">
            <h2 id="gallery-title" className="text-[20px] font-bold tracking-tight text-white mb-1">
              Guest Snapshots
            </h2>
            <p className="text-[10px] text-white/80 uppercase tracking-[0.2em] font-black">
              Authentic moments from the wild
            </p>
          </div>

          {/* 3. THE STATS DOCK (Individual Pills) */}
          <div className="flex items-center gap-3 mt-1">
            <div className="flex items-center gap-2.5 px-5 py-2.5 bg-black/80 rounded-full shadow-xl">
              <Camera className="w-3.5 h-3.5 text-[#00ff00]" aria-hidden="true" />
              <span className="text-[10px] font-black text-white uppercase tracking-widest">
                {allPhotos.length} Photos Captured
              </span>
            </div>

            <div className="flex items-center gap-2.5 px-5 py-2.5 bg-black/80 rounded-full shadow-xl">
              <Star className="w-3.5 h-3.5 text-[#00ff00] fill-[#00ff00]" aria-hidden="true" />
              <span className="text-[10px] font-black text-white uppercase tracking-widest">
                5.0 Average Rating
              </span>
            </div>
          </div>
        </div>

        {/* --- Photo Grid --- */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3" aria-hidden="true">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-square bg-white/5 animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-3" role="list">
              {visiblePhotos.map((photo, i) => {
                const thumbUrl = getOptimizedThumbnail(photo.thumbnailUrl || photo.url, 250);
                return (
                  <div
                    key={photo.url || photo.reviewId || i}
                    role="listitem"
                    onClick={() => setSelectedIdx(i)}
                    className="relative aspect-square group cursor-pointer overflow-hidden rounded-2xl bg-black/20 border border-white/5 shadow-sm transform-gpu hover:scale-[0.98] transition-transform duration-200 ease-out"
                  >
                    <img
                      src={thumbUrl}
                      className="w-full h-full object-cover transform-gpu transition-transform duration-500 ease-out group-hover:scale-110"
                      alt={`Yala Safari review photo by ${photo.authorName}`}
                      loading="lazy"
                      decoding="async"
                      width={250}
                      height={250}
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <Maximize2 className="w-4 h-4 text-white" aria-label="View larger image" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* --- Load More --- */}
            {visibleCount < allPhotos.length && (
              <div className="flex justify-center mt-12">
                <button
                  onClick={loadMore}
                  aria-label="Load more guest photos"
                  className="group flex items-center gap-3 bg-black/80 hover:bg-white px-8 py-3 rounded-full transition-all duration-300 active:scale-95 shadow-xl cursor-pointer"
                >
                  <span className="text-[10px] font-black text-white group-hover:text-black uppercase tracking-[0.2em]">Discover More</span>
                  <Plus className="w-4 h-4 text-[#00ff00] group-hover:text-black" aria-hidden="true" />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* --- Lightbox --- */}
      {selectedIdx !== null && visiblePhotos[selectedIdx] && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[300] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={closeLightbox}
        >
          <div
            className="bg-[#0a0a0a] rounded-[2.5rem] shadow-2xl max-w-4xl w-full overflow-hidden flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative flex-1 bg-black flex items-center justify-center p-4 min-h-[300px]">
              <img
                key={visiblePhotos[selectedIdx].url}
                src={visiblePhotos[selectedIdx].url}
                className="max-h-[60vh] rounded-2xl object-contain shadow-2xl animate-in fade-in duration-200"
                alt={`Full size review photo by ${visiblePhotos[selectedIdx].authorName}`}
                decoding="async"
              />

              <button
                onClick={handlePrev}
                aria-label="Previous image"
                className="absolute left-4 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-[#00ff00] hover:text-black transition-all duration-200 text-black cursor-pointer"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next image"
                className="absolute right-4 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-[#00ff00] hover:text-black transition-all duration-200 text-black cursor-pointer"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            <div className="w-full md:w-80 p-8 flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-black text-white italic tracking-tight">
                    {visiblePhotos[selectedIdx].authorName}
                  </p>
                  <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">
                    {visiblePhotos[selectedIdx].relativeTime}
                  </p>
                </div>
                <button
                  onClick={closeLightbox}
                  aria-label="Close dialog"
                  className="p-2 hover:bg-white/10 text-white/50 hover:text-white rounded-full transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex gap-0.5" aria-label={`Rated ${visiblePhotos[selectedIdx].rating} out of 5 stars`}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${i < visiblePhotos[selectedIdx].rating ? 'text-[#00ff00] fill-[#00ff00]' : 'text-neutral-800'}`}
                  />
                ))}
              </div>

              <blockquote className="text-xs text-neutral-400 leading-relaxed italic line-clamp-6 font-medium">
                "{visiblePhotos[selectedIdx].reviewText}"
              </blockquote>

              <div className="mt-auto pt-6">
                <button
                  onClick={closeLightbox}
                  className="w-full py-4 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-[#00ff00] transition-all active:scale-95 shadow-xl cursor-pointer"
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