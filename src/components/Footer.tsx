// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import {
//   Facebook,
//   Instagram,
//   Twitter,
//   MapPin,
//   Phone,
//   Mail,
//   Package,
//   Users,
//   MessageSquare,
//   HelpCircle,
//   Heart
// } from "lucide-react";
// import { cn } from "@/lib/utils";

// // --- Assets ---
// const BG_IMAGE = "/uploads/1748935199061-20250603_1239_Leopard Emerges from Darkness_simple_compose_01jwt9yv7qect8krxy794bcr23.webp";

// // --- Brand Icon ---
// const RabbitIcon = ({ className }: { className?: string }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     className={cn("text-green-400", className)}
//   >
//     <path d="M12 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
//     <path d="M17.5 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
//     <path d="M6.5 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
//     <path d="M15.5 19.5c.5-1.5 1-3.5 0-5" />
//     <path d="M8.5 19.5c-.5-1.5-1-3.5 0-5" />
//     <path d="M12 21a7.5 7.5 0 0 0 5-2.5c1.5-2 0-5.5-5-5.5s-6.5 3.5-5 5.5A7.5 7.5 0 0 0 12 21Z" />
//   </svg>
// );

// // --- Data ---
// const contactLinks = [
//   { name: "Yala National Park, Sri Lanka", href: "#", icon: MapPin },
//   { name: "+94 778 158 004", href: "tel:+94778158004", icon: Phone },
//   { name: "pasinduwick@icloud.com", href: "mailto:pasinduwick@icloud.com", icon: Mail },
// ];

// const exploreLinks = [
//   { name: "Safari Packages", href: "/safari-packages", icon: Package },
//   { name: "About Us", href: "/about", icon: Users },
//   { name: "Blog", href: "/blog", icon: MessageSquare },
//   { name: "Booking & FAQs", href: "/safari-packages", icon: HelpCircle },
//   { name: "Pickup & Dropoff", href: "/pickup-dropoff", icon: HelpCircle },
// ];

// const socialLinks = [
//   { name: "Facebook", icon: Facebook, href: "https://web.facebook.com/ceylonnaturesafari" },
//   { name: "Instagram", icon: Instagram, href: "https://web.facebook.com/ceylonnaturesafari" },
//   { name: "Twitter", icon: Twitter, href: "https://web.facebook.com/ceylonnaturesafari" },
// ];

// const legalLinks = [
//   { name: "Privacy Policy", href: "/contact" },
//   { name: "Terms of Service", href: "/safari-packages" },
// ];

// export default function Footer() {
//   return (
//     <footer className="relative w-full bg-neutral-950 pt-32 pb-10 overflow-hidden border-t border-white/5 font-sans">
      
//       {/* --- 0. BACKGROUND IMAGE LAYER --- */}
//       <div className="absolute inset-0 w-full h-full z-0 select-none">
//         <Image 
//           src={BG_IMAGE}
//           alt="Yala Leopard"
//           fill
//           priority={false}
//           className="object-cover object-top opacity-80" 
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-neutral-950/10" />
//       </div>

//       {/* --- 1. Background Textures --- */}
//       <div className="absolute inset-0 w-full h-full pointer-events-none transform-gpu z-0">
//         <div 
//           className="absolute inset-0 opacity-[0.03] mix-blend-overlay" 
//           style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }} 
//         />
//       </div>

//       <div className="container mx-auto px-6 md:px-12 relative z-10">
        
//         {/* --- 2. Main Grid Layout --- */}
//         {/* Added text-center for mobile, lg:text-left for desktop */}
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-20 text-center lg:text-left">
          
//           {/* Brand & Mission (Span 5) */}
//           <div className="lg:col-span-5 space-y-8">
//             {/* Logo: Centered on mobile (mx-auto), left on desktop (lg:mx-0) */}
//             <Link href="/" className="inline-flex items-center gap-3 group mx-auto lg:mx-0">
//               <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-green-900/20 border border-green-500/30 backdrop-blur-md transition-all duration-500">
//                 <RabbitIcon className="h-7 w-7 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6" />
//               </div>
//               <div className="flex flex-col items-start">
//                 <span className="text-2xl font-extrabold text-white tracking-tight drop-shadow-md">Yala<span className="text-green-500">Wildlife</span></span>
//                 <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-bold">Safari Adventures</span>
//               </div>
//             </Link>
            
//             {/* Description: Centered on mobile (mx-auto), left on desktop (lg:mx-0) */}
//             <p className="text-neutral-300 text-base leading-relaxed max-w-md font-light drop-shadow-md mx-auto lg:mx-0">
//               Experience the raw beauty of nature. We curate premium, eco-friendly safari tours that connect you with the wild heart of Sri Lanka.
//             </p>

//             {/* Social Icons: Centered on mobile (justify-center), left on desktop (lg:justify-start) */}
//             <div className="flex items-center justify-center lg:justify-start gap-4">
//               {socialLinks.map(({ name, icon: Icon, href }) => (
//                 <a
//                   key={name}
//                   href={href}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   aria-label={name}
//                   className="group relative flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 text-neutral-400 transition-all duration-300 hover:border-green-500 hover:text-white overflow-hidden"
//                 >
//                   <div className="absolute inset-0 bg-green-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
//                   <Icon className="relative h-4 w-4 z-10" />
//                 </a>
//               ))}
//             </div>
//           </div>

//           {/* Navigation Links (Span 2 + 2) */}
//           <div className="lg:col-span-2 space-y-6">
//             <h4 className="text-xs font-bold text-green-500 uppercase tracking-widest mb-2 drop-shadow-sm">Explore</h4>
//             <ul className="space-y-4">
//               {exploreLinks.map(({ name, href }) => (
//                 <li key={name}>
//                   {/* Link: Centered flex on mobile (justify-center), left on desktop (lg:justify-start) */}
//                   <Link href={href} className="text-sm text-neutral-300 hover:text-white hover:pl-2 transition-all duration-300 flex items-center justify-center lg:justify-start gap-2 group drop-shadow-sm">
//                     <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 group-hover:bg-green-500 transition-colors" />
//                     {name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className="lg:col-span-2 space-y-6">
//             <h4 className="text-xs font-bold text-green-500 uppercase tracking-widest mb-2 drop-shadow-sm">Contact</h4>
//             <ul className="space-y-4">
//               {contactLinks.map(({ name, href, icon: Icon }) => (
//                 <li key={name}>
//                   {/* Contact Link: Centered flex on mobile, left on desktop */}
//                   <a href={href} className="group flex items-center lg:items-start justify-center lg:justify-start gap-3">
//                     <Icon className="h-5 w-5 text-neutral-500 group-hover:text-green-500 transition-colors shrink-0 mt-0.5 drop-shadow-sm" />
//                     <span className="text-sm text-neutral-300 group-hover:text-white transition-colors leading-relaxed break-all drop-shadow-sm text-center lg:text-left">
//                       {name}
//                     </span>
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Newsletter Card (Span 3) */}
//           <div className="lg:col-span-3">
//             <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-b from-neutral-800/40 to-neutral-900/60 border border-white/10 p-6 backdrop-blur-md transform-gpu shadow-xl">
//               <h4 className="text-lg font-bold text-white mb-2 drop-shadow-md">Join the Pack</h4>
//               <p className="text-xs text-neutral-300 mb-6 leading-relaxed drop-shadow-sm">
//                 Exclusive sightings, safari tips, and special offers delivered to your inbox.
//               </p>
//             </div>
//           </div>

//         </div>

//         {/* --- 3. Bottom Bar --- */}
//         <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
//           {/* Copyright */}
//           <p className="text-neutral-400 text-xs font-medium order-2 md:order-1 drop-shadow-md text-center md:text-left">
//             © <span suppressHydrationWarning>{new Date().getFullYear()}</span> Yala Wildlife. All rights reserved.
//           </p>
          
//           {/* Legal Links */}
//           <div className="flex items-center gap-8 order-1 md:order-2">
//             {legalLinks.map(({ name, href }) => (
//               <Link
//                 key={name}
//                 href={href}
//                 className="text-xs font-medium text-neutral-400 hover:text-green-400 transition-colors hover:underline decoration-green-500/50 underline-offset-4 drop-shadow-md"
//               >
//                 {name}
//               </Link>
//             ))}
//           </div>

//           {/* Credits */}
//           <div className="order-3">
//             <a 
//               href="#" 
//               target="_blank" 
//               rel="noreferrer"
//               className="flex items-center gap-2 bg-neutral-900/60 hover:bg-neutral-800 border border-white/10 px-4 py-2 rounded-full transition-all duration-300 group backdrop-blur-md"
//             >
//               <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider group-hover:text-white">Built by</span>
//               <span className="text-xs font-bold text-white group-hover:text-green-400 flex items-center gap-1">
//                 Pasindu <Heart className="h-3 w-3 text-red-500 fill-red-500 animate-pulse" />
//               </span>
//             </a>
//           </div>
//         </div>

//       </div>
//     </footer>
//   );
// }






"use client";

import Link from "next/link";
import Image from "next/image";
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
import "@/app/style/footer.css"; // 1. Import CSS

// --- Assets ---
const BG_IMAGE = "/uploads/1748935199061-20250603_1239_Leopard Emerges from Darkness_simple_compose_01jwt9yv7qect8krxy794bcr23.webp";

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
    className={className}
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
  { name: "Booking & FAQs", href: "/safari-packages", icon: HelpCircle },
  { name: "Pickup & Dropoff", href: "/pickup-dropoff", icon: HelpCircle },
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
    <footer className="site-footer">
      
      {/* --- 0. BACKGROUND IMAGE LAYER --- */}
      <div className="footer-bg-image-wrapper">
        <Image 
          src={BG_IMAGE}
          alt="Yala Leopard"
          fill
          priority={false}
          className="footer-bg-image" 
        />
        <div className="footer-bg-overlay" />
      </div>

      {/* --- 1. Background Textures --- */}
      <div className="footer-texture">
        <div className="footer-texture-inner" />
      </div>

      <div className="footer-container">
        
        {/* --- 2. Main Grid Layout --- */}
        <div className="footer-grid">
          
          {/* Brand & Mission */}
          <div className="brand-column">
            <Link href="/" className="brand-link group">
              <div className="brand-icon-box">
                <RabbitIcon className="rabbit-icon" />
              </div>
              <div className="brand-text-col">
                <span className="brand-title">Yala<span>Wildlife</span></span>
                <span className="brand-subtitle">Safari Adventures</span>
              </div>
            </Link>
            
            <p className="brand-desc">
              Experience the raw beauty of nature. We curate premium, eco-friendly safari tours that connect you with the wild heart of Sri Lanka.
            </p>

            <div className="social-row">
              {socialLinks.map(({ name, icon: Icon, href }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="social-btn"
                >
                  <div className="social-fill" />
                  <Icon className="social-icon" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="links-column">
            <h4 className="column-title">Explore</h4>
            <ul className="links-list">
              {exploreLinks.map(({ name, href }) => (
                <li key={name}>
                  <Link href={href} className="footer-link">
                    <span className="link-dot" />
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Links */}
          <div className="links-column">
            <h4 className="column-title">Contact</h4>
            <ul className="links-list">
              {contactLinks.map(({ name, href, icon: Icon }) => (
                <li key={name}>
                  <a href={href} className="contact-link">
                    <Icon className="contact-icon" />
                    <span className="contact-text">
                      {name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Card */}
          <div className="links-column newsletter-column">
            <div className="newsletter-card">
              <h4 className="newsletter-title">Join the Pack</h4>
              <p className="newsletter-desc">
                Exclusive sightings, safari tips, and special offers delivered to your inbox.
              </p>
            </div>
          </div>

        </div>

        {/* --- 3. Bottom Bar --- */}
        <div className="bottom-bar">
          {/* Copyright */}
          <p className="copyright">
            © <span suppressHydrationWarning>{new Date().getFullYear()}</span> Yala Wildlife. All rights reserved.
          </p>
          
          {/* Legal Links */}
          <div className="legal-links">
            {legalLinks.map(({ name, href }) => (
              <Link
                key={name}
                href={href}
                className="legal-link"
              >
                {name}
              </Link>
            ))}
          </div>

          {/* Credits */}
          <div className="credits-box">
            <a 
              href="#" 
              target="_blank" 
              rel="noreferrer"
              className="credits-link"
            >
              <span className="credits-label">Built by</span>
              <span className="credits-name">
                Pasindu <Heart className="heart-icon" />
              </span>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}