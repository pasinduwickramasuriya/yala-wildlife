import { tourPackages } from "@/data/tours";
import Image from "next/image";
import { notFound } from "next/navigation";
import { TourItineraryItem, BookingForm } from "@/components/TourItineraryItem";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function TourDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const tour = tourPackages.find((p) => p.slug === slug);

    if (!tour) return notFound();

    return (
        <main className="relative w-full min-h-screen bg-black selection:bg-[#00ff00]">
            {/* BACKGROUND LAYER - Optimized for mobile view height */}
            <div className="fixed inset-0 z-0 h-screen">
                <Image
                    src="https://res.cloudinary.com/dkfnpmzpv/image/upload/v1763959716/hero_sections/ju8x8fciygjilxve45zn.png"
                    alt={tour.title}
                    fill
                    unoptimized
                    className="object-cover brightness-[0.4] md:brightness-[0.5]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-24 md:pt-32 pb-20">

                {/* HEADER SECTION - Responsive Text Scaling */}
                <header className="mb-12 md:mb-16 space-y-6">
                    <div className="inline-block bg-black/70 px-3 py-1 rounded-full border border-[#00ff00]/20">
                        <span className="text-[10px] md:text-[11px] font-black text-[#00ff00] uppercase tracking-[0.5em]">
                            Tour_Profile_{tour.id}
                        </span>
                    </div>
                    <br />

                    <h1 className="text-3xl sm:text-3xl md:text-3xl lg:text-3xl font-black text-white uppercase tracking-tighter leading-[0.9] md:leading-[0.8] inline-block bg-black/70 px-3 py-1 rounded-full">
                        {tour.title.split(":")[0]} <br />
                        <span className="text-[#00ff00] break-words">
                            {tour.title.split(":")[1] || "Expedition"}
                        </span>
                    </h1>

                    <div className="inline-block bg-black/70 p-4 md:p-5 rounded-xl border border-white/5 backdrop-blur-md max-w-full md:max-w-2xl">
                        <p className="text-[12px] md:text-[12px] lg:text-[12px] text-neutral-300 font-bold uppercase tracking-widest leading-relaxed">
                            {tour.longDescription}
                        </p>
                    </div>
                </header>

                {/* MAIN CONTENT GRID - Stacked on mobile, 3-cols on desktop */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-12">

                    {/* ITINERARY COLUMN */}
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

                    {/* SIDEBAR - Moves to top on mobile for better UX */}
                    <aside className="order-1 lg:order-2 space-y-8">
                        <div className="bg-[#00ff00] p-6 md:p-8 rounded-2xl md:rounded-3xl text-black shadow-[0_0_50px_rgba(0,255,0,0.1)] lg:sticky lg:top-32 transition-all">
                            <h4 className="text-xl md:text-2xl font-black uppercase tracking-tighter mb-4 leading-none">
                                Initialize <br className="hidden md:block" /> Booking
                            </h4>
                            <BookingForm tourTitle={tour.title} />
                        </div>
                    </aside>

                </div>
            </div>
        </main>
    );
}