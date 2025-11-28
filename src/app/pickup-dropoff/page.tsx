

import { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import TransportForm from "@/components/TransportForm";
import { MapPin, ShieldCheck, Zap, Clock, Car, Star, UserCheck, Navigation } from "lucide-react";

// --- 1. SEO METADATA ---
export const metadata: Metadata = {
    title: "Sri Lanka Private Driver & Yala Taxi Service | Island-Wide Transport",
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
        siteName: "Yala Wildlife Safari",
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
            <Header />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(transportSchema) }} />

            <main className="min-h-screen bg-[#050505] text-white relative overflow-hidden selection:bg-green-500/30 font-sans">

                {/* =========================================
            BACKGROUND (Fixed & Visible)
        ========================================= */}
                <div className="fixed inset-0 z-0">
                    <Image
                        src="/uploads/1748935199061-20250603_1239_Leopard Emerges from Darkness_simple_compose_01jwt9yv7qect8krxy794bcr23.webp"
                        alt="Sri Lanka Transport Background"
                        fill
                        priority
                        className="object-cover opacity-70"
                        quality={90}
                    />
                    {/* Gradient to darken text areas only */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/10 to-transparent" />
                    {/* Subtle Vignette for focus */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_10%,_rgba(5,5,5,0.8)_100%)]" />
                </div>

                {/* =========================================
            CONTENT CONTAINER
        ========================================= */}
                <div className="relative z-10 container mx-auto px-4 pt-32 pb-20">

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

                        {/* --- LEFT COLUMN: Information --- */}
                        <div className="lg:col-span-7 space-y-10 pt-4">

                            {/* 1. HERO HEADER */}
                            <div className="backdrop-blur- rounded-3xl p-8 relative overflow-hidden">
                                {/* Decorative Glow */}
                                {/* <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/20 rounded-full blur-3xl pointer-events-none"></div> */}

                                <div className="flex items-center gap-3 mb-6">
                                    <div className="px-3 py-1 rounded-full bg-green-500/20 flex items-center gap-2">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                        </span>
                                        <span className="text-[10px] font-mono uppercase tracking-widest text-green-300 font-bold">Fleet Online</span>
                                    </div>
                                    <span className="text-[10px] font-mono text-neutral-300 uppercase tracking-wider">Island-Wide Coverage</span>
                                </div>

                                <h1 className="text-5xl md:text-4xl font-black text-white tracking-tighter leading-[0.95] mb-6">
                                    PREMIUM <br />
                                    <span className="text-green-400 font-bold">LOGISTICS</span>

                                </h1>

                                <p className="text-sm text-neutral-200 font-light leading-relaxed max-w-xl">
                                    Experience the gold standard in Sri Lankan travel. We offer seamless <span className="text-white font-semibold">Pickup & Drop-off services</span> from any location on the island directly to Yala National Park. Secure, punctual, and priced for value.
                                </p>
                            </div>

                            {/* 2. METRICS GRID */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                <StatCard label="Reliability" value="100%" icon={<ShieldCheck size={14} className="text-green-400" />} />
                                <StatCard label="Availability" value="24/7" icon={<Clock size={14} className="text-green-400" />} />
                                <StatCard label="Pricing" value="Best Rate" icon={<Zap size={14} className="text-green-400" />} />
                                <StatCard label="Feedback" value="5.0/5" icon={<Star size={14} className="text-green-400" />} />
                            </div>

                            {/* 3. FLEET SPECS */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-xs font-mono text-neutral-300 uppercase tracking-widest mb-2">
                                    <Car size={14} className="text-green-400" /> Fleet Categories
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {/* Car Card */}
                                    <div className="group relative backdrop-blur-xl bg-black/40 rounded-2xl p-5 transition-all duration-500 hover:shadow-[0_0_20px_rgba(34,197,94,0.2)]">
                                        <div className="absolute top-3 right-3 opacity-50 group-hover:opacity-100 transition-opacity">
                                            <Navigation size={16} className="text-green-400" />
                                        </div>
                                        <h3 className="text-white font-bold text-sm mb-1">Private Sedan</h3>
                                        <p className="text-[10px] text-neutral-400 mb-3">Ideal for couples & solo travelers.</p>
                                        <div className="flex gap-2">
                                            <Badge text="A/C" />
                                            <Badge text="3 Pax" />
                                            <Badge text="2 Bags" />
                                        </div>
                                    </div>

                                    {/* Van Card */}
                                    <div className="group relative backdrop-blur-xl bg-black/40 rounded-2xl p-5 transition-all duration-500 hover:shadow-[0_0_20px_rgba(34,197,94,0.2)]">
                                        <div className="absolute top-3 right-3 opacity-50 group-hover:opacity-100 transition-opacity">
                                            <Navigation size={16} className="text-green-400" />
                                        </div>
                                        <h3 className="text-white font-bold text-sm mb-1">Luxury KDH Van</h3>
                                        <p className="text-[10px] text-neutral-400 mb-3">Perfect for families & groups.</p>
                                        <div className="flex gap-2">
                                            <Badge text="Dual A/C" />
                                            <Badge text="9 Pax" />
                                            <Badge text="High Roof" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 4. CHAUFFEUR INFO */}
                            <div className="backdrop-blur-xl bg-black/50 rounded-3xl p-6 flex flex-col md:flex-row items-center gap-6">
                                <div className="w-12 h-12 rounded-full bg-green-900/20 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(34,197,94,0.2)]">
                                    <UserCheck size={24} className="text-green-400" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-white mb-1">Verified Professional Chauffeurs</h3>
                                    <p className="text-xs text-neutral-300 leading-relaxed">
                                        Our drivers are not just drivers; they are experienced travel guides. Licensed, background-checked, and trained in defensive driving. We guarantee punctuality and on-road safety for your peace of mind.
                                    </p>
                                </div>
                            </div>

                            {/* 5. POPULAR ROUTES */}
                            <div>
                                <div className="flex items-center gap-2 text-xs font-mono text-neutral-300 uppercase tracking-widest mb-4">
                                    <MapPin size={14} className="text-green-400" /> High-Frequency Connections
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

                        {/* --- RIGHT COLUMN: FORM (Sticky) --- */}
                        <div className="lg:col-span-5">
                            <div className="sticky top-24">
                                {/* Transport Form Component */}
                                <TransportForm />

                                <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-neutral-400 font-mono">
                                    <ShieldCheck size={12} className="text-green-500" />
                                    <span>NO HIDDEN FEES • FREE CANCELLATION</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </>
    );
}

// --- MICRO COMPONENTS ---

const StatCard = ({ label, value, icon }: { label: string, value: string, icon: React.ReactNode }) => (
    <div className="bg-black/40 hover:bg-black/60 rounded-xl p-3 text-center transition-all duration-300 group backdrop-blur-md">
        <div className="flex justify-center mb-1 opacity-80 group-hover:opacity-100 transition-opacity scale-90 group-hover:scale-100 duration-300">{icon}</div>
        <div className="text-sm font-black text-white">{value}</div>
        <div className="text-[9px] uppercase tracking-wider text-neutral-400">{label}</div>
    </div>
);

const Badge = ({ text }: { text: string }) => (
    <span className="text-[9px] font-bold bg-green-900/20 text-green-400 px-2 py-1 rounded-md">
        {text}
    </span>
);

const RoutePill = ({ from }: { from: string }) => (
    <div className="flex items-center gap-2 bg-black/40 hover:bg-green-900/20 px-3 py-1.5 rounded-lg transition-all cursor-default group backdrop-blur-sm shadow-sm">
        <div className="w-1.5 h-1.5 rounded-full bg-neutral-500 group-hover:bg-green-400 transition-colors"></div>
        <span className="text-xs text-neutral-300 group-hover:text-white font-medium">{from}</span>
    </div>
);







