import { Metadata } from "next";
import Image from "next/image";
import TransportForm from "@/components/TransportForm";
import { MapPin, ShieldCheck, Zap, Clock, Car, Star, UserCheck, Navigation } from "lucide-react";
import TourNavigator from "@/components/TourNavigator";

export const revalidate = 3600; // Enable ISR cache for 1 hour for instant TTFB

// --- 1. SEO METADATA ---
export const metadata: Metadata = {
    title: "Yala National Park | Sri Lanka Private Driver & Taxi Service | Island-Wide Transport",
    description: "Premium island-wide pickup & drop-off service. Luxury KDH vans & cars. Experienced chauffeurs, 24/7 support, and best market rates guaranteed. From Colombo, Ella, Galle, Mirissa to Yala.",
    keywords: [
        "yala taxi service",
        "sri lanka private driver",
        "colombo to yala taxi price",
        "ella to yala transport",
        "galle to yala taxi",
        "mirissa to yala transfer",
        "arugam bay to yala taxi",
        "mattala airport transfer",
        "luxury kdh van hire sri lanka",
        "safari jeep pickup yala",
        "reliable taxi service sri lanka",
        "tourist transport sri lanka",
        // --- 🔥 HIGH VOLUME & CORE SERVICES ---
        "yala taxi service", "sri lanka private driver", "taxi service sri lanka",
        "yala transport booking", "private car hire with driver sri lanka",
        "sri lanka tourist transport", "yala drop off service", "yala pickup service",
        "reliable taxi yala", "safe taxi sri lanka", "24/7 taxi service sri lanka",

        // --- ✈️ AIRPORT TRANSFERS (High Priority) ---
        "colombo airport to yala taxi", "bandaranaike international airport to yala",
        "BIA to yala transfer", "CMB airport taxi price", "mattala airport to yala taxi",
        "HRI airport transfer", "airport pickup sri lanka", "airport drop off yala",
        "colombo airport luxury transfer", "airport taxi rates sri lanka",

        // --- 📍 POPULAR ROUTES (The "Golden" Tourist Routes) ---
        "ella to yala taxi price", "ella to yala travel time", "galle to yala taxi",
        "mirissa to yala transfer", "weligama to yala taxi", "arugam bay to yala transport",
        "tangalle to yala taxi", "kandy to yala private car", "nuwara eliya to yala taxi",
        "hikkaduwa to yala transfer", "bentota to yala taxi", "hambantota to yala taxi",
        "udawalawe to yala transfer", "hiriketiya to yala taxi", "ahungalla to yala",

        // --- 🚐 VEHICLE SPECIFIC (Targeting specific needs) ---
        "luxury kdh van hire sri lanka", "toyota kdh high roof rental",
        "private sedan car hire", "luxury car rental sri lanka", "safari jeep pickup yala",
        "9 seater van hire sri lanka", "car with english speaking driver",
        "air conditioned taxi sri lanka", "comfortable tourist van",

        // --- 💰 PRICING & BOOKING INTENT ---
        "yala taxi rates 2025", "cheap taxi to yala", "best price taxi sri lanka",
        "fair price taxi yala", "book taxi online sri lanka", "taxi cost calculator sri lanka",
        "uber alternative yala", "pickme alternative yala", "negotiable taxi rates",

        // --- 🌟 NICHE & EXPERIENCE ---
        "luxury transport yala", "vip transfer sri lanka", "family transport sri lanka",
        "safe driver for solo female traveler", "surf board transport sri lanka",
        "expressway taxi sri lanka", "southern expressway taxi rates",
        "door to door transfer sri lanka", "hotel transfer yala"
    ],
    openGraph: {
        type: "website",
        title: "Premium Island-Wide Transport | Yala Wildlife Safari",
        description: "Safe, reliable, and affordable private transfers to Yala National Park from anywhere in Sri Lanka.",
        images: ["/uploads/1748935199061-20250603_1239_Leopard Emerges from Darkness_simple_compose_01jwt9yv7qect8krxy794bcr23.webp"],
        siteName: "Yala National Park",
    },
    alternates: {
        canonical: "https://www.yalawildlife.com/pickup-dropoff",
    },
};

// --- 2. JSON-LD SCHEMA ---     
const transportSchema = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Service",
            "serviceType": "Taxi & Shuttle Service",
            "provider": {
                "@type": "LocalBusiness",
                "name": "Yala Wildlife Safari Transport",
                "image": "https://www.yalawildlife.com/logo.png",
                "telephone": "+94778158004",
                "priceRange": "$$"
            },
            "areaServed": { "@type": "Country", "name": "Sri Lanka" },
            "description": "Luxury private transport and taxi service connecting all major cities in Sri Lanka to Yala National Park."
        }
    ]
};

export default function PickupDropoffPage() {
    return (
        <>
            <script
                type="application/ld+json"
                suppressHydrationWarning
                dangerouslySetInnerHTML={{ __html: JSON.stringify(transportSchema) }}
            />

            <main
                className="min-h-screen bg-white text-[#1f1f1f] relative overflow-hidden selection:bg-[#00ff00] selection:text-black antialiased pt-20 sm:pt-28 pb-20"
                style={{
                    fontFamily:
                        '"Google Sans", "Open Sans", Roboto, -apple-system, BlinkMacSystemFont, Arial, sans-serif',
                }}
            >
                <TourNavigator />

                <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
                        {/* --- LEFT COLUMN: Information --- */}
                        <div className="lg:col-span-7 space-y-10">
                            {/* 1. HERO HEADER */}
                            <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-4">
           
                                <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1f1f1f] leading-[1.15]">
                                    Premium Logistics & <br />
                                    <span className="text-[#1f1f1f]">Island Transfer</span>
                                </h1>

                                <p className="text-[18px] text-[#3c4043] font-semibold leading-[1.8] max-w-xl">
                                    Seamless pickup and drop-off transfers connecting any location
                                    in Sri Lanka directly to Yala National Park. Punctual, private,
                                    and fully air-conditioned.
                                </p>
                            </div>

                            {/* 2. METRICS GRID */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                <StatCard
                                    label="Reliability"
                                    value="100%"
                                    icon={<ShieldCheck size={16} className="text-[#00ff00]" />}
                                />
                                <StatCard
                                    label="Availability"
                                    value="24/7"
                                    icon={<Clock size={16} className="text-[#00ff00]" />}
                                />
                                <StatCard
                                    label="Pricing"
                                    value="Best Rate"
                                    icon={<Zap size={16} className="text-[#00ff00]" />}
                                />
                                <StatCard
                                    label="Feedback"
                                    value="5.0/5"
                                    icon={<Star size={16} className="text-[#00ff00]" />}
                                />
                            </div>

                            {/* 3. FLEET SPECS */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-[14px] font-bold text-[#5f6368] uppercase tracking-wider">
                                    <Car size={16} className="text-[#00ff00]" />
                                    <span>Fleet Categories</span>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {/* Car Card */}
                                    <div className="bg-white rounded-3xl p-6">
                                        <div className="flex items-center justify-between mb-3">
                                            <h3 className="text-[#1f1f1f] font-bold text-[18px]">
                                                Private Sedan
                                            </h3>
                                            <Navigation size={16} className="text-[#00ff00]" />
                                        </div>
                                        <p className="text-[14px] font-semibold text-[#5f6368] mb-4">
                                            Ideal for couples, solo travelers, and compact luggage
                                            routes.
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            <Badge text="Full A/C" />
                                            <Badge text="Up to 3 Pax" />
                                            <Badge text="2 Bags" />
                                        </div>
                                    </div>

                                    {/* Van Card */}
                                    <div className="bg-white rounded-3xl p-6">
                                        <div className="flex items-center justify-between mb-3">
                                            <h3 className="text-[#1f1f1f] font-bold text-[18px]">
                                                Luxury KDH Van
                                            </h3>
                                            <Navigation size={16} className="text-[#00ff00]" />
                                        </div>
                                        <p className="text-[14px] font-semibold text-[#5f6368] mb-4">
                                            Spacious comfort with extra legroom for families and
                                            groups.
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            <Badge text="Dual A/C" />
                                            <Badge text="Up to 9 Pax" />
                                            <Badge text="High Roof Luxury" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 4. CHAUFFEUR INFO */}
                            <div className="bg-white rounded-3xl p-6 sm:p-7 flex flex-col sm:flex-row items-center sm:items-start gap-5">
                                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0">
                                    <UserCheck size={22} className="text-[#00ff00]" />
                                </div>
                                <div className="text-center sm:text-left">
                                    <h3 className="text-[18px] font-bold text-[#1f1f1f] mb-1.5">
                                        Verified Professional Chauffeurs
                                    </h3>
                                    <p className="text-[15px] font-semibold text-[#5f6368] leading-relaxed">
                                        Licensed, background-checked travel drivers trained in
                                        defensive highway navigation. We guarantee punctuality,
                                        transparent routes, and roadside assistance.
                                    </p>
                                </div>
                            </div>

                            {/* 5. POPULAR ROUTES */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-[14px] font-bold text-[#5f6368] uppercase tracking-wider">
                                    <MapPin size={16} className="text-[#00ff00]" />
                                    <span>High-Frequency Routes</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <RoutePill from="Colombo Airport (BIA)" />
                                    <RoutePill from="Ella / Bandarawela" />
                                    <RoutePill from="Galle Fort" />
                                    <RoutePill from="Mirissa / Weligama" />
                                    <RoutePill from="Arugam Bay" />
                                    <RoutePill from="Udawalawe" />
                                </div>
                            </div>
                        </div>

                        {/* --- RIGHT COLUMN: FORM (Sticky & Unclipped) --- */}
                        <div className="lg:col-span-5 w-full">
                            <div className="lg:sticky lg:top-28 space-y-4">
                                <div className="bg-white p-6 sm:p-8 rounded-[2.5rem]">
                                    <div className="text-center mb-6">
                                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-white text-[12px] font-semibold text-[#1f1f1f] mb-2 uppercase tracking-wider">
                                            Transfer Desk
                                        </span>
                                        <h2 className="text-2xl font-bold tracking-tight text-[#1f1f1f]">
                                            Book Island Transfer
                                        </h2>
                                        <p className="text-[14px] font-semibold text-[#5f6368] mt-1">
                                            Direct highway transit with no surprise surcharges.
                                        </p>
                                    </div>

                                    <TransportForm />
                                </div>

                                <div className="flex items-center justify-center gap-2 text-[12px] font-semibold text-[#5f6368]">
                                    <ShieldCheck size={14} className="text-[#00ff00]" />
                                    <span>NO HIDDEN FEES • 100% PRIVATE VEHICLE</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

// --- GOOGLE-STYLE MICRO COMPONENTS (PURE WHITE) ---

function StatCard({
    label,
    value,
    icon,
}: {
    label: string;
    value: string;
    icon: React.ReactNode;
}) {
    return (
        <div className="bg-white p-4 rounded-2xl flex flex-col items-center justify-center text-center">
            <div className="mb-1.5">{icon}</div>
            <span className="text-[18px] font-bold text-[#1f1f1f]">{value}</span>
            <span className="text-[11px] font-semibold text-[#5f6368] uppercase tracking-wider">
                {label}
            </span>
        </div>
    );
}

function Badge({ text }: { text: string }) {
    return (
        <span className="bg-white px-3 py-1 rounded-full text-[12px] font-semibold text-[#1f1f1f]">
            {text}
        </span>
    );
}

function RoutePill({ from }: { from: string }) {
    return (
        <span className="inline-flex items-center gap-1.5 bg-white hover:bg-[#00ff00] hover:text-black text-[#1f1f1f] px-4 py-2 rounded-full text-[13px] font-semibold transition-colors duration-150 cursor-default">
            <span>⇄</span>
            <span>{from}</span>
        </span>
    );
}