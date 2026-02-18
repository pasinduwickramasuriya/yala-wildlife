"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Camera, X } from "lucide-react";

interface Photo {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  slug?: string;
}

export default function AppleCuteGallery() {
  const [displayPhotos, setDisplayPhotos] = useState<Photo[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch("/api/blogs/featured");
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        if (Array.isArray(data)) setDisplayPhotos(data);
      } catch (error) {
        console.error("Gallery Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPhotos();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-[40vh] flex items-center justify-center">
        <p className="text-[#00ff00] font-mono text-[10px] tracking-[0.3em] uppercase animate-pulse">
          Syncing...
        </p>
      </div>
    );
  }

  return (
    <section className="relative w-full py-12 md:py-20 px-4 md:px-12 bg-transparent text-white overflow-hidden">
      <div className="max-w-[1200px] mx-auto">

        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-2xl font-extrabold text-white mb-4  inline-block px-6 py-3 rounded-3xl bg-black/70">
            Yala Wildlife{" "}
            <span className="text-[#00ff00] relative">
              Photo Gallery
              <motion.div
                className="absolute -bottom-2 left-0 w-full h-1 bg-[#00ff00] rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
              ></motion.div>
            </span>
          </h2>
          <br />
          <p className="text-green-200 text-lg max-w-2xl mx-auto inline-block px-6 py-3 rounded-3xl bg-black/70">
            Discover the incredible wildlife and breathtaking moments captured in Yala National Park
          </p>
        </motion.div>
        {/* --- RESPONSIVE BENTO GRID --- */}
        {/* Mobile: 1 Column, fixed height cards
            Tablet: 2 Columns
            Desktop: 12-column Bento (Your original layout)
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-4 h-auto md:h-[750px]">

          {/* Card 1: Main Hero */}
          <div className="h-[300px] sm:h-[400px] md:h-auto md:col-span-8 md:row-span-2 relative group overflow-hidden rounded-[1.5rem] md:rounded-[2rem] bg-neutral-900 shadow-xl">
            <ImageCard photo={displayPhotos[0]} priority onClick={setSelectedPhoto} />
          </div>

          {/* Card 2 */}
          <div className="h-[250px] md:h-auto md:col-span-4 md:row-span-1 relative group overflow-hidden rounded-[1.5rem] md:rounded-[2rem] bg-neutral-900 shadow-lg">
            <ImageCard photo={displayPhotos[1]} onClick={setSelectedPhoto} />
          </div>

          {/* Card 3 */}
          <div className="h-[250px] md:h-auto md:col-span-4 md:row-span-1 relative group overflow-hidden rounded-[1.5rem] md:rounded-[2rem] bg-neutral-900 shadow-lg">
            <ImageCard photo={displayPhotos[2]} onClick={setSelectedPhoto} />
          </div>

          {/* Card 4 */}
          <div className="h-[250px] md:h-auto md:col-span-5 md:row-span-1 relative group overflow-hidden rounded-[1.5rem] md:rounded-[2rem] bg-neutral-900 shadow-lg">
            <ImageCard photo={displayPhotos[3]} onClick={setSelectedPhoto} />
          </div>

          {/* Card 5 */}
          <div className="h-[250px] md:h-auto md:col-span-7 md:row-span-1 relative group overflow-hidden rounded-[1.5rem] md:rounded-[2rem] bg-neutral-900 shadow-lg">
            <ImageCard photo={displayPhotos[4] || displayPhotos[0]} onClick={setSelectedPhoto} />
          </div>
        </div>
      </div>

      {/* --- REFINED RESPONSIVE MODAL --- */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 md:p-6"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              layoutId={`photo-${selectedPhoto.id}`}
              className="relative w-full max-w-4xl bg-black rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border border-white/10 flex flex-col md:flex-row shadow-2xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Image Section */}
              <div className="relative w-full md:flex-1 h-[250px] sm:h-[350px] md:h-auto bg-neutral-950">
                <Image src={selectedPhoto.imageUrl} alt={selectedPhoto.title} fill className="object-cover" />
              </div>

              {/* Modal Content Section */}
              <div className="w-full md:w-[320px] p-6 md:p-8 flex flex-col justify-center bg-black overflow-y-auto">
                <div className="flex items-center gap-2 text-[#00ff00] mb-3 md:mb-4">
                  <Camera size={12} />
                  <span className="text-[9px] font-mono tracking-widest uppercase opacity-70">Capture Detail</span>
                </div>
                <h3 className="text-lg md:text-xl font-bold tracking-tight text-white mb-3 md:mb-4 leading-tight">
                  {selectedPhoto.title}
                </h3>
                <p className="text-neutral-400 text-[11px] md:text-[12px] leading-relaxed mb-6 line-clamp-4 md:line-clamp-6">
                  {selectedPhoto.content}
                </p>
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="w-full py-3 bg-white text-black font-bold text-[10px] rounded-full uppercase tracking-widest hover:bg-[#00ff00] transition-all active:scale-95"
                >
                  Close
                </button>
              </div>

              {/* Close Button */}
              <button className="absolute top-4 right-4 md:top-6 md:right-6 text-neutral-500 hover:text-white transition-colors bg-black/50 rounded-full p-1 md:bg-transparent" onClick={() => setSelectedPhoto(null)}>
                <X size={20} strokeWidth={2} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function ImageCard({ photo, onClick, priority = false }: { photo: Photo | null, onClick: (p: Photo) => void, priority?: boolean }) {
  if (!photo) return <div className="w-full h-full bg-neutral-900 animate-pulse rounded-[1.5rem] md:rounded-[2rem]" />;

  return (
    <div className="w-full h-full cursor-pointer" onClick={() => onClick(photo)}>
      <Image
        src={photo.imageUrl}
        alt={photo.title}
        fill
        priority={priority}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

      <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-end">
        <div className="flex items-end justify-between">
          <div className="translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
            <span className="text-[#00ff00] font-mono text-[8px] tracking-[0.3em] uppercase mb-1 block font-bold opacity-80">Live Feed</span>
            <h3 className="text-sm md:text-lg font-bold tracking-tight text-white leading-tight">{photo.title}</h3>
          </div>
          <div className="h-8 w-8 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-[#00ff00] group-hover:text-black transition-all duration-500">
            <ArrowUpRight size={14} />
          </div>
        </div>
      </div>
    </div>
  );
}