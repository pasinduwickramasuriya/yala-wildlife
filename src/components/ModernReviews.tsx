'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { FaCheckCircle, FaChevronDown, FaSpinner } from 'react-icons/fa';

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

// --- Sub-Components ---

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
        }, 15);
        return () => clearInterval(intervalId);
    }, [startTyping, text]);

    return <span className="text-sm tracking-normal">{displayedText}{startTyping && displayedText.length < text.length ? <span className="animate-pulse">_</span> : ''}</span>;
};

const ModernHeader = ({ reviewCount }: { reviewCount: number }) => (
    <header className="mb-10 w-full flex flex-col md:flex-row items-center justify-center bg-black/80 rounded-3xl p-6 sm:p-8 gap-8 md:gap-12 border border-white/5 text-center md:text-left">
        {/* Left Side: Ratings Info */}
        <div className="flex flex-col items-center md:items-start gap-1">
            <div className="flex items-center gap-3">
                <span className="text-3xl font-bold tracking-tighter text-white">Google</span>
                <span className="text-2xl font-black text-[#00ff00]">5.0</span>
                <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    ))}
                </div>
            </div>
            <span className="text-xs text-neutral-400 uppercase tracking-[0.2em] font-medium">
                Based on {reviewCount} Verified Visitor Reviews
            </span>
        </div>

        {/* Vertical Divider (Visible only on Desktop) */}
        <div className="hidden md:block w-[1px] h-12 bg-white/10" />

        {/* Right Side: Button */}
        <a
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-black rounded-full px-8 py-3 text-[12px] font-bold uppercase tracking-widest transition-transform active:scale-95 shadow-lg shadow-[#00ff00]/10 shrink-0"
        >
            Write a Review
        </a>
    </header>
);

const SummaryCard = () => (
    <article className="flex flex-col bg-black/80 rounded-3xl p-6 border border-white/5">
        <div className="flex items-center gap-2 mb-5">
            <span className="bg-[#00ff00]/10 text-[#00ff00] rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider">AI Summary</span>
        </div>
        <ul className="space-y-4 text-neutral-200 leading-relaxed">
            <li className="flex gap-3 items-start text-[#00ff00]">
                <span className="text-xs mt-1.5">✦</span>
                <TypewriterText text="Knowledgeable guides with deep expertise in Yala's diverse ecosystems." delay={200} />
            </li>
            <li className="flex gap-3 items-start">
                <span className="text-[#00ff00] text-xs mt-1.5">✦</span>
                <TypewriterText text="Consistently high leopard and sloth bear sighting success rates." delay={1500} />
            </li>
            <li className="flex gap-3 items-start">
                <span className="text-[#00ff00] text-xs mt-1.5">✦</span>
                <TypewriterText text="Seamless booking process and highly punctual service." delay={3000} />
            </li>
        </ul>
    </article>
);

const ReviewCard = ({ review }: { review: Review }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const MAX_LENGTH = 100;

    return (
        <article className="inline-block w-full break-inside-avoid mb-6 bg-black/80 rounded-3xl p-6 border border-white/5">
            <div className="flex items-center gap-3 mb-4">
                <div className="relative w-10 h-10 shrink-0">
                    {/* Fixed: Used standard img tag to prevent hostname errors with Google profile pictures */}
                    {review.profile_photo_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={review.profile_photo_url}
                            alt={review.author_name}
                            className="w-10 h-10 rounded-full object-cover"
                        />
                    ) : (
                        <div className="w-10 h-10 bg-neutral-800 text-white rounded-full flex items-center justify-center text-xs font-bold">
                            {review.author_name.charAt(0)}
                        </div>
                    )}
                    <FaCheckCircle className="absolute -bottom-0.5 -right-0.5 text-blue-500 w-3.5 h-3.5 bg-black rounded-full" />
                </div>
                <div className="flex flex-col overflow-hidden">
                    <h3 className="font-bold text-white text-[15px] tracking-tight truncate leading-tight">{review.author_name}</h3>
                    <time className="text-xs text-neutral-500 uppercase tracking-wide mt-0.5">{review.relative_time_description}</time>
                </div>
            </div>

            <div className="flex mb-3 text-yellow-500">
                {[...Array(review.rating)].map((_, i) => (
                    <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                ))}
            </div>

            <div className="text-neutral-300 text-sm leading-relaxed font-light">
                {isExpanded ? review.text : `${review.text.slice(0, MAX_LENGTH)}${review.text.length > MAX_LENGTH ? '...' : ''}`}
                {review.text.length > MAX_LENGTH && (
                    <button onClick={() => setIsExpanded(!isExpanded)} className="text-[#00ff00] ml-1.5 text-xs font-bold uppercase tracking-tighter hover:underline decoration-1 underline-offset-4">
                        {isExpanded ? 'Show Less' : 'Read Full Review'}
                    </button>
                )}
            </div>
        </article>
    );
};

// --- Main Component ---

export default function ModernReviews() {
    const [totalCount, setTotalCount] = useState(0);
    const [allReviews, setAllReviews] = useState<Review[]>([]);
    const [visibleCount, setVisibleCount] = useState(12);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchReviews() {
            try {
                const response = await fetch('/api/greviews');
                if (response.ok) {
                    const data = await response.json();
                    setTotalCount(data.length);
                    const filtered = data.filter((r: any) => r.rating >= 4 && r.text?.trim());
                    setAllReviews(filtered.sort(() => Math.random() - 0.5));
                }
            } catch (error) {
                console.error("Fetch Error:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchReviews();
    }, []);

    const displayedReviews = useMemo(() => allReviews.slice(0, visibleCount), [allReviews, visibleCount]);

    return (
        <section className="relative py-16 sm:py-24 text-white overflow-hidden min-h-screen">
            {/* Background */}
            <div className="fixed inset-0 w-full h-full -z-50">
                <Image
                    src="/uploads/1748935199061-20250603_1239_Leopard%20Emerges%20from%20Darkness_simple_compose_01jwt9yv7qect8krxy794bcr23.webp"
                    alt="Yala Background"
                    fill
                    className="object-cover opacity-100"
                    priority
                />
                <div className="absolute inset-0 bg-black/20" />
            </div>

            <div className="w-full max-w-7xl mx-auto px-12 sm:px-8 lg:px-35 relative z-10">
                <ModernHeader reviewCount={totalCount} />

                {loading ? (
                    <div className="flex items-center justify-center py-32">
                        <FaSpinner className="text-[#00ff00] animate-spin w-8 h-8" />
                    </div>
                ) : (
                    /* The Masonry Container */
                    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6">
                        {/* Summary Card */}
                        <div className="break-inside-avoid mb-6">
                            <SummaryCard />
                        </div>

                        {displayedReviews.map((review) => (
                            <ReviewCard key={review.id} review={review} />
                        ))}
                    </div>
                )}

                {!loading && visibleCount < allReviews.length && (

                    <div className="flex justify-center mt-6 pb-6">
                        <button
                            onClick={() => setVisibleCount(allReviews.length)}
                            className="inline-flex items-center gap-4 bg-black/80 px-6 py-2.5 rounded-full  shadow-xl transition-all hover:bg-black group active:scale-95"
                        >
                            {/* Text: Reduced tracking for a tighter 'Petite' look */}
                            <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-black text-white/70 group-hover:text-[#00ff00] transition-colors">
                                Expand Feed
                            </span>

                            {/* Icon: Smaller and locked in a side-by-side layout */}
                            <div className="flex items-center justify-center w-5 h-5 rounded-full bg-white/5 group-hover:bg-[#00ff00]/10 transition-colors">
                                <FaChevronDown className="text-[#00ff00] text-[10px] group-hover:translate-y-0.5 transition-transform duration-300" />
                            </div>
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}