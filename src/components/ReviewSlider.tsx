/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useEffect, useRef } from 'react';
import { FaQuoteLeft, FaGoogle, FaStar, FaPenFancy, FaSpinner } from 'react-icons/fa';
import { useThermalOptimization } from '@/hooks/useThermalOptimization';

const GOOGLE_REVIEW_URL = 'https://www.google.com/search?hl=en-LK&gl=lk&q=Yala+Wildlife+Safari,+wickrama,+kasingama,+Tissamaharama+82600&ludocid=17345582408778303798&lsig=AB86z5Ub-4udBz4Uw52lwiIBzLZm#lrd=0x62b813f2717b2b81:0xf0b7e34cc97ec936,3';

interface Review {
  id: string;
  author_name: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
}

const SliderCard = ({ review }: { review: Review }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="
      relative flex-shrink-0 w-[280px] md:w-[320px] 
      bg-black/80 border border-white/5 
      rounded-[1.5rem] p-5 mx-2
      transition-all duration-300 hover:scale-[1.01]
      group cursor-pointer
    ">
      {/* 12px Header Info */}
      <div className="flex items-center gap-3 mb-3">
        <img
          src={review.profile_photo_url || "/placeholder-user.jpg"}
          alt={review.author_name}
          className="w-10 h-10 rounded-full border border-white/10 object-cover"
          loading="lazy"
        />
        <div className="overflow-hidden">
          <h4 className="text-white font-bold text-[12px] truncate">{review.author_name}</h4>
          <div className="flex text-[#00ff00] gap-0.5 mt-0.5">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className={`w-2.5 h-2.5 ${i < review.rating ? 'fill-current' : 'text-neutral-800'}`} />
            ))}
          </div>
        </div>
      </div>

      {/* 12px Body Text */}
      <p className="text-white/90 text-[12px] leading-relaxed line-clamp-3 italic">
        &quot;{review.text}&quot;
      </p>

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center">
        <span className="text-[10px] text-neutral-400 uppercase tracking-widest">
          {mounted ? review.relative_time_description : ''}
        </span>
        <FaQuoteLeft className="text-neutral-800 text-[10px]" />
      </div>
    </div>
  );
};

export default function ReviewSlider() {
  const sectionRef = useRef<HTMLElement>(null);
  const { shouldAnimate } = useThermalOptimization(sectionRef);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await fetch('/api/greviews');
        if (response.ok) {
          const data = (await response.json()) as Review[];
          const filtered = data.filter(r => r.rating >= 4 && r.text?.trim().length > 0);
          // Duplicate list to create seamless infinite loop
          setReviews([...filtered, ...filtered]);
        }
      } catch (e) { console.error(e); } finally { setLoading(false); }
    }
    fetchReviews();
  }, []);

  if (!loading && reviews.length === 0) return null;

  return (
    <section ref={sectionRef} className="relative py-16 overflow-hidden flex flex-col items-center gap-6">

      {/* --- 1. GOOGLE BADGE ISLAND --- */}
      <div className="inline-flex items-center gap-3 bg-black/80 border border-white/10 rounded-full px-5 py-2 shadow-2xl">
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
        </svg>
        <div className="flex items-center gap-2 border-l border-white/10 pl-3">
          <span className="text-white font-black text-[12px]">5.0</span>
          <div className="flex text-[#00ff00] gap-0.5">
            {[...Array(5)].map((_, i) => <FaStar key={i} className="w-2.5 h-2.5" />)}
          </div>
        </div>
      </div>

      {/* --- 2. TITLE ISLAND --- */}
      <div className="inline-block bg-black/80 px-8 py-3 rounded-2xl shadow-2xl border border-white/5">
        <h2 className="text-[15px] font-black text-white tracking-[0.3em] text-center">
          What Travelers Say
        </h2>
      </div>

      {/* --- 3. SLIDER AREA --- */}
      <div className="relative w-full overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center h-[200px]">
            <FaSpinner className="w-6 h-6 text-[#00ff00] animate-spin" />
          </div>
        ) : (
          <div className={`flex animate-infinite-scroll hover:pause ${!shouldAnimate ? 'pause-animation' : ''}`}>
            {reviews.map((review, i) => (
              <SliderCard key={`${review.id}-${i}`} review={review} />
            ))}
          </div>
        )}
      </div>

      {/* --- 4. ACTION ISLAND --- */}
      <div className="flex flex-col items-center gap-4">
        <div className="bg-black/80 px-4 py-1 rounded-full border border-white/5">
          <p className="text-white/90 text-[10px] uppercase tracking-[0.4em] font-black">Visited us recently?</p>
        </div>

        <a
          href={GOOGLE_REVIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 bg-white hover:bg-[#00ff00] text-black px-8 py-3 rounded-full transition-all active:scale-95 shadow-xl"
        >
          <FaPenFancy className="w-3 h-3 group-hover:rotate-12 transition-transform" />
          <span className="text-[12px] font-black uppercase tracking-widest">Write a Review</span>
        </a>
      </div>

      <style jsx>{`
        @keyframes infinite-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 15000s linear infinite;
          width: max-content;
        }
        .pause-animation {
          animation-play-state: paused !important;
        }
        .hover\\:pause:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-infinite-scroll {
            animation-play-state: paused !important;
          }
        }
      `}</style>
    </section>
  );
}