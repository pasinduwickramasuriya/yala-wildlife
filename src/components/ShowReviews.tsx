"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";

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
    async function fetchReviews() {
      try {
        const response = await fetch("/api/reviews", { cache: "no-store" });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `Failed to fetch reviews: ${response.status} - ${errorText}`
          );
        }
        const data: CustomerReview[] = await response.json();
        setReviews(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred"
        );
      } finally {
        setLoading(false);
      }
    }
    fetchReviews();
  }, []);

  // Loading state
  if (loading) {
    return (
      <section className="relative py-20 px-4 md:px-8 bg-background min-h-[60vh]">
      <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-16 drop-shadow tracking-tight">
          Customer Reviews
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-16 justify-center items-start">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-6 py-10 px-4"
            >
              <Skeleton className="h-20 w-20 rounded-full" />
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-4 w-56 mt-8" />
              <Skeleton className="h-4 w-32 mt-3" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-20 px-4 md:px-8 bg-background min-h-[60vh] overflow-x-clip">
      <h2 className="text-3xl md:text-3xl font-extrabold text-center mb-16  drop-shadow tracking-tight">
        Customer Reviews
      </h2>
      {error ? (
        <Alert variant="destructive" className="mb-8 max-w-lg mx-auto">
          <AlertDescription>{error}. Please try again later.</AlertDescription>
        </Alert>
      ) : reviews.length === 0 ? (
        <Alert variant="default" className="mb-8 max-w-lg mx-auto">
          <AlertDescription>
            No approved reviews available yet.
          </AlertDescription>
        </Alert>
      ) : (
        <div className="relative w-full max-w-7xl mx-auto min-h-[60vh]">
          <div
            className="
              grid 
              grid-cols-1 
              sm:grid-cols-2 
              md:grid-cols-3 
              gap-x-12 gap-y-16 
              relative 
              z-10
            "
          >
            {reviews.map((review) => (
              <div
                key={review.id}
                className={`
                  flex flex-col items-center text-center
                  py-10 px-6
                  transition-all
                  hover:bg-accent/50
                  rounded-2xl
                  group
                `}
                // No bg, border, or shadow!
              >
                <Avatar className="h-20 w-20 ring-2 ring-accent shadow-md mb-4">
                  <AvatarImage
                    src={review.imageUrl || undefined}
                    alt={review.customerName}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "/fallback-image.jpg";
                    }}
                  />
                  <AvatarFallback>
                    {review.customerName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-center mb-2">
                  <span className="text-xl font-semibold drop-shadow">
                    {review.customerName}
                  </span>
                  <span className="text-muted-foreground text-base">
                    {review.customerEmail}
                  </span>
                </div>
                <p className="mb-4 text-base font-medium text-foreground/90 leading-relaxed">
                  {review.description}
                </p>
                <p className="text-xs text-muted-foreground mt-auto">
                  {new Date(review.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
