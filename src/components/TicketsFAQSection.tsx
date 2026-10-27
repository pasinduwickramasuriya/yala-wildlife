"use client";

import React, { useState, useMemo, useId, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, MessageCircle, ArrowRight } from "lucide-react";
import { TICKETS_FAQS, TICKETS_CATEGORIES } from "@/data/tickets-faqs";

export default function TicketsFAQSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [openIds, setOpenIds] = useState<string[]>([TICKETS_FAQS[0]?.id || ""]);
  const baseId = useId();

  // Auto-expand and scroll to question if URL contains a deep-link hash (e.g. #how-to-buy-yala-tickets-online)
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash.replace("#", "");
      const matchingFaq = TICKETS_FAQS.find((item) => item.id === hash);
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
  }, []);

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs = useMemo(() => {
    if (selectedCategory === "all") return TICKETS_FAQS;
    return TICKETS_FAQS.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  // Synchronized Comprehensive JSON-LD FAQPage Schema for Tickets Page
  const schemaData = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": "https://www.yalawildlife.com/yala-national-park-tickets#tickets-faq",
      name: "Frequently Asked Questions About Yala National Park Tickets & DWC Permits",
      description:
        "Official 2026 answers on Yala National Park entrance tickets, dynamic DWC pricing calculator, foreign vs. local admission, SAARC rates, VAT formula, and gate queue clearance.",
      url: "https://www.yalawildlife.com/yala-national-park-tickets#tickets-faq",
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
          name: "Yala National Park",
          sameAs: "https://en.wikipedia.org/wiki/Yala_National_Park",
        },
        {
          "@type": "GovernmentOrganization",
          name: "Department of Wildlife Conservation Sri Lanka",
          sameAs: "https://en.wikipedia.org/wiki/Department_of_Wildlife_Conservation_(Sri_Lanka)",
        },
      ],
      mainEntity: TICKETS_FAQS.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        url: `https://www.yalawildlife.com/yala-national-park-tickets#${faq.id}`,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.detailedContent
            ? `${faq.answer} ${faq.detailedContent}`
            : faq.answer,
        },
      })),
    };
  }, []);

  return (
    <section
      id="tickets-faq"
      className="relative w-full py-16 md:py-24 overflow-hidden z-10 cv-auto"
      aria-label="Frequently Asked Questions About Yala National Park Tickets"
      style={{
        fontFamily: '"Google Sans", Arial, Helvetica, sans-serif',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        
        {/* --- 1. SECTION HEADER (INLINE-BLOCK ISLANDS) --- */}
        <div className="flex flex-col items-center justify-center w-full mb-10 text-center space-y-3">
          {/* Main Heading Island */}
          <div>
            <h2 className="inline-block bg-black/80 px-6 sm:px-8 py-3.5 rounded-2xl shadow-2xl text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight transform-gpu">
              FAQs About Yala Tickets & Permits
            </h2>
          </div>

          {/* Subtitle Island */}
          <div>
            <p className="inline-block bg-black/80 px-6 py-3 rounded-2xl shadow-2xl text-[13px] sm:text-[14.5px] text-white/70 font-medium max-w-2xl leading-relaxed transform-gpu">
              Verified answers on foreign visitor ticket prices, 18% VAT calculations, DWC permit procurement, and gate queue bypass.
            </p>
          </div>
        </div>

        {/* --- 2. CATEGORY FILTER PILLS (BORDERLESS ISLANDS) --- */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {TICKETS_CATEGORIES.map((cat) => {
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

        {/* --- 4. CONTEXTUAL TICKETS ASSISTANCE ISLAND --- */}
        <div className="mt-12 max-w-4xl mx-auto bg-black/80 rounded-3xl p-6 sm:p-8 shadow-2xl transform-gpu">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5 text-center md:text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Ready to calculate and secure your park permits?
              </h3>
              <p className="text-sm text-white/70 max-w-lg leading-relaxed">
                Use our real-time ticket calculator above to get instant LKR and USD totals, or chat with our permit dispatchers on WhatsApp (+94 778 158 004).
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById("ticket-calculator") || document.querySelector("main");
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
                  } else {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#00ff00] hover:bg-[#00ff00]/90 text-black font-extrabold text-sm transition-all shadow-lg cursor-pointer"
              >
                <span>Calculate Tickets</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <a
                href="https://wa.me/94778158004?text=Hello%20Yala%20Wildlife%2C%20I%20have%20a%20question%20regarding%20Yala%20National%20Park%20entrance%20tickets%20and%20permits."
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
