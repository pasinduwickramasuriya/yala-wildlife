

// "use client";

// import { cn } from "@/lib/utils";
// import {
//   motion,
//   AnimatePresence,
//   useScroll,
//   useMotionValueEvent,
// } from "framer-motion";
// import { ChevronDown, Menu, X } from "lucide-react";
// import Link from "next/link";
// import React, { useRef, useState, useEffect } from "react";
// import { ModeToggle } from "./ModeToggle";

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
//   const ref = useRef<HTMLDivElement>(null);
//   const { scrollY } = useScroll({
//     target: ref,
//     offset: ["start start", "end start"],
//   });
//   const [isOpen, setIsOpen] = useState(false);
//   const [visible, setVisible] = useState(false);
//   const [packages, setPackages] = useState<Package[]>([]);
//   const [expandedPackages, setExpandedPackages] = useState(false);

//   // Handle scroll effect
//   useMotionValueEvent(scrollY, "change", (latest) => {
//     setVisible(latest > 100);
//   });

//   // Fetch packages from API
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

//   // Toggle mobile menu
//   const toggleMenu = () => {
//     setIsOpen((prev) => !prev);
//     setExpandedPackages(false);
//   };

//   const closeMenu = () => {
//     setIsOpen(false);
//     setExpandedPackages(false);
//   };

//   const handleLinkClick = () => closeMenu();

//   // Lock body scroll when menu is open
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
//     { name: "pickup-Dropoff", link: "/pickup-dropoff" },
//     { name: "About", link: "/about" },
//     { name: "Contact", link: "/contact" },
//     { name: "Reviews", link: "/reviews" },
//     { name: "Blog", link: "/blog" },
//   ];

//   return (
//     <>
//       <motion.header
//         ref={ref}
//         className={cn(
//           "fixed inset-x-0 top-0 z-50 w-full transition-all duration-500"
//         )}
//       >
//         {/* Desktop Nav */}
//         <NavBody visible={visible}>
//           <Link
//             href="/"
//             className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-xs font-bold text-green-400 hover:text-red-400"
//           >
//             <PawPrintIcon className="w-8 h-8" />
//             <span>Yala Wildlife</span>
//           </Link>
//           <NavItems
//             items={navItems}
//             packages={packages}
//             className="flex-1 justify-center"
//           />
//           <div className="flex items-center space-x-4">
//             <ModeToggle />
//             <Link
//               href="/safari-packages"
//               className={cn(
//                 "px-4 py-1.5 rounded-2xl bg-green-400 text-black text-xs font-bold hover:bg-green-900/20 transition-all duration-300",
//                 visible && "shadow-[0_4px_12px_rgba(0,_0,_0,_0.15)]"
//               )}
//             >
//               Book Now
//             </Link>
//           </div>
//         </NavBody>

//         {/* Mobile Nav */}
//         <MobileNav visible={visible}>
//           <div className="flex w-full items-center justify-between">
//             <Link
//               href="/"
//               className="flex items-center gap-2 text-lg font-bold text-green-400 hover:text-green-400 transition-colors duration-300"
//             >
//               <PawPrintIcon className="w-5 h-5" />
//               <span>Yala Wildlife</span>
//             </Link>
//             <button
//               onClick={toggleMenu}
//               className="text-white focus:outline-none p-1 menu-button"
//               aria-label="Toggle menu"
//             >
//               <AnimatePresence mode="wait">
//                 {isOpen ? (
//                   <motion.div
//                     key="close"
//                     initial={{ rotate: -90, opacity: 0 }}
//                     animate={{ rotate: 0, opacity: 1 }}
//                     exit={{ rotate: 90, opacity: 0 }}
//                     transition={{ duration: 0.2 }}
//                   >
//                     <X className="w-5 h-5" />
//                   </motion.div>
//                 ) : (
//                   <motion.div
//                     key="menu"
//                     initial={{ rotate: 90, opacity: 0 }}
//                     animate={{ rotate: 0, opacity: 1 }}
//                     exit={{ rotate: -90, opacity: 0 }}
//                     transition={{ duration: 0.2 }}
//                   >
//                     <Menu className="w-5 h-5" />
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </button>
//           </div>
//         </MobileNav>
//       </motion.header>

//       {/* Full-Screen Mobile Menu */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             className="fixed inset-0 z-40 lg:hidden"
//           >
//             {/* Multi-Layer Blurred Backdrop for Better Browser Support */}
//             <div className="absolute inset-0">
//               {/* Layer 1: Base dark background */}
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ duration: 0.3 }}
//                 className="absolute inset-0 bg-black"
//                 style={{ opacity: 0.92 }}
//                 onClick={closeMenu}
//               />

//               {/* Layer 2: Blur effect (Safari compatible) */}
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ duration: 0.4 }}
//                 className="absolute inset-0 backdrop-blur-3xl"
//                 style={{
//                   WebkitBackdropFilter: "blur(30px)",
//                   backdropFilter: "blur(30px)"
//                 }}
//                 onClick={closeMenu}
//               />

//               {/* Layer 3: Additional dark overlay for depth */}
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ duration: 0.4 }}
//                 className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/80"
//                 onClick={closeMenu}
//               />
//             </div>

//             {/* Menu Content - Centered */}
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               transition={{ type: "spring", damping: 25, stiffness: 300 }}
//               className="absolute inset-0 flex items-center justify-center pointer-events-none"
//             >
//               <div className="w-full max-w-md mx-auto px-6 pointer-events-auto">
//                 {/* Close Button - Top Right */}
//                 <motion.button
//                   initial={{ scale: 0, rotate: -180 }}
//                   animate={{ scale: 1, rotate: 0 }}
//                   exit={{ scale: 0, rotate: 180 }}
//                   transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
//                   onClick={closeMenu}
//                   className="fixed top-6 right-6 flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl text-white hover:bg-white/20 transition-all duration-300 z-50"
//                   aria-label="Close menu"
//                   style={{
//                     WebkitBackdropFilter: "blur(20px)",
//                     backdropFilter: "blur(20px)"
//                   }}
//                 >
//                   <X className="w-6 h-6" />
//                 </motion.button>

//                 {/* Logo - Top Center */}
//                 <motion.div
//                   initial={{ y: -50, opacity: 0 }}
//                   animate={{ y: 0, opacity: 1 }}
//                   transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
//                   className="text-center mb-12"
//                 >
//                   <Link
//                     href="/"
//                     onClick={handleLinkClick}
//                     className="inline-flex items-center gap-3 text-2xl font-bold text-green-400"
//                   >
//                     <PawPrintIcon className="w-8 h-8" />
//                     <span>Yala Wildlife</span>
//                   </Link>
//                 </motion.div>

//                 {/* Menu Items - Centered */}
//                 <div className="flex flex-col items-center gap-6">
//                   {navItems.map((item, idx) => (
//                     <motion.div
//                       key={item.name}
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{
//                         delay: 0.1 + idx * 0.05,
//                         type: "spring",
//                         stiffness: 200
//                       }}
//                       className="w-full"
//                     >
//                       {item.name === "Safari Packages" ? (
//                         <div className="text-center">
//                           <button
//                             onClick={() => setExpandedPackages(!expandedPackages)}
//                             className="flex items-center justify-center gap-2 text-lg font-semibold text-green-400 hover:text-green-300 transition-colors duration-300 mx-auto"
//                           >
//                             <span>{item.name}</span>
//                             <motion.div
//                               animate={{ rotate: expandedPackages ? 180 : 0 }}
//                               transition={{ duration: 0.3 }}
//                             >
//                               <ChevronDown className="h-5 w-5" />
//                             </motion.div>
//                           </button>

//                           <AnimatePresence>
//                             {expandedPackages && (
//                               <motion.div
//                                 initial={{ height: 0, opacity: 0 }}
//                                 animate={{ height: "auto", opacity: 1 }}
//                                 exit={{ height: 0, opacity: 0 }}
//                                 transition={{ duration: 0.3 }}
//                                 className="overflow-hidden mt-4"
//                               >
//                                 <div className="flex flex-col items-center gap-3">
//                                   {packages.length > 0 ? (
//                                     packages.map((pkg, pkgIdx) => (
//                                       <motion.div
//                                         key={pkg.id}
//                                         initial={{ opacity: 0, x: -20 }}
//                                         animate={{ opacity: 1, x: 0 }}
//                                         transition={{ delay: pkgIdx * 0.05 }}
//                                       >
//                                         <Link
//                                           href={`/safari-packages/${pkg.slug}`}
//                                           className="text-sm text-neutral-300 hover:text-green-400 transition-colors duration-200"
//                                           onClick={handleLinkClick}
//                                         >
//                                           {pkg.name}
//                                         </Link>
//                                       </motion.div>
//                                     ))
//                                   ) : (
//                                     <div className="text-sm text-neutral-400">
//                                       Loading packages...
//                                     </div>
//                                   )}
//                                 </div>
//                               </motion.div>
//                             )}
//                           </AnimatePresence>
//                         </div>
//                       ) : (
//                         <Link
//                           href={item.link}
//                           className="block text-center text-lg font-semibold text-green-400 hover:text-green-300 transition-colors duration-300"
//                           onClick={handleLinkClick}
//                         >
//                           {item.name}
//                         </Link>
//                       )}
//                     </motion.div>
//                   ))}
//                 </div>

//                 {/* Footer - Bottom Center */}
//                 <motion.div
//                   initial={{ y: 50, opacity: 0 }}
//                   animate={{ y: 0, opacity: 1 }}
//                   transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
//                   className="mt-12 flex flex-col items-center gap-6"
//                 >
//                   <Link
//                     href="/safari-packages"
//                     className="px-8 py-3 rounded-2xl bg-green-400 text-black text-sm font-bold hover:bg-green-500 transition-all duration-300 shadow-lg hover:shadow-green-400/50"
//                     onClick={handleLinkClick}
//                   >
//                     Book Now
//                   </Link>

//                   <div className="flex items-center gap-3">
//                     <span className="text-xs text-neutral-400">Theme:</span>
//                     <ModeToggle />
//                   </div>
//                 </motion.div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }

// // Desktop NavBody component
// const NavBody = ({
//   children,
//   visible,
// }: {
//   children: React.ReactNode;
//   visible?: boolean;
// }) => (
//   <motion.div
//     animate={{
//       backdropFilter: visible ? "blur(10px)" : "blur(6px)",
//       boxShadow: visible ? "0 4px 12px rgba(0, 0, 0, 0.15)" : "none",
//       y: visible ? 10 : 0,
//     }}
//     transition={{ type: "spring", stiffness: 200, damping: 50 }}
//     className={cn(
//       "hidden lg:flex mx-auto w-full max-w-7xl items-center justify-between rounded-2xl bg-black/30 backdrop-blur-md px-6 py-2"
//     )}
//   >
//     {children}
//   </motion.div>
// );

// // Mobile Nav component
// const MobileNav = ({
//   children,
//   visible,
// }: {
//   children: React.ReactNode;
//   visible?: boolean;
// }) => (
//   <motion.div
//     animate={{
//       backdropFilter: visible ? "blur(10px)" : "blur(6px)",
//       boxShadow: visible ? "0 4px 12px rgba(0, 0, 0, 0.15)" : "none",
//       width: visible ? "90%" : "100%",
//       paddingRight: visible ? "12px" : "0px",
//       paddingLeft: visible ? "12px" : "0px",
//       borderRadius: visible ? "16px" : "24px",
//       y: visible ? 10 : 0,
//     }}
//     transition={{ type: "spring", stiffness: 200, damping: 50 }}
//     className={cn(
//       "lg:hidden mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center bg-black/90 backdrop-blur-md px-4 py-2"
//     )}
//   >
//     {children}
//   </motion.div>
// );

// // NavItems component with packages dropdown
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
//       className={cn(
//         "flex flex-1 flex-row items-center justify-center space-x-2 text-xs font-medium text-white transition-all duration-300",
//         className
//       )}
//     >
//       {items.map((item, idx) => (
//         <div key={item.name} className="relative group">
//           <Link
//             onMouseEnter={() => setHovered(idx)}
//             onClick={onItemClick}
//             href={item.link}
//             className="relative px-3 py-1.5 text-xs text-white hover:text-green-400 flex items-center"
//           >
//             {hovered === idx && (
//               <motion.div
//                 layoutId="hovered"
//                 className="absolute inset-0 rounded-full bg-green-900/20"
//                 transition={{ type: "spring", stiffness: 200, damping: 20 }}
//               />
//             )}
//             <span className="relative z-10">{item.name}</span>
//             {item.name === "Safari Packages" && (
//               <ChevronDown className="ml-1 h-3 w-3" />
//             )}
//           </Link>
//           {item.name === "Safari Packages" && (
//             <div
//               className={cn(
//                 "absolute left-0 mt-2 w-44 bg-black/75 backdrop-blur-md rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.15)] p-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50"
//               )}
//             >
//               {packages.length > 0 ? (
//                 packages.map((pkg) => (
//                   <Link
//                     key={pkg.id}
//                     href={`/safari-packages/${pkg.slug}`}
//                     className="block px-3 py-1 text-xs text-neutral-400 hover:bg-green-900/20 rounded-md transition-colors duration-200"
//                     onClick={onItemClick}
//                   >
//                     {pkg.name}
//                   </Link>
//                 ))
//               ) : (
//                 <div className="px-3 py-1 text-xs text-neutral-400">
//                   Loading packages...
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

import { cn } from "@/lib/utils";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { ModeToggle } from "./ModeToggle";

// --- Icon Component ---
const PawPrintIcon = ({ className }: { className?: string }) => (
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

// Define the Package type
interface Package {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price?: number;
  imageUrl?: string;
}

// Interface for NavItems
interface NavItemsProps {
  items: { name: string; link: string }[];
  packages: Package[];
  className?: string;
  onItemClick?: () => void;
}

export default function Header() {
  // PERFORMANCE FIX: Removed 'ref' target. 
  // Tracking window scroll directly is much more performant for fixed headers.
  const { scrollY } = useScroll();

  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [packages, setPackages] = useState<Package[]>([]);
  const [expandedPackages, setExpandedPackages] = useState(false);

  // PERFORMANCE FIX: Prevent unnecessary re-renders
  useMotionValueEvent(scrollY, "change", (latest) => {
    const isScrolled = latest > 100;
    if (isScrolled !== visible) {
      setVisible(isScrolled);
    }
  });

  // Fetch packages from API
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch("/api/package");
        if (!response.ok) throw new Error("Failed to fetch packages");
        const data = await response.json();
        setPackages(data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };
    fetchPackages();
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
    setExpandedPackages(false);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setExpandedPackages(false);
  };

  const handleLinkClick = () => closeMenu();

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navItems = [
    { name: "Home", link: "/" },
    { name: "Safari Packages", link: "/safari-packages" },
    { name: "pickup-Dropoff", link: "/pickup-dropoff" },
    { name: "About", link: "/about" },
    { name: "Contact", link: "/contact" },
    { name: "Reviews", link: "/reviews" },
    { name: "Blog", link: "/blog" },
  ];

  return (
    <>
      <motion.header
        // PERFORMANCE FIX: Added transform-gpu to force hardware acceleration
        className={cn(
          "fixed inset-x-0 top-0 z-50 w-full transition-all duration-500 transform-gpu"
        )}
      >
        {/* Desktop Nav */}
        <NavBody visible={visible}>
          <Link
            href="/"
            className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-xs font-bold text-green-400 hover:text-red-400"
          >
            <PawPrintIcon className="w-8 h-8" />
            <span>Yala Wildlife</span>
          </Link>
          <NavItems
            items={navItems}
            packages={packages}
            className="flex-1 justify-center"
          />
          <div className="flex items-center space-x-4">
            <ModeToggle />
            <Link
              href="/safari-packages"
              className={cn(
                "px-4 py-1.5 rounded-2xl bg-green-400 text-black text-xs font-bold hover:bg-green-900/20 transition-all duration-300",
                visible && "shadow-[0_4px_12px_rgba(0,_0,_0,_0.15)]"
              )}
            >
              Book Now
            </Link>
          </div>
        </NavBody>

        {/* Mobile Nav */}
        <MobileNav visible={visible}>
          <div className="flex w-full items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-bold text-green-400 hover:text-green-400 transition-colors duration-300"
            >
              <PawPrintIcon className="w-5 h-5" />
              <span>Yala Wildlife</span>
            </Link>
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none p-1 menu-button"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </MobileNav>
      </motion.header>

      {/* Full-Screen Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            // PERFORMANCE FIX: Added transform-gpu to prevent scroll jank
            className="fixed inset-0 z-40 lg:hidden transform-gpu"
          >
            {/* Multi-Layer Blurred Backdrop for Better Browser Support */}
            <div className="absolute inset-0">
              {/* Layer 1: Base dark background */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-black"
                style={{ opacity: 0.92 }}
                onClick={closeMenu}
              />

              {/* Layer 2: Blur effect (Safari compatible) */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                // PERFORMANCE FIX: Added will-change-transform
                className="absolute inset-0 backdrop-blur-3xl will-change-transform"
                style={{
                  WebkitBackdropFilter: "blur(30px)",
                  backdropFilter: "blur(30px)"
                }}
                onClick={closeMenu}
              />

              {/* Layer 3: Additional dark overlay for depth */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/80"
                onClick={closeMenu}
              />
            </div>

            {/* Menu Content - Centered */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div className="w-full max-w-md mx-auto px-6 pointer-events-auto">
                {/* Close Button - Top Right */}
                <motion.button
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  onClick={closeMenu}
                  className="fixed top-6 right-6 flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl text-white hover:bg-white/20 transition-all duration-300 z-50"
                  aria-label="Close menu"
                  style={{
                    WebkitBackdropFilter: "blur(20px)",
                    backdropFilter: "blur(20px)"
                  }}
                >
                  <X className="w-6 h-6" />
                </motion.button>

                {/* Logo - Top Center */}
                <motion.div
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                  className="text-center mb-12"
                >
                  <Link
                    href="/"
                    onClick={handleLinkClick}
                    className="inline-flex items-center gap-3 text-2xl font-bold text-green-400"
                  >
                    <PawPrintIcon className="w-8 h-8" />
                    <span>Yala Wildlife</span>
                  </Link>
                </motion.div>

                {/* Menu Items - Centered */}
                <div className="flex flex-col items-center gap-6">
                  {navItems.map((item, idx) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.1 + idx * 0.05,
                        type: "spring",
                        stiffness: 200
                      }}
                      className="w-full"
                    >
                      {item.name === "Safari Packages" ? (
                        <div className="text-center">
                          <button
                            onClick={() => setExpandedPackages(!expandedPackages)}
                            className="flex items-center justify-center gap-2 text-lg font-semibold text-green-400 hover:text-green-300 transition-colors duration-300 mx-auto"
                          >
                            <span>{item.name}</span>
                            <motion.div
                              animate={{ rotate: expandedPackages ? 180 : 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <ChevronDown className="h-5 w-5" />
                            </motion.div>
                          </button>

                          <AnimatePresence>
                            {expandedPackages && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden mt-4"
                              >
                                <div className="flex flex-col items-center gap-3">
                                  {packages.length > 0 ? (
                                    packages.map((pkg, pkgIdx) => (
                                      <motion.div
                                        key={pkg.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: pkgIdx * 0.05 }}
                                      >
                                        <Link
                                          href={`/safari-packages/${pkg.slug}`}
                                          className="text-sm text-neutral-300 hover:text-green-400 transition-colors duration-200"
                                          onClick={handleLinkClick}
                                        >
                                          {pkg.name}
                                        </Link>
                                      </motion.div>
                                    ))
                                  ) : (
                                    <div className="text-sm text-neutral-400">
                                      Loading packages...
                                    </div>
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          href={item.link}
                          className="block text-center text-lg font-semibold text-green-400 hover:text-green-300 transition-colors duration-300"
                          onClick={handleLinkClick}
                        >
                          {item.name}
                        </Link>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Footer - Bottom Center */}
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  className="mt-12 flex flex-col items-center gap-6"
                >
                  <Link
                    href="/safari-packages"
                    className="px-8 py-3 rounded-2xl bg-green-400 text-black text-sm font-bold hover:bg-green-500 transition-all duration-300 shadow-lg hover:shadow-green-400/50"
                    onClick={handleLinkClick}
                  >
                    Book Now
                  </Link>

                  <div className="flex items-center gap-3">
                    <span className="text-xs text-neutral-400">Theme:</span>
                    <ModeToggle />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Desktop NavBody component
const NavBody = ({
  children,
  visible,
}: {
  children: React.ReactNode;
  visible?: boolean;
}) => (
  <motion.div
    animate={{
      backdropFilter: visible ? "blur(10px)" : "blur(6px)",
      boxShadow: visible ? "0 4px 12px rgba(0, 0, 0, 0.15)" : "none",
      y: visible ? 10 : 0,
    }}
    transition={{ type: "spring", stiffness: 200, damping: 50 }}
    className={cn(
      "hidden lg:flex mx-auto w-full max-w-7xl items-center justify-between rounded-2xl bg-black/30 backdrop-blur-md px-6 py-2 transform-gpu"
    )}
  >
    {children}
  </motion.div>
);

// Mobile Nav component
const MobileNav = ({
  children,
  visible,
}: {
  children: React.ReactNode;
  visible?: boolean;
}) => (
  <motion.div
    animate={{
      backdropFilter: visible ? "blur(10px)" : "blur(6px)",
      boxShadow: visible ? "0 4px 12px rgba(0, 0, 0, 0.15)" : "none",
      width: visible ? "90%" : "100%",
      paddingRight: visible ? "12px" : "0px",
      paddingLeft: visible ? "12px" : "0px",
      borderRadius: visible ? "16px" : "24px",
      y: visible ? 10 : 0,
    }}
    transition={{ type: "spring", stiffness: 200, damping: 50 }}
    className={cn(
      "lg:hidden mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center bg-black/90 backdrop-blur-md px-4 py-2 transform-gpu"
    )}
  >
    {children}
  </motion.div>
);

// NavItems component with packages dropdown
const NavItems: React.FC<NavItemsProps> = ({
  items,
  packages,
  className,
  onItemClick,
}) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "flex flex-1 flex-row items-center justify-center space-x-2 text-xs font-medium text-white transition-all duration-300",
        className
      )}
    >
      {items.map((item, idx) => (
        <div key={item.name} className="relative group">
          <Link
            onMouseEnter={() => setHovered(idx)}
            onClick={onItemClick}
            href={item.link}
            // className="relative px-3 py-1.5 text-bold  text-white hover:text-green-400 flex items-center"
            className="relative px-3 py-1.5 font-bold text-white hover:text-green-400 flex items-center"

          >
            {hovered === idx && (
              <motion.div
                layoutId="hovered"
                className="absolute inset-0 rounded-full bg-green-900/20"
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              />
            )}
            <span className="relative z-10">{item.name}</span>
            {item.name === "Safari Packages" && (
              <ChevronDown className="ml-1 h-3 w-3" />
            )}
          </Link>
          {item.name === "Safari Packages" && (
            <div
              className={cn(
                "absolute left-0 mt-2 w-44 bg-black/75 backdrop-blur-md rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.15)] p-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50"
              )}
            >
              {packages.length > 0 ? (
                packages.map((pkg) => (
                  <Link
                    key={pkg.id}
                    href={`/safari-packages/${pkg.slug}`}
                    className="block px-3 py-1 text-xs text-orange-500 hover:bg-green-900/50 rounded-md transition-colors duration-200"
                    onClick={onItemClick}
                  >
                    {pkg.name}
                  </Link>
                ))
              ) : (
                <div className="px-3 py-1 text-xs text-neutral-400">
                  Loading packages...
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </motion.div>
  );
};