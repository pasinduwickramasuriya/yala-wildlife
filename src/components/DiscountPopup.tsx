"use client";

import { useState, useEffect } from "react";
import { X, MessageCircle, ShieldCheck } from "lucide-react";

const WHATSAPP_NUMBER = "94778158004";
const WHATSAPP_MESSAGE = "Hi! I'm interested in the Official Yala Safari Discount Offer.";

export default function PetiteDiscountPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isDev = process.env.NODE_ENV === "development";
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
    <div className="fixed bottom-5 left-5 z-[99999] pointer-events-none select-none">
      <div
        className="relative w-[240px] max-w-[calc(100vw-32px)] bg-white text-[#1f1f1f] rounded-[1.75rem] p-3.5 shadow-[0_15px_35px_rgba(0,0,0,0.12)] border border-[#e8eaed] overflow-hidden pointer-events-auto animate-in fade-in slide-in-from-bottom-3 duration-250 text-left"
        style={{
          fontFamily:
            '"Google Sans", "Open Sans", Roboto, -apple-system, BlinkMacSystemFont, Arial, sans-serif',
        }}
      >
        {/* 1. TOP HEADER & CLOSE BUTTON */}
        <div className="flex justify-between items-center mb-2">
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#f8f9fa] text-[9.5px] font-semibold text-[#1f1f1f]">
            <ShieldCheck size={11} className="text-[#1f1f1f]" />
            <span>Verified Operator</span>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close Discount Popup"
            className="w-5 h-5 flex items-center justify-center rounded-full bg-[#f8f9fa] hover:bg-[#f1f3f4] text-[#5f6368] hover:text-[#1f1f1f] transition-colors cursor-pointer"
          >
            <X size={12} />
          </button>
        </div>

        {/* 2. PETITE TITLE & INCLUSIONS (LEFT-ALIGNED) */}
        <div className="mb-2.5 text-left">
          <h2 className="text-[13px] font-bold text-[#1f1f1f] tracking-tight leading-tight">
            {monthName} Safari Offer
          </h2>
          <p className="text-[9.5px] font-semibold text-[#1f1f1f] mt-0.5">
            Per Person • All Included
          </p>
          <div className="mt-1.5 bg-[#f8f9fa] rounded-lg p-2 text-left space-y-0.5">
            <p className="text-[11px] font-medium text-[#1f1f1f] leading-tight">Breakfast, lunch, fruits</p>
            <p className="text-[11px] font-medium text-[#1f1f1f] leading-tight">Soft drinks, water</p>
            <p className="text-[11px] font-medium text-[#1f1f1f] leading-tight">Jeep, Driver Guide</p>
          </div>
        </div>

        {/* 3. COMPACT RATES (LEFT-ALIGNED) */}
        <div className="space-y-1.5 mb-3 text-left">
          {/* Morning */}
          <div className="flex items-center justify-between px-2.5 py-1.5 bg-[#f8f9fa] rounded-xl">
            <div className="flex flex-col text-left">
              <span className="text-[10.5px] font-bold text-[#1f1f1f] leading-tight">
                Morning Safari
              </span>
              <span className="text-[8.5px] font-semibold text-[#5f6368]">
                05:00 — 12:00
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-[10px] font-semibold text-[#1f1f1f] line-through">
                $49
              </span>
              <span className="text-[13px] font-bold text-[#1f1f1f]">
                $14
              </span>
            </div>
          </div>

          {/* Full Day */}
          <div className="flex items-center justify-between px-2.5 py-1.5 bg-[#f8f9fa] rounded-xl">
            <div className="flex flex-col text-left">
              <span className="text-[10.5px] font-bold text-[#1f1f1f] leading-tight">
                Full Day Safari
              </span>
              <span className="text-[8.5px] font-semibold text-[#5f6368]">
                05:00 — 18:00
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-[10px] font-semibold text-[#1f1f1f] line-through">
                $69
              </span>
              <span className="text-[13px] font-bold text-[#1f1f1f]">
                $40
              </span>
            </div>
          </div>
        </div>

        {/* 4. ACTIONS */}
        <div className="flex justify-center">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Claim Discount via WhatsApp"
            className="flex items-center justify-center gap-1.5 w-full max-w-[150px] py-2.5 bg-[#00ff00] hover:brightness-105 active:scale-[0.98] text-black text-[10.5px] font-bold rounded-full transition-all cursor-pointer shadow-sm"
          >
            <MessageCircle size={12} className="stroke-[2.5]" />
            <span>Claim via WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}