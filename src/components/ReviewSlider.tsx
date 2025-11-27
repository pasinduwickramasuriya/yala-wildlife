'use client';

import { useState, useEffect } from 'react';
// Use standard img tag for external google avatars to avoid config errors
import { FaQuoteLeft, FaGoogle, FaStar, FaPenFancy, FaSpinner } from 'react-icons/fa'; // Added FaSpinner

// --- Constants ---
const GOOGLE_REVIEW_URL = 'https://www.google.com/search?hl=en-LK&gl=lk&q=Yala+Wildlife+Safari,+wickrama,+kasingama,+Tissamaharama+82600&ludocid=17345582408778303798&lsig=AB86z5Ub-4udBz4Uw52lwiIBzLZm#lrd=0x62b813f2717b2b81:0xf0b7e34cc97ec936,3';

// --- Types ---
interface Review {
  id: string;
  author_name: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
}

// --- Card Component ---
const SliderCard = ({ review }: { review: Review }) => (
  <div className="
    relative flex-shrink-0 w-[300px] md:w-[350px] 
    bg-neutral-900/60 backdrop-blur-md border border-white/10 
    rounded-[2rem] p-6 mx-3 
    transition-all duration-300 hover:bg-neutral-800/80 hover:scale-[1.02]
    group cursor-pointer
  ">
    {/* Google Icon Badge */}
    <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-100 transition-opacity">
        <FaGoogle className="text-white" />
    </div>

    {/* Header */}
    <div className="flex items-center gap-4 mb-4">
      <div className="relative">
        {review.profile_photo_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img 
            src={review.profile_photo_url} 
            alt={review.author_name} 
            className="w-12 h-12 rounded-full border border-white/10 object-cover" 
            loading="lazy"
          />
        ) : (
          <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
            {review.author_name.charAt(0)}
          </div>
        )}
      </div>
      <div>
        <h4 className="text-white font-bold text-sm truncate w-[150px]">{review.author_name}</h4>
        <div className="flex text-yellow-400 text-xs mt-1 gap-0.5">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-current' : 'text-neutral-700'}`} viewBox="0 0 20 20">
               <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" fill="currentColor" />
            </svg>
          ))}
        </div>
      </div>
    </div>

    {/* Text */}
    <p className="text-neutral-300 text-sm leading-relaxed line-clamp-3">
      &quot;{review.text}&quot;
    </p>

    {/* Date Footer */}
    <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center">
        <span className="text-[10px] text-neutral-500 uppercase tracking-wider">{review.relative_time_description}</span>
        <FaQuoteLeft className="text-neutral-700 text-xs" />
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
          const data = await response.json();
          // Duplicate data for infinite scroll effect
          setReviews([...data, ...data]); 
        }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        console.error("Failed to fetch reviews");
      } finally {
        setLoading(false);
      }
    }
    fetchReviews();
  }, []);

  // FIX: Removed the blocking "if (loading) return null;" so the layout loads instantly.
  
  // Only return null if we are finished loading AND have no reviews
  if (!loading && reviews.length === 0) return null;

  return (
    <section className="relative py-20  backdrop-blur-md overflow-hidden">
        
        {/* --- Section Header --- */}
        <div className="text-center mb-12 px-4 relative z-20">
            {/* Google Rating Badge */}
            <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-5 py-2 mb-4 backdrop-blur-md">
                <FaGoogle className="text-white" />
                <div className="flex items-center gap-1 border-l border-white/10 pl-3">
                    <span className="text-white font-bold text-sm">5.0</span>
                    <div className="flex text-yellow-400 gap-0.5">
                        {[...Array(5)].map((_, i) => <FaStar key={i} className="w-3 h-3" />)}
                    </div>
                </div>
            </div>

            <h2 className="text-3xl md:text-3xl font-bold text-white mb-4">
                What Travelers Say
            </h2>
            <div className="w-20 h-1.5 bg-green-600 mx-auto rounded-full"></div>
        </div>

        {/* --- Slider Area --- */}
        <div className="relative w-full overflow-hidden mb-12">
            {/* Gradient Masks */}
            <div className="absolute top-0 left-0 w-24 md:w-48 h-full bg-gradient-to-r from-neutral-950 to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 right-0 w-24 md:w-48 h-full bg-gradient-to-l from-neutral-950 to-transparent z-10 pointer-events-none" />

            {/* FIX: Conditional Rendering for Loading State */}
            {loading ? (
                <div className="flex justify-center items-center h-[280px] w-full">
                    <FaSpinner className="w-8 h-8 text-green-500 animate-spin" />
                </div>
            ) : (
                <div className="flex w-full">
                    <div className="flex animate-infinite-scroll hover:pause">
                        {reviews.map((review, index) => (
                            <SliderCard key={`${review.id}-${index}`} review={review} />
                        ))}
                    </div>
                </div>
            )}
        </div>

        {/* --- Bottom Call to Action --- */}
        <div className="text-center px-4 relative z-20">
            <p className="text-neutral-400 mb-6 text-sm uppercase tracking-widest">visited us recently?</p>
            <a 
                href={GOOGLE_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-500 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-green-500/30 group"
            >
                <FaPenFancy className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                <span>Write a Review</span>
            </a>
        </div>

        {/* Inline CSS for Animation */}
        <style jsx>{`
            @keyframes infinite-scroll {
                from { transform: translateX(0); }
                to { transform: translateX(-50%); }
            }
            .animate-infinite-scroll {
                animation: infinite-scroll 80s linear infinite; /* Slower (80s) for elegance */
                width: max-content;
            }
            .hover\\:pause:hover {
                animation-play-state: paused;
            }
        `}</style>
    </section>
  );
}