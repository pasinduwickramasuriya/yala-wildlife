/* eslint-disable @typescript-eslint/no-explicit-any */
import { Metadata } from "next";
import Image from "next/image";
import prisma from "@/lib/prisma";
import { tourPackages as staticTourPackages } from "@/data/tours";
import { TourPackageCard, Tour } from "@/components/TourPackageCard";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const revalidate = 3600; // Enable ISR cache for 1 hour for instant TTFB

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
    <main
      className="relative w-full min-h-screen bg-white text-[#1f1f1f] selection:bg-[#00ff00] selection:text-black antialiased pt-20 sm:pt-28 pb-20"
      style={{
        fontFamily:
          '"Google Sans", "Open Sans", Roboto, -apple-system, BlinkMacSystemFont, Arial, sans-serif',
      }}
    >
      {/* Structural Schema Data */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Editorial Header */}
        <header className="flex flex-col items-center text-center mb-12 sm:mb-16 space-y-4 max-w-3xl mx-auto">

          {/* H1 Title */}
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1f1f1f] leading-[1.15]">
            Sri Lanka Tour Packages <br />
            {/* <span className="text-[#1f1f1f]">Island Expeditions</span> */}
          </h1>

          {/* Editorial Subtitle */}
          <p className="text-[18px] text-[#3c4043] font-semibold leading-[1.8]">
            Explore the emerald island with private safari adventures, ancient UNESCO heritage
            circuits, and scenic highlands tailored for comfort and unhurried discovery.
          </p>

          {/* Action Button */}
          <div className="pt-2">
            <Link
              href="/safari-packages"
              className="inline-flex items-center gap-2 bg-[#00ff00] hover:brightness-105 text-black px-6 py-3 rounded-full text-[15px] font-bold transition-all duration-150 active:scale-95"
            >
              <span>Explore Safari Packages</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </Link>
          </div>

          {/* Hidden Semantic SEO Copy */}
          <div className="sr-only">
            Experience the best travel points in Sri Lanka including Sigiriya Rock Fortress,
            Temple of the Sacred Tooth Relic in Kandy, Nine Arches Bridge in Ella, and Yala
            National Park Safaris. We provide premium transportation and licensed private drivers.
          </div>
        </header>

        {/* Tour Packages List */}
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