/* eslint-disable @typescript-eslint/no-explicit-any */
import { Metadata } from "next";
import { Package } from "@prisma/client";
import { notFound } from "next/navigation";
import Image from "next/image";
import prisma from "@/lib/prisma";
import { siteConfig } from "@/lib/seo-config";
import BookingForm from "@/components/BookingForm";
import PackageCard from "@/components/PackageCard";
import { SafariPackageJsonLd } from "@/components/JsonLd";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FAQJsonLd, defaultFAQs } from "@/components/FAQJsonLd";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

// Force dynamic rendering
export const dynamic = "force-dynamic";
export const revalidate = 0;

type Props = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

// Fetch package data server-side
async function getPackage(slug: string): Promise<Package> {
  const pkg = await prisma.package.findUnique({
    where: { slug },
  });

  if (!pkg) {
    notFound();
  }

  return pkg;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const packageData = await getPackage(resolvedParams.slug);

  const title = `Yala National Park | ${packageData.name} - Best Yala Safari Tour Package`;
  const description = `Experience the ultimate ${packageData.name} in Yala National Park. Professional guides, guaranteed wildlife sightings, and comfortable vehicles. Book your adventure today!`;

  return {
    title,
    description,
    keywords: [
      `yala ${packageData.name.toLowerCase()}`,
      "yala safari tour",
      "yala wildlife tour",
      "yala national park safari",
      "sri lanka safari packages",
      "best yala tours",
      "leopard safari yala",
      "elephant safari yala",
      "safari booking yala",
      "yala national park", "yala safari", "sri lanka safari", "yala wildlife safari",
      "yala national park safari", "safari in sri lanka", "visit yala",
      "yala park sri lanka", "yala safari official", "national parks in sri lanka",
      "best safari in sri lanka", "yala jeep safari", "wildlife tours sri lanka",
      "book yala safari online", "yala safari price 2025", "yala safari cost per person",
      "yala jeep rental price", "reserve safari jeep yala", "buy yala national park tickets",
      "yala entrance fee 2025", "private jeep hire yala", "shared safari jeep yala",
      "best price safari yala", "luxury safari packages yala", "budget safari yala",
      "yala safari booking contact number", "yala safari cancellation policy",
      "last minute safari booking yala", "online safari reservation yala",
      "yala leopard safari", "best place to see leopards in sri lanka", "panthera pardus koti",
      "sri lankan leopard sightings", "yala sloth bear safari", "melursus ursinus sightings",
      "asian elephant safari yala", "yala bird watching tours", "kumana bird sanctuary tour",
      "yala crocodile safari", "wild boar yala", "spotted deer yala",
      "yala wildlife photography tour", "wildlife filmmaker fixer yala", "birding tours sri lanka",
      "yala big game safari", "reptiles of yala", "peacock dance yala",
      "colombo to yala safari", "galle to yala day trip", "ella to yala transfer",
      "mirissa to yala safari tour", "hambantota to yala safari", "tangalle to yala",
      "kandy to yala tour", "arugam bay to yala", "mattala airport to yala",
      "tissamaharama safari hotels", "hotels near yala national park", "safari near kataragama",
      "kirinda to yala", "weligama to yala day tour", "ahungalla to yala",
      "southern province things to do", "safari from bentota",
      "palatupana entrance safari", "katagamuwa entrance yala", "galge entrance safari",
      "yala block 1 safari", "yala block 2 tours", "yala block 5 sightings",
      "sithulpawwa road safari", "yala strict natural reserve", "yala buffer zone safari",
      "best gate for yala safari", "less crowded yala safari block",
      "luxury camping yala", "glamping yala national park", "yala eco lodge",
      "camping inside yala national park", "vip safari experience sri lanka",
      "family friendly safari yala", "kids safari sri lanka", "honeymoon safari packages",
      "romantic safari dinner yala", "corporate safari team building",
      "educational wildlife tours", "school trip yala national park",
      "senior citizen friendly safari", "accessible safari sri lanka",
      "best time to visit yala", "yala safari season", "yala drought season sightings",
      "is yala open in september", "yala national park closing dates 2025",
      "morning vs evening safari yala", "full day safari yala itinerary",
      "golden hour safari yala", "sunset safari yala", "early morning game drive",
      "yala weather february", "yala weather august",
      "eco friendly safari yala", "sustainable tourism sri lanka", "ethical safari operator",
      "responsible wildlife watching", "plastic free safari", "support local guides yala",
      "conservation projects yala", "community based tourism yala",
      "yala vs udawalawe", "yala vs wilpattu", "yala vs minneriya",
      "best national park for leopards", "yala vs bundala bird watching",
      "kumana vs yala east", "safari near galle vs yala",
      "how to book a jeep for yala safari", "do i need a guide for yala safari",
      "can you see bears in yala", "how long is a safari in yala",
      "what to wear on a safari in sri lanka", "is yala national park safe",
      "driver accommodation yala", "taxi service to yala national park",
      "breakfast in yala national park"
    ],
    openGraph: {
      title,
      description,
      images: [
        {
          url: packageData.imageUrl,
          width: 1200,
          height: 630,
          alt: `${packageData.name} - Yala Wildlife Safari Tour`,
        },
      ],
      type: "website",
      url: `${siteConfig.url}/safari-packages/${packageData.slug}`,
      siteName: "Yala National Park",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [packageData.imageUrl],
      creator: "@yalawildlife",
    },
    alternates: {
      canonical: `${siteConfig.url}/safari-packages/${packageData.slug}`,
    },
  };
}

export default async function PackageDetailPage(props: Props) {
  const resolvedParams = await props.params;
  const pkg = await getPackage(resolvedParams.slug);

  const pkgAny = pkg as any;

  // Dynamic Highlights: Database array or parsed description points
  const highlightsList: string[] =
    pkgAny.highlights && pkgAny.highlights.length > 0
      ? pkgAny.highlights
      : pkg.description
        .split(".")
        .map((point) => point.trim())
        .filter((point) => point.length > 0);

  // Dynamic Inclusions: Database array or package-informed defaults
  const inclusionsList: string[] =
    pkgAny.inclusions && pkgAny.inclusions.length > 0
      ? pkgAny.inclusions
      : [
        "Private 4x4 Safari Jeep with customized seating",
        "Experienced SLTDA-licensed driver guide",
        "Free pick-up & drop-off in Tissamaharama / Yala area",
        "Complimentary chilled bottled drinking water",
        "All jeep fees, fuel, tolls and taxes included",
      ];

  // Dynamic Exclusions: Database array or package-informed defaults
  const exclusionsList: string[] =
    pkgAny.exclusions && pkgAny.exclusions.length > 0
      ? pkgAny.exclusions
      : [
        `National Park entrance permits (Optional add-on: $${pkg.ticketPrice > 0 ? pkg.ticketPrice : 45}/person)`,
        `Breakfast / Lunch meals (Optional add-on: $${pkg.mealPrice > 0 ? pkg.mealPrice : 10}/person)`,
        "Tips & gratuities for driver-guide & tracker",
        "Transfers outside Tissamaharama / Yala area",
      ];

  const breadcrumbItems = [
    { name: "Home", item: "/" },
    { name: "Safari Packages", item: "/safari-packages" },
    { name: pkg.name, item: `/safari-packages/${pkg.slug}` },
  ];

  // Fetch recommended packages dynamically from database
  let otherPackages: Package[] = [];
  try {
    otherPackages = await prisma.package.findMany({
      where: {
        slug: { not: resolvedParams.slug },
      },
      take: 3,
    });
  } catch (err) {
    console.error("Prisma lookup failed for recommended packages:", err);
  }

  // Structural SEO schema
  const packageProductSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": pkg.name,
    "image": pkg.imageUrl,
    "description": pkg.description,
    "offers": {
      "@type": "Offer",
      "url": `${siteConfig.url}/safari-packages/${pkg.slug}`,
      "price": pkg.price,
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "LocalBusiness",
        "name": "Yala Wildlife Safaris",
        "image": `${siteConfig.url}/favicon-96x96.png`,
        "telephone": "+94778158004",
        "priceRange": "$$"
      }
    }
  };

  return (
    <>
      <SafariPackageJsonLd
        name={pkg.name}
        description={pkg.description}
        price={pkg.price}
        image={pkg.imageUrl}
        slug={pkg.slug}
      />
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <FAQJsonLd faqs={defaultFAQs} />

      <main className="relative w-full min-h-screen bg-black selection:bg-[#00ff00]">
        {/* STRUCTURAL SCHEMA DATA */}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(packageProductSchema) }}
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
            className="object-cover opacity-100 scale-105"
            quality={75}
          />
          {/* Fast High-Contrast Overlay Gradients */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/40 to-black/95" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-transparent to-black/85" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-24 md:pt-32 pb-20">

          {/* BREADCRUMB SCHEMA */}
          <div className="mb-4 opacity-75 hover:opacity-100 transition-opacity">
            <BreadcrumbSchema items={breadcrumbItems} />
          </div>

          {/* SPLIT HERO SECTION: Cover image first on mobile, Left details on desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
            {/* RIGHT COL (First on Mobile): Sticky split-screen cover image (5/12) */}
            <div className="order-1 lg:order-2 lg:col-span-5 lg:sticky lg:top-28">
              <div className="relative w-full h-[300px] sm:h-[380px] lg:h-[480px] rounded-3xl overflow-hidden shadow-2xl group">
                <Image
                  src={pkg.imageUrl}
                  alt={pkg.name}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] brightness-[0.88] group-hover:brightness-[0.98]"
                />
                {/* Seamless gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

                {/* Floating Badges */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2.5 z-10">

                  {pkg.price && (
                    <div className="bg-black/90 text-white px-3.5 py-1.5 rounded-full shadow-lg font-black text-[10px] md:text-[11px] tracking-wide">
                       ${pkg.price.toFixed(0)} USD
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* LEFT COL (Second on Mobile): Overview & Text Details (7/12) */}
            <div className="order-2 lg:order-1 lg:col-span-7 space-y-4">
              {/* H1 TITLE */}
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-tight leading-snug inline-block bg-black/90 px-4 py-2.5 rounded-xl shadow-xl">
                {pkg.name.split(":")[0]}
                {pkg.name.split(":")[1] && (
                  <>
                    <br />
                    <span className="text-[#00ff00] font-semibold text-sm md:text-base tracking-wide">
                      {pkg.name.split(":")[1]}
                    </span>
                  </>
                )}
              </h1>

              {/* MINI DESCRIPTION CARD - Clear, Cute & Smaller */}
              <div className="bg-black/90 px-4 py-3 rounded-xl shadow-xl w-full">
                <h2 className="sr-only">Safari Package Overview for {pkg.name}</h2>
                <p className="text-xs sm:text-[13px] text-neutral-300 font-normal leading-relaxed">
                  {pkg.description}
                </p>
              </div>

              {/* DYNAMIC INCLUSIONS & EXCLUSIONS VIEWS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
                {/* Inclusions */}
                <div className="bg-black/90 p-5 rounded-2xl shadow-xl">
                  <h3 className="text-xs md:text-sm font-bold text-[#00ff00] tracking-wider mb-3 flex items-center gap-2">
                    <span className="flex items-center justify-center w-4 h-4 rounded-full bg-[#00ff00]/15 text-[#00ff00] text-[10px] font-black">✓</span>
                    Inclusions
                  </h3>
                  <ul className="space-y-2 text-[12px] md:text-[13px] font-medium text-neutral-200 tracking-wide">
                    {inclusionsList.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 leading-relaxed">
                        <span className="text-[#00ff00] font-bold select-none text-xs">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Exclusions */}
                <div className="bg-black/90 p-5 rounded-2xl shadow-xl">
                  <h3 className="text-xs md:text-sm font-bold text-rose-400 tracking-wider mb-3 flex items-center gap-2">
                    <span className="flex items-center justify-center w-4 h-4 rounded-full bg-rose-500/15 text-rose-400 text-[10px] font-black">✗</span>
                    Exclusions
                  </h3>
                  <ul className="space-y-2 text-[12px] md:text-[13px] font-medium text-neutral-300 tracking-wide">
                    {exclusionsList.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 leading-relaxed">
                        <span className="text-rose-400 font-bold select-none text-xs">✗</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* DYNAMIC ITINERARY / HIGHLIGHTS & BOOKING GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-12 mt-10">
            <div className="order-2 lg:order-1 lg:col-span-2 space-y-5 md:space-y-6">
              {/* OPERATIONAL ITINERARY ISLAND */}
              <div className="inline-block bg-black/90 px-4 py-1.5 rounded-full shadow-xl mb-2">
                <h2 className="text-[12px] md:text-[13px] font-extrabold text-white tracking-[0.2em]">
                  Expedition Highlights & Features
                </h2>
              </div>

              <div className="space-y-3">
                {highlightsList.map((point: string, idx: number) => (
                  <div key={idx} className="flex gap-3.5 items-start bg-black/90 p-4 md:p-5 rounded-2xl shadow-xl transition-colors duration-200 hover:bg-zinc-900">
                    <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-[11px] font-black text-black bg-[#00ff00] shadow-[0_0_12px_rgba(0,255,0,0.3)]">
                      {idx + 1}
                    </div>
                    <div>
                      <h3 className="text-xs md:text-sm font-bold text-white mb-0.5">Highlight {idx + 1}</h3>
                      <p className="text-[12px] md:text-[13px] text-neutral-300 font-normal leading-relaxed">
                        {point}{point.endsWith('.') ? '' : '.'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <aside className="order-1 lg:order-2 space-y-8">
              {/* BOOKING INTERFACE */}
              <div className="bg-[#00ff00] p-6 md:p-8 rounded-2xl md:rounded-3xl text-black shadow-[0_0_50px_rgba(0,255,0,0.15)] lg:sticky lg:top-32 transition-all">
                <h2 className="text-base md:text-lg font-extrabold tracking-tight mb-1.5 leading-snug">
                  Initialize Booking
                </h2>
                <p className="text-[11px] font-bold text-black/80 mb-4">
                  Select your date, guest count, permits and meal add-ons.
                </p>
                <BookingForm tourPackageSlug={pkg.slug} />
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}