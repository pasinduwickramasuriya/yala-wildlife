import type { Metadata } from "next";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import LocationMap from "@/components/LocationMap";
import { Phone, Clock, ShieldCheck, UserCheck, MessageCircle, Mail, Landmark, Globe, Printer } from "lucide-react";
import { AutoSEOWrapper } from "@/components/AutoSEOWrapper";

export const revalidate = 3600; // Enable ISR cache for 1 hour for instant TTFB

const BASE_URL = "https://www.yalawildlife.com";

// ✅ SEO-ENHANCED: Contact page metadata
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: "Contact Yala National Park | Book Your Wildlife Adventure Now",
  description: "Contact Yala Wildlife Safari for bookings and inquiries. Expert guides, guaranteed leopard sightings, luxury jeeps. Call +94-778-158-004 or email us today!",

  keywords: [
    "contact yala safari",
    "yala safari jeep",
    "yala national park",
    "yala safari national park",
    "book yala safari",
    "yala safari contact number",
    "yala safari booking",
    "yala safari phone number",
    "yala safari email",
    "yala safari tissamaharama contact",
    "sri lanka safari booking",
    "yala wildlife contact",
    "safari tours contact sri lanka",
    "yala national park booking",
    "wildlife safari contact",
    "yala safari reservation",
    "contact yala tours",
    "safari guide contact yala",
    "yala jeep safari booking",
    "private safari booking yala",
    "luxury safari contact yala",
    "yala safari customer service", "yala safari booking",
    "yala safari phone number",
    "yala safari email",
    "yala safari tissamaharama contact",
    "sri lanka safari booking",
    "yala wildlife contact",
    "safari tours contact sri lanka",
    "yala national park booking",
    "wildlife safari contact",
    "yala safari reservation",
    "contact yala tours",
    "safari guide contact yala",
    "yala jeep safari booking",
    "private safari booking yala",
    "luxury safari contact yala",
    "yala safari customer service",
    "wildlife tours sri lanka contact",
    // --- Booking Intents ---
    "contact yala safari", "book yala safari online", "yala jeep booking number",
    "yala safari price 2025", "reserve safari jeep yala", "yala national park contact",
    "safari reservation sri lanka", "yala ticket booking", "buy yala tickets",
    "private jeep hire yala", "luxury safari booking", "budget safari yala contact",

    // --- Location Specifics ---
    "safari from tissamaharama", "safari from kataragama", "safari from hambantota",
    "yala safari from colombo", "yala safari from galle", "yala safari from ella",
    "palatupana entrance contact", "katagamuwa entrance safari", "galge entrance booking",

    // --- Wildlife & Experience ---
    "leopard safari booking", "best safari guide yala", "yala bird watching tour",
    "yala photography tour", "camping in yala contact", "family safari yala",
    "morning safari booking", "full day safari price", "afternoon safari yala",

    // --- Service & Trust ---
    "yala safari customer care", "best rated safari operator", "safe safari yala",
    "experienced driver yala", "english speaking guide yala", "french speaking guide yala",
    "german speaking guide yala", "yala safari whatsapp number"
  ],

  other: {
    "geo.region": "LK-82",
    "geo.placename": "Tissamaharama, Southern Province, Sri Lanka",
    "geo.position": "6.3747;81.1185",
    "ICBM": "6.3747, 81.1185",
    "DC.title": "Contact Yala Safari Tours | Book Your Wildlife Adventure",
    "DC.creator": "Yala Wildlife Safari",
    "DC.subject": "Contact Information, Safari Booking, Yala Tours",
    "DC.description": "Contact Yala Wildlife Safari for expert-guided tours, luxury jeep services, and guaranteed wildlife sightings",
    "DC.publisher": "Yala Wildlife Safari",
    "DC.type": "Contact Page, Tourism Service",
    "DC.format": "text/html",
    "DC.identifier": `${BASE_URL}/contact`,
    "DC.language": "en",
    "business:contact_data:street_address": "Wickrama Kasingama, Tissamaharama Road",
    "business:contact_data:locality": "Tissamaharama",
    "business:contact_data:region": "Southern Province",
    "business:contact_data:postal_code": "82600",
    "business:contact_data:country_name": "Sri Lanka",
    "business:contact_data:phone_number": "+94-778-158-004",
    "business:contact_data:email": "pasindusadanjana17@gmail.com",
    "business:contact_data:website": BASE_URL,
    "robots": "index, follow, max-image-preview:large",
    "googlebot": "index, follow, max-image-preview:large",
  },

  openGraph: {
    type: "website",
    title: "Contact Yala Safari Tours | Book Your Wildlife Adventure",
    description: "Contact us for expert-guided Yala safari tours. Guaranteed leopard sightings, luxury jeeps, professional guides. Book your adventure today!",
    url: `${BASE_URL}/contact`,
    siteName: "Yala National Park",
    locale: "en_US",
    images: [
      {
        url: `${BASE_URL}/contact-yala-safari.jpg`,
        width: 1200,
        height: 630,
        alt: "Contact Yala Wildlife Safari for Expert Tours",
        type: "image/jpeg",
      }
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@yalawildlife",
    creator: "@yalawildlife",
    title: "Contact Yala Safari Tours | Book Wildlife Adventure",
    description: "Contact us for expert-guided Yala safari tours. Call +94-778-158-004 or email for bookings.",
    images: {
      url: `${BASE_URL}/contact-yala-safari.jpg`,
      alt: "Contact Yala Wildlife Safari",
    },
  },

  alternates: {
    canonical: `${BASE_URL}/contact`,
  },

  applicationName: "Yala Wildlife Safari",
  category: "Travel & Tourism",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function ContactPage() {
  return (
    <>
      <main
        className="w-full bg-white text-[#1f1f1f] selection:bg-[#00ff00] selection:text-black antialiased overflow-x-hidden"
        style={{
          fontFamily:
            '"Google Sans", "Open Sans", Roboto, -apple-system, BlinkMacSystemFont, Arial, sans-serif',
        }}
        role="main"
      >
        <div className="pt-28 sm:pt-32 pb-20 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto flex flex-col gap-12 sm:gap-16 bg-white">
          {/* =========================================
              HEADER SECTION (CENTERED GOOGLE STYLE)
          ========================================= */}
          <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto bg-white">
            <h1 className="text-4xl sm:text-5xl lg:text-5xl font-bold text-[#1f1f1f] tracking-tight leading-tight mb-4">
              Let&apos;s Plan Your Adventure
            </h1>

            <p className="text-[18px] sm:text-[18px] text-[#5f6368] font-semibold leading-relaxed">
              Experience the raw intensity of Yala. Secure your private safari jeep with our expert human agents.
            </p>
          </div>

          {/* =========================================
              MAIN CONTACT GRID (NO SHADOWS / NO BORDERS)
          ========================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-white">
            {/* ================= LEFT COLUMN ================= */}
            <div className="lg:col-span-5 flex flex-col gap-5 bg-white">
              {/* 1. Quick Customer Support Card */}
              <div className="bg-[#f8f9fa] rounded-[2.25rem] p-6 sm:p-8 flex flex-col [contain:paint]">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#1f1f1f] shrink-0">
                    <UserCheck size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#000] leading-snug">
                      Customer Service
                    </h3>
                    <p className="text-[18px] sm:text-[18px] text-[#5f6368] font-semibold leading-relaxed">
                      Online Human Agent • Instant Reply
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  {/* WhatsApp Link */}
                  <a
                    href="https://wa.me/94778158004"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 rounded-2xl bg-white hover:bg-[#00ff00] text-[#1f1f1f] transition-colors duration-150 group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <MessageCircle size={20} className="text-[#1f1f1f]" />
                      <div>
                        <div className="text-[18px] text-[#000] group-hover:text-black tracking-normal font-bold">
                          WhatsApp Hotline
                        </div>
                        <div className="text-base sm:text-lg font-bold text-[#1f1f1f] group-hover:text-black">
                          +94 778 158 004
                        </div>
                      </div>
                    </div>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00ff00] group-hover:bg-black" />
                  </a>

                  {/* Email Link */}
                  <a
                    href="mailto:pasindusadanjana17@gmail.com"
                    className="flex items-center gap-3 p-4 rounded-2xl bg-white hover:bg-[#00ff00] text-[#1f1f1f] transition-colors duration-150 group cursor-pointer"
                  >
                    <Mail size={20} className="text-[#1f1f1f] shrink-0" />
                    <div className="overflow-hidden">
                      <div className="text-[18px] text-[#000] group-hover:text-black tracking-normal font-bold">
                        Email Reservations
                      </div>
                      <div className="text-sm sm:text-base font-bold text-[#1f1f1f] group-hover:text-black truncate">
                        pasindusadanjana17@gmail.com
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              {/* 2. Official Authority Card (DWC) */}
              <div className="bg-[#f8f9fa] rounded-[2.25rem] p-6 sm:p-8 flex flex-col [contain:paint]">
                <div className="flex items-center gap-2 text-[18px] font-bold text-[#000] tracking-wider mb-4">
                  <Landmark size={25} className="text-[#000]" />
                  <span>Official Authority</span>
                </div>

                <a
                  href="https://www.dwc.gov.lk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mb-4 hover:opacity-80 transition-opacity"
                >
                  <p className="text-[18px] font-bold text-[#5f6368] mb-1">
                    Department of Wildlife Conservation
                  </p>
                  <div className="text-[18px] sm:text-[18px] text-[#5f6368] leading-relaxed font-semibold">
                    <p className="text-[18px] sm:text-[18px] text-[#5f6368] font-semibold leading-relaxed">
                      811A, Jayanthipura,
                    </p>
                    <p className="text-[18px] sm:text-[18px] text-[#5f6368] font-semibold leading-relaxed">
                      Battaramulla, Sri Lanka.
                    </p>
                  </div>
                </a>

                <div className="flex flex-col gap-2 pt-2 text-[16px] sm:text-[16px] text-[#5f6368] font-semibold">
                  <div className="flex flex-wrap gap-4">
                    <a
                      href="tel:+94112888585"
                      className="inline-flex items-center gap-1.5 hover:text-black transition-colors py-1"
                    >
                      <Phone size={13} className="text-[#1f1f1f]" />
                      <span>+94 11 2 888 585</span>
                    </a>
                    <a
                      href="tel:+94112883355"
                      className="inline-flex items-center gap-1.5 hover:text-black transition-colors py-1"
                    >
                      <Printer size={13} className="text-[#1f1f1f]" />
                      <span>+94 11 2 883 355</span>
                    </a>
                  </div>
                  <a
                    href="mailto:dg@dwc.gov.lk"
                    className="inline-flex items-center gap-1.5 hover:text-black transition-colors py-1 w-fit"
                  >
                    <Mail size={13} className="text-[#1f1f1f]" />
                    <span>dg@dwc.gov.lk</span>
                  </a>
                  <a
                    href="https://www.dwc.gov.lk/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-black transition-colors py-1 w-fit"
                  >
                    <Globe size={13} className="text-[#1f1f1f]" />
                    <span>dwc.gov.lk</span>
                  </a>
                </div>
              </div>

              {/* 3. Fast Stats Row */}
              <div className="grid grid-cols-2 gap-3 w-full">
                <div className="bg-[#f8f9fa] rounded-2xl p-5 min-h-[100px] flex flex-col items-center justify-center text-center [contain:paint]">
                  <Clock className="mb-2 text-[#1f1f1f] shrink-0" size={22} />
                  <span className="text-xl sm:text-2xl font-bold text-[#1f1f1f] leading-none mb-1">
                    20 <span className="text-xs font-semibold text-[#5f6368]">mins</span>
                  </span>
                  <span className="text-[11px] text-[#5f6368] font-bold tracking-normal">
                    To Park Gate
                  </span>
                </div>

                <div className="bg-[#f8f9fa] rounded-2xl p-5 min-h-[100px] flex flex-col items-center justify-center text-center [contain:paint]">
                  <ShieldCheck className="mb-2 text-[#1f1f1f] shrink-0" size={22} />
                  <span className="text-xl sm:text-2xl font-bold text-[#1f1f1f] leading-none mb-1">
                    100%
                  </span>
                  <span className="text-[11px] text-[#5f6368] font-bold tracking-normal">
                    Verified
                  </span>
                </div>
              </div>
            </div>

            {/* ================= RIGHT COLUMN (FORM) ================= */}
            <div className="lg:col-span-7 bg-white">
              <div className="bg-[#f8f9fa] rounded-[2.25rem] sm:rounded-[2.5rem] p-6 sm:p-10 flex flex-col [contain:paint]">
                <div className="mb-6">
                  <h2 className="text-xl sm:text-3xl font-bold text-[#1f1f1f] tracking-tight">
                    Secure Your Safari
                  </h2>
                  <p className="text-[18px] sm:text-[18px] text-[#5f6368] font-semibold mt-1">
                    Response time:{" "}
                    <span className="text-[#1f1f1f] font-bold">~15 mins</span> during business hours.
                  </p>
                </div>
                <div className="contact-form-wrapper">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>

          {/* ================= MAP SECTION ================= */}
          <div className="w-full h-[380px] sm:h-[460px] md:h-[500px] rounded-[2.25rem] sm:rounded-[3rem] overflow-hidden relative bg-[#fff] [contain:strict]">
            <div className="w-full h-full">
              <LocationMap />
            </div>
          </div>
        </div>
      </main>

      {/* ================= SEO CONTENT ================= */}
      <AutoSEOWrapper
        pageTitle="Contact Yala Wildlife Safari | Book Your Tour +94 778 158 004"
        pageDescription="Contact Yala Wildlife Safari for bookings and inquiries. Available 24/7 via phone, WhatsApp, and email. Based in Tissamaharama, Sri Lanka."
        pageType="contact"
      >
        <section className="w-full bg-white text-[#1f1f1f] py-14 px-4 sm:px-8 border-t border-[#f1f3f4] [content-visibility:auto] [contain-intrinsic-size:1px_300px]">
          <div className="max-w-4xl mx-auto flex flex-col items-center justify-center text-center">
            <h2 className="text-4xl sm:text-4xl font-bold text-[#1f1f1f] mb-6 tracking-tight">
              Contact Yala Wildlife Safari
            </h2>

            <div className="space-y-4 text-[18px] sm:text-[18px] text-[#5f6368] font-semibold leading-relaxed">
              <p className="text-[18px] sm:text-[18px] text-[#5f6368] font-semibold leading-relaxed">
                Ready to experience the thrill of Yala National Park? Contact our team to book your safari, ask questions, or request custom tour packages. We are available 24/7 to assist with all your safari preparations.
              </p>
              <p className="text-[18px] sm:text-[18px] text-[#5f6368] font-semibold leading-relaxed">
                Our office is located in Tissamaharama, just minutes from the Yala National Park entrance gates. Reach us via Phone, WhatsApp, or Email for instant booking confirmations and personalized travel advice from our experienced guides.
              </p>
            </div>
          </div>
        </section>
      </AutoSEOWrapper>
    </>
  );
}