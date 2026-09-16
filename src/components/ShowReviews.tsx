"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

interface CustomerReview {
  id: string;
  customerName: string;
  customerEmail: string;
  description: string;
  imageUrl?: string | null;
  isApproved: boolean;
  createdAt: string;
}

export default function ShowReviews() {
  const [reviews, setReviews] = useState<CustomerReview[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchApprovedReviews() {
      try {
        const res = await fetch("/api/reviews?approvedOnly=true", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to load customer reviews");
        const data = await res.json();
        setReviews(data);
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred while fetching reviews.");
      } finally {
        setLoading(false);
      }
    }
    fetchApprovedReviews();
  }, []);

  return (
    <section className="relative py-24 px-4 md:px-8 overflow-hidden">
      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-2xl font-extrabold text-white mb-4">
            Customer{" "}
            <span className="text-green-400 relative">
              Reviews
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-green-400/30 rounded-full" />
            </span>
          </h2>
          <p className="text-green-200 text-lg max-w-2xl mx-auto">
            Hear what our adventurers say about their unforgettable Yala safari experiences
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 flex flex-col items-center"
              >
                <Skeleton className="h-20 w-20 rounded-full bg-green-400/20 mb-4" />
                <Skeleton className="h-6 w-32 bg-white/20 mb-2" />
                <Skeleton className="h-4 w-48 bg-white/10 mb-4" />
                <Skeleton className="h-4 w-full bg-white/10 mb-2" />
                <Skeleton className="h-4 w-3/4 bg-white/10 mb-4" />
                <Skeleton className="h-3 w-24 bg-green-400/20" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="max-w-lg mx-auto">
            <div className="bg-red-500/10 backdrop-blur-sm rounded-3xl p-8 text-center border border-red-500/20">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-red-400 text-2xl">⚠</span>
              </div>
              <p className="text-white text-lg">{error}</p>
              <p className="text-red-300 text-sm mt-2">Please try again later.</p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && reviews.length === 0 && (
          <div className="max-w-lg mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-center">
              <div className="w-16 h-16 bg-green-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-400 text-2xl">💬</span>
              </div>
              <p className="text-white text-lg">No approved reviews available yet.</p>
              <p className="text-green-300 text-sm mt-2">Be the first to share your adventure!</p>
            </div>
          </div>
        )}

        {/* Reviews Grid */}
        {!loading && !error && reviews.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="group bg-black/30 backdrop-blur-sm rounded-3xl p-8 flex flex-col items-center text-center hover:bg-green-900/20 transition-all duration-500 hover:shadow-2xl hover:shadow-green-400/10 cursor-pointer"
              >
                {/* Avatar with Glow Effect */}
                <div className="relative mb-6">
                  <Avatar className="h-20 w-20 ring-4 ring-green-400/50 shadow-2xl group-hover:ring-green-400 transition-all duration-300">
                    <AvatarImage
                      src={review.imageUrl || undefined}
                      alt={review.customerName}
                    />
                    <AvatarFallback className="bg-green-600 text-white text-lg font-bold">
                      {review.customerName
                        ? review.customerName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()
                        : "G"}
                    </AvatarFallback>
                  </Avatar>
                </div>

                {/* Customer Info */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-2 drop-shadow-lg group-hover:text-green-100 transition-colors">
                    {review.customerName}
                  </h3>
                  <p className="text-green-400 text-sm font-medium">
                    {review.customerEmail}
                  </p>
                </div>

                {/* Review Text */}
                <p className="text-white/90 font-medium leading-relaxed mb-6 flex-grow text-center group-hover:text-white transition-colors">
                  &quot;{review.description}&quot;
                </p>

                {/* Date */}
                <div className="mt-auto">
                  <p className="text-green-300 text-xs font-medium">
                    {new Date(review.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Reviews Count */}
        {!loading && !error && reviews.length > 0 && (
          <div className="flex justify-center mt-12">
            <div className="bg-black/30 backdrop-blur-sm rounded-full px-8 py-3">
              <span className="text-green-400 text-lg font-medium">
                {reviews.length} Happy Adventurers
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
