"use client";

import { useState, useMemo } from "react";
import { 
  MapPin, Navigation, Calendar, Clock, User, Mail, 
  Car, Bus, Send, Loader2, CheckCircle2, ShieldCheck, ArrowRight 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { countries } from "countries-list";

// --- CONFIG ---
const VEHICLES = [
  { id: "car", name: "Private Sedan", seats: 3, luggage: 2, badge: "Couple / Solo" },
  { id: "van", name: "Luxury KDH Van", seats: 9, luggage: 8, badge: "Family / Group" },
];

const DEFAULT_PHONE_CODE = "+94";

export default function TransportForm() {
  const countryList = useMemo(() => {
    return Object.entries(countries)
      .map(([code, data]) => ({
        code,
        name: data.name,
        phoneCode: `+${data.phone}`
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const initialFormState = {
    pickupLocation: "",
    dropoffLocation: "",
    date: "",
    time: "",
    vehicle: "car",
    name: "",
    phoneCode: DEFAULT_PHONE_CODE,
    phoneNumber: "",
    email: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    const fullPhone = `${formData.phoneCode}${formData.phoneNumber}`;
    const submissionData = { ...formData, phone: fullPhone };

    try {
      const res = await fetch("/api/pickup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to submit request");
      }

      setIsSuccess(true);
      setFormData(initialFormState);
    } catch (error) {
      console.error("Submission Error:", error);
      setErrorMsg("Failed to send request. Please check your network and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- SUCCESS SCREEN ---
  if (isSuccess) {
    return (
      <div 
        className="h-full min-h-[480px] flex flex-col items-center justify-center text-center p-6 sm:p-8 rounded-[2.5rem] bg-white text-[#1f1f1f]"
        style={{
          fontFamily:
            '"Google Sans", "Open Sans", Roboto, -apple-system, BlinkMacSystemFont, Arial, sans-serif',
        }}
      >
        <div className="w-16 h-16 bg-[#e6f4ea] text-[#137333] rounded-full flex items-center justify-center mb-5 shrink-0">
          <CheckCircle2 size={34} />
        </div>
        
        <h3 className="text-2xl font-bold text-[#1f1f1f] mb-2 tracking-tight">
          Request Received
        </h3>
        
        <div className="space-y-3 mb-6 max-w-sm text-[14px] font-semibold text-[#5f6368] leading-relaxed">
          <p>We have safely registered your island pickup details.</p>
          <div className="bg-[#f8f9fa] p-4 rounded-2xl text-[#1f1f1f]">
            Our transport desk is assigning an executive vehicle at guaranteed standard rates.
          </div>
          <p>
            You will receive instant confirmation via <span className="text-[#1f1f1f] font-bold">WhatsApp & Email</span>.
          </p>
        </div>

        <button 
          type="button"
          onClick={() => setIsSuccess(false)}
          className="inline-flex items-center gap-2 bg-[#f8f9fa] hover:bg-[#00ff00] hover:text-black text-[#1f1f1f] px-6 py-3 rounded-full transition-colors duration-150 font-bold text-[13px] active:scale-95 cursor-pointer"
        >
          <span>Book Another Transfer</span>
          <ArrowRight size={15} />
        </button>
      </div>
    );
  }

  // --- MAIN FORM ---
  return (
    <div 
      className="relative rounded-[2.5rem] bg-white p-5 sm:p-7 text-[#1f1f1f]"
      style={{
        fontFamily:
          '"Google Sans", "Open Sans", Roboto, -apple-system, BlinkMacSystemFont, Arial, sans-serif',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f8f9fa] text-[12px] font-semibold text-[#1f1f1f]">
          <span className="w-2 h-2 rounded-full bg-[#00ff00]" />
          <span>Island Route Planner</span>
        </div>
        <ShieldCheck size={18} className="text-[#137333]" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* --- 01. ROUTE --- */}
        <div className="space-y-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#5f6368] block ml-1">
            01. Route Details
          </span>

          <div className="space-y-2.5">
            <div>
              <label className="block text-[12px] font-semibold text-[#5f6368] mb-1 ml-1 text-left">
                Pickup Location
              </label>
              <div className="relative flex items-center bg-[#f8f9fa] rounded-2xl focus-within:bg-[#f1f3f4] transition-colors">
                <div className="pl-4 text-[#137333] shrink-0">
                  <MapPin size={16} />
                </div>
                <input 
                  required 
                  type="text" 
                  placeholder="Airport (BIA), Hotel, or City..." 
                  className="w-full bg-transparent text-[#1f1f1f] text-base md:text-[14px] font-semibold px-3 py-3 outline-none placeholder:text-[#9aa0a6] placeholder:font-normal"
                  value={formData.pickupLocation}
                  onChange={(e) => setFormData({...formData, pickupLocation: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-[#5f6368] mb-1 ml-1 text-left">
                Drop-off Destination
              </label>
              <div className="relative flex items-center bg-[#f8f9fa] rounded-2xl focus-within:bg-[#f1f3f4] transition-colors">
                <div className="pl-4 text-[#d93025] shrink-0">
                  <Navigation size={16} />
                </div>
                <input 
                  required 
                  type="text" 
                  placeholder="Yala Hotel, Villa, Camp, or Safari Gate..." 
                  className="w-full bg-transparent text-[#1f1f1f] text-base md:text-[14px] font-semibold px-3 py-3 outline-none placeholder:text-[#9aa0a6] placeholder:font-normal"
                  value={formData.dropoffLocation}
                  onChange={(e) => setFormData({...formData, dropoffLocation: e.target.value})}
                />
              </div>
            </div>
          </div>
        </div>

        {/* --- 02. SCHEDULE --- */}
        <div className="space-y-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#5f6368] block ml-1">
            02. Schedule
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[12px] font-semibold text-[#5f6368] mb-1 ml-1 text-left">
                Pickup Date
              </label>
              <div className="relative flex items-center bg-[#f8f9fa] rounded-2xl px-3 py-2.5">
                <Calendar size={16} className="text-[#5f6368] mr-2 shrink-0" />
                <input 
                  required 
                  type="date" 
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full bg-transparent text-[#1f1f1f] text-base md:text-[13px] font-semibold outline-none"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-[#5f6368] mb-1 ml-1 text-left">
                Pickup Time
              </label>
              <div className="relative flex items-center bg-[#f8f9fa] rounded-2xl px-3 py-2.5">
                <Clock size={16} className="text-[#5f6368] mr-2 shrink-0" />
                <input 
                  required 
                  type="time" 
                  className="w-full bg-transparent text-[#1f1f1f] text-base md:text-[13px] font-semibold outline-none"
                  value={formData.time}
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                />
              </div>
            </div>
          </div>
        </div>

        {/* --- 03. FLEET CLASS --- */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold uppercase tracking-wider text-[#5f6368] block ml-1">
            03. Vehicle Class
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {VEHICLES.map((v) => {
              const isSelected = formData.vehicle === v.id;
              return (
                <div 
                  key={v.id}
                  onClick={() => setFormData({...formData, vehicle: v.id})}
                  className={cn(
                    "cursor-pointer p-4 rounded-2xl transition-all duration-150 select-none",
                    isSelected
                      ? "bg-[#e6f4ea] text-[#137333]" 
                      : "bg-[#f8f9fa] text-[#1f1f1f] hover:bg-[#f1f3f4]"
                  )}
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className={cn("p-2 rounded-xl bg-white", isSelected ? "text-[#137333]" : "text-[#5f6368]")}>
                      {v.id === "car" ? <Car size={18} /> : <Bus size={18} />}
                    </div>
                    {isSelected && <CheckCircle2 size={16} className="text-[#137333]" />}
                  </div>
                  <div className="text-[14px] font-bold text-[#1f1f1f]">{v.name}</div>
                  <div className="text-[12px] font-semibold text-[#5f6368] mt-1 flex items-center gap-2">
                    <span>{v.seats} Seats</span>
                    <span>•</span>
                    <span>{v.luggage} Bags</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* --- 04. CONTACT DETAILS --- */}
        <div className="space-y-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#5f6368] block ml-1">
            04. Contact Details
          </span>

          <div className="space-y-2.5">
            <div>
              <label className="block text-[12px] font-semibold text-[#5f6368] mb-1 ml-1 text-left">
                Full Name
              </label>
              <div className="relative flex items-center bg-[#f8f9fa] rounded-2xl focus-within:bg-[#f1f3f4] transition-colors">
                <div className="pl-4 text-[#5f6368] shrink-0">
                  <User size={16} />
                </div>
                <input 
                  required 
                  type="text" 
                  placeholder="Primary Passenger Name"
                  className="w-full bg-transparent text-[#1f1f1f] text-base md:text-[14px] font-semibold px-3 py-3 outline-none placeholder:text-[#9aa0a6] placeholder:font-normal"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[12px] font-semibold text-[#5f6368] mb-1 ml-1 text-left">
                  WhatsApp / Phone
                </label>
                <div className="flex gap-1.5">
                  <select 
                    className="w-[84px] bg-[#f8f9fa] text-[#1f1f1f] text-base md:text-[13px] font-bold px-2 py-3 rounded-2xl outline-none cursor-pointer shrink-0"
                    value={formData.phoneCode}
                    onChange={(e) => setFormData({...formData, phoneCode: e.target.value})}
                  >
                    {countryList.map((c) => (
                      <option key={`${c.code}-${c.phoneCode}`} value={c.phoneCode}>
                        {c.code} {c.phoneCode}
                      </option>
                    ))}
                  </select>
                  <input 
                    required 
                    type="tel" 
                    placeholder="Mobile number"
                    className="w-full bg-[#f8f9fa] focus:bg-[#f1f3f4] text-[#1f1f1f] text-base md:text-[14px] font-semibold px-3 py-3 rounded-2xl outline-none placeholder:text-[#9aa0a6] placeholder:font-normal"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({...formData, phoneNumber: e.target.value.replace(/\D/g, "")})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-semibold text-[#5f6368] mb-1 ml-1 text-left">
                  Email Address
                </label>
                <div className="relative flex items-center bg-[#f8f9fa] rounded-2xl focus-within:bg-[#f1f3f4] transition-colors">
                  <div className="pl-4 text-[#5f6368] shrink-0">
                    <Mail size={16} />
                  </div>
                  <input 
                    required 
                    type="email" 
                    placeholder="email@example.com"
                    className="w-full bg-transparent text-[#1f1f1f] text-base md:text-[14px] font-semibold px-3 py-3 outline-none placeholder:text-[#9aa0a6] placeholder:font-normal"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ERROR MESSAGE */}
        {errorMsg && (
          <div className="bg-[#fce8e6] text-[#d93025] text-[12px] text-center p-3 rounded-2xl font-semibold">
            {errorMsg}
          </div>
        )}

        {/* SUBMIT BUTTON */}
        <div className="space-y-2 pt-2 text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#00ff00] hover:brightness-105 active:scale-[0.99] text-black font-bold py-3.5 rounded-full transition-all flex items-center justify-center gap-2 text-[14px] cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin text-black" size={18} />
            ) : (
              <>
                <span>Get Instant Quote & Confirm</span> 
                <Send size={15} className="stroke-[2.5]" />
              </>
            )}
          </button>
          
          <p className="text-[11px] font-semibold text-[#5f6368]">
            Direct driver dispatch • Fixed quotes delivered to your WhatsApp
          </p>
        </div>

      </form>
    </div>
  );
}