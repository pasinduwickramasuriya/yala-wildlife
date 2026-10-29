"use client";

import { X, CalendarCheck, Phone, Globe, ChevronDown, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect, useCallback } from "react";

interface Package {
  id: string;
  name: string;
  slug: string;
}

const YalaLogo = () => (
  <div className="group flex items-center gap-3 transform-gpu">
    <Image
      src="/favicon-96x96.png"
      alt="Yala Wildlife Logo"
      width={36}
      height={36}
      priority
      decoding="async"
      className="w-9 h-9 object-contain group-hover:rotate-[15deg] transition-transform duration-300 transform-gpu"
    />
    <div className="flex flex-col leading-none">
      {/* <span className="text-[9px] font-black text-[#00ff00] uppercase tracking-[0.4em] mb-1">Yala</span> */}
      <span className="text-xs font-bold text-white uppercase tracking-tight">Wildlife</span>
    </div>
  </div>
);

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

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [packages, setPackages] = useState<Package[]>([]);
  const [expandedPackages, setExpandedPackages] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isScrolled = window.scrollY > 50;
          setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isOpen || packages.length > 0) return;
    const fetchPackages = async () => {
      try {
        const response = await fetch("/api/package");
        if (!response.ok) throw new Error("Failed to fetch packages");
        setPackages(await response.json());
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };
    fetchPackages();
  }, [isOpen, packages.length]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    setExpandedPackages(false);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] flex justify-center p-5 md:p-8 pointer-events-none transition-transform duration-300 ease-out transform-gpu origin-top select-none antialiased [backface-visibility:hidden] ${
          scrolled ? "scale-[0.97]" : "scale-100"
        }`}
        style={{
          fontFamily: '"Google Sans", "Open Sans", Roboto, -apple-system, BlinkMacSystemFont, Arial, sans-serif',
          WebkitFontSmoothing: "antialiased",
        }}
      >
        <div className="flex items-center gap-3 pointer-events-auto [contain:layout_style]">
          {/* --- BRAND PILL --- */}
          <Link
            href="/"
            aria-label="Yala Wildlife Home"
            className="bg-black/75 px-3 py-1 rounded-[2rem] shadow-lg transform-gpu"
          >
            <YalaLogo />
          </Link>

          {/* --- HAMBURGER --- */}
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Open Navigation Menu"
            className="group flex items-center gap-4 bg-black/75 pl-2 sm:pl-5 pr-2 py-0.5 rounded-[2rem] shadow-lg transition-colors duration-200 transform-gpu cursor-pointer"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white group-hover:text-[#00ff00] transition-colors duration-150 hidden sm:block">
              Menu
            </span>
            <div className="w-10 h-10 bg-white/5 group-hover:bg-[#00ff00] rounded-full flex flex-col items-center justify-center gap-1 transition-colors duration-150">
              <span className="w-4 h-[2px] bg-white group-hover:bg-black transition-colors duration-150" />
              <span className="w-2.5 h-[2px] bg-white group-hover:bg-black self-end mr-3 transition-colors duration-150" />
            </div>
          </button>

          {/* --- EXTERNAL QUICK ACTION --- */}
          <Link
            href="/safari-packages"
            aria-label="Book Safari Packages Now"
            className="flex items-center gap-3 bg-[#00ff00] text-black px-3.5 sm:px-7 py-3.5 rounded-[2rem] font-black uppercase text-[10px] tracking-[0.2em] hover:opacity-90 active:scale-95 transition-transform duration-150 transform-gpu"
          >
            <span className="hidden sm:block">Book Now</span>
            <CalendarCheck className="w-4 h-4" strokeWidth={3} />
          </Link>
        </div>
      </header>

      {/* --- OVERLAY MENU (GPU Accelerated & Zero Layout Thrashing) --- */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[200] bg-white text-black flex flex-col p-6 md:p-16 overflow-y-auto overscroll-contain select-none antialiased transform-gpu [contain:strict]"
          style={{
            fontFamily: '"Google Sans", "Open Sans", Roboto, -apple-system, BlinkMacSystemFont, Arial, sans-serif',
            WebkitFontSmoothing: "antialiased",
          }}
        >
          {/* Header Area - Clean & Minimal */}
          <div className="flex justify-between items-center w-full shrink-0">
            <div className="flex items-center gap-4">
              <Globe className="text-[#000] w-4 h-4" />
              <span className="text-[15px] font-bold tracking-[0.35em] text-black/90">
                Wilderness Awaits in Yala
              </span>
            </div>
            <button
              type="button"
              onClick={closeMenu}
              aria-label="Close Navigation Menu"
              className="group flex items-center gap-4 bg-black/5 pl-5 pr-2 py-2 rounded-full hover:bg-black/10 transition-colors duration-150 cursor-pointer"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.25em]">Close</span>
              <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center">
                <X className="w-4 h-4" />
              </div>
            </button>
          </div>

          {/* Nav Content - Centered & Refined */}
          <div className="flex-grow flex flex-col justify-center items-center py-10">
            <div className="space-y-4 md:space-y-6 text-center">
              {NAV_ITEMS.map((item, i) => (
                <div key={item.name} className="transform-gpu">
                  {item.name === "Safari Packages" ? (
                    <div className="flex flex-col items-center">
                      <button
                        type="button"
                        onClick={() => setExpandedPackages(!expandedPackages)}
                        aria-expanded={expandedPackages}
                        className="text-4xl md:text-[5vw] font-bold uppercase tracking-[-0.03em] leading-tight hover:text-[#00ff00] transition-colors duration-150 flex items-center justify-center gap-4 cursor-pointer"
                      >
                        <span className="text-[1.2vw] font-bold text-black/10 hidden md:inline">
                          0{i + 1}
                        </span>
                        {item.name}
                        <ChevronDown
                          className={`w-6 h-6 md:w-10 md:h-10 transition-transform duration-200 transform-gpu ${
                            expandedPackages ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {expandedPackages && (
                        <div className="overflow-hidden flex flex-col items-center mt-4 space-y-3">
                          {packages.map((pkg) => (
                            <Link
                              key={pkg.id}
                              href={`/safari-packages/${pkg.slug}`}
                              onClick={closeMenu}
                              className="text-lg md:text-2xl font-bold text-black/40 hover:text-black transition-colors duration-150"
                            >
                              {pkg.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.link}
                      onClick={closeMenu}
                      className="text-4xl md:text-[5vw] font-bold uppercase tracking-[-0.03em] leading-tight hover:text-[#00ff00] transition-colors duration-150 block group transform-gpu"
                    >
                      <span className="text-[1.2vw] mr-4 text-black/10 group-hover:text-[#00ff00] transition-colors duration-150 hidden md:inline">
                        0{i + 1}
                      </span>
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Integrated Footer - Centered Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-t border-black/5 pt-10 shrink-0 text-center md:text-left">
            <div className="space-y-2">
              <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#000]">
                Location
              </p>
              <p className="text-xs font-bold text-black/50 leading-relaxed">
                Tissamaharama, Sri Lanka.
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#000]">
                Inquiries
              </p>
              <Link
                href="https://wa.me/940778158004?text=Hello,%20I'm%20interested%20in%20your%20safaris"
                className="text-lg font-bold hover:text-[#000] transition-colors duration-150 flex items-center justify-center md:justify-start gap-2"
              >
                <Phone className="w-4 h-4" /> +94 77 815 8004
              </Link>
            </div>
            <div className="space-y-2">
              <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#000]">
                Social
              </p>
              <div className="flex justify-center md:justify-start gap-4">
                <Link
                  href="/blog"
                  onClick={closeMenu}
                  className="text-[10px] font-bold uppercase tracking-[0.2em] hover:text-[#00ff00] transition-colors duration-150"
                >
                  Blogs
                </Link>
                <Link
                  href="/reviews"
                  onClick={closeMenu}
                  className="text-[10px] font-bold uppercase tracking-[0.2em] hover:text-[#00ff00] transition-colors duration-150"
                >
                  Reviews
                </Link>
              </div>
            </div>

            {/* BOOK NOW BUTTON */}
            <div className="flex items-center justify-center md:justify-end">
              <Link
                href="/safari-packages"
                onClick={closeMenu}
                className="w-full md:w-auto flex items-center justify-center gap-3 bg-[#00ff00] text-black px-8 py-4 rounded-xl font-bold uppercase text-xs tracking-widest active:scale-95 transition-transform duration-150 shadow-md transform-gpu"
              >
                <Calendar className="w-4 h-4" />
                Reserve Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}