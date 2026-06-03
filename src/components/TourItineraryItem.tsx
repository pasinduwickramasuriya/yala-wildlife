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
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-black text-black bg-[#00ff00] shadow-[0_0_15px_rgba(0,255,0,0.3)]">
                    {day}
                </div>
                <div className="w-[1px] h-full bg-gradient-to-b from-[#00ff00] via-[#00ff00]/10 to-transparent opacity-20 mt-2" />
            </div>
            <div className="pb-8 w-full">
                <div className="inline-block w-full bg-black/80 p-5 rounded-2xl transition-all duration-500 hover:bg-zinc-900/80 shadow-2xl">
                    <h3 className="text-base md:text-lg font-bold text-white mb-2 tracking-tight">{title}</h3>
                    <p className="text-[13px] md:text-[14px] text-neutral-300 font-normal leading-relaxed mb-4">{description}</p>
                    <div className="flex flex-wrap gap-2">
                        {included && (
                            <span className="text-[10px] bg-[#00ff00]/10 text-[#00ff00] px-2.5 py-1 rounded-md font-bold tracking-wide">
                                Included: {included}
                            </span>
                        )}
                        {highlight && (
                            <span className="text-[10px] bg-white/5 text-white px-2.5 py-1 rounded-md font-bold tracking-wide">
                                Highlight: {highlight}
                            </span>
                        )}
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
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        travelDate: "",
        guests: "1",
        message: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus("idle");

        const payload = {
            name: formData.name,
            email: formData.email,
            message: `[TOUR_BOOKING_INQUIRY: ${tourTitle}]\n\n` +
                     `Name: ${formData.name}\n` +
                     `Email: ${formData.email}\n` +
                     `Phone/WhatsApp: ${formData.phone}\n` +
                     `Travel Date: ${formData.travelDate}\n` +
                     `Guests: ${formData.guests} Adult(s)/Traveler(s)\n` +
                     `Special Requirements: ${formData.message}`
        };

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                setStatus("success");
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    travelDate: "",
                    guests: "1",
                    message: ""
                });
            } else {
                setStatus("error");
            }
        } catch (err) {
            setStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputStyles = "w-full bg-transparent border-b border-black/35 focus:border-black p-2 text-base md:text-sm font-bold text-black outline-none placeholder:text-black/55 transition-all appearance-none";

    return (
        <form onSubmit={handleSubmit} className="space-y-4 text-black">
            {/* Full Name */}
            <div>
                <label className="text-[8px] font-black uppercase tracking-widest text-black/60 block mb-0.5">Full Name</label>
                <input
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={inputStyles}
                />
            </div>

            {/* Email Address */}
            <div>
                <label className="text-[8px] font-black uppercase tracking-widest text-black/60 block mb-0.5">Email Address</label>
                <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={inputStyles}
                />
            </div>

            {/* Phone Number / WhatsApp */}
            <div>
                <label className="text-[8px] font-black uppercase tracking-widest text-black/60 block mb-0.5">Phone / WhatsApp</label>
                <input
                    type="tel"
                    required
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={inputStyles}
                />
            </div>

            {/* Grid for Travel Date & Guests Count */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-[8px] font-black uppercase tracking-widest text-black/60 block mb-0.5">Travel Date</label>
                    <input
                        type="date"
                        required
                        value={formData.travelDate}
                        onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                        className="w-full bg-transparent border-b border-black/35 focus:border-black p-1.5 text-base md:text-sm font-bold text-black outline-none transition-all"
                    />
                </div>
                <div>
                    <label className="text-[8px] font-black uppercase tracking-widest text-black/60 block mb-0.5">No. of Guests</label>
                    <input
                        type="number"
                        required
                        min="1"
                        placeholder="Guests"
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                        className="w-full bg-transparent border-b border-black/35 focus:border-black p-1.5 text-base md:text-sm font-bold text-black outline-none transition-all placeholder:text-black/55"
                    />
                </div>
            </div>

            {/* Special Instructions / Message */}
            <div>
                <label className="text-[8px] font-black uppercase tracking-widest text-black/60 block mb-0.5">Special Requests / Pick-up Details</label>
                <textarea
                    placeholder="e.g. Airport pick-up, dietary requests, hotel location"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-transparent border-b border-black/35 focus:border-black p-2 text-base md:text-sm font-bold text-black outline-none h-16 resize-none placeholder:text-black/55 transition-all"
                />
            </div>

            {/* Submit Button */}
            <button
                disabled={isSubmitting}
                className="w-full bg-black text-[#00ff00] hover:bg-neutral-900 active:scale-98 py-3.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg"
            >
                {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin text-[#00ff00]" />
                ) : (
                    "Secure My Booking"
                )}
            </button>

            {status === "success" && (
                <p className="text-[10px] font-bold text-center text-black tracking-wide mt-2">
                    ✓ Booking Inquiry Synced. Check your email shortly.
                </p>
            )}
            {status === "error" && (
                <p className="text-[10px] font-bold text-center text-red-800 tracking-wide mt-2">
                    ✗ Transmission Error. Please verify details and retry.
                </p>
            )}
        </form>
    );
}