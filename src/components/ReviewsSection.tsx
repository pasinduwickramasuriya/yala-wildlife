"use client";

import { useState, useEffect } from "react";
import ReviewCard from "./ReviewCard";

// Define the Review type based on your Prisma CustomerReview schema
interface Review {
  id: number;
  customerName: string;
  customerEmail: string; // Optional; not displayed but included in schema
  description: string;
  imageUrl?: string; // Optional since it can be undefined
  isApproved: boolean; // Optional; used for filtering on server-side
}

const ReviewsSection = () => {
  // State to store fetched reviews
  const [reviews, setReviews] = useState<Review[]>([]);
  // State for loading and error handling
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch reviews from API on mount
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("/api/reviews");
        if (!response.ok) {
          throw new Error(`Failed to fetch reviews: ${response.status}`);
        }
        const data = await response.json();
        // Filter for approved reviews (if not done server-side)
        const approvedReviews = data.filter(
          (review: Review) => review.isApproved
        );
        setReviews(approvedReviews);
        setError(null);
      } catch (err: unknown) {
        console.error("Error fetching reviews:", err);
        if (err instanceof Error) {
          setError(err.message || "Failed to load reviews");
        } else {
          setError("Failed to load reviews");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-2xl md:text-2xl font-bold text-foreground text-center mb-12">
          What Our Adventurers Say
        </h2>
        {loading ? (
          <div className="text-center text-muted-foreground">
            Loading reviews...
          </div>
        ) : error ? (
          <div className="text-center text-destructive">{error}</div>
        ) : reviews.length === 0 ? (
          <div className="text-center text-muted-foreground">
            No reviews available yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <ReviewCard
                key={review.id}
                name={review.customerName}
                location={review.customerEmail.split("@")[1]} // Extract domain as a pseudo-location
                rating={5} // Static rating since schema doesn’t include it
                text={review.description}
                image={review.imageUrl || "https://via.placeholder.com/150"} // Fallback image if imageUrl is missing
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ReviewsSection;
