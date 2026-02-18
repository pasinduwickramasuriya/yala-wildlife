"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, Camera } from "lucide-react";

// --- ENRICHED DATA FOR YALAWILDLIFE.COM ---
const MEMORIES = [
  {
    id: 1,
    src: "/uploads/yala.jpeg",
    title: "The Ghost of Yala",
    location: "Block 1, Palatupana",
    tag: "Rare Sighting",
    desc: "Yala National Park is world-renowned for having one of the highest leopard densities on the planet. Our experienced trackers specialize in locating the elusive Panthera pardus kotiya, often found resting on the iconic granite outcrops of Block 1 during the early morning golden hour."
  },
  {
    id: 2,
    src: "/uploads/yala1.webp",
    title: "The Great Gathering",
    location: "Main Entrance",
    tag: "Wildlife",
    desc: "Witness the majestic Asian Elephant herds as they migrate towards the ancient water reservoirs. These gentle giants are the heart of the dry zone ecosystem, often seen in large family groups where playful calves learn the ways of the wild under the watchful eyes of experienced matriarchs."
  },
  {
    id: 3,
    src: "/uploads/yala2.webp",
    title: "The Ultimate Rig",
    location: "Base Operations",
    tag: "Premium Fleet",
    desc: "Our safari experience is defined by our equipment. We utilize custom-modified 4x4 Toyota Hilux jeeps, featuring elevated stadium seating for 360-degree unobstructed views, specialized beanbag mounts for professional wildlife photography, and heavy-duty suspension for a smooth off-road journey."
  }
];

export default function AppleCuteGallery() {
  return (
    <section className="w-full py-12 px-6 bg-transparent">
      <div className="max-w-5xl mx-auto">

        {/* --- GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {MEMORIES.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative flex flex-col rounded-[2rem] overflow-hidden transition-all duration-500 hover:-translate-y-1"
            >
              {/* IMAGE AREA */}
              <div className="relative aspect-square w-full overflow-hidden bg-neutral-900 shadow-inner">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />

                {/* INLINE TAG */}
                <div className="absolute top-4 left-4">
                  <span className="px-2.5 py-0.5 bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-black text-[#00ff00] uppercase tracking-widest rounded-full">
                    {item.tag}
                  </span>
                </div>
              </div>

              {/* INLINE CONTENT BLOCK */}
              <div className="mt-[-50px] relative z-10 mx-3 mb-3 p-5 bg-neutral-900/80 backdrop-blur-3xl border border-white/10 rounded-[1.5rem] shadow-2xl">
                <div className="flex items-center gap-1.5 mb-2">
                  <MapPin size={10} className="text-[#00ff00]" />
                  <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">
                    {item.location}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 tracking-tight leading-tight">
                  {item.title}
                </h3>

                {/* The "More Text" part - increased line-clamp for readability */}
                <p className="text-neutral-400 text-[11px] leading-relaxed mb-4 font-medium line-clamp-4">
                  {item.desc}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                  <div className="flex items-center gap-2 text-neutral-500">
                    <Camera size={12} />
                    <span className="text-[9px] uppercase font-bold tracking-tighter">HD Gallery</span>
                  </div>
                  <button className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:bg-[#00ff00] transition-all active:scale-90">
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}