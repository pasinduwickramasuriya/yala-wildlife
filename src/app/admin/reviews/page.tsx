// "use client";

// import { useState, useEffect } from "react";
// import Image from "next/image"; // Added import for Image component
// import { Button } from "@/components/ui/button";
// import AdminLayout from "@/components/admin/AdminLayout";

// interface CustomerReview {
//   id: string;
//   customerName: string;
//   customerEmail: string;
//   description: string;
//   imageUrl?: string | null;
//   isApproved: boolean;
//   createdAt: string;
// }

// export default function AdminReviewsPage() {
//   const [reviews, setReviews] = useState<CustomerReview[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const response = await fetch("/api/reviews?all=true", {
//           // Remove Authorization header if not needed, or use NEXT_PUBLIC_ADMIN_TOKEN
//           // headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN}` },
//           cache: "no-store",
//         });
//         if (!response.ok) {
//           const errorText = await response.text();
//           throw new Error(
//             `Failed to fetch reviews: ${response.status} - ${errorText}`
//           );
//         }
//         const data = await response.json();
//         setReviews(data);
//       } catch (error) {
//         console.error("Error fetching reviews:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchReviews();
//   }, []);

//   const handleApprove = async (id: string) => {
//     try {
//       const response = await fetch("/api/reviews", {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           // Remove or adjust Authorization as needed
//           // Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN}`,
//         },
//         body: JSON.stringify({ id }),
//       });
//       if (response.ok) {
//         setReviews(
//           reviews.map((r) => (r.id === id ? { ...r, isApproved: true } : r))
//         );
//       } else {
//         console.error("Failed to approve review:", await response.text());
//       }
//     } catch (error) {
//       console.error("Error approving review:", error);
//     }
//   };

//   const handleDelete = async (id: string) => {
//     if (confirm("Are you sure you want to delete this review?")) {
//       try {
//         const response = await fetch("/api/reviews", {
//           method: "DELETE",
//           headers: {
//             "Content-Type": "application/json",
//             // Remove or adjust Authorization as needed
//             // Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN}`,
//           },
//           body: JSON.stringify({ id }),
//         });
//         if (response.ok) {
//           setReviews(reviews.filter((r) => r.id !== id));
//         } else {
//           console.error("Failed to delete review:", await response.text());
//         }
//       } catch (error) {
//         console.error("Error deleting review:", error);
//       }
//     }
//   };

//   return (
//     <AdminLayout>
//       <div className="min-h-screen bg-background p-6">
//         <h1 className="text-3xl font-bold text-foreground mb-8">
//           Manage Customer Reviews
//         </h1>
//         {loading ? (
//           <p className="text-muted-foreground">Loading...</p>
//         ) : reviews.length === 0 ? (
//           <p className="text-muted-foreground">No reviews found.</p>
//         ) : (
//           <div className="space-y-4">
//             {reviews.map((review) => (
//               <div
//                 key={review.id}
//                 className="p-4 bg-card rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
//               >
//                 <div className="flex flex-col sm:flex-row items-start gap-4">
//                   {/* Added: Display image if imageUrl exists */}
//                   {review.imageUrl && (
//                     <Image
//                       src={review.imageUrl}
//                       alt={`${review.customerName}'s review`}
//                       width={100}
//                       height={100}
//                       className="rounded-md object-cover"
//                       onError={(e) => (e.currentTarget.src = "/fallback-image.jpg")}
//                     />
//                   )}
//                   <div>
//                     <h2 className="text-xl font-semibold text-foreground">
//                       {review.customerName}
//                     </h2>
//                     <p className="text-muted-foreground">{review.description}</p>
//                     <p className="text-sm text-muted-foreground">
//                       Email: {review.customerEmail}
//                     </p>
//                     <p className="text-sm text-muted-foreground">
//                       Status: {review.isApproved ? "Approved" : "Pending"}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex gap-2">
//                   {!review.isApproved && (
//                     <Button
//                       onClick={() => handleApprove(review.id)}
//                       className="bg-green-600 hover:bg-green-700"
//                     >
//                       Approve
//                     </Button>
//                   )}
//                   <Button
//                     onClick={() => handleDelete(review.id)}
//                     variant="destructive"
//                   >
//                     Delete
//                   </Button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </AdminLayout>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import AdminLayout from "@/components/admin/AdminLayout";

interface CustomerReview {
  id: string;
  customerName: string;
  customerEmail: string;
  description: string;
  imageUrl?: string | null;
  isApproved: boolean;
  createdAt: string;
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<CustomerReview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("/api/reviews?all=true", {
          cache: "no-store",
        });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `Failed to fetch reviews: ${response.status} - ${errorText}`
          );
        }
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      const response = await fetch("/api/reviews", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        setReviews(
          reviews.map((r) => (r.id === id ? { ...r, isApproved: true } : r))
        );
      } else {
        console.error("Failed to approve review:", await response.text());
      }
    } catch (error) {
      console.error("Error approving review:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this review?")) {
      try {
        const response = await fetch("/api/reviews", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        });
        if (response.ok) {
          setReviews(reviews.filter((r) => r.id !== id));
        } else {
          console.error("Failed to delete review:", await response.text());
        }
      } catch (error) {
        console.error("Error deleting review:", error);
      }
    }
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-background p-6">
        <h1 className="text-3xl font-bold text-foreground mb-8">
          Manage Customer Reviews
        </h1>
        {loading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : reviews.length === 0 ? (
          <p className="text-muted-foreground">No reviews found.</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="p-4 bg-card rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
              >
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  {review.imageUrl && (
                    <Image
                      src={review.imageUrl}
                      alt={`${review.customerName}'s review`}
                      width={100}
                      height={100}
                      className="rounded-md object-cover"
                      onError={(e) => (e.currentTarget.src = "/fallback-image.jpg")}
                    />
                  )}
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">
                      {review.customerName}
                    </h2>
                    <p className="text-muted-foreground">{review.description}</p>
                    <p className="text-sm text-muted-foreground">
                      Email: {review.customerEmail}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Status: {review.isApproved ? "Approved" : "Pending"}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {!review.isApproved && (
                    <Button
                      onClick={() => handleApprove(review.id)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Approve
                    </Button>
                  )}
                  <Button
                    onClick={() => handleDelete(review.id)}
                    variant="destructive"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}