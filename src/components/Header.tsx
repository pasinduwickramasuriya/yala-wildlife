"use client";

import { X, CalendarCheck, Phone, Globe, ChevronDown, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect, useCallback, memo } from "react";

interface Package {
  id: string;
  name: string;
  slug: string;
}

const NAV_ITEMS = [
  { name: "Home", link: "/" },
  { name: "Safari Packages", link: "/safari-packages" },
  { name: "Tours/pickup-Dropoff", link: "/pickup-dropoff" },
  { name: "About", link: "/about" },
  { name: "Contact", link: "/contact" },
  { name: "Reviews", link: "/reviews" },
  { name: "Blog", link: "/blog" },
  { name: "Park Tickets", link: "/yala-national-park-tickets" },
];

const YalaLogo = memo(() => (
  <div className="flex items-center gap-2 sm:gap-2.5">
    <Image
      src="/favicon-96x96.png"
      alt="Yala Wildlife Logo"
      width={28}
      height={28}
      priority
      loading="eager"
      className="w-7 h-7 object-contain"
    />
    <div className="flex flex-col leading-tight">
      <span className="text-[14px] font-bold text-[#000000] tracking-tight">
        Wildlife
      </span>
    </div>
  </div>
));
YalaLogo.displayName = "YalaLogo";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [packages, setPackages] = useState<Package[]>([]);
  const [expandedPackages, setExpandedPackages] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Passive, throttled scroll handler with zero layout recalculation
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isPastThreshold = window.scrollY > 40;
          setScrolled((prev) => (prev !== isPastThreshold ? isPastThreshold : prev));
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch package list on interaction or browser idle time (no main thread blocking)
  const preloadPackages = useCallback(() => {
    if (packages.length > 0) return;
    const load = async () => {
      try {
        const response = await fetch("/api/package");
        if (!response.ok) return;
        const data = await response.json();
        setPackages(data);
      } catch {
        // silent fail
      }
    };

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      (window as Window).requestIdleCallback(() => load());
    } else {
      setTimeout(load, 150);
    }
  }, [packages.length]);

  // Lock scroll without reflows
  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
      preloadPackages();
    } else {
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [isOpen, preloadPackages]);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    setExpandedPackages(false);
  }, []);

  return (
    <>
      {/* --- HARDWARE-ACCELERATED FLOATING PILL (GPU-COMPOSITED) --- */}
      <header
        className={`fixed top-0 left-0 right-0 z-[100] flex justify-center p-3 sm:p-4 pointer-events-none transform-gpu will-change-transform transition-transform duration-200 ease-out ${
          scrolled ? "-translate-y-1 scale-[0.98]" : "translate-y-0 scale-100"
        }`}
        style={{
          fontFamily:
            '"Google Sans", "Open Sans", Roboto, -apple-system, BlinkMacSystemFont, Arial, sans-serif',
        }}
      >
        <div className="flex items-center gap-2 pointer-events-auto bg-white px-2.5 py-1.5 rounded-full border border-[#dadce0] [contain:paint_layout]">
          {/* Logo */}
          <Link
            href="/"
            aria-label="Yala Wildlife Home"
            className="pl-2.5 pr-2 py-1 rounded-full active:bg-[#f8f9fa]"
          >
            <YalaLogo />
          </Link>

          {/* Menu Trigger with prefetch on hover/focus */}
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            onMouseEnter={preloadPackages}
            onTouchStart={preloadPackages}
            aria-label="Open Navigation Menu"
            className="flex items-center gap-2 pl-2 sm:pl-3 pr-1 py-1 rounded-full hover:bg-[#f8f9fa] active:scale-95 transition-transform duration-100 cursor-pointer"
          >
            <span className="text-[14px] font-medium tracking-normal text-[#3c4043] hidden sm:block">
              Menu
            </span>
            <div className="w-8 h-8 bg-[#f1f3f4] hover:bg-[#00ff00] rounded-full flex flex-col items-center justify-center gap-0.5">
              <span className="w-3.5 h-[1.5px] bg-[#000000]" />
              <span className="w-2.5 h-[1.5px] bg-[#000000] self-end mr-2.5" />
            </div>
          </button>

          {/* Primary CTA Button */}
          <Link
            href="/safari-packages"
            aria-label="Book Safari Packages Now"
            className="flex items-center gap-1.5 bg-[#00ff00] hover:bg-[#000000] text-black hover:text-white px-4 py-2 rounded-full text-[14px] font-bold tracking-wide active:scale-95 transition-all duration-150 cursor-pointer"
          >
            <span className="hidden sm:inline">Book Now</span>
            <CalendarCheck className="w-3.5 h-3.5 stroke-[2.5]" />
          </Link>
        </div>
      </header>

      {/* --- OVERLAY MENU CANVAS --- */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[200] bg-white text-[#000000] flex flex-col justify-between p-4 sm:p-7 md:p-10 overflow-y-auto transform-gpu [contain:paint_layout]"
          style={{
            fontFamily:
              '"Google Sans", "Open Sans", Roboto, -apple-system, BlinkMacSystemFont, Arial, sans-serif',
          }}
        >
          {/* Header Bar */}
          <div className="flex justify-between items-center w-full max-w-5xl mx-auto shrink-0 pb-4 border-b border-[#f1f3f4]">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f8f9fa]">
              <Globe className="text-[#000000] w-4 h-4" />
              <span className="text-[14px] font-medium text-[#3c4043]">
                Yala National Park, Sri Lanka
              </span>
            </div>

            {/* Close Button with #00ff00 */}
            <button
              type="button"
              onClick={closeMenu}
              aria-label="Close Navigation Menu"
              className="flex items-center gap-2 bg-[#f8f9fa] hover:bg-[#e8eaed] pl-3.5 pr-1.5 py-1.5 rounded-full active:scale-95 transition-transform duration-100 cursor-pointer"
            >
              <span className="text-[14px] font-semibold text-[#000000]">
                Close
              </span>
              <div className="w-7 h-7 bg-[#00ff00] text-black rounded-full flex items-center justify-center">
                <X className="w-4 h-4 stroke-[3]" />
              </div>
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-grow flex flex-col justify-center items-center py-6 w-full max-w-3xl mx-auto">
            <div className="space-y-2 sm:space-y-3 text-center w-full">
              {NAV_ITEMS.map((item, i) => (
                <div key={item.name}>
                  {item.name === "Safari Packages" ? (
                    <div className="flex flex-col items-center">
                      <button
                        type="button"
                        onClick={() => setExpandedPackages((prev) => !prev)}
                        aria-expanded={expandedPackages}
                        className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#000000] flex items-center justify-center gap-3 cursor-pointer py-1.5 px-6 rounded-full hover:bg-[#f8f9fa] active:scale-98 transition-transform duration-100"
                      >
                        <span className="text-[14px] font-bold text-[#5f6368]">
                          0{i + 1}
                        </span>
                        <span>{item.name}</span>
                        <ChevronDown
                          className={`w-5 h-5 sm:w-6 sm:h-6 text-[#5f6368] transition-transform duration-200 ${
                            expandedPackages ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {expandedPackages && (
                        <div className="flex flex-col items-center mt-2.5 mb-1.5 space-y-1.5 bg-[#f8f9fa] rounded-2xl p-4 sm:p-5 w-full max-w-md">
                          {packages.length === 0 ? (
                            <span className="text-[14px] text-[#5f6368]">
                              Loading safari drives...
                            </span>
                          ) : (
                            packages.map((pkg) => (
                              <Link
                                key={pkg.id}
                                href={`/safari-packages/${pkg.slug}`}
                                onClick={closeMenu}
                                className="w-full text-center py-1.5 px-3 rounded-xl text-[15px] text-[#2d3135] hover:text-[#000000] hover:bg-white font-medium"
                              >
                                {pkg.name}
                              </Link>
                            ))
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.link}
                      onClick={closeMenu}
                      className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#000000] inline-flex items-center gap-3 py-1.5 px-6 rounded-full hover:bg-[#f8f9fa] active:scale-98 transition-transform duration-100"
                    >
                      <span className="text-[14px] font-bold text-[#5f6368]">
                        0{i + 1}
                      </span>
                      <span>{item.name}</span>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Compact Low-Overhead Footer */}
          <div className="w-full max-w-5xl mx-auto bg-[#f8f9fa] rounded-2xl p-4 sm:p-5 grid grid-cols-1 md:grid-cols-4 gap-4 shrink-0 text-center md:text-left items-center">
            <div className="space-y-0.5">
              <p className="text-[13px] font-bold text-[#000000] uppercase tracking-wider">
                Location
              </p>
              <p className="text-[14px] text-[#5f6368] font-normal leading-snug">
                Tissamaharama, Southern Province, Sri Lanka
              </p>
            </div>

            <div className="space-y-0.5">
              <p className="text-[13px] font-bold text-[#000000] uppercase tracking-wider">
                Direct Inquiries
              </p>
              <Link
                href="https://wa.me/940778158004?text=Hello,%20I'm%20interested%20in%20your%20safaris"
                className="text-[14px] font-medium text-[#000000] hover:underline inline-flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-[#000000]" />
                +94 77 815 8004
              </Link>
            </div>

            <div className="space-y-0.5">
              <p className="text-[13px] font-bold text-[#000000] uppercase tracking-wider">
                Resources
              </p>
              <div className="flex justify-center md:justify-start gap-4">
                <Link
                  href="/blog"
                  onClick={closeMenu}
                  className="text-[14px] text-[#5f6368] hover:text-[#000000] font-normal"
                >
                  Articles
                </Link>
                <Link
                  href="/reviews"
                  onClick={closeMenu}
                  className="text-[14px] text-[#5f6368] hover:text-[#000000] font-normal"
                >
                  Guest Reviews
                </Link>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-end">
              <Link
                href="/safari-packages"
                onClick={closeMenu}
                className="inline-flex items-center justify-center gap-2 bg-[#000000] hover:bg-[#00ff00] text-white hover:text-black text-[14px] font-bold px-5 py-2.5 rounded-full active:scale-95 transition-transform duration-100 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 stroke-[2.5]" />
                Reserve Jeep
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}