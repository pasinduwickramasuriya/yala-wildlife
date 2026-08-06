"use client";

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
  return (
    <div
      className="p-6 rounded-[2rem] bg-black/80 backdrop-blur-md border border-white/10 hover:border-[#00ff00]/50 transition-all duration-500 hover:-translate-y-1 shadow-2xl flex flex-col justify-between"
    >
      <CardContent className="p-0 space-y-4">
        {/* Rating Stars */}
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < rating ? "fill-[#00ff00] text-[#00ff00]" : "text-neutral-700"}`}
            />
          ))}
        </div>

        {/* Review Text */}
        <p className="text-sm text-neutral-300 font-medium leading-relaxed italic">
          "{text}"
        </p>

        {/* User Info */}
        <div className="flex items-center gap-3 pt-2">
          <Avatar className="w-10 h-10 border border-white/10">
            {image ? <AvatarImage src={image} alt={name} /> : null}
            <AvatarFallback className="bg-[#00ff00] text-black font-bold text-xs">
              {name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h4 className="text-sm font-bold text-white leading-none mb-0.5">{name}</h4>
            <span className="text-[10px] text-neutral-400 font-mono uppercase tracking-widest">{location}</span>
          </div>
        </div>
      </CardContent>
    </div>
  );
}