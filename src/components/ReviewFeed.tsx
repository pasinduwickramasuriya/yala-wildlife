import { Star, Quote } from 'lucide-react';

interface ReviewItem {
    reviewId: string;
    authorName: string;
    rating: number;
    relativeTime?: string;
    reviewText: string;
    url?: string;
}

const FALLBACK_REVIEWS: ReviewItem[] = [
    {
        reviewId: "fr-1",
        authorName: "Markus V.",
        rating: 5,
        relativeTime: "a week ago",
        reviewText: "Unbelievable safari experience in Yala! We spotted 2 Sri Lankan leopards resting on granite rocks and a huge elephant herd near the river.",
    },
    {
        reviewId: "fr-2",
        authorName: "Sarah Jenkins",
        rating: 5,
        relativeTime: "2 weeks ago",
        reviewText: "Our driver was super knowledgeable and patient. Best safari operator in Sri Lanka hands down!",
    },
    {
        reviewId: "fr-3",
        authorName: "David Miller",
        rating: 5,
        relativeTime: "a month ago",
        reviewText: "Top tier 4x4 jeep safari. Spotting a sloth bear foraging was the highlight of our entire trip to Sri Lanka.",
    },
    {
        reviewId: "fr-4",
        authorName: "Elena Rostova",
        rating: 5,
        relativeTime: "a month ago",
        reviewText: "Punctual pickup, incredible wildlife tracker, and stunning photography opportunities in Block 1.",
    }
];

const BUSINESS_SCHEMA = {
    "@type": "LocalBusiness",
    "name": "Yala Wildlife Safari",
    "image": "https://www.yalawildlife.com/logo.png",
    "url": "https://www.yalawildlife.com",
    "telephone": "+94-778-158-004",
    "priceRange": "$$",
    "address": {
        "@type": "PostalAddress",
        "addressLocality": "Tissamaharama",
        "addressRegion": "Southern Province",
        "addressCountry": "LK"
    }
} as const;

function StarRow({ count, size }: { count: number; size: number }) {
    const safeCount = Math.max(0, Math.min(5, Math.floor(count)));
    if (safeCount === 0) return null;

    return (
        <div className="inline-flex items-center gap-1" aria-label={`${safeCount} out of 5 stars`}>
            {Array.from({ length: safeCount }, (_, i) => (
                <Star
                    key={i}
                    size={size}
                    className="fill-[#00ff00] text-[#00ff00] shrink-0"
                    aria-hidden="true"
                />
            ))}
        </div>
    );
}

export default function ReviewFeed({ initialReviews = [] }: { initialReviews?: ReviewItem[] }) {
    const reviews = initialReviews.length >= 4
        ? initialReviews.slice(0, 4)
        : (initialReviews.length > 0 ? initialReviews : FALLBACK_REVIEWS);

    const first = reviews[0];
    const second = reviews[1];
    const fourth = reviews[3];

    const structuredData = reviews.length > 0
        ? JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": reviews.map((r, i) => ({
                "@type": "Review",
                "position": i + 1,
                "author": { "@type": "Person", "name": r.authorName },
                "reviewBody": r.reviewText,
                "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": r.rating,
                    "bestRating": "5",
                    "worstRating": "1"
                },
                "itemReviewed": BUSINESS_SCHEMA
            }))
        })
        : null;

    return (
        <section
            className="bg-transparent py-4 select-none antialiased [content-visibility:auto] [contain-intrinsic-size:auto_520px]"
            aria-label="Guest Reviews"
        >
            {structuredData && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: structuredData }}
                />
            )}

            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 [contain:layout]">

                    {/* 1. FEATURED REVIEW CARD */}
                    {first && (
                        <article className="col-span-1 sm:col-span-2 rounded-[2rem] md:rounded-[2.25rem] p-6 md:p-8 flex flex-col justify-between bg-black [contain:layout_style]">
                            <div>
                                <div className="mb-3.5">
                                    <StarRow count={first.rating} size={13} />
                                </div>

                                <blockquote className="text-[16px] md:text-[18px] leading-snug text-white font-medium tracking-[-0.01em] mb-5 line-clamp-4">
                                    &ldquo;{first.reviewText}&rdquo;
                                </blockquote>
                            </div>

                            <div className="flex items-center justify-between pt-3 border-t border-white/10">
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="w-9 h-9 rounded-full bg-[#00ff00] flex items-center justify-center font-bold text-black text-xs shrink-0">
                                        {first.authorName.charAt(0)}
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <cite className="text-white not-italic font-bold text-[14px] leading-tight truncate">
                                            {first.authorName}
                                        </cite>
                                        {first.relativeTime && (
                                            <span className="text-[11px] text-white/50 font-medium truncate">
                                                {first.relativeTime}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </article>
                    )}

                    {/* 2. HIGHLIGHT CARD (#00ff00 Surface) */}
                    {second && (
                        <article className="col-span-1 sm:col-span-2 bg-[#00ff00] rounded-[2rem] md:rounded-[2.25rem] p-6 sm:p-8 flex flex-col justify-between [contain:layout_style]">
                            <div className="flex justify-between items-center gap-2">
                                <div className="inline-flex items-center gap-2 bg-black text-[#00ff00] px-3.5 py-1.5 rounded-full">
                                    <Star size={11} className="fill-[#00ff00] text-[#00ff00] shrink-0" aria-hidden="true" />
                                    <span className="text-[11px] font-bold tracking-tight">
                                        Top Rated Guest Reviews
                                    </span>
                                </div>
                                <div className="w-9 h-9 rounded-full bg-black/10 flex items-center justify-center shrink-0" aria-hidden="true">
                                    <Quote className="text-black w-4 h-4" />
                                </div>
                            </div>

                            <p className="text-black text-[16px] md:text-[19px] font-bold leading-snug tracking-[-0.015em] my-5 line-clamp-4">
                                &ldquo;{second.reviewText}&rdquo;
                            </p>

                            <div className="flex items-center justify-between pt-3 border-t border-black/10">
                                <div className="flex items-center gap-2.5 min-w-0">
                                    <div className="w-8 h-8 rounded-full bg-black text-[#00ff00] flex items-center justify-center text-xs font-bold shrink-0">
                                        {second.authorName.charAt(0)}
                                    </div>
                                    <div className="min-w-0">
                                        <span className="text-black text-[13.5px] font-bold block leading-none truncate">
                                            {second.authorName}
                                        </span>
                                        {second.relativeTime && (
                                            <span className="text-black/60 text-[11px] font-medium block truncate">
                                                {second.relativeTime}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <span className="text-[11px] font-bold text-black bg-black/10 px-3 py-1 rounded-full shrink-0">
                                    5.0 ★
                                </span>
                            </div>
                        </article>
                    )}

                    {/* 4. FOURTH REVIEW CARD */}
                    {fourth && (
                        <article className="col-span-1 sm:col-span-2 md:col-span-2 md:col-start-2 bg-black rounded-[2rem] md:rounded-[2.25rem] p-6 flex flex-col justify-between [contain:layout_style]">
                            <div className="mb-3">
                                <StarRow count={fourth.rating} size={11} />
                            </div>

                            <p className="text-[14px] md:text-[14.5px] text-white/90 font-normal leading-relaxed line-clamp-4 my-2">
                                &ldquo;{fourth.reviewText}&rdquo;
                            </p>

                            <div className="flex items-center gap-2.5 pt-3 border-t border-white/10 mt-2">
                                <div className="w-7 h-7 rounded-full bg-white/10 text-[#00ff00] flex items-center justify-center text-[11px] font-bold shrink-0">
                                    {fourth.authorName.charAt(0)}
                                </div>
                                <span className="text-[13px] font-bold text-white truncate">
                                    {fourth.authorName}
                                </span>
                            </div>
                        </article>
                    )}

                </div>
            </div>
        </section>
    );
}