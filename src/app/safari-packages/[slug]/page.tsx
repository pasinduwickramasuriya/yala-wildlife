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
import DotsBackground from "@/components/DotsBackground";

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
  const params = await props.params; // Await the params
  const pkg = await getPackage(params.slug);

  // Split description into points (assuming sentences end with periods)
  const descriptionPoints = pkg.description
    .split(".") // Split by period; adjust delimiter if needed (e.g., "\n" for newlines)
    .map((point) => point.trim())
    .filter((point) => point.length > 0) // Remove empty strings
    .map((point) => (point.endsWith(".") ? point : `${point}.`)); // Ensure each point ends with a period

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
      <main className="bg-background min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[50vh] w-full">
          <Image
            src={pkg.imageUrl} // No fallback since imageUrl is required in Prisma model
            alt={pkg.name}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent"></div>
          {/* Package Name */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-foreground">
            <h1 className="text-2xl md:text-2xl font-bold leading-tight max-w-3xl animate-fadeIn text-green-400">
              {pkg.name}
            </h1>
          </div>
        </section>

        {/* Details Section */}
        <section className="container mx-auto py-12 px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Left Column: Image */}
            <div className="relative h-80 md:h-[450px] rounded-xl overflow-hidden">
              <Image
                src={pkg.imageUrl}
                alt={pkg.name}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Right Column: Details */}
            <div className="rounded-xl p-6 md:p-8 flex flex-col">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
                {pkg.name}
              </h2>
              {/* Description as Bullet Points */}
              <ul className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6 space-y-3">
                {descriptionPoints.map((point, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-center mb-6">
                <span className="text-xl md:text-2xl font-bold text-green-600 dark:text-green-500">
                  ${pkg.price.toFixed(2)}
                </span>
                <span className="text-sm text-muted-foreground ml-2">
                  per Jeep
                </span>
              </div>
            </div>
          </div>

          {/* Booking Form Section */}
          <div className="max-w-5xl mx-auto mt-12">
            <div className="rounded-xl p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-semibold text-foreground text-center mb-6">
                Book This Package
              </h3>
              <BookingForm tourPackage={pkg.name} />
            </div>
          </div>
        </section>
      </main>
      <DotsBackground/>
    </>
  );
}
