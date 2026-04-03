/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useEffect, useMemo } from 'react';
import { X, ChevronLeft, ChevronRight, Plus, Camera, Star, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ReviewPhoto {
  reviewId: string;
  authorName: string;
  rating: number;
  relativeTime: string;
  reviewText: string;
  url: string;
  thumbnailUrl: string;
}

export default function PetiteGallery() {
  const [allPhotos, setAllPhotos] = useState<ReviewPhoto[]>([]);
  const [visibleCount, setVisibleCount] = useState(12);
  const [loading, setLoading] = useState(true);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/greview-photos')
      .then((res) => res.json())
      .then((data) => {
        const shuffled = data
          .filter((p: any) => p.url)
          .sort(() => Math.random() - 0.5);
        setAllPhotos(shuffled);
        setLoading(false);
      });
  }, []);

  const visiblePhotos = useMemo(() => allPhotos.slice(0, visibleCount), [allPhotos, visibleCount]);
  const loadMore = () => setVisibleCount((prev) => prev + 6);

  return (
    <section className="py-16 bg-transparent" aria-labelledby="gallery-title">
      <div className="max-w-6xl mx-auto px-6">

        {/* --- Header Section --- */}
        <div className="flex flex-col items-center text-center gap-3 mb-12">

          {/* 1. THE BADGE ISLAND */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/70 shadow-2xl">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00ff00] animate-pulse" aria-hidden="true" />
            <span className="text-[9px] font-black text-[#00ff00] uppercase tracking-[0.3em]">
              Guest Chronicles
            </span>
          </div>

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
              <AnimatePresence mode="popLayout">
                {visiblePhotos.map((photo, i) => (
                  <motion.div
                    key={photo.url}
                    role="listitem"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 0.98, y: -2 }}
                    onClick={() => setSelectedIdx(i)}
                    className="relative aspect-square group cursor-pointer overflow-hidden rounded-2xl bg-black/20 border border-white/5 shadow-sm"
                  >
                    <img
                      src={photo.thumbnailUrl || photo.url}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      alt={`Yala Safari review photo by ${photo.authorName}`}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Maximize2 className="w-4 h-4 text-white" aria-label="View larger image" />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* --- Load More --- */}
            {visibleCount < allPhotos.length && (
              <div className="flex justify-center mt-12">
                <button
                  onClick={loadMore}
                  aria-label="Load more guest photos"
                  className="group flex items-center gap-3 bg-black/80 hover:bg-white px-8 py-3 rounded-full transition-all duration-300 active:scale-95 shadow-xl"
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
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-[300] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedIdx(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-[#0a0a0a] rounded-[2.5rem] shadow-2xl max-w-4xl w-full overflow-hidden flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative flex-1 bg-black flex items-center justify-center p-4 min-h-[300px]">
                <img
                  src={visiblePhotos[selectedIdx].url}
                  className="max-h-[60vh] rounded-2xl object-contain shadow-2xl"
                  alt={`Full size review photo by ${visiblePhotos[selectedIdx].authorName}`}
                />

                <button
                  onClick={() => setSelectedIdx((selectedIdx - 1 + visiblePhotos.length) % visiblePhotos.length)}
                  aria-label="Previous image"
                  className="absolute left-4 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-[#00ff00] hover:text-black transition-all duration-200 text-black"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => setSelectedIdx((selectedIdx + 1) % visiblePhotos.length)}
                  aria-label="Next image"
                  className="absolute right-4 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-[#00ff00] hover:text-black transition-all duration-200 text-black"
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
                    onClick={() => setSelectedIdx(null)}
                    aria-label="Close dialog"
                    className="p-2 hover:bg-white/10 text-white/50 hover:text-white rounded-full transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="flex gap-0.5" aria-label={`Rated ${visiblePhotos[selectedIdx].rating} out of 5 stars`}>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${i < visiblePhotos[selectedIdx!].rating ? 'text-[#00ff00] fill-[#00ff00]' : 'text-neutral-800'}`}
                    />
                  ))}
                </div>

                <blockquote className="text-xs text-neutral-400 leading-relaxed italic line-clamp-6 font-medium">
                  "{visiblePhotos[selectedIdx].reviewText}"
                </blockquote>

                <div className="mt-auto pt-6">
                  <button
                    onClick={() => setSelectedIdx(null)}
                    className="w-full py-4 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-[#00ff00] transition-all active:scale-95 shadow-xl"
                  >
                    Close Discovery
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}