"use client";

import React, { useState, useMemo, useId, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, MessageCircle, ArrowRight } from "lucide-react";

export interface PackageDetailFAQItem {
  id: string;
  question: string;
  answer: string;
  detailedContent?: string;
  category: "pricing" | "schedule" | "vehicle" | "wildlife" | "booking";
  categoryLabel: string;
  links?: { label: string; href: string }[];
}

export interface PackageDetailData {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  mealPrice: number;
  ticketPrice: number;
  imageUrl?: string;
}

const CATEGORIES = [
  { id: "all", label: "All Questions" },
  { id: "pricing", label: "Pricing & Tickets" },
  { id: "schedule", label: "Schedule & Pickups" },
  { id: "vehicle", label: "Jeep & Tracker" },
  { id: "wildlife", label: "Wildlife & Sightings" },
  { id: "booking", label: "Booking & Policies" },
];

export default function PackageDetailFAQSection({ pkg }: { pkg: PackageDetailData }) {
  const baseId = useId();

  // Package intelligence flags
  const nameLower = pkg.name.toLowerCase();
  const slugLower = pkg.slug.toLowerCase();

  const isBundala = nameLower.includes("bundala") || slugLower.includes("bundala");
  const isMorning = nameLower.includes("morning") || slugLower.includes("morning");
  const isEvening = nameLower.includes("evening") || nameLower.includes("afternoon") || slugLower.includes("evening");
  const isFullDay = nameLower.includes("full day") || slugLower.includes("full-day") || slugLower.includes("12-hours");
  const isShared = nameLower.includes("shared") || slugLower.includes("shared");
  const isSevenHours = nameLower.includes("7 hours") || slugLower.includes("7-hours");

  const parkName = isBundala ? "Bundala National Park" : "Yala National Park";
  const blockName = isBundala ? "Bundala Ramsar Wetland" : "Yala Block 1 (Ruhuna)";

  // Build tailor-made FAQs for this exact package
  const packageFaqs: PackageDetailFAQItem[] = useMemo(() => {
    // 1. Schedule & Pickup FAQ
    let scheduleAnswer = `Hotel pickup is scheduled between 4:45 AM and 5:15 AM from Tissamaharama, Kirinda, or Kataragama hotels to enter ${parkName} right at 6:00 AM gate opening. The safari concludes around 10:00 AM to 11:30 AM.`;
    if (isEvening) {
      scheduleAnswer = `Hotel pickup is between 2:00 PM and 2:30 PM to enter ${parkName} by 3:00 PM, concluding at 6:30 PM park gate closure after sunset.`;
    } else if (isFullDay) {
      scheduleAnswer = `This 12-hour full-day expedition begins with hotel pickup at 5:00 AM to enter at 6:00 AM opening, concluding at 6:00 PM sunset, with a relaxing midday rest break at Patanangala beach.`;
    } else if (isSevenHours) {
      scheduleAnswer = `Hotel pickup begins at 5:00 AM for a 7-hour extended game drive, concluding around 1:00 PM to 1:30 PM before midday heat peaks.`;
    }

    // 2. Pricing Breakdown FAQ
    const pricingAnswer = isShared
      ? `The ${pkg.name} is priced at $${pkg.price.toFixed(0)} USD per seat (or equivalent in LKR at the live daily exchange rate), which includes your safari jeep transport, tracker, and mineral water.`
      : `The ${pkg.name} is priced from $${pkg.price.toFixed(0)} USD per private jeep hire. Optional park entrance permits ($${pkg.ticketPrice > 0 ? pkg.ticketPrice : 46}/person) and meals ($${pkg.mealPrice > 0 ? pkg.mealPrice : 10}/person) can be bundled directly in the booking form.`;

    const pricingDetailed = isShared
      ? "Shared safaris are capped at a maximum of 6 passengers per vehicle to guarantee every traveler a window seat and ample camera space with zero hidden surcharges."
      : "Our private jeep rates are all-inclusive of vehicle road permits, fuel, expert SLTDA driver guide, and complimentary local hotel pickup with zero hidden booking fees.";

    // 3. Wildlife Sightings FAQ
    let wildlifeAnswer = `During this morning drive, wildlife activity is at its daily peak as Sri Lankan leopards (Panthera pardus koti) and sloth bears patrol trail borders before the heat sets in, alongside wild Asian elephants, spotted deer, and crocodiles.`;
    if (isBundala) {
      wildlifeAnswer = `Bundala is Sri Lanka's premier Ramsar wetland biosphere reserve, home to over 200 bird species including greater flamingos, painted storks, sea eagles, mugger and saltwater crocodiles, Asian elephants, and langurs.`;
    } else if (isEvening) {
      wildlifeAnswer = `Afternoon safaris are exceptional for spotting large Asian elephant herds gathering around visible waterholes, stunning golden-hour landscape photography, and leopards emerging onto warm rocks at dusk.`;
    } else if (isFullDay) {
      wildlifeAnswer = `A full-day safari statistically offers the highest probability of encountering Sri Lanka's 'Big Three' (leopard, Asian elephant, and sloth bear) by covering remote river valleys and waterholes across Blocks 1 and 2.`;
    }

    return [
      {
        id: "tour-schedule-pickup-timing",
        question: `What time does the ${pkg.name} start, and when is hotel pickup?`,
        answer: scheduleAnswer,
        detailedContent: `Our driver meets you directly in your hotel lobby. Gate queue clearance is fastest during early morning departures, which is why we recommend being ready 10 minutes prior to pickup.`,
        category: "schedule",
        categoryLabel: "Schedule & Pickups",
        links: [
          { label: "Pickup & Transfer Info", href: "/pickup-dropoff" },
          { label: "All Safari Packages", href: "/safari-packages" },
        ],
      },
      {
        id: "tour-pricing-and-inclusions",
        question: `How much does the ${pkg.name} cost, and what is included?`,
        answer: pricingAnswer,
        detailedContent: pricingDetailed,
        category: "pricing",
        categoryLabel: "Pricing & Tickets",
        links: [
          { label: "Ticket Cost Calculator", href: "/yala-national-park-tickets" },
          { label: "View All Packages", href: "/safari-packages" },
        ],
      },
      {
        id: "park-entrance-permits-handling",
        question: `Are ${parkName} entrance tickets included, or do we purchase them at the gate?`,
        answer: `You can bundle official Department of Wildlife Conservation (DWC) entrance permits directly when booking this tour online, or purchase them on arrival at the park gate ticket office.`,
        detailedContent: `Pre-booking permits with your package allows you to bypass the long early-morning ticket counter queues at Palatupana or Katagamuwa gate, entering trails immediately when gates open at 6:00 AM. Foreign adult permits are approximately $25 USD + government fees and 18% VAT.`,
        category: "pricing",
        categoryLabel: "Pricing & Tickets",
        links: [
          { label: "Check Gate Ticket Rates", href: "/yala-national-park-tickets" },
          { label: "Contact Dispatch Team", href: "/contact" },
        ],
      },
      {
        id: "safari-vehicle-type-and-comfort",
        question: `What type of safari vehicle is used for the ${pkg.name}?`,
        answer: `This tour is operated strictly in customized Japanese Toyota Hilux 4x4 jeeps engineered for rugged off-road park terrain.`,
        detailedContent: `Each jeep features three-tiered forward-facing cushioned seating, an open-frame roll cage for 360-degree photography, whisper-quiet diesel engine, and roll-down storm curtains for weather protection. We never use cramped Indian Mahindra utility jeeps with flat side-benches.`,
        category: "vehicle",
        categoryLabel: "Jeep & Tracker",
        links: [
          { label: "About Our Safari Fleet", href: "/about" },
          { label: "Customer Reviews", href: "/reviews" },
        ],
      },
      {
        id: "wildlife-sightings-and-chances",
        question: `What wildlife can I expect to see on the ${pkg.name}?`,
        answer: wildlifeAnswer,
        detailedContent: `Because ${parkName} is an unfenced 978 km² wilderness, wild animal sightings cannot be 100% guaranteed by law. However, our naturalist drivers track fresh pugmarks, deer alarm barks, and radio networks to achieve industry-leading sighting success rates.`,
        category: "wildlife",
        categoryLabel: "Wildlife & Sightings",
        links: [
          { label: "Read Wildlife Blog", href: "/blog" },
          { label: "Verified Guest Reviews", href: "/reviews" },
        ],
      },
      {
        id: "shared-vs-private-tour-format",
        question: isShared
          ? `How does the shared safari format work for solo travelers and couples?`
          : `Is this a private safari jeep or shared with other tourists?`,
        answer: isShared
          ? `Our shared tours allow solo travelers and couples to book individual seats, sharing vehicle costs while maintaining luxury comfort in a Toyota Hilux jeep.`
          : `This is an exclusive private safari jeep reserved solely for you and your travel party, offering flexible driving pace and undivided attention from your naturalist tracker.`,
        detailedContent: isShared
          ? `We enforce a strict maximum of 6 passengers per shared vehicle so that every guest enjoys an unobstructed window seat and generous camera clearance.`
          : `Unlike shared groups, a private tour allows you to stay at animal sightings as long as you wish and focus specifically on your personal photography or birding interests.`,
        category: "vehicle",
        categoryLabel: "Jeep & Tracker",
        links: [
          { label: "Explore All Packages", href: "/safari-packages" },
          { label: "Safety Standards", href: "/about" },
        ],
      },
      {
        id: "hotel-pickup-and-intercity-transfers",
        question: `Where do you provide hotel pickup, and can you pick up from Ella or Galle?`,
        answer: `We provide complimentary hotel pickup and drop-off in our 4x4 safari jeep for all hotels located in Tissamaharama, Kirinda, Palatupana, and Kataragama.`,
        detailedContent: `For travelers staying outside the immediate park area (such as Ella, Galle, Mirissa, Weligama, Tangalle, or Colombo), we coordinate private air-conditioned car or KDH van intercity transfers directly to our safari staging point.`,
        category: "schedule",
        categoryLabel: "Schedule & Pickups",
        links: [
          { label: "Book Intercity Transport", href: "/pickup-dropoff" },
          { label: "Contact Dispatcher", href: "/contact" },
        ],
      },
      {
        id: "cancellation-and-date-rescheduling",
        question: `What is the cancellation and rescheduling policy for this booking?`,
        answer: `Cancellations submitted at least 48 hours prior to departure receive a 100% full refund. Cancellations made between 24 and 48 hours receive a 50% refund.`,
        detailedContent: `Date rescheduling is completely free of charge up to 24 hours prior to departure, subject to jeep availability. If ${parkName} is officially closed by the Department of Wildlife Conservation due to extreme weather, you will receive an immediate full refund or free transfer to an alternate park.`,
        category: "booking",
        categoryLabel: "Booking & Policies",
        links: [
          { label: "Terms & Conditions", href: "/legal" },
          { label: "Contact Support Desk", href: "/contact" },
        ],
      },
      {
        id: "what-to-wear-and-pack-for-safari",
        question: `What should I wear and bring for the ${pkg.name}?`,
        answer: `Wear comfortable, lightweight cotton clothing in neutral earth tones (khaki, beige, olive green). Avoid bright neon colors or solid white.`,
        detailedContent: `Recommended packing: a sun hat with a chin strap, sunglasses, high-SPF sunscreen, insect repellent, telephoto camera gear (200mm–600mm recommended), binoculars, and your original passport for gate permit verification. Single-use plastic bags and bottles are strictly prohibited inside the park.`,
        category: "booking",
        categoryLabel: "Booking & Policies",
        links: [
          { label: "Safari Packing Guide", href: "/blog" },
          { label: "View Package Details", href: `/safari-packages/${pkg.slug}` },
        ],
      },
    ];
  }, [pkg, isBundala, isMorning, isEvening, isFullDay, isShared, isSevenHours, parkName]);

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [openIds, setOpenIds] = useState<string[]>([packageFaqs[0]?.id || ""]);

  // Auto-expand and scroll to question if URL contains a deep-link hash (e.g. #tour-pricing-and-inclusions)
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash.replace("#", "");
      const matchingFaq = packageFaqs.find((item) => item.id === hash);
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
  }, [packageFaqs]);

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs = useMemo(() => {
    if (selectedCategory === "all") return packageFaqs;
    return packageFaqs.filter((item) => item.category === selectedCategory);
  }, [selectedCategory, packageFaqs]);

  // Synchronized Comprehensive JSON-LD FAQPage Schema specifically for this single package URL
  const schemaData = useMemo(() => {
    const pageUrl = `https://www.yalawildlife.com/safari-packages/${pkg.slug}`;
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      name: `Frequently Asked Questions About ${pkg.name}`,
      description: `Verified 2026 answers about ${pkg.name} pricing, inclusions, departure times, Toyota Hilux jeeps, and ${parkName} booking policies.`,
      url: `${pageUrl}#faq`,
      inLanguage: "en-US",
      publisher: {
        "@type": "Organization",
        name: "Yala Wildlife Safari",
        url: "https://www.yalawildlife.com",
        logo: "https://www.yalawildlife.com/logo.png",
      },
      about: [
        {
          "@type": "Place",
          name: parkName,
          sameAs: isBundala
            ? "https://en.wikipedia.org/wiki/Bundala_National_Park"
            : "https://en.wikipedia.org/wiki/Yala_National_Park",
        },
        {
          "@type": "Taxon",
          name: "Sri Lankan Leopard",
          sameAs: "https://en.wikipedia.org/wiki/Sri_Lankan_leopard",
        },
        {
          "@type": "GovernmentOrganization",
          name: "Department of Wildlife Conservation Sri Lanka",
          sameAs: "https://en.wikipedia.org/wiki/Department_of_Wildlife_Conservation_(Sri_Lanka)",
        },
      ],
      mainEntity: packageFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        url: `${pageUrl}#${faq.id}`,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.detailedContent
            ? `${faq.answer} ${faq.detailedContent}`
            : faq.answer,
        },
      })),
    };
  }, [pkg, packageFaqs, parkName, isBundala]);

  return (
    <section
      id="package-faq"
      className="relative w-full py-16 md:py-24 overflow-hidden z-10 cv-auto"
      aria-label={`Frequently Asked Questions About ${pkg.name}`}
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
              FAQs {pkg.name.split("(")[0].trim()}
            </h2>
          </div>

          {/* Subtitle Island */}
          <div>
            <p className="inline-block bg-black/80 px-6 py-3 rounded-2xl shadow-2xl text-[13px] sm:text-[14.5px] text-white/70 font-medium max-w-2xl leading-relaxed transform-gpu">
              Verified answers to common questions about {pkg.name} pricing, gate permits, hotel pickup windows, and Toyota Hilux safari jeeps.
            </p>
          </div>
        </div>

        {/* --- 2. CATEGORY FILTER PILLS (BORDERLESS ISLANDS) --- */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {CATEGORIES.map((cat) => {
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
                      <p className="text-[13px] sm:text-[14px] text-white/70 leading-relaxed mb-3 font-normal border-l-2 border-[#00ff00]/40 pl-3">
                        {faq.detailedContent}
                      </p>
                    )}

                    {/* Google-style Related Entity Chips */}
                    {faq.links && faq.links.length > 0 && (
                      <div className="flex flex-wrap items-center gap-2 pt-2">
                        <span className="text-[10px] uppercase font-bold text-white/40 tracking-wider">
                          Related:
                        </span>
                        {faq.links.map((link, lIdx) => (
                          <Link
                            key={lIdx}
                            href={link.href}
                            className="inline-flex items-center gap-1 px-3 py-1 text-[11.5px] font-semibold rounded-full bg-white/10 hover:bg-[#00ff00] text-white/80 hover:text-black transition-all shadow-sm"
                          >
                            <span>{link.label}</span>
                            <ArrowRight className="w-3 h-3 opacity-70" />
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

        {/* --- 4. CONTEXTUAL SAFARI ASSISTANCE ISLAND --- */}
        <div className="mt-12 max-w-4xl mx-auto bg-black/80 rounded-3xl p-6 sm:p-8 shadow-2xl transform-gpu">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5 text-center md:text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Ready to book your {pkg.name.split("(")[0].trim()}?
              </h3>
              <p className="text-sm text-white/70 max-w-lg leading-relaxed">
                Connect directly with our 24/7 ranger dispatch team on WhatsApp (+94 778 158 004) for custom pickup times, private jeeps, or instant date reservations.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
              <a
                href="#booking-section"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#00ff00] hover:bg-[#00ff00]/90 text-black font-extrabold text-sm transition-all shadow-lg"
              >
                <span>Book This Tour</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </a>

              <a
                href={`https://wa.me/94778158004?text=Hello%20Yala%20Wildlife%2C%20I%20have%20a%20question%20about%20booking%20the%20${encodeURIComponent(pkg.name)}.`}
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

      {/* Synchronized JSON-LD FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaData),
        }}
      />
    </section>
  );
}
