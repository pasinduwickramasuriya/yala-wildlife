import type { Metadata } from "next";
import GetCustomerReviews from "@/components/GetCustomerReviews";
import ShowReviews from "@/components/ShowReviews";
import { AutoSEOWrapper } from "@/components/AutoSEOWrapper";
import ModernReviews from "@/components/ModernReviews";
import ReviewSlider from "@/components/ReviewSlider";
import ReviewPhotoGallery from "@/components/ReviewPhotoGallery";

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
      {/* ✅ SCHEMA: AggregateRating (Crucial for Gold Stars in Google Search) */}
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

      {/* 1. GOOGLE/AI SUMMARY SECTION */}
      <ModernReviews />

      {/* 2. SLIDER SECTION (Visual Proof) */}
      <ReviewSlider />

      {/* 3. VISITOR PHOTO GALLERY */}
      <ReviewPhotoGallery />

      {/* ================= SEO CONTENT BLOCK ================= */}
<AutoSEOWrapper
  pageTitle="Yala Safari Reviews | 4.9★ Rating from 1000+ Travelers"
  pageDescription="Read authentic reviews from travelers who experienced Yala Wildlife Safari. 4.9-star rating on TripAdvisor, Google, and Facebook. Book with confidence!"
  pageType="other"
>
  <section 
    className="w-full bg-white text-[#1f1f1f] py-16 px-4 sm:px-8 md:px-12 border-t border-[#f1f3f4] [content-visibility:auto] [contain-intrinsic-size:1px_400px]"
    style={{
      fontFamily: '"Google Sans", "Open Sans", Roboto, -apple-system, BlinkMacSystemFont, Arial, sans-serif',
    }}
  >
    <div className="max-w-6xl mx-auto flex flex-col items-center text-center bg-white">
      {/* 1. Header Section */}
      <h2 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-[#1f1f1f] tracking-tight leading-tight mb-4 text-center">
        Why We Are Rated #1 Yala Safari Reviews 
      </h2>

      <p className="text-[18px] text-[#5f6368] font-semibold leading-relaxed mb-10 text-center max-w-3xl">
        Don&apos;t just take our word for it read authentic reviews from thousands of satisfied travelers who experienced unforgettable wildlife adventures with Yala Wildlife Safari.
      </p>

      {/* 2. Pure White Content Cards */}
      <div className="flex flex-col gap-6 w-full text-center bg-white">
        {/* Card 1: Trust & Overview */}
        <div className="bg-white rounded-[2.25rem] p-6 sm:p-8 flex flex-col items-center justify-center text-center [contain:paint]">
          <p className="text-[18px] text-[#5f6368] font-semibold leading-relaxed text-center max-w-2xl">
            With an outstanding <strong className="text-[#1f1f1f] font-bold">4.9-star average rating</strong> across Google and TripAdvisor, we are proud to be Sri Lanka&apos;s most trusted safari operator. Our commitment to wildlife ethics and service excellence has earned us over <strong className="text-[#1f1f1f] font-bold">1,000 five-star reviews</strong> from global adventurers.
          </p>
        </div>

        {/* Card 2: Naturalist Guides & Family Tours */}
        <div className="bg-white rounded-[2.25rem] p-6 sm:p-8 flex flex-col items-center justify-center text-center space-y-4 [contain:paint]">
          <p className="text-[18px] text-[#5f6368] font-semibold leading-relaxed text-center max-w-2xl">
            Travelers consistently praise our <strong className="text-[#1f1f1f] font-bold">expert naturalist guides</strong> for their tracking precision, punctuality, and ability to locate elusive leopards and sloth bears that others miss.
          </p>
          <p className="text-[18px] text-[#5f6368] font-semibold leading-relaxed text-center max-w-2xl">
            Families love our child-friendly safari tours designed for safe, educational encounters. Parents appreciate our experienced drivers who ensure a smooth ride in our luxury cushioned jeeps, keeping young explorers engaged with interactive spotting challenges.
          </p>
        </div>

        {/* Card 3: Photography & High Safety Standards */}
        <div className="bg-white rounded-[2.25rem] p-6 sm:p-8 flex flex-col items-center justify-center text-center space-y-4 [contain:paint]">
          <p className="text-[18px] text-[#5f6368] font-semibold leading-relaxed text-center max-w-2xl">
            Photography enthusiasts consistently rate our specialized wildlife expeditions as exceptional. Guests highlight our team&apos;s deep understanding of golden-hour lighting, strategic vehicle angles, and the patience needed for National Geographic-quality captures.
          </p>
          <p className="text-[18px] text-[#5f6368] font-semibold leading-relaxed text-center max-w-2xl">
            When you choose Yala Wildlife Safari, you are selecting a proven, dependable expedition team committed to magical wildlife moments under the highest passenger safety standards.
          </p>
        </div>
      </div>
    </div>
  </section>
</AutoSEOWrapper>

    </>
  );
}