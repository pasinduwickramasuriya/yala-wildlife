
import { Navigation } from "lucide-react";

export default function LocationMap() {
  // The exact coordinates
  const lat = "6.265809962327247";
  const lng = "81.30116366980201";

  // Forces "Directions" mode when opened
  const mapLink = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

  return (
    <div className="relative w-full h-full min-h-[450px] group rounded-3xl overflow-hidden bg-neutral-100 border border-white/10 shadow-2xl ring-1 ring-black/5">
      

      {/* 2. THE MAP FRAME */}
      <iframe
        // Standard Map View (t=m)
        src={`https://maps.google.com/maps?q=${lat},${lng}&t=m&z=15&ie=UTF8&iwloc=&output=embed`}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Yala Wildlife Safari Exact Location"
        // ✅ CHANGED VISUALS: 
        // Removed all grayscale/dimming filters. 
        // It is now perfectly clear and bright 100% of the time.
        className="w-full h-full object-cover"
      />

      {/* 3. CLICKABLE NAVIGATION TARGET (Center Overlay) */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-30">
         
         {/* NAVIGATION LINK */}
         <a 
           href={mapLink} 
           target="_blank" 
           rel="noopener noreferrer"
           className="relative w-32 h-32 flex items-center justify-center pointer-events-auto cursor-pointer group/target"
           aria-label="Get Directions"
         >
            {/* Crosshair Animation (Dark colors for visibility on light map) */}
            <div className="absolute inset-0 opacity-60 group-hover/target:opacity-100 transition-all duration-300">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1.5px] h-full bg-gradient-to-b from-transparent via-black/80 to-transparent scale-y-125 group-hover/target:scale-y-100 transition-transform"></div>
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-[1.5px] bg-gradient-to-r from-transparent via-black/80 to-transparent scale-x-125 group-hover/target:scale-x-100 transition-transform"></div>
                
                {/* Rotating Ring */}
                <div className="absolute inset-0 border border-dashed border-black/60 rounded-full animate-[spin_10s_linear_infinite] group-hover/target:border-green-600"></div>
                
                {/* Pulse Ring */}
                <div className="absolute inset-4 border border-green-600/40 rounded-full group-hover/target:animate-ping"></div>
            </div>

            {/* "NAVIGATE" Label appears on hover */}
            <div className="absolute mt-16 opacity-0 group-hover/target:opacity-100 transition-all duration-300 transform translate-y-2 group-hover/target:translate-y-0">
                <div className="flex items-center gap-2 bg-green-600 text-white text-[11px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-xl hover:bg-green-700 transition-colors">
                    <span>Start Navigation</span>
                    <Navigation size={12} fill="currentColor" />
                </div>
            </div>
         </a>
      </div>

    </div>
  );
}