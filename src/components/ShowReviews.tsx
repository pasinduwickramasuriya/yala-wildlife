import Image from "next/image";

interface CustomerReview {
  id: string;
  customerName: string;
  customerEmail: string;
  description: string;
  imageUrl?: string | null;
  isApproved: boolean;
  createdAt: string;
}

async function fetchReviews(): Promise<CustomerReview[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) {
      throw new Error(
        "NEXT_PUBLIC_BASE_URL is not defined in the environment variables"
      );
    }

    const response = await fetch(`${baseUrl}/api/reviews`, {
      cache: "no-store",
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `Fetch failed with status: ${response.status}, Body: ${errorText}`
      );
      throw new Error(`Failed to fetch reviews: ${response.status}`);
    }

    const reviews: CustomerReview[] = await response.json();
    return reviews;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
}

export default async function ShowReviews() {
  const reviews = await fetchReviews();

  return (
    <section className="py-16 px-4 md:px-6 bg-background">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
        Customer Reviews
      </h2>
      {reviews.length === 0 ? (
        <p className="text-center text-muted-foreground">
          No approved reviews available yet.
        </p>
      ) : (
        <div className="container max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="p-6 rounded-full   flex flex-col items-center justify-center aspect-square max-w-md mx-auto"
            >
              {review.imageUrl && (
                <div className="relative h-32 w-32 mb-4">
                  <Image
                    src={review.imageUrl}
                    alt={`${review.customerName}'s review`}
                    fill
                    className="object-cover rounded-full"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={false}
                  />
                </div>
              )}
              <h3 className="text-xl font-semibold text-foreground text-center">
                {review.customerName}
              </h3>
              <p className="text-muted-foreground mt-2 text-center">
                {review.description}
              </p>
              <p className="text-sm text-muted-foreground/80 mt-2 text-center">
                {new Date(review.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="text-muted-foreground mt-2 text-center">
                {review.customerEmail}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
