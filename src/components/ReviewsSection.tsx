"use client";

import { useState, useEffect, useRef } from "react";
import ReviewCard from "./ReviewCard";

interface Review {
  id: number;
  customerName: string;
  customerEmail: string;
  description: string;
  imageUrl?: string;
  isApproved: boolean;
}

const ReviewsSection = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  // Fetch reviews from API
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("/api/reviews");
        if (!response.ok) {
          throw new Error(`Failed to fetch reviews: ${response.status}`);
        }
        const data = await response.json();
        const approvedReviews = data.filter((review: Review) => review.isApproved);
        setReviews(approvedReviews);
        setError(null);
      } catch (err: unknown) {
        console.error("Error fetching reviews:", err);
        setError(err instanceof Error ? err.message || "Failed to load reviews" : "Failed to load reviews");
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  // Smooth auto-scroll animation
  useEffect(() => {
    if (!scrollRef.current || reviews.length <= 3 || isPaused) return;

    let scrollPosition = 0;
    const scrollContainer = scrollRef.current;
    const scrollSpeed = 0.5;

    const animate = () => {
      if (!scrollContainer) return;

      scrollPosition += scrollSpeed;
      const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;

      if (scrollPosition >= maxScroll) {
        scrollPosition = 0;
      }

      scrollContainer.scrollLeft = scrollPosition;
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [reviews, isPaused]);

  // Pause animation on hover
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background with blur effect */}
      <div className="absolute inset-0  backdrop-blur-xl"></div>

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-r  via-transparent "></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent  to-transparent"></div>

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-2xl font-bold text-white mb-4">
            What Our{" "}
            <span className="text-green-400 relative">
              Adventurers
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-green-400/30 rounded-full"></div>
            </span>{" "}
            Say
          </h2>
          <p className="text-green-200 text-lg max-w-2xl mx-auto">
            Discover the experiences that make our safari adventures truly unforgettable
          </p>
        </div>

        {/* Content Area */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-400 border-t-transparent mx-auto mb-4"></div>
              <p className="text-green-200 text-lg">Loading amazing stories...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center max-w-md">
              <div className="bg-red-500/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-red-400 text-2xl">⚠</span>
              </div>
              <p className="text-white text-lg">{error}</p>
            </div>
          </div>
        ) : reviews.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center max-w-md">
              <div className="bg-green-400/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-green-400 text-2xl">💬</span>
              </div>
              <p className="text-green-200 text-lg">No reviews available yet.</p>
              <p className="text-white/60 text-sm mt-2">Be the first to share your adventure!</p>
            </div>
          </div>
        ) : (
          <div className="relative">
            {/* Scroll Container */}
            <div
              ref={scrollRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="flex gap-6 overflow-x-hidden scrollbar-hide cursor-pointer select-none"
              style={{
                maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
                WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
              }}
            >
              {/* Duplicate reviews for seamless loop */}
              {[...reviews, ...reviews].map((review, index) => (
                <div
                  key={`${review.id}-${index}`}
                  className="flex-shrink-0 w-80 sm:w-96 transform transition-all duration-500 hover:scale-105"
                >
                  <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 h-full hover:border-green-400/30 transition-all duration-300 hover:shadow-2xl hover:shadow-green-400/10">
                    <ReviewCard
                      name={review.customerName}
                      location={review.customerEmail.split("@")[1]}
                      rating={5}
                      text={review.description}
                      image={review.imageUrl || "https://via.placeholder.com/150"}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Pause Indicator */}
            {isPaused && (
              <div className="absolute top-4 right-4 bg-green-400/20 backdrop-blur-sm rounded-full px-3 py-1">
                <span className="text-green-400 text-sm font-medium">Paused</span>
              </div>
            )}

            {/* Scroll Indicators */}
            <div className="flex justify-center mt-8 gap-2">
              {reviews.slice(0, Math.min(5, reviews.length)).map((_, index) => (
                <div
                  key={index}
                  className="w-2 h-2 rounded-full bg-green-400/30 transition-all duration-300 hover:bg-green-400/60"
                ></div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Floating Elements for Visual Interest */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-green-400/5 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-green-400/3 rounded-full blur-2xl animate-pulse delay-1000"></div>
    </section>
  );
};

export default ReviewsSection;
