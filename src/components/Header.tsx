// "use client";

// import {
//   motion,
//   AnimatePresence,
//   useScroll,
//   useMotionValueEvent,
// } from "framer-motion";
// import { ChevronDown, Menu, X } from "lucide-react";
// import Link from "next/link";
// import React, { useState, useEffect } from "react";
// import { ModeToggle } from "./ModeToggle";
// // 1. Import CSS
// import "@/app/style/header.css";

// // --- Icon Component ---
// const PawPrintIcon = ({ className }: { className?: string }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     className={className} // Class passed from parent controls color
//   >
//     <path d="M12 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
//     <path d="M17.5 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
//     <path d="M6.5 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
//     <path d="M15.5 19.5c.5-1.5 1-3.5 0-5" />
//     <path d="M8.5 19.5c-.5-1.5-1-3.5 0-5" />
//     <path d="M12 21a7.5 7.5 0 0 0 5-2.5c1.5-2 0-5.5-5-5.5s-6.5 3.5-5 5.5A7.5 7.5 0 0 0 12 21Z" />
//   </svg>
// );

// // Define the Package type
// interface Package {
//   id: string;
//   name: string;
//   slug: string;
//   description?: string;
//   price?: number;
//   imageUrl?: string;
// }

// // Interface for NavItems
// interface NavItemsProps {
//   items: { name: string; link: string }[];
//   packages: Package[];
//   className?: string;
//   onItemClick?: () => void;
// }

// export default function Header() {
//   const { scrollY } = useScroll();

//   const [isOpen, setIsOpen] = useState(false);
//   const [visible, setVisible] = useState(false);
//   const [packages, setPackages] = useState<Package[]>([]);
//   const [expandedPackages, setExpandedPackages] = useState(false);

//   useMotionValueEvent(scrollY, "change", (latest) => {
//     const isScrolled = latest > 100;
//     if (isScrolled !== visible) {
//       setVisible(isScrolled);
//     }
//   });

//   useEffect(() => {
//     const fetchPackages = async () => {
//       try {
//         const response = await fetch("/api/package");
//         if (!response.ok) throw new Error("Failed to fetch packages");
//         const data = await response.json();
//         setPackages(data);
//       } catch (error) {
//         console.error("Error fetching packages:", error);
//       }
//     };
//     fetchPackages();
//   }, []);

//   const toggleMenu = () => {
//     setIsOpen((prev) => !prev);
//     setExpandedPackages(false);
//   };

//   const closeMenu = () => {
//     setIsOpen(false);
//     setExpandedPackages(false);
//   };

//   const handleLinkClick = () => closeMenu();

//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "unset";
//     }
//     return () => {
//       document.body.style.overflow = "unset";
//     };
//   }, [isOpen]);

//   const navItems = [
//     { name: "Home", link: "/" },
//     { name: "Safari Packages", link: "/safari-packages" },
//     { name: "Tours/pickup-Dropoff", link: "/pickup-dropoff" },
//     { name: "About", link: "/about" },
//     { name: "Contact", link: "/contact" },
//     { name: "Reviews", link: "/reviews" },
//     { name: "Blog", link: "/blog" },
//   ];

//   return (
//     <>
//       <motion.header className="site-header">
//         {/* --- DESKTOP NAV --- */}
//         <NavBody visible={visible}>
//           {/* Logo */}
//           <Link href="/" className="logo-desktop">
//             <PawPrintIcon className="w-6 h-6 text-[#00ff00]" />
//             <span className="logo-text">Yala Wildlife</span>
//           </Link>

//           {/* Navigation Items */}
//           <NavItems
//             items={navItems}
//             packages={packages}
//             className="flex-1 justify-center"
//           />

//           {/* Right Actions */}
//           <div className="actions-container">
//             <ModeToggle />
//             <div className="separator"></div>
//             <Link href="/safari-packages" className="book-btn">
//               Book Now
//             </Link>
//           </div>
//         </NavBody>

//         {/* --- MOBILE NAV --- */}
//         <MobileNavWrapper>
//           {/* Left Pill: Logo */}
//           <Link href="/" className="mobile-pill">
//             <PawPrintIcon className="w-5 h-5 text-[#00ff00]" />
//             <span className="font-bold text-[#00ff00] text-sm">Yala Wildlife</span>
//           </Link>

//           {/* Right Pill: Menu Button */}
//           <button
//             onClick={toggleMenu}
//             className="mobile-pill mobile-menu-btn"
//             aria-label="Toggle menu"
//           >
//             <AnimatePresence mode="wait">
//               {isOpen ? (
//                 <motion.div
//                   key="close"
//                   initial={{ rotate: -90, opacity: 0 }}
//                   animate={{ rotate: 0, opacity: 1 }}
//                   exit={{ rotate: 90, opacity: 0 }}
//                   transition={{ duration: 0.2 }}
//                 >
//                   <X className="w-5 h-5" />
//                 </motion.div>
//               ) : (
//                 <motion.div
//                   key="menu"
//                   initial={{ rotate: 90, opacity: 0 }}
//                   animate={{ rotate: 0, opacity: 1 }}
//                   exit={{ rotate: -90, opacity: 0 }}
//                   transition={{ duration: 0.2 }}
//                 >
//                   <Menu className="w-5 h-5" />
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </button>
//         </MobileNavWrapper>
//       </motion.header>

//       {/* Full-Screen Mobile Menu */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             className="mobile-overlay"
//           >
//             <div className="overlay-backdrop" onClick={closeMenu} />

//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               className="mobile-content"
//             >
//               <div className="mobile-inner">

//                 {/* Close Button */}
//                 <motion.button onClick={closeMenu} className="close-btn">
//                   <X className="w-6 h-6" />
//                 </motion.button>

//                 {/* <div className="text-center mb-10">
//                   <Link href="/" onClick={handleLinkClick} className="mobile-logo-text">
//                     <PawPrintIcon className="w-10 h-10" />
//                     <span>Yala Wildlife</span>
//                   </Link>
//                 </div> */}

//                 <div className="mobile-link-container">
//                   {navItems.map((item, idx) => (
//                     <motion.div
//                       key={item.name}
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: 0.1 + idx * 0.05 }}
//                       className="w-full text-center"
//                     >
//                       {item.name === "Safari Packages" ? (
//                         <div className="flex flex-col items-center">
//                           <button
//                             onClick={() => setExpandedPackages(!expandedPackages)}
//                             className="mobile-dropdown-btn"
//                           >
//                             <span>{item.name}</span>
//                             <ChevronDown className={`h-5 w-5 transition-transform ${expandedPackages ? "rotate-180" : ""}`} />
//                           </button>
//                           <AnimatePresence>
//                             {expandedPackages && (
//                               <motion.div
//                                 initial={{ height: 0, opacity: 0 }}
//                                 animate={{ height: "auto", opacity: 1 }}
//                                 exit={{ height: 0, opacity: 0 }}
//                                 className="mobile-sub-menu"
//                               >
//                                 <div className="mobile-sub-inner">
//                                   {packages.length > 0 ? (
//                                     packages.map((pkg) => (
//                                       <Link key={pkg.id} href={`/safari-packages/${pkg.slug}`} onClick={handleLinkClick} className="mobile-sub-link">
//                                         {pkg.name}
//                                       </Link>
//                                     ))
//                                   ) : (
//                                     <div className="text-sm text-neutral-500">Loading...</div>
//                                   )}
//                                 </div>
//                               </motion.div>
//                             )}
//                           </AnimatePresence>
//                         </div>
//                       ) : (
//                         <Link href={item.link} onClick={handleLinkClick} className="mobile-main-link">
//                           {item.name}
//                         </Link>
//                       )}
//                     </motion.div>
//                   ))}
//                 </div>

//                 <div className="mt-12 flex flex-col items-center gap-6 w-full">
//                   <Link href="/safari-packages" onClick={handleLinkClick} className="mobile-cta-btn">
//                     Book Now
//                   </Link>
//                   <div className="mobile-theme-wrapper">
//                     <span className="text-xs text-neutral-400">Theme</span>
//                     <ModeToggle />
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }

// // --- DESKTOP CONTAINER ---
// const NavBody = ({
//   children,
//   visible,
// }: {
//   children: React.ReactNode;
//   visible?: boolean;
// }) => (
//   <motion.div
//     animate={{ y: visible ? 0 : 0 }}
//     transition={{ type: "spring", stiffness: 200, damping: 50 }}
//     className="nav-body"
//   >
//     <div className="nav-body-content">
//       {children}
//     </div>
//   </motion.div>
// );

// // --- MOBILE CONTAINER ---
// const MobileNavWrapper = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => (
//   <div className="mobile-nav-wrapper">
//     {children}
//   </div>
// );

// // --- NAV ITEMS ---
// const NavItems: React.FC<NavItemsProps> = ({
//   items,
//   packages,
//   className,
//   onItemClick,
// }) => {
//   const [hovered, setHovered] = useState<number | null>(null);

//   return (
//     <motion.div
//       onMouseLeave={() => setHovered(null)}
//       className={`nav-items-container ${className}`}
//     >
//       {items.map((item, idx) => (
//         <div key={item.name} className="nav-item-group">
//           <Link
//             onMouseEnter={() => setHovered(idx)}
//             onClick={onItemClick}
//             href={item.link}
//             className="nav-pill"
//           >
//             {hovered === idx && (
//               <motion.div
//                 layoutId="hovered"
//                 className="hover-bg"
//                 transition={{ type: "spring", stiffness: 300, damping: 20 }}
//               />
//             )}

//             <span className={`nav-text ${hovered === idx ? "text-lime" : ""}`}>
//               {item.name}
//             </span>

//             {item.name === "Safari Packages" && (
//               <ChevronDown className={`dropdown-icon ${hovered === idx ? "rotate" : ""}`} />
//             )}
//           </Link>

//           {item.name === "Safari Packages" && (
//             <div className="dropdown-menu">
//               {packages.length > 0 ? (
//                 <div className="flex flex-col gap-1">
//                   {packages.map((pkg) => (
//                     <Link
//                       key={pkg.id}
//                       href={`/safari-packages/${pkg.slug}`}
//                       className="dropdown-link"
//                       onClick={onItemClick}
//                     >
//                       {pkg.name}
//                     </Link>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="px-3 py-2 text-xs text-neutral-500 text-center">
//                   Loading...
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       ))}
//     </motion.div>
//   );
// };


















"use client";

import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { X, ArrowUpRight, Instagram, Phone, Globe, ChevronDown, Calendar } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import "@/app/style/header.css";

interface Package {
  id: string;
  name: string;
  slug: string;
}

const YalaLogo = () => (
  <div className="group flex items-center gap-3">
    <img
      src="/favicon-96x96.png"
      alt="Yala Wildlife"
      className="w-9 h-9 object-contain group-hover:rotate-[15deg] transition-transform duration-500"
    />
    <div className="flex flex-col leading-none">
      <span className="text-[9px] font-black text-[#00ff00] uppercase tracking-[0.4em] mb-1">Yala</span>
      <span className="text-xs font-bold text-white uppercase tracking-tighter">Wildlife</span>
    </div>
  </div>
);

export default function Header() {
  const { scrollY } = useScroll();
  const [isOpen, setIsOpen] = useState(false);
  const [packages, setPackages] = useState<Package[]>([]);
  const [expandedPackages, setExpandedPackages] = useState(false);

  // Subtle header scaling on scroll
  const headerScale = useTransform(scrollY, [0, 100], [1, 0.97]);

  useEffect(() => {
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
  }, []);

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
  ];

  const closeMenu = () => {
    setIsOpen(false);
    setExpandedPackages(false);
  };

  return (
    <>
      <motion.header
        style={{ scale: headerScale }}
        className="fixed top-0 left-0 right-0 z-[100] flex justify-center p-5 md:p-8 pointer-events-none"
      >
        <div className="flex items-center gap-3 pointer-events-auto">
          {/* --- BRAND PILL --- */}
          <Link href="/" className="bg-black/70  px-5 py-3 rounded-[2rem]  shadow-2xl">
            <YalaLogo />
          </Link>

          {/* --- HAMBURGER --- */}
          <button
            onClick={() => setIsOpen(true)}
            className="group flex items-center gap-4 bg-black/70 backdrop-blur-md pl-5 pr-2 py-2 rounded-[2rem]   shadow-2xl  transition-all"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white group-hover:text-[#00ff00] transition-colors">Menu</span>
            <div className="w-10 h-10 bg-white/5 group-hover:bg-[#00ff00] rounded-full flex flex-col items-center justify-center gap-1 transition-all">
              <span className="w-4 h-[2px] bg-white group-hover:bg-black transition-colors" />
              <span className="w-2.5 h-[2px] bg-white group-hover:bg-black self-end mr-3 transition-colors" />
            </div>
          </button>

          {/* --- EXTERNAL QUICK ACTION (DESKTOP ONLY) --- */}
          <Link href="/safari-packages" className="hidden sm:flex items-center gap-3 bg-[#00ff00] text-black px-7 py-3.5 rounded-[2rem] font-black uppercase text-[10px] tracking-[0.2em] hover:brightness-110 active:scale-95 transition-all">
            Book Now
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.header>

      {/* --- OVERLAY MENU --- */}
      {/* --- OVERLAY MENU --- */}
<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[200] bg-white text-black flex flex-col p-6 md:p-16 overflow-y-auto"
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
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.04 }}
            >
              {item.name === "Safari Packages" ? (
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => setExpandedPackages(!expandedPackages)}
                    className="text-4xl md:text-[5vw] font-black uppercase tracking-tighter leading-tight hover:text-[#00aa00] transition-all flex items-center justify-center gap-4"
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

                  <AnimatePresence>
                    {expandedPackages && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden flex flex-col items-center mt-4 space-y-3"
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
                      </motion.div>
                    )}
                  </AnimatePresence>
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
            </motion.div>
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
    </motion.div>
  )}
</AnimatePresence>
    </>
  );
}