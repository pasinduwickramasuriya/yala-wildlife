// import Link from "next/link";
// import { MessageCircle } from "lucide-react"; // Retained: Lucide icon for modern WhatsApp representation

// export default function WhatsAppButton() {
//     return (
//         <div className="fixed bottom-6 right-6 z-50 group"> {/* Retained: Wrapper div with group for tooltip */}
//             <Link
//                 href="https://wa.me/940778158004?text=Hello,%20I'm%20interested%20in%20your%20safaris" // Retained: Your WhatsApp number and message
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="relative flex items-center justify-center bg-[#00ff00] hover:bg-[#00ff00] text-black p-2 rounded-full shadow-lg hover:shadow-[0_0_10px_rgba(34,197,94,0.5)] transform hover:scale-210 transition-all duration-300 animate-bounce" // Changed: Reduced padding to p-2 (was p-4) and removed invalid size-10px for smaller, cuter button; softened glow to hover:shadow-[0_0_10px_rgba(34,197,94,0.5)] for cuter effect
//                 data-tooltip="Chat with us" // Retained: Tooltip for modern UX
//             >
//                 <MessageCircle className="w-8 h-8" /> {/* Changed: Reduced icon size to w-6 h-6 (was w-10 h-10) for smaller, cuter appearance */}
//                 <div className="absolute inset-0 bg-black/0 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" /> {/* Retained: Glassmorphism overlay on hover */}
//             </Link>
//             {/* Tooltip */}
//             <span className="absolute bottom-12 right-0 bg-black/80 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"> {/* Changed: Reduced tooltip size (text-xs, px-2 py-1, bottom-12) to match smaller button */}
//                 Chat with us
//             </span>
//         </div>
//     );
// }


"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <div className="fixed bottom-8 right-8 z-50 group flex flex-col items-end">
      
      {/* --- 1. The Button --- */}
      <Link
        href="https://wa.me/940778158004?text=Hello,%20I'm%20interested%20in%20your%20safaris"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        // ADDED: 'animate-bounce' for the effect, 'hover:animate-none' for better clickability
        className="relative flex items-center justify-center w-13 h-13 bg-[#00ff00] text-black rounded-full shadow-[0_4px_15px_rgba(0,255,0,0.4)] hover:shadow-[0_0_30px_#00ff00] hover:scale-110 transition-all duration-300 ease-out z-20 animate-bounce hover:animate-none"
      >
        {/* Inner Icon */}
        <MessageCircle className="w-9 h-9 fill-black/10 stroke-[2.5px]" />
        
        {/* Glass Shine Effect (Subtle overlay) */}
        <div className="absolute inset-0 rounded-full ring-1 ring-white/20 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none" />
      </Link>

      {/* --- 2. The "Pulse" Signal (Background Ring) --- */}
      {/* Stays distinct at the bottom to anchor the bounce */}
      <div className="absolute bottom-0 right-0 w-14 h-14 bg-[#00ff00] rounded-full opacity-20 animate-ping pointer-events-none z-10" />

      {/* --- 3. Modern Tooltip (Slides in from left) --- */}
      <div className="absolute right-16 top-1/2 -translate-y-1/2 pointer-events-none">
        <span className="block px-3 py-1.5 bg-neutral-900/90 backdrop-blur-md border border-white/10 text-white text-xs font-bold rounded-lg shadow-xl opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap">
          Chat with us
          {/* Tooltip Arrow */}
          <span className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-neutral-900/90 border-t border-r border-white/10 rotate-45 transform" />
        </span>
      </div>

    </div>
  );
}