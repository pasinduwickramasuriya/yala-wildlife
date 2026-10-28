import Image from 'next/image';
import { Star, Quote, ArrowUpRight } from 'lucide-react';

interface ReviewPhoto {
    reviewId: string;
    authorName: string;
    rating: number;
    relativeTime?: string;
    reviewText: string;
    url: string;
}

const FALLBACK_REVIEWS: ReviewPhoto[] = [
    {
        reviewId: "fr-1",
        authorName: "Markus V.",
        rating: 5,
        relativeTime: "a week ago",
        reviewText: "Unbelievable safari experience in Yala! We spotted 2 Sri Lankan leopards resting on granite rocks and a huge elephant herd near the river.",
        url: "/uploads/yala1.webp",
    },
    {
        reviewId: "fr-2",
        authorName: "Sarah Jenkins",
        rating: 5,
        relativeTime: "2 weeks ago",
        reviewText: "Our driver was super knowledgeable and patient. Best safari operator in Sri Lanka hands down!",
        url: "/uploads/yala2.webp",
    },
    {
        reviewId: "fr-3",
        authorName: "David Miller",
        rating: 5,
        relativeTime: "a month ago",
        reviewText: "Top tier 4x4 jeep safari. Spotting a sloth bear foraging was the highlight of our entire trip to Sri Lanka.",
        url: "https://images.unsplash.com/photo-1547970810-dc92b3848368?q=80&w=800&auto=format&fit=crop",
    },
    {
        reviewId: "fr-4",
        authorName: "Elena Rostova",
        rating: 5,
        relativeTime: "a month ago",
        reviewText: "Punctual pickup, incredible wildlife tracker, and stunning photography opportunities in Block 1.",
        url: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=800&auto=format&fit=crop",
    }
];

export default function ReviewFeed({ initialReviews = [] }: { initialReviews?: ReviewPhoto[] }) {
    const reviews = initialReviews && initialReviews.length >= 4
        ? initialReviews.slice(0, 4)
        : (initialReviews && initialReviews.length > 0 ? initialReviews : FALLBACK_REVIEWS);

    // SEO Helper: Structured Data (JSON-LD) rendered purely on server
    const structuredData = reviews.length > 0 ? {
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
            "itemReviewed": {
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
            }
        }))
    } : null;

    return (
        <section
            className="bg-transparent py-4 overflow-hidden select-none antialiased [content-visibility:auto] [contain-intrinsic-size:auto_640px]"
            aria-label="Guest Reviews"
            style={{
                fontFamily: '"Google Sans", "Open Sans", Roboto, -apple-system, BlinkMacSystemFont, Arial, sans-serif',
            }}
        >
            {/* SEO: Injection of Structured Data */}
            {structuredData && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
                />
            )}

            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 md:grid-rows-2 gap-4 auto-rows-min md:min-h-[640px]">

                    {/* 1. GOOGLE EDITORIAL HERO CARD */}
                    {reviews[0] && (
                        <article
                            className="col-span-1 sm:col-span-2 md:col-span-2 md:row-span-2 relative group rounded-[2rem] md:rounded-[2.25rem] overflow-hidden min-h-[360px] md:min-h-0 bg-black transform-gpu [contain:paint]"
                        >
                            <Image
                                src={reviews[0].url}
                                alt={`Review photo by ${reviews[0].authorName}`}
                                fill
                                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 48vw, 38vw"
                                loading="lazy"
                                decoding="async"
                                quality={55}
                                className="object-cover transition-transform duration-300 ease-out md:group-hover:scale-[1.03]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />


                            <div className="absolute bottom-0 p-6 md:p-8 w-full flex flex-col justify-end">
                                <div className="inline-flex items-center gap-1 bg-transparent w-fit px-3 py-1 rounded-full mb-3.5">
                                    {[...Array(reviews[0].rating)].map((_, i) => (
                                        <Star key={i} size={13} className="fill-[#00ff00] text-[#00ff00]" aria-hidden="true" />
                                    ))}
                                </div>

                                <blockquote className="text-[16px] md:text-[18px] leading-snug text-white font-medium tracking-[-0.01em] mb-5 line-clamp-4">
                                    &ldquo;{reviews[0].reviewText}&rdquo;
                                </blockquote>

                                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-full bg-[#00ff00] flex items-center justify-center font-bold text-black text-xs shrink-0">
                                            {reviews[0].authorName.charAt(0)}
                                        </div>
                                        <div className="flex flex-col">
                                            <cite className="text-white not-italic font-bold text-[14px] leading-tight">
                                                {reviews[0].authorName}
                                            </cite>
                                            {reviews[0].relativeTime && (
                                                <span className="text-[11px] text-white/50 font-medium">
                                                    {reviews[0].relativeTime}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    )}

                    {/* 2. GOOGLE MATERIAL HIGHLIGHT CARD (#00ff00 Surface) */}
                    {reviews[1] && (
                        <article
                            className="col-span-1 sm:col-span-2 md:col-span-2 bg-[#00ff00] rounded-[2rem] md:rounded-[2.25rem] p-6 sm:p-8 flex flex-col justify-between transform-gpu [contain:layout_paint]"
                        >
                            <div className="flex justify-between items-center">
                                <div className="inline-flex items-center gap-2 bg-black text-[#00ff00] px-3.5 py-1.5 rounded-full">
                                    <Star size={11} className="fill-[#00ff00] text-[#00ff00]" />
                                    <span className="text-[11px] font-bold tracking-tight">
                                        Top Rated Guest Reviews
                                    </span>
                                </div>
                                <div className="w-9 h-9 rounded-full bg-black/10 flex items-center justify-center">
                                    <Quote className="text-black w-4 h-4" />
                                </div>
                            </div>

                            <p className="text-black text-[16px] md:text-[19px] font-bold leading-snug tracking-[-0.015em] my-5 line-clamp-4">
                                &ldquo;{reviews[1].reviewText}&rdquo;
                            </p>

                            <div className="flex items-center justify-between pt-3 border-t border-black/10">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-full bg-black text-[#00ff00] flex items-center justify-center text-xs font-bold">
                                        {reviews[1].authorName.charAt(0)}
                                    </div>
                                    <div>
                                        <span className="text-black text-[13.5px] font-bold block leading-none">
                                            {reviews[1].authorName}
                                        </span>
                                        {reviews[1].relativeTime && (
                                            <span className="text-black/60 text-[11px] font-medium">
                                                {reviews[1].relativeTime}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <span className="text-[11px] font-bold text-black bg-black/10 px-3 py-1 rounded-full">
                                    5.0 ★
                                </span>
                            </div>
                        </article>
                    )}

                    {/* 3. GOOGLE MEDIA CAPSULE CARD */}
                    {reviews[2] && (
                        <div
                            className="relative group rounded-[2rem] md:rounded-[2.25rem] overflow-hidden aspect-[4/3] sm:aspect-auto min-h-[220px] bg-black transform-gpu [contain:paint]"
                        >
                            <Image
                                src={reviews[2].url}
                                alt={`Safari Snapshot review by ${reviews[2].authorName}`}
                                fill
                                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 24vw, 18vw"
                                loading="lazy"
                                decoding="async"
                                quality={50}
                                className="object-cover transition-transform duration-300 ease-out md:group-hover:scale-[1.03]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                            <div className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-black/80 text-white group-hover:bg-[#00ff00] group-hover:text-black transition-colors duration-150 flex items-center justify-center">
                                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                            </div>
                        </div>
                    )}

                    {/* 4. GOOGLE DARK ISLAND REVIEW CARD */}
                    {reviews[3] && (
                        <article
                            className="bg-black/80 rounded-[2rem] md:rounded-[2.25rem] p-6 flex flex-col justify-between transform-gpu [contain:layout_paint]"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <div className="inline-flex items-center gap-1 bg-trasnparent px-2.5 py-1 rounded-full">
                                    {[...Array(reviews[3].rating)].map((_, i) => (
                                        <Star key={i} size={11} className="fill-[#00ff00] text-[#00ff00]" />
                                    ))}
                                </div>
                            </div>

                            <p className="text-[14px] md:text-[14.5px] text-white/90 font-normal leading-relaxed line-clamp-4 my-2">
                                &ldquo;{reviews[3].reviewText}&rdquo;
                            </p>

                            <div className="flex items-center gap-2.5 pt-3 border-t border-white/10 mt-2">
                                <div className="w-7 h-7 rounded-full bg-white/10 text-[#00ff00] flex items-center justify-center text-[11px] font-bold shrink-0">
                                    {reviews[3].authorName.charAt(0)}
                                </div>
                                <span className="text-[13px] font-bold text-white truncate">
                                    {reviews[3].authorName}
                                </span>
                            </div>
                        </article>
                    )}

                </div>
            </div>
        </section>
    );
}