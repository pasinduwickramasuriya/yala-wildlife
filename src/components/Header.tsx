// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { Menu, X, ChevronDown } from "lucide-react";
// import { ModeToggle } from "./ModeToggle";

// // Define the Package type based on your Prisma schema and route
// interface Package {
//   id: string; // MongoDB ObjectId as string
//   name: string;
//   slug: string;
//   description?: string;
//   price?: number;
//   imageUrl?: string;
// }

// export default function Header() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [packages, setPackages] = useState<Package[]>([]);

//   // Handle scroll effect for header styling
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 10);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

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
//   const toggleMenu = () => setIsOpen((prev) => !prev);

//   // Close mobile menu
//   const closeMenu = () => setIsOpen(false);

//   // Handle link click to close menu
//   const handleLinkClick = () => closeMenu();

//   // Close menu when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       const target = event.target as HTMLElement;
//       if (
//         isOpen &&
//         !target.closest(".mobile-menu") &&
//         !target.closest(".menu-button")
//       ) {
//         closeMenu();
//       }
//     };

//     if (isOpen) document.addEventListener("click", handleClickOutside);
//     return () => document.removeEventListener("click", handleClickOutside);
//   }, [isOpen]);

//   return (
//     <header
//       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background/25 backdrop-blur-lg  ${
//         scrolled ? "" : ""
//       }`}
//     >
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <Link
//             href="/"
//             className="text-xl font-bold text-foreground hover:text-green-600 transition-colors duration-300"
//           >
//             Yala Safari
//           </Link>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex items-center space-x-8">
//             {[
//               "Home",
//               "Safari Packages",
//               "About",
//               "Contact",
//               "Reviews",
//               "Blog",
//             ].map((item) => (
//               <div key={item} className="relative group">
//                 <Link
//                   href={
//                     item === "Home"
//                       ? "/"
//                       : item === "Safari Packages"
//                       ? "/safari-packages"
//                       : item === "Reviews"
//                       ? "/reviews"
//                       : `/${item.toLowerCase()}`
//                   }
//                   className="text-foreground text-sm hover:text-green-600 font-medium flex items-center transition-colors duration-300"
//                 >
//                   {item}
//                   {item === "Safari Packages" && (
//                     <ChevronDown className="ml-1 h-4 w-4" />
//                   )}
//                 </Link>
//                 {item === "Safari Packages" && (
//                   <div className="absolute left-0 mt-2 w-48 bg-popover/90 backdrop-blur-md rounded-md shadow-lg p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-border/50">
//                     {packages.length > 0 ? (
//                       packages.map((pkg) => (
//                         <Link
//                           key={pkg.id}
//                           href={`/safari-packages/${pkg.slug}`}
//                           className="block px-4 py-2 text-sm text-popover-foreground hover:bg-muted/50 rounded-md transition-colors duration-200"
//                         >
//                           {pkg.name}
//                         </Link>
//                       ))
//                     ) : (
//                       <div className="px-4 py-2 text-sm text-muted-foreground">
//                         Loading packages...
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>
//             ))}
//             <ModeToggle />
//             <Link
//               href="/safari-packages"
//               className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-full transition-all duration-300"
//             >
//               Book Now
//             </Link>
//           </nav>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={toggleMenu}
//             className="md:hidden text-foreground focus:outline-none p-2 menu-button"
//             aria-label="Toggle menu"
//           >
//             {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Navigation */}
//       {isOpen && (
//         <div className="md:hidden bg-background/70 backdrop-blur-lg border-t border-border/50 mobile-menu">
//           <div className="px-4 py-4 space-y-1">
//             {[
//               "Home",
//               "Safari Packages",
//               "About",
//               "Contact",
//               "Reviews",
//               "Blog",
//             ].map((item) => (
//               <Link
//                 key={item}
//                 href={
//                   item === "Home"
//                     ? "/"
//                     : item === "Safari Packages"
//                     ? "/safari-packages"
//                     : item === "Reviews"
//                     ? "/reviews"
//                     : `/${item.toLowerCase()}`
//                 }
//                 className="block py-3 px-2 text-foreground hover:bg-muted/50 rounded-md transition-colors duration-300"
//                 onClick={handleLinkClick}
//               >
//                 {item}
//               </Link>
//             ))}
//             {/* Mobile Dropdown for Safari Packages */}
//             <div className="py-2">
//               <span className="block py-3 px-2 text-foreground font-medium">
//                 Safari Packages
//               </span>
//               {packages.length > 0 ? (
//                 packages.map((pkg) => (
//                   <Link
//                     key={pkg.id}
//                     href={`/safari-packages/${pkg.slug}`}
//                     className="block py-2 px-4 text-sm text-muted-foreground hover:bg-muted/50 rounded-md transition-colors duration-200"
//                     onClick={handleLinkClick}
//                   >
//                     {pkg.name}
//                   </Link>
//                 ))
//               ) : (
//                 <div className="px-4 py-2 text-sm text-muted-foreground">
//                   Loading packages...
//                 </div>
//               )}
//             </div>
//             <div className="py-2 flex items-center justify-center">
//               <ModeToggle />
//             </div>
//             <Link
//               href="/safari-packages"
//               className="block w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-full transition-all duration-300 text-center"
//               onClick={handleLinkClick}
//             >
//               Book Now
//             </Link>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }

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

// // Define the Package type based on your Prisma schema
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
//   const toggleMenu = () => setIsOpen((prev) => !prev);
//   const closeMenu = () => setIsOpen(false);
//   const handleLinkClick = () => closeMenu();

//   // Close menu on outside click
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       const target = event.target as HTMLElement;
//       if (
//         isOpen &&
//         !target.closest(".mobile-menu") &&
//         !target.closest(".menu-button")
//       ) {
//         closeMenu();
//       }
//     };
//     if (isOpen) document.addEventListener("click", handleClickOutside);
//     return () => document.removeEventListener("click", handleClickOutside);
//   }, [isOpen]);

//   const navItems = [
//     { name: "Home", link: "/" },
//     { name: "Safari Packages", link: "/safari-packages" },
//     { name: "About", link: "/about" },
//     { name: "Contact", link: "/contact" },
//     { name: "Reviews", link: "/reviews" },
//     { name: "Blog", link: "/blog" },
//   ];

//   return (
//     <motion.header
//       ref={ref}
//       className={cn(
//         "fixed inset-x-0 top-0 z-50 w-full transition-all duration-300"
//       )}
//     >
//       {/* Desktop Nav */}
//       <NavBody visible={visible}>
//         <Link
//           href="/"
//           className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-bold text-green-400 hover:text-red-400"
//         >
//           <span>Yala Wildlife</span>
//         </Link>
//         <NavItems
//           items={navItems}
//           packages={packages}
//           className="flex-1 justify-center"
//         />
//         <div className="flex items-center space-x-4">
//           <ModeToggle />
//           <Link
//             href="/safari-packages"
//             className={cn(
//               "px-4 py-2 rounded-full bg-green-600 text-white text-sm font-bold hover:bg-green-700 transition duration-200",
//               visible &&
//                 "shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
//             )}
//           >
//             Book Now
//           </Link>
//         </div>
//       </NavBody>

//       {/* Mobile Nav */}
//       <MobileNav visible={visible}>
//         <div className="flex w-full items-center justify-between">
//           <Link
//             href="/"
//             className="text-xl font-bold text-green-400 hover:text-green-400 transition-colors duration-300"
//           >
//             Yala Wildlife
//           </Link>
//           <button
//             onClick={toggleMenu}
//             className="text-white focus:outline-none p-2 menu-button"
//             aria-label="Toggle menu"
//           >
//             {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//           </button>
//         </div>
//         <AnimatePresence>
//           {isOpen && (
//             <motion.div
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ type: "spring", stiffness: 200, damping: 20 }}
//               className={cn(
//                 "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start gap-4 rounded-lg bg-neutral-950/90 backdrop-blur-lg px-4 py-8 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] mobile-menu"
//               )}
//             >
//               {navItems.map((item) => (
//                 <div key={item.name} className="w-full">
//                   <Link
//                     href={item.link}
//                     className="block py-3 px-2 text-white hover:bg-neutral-800/50 rounded-md transition-colors duration-300"
//                     onClick={handleLinkClick}
//                   >
//                     {item.name}
//                   </Link>
//                   {item.name === "Safari Packages" && (
//                     <div className="pl-4 space-y-2">
//                       {packages.length > 0 ? (
//                         packages.map((pkg) => (
//                           <Link
//                             key={pkg.id}
//                             href={`/safari-packages/${pkg.slug}`}
//                             className="block py-2 px-4 text-sm text-neutral-400 hover:bg-neutral-800/50 rounded-md transition-colors duration-200"
//                             onClick={handleLinkClick}
//                           >
//                             {pkg.name}
//                           </Link>
//                         ))
//                       ) : (
//                         <div className="px-4 py-2 text-sm text-neutral-400">
//                           Loading packages...
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               ))}
//               <div className="flex w-full items-center justify-center space-x-4">
//                 <ModeToggle />
//                 <Link
//                   href="/safari-packages"
//                   className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-full transition-all duration-300 text-center"
//                   onClick={handleLinkClick}
//                 >
//                   Book Now
//                 </Link>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </MobileNav>
//     </motion.header>
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
//       backdropFilter: visible ? "blur(10px)" : "none",
//       boxShadow: visible
//         ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
//         : "none",
//       y: visible ? 20 : 0,
//     }}
//     transition={{ type: "spring", stiffness: 200, damping: 50 }}
//     className={cn(
//       "hidden lg:flex mx-auto w-full max-w-7xl items-center justify-between rounded-full bg-neutral-950/90 px-4 py-2 backdrop-blur-lg",
//       visible && "bg-neutral-950/90"
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
//       backdropFilter: visible ? "blur(10px)" : "none",
//       boxShadow: visible
//         ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
//         : "none",
//       width: visible ? "90%" : "100%",
//       paddingRight: visible ? "12px" : "0px",
//       paddingLeft: visible ? "12px" : "0px",
//       borderRadius: visible ? "4px" : "2rem",
//       y: visible ? 20 : 0,
//     }}
//     transition={{ type: "spring", stiffness: 200, damping: 50 }}
//     className={cn(
//       "lg:hidden mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center bg-neutral-950/90 px-0 py-2 backdrop-blur-lg",
//       visible && "bg-neutral-950/90"
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
//         "flex flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-white transition duration-200",
//         className
//       )}
//     >
//       {items.map((item, idx) => (
//         <div key={item.name} className="relative group">
//           <Link
//             onMouseEnter={() => setHovered(idx)}
//             onClick={onItemClick}
//             href={item.link}
//             className="relative px-4 py-2 text-white hover:text-green-400 flex items-center"
//           >
//             {hovered === idx && (
//               <motion.div
//                 layoutId="hovered"
//                 className="absolute inset-0 rounded-full bg-neutral-800"
//                 transition={{ type: "spring", stiffness: 200, damping: 20 }}
//               />
//             )}
//             <span className="relative z-10">{item.name}</span>
//             {item.name === "Safari Packages" && (
//               <ChevronDown className="ml-1 h-4 w-4" />
//             )}
//           </Link>
//           {item.name === "Safari Packages" && (
//             <div className="absolute left-0 mt-2 w-48 bg-neutral-950/90 backdrop-blur-md rounded-md shadow-lg p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
//               {packages.length > 0 ? (
//                 packages.map((pkg) => (
//                   <Link
//                     key={pkg.id}
//                     href={`/safari-packages/${pkg.slug}`}
//                     className="block px-4 py-2 text-sm text-neutral-400 hover:bg-neutral-800/50 rounded-md transition-colors duration-200"
//                     onClick={onItemClick}
//                   >
//                     {pkg.name}
//                   </Link>
//                 ))
//               ) : (
//                 <div className="px-4 py-2 text-sm text-neutral-400">
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

// // Define the Package type based on your Prisma schema
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
//   const toggleMenu = () => setIsOpen((prev) => !prev);
//   const closeMenu = () => setIsOpen(false);
//   const handleLinkClick = () => closeMenu();

//   // Close menu on outside click
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       const target = event.target as HTMLElement;
//       if (
//         isOpen &&
//         !target.closest(".mobile-menu") &&
//         !target.closest(".menu-button")
//       ) {
//         closeMenu();
//       }
//     };
//     if (isOpen) document.addEventListener("click", handleClickOutside);
//     return () => document.removeEventListener("click", handleClickOutside);
//   }, [isOpen]);

//   const navItems = [
//     { name: "Home", link: "/" },
//     { name: "Safari Packages", link: "/safari-packages" },
//     { name: "About", link: "/about" },
//     { name: "Contact", link: "/contact" },
//     { name: "Reviews", link: "/reviews" },
//     { name: "Blog", link: "/blog" },
//   ];

//   return (
//     <motion.header
//       ref={ref}
//       className={cn(
//         // Changed: Ensured header is fully transparent with dark blur, spans full width
//         "fixed inset-x-0 top-0 z-50 w-full transition-all duration-500"
//       )}
//     >
//       {/* Desktop Nav */}
//       <NavBody visible={visible}>
//         <Link
//           href="/"
//           className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-bold text-green-400 hover:text-red-400"
//         >
//           <span>Yala Wildlife</span>
//         </Link>
//         <NavItems
//           items={navItems}
//           packages={packages}
//           className="flex-1 justify-center"
//         />
//         <div className="flex items-center space-x-4">
//           <ModeToggle />
//           <Link
//             href="/safari-packages"
//             className={cn(
//               // Changed: Kept transparent background with green text, rounded-2xl for modern curves
//               // Changed: Adjusted hover to dark green blur for consistency
//               "px-4 py-2 rounded-2xl bg-transparent text-green-400 text-sm font-bold hover:bg-green-900/20 transition-all duration-300",
//               visible &&
//                 // Changed: Subtle shadow for dark transparent aesthetic
//                 "shadow-[0_4px_12px_rgba(0,_0,_0,_0.15)]"
//             )}
//           >
//             Book Now
//           </Link>
//         </div>
//       </NavBody>

//       {/* Mobile Nav */}
//       <MobileNav visible={visible}>
//         <div className="flex w-full items-center justify-between">
//           <Link
//             href="/"
//             className="text-xl font-bold text-green-400 hover:text-green-400 transition-colors duration-300"
//           >
//             Yala Wildlife
//           </Link>
//           <button
//             onClick={toggleMenu}
//             className="text-white focus:outline-none p-2 menu-button"
//             aria-label="Toggle menu"
//           >
//             {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//           </button>
//         </div>
//         <AnimatePresence>
//           {isOpen && (
//             <motion.div
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ type: "spring", stiffness: 200, damping: 20 }}
//               className={cn(
//                 // Changed: Set dark transparent background (bg-black/30) with medium blur, kept rounded-2xl
//                 // Changed: Adjusted shadow for dark aesthetic
//                 "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start gap-4 rounded-2xl bg-black/90 backdrop-blur-md px-4 py-8 shadow-[0_4px_12px_rgba(0,_0,_0,_0.15)] mobile-menu"
//               )}
//             >
//               {navItems.map((item) => (
//                 <div key={item.name} className="w-full">
//                   <Link
//                     href={item.link}
//                     className="block py-3 px-2 text-white hover:bg-green-900/20 rounded-md transition-colors duration-300"
//                     onClick={handleLinkClick}
//                   >
//                     {item.name}
//                   </Link>
//                   {item.name === "Safari Packages" && (
//                     <div className="pl-4 space-y-2">
//                       {packages.length > 0 ? (
//                         packages.map((pkg) => (
//                           <Link
//                             key={pkg.id}
//                             href={`/safari-packages/${pkg.slug}`}
//                             className="block py-2 px-4 text-sm text-neutral-400 hover:bg-green-900/20 rounded-md transition-colors duration-200"
//                             onClick={handleLinkClick}
//                           >
//                             {pkg.name}
//                           </Link>
//                         ))
//                       ) : (
//                         <div className="px-4 py-2 text-sm text-neutral-400">
//                           Loading packages...
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               ))}
//               <div className="flex w-full items-center justify-center space-x-4">
//                 <ModeToggle />
//                 <Link
//                   href="/safari-packages"
//                   className="w-full bg-transparent hover:bg-green-900/20 text-green-400 font-medium py-3 px-6 rounded-2xl transition-all duration-300 text-center"
//                   onClick={handleLinkClick}
//                 >
//                   Book Now
//                 </Link>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </MobileNav>
//     </motion.header>
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
//       // Changed: Adjusted blur for dark transparent aesthetic
//       backdropFilter: visible ? "blur(10px)" : "blur(6px)",
//       // Changed: Subtle shadow for dark transparency
//       boxShadow: visible
//         ? "0 4px 12px rgba(0, 0, 0, 0.15)"
//         : "none",
//       y: visible ? 10 : 0,
//     }}
//     transition={{ type: "spring", stiffness: 200, damping: 50 }}
//     className={cn(
//       // Changed: Set dark transparent background (bg-black/30), kept blur and rounded-2xl
//       // Changed: Kept increased padding for modern feel
//       "hidden lg:flex mx-auto w-full max-w-7xl items-center justify-between rounded-2xl bg-black/30 backdrop-blur-md px-6 py-3"
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
//       // Changed: Increased blur slightly for dark aesthetic
//       backdropFilter: visible ? "blur(10px)" : "blur(6px)",
//       // Changed: Subtle shadow for dark transparency
//       boxShadow: visible
//         ? "0 4px 12px rgba(0, 0, 0, 0.15)"
//         : "none",
//       width: visible ? "90%" : "100%",
//       paddingRight: visible ? "12px" : "0px",
//       paddingLeft: visible ? "12px" : "0px",
//       // Changed: Kept modern border radius
//       borderRadius: visible ? "16px" : "24px",
//       y: visible ? 10 : 0,
//     }}
//     transition={{ type: "spring", stiffness: 200, damping: 50 }}
//     className={cn(
//       // Changed: Set dark transparent background (bg-black/30), kept blur and padding
//       "lg:hidden mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center bg-black/30 backdrop-blur-md px-4 py-3"
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
//         // Changed: Kept green hover effect for consistency
//         "flex flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-white transition-all duration-300",
//         className
//       )}
//     >
//       {items.map((item, idx) => (
//         <div key={item.name} className="relative group">
//           <Link
//             onMouseEnter={() => setHovered(idx)}
//             onClick={onItemClick}
//             href={item.link}
//             className="relative px-4 py-2 text-white hover:text-green-400 flex items-center"
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
//               <ChevronDown className="ml-1 h-4 w-4" />
//             )}
//           </Link>
//           {item.name === "Safari Packages" && (
//             <div className={cn(
//               // Changed: Set dark transparent background (bg-black/30) with blur for dropdown
//               // Changed: Adjusted shadow for dark aesthetic
//               "absolute left-0 mt-2 w-48 bg-black/30 backdrop-blur-md rounded-lg shadow-[0_4px_12px_rgba(0,_0,_0,_0.15)] p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50"
//             )}>
//               {packages.length > 0 ? (
//                 packages.map((pkg) => (
//                   <Link
//                     key={pkg.id}
//                     href={`/safari-packages/${pkg.slug}`}
//                     className="block px-4 py-2 text-sm text-neutral-400 hover:bg-green-900/20 rounded-md transition-colors duration-200"
//                     onClick={onItemClick}
//                   >
//                     {pkg.name}
//                   </Link>
//                 ))
//               ) : (
//                 <div className="px-4 py-2 text-sm text-neutral-400">
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

// // Define the Package type based on your Prisma schema
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
//   const toggleMenu = () => setIsOpen((prev) => !prev);
//   const closeMenu = () => setIsOpen(false);
//   const handleLinkClick = () => closeMenu();

//   // Close menu on outside click
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       const target = event.target as HTMLElement;
//       if (
//         isOpen &&
//         !target.closest(".mobile-menu") &&
//         !target.closest(".menu-button")
//       ) {
//         closeMenu();
//       }
//     };
//     if (isOpen) document.addEventListener("click", handleClickOutside);
//     return () => document.removeEventListener("click", handleClickOutside);
//   }, [isOpen]);

//   const navItems = [
//     { name: "Home", link: "/" },
//     { name: "Safari Packages", link: "/safari-packages" },
//     { name: "About", link: "/about" },
//     { name: "Contact", link: "/contact" },
//     { name: "Reviews", link: "/reviews" },
//     { name: "Blog", link: "/blog" },
//   ];

//   return (
//     <motion.header
//       ref={ref}
//       className={cn(
//         // Changed: Kept header full-width with dark blur transparent background
//         "fixed inset-x-0 top-0 z-50 w-full transition-all duration-500"
//       )}
//     >
//       {/* Desktop Nav */}
//       <NavBody visible={visible}>
//         <Link
//           href="/"
//           // Changed: Reduced font size and padding for thinner header
//           className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-xs font-bold text-green-400 hover:text-red-400"
//         >
//           <span>Yala Wildlife</span>
//         </Link>
//         <NavItems
//           items={navItems}
//           packages={packages}
//           className="flex-1 justify-center"
//         />
//         <div className="flex items-center space-x-4">
//           <ModeToggle />
//           <Link
//             href="/safari-packages"
//             className={cn(
//               // Changed: Reduced padding for thinner button, kept dark transparent blur
//               // Changed: Kept green text and modern rounded-2xl
//               "px-4 py-1.5 rounded-2xl bg-transparent text-green-400 text-xs font-bold hover:bg-green-900/20 transition-all duration-300",
//               visible &&
//                 // Changed: Kept subtle shadow for dark aesthetic
//                 "shadow-[0_4px_12px_rgba(0,_0,_0,_0.15)]"
//             )}
//           >
//             Book Now
//           </Link>
//         </div>
//       </NavBody>

//       {/* Mobile Nav */}
//       <MobileNav visible={visible}>
//         <div className="flex w-full items-center justify-between">
//           <Link
//             href="/"
//             // Changed: Reduced font size for thinner header
//             className="text-lg font-bold text-green-400 hover:text-green-400 transition-colors duration-300"
//           >
//             Yala Wildlife
//           </Link>
//           <button
//             onClick={toggleMenu}
//             // Changed: Reduced padding for thinner header
//             className="text-white focus:outline-none p-1 menu-button"
//             aria-label="Toggle menu"
//           >
//             {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
//           </button>
//         </div>
//         <AnimatePresence>
//           {isOpen && (
//             <motion.div
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ type: "spring", stiffness: 200, damping: 20 }}
//               className={cn(
//                 // Changed: Set dark transparent background (bg-black/30) with medium blur
//                 // Changed: Reduced padding (py-8 to py-4) for thinner mobile menu
//                 // Changed: Kept rounded-2xl and shadow for modern dark aesthetic
//                 "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start gap-4 rounded-2xl bg-black/30 backdrop-blur-md px-4 py-4 shadow-[0_4px_12px_rgba(0,_0,_0,_0.15)] mobile-menu"
//               )}
//             >
//               {navItems.map((item) => (
//                 <div key={item.name} className="w-full">
//                   <Link
//                     href={item.link}
//                     // Changed: Reduced padding and font size for thinner menu
//                     className="block py-2 px-2 text-sm text-white hover:bg-green-900/20 rounded-md transition-colors duration-300"
//                     onClick={handleLinkClick}
//                   >
//                     {item.name}
//                   </Link>
//                   {item.name === "Safari Packages" && (
//                     <div className="pl-4 space-y-2">
//                       {packages.length > 0 ? (
//                         packages.map((pkg) => (
//                           <Link
//                             key={pkg.id}
//                             href={`/safari-packages/${pkg.slug}`}
//                             // Changed: Reduced padding and font size for thinner dropdown
//                             className="block py-1 px-4 text-xs text-neutral-400 hover:bg-green-900/20 rounded-md transition-colors duration-200"
//                             onClick={handleLinkClick}
//                           >
//                             {pkg.name}
//                           </Link>
//                         ))
//                       ) : (
//                         <div className="px-4 py-1 text-xs text-neutral-400">
//                           Loading packages...
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               ))}
//               <div className="flex w-full items-center justify-center space-x-4">
//                 <ModeToggle />
//                 <Link
//                   href="/safari-packages"
//                   // Changed: Reduced padding for thinner button, kept dark transparent blur
//                   className="w-full bg-transparent hover:bg-green-900/20 text-green-400 font-medium py-2 px-6 rounded-2xl transition-all duration-300 text-center"
//                   onClick={handleLinkClick}
//                 >
//                   Book Now
//                 </Link>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </MobileNav>
//     </motion.header>
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
//       // Changed: Kept blur for dark transparent aesthetic
//       backdropFilter: visible ? "blur(10px)" : "blur(6px)",
//       // Changed: Kept subtle shadow for dark transparency
//       boxShadow: visible
//         ? "0 4px 12px rgba(0, 0, 0, 0.15)"
//         : "none",
//       y: visible ? 10 : 0,
//     }}
//     transition={{ type: "spring", stiffness: 200, damping: 50 }}
//     className={cn(
//       // Changed: Set dark transparent background (bg-black/30), kept blur
//       // Changed: Reduced padding (py-3 to py-2) for thinner header
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
//       // Changed: Kept blur for dark aesthetic
//       backdropFilter: visible ? "blur(10px)" : "blur(6px)",
//       // Changed: Kept subtle shadow for dark transparency
//       boxShadow: visible
//         ? "0 4px 12px rgba(0, 0, 0, 0.15)"
//         : "none",
//       width: visible ? "90%" : "100%",
//       paddingRight: visible ? "12px" : "0px",
//       paddingLeft: visible ? "12px" : "0px",
//       // Changed: Kept modern border radius
//       borderRadius: visible ? "16px" : "24px",
//       y: visible ? 10 : 0,
//     }}
//     transition={{ type: "spring", stiffness: 200, damping: 50 }}
//     className={cn(
//       // Changed: Set dark transparent background (bg-black/30), kept blur
//       // Changed: Reduced padding (py-3 to py-2) for thinner header
//       "lg:hidden mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center bg-black/30 backdrop-blur-md px-4 py-2"
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
//         // Changed: Reduced font size for thinner header
//         "flex flex-1 flex-row items-center justify-center space-x-2 text-xs font-medium text-white transition-all duration-300",
//         className
//       )}
//     >
//       {items.map((item, idx) => (
//         <div key={item.name} className="relative group">
//           <Link
//             onMouseEnter={() => setHovered(idx)}
//             onClick={onItemClick}
//             // Changed: Reduced padding and font size for thinner header
//             className="relative px-3 py-1.5 text-xs text-white hover:text-green-400 flex items-center" href={""}          >
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
//             <div className={cn(
//               // Changed: Set dark transparent background (bg-black/30) with blur for dropdown
//               // Changed: Reduced padding and width for thinner dropdown
//               "absolute left-0 mt-2 w-44 bg-black/30 backdrop-blur-md rounded-lg shadow-[0_4px_12px_rgba(0,_0,_0,_0.15)] p-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50"
//             )}>
//               {packages.length > 0 ? (
//                 packages.map((pkg) => (
//                   <Link
//                     key={pkg.id}
//                     href={`/safari-packages/${pkg.slug}`}
//                     // Changed: Reduced padding and font size for thinner dropdown
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
import React, { useRef, useState, useEffect } from "react";
import { ModeToggle } from "./ModeToggle";

// Define the Package type based on your Prisma schema
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
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [packages, setPackages] = useState<Package[]>([]);

  // Handle scroll effect
  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 100);
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
  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);
  const handleLinkClick = () => closeMenu();

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        isOpen &&
        !target.closest(".mobile-menu") &&
        !target.closest(".menu-button")
      ) {
        closeMenu();
      }
    };
    if (isOpen) document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  const navItems = [
    { name: "Home", link: "/" },
    { name: "Safari Packages", link: "/safari-packages" },
    { name: "About", link: "/about" },
    { name: "Contact", link: "/contact" },
    { name: "Reviews", link: "/reviews" },
    { name: "Blog", link: "/blog" },
  ];

  return (
    <motion.header
      ref={ref}
      className={cn(
        // Changed: Kept header full-width with dark blur transparent background
        "fixed inset-x-0 top-0 z-50 w-full transition-all duration-500"
      )}
    >
      {/* Desktop Nav */}
      <NavBody visible={visible}>
        <Link
          href="/"
          // Changed: Reduced font size and padding for thinner header
          className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-xs font-bold text-green-400 hover:text-red-400"
        >
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
              // Changed: Reduced padding for thinner button, kept dark transparent blur
              // Changed: Kept green text and modern rounded-2xl
              "px-4 py-1.5 rounded-2xl bg-transparent text-green-400 text-xs font-bold hover:bg-green-900/20 transition-all duration-300",
              visible &&
                // Changed: Kept subtle shadow for dark aesthetic
                "shadow-[0_4px_12px_rgba(0,_0,_0,_0.15)]"
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
            // Changed: Reduced font size for thinner header
            className="text-lg font-bold text-green-400 hover:text-green-400 transition-colors duration-300"
          >
            Yala Wildlife
          </Link>
          <button
            onClick={toggleMenu}
            // Changed: Reduced padding for thinner header
            className="text-white focus:outline-none p-1 menu-button"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className={cn(
                // Changed: Set dark transparent background (bg-black/30) with medium blur
                // Changed: Reduced padding (py-8 to py-4) for thinner mobile menu
                // Changed: Kept rounded-2xl and shadow for modern dark aesthetic
                "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start gap-4 rounded-2xl bg-black/30 backdrop-blur-md px-4 py-4 shadow-[0_4px_12px_rgba(0,_0,_0,_0.15)] mobile-menu"
              )}
            >
              {navItems.map((item) => (
                <div key={item.name} className="w-full">
                  <Link
                    href={item.link}
                    // Changed: Reduced padding and font size for thinner menu
                    className="block py-2 px-2 text-sm text-white hover:bg-green-900/20 rounded-md transition-colors duration-300"
                    onClick={handleLinkClick}
                  >
                    {item.name}
                  </Link>
                  {item.name === "Safari Packages" && (
                    <div
                      className={cn(
                        // Changed: Set dark transparent blur background (bg-black/30 backdrop-blur-md)
                        // Changed: Added rounded-lg and shadow for modern aesthetic
                        // Changed: Added py-2 for consistent padding
                        "pl-4 space-y-2 bg-black/30 backdrop-blur-md rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.15)] py-2"
                      )}
                    >
                      {packages.length > 0 ? (
                        packages.map((pkg) => (
                          <Link
                            key={pkg.id}
                            href={`/safari-packages/${pkg.slug}`}
                            // Changed: Reduced padding and font size for thinner dropdown
                            className="block py-1 px-4 text-xs text-neutral-400 hover:bg-green-900/20 rounded-md transition-colors duration-200"
                            onClick={handleLinkClick}
                          >
                            {pkg.name}
                          </Link>
                        ))
                      ) : (
                        <div className="px-4 py-1 text-xs text-neutral-400">
                          Loading packages...
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
              <div className="flex w-full items-center justify-center space-x-4">
                <ModeToggle />
                <Link
                  href="/safari-packages"
                  // Changed: Reduced padding for thinner button, kept dark transparent blur
                  className="w-full bg-transparent hover:bg-green-900/20 text-green-400 font-medium py-2 px-6 rounded-2xl transition-all duration-300 text-center"
                  onClick={handleLinkClick}
                >
                  Book Now
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </MobileNav>
    </motion.header>
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
      // Changed: Kept blur for dark transparent aesthetic
      backdropFilter: visible ? "blur(10px)" : "blur(6px)",
      // Changed: Kept subtle shadow for dark transparency
      boxShadow: visible
        ? "0 4px 12px rgba(0, 0, 0, 0.15)"
        : "none",
      y: visible ? 10 : 0,
    }}
    transition={{ type: "spring", stiffness: 200, damping: 50 }}
    className={cn(
      // Changed: Set dark transparent background (bg-black/30), kept blur
      // Changed: Reduced padding (py-3 to py-2) for thinner header
      "hidden lg:flex mx-auto w-full max-w-7xl items-center justify-between rounded-2xl bg-black/30 backdrop-blur-md px-6 py-2"
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
      // Changed: Kept blur for dark aesthetic
      backdropFilter: visible ? "blur(10px)" : "blur(6px)",
      // Changed: Kept subtle shadow for dark transparency
      boxShadow: visible
        ? "0 4px 12px rgba(0, 0, 0, 0.15)"
        : "none",
      width: visible ? "90%" : "100%",
      paddingRight: visible ? "12px" : "0px",
      paddingLeft: visible ? "12px" : "0px",
      // Changed: Kept modern border radius
      borderRadius: visible ? "16px" : "24px",
      y: visible ? 10 : 0,
    }}
    transition={{ type: "spring", stiffness: 200, damping: 50 }}
    className={cn(
      // Changed: Set dark transparent background (bg-black/30), kept blur
      // Changed: Reduced padding (py-3 to py-2) for thinner header
      "lg:hidden mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center bg-black/90 backdrop-blur-md px-4 py-2"
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
        // Changed: Reduced font size for thinner header
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
            // Changed: Reduced padding and font size for thinner header
            className="relative px-3 py-1.5 text-xs text-white hover:text-green-400 flex items-center"
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
                // Changed: Retained dark transparent background (bg-black/30) with blur for Safari Packages dropdown
                // Changed: Kept reduced padding and width for thinner dropdown
                // Changed: Kept rounded-lg and shadow for modern dark aesthetic
                "absolute left-0 mt-2 w-44 bg-black/75 backdrop-blur-md rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.15)] p-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50"
              )}
            >
              {packages.length > 0 ? (
                packages.map((pkg) => (
                  <Link
                    key={pkg.id}
                    href={`/safari-packages/${pkg.slug}`}
                    // Changed: Reduced padding and font size for thinner dropdown
                    className="block px-3 py-1 text-xs text-neutral-400 hover:bg-green-900/20 rounded-md transition-colors duration-200"
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