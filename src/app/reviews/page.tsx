import type { Metadata } from "next";
import GetCustomerReviews from "@/components/GetCustomerReviews";
import ShowReviews from "@/components/ShowReviews";
import { AutoSEOWrapper } from "@/components/AutoSEOWrapper";
import ModernReviews from "@/components/ModernReviews";
import ReviewSlider from "@/components/ReviewSlider";
import ReviewPhotoGallery from "@/components/ReviewPhotoGallery";
import Image from "next/image";

export const revalidate = 3600; // Enable ISR cache for 1 hour for instant TTFB

// ✅ SEO: Canonical Base URL
const BASE_URL = "https://www.yalawildlife.com";

// ✅ MEGA-SEO: Massive Keyword List for Top Ranking
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  // title: "Yala Safari Reviews | 4.9/5 Rated by 1000+ Travelers",
  title: "Yala National Park | Official Site | Travelers Reviews | Yala Sri Lanka",
  description: "Read genuine 5-star reviews for Yala Wildlife Safari. Rated #1 on TripAdvisor & Google. Trusted by families, photographers, and couples for guaranteed leopard sightings.",
  keywords: [
    // --- 🔥 HIGH INTENT & REPUTATION ---
    "yala safari reviews", "yala national park reviews", "best safari operator yala reviews",
    "yala wildlife safari tripadvisor", "yala safari google reviews", "trustworthy safari yala",
    "top rated yala safari companies", "yala jeep safari feedback", "safari driver reviews yala",
    "recommended safari guide yala", "honest safari reviews sri lanka", "yala safari complaints",
    "yala safari scams to avoid", "verified safari reviews", "yala safari customer testimonials",

    // --- 🌟 EXPERIENCE SPECIFIC ---
    "luxury yala safari reviews", "best leopard safari reviews", "yala photography tour reviews",
    "family friendly safari reviews", "safe safari for kids reviews", "private jeep safari reviews",
    "clean safari jeep reviews", "knowledgeable guide yala reviews", "english speaking driver reviews",
    "morning safari vs afternoon safari reviews", "full day safari yala reviews",

    // --- 💬 PLATFORM & AWARDS ---
    "tripadvisor yala safari", "google maps reviews yala", "facebook reviews yala wildlife",
    "lonely planet recommended yala", "booking.com safari reviews", "viator yala safari reviews",
    "getyourguide yala reviews", "klook yala safari reviews", "certificate of excellence yala",

    // --- 🏆 SUPERLATIVES & COMPARISONS ---
    "number 1 safari yala", "best rated safari sri lanka", "award winning safari yala",
    "most reviewed safari operator", "customer satisfaction yala", "guaranteed sightings reviews",
    "yala vs udawalawe reviews", "best safari company in tissamaharama",

    // --- 📍 LOCATION & LOGISTICS ---
    "tissamaharama safari reviews", "palatupana entrance reviews", "katagamuwa safari reviews",
    "colombo to yala safari reviews", "galle to yala tour reviews", "safari near kataragama reviews"
  ],
  openGraph: {
    type: "website",
    title: "Yala Safari Reviews | See Why We Are Rated #1",
    description: "Real stories from real travelers. 1000+ 5-Star reviews for Yala Wildlife Safari. Book the experience everyone is talking about.",
    url: `${BASE_URL}/reviews`,
    siteName: "Yala National Park",
    images: [{
      url: `${BASE_URL}/og-reviews-yala.jpg`,
      width: 1200,
      height: 630,
      alt: "Happy Travelers at Yala National Park",
    }],
  },
  alternates: { canonical: `${BASE_URL}/reviews` },
  robots: { index: true, follow: true },
};

export default function ReviewsPage() {
  return (
    <>
      {/* 🐆 Hardware-Accelerated Isolated Background Layer */}
      <div
        aria-hidden="true"
        className="fixed inset-0 z-0 pointer-events-none will-change-transform transform-gpu overflow-hidden"
      >
        <Image
          src="/uploads/1748935199061-20250603_1239_Leopard Emerges from Darkness_simple_compose_01jwt9yv7qect8krxy794bcr23.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          quality={70}
          className="object-cover opacity-85"
        />

        {/* Unified Single Overlay Layer (Eliminates 1 full-screen GPU pass) */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/20 to-black/85"
          style={{
            backgroundImage: `
              radial-gradient(circle at center, transparent 30%, rgba(0, 0, 0, 0.55) 100%),
              linear-gradient(to bottom, rgba(0,0,0,0.85), transparent 40%, transparent 60%, rgba(0,0,0,0.85))
            `
          }}
        />
      </div>

      {/* ✅ SCHEMA: AggregateRating */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": `${BASE_URL}/#organization`,
            "name": "Yala Wildlife Safari",
            "url": BASE_URL,
            "image": `${BASE_URL}/logo.png`,
            "telephone": "+94-778-158-004",
            "priceRange": "$$",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Tissamaharama",
              "addressRegion": "Southern Province",
              "addressCountry": "LK"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "1250",
              "bestRating": "5",
              "worstRating": "1"
            }
          })
        }}
      />

      {/* Content Layer: Promoted to its own composite layer to prevent repaints during scroll */}
      <main className="relative z-10 transform-gpu">
        {/* 1. GOOGLE/AI SUMMARY SECTION */}
        <ModernReviews />

        {/* 2. SLIDER SECTION */}
        <ReviewSlider />

        {/* 3. VISITOR PHOTO GALLERY */}
        <ReviewPhotoGallery />

        {/* SEO CONTENT BLOCK */}
        <AutoSEOWrapper
          pageTitle="Yala Safari Reviews | 4.9★ Rating from 1000+ Travelers"
          pageDescription="Read authentic reviews from travelers who experienced Yala Wildlife Safari. 4.9-star rating on TripAdvisor, Google, and Facebook. Book with confidence!"
          pageType="other"
        >
          {/* content-visibility: auto skips layout work for below-the-fold content until scrolled near */}
          <section
            className="mt-20 flex flex-col items-center gap-4 [content-visibility:auto] [contain-intrinsic-size:1px_800px]"
          >
            {/* 1. THE TITLE ISLAND */}
            <div className="inline-block bg-black/80 px-6 py-2.5 rounded-full shadow-lg border border-white/5">
              <h1 className="text-[15px] font-black text-white tracking-[0.2em] text-center">
                Yala Safari Reviews Why We Are Rated number one
              </h1>
            </div>

            {/* 2. THE EDITORIAL SEO BLOCK */}
            <div className="inline-block bg-black/80 px-8 py-10 rounded-[2.5rem] max-w-[850px] mx-auto shadow-lg border border-white/5">
              <p className="text-[14px] md:text-[15px] text-white/80 font-medium leading-relaxed italic text-center">
                Don&apos;t just take our word for it read <strong className="text-[#00ff00] font-black not-italic">authentic reviews</strong> from thousands of
                satisfied travelers who experienced unforgettable wildlife adventures with
                <strong className="text-white not-italic"> Yala Wildlife Safari</strong>. With an outstanding <span className="text-white not-italic">4.9-star average rating</span> on
                Google and TripAdvisor, we are proud to be Sri Lanka&apos;s most trusted safari operator.
              </p>
            </div>

            <div className="inline-block bg-black/80 px-8 py-10 rounded-[2.5rem] max-w-[850px] mx-auto shadow-lg border border-white/5">
              <div className="space-y-6 text-[14px] md:text-[15px] text-white/80 font-medium leading-relaxed italic text-center">
                <p className="text-white/80">
                  Our commitment to excellence has earned us over <strong className="text-white not-italic">1,000 five-star reviews</strong> from
                  guests worldwide. Travelers consistently praise our <span className="text-[#00ff00] font-black not-italic">expert naturalist guides</span> for their
                  tracking skills, punctuality, and ability to spot elusive leopards and sloth bears that others miss.
                </p>
                <p className="text-white/80">
                  Families love our <strong className="text-white not-italic">child-friendly safari tours</strong> designed for safe, educational
                  wildlife encounters. Parents appreciate our experienced drivers who ensure a smooth ride in our
                  <span className="text-white not-italic"> luxury cushioned jeeps</span>, engaging children with fascinating animal facts
                  and interactive spotting games.
                </p>
              </div>
            </div>

            <div className="inline-block bg-black/85 px-8 py-10 rounded-[2.5rem] max-w-[850px] mx-auto shadow-lg border border-white/5">
              <div className="space-y-6 text-[14px] md:text-[15px] text-white/80 font-medium leading-relaxed italic text-center">
                <p className="text-white/80">
                  <strong className="text-white not-italic">Photography enthusiasts</strong> consistently rate our specialized wildlife photography
                  safaris as exceptional. Guests praise our guides&apos; understanding of <span className="text-[#00ff00] font-black not-italic">golden hour lighting</span>,
                  vehicle positioning, and patience required for National Geographic-worthy shots of elephants and birds.
                </p>
                <p className="text-white/80">
                  When you choose Yala Wildlife Safari, you&apos;re choosing a proven, reliable tour
                  operator with an outstanding track record. Our reviews demonstrate our dedication
                  to creating magical wildlife experiences while maintaining the <strong className="text-white not-italic">highest safety standards</strong>.
                </p>
              </div>
            </div>

            {/* 3. VERIFIED BADGE PILL */}
            <div className="mt-2 inline-block bg-black/70 px-4 py-1.5 rounded-full border border-white/5">
              <span className="text-[10px] font-bold text-white/50 uppercase tracking-[0.3em]">
                Verified Discovery Content
              </span>
            </div>
          </section>
        </AutoSEOWrapper>
      </main>
    </>
  );
}