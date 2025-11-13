// "use client";

// import { useState, useEffect } from "react";
// import Image from "next/image";
// import { ChevronLeft, ChevronRight, Play } from "lucide-react";
// import Link from "next/link";

// interface HeroSection {
//   id: string;
//   imageUrl: string;
//   title: string;
//   subtitle: string;
// }

// export default function HeroSlider() {
//   const [heroSections, setHeroSections] = useState<HeroSection[]>([]);
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isPlaying, setIsPlaying] = useState(true);

//   // Fetch hero sections from API
//   useEffect(() => {
//     const fetchHeroSections = async () => {
//       try {
//         const res = await fetch("/api/hero");
//         if (!res.ok) {
//           throw new Error(`Failed to fetch hero sections: ${res.statusText}`);
//         }
//         const data = await res.json();
//         setHeroSections(data);
//       } catch (err) {
//         const errorMsg = err instanceof Error ? err.message : "An error occurred";
//         setError(errorMsg);
//         console.error("Fetch hero sections error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchHeroSections();
//   }, []);

//   // Auto-sliding functionality
//   useEffect(() => {
//     if (heroSections.length <= 1 || !isPlaying) return;

//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % heroSections.length);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [heroSections.length, isPlaying]);

//   // Navigation handlers
//   const goToSlide = (index: number) => {
//     setCurrentSlide(index);
//   };

//   const goToPrevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + heroSections.length) % heroSections.length);
//   };

//   const goToNextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % heroSections.length);
//   };

//   const togglePlayPause = () => {
//     setIsPlaying(!isPlaying);
//   };

//   // Loading state
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

//   // Error state
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

//   // Empty state
//   if (heroSections.length === 0) {
//     return (
//       <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
//         <div className="text-center max-w-md mx-auto px-4">
//           <div className="bg-gray-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
//             <span className="text-gray-400 text-2xl">📷</span>
//           </div>
//           <p className="text-white text-lg font-medium">No experiences available at the moment</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="relative w-full min-h-screen overflow-hidden">
//       {/* Main Slider Container */}
//       <div className="relative w-full h-screen">
//         {heroSections.map((section, index) => (
//           <div
//             key={section.id}
//             className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out transform ${index === currentSlide
//                 ? "opacity-100 scale-100 z-10"
//                 : "opacity-0 scale-105 z-0"
//               }`}
//           >
//             {/* Background Image with Parallax Effect */}
//             <div className="absolute inset-0 w-full h-full">
//               <Image
//                 src={section.imageUrl}
//                 alt={section.title}
//                 fill
//                 priority={index === 0}
//                 className="object-cover object-center transition-transform duration-1000 hover:scale-105"
//                 sizes="100vw"
//                 onError={(e) => {
//                   e.currentTarget.src = "/fallback-hero.jpg";
//                 }}
//               />

//               {/* Gradient Overlays for Better Text Readability */}
//               <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
//               <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
//             </div>

//             {/* Content Overlay */}
//             <div className="relative z-20 h-full flex items-center justify-center">
//               <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-6xl">
//                 <div className="text-center space-y-6 sm:space-y-8">
//                   {/* Main Title */}
//                   <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
//                     <span className="block text-green-400 mb-2">
//                       {section.title.split(' ')[0]}
//                     </span>
//                     <span className="block">
//                       {section.title.split(' ').slice(1).join(' ')}
//                     </span>
//                   </h1>

//                   {/* Subtitle */}
//                   <p className="text-lg sm:text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed font-light">
//                     {section.subtitle}
//                   </p>

//                   {/* Call to Action Buttons */}
//                   <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center pt-6">
//                     <Link
//                       href="/safari-packages"
//                       className="group relative inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/25"
//                     >
//                       <span>Explore Packages</span>
//                       <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                     </Link>

//                     <Link
//                       href="/about"
//                       className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white/30 hover:border-white/50 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105"
//                     >
//                       Learn More
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Navigation Controls - Only show if multiple slides */}
//       {heroSections.length > 1 && (
//         <>
//           {/* Previous/Next Arrows */}
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

//           {/* Play/Pause Control */}
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

//           {/* Slide Indicators */}
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
//                         ? "bg-green-400 scale-125"
//                         : "bg-white/40 hover:bg-white/60 hover:scale-110"
//                       }`}
//                   />
//                   {index === currentSlide && (
//                     <div className="absolute inset-0 rounded-full bg-green-400/30 animate-ping" />
//                   )}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Progress Bar */}
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

//       {/* Slide Counter */}
//       {heroSections.length > 1 && (
//         <div className="absolute top-8 left-8 z-30 hidden sm:block">
//           <div className="bg-black/30 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
//             <span className="text-white font-medium">
//               {String(currentSlide + 1).padStart(2, '0')} / {String(heroSections.length).padStart(2, '0')}
//             </span>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }








"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Play, // Kept for the play/pause button
  Users,
} from "lucide-react"; // Removed X
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion"; // Added for animations

// Your original interface
interface HeroSection {
  id: string;
  imageUrl: string;
  title: string;
  subtitle: string;
}

// --- Animation Variants ---
// We'll use these to animate the content in on each slide.

// Parent container to orchestrate staggered animations
const staggerParentVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Each child animates 0.2s after the previous
    },
  },
};

// Animation for text/buttons (fade in, slide up)
const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// Animation for the details cards (with a slight delay)
const detailsVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.4, ease: "easeOut" },
  },
};

// --- Main Component ---

export default function HeroSlider() {
  const [heroSections, setHeroSections] = useState<HeroSection[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  // Removed the isVideoModalOpen state

  // Fetch hero sections from API (Your original logic)
  useEffect(() => {
    const fetchHeroSections = async () => {
      try {
        // --- FIXED: Your Original Fetch Logic is now active ---
        const res = await fetch("/api/hero");
        if (!res.ok) {
          throw new Error(`Failed to fetch hero sections: ${res.statusText}`);
        }
        const data = await res.json();
        setHeroSections(data);
      } catch (err) {
        const errorMsg =
          err instanceof Error ? err.message : "An error occurred";
        setError(errorMsg);
        console.error("Fetch hero sections error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroSections();
  }, []);

  // Auto-sliding functionality (Your original logic)
  useEffect(() => {
    if (heroSections.length <= 1 || !isPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSections.length);
    }, 5000); // 5-second slide duration
    return () => clearInterval(interval);
  }, [heroSections.length, isPlaying]);

  // Navigation handlers (Your original logic)
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };
  const goToPrevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSections.length) % heroSections.length
    );
  };
  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSections.length);
  };
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // --- Loading, Error, Empty States (Unchanged) ---
  if (loading) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-black-900 via-black-800 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-400 border-t-transparent mx-auto mb-4"></div>
          <p className="text-green-10 text-xl font-medium"></p>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-red-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-red-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <span className="text-red-400 text-2xl">⚠</span>
          </div>
          <p className="text-white text-lg font-medium">{error}</p>
        </div>
      </div>
    );
  }
  if (heroSections.length === 0) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-gray-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <span className="text-gray-400 text-2xl">📷</span>
          </div>
          <p className="text-white text-lg font-medium">
            No experiences available at the moment
          </p>
        </div>
      </div>
    );
  }
  // --- End States ---

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Main Slider Container */}
      <div className="relative w-full h-screen">
        {heroSections.map((section, index) => (
          <div
            key={section.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
          >
            {/* Background Image (Dynamic) */}
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={section.imageUrl}
                alt={section.title}
                fill
                priority={index === 0}
                className={`object-cover object-center transition-transform duration-[6000ms] ease-linear ${index === currentSlide ? "scale-110" : "scale-100" // Subtle Ken Burns zoom effect
                  }`}
                sizes="100vw"
                onError={(e) => {
                  e.currentTarget.src = "/fallback-hero.jpg";
                }}
              />
              {/* Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
            </div>

            {/* --- Animated Content Overlay --- */}
            {/* This will animate every time the slide changes */}
            <AnimatePresence>
              {index === currentSlide && (
                <motion.div
                  key={currentSlide} // Force re-animation on slide change
                  className="relative z-20 h-full flex flex-col justify-center items-center text-center px-6"
                  variants={staggerParentVariants}
                  initial="hidden"
                  animate="show"
                  exit={{ opacity: 0 }} // Content fades out
                >
                  {/* Main Content Area */}
                  <div className="flex-1 flex flex-col justify-center items-center">
                    {/* --- FIXED Title (Responsive) --- */}
                    <motion.h1
                      variants={fadeInUpVariants}
                      // On mobile: 5xl. On small screens (sm) and up: 6xl.
                      className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white leading-tight"
                    >
                      <span className="block text-green-400 mb-2">
                        {section.title.split(" ")[0]}
                      </span>
                      <span className="block">
                        {section.title.split(" ").slice(1).join(" ")}
                      </span>
                    </motion.h1>

                    {/* --- FIXED Subtitle (Responsive) --- */}
                    <motion.p
                      variants={fadeInUpVariants}
                      // On mobile: xl. On small screens (sm) and up: 2xl
                      className="text-xl sm:text-2xl text-gray-200 max-w-2xl mx-auto mt-6"
                    >
                      {section.subtitle}
                    </motion.p>

                    {/* Call to Action Buttons (Video button removed) */}
                    <motion.div
                      variants={fadeInUpVariants}
                      className="flex flex-col sm:flex-row gap-4 pt-8"
                    >
                      <Link
                        href="/safari-packages"
                        className="group inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-black px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                      >
                        <span>Book Your Safari</span>
                      </Link>
                    </motion.div>
                  </div>

                  {/* "More Details" Bar (Responsive) */}
                  <motion.div
                    className="w-full max-w-6xl pb-10 pt-8 sm:pt-20"
                    variants={detailsVariants}
                  >
                    {/* On mobile: flex-col. On small screens (sm) and up: flex-row */}
                    <div className="flex flex-col sm:flex-row justify-around items-stretch gap-4 sm:gap-8 px-4">
                      {/* Card 1: Location (Responsive) */}
                      <div className="flex items-center gap-3 sm:gap-4 bg-black/10 backdrop-blur-md p-3 sm:p-6 rounded-4xl ">
                        {/* Icon: smaller on mobile */}
                        <MapPin className="w-6 h-6 sm:w-10 sm:h-10 text-green-400 flex-shrink-0" />
                        <div>
                          {/* Text: smaller on mobile */}
                          <span className="text-xs sm:text-sm text-gray-400 block">
                            LOCATION
                          </span>
                          <span className="text-base sm:text-lg text-white font-medium block">
                            Yala National Park
                          </span>
                        </div>
                      </div>

                      {/* Card 2: Duration (Responsive) */}
                      <div className="flex items-center gap-3 sm:gap-4 bg-black/10 backdrop-blur-md p-3 sm:p-6 rounded-4xl">
                        <Clock className="w-6 h-6 sm:w-10 sm:h-10 text-green-400 flex-shrink-0" />
                        <div>
                          <span className="text-xs sm:text-sm text-gray-400 block">
                            DURATION
                          </span>
                          <span className="text-base sm:text-lg text-white font-medium block">
                            4-12 Hours
                          </span>
                        </div>
                      </div>

                      {/* Card 3: Expert Guides (Responsive) */}
                      <div className="flex items-center gap-3 sm:gap-4 bg-black/10 backdrop-blur-md p-3 sm:p-6 rounded-4xl">
                        <Users className="w-6 h-6 sm:w-10 sm:h-10 text-green-400 flex-shrink-0" />
                        <div>
                          <span className="text-xs sm:text-sm text-gray-400 block">
                            EXPERT GUIDES
                          </span>
                          <span className="text-base sm:text-lg text-white font-medium block">
                            10+ Years of Experience
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* --- Your Navigation Controls (Unchanged) --- */}
      {heroSections.length > 1 && (
        <>
          <button
            onClick={goToPrevSlide}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 group"
            aria-label="Previous slide"
          >
            <div className="bg-white/10 backdrop-blur-sm hover:bg-white/20  hover:border-white/40 rounded-full p-3 sm:p-4 transition-all duration-300 group-hover:scale-110">
              <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
          </button>
          <button
            onClick={goToNextSlide}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 group"
            aria-label="Next slide"
          >
            <div className="bg-white/10 backdrop-blur-sm hover:bg-white/20  hover:border-white/40 rounded-full p-3 sm:p-4 transition-all duration-300 group-hover:scale-110">
              <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
          </button>
          <button
            onClick={togglePlayPause}
            className="absolute bottom-20 sm:bottom-24 right-4 sm:right-8 z-30 group"
            aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
          >
            <div className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-full p-3 transition-all duration-300 group-hover:scale-110">
              {isPlaying ? (
                <div className="w-4 h-4 text-white">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-4 bg-white rounded-full"></div>
                    <div className="w-1.5 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
              ) : (
                <Play className="w-4 h-4 text-white ml-0.5" />
              )}
            </div>
          </button>
          <div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 z-30">
            <div className="flex items-center gap-3">
              {heroSections.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className="group relative"
                  aria-label={`Go to slide ${index + 1}`}
                >
                  <div
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
                        ? "bg-green-400 scale-125"
                        : "bg-white/40 hover:bg-white/60 hover:scale-110"
                      }`}
                  />
                  {index === currentSlide && (
                    <div className="absolute inset-0 rounded-full bg-green-400/30 animate-ping" />
                  )}
                </button>
              ))}
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 z-30">
            <div
              className="h-full bg-green-400 transition-all duration-300 ease-linear"
              style={{
                width: `${((currentSlide + 1) / heroSections.length) * 100}%`,
              }}
            />
          </div>
        </>
      )}
      <div className="absolute top-8 left-8 z-30 hidden sm:block">
        <div className="bg-black/30 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
          <span className="text-white font-medium">
            {String(currentSlide + 1).padStart(2, "0")} /{" "}
            {String(heroSections.length).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Video Modal and its related code have been completely REMOVED */}
    </div>
  );
}