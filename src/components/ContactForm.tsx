"use client";

import { useState, FormEvent, useCallback, useRef } from "react";
import { Loader2, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";

interface Notification {
  type: "success" | "error";
  message: string;
}

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [notification, setNotification] = useState<Notification | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSubmitting(true);
    setNotification(null);

    const formData = new FormData(formRef.current);
    const payload = {
      name: (formData.get("name") as string)?.trim() ?? "",
      email: (formData.get("email") as string)?.trim() ?? "",
      message: (formData.get("message") as string)?.trim() ?? "",
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Submission failed");

      setNotification({
        type: "success",
        message: "Message sent successfully! Our team will contact you shortly.",
      });
      formRef.current.reset();
    } catch {
      setNotification({
        type: "error",
        message: "Unable to send message. Please check your connection and retry.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const inputStyles =
    "w-full bg-white rounded-2xl px-5 py-4 text-[16px] text-[#1f1f1f] placeholder:text-[#9aa0a6] placeholder:font-normal focus:outline-none focus:bg-[#f1f3f4] transition-colors duration-150 font-medium";

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="space-y-5 w-full bg-transparent selection:bg-[#00ff00] selection:text-black [contain:paint]"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Name Field */}
        <div className="flex flex-col gap-1.5 text-left">
          <label
            htmlFor="contact-name"
            className="text-[18px] font-bold text-[#1f1f1f] tracking-tight px-1"
          >
            Your Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="e.g. John Doe"
            className={inputStyles}
          />
        </div>

        {/* Email Field */}
        <div className="flex flex-col gap-1.5 text-left">
          <label
            htmlFor="contact-email"
            className="text-[18px] font-bold text-[#1f1f1f] tracking-tight px-1"
          >
            Email Address
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="e.g. name@example.com"
            className={inputStyles}
          />
        </div>
      </div>

      {/* Message Field */}
      <div className="flex flex-col gap-1.5 text-left">
        <label
          htmlFor="contact-message"
          className="text-[18px] font-bold text-[#1f1f1f] tracking-tight px-1"
        >
          Tour Requirements
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={4}
          placeholder="Tell us your preferred dates, party size, and safari package..."
          className={`${inputStyles} min-h-[130px] resize-none`}
        />
      </div>

      {/* Submit Button & Notification */}
      <div className="flex flex-col items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center gap-2 bg-[#000000] hover:bg-[#00ff00] text-white hover:text-black font-bold text-[16px] px-8 py-4 rounded-full transition-colors duration-150 active:scale-95 cursor-pointer disabled:opacity-50 disabled:pointer-events-none w-full sm:w-auto shadow-none"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin stroke-[2.5]" />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <span>Send Message</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </>
          )}
        </button>

        {notification && (
          <div
            role="status"
            className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-2xl text-[14px] font-semibold ${notification.type === "error"
                ? "bg-[#fce8e6] text-[#c5221f]"
                : "bg-[#e6f4ea] text-[#137333]"
              }`}
          >
            {notification.type === "error" ? (
              <AlertCircle className="w-4 h-4 shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 shrink-0" />
            )}
            <span className="leading-snug">{notification.message}</span>
          </div>
        )}
      </div>
    </form>
  );
}