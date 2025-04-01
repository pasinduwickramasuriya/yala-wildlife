// import HeroSlider from "@/components/HeroSlider";
// import PackageCard from "@/components/PackageCard";
// import Image from "next/image";

// export default async function PackagesPage() {
//   const response = await fetch("http://localhost:3000/api/packages", { cache: "no-store" });
//   const packages = await response.json();

// export default function Home() {
//   return (
//     <>
//       <HeroSlider />
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {packages.map((pkg: any) => (
//             <PackageCard key={pkg.id} pkg={pkg} />
//           ))}
//         </div>
//     </>
//   );
// }

// import HeroSlider from "@/components/HeroSlider";
// import PackageCard from "@/components/PackageCard";

// // Define the Package interface to match your Prisma schema and API
// interface Package {
//   id: string;
//   name: string;
//   slug: string;
//   description?: string;
//   price?: number;
//   imageUrl?: string;
// }

// export default async function Home() {
//   // Fetch packages from the API
//   const response = await fetch("http://localhost:3000/api/package", { cache: "no-store" });
//   if (!response.ok) {
//     throw new Error("Failed to fetch packages");
//   }
//   const packages: Package[] = await response.json();

//   return (
//     <>
//       <HeroSlider />

//     </>
//   );
// }

"use client";

import GallerySection from "@/components/GallerySection";
import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";
import PackageCard from "@/components/PackageCard";
import PhotoGallery from "@/components/PhotoGallery";
import ReviewsSection from "@/components/ReviewsSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import { useState, useEffect } from "react";

interface Package {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price?: number;
  imageUrl?: string;
}

export default function Home() {
  const [packages, setPackages] = useState<Package[]>([]);

  useEffect(() => {
    const fetchPackages = async () => {
      const response = await fetch("/api/package", { cache: "no-store" });
      if (response.ok) {
        setPackages(await response.json());
      }
    };
    fetchPackages();
  }, []);

  return (
    <>
    <Header/>
      <HeroSlider />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Our Safari Packages
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} slug={pkg.slug} />
          ))}
        </div>
      </div>
      <PhotoGallery />
    
      <ReviewsSection/>
      <WhyChooseUs/>
      <GallerySection/>
    </>
  );
}
