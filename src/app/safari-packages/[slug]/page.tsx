import { Metadata } from "next";
import { Package } from "@prisma/client";
import { notFound } from "next/navigation";
import Image from "next/image";
import prisma from "@/lib/prisma";
import { siteConfig } from "@/lib/seo-config";
import Header from "@/components/Header";
import BookingForm from "@/components/BookingForm";
import { SafariPackageJsonLd } from "@/components/JsonLd";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FAQJsonLd, defaultFAQs } from "@/components/FAQJsonLd";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import { MapPin, Clock, Shield, Users, CheckCircle2 } from "lucide-react";

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

  const title = `${packageData.name} - Best Yala Safari Tour Package | Yala Wildlife Safari`;
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
      siteName: siteConfig.name,
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
  const params = await props.params;
  const pkg = await getPackage(params.slug);

  // Split description into points
  const descriptionPoints = pkg.description
    .split(".")
    .map((point) => point.trim())
    .filter((point) => point.length > 0);

  const breadcrumbItems = [
    { name: "Home", item: "/" },
    { name: "Safari Packages", item: "/safari-packages" },
    { name: pkg.name, item: `/safari-packages/${pkg.slug}` },
  ];

  return (
    <>
      <Header />
      <SafariPackageJsonLd
        name={pkg.name}
        description={pkg.description}
        price={pkg.price}
        image={pkg.imageUrl}
        slug={pkg.slug}
      />
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <FAQJsonLd faqs={defaultFAQs} />
      <BreadcrumbSchema items={breadcrumbItems} />

      <main className="min-h-screen bg-[#050505] text-white relative overflow-hidden selection:bg-green-500/30">

        {/* =========================================
            BACKGROUND IMAGE (Global - Fixed)
        ========================================= */}
        <div className="fixed inset-0 z-0">
          <Image
            src="/uploads/1748935199061-20250603_1239_Leopard Emerges from Darkness_simple_compose_01jwt9yv7qect8krxy794bcr23.webp"
            alt="Yala Leopard Background"
            fill
            priority
            // Slightly increased opacity for better visibility against the dark overlay
            className="object-cover opacity-50"
            quality={90}
          />
          {/* Cinematic Overlay - Stronger gradients so text pops without borders */}
          <div className="absolute inset-0 bg-gradient-to-b " />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#050505_100%)]" />
        </div>

        {/* =========================================
            CONTENT
        ========================================= */}
        <div className="relative z-10 container mx-auto px-4 pt-32 pb-20">

          {/* Breadcrumb / Metadata HUD */}
          <div className="flex items-center gap-4 text-xs font-mono text-neutral-400 mb-8 uppercase tracking-widest">
            <span>Yala National Park</span>
            <span className="w-px h-3 bg-neutral-600"></span>
            <span className="text-green-400">Expedition ID: {pkg.slug.toUpperCase().substring(0, 6)}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* LEFT COLUMN: DETAILS (Span 7) */}
            <div className="lg:col-span-7 space-y-10">

              {/* Title Block */}
              <div className="space-y-6">
                <h1 className="text-4xl md:text-7xl font-black text-white leading-[0.9] tracking-tighter drop-shadow-lg">
                  {pkg.name}
                </h1>
                {/* Badges - No Borders, just glass */}
                <div className="flex flex-wrap gap-3 pt-2">
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full shadow-sm">
                    <Clock size={14} className="text-green-400" />
                    <span className="text-xs font-bold uppercase text-white">4-6 Hours</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full shadow-sm">
                    <Users size={14} className="text-green-400" />
                    <span className="text-xs font-bold uppercase text-white">Max 7 Guests</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full shadow-sm">
                    <Shield size={14} className="text-green-400" />
                    <span className="text-xs font-bold uppercase text-white">Insured</span>
                  </div>
                </div>
              </div>

              {/* Main Image (Cutter Style - Deep Shadow, No Border) */}
              <div className="relative aspect-video rounded-[2rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] group">
                <Image
                  src={pkg.imageUrl}
                  alt={pkg.name}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 60vw"
                  priority
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 flex items-center gap-2 text-xs font-mono text-green-400 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                  <MapPin size={12} />
                  <span>Sector 1 - Palatupana Gate</span>
                </div>
              </div>

              {/* Description List - Dark Glass, No Border */}
              <div className="bg-black/30 backdrop-blur-2xl rounded-3xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-white mb-8">
                  Expedition Highlights
                </h3>
                <div className="grid gap-5">
                  {descriptionPoints.map((point, index) => (
                    <div key={index} className="flex items-start gap-4 group">
                      <div className="mt-1 p-1 bg-green-500/20 rounded-full">
                        <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                      </div>
                      <p className="text-neutral-200 text-base leading-relaxed font-light">
                        {point}.
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: BOOKING CONSOLE (Span 5) */}
            <div className="lg:col-span-5">
              <div className="sticky top-24 space-y-8">

                {/* Pricing Card - Glowing, No Border */}
                <div className="bg-gradient-to-br from-green-600 to-emerald-800 rounded-3xl p-8 text-center relative overflow-hidden shadow-[0_0_50px_rgba(22,163,74,0.4)]">
                  <div className="absolute inset-0 bg-[url('/pattern-grid.svg')] opacity-10 mix-blend-overlay"></div>
                  <p className="text-green-100/80 text-xs font-bold uppercase tracking-widest mb-2">Total Package Price</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-3xl font-bold text-green-200">$</span>
                    <span className="text-6xl font-black text-white tracking-tighter drop-shadow-md">{pkg.price.toFixed(0)}</span>
                  </div>
                  <p className="text-white text-sm mt-3 font-medium bg-white/10 py-1 px-3 rounded-full inline-block">Per Jeep (All Inclusive)</p>
                </div>

                {/* Booking Form Container - Deep Glass, No Border */}
                <div className="backdrop-blur-2xl bg-black/50 rounded-3xl p-8 shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">Secure Your Seat</h3>
                    <p className="text-base text-neutral-400">Instant confirmation. Your adventure awaits.</p>
                  </div>

                  {/* Integrated Booking Form */}
                  <BookingForm tourPackageSlug={pkg.name} />
                </div>

                {/* Trust Badges - Dark Capsules, No Border */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/40 backdrop-blur-lg rounded-2xl p-5 text-center shadow-inner">
                    <div className="text-green-400 font-black text-2xl mb-1">4.9/5</div>
                    <div className="text-[10px] text-neutral-400 uppercase tracking-wider font-bold">Guest Rating</div>
                  </div>
                  <div className="bg-black/40 backdrop-blur-lg rounded-2xl p-5 text-center shadow-inner">
                    <div className="text-green-400 font-black text-2xl mb-1">100%</div>
                    <div className="text-[10px] text-neutral-400 uppercase tracking-wider font-bold">Refund Guarantee</div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </main>
    </>
  );
}