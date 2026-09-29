"use client";

import Link from "next/link";
import Image from "next/image";
import CookiePreferencesButton from "@/components/CookiePreferencesButton";
import {
  Facebook,
  Instagram,
  Twitter,
  Phone,
  Mail,
  MapPin,
  Heart,
} from "lucide-react";

const navigation = {
  explore: [
    { name: "Safari Packages", href: "/safari-packages" },
    { name: "About Us", href: "/about" },
    { name: "Wildlife Blog", href: "/blog" },
    { name: "Reviews Gallery", href: "/reviews" },
  ],
  support: [
    { name: "Booking & FAQs", href: "/safari-packages" },
    { name: "Pickup & Dropoff/tours", href: "/pickup-dropoff" },
    { name: "Contact Support", href: "/contact" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/legal#privacy" },
    { name: "Terms of Service", href: "/legal#terms" },
    { name: "Refund Policy", href: "/legal#cancellation" },
  ],
};

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "https://web.facebook.com/ceylonnaturesafari" },
  { name: "Instagram", icon: Instagram, href: "https://web.facebook.com/ceylonnaturesafari" },
  { name: "Twitter", icon: Twitter, href: "https://web.facebook.com/ceylonnaturesafari" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700;800&family=Roboto:wght@400;500;700;900&display=swap"
        rel="stylesheet"
      />

      <footer
        className="w-full bg-white text-[#000000] border-t border-[#f1f3f4] selection:bg-[#00ff00] selection:text-black [content-visibility:auto]"
        style={{
          fontFamily:
            '"Google Sans", "Open Sans", Roboto, -apple-system, BlinkMacSystemFont, Arial, sans-serif',
        }}
      >
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 pt-12 pb-14 bg-white">

          {/* ========================================================= */}
          {/* 1. TOP ROW: SOCIAL SIGNALS & SECURE COMMS                 */}
          {/* ========================================================= */}
          <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between gap-6 pb-10 border-b border-[#f1f3f4] bg-white">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 flex-wrap">
              <span className="text-[18px] font-medium text-[#000000]">
                Follow us
              </span>
              <div className="flex items-center justify-center gap-4">
                {socialLinks.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow Yala Wildlife on ${item.name}`}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-[#202124] hover:text-black hover:bg-[#00ff00] transition-all duration-200"
                  >
                    <item.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Secure Comms Direct Contact */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 flex-wrap text-[18px] text-[#3c4043]">
              <a
                href="tel:+94778158004"
                className="inline-flex items-center justify-center gap-2 hover:text-[#000000] font-medium transition-colors"
              >
                <Phone className="w-4 h-4 text-[#000000]" />
                <span>+94 77 815 8004</span>
              </a>
              <a
                href="mailto:pasindusadanjana17@gmail.com"
                className="inline-flex items-center justify-center gap-2 hover:text-[#000000] font-medium transition-colors"
              >
                <Mail className="w-4 h-4 text-[#000000]" />
                <span>pasindusadanjana17@gmail.com</span>
              </a>
            </div>
          </div>

          {/* ========================================================= */}
          {/* 2. MAIN DIRECTORY GRID (4-COLUMN GOOGLE STRUCTURE)        */}
          {/* ========================================================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 py-14 border-b border-[#f1f3f4] bg-white text-center sm:text-left">

            {/* Column 1: Explore */}
            <div className="flex flex-col items-center sm:items-start gap-4 bg-white">
              <h3 className="text-[18px] font-bold text-[#000000] tracking-tight">
                Explore
              </h3>
              <ul className="flex flex-col items-center sm:items-start gap-3">
                {navigation.explore.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-[18px] text-[#3c4043] hover:text-[#000000] font-medium leading-relaxed transition-colors duration-150 inline-block"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Support */}
            <div className="flex flex-col items-center sm:items-start gap-4 bg-white">
              <h3 className="text-[18px] font-bold text-[#000000] tracking-tight">
                Support
              </h3>
              <ul className="flex flex-col items-center sm:items-start gap-3">
                {navigation.support.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-[18px] text-[#3c4043] hover:text-[#000000] font-medium leading-relaxed transition-colors duration-150 inline-block"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Location */}
            <div className="flex flex-col items-center sm:items-start gap-4 bg-white">
              <h3 className="text-[18px] font-bold text-[#000000] tracking-tight">
                Location
              </h3>
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 text-[18px] text-[#3c4043] leading-relaxed">
                <MapPin className="w-5 h-5 text-[#000000] shrink-0 mt-1" />
                <span>
                  Wickrama,kasingama<br />
                  Yala Entrance Road,<br />
                  Southern Province, Sri Lanka
                </span>
              </div>
            </div>

            {/* Column 4: Secure Card Payments & Standards */}
            <div className="flex flex-col items-center sm:items-start gap-4 bg-white">
              <h3 className="text-[18px] font-bold text-[#000000] tracking-tight">
                Secure Card Payments
              </h3>
              <div className="flex flex-col items-center sm:items-start gap-3">
                <a href="/safari-packages" aria-label="Secure Card Payments by PayHere" className="inline-block">
                  <Image
                    src="/payhere_short_banner.png"
                    alt="Secure Payments by PayHere"
                    width={150}
                    height={31}
                    loading="lazy"
                    className="opacity-90 hover:opacity-100 transition-opacity"
                  />
                </a>
                <p className="text-[16px] text-[#5f6368] font-semibold leading-relaxed max-w-xs sm:max-w-none">
                  Fast, encrypted checkout supporting all major credit & debit cards worldwide.
                </p>
              </div>
            </div>

          </div>

          {/* ========================================================= */}
          {/* 3. NATURE FIRST POLICY & COMPLIANCE LINE                  */}
          {/* ========================================================= */}
          <div className="py-8 bg-white space-y-3 text-center sm:text-left flex flex-col items-center sm:items-start">
            <p className="text-[18px] text-[#2d3135] font-semibold leading-relaxed max-w-5xl">
              As Sri Lanka&apos;s premier eco-expedition partner, Yala Wildlife operates with a strict &quot;Nature First&quot; policy. We bridge luxury and raw wilderness, ensuring every journey supports local conservation efforts and ethical wildlife tracking.
            </p>
            <p className="text-[16px] text-[#5f6368] font-medium leading-relaxed">
              1. Licensed Trackers Only • Guaranteed Ethical Observations • Federal Wildlife Safety Compliant.
            </p>
          </div>

          {/* ========================================================= */}
          {/* 4. GOOGLE BOTTOM STRIP (BRAND, LEGAL LINKS & UTILITIES)   */}
          {/* ========================================================= */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pt-6 bg-white border-t border-[#f1f3f4]">

            {/* Brand Identity & Legal Navigation */}
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-y-4 gap-x-8 w-full lg:w-auto text-center">
              <Link href="/" className="flex items-center justify-center gap-2.5 group">
                <Image
                  src="/favicon-96x96.png"
                  alt="Yala Wildlife Logo"
                  width={28}
                  height={28}
                  className="w-7 h-7 object-contain"
                />
                <span className="text-[18px] font-semibold text-[#000000] tracking-tight">
                  Wildlife
                </span>
              </Link>

              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                {navigation.legal.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-[16px] font-medium text-[#3c4043] hover:text-[#000000] transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}

                <div className="text-[16px] font-medium text-[#3c4043] hover:text-[#000000]">
                  <CookiePreferencesButton />
                </div>
              </div>
            </div>
          </div>

          {/* Copyright & Architect Attribution Bar */}
          <div className="mt-8 pt-6 border-t border-[#f1f3f4] flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center text-[16px] text-[#5f6368] font-medium">
            <p>© {currentYear} Yala Wildlife Adventure Inc.</p>
            <span className="hidden sm:inline text-[#dadce0]">•</span>
            <div className="flex items-center justify-center gap-1.5">
              <span>Architect by</span>
              <span className="font-semibold text-[#5f6368]">Pasindu</span>
              <Heart size={14} className="text-black fill-current" />
            </div>
          </div>

        </div>
      </footer>
    </>
  );
}