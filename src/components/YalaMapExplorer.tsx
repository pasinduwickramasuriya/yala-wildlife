/* eslint-disable react/jsx-no-comment-textnodes */
"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Check, Star, Play, TreePine, Clock, MapPin, Sparkles } from "lucide-react";

const BLOCK_DATA = [
  {
    id: 1,
    name: "Block 1 Ruhuna",
    shortName: "Block 1",
    tagline: "The Leopard Capital of the World",
    description:
      "The crown jewel of Yala and the most visited sector, renowned globally for having the highest density of leopards per square kilometer. The topography is a dramatic theatre of rocky granite outcrops (inselbergs), saline coastal lagoons, and semi-arid scrub jungle.",
    terrain: "Dense Forest / Granite / Coastal",
    access: "Palatupana Gate",
    path: "M 50 350 L 150 320 L 200 380 L 180 450 L 80 480 L 20 420 Z",
    wildlife: ["Sri Lankan Leopard", "Sloth Bear", "Asian Elephant", "Mugger Crocodile"],
    features: ["Patanangala Rock", "Buttuwa Wewa", "Highest Leopard Density"],
    bestTime: "Dawn (6:00 AM) or Dusk (4:00 PM)",
    image:
      "https://res.cloudinary.com/dkfnpmzpv/image/upload/w_1200,q_auto:eco,f_auto/v1777690831/blogs/ituwsxwpjiy93mlmmctx.jpg",
  },
  {
    id: 2,
    name: "Block 2 Yala East",
    shortName: "Block 2",
    tagline: "The Untamed Wetlands",
    description:
      "Located across the gem-rich Menik River, Block 2 offers a raw, rugged wilderness experience that feels worlds apart from the main park. It is a land of expansive wetlands and grassy plains that attract large herds of wild elephants and water buffalo.",
    terrain: "Riverine Forest / Scrub / Lagoon",
    access: "Katagamuwa Gate",
    path: "M 200 380 L 300 350 L 350 420 L 280 490 L 180 450 Z",
    wildlife: ["Water Buffalo", "Marsh Elephant", "Estuarine Crocodile", "Painted Stork"],
    features: ["Menik River Crossing", "Wila Wewa", "Kumana Boundary"],
    bestTime: "Late Afternoon (Watering Holes)",
    image:
      "https://res.cloudinary.com/dkfnpmzpv/image/upload/w_1200,q_auto:eco,f_auto/v1777690831/blogs/ituwsxwpjiy93mlmmctx.jpg",
  },
  {
    id: 3,
    name: "Block 3 Pilinawa",
    shortName: "Block 3",
    tagline: "The Wilderness Sanctuary",
    description:
      "Often less accessible to the general public, Block 3 serves as a crucial sanctuary of dry monsoon forests and high biodiversity. With significantly minimal jeep traffic, it offers a serene safari experience ideal for serious nature enthusiasts.",
    terrain: "Dry Monsoon Forest / Rocky Ridges",
    access: "Galge Gate",
    path: "M 150 320 L 250 280 L 300 350 L 200 380 Z",
    wildlife: ["Spotted Deer", "Golden Jackal", "Leopard (Elusive)", "Grey Langur"],
    features: ["Sithulpawwa Temple Border", "Dense Canopy", "Exclusive Sightings"],
    bestTime: "Early Morning (Bird Watching)",
    image:
      "https://res.cloudinary.com/dkfnpmzpv/image/upload/w_1200,q_auto:eco,f_auto/v1777690831/blogs/ituwsxwpjiy93mlmmctx.jpg",
  },
  {
    id: 4,
    name: "Block 4 The North",
    shortName: "Block 4",
    tagline: "The Deep Jungle Corridor",
    description:
      "Distinct from the coastal blocks, the North is characterized by tall, mature timber forests and lush vegetation, fed by the catchment areas of the northern tributaries. It serves as a critical migration corridor for elephants moving between the wet and dry zones.",
    terrain: "Tall Timber Forest / Inland Scrub",
    access: "Galge Gate",
    path: "M 250 280 L 320 200 L 400 250 L 300 350 Z",
    wildlife: ["Sambar Deer", "Migratory Elephants", "Changeable Hawk Eagle", "Wild Boar"],
    features: ["Elephant Corridors", "Tall Forest Ecosystem", "Minimal Human Footprint"],
    bestTime: "Mid-Day (Shaded Areas)",
    image:
      "https://res.cloudinary.com/dkfnpmzpv/image/upload/w_1200,q_auto:eco,f_auto/v1777690831/blogs/ituwsxwpjiy93mlmmctx.jpg",
  },
  {
    id: 5,
    name: "Block 5 Buffer Zone",
    shortName: "Block 5",
    tagline: "The Reservoir Lands",
    description:
      "Aesthetically stunning and often underrated, Block 5 is a landscape dotted with picturesque ancient reservoirs (tanks) and open parklands. The lack of dense undergrowth provides excellent visibility, making it a top spot for sighting Sloth Bears and solitary male elephants.",
    terrain: "Open Parkland / Reservoirs",
    access: "Dematagala Gate",
    path: "M 20 420 L 50 350 L 150 320 L 110 400 Z",
    wildlife: ["Sloth Bear", "Tusker Elephants", "Fish Eagle", "Mugger Crocodile"],
    features: ["Weheragala Reservoir", "Scenic Dead Trees", "Open Plains"],
    bestTime: "Late Afternoon (Bear Activity)",
    image:
      "https://res.cloudinary.com/dkfnpmzpv/image/upload/w_1200,q_auto:eco,f_auto/v1777690831/blogs/ituwsxwpjiy93mlmmctx.jpg",
  },
];

export default function YalaGoogleShowcase() {
  const [activeBlockId, setActiveBlockId] = useState(1);
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);

  const activeBlock = useMemo(
    () => BLOCK_DATA.find((b) => b.id === activeBlockId) || BLOCK_DATA[0],
    [activeBlockId]
  );

  return (
    <section
      className="w-full bg-white text-[#000000] py-14 sm:py-20 lg:py-24 selection:bg-[#00ff00] selection:text-black [content-visibility:auto]"
      style={{
        fontFamily: '"Google Sans", "Open Sans", Roboto, -apple-system, BlinkMacSystemFont, Arial, sans-serif',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white">
          
          {/* Top Sector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10 sm:mb-14">
            {BLOCK_DATA.map((block) => {
              const isActive = activeBlockId === block.id;
              return (
                <button
                  key={block.id}
                  onClick={() => {
                    setActiveBlockId(block.id);
                    setActiveFeatureIndex(0);
                  }}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#00ff00] text-black shadow-sm"
                      : "text-[#1f1f1f] hover:text-black hover:bg-[#f1f3f4]"
                  }`}
                >
                  {block.shortName}
                </button>
              );
            })}
          </div>

          {/* Main Showcase Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* LEFT: Showcase Container */}
            <div className="lg:col-span-6 w-full flex justify-center">
              <div className="relative w-full max-w-[520px] aspect-square rounded-[3.5rem] bg-[#f8fafd] p-6 sm:p-10 flex items-center justify-center">
                
                {/* 1. Floating Wildlife Checklist */}
                <div className="absolute top-5 left-5 z-20 bg-white rounded-2xl p-4 sm:p-5 shadow-[0_10px_35px_rgba(0,0,0,0.1)] w-56 sm:w-64">
                  <span className="text-xs sm:text-sm font-semibold text-[#000000] block mb-2.5 tracking-tight">
                    Resident Species
                  </span>
                  <div className="space-y-2">
                    {activeBlock.wildlife.slice(0, 3).map((animal, i) => (
                      <div key={animal} className="flex items-center gap-2.5">
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center ${
                            i < 2 ? "bg-[#1a73e8] text-white" : "border-2 border-[#1f1f1f] bg-white"
                          }`}
                        >
                          {i < 2 && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="text-xs font-bold text-[#1f1f1f]">{animal}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Photo Viewport */}
                <div className="relative w-full h-full max-w-[390px] max-h-[390px] rounded-full sm:rounded-[3rem] overflow-hidden bg-[#e8eaed]">
                  <Image
                    key={activeBlock.id}
                    src={activeBlock.image}
                    alt={activeBlock.name}
                    fill
                    sizes="(max-width: 1024px) 90vw, 45vw"
                    quality={65}
                    loading="lazy"
                    decoding="async"
                    className="object-cover object-center transition-transform duration-700 hover:scale-105"
                  />
                </div>

                {/* 3. Floating Verified Tour Card */}
                <div className="absolute bottom-5 right-5 z-20 bg-white rounded-2xl p-3.5 sm:p-4 shadow-[0_10px_35px_rgba(0,0,0,0.1)] flex flex-col gap-1 max-w-[210px]">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span className="text-xs font-black text-[#000000] truncate">
                      {activeBlock.shortName} Drive
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[#fbbc04]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] text-[#1f1f1f] font-bold mt-0.5">
                    {activeBlock.access}
                  </span>
                </div>

              </div>
            </div>

            {/* RIGHT: High-Contrast Black Typography Stack */}
            <div className="lg:col-span-6 flex items-center justify-between gap-6 sm:gap-8">
              
              <div className="flex-1 space-y-6">
                <div>
                  <span className="text-lg font-medium text-[#000000] block mb-2">
                    {activeBlock.tagline}
                  </span>
                  <h3 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#000000] tracking-tight leading-[1.12]">
                    {activeBlock.name}
                  </h3>
                  <p className="mt-3 text-base sm:text-lg text-[#2d3135] leading-relaxed font-semibold">
                    {activeBlock.description}
                  </p>
                </div>

                {/* Highlights List */}
                <div className="space-y-4 pt-1">
                  <span className="text-lg font-bold tracking-widest text-[#000000] block">
                    Sector Highlights
                  </span>
                  {activeBlock.features.map((feat, idx) => {
                    const isSelected = activeFeatureIndex === idx;
                    return (
                      <div
                        key={feat}
                        onClick={() => setActiveFeatureIndex(idx)}
                        className={`cursor-pointer transition-all duration-200 flex items-start gap-3.5 ${
                          isSelected ? "opacity-100" : "opacity-75 hover:opacity-100"
                        }`}
                      >
                        <div className="w-6 h-6 rounded-full bg-[#00ff00] text-bold flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                          <Sparkles className="w-3.5 h-3.5 stroke-[2.5]" />
                        </div>
                        <div>
                          <h4
                            className={`text-base sm:text-lg font-bold tracking-tight leading-snug transition-colors ${
                              isSelected ? "text-[#000000]" : "text-[#1f1f1f]"
                            }`}
                          >
                            {feat}
                          </h4>
                          <p className="text-xs sm:text-sm text-[#3c4043] font-medium leading-relaxed mt-0.5">
                            Key sector attribute verified by park field naturalists.
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2.5 pt-3">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f1f3f4] text-xs font-bold text-[#000000]">
                    <TreePine className="w-4 h-4 text-[#0e5c00]" />
                    <span>{activeBlock.terrain}</span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f1f3f4] text-xs font-bold text-[#000000]">
                    <Clock className="w-4 h-4 text-[#0e5c00]" />
                    <span>{activeBlock.bestTime}</span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f1f3f4] text-xs font-bold text-[#000000]">
                    <MapPin className="w-4 h-4 text-[#0e5c00]" />
                    <span>{activeBlock.access}</span>
                  </div>
                </div>
              </div>

              {/* Right Vertical Navigation Bar */}
              <div className="hidden sm:flex flex-col items-center gap-4 self-center pr-2">
                <button
                  onClick={() => {
                    const nextId = (activeBlockId % BLOCK_DATA.length) + 1;
                    setActiveBlockId(nextId);
                  }}
                  aria-label="Next sector"
                  className="w-11 h-11 rounded-full bg-[#f1f3f4] hover:bg-[#e8eaed] text-[#000000] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </button>

                <div className="w-2.5 h-16 bg-[#e8eaed] rounded-full relative overflow-hidden">
                  <div
                    className="w-full bg-[#00ff00] rounded-full transition-all duration-300"
                    style={{
                      height: "33.33%",
                      transform: `translateY(${activeFeatureIndex * 100}%)`,
                    }}
                  />
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>
  );
}