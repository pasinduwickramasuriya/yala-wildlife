"use client";

import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  MapPin,
  Phone,
  Mail,
  Package,
  Users,
  MessageSquare,
  HelpCircle,
  Heart
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- Brand Icon ---
const RabbitIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("text-green-400", className)}
  >
    <path d="M12 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
    <path d="M17.5 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
    <path d="M6.5 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
    <path d="M15.5 19.5c.5-1.5 1-3.5 0-5" />
    <path d="M8.5 19.5c-.5-1.5-1-3.5 0-5" />
    <path d="M12 21a7.5 7.5 0 0 0 5-2.5c1.5-2 0-5.5-5-5.5s-6.5 3.5-5 5.5A7.5 7.5 0 0 0 12 21Z" />
  </svg>
);

// --- Data ---
const contactLinks = [
  { name: "Yala National Park, Sri Lanka", href: "#", icon: MapPin },
  { name: "+94 778 158 004", href: "tel:+94778158004", icon: Phone },
  { name: "pasinduwick@icloud.com", href: "mailto:pasinduwick@icloud.com", icon: Mail },
];

const exploreLinks = [
  { name: "Safari Packages", href: "/safari-packages", icon: Package },
  { name: "About Us", href: "/about", icon: Users },
  { name: "Blog", href: "/blog", icon: MessageSquare },
  { name: "Booking & FAQs", href: "/contact", icon: HelpCircle },
];

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "https://web.facebook.com/ceylonnaturesafari" },
  { name: "Instagram", icon: Instagram, href: "https://web.facebook.com/ceylonnaturesafari" },
  { name: "Twitter", icon: Twitter, href: "https://web.facebook.com/ceylonnaturesafari" },
];

const legalLinks = [
  { name: "Privacy Policy", href: "/contact" },
  { name: "Terms of Service", href: "/safari-packages" },
];

export default function Footer() {
  return (
    <footer className="relative w-full bg-neutral-950 pt-20 pb-10 overflow-hidden border-t border-white/5 font-sans">
      
      {/* --- 1. Background Ambient Effects --- */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {/* Subtle Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ backgroundImage: 'radial-gradient(#22c55e 1px, transparent 1px)', backgroundSize: '32px 32px' }} 
        />
        {/* Glowing Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-[128px] -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px] translate-y-1/2" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* --- 2. Main Grid Layout --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          
          {/* Brand & Mission (Span 5) */}
          <div className="lg:col-span-5 space-y-8">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-green-900/20 border border-green-500/30 backdrop-blur-md shadow-[0_0_15px_rgba(34,197,94,0.2)] group-hover:shadow-[0_0_25px_rgba(34,197,94,0.4)] transition-all duration-500">
                <RabbitIcon className="h-7 w-7 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-extrabold text-white tracking-tight">Yala<span className="text-green-500">Wildlife</span></span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold">Safari Adventures</span>
              </div>
            </Link>
            
            <p className="text-neutral-400 text-base leading-relaxed max-w-md font-light">
              Experience the raw beauty of nature. We curate premium, eco-friendly safari tours that connect you with the wild heart of Sri Lanka.
            </p>

            <div className="flex items-center gap-4">
              {socialLinks.map(({ name, icon: Icon, href }) => (
                <Link
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  // ✅ FIX: Add this prop to ignore browser extension changes to the URL
                  suppressHydrationWarning={true}
                  className="group relative flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 transition-all duration-300 hover:border-green-500 hover:text-white hover:shadow-[0_0_15px_rgba(34,197,94,0.3)] overflow-hidden"
                >
                  <div className="absolute inset-0 bg-green-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <Icon className="relative h-4 w-4 z-10" />
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation Links (Span 2 + 2) */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-xs font-bold text-green-500 uppercase tracking-widest mb-2">Explore</h4>
            <ul className="space-y-4">
              {exploreLinks.map(({ name, href }) => (
                <li key={name}>
                  <Link href={href} className="text-sm text-neutral-400 hover:text-white hover:pl-2 transition-all duration-300 flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-700 group-hover:bg-green-500 transition-colors" />
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-xs font-bold text-green-500 uppercase tracking-widest mb-2">Contact</h4>
            <ul className="space-y-4">
              {contactLinks.map(({ name, href, icon: Icon }) => (
                <li key={name}>
                  <Link href={href} className="group flex items-start gap-3">
                    <Icon className="h-5 w-5 text-neutral-600 group-hover:text-green-500 transition-colors shrink-0 mt-0.5" />
                    {/* Added 'break-all' to fix the long email overflow issue */}
                    <span className="text-sm text-neutral-400 group-hover:text-white transition-colors leading-relaxed break-all">
                      {name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Card (Span 3) */}
          <div className="lg:col-span-3">
            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-b from-neutral-800/50 to-neutral-900/50 border border-white/10 p-6 backdrop-blur-md">
              <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              
              <h4 className="text-lg font-bold text-white mb-2">Join the Pack</h4>
              <p className="text-xs text-neutral-400 mb-6 leading-relaxed">
                Exclusive sightings, safari tips, and special offers delivered to your inbox.
              </p>
              
            </div>
          </div>

        </div>

        {/* --- 3. Bottom Bar --- */}
        <div className="border-t border-neutral-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <p className="text-neutral-500 text-xs font-medium order-2 md:order-1">
            © {new Date().getFullYear()} Yala Wildlife. All rights reserved.
          </p>
          
          {/* Legal Links */}
          <div className="flex items-center gap-8 order-1 md:order-2">
            {legalLinks.map(({ name, href }) => (
              <Link
                key={name}
                href={href}
                className="text-xs font-medium text-neutral-500 hover:text-green-400 transition-colors hover:underline decoration-green-500/50 underline-offset-4"
              >
                {name}
              </Link>
            ))}
          </div>

          {/* Credits Badge */}
          <div className="order-3">
            <a 
              href="#" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 px-4 py-2 rounded-full transition-all duration-300 group"
            >
              <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider group-hover:text-white">Built by</span>
              <span className="text-xs font-bold text-white group-hover:text-green-400 flex items-center gap-1">
                Pasindu <Heart className="h-3 w-3 text-red-500 fill-red-500 animate-pulse" />
              </span>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}








