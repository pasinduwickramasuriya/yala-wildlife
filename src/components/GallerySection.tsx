"use client";

import React from "react";
import Image from "next/image";
import { Heart, ArrowUpRight, Camera } from "lucide-react"; // Make sure to install lucide-react
import { cn } from "@/lib/utils"; // Assuming you have a utils file, or remove cn and use template literals

const GallerySection = () => {
  const images = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1544985361-b420d7a77043?w=800&auto=format&fit=crop&q=60",
      title: "Leopard Gaze",
      location: "Yala Block 1",
      size: "md:col-span-2 md:row-span-2", // Big Feature Image
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1578326626553-39f72c545b07?w=600&auto=format&fit=crop&q=60",
      title: "Gentle Giants",
      location: "Elephant Rock",
      size: "md:col-span-1 md:row-span-1", // Standard Square
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1451303688941-9e06d4b1277a?w=600&auto=format&fit=crop&q=60",
      title: "Golden Hour",
      location: "Sithulpawwa Road",
      size: "md:col-span-1 md:row-span-1", // Standard Square
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1534759846116-5799c33ce22a?q=80&w=1350&auto=format&fit=crop",
      title: "Safari Vibes",
      location: "Main Entrance",
      size: "md:col-span-2 md:row-span-1", // Wide Panoramic
    },
  ];

  return (
    <section className="py-24 bg overflow-hidden relative">
      
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-green-600 font-bold uppercase tracking-widest text-xs bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full">
              <Camera className="w-3 h-3" />
              <span>Captured Moments</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
              Into the <span className="text-green-600">Wild</span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md text-sm md:text-base leading-relaxed text-left md:text-right">
            Experience the untold stories of Yala through our lens. Every snapshot is a memory waiting to be made.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[250px]">
          {images.map((image) => (
            <div
              key={image.id}
              className={cn(
                "group relative overflow-hidden rounded-[2.5rem] cursor-pointer",
                image.size,
                "bg-neutral-100 dark:bg-neutral-900"
              )}
            >
              {/* Image with Zoom & Tilt Effect */}
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <Image
                  src={image.url}
                  alt={image.title}
                  fill
                  unoptimized // Prevents Next.js config errors for external images
                  className="object-cover transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:rotate-1"
                />
              </div>

              {/* Overlay Gradient (Only visible on hover for cleaner look) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Interactive Elements */}
              
              {/* Top Right: Heart Icon */}
              <div className="absolute top-4 right-4 translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-75">
                <button className="bg-white/20 backdrop-blur-md p-2.5 rounded-full text-white hover:bg-white hover:text-red-500 transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
              </div>

              {/* Bottom: Glass Info Card */}
              <div className="absolute bottom-4 left-4 right-4 translate-y-[10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                <div className="flex items-center justify-between bg-white/90 dark:bg-black/80 backdrop-blur-xl p-4 rounded-[1.5rem] border border-white/20 shadow-lg">
                  <div>
                    <h3 className="text-foreground font-bold text-lg leading-none mb-1">
                      {image.title}
                    </h3>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                      {image.location}
                    </p>
                  </div>
                  <div className="bg-green-600 p-2 rounded-full text-white">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;