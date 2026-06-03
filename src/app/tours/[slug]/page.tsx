import prisma from "@/lib/prisma";
import { tourPackages as staticTourPackages } from "@/data/tours";
import Image from "next/image";
import { notFound } from "next/navigation";
import { TourItineraryItem, BookingForm } from "@/components/TourItineraryItem";
import { TourPackageCard, Tour } from "@/components/TourPackageCard";
import { Metadata } from "next";

// --- DYNAMIC SEO METADATA ---
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;

    // Fetch from database safely (dev caching protection)
    let tour = null;
    const tourModel = (prisma as any).tour;
    if (tourModel) {
        try {
            tour = await tourModel.findUnique({ where: { slug } });
        } catch (err) {
            console.error("Prisma lookup failed for slug, using static fallback:", err);
        }
    }

    // Fallback to static
    if (!tour) {
        tour = staticTourPackages.find((p) => p.slug === slug) as any;
    }

    if (!tour) return { title: "Tour Not Found" };

    const cleanRoute = tour.route ? ` | Route: ${tour.route}` : "";
    const seoTitle = `${tour.title}${cleanRoute} | Sri Lanka Tour`;
    const seoDesc = tour.description.length > 155 
        ? tour.description.substring(0, 152) + "..." 
        : `${tour.description} Includes private SLTDA-licensed driver guide, A/C vehicle & custom itinerary.`;

    return {
        title: seoTitle,
        description: seoDesc,
        keywords: tour.seoKeywords || "Sri Lanka travel, private driver Sri Lanka, Yala safari, custom itineraries Sri Lanka",
        alternates: {
            canonical: `https://www.yalawildlife.com/tours/${slug}`,
        },
        openGraph: {
            title: seoTitle,
            description: seoDesc,
            url: `https://www.yalawildlife.com/tours/${slug}`,
            images: [tour.imageUrl || "https://res.cloudinary.com/dkfnpmzpv/image/upload/v1771636100/blogs/vrbgk9djfy59uaf6ol4p.jpg"],
            type: "website",
        },
    };
}

const getOptimizedImageUrl = (url: string, width: number = 800) => {
    if (url && url.includes("res.cloudinary.com") && url.includes("/upload/")) {
        return url.replace("/upload/", `/upload/f_auto,q_auto,w_${width}/`);
    }
    return url;
};

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function TourDetailPage({ params }: PageProps) {
    const { slug } = await params;

    // Fetch from database safely (dev caching protection)
    let tour = null;
    const tourModel = (prisma as any).tour;
    if (tourModel) {
        try {
            tour = await tourModel.findUnique({ where: { slug } });
        } catch (err) {
            console.error("Prisma lookup failed for slug, using static fallback:", err);
        }
    }

    // Fallback to static
    if (!tour) {
        const staticTour = staticTourPackages.find((p) => p.slug === slug);
        if (staticTour) {
            const durationDays = staticTour.itinerary.length;
            const mappedItinerary = staticTour.itinerary.map(item => ({
                day: Number(item.day),
                title: String(item.title),
                description: String(item.description),
                included: item.included ? String(item.included) : null,
                highlight: item.highlight ? String(item.highlight) : null
            }));

            tour = {
                id: staticTour.id,
                title: staticTour.title,
                slug: staticTour.slug,
                route: staticTour.route,
                price: staticTour.price,
                duration: `${durationDays} Days / ${durationDays - 1} Nights`,
                imageUrl: "https://res.cloudinary.com/dkfnpmzpv/image/upload/v1763959716/hero_sections/ju8x8fciygjilxve45zn.png",
                isFeatured: staticTour.id.includes("8-day") || staticTour.id.includes("14-day"),
                description: staticTour.description,
                longDescription: staticTour.longDescription,
                highlights: staticTour.highlights,
                inclusions: [
                    "Private air-conditioned luxury vehicle",
                    "English-speaking licensed chauffeur guide",
                    "All fuel, highway toll charges, and parking fees",
                    "Airport pick-up and drop-off transfers",
                    "All accommodation on Bed & Breakfast basis",
                    "Complimentary bottled drinking water during tours",
                    "24/7 travel support during the entire journey"
                ],
                exclusions: [
                    "International flights and Sri Lankan entry visa fees",
                    "Entrance tickets to sightseeing sites & national parks",
                    "Lunch & dinner meals (unless specified)",
                    "Camera & video permit charges at historical sites",
                    "Personal expenses (laundry, telephone calls, drinks)",
                    "Tips and gratuities for driver-guide & hotel staff"
                ],
                itinerary: mappedItinerary,
                seoKeywords: staticTour.seoKeywords
            } as any;
        }
    }

    if (!tour) return notFound();

    const durationText = tour.duration || `${tour.itinerary.length} Days`;
    const rawImage = tour.imageUrl || "https://res.cloudinary.com/dkfnpmzpv/image/upload/v1763959716/hero_sections/ju8x8fciygjilxve45zn.png";
    const coverImage = getOptimizedImageUrl(rawImage, 1200);
    const sideImage = getOptimizedImageUrl(rawImage, 800);

    // Fetch dynamic recommended tours
    let otherTours: any[] = [];
    if (tourModel) {
        try {
            otherTours = await tourModel.findMany({
                where: {
                    slug: { not: slug }
                },
                take: 3
            });
        } catch (err) {
            console.error("Prisma lookup failed for recommended tours:", err);
        }
    }

    if (otherTours.length === 0) {
        otherTours = staticTourPackages
            .filter((p) => p.slug !== slug)
            .slice(0, 3)
            .map(st => {
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
    }

    // --- STRUCTURAL SEO: JSON-LD ---
    const tourProductSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": tour.title,
        "image": coverImage,
        "description": tour.longDescription || tour.description,
        "offers": {
            "@type": "Offer",
            "url": `https://www.yalawildlife.com/tours/${slug}`,
            "price": tour.price,
            "priceCurrency": "USD",
            "priceValidUntil": "2027-12-31",
            "availability": "https://schema.org/InStock",
            "seller": {
                "@type": "LocalBusiness",
                "name": "SmartWay Tour Specialists",
                "image": "https://www.yalawildlife.com/favicon-96x96.png",
                "telephone": "+94778158004",
                "priceRange": "$$"
            }
        }
    };

    const tourTripSchema = {
        "@context": "https://schema.org",
        "@type": "TouristTrip",
        "name": tour.title,
        "description": tour.longDescription || tour.description,
        "itinerary": tour.itinerary.map((item: any) => ({
            "@type": "TouristAttraction",
            "name": `Day ${item.day}: ${item.title}`,
            "description": item.description
        }))
    };

    return (
        <main className="relative w-full min-h-screen bg-black selection:bg-[#00ff00]">
            {/* ADD INVISIBLE SCHEMA DATA FOR GOOGLE */}
            <script
                type="application/ld+json"
                suppressHydrationWarning
                dangerouslySetInnerHTML={{ __html: JSON.stringify(tourProductSchema) }}
            />
            <script
                type="application/ld+json"
                suppressHydrationWarning
                dangerouslySetInnerHTML={{ __html: JSON.stringify(tourTripSchema) }}
            />

            {/* =========================================
                BACKGROUND IMAGE SECTION
            ========================================= */}
            <div className="fixed inset-0 z-0 h-screen">
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

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-24 md:pt-32 pb-20">

                {/* SPLIT HERO SECTION: Left details, Right cover image */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
                    {/* LEFT COL: Overview & Text Details (7/12) */}
                    <div className="lg:col-span-7 space-y-6">
                        {/* TINY TITLE ISLAND */}
                        <div className="inline-block bg-black/80 px-4 py-1.5 rounded-full shadow-2xl transform-gpu">
                            <span className="text-[13px] md:text-[14px] font-black text-white tracking-[0.2em]">
                                Tour Profile: {tour.duration ? tour.duration.replace(/\s+/g, " ") : tour.id}
                            </span>
                        </div>
                        <br />

                        {/* H1 IS THE MOST IMPORTANT SEO ELEMENT */}
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight inline-block bg-black/80 px-6 py-4 rounded-2xl shadow-2xl transform-gpu">
                            {tour.title.split(":")[0]}
                            {tour.title.split(":")[1] && (
                                <>
                                    <br />
                                    <span className="text-[#00ff00] font-bold text-xl md:text-2xl">
                                        {tour.title.split(":")[1]}
                                    </span>
                                </>
                            )}
                        </h1>

                        {/* MINI DESCRIPTION PILL */}
                        <div className="inline-block bg-black/80 px-6 py-4 rounded-2xl shadow-2xl transform-gpu w-full">
                            {/* Hidden SEO Text to help ranking while keeping UI small */}
                            <h2 className="sr-only">Tour Overview and Itinerary for {tour.title}</h2>
                            <p className="text-[14px] md:text-[15px] text-white/80 font-medium leading-relaxed italic">
                                "{tour.longDescription || tour.description}"
                            </p>
                        </div>

                        {/* PREMIUM INCLUSIONS & EXCLUSIONS VIEWS */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                            {/* Inclusions */}
                            <div className="bg-black/80 p-6 rounded-2xl shadow-2xl">
                                <h3 className="text-sm font-bold text-[#00ff00] tracking-wider mb-4 flex items-center gap-2">
                                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#00ff00]/10 text-[#00ff00] text-[10px]">✓</span>
                                    Inclusions
                                </h3>
                                <ul className="space-y-2 text-[12px] md:text-[13px] font-medium text-neutral-300 tracking-wide">
                                    {tour.inclusions.map((item: string, idx: number) => (
                                        <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                                            <span className="text-[#00ff00] select-none">✓</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Exclusions */}
                            <div className="bg-black/80 p-6 rounded-2xl shadow-2xl">
                                <h3 className="text-sm font-bold text-rose-500 tracking-wider mb-4 flex items-center gap-2">
                                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-rose-500/10 text-rose-500 text-[10px]">✗</span>
                                    Exclusions
                                </h3>
                                <ul className="space-y-2 text-[12px] md:text-[13px] font-medium text-neutral-400 tracking-wide">
                                    {tour.exclusions.map((item: string, idx: number) => (
                                        <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                                            <span className="text-rose-500 select-none">✗</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COL: Sticky split-screen cover image (5/12) */}
                    <div className="lg:col-span-5 lg:sticky lg:top-28">
                        <div className="relative w-full h-[320px] sm:h-[420px] lg:h-[520px] rounded-3xl overflow-hidden shadow-2xl group transform-gpu">
                            <Image
                                src={sideImage}
                                alt={tour.title}
                                fill
                                priority
                                className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03] brightness-[0.85] group-hover:brightness-[0.95]"
                                unoptimized
                            />
                            {/* Seamless gradients */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

                            {/* Floating Badges */}
                            <div className="absolute top-4 left-4 flex flex-wrap gap-2.5 z-10">
                                <div className="bg-black/80 px-3.5 py-1.5 rounded-full shadow-lg">
                                    <span className="text-[10px] md:text-[11px] font-extrabold tracking-wider text-[#00ff00]">
                                        {durationText}
                                    </span>
                                </div>
                                {tour.price && (
                                    <div className="bg-transparent text-white px-4 py-1.5 rounded-full shadow-lg font-black text-[10px] md:text-[11px] tracking-wide">
                                        Starting from ${tour.price} USD
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ITINERARY & BOOKING GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-12 mt-12">
                    <div className="order-2 lg:order-1 lg:col-span-2 space-y-6 md:space-y-8">
                        {/* OPERATIONAL ITINERARY ISLAND */}
                        <div className="inline-block bg-black/80 px-4 py-1.5 rounded-full shadow-2xl transform-gpu mb-4">
                            <h2 className="text-[13px] md:text-[14px] font-black text-white tracking-[0.2em]">
                                Operational Itinerary: {durationText}
                            </h2>
                        </div>

                        <div className="space-y-2">
                            {tour.itinerary.map((item: any) => (
                                <TourItineraryItem
                                    key={item.day}
                                    day={item.day}
                                    title={item.title}
                                    description={item.description}
                                    included={item.included ?? undefined}
                                    highlight={item.highlight ?? undefined}
                                />
                            ))}
                        </div>
                    </div>

                    <aside className="order-1 lg:order-2 space-y-8">
                        {/* BOOKING INTERFACE */}
                        <div className="bg-[#00ff00] p-6 md:p-8 rounded-2xl md:rounded-3xl text-black shadow-[0_0_50px_rgba(0,255,0,0.1)] lg:sticky lg:top-32 transition-all">
                            <h2 className="text-lg md:text-xl font-bold tracking-tight mb-4 leading-snug">
                                Initialize Booking
                            </h2>
                            <BookingForm tourTitle={tour.title} />
                        </div>
                    </aside>
                </div>
            </div>

            {/* RECOMMENDED PACKAGES SECTION */}
            {otherTours.length > 0 && (
                <>
                    <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pb-24 pt-10">
                        <div className="flex flex-col items-center gap-3 text-center mb-12 animate-in fade-in duration-1000">
                            {/* OTHER PACKAGES TITLE ISLAND */}
                            <div className="inline-block bg-black/80 px-4 py-1.5 rounded-full shadow-2xl">
                                <span className="text-[12px] font-black text-white tracking-[0.2em]">
                                    Explore More
                                </span>
                            </div>
                            <div className="inline-block bg-black/80 px-6 py-1 rounded-2xl shadow-2xl">
                                <h2 className="text-xl md:text-xl font-bold text-white tracking-tight">
                                    Recommended Expedition Packages
                                </h2>
                            </div>
                            {/* <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                                Recommended Expedition Packages
                            </h2> */}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {otherTours.map((otherTour: Tour) => (
                                <TourPackageCard key={otherTour.id} tour={otherTour} />
                            ))}
                        </div>
                    </section>
                </>
            )}
        </main>
    );
}