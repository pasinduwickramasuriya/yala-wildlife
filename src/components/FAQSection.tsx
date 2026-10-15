"use client";

import React, { useState, useMemo, useId } from "react";
import Link from "next/link";
import { ChevronDown, Sparkles, MessageCircle, ArrowRight } from "lucide-react";
import { FAQS } from "@/data/faqs";

const CATEGORIES = [
  { id: "all", label: "All Questions" },
  { id: "packages", label: "Safari Packages & Pricing" },
  { id: "wildlife", label: "Leopards & Wildlife" },
  { id: "timings", label: "Timings & Seasons" },
  { id: "logistics", label: "Gates & Logistics" },
  { id: "booking", label: "Booking & Policies" },
  { id: "safety", label: "Gear & Safety" },
];

export default function FAQSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [openIds, setOpenIds] = useState<string[]>([FAQS[0]?.id || ""]);
  const baseId = useId();

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs = useMemo(() => {
    if (selectedCategory === "all") return FAQS;
    return FAQS.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  // Synchronized JSON-LD FAQPage Schema (100% matched to visible content)
  const schemaData = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      name: "Frequently Asked Questions About Yala National Park Safari",
      url: "https://www.yalawildlife.com",
      mainEntity: filteredFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.detailedContent
            ? `${faq.answer} ${faq.detailedContent}`
            : faq.answer,
        },
      })),
    };
  }, [filteredFaqs]);

  return (
    <section
      id="faq"
      className="relative w-full py-16 md:py-24 overflow-hidden z-10 cv-auto select-none"
      aria-label="Frequently Asked Questions"
      style={{
        fontFamily:
          '"Google Sans", "Open Sans", Roboto, -apple-system, BlinkMacSystemFont, Arial, sans-serif',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        
        {/* --- 1. SECTION HEADER (INLINE-BLOCK ISLANDS) --- */}
        <div className="flex flex-col items-center justify-center w-full mb-10 text-center space-y-3">
          {/* Eyebrow Island */}
          {/* <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-black/80 rounded-full shadow-2xl transform-gpu">
            <span className="w-2 h-2 rounded-full bg-[#00ff00] animate-pulse shadow-[0_0_8px_#00ff00]" />
            <span className="text-[12px] font-black uppercase tracking-[0.2em] text-[#00ff00]">
              Official Yala FAQ Desk
            </span>
          </div> */}

          {/* Main Heading Island */}
          <div>
            <h2 className="inline-block bg-black/80 px-6 sm:px-8 py-3.5 rounded-2xl shadow-2xl text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight transform-gpu">
              Frequently Asked Questions About Yala Safari{" "}
              {/* <span className="text-[#00ff00]">Yala Safari</span> */}
            </h2>
          </div>

          {/* Subtitle Island */}
          <div>
            <p className="inline-block bg-black/80 px-6 py-3 rounded-2xl shadow-2xl text-[13px] sm:text-[14.5px] text-white/70 font-medium max-w-2xl leading-relaxed transform-gpu">
              Verified answers to essential questions about Yala safari packages, real 2026 prices, leopard spotting odds, gate access, and booking policies.
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
                  className="w-full inline-block bg-black/80 hover:bg-black/90 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl transition-all duration-300 transform-gpu"
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
                    className={`transition-all duration-300 ease-in-out ${
                      isOpen
                        ? "max-h-[600px] opacity-100 pt-3.5"
                        : "max-h-0 opacity-0 overflow-hidden pointer-events-none"
                    }`}
                  >
                    {/* Direct Factual Response */}
                    <p className="text-[14px] sm:text-[15px] text-white/90 leading-relaxed font-normal mb-2">
                      {faq.answer}
                    </p>

                    {/* Detailed Context */}
                    {faq.detailedContent && (
                      <p className="text-[13px] sm:text-[14px] text-white/60 leading-relaxed mb-3 font-normal">
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
              {/* <div className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-wider text-[#00ff00]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>24/7 Ranger Dispatch & Support</span>
              </div> */}
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Have a specific question about your safari?
              </h3>
              <p className="text-sm text-white/70 max-w-lg leading-relaxed">
                Connect directly with our local naturalist guides on WhatsApp (+94 778 158 004) for custom departure times, private jeeps, and hotel transfers.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
              <Link
                href="/safari-packages"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#00ff00] hover:bg-[#00ff00]/90 text-black font-extrabold text-sm transition-all shadow-lg"
              >
                <span>View Packages</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </Link>

              <a
                href="https://wa.me/94778158004?text=Hello%20Yala%20Wildlife%2C%20I%20have%20a%20question%20about%20booking%20a%20Yala%20safari."
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