/* eslint-disable react/jsx-no-comment-textnodes */
"use client";

import { useState, useEffect } from "react";
import { MapPin, Compass, Info } from "lucide-react";

// --- Data for the 5 Blocks ---
const BLOCK_DATA = [
  {
    id: 1,
    name: "Block 1: Ruhuna",
    shortName: "Block 1",
    tagline: "The Leopard Capital of the World",
    description: "The crown jewel of Yala and the most visited sector, renowned globally for having the highest density of leopards per square kilometer. The topography is a dramatic theatre of rocky granite outcrops (inselbergs), saline coastal lagoons, and semi-arid scrub jungle.",
    terrain: "Dense Forest / Granite / Coastal",
    access: "Palatupana Gate",
    path: "M 50 350 L 150 320 L 200 380 L 180 450 L 80 480 L 20 420 Z",
    center: { x: 110, y: 400 },
    wildlife: ["Sri Lankan Leopard", "Sloth Bear", "Asian Elephant", "Mugger Crocodile"],
    features: ["Patanangala Rock", "Buttuwa Wewa", "Highest Leopard Density"],
    bestTime: "Dawn (6:00 AM) or Dusk (4:00 PM)"
  },
  {
    id: 2,
    name: "Block 2: Yala East",
    shortName: "Block 2",
    tagline: "The Untamed Wetlands",
    description: "Located across the gem-rich Menik River, Block 2 offers a raw, rugged wilderness experience that feels worlds apart from the main park. It is a land of expansive wetlands and grassy plains that attract large herds of wild elephants and water buffalo.",
    terrain: "Riverine Forest / Scrub / Lagoon",
    access: "Katagamuwa Gate",
    path: "M 200 380 L 300 350 L 350 420 L 280 490 L 180 450 Z",
    center: { x: 260, y: 420 },
    wildlife: ["Water Buffalo", "Marsh Elephant", "Estuarine Crocodile", "Painted Stork"],
    features: ["Menik River Crossing", "Wila Wewa", "Kumana Boundary"],
    bestTime: "Late Afternoon (Watering Holes)"
  },
  {
    id: 3,
    name: "Block 3: Pilinawa",
    shortName: "Block 3",
    tagline: "The Wilderness Sanctuary",
    description: "Often less accessible to the general public, Block 3 serves as a crucial sanctuary of dry monsoon forests and high biodiversity. With significantly minimal jeep traffic, it offers a serene safari experience ideal for serious nature enthusiasts.",
    terrain: "Dry Monsoon Forest / Rocky Ridges",
    access: "Galge Gate",
    path: "M 150 320 L 250 280 L 300 350 L 200 380 Z",
    center: { x: 220, y: 340 },
    wildlife: ["Spotted Deer", "Golden Jackal", "Leopard (Elusive)", "Grey Langur"],
    features: ["Sithulpawwa Temple Border", "Dense Canopy", "Exclusive Sightings"],
    bestTime: "Early Morning (Bird Watching)"
  },
  {
    id: 4,
    name: "Block 4: The North",
    shortName: "Block 4",
    tagline: "The Deep Jungle Corridor",
    description: "Distinct from the coastal blocks, the North is characterized by tall, mature timber forests and lush vegetation, fed by the catchment areas of the northern tributaries. It serves as a critical migration corridor for elephants moving between the wet and dry zones.",
    terrain: "Tall Timber Forest / Inland Scrub",
    access: "Galge Gate",
    path: "M 250 280 L 320 200 L 400 250 L 300 350 Z",
    center: { x: 310, y: 280 },
    wildlife: ["Sambar Deer", "Migratory Elephants", "Changeable Hawk Eagle", "Wild Boar"],
    features: ["Elephant Corridors", "Tall Forest Ecosystem", "Minimal Human Footprint"],
    bestTime: "Mid-Day (Shaded Areas)"
  },
  {
    id: 5,
    name: "Block 5: Buffer Zone",
    shortName: "Block 5",
    tagline: "The Reservoir Lands",
    description: "Aesthetically stunning and often underrated, Block 5 is a landscape dotted with picturesque ancient reservoirs (tanks) and open parklands. The lack of dense undergrowth provides excellent visibility, making it a top spot for sighting Sloth Bears and solitary male elephants.",
    terrain: "Open Parkland / Reservoirs",
    access: "Dematagala Gate",
    path: "M 20 420 L 50 350 L 150 320 L 110 400 Z",
    center: { x: 70, y: 360 },
    wildlife: ["Sloth Bear", "Tusker Elephants", "Fish Eagle", "Mugger Crocodile"],
    features: ["Weheragala Reservoir", "Scenic Dead Trees", "Open Plains"],
    bestTime: "Late Afternoon (Bear Activity)"
  },
];

export default function YalaMapExplorer() {
  const [activeBlockId, setActiveBlockId] = useState(1);
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const activeBlock = BLOCK_DATA.find((b) => b.id === activeBlockId) || BLOCK_DATA[0];

  return (
    <div className="w-full h-screen p-2 sm:p-4 md:p-6 lg:p-8 flex items-center justify-center font-sans overflow-hidden">
        
        <section className={`relative w-full h-full max-w-[1920px] bg-black text-white overflow-hidden selection:bg-[#00ff00] selection:text-black rounded-[2rem] md:rounded-[3rem] lg:rounded-[8rem] shadow-2xl border border-white/5 flex flex-col lg:flex-row transition-opacity duration-1000 ${isMounted ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* --- Background Image Layer --- */}
        <div className="absolute inset-0 z-0 pointer-events-none">
            <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-slowZoom"
                style={{ 
                    backgroundImage: "url('https://res.cloudinary.com/dkfnpmzpv/image/upload/v1764916309/hero_sections/lfmtdsdxosdmdnjukoj4.jpg')",
                    animation: "zoomPan 60s infinite alternate ease-in-out" 
                }}
            ></div>
            <div className="absolute inset-0 bg-black/50 backdrop-contrast-125"></div>
            <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/90"></div>
        </div>

        {/* Content Wrapper */}
        <div className="relative z-10 w-full h-full flex flex-col lg:flex-row p-4 sm:p-6 md:p-8 lg:p-12 gap-4 lg:gap-0 overflow-y-auto lg:overflow-hidden">

            {/* ================================================================== */}
            {/* LEFT PANEL: INFO & CONTROLS                                        */}
            {/* ================================================================== */}
            <div className="w-full lg:w-[40%] flex flex-col justify-start lg:justify-center items-start gap-4 lg:gap-6 animate-slideInLeft pb-8 lg:pb-0">
                
                {/* 1. Header Block */}
                <div className="inline-block bg-black/60 backdrop-blur-xl p-5 sm:p-6 rounded-[2rem] border border-white/10 shadow-2xl transition-transform hover:scale-[1.01] duration-500 w-full lg:w-auto">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00ff00] animate-pulse"></span>
                        <span className="text-[#00ff00] text-[10px] font-mono uppercase tracking-[0.2em]">Yala National Park</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase leading-none tracking-tight mb-2">
                        Explore <br/> <span className="text-neutral-500">The Sectors</span>
                    </h1>
                    <p className="text-neutral-400 max-w-[280px] text-[10px] sm:text-xs leading-relaxed font-mono">
                        Navigate the 5 distinct zones. <br className="hidden sm:block"/> Select a block for intel.
                    </p>
                </div>

                {/* 2. Navigation Block - RESPONSIVE FIX */}
                <div className="w-full lg:w-auto inline-block bg-black/60 backdrop-blur-xl p-3 rounded-[1.5rem] border border-white/10">
                    <div className="flex flex-wrap gap-2 w-full lg:max-w-[320px]">
                        {BLOCK_DATA.map((block) => (
                            <button
                                key={block.id}
                                onClick={() => setActiveBlockId(block.id)}
                                className={`
                                    px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-wider border rounded-xl transition-all duration-300 relative overflow-hidden group flex-grow text-center
                                    ${activeBlockId === block.id 
                                        ? 'bg-[#00ff00] text-black border-[#00ff00] shadow-[0_0_15px_rgba(0,255,0,0.3)]' 
                                        : 'bg-white/5 text-white border-white/10 hover:border-white/30 hover:bg-white/10'
                                    }
                                `}
                            >
                                <span className="relative z-10">{block.shortName}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* 3. Detail Info Block (Cutter Shape) */}
                <div 
                    className="relative bg-black/70 backdrop-blur-xl p-6 text-white w-full lg:w-auto lg:min-w-[350px] lg:max-w-md animate-fadeIn mt-2 shadow-2xl border border-white/5 transition-all duration-500"
                    style={{ 
                        clipPath: "polygon(0 0, 100% 0, 100% 88%, 90% 100%, 0 100%)", 
                        borderRadius: "2rem 2rem 0 2rem" 
                    }}
                >
                    {/* Neon Accent Line */}
                    <div className="absolute top-0 left-0 bottom-0 w-1 bg-[#00ff00] opacity-50"></div>
                    
                    <div className="absolute top-4 right-4 opacity-10">
                        <Compass className="w-16 h-16 rotate-45 transition-transform duration-1000 group-hover:rotate-90" />
                    </div>

                    <div key={activeBlock.id} className="animate-slideUp relative z-10 pl-3">
                        <h2 className="text-xl sm:text-2xl font-bold text-white mb-1 tracking-tight">
                            {activeBlock.name}
                        </h2>
                        <p className="text-[#00ff00] font-mono text-[9px] sm:text-[10px] uppercase tracking-widest mb-4 opacity-90">
                            // {activeBlock.tagline}
                        </p>

                        <div className="h-auto max-h-[140px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                            <p className="text-neutral-300 text-xs leading-5 font-light">
                                {activeBlock.description}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 border-t border-white/10 pt-4 mt-4">
                            <div>
                                <span className="block text-neutral-500 text-[9px] font-mono uppercase mb-1">Terrain</span>
                                <span className="text-white text-[10px] font-bold flex items-center gap-1.5 bg-white/5 px-2 py-1.5 rounded-lg w-full sm:w-fit border border-white/5">
                                    <Info className="w-3 h-3 text-[#00ff00]" /> {activeBlock.terrain}
                                </span>
                            </div>
                            <div>
                                <span className="block text-neutral-500 text-[9px] font-mono uppercase mb-1">Gate</span>
                                <span className="text-white text-[10px] font-bold flex items-center gap-1.5 bg-white/5 px-2 py-1.5 rounded-lg w-full sm:w-fit border border-white/5">
                                    <MapPin className="w-3 h-3 text-[#00ff00]" /> {activeBlock.access}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* ================================================================== */}
            {/* RIGHT PANEL: INTERACTIVE MAP                                       */}
            {/* ================================================================== */}
            <div className="w-full lg:w-[60%] h-[300px] sm:h-[400px] lg:h-full relative flex items-center justify-center mt-6 lg:mt-0 animate-fadeIn delay-200">
                
                {/* Map Container */}
                <div className="relative w-full h-full flex items-center justify-center">
                    
                    <svg 
                        viewBox="0 0 500 550" 
                        className="w-full h-full max-h-[600px] drop-shadow-2xl transition-all duration-700 p-4"
                        preserveAspectRatio="xMidYMid meet"
                    >
                        <defs>
                            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur stdDeviation="4" result="blur" />
                                <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                        </defs>

                        {/* Grid Pattern in SVG */}
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.05"/>
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#grid)" />

                        {BLOCK_DATA.map((block) => {
                            const isActive = activeBlockId === block.id;
                            return (
                                <g 
                                    key={block.id} 
                                    onClick={() => setActiveBlockId(block.id)}
                                    className="cursor-pointer group"
                                >
                                    <path 
                                        d={block.path}
                                        className={`
                                            transition-all duration-500 ease-out
                                            ${isActive 
                                                ? 'fill-[#00ff00]/20 stroke-[#00ff00] stroke-[2px]' 
                                                : 'fill-black/40 stroke-white/20 stroke-1 hover:fill-black/60 hover:stroke-white/40'
                                            }
                                        `}
                                        style={{ filter: isActive ? 'url(#glow)' : 'none' }}
                                    />
                                    
                                    <foreignObject x={block.center.x - 30} y={block.center.y - 15} width="60" height="30" className={`pointer-events-none transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`}>
                                        <div className="flex flex-col items-center justify-center text-center">
                                            <span className="w-1.5 h-1.5 bg-[#00ff00] rounded-full animate-ping absolute mb-4"></span>
                                            <span className="bg-black/90 text-white text-[8px] font-mono px-1.5 py-0.5 rounded-md border border-[#00ff00]/30 backdrop-blur-md shadow-lg">
                                                {block.shortName}
                                            </span>
                                        </div>
                                    </foreignObject>
                                </g>
                            );
                        })}

                        <text x="400" y="500" className="fill-white/10 font-black text-6xl select-none font-mono tracking-tighter">YALA</text>
                        <path d="M 430 60 L 436 50 L 442 60 L 436 90 Z" className="fill-white/20" />
                        <text x="432" y="110" className="fill-white/30 text-[8px] font-mono font-bold">N</text>
                    </svg>
                </div>

                {/* Status Block - Floating */}
                <div className="absolute bottom-4 right-4 lg:bottom-12 lg:right-12 bg-black/60 backdrop-blur-xl px-4 py-2 rounded-2xl border border-white/10 shadow-lg pointer-events-none">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#00ff00] animate-pulse"></div>
                        <span className="text-white text-[9px] font-mono font-bold tracking-widest">SATELLITE_FEED_LIVE</span>
                    </div>
                </div>

            </div>

        </div>
        </section>
        
        <style jsx global>{`
          @keyframes zoomPan {
            0% { transform: scale(1) translate(0, 0); }
            100% { transform: scale(1.1) translate(-2%, -2%); }
          }
          .animate-slowZoom {
             /* Inline style handles this to avoid Tailwind config issues */
          }
          /* Hide scrollbar for Chrome, Safari and Opera */
          .scrollbar-hide::-webkit-scrollbar {
              display: none;
          }
          /* Hide scrollbar for IE, Edge and Firefox */
          .scrollbar-hide {
              -ms-overflow-style: none;  /* IE and Edge */
              scrollbar-width: none;  /* Firefox */
          }
          
          .animate-fadeIn {
            animation: fadeIn 0.8s ease-out forwards;
          }
          .animate-slideInLeft {
            animation: slideInLeft 0.8s ease-out forwards;
          }
          .animate-slideUp {
            animation: slideUp 0.5s ease-out forwards;
          }
          
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideInLeft {
            from { opacity: 0; transform: translateX(-20px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
    </div>
  );
}