"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Camera, MapPin, Star, Zap } from "lucide-react";

// --- DATA ---
const MEMORIES = [
  {
    id: 1,
    src: "/uploads/yala.jpeg", // Ensure this file exists in public/uploads/
    title: "The Apex Predator",
    location: "Block 1, Yala",
    tag: "Leopard Sighting",
    desc: "Our expert trackers know exactly where to find the elusive Sri Lankan Leopard."
  },
  {
    id: 2,
    src: "/uploads/yala1.webp",
    title: "Gentle Giants",
    location: "Waterhole 3",
    tag: "Elephant Herds",
    desc: "Witness the majesty of elephant families in their natural habitat from our safety-first jeeps."
  },
  {
    id: 3,
    src: "/uploads/yala2.webp",
    title: "The Safari Fleet",
    location: "Base Camp",
    tag: "Premium Service",
    desc: "Custom-modified luxury jeeps designed for photography, comfort, and maximum visibility."
  }
];

const SERVICES = [
  { icon: <Camera size={18} />, label: "Photography Ready" },
  { icon: <Zap size={18} />, label: "Experienced Trackers" },
  { icon: <Star size={18} />, label: "5-Star Rated" },
];

export default function MemoryGallery() {
  return (
    <section className="relative w-full py-24 px-4 md:px-8 overflow-hidden">
      
      {/* --- BACKGROUND ELEMENTS --- */}
      <div className="absolute inset-0 ">
        {/* Green ambient glow */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-green-900/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-green-500/5 rounded-full blur-[100px] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* --- GALLERY GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {MEMORIES.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group relative h-[500px] w-full rounded-[2.5rem] overflow-hidden border border-white/10 bg-white/5 shadow-2xl cursor-none md:cursor-default"
            >
              {/* Image Layer */}
              <div className="absolute inset-0">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                />
                {/* Gradient Overlay (Always visible for text readability) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
              </div>

              {/* Content Layer (Glassmorphism) */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                
                {/* Floating Top Tag */}
                <div className="absolute top-6 right-6 translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                   <span className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] font-mono uppercase tracking-widest text-white">
                      {item.tag}
                   </span>
                </div>

                {/* Text Content */}
                <div className="relative z-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center gap-2 text-green-400 text-xs font-mono mb-2 opacity-80">
                    <MapPin size={12} />
                    <span className="uppercase tracking-wider">{item.location}</span>
                  </div>
                  
                  <h3 className="text-3xl font-bold text-white mb-3 leading-tight">
                    {item.title}
                  </h3>
                  
                  <p className="text-neutral-300 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-3">
                    {item.desc}
                  </p>
                </div>

                {/* Decorative Border Effect */}
                <div className="absolute inset-4 border border-white/10 rounded-[2rem] pointer-events-none opacity-50 group-hover:border-green-500/30 transition-colors duration-500"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- SERVICE HIGHLIGHTS BAR --- */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4">
           {SERVICES.map((s, i) => (
             <div key={i} className="flex items-center justify-center gap-3 py-4 px-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-green-900/20 hover:border-green-500/30 transition-all duration-300 backdrop-blur-md group">
                <div className="text-neutral-500 group-hover:text-green-400 transition-colors">{s.icon}</div>
                <span className="text-sm font-bold text-neutral-300 group-hover:text-white uppercase tracking-wide">{s.label}</span>
             </div>
           ))}
        </div>

      </div>
    </section>
  );
}



