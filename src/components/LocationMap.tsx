// import { MapPin, Compass } from "lucide-react";

// export default function LocationMap() {
//   const directPlaceLink = "https://maps.app.goo.gl/JnSzDTLmXU2XFAAx6";

//   // Official Google Maps Embed protobuf using your listing's exact entity keys
//   // This automatically loads and pins the listing with the native 5.0 ★ (31) card open
//   const embedUrl =
//     "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.285038372671!2d81.2985876758414!3d6.265795993722744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x62b813f2717b2b81%3A0xf0b7e34cc97ec936!2sYala%20Wildlife%20Safari!5e0!3m2!1sen!2slk!4v1710000000000!5m2!1sen!2slk";

//   return (
//     <div className="w-full bg-white [contain:paint] transform-gpu">
//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
//         {/* ========================================================= */}
//         {/* LEFT COLUMN: NATIVE GOOGLE MAPS EMBED WITH AUTO-OPEN CARD */}
//         {/* ========================================================= */}
//         <div className="lg:col-span-7 relative w-full h-[380px] sm:h-[440px] lg:h-[480px] rounded-[2.25rem] sm:rounded-[3rem] overflow-hidden bg-[#f1f3f4] [contain:strict]">
//           <iframe
//             src={embedUrl}
//             width="100%"
//             height="100%"
//             style={{ border: 0 }}
//             allowFullScreen
//             loading="lazy"
//             referrerPolicy="no-referrer-when-downgrade"
//             title="Yala Wildlife Safari Official Google Map"
//             className="w-full h-full object-cover"
//           />
//         </div>

//         {/* ========================================================= */}
//         {/* RIGHT COLUMN: EDITORIAL DESK DETAILS & PRO TIP             */}
//         {/* ========================================================= */}
//         <div className="lg:col-span-5 flex flex-col items-start text-left bg-white">
//           <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#1f1f1f] tracking-tight leading-[1.2] mb-5">
//             Yala Wildlife Location
//           </h2>

//           <div className="space-y-4 text-[15px] sm:text-[16px] text-[#444746] leading-relaxed mb-8">
//             <p className="text-[18px] sm:text-[18px] text-[#5f6368] font-semibold leading-relaxed">
//               <strong className="text-[#1f1f1f] font-bold">Location:</strong>{" "}
//               wickrama, kasingama, Tissamaharama 82600, Sri Lanka
//             </p>
//           </div>

//           {/* Primary Action Button (Solid Black with #00ff00 hover) */}
//           <a
//             href={directPlaceLink}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="inline-flex items-center justify-center gap-2.5 bg-[#000000] hover:bg-[#00ff00] text-white hover:text-black font-bold text-[14px] tracking-relax px-8 py-4 rounded-full transition-colors duration-150 active:scale-95 cursor-pointer shadow-none mb-8 w-full sm:w-auto"
//           >
//             <MapPin className="w-4 h-4 stroke-[2.5]" />
//             <span>Open in Google Maps App</span>
//           </a>

//           {/* Hotel Pickup Pro Tip Container */}
//           <div className="border-l-4 border-black pl-4 py-1 text-left bg-white">
//             <p className="text-[18px] sm:text-[18px] text-[#5f6368] leading-relaxed font-semibold">
//               <strong className="text-[#1f1f1f] font-bold inline-flex items-center gap-1.5 mr-1">
//                 <Compass className="w-4 h-4 text-black inline shrink-0" />
//                 Hotel Pickup Pro Tip:
//               </strong>
//               For morning 05:00 AM safari pickups, our custom elevated 4×4 safari jeeps pick up directly from all hotels in Tissamaharama, Kirinda, Kataragama, and Yala buffer zones.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }












"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, Compass } from "lucide-react";

export default function LocationMap() {
  const [loadMap, setLoadMap] = useState(false);
  const directPlaceLink = "https://maps.app.goo.gl/JnSzDTLmXU2XFAAx6";

  const embedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.285038372671!2d81.2985876758414!3d6.265795993722744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x62b813f2717b2b81%3A0xf0b7e34cc97ec936!2sYala%20Wildlife%20Safari!5e0!3m2!1sen!2slk!4v1710000000000!5m2!1sen!2slk";

  // Pre-rendered low-memory preview placeholder of the precise location
  const staticMapUrl =
    "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=900&auto=format&fit=crop&q=60";

  return (
    <div className="w-full bg-white [contain:paint] [content-visibility:auto] [contain-intrinsic-size:1px_480px]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* ========================================================= */}
        {/* LEFT COLUMN: NATIVE GOOGLE MAPS EMBED WITH AUTO-OPEN CARD */}
        {/* ========================================================= */}
        <div className="lg:col-span-7 relative w-full h-[380px] sm:h-[440px] lg:h-[480px] rounded-[2.25rem] sm:rounded-[3rem] overflow-hidden bg-[#f1f3f4] [contain:strict]">
          {loadMap ? (
            <iframe
              src={embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              title="Yala Wildlife Safari Official Google Map"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="relative w-full h-full">
              <Image
                src={staticMapUrl}
                alt="Yala Wildlife Safari Map Area"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                quality={50}
                priority={false}
                className="object-cover brightness-95"
              />
              <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => setLoadMap(true)}
                  className="inline-flex items-center gap-2 bg-white/95 text-[#1f1f1f] text-[13px] sm:text-[14px] font-bold px-5 py-2.5 rounded-full cursor-pointer hover:bg-white active:scale-95 transition-transform"
                >
                  <MapPin className="w-4 h-4 text-black" />
                  <span>Load Interactive Map</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: EDITORIAL DESK DETAILS & PRO TIP             */}
        {/* ========================================================= */}
        <div className="lg:col-span-5 flex flex-col items-start text-left bg-white">
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#1f1f1f] tracking-tight leading-[1.2] mb-5">
            Yala Wildlife Location
          </h2>

          <div className="space-y-4 text-[15px] sm:text-[16px] text-[#444746] leading-relaxed mb-8">
            <p className="text-[18px] sm:text-[18px] text-[#5f6368] font-semibold leading-relaxed">
              <strong className="text-[#1f1f1f] font-bold">Location:</strong>{" "}
              wickrama, kasingama, Tissamaharama 82600, Sri Lanka
            </p>
          </div>

          {/* Primary Action Button (Solid Black with #00ff00 hover) */}
          <a
            href={directPlaceLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 bg-[#000000] hover:bg-[#00ff00] text-white hover:text-black font-bold text-[14px] tracking-relax px-8 py-4 rounded-full transition-colors duration-150 active:scale-95 cursor-pointer shadow-none mb-8 w-full sm:w-auto"
          >
            <MapPin className="w-4 h-4 stroke-[2.5]" />
            <span>Open in Google Maps App</span>
          </a>

          {/* Hotel Pickup Pro Tip Container */}
          <div className="border-l-4 border-black pl-4 py-1 text-left bg-white">
            <p className="text-[18px] sm:text-[18px] text-[#5f6368] leading-relaxed font-semibold">
              <strong className="text-[#1f1f1f] font-bold inline-flex items-center gap-1.5 mr-1">
                <Compass className="w-4 h-4 text-black inline shrink-0" />
                Hotel Pickup Pro Tip:
              </strong>
              For morning 05:00 AM safari pickups, our custom elevated 4×4 safari jeeps pick up directly from all hotels in Tissamaharama, Kirinda, Kataragama, and Yala buffer zones.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}