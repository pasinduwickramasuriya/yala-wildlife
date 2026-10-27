"use client";

import React, { useState, useMemo, useId, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, MessageCircle, ArrowRight } from "lucide-react";

export interface BlogDetailFAQItem {
  id: string;
  question: string;
  answer: string;
  detailedContent?: string;
  category: "topic" | "safari" | "photography" | "practical" | "booking";
  categoryLabel: string;
  links?: { label: string; href: string }[];
}

export interface BlogDetailData {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  slug: string;
  createdAt: Date;
  author?: string;
}

const CATEGORIES = [
  { id: "all", label: "All Questions" },
  { id: "topic", label: "Story Insights" },
  { id: "safari", label: "Safari Timing" },
  { id: "photography", label: "Photography & Gear" },
  { id: "practical", label: "Park Rules & Packing" },
  { id: "booking", label: "Tours & Bookings" },
];

export default function BlogDetailFAQSection({ blog }: { blog: BlogDetailData }) {
  const baseId = useId();

  const titleLower = blog.title.toLowerCase();
  const contentLower = blog.content.toLowerCase();

  const isLeopard = titleLower.includes("leopard") || contentLower.includes("leopard");
  const isElephant = titleLower.includes("elephant") || contentLower.includes("elephant");
  const isBear = titleLower.includes("bear") || contentLower.includes("bear") || contentLower.includes("palu");
  const isPhoto = titleLower.includes("photo") || titleLower.includes("camera") || contentLower.includes("camera") || contentLower.includes("lens");
  const isBird = titleLower.includes("bird") || contentLower.includes("bird") || contentLower.includes("bundala");

  // Dynamically tailor FAQs to this specific blog post
  const articleFaqs: BlogDetailFAQItem[] = useMemo(() => {
    let topicAnswer = `This field guide focuses on ${blog.title}, offering practical insights compiled directly by our veteran naturalist tracking team in Yala National Park.`;
    if (isLeopard) {
      topicAnswer = `This report details Sri Lankan leopard (Panthera pardus kotiya) territorial behavior, prime rock formations, and time-tested tracking techniques used across Yala Block 1.`;
    } else if (isElephant) {
      topicAnswer = `This article covers Asian elephant social structures, matriarchal herds, musth bulls, and the best waterhole locations for peaceful herd observation in Yala.`;
    } else if (isBear) {
      topicAnswer = `This guide explores Sri Lankan sloth bear foraging patterns, termite mound excavations, and the high-activity palu fruiting season between May and July.`;
    } else if (isPhoto) {
      topicAnswer = `This article provides essential wildlife photography techniques: managing harsh dry-zone light, choosing between 100–400mm and 150–600mm lenses, and vehicle positioning.`;
    } else if (isBird) {
      topicAnswer = `This field guide outlines over 215 bird species found in southeastern Sri Lanka, highlighting resident raptors, migratory waterfowl, and Ramsar wetland hot spots.`;
    }

    let timingQuestion = "What is the best time of day to experience the wildlife featured in this story?";
    let timingAnswer = "Early morning safaris (6:00 AM – 9:30 AM) and late afternoon drives (3:00 PM – 6:00 PM) provide the highest encounter rates as wildlife avoids the harsh midday tropical heat.";
    if (isLeopard) {
      timingQuestion = "When is the optimal time to track leopards in Yala National Park?";
      timingAnswer = "Leopards are most frequently sighted between 6:00 AM and 8:30 AM as they bask on sun-warmed rocks, and again after 4:00 PM when evening hunting begins.";
    } else if (isElephant) {
      timingQuestion = "When is the best time of day to watch elephant herds in Yala?";
      timingAnswer = "Afternoon safaris starting at 2:30 PM offer superior elephant sightings as breeding herds gather at lakes and coastal lagoons to drink, bathe, and dust-coat.";
    } else if (isBear) {
      timingQuestion = "What is the best time of year to see sloth bears in Yala?";
      timingAnswer = "The annual palu fruit ripening season between May and July offers the highest likelihood of seeing sloth bears climbing trees and feasting on sweet berries.";
    }

    return [
      {
        id: "field-guide-key-insights",
        question: `What are the key insights shared in "${blog.title}"?`,
        answer: topicAnswer,
        detailedContent: `Our field reports are written by active safari naturalists who spend over 250 days a year tracking wildlife in Yala, providing travelers with verified, real-world advice rather than generic travel summaries.`,
        category: "topic",
        categoryLabel: "Story Insights",
        links: [
          { label: "All Wildlife Stories", href: "/blog" },
          { label: "Safari Packages", href: "/safari-packages" },
        ],
      },
      {
        id: "optimal-safari-timing-and-season",
        question: timingQuestion,
        answer: timingAnswer,
        detailedContent: `During the dry season (February to July), shrinking waterholes pull animals into open view along scrub margins, dramatically increasing your encounter odds. A 12-hour full-day safari covers both peak morning and afternoon windows.`,
        category: "safari",
        categoryLabel: "Safari Timing",
        links: [
          { label: "Morning Safari Details", href: "/safari-packages/yala-morning-safari" },
          { label: "Full Day Safari Tour", href: "/safari-packages/yala-full-day-safari" },
        ],
      },
      {
        id: "camera-and-lens-recommendations",
        question: `What camera equipment is best for photographing wildlife like this?`,
        answer: `A telephoto zoom lens (100–400mm or 150–600mm) paired with a fast shutter speed (1/1000s or faster) and a beanbag camera support is ideal for sharp handheld shots from a safari jeep.`,
        detailedContent: `Our customized Toyota Hilux 4x4 jeeps feature open-sided roll cages offering unobstructed 360-degree photography angles, and our drivers cut vehicle motors at sightings to eliminate camera vibration.`,
        category: "photography",
        categoryLabel: "Photography & Gear",
        links: [
          { label: "View Guest Photo Gallery", href: "/gallery" },
          { label: "About Our Safari Jeeps", href: "/about" },
        ],
      },
      {
        id: "park-blocks-and-gate-entry",
        question: `Which block of Yala National Park should I visit to see this?`,
        answer: `Yala Block 1 (Ruhuna), entered through Palatupana Gate, contains the world's highest documented leopard density and is the primary sector for big cat, elephant, and sloth bear sightings.`,
        detailedContent: `Pre-booking official Department of Wildlife Conservation (DWC) permits with us enables your vehicle to bypass the 45-minute morning ticket queue, entering trails promptly upon 6:00 AM gate opening.`,
        category: "practical",
        categoryLabel: "Park Rules & Packing",
        links: [
          { label: "Park Ticket Rates", href: "/yala-national-park-tickets" },
          { label: "Reserve Safari Jeep", href: "/safari-packages" },
        ],
      },
      {
        id: "clothing-and-packing-tips",
        question: `What should I wear and pack for a safari in Yala?`,
        answer: `Wear lightweight, breathable cotton clothing in neutral earth tones (khaki, tan, olive green); bring a wide-brim hat, sunglasses, high-SPF sunscreen, and your original passport for gate inspection.`,
        detailedContent: `Avoid bright neon colors and pure white which startle animals. Single-use plastic bottles, carrier bags, and civilian camouflage clothing are strictly prohibited by Sri Lankan law inside the park.`,
        category: "practical",
        categoryLabel: "Park Rules & Packing",
        links: [
          { label: "Safety & Ethics", href: "/about" },
          { label: "Verified Reviews", href: "/reviews" },
        ],
      },
      {
        id: "how-to-book-guided-safari",
        question: `How can I book an expert-guided safari to experience this firsthand?`,
        answer: `You can reserve an all-inclusive private or shared safari directly online or via WhatsApp (+94 778 158 004), with morning, afternoon, 7-hour extended, or 12-hour full-day tour options.`,
        detailedContent: `All packages include modified Toyota Hilux 4x4 jeeps, SLTDA-licensed naturalist guides, fuel, DWC gate tickets, and complimentary hotel pickup in Tissamaharama, Kirinda, or Kataragama with zero hidden fees.`,
        category: "booking",
        categoryLabel: "Tours & Bookings",
        links: [
          { label: "Explore Safari Packages", href: "/safari-packages" },
          { label: "WhatsApp Booking Desk", href: "https://wa.me/94778158004" },
        ],
      },
    ];
  }, [blog, isLeopard, isElephant, isBear, isPhoto, isBird]);

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [openIds, setOpenIds] = useState<string[]>([articleFaqs[0]?.id || ""]);

  // Auto-expand and scroll to question if URL contains a deep-link hash
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash.replace("#", "");
      const matchingFaq = articleFaqs.find((item) => item.id === hash);
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
  }, [articleFaqs]);

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs = useMemo(() => {
    if (selectedCategory === "all") return articleFaqs;
    return articleFaqs.filter((item) => item.category === selectedCategory);
  }, [selectedCategory, articleFaqs]);

  // Synchronized Comprehensive JSON-LD FAQPage Schema for this specific Article
  const schemaData = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `https://yalawildlife.com/blog/${blog.slug}#blog-faq`,
      name: `Frequently Asked Questions About ${blog.title}`,
      description: `Expert wildlife safari answers regarding ${blog.title}, safari timing, photography gear, and Yala National Park wildlife spotting.`,
      url: `https://yalawildlife.com/blog/${blog.slug}#blog-faq`,
      inLanguage: "en-US",
      publisher: {
        "@type": "Organization",
        name: "Yala Wildlife Safari",
        url: "https://yalawildlife.com",
        logo: "https://yalawildlife.com/logo.png",
      },
      about: [
        {
          "@type": "Place",
          name: "Yala National Park",
          sameAs: "https://en.wikipedia.org/wiki/Yala_National_Park",
        },
        {
          "@type": "Taxon",
          name: "Sri Lankan Leopard",
          sameAs: "https://en.wikipedia.org/wiki/Sri_Lankan_leopard",
        },
      ],
      mainEntity: articleFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        url: `https://yalawildlife.com/blog/${blog.slug}#${faq.id}`,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.detailedContent
            ? `${faq.answer} ${faq.detailedContent}`
            : faq.answer,
        },
      })),
    };
  }, [blog, articleFaqs]);

  return (
    <section
      id="blog-faq"
      className="relative w-full py-12 md:py-16 overflow-hidden z-10 cv-auto"
      aria-label={`Frequently Asked Questions About ${blog.title}`}
      style={{
        fontFamily: '"Google Sans", Arial, Helvetica, sans-serif',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
        
        {/* --- 1. SECTION HEADER (INLINE-BLOCK ISLANDS) --- */}
        <div className="flex flex-col items-center justify-center w-full mb-8 text-center space-y-3">
          {/* Main Heading Island */}
          <div>
            <h2 className="inline-block bg-black/80 px-6 sm:px-8 py-3 rounded-2xl shadow-2xl text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight transform-gpu">
              Frequently Asked Questions
            </h2>
          </div>

          {/* Subtitle Island */}
          <div>
            <p className="inline-block bg-black/80 px-5 py-2.5 rounded-2xl shadow-2xl text-[12.5px] sm:text-[13.5px] text-white/70 font-medium max-w-xl leading-relaxed transform-gpu">
              Field answers on tracking conditions, timing, and photography tips related to this story.
            </p>
          </div>
        </div>

        {/* --- 2. CATEGORY FILTER PILLS (BORDERLESS ISLANDS) --- */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-wide transition-all shadow-xl cursor-pointer transform-gpu ${
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
        <div className="max-w-3xl mx-auto space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="bg-black/80 rounded-2xl py-8 px-6 text-center text-white/50 shadow-2xl">
              <p className="text-xs font-medium">No questions available in this category.</p>
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
                  className="w-full inline-block bg-black/80 hover:bg-black/90 rounded-2xl p-4 sm:p-5 shadow-2xl transition-all duration-300 transform-gpu scroll-mt-24"
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
                      <span className="text-[14px] sm:text-[15.5px] font-bold text-white group-hover:text-[#00ff00] transition-colors leading-snug">
                        {faq.question}
                      </span>
                      <span
                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
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
                        ? "max-h-[800px] opacity-100 pt-3"
                        : "max-h-0 opacity-0 overflow-hidden pointer-events-none"
                    }`}
                  >
                    {/* Direct Factual Response (Answer Engine Optimization Target) */}
                    <p className="text-[13.5px] sm:text-[14px] text-white/95 leading-relaxed font-normal mb-2">
                      {faq.answer}
                    </p>

                    {/* Detailed Context & Source Verification (Generative Engine Optimization Target) */}
                    {faq.detailedContent && (
                      <p className="text-[12.5px] sm:text-[13px] text-white/70 leading-relaxed font-normal mb-2.5">
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
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-[#00ff00]/10 text-white/80 hover:text-[#00ff00] text-[11px] font-medium transition-colors"
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

        {/* --- 4. CONTEXTUAL BLOG ASSISTANCE ISLAND --- */}
        <div className="mt-10 max-w-3xl mx-auto bg-black/80 rounded-2xl p-5 sm:p-6 shadow-2xl transform-gpu">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Inspired by this wildlife story?
              </h3>
              <p className="text-xs text-white/70 max-w-md leading-relaxed">
                Connect directly with our naturalist guides on WhatsApp (+94 778 158 004) to plan your safari adventure.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto shrink-0">
              <Link
                href="/safari-packages"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#00ff00] hover:bg-[#00ff00]/90 text-black font-extrabold text-xs transition-all shadow-lg"
              >
                <span>View Packages</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </Link>

              <a
                href={`https://wa.me/94778158004?text=${encodeURIComponent(
                  `Hello Yala Wildlife, I just read your article "${blog.title}" and would like to ask a few questions about booking a safari.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-all shadow-md"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#00ff00]" />
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
