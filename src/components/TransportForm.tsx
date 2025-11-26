



"use client";

import { useState, useMemo } from "react";
import {
    MapPin, Navigation, Calendar, Clock, User, Phone, Mail,
    Car, Bus, Send, Loader2, CheckCircle2, ShieldCheck, ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { countries } from "countries-list";

// --- CONFIG ---
const VEHICLES = [
    { id: "car", name: "Private Sedan", seats: 3, luggage: 2, price: "Best Rate" },
    { id: "van", name: "Luxury KDH Van", seats: 9, luggage: 8, price: "Best Value" },
];

const DEFAULT_PHONE_CODE = "+94";

export default function TransportForm() {

    // Memoize country list
    const countryList = useMemo(() => {
        return Object.entries(countries).map(([code, data]) => ({
            code,
            name: data.name,
            phoneCode: `+${data.phone}`
        })).sort((a, b) => a.name.localeCompare(b.name));
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
            // ✅ CONNECTED TO API ROUTE
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
            setFormData(initialFormState); // Clear form on success

        } catch (error) {
            console.error("Submission Error:", error);
            setErrorMsg("Failed to send request. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // --- SUCCESS SCREEN (Full Overlay) ---
    if (isSuccess) {
        return (
            <div className="h-full min-h-[550px] flex flex-col items-center justify-center text-center p-8 rounded-3xl bg-black/60 backdrop-blur-2xl border border-green-500/30 animate-in fade-in zoom-in duration-300 shadow-2xl">
                <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(34,197,94,0.4)] animate-pulse">
                    <CheckCircle2 size={48} className="text-green-400" />
                </div>

                <h3 className="text-3xl font-black text-white mb-2 tracking-tight">Request <span className="text-green-400">Received</span></h3>

                <div className="space-y-4 mb-8 max-w-xs text-neutral-300 text-sm font-light leading-relaxed">
                    <p>We have received your transport details.</p>
                    <p className="bg-green-500/10 border border-green-500/20 p-3 rounded-lg text-green-100">
                        Our logistics team is calculating the <strong className="text-green-400">Lowest Market Rate</strong> for your route.
                    </p>
                    <p>We will contact you via <span className="text-white font-bold">WhatsApp/Email shortly</span> with the full pricing details.</p>
                </div>

                <button
                    onClick={() => setIsSuccess(false)}
                    className="group flex items-center gap-2 bg-white/5 hover:bg-green-500/20 border border-white/10 hover:border-green-500 text-white px-6 py-3 rounded-xl transition-all duration-300"
                >
                    <span className="text-xs font-bold uppercase tracking-widest">Book Return Trip</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        );
    }

    // --- MAIN FORM ---
    return (
        <div className="relative rounded-3xl border border-green-500/20 bg-black/40 backdrop-blur-xl p-1 shadow-2xl ring-1 ring-white/5">
            <div className="rounded-[1.3rem] bg-black/40 p-6 md:p-8 border border-white/5">

                {/* Header */}
                <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]"></span>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-green-400">Transport Logistics</span>
                    </div>
                    <ShieldCheck size={14} className="text-neutral-500" />
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* --- LOCATION --- */}
                    <div className="space-y-4 relative">
                        <div className="absolute left-[19px] top-[45px] bottom-[45px] w-px bg-gradient-to-b from-green-500/50 to-neutral-700/30 border-l border-dashed border-green-500/30 z-0"></div>

                        <InputGroup icon={<MapPin size={16} className="text-green-400" />} label="Pick-up Location">
                            <input
                                required type="text" placeholder="Airport, Hotel, or City..."
                                className="w-full bg-transparent text-white text-sm px-4 py-3.5 outline-none placeholder:text-neutral-600"
                                value={formData.pickupLocation}
                                onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                            />
                        </InputGroup>

                        <InputGroup icon={<Navigation size={16} className="text-red-400" />} label="Drop-off Location">
                            <input
                                required type="text" placeholder="Yala National Park, Villa..."
                                className="w-full bg-transparent text-white text-sm px-4 py-3.5 outline-none placeholder:text-neutral-600"
                                value={formData.dropoffLocation}
                                onChange={(e) => setFormData({ ...formData, dropoffLocation: e.target.value })}
                            />
                        </InputGroup>
                    </div>

                    {/* --- DATE & TIME --- */}
                    <div className="grid grid-cols-2 gap-4">
                        <InputGroup icon={<Calendar size={16} />} label="Date">
                            <input
                                required type="date" min={new Date().toISOString().split("T")[0]}
                                className="w-full bg-transparent text-white text-sm px-4 py-3.5 outline-none [color-scheme:dark]"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            />
                        </InputGroup>
                        <InputGroup icon={<Clock size={16} />} label="Time">
                            <input
                                required type="time"
                                className="w-full bg-transparent text-white text-sm px-4 py-3.5 outline-none [color-scheme:dark]"
                                value={formData.time}
                                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                            />
                        </InputGroup>
                    </div>

                    {/* --- VEHICLE SELECTION --- */}
                    <div>
                        <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-2 block ml-1">Select Fleet Class</label>
                        <div className="grid grid-cols-2 gap-3">
                            {VEHICLES.map((v) => (
                                <div
                                    key={v.id}
                                    onClick={() => setFormData({ ...formData, vehicle: v.id })}
                                    className={cn(
                                        "cursor-pointer relative p-3 rounded-xl border transition-all duration-300 backdrop-blur-md",
                                        formData.vehicle === v.id
                                            ? "bg-green-500/10 border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.2)]"
                                            : "bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/10"
                                    )}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        {v.id === 'car' ? <Car size={20} className={formData.vehicle === v.id ? "text-green-400" : "text-neutral-400"} /> : <Bus size={20} className={formData.vehicle === v.id ? "text-green-400" : "text-neutral-400"} />}
                                        {formData.vehicle === v.id && <CheckCircle2 size={14} className="text-green-500" />}
                                    </div>
                                    <div className="text-sm font-bold text-white">{v.name}</div>
                                    <div className="text-[10px] text-neutral-400 mt-1 flex gap-2 font-mono">
                                        <span>👤{v.seats}</span>
                                        <span className="text-neutral-600">|</span>
                                        <span>🧳{v.luggage}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-6"></div>

                    {/* --- CUSTOMER DETAILS --- */}
                    <div className="space-y-4">
                        <InputGroup icon={<User size={16} />} label="Your Name">
                            <input
                                required type="text" placeholder="Full Name"
                                className="w-full bg-transparent text-white text-sm px-4 py-3.5 outline-none placeholder:text-neutral-600"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </InputGroup>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* PHONE NUMBER WITH COUNTRY CODE */}
                            <div className="group relative z-10">
                                <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-1.5 block ml-1 transition-colors group-focus-within:text-green-400">WhatsApp / Mobile</label>
                                <div className="flex gap-2">
                                    <div className="relative w-[85px] flex items-center bg-black/40 backdrop-blur-md rounded-xl overflow-hidden border border-white/10 group-focus-within:border-green-500/60 group-focus-within:shadow-[0_0_15px_rgba(34,197,94,0.1)] transition-all duration-300">
                                        <select
                                            className="w-full h-full bg-transparent text-white text-xs text-center px-1 py-3.5 outline-none appearance-none cursor-pointer [&>option]:bg-neutral-900"
                                            value={formData.phoneCode}
                                            onChange={(e) => setFormData({ ...formData, phoneCode: e.target.value })}
                                        >
                                            {countryList.map((c) => (
                                                <option key={`${c.code}-${c.phoneCode}`} value={c.phoneCode}>
                                                    {c.code} {c.phoneCode}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="relative flex-1 flex items-center bg-black/40 backdrop-blur-md rounded-xl overflow-hidden border border-white/10 group-focus-within:border-green-500/60 group-focus-within:shadow-[0_0_15px_rgba(34,197,94,0.1)] transition-all duration-300">
                                        <div className="pl-4 text-neutral-500 group-focus-within:text-white transition-colors"><Phone size={16} /></div>
                                        <input
                                            required type="tel" placeholder="Mobile Num"
                                            className="w-full bg-transparent text-white text-sm px-4 py-3.5 outline-none placeholder:text-neutral-600"
                                            value={formData.phoneNumber}
                                            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value.replace(/\D/g, "") })}
                                        />
                                    </div>
                                </div>
                            </div>

                            <InputGroup icon={<Mail size={16} />} label="Email">
                                <input
                                    required type="email" placeholder="Email Address"
                                    className="w-full bg-transparent text-white text-sm px-4 py-3.5 outline-none placeholder:text-neutral-600"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </InputGroup>
                        </div>
                    </div>

                    {/* ERROR MESSAGE */}
                    {errorMsg && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center p-3 rounded-xl">
                            {errorMsg}
                        </div>
                    )}

                    {/* SUBMIT */}
                    <div className="space-y-3">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm uppercase tracking-widest shadow-[0_0_20px_rgba(22,163,74,0.4)] hover:shadow-[0_0_40px_rgba(34,197,94,0.6)] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? <Loader2 className="animate-spin" /> : <>Get Quote & Book <Send size={14} /></>}
                        </button>

                        {/* Pricing Note */}
                        <p className="text-[10px] text-neutral-500 text-center font-mono tracking-wide">
                            * We guarantee the best market rates. Final price confirmed via WhatsApp.
                        </p>
                    </div>

                </form>
            </div>
        </div>
    );
}

// --- Sub Component ---
const InputGroup = ({ icon, label, children }: { icon: React.ReactNode, label: string, children: React.ReactNode }) => (
    <div className="group relative z-10">
        <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-1.5 block ml-1 transition-colors group-focus-within:text-green-400">{label}</label>
        <div className="relative flex items-center bg-black/40 backdrop-blur-md rounded-xl overflow-hidden border border-white/10 group-focus-within:border-green-500/60 group-focus-within:shadow-[0_0_15px_rgba(34,197,94,0.1)] transition-all duration-300">
            <div className="pl-4 text-neutral-500 group-focus-within:text-white transition-colors">{icon}</div>
            {children}
        </div>
    </div>
);