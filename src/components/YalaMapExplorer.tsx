/* eslint-disable react/jsx-no-comment-textnodes */
"use client";

import { useState, useEffect, useMemo } from "react";
import { MapPin, Compass, TreePine } from "lucide-react";

const BLOCK_DATA = [
    {
        id: 1,
        name: "Block 1 Ruhuna",
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
        name: "Block 2 Yala East",
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
        name: "Block 3 Pilinawa",
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
        name: "Block 4 The North",
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
        name: "Block 5 Buffer Zone",
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
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const handleScroll = () => {
            // Trigger curve when scrolled more than 50px
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const activeBlock = useMemo(() =>
        BLOCK_DATA.find((b) => b.id === activeBlockId) || BLOCK_DATA[0],
        [activeBlockId]
    );

    return (
        <div className="w-full min-h-[110vh] font-sans overflow-hidden bg-black text-white selection:bg-[#00ff00] selection:text-black">
            <section
                className={`relative w-full h-full min-h-[110vh] transition-all duration-700 ease-in-out ${isMounted ? 'opacity-100' : 'opacity-0'} ${isScrolled ? 'rounded-t-[40px] md:rounded-t-[80px]' : 'rounded-t-0'}`}
                style={{ willChange: "transform, border-radius" }}
            >
                {/* --- Background Image Layer --- */}
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage: "url('https://res.cloudinary.com/dkfnpmzpv/image/upload/v1775225442/blogs/unv6dheidbcpoaqmmato.jpg')",
                            transform: 'translateZ(0)', // Force GPU acceleration
                        }}
                    ></div>
                    <div className="absolute inset-0 bg-black/30"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent"></div>
                </div>

                <div className="relative z-10 w-full h-full flex flex-col lg:flex-row px-6 py-12 lg:px-20">
                    {/* --- LEFT: INFO CLUSTER --- */}
                    <div className="w-full lg:w-[38%] flex flex-col gap-4 animate-slideInLeft">
                        <div className="inline-block self-start bg-transparent p-0 mb-2">
                            <h1 className="text-2xl lg:text-2xl font-black tracking-tighter leading-none mb-3 text-white drop-shadow-2xl">
                                Yala&nbsp;&nbsp;National&nbsp;&nbsp;Park <br /> <span className="text-white">Sectors</span>
                            </h1>
                            <p className="text-white/80 text-[9px] font-bold uppercase tracking-widest leading-tight max-w-[180px] drop-shadow-md">
                                Initialize tactical terrain data via coordinates.
                            </p>
                        </div>

                        {/* Navigation Pills - No Backdrop Blur */}
                        <div className="inline-block self-start bg-white/10 p-1 rounded-full flex gap-0.5 shadow-md">
                            {BLOCK_DATA.slice().sort((a, b) => a.id - b.id).map((block) => (
                                <button
                                    key={block.id}
                                    onClick={() => setActiveBlockId(block.id)}
                                    className={`px-3 py-1.5 text-[9px] font-black uppercase tracking-tight rounded-full transition-colors duration-200 ${activeBlockId === block.id
                                        ? 'bg-[#00ff00] text-black '
                                        : 'text-white/70 hover:text-white hover:bg-white/20'
                                        }`}
                                >
                                    {block.shortName}
                                </button>
                            ))}
                        </div>

                        {/* Tactical Intel Card - No Backdrop Blur */}
                        <div className="inline-block self-start bg-transparent p-0 w-full max-w-[320px]">
                            <div key={activeBlock.id} className="animate-slideUp space-y-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h2 className="text-xl font-black tracking-tight text-white leading-none drop-shadow-xl">{activeBlock.name}</h2>
                                        <p className="text-[#00ff00] text-[10px] font-black uppercase tracking-[0.1em] mt-2 drop-shadow-md">{activeBlock.tagline}</p>
                                    </div>
                                    <Compass className="w-5 h-5 text-white/50" />
                                </div>

                                <p className="text-white font-medium text-[12px] leading-snug italic border-l-2 border-[#00ff00] pl-3 drop-shadow-lg">
                                    "{activeBlock.description}"
                                </p>

                                <div className="flex gap-2 pt-2">
                                    <div className="bg-black/40 px-3 py-2 rounded-xl flex-1 shadow-lg border border-white/5">
                                        <p className="text-[8px] text-[#00ff00] uppercase font-black mb-1 flex items-center gap-1">
                                            <TreePine className="w-2.5 h-2.5" /> Terrain
                                        </p>
                                        <p className="text-[11px] font-bold text-white drop-shadow-md">{activeBlock.terrain}</p>
                                    </div>
                                    <div className="bg-black/40 px-3 py-2 rounded-xl flex-1 shadow-lg border border-white/5">
                                        <p className="text-[8px] text-[#00ff00] uppercase font-black mb-1 flex items-center gap-1">
                                            <MapPin className="w-2.5 h-2.5" /> Entry
                                        </p>
                                        <p className="text-[11px] font-bold text-white drop-shadow-md">{activeBlock.access}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- RIGHT: THE MAP --- */}
                    <div className="w-full lg:w-[62%] h-[400px] lg:h-[700px] flex items-center justify-center animate-fadeIn">
                        <svg
                            viewBox="0 0 500 550"
                            className="w-full h-full drop-shadow-2xl"
                            preserveAspectRatio="xMidYMid meet"
                            style={{ willChange: 'contents' }}
                        >
                            <defs>
                                <filter id="mapGlow">
                                    <feGaussianBlur stdDeviation="3" result="blur" />
                                    <feMerge>
                                        <feMergeNode in="blur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                            </defs>

                            {BLOCK_DATA.map((block) => {
                                const isActive = activeBlockId === block.id;
                                return (
                                    <path
                                        key={block.id}
                                        d={block.path}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setActiveBlockId(block.id);
                                        }}
                                        className={`cursor-pointer transition-all duration-300 pointer-events-auto ${isActive
                                            ? 'fill-[#00ff00]/50 stroke-[#00ff00] stroke-[3px]'
                                            : 'fill-white/10 stroke-white/40 hover:stroke-white hover:fill-white/20'
                                            }`}
                                        style={{ filter: isActive ? 'url(#mapGlow)' : 'none' }}
                                    />
                                );
                            })}
                        </svg>
                    </div>
                </div>
            </section>

            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800;900&display=swap');
                
                body { font-family: 'Plus Jakarta Sans', sans-serif; -webkit-font-smoothing: antialiased; }

                .animate-slideInLeft {
                    animation: slideInLeft 0.5s ease-out forwards;
                }
                .animate-slideUp {
                    animation: slideUp 0.4s ease-out forwards;
                }
                .animate-fadeIn {
                    animation: fadeIn 0.8s ease-out forwards;
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideInLeft {
                    from { opacity: 0; transform: translateX(-15px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(8px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                *::-webkit-scrollbar { display: none; }
                * { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </div>
    );
}