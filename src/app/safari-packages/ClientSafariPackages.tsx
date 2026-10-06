// "use client";

// import { useState, useEffect } from "react";
// import PackageCard from "@/components/PackageCard";
// import { OrganizationJsonLd, LocalBusinessJsonLd } from "@/components/JsonLd";
// import { FAQJsonLd, defaultFAQs } from "@/components/FAQJsonLd";
// import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
// import { SafariPackageJsonLd } from "@/components/SafariPackageJsonLd";
// import { AutoSEOWrapper } from "@/components/AutoSEOWrapper";
// import { Compass, Map, Shield, ArrowRight, CheckCircle2 } from "lucide-react";
// import AdvancePaymentButton from "@/components/AdvancePaymentButton";

// interface SafariPackage {
//   id: string;
//   name: string;
//   slug: string;
//   description?: string;
//   price?: number;
//   imageUrl?: string;
//   mealPrice: number;
//   ticketPrice: number;
// }

// export default function ClientSafariPackages() {
//   const [packages, setPackages] = useState<SafariPackage[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchPackages = async () => {
//       try {
//         const response = await fetch("/api/package", { cache: "no-store" });
//         if (!response.ok) throw new Error("Failed to fetch packages");
//         const data = await response.json();
//         setPackages(data);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "An error occurred");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPackages();
//   }, []);

//   const breadcrumbItems = [
//     { name: "Home", item: "/" },
//     { name: "Safari Packages", item: "/safari-packages" },
//   ];

//   return (
//     <>
//       {/* Structured Schema Markup */}
//       <OrganizationJsonLd />
//       <LocalBusinessJsonLd />
//       <FAQJsonLd faqs={defaultFAQs} />
//       <BreadcrumbJsonLd items={breadcrumbItems} />
//       {packages.map((pkg) => (
//         <SafariPackageJsonLd key={pkg.id} package={pkg} />
//       ))}

//       <main
//         className="w-full bg-white text-[#1f1f1f] selection:bg-[#00ff00] selection:text-black antialiased overflow-x-hidden min-h-screen"
//         style={{
//           fontFamily:
//             '"Google Sans", "Open Sans", Roboto, -apple-system, BlinkMacSystemFont, Arial, sans-serif',
//         }}
//         role="main"
//       >
//         <div className="pt-24 sm:pt-28 md:pt-32 pb-20 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto flex flex-col gap-12 sm:gap-16 bg-white">

//           {/* =========================================
//               1. HERO HEADER SECTION (GOOGLE EDITORIAL STYLE)
//           ========================================= */}
//           <section className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto bg-white [contain:paint]">
//             <h1 className="text-4xl sm:text-4xl lg:text-5xl font-bold text-[#1f1f1f] tracking-tight leading-tight mb-4 text-center">
//               Yala Safari Packages
//             </h1>

//             <p className="text-[17px] sm:text-[18px] text-[#5f6368] font-semibold leading-relaxed mb-6 text-center max-w-2xl">
//               Explore curated private safari packages led by Department of Wildlife certified naturalists with elevated 4×4 photography vehicles.
//             </p>

//             <p className="text-[17px] sm:text-[18px] text-[#5f6368] font-semibold leading-relaxed mb-6 text-center max-w-2xl">
//               Already finalized a custom multi-day itinerary or special private vehicle with our operations desk? Secure your permit advance here.
//             </p>

//             <div className="inline-block mb-0.5">
//               <AdvancePaymentButton />
//             </div>
//           </section>

//           {/* =========================================
//               2. PACKAGES GRID
//           ========================================= */}
//           {/* Increased left & right padding across all screen sizes (px-6 sm:px-10 md:px-14 lg:px-20) */}
//           <section className="w-full bg-white px-6 sm:px-10 md:px-14 lg:px-20 [contain:paint]">
//             {loading ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-items-center max-w-6xl mx-auto">
//                 {Array(3).fill(null).map((_, i) => (
//                   <div
//                     key={i}
//                     className="w-full aspect-[4/5] max-w-[380px] bg-[#f8f9fa] rounded-[2.25rem] animate-pulse"
//                   />
//                 ))}
//               </div>
//             ) : error ? (
//               <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center py-20 bg-[#f8f9fa] rounded-[2.25rem] text-center [contain:paint]">
//                 <h3 className="text-xl font-bold text-red-600 tracking-tight mb-2">
//                   System Connection Notice
//                 </h3>
//                 <p className="text-[15px] text-[#5f6368] font-medium">
//                   {error}
//                 </p>
//               </div>
//             ) : packages.length > 0 ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 justify-items-center w-full max-w-6xl mx-auto">
//                 {packages.map((pkg) => (
//                   <div
//                     key={pkg.id}
//                     className="w-full max-w-[380px] flex flex-col transition-transform duration-200 active:scale-[0.99]"
//                   >
//                     <PackageCard slug={pkg.slug} />
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center py-24 bg-[#f8f9fa] rounded-[2.25rem] text-center [contain:paint]">
//                 <h3 className="text-2xl font-bold text-[#1f1f1f] tracking-tight mb-2">
//                   No Tours Listed
//                 </h3>
//                 <p className="text-[16px] text-[#5f6368] font-medium">
//                   Expeditions for the current season are being updated. Check back shortly.
//                 </p>
//               </div>
//             )}
//           </section>


//           {/* =========================================
//               4. EXPEDITION INTELLIGENCE & POLICY NOTES (EDITORIAL PROSE - CENTERED)
//           ========================================= */}
//           <section className="w-full max-w-[720px] mx-auto pt-12 border-t border-[#f1f3f4] text-center [contain:paint]">
//             <div className="mb-8 flex flex-col items-center">

//               <h2 className="text-4xl sm:text-5xl font-bold text-[#1f1f1f] tracking-tight leading-snug text-center">
//                 Park Logistics
//               </h2>
//             </div>

//             <div className="space-y-6 text-[17px] sm:text-[18px] text-[#3c4043] font-normal leading-[1.85] text-center">
//               <p className="text-[17px] sm:text-[18px] text-[#5f6368] font-semibold leading-relaxed mb-6 text-center max-w-2xl">
//                 Our half-day game drives are timed precisely around peak wildlife movement windows. Morning excursions depart at first light to intercept nocturnal hunters specifically Sri Lankan leopards and sloth bears before temperatures climb, while afternoon drives concentrate on coastal salt lagoons and water basins where elephant herds gather before dusk.
//               </p>

//               <p className="text-[17px] sm:text-[18px] text-[#5f6368] font-semibold leading-relaxed mb-6 text-center max-w-2xl">
//                 Full-day expeditions provide uninterrupted 10-hour access into the deeper trail networks of Blocks 1 and 5. By staying inside the reserve during midday gate closures, guests explore remote boundary zones and riverine forests while avoiding peak entrance traffic, pausing for a quiet rest along designated riverside stopping points.
//               </p>

//               <p className="text-[17px] sm:text-[18px] text-[#5f6368] font-semibold leading-relaxed mb-6 text-center max-w-2xl">
//                 Every safari is operated exclusively in custom-built 4×4 jeeps fitted with raised spectator seating, open-sided canopy frames for unobstructed lens panning, and high-clearance off-road suspension designed to navigate rugged terrain safely and quietly.
//               </p>
//             </div>

//           </section>

//           {/* Hidden Structured SEO Block */}
//           <div className="sr-only">
//             <AutoSEOWrapper
//               pageTitle="Yala Safari Packages | Half Day, Full Day & Private Tours"
//               pageDescription="Choose from half-day, full-day, and private Yala safari packages. All-inclusive tours with expert guides and luxury jeeps."
//               pageType="package"
//             >
//               <p>Explore our carefully curated Yala National Park safari packages designed to suit every traveler's needs and budget. From budget-friendly half-day excursions to luxury full-day expeditions, we offer the best safari experiences in Sri Lanka.</p>
//               <p>Our half-day safari package is perfect for travelers with limited time. Departing at dawn or afternoon, this 4-hour adventure takes you deep into Block 1 of Yala National Park. Witness leopards, elephants, crocodiles, and exotic birds in their natural habitat with our expert naturalist guides.</p>
//             </AutoSEOWrapper>
//           </div>

//         </div>
//       </main>
//     </>
//   );
// }




"use client";

import { useState, useEffect } from "react";
import PackageCard from "@/components/PackageCard";
import { OrganizationJsonLd, LocalBusinessJsonLd } from "@/components/JsonLd";
import { FAQJsonLd, defaultFAQs } from "@/components/FAQJsonLd";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { SafariPackageJsonLd } from "@/components/SafariPackageJsonLd";
import { AutoSEOWrapper } from "@/components/AutoSEOWrapper";
import AdvancePaymentButton from "@/components/AdvancePaymentButton";

interface SafariPackage {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price?: number;
  imageUrl?: string;
  mealPrice: number;
  ticketPrice: number;
}

const BREADCRUMB_ITEMS = [
  { name: "Home", item: "/" },
  { name: "Safari Packages", item: "/safari-packages" },
];

export default function ClientSafariPackages() {
  const [packages, setPackages] = useState<SafariPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchPackages = async () => {
      try {
        const response = await fetch("/api/package", { 
          cache: "no-store",
          signal: controller.signal 
        });
        if (!response.ok) throw new Error("Failed to fetch packages");
        const data = await response.json();
        if (isMounted) setPackages(data);
      } catch (err: any) {
        if (err.name !== "AbortError" && isMounted) {
          setError(err instanceof Error ? err.message : "An error occurred");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchPackages();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <>
      {/* Structured Schema Markup */}
      <OrganizationJsonLd />
      <LocalBusinessJsonLd />
      <FAQJsonLd faqs={defaultFAQs} />
      <BreadcrumbJsonLd items={BREADCRUMB_ITEMS} />
      {packages.map((pkg) => (
        <SafariPackageJsonLd key={pkg.id} package={pkg} />
      ))}

      <main
        className="w-full bg-white text-[#1f1f1f] selection:bg-[#00ff00] selection:text-black antialiased overflow-x-hidden min-h-screen"
        style={{
          fontFamily:
            '"Google Sans", "Open Sans", Roboto, -apple-system, BlinkMacSystemFont, Arial, sans-serif',
        }}
        role="main"
      >
        <div className="pt-24 sm:pt-28 md:pt-32 pb-20 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto flex flex-col gap-12 sm:gap-16 bg-white">

          {/* =========================================
              1. HERO HEADER SECTION (GOOGLE EDITORIAL STYLE)
          ========================================= */}
          <section className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto bg-white [contain:paint]">
            <h1 className="text-4xl sm:text-4xl lg:text-5xl font-bold text-[#1f1f1f] tracking-tight leading-tight mb-4 text-center">
              Yala Safari Packages
            </h1>

            <p className="text-[17px] sm:text-[18px] text-[#5f6368] font-semibold leading-relaxed mb-6 text-center max-w-2xl">
              Explore curated private safari packages led by Department of Wildlife certified naturalists with elevated 4×4 photography vehicles.
            </p>

            <p className="text-[17px] sm:text-[18px] text-[#5f6368] font-semibold leading-relaxed mb-6 text-center max-w-2xl">
              Already finalized a custom multi-day itinerary or special private vehicle with our operations desk? Secure your permit advance here.
            </p>

            <div className="inline-block mb-0.5">
              <AdvancePaymentButton />
            </div>
          </section>

          {/* =========================================
              2. PACKAGES GRID
          ========================================= */}
          <section className="w-full bg-white px-6 sm:px-10 md:px-14 lg:px-20 [contain:paint]">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-items-center max-w-6xl mx-auto">
                {Array(3).fill(null).map((_, i) => (
                  <div
                    key={i}
                    className="w-full aspect-[4/5] max-w-[380px] bg-[#f8f9fa] rounded-[2.25rem] opacity-75 [contain:strict]"
                  />
                ))}
              </div>
            ) : error ? (
              <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center py-20 bg-[#f8f9fa] rounded-[2.25rem] text-center [contain:paint]">
                <h3 className="text-xl font-bold text-red-600 tracking-tight mb-2">
                  System Connection Notice
                </h3>
                <p className="text-[15px] text-[#5f6368] font-medium">
                  {error}
                </p>
              </div>
            ) : packages.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 justify-items-center w-full max-w-6xl mx-auto">
                {packages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="w-full max-w-[380px] flex flex-col [contain:paint]"
                  >
                    <PackageCard slug={pkg.slug} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center py-24 bg-[#f8f9fa] rounded-[2.25rem] text-center [contain:paint]">
                <h3 className="text-2xl font-bold text-[#1f1f1f] tracking-tight mb-2">
                  No Tours Listed
                </h3>
                <p className="text-[16px] text-[#5f6368] font-medium">
                  Expeditions for the current season are being updated. Check back shortly.
                </p>
              </div>
            )}
          </section>

          {/* =========================================
              4. EXPEDITION INTELLIGENCE & POLICY NOTES (EDITORIAL PROSE - CENTERED)
          ========================================= */}
          <section className="w-full max-w-[720px] mx-auto pt-12 border-t border-[#f1f3f4] text-center [content-visibility:auto] [contain-intrinsic-size:1px_450px]">
            <div className="mb-8 flex flex-col items-center">
              <h2 className="text-4xl sm:text-5xl font-bold text-[#1f1f1f] tracking-tight leading-snug text-center">
                Park Logistics
              </h2>
            </div>

            <div className="space-y-6 text-[17px] sm:text-[18px] text-[#3c4043] font-normal leading-[1.85] text-center">
              <p className="text-[17px] sm:text-[18px] text-[#5f6368] font-semibold leading-relaxed mb-6 text-center max-w-2xl">
                Our half-day game drives are timed precisely around peak wildlife movement windows. Morning excursions depart at first light to intercept nocturnal hunters specifically Sri Lankan leopards and sloth bears before temperatures climb, while afternoon drives concentrate on coastal salt lagoons and water basins where elephant herds gather before dusk.
              </p>

              <p className="text-[17px] sm:text-[18px] text-[#5f6368] font-semibold leading-relaxed mb-6 text-center max-w-2xl">
                Full-day expeditions provide uninterrupted 10-hour access into the deeper trail networks of Blocks 1 and 5. By staying inside the reserve during midday gate closures, guests explore remote boundary zones and riverine forests while avoiding peak entrance traffic, pausing for a quiet rest along designated riverside stopping points.
              </p>

              <p className="text-[17px] sm:text-[18px] text-[#5f6368] font-semibold leading-relaxed mb-6 text-center max-w-2xl">
                Every safari is operated exclusively in custom-built 4×4 jeeps fitted with raised spectator seating, open-sided canopy frames for unobstructed lens panning, and high-clearance off-road suspension designed to navigate rugged terrain safely and quietly.
              </p>
            </div>
          </section>

          {/* Hidden Structured SEO Block */}
          <div className="sr-only">
            <AutoSEOWrapper
              pageTitle="Yala Safari Packages | Half Day, Full Day & Private Tours"
              pageDescription="Choose from half-day, full-day, and private Yala safari packages. All-inclusive tours with expert guides and luxury jeeps."
              pageType="package"
            >
              <p>Explore our carefully curated Yala National Park safari packages designed to suit every traveler's needs and budget. From budget-friendly half-day excursions to luxury full-day expeditions, we offer the best safari experiences in Sri Lanka.</p>
              <p>Our half-day safari package is perfect for travelers with limited time. Departing at dawn or afternoon, this 4-hour adventure takes you deep into Block 1 of Yala National Park. Witness leopards, elephants, crocodiles, and exotic birds in their natural habitat with our expert naturalist guides.</p>
            </AutoSEOWrapper>
          </div>

        </div>
      </main>
    </>
  );
}