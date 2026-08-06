"use client";

import { X, ArrowUpRight, Phone, Globe, ChevronDown, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";

interface Package {
  id: string;
  name: string;
  slug: string;
}

const YalaLogo = () => (
  <div className="group flex items-center gap-3">
    <Image
      src="/favicon-96x96.png"
      alt="Yala Wildlife Logo"
      width={36}
      height={36}
      className="w-9 h-9 object-contain group-hover:rotate-[15deg] transition-transform duration-500"
    />
    <div className="flex flex-col leading-none">
      <span className="text-[9px] font-black text-[#00ff00] uppercase tracking-[0.4em] mb-1">Yala</span>
      <span className="text-xs font-bold text-white uppercase tracking-tighter">Wildlife</span>
    </div>
  </div>
);

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
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  const navItems = [
    { name: "Home", link: "/" },
    { name: "Safari Packages", link: "/safari-packages" },
    { name: "Tours/pickup-Dropoff", link: "/pickup-dropoff" },
    { name: "About", link: "/about" },
    { name: "Contact", link: "/contact" },
    { name: "Reviews", link: "/reviews" },
    { name: "Blog", link: "/blog" },
    { name: "Park Tickets", link: "/yala-national-park-tickets" },
  ];

  const closeMenu = () => {
    setIsOpen(false);
    setExpandedPackages(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] flex justify-center p-5 md:p-8 pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transform origin-top ${
          scrolled ? "scale-[0.97]" : "scale-100"
        }`}
      >
        <div className="flex items-center gap-3 pointer-events-auto">
          {/* --- BRAND PILL --- */}
          <Link href="/" aria-label="Yala Wildlife Home" className="bg-black/70 px-5 py-3 rounded-[2rem] shadow-2xl">
            <YalaLogo />
          </Link>

          {/* --- HAMBURGER --- */}
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open Navigation Menu"
            className="group flex items-center gap-4 bg-black/70 backdrop-blur-md pl-5 pr-2 py-2 rounded-[2rem] shadow-2xl transition-all"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white group-hover:text-[#00ff00] transition-colors">Menu</span>
            <div className="w-10 h-10 bg-white/5 group-hover:bg-[#00ff00] rounded-full flex flex-col items-center justify-center gap-1 transition-all">
              <span className="w-4 h-[2px] bg-white group-hover:bg-black transition-colors" />
              <span className="w-2.5 h-[2px] bg-white group-hover:bg-black self-end mr-3 transition-colors" />
            </div>
          </button>

          {/* --- EXTERNAL QUICK ACTION (DESKTOP ONLY) --- */}
          <Link href="/safari-packages" aria-label="Book Safari Packages Now" className="hidden sm:flex items-center gap-3 bg-[#00ff00] text-black px-7 py-3.5 rounded-[2rem] font-black uppercase text-[10px] tracking-[0.2em] hover:brightness-110 active:scale-95 transition-all">
            Book Now
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* --- OVERLAY MENU --- */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[200] bg-white text-black flex flex-col p-6 md:p-16 overflow-y-auto transition-all duration-300 ease-out animate-in fade-in slide-in-from-top-4"
        >
          {/* Header Area - Clean & Minimal */}
          <div className="flex justify-between items-center w-full shrink-0">
            <div className="flex items-center gap-4">
              <Globe className="text-[#00aa00] w-4 h-4" />
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-black/30">
                Wilderness Awaits in Yala
              </span>
            </div>
            <button
              onClick={closeMenu}
              aria-label="Close Navigation Menu"
              className="group flex items-center gap-4 bg-black/5 pl-5 pr-2 py-2 rounded-full hover:bg-black/10 transition-all"
            >
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Close</span>
              <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center">
                <X className="w-4 h-4" />
              </div>
            </button>
          </div>

          {/* Nav Content - Centered & Refined */}
          <div className="flex-grow flex flex-col justify-center items-center py-10">
            <div className="space-y-4 md:space-y-6 text-center">
              {navItems.map((item, i) => (
                <div key={item.name} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                  {item.name === "Safari Packages" ? (
                    <div className="flex flex-col items-center">
                      <button
                        onClick={() => setExpandedPackages(!expandedPackages)}
                        aria-expanded={expandedPackages}
                        className="text-4xl md:text-[5vw] font-black uppercase tracking-tighter leading-tight hover:text-[#00aa00] transition-all flex items-center justify-center gap-4 cursor-pointer"
                      >
                        <span className="text-[1.2vw] font-bold text-black/10 hidden md:inline">
                          0{i + 1}
                        </span>
                        {item.name}
                        <ChevronDown
                          className={`w-6 h-6 md:w-10 md:h-10 transition-transform duration-500 ${
                            expandedPackages ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {expandedPackages && (
                        <div
                          className="overflow-hidden flex flex-col items-center mt-4 space-y-3 animate-in fade-in duration-200"
                        >
                          {packages.map((pkg) => (
                            <Link
                              key={pkg.id}
                              href={`/safari-packages/${pkg.slug}`}
                              onClick={closeMenu}
                              className="text-lg md:text-2xl font-bold text-black/40 hover:text-black transition-colors"
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
                      className="text-4xl md:text-[5vw] font-black uppercase tracking-tighter leading-tight hover:text-[#00aa00] hover:scale-105 transition-all block group"
                    >
                      <span className="text-[1.2vw] mr-4 text-black/10 group-hover:text-[#00aa00] hidden md:inline">
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
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#00aa00]">
                Location
              </p>
              <p className="text-xs font-bold text-black/50 leading-relaxed">
                Tissamaharama, Sri Lanka.
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#00aa00]">
                Inquiries
              </p>
              <Link
                href="https://wa.me/940778158004?text=Hello,%20I'm%20interested%20in%20your%20safaris"
                className="text-lg font-black hover:text-[#00aa00] transition-colors flex items-center justify-center md:justify-start gap-2"
              >
                <Phone className="w-4 h-4" /> +94 77 815 8004
              </Link>
            </div>
            <div className="space-y-2">
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#00aa00]">
                Social
              </p>
              <div className="flex justify-center md:justify-start gap-4">
                <Link
                  href="/blog"
                  className="text-[10px] font-black uppercase tracking-[0.2em] hover:text-[#00aa00] transition-colors"
                >
                  Blogs
                </Link>
                <Link
                  href="/reviews"
                  onClick={closeMenu}
                  className="text-[10px] font-black uppercase tracking-[0.2em] hover:text-[#00aa00] transition-colors"
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
                className="w-full md:w-auto flex items-center justify-center gap-3 bg-black text-white px-8 py-4 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-[#00aa00] transition-all shadow-lg"
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