/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { countries } from "countries-list";
import { cn } from "@/lib/utils";
import {
  Calendar, Globe, Mail, MessageSquare, User, Ticket, Send,
  Plus, Minus, Loader2, X, Phone, Utensils
} from "lucide-react";

const FALLBACK_CONSTANTS = {
  TICKET_PRICE: 45,
  MEAL_PRICE: 10,
  DEFAULT_PHONE: "+94",
  MAX_PASSENGERS: 7,
};

export default function BookingForm({ tourPackageSlug }: { tourPackageSlug: string }) {
  const [isOpen, setIsOpen] = useState(false);

  // --- 1. DATA PREPARATION ---
  const countryList = useMemo(() => {
    return Object.entries(countries)
      .map(([code, data]) => ({
        code,
        name: data.name,
        phoneCode: `+${data.phone}`
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  // --- 2. FORM STATE ---
  const [formData, setFormData] = useState({
    name: "",
    phoneCode: FALLBACK_CONSTANTS.DEFAULT_PHONE,
    phoneNumber: "",
    email: "",
    date: "",
    country: "",
    message: "",
    passengers: 2,
    includeMeals: false,
    mealCount: 2,
    includeTickets: false,
    startTime: "06:00 AM",
  });

  const [packageDetails, setPackageDetails] = useState<any>(null);
  const [loadingPrice, setLoadingPrice] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error", message: string } | null>(null);

  // --- 3. PRICING CALCULATION ---
  const totals = useMemo(() => {
    const currentTicketPrice = packageDetails?.ticketPrice ?? FALLBACK_CONSTANTS.TICKET_PRICE;
    const currentMealPrice = packageDetails?.mealPrice ?? FALLBACK_CONSTANTS.MEAL_PRICE;
    const base = packageDetails?.price || 0;
    const tickets = formData.includeTickets ? formData.passengers * currentTicketPrice : 0;
    const meals = formData.includeMeals ? formData.mealCount * currentMealPrice : 0;
    return { base, tickets, meals, grandTotal: base + tickets + meals };
  }, [packageDetails, formData]);

  // --- 4. STABLE SCROLL LOCK ---
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [isOpen]);

  // --- 5. LOGIC & API ---
  useEffect(() => {
    const fetchPrice = async () => {
      setLoadingPrice(true);
      try {
        const res = await fetch(`/api/package?slug=${tourPackageSlug}`, { cache: 'no-store' });
        const data = await res.json();
        setPackageDetails(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingPrice(false);
      }
    };
    if (tourPackageSlug) fetchPrice();
  }, [tourPackageSlug]);

  useEffect(() => {
    if (formData.country) {
      const matched = countryList.find(c => c.name === formData.country);
      if (matched) setFormData(prev => ({ ...prev, phoneCode: matched.phoneCode }));
    }
  }, [formData.country, countryList]);

  useEffect(() => {
    if (!formData.includeMeals) {
      setFormData(prev => ({ ...prev, mealCount: prev.passengers }));
    }
  }, [formData.passengers, formData.includeMeals]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const fullPhone = `${formData.phoneCode}${formData.phoneNumber}`;
    const payload = { ...formData, phone: fullPhone, tourPackage: packageDetails?.name || tourPackageSlug, pricing: totals };
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setNotification({ type: "success", message: "Booking received! Our dispatch team will confirm your safari shortly." });
        setTimeout(() => setIsOpen(false), 2500);
      } else {
        throw new Error();
      }
    } catch (error) {
      setNotification({ type: "error", message: "Unable to process booking. Please check your network and retry." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const today = useMemo(() => new Date().toLocaleDateString('en-ca'), []);

  return (
    <>
      {/* TRIGGER BUTTON (PURE GOOGLE PILL) */}
      {!isOpen && (
        <div className="w-full flex justify-center">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="w-full flex items-center justify-center gap-2 bg-[#00ff00] hover:brightness-105 active:scale-[0.99] text-black py-4 rounded-full text-[18px] font-bold transition-all cursor-pointer shadow-none"
          >
            <span>Book Safari Tour</span>
            <Plus size={18} className="stroke-[2.5]" />
          </button>
        </div>
      )}

      {/* MODAL PORTAL */}
      {isOpen && (
        <div className="fixed inset-0 z-[1000000] w-full h-[100svh] flex items-center justify-center bg-black/20 backdrop-blur-xs p-3 sm:p-6 overflow-hidden">
          <div className="absolute inset-0 bg-transparent" onClick={() => setIsOpen(false)} />

          <div
            className="relative w-full max-w-2xl max-h-[92vh] bg-white text-[#1f1f1f] rounded-[2.5rem] flex flex-col shadow-none isolate overflow-hidden"
            style={{
              fontFamily:
                '"Google Sans", "Open Sans", Roboto, -apple-system, BlinkMacSystemFont, Arial, sans-serif',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative flex justify-center items-center px-6 sm:px-10 py-5 shrink-0 bg-white">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="absolute right-6 sm:right-10 w-9 h-9 rounded-full bg-[#f8f9fa] hover:bg-[#f1f3f4] text-[#5f6368] hover:text-[#1f1f1f] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <div className="flex-1 overflow-y-auto px-6 sm:px-10 pb-10 scrollbar-none">
              <header className="mb-8 pt-2 text-center">
                <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#1f1f1f] leading-snug">
                  Confirm Your Expedition
                </h1>
                <p className="text-[18px] font-semibold text-[#5f6368] mt-1">
                  {packageDetails?.name || tourPackageSlug.replace(/-/g, ' ')}
                </p>
              </header>

              <form onSubmit={handleSubmit} className="space-y-8 max-w-lg mx-auto">
                {/* 01. Contact Details */}
                <section className="space-y-4 text-center">
                  <span className="text-[14px] font-bold text-[#5f6368] uppercase tracking-wider block text-center">
                    01. Contact Details
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                    <div>
                      <label className="block text-[13px] font-semibold text-[#5f6368] mb-1.5 ml-1 text-left">
                        Full Name
                      </label>
                      <input
                        required
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="google-input"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-[13px] font-semibold text-[#5f6368] mb-1.5 ml-1 text-left">
                        Country
                      </label>
                      <select
                        value={formData.country}
                        onChange={e => setFormData({ ...formData, country: e.target.value })}
                        className="google-input cursor-pointer"
                      >
                        <option value="">Select country</option>
                        {countryList.map(c => (
                          <option key={c.code} value={c.name}>{c.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[13px] font-semibold text-[#5f6368] mb-1.5 ml-1 text-left">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="google-input"
                        placeholder="name@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-[13px] font-semibold text-[#5f6368] mb-1.5 ml-1 text-left">
                        WhatsApp / Phone
                      </label>
                      <div className="flex gap-2">
                        <span className="bg-[#f8f9fa] px-3.5 py-3 rounded-2xl text-[16px] font-bold text-[#1f1f1f] flex items-center justify-center shrink-0">
                          {formData.phoneCode}
                        </span>
                        <input
                          required
                          type="tel"
                          value={formData.phoneNumber}
                          onChange={e => setFormData({ ...formData, phoneNumber: e.target.value.replace(/\D/g, "") })}
                          className="google-input flex-1"
                          placeholder="7XXXXXXXX"
                        />
                      </div>
                    </div>
                  </div>
                </section>

                {/* 02. Safari Details */}
                <section className="space-y-4 text-center">
                  <span className="text-[14px] font-bold text-[#5f6368] uppercase tracking-wider block text-center">
                    02. Expedition Logistics
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                    <div>
                      <label className="block text-[13px] font-semibold text-[#5f6368] mb-1.5 ml-1 text-left">
                        Safari Date
                      </label>
                      <div className="relative bg-[#f8f9fa] rounded-2xl px-4 py-3 flex items-center gap-3">
                        <Calendar size={18} className="text-[#5f6368] shrink-0" />
                        <input
                          type="date"
                          required
                          min={today}
                          value={formData.date}
                          onChange={e => setFormData({ ...formData, date: e.target.value })}
                          className="w-full bg-transparent font-semibold text-[16px] text-[#1f1f1f] outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[13px] font-semibold text-[#5f6368] mb-1.5 ml-1 text-left">
                        Guests
                      </label>
                      <div className="bg-[#f8f9fa] rounded-2xl px-5 py-2.5 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => setFormData(p => ({ ...p, passengers: Math.max(1, p.passengers - 1) }))}
                          className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#1f1f1f] hover:bg-[#e8eaed] active:scale-90 transition-all cursor-pointer"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="text-base font-bold text-[#1f1f1f]">{formData.passengers} Guests</span>
                        <button
                          type="button"
                          onClick={() => setFormData(p => ({ ...p, passengers: Math.min(7, p.passengers + 1) }))}
                          className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#1f1f1f] hover:bg-[#e8eaed] active:scale-90 transition-all cursor-pointer"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Add-ons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <AddOnToggle
                      active={formData.includeMeals}
                      onClick={() => setFormData(p => ({ ...p, includeMeals: !p.includeMeals }))}
                      icon={<Utensils size={18} />}
                      title="Fresh Bush Meals"
                      price={totals.meals}
                      quantity={formData.includeMeals ? formData.mealCount : null}
                      onInc={() => setFormData(p => ({ ...p, mealCount: Math.min(20, p.mealCount + 1) }))}
                      onDec={() => setFormData(p => ({ ...p, mealCount: Math.max(1, p.mealCount - 1) }))}
                    />
                    <AddOnToggle
                      active={formData.includeTickets}
                      onClick={() => setFormData(p => ({ ...p, includeTickets: !p.includeTickets }))}
                      icon={<Ticket size={18} />}
                      title="Park Entry Permits"
                      price={totals.tickets}
                    />
                  </div>
                </section>

                {/* 03. Special Requests */}
                <section className="space-y-4 text-center">
                  <span className="text-[14px] font-bold text-[#5f6368] uppercase tracking-wider block text-center">
                    03. Special Requests
                  </span>
                  <div className="text-left">
                    <label className="block text-[13px] font-semibold text-[#5f6368] mb-1.5 ml-1 text-left">
                      Notes & Requests
                    </label>
                    <div className="bg-[#f8f9fa] p-4 rounded-2xl">
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-transparent text-[16px] font-semibold text-[#1f1f1f] outline-none resize-none placeholder:text-[#9aa0a6] placeholder:font-normal text-left"
                        placeholder="Optional notes: pickup hotel in Tissamaharama, dietary preferences, photography focus..."
                      />
                    </div>
                  </div>
                </section>

                {/* Summary & Submit */}
                <div className="pt-2 space-y-4 text-center">
                  <div className="bg-[#f8f9fa] p-6 rounded-3xl space-y-3">
                    <div className="flex flex-col items-center justify-center gap-1">
                      <span className="text-[13px] font-bold text-[#5f6368] uppercase tracking-wider">Estimated Total</span>
                      <span className="text-3xl font-bold text-[#1f1f1f]">${totals.grandTotal.toFixed(2)} USD</span>
                    </div>

                    <div className="space-y-1.5 pt-3 border-t border-[#e8eaed] text-[14px] font-semibold text-[#5f6368] max-w-sm mx-auto">
                      <div className="flex justify-between">
                        <span>Private 4×4 Safari Vehicle</span>
                        <span className="text-[#1f1f1f]">${totals.base.toFixed(2)}</span>
                      </div>
                      {formData.includeMeals && (
                        <div className="flex justify-between">
                          <span>Meals ({formData.mealCount} portions)</span>
                          <span className="text-[#1f1f1f]">${totals.meals.toFixed(2)}</span>
                        </div>
                      )}
                      {formData.includeTickets && (
                        <div className="flex justify-between">
                          <span>Park Permits ({formData.passengers} visitors)</span>
                          <span className="text-[#1f1f1f]">${totals.tickets.toFixed(2)}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <button
                      type="submit"
                      disabled={isSubmitting || loadingPrice}
                      className="w-full flex items-center justify-center gap-2 bg-[#00ff00] hover:brightness-105 active:scale-[0.99] text-black py-4 rounded-full text-[18px] font-bold transition-all cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <Loader2 className="animate-spin" size={20} />
                      ) : (
                        <>
                          <span>Submit Booking Request</span>
                          <Send size={18} className="stroke-[2.5]" />
                        </>
                      )}
                    </button>
                  </div>

                  {notification && (
                    <div className={cn("p-4 rounded-2xl text-[14px] font-semibold text-center max-w-md mx-auto", notification.type === "success" ? "bg-[#e6f4ea] text-[#137333]" : "bg-[#fce8e6] text-[#d93025]")}>
                      {notification.message}
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .google-input {
          background-color: #f8f9fa;
          width: 100%;
          font-size: 16px;
          font-weight: 600;
          color: #1f1f1f;
          padding: 12px 16px;
          border-radius: 16px;
          outline: none;
          text-align: left;
          transition: background-color 0.15s ease;
        }
        @media (min-width: 768px) {
          .google-input {
            font-size: 15px;
          }
        }
        .google-input:focus {
          background-color: #f1f3f4;
        }
        .google-input::placeholder {
          color: #9aa0a6;
          font-weight: 400;
          text-align: left;
        }
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
}

const AddOnToggle = ({ active, onClick, icon, title, price, quantity, onInc, onDec }: any) => {
  const handleToggle = useCallback((e: any) => {
    e.preventDefault();
    e.stopPropagation();
    onClick();
  }, [onClick]);

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={handleToggle}
        className={cn(
          "flex items-center justify-between p-4 rounded-2xl transition-all cursor-pointer text-left",
          active ? "bg-[#e6f4ea] text-[#137333]" : "bg-[#f8f9fa] text-[#1f1f1f] hover:bg-[#f1f3f4]"
        )}
      >
        <div className="flex items-center gap-3">
          <div className={cn("p-2 rounded-xl flex items-center justify-center", active ? "bg-white text-[#137333]" : "bg-white text-[#5f6368]")}>
            {icon}
          </div>
          <span className="text-[14px] font-bold">{title}</span>
        </div>
        <span className="text-[13px] font-bold text-[#5f6368]">+${price}</span>
      </button>

      {active && quantity !== undefined && (
        <div className="flex items-center justify-between px-4 py-2 bg-[#f8f9fa] rounded-xl">
          <span className="text-[13px] font-semibold text-[#5f6368]">Meal Count</span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onDec}
              className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-[#1f1f1f] hover:bg-[#e8eaed] cursor-pointer"
            >
              <Minus size={14} />
            </button>
            <span className="text-[14px] font-bold text-[#1f1f1f]">{quantity}</span>
            <button
              type="button"
              onClick={onInc}
              className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-[#1f1f1f] hover:bg-[#e8eaed] cursor-pointer"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};