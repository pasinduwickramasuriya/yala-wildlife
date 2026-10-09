/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import { Loader2, Send } from "lucide-react";

interface ItineraryItemProps {
  day: number;
  title: string;
  description: string;
  included?: string;
  highlight?: string;
}

// --- SUB-COMPONENT: ITINERARY ITEM (CLEAN GOOGLE STYLE) ---
export function TourItineraryItem({
  day,
  title,
  description,
  included,
  highlight,
}: ItineraryItemProps) {
  return (
    <div
      className="flex gap-4 items-start bg-white p-5 md:p-6 rounded-[2rem]"
      style={{
        fontFamily:
          '"Google Sans", "Open Sans", Roboto, -apple-system, BlinkMacSystemFont, Arial, sans-serif',
      }}
    >
      {/* Day Badge */}
      <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-[18px] font-bold text-black bg-[#00ff00]">
        {day}
      </div>

      {/* Content */}
      <div className="flex flex-col text-left space-y-2">
        <h3 className="text-[18px] font-bold text-[#1f1f1f]">
          {title}
        </h3>
        <p className="text-[18px] text-[#3c4043] font-semibold leading-relaxed break-words">
          {description}
        </p>

        {/* Tags */}
        {(included || highlight) && (
          <div className="flex flex-wrap gap-2 pt-1">
            {included && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e6f4ea] text-[#137333] text-[13px] font-semibold">
                ✓ Included: {included}
              </span>
            )}
            {highlight && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f8f9fa] text-[#1f1f1f] text-[13px] font-semibold">
                ★ Highlight: {highlight}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// --- SUB-COMPONENT: BOOKING FORM (CLEAN GOOGLE CARD STYLE) ---
export function BookingForm({ tourTitle }: { tourTitle: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    travelDate: "",
    guests: "1",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");

    const payload = {
      name: formData.name,
      email: formData.email,
      message:
        `[TOUR_BOOKING_INQUIRY: ${tourTitle}]\n\n` +
        `Name: ${formData.name}\n` +
        `Email: ${formData.email}\n` +
        `Phone/WhatsApp: ${formData.phone}\n` +
        `Travel Date: ${formData.travelDate}\n` +
        `Guests: ${formData.guests} Adult(s)/Traveler(s)\n` +
        `Special Requirements: ${formData.message}`,
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
          message: "",
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

  const inputStyles =
    "w-full bg-[#f8f9fa] focus:bg-[#f1f3f4] rounded-2xl px-4 py-3 text-base md:text-[15px] font-semibold text-[#1f1f1f] outline-none placeholder:text-[#9aa0a6] placeholder:font-normal transition-colors";
  const labelStyles = "block text-[12px] font-semibold text-[#5f6368] mb-1.5 ml-1 text-left";

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 text-left"
      style={{
        fontFamily:
          '"Google Sans", "Open Sans", Roboto, -apple-system, BlinkMacSystemFont, Arial, sans-serif',
      }}
    >
      {/* Full Name */}
      <div>
        <label className={labelStyles}>Full Name</label>
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
        <label className={labelStyles}>Email Address</label>
        <input
          type="email"
          required
          placeholder="john@example.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={inputStyles}
        />
      </div>

      {/* Phone / WhatsApp */}
      <div>
        <label className={labelStyles}>WhatsApp / Mobile</label>
        <input
          type="tel"
          required
          placeholder="+1 (555) 000-0000"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className={inputStyles}
        />
      </div>

      {/* Travel Date & Guests */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className={labelStyles}>Travel Date</label>
          <input
            type="date"
            required
            value={formData.travelDate}
            onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
            className={inputStyles}
          />
        </div>
        <div>
          <label className={labelStyles}>Guests Count</label>
          <input
            type="number"
            required
            min="1"
            placeholder="1"
            value={formData.guests}
            onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
            className={inputStyles}
          />
        </div>
      </div>

      {/* Notes / Special Requests */}
      <div>
        <label className={labelStyles}>Special Requests & Pickup</label>
        <textarea
          rows={3}
          placeholder="e.g. Airport pick-up, dietary requests, preferred accommodation level"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className={`${inputStyles} resize-none`}
        />
      </div>

      {/* Action Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 bg-[#00ff00] hover:brightness-105 active:scale-[0.99] text-black py-4 rounded-full text-[16px] font-bold transition-all cursor-pointer disabled:opacity-50"
        >
          {isSubmitting ? (
            <Loader2 className="w-5 h-5 animate-spin text-black" />
          ) : (
            <>
              <span>Initialize Booking Request</span>
              <Send size={16} className="stroke-[2.5]" />
            </>
          )}
        </button>
      </div>

      {/* Feedback Messages */}
      {status === "success" && (
        <div className="p-4 rounded-2xl bg-[#e6f4ea] text-[#137333] text-[13px] font-semibold text-center">
          ✓ Booking request received! Our dispatch team will confirm details shortly.
        </div>
      )}
      {status === "error" && (
        <div className="p-4 rounded-2xl bg-[#fce8e6] text-[#d93025] text-[13px] font-semibold text-center">
          ✗ Transmission error. Please verify your details and retry.
        </div>
      )}
    </form>
  );
}