'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaCheckCircle, FaChevronDown } from 'react-icons/fa';

// --- Helper: Typewriter Animation Component ---
const TypewriterText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [startTyping, setStartTyping] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setStartTyping(true), delay);
        return () => clearTimeout(timer);
    }, [delay]);

    useEffect(() => {
        if (!startTyping) return;

        let index = 0;
        const intervalId = setInterval(() => {
            if (index < text.length) {
                setDisplayedText((prev) => prev + text.charAt(index));
                index++;
            } else {
                clearInterval(intervalId);
            }
        }, 20);

        return () => clearInterval(intervalId);
    }, [startTyping, text]);

    return <span>{displayedText}{startTyping && displayedText.length < text.length ? <span className="animate-pulse">|</span> : ''}</span>;
};

// --- Helper: Shuffle Function ---
function shuffleArray<T>(array: T[]): T[] {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// --- Types ---
interface Review {
    id: string;
    author_name: string;
    profile_photo_url: string;
    rating: number;
    relative_time_description: string;
    text: string;
}

const GOOGLE_REVIEW_URL = 'https://www.google.com/search?hl=en-LK&gl=lk&q=Yala+Wildlife+Safari,+wickrama,+kasingama,+Tissamaharama+82600&ludocid=17345582408778303798&lsig=AB86z5Ub-4udBz4Uw52lwiIBzLZm#lrd=0x62b813f2717b2b81:0xf0b7e34cc97ec936,3';

// --- Components ---

const ModernHeader = ({ reviewCount }: { reviewCount: number }) => (
    <div className="mb-12 w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center bg-neutral-900/60 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 shadow-2xl hover:scale-[1.01] transition-transform duration-500 gap-8 md:gap-16">

        {/* Left Side: Google Logo & Rating */}
        <div className="flex flex-col items-center text-center gap-2">
            <span className="text-4xl font-bold flex items-center justify-center gap-2">
                <span className="font-sans text-[36px] sm:text-[40px]" style={{ color: "#4285F4" }}>G</span>
                <span className="font-sans text-[36px] sm:text-[40px]" style={{ color: "#EA4335" }}>o</span>
                <span className="font-sans text-[36px] sm:text-[40px]" style={{ color: "#FBBC05" }}>o</span>
                <span className="font-sans text-[36px] sm:text-[40px]" style={{ color: "#34A853" }}>g</span>
                <span className="font-sans text-[36px] sm:text-[40px]" style={{ color: "#EA4335" }}>l</span>
                <span className="font-sans text-[36px] sm:text-[40px]" style={{ color: "#4285F4" }}>e</span>
                <span className="text-white ml-2">5.0</span>
            </span>

            <div className="flex flex-col items-center">
                <div className="flex gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-6 h-6 text-yellow-400 drop-shadow-md" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    ))}
                </div>
                <span className="text-sm font-medium text-neutral-400 tracking-widest uppercase">Based on {reviewCount} Reviews</span>
            </div>
        </div>

        {/* Right Side: Button */}
        <a
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto text-center bg-green-600 text-white rounded-full px-10 py-4 text-base font-bold hover:bg-green-500 hover:-translate-y-1 shadow-lg hover:shadow-green-500/40 transition-all duration-300 flex-shrink-0"
        >
            Write a review
        </a>
    </div>
);

const SummaryCard = () => (
    <div className="flex flex-col bg-neutral-900/60 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 shadow-lg animate-fadeIn hover:shadow-2xl transition-all duration-500 h-full">
        <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span className="bg-gradient-to-r from-green-600 to-green-500 text-white rounded-full px-4 py-1.5 text-xs font-bold flex items-center gap-2 shadow-md">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                AI Summary
            </span>
            <span className="text-[10px] uppercase tracking-widest text-neutral-500 ml-1">Verified by Google</span>
        </div>

        <span className="flex mb-4 pl-1">
            {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </span>

        <ul className="mb-2 pl-2 space-y-3 text-neutral-200 text-sm leading-relaxed">
            <li className="flex gap-3 items-start">
                <span className="text-green-500 mt-0.5 flex-shrink-0">✦</span>
                <span className="block"><TypewriterText text="Knowledgeable and friendly guides enhance the safari experience." delay={500} /></span>
            </li>
            <li className="flex gap-3 items-start">
                <span className="text-green-500 mt-0.5 flex-shrink-0">✦</span>
                <span className="block"><TypewriterText text="Guests reported memorable wildlife sightings, including elephants and leopards." delay={2500} /></span>
            </li>
            <li className="flex gap-3 items-start">
                <span className="text-green-500 mt-0.5 flex-shrink-0">✦</span>
                <span className="block"><TypewriterText text="The safari is well-organized, ensuring a fantastic adventure." delay={5500} /></span>
            </li>
        </ul>
    </div>
);

const ReviewCard = ({ review }: { review: Review }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const MAX_LENGTH = 90;

    const shouldTruncate = review.text.length > MAX_LENGTH && !isExpanded;
    const displayText = shouldTruncate
        ? review.text.slice(0, MAX_LENGTH) + '... '
        : review.text;

    return (
        <div className="group flex flex-col h-full bg-neutral-900/60 backdrop-blur-md border border-white/5 rounded-[2rem] p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-neutral-900/70 hover:shadow-xl animate-fadeIn">
            <div className="flex items-center gap-3 mb-4">
                {review.profile_photo_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={review.profile_photo_url}
                        alt={review.author_name}
                        className="w-10 h-10 rounded-full object-cover border border-white/10 shadow-sm"
                    />
                ) : (
                    <div className="w-10 h-10 bg-green-700 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-sm">
                        {review.author_name.charAt(0)}
                    </div>
                )}
                <div>
                    <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-white text-sm line-clamp-1">{review.author_name}</h4>
                        <FaCheckCircle className="text-blue-400 w-3 h-3 flex-shrink-0" />
                    </div>
                    <span className="text-[10px] text-neutral-500 font-medium uppercase tracking-wide">{review.relative_time_description}</span>
                </div>
            </div>

            <div className="flex gap-0.5 text-yellow-400 mb-3 pl-1">
                {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-3.5 h-3.5 ${i < review.rating ? 'fill-current' : 'text-neutral-700'}`} viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
            </div>

            <p className="text-neutral-300 text-sm leading-6 font-light pl-1">
                {displayText}
                {review.text.length > MAX_LENGTH && (
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-green-400 hover:text-green-300 ml-1 focus:outline-none font-medium text-xs"
                    >
                        {isExpanded ? 'Show less' : 'Read more'}
                    </button>
                )}
            </p>

            <div className="mt-auto pt-4 flex items-center gap-2 opacity-30 pl-1">
                <span className="text-[9px] text-neutral-400 uppercase tracking-widest font-semibold">Google Review</span>
            </div>
        </div>
    );
};

export default function ModernReviews() {
    const [allReviews, setAllReviews] = useState<Review[]>([]);
    const [visibleCount, setVisibleCount] = useState(7);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchReviews() {
            try {
                const response = await fetch('/api/greviews');
                if (response.ok) {
                    const data = (await response.json()) as Review[];
                    const randomizedData = shuffleArray(data);
                    setAllReviews(randomizedData);
                }
            } catch (error) {
                console.error("Failed to fetch reviews", error);
            } finally {
                setLoading(false);
            }
        }

        fetchReviews();
    }, []);

    const handleLoadMore = () => {
        setVisibleCount(allReviews.length);
    };

    if (loading) return null;
    if (allReviews.length === 0) return null;

    const displayedReviews = allReviews.slice(0, visibleCount);
    const hasMore = visibleCount < allReviews.length;

    return (
        // 1. Removed 'bg-neutral-950' to allow background image to show
        // 2. Added min-h-screen to ensure full height coverage
        <section className="relative py-20 text-white overflow-hidden min-h-screen">

            {/* Background Image Container - Fixed position for Parallax effect */}
            <div className="fixed inset-0 w-full h-full -z-50">
                {/* Replaced spaces with %20 in URL for safety */}
                <Image
                    src="/uploads/1748935199061-20250603_1239_Leopard%20Emerges%20from%20Darkness_simple_compose_01jwt9yv7qect8krxy794bcr23.webp"
                    alt="Leopard background"
                    fill
                    priority={true} // ⚡ Loads image immediately
                    quality={85}
                    sizes="100vw"
                    className="object-cover object-center"
                />
                {/* Dark Overlay to make text readable     backdrop-blur-[2px]*/}
                <div className="absolute inset-0 bg-neutral-950/40 " />
            </div>

            {/* Content Container */}
            <div className="w-full container mx-auto px-4 md:px-12 lg:px-24 xl:px-40 max-w-[1920px] relative z-10">

                <ModernHeader reviewCount={allReviews.length} />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
                    {/* Summary Card */}
                    <div className="h-full">
                        <SummaryCard />
                    </div>

                    {/* Review Cards */}
                    {displayedReviews.map((review) => (
                        <ReviewCard key={review.id} review={review} />
                    ))}
                </div>

                {/* Load More Button */}
                {hasMore && (
                    <div className="flex justify-center w-full animate-fadeIn pb-10">
                        <button
                            onClick={handleLoadMore}
                            className="group flex flex-col items-center gap-2 text-neutral-400 hover:text-white transition-colors duration-300 focus:outline-none"
                        >
                            <span className="text-sm uppercase tracking-widest font-bold bg-neutral-900/50 backdrop-blur-md border border-white/10 px-8 py-3 rounded-full group-hover:bg-green-600 group-hover:border-green-500 transition-all duration-300 shadow-xl">
                                Load More Reviews
                            </span>
                            <FaChevronDown className="w-4 h-4 animate-bounce text-green-500 group-hover:text-white" />
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}