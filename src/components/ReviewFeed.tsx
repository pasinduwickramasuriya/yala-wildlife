/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { Star, MapPin, Quote, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Use a more robust interface
interface ReviewPhoto {
    reviewId: string;
    authorName: string;
    rating: number;
    relativeTime: string;
    reviewText: string;
    url: string;
}

export default function HierarchicalReviewGrid() {
    const [reviews, setReviews] = useState<ReviewPhoto[]>([]);
    const [loading, setLoading] = useState(true);

    // Optimized Fetching with AbortController to prevent memory leaks on slow networks
    useEffect(() => {
        const controller = new AbortController();

        async function fetchReviews() {
            try {
                const res = await fetch('/api/greview-photos', {
                    signal: controller.signal,
                    next: { revalidate: 3600 } // Cache hint for Next.js if supported by API
                });
                const data = await res.json();

                const premiumReviewsWithText = data.filter((p: any) =>
                    p.url &&
                    p.rating >= 4 &&
                    p.reviewText?.trim().length > 0
                );

                // Shuffle once and memoize for performance
                const curated = premiumReviewsWithText
                    .sort(() => Math.random() - 0.5)
                    .slice(0, 4);

                setReviews(curated);
            } catch (err) {
                if (err instanceof Error && err.name !== 'AbortError') {
                    console.error('Failed to fetch reviews:', err);
                }
            } finally {
                setLoading(false);
            }
        }

        fetchReviews();
        return () => controller.abort();
    }, []);

    // SEO Helper: Component for Structured Data (JSON-LD)
    const structuredData = useMemo(() => {
        if (reviews.length === 0) return null;
        return {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": reviews.map((r, i) => ({
                "@type": "Review",
                "position": i + 1,
                "author": { "@type": "Person", "name": r.authorName },
                "reviewBody": r.reviewText,
                "reviewRating": { "@type": "Rating", "ratingValue": r.rating }
            }))
        };
    }, [reviews]);

    if (loading) return (
        // Consistent height skeleton to prevent Layout Shift (CLS)
        <div className="max-w-7xl mx-auto px-6 py-2">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 min-h-[700px]">
                <div className="md:col-span-2 md:row-span-2 bg-white/5 animate-pulse rounded-[2.5rem]" />
                <div className="md:col-span-2 bg-white/5 animate-pulse rounded-[2.5rem]" />
                <div className="bg-white/5 animate-pulse rounded-[2.5rem]" />
                <div className="bg-white/5 animate-pulse rounded-[2.5rem]" />
            </div>
        </div>
    );

    return (
        <section className="bg-transparent py-2 overflow-hidden" aria-label="Guest Reviews">
            {/* SEO: Injection of Structured Data */}
            {structuredData && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
                />
            )}

            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 md:grid-rows-2 gap-4 auto-rows-min md:min-h-[700px]">

                    {/* 1. HERO IMAGE CARD - Large on Mobile too for impact */}
                    {reviews[0] && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="col-span-1 sm:col-span-2 md:col-span-2 md:row-span-2 relative group rounded-[2.5rem] overflow-hidden min-h-[400px] md:min-h-0 shadow-lg"
                        >
                            <img
                                src={reviews[0].url}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                alt={`Review by ${reviews[0].authorName}`}
                                loading="eager" // Hero image should load fast
                                decoding="async"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />

                            <div className="absolute bottom-0 p-6 md:p-8 w-full">
                                <div className="flex gap-1 mb-3">
                                    {[...Array(reviews[0].rating)].map((_, i) => (
                                        <Star key={i} size={14} className="fill-[#00ff00] text-[#00ff00]" aria-hidden="true" />
                                    ))}
                                </div>
                                <blockquote className="text-[14px] md:text-[15px] leading-relaxed text-white/90 mb-6 line-clamp-4 italic font-medium">
                                    "{reviews[0].reviewText}"
                                </blockquote>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-white uppercase text-xs border border-white/20">
                                        {reviews[0].authorName.charAt(0)}
                                    </div>
                                    <cite className="text-white not-italic font-bold text-[15px]">{reviews[0].authorName}</cite>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* 2. TEXT EMPHASIS CARD - Improved wrapping on narrow screens */}
                    {reviews[1] && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="col-span-1 sm:col-span-2 md:col-span-2 bg-[#00ff00] rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between shadow-lg"
                        >
                            <div className="flex justify-between items-start">
                                <span className="bg-black text-[#00ff00] px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">
                                    Guest Review
                                </span>
                                <Quote className="text-black/20 w-8 h-8 md:w-10 md:h-10" />
                            </div>

                            <p className="text-black text-[14px] md:text-[15px] font-bold leading-relaxed my-6 line-clamp-5 md:line-clamp-6">
                                "{reviews[1].reviewText}"
                            </p>

                            <div className="flex items-center gap-3">
                                <div className="h-px w-8 bg-black/20" />
                                <span className="text-black text-[13px] font-black uppercase tracking-tight">
                                    {reviews[1].authorName}
                                </span>
                            </div>
                        </motion.div>
                    )}

                    {/* 3. PURE IMAGE SNAPSHOT - Hidden on very small devices or kept as square */}
                    {reviews[2] && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative group rounded-[2.5rem] overflow-hidden aspect-square sm:aspect-auto shadow-lg"
                        >
                            <img
                                src={reviews[2].url}
                                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                                alt="Safari Snapshot"
                                loading="lazy"
                                decoding="async"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <ArrowUpRight className="text-white w-8 h-8" />
                            </div>
                        </motion.div>
                    )}

                    {/* 4. HYBRID GLASS CARD */}
                    {reviews[3] && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="bg-black/80 rounded-[2.5rem] p-8 flex flex-col justify-center shadow-lg border border-white/5"
                        >
                            <div className="flex gap-0.5 mb-4">
                                {[...Array(reviews[3].rating)].map((_, i) => (
                                    <Star key={i} size={10} className="fill-[#00ff00] text-[#00ff00]" />
                                ))}
                            </div>
                            <p className="text-[14px] md:text-[15px] text-white/80 leading-relaxed italic line-clamp-4 md:line-clamp-3 mb-6">
                                "{reviews[3].reviewText}"
                            </p>
                            <div className="flex items-center gap-2">
                                <MapPin size={12} className="text-[#00ff00]" />
                                <span className="text-[11px] font-black text-white/40 uppercase tracking-[0.2em]">
                                    {reviews[3].authorName}
                                </span>
                            </div>
                        </motion.div>
                    )}

                </div>
            </div>
        </section>
    );
}