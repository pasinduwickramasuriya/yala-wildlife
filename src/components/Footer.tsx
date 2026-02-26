
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Facebook,
  Instagram,
  Twitter,
  Heart,
  MapPin,
  Phone,
  Mail,
  ChevronRight,
} from "lucide-react";

// --- Animation Config (Webflow Easing) ---
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    }
  }
};

// --- Data Arrays ---
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
    <footer className="relative bg-[#0a0a0a] text-[#d1d1d6] overflow-hidden selection:bg-[#00ff00] selection:text-black">

      {/* --- BACKGROUND LAYER --- */}
      <div className="absolute inset-0 z-0 opacity-60">
        <Image
          src="/uploads/1748935199061-20250603_1239_Leopard Emerges from Darkness_simple_compose_01jwt9yv7qect8krxy794bcr23.webp"
          alt="Yala Leopard"
          fill
          className="object-cover object-center grayscale-[0.5]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent" />
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
        className="relative z-10 max-w-[1024px] mx-auto px-6 py-16"
      >

        {/* --- TOP BRAND SECTION --- */}
        <div className="flex flex-col md:flex-row justify-between items-start border-b border-white/10 pb-12 mb-12 gap-8">
          <motion.div variants={fadeInUp} className="max-w-sm">
            <h2 className="text-[#00ff00] text-3xl font-black uppercase tracking-tighter mb-4 leading-none">
              YALA
              <br /><span className="text-[#00ff00]">WILDLIFE</span>
            </h2>
            <div className="space-y-4">
              <p className="text-[13px] leading-relaxed text-white font-medium">
                As Sri Lanka&apos;s premier eco-expedition partner, Yala Wildlife operates with a strict &quot;Nature First&quot; policy. We bridge luxury and raw wilderness, ensuring every journey supports local conservation efforts and ethical wildlife tracking.
              </p>
              <p className="text-[11px] leading-relaxed text-[#86868b] uppercase tracking-widest font-bold">
                1. Licensed Trackers Only • Guaranteed Ethical Observations • Federal Wildlife Safety Compliant.
              </p>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex flex-col gap-6">
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#00ff00]">Secure Comms</span>
            <div className="flex flex-col gap-3">
              <a href="tel:+94778158004" className="group flex items-center gap-3">
                <div className="p-2 rounded-full bg-white/5 border border-white/10 group-hover:border-[#00ff00]/50 transition-colors duration-300">
                  <Phone size={14} className="text-[#00ff00]" />
                </div>
                <span className="text-white text-sm font-bold tracking-tight">+94 77 815 8004</span>
              </a>
              <a href="mailto:pasinduwick@icloud.com" className="group flex items-center gap-3">
                <div className="p-2 rounded-full bg-white/5 border border-white/10 group-hover:border-[#00ff00]/50 transition-colors duration-300">
                  <Mail size={14} className="text-[#00ff00]" />
                </div>
                <span className="text-white text-sm font-bold tracking-tight">pasinduwick@icloud.com</span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* --- NAVIGATION GRID --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <motion.div variants={fadeInUp} className="flex flex-col gap-4">
            <h4 className="text-white text-[12px] font-black uppercase tracking-widest">Explore</h4>
            <ul className="flex flex-col gap-3">
              {navigation.explore.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="group text-[13px] text-[#86868b] hover:text-[#00ff00] transition-colors flex items-center gap-1">
                    <ChevronRight size={10} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex flex-col gap-4">
            <h4 className="text-white text-[12px] font-black uppercase tracking-widest">Support</h4>
            <ul className="flex flex-col gap-3">
              {navigation.support.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="group text-[13px] text-[#86868b] hover:text-[#00ff00] transition-colors flex items-center gap-1">
                    <ChevronRight size={10} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex flex-col gap-4">
            <h4 className="text-white text-[12px] font-black uppercase tracking-widest">HQ_Location</h4>
            <div className="flex items-start gap-3 text-[13px] text-[#86868b] leading-loose">
              <MapPin size={16} className="text-[#00ff00] shrink-0 mt-1" />
              <span>Wickrama,kasingama<br />Yala Entrance Road,<br />Southern Province, Sri Lanka</span>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex flex-col gap-4">
            <h4 className="text-white text-[12px] font-black uppercase tracking-widest">Social_Signals</h4>
            <div className="flex gap-4">
              {socialLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-[#00ff00]/50 hover:text-[#00ff00] transition-all duration-500"
                >
                  <link.icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* --- BOTTOM BAR --- */}
        <motion.div variants={fadeInUp} className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 text-[11px] font-bold tracking-tight text-[#636366]">
            <p className="text-[#86868b]">© {currentYear} Yala Wildlife Adventure Inc.</p>
            {navigation.legal.map((item) => (
              <Link key={item.name} href={item.href} className="hover:text-white transition-colors duration-300">{item.name}</Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 group cursor-pointer bg-white/5 px-4 py-2 rounded-full border border-white/10 transition-all duration-500 hover:bg-[#00ff00]/10 hover:border-[#00ff00]/30">
              <span className="text-[10px] uppercase font-black tracking-widest text-white/60">Architect</span>
              <span className="text-[11px] font-black text-white group-hover:text-[#00ff00] transition-colors">PASINDU</span>
              <Heart size={10} className="text-[#00ff00] fill-current animate-pulse" />
            </div>
          </div>
        </motion.div>

      </motion.div>
    </footer>
  );
}