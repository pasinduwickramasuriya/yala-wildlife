/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import { Loader2 } from "lucide-react";

interface ItineraryItemProps {
    day: number;
    title: string;
    description: string;
    included?: string;
    highlight?: string;
}

// --- SUB-COMPONENT: ITINERARY ITEM ---
export function TourItineraryItem({ day, title, description, included, highlight }: ItineraryItemProps) {
    return (
        <div className="flex gap-6 group">
            <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full border border-[#00ff00] flex items-center justify-center text-[10px] font-black text-[#00ff00] bg-black/80 shadow-[0_0_10px_rgba(0,255,0,0.2)]">
                    {day}
                </div>
                <div className="w-[1px] h-full bg-gradient-to-b from-[#00ff00] via-[#00ff00]/20 to-transparent opacity-30 mt-2" />
            </div>
            <div className="pb-10 w-full">
                <div className="inline-block w-full bg-black/70 p-6 rounded-2xl border border-white/5 backdrop-blur-xl group-hover:border-[#00ff00]/30 transition-all duration-500 shadow-2xl">
                    <h3 className="text-lg font-black text-white uppercase mb-2 tracking-tighter">{title}</h3>
                    <p className="text-[12px] text-neutral-400 font-bold uppercase mb-4 tracking-widest leading-relaxed">{description}</p>
                    <div className="flex flex-wrap gap-2">
                        {included && <span className="text-[9px] bg-[#00ff00]/10 text-[#00ff00] px-2 py-1 rounded-full border border-[#00ff00]/20 font-black uppercase tracking-widest">INC: {included}</span>}
                        {highlight && <span className="text-[9px] bg-white/5 text-white px-2 py-1 rounded-full border border-white/10 font-black uppercase tracking-widest">HIL: {highlight}</span>}
                    </div>
                </div>
            </div>
        </div>
    );
}

// --- SUB-COMPONENT: BOOKING FORM (API CONNECTED) ---
export function BookingForm({ tourTitle }: { tourTitle: string }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus("idle");

        const payload = {
            name: formData.name,
            email: formData.email,
            message: `[TOUR_INQUIRY: ${tourTitle}]\n\nCLIENT_MESSAGE: ${formData.message}`
        };

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                setStatus("success");
                setFormData({ name: "", email: "", message: "" });
            } else {
                setStatus("error");
            }
        } catch (err) {
            setStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    };

    /**
     * IMPORTANT FOR MOBILE RESPONSIVENESS:
     * 'text-base' (16px) prevents iOS from zooming in on focus.
     * 'md:text-[10px]' maintains your tactical design on desktop.
     */
    const inputBaseStyles = "w-full bg-black/10 border-b border-black/20 p-2 text-base md:text-[10px] font-black uppercase tracking-widest placeholder:text-black/40 outline-none focus:border-black transition-all appearance-none";

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            <input
                type="text"
                required
                placeholder="NAME_ENTRY"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={inputBaseStyles}
            />
            <input
                type="email"
                required
                placeholder="EMAIL_ENTRY"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={inputBaseStyles}
            />
            <textarea
                required
                placeholder="MESSAGE_DATA"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className={`${inputBaseStyles} h-24 resize-none`}
            />
            <button
                disabled={isSubmitting}
                className="w-full bg-black text-[#00ff00] py-4 rounded-full text-[10px] font-black uppercase tracking-[0.4em] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
            >
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : "Transmit_Request"}
            </button>
            {status === "success" && <p className="text-[7px] font-black text-center text-black uppercase mt-2">Data_Synced. Check Email.</p>}
            {status === "error" && <p className="text-[7px] font-black text-center text-red-700 uppercase mt-2">Transmission_Error.</p>}
        </form>
    );
}