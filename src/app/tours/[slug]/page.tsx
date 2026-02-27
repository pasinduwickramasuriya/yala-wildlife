import { tourPackages } from "@/data/tours";
import Image from "next/image";
import { notFound } from "next/navigation";
import { TourItineraryItem, BookingForm } from "@/components/TourItineraryItem";
import { Metadata } from "next";

// --- DYNAMIC SEO METADATA ---
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const tour = tourPackages.find((p) => p.slug === slug);

    if (!tour) return { title: "Tour Not Found" };

    return {
        title: `${tour.title} | Best Sri Lanka Tour 2026`,
        description: tour.description,
        keywords: tour.seoKeywords,
        openGraph: {
            title: tour.title,
            description: tour.description,
            images: ["https://res.cloudinary.com/dkfnpmzpv/image/upload/v1771636100/blogs/vrbgk9djfy59uaf6ol4p.jpg"],
        },
    };
}

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function TourDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const tour = tourPackages.find((p) => p.slug === slug);

    if (!tour) return notFound();

    // --- STRUCTURAL SEO: JSON-LD ---
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Trip",
        "name": tour.title,
        "description": tour.description,
        "itinerary": tour.itinerary.map(item => ({
            "@type": "City",
            "name": item.title,
            "description": item.description
        })),
        "offers": {
            "@type": "Offer",
            "price": tour.price,
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
        }
    };

    return (
        <main className="relative w-full min-h-screen bg-black selection:bg-[#00ff00]">
            {/* ADD INVISIBLE SCHEMA DATA FOR GOOGLE */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* BACKGROUND LAYER */}
            <div className="fixed inset-0 z-0 h-screen">
                <Image
                    src="https://res.cloudinary.com/dkfnpmzpv/image/upload/v1763959716/hero_sections/ju8x8fciygjilxve45zn.png"
                    alt={`${tour.title} - Sri Lanka Adventure`}
                    fill
                    unoptimized
                    className="object-cover brightness-[0.9] md:brightness-[0.9]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-24 md:pt-32 pb-20">

                {/* HEADER SECTION */}
                <header className="mb-12 md:mb-16 space-y-6">
                    <div className="inline-block bg-black/70 px-3 py-1 rounded-full border border-[#00ff00]/20">
                        <span className="text-[10px] md:text-[11px] font-black text-[#00ff00] uppercase tracking-[0.5em]">
                            Tour_Profile_{tour.id}
                        </span>
                    </div>
                    <br />

                    {/* H1 IS THE MOST IMPORTANT SEO ELEMENT */}
                    <h1 className="text-3xl sm:text-3xl md:text-3xl lg:text-3xl font-black text-white uppercase tracking-tighter leading-[0.9] md:leading-[0.8] inline-block bg-black/70 px-4 py-2 rounded-2xl border border-white/5">
                        {tour.title.split(":")[0]} <br />
                        <span className="text-[#00ff00] break-words">
                            {tour.title.split(":")[1] || "Expedition"}
                        </span>
                    </h1>

                    <div className="inline-block bg-black/70 p-4 md:p-5 rounded-xl border border-white/5 backdrop-blur-md max-w-full md:max-w-2xl">
                        {/* Hidden SEO Text to help ranking while keeping UI small */}
                        <h2 className="sr-only">Tour Overview and Itinerary for {tour.title}</h2>
                        <p className="text-[12px] md:text-[12px] lg:text-[12px] text-neutral-300 font-bold uppercase tracking-widest leading-relaxed">
                            {tour.longDescription}
                        </p>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-12">
                    <div className="order-2 lg:order-1 lg:col-span-2 space-y-6 md:space-y-8">
                        <div className="inline-block bg-black/70 px-4 py-2 rounded-lg mb-4 border border-white/5">
                            <h2 className="text-[10px] md:text-sm font-black text-white uppercase tracking-[0.3em]">
                                Operational_Itinerary
                            </h2>
                        </div>

                        <div className="space-y-2">
                            {tour.itinerary.map((item) => (
                                <TourItineraryItem key={item.day} {...item} />
                            ))}
                        </div>
                    </div>

                    <aside className="order-1 lg:order-2 space-y-8">
                        <div className="bg-[#00ff00] p-6 md:p-8 rounded-2xl md:rounded-3xl text-black shadow-[0_0_50px_rgba(0,255,0,0.1)] lg:sticky lg:top-32 transition-all">
                            <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter mb-4 leading-none">
                                Initialize <br className="hidden md:block" /> Booking
                            </h2>
                            <BookingForm tourTitle={tour.title} />
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
}