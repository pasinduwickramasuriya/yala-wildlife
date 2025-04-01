"use client"; // Added since Image requires client-side rendering

import React from "react";
import Image from "next/image"; // Added import for Image component

const GallerySection = () => {
  const images = [
    {
      url: "https://images.unsplash.com/photo-1544985361-b420d7a77043?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGVvcGFyZHxlbnwwfHwwfHx8MA%3D%3D",
      title: "Safari Adventure",
    },
    {
      url: "https://images.unsplash.com/photo-1578326626553-39f72c545b07?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGVsZXBoYW50fGVufDB8fDB8fHww",
      title: "Wildlife Encounter",
    },
    {
      url: "https://images.unsplash.com/photo-1451303688941-9e06d4b1277a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGVhcnxlbnwwfHwwfHx8MA%3D%3D",
      title: "Sunset Safari",
    },
    {
      url: "https://images.unsplash.com/photo-1534759846116-5799c33ce22a?q=80&w=1350&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Jeep Experience",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Uncomment and adjust if needed */}
        {/* <h2 className="text-4xl md:text-2xl font-bold text-foreground text-center mb-12">
          Capture the Adventure
        </h2> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {images.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg aspect-square cursor-pointer"
            >
              {/* Changed: Replaced <img> with <Image> to fix @next/next/no-img-element */}
              <Image
                src={image.url}
                alt={image.title}
                width={300} // Arbitrary value for aspect-square; adjust as needed
                height={300} // Matches width for 1:1 aspect ratio
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <h3 className="text-foreground text-xl font-medium">
                  {image.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;