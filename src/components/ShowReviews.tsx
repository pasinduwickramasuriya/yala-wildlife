// "use client";

// import { useState, useEffect } from "react";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// import { Skeleton } from "@/components/ui/skeleton";
// // FIXED: Removed unused imports Alert and AlertDescription
// // import { Alert, AlertDescription } from "@/components/ui/alert";
// // FIXED: Removed unused import AnimatePresence
// import { motion } from "framer-motion";

// interface CustomerReview {
//   id: string;
//   customerName: string;
//   customerEmail: string;
//   description: string;
//   imageUrl?: string | null;
//   isApproved: boolean;
//   createdAt: string;
// }

// export default function ShowReviews() {
//   const [reviews, setReviews] = useState<CustomerReview[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);

//   // Fetch reviews from API
//   useEffect(() => {
//     async function fetchReviews() {
//       try {
//         const response = await fetch("/api/reviews", { cache: "no-store" });
//         if (!response.ok) {
//           const errorText = await response.text();
//           throw new Error(`Failed to fetch reviews: ${response.status} - ${errorText}`);
//         }
//         const data: CustomerReview[] = await response.json();
//         const approvedReviews = data.filter((review) => review.isApproved);
//         setReviews(approvedReviews);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "An unexpected error occurred");
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchReviews();
//   }, []);

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.2,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: {
//       opacity: 0,
//       y: 50,
//       scale: 0.8
//     },
//     visible: {
//       opacity: 1,
//       y: 0,
//       scale: 1,
//       transition: {
//         duration: 0.6,
//         ease: "easeOut",
//       },
//     },
//   };

//   return (
//     <section className="relative py-24 px-4 md:px-8 overflow-hidden">
//       {/* Enhanced Background */}
//       <div className="absolute inset-0 bg-black/50 backdrop-blur-xl"></div>
//       <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 via-transparent to-green-600/10 animate-pulse"></div>

//       {/* Floating Background Elements */}
//       <div className="absolute top-20 left-10 w-32 h-32 bg-green-400/5 rounded-full blur-3xl animate-pulse"></div>
//       <div className="absolute bottom-20 right-20 w-48 h-48 bg-green-400/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
//       <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-400/2 rounded-full blur-3xl animate-pulse delay-500"></div>

//       <div className="relative z-10">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -50 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-2xl md:text-2xl font-extrabold text-white mb-4">
//             Customer{" "}
//             <span className="text-green-400 relative">
//               Reviews
//               <motion.div
//                 className="absolute -bottom-2 left-0 w-full h-1 bg-green-400/30 rounded-full"
//                 initial={{ scaleX: 0 }}
//                 whileInView={{ scaleX: 1 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: 0.5, duration: 0.8 }}
//               ></motion.div>
//             </span>
//           </h2>
//           <p className="text-green-200 text-lg max-w-2xl mx-auto">
//             Hear what our adventurers say about their unforgettable Yala safari experiences
//           </p>
//         </motion.div>

//         {/* Loading State */}
//         {loading && (
//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//             className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto"
//           >
//             {/* FIXED: Removed unused 'index' parameter by using underscore */}
//             {[...Array(8)].map((_, i) => (
//               <motion.div
//                 key={i}
//                 variants={itemVariants}
//                 className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 flex flex-col items-center"
//               >
//                 <Skeleton className="h-20 w-20 rounded-full bg-green-400/20 mb-4" />
//                 <Skeleton className="h-6 w-32 bg-white/20 mb-2" />
//                 <Skeleton className="h-4 w-48 bg-white/10 mb-4" />
//                 <Skeleton className="h-4 w-full bg-white/10 mb-2" />
//                 <Skeleton className="h-4 w-3/4 bg-white/10 mb-4" />
//                 <Skeleton className="h-3 w-24 bg-green-400/20" />
//               </motion.div>
//             ))}
//           </motion.div>
//         )}

//         {/* Error State */}
//         {error && (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="max-w-lg mx-auto"
//           >
//             <div className="bg-red-500/10 backdrop-blur-sm rounded-3xl p-8 text-center border border-red-500/20">
//               <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <span className="text-red-400 text-2xl">⚠</span>
//               </div>
//               <p className="text-white text-lg">{error}</p>
//               <p className="text-red-300 text-sm mt-2">Please try again later.</p>
//             </div>
//           </motion.div>
//         )}

//         {/* Empty State */}
//         {!loading && !error && reviews.length === 0 && (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="max-w-lg mx-auto"
//           >
//             <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-center">
//               <div className="w-16 h-16 bg-green-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <span className="text-green-400 text-2xl">💬</span>
//               </div>
//               <p className="text-white text-lg">No approved reviews available yet.</p>
//               <p className="text-green-300 text-sm mt-2">Be the first to share your adventure!</p>
//             </div>
//           </motion.div>
//         )}

//         {/* Reviews Grid */}
//         {!loading && !error && reviews.length > 0 && (
//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, amount: 0.1 }}
//             className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto"
//           >
//             {/* FIXED: Removed unused index parameter by using underscore */}
//             {reviews.map((review, _) => (
//               <motion.div
//                 key={review.id}
//                 variants={itemVariants}
//                 whileHover={{
//                   scale: 1.05,
//                   y: -10,
//                   transition: { type: "spring", stiffness: 400, damping: 10 }
//                 }}
//                 className="group bg-black/30 backdrop-blur-sm rounded-3xl p-8 flex flex-col items-center text-center hover:bg-green-900/20 transition-all duration-500 hover:shadow-2xl hover:shadow-green-400/10 cursor-pointer"
//               >
//                 {/* Avatar with Glow Effect */}
//                 <div className="relative mb-6">
//                   <Avatar className="h-20 w-20 ring-4 ring-green-400/50 shadow-2xl group-hover:ring-green-400 transition-all duration-300">
//                     <AvatarImage
//                       src={review.imageUrl || undefined}
//                       alt={review.customerName}
//                       onError={(e) => {
//                         (e.currentTarget as HTMLImageElement).src = "/fallback-avatar.jpg";
//                       }}
//                     />
//                     <AvatarFallback className="bg-green-600 text-white text-lg font-bold">
//                       {review.customerName
//                         .split(" ")
//                         .map((n) => n[0])
//                         .join("")
//                         .toUpperCase()}
//                     </AvatarFallback>
//                   </Avatar>
//                   <div className="absolute inset-0 bg-green-400/10 rounded-full blur-xl animate-pulse group-hover:bg-green-400/20 transition-all duration-300"></div>
//                 </div>

//                 {/* Customer Info */}
//                 <div className="mb-6">
//                   <h3 className="text-xl font-bold text-white mb-2 drop-shadow-lg group-hover:text-green-100 transition-colors">
//                     {review.customerName}
//                   </h3>
//                   <p className="text-green-400 text-sm font-medium">
//                     {review.customerEmail}
//                   </p>
//                 </div>

//                 {/* Review Text */}
//                 {/* FIXED: Escaped quotes in review text using &quot; */}
//                 <p className="text-white/90 font-medium leading-relaxed mb-6 flex-grow text-center group-hover:text-white transition-colors">
//                   &quot;{review.description}&quot;
//                 </p>

//                 {/* Date */}
//                 <div className="mt-auto">
//                   <p className="text-green-300 text-xs font-medium">
//                     {new Date(review.createdAt).toLocaleDateString("en-US", {
//                       year: "numeric",
//                       month: "long",
//                       day: "numeric",
//                     })}
//                   </p>
//                 </div>

//                 {/* Hover Effect Indicator */}
//                 <motion.div
//                   className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//                   initial={false}
//                 />
//               </motion.div>
//             ))}
//           </motion.div>
//         )}

//         {/* Reviews Count */}
//         {!loading && !error && reviews.length > 0 && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ delay: 0.5 }}
//             className="flex justify-center mt-12"
//           >
//             <div className="bg-black/30 backdrop-blur-sm rounded-full px-8 py-3">
//               <span className="text-green-400 text-lg font-medium">
//                 {reviews.length} Happy Adventurers
//               </span>
//             </div>
//           </motion.div>
//         )}
//       </div>
//     </section>
//   );
// }


"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
// FIXED: Removed unused imports Alert and AlertDescription
// import { Alert, AlertDescription } from "@/components/ui/alert";
// FIXED: Removed unused import AnimatePresence
import { motion } from "framer-motion";

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

  // Fetch reviews from API
  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await fetch("/api/reviews", { cache: "no-store" });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to fetch reviews: ${response.status} - ${errorText}`);
        }
        const data: CustomerReview[] = await response.json();
        const approvedReviews = data.filter((review) => review.isApproved);
        setReviews(approvedReviews);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    }
    fetchReviews();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative py-24 px-4 md:px-8 overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-xl"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 via-transparent to-green-600/10 animate-pulse"></div>

      {/* Floating Background Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-green-400/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-green-400/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-400/2 rounded-full blur-3xl animate-pulse delay-500"></div>

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-2xl font-extrabold text-white mb-4">
            Customer{" "}
            <span className="text-green-400 relative">
              Reviews
              <motion.div
                className="absolute -bottom-2 left-0 w-full h-1 bg-green-400/30 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
              ></motion.div>
            </span>
          </h2>
          <p className="text-green-200 text-lg max-w-2xl mx-auto">
            Hear what our adventurers say about their unforgettable Yala safari experiences
          </p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto"
          >
            {/* FIXED: Removed unused 'index' parameter by using underscore */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 flex flex-col items-center"
              >
                <Skeleton className="h-20 w-20 rounded-full bg-green-400/20 mb-4" />
                <Skeleton className="h-6 w-32 bg-white/20 mb-2" />
                <Skeleton className="h-4 w-48 bg-white/10 mb-4" />
                <Skeleton className="h-4 w-full bg-white/10 mb-2" />
                <Skeleton className="h-4 w-3/4 bg-white/10 mb-4" />
                <Skeleton className="h-3 w-24 bg-green-400/20" />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg mx-auto"
          >
            <div className="bg-red-500/10 backdrop-blur-sm rounded-3xl p-8 text-center border border-red-500/20">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-red-400 text-2xl">⚠</span>
              </div>
              <p className="text-white text-lg">{error}</p>
              <p className="text-red-300 text-sm mt-2">Please try again later.</p>
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && !error && reviews.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-center">
              <div className="w-16 h-16 bg-green-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-400 text-2xl">💬</span>
              </div>
              <p className="text-white text-lg">No approved reviews available yet.</p>
              <p className="text-green-300 text-sm mt-2">Be the first to share your adventure!</p>
            </div>
          </motion.div>
        )}

        {/* Reviews Grid */}
        {!loading && !error && reviews.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto"
          >
            {/* FIXED: Completely removed the unused second parameter since we don't need index */}
            {reviews.map((review) => (
              <motion.div
                key={review.id}
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  y: -10,
                  transition: { type: "spring", stiffness: 400, damping: 10 }
                }}
                className="group bg-black/30 backdrop-blur-sm rounded-3xl p-8 flex flex-col items-center text-center hover:bg-green-900/20 transition-all duration-500 hover:shadow-2xl hover:shadow-green-400/10 cursor-pointer"
              >
                {/* Avatar with Glow Effect */}
                <div className="relative mb-6">
                  <Avatar className="h-20 w-20 ring-4 ring-green-400/50 shadow-2xl group-hover:ring-green-400 transition-all duration-300">
                    <AvatarImage
                      src={review.imageUrl || undefined}
                      alt={review.customerName}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = "/fallback-avatar.jpg";
                      }}
                    />
                    <AvatarFallback className="bg-green-600 text-white text-lg font-bold">
                      {review.customerName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute inset-0 bg-green-400/10 rounded-full blur-xl animate-pulse group-hover:bg-green-400/20 transition-all duration-300"></div>
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
                {/* FIXED: Escaped quotes in review text using &quot; */}
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

                {/* Hover Effect Indicator */}
                <motion.div
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Reviews Count */}
        {!loading && !error && reviews.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex justify-center mt-12"
          >
            <div className="bg-black/30 backdrop-blur-sm rounded-full px-8 py-3">
              <span className="text-green-400 text-lg font-medium">
                {reviews.length} Happy Adventurers
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
