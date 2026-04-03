// import Header from "@/components/Header";
// import GetCustomerReviews from "@/components/GetCustomerReviews";
// import ShowReviews from "@/components/ShowReviews";
// import { AutoSEOWrapper } from "@/components/AutoSEOWrapper";

// // import ElfsightReviews from "@/components/ElfsightReviews";
// // import FeaturableReviews from "@/components/FeaturableReviews";
// import ModernReviews from "@/components/ModernReviews";
// import ReviewSlider from "@/components/ReviewSlider";

// export default function ReviewsPage() {
//   return (
//     <>
//       <Header />
//       {/* <ReviewsSectio/> */}
//       <ModernReviews/>
//       {/* <ElfsightReviews/> */}
//       {/* <FeaturableReviews/> */}
//       <ReviewSlider/>
//       <div className="min-h-screen bg-blur">
//         <div className="py-16 px-4 md:px-6">

//           <ShowReviews />
//           <div className="flex justify-center mt-8">
//             <GetCustomerReviews />
//           </div>
//         </div>
//       </div>

//       <AutoSEOWrapper
//         pageTitle="Yala Safari Reviews | 4.9★ Rating from 1000+ Travelers"
//         pageDescription="Read authentic reviews from travelers who experienced Yala Wildlife Safari. 4.9-star rating on TripAdvisor, Google, and Facebook. Book with confidence!"
//         pageType="other"
//       >
//         <div className="container mx-auto px-4 py-8">
//           <h1>Yala Safari Reviews</h1>

//           <p>
//             Dont just take our word for it - read authentic reviews from thousands of
//             satisfied travelers who experienced unforgettable wildlife adventures with
//             Yala Wildlife Safari. With an outstanding 4.9-star average rating, were
//             proud to be one of Sri Lankas top-rated safari operators.
//           </p>

//           <p>
//             Our commitment to excellence has earned us over 1,000 five-star reviews from
//             guests worldwide. Travelers consistently praise our expert guides knowledge,
//             punctuality, professionalism, and genuine passion for wildlife conservation
//             and environmental education.
//           </p>

//           <p>
//             Families love our child-friendly safari tours designed for safe, educational
//             wildlife encounters. Parents appreciate our experienced guides who engage
//             children with fascinating animal facts and interactive wildlife spotting games
//             suitable for all ages.
//           </p>

//           <p>
//             Photography enthusiasts consistently rate our specialized wildlife photography
//             safaris as exceptional. Guests praise our guides understanding of lighting,
//             composition, and optimal positioning for stunning wildlife shots including
//             leopards, elephants, and colorful bird species.
//           </p>

//           <p>
//             When you choose Yala Wildlife Safari, youre choosing a proven, reliable tour
//             operator with an outstanding track record. Our reviews demonstrate our dedication
//             to creating magical wildlife experiences while maintaining highest safety standards
//             and exceeding guest expectations every day.
//           </p>
//         </div>
//       </AutoSEOWrapper>


//     </>
//   );
// }








import type { Metadata } from "next";
import Header from "@/components/Header";
import GetCustomerReviews from "@/components/GetCustomerReviews";
import ShowReviews from "@/components/ShowReviews";
import { AutoSEOWrapper } from "@/components/AutoSEOWrapper";
import ModernReviews from "@/components/ModernReviews";
import ReviewSlider from "@/components/ReviewSlider";
import ReviewPhotoGallery from "@/components/ReviewPhotoGallery";

// ✅ SEO: Canonical Base URL
const BASE_URL = "https://www.yalawildlife.com";

// ✅ MEGA-SEO: Massive Keyword List for Top Ranking
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Yala Safari Reviews | 4.9/5 Rated by 1000+ Travelers",
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
    siteName: "Yala Wildlife Safari",
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
            "name": "Yala Wildlife Safari",
            "image": "https://www.yalawildlife.com/logo.png",
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

      <Header />

      {/* 1. GOOGLE/AI SUMMARY SECTION */}
      <ModernReviews />

      {/* 2. SLIDER SECTION (Visual Proof) */}
      <ReviewSlider />

      {/* 3. VISITOR PHOTO GALLERY */}
      <ReviewPhotoGallery />

      {/* 4. MANUAL REVIEW SUBMISSION & LIST (Existing Styling Preserved) */}
      {/* <div className="min-h-screen bg-blur">
        <div className="py-16 px-4 md:px-6">
          <ShowReviews />
          <div className="flex justify-center mt-8">
            <GetCustomerReviews />
          </div>
        </div>
      </div> */}

      {/* seo content block */}
      <AutoSEOWrapper
        pageTitle="Yala Safari Reviews | 4.9★ Rating from 1000+ Travelers"
        pageDescription="Read authentic reviews from travelers who experienced Yala Wildlife Safari. 4.9-star rating on TripAdvisor, Google, and Facebook. Book with confidence!"
        pageType="other"
      >
        <div className="mt-20 flex flex-col items-center gap-4 animate-in slide-in-from-bottom duration-1000 ease-out">
          {/* 1. THE TITLE ISLAND */}
          <div className="inline-block  bg-black/70  px-6 py-2.5 rounded-full shadow-2xl">
            <h1 className="text-[15px] font-black text-white  tracking-[0.2em] text-center">
              Yala Safari Reviews Why We Are Rated number one
            </h1>
          </div>

          {/* 2. THE EDITORIAL SEO BLOCK
          {/* 1. TOP ISLAND: THE TRUST PILL */}
          <div className="inline-block  bg-black/70  px-8 py-10 rounded-[3rem] max-w-[850px] mx-auto shadow-2xl">
            <p className="text-[14px] md:text-[15px] text-white/80 font-medium leading-relaxed italic text-center">
              Don&apos;t just take our word for it read <strong className="text-[#00ff00] font-black not-italic">authentic reviews</strong> from thousands of
              satisfied travelers who experienced unforgettable wildlife adventures with
              <strong className="text-white not-italic"> Yala Wildlife Safari</strong>. With an outstanding <span className="text-white not-italic">4.9-star average rating</span> on
              Google and TripAdvisor, we are proud to be Sri Lanka&apos;s most trusted safari operator.
            </p>
          </div>

          {/* 2. MIDDLE ISLAND: THE EXPERTISE PILL */}
          <div className="inline-block  bg-black/70  px-8 py-10 rounded-[3rem] max-w-[850px] mx-auto shadow-2xl">
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

          {/* 3. BOTTOM ISLAND: THE PASSION PILL */}
          <div className="inline-block  bg-black/80  px-8 py-10 rounded-[3rem] max-w-[850px] mx-auto shadow-2xl">
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
          {/* </div> */}

          {/* 3. VERIFIED BADGE PILL */}
          <div className="mt-2 inline-block bg-black/60 px-4 py-1.5 rounded-full">
            <span className="text-[10px] font-bold text-white/50 uppercase tracking-[0.3em]">
              Verified Discovery Content
            </span>
          </div>
        </div>
      </AutoSEOWrapper>

    </>
  );
}