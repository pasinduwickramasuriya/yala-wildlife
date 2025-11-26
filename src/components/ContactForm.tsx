
"use client";

import { useState, FormEvent } from "react";
import { Loader2, Send, CheckCircle2, AlertCircle, User, Mail, MessageSquare } from "lucide-react";
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
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setNotification(null);

    // Simulate network delay for UX feel (optional, remove in prod)
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send message");
      }

      setNotification({
        type: "success",
        message: "Request received. Standby for confirmation.",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setNotification({
        type: "error",
        message: error instanceof Error ? error.message : "Transmission failed. Retry.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 w-full">

      {/* Grid for Name and Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Name Field */}
        <div className="space-y-2 group">
          <label
            htmlFor="name"
            className={cn(
              "text-xs font-mono uppercase tracking-widest transition-colors duration-300 flex items-center gap-2",
              focusedField === "name" ? "text-green-400" : "text-neutral-500"
            )}
          >
            <User size={12} /> Full Name
          </label>
          <div className="relative">
            <input
              id="name"
              type="text"
              placeholder="e.g. John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              onFocus={() => setFocusedField("name")}
              onBlur={() => setFocusedField(null)}
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-neutral-600 focus:outline-none focus:border-green-500/50 focus:bg-white/10 focus:ring-1 focus:ring-green-500/20 transition-all duration-300"
            />
          </div>
        </div>

        {/* Email Field */}
        <div className="space-y-2 group">
          <label
            htmlFor="email"
            className={cn(
              "text-xs font-mono uppercase tracking-widest transition-colors duration-300 flex items-center gap-2",
              focusedField === "email" ? "text-green-400" : "text-neutral-500"
            )}
          >
            <Mail size={12} /> Email Address
          </label>
          <div className="relative">
            <input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-neutral-600 focus:outline-none focus:border-green-500/50 focus:bg-white/10 focus:ring-1 focus:ring-green-500/20 transition-all duration-300"
            />
          </div>
        </div>

      </div>

      {/* Message Field */}
      <div className="space-y-2">
        <label
          htmlFor="message"
          className={cn(
            "text-xs font-mono uppercase tracking-widest transition-colors duration-300 flex items-center gap-2",
            focusedField === "message" ? "text-green-400" : "text-neutral-500"
          )}
        >
          <MessageSquare size={12} /> Mission Details / Message
        </label>
        <textarea
          id="message"
          placeholder="Tell us about your dates, group size, and interests..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          onFocus={() => setFocusedField("message")}
          onBlur={() => setFocusedField(null)}
          required
          className="w-full min-h-[160px] bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-neutral-600 focus:outline-none focus:border-green-500/50 focus:bg-white/10 focus:ring-1 focus:ring-green-500/20 transition-all duration-300 resize-none"
        />
      </div>

      {/* Modern Action Bar */}
      <div className="flex flex-col gap-4 pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "group relative w-full overflow-hidden rounded-full py-4 transition-all duration-300",
            isSubmitting ? "cursor-not-allowed opacity-80" : "hover:shadow-[0_0_40px_-10px_rgba(34,197,94,0.6)]"
          )}
        >
          {/* Button Background Gradient */}
          <div className={cn(
            "absolute inset-0 bg-gradient-to-r from-green-600 to-green-600 transition-transform duration-300",
            !isSubmitting && "group-hover:scale-105"
          )} />

          {/* Button Content */}
          <div className="relative flex items-center justify-center gap-3 text-white font-bold tracking-widest text-sm uppercase">
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Transmitting...</span>
              </>
            ) : (
              <>
                <span>Initiate Booking</span>
                <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </>
            )}
          </div>
        </button>
      </div>

      {/* Status Notifications */}
      {notification && (
        <div
          className={cn(
            "p-4 rounded-xl border flex items-center gap-3 backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-300",
            notification.type === "error"
              ? "bg-red-500/10 border-red-500/20 text-red-200"
              : "bg-green-500/10 border-green-500/20 text-green-200"
          )}
        >
          {notification.type === "error" ? (
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
          ) : (
            <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-green-400" />
          )}
          <p className="text-sm font-medium">{notification.message}</p>
        </div>
      )}
    </form>
  );
}