/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { countries } from "countries-list";
import { cn } from "@/lib/utils";
import {
  Calendar, Globe, Mail, MessageSquare, User, Ticket, Send,
  Users, Utensils, Plus, Minus, CheckCircle2, Loader2, Package, ShieldCheck, X, Phone
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

  // --- 4. STABLE SCROLL LOCK & BACKGROUND SHIELD ---
  useEffect(() => {
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');

    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
      if (header) header.style.display = 'none';
      if (footer) footer.style.display = 'none';
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      if (header) header.style.display = '';
      if (footer) footer.style.display = '';
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      if (header) header.style.display = '';
      if (footer) footer.style.display = '';
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
      } catch (error) { console.error(error); }
      finally { setLoadingPrice(false); }
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
        setNotification({ type: "success", message: "Booking received! We will contact you shortly." });
        setTimeout(() => setIsOpen(false), 2500);
      } else { throw new Error(); }
    } catch (error) {
      setNotification({ type: "error", message: "Error! Please try again." });
    } finally { setIsSubmitting(false); }
  };

  const today = useMemo(() => new Date().toLocaleDateString('en-ca'), []);

  return (
    <>
      {/* OPEN BUTTON */}
      {!isOpen && (
        <div className="flex w-full items-center justify-center py-10">
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-6 bg-[#f5f5f7] text-black px-10 py-5 rounded-full transition-all duration-[800ms] cubic-bezier(0.16, 1, 0.3, 1) hover:bg-[#00ff00] hover:scale-[1.05] shadow-2xl active:scale-95"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
            <span className="text-[13px] font-bold tracking-[0.2em] uppercase">Book Your Safari</span>
            <Plus size={16} className="group-hover:rotate-90 transition-transform duration-500" />
          </button>
        </div>
      )}

      {/* PORTAL SHIELD */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[1000000] w-full h-[100svh] flex flex-col items-center justify-center bg-black/60 overflow-hidden touch-none p-4 md:p-0"
          style={{ paddingBottom: '0svh' }}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[60px] animate-in fade-in duration-700" onClick={() => setIsOpen(false)} />

          <div
            className="relative w-full h-[88svh] md:h-[92vh] max-w-6xl bg-[#0a0a0a] rounded-[2.5rem] md:rounded-[3.5rem] border border-white/[0.08] flex flex-col shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-10 duration-[800ms] cubic-bezier(0.16, 1, 0.3, 1) isolate overflow-hidden touch-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 md:p-12 shrink-0 border-b border-white/[0.05]">
              <div className="flex items-center gap-3">
                <div className="w-1 h-1 rounded-full bg-[#00ff00] shadow-[0_0_8px_#00ff00]" />
                <span className="text-[10px] font-black tracking-[0.4em] text-[#86868b] uppercase">Online Booking</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-3 rounded-full bg-white/5 text-[#86868b] hover:text-[#f5f5f7] active:scale-90 transition-all duration-500">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 md:px-24 pb-24 scrollbar-hide overscroll-contain">
              <header className="mt-8 md:mt-12 mb-16">
                <h1 className="text-4xl md:text-8xl font-semibold tracking-tight text-[#f5f5f7] leading-tight">
                  Confirm Your <br /><span className="text-[#86868b]">Adventure.</span>
                </h1>
                <div className="mt-4 flex items-center gap-3">
                  <div className="w-4 h-[1px] bg-[#00ff00]/40" />
                  <span className="text-[14px] md:text-[16px] font-medium tracking-wide text-[#00ff00] uppercase">
                    {packageDetails?.name || tourPackageSlug.replace(/-/g, ' ')}
                  </span>
                </div>
              </header>

              <form onSubmit={handleSubmit} className="space-y-16 md:space-y-32">

                {/* 01 CONTACT INFORMATION */}
                <section className="space-y-10">
                  <SectionLabel>01. Contact Information</SectionLabel>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                    <InputField icon={<User size={16} />} label="Full Name">
                      <input required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="form-input" placeholder="Enter your name" />
                    </InputField>

                    <InputField icon={<Globe size={16} />} label="Country">
                      <select value={formData.country} onChange={e => setFormData({ ...formData, country: e.target.value })} className="form-input appearance-none cursor-pointer">
                        <option value="">Select country</option>
                        {countryList.map(c => <option key={c.code} value={c.name}>{c.name}</option>)}
                      </select>
                    </InputField>

                    <InputField icon={<Mail size={16} />} label="Email Address">
                      <input type="email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="form-input" placeholder="email@example.com" />
                    </InputField>

                    <InputField icon={<Phone size={16} />} label="Phone Number">
                      <div className="flex items-center">
                        <span className="text-[#00ff00] font-mono text-sm mr-4 opacity-60">{formData.phoneCode}</span>
                        <input required type="tel" value={formData.phoneNumber} onChange={e => setFormData({ ...formData, phoneNumber: e.target.value.replace(/\D/g, "") })} className="form-input" placeholder="Number" />
                      </div>
                    </InputField>
                  </div>
                </section>

                {/* 02 SAFARI DETAILS */}
                <section className="space-y-16">
                  <SectionLabel>02. Safari Details</SectionLabel>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="space-y-4">
                      <span className="text-[12px] font-bold text-[#86868b] uppercase tracking-widest block mb-2">Safari Date</span>
                      <div className="bg-white/[0.02] p-6 rounded-2xl flex items-center gap-4 border border-white/[0.05] relative hover:bg-white/[0.04] transition-colors duration-500">
                        <Calendar size={18} className="text-[#00ff00] opacity-40" />
                        <input
                          type="date"
                          required
                          min={today}
                          value={formData.date}
                          onChange={e => {
                            setFormData({ ...formData, date: e.target.value });
                            e.target.blur(); // Fix for stuck desktop: release focus
                          }}
                          className="form-input border-none !p-0 !m-0 [color-scheme:dark] w-full"
                        />
                      </div>
                    </div>

                    <div className="bg-white/[0.02] p-8 rounded-[2rem] border border-white/5 flex items-center justify-between shadow-inner">
                      <span className="text-[12px] font-bold text-[#86868b] uppercase tracking-widest">Guests</span>
                      <div className="flex items-center gap-10">
                        <button type="button" onClick={() => setFormData(p => ({ ...p, passengers: Math.max(1, p.passengers - 1) }))} className="text-[#86868b] hover:text-[#00ff00] transition-colors duration-500 p-2"><Minus size={24} /></button>
                        <span className="text-4xl md:text-5xl font-semibold text-[#f5f5f7] font-mono leading-none">{formData.passengers}</span>
                        <button type="button" onClick={() => setFormData(p => ({ ...p, passengers: Math.min(7, p.passengers + 1) }))} className="text-[#86868b] hover:text-[#00ff00] transition-colors duration-500 p-2"><Plus size={24} /></button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <AddOnToggle active={formData.includeMeals} onClick={() => setFormData(p => ({ ...p, includeMeals: !p.includeMeals }))} icon={<Utensils size={16} />} title="Include Meals" price={totals.meals} quantity={formData.includeMeals ? formData.mealCount : null} onInc={() => setFormData(p => ({ ...p, mealCount: Math.min(20, p.mealCount + 1) }))} onDec={() => setFormData(p => ({ ...p, mealCount: Math.max(1, p.mealCount - 1) }))} />
                    <AddOnToggle active={formData.includeTickets} onClick={() => setFormData(p => ({ ...p, includeTickets: !p.includeTickets }))} icon={<Ticket size={16} />} title="Entry Tickets" price={totals.tickets} />
                  </div>
                </section>

                {/* 03 SPECIAL REQUESTS */}
                <section className="space-y-12">
                  <SectionLabel>03. Special Requests</SectionLabel>
                  <div className="bg-white/[0.02] p-10 rounded-[3rem] border border-white/5 focus-within:bg-white/[0.04] transition-all duration-[800ms] cubic-bezier(0.16, 1, 0.3, 1)">
                    <div className="flex items-center gap-3 mb-8 opacity-30">
                      <MessageSquare size={18} />
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#86868b]">Message (Optional)</span>
                    </div>
                    <textarea rows={5} value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} className="w-full bg-transparent text-[#f5f5f7] text-2xl font-medium outline-none resize-none placeholder:text-neutral-800" placeholder="Let us know if you have any special needs..." />
                  </div>
                </section>

                <div className="pt-24 border-t border-white/5">
                  <div className="bg-[#00ff00] p-10 md:p-20 rounded-[3rem] text-black mb-12 shadow-2xl relative overflow-hidden group">
                    <div className="relative z-10 text-black">
                      <div className="flex justify-between items-start mb-16 md:mb-20">
                        <div>
                          <span className="text-[12px] md:text-[14px] font-black uppercase tracking-[0.3em] opacity-50 block text-black">Total Price</span>
                          <h2 className="text-6xl md:text-[10rem] font-semibold tracking-tighter leading-none text-black">${totals.grandTotal.toFixed(2)}</h2>
                        </div>
                        <ShieldCheck size={64} className="opacity-10 hidden md:block" />
                      </div>
                      <div className="space-y-6 font-bold uppercase tracking-tight">
                        <SummaryLine label="Jeep Base Price" val={totals.base} />
                        {formData.includeMeals && <SummaryLine label={`Meals (x${formData.mealCount})`} val={totals.meals} />}
                        {formData.includeTickets && <SummaryLine label={`Permits (x${formData.passengers})`} val={totals.tickets} />}
                      </div>
                    </div>
                  </div>

                  <button type="submit" disabled={isSubmitting || loadingPrice} className="w-full bg-[#f5f5f7] text-black font-semibold py-10 rounded-[3rem] text-[15px] tracking-[0.4em] uppercase hover:bg-[#00ff00] transition-all duration-[800ms] cubic-bezier(0.16, 1, 0.3, 1) flex items-center justify-center gap-4 group">
                    {isSubmitting ? <Loader2 className="animate-spin" size={24} /> : <>Submit Booking <Send size={20} className="group-hover:translate-x-2 transition-transform duration-500" /></>}
                  </button>

                  {notification && (
                    <div className={cn("mt-12 p-10 rounded-[3rem] text-[16px] font-semibold text-center animate-in zoom-in-95", notification.type === "success" ? "bg-white/5 text-[#00ff00]" : "bg-red-500/10 text-red-400")}>
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
        .form-input {
          background: transparent;
          width: 100%;
          font-size: 24px;
          font-weight: 500;
          color: #f5f5f7;
          padding: 12px 0;
          outline: none;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 800ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .form-input:focus { border-bottom-color: #00ff00; padding-left: 8px; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        input[type="date"]::-webkit-calendar-picker-indicator {
          background: transparent;
          width: 100%; height: 100%;
          position: absolute; top: 0; left: 0; opacity: 0; cursor: pointer;
        }
      `}</style>
    </>
  );
}

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-[11px] font-black text-[#86868b] tracking-[0.4em] uppercase mb-10 pb-4 border-b border-white/[0.05]">{children}</h3>
);

const InputField = ({ icon, label, children }: any) => (
  <div className="flex flex-col group">
    <div className="flex items-center gap-3 mb-4 opacity-30 group-focus-within:opacity-100 transition-opacity duration-500">
      <div className="text-[#00ff00]">{icon}</div>
      <span className="text-[10px] font-black uppercase tracking-widest text-[#86868b]">{label}</span>
    </div>
    {children}
  </div>
);

const AddOnToggle = ({ active, onClick, icon, title, price, quantity, onInc, onDec }: any) => {
  const handleToggle = useCallback((e: any) => {
    e.preventDefault();
    e.stopPropagation();
    onClick();
  }, [onClick]);

  return (
    <div className="flex flex-col gap-4">
      <button
        type="button"
        onClick={handleToggle}
        className={cn("flex items-center justify-between p-8 rounded-[2.5rem] transition-all duration-[800ms] cubic-bezier(0.16, 1, 0.3, 1) border", active ? "bg-[#f5f5f7] text-black border-white shadow-2xl scale-[1.02]" : "bg-white/[0.01] text-[#86868b] border-white/[0.05] hover:border-white/20 hover:text-[#f5f5f7]")}
      >
        <div className="flex items-center gap-6">
          <div className={cn("p-3 rounded-2xl transition-colors duration-500", active ? "bg-black/5 text-black" : "bg-white/5 text-[#86868b]")}>{icon}</div>
          <span className="text-lg font-semibold tracking-tight">{title}</span>
        </div>
        <span className="text-[11px] font-black opacity-40 uppercase tracking-widest text-[#86868b]">${price}</span>
      </button>
      {active && quantity !== undefined && (
        <div className="flex items-center justify-between px-10 py-5 bg-white/5 rounded-[2rem] border border-white/[0.03] animate-in slide-in-from-top-4 duration-500">
          <span className="text-[10px] font-black text-[#86868b] uppercase tracking-widest">Quantity</span>
          <div className="flex items-center gap-10">
            <button type="button" onClick={onDec} className="text-[#86868b] hover:text-[#00ff00] transition-colors duration-500 p-2"><Minus size={16} /></button>
            <span className="text-xl font-bold text-[#f5f5f7] font-mono leading-none pointer-events-none">{quantity}</span>
            <button type="button" onClick={onInc} className="text-[#86868b] hover:text-[#00ff00] transition-colors duration-500 p-2"><Plus size={16} /></button>
          </div>
        </div>
      )}
    </div>
  );
};

const SummaryLine = ({ label, val }: any) => (
  <div className="flex justify-between text-[15px] font-bold tracking-tight border-b border-black/[0.08] pb-4 text-black/60">
    <span>{label}</span>
    <span>${val.toFixed(2)}</span>
  </div>
);