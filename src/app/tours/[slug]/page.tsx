import prisma from "@/lib/prisma";
import { tourPackages as staticTourPackages } from "@/data/tours";
import Image from "next/image";
import { notFound } from "next/navigation";
import { TourItineraryItem, BookingForm } from "@/components/TourItineraryItem";
import { TourPackageCard, Tour } from "@/components/TourPackageCard";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

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
            "validFrom": "2024-01-01",
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
  <>
    {/* JSON-LD Structured Metadata */}
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

    <main
      className="relative w-full min-h-screen bg-white text-[#1f1f1f] selection:bg-[#00ff00] selection:text-black antialiased overflow-x-hidden"
      style={{
        fontFamily:
          '"Google Sans", "Open Sans", Roboto, -apple-system, BlinkMacSystemFont, Arial, sans-serif',
      }}
      role="main"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-20">

        {/* =========================================================================
            1. HERO SHOWCASE
        ========================================================================= */}
        <section className="w-full flex items-stretch gap-3 sm:gap-6 mb-12 sm:mb-16">
          <div className="relative w-full max-w-5xl mx-auto h-[260px] sm:h-[380px] md:h-[460px] lg:h-[530px] rounded-[2rem] sm:rounded-[3rem] md:rounded-[3.5rem] overflow-hidden bg-[#f8f9fa]">
            <Image
              src={sideImage || "/placeholder-image.jpg"}
              alt={tour.title}
              fill
              priority
              fetchPriority="high"
              sizes="(max-width: 768px) 100vw, 1024px"
              quality={75}
              unoptimized
              className="object-cover object-center"
            />

            {/* Top Duration Floating Badge */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-white text-[16px] sm:text-[18px] font-semibold text-[#1f1f1f]">
                🕒 {durationText}
              </span>
            </div>

            {/* Bottom Price Floating Badge */}
            {tour.price && (
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-10">
                <span className="inline-flex items-center px-5 py-2.5 rounded-full bg-white text-[18px] font-semibold text-[#1f1f1f]">
                  From ${tour.price} USD
                </span>
              </div>
            )}
          </div>
        </section>

        {/* =========================================================================
            2. EDITORIAL TITLE & OVERVIEW (3-PARAGRAPH DYNAMIC SPLIT)
        ========================================================================= */}
        <section className="text-center max-w-4xl mx-auto mb-14 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-5xl font-bold text-[#1f1f1f] tracking-tight leading-[1.15] mb-4">
            {tour.title.split(":")[0]}
            {tour.title.split(":")[1] && (
              <span className="block text-[#5f6368] text-2xl sm:text-3xl lg:text-4xl font-semibold mt-2">
                {tour.title.split(":")[1]}
              </span>
            )}
          </h1>

          <div className="space-y-6 text-[18px] sm:text-[20px] text-[#3c4043] font-semibold leading-[1.8] max-w-6xl mx-auto">
            {(() => {
              const fullDescription = tour.longDescription || tour.description || "";
              const rawParagraphs = fullDescription
                .split(/\n\s*\n/)
                .map((p: string) => p.trim())
                .filter(Boolean);

              if (rawParagraphs.length >= 3) {
                return rawParagraphs.map((para: string, idx: number) => (
                  <p key={idx} className="text-center text-[18px]">
                    {para}
                  </p>
                ));
              }

              const sentences =
                fullDescription
                  .match(/[^.!?]+[.!?]+/g)
                  ?.map((s: string) => s.trim()) || [fullDescription];

              if (sentences.length >= 3) {
                const partSize = Math.ceil(sentences.length / 3);
                return [
                  sentences.slice(0, partSize).join(" "),
                  sentences.slice(partSize, partSize * 2).join(" "),
                  sentences.slice(partSize * 2).join(" "),
                ]
                  .filter(Boolean)
                  .map((para: string, idx: number) => (
                    <p key={idx} className="text-center">
                      {para}
                    </p>
                  ));
              }

              return <p className="text-center">{fullDescription}</p>;
            })()}
          </div>
        </section>

        {/* =========================================================================
            3. INCLUSIONS & EXCLUSIONS GRIDS
        ========================================================================= */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 w-full mb-14 sm:mb-16">
          {/* Inclusions */}
          <div className="bg-[#fff] p-6 sm:p-8 rounded-[2.5rem]">
            <h3 className="text-[18px] font-bold text-[#137333] tracking-wider mb-4 flex items-center gap-2.5">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#e6f4ea] text-[#137333] text-[14px] font-black shrink-0">
                ✓
              </span>
              <span>Inclusions</span>
            </h3>
            <ul className="space-y-3.5 text-[18px] font-semibold text-[#3c4043]">
              {tour.inclusions?.map((item: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                  <span className="text-[#137333] font-bold select-none text-[18px] shrink-0">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Exclusions */}
          <div className="bg-[#fff] p-6 sm:p-8 rounded-[2.5rem]">
            <h3 className="text-[18px] font-bold text-[#d93025] tracking-wider mb-4 flex items-center gap-2.5">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#fce8e6] text-[#d93025] text-[14px] font-black shrink-0">
                ✕
              </span>
              <span>Exclusions</span>
            </h3>
            <ul className="space-y-3.5 text-[18px] font-semibold text-[#5f6368]">
              {tour.exclusions?.map((item: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                  <span className="text-[#d93025] font-bold select-none text-[18px] shrink-0">✗</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* =========================================================================
            4. ITINERARY HIGHLIGHTS & BOOKING GRID
        ========================================================================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">

          {/* ITINERARY LIST (7-COL) */}
          <div className="order-2 lg:order-1 lg:col-span-7 space-y-5 md:space-y-6">
            <div className="inline-block bg-white py-1 mb-2">
              <h2 className="text-[18px] font-bold text-[#1f1f1f] tracking-wide">
                Operational Itinerary: {durationText}
              </h2>
            </div>

            <div className="space-y-3.5">
              {tour.itinerary?.map((item: any, idx: number) => (
                <div
                  key={item.day || idx}
                  className="flex gap-4 items-start bg-[#fff] p-5 md:p-6 rounded-[2rem]"
                >
                  <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-[18px] font-bold text-black bg-[#00ff00]">
                    {item.day || idx + 1}
                  </div>
                  <div className="flex flex-col text-left">
                    <h3 className="text-[18px] font-bold text-[#1f1f1f] mb-1">
                      {item.title || `Day ${item.day || idx + 1}`}
                    </h3>
                    <p className="text-[18px] text-[#3c4043] font-semibold leading-relaxed break-words">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BOOKING INTERFACE ASIDE (5-COL) */}
          <aside
            id="booking"
            className="order-1 lg:order-2 lg:col-span-5 w-full scroll-mt-28 sm:scroll-mt-32"
          >
            <div
              id="booking-form"
              className="bg-[#fff] p-6 sm:p-8 rounded-[2.25rem] text-[#1f1f1f] lg:sticky lg:top-28"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white text-[18px] font-semibold text-[#1f1f1f] mb-3">
                Direct Reservation
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1f1f1f] tracking-tight mb-2">
                Initialize Booking
              </h2>
              <p className="text-[18px] font-semibold text-[#5f6368] mb-6 leading-normal">
                Reserve your dates, chauffeur logistics, and custom preferences.
              </p>

              <div className="w-full">
                <BookingForm tourTitle={tour.title} />
              </div>
            </div>
          </aside>
        </section>

        {/* =========================================================================
            5. RECOMMENDED EXPEDITIONS
        ========================================================================= */}
        {otherTours?.length > 0 && (
          <section className="relative z-10 max-w-6xl mx-auto pt-16 sm:pt-20">
            <div className="flex flex-col items-center text-center mb-8 sm:mb-10 space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1f1f1f] tracking-tight">
                Recommended Expedition Packages
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherTours.map((otherTour: Tour) => (
                <TourPackageCard key={otherTour.id} tour={otherTour} />
              ))}
            </div>
          </section>
        )}

      </div>
    </main>
  </>
);
}