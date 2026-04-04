"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, MessageCircle, ShieldCheck, ArrowUpRight, Ticket, Car } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const WHATSAPP_NUMBER = "94778158004"; 
const WHATSAPP_MESSAGE = "Hi! I'm interested in the Official Yala Safari Discount Offer.";

export default function PetiteDiscountPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isDev = process.env.NODE_ENV === 'development';
    const dismissed = localStorage.getItem("yala_discount_dismissed");
    const now = Date.now();

    if (isDev || !dismissed || now - parseInt(dismissed) > 3600000) {
      const timer = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("yala_discount_dismissed", Date.now().toString());
    setVisible(false);
  };

  if (!visible) return null;

  const monthName = new Date().toLocaleString("default", { month: "long" });
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed bottom-6 left-6 z-[99999] pointer-events-none">
          <motion.div 
            initial={{ x: -20, opacity: 0, scale: 0.9 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: -20, opacity: 0, scale: 0.9 }}
            className="relative w-full max-w-[250px] bg-[#050a05] rounded-[2.5rem] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden pointer-events-auto"
          >
            {/* 1. TOP STATUS PILL */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#00ff00]/10">
                <ShieldCheck size={10} className="text-[#00ff00]" />
                <span className="text-[8px] font-black text-[#00ff00] uppercase tracking-widest">Verified</span>
              </div>
              <button onClick={handleClose} className="text-[#00ff00] hover:text-white transition-colors">
                <X size={16} />
              </button>
            </div>

            {/* 2. PETITE HEADER */}
            <div className="mb-4">
              <h2 className="text-md font-black text-[#00ff00] italic uppercase tracking-tighter leading-none text-center">
               {monthName}&nbsp;&nbsp;<span className="text-white">Discounts</span>
              </h2>
              <p className="text-[8px] text-white/70 font-bold uppercase tracking-[0.2em] mt-1">Per Person • All Included</p>
              <p className="text-[8px] text-white/70 font-bold uppercase tracking-[0.2em] mt-1" >Breakfast,lunch,fruits</p>
               <p className="text-[8px] text-white/70 font-bold uppercase tracking-[0.2em] mt-1" >soft drinks ,water</p>
            </div>

            {/* 3. COMPACT RATES */}
            <div className="space-y-3 mb-5">
              {/* Morning */}
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-white/80 uppercase tracking-tight">Morning Extended</span>
                  <span className="text-[8px] text-white/80 uppercase font-bold tracking-tighter">05:00 — 12:00</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 px-2 py-1 rounded-lg">
                  <span className="text-[20px] text-white line-through font-mono">$75</span>
                  <span className="text-sm font-black text-[#00ff00] font-mono leading-none">$65</span>
                </div>
              </div>

              {/* Full Day */}
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-white/80 uppercase tracking-tight">Full Day Shared</span>
                  <span className="text-[8px] text-white uppercase font-bold tracking-tighter">05:00 — 18:00</span>
                </div>
                <div className="flex items-center gap-2 bg-[#00ff00]/5 px-2 py-1 rounded-lg">
                  <span className="text-[20px] text-white/80 line-through font-mono">$95</span>
                  <span className="text-sm font-black text-[#00ff00] font-mono leading-none">$83</span>
                </div>
              </div>
            </div>

            {/* 4. ACTIONS */}
            <div className="space-y-2">
              
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-[#00ff00] transition-all active:scale-95 shadow-xl"
              >
                <MessageCircle size={12} /> WhatsApp
              </a>
            </div>

            {/* 5. MINIMAL TRUST DOCK */}
            <div className="mt-4 pt-3 flex justify-around items-center opacity-70 grayscale">
                <Car size={10} className="text-white" />
                <Ticket size={10} className="text-white" />
                <span className="text-[7px] text-white font-black uppercase tracking-[0.3em]">Official Operator</span>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

