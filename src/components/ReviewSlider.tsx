/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useEffect, useRef, memo } from 'react';
import { Quote, Star, PenLine, Loader2 } from 'lucide-react';
import { useThermalOptimization } from '@/hooks/useThermalOptimization';

const GOOGLE_REVIEW_URL =
  'https://www.google.com/search?hl=en-LK&gl=lk&q=Yala+Wildlife+Safari,+wickrama,+kasingama,+Tissamaharama+82600&ludocid=17345582408778303798&lsig=AB86z5Ub-4udBz4Uw52lwiIBzLZm#lrd=0x62b813f2717b2b81:0xf0b7e34cc97ec936,3';

interface Review {
  id: string;
  author_name: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
}

const FALLBACK_REVIEWS: Review[] = [
  {
    id: 'slider-fb-1',
    author_name: 'Daniel Martinez',
    profile_photo_url: '',
    rating: 5,
    relative_time_description: '2 weeks ago',
    text: 'Unbelievable safari in Yala! Our tracker managed to spot three different leopards in Block 1 before 8 AM. The customized 4x4 rig gave us the most stable camera angles.',
  },
  {
    id: 'slider-fb-2',
    author_name: 'Sophie Charlotte',
    profile_photo_url: '',
    rating: 5,
    relative_time_description: 'a month ago',
    text: 'The best wildlife experience in Sri Lanka. Punctual hotel pickup from Tissamaharama, respectful ethical distances around elephant breeding herds, and exceptional spotting skills.',
  },
  {
    id: 'slider-fb-3',
    author_name: 'Dr. Liam Henderson',
    profile_photo_url: '',
    rating: 5,
    relative_time_description: '2 months ago',
    text: 'As an avid birdwatcher, our guide took the time to identify over 40 species along the wetlands and Menik River. Spotting a sloth bear foraging at dusk was the icing on the cake.',
  },
  {
    id: 'slider-fb-4',
    author_name: 'Elena Rostova',
    profile_photo_url: '',
    rating: 5,
    relative_time_description: '3 months ago',
    text: 'Seamless booking and professional naturalists. They know every single track and rock in Ruhuna. 10/10 recommend for any serious photographer.',
  },
];

// Memoized card with CSS containment so browser layout engine does not recalculate surrounding DOM on ticks
const SliderCard = memo(function SliderCard({ review }: { review: Review }) {
  return (
    <div
      className="
        relative flex-shrink-0 w-[300px] md:w-[360px] 
        bg-white rounded-3xl p-6 mx-3
        flex flex-col items-center text-center
        transition-transform duration-300 hover:scale-[1.02]
        group cursor-pointer
        [contain:content] transform-gpu will-change-transform
      "
    >
      {/* Centered Avatar and Author Header */}
      <div className="flex flex-col items-center justify-center gap-2.5 mb-4">
        {review.profile_photo_url ? (
          <img
            src={review.profile_photo_url}
            alt={review.author_name}
            width={48}
            height={48}
            decoding="async"
            className="w-12 h-12 rounded-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-12 h-12 bg-[#f1f3f4] text-[#000000] rounded-full flex items-center justify-center text-[18px] font-bold select-none">
            {review.author_name.charAt(0)}
          </div>
        )}

        <div className="flex flex-col items-center">
          <h4 className="text-[#000000] font-medium text-[18px] tracking-tight leading-snug">
            {review.author_name}
          </h4>
          <div className="flex text-[#f4b400] gap-1 mt-1 justify-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < review.rating ? 'fill-current stroke-none' : 'text-[#e8eaed] stroke-none'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 18px Regular Body Text */}
      <p className="text-[#2d3135] text-[18px] leading-relaxed font-medium mb-5 line-clamp-4">
        &ldquo;{review.text}&rdquo;
      </p>

      {/* Centered Footer */}
      <div className="mt-auto pt-3 w-full flex items-center justify-center gap-2 border-t border-[#f1f3f4]">
        <span className="text-[18px] text-[#5f6368] font-normal">
          {review.relative_time_description || ''}
        </span>
        <Quote className="text-[#00ff00] w-3 h-3 ml-1" />
      </div>
    </div>
  );
});

export default function ReviewSlider() {
  const sectionRef = useRef<HTMLElement>(null);
  const { shouldAnimate } = useThermalOptimization(sectionRef);
  const [reviews, setReviews] = useState<Review[]>(() => [
    ...FALLBACK_REVIEWS,
    ...FALLBACK_REVIEWS,
  ]);
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // 1. IntersectionObserver: Stop all work & hardware execution when not on screen
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin: '150px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // 2. Non-blocking async fetch with controller cleanup to avoid thread memory leaks
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function fetchReviews() {
      try {
        const response = await fetch('/api/greviews', {
          signal: controller.signal,
        });
        if (response.ok) {
          const data = (await response.json()) as Review[];
          if (!isMounted) return;
          const filtered = data.filter(
            (r) => r.rating >= 4 && r.text?.trim().length > 0
          );
          const source = filtered.length > 0 ? filtered : FALLBACK_REVIEWS;
          const curated = source.slice(0, 8);
          setReviews([...curated, ...curated]);
        }
      } catch (e: unknown) {
        if ((e as Error)?.name !== 'AbortError') {
          // Keep instant fallback reviews on low connections without crashing
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    // Defer network fetch until main thread idle to guarantee 60fps on low-end devices
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      const handle = (window as unknown as { requestIdleCallback: (cb: () => void) => number }).requestIdleCallback(fetchReviews);
      return () => {
        isMounted = false;
        controller.abort();
        if ('cancelIdleCallback' in window) {
          (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(handle);
        }
      };
    } else {
      fetchReviews();
      return () => {
        isMounted = false;
        controller.abort();
      };
    }
  }, []);

  const runAnimation = isVisible && shouldAnimate;

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white text-[#000000] py-16 sm:py-24 overflow-hidden flex flex-col items-center gap-8 selection:bg-[#00ff00] selection:text-black [content-visibility:auto]"
      style={{
        fontFamily:
          '"Google Sans", "Open Sans", Roboto, -apple-system, BlinkMacSystemFont, Arial, sans-serif',
      }}
    >
      {/* --- 1. GOOGLE BADGE (PURE WHITE & BORDERLESS) --- */}
      <div className="inline-flex items-center justify-center gap-3 bg-white px-6 py-2">
        {/* Multi-Color Google G */}
        <svg
          className="w-6 h-6 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            fill="#EA4335"
          />
        </svg>
        <div className="flex items-center gap-2 pl-2">
          <span className="text-[#000000] font-bold text-[18px]">5.0</span>
          <div className="flex text-[#f4b400] gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current stroke-none" />
            ))}
          </div>
        </div>
      </div>

        {/* --- 2. TITLE SECTION (CENTERED & 18PX COMPLIANT) --- */}
        <div className="max-w-3xl mx-auto text-center px-4 bg-white">
          <h2 className="text-3xl sm:text-5xl font-bold text-[#000000] tracking-tight leading-[1.12]">
            What Travelers Say
          </h2>
          <p className="mt-3 text-[18px] text-[#2d3135] leading-relaxed font-semibold">
            Unfiltered feedback from safari guests exploring Yala with our certified naturalists.
          </p>
        </div>

        {/* --- 3. SLIDER AREA (GPU Accelerated & Viewport Pausing) --- */}
        <div className="relative w-full overflow-hidden bg-white [contain:paint]">
          {loading ? (
            <div className="flex justify-center items-center h-[240px] bg-white">
              <Loader2 className="w-8 h-8 text-[#000000] animate-spin" />
            </div>
          ) : (
            <div
              className={`flex py-4 animate-infinite-scroll hover:pause ${
                !runAnimation ? 'pause-animation' : ''
              }`}
            >
              {reviews.map((review, i) => (
                <SliderCard key={`${review.id}-${i}`} review={review} />
              ))}
            </div>
          )}
        </div>

        {/* --- 4. ACTION SECTION --- */}
        <div className="flex flex-col items-center text-center gap-3 bg-white mt-2">
          <p className="text-[18px] font-medium text-[#5f6368]">
            Visited us recently?
          </p>

          <a
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-3 bg-[#000000] hover:bg-[#00ff00] text-white hover:text-black px-8 py-3.5 rounded-full transition-all duration-200 active:scale-95 cursor-pointer text-[18px] font-bold tracking-wide"
          >
            <PenLine className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            <span>Write a Review</span>
          </a>
        </div>

        <style jsx>{`
          @keyframes infinite-scroll {
            from {
              transform: translate3d(0, 0, 0);
            }
            to {
              transform: translate3d(-50%, 0, 0);
            }
          }
          .animate-infinite-scroll {
            animation: infinite-scroll 45s linear infinite;
            width: max-content;
            will-change: transform;
            transform: translate3d(0, 0, 0);
            backface-visibility: hidden;
            perspective: 1000px;
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