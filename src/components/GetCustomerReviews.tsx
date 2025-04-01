// "use client";

// import { useState, FormEvent } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";

// export default function GetCustomerReviews() {
//   const [isFormOpen, setIsFormOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     customerName: "",
//     customerEmail: "",
//     description: "",
//     image: null as File | null,
//   });
//   const [message, setMessage] = useState<string | null>(null);

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     const data = new FormData();
//     data.append("customerName", formData.customerName);
//     data.append("customerEmail", formData.customerEmail);
//     data.append("description", formData.description);
//     if (formData.image) data.append("image", formData.image);

//     try {
//       const response = await fetch("/api/reviews", {
//         method: "POST",
//         body: data,
//       });
//       if (!response.ok) throw new Error("Failed to submit review");
//       setMessage("Review submitted! Awaiting approval.");
//       setFormData({
//         customerName: "",
//         customerEmail: "",
//         description: "",
//         image: null,
//       });
//       setIsFormOpen(false);
//     } catch {
//       // Changed: Removed unused 'error' variable to fix @typescript-eslint/no-unused-vars
//       setMessage("Error submitting review.");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-6">
//       {/* Button to toggle form visibility */}
//       {!isFormOpen && (
//         <Button
//           onClick={() => setIsFormOpen(true)}
//           className="w-full bg-green-600 hover:bg-green-700 text-white rounded-lg"
//         >
//           Add Your Adventure Review
//         </Button>
//       )}

//       {/* Form (visible only when isFormOpen is true) */}
//       {isFormOpen && (
//         <div className="rounded-lg shadow-md p-6">
//           <h2 className="text-2xl font-bold text-foreground mb-4">
//             Share Your Experience
//           </h2>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <Input
//               placeholder="Your Name"
//               value={formData.customerName}
//               onChange={(e) =>
//                 setFormData({ ...formData, customerName: e.target.value })
//               }
//               required
//             />
//             <Input
//               placeholder="Your Email"
//               type="email"
//               value={formData.customerEmail}
//               onChange={(e) =>
//                 setFormData({ ...formData, customerEmail: e.target.value })
//               }
//               required
//             />
//             <Textarea
//               placeholder="Tell us about your adventure..."
//               value={formData.description}
//               onChange={(e) =>
//                 setFormData({ ...formData, description: e.target.value })
//               }
//               required
//             />
//             <Input
//               type="file"
//               accept="image/*"
//               onChange={(e) =>
//                 setFormData({ ...formData, image: e.target.files?.[0] || null })
//               }
//             />
//             <div className="flex flex-col gap-2">
//               <Button
//                 type="submit"
//                 className="w-full bg-green-600 hover:bg-green-700 text-white"
//               >
//                 Submit Review
//               </Button>
//               <Button
//                 type="button"
//                 onClick={() => setIsFormOpen(false)}
//                 className="w-full bg-muted hover:bg-muted/90 text-muted-foreground"
//               >
//                 Cancel
//               </Button>
//             </div>
//           </form>
//           {message && (
//             <p
//               className={`mt-4 text-center ${
//                 message.includes("Error")
//                   ? "text-destructive"
//                   : "text-green-600"
//               }`}
//             >
//               {message}
//             </p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }


"use client";

import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function GetCustomerReviews() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    description: "",
    image: null as File | null,
  });
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null); // Clear previous messages

    const data = new FormData();
    data.append("customerName", formData.customerName);
    data.append("customerEmail", formData.customerEmail);
    data.append("description", formData.description);
    if (formData.image) data.append("image", formData.image);

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to submit review: ${response.status}`);
      }

      setMessage("Review submitted! Awaiting approval.");
      setFormData({
        customerName: "",
        customerEmail: "",
        description: "",
        image: null,
      });
      setIsFormOpen(false);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      setMessage(`Error: ${errorMessage}`);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      {/* Button to toggle form visibility */}
      {!isFormOpen && (
        <Button
          onClick={() => setIsFormOpen(true)}
          className="w-full bg-green-600 hover:bg-green-700 text-white rounded-lg"
        >
          Add Your Adventure Review
        </Button>
      )}

      {/* Form (visible only when isFormOpen is true) */}
      {isFormOpen && (
        <div className="rounded-lg shadow-md p-6 bg-card">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Share Your Experience
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Your Name"
              value={formData.customerName}
              onChange={(e) =>
                setFormData({ ...formData, customerName: e.target.value })
              }
              required
              className="bg-input text-foreground border-border"
            />
            <Input
              placeholder="Your Email"
              type="email"
              value={formData.customerEmail}
              onChange={(e) =>
                setFormData({ ...formData, customerEmail: e.target.value })
              }
              required
              className="bg-input text-foreground border-border"
            />
            <Textarea
              placeholder="Tell us about your adventure..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
              className="bg-input text-foreground border-border"
            />
            <Input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.files?.[0] || null })
              }
              className="text-foreground"
            />
            <div className="flex flex-col gap-2">
              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                Submit Review
              </Button>
              <Button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="w-full bg-muted hover:bg-muted/90 text-muted-foreground"
              >
                Cancel
              </Button>
            </div>
          </form>
          {message && (
            <p
              className={`mt-4 text-center ${
                message.includes("Error")
                  ? "text-destructive"
                  : "text-green-600"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
