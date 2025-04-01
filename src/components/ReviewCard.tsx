"use client";

import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { CardContent } from "@/components/ui/card"; // Removed unused 'Card' import

// Removed unused 'cn' import from "@/lib/utils"

interface ReviewCardProps {
  name: string;
  location: string;
  rating: number;
  text: string;
  image: string;
}

const ReviewCard = ({
  name,
  location,
  rating,
  text,
  image,
}: ReviewCardProps) => {
  return (
    <CardContent className="p-6">
      <div className="flex items-center mb-4">
        <Image
          src={image}
          alt={name}
          width={48}
          height={48}
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <h3 className="text-foreground font-medium">{name}</h3>
          <p className="text-muted-foreground text-sm">{location}</p>
        </div>
      </div>
      <div className="flex mb-4">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 text-green-400 fill-current" />
        ))}
      </div>
      <p className="text-foreground">{text}</p>
    </CardContent>
    // </Card>
  );
};

export default ReviewCard;
