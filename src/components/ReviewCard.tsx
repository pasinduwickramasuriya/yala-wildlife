// "use client";

// import React from "react";
// import Image from "next/image";
// import { Star } from "lucide-react";
// import { CardContent } from "@/components/ui/card"; // Removed unused 'Card' import

// // Removed unused 'cn' import from "@/lib/utils"

// interface ReviewCardProps {
//   name: string;
//   location: string;
//   rating: number;
//   text: string;
//   image: string;
// }

// const ReviewCard = ({
//   name,
//   location,
//   rating,
//   text,
//   image,
// }: ReviewCardProps) => {
//   return (
//     <CardContent className="p-6">
//       <div className="flex items-center mb-4">
//         <Image
//           src={image}
//           alt={name}
//           width={48}
//           height={48}
//           className="w-12 h-12 rounded-full object-cover mr-4"
//         />
//         <div>
//           <h3 className="text-foreground font-medium">{name}</h3>
//           <p className="text-muted-foreground text-sm">{location}</p>
//         </div>
//       </div>
//       <div className="flex mb-4">
//         {[...Array(rating)].map((_, i) => (
//           <Star key={i} className="w-5 h-5 text-green-400 fill-current" />
//         ))}
//       </div>
//       <p className="text-foreground">{text}</p>
//     </CardContent>
//     // </Card>
//   );
// };

// export default ReviewCard;




"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { CardContent } from "@/components/ui/card";

interface ReviewCardProps {
  name: string;
  location: string;
  rating: number;
  text: string;
  image?: string;
}

export default function ReviewCard({ name, location, rating, text, image }: ReviewCardProps) {
  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.05, y: -10, transition: { type: "spring", stiffness: 400, damping: 10 } }}
      className="group bg-black/30 backdrop-blur-sm rounded-3xl p-8 flex flex-col items-center text-center hover:bg-green-900/20 hover:shadow-2xl hover:shadow-green-400/10 transition-all duration-500" // Added: Styling from ShowReviews.tsx for consistent look
    >
      <CardContent className="p-0 w-full">
        <div className="relative mb-6">
          <Avatar className="h-20 w-20 ring-4 ring-green-400/50 shadow-2xl group-hover:ring-green-400 transition-all duration-300"> {/* Fixed: Used Avatar with fallback to ensure image displays reliably */}
            <AvatarImage
              src={image || undefined}
              alt={name}
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/images/fallback-avatar.jpg"; }}
            />
            <AvatarFallback className="bg-green-600 text-white text-lg font-bold">
              {name.split(" ").map((n) => n[0]).join("").toUpperCase()}
            </AvatarFallback>
            <div className="absolute inset-0 bg-green-400/10 rounded-full blur-xl animate-pulse group-hover:bg-green-400/20 transition-all duration-300" />
          </Avatar>
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-100 transition-colors">{name}</h3>
          <p className="text-green-400 text-sm font-medium">{location}</p>
        </div>
        <p className="text-white/90 font-medium leading-relaxed mb-6 flex-grow group-hover:text-white transition-colors">&quot;{text}&quot;</p> {/* Fixed: Escaped quotes in text */}
        <div className="flex mb-4">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} className="w-5 h-5 text-green-400 fill-current" />
          ))}
        </div>
        <motion.div
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={false}
        />
      </CardContent>
    </motion.div>
  );
}