/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, FormEvent } from "react";
import { Loader2, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface Notification {
  type: "success" | "error";
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [notification, setNotification] = useState<Notification | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setNotification(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Transmission failed");

      setNotification({ type: "success", message: "Transmission_Complete. Standby." });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setNotification({ type: "error", message: "Signal_Lost. Retry_Transmission." });
    } finally {
      setIsSubmitting(false);
    }
  };

  /** * MOBILE ZOOM FIX:
   * We set font-size to 16px so the browser doesn't zoom.
   * We use scale(0.625) to make 16px look exactly like 10px (16 * 0.625 = 10).
   */
  const inputStyles = "w-full bg-transparent border-b border-white/10 py-3 text-[16px] font-black text-white uppercase tracking-[0.2em] placeholder:text-neutral-700 focus:outline-none focus:border-[#00ff00] transition-all origin-left";
  const visualScale = { transform: 'scale(0.625)', width: '160%' };

  return (
    <form onSubmit={handleSubmit} className="space-y-10 w-full selection:bg-[#00ff00] selection:text-black">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
        {/* Name Field */}
        <div className="relative group overflow-hidden">
          <label className="block text-[7px] font-black uppercase tracking-[0.5em] text-[#00ff00] mb-2 opacity-60 group-focus-within:opacity-100 transition-opacity">
            IDENT_NAME
          </label>
          <div className="w-full">
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="FULL_LEGAL_NAME"
              className={inputStyles}
              style={visualScale}
            />
          </div>
        </div>

        {/* Email Field */}
        <div className="relative group overflow-hidden">
          <label className="block text-[7px] font-black uppercase tracking-[0.5em] text-[#00ff00] mb-2 opacity-60 group-focus-within:opacity-100 transition-opacity">
            COMMS_ENCRYPTED
          </label>
          <div className="w-full">
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="VALID_EMAIL_ADDR"
              className={inputStyles}
              style={visualScale}
            />
          </div>
        </div>
      </div>

      {/* Message Field */}
      <div className="relative group overflow-hidden">
        <label className="block text-[7px] font-black uppercase tracking-[0.5em] text-[#00ff00] mb-2 opacity-60 group-focus-within:opacity-100 transition-opacity">
          MISSION_LOG_DATA
        </label>
        <div className="w-full">
          <textarea
            required
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="ENTER_OBJECTIVES_DATES_AND_SIZE..."
            className={cn(inputStyles, "min-h-[100px] resize-none")}
            style={visualScale}
          />
        </div>
      </div>

      <div className="flex flex-col gap-6 items-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="group relative w-full max-w-xs overflow-hidden rounded-full py-5 transition-all duration-500"
        >
          <div className="absolute inset-0 bg-[#00ff00] group-hover:bg-white transition-colors duration-500" />
          <div className="relative flex items-center justify-center gap-4 text-black font-black tracking-[0.4em] text-[10px] uppercase">
            {isSubmitting ? (
              <>
                <Loader2 className="w-3 h-3 animate-spin" />
                <span>Syncing...</span>
              </>
            ) : (
              <>
                <span>Transmit Request</span>
                <Send className="w-3 h-3 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </>
            )}
          </div>
        </button>

        {notification && (
          <div className={cn(
            "inline-flex items-center gap-3 px-4 py-2 rounded-lg border backdrop-blur-3xl animate-in fade-in slide-in-from-top-4 duration-500",
            notification.type === "error" ? "bg-red-500/10 border-red-500/20 text-red-400" : "bg-[#00ff00]/10 border-[#00ff00]/20 text-[#00ff00]"
          )}>
            {notification.type === "error" ? <AlertCircle size={10} /> : <CheckCircle2 size={10} />}
            <span className="text-[7px] font-black uppercase tracking-[0.3em]">{notification.message}</span>
          </div>
        )}
      </div>
    </form>
  );
}