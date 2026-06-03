/* eslint-disable @typescript-eslint/no-explicit-any */
import { Metadata } from "next";
import Image from "next/image";
import prisma from "@/lib/prisma";
import { tourPackages as staticTourPackages } from "@/data/tours";
import { TourPackageCard, Tour } from "@/components/TourPackageCard";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
    title: "Sri Lanka Tour Packages 2026 | Private Driver & Guided Safaris",
    description: "Book premium Sri Lanka tours & private safaris. Expert SLTDA-licensed driver-guides, luxury transport & custom itineraries to Yala, Sigiriya, Ella & Kandy.",
    keywords: [
        // Core Tour & Holiday Packages
        "Sri Lanka tour packages 2026",
        "Sri Lanka holiday packages",
        "best Sri Lanka itineraries",
        "custom Sri Lanka tours",
        "Sri Lanka vacation packages",
        "Sri Lanka 7 day itinerary",
        "Sri Lanka 10 day tour",
        "Sri Lanka 14 day round trip",
        "Sri Lanka comprehensive tour",

        // Driver & Transport (Very High Conversion Intent)
        "hire private driver Sri Lanka",
        "Sri Lanka private car and driver",
        "SLTDA licensed driver Sri Lanka",
        "Sri Lanka driver guide",
        "rent a car with driver Sri Lanka",
        "tour guide Sri Lanka cost",
        "English speaking driver Sri Lanka",
        "Colombo airport transfer to Yala",
        "private chauffeur Sri Lanka",

        // Wildlife & Safari Specific
        "Sri Lanka wildlife tours",
        "Yala national park safari packages",
        "leopard safari Sri Lanka",
        "Sri Lanka elephant safari",
        "premium Yala safari booking",
        "Bundala bird watching tour",
        "Udawalawe private safari",

        // Key Destinations & Routes
        "Cultural Triangle tour Sri Lanka",
        "Sigiriya rock fortress tour",
        "Kandy to Ella scenic train booking",
        "Nuwara Eliya tea plantation tour",
        "Galle fort day trip",
        "Ella nine arches bridge tour",
        "Colombo to Yala private transfer",

        // Niche Audiences & Demographics
        "luxury Sri Lanka tours",
        "Sri Lanka honeymoon packages 2026",
        "Sri Lanka family holidays",
        "Sri Lanka tour packages from UK",
        "Sri Lanka tours for US citizens",
        "private guided tours Sri Lanka",
        "tailor made holidays Sri Lanka"
    ],
    alternates: {
        canonical: "https://www.yalawildlife.com/tours",
    },
    openGraph: {
        title: "Premium Sri Lanka Tour Packages 2026 | SmartWay Specials",
        description: "Explore Sri Lanka with custom tour packages, licensed private drivers, and luxury 4x4 safaris.",
        images: ["https://res.cloudinary.com/dkfnpmzpv/image/upload/v1771401761/hero_sections/dcjjvovjfbgidkiydjgw.jpg"],
        url: "https://www.yalawildlife.com/tours",
        type: "website"
    },
};

export default async function ToursPage() {
    // 2. DEFENSIVE AND CRASH-PROOF FETCHING
    let tourPackages: any[] = [];
    const tourModel = (prisma as any).tour;

    // Static fallback utility helper
    const getStaticTours = () => {
        return staticTourPackages.map(st => {
            const durationDays = st.itinerary.length;
            return {
                id: st.id,
                title: st.title,
                slug: st.slug,
                route: st.route,
                price: st.price,
                duration: `${durationDays} Days / ${durationDays - 1} Nights`,
                imageUrl: "https://res.cloudinary.com/dkfnpmzpv/image/upload/v1771401761/hero_sections/dcjjvovjfbgidkiydjgw.jpg",
                isFeatured: st.id.includes("8-day") || st.id.includes("14-day"),
                description: st.description,
                highlights: st.highlights,
            } as any;
        });
    };

    if (tourModel) {
        try {
            tourPackages = await tourModel.findMany();

            // 3. AUTO-SEEDING DB FALLBACK (Self-Healing)
            if (tourPackages.length === 0) {
                console.log("No tours found in database. Auto-seeding static tours...");
                const tourImages: { [key: string]: string } = {
                    "5-day-sri-lanka-escape": "https://res.cloudinary.com/dkfnpmzpv/image/upload/v1771401761/hero_sections/dcjjvovjfbgidkiydjgw.jpg",
                    "8-day-sri-lankan-wonders": "https://res.cloudinary.com/dkfnpmzpv/image/upload/v1771636100/blogs/vrbgk9djfy59uaf6ol4p.jpg",
                    "12-day-grand-discovery": "https://res.cloudinary.com/dkfnpmzpv/image/upload/v1763959716/hero_sections/ju8x8fciygjilxve45zn.png",
                    "14-day-ultimate-journey": "https://res.cloudinary.com/dkfnpmzpv/image/upload/v1771401761/hero_sections/dcjjvovjfbgidkiydjgw.jpg",
                    "21-day-complete-round-tour": "https://res.cloudinary.com/dkfnpmzpv/image/upload/v1763959716/hero_sections/ju8x8fciygjilxve45zn.png",
                    "downsouth-beach-wildlife": "https://res.cloudinary.com/dkfnpmzpv/image/upload/v1771636100/blogs/vrbgk9djfy59uaf6ol4p.jpg"
                };

                const defaultInclusions = [
                    "Private air-conditioned luxury vehicle",
                    "English-speaking licensed chauffeur guide",
                    "All fuel, highway toll charges, and parking fees",
                    "Airport pick-up and drop-off transfers",
                    "All accommodation on Bed & Breakfast basis",
                    "Complimentary bottled drinking water during tours",
                    "24/7 travel support during the entire journey"
                ];

                const defaultExclusions = [
                    "International flights and Sri Lankan entry visa fees",
                    "Entrance tickets to sightseeing sites & national parks",
                    "Lunch & dinner meals (unless specified)",
                    "Camera & video permit charges at historical sites",
                    "Personal expenses (laundry, telephone calls, drinks)",
                    "Tips and gratuities for driver-guide & hotel staff"
                ];

                for (const staticTour of staticTourPackages) {
                    const durationDays = staticTour.itinerary.length;
                    const durationText = `${durationDays} Days / ${durationDays - 1} Nights`;
                    const imageUrl = tourImages[staticTour.id] || "https://res.cloudinary.com/dkfnpmzpv/image/upload/v1771401761/hero_sections/dcjjvovjfbgidkiydjgw.jpg";

                    const mappedItinerary = staticTour.itinerary.map(item => ({
                        day: Number(item.day),
                        title: String(item.title),
                        description: String(item.description),
                        included: item.included ? String(item.included) : null,
                        highlight: item.highlight ? String(item.highlight) : null
                    }));

                    await tourModel.create({
                        data: {
                            title: staticTour.title,
                            slug: staticTour.slug,
                            route: staticTour.route,
                            price: Number(staticTour.price),
                            duration: durationText,
                            imageUrl: imageUrl,
                            isFeatured: staticTour.id.includes("8-day") || staticTour.id.includes("14-day"),
                            description: staticTour.description,
                            longDescription: staticTour.longDescription,
                            highlights: staticTour.highlights,
                            inclusions: defaultInclusions,
                            exclusions: defaultExclusions,
                            itinerary: mappedItinerary,
                            seoKeywords: staticTour.seoKeywords
                        }
                    });
                }
                tourPackages = await tourModel.findMany();
            }
        } catch (seedError) {
            console.error("Auto-seeding failed, falling back to static in-memory mapping:", seedError);
            tourPackages = getStaticTours();
        }
    } else {
        console.warn("Prisma.tour is undefined (dev server cache). Using static tours fallback.");
        tourPackages = getStaticTours();
    }

    // 4. SCHEMA.ORG DATA (Invisible to users, visible to Google)
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
                suppressHydrationWarning
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* =========================================
                BACKGROUND IMAGE SECTION
            ========================================= */}
            <div className="fixed inset-0 z-0">
                <Image
                    src="/uploads/1748935199061-20250603_1239_Leopard Emerges from Darkness_simple_compose_01jwt9yv7qect8krxy794bcr23.webp"
                    alt="Yala Leopard Emerging from Darkness"
                    fill
                    priority
                    className="object-cover opacity-100 md:opacity-100 scale-105"
                    quality={75}
                />
                {/* Cinematic Gradients */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/5 to-black/90" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />
                {/* Noise Texture */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">
                {/* Header Banner - Snippet Styled Tiny & Mini Pills Layout */}
                <header className="relative z-10 flex flex-col items-center gap-3 text-center mb-16 px-4 animate-in slide-in-from-bottom duration-1000 ease-out">
                    {/* MAIN TITLE PILL */}
                    <div className="inline-block bg-black/80 px-4 py-1.5 rounded-full shadow-2xl">
                        <h1 className="text-[15px] font-black text-white tracking-[0.2em]">
                            Sri Lanka Tour Packages
                        </h1>
                    </div>

                    {/* DESCRIPTION PILL */}
                    <div className="inline-block bg-black/80 px-6 py-3 rounded-2xl max-w-[660px] text-center shadow-2xl">
                        <h2 className="text-[15px] text-white/80 font-medium leading-relaxed italic">
                            "Explore the beautiful Emerald Isle with our premium private safari and cultural expeditions in Sri Lanka."
                        </h2>
                    </div>

                    {/* 3. SMALLEST ACTION BUTTON */}
                    <div className="inline-block">
                        <Link
                            href="/safari-packages"
                            className="group flex items-center gap-2 bg-white text-black px-5 py-2 rounded-full shadow-lg hover:bg-[#00ff00] transition-all active:scale-95"
                        >
                            <span className="text-[10px] font-black tracking-widest">
                                Book Packages
                            </span>
                            <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </Link>
                    </div>

                    {/* Hidden Semantic Text: Helps ranking without changing UI look */}
                    <div className="sr-only">
                        Experience the best travel points in Sri Lanka including Sigiriya Rock Fortress,
                        Temple of the Sacred Tooth Relic in Kandy, Nine Arches Bridge in Ella, and
                        Yala National Park Safaris. We provide premium transportation and licensed private drivers.
                    </div>
                </header>

                {/* TOUR PACKAGES LIST (Alternating Horizontal Cards) */}
                <div className="flex flex-col gap-8 max-w-5xl mx-auto">
                    {tourPackages.map((tour: Tour, index: number) => (
                        <TourPackageCard 
                            key={tour.id} 
                            tour={tour} 
                            horizontal={true}
                            reverse={index % 2 === 0}
                        />
                    ))}
                </div>
            </div>
        </main>
    );
}