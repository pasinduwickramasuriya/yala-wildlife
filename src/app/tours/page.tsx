/* eslint-disable @typescript-eslint/no-explicit-any */
import { Metadata } from "next";
import Image from "next/image";
import { tourPackages } from "@/data/tours";
import { TourPackageCard, Tour } from "@/components/TourPackageCard";

// 1. HIGH-POWERED METADATA
export const metadata: Metadata = {
    title: "Best Sri Lanka Tours 2026 | Private Safari & Cultural Expeditions",
    description: "Experience premium Sri Lankan travel. Curated tours to Sigiriya, Kandy, Ella, and Yala. Private transportation and licensed guides for the ultimate safari adventure.",
    keywords: "Sri Lanka travel, wildlife safari Yala, Sigiriya tours, Sri Lanka transportation, private driver Sri Lanka, Ella train journey, luxury Sri Lanka tours 2026",
    openGraph: {
        title: "Explore Sri Lanka: 2026 Premium Expedition Packages",
        description: "Join SmartWay Tour Specialists for elite island-wide journeys.",
        images: ["https://res.cloudinary.com/dkfnpmzpv/image/upload/v1771401761/hero_sections/dcjjvovjfbgidkiydjgw.jpg"],
    },
};

export default function ToursPage() {
    // 2. SCHEMA.ORG DATA (Invisible to users, visible to Google)
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": tourPackages.map((tour, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "url": `https://yalawildlife.com/tours/${tour.slug}`,
            "name": tour.title,
            "description": tour.description
        }))
    };

    return (
        <main className="relative w-full min-h-screen overflow-hidden bg-black selection:bg-[#00ff00]">
            {/* Add JSON-LD to Head */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* --- BACKGROUND --- */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://res.cloudinary.com/dkfnpmzpv/image/upload/v1771401761/hero_sections/dcjjvovjfbgidkiydjgw.jpg"
                    alt="Sri Lanka Wildlife Background"
                    fill
                    priority
                    unoptimized={true}
                    className="object-cover brightness-[0.9] scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b  via-transparent to-black" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">
                {/* SEO HEADER */}
                <header className="text-center mb-24">
                    <div className="inline-block bg-black/70 px-4 py-1 rounded-full border border-[#00ff00]/20 mb-6">
                        {/* H1 is critical for SEO - we keep your styling */}
                        <h1 className="text-[10px] font-black text-[#00ff00] uppercase tracking-[0.6em]">
                            Tour Specialists
                        </h1>
                    </div>
                    <h2 className="text-5xl md:text-4xl font-black text-white tracking-[-0.09em] uppercase leading-[0.75] mb-8">
                        <span className="inline-block bg-black/70 px-6 py-2 rounded-full mb-2">Explore the</span><br />
                        <span className="inline-block bg-black/70 px-6 py-2 rounded-full text-[#00ff00]">Emerald Isle</span>
                    </h2>

                    {/* Hidden Semantic Text: Helps ranking without changing UI look */}
                    <div className="sr-only">
                        Experience the best travel points in Sri Lanka including Sigiriya Rock Fortress,
                        Temple of the Sacred Tooth Relic in Kandy, Nine Arches Bridge in Ella, and
                        Yala National Park Safaris. We provide premium transportation and licensed private drivers.
                    </div>
                </header>

                {/* TOUR PACKAGES LIST */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {tourPackages.map((tour: Tour) => (
                        <TourPackageCard key={tour.id} tour={tour} />
                    ))}
                </div>
            </div>

            {/* NANO-FOOTER */}
            <footer className="relative z-10 py-12 text-center">
                <div className="inline-block bg-black/70 px-6 py-3 rounded-xl border border-white/10">
                    <p className="text-[8px] font-black text-neutral-500 uppercase tracking-[0.4em]">
                        © 2026 SmartWay Tour Specialists • SLTDA Approved #4492 • Official Sri Lanka Travel Partner
                    </p>
                </div>
            </footer>
        </main>
    );
}