import type { Metadata } from "next";
import ClientTicketsPage from "./ClientTicketsPage";

const BASE_URL = "https://www.yalawildlife.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Yala National Park Tickets | Official Permits Online",
  description: "Buy official 2026/2027 Yala National Park day entry permits online. Use our interactive DWC ticket calculator to instantly calculate passenger admission, vehicle fees, and VAT in USD/LKR. Skip the long ticket queues at the park gate entirely!",
  keywords: [
    "yala national park tickets 2026",
    "yala national park tickets 2027",
    "yala entrance fees 2026",
    "yala permit booking online",
    "dwc sri lanka ticket calculator",
    "buy official yala permits",
    "yala safari entrance cost usd",
    "yala entry permit formula",
    "yala visitor admission rates",
    "how to buy yala tickets online",
    "yala park permit tax",
    "yala online ticketing",
    "sri lanka wildlife ticket price",
    "foreign visitor ticket yala",
    "local ticket cost yala",
    "yala safari permit fees",


    // Core High-Intent Keywords
    "yala national park entrance fee usd",
    "yala safari ticket price foreigners",
    "book yala tickets online",
    "yala national park tickets 2026",
    "yala national park entrance fee 2026",

    // Cost & Pricing Specifics
    "cost of yala safari sri lanka",
    "yala ticket price in dollars",
    "yala entrance fee for non residents",
    "how much is yala national park",
    "yala jeep safari cost",
    "yala half day safari price",
    "yala full day safari tickets",
    "yala park permit fee calculator",
    "dwc sri lanka ticket prices",

    // Booking & Reservations
    "buy yala park tickets online",
    "yala safari booking for tourists",
    "yala dwc entry permit online",
    "skip the line yala safari",
    "yala online ticketing system",
    "yala national park advance booking",
    "reserve yala safari tickets",
    "yala ticket counter opening hours",

    // Foreigner & Tourist Specific
    "sri lanka wildlife ticket price foreigners",
    "yala safari entrance cost usd",
    "yala ticket price for uk tourists",
    "yala ticket price for us citizens",
    "yala entrance fee euro",
    "yala block 1 entrance fee",

    // Question-based (Long Tail)
    "how to buy yala tickets online",
    "do i need to book yala safari in advance",
    "where to buy yala national park tickets",
    "is yala entrance fee included in safari",

    // Broad Sri Lanka Tourism
    "sri lanka leopard safari cost",
    "yala wildlife park entry fee",
    "tissamaharama safari tickets",
    "best yala safari booking"


  ],
  other: {
    "geo.region": "LK-82",
    "geo.placename": "Yala National Park, Tissamaharama, Southern Province, Sri Lanka",
    "geo.position": "6.3747;81.1185",
    "ICBM": "6.3747, 81.1185",
    "DC.title": "Yala National Park Tickets & Permit Fee Calculator 2026/2027",
    "DC.creator": "Yala Wildlife Safari",
    "DC.subject": "Yala National Park Tickets, DWC Entry Permits, Pricing Calculator",
    "DC.description": "Calculate official DWC entry permit fees for Yala National Park and book tickets online.",
    "DC.publisher": "Yala Wildlife Safari",
    "DC.type": "Booking Service, Pricing Calculator",
    "DC.format": "text/html",
    "DC.identifier": `${BASE_URL}/yala-national-park-tickets`,
    "DC.language": "en",
    "robots": "index, follow, max-image-preview:large",
    "googlebot": "index, follow, max-image-preview:large",


  },
  openGraph: {
    type: "website",
    title: "Yala National Park Tickets 2026/2027 | Buy DWC Official Permits Online",
    description: "Interactive Yala entry ticket calculator. Calculate passenger fees, vehicle admission charges, and government VAT in LKR & USD. Secure your official permits instantly online!",
    url: `${BASE_URL}/yala-national-park-tickets`,
    siteName: "Yala National Park",
    locale: "en_US",
    images: [
      {
        url: `${BASE_URL}/uploads/yala1.webp`,
        width: 1200,
        height: 630,
        alt: "Yala National Park Entry Gates & Wildlife Safari",
        type: "image/webp",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@yalawildlife",
    creator: "@yalawildlife",
    title: "Yala National Park Tickets & Permit Fee Calculator 2026/2027",
    description: "Official 2026/2027 Yala National Park permit fee calculator. Fast, interactive, accurate USD & LKR pricing with VAT breakdown. Buy online and skip the line.",
    images: {
      url: `${BASE_URL}/uploads/yala1.webp`,
      alt: "Yala National Park Tickets",
    },
  },
  alternates: {
    canonical: `${BASE_URL}/yala-national-park-tickets`,
  },
};

export default function YalaTicketsPage() {
  return (
    <>
      <ClientTicketsPage />

      {/* Structured JSON-LD Rich Schemas for #1 Google SEO Ranking */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Service",
              "name": "Yala National Park Official Permit Booking & Ticketing Service",
              "provider": {
                "@type": "TravelAgency",
                "name": "Yala Wildlife Safari",
                "url": BASE_URL,
                "telephone": "+94778158004",
                "image": `${BASE_URL}/uploads/yala1.webp`,
                "priceRange": "$$ - $$$"
              },
              "areaServed": "Yala National Park, Sri Lanka",
              "description": "Skip-the-line ticket booking and official permit reservation service for Yala National Park. Calculate DWC government rates dynamically including taxes.",
              "offers": {
                "@type": "AggregateOffer",
                "priceCurrency": "USD",
                "lowPrice": "25.00",
                "highPrice": "43.19",
                "offerCount": "4"
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "How do I buy Yala National Park tickets online?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "You can calculate and request your official Yala National Park entry permits online directly using our dynamic DWC calculator. Input your visitor details, submit the booking inquiry, and our agents will secure the government permits in advance. This ensures a seamless entrance, letting you skip the long ticket counter lines entirely!"
                  }
                },
                {
                  "@type": "Question",
                  "name": "What is the Yala National Park entrance ticket price for foreigners?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "For foreign visitors (Non-SAARC), the official day entrance permit fee is $25 USD for adults and $15 USD for children (6-12 years). Infants under 6 enter free of charge. Our portal dynamically converts these USD prices to LKR at the live daily exchange rate for transparent side-by-side calculation."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is the private safari jeep rental cost included in the ticket calculator?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "No. The calculator computes only the official DWC government park permit charges (passenger entry tickets, vehicle trail fees, and mandatory government service charges plus 18% VAT). Private 4x4 safari jeep hire, driver services, and independent tracker tips must be booked separately."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Do I need to book my Yala safari entry permits in advance?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. Booking in advance is highly recommended for all visitors—especially international tourists—to ensure smooth clearance. Having your official permits prepared beforehand guarantees a stress-free experience, allowing you to bypass the gate counter queues at Palatupana or Katagamuwa and spend more time searching for leopards."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What are the official ticket counter opening hours at Yala?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The Department of Wildlife Conservation (DWC) ticket offices at Palatupana Gate (Block 1 & 2) and Katagamuwa Gate (Block 2) operate daily from 6:00 AM to 6:00 PM. We strongly recommend securing your digital permits online before arrival to ensure seamless early-morning entry when wildlife tracking is optimal."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is there a discounted entrance fee for SAARC nationals?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. SAARC adults pay a discounted government rate of $20 USD, while SAARC children aged 6 to 12 are charged $10 USD. Valid passport verification matching the registered booking details is required at the entry check-point to utilize these discounted tickets."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Are there additional costs for half-day vs full-day safari permits?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. Full-day safari permits include a slightly higher fixed vehicle admission and unified service fee, since the vehicle stays on trails for up to 12 hours. The DWC calculates this automatically based on hours of trail usage."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What is the VAT rate and government service fee breakdown?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "All official Yala permits are subject to a mandatory 18% Value Added Tax (VAT). Additionally, a unified government service charge is added per permit group ($10 USD equivalent for foreign visitor groups or LKR 400 for local groups), which our calculator handles dynamically."
                  }
                }
              ]
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": BASE_URL
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Book Yala Tickets",
                  "item": `${BASE_URL}/yala-national-park-tickets`
                }
              ]
            }
          ])
        }}
      />
    </>
  );
}
