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
import { ArrowLeft } from "lucide-react";

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

      {/* STRUCTURAL SCHEMA DATA */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(packageProductSchema) }}
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
              1. DUAL HERO SHOWCASE (WIDE RECTANGLE + VERTICAL ARCH CAPSULE)
          ========================================================================= */}
          <section className="w-full flex items-stretch gap-3 sm:gap-6 mb-12 sm:mb-16">

            {/* WIDE ROUNDED RECTANGLE (LEFT)[cite: 2] */}
            <div className="relative w-full max-w-5xl mx-auto h-[260px] sm:h-[380px] md:h-[460px] lg:h-[530px] rounded-[2rem] sm:rounded-[3rem] md:rounded-[3.5rem] overflow-hidden bg-[#f8f9fa]">
              <Image
                src={pkg.imageUrl || "/placeholder-image.jpg"}
                alt={pkg.name}
                fill
                priority
                fetchPriority="high"
                sizes="(max-width: 768px) 70vw, 800px"
                quality={75}
                className="object-cover object-center"
              />

              {/* Bottom Price Floating Badge */}
              {pkg.price && (
                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-10">
                  <span className="inline-flex items-center px-5 py-2.5 rounded-full bg-white text-[18px] font-medium text-[#1f1f1f]">
                    ${pkg.price.toFixed(0)} USD
                  </span>
                </div>
              )}
            </div>
          </section>

          {/* =========================================================================
              2. EDITORIAL TITLE & OVERVIEW
          ========================================================================= */}
          <section className="text-center max-w-4xl mx-auto mb-14 sm:mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-5xl font-bold text-[#1f1f1f] tracking-tight leading-[1.15] mb-4">
              {pkg.name.split(":")[0]}
              {pkg.name.split(":")[1] && (
                <span className="block text-[#5f6368] text-2xl sm:text-3xl lg:text-4xl font-medium mt-2">
                  {pkg.name.split(":")[1]}
                </span>
              )}
            </h1>

            {/* <p className="text-[18px] sm:text-[20px] text-[#3c4043] font-semibold leading-[1.8] max-w-6xl mx-auto">
              {pkg.description}
            </p> */}
            <div className="space-y-6 text-[18px] sm:text-[18px] text-[#5f6368] font-medium leading-[1.8] max-w-6xl mx-auto">
              {(() => {
                const rawParagraphs = (pkg.description || "")
                  .split(/\n\s*\n/)
                  .map((p) => p.trim())
                  .filter(Boolean);

                if (rawParagraphs.length >= 3) {
                  return rawParagraphs.map((para, idx) => (
                    <p key={idx} className="text-center text-[18px]">
                      {para}
                    </p>
                  ));
                }

                const sentences =
                  (pkg.description || "")
                    .match(/[^.!?]+[.!?]+/g)
                    ?.map((s) => s.trim()) || [pkg.description || ""];

                if (sentences.length >= 3) {
                  const partSize = Math.ceil(sentences.length / 3);
                  return [
                    sentences.slice(0, partSize).join(" "),
                    sentences.slice(partSize, partSize * 2).join(" "),
                    sentences.slice(partSize * 2).join(" "),
                  ]
                    .filter(Boolean)
                    .map((para, idx) => (
                      <p key={idx} className="text-center">
                        {para}
                      </p>
                    ));
                }

                return (
                  <p className="text-center">
                    {pkg.description}
                  </p>
                );
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
              <ul className="space-y-3.5 text-[18px] font-medium text-[#3c4043]">
                {inclusionsList.map((item: string, idx: number) => (
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
              <ul className="space-y-3.5 text-[18px] font-medium text-[#5f6368]">
                {exclusionsList.map((item: string, idx: number) => (
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
                  Expedition Highlights & Features
                </h2>
              </div>

              <div className="space-y-3.5">
                {highlightsList.map((point: string, idx: number) => (
                  <div
                    key={idx}
                    className="flex gap-4 items-start bg-[#fff] p-5 md:p-6 rounded-[2rem]"
                  >
                    <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-[18px] font-bold text-black bg-[#00ff00]">
                      {idx + 1}
                    </div>
                    <div className="flex flex-col text-left">
                      <h3 className="text-[18px] font-bold text-[#1f1f1f] mb-1">
                        Highlight {idx + 1}
                      </h3>
                      <p className="text-[18px] text-[#3c4043] font-medium leading-relaxed break-words">
                        {point}{point.endsWith('.') ? '' : '.'}
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
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white text-[18px] font-medium text-[#1f1f1f] mb-3">
                  Direct Reservation
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#1f1f1f] tracking-tight mb-2">
                  Configure Expedition
                </h2>
                <p className="text-[18px] font-medium text-[#5f6368] mb-6 leading-normal">
                  Select your date, guest count, permits and meal add-ons.
                </p>

                <div className="w-full">
                  <BookingForm tourPackageSlug={pkg.slug} />
                </div>
              </div>
            </aside>
          </section>

        </div>
      </main>
    </>
  );
}