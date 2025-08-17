import Link from "next/link";
import { MessageCircle } from "lucide-react"; // Retained: Lucide icon for modern WhatsApp representation

export default function WhatsAppButton() {
    return (
        <div className="fixed bottom-6 right-6 z-50 group"> {/* Retained: Wrapper div with group for tooltip */}
            <Link
                href="https://wa.me/940778158004?text=Hello,%20I'm%20interested%20in%20your%20safaris" // Retained: Your WhatsApp number and message
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex items-center justify-center bg-green-600 hover:bg-green-700 text-white p-2 rounded-full shadow-lg hover:shadow-[0_0_10px_rgba(34,197,94,0.5)] transform hover:scale-110 transition-all duration-300 animate-bounce" // Changed: Reduced padding to p-2 (was p-4) and removed invalid size-10px for smaller, cuter button; softened glow to hover:shadow-[0_0_10px_rgba(34,197,94,0.5)] for cuter effect
                data-tooltip="Chat with us" // Retained: Tooltip for modern UX
            >
                <MessageCircle className="w-8 h-8" /> {/* Changed: Reduced icon size to w-6 h-6 (was w-10 h-10) for smaller, cuter appearance */}
                <div className="absolute inset-0 bg-black/30 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" /> {/* Retained: Glassmorphism overlay on hover */}
            </Link>
            {/* Tooltip */}
            <span className="absolute bottom-12 right-0 bg-black/80 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"> {/* Changed: Reduced tooltip size (text-xs, px-2 py-1, bottom-12) to match smaller button */}
                Chat with us
            </span>
        </div>
    );
}