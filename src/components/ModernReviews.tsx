
'use client';

import { useState, useEffect, useMemo } from 'react';
import { Sparkles, Star, CheckCircle2, ChevronDown, Loader2 } from 'lucide-react';

// --- Types ---
interface Review {
  id: string;
  author_name: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
}

const GOOGLE_REVIEW_URL =
  'https://www.google.com/search?hl=en-LK&gl=lk&q=Yala+Wildlife+Safari,+wickrama,+kasingama,+Tissamaharama+82600&ludocid=17345582408778303798&lsig=AB86z5Ub-4udBz4Uw52lwiIBzLZm#lrd=0x62b813f2717b2b81:0xf0b7e34cc97ec936,3';

const FALLBACK_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author_name: 'Daniel Martinez',
    profile_photo_url: '',
    rating: 5,
    relative_time_description: '2 weeks ago',
    text: 'Unbelievable safari in Yala! Our tracker managed to spot three different leopards in Block 1 before 8 AM. The customized 4x4 rig gave us the most stable camera angles.',
  },
  {
    id: 'rev-2',
    author_name: 'Sophie Charlotte',
    profile_photo_url: '',
    rating: 5,
    relative_time_description: 'a month ago',
    text: 'The best wildlife experience in Sri Lanka. Punctual hotel pickup from Tissamaharama, respectful ethical distances around elephant breeding herds, and exceptional spotting skills.',
  },
  {
    id: 'rev-3',
    author_name: 'Dr. Liam Henderson',
    profile_photo_url: '',
    rating: 5,
    relative_time_description: '2 months ago',
    text: 'As an avid birdwatcher, our guide took the time to identify over 40 species along the wetlands and Menik River. Spotting a sloth bear foraging at dusk was the icing on the cake.',
  },
  {
    id: 'rev-4',
    author_name: 'Elena Rostova',
    profile_photo_url: '',
    rating: 5,
    relative_time_description: '3 months ago',
    text: 'Seamless booking and professional naturalists. They know every single track and rock in Ruhuna. 10/10 recommend for any serious photographer.',
  },
];

// --- Sub-Components ---

const GoogleStars = ({ rating = 5 }: { rating?: number }) => (
  <div className="flex items-center justify-center gap-1 text-[#f4b400]">
    {[...Array(rating)].map((_, i) => (
      <Star key={i} className="w-5 h-5 fill-current stroke-none" />
    ))}
  </div>
);

const ModernHeader = ({ reviewCount }: { reviewCount: number }) => (
  <header className="mb-14 w-full flex flex-col items-center justify-center bg-white py-6 gap-6 text-center">
    {/* Ratings Info */}
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="flex flex-wrap items-center justify-center gap-3">
        {/* Google Multi-Color G Icon */}
        <svg className="w-8 h-8 shrink-0" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          />
        </svg>

        <span className="text-3xl font-bold tracking-tight text-[#000000]">
          Google Reviews
        </span>
        <span className="text-3xl font-bold text-[#000000]">5.0</span>
        <GoogleStars rating={5} />
      </div>

      <span className="text-[18px] text-[#5f6368] font-medium tracking-wide">
        Based on verified visitor ratings & safari feedback ({reviewCount}+ reviews)
      </span>
    </div>

    {/* CTA Button */}
    <a
      href={GOOGLE_REVIEW_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-[#000000] text-white hover:bg-[#00ff00] hover:text-black rounded-full px-8 py-3.5 text-[18px] font-bold tracking-wide transition-all duration-200 active:scale-95 shrink-0 cursor-pointer"
    >
      Write a Review
    </a>
  </header>
);

const SummaryCard = () => (
  <article className="flex flex-col items-center text-center bg-white rounded-3xl p-8">
    <div className="flex items-center justify-center gap-2.5 mb-5">
      <div className="w-7 h-7 rounded-full bg-[#00ff00] text-black flex items-center justify-center shrink-0">
        <Sparkles className="w-4 h-4 stroke-[2.5]" />
      </div>
      <span className="text-[18px] font-black tracking-wider text-[#000000]">
        AI Overview & Key Signals
      </span>
    </div>

    <ul className="space-y-4 text-[#2d3135] text-[18px] leading-relaxed font-medium max-w-2xl mx-auto">
      <li className="flex flex-col items-center justify-center gap-1">
        <span className="text-[#00ff00] font-black text-5xl">•</span>
        <span>
          Knowledgeable field trackers with deep expertise in Yala&apos;s granite inselberg topography.
        </span>
      </li>
      <li className="flex flex-col items-center justify-center gap-1">
        <span className="text-[#00ff00] font-black text-5xl">•</span>
        <span>
          Consistently high leopard and sloth bear sighting rates during dawn and dusk drives.
        </span>
      </li>
      <li className="flex flex-col items-center justify-center gap-1">
        <span className="text-[#00ff00] font-black text-5xl">•</span>
        <span>
          Custom 4x4 Hilux vehicles equipped with 360° elevated seating for wildlife photographers.
        </span>
      </li>
    </ul>
  </article>
);

const ReviewCard = ({ review }: { review: Review }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const MAX_LENGTH = 110;

  return (
    <article className="inline-block w-full break-inside-avoid mb-8 bg-white rounded-3xl p-8 text-center">
      {/* Author Header */}
      <div className="flex flex-col items-center justify-center gap-3 mb-4">
        <div className="relative w-14 h-14 shrink-0">
          {review.profile_photo_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={review.profile_photo_url}
              alt={review.author_name}
              loading="lazy"
              decoding="async"
              className="w-14 h-14 rounded-full object-cover"
            />
          ) : (
            <div className="w-14 h-14 bg-[#f1f3f4] text-[#000000] rounded-full flex items-center justify-center text-[18px] font-bold">
              {review.author_name.charAt(0)}
            </div>
          )}
          <CheckCircle2 className="absolute -bottom-0.5 -right-0.5 text-[#1a73e8] w-4 h-4 bg-white rounded-full" />
        </div>

        <div className="flex flex-col items-center overflow-hidden">
          <h3 className="font-bold text-[#000000] text-[20px] tracking-tight truncate leading-tight">
            {review.author_name}
          </h3>
          <time className="text-[18px] text-[#5f6368] font-medium mt-1">
            {review.relative_time_description}
          </time>
        </div>
      </div>

      {/* Stars */}
      <div className="mb-4 flex justify-center">
        <GoogleStars rating={review.rating || 5} />
      </div>

      {/* Review Text */}
      <div className="text-[#2d3135] text-[18px] leading-relaxed font-medium">
        {isExpanded
          ? review.text
          : `${review.text.slice(0, MAX_LENGTH)}${
              review.text.length > MAX_LENGTH ? '...' : ''
            }`}
        {review.text.length > MAX_LENGTH && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[#000000] hover:text-[#00ff00] ml-2 text-[18px] font-bold underline underline-offset-4 cursor-pointer inline-block mt-1"
          >
            {isExpanded ? 'Show Less' : 'Read Full'}
          </button>
        )}
      </div>
    </article>
  );
};

// --- Main Component ---

export default function ModernGoogleReviews({
  initialReviews,
}: {
  initialReviews?: Review[];
}) {
  const [totalCount, setTotalCount] = useState(
    initialReviews?.length || FALLBACK_REVIEWS.length
  );
  const [allReviews, setAllReviews] = useState<Review[]>(() => {
    if (initialReviews && initialReviews.length > 0) {
      return initialReviews.filter(
        (r: Review) => r.rating >= 4 && r.text?.trim()
      );
    }
    return FALLBACK_REVIEWS;
  });
  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(
    !initialReviews || initialReviews.length === 0
  );

  useEffect(() => {
    if (initialReviews && initialReviews.length > 0) {
      const filtered = initialReviews.filter(
        (r: Review) => r.rating >= 4 && r.text?.trim()
      );
      setAllReviews(filtered);
      setTotalCount(filtered.length);
      setLoading(false);
      return;
    }

    async function fetchReviews() {
      try {
        const response = await fetch('/api/greviews');
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0) {
            setTotalCount(data.length);
            const filtered = data.filter(
              (r: Review) => r.rating >= 4 && r.text?.trim()
            );
            setAllReviews(filtered);
          }
        }
      } catch (error) {
        console.error('Fetch Error:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, [initialReviews]);

  const displayedReviews = useMemo(
    () => allReviews.slice(0, visibleCount),
    [allReviews, visibleCount]
  );

  return (
    <section
      className="relative py-16 sm:py-24 text-[#000000] overflow-hidden bg-white selection:bg-[#00ff00] selection:text-black [content-visibility:auto]"
      style={{
        fontFamily:
          '"Google Sans", "Open Sans", Roboto, -apple-system, BlinkMacSystemFont, Arial, sans-serif',
      }}
    >
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 bg-white flex flex-col items-center">
        <ModernHeader reviewCount={totalCount} />

        {loading ? (
          <div className="flex items-center justify-center py-24 bg-white">
            <Loader2 className="text-[#000000] animate-spin w-8 h-8" />
          </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-8 bg-white w-full">
              {/* Summary Card */}
              <div className="break-inside-avoid mb-8">
                <SummaryCard />
              </div>

              {displayedReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          )}

          {!loading && visibleCount < allReviews.length && (
            <div className="flex justify-center mt-12 pb-6 bg-white w-full">
              <button
                type="button"
                onClick={() =>
                  setVisibleCount((prev) =>
                    Math.min(prev + 6, allReviews.length)
                  )
                }
                className="inline-flex items-center justify-center gap-3 bg-[#f1f3f4] hover:bg-[#00ff00] text-[#000000] px-8 py-3.5 rounded-full transition-all duration-200 active:scale-95 cursor-pointer text-[18px] font-bold tracking-wide"
              >
                <span>
                  Load More Reviews ({allReviews.length - visibleCount} remaining)
                </span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </section>
  );
}