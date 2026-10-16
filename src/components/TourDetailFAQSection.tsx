"use client";

import React, { useState, useMemo, useId, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, MessageCircle, ArrowRight } from "lucide-react";

export interface TourDetailFAQItem {
  id: string;
  question: string;
  answer: string;
  detailedContent?: string;
  category: "itinerary" | "pricing" | "chauffeur" | "hotels" | "safari" | "booking";
  categoryLabel: string;
  links?: { label: string; href: string }[];
}

export interface TourDetailData {
  id: string;
  title: string;
  slug: string;
  route: string;
  price: number;
  duration?: string;
  description: string;
  longDescription?: string;
  highlights?: string[];
  inclusions?: string[];
  exclusions?: string[];
  itinerary?: {
    day: number;
    title: string;
    description: string;
    included?: string | null;
    highlight?: string | null;
  }[];
  seoKeywords?: string;
}

const TOUR_CATEGORIES = [
  { id: "all", label: "All Questions" },
  { id: "itinerary", label: "Route & Pacing" },
  { id: "pricing", label: "Price & Inclusions" },
  { id: "chauffeur", label: "Chauffeur & Van" },
  { id: "hotels", label: "Hotels & Meals" },
  { id: "safari", label: "Safari & Activities" },
  { id: "booking", label: "Booking & Flexibility" },
];

export default function TourDetailFAQSection({ tour }: { tour: TourDetailData }) {
  const baseId = useId();

  const titleLower = tour.title.toLowerCase();
  const routeLower = (tour.route || "").toLowerCase();
  const descLower = (tour.description || "").toLowerCase();
  const itineraryText = JSON.stringify(tour.itinerary || []).toLowerCase();

  const hasYala = titleLower.includes("yala") || routeLower.includes("yala") || itineraryText.includes("yala");
  const hasSigiriya = routeLower.includes("sigiriya") || itineraryText.includes("sigiriya");
  const hasElla = routeLower.includes("ella") || itineraryText.includes("ella");
  const hasGalle = routeLower.includes("galle") || itineraryText.includes("galle");
  const hasKandy = routeLower.includes("kandy") || itineraryText.includes("kandy");
  const durationText = tour.duration || `${tour.itinerary?.length || 5} Days`;

  // Dynamically tailor questions and factual answers to this exact tour
  const tourFaqs: TourDetailFAQItem[] = useMemo(() => {
    const list: TourDetailFAQItem[] = [
      {
        id: "tour-route-and-daily-pacing",
        question: `What is the travel route and daily driving pace for the ${tour.title}?`,
        answer: `This ${durationText} journey follows the route of ${tour.route}, covering key UNESCO cultural landmarks, misty tea highlands, and scenic wildlife reserves at a well-balanced pace.`,
        detailedContent: `Daily drives typically range between 2.5 and 4 hours in your private air-conditioned vehicle, punctuated by scenic photo opportunities, roadside king coconut stops, and herbal garden tours. Your private chauffeur adapts the daily schedule to match your preferred morning start times and energy levels.`,
        category: "itinerary",
        categoryLabel: "Route & Pacing",
        links: [
          { label: "View Detailed Itinerary", href: `#operational-itinerary` },
          { label: "All Tour Circuits", href: "/tours" },
        ],
      },
      {
        id: "tour-pricing-and-what-is-included",
        question: `How much does the ${tour.title} cost, and what is included in the price?`,
        answer: `The ${tour.title} starts from $${tour.price} USD per person (based on twin-share occupancy), including your dedicated air-conditioned vehicle, SLTDA-licensed driver guide, fuel, highway tolls, parking permits, bed & breakfast hotel stays, and comprehensive passenger insurance.`,
        detailedContent: `All chauffeur daily allowances, meals, and overnight lodging costs are 100% covered by us—there are never any hidden vehicle surcharges or driver boarding fees. Sightseeing monument permits and personal lunches/dinners can be paid locally or bundled into your quote.`,
        category: "pricing",
        categoryLabel: "Price & Inclusions",
        links: [
          { label: "Book This Tour", href: "#booking-form" },
          { label: "Custom Route Quote", href: "/contact" },
        ],
      },
      {
        id: "private-vehicle-class-and-luggage",
        question: `What type of vehicle is provided for this tour, and how much luggage can we bring?`,
        answer: `We provide private, modern air-conditioned Japanese vehicles: luxury sedans (Toyota Prius / Axio) for 1–3 passengers, or high-roof Toyota KDH luxury vans for 4–8 passengers with large boot capacity for suitcases.`,
        detailedContent: `Every vehicle is equipped with dual air-conditioning, tinted UV-cut glass, onboard Wi-Fi, and plush adjustable reclining seats. Certified ISOFIX baby/child booster seats are provided completely free upon advance request.`,
        category: "chauffeur",
        categoryLabel: "Chauffeur & Van",
        links: [
          { label: "View Fleet Options", href: "/pickup-dropoff" },
          { label: "Contact Coordinator", href: "/contact" },
        ],
      },
      {
        id: "sltda-licensed-chauffeur-credentials",
        question: `Who will be our driver-guide during the ${tour.title}?`,
        answer: `You will be hosted by an English-fluent, professional tourist chauffeur-guide licensed by the Sri Lanka Tourism Development Authority (SLTDA) with years of experience navigating the island's routes safely.`,
        detailedContent: `Our chauffeur guides serve as knowledgeable cultural ambassadors, offering authentic insights into Sri Lankan history, Buddhist customs, flora and fauna, while recommending trustworthy local dining spots and artisanal craft workshops.`,
        category: "chauffeur",
        categoryLabel: "Chauffeur & Van",
        links: [
          { label: "Guest Reviews", href: "/reviews" },
          { label: "About Yala Wildlife", href: "/about" },
        ],
      },
      {
        id: "hotel-accommodation-standard-and-meals",
        question: `What standard of hotel accommodation is included during this ${durationText} tour?`,
        answer: `Our standard tour packages feature handpicked 3-star to 4-star boutique hotels, heritage bungalows, and eco-lodges with private en-suite bathrooms, air conditioning, Wi-Fi, and daily gourmet breakfast included.`,
        detailedContent: `If you prefer ultra-luxury 5-star properties (e.g., Heritance Kandalama, 98 Acres Resort Ella, or Cinnamon Wild Yala) or budget-friendly cozy homestays, our destination specialists will seamlessly tailor the hotel selection to your preference.`,
        category: "hotels",
        categoryLabel: "Hotels & Meals",
        links: [
          { label: "Inquire About 5-Star Upgrades", href: "/contact" },
          { label: "Browse Safari Packages", href: "/safari-packages" },
        ],
      },
      {
        id: "itinerary-customization-and-flexibility",
        question: `Can we customize or modify this ${tour.title} itinerary?`,
        answer: `Yes, 100% of this itinerary can be tailored to match your international flight times, add extra relaxation days in Ella or the south coast, or substitute specific excursions at zero customization fees.`,
        detailedContent: `Whether you want to add whale watching in Mirissa, white water rafting in Kitulgala, or swap cultural ruins for a surfing lesson in Weligama, simply message our team and we will revise your itinerary within hours.`,
        category: "booking",
        categoryLabel: "Booking & Flexibility",
        links: [
          { label: "Request Custom Tweaks", href: "/contact" },
          { label: "WhatsApp Specialist", href: "https://wa.me/94778158004" },
        ],
      },
    ];

    // Contextual: Yala Safari
    if (hasYala) {
      list.push({
        id: "yala-safari-integration-and-jeeps",
        question: `How is the Yala National Park safari arranged during this tour?`,
        answer: `Your itinerary coordinates a dedicated private 4x4 Japanese safari jeep (Toyota Hilux) and expert wildlife tracker for the prime early morning (6:00 AM) or afternoon (2:30 PM) game drive in Yala.`,
        detailedContent: `Your chauffeur safely handles your main luggage at the hotel or staging hub, while you board the modified open-top safari vehicle to track Sri Lankan leopards, wild Asian elephants, and sloth bears in their natural habitat.`,
        category: "safari",
        categoryLabel: "Safari & Activities",
        links: [
          { label: "Yala Safari Packages", href: "/safari-packages" },
          { label: "Leopard Safari Guide", href: "/safari-packages/yala-morning-safari" },
        ],
      });
    }

    // Contextual: Ella / Kandy Train
    if (hasElla || hasKandy) {
      list.push({
        id: "scenic-train-tickets-kandy-to-ella",
        question: `Can you arrange tickets for the famous Kandy to Ella blue train ride?`,
        answer: `Yes, our operations team can pre-book reserved seats (First Class AC or Second Class observation car) for the iconic scenic train ride through the misty Ceylon tea mountains.`,
        detailedContent: `Your private chauffeur takes all heavy luggage in the vehicle, drives ahead through the winding mountain roads, and greets you warmly on the station platform upon arrival in Ella to transfer you to your resort.`,
        category: "safari",
        categoryLabel: "Safari & Activities",
        links: [
          { label: "Highland Tour Details", href: `/tours/${tour.slug}` },
          { label: "Chat With Coordinator", href: "/contact" },
        ],
      });
    }

    // Contextual: Sigiriya / Cultural Triangle
    if (hasSigiriya) {
      list.push({
        id: "sigiriya-rock-climb-and-cultural-guidance",
        question: `When is the best time to climb the Sigiriya Lion Rock Fortress during this tour?`,
        answer: `We schedule the Sigiriya Lion Rock climb for either early morning (7:00 AM) or late afternoon (4:00 PM) to avoid midday tropical heat and large tour bus crowds.`,
        detailedContent: `The climb consists of approximately 1,200 steps with scenic resting terraces at the Mirror Wall and Lion’s Paws. For guests seeking a less strenuous alternative, the adjacent Pidurangala Rock offers panoramic views of Sigiriya with a gentle forest walk.`,
        category: "itinerary",
        categoryLabel: "Route & Pacing",
        links: [
          { label: "Tour Overview", href: `/tours/${tour.slug}` },
          { label: "Contact Tour Guide", href: "/contact" },
        ],
      });
    }

    // Contextual: Colombo Airport Transfers
    list.push({
      id: "airport-pickup-and-flight-delays",
      question: `Are Colombo Airport (BIA) transfers included, and what happens if our flight is delayed?`,
      answer: `Yes, private door-to-door airport meet-and-greet pickup upon flight arrival at Bandaranaike International Airport (CMB / BIA) or your Colombo hotel is included, as well as final airport departure drop-off.`,
      detailedContent: `We actively track your incoming flight number. If your flight is delayed or rescheduled, your chauffeur adjusts his pickup schedule automatically at zero extra waiting fee.`,
      category: "booking",
      categoryLabel: "Booking & Flexibility",
      links: [
        { label: "Airport Taxi Rates", href: "/pickup-dropoff" },
        { label: "Reserve This Tour", href: "#booking-form" },
      ],
    });

    // Booking deposit & cancellation
    list.push({
      id: "tour-deposit-and-cancellation-terms",
      question: `What deposit is required to reserve the ${tour.title}, and what is the cancellation policy?`,
      answer: `We require a 15% to 20% advance booking deposit to secure your vehicle, licensed chauffeur, and hotel rooms, with the remainder payable upon arrival in Sri Lanka via cash (USD, EUR, GBP, LKR) or credit card.`,
      detailedContent: `Cancellations submitted at least 14 days before your scheduled tour arrival receive a 100% full refund with zero cancellation penalties, giving you total flexibility when planning international travel.`,
      category: "pricing",
      categoryLabel: "Price & Inclusions",
      links: [
        { label: "Initialize Booking", href: "#booking-form" },
        { label: "Contact Support Desk", href: "/contact" },
      ],
    });

    return list;
  }, [tour, durationText, hasYala, hasSigiriya, hasElla, hasKandy]);

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [openIds, setOpenIds] = useState<string[]>([tourFaqs[0]?.id || ""]);

  // Auto-expand and scroll to question if URL contains a deep-link hash (e.g. #tour-pricing-and-what-is-included)
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash.replace("#", "");
      const matchingFaq = tourFaqs.find((item) => item.id === hash);
      if (matchingFaq) {
        setSelectedCategory("all");
        setOpenIds((prev) => (prev.includes(hash) ? prev : [...prev, hash]));
        const element = document.getElementById(hash);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: "smooth", block: "center" });
          }, 150);
        }
      }
    }
  }, [tourFaqs]);

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs = useMemo(() => {
    if (selectedCategory === "all") return tourFaqs;
    return tourFaqs.filter((item) => item.category === selectedCategory);
  }, [selectedCategory, tourFaqs]);

  // Synchronized Comprehensive JSON-LD FAQPage Schema for this specific Tour
  const schemaData = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `https://www.yalawildlife.com/tours/${tour.slug}#tour-faq`,
      name: `Frequently Asked Questions About ${tour.title}`,
      description: `Official 2026 traveler FAQ regarding ${tour.title} across ${tour.route}, including private driver guide, pricing, hotels, and custom route planning.`,
      url: `https://www.yalawildlife.com/tours/${tour.slug}#tour-faq`,
      inLanguage: "en-US",
      publisher: {
        "@type": "Organization",
        name: "Yala Wildlife Tour Expeditions",
        url: "https://www.yalawildlife.com",
        logo: "https://www.yalawildlife.com/logo.png",
      },
      mainEntity: tourFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        url: `https://www.yalawildlife.com/tours/${tour.slug}#${faq.id}`,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.detailedContent
            ? `${faq.answer} ${faq.detailedContent}`
            : faq.answer,
        },
      })),
    };
  }, [tour, tourFaqs]);

  return (
    <section
      id="tour-faq"
      className="relative w-full py-16 md:py-24 overflow-hidden z-10 cv-auto"
      aria-label={`Frequently Asked Questions About ${tour.title}`}
      style={{
        fontFamily:
          '"Google Sans", "Open Sans", Roboto, -apple-system, BlinkMacSystemFont, Arial, sans-serif',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        
        {/* --- 1. SECTION HEADER (INLINE-BLOCK ISLANDS) --- */}
        <div className="flex flex-col items-center justify-center w-full mb-10 text-center space-y-3">
          {/* Main Heading Island */}
          <div>
            <h2 className="inline-block bg-black/80 px-6 sm:px-8 py-3.5 rounded-2xl shadow-2xl text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight transform-gpu">
              FAQs About {tour.title}
            </h2>
          </div>

          {/* Subtitle Island */}
          <div>
            <p className="inline-block bg-black/80 px-6 py-3 rounded-2xl shadow-2xl text-[13px] sm:text-[14.5px] text-white/70 font-medium max-w-2xl leading-relaxed transform-gpu">
              Essential answers regarding private transport, SLTDA-licensed driver guide, hotel accommodations, route pacing, and custom options for this {durationText} tour.
            </p>
          </div>
        </div>

        {/* --- 2. CATEGORY FILTER PILLS (BORDERLESS ISLANDS) --- */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {TOUR_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-[12px] font-bold tracking-wide transition-all shadow-xl cursor-pointer transform-gpu ${
                  isSelected
                    ? "bg-[#00ff00] text-black font-extrabold shadow-[0_0_15px_rgba(0,255,0,0.3)]"
                    : "bg-black/80 text-white/70 hover:text-white hover:bg-black/95"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* --- 3. GOOGLE 'PEOPLE ALSO ASK' INDIVIDUAL ISLAND ACCORDIONS --- */}
        <div className="max-w-4xl mx-auto space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="bg-black/80 rounded-2xl py-10 px-6 text-center text-white/50 shadow-2xl">
              <p className="text-sm font-medium">No questions available in this category.</p>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openIds.includes(faq.id);
              const headerId = `${baseId}-h-${faq.id}`;
              const panelId = `${baseId}-p-${faq.id}`;

              return (
                <div
                  key={faq.id}
                  id={faq.id}
                  className="w-full inline-block bg-black/80 hover:bg-black/90 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl transition-all duration-300 transform-gpu scroll-mt-24"
                >
                  <h3>
                    <button
                      id={headerId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggleItem(faq.id)}
                      type="button"
                      className="w-full flex items-center justify-between gap-4 text-left group transition-colors focus:outline-none cursor-pointer"
                    >
                      <span className="text-[15px] sm:text-[16.5px] font-bold text-white group-hover:text-[#00ff00] transition-colors leading-snug">
                        {faq.question}
                      </span>
                      <span
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                          isOpen
                            ? "bg-[#00ff00] text-black rotate-180"
                            : "bg-white/10 text-white/60 group-hover:bg-[#00ff00] group-hover:text-black"
                        }`}
                        aria-hidden="true"
                      >
                        <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                      </span>
                    </button>
                  </h3>

                  {/* Rendered in HTML for search crawlers & AI bots */}
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={headerId}
                    aria-hidden={!isOpen}
                    className={`transition-all duration-300 ease-in-out ${
                      isOpen
                        ? "max-h-[800px] opacity-100 pt-3.5"
                        : "max-h-0 opacity-0 overflow-hidden pointer-events-none"
                    }`}
                  >
                    {/* Direct Factual Response (Answer Engine Optimization Target) */}
                    <p className="text-[14px] sm:text-[15px] text-white/95 leading-relaxed font-normal mb-2.5">
                      {faq.answer}
                    </p>

                    {/* Detailed Context & Source Verification (Generative Engine Optimization Target) */}
                    {faq.detailedContent && (
                      <p className="text-[13px] sm:text-[13.5px] text-white/70 leading-relaxed font-normal mb-3">
                        {faq.detailedContent}
                      </p>
                    )}

                    {/* Internal Navigation Anchor Chips */}
                    {faq.links && faq.links.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
                        {faq.links.map((link, idx) => (
                          <Link
                            key={idx}
                            href={link.href}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-[#00ff00]/10 text-white/80 hover:text-[#00ff00] text-xs font-medium transition-colors"
                          >
                            <span>{link.label}</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* --- 4. CONTEXTUAL TOURS ASSISTANCE ISLAND --- */}
        <div className="mt-12 max-w-4xl mx-auto bg-black/80 rounded-3xl p-6 sm:p-8 shadow-2xl transform-gpu">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5 text-center md:text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Have custom requests for this {durationText} expedition?
              </h3>
              <p className="text-sm text-white/70 max-w-lg leading-relaxed">
                Connect directly with our local tour coordinators on WhatsApp (+94 778 158 004) to tweak this route, upgrade hotels, or get an instant group quote.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
              <a
                href="#booking-form"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#00ff00] hover:bg-[#00ff00]/90 text-black font-extrabold text-sm transition-all shadow-lg"
              >
                <span>Book This Tour</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </a>

              <a
                href={`https://wa.me/94778158004?text=${encodeURIComponent(
                  `Hello Yala Wildlife, I am interested in booking or customizing the ${tour.title} (${durationText}).`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4 text-[#00ff00]" />
                <span>WhatsApp Chat</span>
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* JSON-LD Schema (100% synchronized with visible content) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaData),
        }}
      />
    </section>
  );
}
