import prisma from "@/lib/prisma";
import Header from "@/components/Header";
import BookingForm from "@/components/BookingForm";
import { notFound } from "next/navigation";
import Image from "next/image";

// Force dynamic rendering
export const dynamic = "force-dynamic";
export const revalidate = 0;

// Define the Package interface based on your Prisma model
interface Package {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  slug: string;
}

// Fetch package data server-side
async function getPackage(slug: string): Promise<Package> {
  try {
    const pkg = await prisma.package.findUnique({
      where: { slug },
    });
    if (!pkg) {
      notFound();
    }
    return pkg; // Types align with Prisma model
  } catch (error) {
    console.error("Error fetching package:", error);
    notFound();
  }
}

// Custom props type to satisfy Next.js type checker without importing PageProps
interface PackageDetailPageProps {
  params: Promise<{ slug: string }>; // Wrap params in Promise to match PageProps
  searchParams?: Promise<Record<string, string | string[] | undefined>>; // Optional, mimics PageProps
}

export default async function PackageDetailPage({ params }: PackageDetailPageProps) {
  const pkg = await getPackage((await params).slug); // No explicit await needed for params; Next.js resolves it

  // Split description into points (assuming sentences end with periods)
  const descriptionPoints = pkg.description
    .split(".") // Split by period; adjust delimiter if needed (e.g., "\n" for newlines)
    .map((point) => point.trim())
    .filter((point) => point.length > 0) // Remove empty strings
    .map((point) => (point.endsWith(".") ? point : `${point}.`)); // Ensure each point ends with a period

  return (
    <>
      <Header />
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
            <h1 className="text-3xl md:text-5xl font-bold leading-tight max-w-3xl animate-fadeIn">
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
                  per person
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
    </>
  );
}