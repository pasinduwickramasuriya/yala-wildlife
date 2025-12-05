// "use client";

// import { useState, useEffect } from "react";
// import Image from "next/image";
// import {
//   ChevronLeft,
//   ChevronRight,
//   Clock,
//   MapPin,
//   Play, // Kept for the play/pause button
//   Users,
// } from "lucide-react"; // Removed X
// import Link from "next/link";
// import { AnimatePresence, motion } from "framer-motion"; // Added for animations

// // Your original interface
// interface HeroSection {
//   id: string;
//   imageUrl: string;
//   title: string;
//   subtitle: string;
// }

// // --- Animation Variants ---
// // We'll use these to animate the content in on each slide.

// // Parent container to orchestrate staggered animations
// const staggerParentVariants = {
//   hidden: { opacity: 0 },
//   show: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.2, // Each child animates 0.2s after the previous
//     },
//   },
// };

// // Animation for text/buttons (fade in, slide up)
// const fadeInUpVariants = {
//   hidden: { opacity: 0, y: 20 },
//   show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
// };

// // Animation for the details cards (with a slight delay)
// const detailsVariants = {
//   hidden: { opacity: 0, y: 20 },
//   show: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.5, delay: 0.4, ease: "easeOut" },
//   },
// };

// // --- Main Component ---

// export default function HeroSlider() {
//   const [heroSections, setHeroSections] = useState<HeroSection[]>([]);
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isPlaying, setIsPlaying] = useState(true);

//   // Removed the isVideoModalOpen state

//   // Fetch hero sections from API (Your original logic)
//   useEffect(() => {
//     const fetchHeroSections = async () => {
//       try {
//         // --- FIXED: Your Original Fetch Logic is now active ---
//         const res = await fetch("/api/hero");
//         if (!res.ok) {
//           throw new Error(`Failed to fetch hero sections: ${res.statusText}`);
//         }
//         const data = await res.json();
//         setHeroSections(data);
//       } catch (err) {
//         const errorMsg =
//           err instanceof Error ? err.message : "An error occurred";
//         setError(errorMsg);
//         console.error("Fetch hero sections error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchHeroSections();
//   }, []);

//   // Auto-sliding functionality (Your original logic)
//   useEffect(() => {
//     if (heroSections.length <= 1 || !isPlaying) return;
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % heroSections.length);
//     }, 5000); // 5-second slide duration
//     return () => clearInterval(interval);
//   }, [heroSections.length, isPlaying]);

//   // Navigation handlers (Your original logic)
//   const goToSlide = (index: number) => {
//     setCurrentSlide(index);
//   };
//   const goToPrevSlide = () => {
//     setCurrentSlide(
//       (prev) => (prev - 1 + heroSections.length) % heroSections.length
//     );
//   };
//   const goToNextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % heroSections.length);
//   };
//   const togglePlayPause = () => {
//     setIsPlaying(!isPlaying);
//   };

//   // --- Loading, Error, Empty States (Unchanged) ---
//   if (loading) {
//     return (
//       <div className="min-h-screen w-full bg-gradient-to-br from-black-900 via-black-800 to-black flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-400 border-t-transparent mx-auto mb-4"></div>
//           <p className="text-green-10 text-xl font-medium"></p>
//         </div>
//       </div>
//     );
//   }
//   if (error) {
//     return (
//       <div className="min-h-screen w-full bg-gradient-to-br from-red-900 via-gray-800 to-black flex items-center justify-center">
//         <div className="text-center max-w-md mx-auto px-4">
//           <div className="bg-red-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
//             <span className="text-red-400 text-2xl">⚠</span>
//           </div>
//           <p className="text-white text-lg font-medium">{error}</p>
//         </div>
//       </div>
//     );
//   }
//   if (heroSections.length === 0) {
//     return (
//       <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
//         <div className="text-center max-w-md mx-auto px-4">
//           <div className="bg-gray-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
//             <span className="text-gray-400 text-2xl">📷</span>
//           </div>
//           <p className="text-white text-lg font-medium">
//             No experiences available at the moment
//           </p>
//         </div>
//       </div>
//     );
//   }
//   // --- End States ---

//   return (
//     <div className="relative w-full min-h-screen overflow-hidden">
//       {/* Main Slider Container */}
//       <div className="relative w-full h-screen">
//         {heroSections.map((section, index) => (
//           <div
//             key={section.id}
//             className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
//               }`}
//           >
//             {/* Background Image (Dynamic) */}
//             <div className="absolute inset-0 w-full h-full">
//               <Image
//                 src={section.imageUrl}
//                 alt={section.title}
//                 fill
//                 priority={index === 0}
//                 className={`object-cover object-center transition-transform duration-[6000ms] ease-linear ${index === currentSlide ? "scale-110" : "scale-100" // Subtle Ken Burns zoom effect
//                   }`}
//                 sizes="100vw"
//                 onError={(e) => {
//                   e.currentTarget.src = "/fallback-hero.jpg";
//                 }}
//               />
//               {/* Gradient Overlays */}
//               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
//               <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
//             </div>

//             {/* --- Animated Content Overlay --- */}
//             {/* This will animate every time the slide changes */}
//             <AnimatePresence>
//               {index === currentSlide && (
//                 <motion.div
//                   key={currentSlide} // Force re-animation on slide change
//                   className="relative z-20 h-full flex flex-col justify-center items-center text-center px-6"
//                   variants={staggerParentVariants}
//                   initial="hidden"
//                   animate="show"
//                   exit={{ opacity: 0 }} // Content fades out
//                 >
//                   {/* Main Content Area */}
//                   <div className="flex-1 flex flex-col justify-center items-center">
//                     {/* --- FIXED Title (Responsive) --- */}
//                     <motion.h1
//                       variants={fadeInUpVariants}
//                       // On mobile: 5xl. On small screens (sm) and up: 6xl.
//                       className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white leading-tight"
//                     >
//                       <span className="block text-green-400 mb-2">
//                         {section.title.split(" ")[0]}
//                       </span>
//                       <span className="block">
//                         {section.title.split(" ").slice(1).join(" ")}
//                       </span>
//                     </motion.h1>

//                     {/* --- FIXED Subtitle (Responsive) --- */}
//                     <motion.p
//                       variants={fadeInUpVariants}
//                       // On mobile: xl. On small screens (sm) and up: 2xl
//                       className="text-xl sm:text-2xl text-gray-200 max-w-2xl mx-auto mt-6"
//                     >
//                       {section.subtitle}
//                     </motion.p>

//                     {/* Call to Action Buttons (Video button removed) */}
//                     <motion.div
//                       variants={fadeInUpVariants}
//                       className="flex flex-col sm:flex-row gap-4 pt-8"
//                     >
//                       <Link
//                         href="/safari-packages"
//                         className="group inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-black px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
//                       >
//                         <span>Book Your Safari</span>
//                       </Link>
//                     </motion.div>
//                   </div>

//                   {/* "More Details" Bar (Responsive) */}
//                   <motion.div
//                     className="w-full max-w-6xl pb-10 pt-8 sm:pt-20"
//                     variants={detailsVariants}
//                   >
//                     {/* On mobile: flex-col. On small screens (sm) and up: flex-row */}
//                     <div className="flex flex-col sm:flex-row justify-around items-stretch gap-4 sm:gap-8 px-4">
//                       {/* Card 1: Location (Responsive) */}
//                       <div className="flex items-center gap-3 sm:gap-4 bg-black/10 backdrop-blur-md p-3 sm:p-6 rounded-4xl ">
//                         {/* Icon: smaller on mobile */}
//                         <MapPin className="w-6 h-6 sm:w-10 sm:h-10 text-green-400 flex-shrink-0" />
//                         <div>
//                           {/* Text: smaller on mobile */}
//                           <span className="text-xs sm:text-sm text-gray-400 block">
//                             LOCATION
//                           </span>
//                           <span className="text-base sm:text-lg text-white font-medium block">
//                             Yala National Park
//                           </span>
//                         </div>
//                       </div>

//                       {/* Card 2: Duration (Responsive) */}
//                       <div className="flex items-center gap-3 sm:gap-4 bg-black/10 backdrop-blur-md p-3 sm:p-6 rounded-4xl">
//                         <Clock className="w-6 h-6 sm:w-10 sm:h-10 text-green-400 flex-shrink-0" />
//                         <div>
//                           <span className="text-xs sm:text-sm text-gray-400 block">
//                             DURATION
//                           </span>
//                           <span className="text-base sm:text-lg text-white font-medium block">
//                             4-12 Hours
//                           </span>
//                         </div>
//                       </div>

//                       {/* Card 3: Expert Guides (Responsive) */}
//                       <div className="flex items-center gap-3 sm:gap-4 bg-black/10 backdrop-blur-md p-3 sm:p-6 rounded-4xl">
//                         <Users className="w-6 h-6 sm:w-10 sm:h-10 text-green-400 flex-shrink-0" />
//                         <div>
//                           <span className="text-xs sm:text-sm text-gray-400 block">
//                             EXPERT GUIDES
//                           </span>
//                           <span className="text-base sm:text-lg text-white font-medium block">
//                             10+ Years of Experience
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </motion.div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         ))}
//       </div>

//       {/* --- Your Navigation Controls (Unchanged) --- */}
//       {heroSections.length > 1 && (
//         <>
//           <button
//             onClick={goToPrevSlide}
//             className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 group"
//             aria-label="Previous slide"
//           >
//             <div className="bg-white/10 backdrop-blur-sm hover:bg-white/20  hover:border-white/40 rounded-full p-3 sm:p-4 transition-all duration-300 group-hover:scale-110">
//               <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
//             </div>
//           </button>
//           <button
//             onClick={goToNextSlide}
//             className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 group"
//             aria-label="Next slide"
//           >
//             <div className="bg-white/10 backdrop-blur-sm hover:bg-white/20  hover:border-white/40 rounded-full p-3 sm:p-4 transition-all duration-300 group-hover:scale-110">
//               <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
//             </div>
//           </button>
//           <button
//             onClick={togglePlayPause}
//             className="absolute bottom-20 sm:bottom-24 right-4 sm:right-8 z-30 group"
//             aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
//           >
//             <div className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-full p-3 transition-all duration-300 group-hover:scale-110">
//               {isPlaying ? (
//                 <div className="w-4 h-4 text-white">
//                   <div className="flex gap-1">
//                     <div className="w-1.5 h-4 bg-white rounded-full"></div>
//                     <div className="w-1.5 h-4 bg-white rounded-full"></div>
//                   </div>
//                 </div>
//               ) : (
//                 <Play className="w-4 h-4 text-white ml-0.5" />
//               )}
//             </div>
//           </button>
//           <div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 z-30">
//             <div className="flex items-center gap-3">
//               {heroSections.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => goToSlide(index)}
//                   className="group relative"
//                   aria-label={`Go to slide ${index + 1}`}
//                 >
//                   <div
//                     className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
//                       ? "bg-green-400 scale-125"
//                       : "bg-white/40 hover:bg-white/60 hover:scale-110"
//                       }`}
//                   />
//                   {index === currentSlide && (
//                     <div className="absolute inset-0 rounded-full bg-green-400/30 animate-ping" />
//                   )}
//                 </button>
//               ))}
//             </div>
//           </div>
//           <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 z-30">
//             <div
//               className="h-full bg-green-400 transition-all duration-300 ease-linear"
//               style={{
//                 width: `${((currentSlide + 1) / heroSections.length) * 100}%`,
//               }}
//             />
//           </div>
//         </>
//       )}
//       <div className="absolute top-8 left-8 z-30 hidden sm:block">
//         <div className="bg-black/30 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
//           <span className="text-white font-medium">
//             {String(currentSlide + 1).padStart(2, "0")} /{" "}
//             {String(heroSections.length).padStart(2, "0")}
//           </span>
//         </div>
//       </div>

//       {/* Video Modal and its related code have been completely REMOVED */}
//     </div>
//   );
// }












// "use client";

// import { useState, useEffect, useCallback } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { AnimatePresence, motion } from "framer-motion";
// import { ArrowRight, MapPin } from "lucide-react";

// interface HeroSection {
//   id: string;
//   imageUrl: string;
//   title: string;
//   subtitle: string;
// }

// // --- Memoized Typewriter Component ---
// const Typewriter = ({
//   text,
//   delay = 0,
//   speed = 50,
//   className = ""
// }: {
//   text: string;
//   delay?: number;
//   speed?: number;
//   className?: string;
// }) => {
//   const [displayText, setDisplayText] = useState("");
//   const [showCursor, setShowCursor] = useState(false);

//   useEffect(() => {
//     setDisplayText("");
//     setShowCursor(false);

//     let typingInterval: NodeJS.Timeout;
//     const startTimeout = setTimeout(() => {
//       setShowCursor(true);
//       let currentIndex = 0;

//       typingInterval = setInterval(() => {
//         if (currentIndex <= text.length) {
//           setDisplayText(text.slice(0, currentIndex));
//           currentIndex++;
//         } else {
//           clearInterval(typingInterval);
//         }
//       }, speed);
//     }, delay);

//     return () => {
//       clearTimeout(startTimeout);
//       if (typingInterval) clearInterval(typingInterval);
//     };
//   }, [text, delay, speed]);

//   return (
//     <span className={className}>
//       {displayText}
//       <span className={`inline-block w-[2px] h-[1em] bg-green-500 ml-1 align-middle ${showCursor ? "animate-pulse" : "opacity-0"}`}></span>
//     </span>
//   );
// };

// // --- Pre-optimized Animations ---
// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: { staggerChildren: 0.1, delayChildren: 0.1 },
//   },
// } as const;

// const textGlowVariants = {
//   hidden: { opacity: 0, y: 10 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.6, ease: "easeOut" }
//   },
// } as const;

// const cardVariants = {
//   hidden: { opacity: 0, x: 20, scale: 0.98 },
//   visible: {
//     opacity: 1,
//     x: 0,
//     scale: 1,
//     transition: { type: "spring", stiffness: 200, damping: 25 }
//   },
//   hover: { y: -3, transition: { duration: 0.2 } }
// } as const;

// export default function HeroSlider() {
//   const [heroSections, setHeroSections] = useState<HeroSection[]>([]);
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [mounted, setMounted] = useState(false);

//   // ✅ FIXED: Dynamic re-fetching + No Cache for new images
//   const fetchHeroSections = useCallback(async () => {
//     try {
//       // Remove cache: 'force-cache' to get fresh data
//       const res = await fetch("/api/hero", {
//         cache: 'no-store', // ✅ Always fetch fresh data
//         next: { revalidate: 1 } // ✅ Revalidate every second
//       });
//       if (!res.ok) throw new Error(`Failed to fetch`);
//       const data = await res.json();

//       // ✅ Reset slide to 0 when new data arrives
//       setHeroSections(data);
//       setCurrentSlide(0);
//       // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     } catch (err) {
//       setError("System Offline");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   // ✅ Poll for new data every 30 seconds
//   useEffect(() => {
//     if (!mounted) return;
//     fetchHeroSections();

//     // ✅ Auto-refresh every 30 seconds for new images
//     const interval = setInterval(fetchHeroSections, 30000);
//     return () => clearInterval(interval);
//   }, [fetchHeroSections, mounted]);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   // Optimized auto-slide effect
//   useEffect(() => {
//     if (heroSections.length <= 1 || !mounted) return;

//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % heroSections.length);
//     }, 8000);

//     return () => clearInterval(interval);
//   }, [heroSections.length, mounted]); // ✅ Re-run when heroSections changes

//   // Early return for loading/error states
//   if (loading) {
//     return (
//       <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center gap-4 p-4">
//         <div className="w-10 h-10 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
//         <span className="text-green-500 font-mono text-xs sm:text-[10px] tracking-[0.3em] animate-pulse text-center">LOADING</span>
//       </div>
//     );
//   }

//   if (error || heroSections.length === 0) {
//     return (
//       <div className="min-h-screen w-full bg-black flex items-center justify-center text-white p-4">
//         <p className="text-xs sm:text-[10px] font-mono tracking-[0.3em] text-green-500 border border-green-500/30 px-4 py-2 rounded text-center">NO SIGNAL</p>
//       </div>
//     );
//   }

//   // Memoized slide data
//   const section = heroSections[currentSlide];
//   const nextSlideIndex = (currentSlide + 1) % heroSections.length;
//   const nextNextSlideIndex = (currentSlide + 2) % heroSections.length;
//   const card1Data = heroSections[nextSlideIndex];
//   const card2Data = heroSections[nextNextSlideIndex];

//   // Memoized title split
//   const titleWords = section.title.split(" ");
//   const firstWord = titleWords[0];
//   const restTitleWords = titleWords.slice(1).join(" ");

//   return (
//     <div className="relative w-full min-h-screen overflow-hidden font-sans bg-black selection:bg-green-500 selection:text-black will-change-auto">

//       {/* Background Image - Optimized for FIT (No Zoom, Full Cover) */}
//       <div className="absolute inset-0 w-full h-full perspective-1000">
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={`${section.id}-${section.imageUrl}`} // ✅ Unique key forces re-render
//             initial={{ opacity: 0, scale: 1 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 1.2, ease: "easeOut" }}
//             className="absolute inset-0 origin-center"
//           >
//             <Image
//               src={section.imageUrl}
//               alt={section.title}
//               fill
//               priority={currentSlide === 0}
//               // Added explicit style to force cover behavior
//               className="object-cover object-center brightness-[0.7]"
//               style={{ objectFit: 'cover' }}
//               sizes="100vw"
//               quality={90}
//             />
//             <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>
//             <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent pointer-events-none" />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent pointer-events-none" />
//           </motion.div>
//         </AnimatePresence>
//       </div>

//       {/* Main Content - Responsive Grid */}
//       <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-12 h-full flex flex-col justify-center min-h-screen py-12 sm:py-20">

//         <AnimatePresence mode="wait">
//           <motion.div
//             key={currentSlide} // ✅ Ensures content re-animates
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//             exit="hidden"
//             // CHANGED: Added 'items-center text-center' for mobile, 'lg:items-start lg:text-left' for desktop
//             className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center lg:items-center w-full h-full text-center lg:text-left"
//           >
//             {/* LEFT COLUMN: Typography - Centered on Mobile */}
//             <motion.div className="lg:col-span-7 space-y-6 sm:space-y-8 relative flex flex-col items-center lg:items-start">

//               {/* Slide Counter - Centered on Mobile */}
//               <motion.div variants={textGlowVariants} className="flex items-center justify-center lg:justify-start gap-3 opacity-90">
//                 {/* Changed Orange to Green */}
//                 <span className="text-green-500 font-mono text-sm md:text-[10px] font-bold drop-shadow-[0_0_10px_rgba(34,197,94,1)]">
//                   0{currentSlide + 1}
//                 </span>
//                 {/* Changed Orange to Green */}
//                 <div className="w-8 h-[1px] bg-gradient-to-r from-green-500 to-transparent"></div>
//                 <span className="text-white/60 font-mono text-sm md:text-[10px] drop-shadow-md">0{heroSections.length}</span>
//               </motion.div>

//               {/* Title - Large Typography for Mobile */}
//               <div className="relative">
//                 {/* CHANGED: Text size increased to 5xl/6xl for mobile */}
//                 <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-6xl xl:text-7xl leading-[0.9] tracking-tight uppercase">
//                   {/* Changed Orange to White for clean look */}
//                   <span className="block text-white font-fredoka drop-shadow-[0_0_25px_rgba(255,255,255,0.3)]">
//                     <Typewriter text={firstWord} speed={80} delay={200} />
//                   </span>
//                   <span className="block text-lime-300 font-poppins pl-1
//   [text-shadow:_0_0_10px_rgba(163,230,53,0.8),0_0_20px_rgba(163,230,53,0.6)]">
//                     <Typewriter text={restTitleWords} speed={60} delay={600} />
//                   </span>

//                 </h1>
//               </div>

//               {/* Subtitle & CTA - Centered Column on Mobile */}
//               <div className="flex flex-col gap-8 items-center lg:flex-row lg:items-center pt-4">
//                 <motion.div
//                   variants={textGlowVariants}
//                   // CHANGED: Removed left border on mobile, added vertical padding
//                   className="max-w-xs border-l-0 lg:border-l border-white/40 lg:pl-6 px-4 py-2 drop-shadow-md"
//                   style={{ minWidth: 0 }}
//                 >
//                   {/* CHANGED: Increased subtitle size to text-lg for mobile */}
//                   <Typewriter
//                     text={section.subtitle}
//                     speed={20}
//                     delay={1500}
//                     className="text-lg md:text-base text-white font-mono leading-relaxed tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] block"
//                   />
//                 </motion.div>

//                 <motion.div
//                   variants={textGlowVariants}
//                   whileHover={{ scale: 1.02 }}
//                   className="flex-shrink-0"
//                 >
//                   <Link href="/safari-packages" className="group block relative">
//                     <div className="absolute inset-0 bg-green-500 blur-md opacity-40 group-hover:opacity-70 transition-opacity duration-500 rounded-full -z-10"></div>
//                     <div className="relative bg-green-600 text-white px-8 py-4 lg:px-6 lg:py-3 shadow-[0_0_20px_rgba(22,163,74,0.4)] hover:bg-green-500 transition-colors rounded-full">
//                       {/* CHANGED: Increased button text size */}
//                       <span className="relative z-10 flex items-center gap-2 text-sm lg:text-[10px] font-bold uppercase tracking-[0.25em]">
//                         Book Now
//                         <ArrowRight className="w-4 h-4 lg:w-3 lg:h-3 text-white group-hover:translate-x-1 transition-transform flex-shrink-0" />
//                       </span>
//                     </div>
//                   </Link>
//                 </motion.div>
//               </div>

//               {/* Location Pin - Centered on Mobile */}
//               <motion.div variants={textGlowVariants} className="pt-8 w-full flex justify-center lg:justify-start">
//                 <div
//                   className="inline-flex items-center gap-3 p-3 bg-black/40 backdrop-blur-md"
//                   style={{
//                     clipPath: "polygon(10% 0, 100% 0, 100% 100%, 0% 100%, 0% 20%)",
//                     minWidth: "280px"
//                   }}
//                 >
//                   {/* Changed Orange to Green */}
//                   <div className="w-8 h-8 flex items-center justify-center bg-green-500/10 rounded-sm border border-green-500/50 flex-shrink-0">
//                     <MapPin className="w-4 h-4 text-green-500 animate-pulse" />
//                   </div>
//                   {/* Changed Orange to Green */}
//                   <div className="flex flex-col pr-4 border-r-2 border-green-500/50 min-w-0 flex-1 text-left">
//                     <span className="text-green-500 font-mono text-[10px] font-bold uppercase tracking-[0.2em] leading-none drop-shadow-[0_0_5px_rgba(34,197,94,0.6)] truncate">
//                       Yala National Park
//                     </span>
//                     <span className="text-white/70 text-[9px] font-mono uppercase tracking-widest leading-tight mt-0.5">
//                       Southern Province • Sri Lanka
//                     </span>
//                   </div>
//                 </div>
//               </motion.div>
//             </motion.div>

//             {/* RIGHT COLUMN: Preview Cards - Centered container on mobile */}
//             <motion.div
//               variants={containerVariants}
//               className="lg:col-span-5 flex flex-col sm:flex-row gap-6 justify-center lg:justify-end mt-12 lg:mt-0 items-center"
//             >
//               {/* CARD 1: NEXT */}
//               <motion.div
//                 variants={cardVariants}
//                 whileHover="hover"
//                 onClick={() => setCurrentSlide(nextSlideIndex)}
//                 className="group relative w-56 lg:w-56 h-72 lg:h-80 flex-shrink-0 cursor-pointer perspective-500"
//               >
//                 <motion.div
//                   className="w-full h-full relative preserve-3d transition-all duration-500 ease-out rounded-[2.5rem]"
//                   style={{ transformStyle: 'preserve-3d' }}
//                   whileHover={{ translateY: -8, rotateX: 3, scale: 1.01 }}
//                 >
//                   <div className="absolute -inset-[2px] bg-gradient-to-t from-green-500/0 via-green-500/50 to-green-500/0 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-md rounded-[2.5rem]" />
//                   <div className="absolute -inset-[1px] bg-white/10 group-hover:bg-green-500 transition-colors duration-300 rounded-[2.5rem]" />

//                   <div className="relative w-full h-full bg-neutral-900 overflow-hidden rounded-[2.5rem]">
//                     <Image
//                       key={card1Data.imageUrl} // ✅ Forces image re-load
//                       src={card1Data.imageUrl}
//                       alt={card1Data.title}
//                       fill
//                       className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:contrast-110"
//                       sizes="(max-width: 768px) 50vw, 25vw"
//                       quality={80}
//                     />
//                     <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20 mix-blend-overlay group-hover:opacity-30 transition-opacity pointer-events-none" />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none" />

//                     <div className="absolute top-5 right-5">
//                       <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full shadow-lg">
//                         <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]" />
//                         <span className="text-[9px] font-bold text-white/90 tracking-widest uppercase">Next</span>
//                       </div>
//                     </div>

//                     <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent text-left">
//                       <motion.div
//                         initial={{ x: 0 }}
//                         whileHover={{ x: 3 }}
//                         transition={{ type: "spring", stiffness: 400 }}
//                         className="flex items-center gap-2 mb-2"
//                       >
//                         {/* Changed Orange to Green */}
//                         <span className="text-green-500 text-xs font-black">0{nextSlideIndex + 1}</span>
//                         <div className="h-[1.5px] w-8 bg-green-500 rounded-full" />
//                       </motion.div>

//                       <h3 className="text-white text-xl font-black uppercase tracking-tighter leading-none mb-1 group-hover:text-green-400 transition-colors truncate">
//                         {card1Data.title.split(' ')[0]}
//                       </h3>
//                       <h3 className="text-white/60 text-xs font-bold uppercase tracking-[0.25em] leading-none truncate">
//                         {card1Data.title.split(' ').slice(1).join(' ')}
//                       </h3>
//                     </div>
//                   </div>
//                 </motion.div>
//               </motion.div>

//               {/* CARD 2: INCOMING - Hidden on very small screens, shown on tablet+ */}
//               <motion.div
//                 variants={cardVariants}
//                 whileHover={{ y: -3, opacity: 1 }}
//                 onClick={() => setCurrentSlide(nextNextSlideIndex)}
//                 className="group relative w-44 lg:w-48 h-64 lg:h-72 flex-shrink-0 cursor-pointer opacity-50 hover:opacity-100 transition-all duration-500 hidden sm:block"
//               >
//                 {/* Changed Orange to Green */}
//                 <div className="absolute -inset-[1px] bg-white/5 group-hover:bg-green-500/50 transition-colors duration-500 rounded-[2rem]" />

//                 <div className="relative w-full h-full bg-black/90 overflow-hidden rounded-[2rem]">
//                   <Image
//                     key={card2Data.imageUrl} // ✅ Forces image re-load
//                     src={card2Data.imageUrl}
//                     alt={card2Data.title}
//                     fill
//                     className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-40 group-hover:opacity-80"
//                     sizes="(max-width: 768px) 40vw, 20vw"
//                     quality={75}
//                   />
//                   <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors pointer-events-none" />

//                   <div className="absolute top-4 right-4">
//                     {/* Changed Orange to Green */}
//                     <span className="text-[8px] font-bold text-white/30 tracking-widest border border-white/10 px-2 py-1 rounded-full group-hover:text-green-400 group-hover:border-green-500/50 transition-all">
//                       QUEUED
//                     </span>
//                   </div>

//                   <div className="absolute bottom-0 left-0 w-full p-5 bg-gradient-to-t from-black via-transparent to-transparent text-left">
//                     <h3 className="text-white/50 text-xs font-bold uppercase tracking-wide leading-tight group-hover:text-white transition-colors line-clamp-2">
//                       {card2Data.title}
//                     </h3>
//                   </div>
//                 </div>
//               </motion.div>
//             </motion.div>
//           </motion.div>
//         </AnimatePresence>
//       </div>

//       {/* Progress Bar - Optimized */}
//       <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 z-20 flex pointer-events-none">
//         {heroSections.map((_, idx) => (
//           <div key={idx} className="flex-1 h-full border-r border-black/50 relative bg-black/10 backdrop-blur-sm">
//             {idx === currentSlide && (
//               <motion.div
//                 initial={{ width: "0%" }}
//                 animate={{ width: "100%" }}
//                 transition={{ duration: 8, ease: "linear" }}
//                 className="h-full bg-green-500 shadow-[0_0_15px_#22c55e]"
//               />
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }








// "use client";

// import { useState, useEffect, useCallback } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { AnimatePresence, motion } from "framer-motion";
// import { ArrowRight, MapPin } from "lucide-react";

// interface HeroSection {
//   id: string;
//   imageUrl: string;
//   title: string;
//   subtitle: string;
// }

// // --- Memoized Typewriter Component ---
// const Typewriter = ({
//   text,
//   delay = 0,
//   speed = 50,
//   className = ""
// }: {
//   text: string;
//   delay?: number;
//   speed?: number;
//   className?: string;
// }) => {
//   const [displayText, setDisplayText] = useState("");
//   const [showCursor, setShowCursor] = useState(false);

//   useEffect(() => {
//     setDisplayText("");
//     setShowCursor(false);

//     let typingInterval: NodeJS.Timeout;
//     const startTimeout = setTimeout(() => {
//       setShowCursor(true);
//       let currentIndex = 0;

//       typingInterval = setInterval(() => {
//         if (currentIndex <= text.length) {
//           setDisplayText(text.slice(0, currentIndex));
//           currentIndex++;
//         } else {
//           clearInterval(typingInterval);
//         }
//       }, speed);
//     }, delay);

//     return () => {
//       clearTimeout(startTimeout);
//       if (typingInterval) clearInterval(typingInterval);
//     };
//   }, [text, delay, speed]);

//   return (
//     <span className={className}>
//       {displayText}
//       <span className={`inline-block w-[2px] h-[1em] bg-green-500 ml-1 align-middle ${showCursor ? "animate-pulse" : "opacity-0"}`}></span>
//     </span>
//   );
// };

// // --- Pre-optimized Animations ---
// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: { staggerChildren: 0.1, delayChildren: 0.1 },
//   },
// } as const;

// const textGlowVariants = {
//   hidden: { opacity: 0, y: 10 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.6, ease: "easeOut" }
//   },
// } as const;

// const cardVariants = {
//   hidden: { opacity: 0, x: 20, scale: 0.98 },
//   visible: {
//     opacity: 1,
//     x: 0,
//     scale: 1,
//     transition: { type: "spring", stiffness: 200, damping: 25 }
//   },
//   hover: { y: -3, transition: { duration: 0.2 } }
// } as const;

// export default function HeroSlider() {
//   const [heroSections, setHeroSections] = useState<HeroSection[]>([]);
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [mounted, setMounted] = useState(false);

//   // ✅ FIXED: Dynamic re-fetching + No Cache for new images
//   const fetchHeroSections = useCallback(async () => {
//     try {
//       // Remove cache: 'force-cache' to get fresh data
//       const res = await fetch("/api/hero", {
//         cache: 'no-store', // ✅ Always fetch fresh data
//         next: { revalidate: 1 } // ✅ Revalidate every second
//       });
//       if (!res.ok) throw new Error(`Failed to fetch`);
//       const data = await res.json();

//       // ✅ Reset slide to 0 when new data arrives
//       setHeroSections(data);
//       setCurrentSlide(0);
//       // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     } catch (err) {
//       setError("System Offline");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   // ✅ Poll for new data every 30 seconds
//   useEffect(() => {
//     if (!mounted) return;
//     fetchHeroSections();

//     // ✅ Auto-refresh every 30 seconds for new images
//     const interval = setInterval(fetchHeroSections, 30000);
//     return () => clearInterval(interval);
//   }, [fetchHeroSections, mounted]);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   // Optimized auto-slide effect
//   useEffect(() => {
//     if (heroSections.length <= 1 || !mounted) return;

//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % heroSections.length);
//     }, 8000);

//     return () => clearInterval(interval);
//   }, [heroSections.length, mounted]); // ✅ Re-run when heroSections changes

//   // Early return for loading/error states
//   if (loading) {
//     return (
//       <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center gap-4 p-4">
//         <div className="w-10 h-10 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
//         <span className="text-green-500 font-mono text-xs sm:text-[10px] tracking-[0.3em] animate-pulse text-center">LOADING</span>
//       </div>
//     );
//   }

//   if (error || heroSections.length === 0) {
//     return (
//       <div className="min-h-screen w-full bg-black flex items-center justify-center text-white p-4">
//         <p className="text-xs sm:text-[10px] font-mono tracking-[0.3em] text-green-500 border border-green-500/30 px-4 py-2 rounded text-center">NO SIGNAL</p>
//       </div>
//     );
//   }

//   // Memoized slide data
//   const section = heroSections[currentSlide];
//   const nextSlideIndex = (currentSlide + 1) % heroSections.length;
//   const nextNextSlideIndex = (currentSlide + 2) % heroSections.length;
//   const card1Data = heroSections[nextSlideIndex];
//   const card2Data = heroSections[nextNextSlideIndex];

//   // Memoized title split
//   const titleWords = section.title.split(" ");
//   const firstWord = titleWords[0];
//   const restTitleWords = titleWords.slice(1).join(" ");

//   return (
//     <div className="relative w-full min-h-screen overflow-hidden font-sans bg-black selection:bg-green-500 selection:text-black will-change-auto">

//       {/* Background Image - Optimized for FIT (No Zoom, Full Cover) */}
//       <div className="absolute inset-0 w-full h-full perspective-1000">
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={`${section.id}-${section.imageUrl}`} // ✅ Unique key forces re-render
//             initial={{ opacity: 0, scale: 1 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 1.2, ease: "easeOut" }}
//             className="absolute inset-0 origin-center"
//           >
//             <Image
//               src={section.imageUrl}
//               alt={section.title}
//               fill
//               priority={currentSlide === 0}
//               // Added explicit style to force cover behavior
//               className="object-cover object-center brightness-[0.7]"
//               style={{ objectFit: 'cover' }}
//               sizes="100vw"
//               quality={90}
//             />
//             <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>
//             <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent pointer-events-none" />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent pointer-events-none" />
//           </motion.div>
//         </AnimatePresence>
//       </div>

//       {/* Main Content - Responsive Grid */}
//       <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-12 h-full flex flex-col justify-center min-h-screen py-12 sm:py-20">

//         <AnimatePresence mode="wait">
//           <motion.div
//             key={currentSlide} // ✅ Ensures content re-animates
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//             exit="hidden"
//             // CHANGED: Added 'items-center text-center' for mobile, 'lg:items-start lg:text-left' for desktop
//             className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center lg:items-center w-full h-full text-center lg:text-left"
//           >
//             {/* LEFT COLUMN: Typography - Centered on Mobile */}
//             <motion.div className="lg:col-span-7 space-y-6 sm:space-y-8 relative flex flex-col items-center lg:items-start w-full">

//               {/* Slide Counter - Centered on Mobile */}
//               <motion.div variants={textGlowVariants} className="flex items-center justify-center lg:justify-start gap-3 opacity-90">
//                 <span className="text-green-500 font-mono text-sm md:text-[10px] font-bold drop-shadow-[0_0_10px_rgba(34,197,94,1)]">
//                   0{currentSlide + 1}
//                 </span>
//                 <div className="w-8 h-[1px] bg-gradient-to-r from-green-500 to-transparent"></div>
//                 <span className="text-white/60 font-mono text-sm md:text-[10px] drop-shadow-md">0{heroSections.length}</span>
//               </motion.div>

//               {/* Title - Large Typography for Mobile */}
//               <div className="relative w-full">
//                 {/* CHANGED: Text size increased to 5xl/6xl for mobile */}
//                 <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-6xl xl:text-7xl leading-[0.9] tracking-tight uppercase">
//                   <span className="block text-white font-fredoka drop-shadow-[0_0_25px_rgba(255,255,255,0.3)]">
//                     <Typewriter text={firstWord} speed={80} delay={200} />
//                   </span>
//                   <span className="block text-lime-300 font-poppins pl-1 [text-shadow:_0_0_10px_rgba(163,230,53,0.8),0_0_20px_rgba(163,230,53,0.6)]">
//                     <Typewriter text={restTitleWords} speed={60} delay={600} />
//                   </span>
//                 </h1>
//               </div>

//               {/* Subtitle & CTA - Centered Column on Mobile */}
//               <div className="flex flex-col gap-8 items-center lg:flex-row lg:items-center pt-4">
//                 <motion.div
//                   variants={textGlowVariants}
//                   // CHANGED: Removed left border on mobile, added vertical padding
//                   className="max-w-xs border-l-0 lg:border-l border-white/40 lg:pl-6 px-4 py-2 drop-shadow-md"
//                   style={{ minWidth: 0 }}
//                 >
//                   <Typewriter
//                     text={section.subtitle}
//                     speed={20}
//                     delay={1500}
//                     className="text-lg md:text-base text-white font-mono leading-relaxed tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] block"
//                   />
//                 </motion.div>

//                 <motion.div
//                   variants={textGlowVariants}
//                   whileHover={{ scale: 1.02 }}
//                   className="flex-shrink-0"
//                 >
//                   <Link href="/safari-packages" className="group block relative">
//                     <div className="absolute inset-0 bg-green-500 blur-md opacity-40 group-hover:opacity-70 transition-opacity duration-500 rounded-full -z-10"></div>
//                     <div className="relative bg-green-600 text-white px-8 py-4 lg:px-6 lg:py-3 shadow-[0_0_20px_rgba(22,163,74,0.4)] hover:bg-green-500 transition-colors rounded-full">
//                       <span className="relative z-10 flex items-center gap-2 text-sm lg:text-[10px] font-bold uppercase tracking-[0.25em]">
//                         Book Now
//                         <ArrowRight className="w-4 h-4 lg:w-3 lg:h-3 text-white group-hover:translate-x-1 transition-transform flex-shrink-0" />
//                       </span>
//                     </div>
//                   </Link>
//                 </motion.div>
//               </div>

//               {/* Location Pin - Centered on Mobile */}
//               <motion.div variants={textGlowVariants} className="pt-8 w-full flex justify-center lg:justify-start">
//                 <div
//                   className="inline-flex items-center gap-3 p-3 bg-black/40 backdrop-blur-md"
//                   style={{
//                     clipPath: "polygon(10% 0, 100% 0, 100% 100%, 0% 100%, 0% 20%)",
//                     minWidth: "280px"
//                   }}
//                 >
//                   <div className="w-8 h-8 flex items-center justify-center bg-green-500/10 rounded-sm border border-green-500/50 flex-shrink-0">
//                     <MapPin className="w-4 h-4 text-green-500 animate-pulse" />
//                   </div>
//                   <div className="flex flex-col pr-4 border-r-2 border-green-500/50 min-w-0 flex-1 text-left">
//                     <span className="text-green-500 font-mono text-[10px] font-bold uppercase tracking-[0.2em] leading-none drop-shadow-[0_0_5px_rgba(34,197,94,0.6)] truncate">
//                       Yala National Park
//                     </span>
//                     <span className="text-white/70 text-[9px] font-mono uppercase tracking-widest leading-tight mt-0.5">
//                       Southern Province • Sri Lanka
//                     </span>
//                   </div>
//                 </div>
//               </motion.div>
//             </motion.div>

//             {/* RIGHT COLUMN: Preview Cards - HIDDEN ON MOBILE (hidden lg:flex) */}
//             <motion.div
//               variants={containerVariants}
//               className="hidden lg:flex lg:col-span-5 flex-col sm:flex-row gap-6 justify-center lg:justify-end mt-12 lg:mt-0 items-center"
//             >
//               {/* CARD 1: NEXT */}
//               <motion.div
//                 variants={cardVariants}
//                 whileHover="hover"
//                 onClick={() => setCurrentSlide(nextSlideIndex)}
//                 className="group relative w-56 lg:w-56 h-72 lg:h-80 flex-shrink-0 cursor-pointer perspective-500"
//               >
//                 <motion.div
//                   className="w-full h-full relative preserve-3d transition-all duration-500 ease-out rounded-[2.5rem]"
//                   style={{ transformStyle: 'preserve-3d' }}
//                   whileHover={{ translateY: -8, rotateX: 3, scale: 1.01 }}
//                 >
//                   <div className="absolute -inset-[2px] bg-gradient-to-t from-green-500/0 via-green-500/50 to-green-500/0 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-md rounded-[2.5rem]" />
//                   <div className="absolute -inset-[1px] bg-white/10 group-hover:bg-green-500 transition-colors duration-300 rounded-[2.5rem]" />

//                   <div className="relative w-full h-full bg-neutral-900 overflow-hidden rounded-[2.5rem]">
//                     <Image
//                       key={card1Data.imageUrl} // ✅ Forces image re-load
//                       src={card1Data.imageUrl}
//                       alt={card1Data.title}
//                       fill
//                       className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:contrast-110"
//                       sizes="(max-width: 768px) 50vw, 25vw"
//                       quality={80}
//                     />
//                     <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20 mix-blend-overlay group-hover:opacity-30 transition-opacity pointer-events-none" />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none" />

//                     <div className="absolute top-5 right-5">
//                       <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full shadow-lg">
//                         <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]" />
//                         <span className="text-[9px] font-bold text-white/90 tracking-widest uppercase">Next</span>
//                       </div>
//                     </div>

//                     <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent text-left">
//                       <motion.div
//                         initial={{ x: 0 }}
//                         whileHover={{ x: 3 }}
//                         transition={{ type: "spring", stiffness: 400 }}
//                         className="flex items-center gap-2 mb-2"
//                       >
//                         <span className="text-green-500 text-xs font-black">0{nextSlideIndex + 1}</span>
//                         <div className="h-[1.5px] w-8 bg-green-500 rounded-full" />
//                       </motion.div>

//                       <h3 className="text-white text-xl font-black uppercase tracking-tighter leading-none mb-1 group-hover:text-green-400 transition-colors truncate">
//                         {card1Data.title.split(' ')[0]}
//                       </h3>
//                       <h3 className="text-white/60 text-xs font-bold uppercase tracking-[0.25em] leading-none truncate">
//                         {card1Data.title.split(' ').slice(1).join(' ')}
//                       </h3>
//                     </div>
//                   </div>
//                 </motion.div>
//               </motion.div>

//               {/* CARD 2: INCOMING */}
//               <motion.div
//                 variants={cardVariants}
//                 whileHover={{ y: -3, opacity: 1 }}
//                 onClick={() => setCurrentSlide(nextNextSlideIndex)}
//                 className="group relative w-44 lg:w-48 h-64 lg:h-72 flex-shrink-0 cursor-pointer opacity-50 hover:opacity-100 transition-all duration-500 hidden sm:block"
//               >
//                 <div className="absolute -inset-[1px] bg-white/5 group-hover:bg-green-500/50 transition-colors duration-500 rounded-[2rem]" />

//                 <div className="relative w-full h-full bg-black/90 overflow-hidden rounded-[2rem]">
//                   <Image
//                     key={card2Data.imageUrl} // ✅ Forces image re-load
//                     src={card2Data.imageUrl}
//                     alt={card2Data.title}
//                     fill
//                     className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-40 group-hover:opacity-80"
//                     sizes="(max-width: 768px) 40vw, 20vw"
//                     quality={75}
//                   />
//                   <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors pointer-events-none" />

//                   <div className="absolute top-4 right-4">
//                     <span className="text-[8px] font-bold text-white/30 tracking-widest border border-white/10 px-2 py-1 rounded-full group-hover:text-green-400 group-hover:border-green-500/50 transition-all">
//                       QUEUED
//                     </span>
//                   </div>

//                   <div className="absolute bottom-0 left-0 w-full p-5 bg-gradient-to-t from-black via-transparent to-transparent text-left">
//                     <h3 className="text-white/50 text-xs font-bold uppercase tracking-wide leading-tight group-hover:text-white transition-colors line-clamp-2">
//                       {card2Data.title}
//                     </h3>
//                   </div>
//                 </div>
//               </motion.div>
//             </motion.div>
//           </motion.div>
//         </AnimatePresence>
//       </div>

//       {/* Progress Bar - Optimized */}
//       <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 z-20 flex pointer-events-none">
//         {heroSections.map((_, idx) => (
//           <div key={idx} className="flex-1 h-full border-r border-black/50 relative bg-black/10 backdrop-blur-sm">
//             {idx === currentSlide && (
//               <motion.div
//                 initial={{ width: "0%" }}
//                 animate={{ width: "100%" }}
//                 transition={{ duration: 8, ease: "linear" }}
//                 className="h-full bg-green-500 shadow-[0_0_15px_#22c55e]"
//               />
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }













"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";

interface HeroSection {
  id: string;
  imageUrl: string;
  title: string;
  subtitle: string;
}

// --- Memoized Typewriter Component ---
const Typewriter = ({
  text,
  delay = 0,
  speed = 50,
  className = ""
}: {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
}) => {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    setDisplayText("");
    setShowCursor(false);

    let typingInterval: NodeJS.Timeout;
    const startTimeout = setTimeout(() => {
      setShowCursor(true);
      let currentIndex = 0;

      typingInterval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      if (typingInterval) clearInterval(typingInterval);
    };
  }, [text, delay, speed]);

  return (
    <span className={className}>
      {displayText}
      <span className={`inline-block w-[2px] h-[1em] bg-lime-400 ml-1 align-middle ${showCursor ? "animate-pulse" : "opacity-0"}`}></span>
    </span>
  );
};

// --- Pre-optimized Animations (GPU Friendly) ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
} as const;

const textGlowVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  },
} as const;

const cardVariants = {
  hidden: { opacity: 0, x: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 25 }
  },
  hover: { y: -3, transition: { duration: 0.2 } }
} as const;

export default function HeroSlider() {
  const [heroSections, setHeroSections] = useState<HeroSection[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // ✅ FIXED: Dynamic re-fetching + No Cache for new images
  const fetchHeroSections = useCallback(async () => {
    try {
      const res = await fetch("/api/hero", {
        cache: 'no-store',
        next: { revalidate: 1 }
      });
      if (!res.ok) throw new Error(`Failed to fetch`);
      const data = await res.json();

      setHeroSections(data);
      setCurrentSlide(0);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("System Offline");
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ Poll for new data every 30 seconds
  useEffect(() => {
    if (!mounted) return;
    fetchHeroSections();
    const interval = setInterval(fetchHeroSections, 30000);
    return () => clearInterval(interval);
  }, [fetchHeroSections, mounted]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Optimized auto-slide effect
  useEffect(() => {
    if (heroSections.length <= 1 || !mounted) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSections.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [heroSections.length, mounted]);

  // Early return for loading/error states
  if (loading) {
    return (
      <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center gap-4 p-4">
        <div className="w-10 h-10 border-2 border-lime-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-lime-500 font-mono text-xs sm:text-[10px] tracking-[0.3em] animate-pulse text-center">LOADING</span>
      </div>
    );
  }

  if (error || heroSections.length === 0) {
    return (
      <div className="min-h-screen w-full bg-black flex items-center justify-center text-white p-4">
        <p className="text-xs sm:text-[10px] font-mono tracking-[0.3em] text-lime-500 border border-lime-500/30 px-4 py-2 rounded text-center">NO SIGNAL</p>
      </div>
    );
  }

  // Memoized slide data
  const section = heroSections[currentSlide];
  const nextSlideIndex = (currentSlide + 1) % heroSections.length;
  const nextNextSlideIndex = (currentSlide + 2) % heroSections.length;
  const card1Data = heroSections[nextSlideIndex];
  const card2Data = heroSections[nextNextSlideIndex];

  // Memoized title split
  const titleWords = section.title.split(" ");
  const firstWord = titleWords[0];
  const restTitleWords = titleWords.slice(1).join(" ");

  return (
    <div className="relative w-full min-h-screen overflow-hidden font-sans bg-black selection:bg-lime-400 selection:text-black will-change-auto">

      {/* 1. BACKGROUND IMAGE - OPTIMIZED FOR SPEED */}
      <div className="absolute inset-0 w-full h-full perspective-1000">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${section.id}-${section.imageUrl}`}
            initial={{ opacity: 0, scale: 1.05 }} // Reduced scale scale for less jank
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            // Added transform-gpu to force hardware acceleration
            className="absolute inset-0 origin-center transform-gpu will-change-transform"
          >
            <Image
              src={section.imageUrl}
              alt={section.title}
              fill
              priority={currentSlide === 0}
              className="object-cover object-center brightness-[0.85]" // Slightly brighter for Lime
              style={{ objectFit: 'cover' }}
              // Optimization: Download smaller image on mobile to load faster
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
              // Optimization: 80 is virtually identical to 100 but 60% smaller file size
              quality={80}
            />
            {/* Cleaner Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/10 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 2. MAIN CONTENT */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-12 h-full flex flex-col justify-center min-h-screen py-12 sm:py-20">

        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center lg:items-center w-full h-full text-center lg:text-left"
          >
            {/* LEFT COLUMN: Typography */}
            <motion.div className="lg:col-span-7 space-y-6 sm:space-y-8 relative flex flex-col items-center lg:items-start w-full">

              {/* Counter - Blurred Background */}
              <motion.div
                variants={textGlowVariants}
                className="inline-flex items-center justify-center lg:justify-start gap-3 px-4 py-2 bg-black/30 backdrop-blur-md rounded-full border border-white/10"
              >
                <span className="text-lime-400 font-mono text-sm md:text-[10px] font-bold drop-shadow-[0_0_10px_rgba(163,230,53,0.8)]">
                  0{currentSlide + 1}
                </span>
                <div className="w-8 h-[1px] bg-white/30"></div>
                <span className="text-white/80 font-mono text-sm md:text-[10px]">0{heroSections.length}</span>
              </motion.div>

              {/* Title - Blurred Background Block */}
              <div className="relative w-full flex justify-center lg:justify-start">
                <motion.div
                  variants={textGlowVariants}
                  className="bg-black/20 backdrop-blur-sm rounded-3xl p-4 lg:p-6 border border-white/5 shadow-2xl inline-block"
                >
                  <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl leading-[0.9] tracking-tight uppercase">
                    <span className="block text-white font-fredoka drop-shadow-md">
                      <Typewriter text={firstWord} speed={80} delay={200} />
                    </span>
                    {/* <span className="block text-transparent bg-clip-text bg-gradient-to-r from-lime-300 to-green-400 font-poppins pl-1 drop-shadow-sm">
                      <Typewriter text={restTitleWords} speed={60} delay={600} />
                    </span> */}
                    <span className="block text-lime-300 font-poppins pl-1
  [text-shadow:_0_0_10px_rgba(163,230,53,0.8),0_0_20px_rgba(163,230,53,0.6)]">
                      <Typewriter text={restTitleWords} speed={60} delay={600} />
                    </span>

                  </h1>
                </motion.div>
              </div>

              {/* Subtitle & CTA */}
              <div className="flex flex-col gap-6 items-center lg:flex-row lg:items-center pt-2">
                <motion.div
                  variants={textGlowVariants}
                  className="max-w-md bg-black/30 backdrop-blur-md rounded-xl p-4 border-l-4 border-lime-500 shadow-lg"
                >
                  <Typewriter
                    text={section.subtitle}
                    speed={20}
                    delay={1000}
                    className="text-lg md:text-xl text-white font-medium leading-relaxed tracking-wide block drop-shadow-md"
                  />
                </motion.div>

                <motion.div
                  variants={textGlowVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-shrink-0"
                >
                  <Link href="/safari-packages" className="group block relative">
                    <div className="absolute inset-0 bg-lime-500 blur-lg opacity-90 group-hover:opacity-60 transition-opacity duration-500 rounded-full"></div>
                    <div className="relative bg-white/10 backdrop-blur-xl border border-lime-500/30 text-white px-8 py-4 lg:px-8 lg:py-4 shadow-xl hover:bg-lime-500 hover:border-lime-500 transition-all rounded-full flex items-center gap-3">
                      <span className="text-sm font-bold uppercase tracking-[0.2em]">Book Now</span>
                      <div className="bg-white text-black rounded-full p-1">
                        <ArrowRight className="w-3 h-3 group-hover:rotate-45 transition-transform duration-300" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </div>

              {/* Location Pin */}
              <motion.div variants={textGlowVariants} className="pt-4 w-full flex justify-center lg:justify-start">
                <div
                  className="inline-flex items-center gap-3 px-5 py-3 bg-black/40 backdrop-blur-xl rounded-full border border-white/10 shadow-lg"
                >
                  <div className="w-8 h-8 flex items-center justify-center bg-lime-500 rounded-full shadow-[0_0_10px_#84cc16]">
                    <MapPin className="w-4 h-4 text-black animate-bounce" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-lime-300 font-mono text-[10px] font-bold uppercase tracking-widest leading-none">
                      Yala National Park
                    </span>
                    <span className="text-white/90 text-[9px] font-mono uppercase tracking-wider leading-tight mt-0.5">
                      Southern Province • Sri Lanka
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* RIGHT COLUMN: Preview Cards (Hidden on Mobile) */}
            <motion.div
              variants={containerVariants}
              className="hidden lg:flex lg:col-span-5 flex-col sm:flex-row gap-6 justify-center lg:justify-end mt-12 lg:mt-0 items-center perspective-1000"
            >
              {/* CARD 1: NEXT */}
              <motion.div
                variants={cardVariants}
                whileHover="hover"
                onClick={() => setCurrentSlide(nextSlideIndex)}
                className="group relative w-64 h-96 flex-shrink-0 cursor-pointer"
              >
                <motion.div
                  className="w-full h-full relative rounded-[2rem] overflow-hidden shadow-2xl border border-white/20 transform-gpu"
                  whileHover={{ y: -10, rotateX: 5 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <Image
                    key={card1Data.imageUrl}
                    src={card1Data.imageUrl}
                    alt={card1Data.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="25vw"
                    quality={75} // Lower quality for thumbnails to load fast
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

                  <div className="absolute top-4 right-4">
                    <div className="bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[9px] font-bold text-white uppercase tracking-widest">
                      Next
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 w-full p-6">
                    <div className="bg-black/40 backdrop-blur-md p-4 rounded-xl border border-white/10">
                      <h3 className="text-white text-lg font-black uppercase tracking-tight leading-none mb-1 group-hover:text-lime-400 transition-colors">
                        {card1Data.title}
                      </h3>
                      <div className="h-1 w-8 bg-lime-500 rounded-full mt-2" />
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* CARD 2: INCOMING */}
              <motion.div
                variants={cardVariants}
                onClick={() => setCurrentSlide(nextNextSlideIndex)}
                className="group relative w-48 h-72 flex-shrink-0 cursor-pointer opacity-60 hover:opacity-100 transition-all duration-500 hidden xl:block"
              >
                <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden border border-white/10 grayscale group-hover:grayscale-0 transition-all transform-gpu">
                  <Image
                    key={card2Data.imageUrl}
                    src={card2Data.imageUrl}
                    alt={card2Data.title}
                    fill
                    className="object-cover"
                    sizes="20vw"
                    quality={60} // Lower quality for thumbnails
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors" />

                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-black/60 backdrop-blur-sm p-3 rounded-lg border border-white/5">
                      <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest">Up Next</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1.5 bg-white/10 z-20 flex pointer-events-none">
        {heroSections.map((_, idx) => (
          <div key={idx} className="flex-1 h-full border-r border-black/20 relative bg-black/20 backdrop-blur-sm">
            {idx === currentSlide && (
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 8, ease: "linear" }}
                className="h-full bg-lime-500 shadow-[0_0_15px_#84cc16]"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}