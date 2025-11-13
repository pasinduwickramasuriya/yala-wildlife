

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
//               // Changed: Kept subtle shadow for dark aesthetic
//               "shadow-[0_4px_12px_rgba(0,_0,_0,_0.15)]"
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
//                     <div
//                       className={cn(
//                         // Changed: Set dark transparent blur background (bg-black/30 backdrop-blur-md)
//                         // Changed: Added rounded-lg and shadow for modern aesthetic
//                         // Changed: Added py-2 for consistent padding
//                         "pl-4 space-y-2 bg-black/30 backdrop-blur-md rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.15)] py-2"
//                       )}
//                     >
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
//             href={item.link}
//             // Changed: Reduced padding and font size for thinner header
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
//                 // Changed: Retained dark transparent background (bg-black/30) with blur for Safari Packages dropdown
//                 // Changed: Kept reduced padding and width for thinner dropdown
//                 // Changed: Kept rounded-lg and shadow for modern dark aesthetic
//                 "absolute left-0 mt-2 w-44 bg-black/75 backdrop-blur-md rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.15)] p-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50"
//               )}
//             >
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

// --- NEW Icon Component ---
// I've added this modern SVG icon component as requested.
// It's a line-outline paw print, perfect for a safari theme.
const PawPrintIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("text-green-400", className)} // Inherits the green color
  >
    <path d="M12 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
    <path d="M17.5 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
    <path d="M6.5 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
    <path d="M15.5 19.5c.5-1.5 1-3.5 0-5" />
    <path d="M8.5 19.5c-.5-1.5-1-3.5 0-5" />
    <path d="M12 21a7.5 7.5 0 0 0 5-2.5c1.5-2 0-5.5-5-5.5s-6.5 3.5-5 5.5A7.5 7.5 0 0 0 12 21Z" />
  </svg>
);

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
        "fixed inset-x-0 top-0 z-50 w-full transition-all duration-500"
      )}
    >
      {/* Desktop Nav */}
      <NavBody visible={visible}>
        {/* --- MODIFIED: Added Icon --- */}
        <Link
          href="/"
          // Kept all your classes and measurements exactly
          className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-xs font-bold text-green-400 hover:text-red-400"
        >
          {/* Added the icon, size w-4 h-4 fits your py-1 and text-xs */}
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
              "px-4 py-1.5 rounded-2xl bg-green-400   text-black text-xs font-bold hover:bg-green-900/20 transition-all duration-300",
              visible &&
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
          {/* --- MODIFIED: Added Icon --- */}
          <Link
            href="/"
            // Kept your classes, added flex and gap
            className="flex items-center gap-2 text-lg font-bold text-green-400 hover:text-green-400 transition-colors duration-300"
          >
            {/* Added icon, size w-5 h-5 matches your menu icons */}
            <PawPrintIcon className="w-5 h-5" />
            <span>Yala Wildlife</span>
          </Link>
          <button
            onClick={toggleMenu}
            // Kept your classes exactly
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
                "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start gap-4 rounded-2xl bg-black/30 backdrop-blur-md px-4 py-4 shadow-[0_4px_12px_rgba(0,_0,_0,_0.15)] mobile-menu"
              )}
            >
              {navItems.map((item) => (
                <div key={item.name} className="w-full">
                  <Link
                    href={item.link}
                    className="block py-2 px-2 text-sm text-white hover:bg-green-900/20 rounded-md transition-colors duration-300"
                    onClick={handleLinkClick}
                  >
                    {item.name}
                  </Link>
                  {item.name === "Safari Packages" && (
                    <div
                      className={cn(
                        "pl-4 space-y-2 bg-black/30 backdrop-blur-md rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.15)] py-2"
                      )}
                    >
                      {packages.length > 0 ? (
                        packages.map((pkg) => (
                          <Link
                            key={pkg.id}
                            href={`/safari-packages/${pkg.slug}`}
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
      backdropFilter: visible ? "blur(10px)" : "blur(6px)",
      boxShadow: visible
        ? "0 4px 12px rgba(0, 0, 0, 0.15)"
        : "none",
      y: visible ? 10 : 0,
    }}
    transition={{ type: "spring", stiffness: 200, damping: 50 }}
    className={cn(
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
      backdropFilter: visible ? "blur(10px)" : "blur(6px)",
      boxShadow: visible
        ? "0 4px 12px rgba(0, 0, 0, 0.15)"
        : "none",
      width: visible ? "90%" : "100%",
      paddingRight: visible ? "12px" : "0px",
      paddingLeft: visible ? "12px" : "0px",
      borderRadius: visible ? "16px" : "24px",
      y: visible ? 10 : 0,
    }}
    transition={{ type: "spring", stiffness: 200, damping: 50 }}
    className={cn(
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
                "absolute left-0 mt-2 w-44 bg-black/75 backdrop-blur-md rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.15)] p-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50"
              )}
            >
              {packages.length > 0 ? (
                packages.map((pkg) => (
                  <Link
                    key={pkg.id}
                    href={`/safari-packages/${pkg.slug}`}
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