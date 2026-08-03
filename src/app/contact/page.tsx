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
      <main className="relative min-h-screen text-white bg-black selection:bg-[#00ff00]/50 selection:text-black font-sans" role="main">

        {/* =========================================
            BACKGROUND
        ========================================= */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Image
            src="/uploads/1748935199061-20250603_1239_Leopard Emerges from Darkness_simple_compose_01jwt9yv7qect8krxy794bcr23.webp"
            alt="Yala Leopard Emerging from Darkness"
            fill
            priority
            className="object-cover opacity-60 transition-all duration-[3s]"
            quality={95}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black" />
        </div>

        {/* Content Wrapper */}
        <div className="relative z-10 pt-32 pb-12 px-4 md:px-8 max-w-7xl mx-auto">

          {/* Header */}
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff00] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00ff00]"></span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#00ff00]">
                24/7 Live Support
              </span>
            </div>

            <h1 className="text-2xl md:text-2xl font-extrabold tracking-tight text-[#00ff00] leading-tight drop-shadow-xl">
              Let's Plan Your{" "}
              <span className="text-[#00ff00]">Adventure</span>
            </h1>


            <p className="text-sm md:text-base text-neutral-200 max-w-lg mx-auto font-medium leading-relaxed drop-shadow-md">
              Experience the raw intensity of Yala. Secure your private safari jeep with our expert human agents.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* ================= LEFT COLUMN ================= */}
            <div className="lg:col-span-5 space-y-5">

              {/* 1. Quick Customer Support Card (Transparent, Blurred, Linked) */}
              <div className="backdrop-blur-xl bg-transparent rounded-3xl p-6 relative overflow-hidden group transition-all duration-500">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-[#00ff00]/10 flex items-center justify-center text-[#00ff00]">
                    <UserCheck size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white leading-none">Customer Service</h3>
                    <p className="text-xs text-[#00ff00] mt-1 uppercase tracking-wider font-bold">Online Human Agent • Instant Reply</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* WhatsApp Link */}
                  <a
                    href="https://wa.me/94778158004"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between group/link hover:pl-2 transition-all duration-300 bg-white/5 p-4 rounded-2xl hover:bg-white/10 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <MessageCircle size={20} className="text-[#00ff00]" />
                      <div>
                        <div className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold">WhatsApp Hotline</div>
                        <div className="text-lg font-bold text-white group-hover/link:text-[#00ff00] transition-colors">
                          +94 778 158 004
                        </div>
                      </div>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-[#00ff00] animate-pulse shadow-[0_0_10px_#00ff00]"></div>
                  </a>

                  {/* Email Link */}
                  <a
                    href="mailto:pasindusadanjana17@gmail.com"
                    className="flex items-center gap-3 group/link hover:pl-2 transition-all duration-300 bg-white/5 p-4 rounded-2xl hover:bg-white/10 cursor-pointer"
                  >
                    <Mail size={20} className="text-[#00ff00]" />
                    <div className="overflow-hidden">
                      <div className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold">Email Reservations</div>
                      <div className="text-sm font-bold text-white truncate group-hover/link:text-[#00ff00] transition-colors">
                        pasindusadanjana17@gmail.com
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              {/* 2. Official Authority Card (DWC) (Transparent, Blurred, Linked) */}
              <div className="backdrop-blur-xl bg-transparent rounded-3xl p-6 relative overflow-hidden group hover:bg-transparent transition-colors">
                <div className="absolute left-0 top-6 bottom-6 w-1 bg-[#00ff00] rounded-r-full shadow-[0_0_15px_#00ff00]"></div>
                <div className="pl-4">
                  <h3 className="text-xs font-bold text-[#00ff00] mb-3 uppercase tracking-widest flex items-center gap-2">
                    <Landmark size={14} /> Official Authority
                  </h3>

                  <a href="https://www.dwc.gov.lk/" target="_blank" rel="noopener noreferrer" className="block mb-3 hover:opacity-80 transition-opacity">
                    <p className="text-sm font-bold text-white mb-1">Department of Wildlife Conservation</p>
                    <div className="text-xs text-neutral-300 leading-relaxed font-medium">
                      <p>811A, Jayanthipura,</p>
                      <p>Battaramulla, Sri Lanka.</p>
                    </div>
                  </a>

                  <div className="grid grid-cols-1 gap-2 text-xs text-neutral-300">
                    <div className="flex gap-4">
                      <a href="tel:+94112888585" className="flex items-center gap-2 hover:text-[#00ff00] transition-colors py-1">
                        <Phone size={12} /> <span className="font-mono font-bold">+94 11 2 888 585</span>
                      </a>
                      <a href="tel:+94112883355" className="flex items-center gap-2 hover:text-[#00ff00] transition-colors py-1">
                        <Printer size={12} /> <span className="font-mono font-bold">+94 11 2 883 355</span>
                      </a>
                    </div>
                    <a href="mailto:dg@dwc.gov.lk" className="flex items-center gap-2 hover:text-[#00ff00] transition-colors py-1 w-fit">
                      <Mail size={12} /> <span className="font-bold">dg@dwc.gov.lk</span>
                    </a>
                    <a
                      href="https://www.dwc.gov.lk/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 py-1 w-fit
             font-bold
             text-neutral-200
             hover:text-[#00ff00]
             transition-colors"
                    >
                      <Globe size={12} />
                      <span>dwc.gov.lk</span>
                    </a>

                  </div>
                </div>
              </div>

              {/* 3. Stats Row */}
              <div className="grid grid-cols-2 gap-3">
                <div className="backdrop-blur-xl bg-transparent rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                  <Clock className="mb-2 text-[#00ff00]" size={20} />
                  <span className="text-xl font-bold text-white">20 <span className="text-xs font-normal text-neutral-400">mins</span></span>
                  <span className="text-[9px] text-neutral-400 font-bold uppercase tracking-wider mt-1">To Park Gate</span>
                </div>
                <div className="backdrop-blur-xl bg-transparent rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                  <ShieldCheck className="mb-2 text-[#00ff00]" size={20} />
                  <span className="text-xl font-bold text-white">100%</span>
                  <span className="text-[9px] text-neutral-400 font-bold uppercase tracking-wider mt-1">Verified</span>
                </div>
              </div>

            </div>

            {/* ================= RIGHT COLUMN (FORM) ================= */}
            <div className="lg:col-span-7">
              <div className="backdrop-blur-3xl bg-black/50 rounded-[2rem] p-6 md:p-8 shadow-2xl relative">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-white">Secure Your Safari</h2>
                  <p className="text-xs text-neutral-400 mt-1">Response time: <span className="text-[#00ff00] font-bold">~15 mins</span> during business hours.</p>
                </div>
                <div className="contact-form-wrapper">
                  <ContactForm />
                </div>
              </div>
            </div>

          </div>

          {/* ================= BIG CUTTER MAP SECTION ================= */}
          <div className="mt-12 w-full h-[450px] md:h-[550px] rounded-[2.5rem] overflow-hidden relative shadow-2xl group bg-black/20 backdrop-blur-sm">
            {/* Tech Overlay */}
            {/* <div className="absolute top-6 left-6 z-20 bg-black/90 backdrop-blur-xl px-5 py-2.5 rounded-full border border-[#00ff00]/30 shadow-[0_0_20px_rgba(0,255,0,0.2)] flex items-center gap-3 pointer-events-none">
              <div className="w-2.5 h-2.5 rounded-full bg-[#00ff00] animate-pulse"></div>
              <span className="text-xs font-bold text-white tracking-widest">YALA HQ LOCATION</span>
            </div> */}

            {/* Map Container - Starts Dark, Brightens on Hover/Interaction */}
            <div className="w-full h-full filter brightness-[0.6] contrast-[1.1] group-hover:brightness-100 group-hover:contrast-100 transition-all duration-700 ease-in-out">
              <LocationMap />
            </div>

            {/* Cutter Corners Overlay (Visual Effect) */}
            <div className="absolute inset-0 pointer-events-none rounded-[2.5rem] ring-1 ring-white/5"></div>
          </div>

        </div>
      </main>

      {/* ================= SEO CONTENT (Frosted & Readable) ================= */}
      <AutoSEOWrapper
        pageTitle="Contact Yala Wildlife Safari | Book Your Tour +94 778 158 004"
        pageDescription="Contact Yala Wildlife Safari for bookings and inquiries. Available 24/7 via phone, WhatsApp, and email. Based in Tissamaharama, Sri Lanka."
        pageType="contact"
      >
        <div className="container mx-auto px-4 py-16  bg-transparent relative">
          {/* Frosted Glass Container for Text Readability */}
          <div className="max-w-5xl mx-auto backdrop-blur-xl bg-white/[0.03]  rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">

            {/* Glow Accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-[#00ff00] shadow-[0_0_30px_#00ff00]"></div>

            <h1 className="text-2xl md:text-3xl font-black text-white mb-8 tracking-tight text-center uppercase">
              Contact <span className="text-[#00ff00]">Yala Wildlife Safari</span>
            </h1>

            <div className="space-y-6 text-neutral-300 text-lg leading-relaxed font-light text-center">
              <p>
                Ready to experience the thrill of Yala National Park? Contact our friendly
                team to book your safari, ask questions, or request custom tour packages.
                We are available <span className="text-[#00ff00] font-bold">24/7</span> to assist with all your safari needs.
              </p>

              <p>
                Our office is conveniently located in Tissamaharama, just minutes from Yala
                National Park entrance. Reach us via <span className="text-white font-bold border-b border-[#00ff00]">Phone, WhatsApp, or Email</span> for instant
                booking confirmations and personalized travel advice from our experienced team.
              </p>
            </div>
          </div>
        </div>
      </AutoSEOWrapper>
    </>
  );
}