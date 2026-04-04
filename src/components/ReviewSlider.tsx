/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useEffect } from 'react';
import { FaQuoteLeft, FaGoogle, FaStar, FaPenFancy, FaSpinner } from 'react-icons/fa';

const GOOGLE_REVIEW_URL = 'https://www.google.com/search?hl=en-LK&gl=lk&q=Yala+Wildlife+Safari,+wickrama,+kasingama,+Tissamaharama+82600&ludocid=17345582408778303798&lsig=AB86z5Ub-4udBz4Uw52lwiIBzLZm#lrd=0x62b813f2717b2b81:0xf0b7e34cc97ec936,3';

interface Review {
  id: string;
  author_name: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
}

const SliderCard = ({ review }: { review: Review }) => (
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
      <span className="text-[10px] text-neutral-400 uppercase tracking-widest">{review.relative_time_description}</span>
      <FaQuoteLeft className="text-neutral-800 text-[10px]" />
    </div>
  </div>
);

export default function ReviewSlider() {
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
    <section className="relative py-16 overflow-hidden flex flex-col items-center gap-6">

      {/* --- 1. GOOGLE BADGE ISLAND --- */}
      <div className="inline-flex items-center gap-3 bg-black/80 border border-white/10 rounded-full px-5 py-2 shadow-2xl">
        {/* <FaGoogle className="text-[#00ff00] text-xs" /> */}
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google"
          className="w-6 h-6"
        />
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
          <div className="flex animate-infinite-scroll hover:pause">
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
          /* ✅ FIXED SPEED: 800s provides a very slow, premium reading pace */
          animation: infinite-scroll 1500s linear infinite;
          width: max-content;
          will-change: transform;
        }
        .hover\\:pause:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}