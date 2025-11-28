/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect, useMemo } from "react";
import { countries } from "countries-list";
import { cn } from "@/lib/utils";
import {
  Calendar, Globe, Mail, MessageSquare, User, Ticket, Send,
  Users, Utensils, Plus, Minus, CheckCircle2, Loader2, Package, ShieldCheck
} from "lucide-react";

// --- CONFIGURATION ---
const FALLBACK_CONSTANTS = {
  TICKET_PRICE: 45, // USD per person (Fallback)
  MEAL_PRICE: 10,   // USD per person (Fallback)
  DEFAULT_PHONE: "+94",
  MAX_PASSENGERS: 7,
};

// --- TYPES ---
interface BookingData {
  name: string;
  phoneCode: string;
  phoneNumber: string;
  email: string;
  date: string;
  country: string;
  message: string;
  passengers: number;
  includeMeals: boolean;
  includeTickets: boolean;
  startTime: string;
}

interface PackageDetails {
  name: string;
  price: number;
  mealPrice?: number; // Fetched from DB
  ticketPrice?: number; // Fetched from DB
  slug: string;
}

export default function BookingForm({
  tourPackageSlug
}: {
  tourPackageSlug: string;
}) {

  // 1. DATA PREPARATION (Countries)
  const countryList = useMemo(() => {
    return Object.entries(countries)
      .map(([code, data]) => ({
        code,
        name: data.name,
        phoneCode: `+${data.phone}`
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  // 2. STATE
  const [formData, setFormData] = useState<BookingData>({
    name: "",
    phoneCode: FALLBACK_CONSTANTS.DEFAULT_PHONE,
    phoneNumber: "",
    email: "",
    date: "",
    country: "",
    message: "",
    passengers: 2,
    includeMeals: false,
    includeTickets: false,
    startTime: "06:00 AM",
  });

  const [packageDetails, setPackageDetails] = useState<PackageDetails | null>(null);
  const [loadingPrice, setLoadingPrice] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error", message: string } | null>(null);

  // 3. LOGIC: AUTO-UPDATE PHONE CODE
  useEffect(() => {
    if (formData.country) {
      const matchedCountry = countryList.find(c => c.name === formData.country);
      if (matchedCountry) {
        setFormData(prev => ({ ...prev, phoneCode: matchedCountry.phoneCode }));
      }
    }
  }, [formData.country, countryList]);

  // 4. FETCH PACKAGE
  useEffect(() => {
    const fetchPrice = async () => {
      setLoadingPrice(true);
      try {
        const res = await fetch(`/api/package?slug=${tourPackageSlug}`, { cache: 'no-store' });
        if (!res.ok) throw new Error("Failed to load package");
        const data = await res.json();
        // Ensure data includes mealPrice and ticketPrice
        setPackageDetails(data);
      } catch (error) {
        console.error(error);
        setNotification({ type: "error", message: "Could not load package pricing." });
      } finally {
        setLoadingPrice(false);
      }
    };

    if (tourPackageSlug) fetchPrice();
  }, [tourPackageSlug]);

  // 5. CALCULATIONS
  // Use DB prices if available, otherwise fallback to constants
  const currentTicketPrice = packageDetails?.ticketPrice ?? FALLBACK_CONSTANTS.TICKET_PRICE;
  const currentMealPrice = packageDetails?.mealPrice ?? FALLBACK_CONSTANTS.MEAL_PRICE;

  const totals = useMemo(() => {
    const base = packageDetails?.price || 0;
    const tickets = formData.includeTickets ? formData.passengers * currentTicketPrice : 0;
    const meals = formData.includeMeals ? formData.passengers * currentMealPrice : 0;
    return { base, tickets, meals, grandTotal: base + tickets + meals };
  }, [packageDetails, formData.passengers, formData.includeTickets, formData.includeMeals, currentTicketPrice, currentMealPrice]);

  // 6. SUBMIT
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setNotification(null);

    const fullPhone = `${formData.phoneCode}${formData.phoneNumber}`;
    const payload = {
      ...formData,
      phone: fullPhone,
      tourPackage: packageDetails?.name || tourPackageSlug,
      pricing: totals
    };

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setNotification({ type: "success", message: "Booking Confirmed! Check your email." });
        setFormData(prev => ({ ...prev, name: "", email: "", phoneNumber: "", message: "" }));
      } else {
        throw new Error("Booking failed");
      }
    } catch (error) {
      setNotification({ type: "error", message: "Transmission failed. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto font-sans">

      {/* --- CONTAINER --- */}
      <div className="relative rounded-3xl border border-green-500/50 bg-black/40 backdrop-blur-xl p-1 shadow-[0_0_40px_-15px_rgba(34,197,94,0.3)] ring-1 ring-white/10 transition-all">

        <div className="rounded-[1.3rem] bg-black/20 p-5 sm:p-8 border border-white/5">

          {/* HEADER */}
          <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]"></div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-green-400">System Online</span>
            </div>
            <div className="flex items-center gap-1.5 text-green-500/50">
              <ShieldCheck size={12} />
              <span className="text-[10px] font-bold uppercase hidden xs:inline-block">Secure Encrypted</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* 1. PERSONAL DETAILS */}
            <div className="space-y-4">

              {/* Name */}
              <InputGroup icon={<User size={16} />} label="Ident / Full Name">
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Connor"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-transparent text-white text-base sm:text-sm px-4 py-3.5 outline-none placeholder:text-neutral-500"
                />
              </InputGroup>

              {/* Country & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputGroup icon={<Globe size={16} />} label="Origin">
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full bg-transparent text-white text-base sm:text-sm px-4 py-3.5 outline-none appearance-none cursor-pointer [&>option]:bg-neutral-900 truncate"
                  >
                    <option value="" disabled>Select Country</option>
                    {countryList.map((c) => <option key={c.code} value={c.name}>{c.name}</option>)}
                  </select>
                </InputGroup>

                <div className="group">
                  <Label>Comms</Label>
                  <div className="flex gap-2">
                    {/* Phone Code Dropdown */}
                    <div className="w-[90px] bg-black/40 backdrop-blur-xl rounded-xl border border-green-500/30 overflow-hidden relative">
                      <select
                        value={formData.phoneCode}
                        onChange={(e) => setFormData({ ...formData, phoneCode: e.target.value })}
                        className="w-full h-full bg-transparent text-white text-base sm:text-sm text-center outline-none appearance-none [&>option]:bg-neutral-900"
                      >
                        {/* Ensure unique values for dropdown options */}
                        {Array.from(new Set(countryList.map(c => c.phoneCode))).map((code) => (
                          <option key={code} value={code}>{code}</option>
                        ))}
                      </select>
                    </div>
                    {/* Phone Number Input */}
                    <input
                      type="tel"
                      required
                      placeholder="Mobile Num"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value.replace(/\D/g, "") })}
                      className="flex-1 bg-black/40 backdrop-blur-xl rounded-xl border border-green-500/30 text-white text-base sm:text-sm px-4 py-3.5 outline-none focus:border-green-500 transition-colors placeholder:text-neutral-500"
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <InputGroup icon={<Mail size={16} />} label="Email Address">
                <input
                  type="email"
                  required
                  placeholder="sarah@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-transparent text-white text-base sm:text-sm px-4 py-3.5 outline-none placeholder:text-neutral-500"
                />
              </InputGroup>

              {/* Date & Package Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputGroup icon={<Calendar size={16} />} label="Date">
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split("T")[0]}
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-transparent text-white text-base sm:text-sm px-4 py-3.5 outline-none [color-scheme:dark]"
                  />
                </InputGroup>

                <div className="group">
                  <Label>Expedition Package</Label>
                  <div className="relative flex items-center bg-black/40 backdrop-blur-xl rounded-xl overflow-hidden border border-green-500/30 shadow-[0_0_15px_rgba(34,197,94,0.1)]">
                    <div className="pl-4 text-green-500"><Package size={16} /></div>
                    <input
                      type="text"
                      disabled
                      value={packageDetails?.name || "Loading..."}
                      className="w-full bg-transparent text-green-400 font-bold text-xs sm:text-sm px-4 py-3.5 outline-none truncate cursor-default"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent my-8"></div>

            {/* 2. PASSENGERS */}
            <div>
              <Label>Pax Count (Max {FALLBACK_CONSTANTS.MAX_PASSENGERS})</Label>
              <div className="flex items-center justify-between bg-black/40 backdrop-blur-xl rounded-xl border border-green-500/30 p-3">
                <CounterBtn onClick={() => setFormData(p => ({ ...p, passengers: Math.max(1, p.passengers - 1) }))} icon={<Minus size={16} />} />
                <div className="flex items-center gap-3">
                  <Users size={18} className="text-green-500" />
                  <span className="text-2xl font-black text-white font-mono">{formData.passengers}</span>
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Guests</span>
                </div>
                <CounterBtn onClick={() => setFormData(p => ({ ...p, passengers: Math.min(FALLBACK_CONSTANTS.MAX_PASSENGERS, p.passengers + 1) }))} icon={<Plus size={16} />} />
              </div>
            </div>

            {/* 3. ADD-ONS */}
            <div className="space-y-3">
              <Label>Tactical Add-ons</Label>
              <div className="grid grid-cols-1 gap-3">
                <AddOnCard
                  active={formData.includeMeals}
                  onClick={() => setFormData(p => ({ ...p, includeMeals: !p.includeMeals }))}
                  icon={<Utensils size={18} />}
                  title="Picnic Meals"
                  desc="Breakfast/lunch packs included."
                  price={currentMealPrice} // Use fetched price
                />
                <AddOnCard
                  active={formData.includeTickets}
                  onClick={() => setFormData(p => ({ ...p, includeTickets: !p.includeTickets }))}
                  icon={<Ticket size={18} />}
                  title="Park Tickets"
                  desc="Entrance tickets purchased for you."
                  price={currentTicketPrice} // Use fetched price
                />
              </div>
            </div>

            {/* 4. PRICE BREAKDOWN */}
            <div className="bg-black/60 backdrop-blur-2xl rounded-xl p-6 border border-green-500/20 font-mono text-sm relative overflow-hidden shadow-lg">
              {loadingPrice && (
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-10">
                  <Loader2 className="animate-spin text-green-500" />
                </div>
              )}

              <h4 className="text-[10px] font-sans uppercase tracking-widest text-neutral-400 mb-4 border-b border-white/10 pb-2">Cost Analysis</h4>

              <div className="space-y-3 mb-4 text-neutral-300 text-xs">
                <PriceRow label="Jeep Base Price" amount={totals.base} highlight />

                {formData.includeMeals && (
                  <PriceRow
                    label={`Meals (${formData.passengers} x $${currentMealPrice})`}
                    amount={totals.meals}
                    color="text-green-400/80"
                  />
                )}

                {formData.includeTickets && (
                  <PriceRow
                    label={`Tickets (${formData.passengers} x $${currentTicketPrice})`}
                    amount={totals.tickets}
                    color="text-green-400/80"
                  />
                )}
              </div>

              <div className="flex justify-between items-end border-t border-white/10 pt-4">
                <span className="text-neutral-400 text-xs uppercase font-sans font-bold tracking-wider">Estimated Total</span>
                <span className="text-2xl font-black text-white tracking-tighter">
                  USD {totals.grandTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Message */}
            <InputGroup icon={<MessageSquare size={16} />} label="Intel / Notes (Optional)">
              <textarea
                rows={2}
                placeholder="Special requests..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-transparent text-white text-base sm:text-sm px-4 py-3.5 outline-none resize-none placeholder:text-neutral-500"
              />
            </InputGroup>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || loadingPrice}
              className={cn(
                "w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-black font-black py-4 rounded-xl transition-all duration-300",
                "flex items-center justify-center gap-2 text-sm uppercase tracking-widest shadow-[0_0_25px_rgba(22,163,74,0.4)] hover:shadow-[0_0_40px_rgba(34,197,94,0.6)]",
                "disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
              )}
            >
              {isSubmitting ? (
                <span className="animate-pulse flex items-center gap-2"><Loader2 className="animate-spin" size={16} /> Processing</span>
              ) : (
                <>Confirm Booking <Send size={16} strokeWidth={2.5} /></>
              )}
            </button>

            {/* Notification */}
            {notification && (
              <div className={cn("p-4 rounded-xl text-xs font-mono text-center border backdrop-blur-md animate-in fade-in slide-in-from-bottom-2",
                notification.type === "success" ? "bg-green-500/20 border-green-500/50 text-green-400" : "bg-red-500/20 border-red-500/50 text-red-400")}>
                <span className="font-bold mr-2">[{notification.type === "success" ? "SUCCESS" : "ERROR"}]</span>
                {notification.message}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

// --- SUB-COMPONENTS ---

const Label = ({ children }: { children: React.ReactNode }) => (
  <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1.5 block">{children}</label>
);

const InputGroup = ({ icon, label, children }: { icon: React.ReactNode, label: string, children: React.ReactNode }) => (
  <div className="group">
    <Label>{label}</Label>
    <div className="relative flex items-start bg-black/40 backdrop-blur-md rounded-xl overflow-hidden border border-white/10 group-focus-within:border-green-500/60 group-focus-within:shadow-[0_0_15px_rgba(34,197,94,0.1)] transition-all duration-300">
      <div className="pl-4 pt-3.5 text-neutral-500 group-focus-within:text-green-400 transition-colors">{icon}</div>
      {children}
    </div>
  </div>
);

const CounterBtn = ({ onClick, icon }: { onClick: () => void, icon: React.ReactNode }) => (
  <button type="button" onClick={onClick} className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-green-500/20 hover:text-green-400 rounded-lg text-white transition-all border border-transparent hover:border-green-500/30 active:scale-95">
    {icon}
  </button>
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AddOnCard = ({ active, onClick, icon, title, desc, price }: any) => (
  <div onClick={onClick} className={cn("relative overflow-hidden cursor-pointer rounded-xl border p-4 transition-all duration-300 backdrop-blur-md group",
    active ? "bg-green-500/10 border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.15)]" : "bg-black/40 border-white/10 hover:border-green-500/30 hover:bg-white/5")}>
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-start gap-3">
        <div className={cn("p-2 rounded-lg transition-colors", active ? "bg-green-500 text-black" : "bg-white/10 text-neutral-400 group-hover:text-white")}>{icon}</div>
        <div>
          <h4 className={cn("text-sm font-bold transition-colors", active ? "text-green-400" : "text-white")}>{title}</h4>
          <p className="text-[10px] text-neutral-400 leading-relaxed mt-1 line-clamp-2">{desc}</p>
        </div>
      </div>
      <div className="text-right shrink-0">
        <div className="text-white font-mono font-bold">${price}</div>
        <div className="text-[9px] text-neutral-500 uppercase">Per Pax</div>
      </div>
    </div>
    <div className={cn("absolute top-2 right-2 transition-all duration-300", active ? "opacity-100 scale-100" : "opacity-0 scale-50")}>
      <CheckCircle2 size={16} className="text-green-500 fill-green-500/20" />
    </div>
  </div>
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PriceRow = ({ label, amount, color = "text-neutral-400", highlight }: any) => (
  <div className={cn("flex justify-between items-center", color, highlight && "font-bold text-white text-sm")}>
    <span>{label}</span>
    <span>${amount.toFixed(2)}</span>
  </div>
);