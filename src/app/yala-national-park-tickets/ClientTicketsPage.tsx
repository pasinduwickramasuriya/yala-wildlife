"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { countries } from "countries-list";
import Header from "@/components/Header";
import { AutoSEOWrapper } from "@/components/AutoSEOWrapper";
import {
  Calendar,
  Globe,
  Mail,
  MessageSquare,
  User,
  Ticket,
  Send,
  Plus,
  Minus,
  Loader2,
  ShieldCheck,
  Phone,
  Car,
  Users,
  Info,
  DollarSign,
  Briefcase,
  Layers,
  ArrowRight,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Pricing Constants in LKR (Locals & Vehicles only)
const RATES = {
  LOCAL_ADULT: 150,                     // LKR 150
  LOCAL_CHILD: 100,                     // LKR 100
  INFANT: 0,

  VEHICLE_JEEP: 300,                    // LKR 300
  VEHICLE_CAR: 150,                     // LKR 150
  VEHICLE_BUS: 500,                     // LKR 500

  SERVICE_LOCAL: 400,                   // LKR 400
  VAT_RATE: 0.18,                       // 18% VAT
};

export default function ClientTicketsPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  // Exchange Rate State (Real-time live fetch with standard fallback)
  const [exchangeRate, setExchangeRate] = useState(327);
  const [isLiveRate, setIsLiveRate] = useState(false);
  const [loadingRate, setLoadingRate] = useState(true);

  // --- 1. VISITOR COUNTS STATE ---
  const [foreignAdults, setForeignAdults] = useState(1);
  const [foreignChildren, setForeignChildren] = useState(0);
  const [saarcAdults, setSaarcAdults] = useState(0);
  const [saarcChildren, setSaarcChildren] = useState(0);
  const [localAdults, setLocalAdults] = useState(0);
  const [localChildren, setLocalChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  // Fetch real USD to LKR daily exchange rate on load
  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        setLoadingRate(true);
        const res = await fetch("https://open.er-api.com/v6/latest/USD");
        if (!res.ok) throw new Error("Exchange rate API response error");
        const data = await res.json();
        if (data && data.rates && data.rates.LKR) {
          setExchangeRate(data.rates.LKR);
          setIsLiveRate(true);
        }
      } catch (err) {
        console.error("Failed to fetch live exchange rate, using standard fallback (327 LKR/USD):", err);
        setExchangeRate(327);
        setIsLiveRate(false);
      } finally {
        setLoadingRate(false);
      }
    };
    fetchExchangeRate();
  }, []);

  // --- 2. VEHICLE COUNTS STATE ---
  const [jeeps, setJeeps] = useState(1);
  const [cars, setCars] = useState(0);
  const [buses, setBuses] = useState(0);

  // --- 3. GUEST INFO FORM STATE ---
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneCode, setPhoneCode] = useState("+94");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // --- 4. PREPARE COUNTRIES LIST ---
  const countryList = useMemo(() => {
    return Object.entries(countries)
      .map(([code, data]) => ({
        code,
        name: data.name,
        phoneCode: `+${data.phone}`,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  // Update phone code automatically when country changes
  useEffect(() => {
    if (country) {
      const matched = countryList.find((c) => c.name === country);
      if (matched) {
        setPhoneCode(matched.phoneCode);
      }
    }
  }, [country, countryList]);

  // --- 5. DWC FEE PRICING CALCULATION ---
  const pricing = useMemo(() => {
    // Dynamic foreign entry permit rates in LKR based on current exchange rate
    const foreignAdultRateLKR = 25 * exchangeRate; // Pegged to $25 USD
    const foreignChildRateLKR = 15 * exchangeRate; // Pegged to $15 USD
    const saarcAdultRateLKR = 20 * exchangeRate;   // Pegged to $20 USD
    const saarcChildRateLKR = 10 * exchangeRate;   // Pegged to $10 USD

    // Visitor Subtotals
    const entryFeesLKR =
      foreignAdults * foreignAdultRateLKR +
      foreignChildren * foreignChildRateLKR +
      saarcAdults * saarcAdultRateLKR +
      saarcChildren * saarcChildRateLKR +
      localAdults * RATES.LOCAL_ADULT +
      localChildren * RATES.LOCAL_CHILD;

    // Vehicle Subtotals
    const vehicleFeesLKR =
      jeeps * RATES.VEHICLE_JEEP +
      cars * RATES.VEHICLE_CAR +
      buses * RATES.VEHICLE_BUS;

    // Service Fee Subtotal
    const totalPassengers =
      foreignAdults +
      foreignChildren +
      saarcAdults +
      saarcChildren +
      localAdults +
      localChildren +
      infants;

    const hasForeigners =
      (foreignAdults + foreignChildren + saarcAdults + saarcChildren) > 0;

    let serviceFeeLKR = 0;
    if (totalPassengers > 0) {
      serviceFeeLKR = hasForeigners ? 10 * exchangeRate : RATES.SERVICE_LOCAL;
    }

    // Totals Math
    const subtotalLKR = entryFeesLKR + vehicleFeesLKR + serviceFeeLKR;
    const vatLKR = subtotalLKR * RATES.VAT_RATE;

    // LankaGate Gateway payment convenience fee (usually ~2% added at checkout)
    // const convenienceFeeLKR = (subtotalLKR + vatLKR) * 0.02;
    const convenienceFeeLKR = (subtotalLKR + vatLKR) * 0.1;
    const totalLKR = subtotalLKR + vatLKR + convenienceFeeLKR;

    // Convert LKR to USD for side-by-side display
    return {
      entryFeesLKR,
      entryFeesUSD: entryFeesLKR / exchangeRate,

      vehicleFeesLKR,
      vehicleFeesUSD: vehicleFeesLKR / exchangeRate,

      serviceFeeLKR,
      serviceFeeUSD: serviceFeeLKR / exchangeRate,

      subtotalLKR,
      subtotalUSD: subtotalLKR / exchangeRate,

      vatLKR,
      vatUSD: vatLKR / exchangeRate,

      convenienceFeeLKR,
      convenienceFeeUSD: convenienceFeeLKR / exchangeRate,

      totalLKR,
      totalUSD: totalLKR / exchangeRate,
    };
  }, [
    foreignAdults,
    foreignChildren,
    saarcAdults,
    saarcChildren,
    localAdults,
    localChildren,
    infants,
    jeeps,
    cars,
    buses,
    exchangeRate,
  ]);

  // --- 6. SUBMIT PERMIT RESERVATION ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setNotification(null);

    const fullPhone = `${phoneCode}${phoneNumber}`;
    const payload = {
      name,
      phone: fullPhone,
      email,
      date,
      country,
      message,
      // Visitor parameters
      foreignAdults,
      foreignChildren,
      saarcAdults,
      saarcChildren,
      localAdults,
      localChildren,
      infants,
      // Vehicle parameters
      jeeps,
      cars,
      buses,
      // Final pricing summary
      pricing,
    };

    try {
      const res = await fetch("/api/book-tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setNotification({
          type: "success",
          message: "Permit inquiry submitted successfully! Our agent will contact you shortly.",
        });
        // Clear non-essential fields
        setName("");
        setEmail("");
        setPhoneNumber("");
        setMessage("");
      } else {
        throw new Error("API responded with an error");
      }
    } catch (err) {
      console.error(err);
      setNotification({
        type: "error",
        message: "Failed to submit booking request. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const today = useMemo(() => new Date().toLocaleDateString("en-ca"), []);
  return (
    <>
      <Header />

      <main className="relative min-h-screen text-white bg-transparent selection:bg-[#00ff00] selection:text-black font-sans pb-16">

        {/* ================= BACKGROUND INTERCEPT ================= */}
        <div className="fixed inset-0 z-0">
          <Image
            src="/uploads/1748935199061-20250603_1239_Leopard Emerges from Darkness_simple_compose_01jwt9yv7qect8krxy794bcr23.webp"
            alt="Yala Leopard Emerging from Darkness"
            fill
            priority
            className="object-cover opacity-100 md:opacity-100"
            quality={75}
          />
          {/* Cinematic Gradients */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/5 to-black/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />
          {/* Noise Texture */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
        </div>

        {/* ================= CONTENT BODY ================= */}
        <div className="relative z-10 pt-32 px-4 md:px-8 max-w-7xl mx-auto">

          {/* Header Banner - Snippet Styled Tiny & Mini Pills Layout */}
          <div className="relative z-10 flex flex-col items-center gap-2 text-center mb-16 px-4 animate-in slide-in-from-bottom duration-1000 ease-out">
            {/* MAIN TITLE PILL */}
            <div className="inline-block bg-black/80 px-8 py-3.5 rounded-full shadow-2xl border border-white/5 backdrop-blur-sm transform-gpu">
              <h1 className="text-[15px] font-black text-white  tracking-[0.2em]">
                Permit Calculator
              </h1>
            </div>

            {/* DESCRIPTION PILL */}
            <div className="inline-block bg-black/80 px-8 py-5 rounded-[2rem] max-w-[850px] mx-auto shadow-2xl border border-white/5 backdrop-blur-sm transform-gpu">
              <p className="text-[15px] text-white/80 font-medium leading-relaxed italic">
                "Plan your park entry costs instantly. Replicating the Department of Wildlife Conservation (DWC) formulas with real-time tax breakdown."
              </p>
            </div>

            {/* 3. SMALLEST ACTION BUTTON */}
            <div className="inline-block">
              <Link
                href="/safari-packages"
                className="group flex items-center gap-2 bg-white text-black px-5 py-2 rounded-full shadow-lg hover:bg-[#00ff00] transition-all active:scale-95"
              >
                <span className="text-[10px] font-black uppercase tracking-widest">
                  Book Packages
                </span>
                <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Grid Layout: Left Inputs, Right Invoice Receipt */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* ================= LEFT COLUMN: CALCULATOR & DETAILS ================= */}
            {/* ================= LEFT COLUMN ================= */}
            <div className="lg:col-span-7 space-y-8">

              {/* Visitor Tiered Section */}
              <div className="backdrop-blur-md bg-black/80 rounded-[2.5rem] p-6 md:p-8 shadow-2xl relative overflow-hidden transform-gpu">

                <h2 className="text-[15px] font-black text-white tracking-[0.2em] mb-6 flex items-center gap-3">
                  <Users className="text-[#00ff00] w-5 h-5 shrink-0" />
                  <span>1. Select Visitor Group Details</span>
                </h2>

                <p className="text-[13px] text-white/80 font-medium leading-relaxed italic mb-6">
                  * Note: If you are going on a Yala safari with a private 4x4 jeep and driver-guide, it is mandatory to select at least 1 Local Adult (representing the driver-guide's entry ticket) and 1 Jeep.
                </p>

                <div className="space-y-6">
                  {/* Category Row: Foreigners */}
                  <div className="space-y-4">
                    <span className="text-[10px] font-black tracking-widest text-[#00ff00] block border-b border-white/5 pb-2">
                      Foreign Visitors (Non-SAARC)
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <CounterCard
                        id="cnt-foreign-adult"
                        title="Foreign Adults"
                        subtitle={`$25.00 / LKR ${(25 * exchangeRate).toLocaleString("en-US", { maximumFractionDigits: 0 })}`}
                        count={foreignAdults}
                        onInc={() => setForeignAdults((p) => p + 1)}
                        onDec={() => setForeignAdults((p) => Math.max(0, p - 1))}
                      />
                      <CounterCard
                        id="cnt-foreign-child"
                        title="Foreign Children"
                        subtitle={`6-12 yrs • $15.00 / LKR ${(15 * exchangeRate).toLocaleString("en-US", { maximumFractionDigits: 0 })}`}
                        count={foreignChildren}
                        onInc={() => setForeignChildren((p) => p + 1)}
                        onDec={() => setForeignChildren((p) => Math.max(0, p - 1))}
                      />
                    </div>
                  </div>

                  {/* Category Row: SAARC */}
                  <div className="space-y-4 pt-2">
                    <span className="text-[10px] font-black tracking-widest text-[#00ff00] block border-b border-white/5 pb-2">
                      SAARC Nationals
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <CounterCard
                        id="cnt-saarc-adult"
                        title="SAARC Adults"
                        subtitle={`$20.00 / LKR ${(20 * exchangeRate).toLocaleString("en-US", { maximumFractionDigits: 0 })}`}
                        count={saarcAdults}
                        onInc={() => setSaarcAdults((p) => p + 1)}
                        onDec={() => setSaarcAdults((p) => Math.max(0, p - 1))}
                      />
                      <CounterCard
                        id="cnt-saarc-child"
                        title="SAARC Children"
                        subtitle={`6-12 yrs • $10.00 / LKR ${(10 * exchangeRate).toLocaleString("en-US", { maximumFractionDigits: 0 })}`}
                        count={saarcChildren}
                        onInc={() => setSaarcChildren((p) => p + 1)}
                        onDec={() => setSaarcChildren((p) => Math.max(0, p - 1))}
                      />
                    </div>
                  </div>

                  {/* Category Row: Locals & Infants */}
                  <div className="space-y-4 pt-2">
                    <span className="text-[10px] font-black tracking-widest text-[#00ff00] block border-b border-white/5 pb-2">
                      Local Residents & Infants
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <CounterCard
                        id="cnt-local-adult"
                        title="Local Adults"
                        subtitle="LKR 150.00"
                        count={localAdults}
                        onInc={() => setLocalAdults((p) => p + 1)}
                        onDec={() => setLocalAdults((p) => Math.max(0, p - 1))}
                      />
                      <CounterCard
                        id="cnt-local-child"
                        title="Local Children"
                        subtitle="6-12 yrs • LKR 100.00"
                        count={localChildren}
                        onInc={() => setLocalChildren((p) => p + 1)}
                        onDec={() => setLocalChildren((p) => Math.max(0, p - 1))}
                      />
                      <CounterCard
                        id="cnt-infants"
                        title="Infants"
                        subtitle="Under 6 yrs • FREE"
                        count={infants}
                        onInc={() => setInfants((p) => p + 1)}
                        onDec={() => setInfants((p) => Math.max(0, p - 1))}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Vehicle Registration Section */}
              <div className="backdrop-blur-md bg-black/80 rounded-[2.5rem] p-6 md:p-8 shadow-2xl relative overflow-hidden transform-gpu">
                <h2 className="text-[15px] font-black text-white tracking-[0.2em] mb-6 flex items-center gap-3">
                  <Car className="text-[#00ff00] w-5 h-5 shrink-0" />
                  <span>2. Register Park Entry Vehicles</span>
                </h2>

                <p className="text-[15px] text-white/80 font-medium leading-relaxed italic mb-6">
                  Vehicles entering Yala National Park must pay a fixed trail admission charge.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <CounterCard
                    id="cnt-vehicle-jeep"
                    title="Jeeps / Vans"
                    subtitle="LKR 300.00"
                    count={jeeps}
                    onInc={() => setJeeps((p) => p + 1)}
                    onDec={() => setJeeps((p) => Math.max(0, p - 1))}
                  />
                  <CounterCard
                    id="cnt-vehicle-car"
                    title="Cars / SUVs"
                    subtitle="LKR 150.00"
                    count={cars}
                    onInc={() => setCars((p) => p + 1)}
                    onDec={() => setCars((p) => Math.max(0, p - 1))}
                  />
                  <CounterCard
                    id="cnt-vehicle-bus"
                    title="Buses / Lorries"
                    subtitle="LKR 500.00"
                    count={buses}
                    onInc={() => setBuses((p) => p + 1)}
                    onDec={() => setBuses((p) => Math.max(0, p - 1))}
                  />
                </div>
              </div>

              {/* Explicit Fee Formula Explanation */}
              <div className="backdrop-blur-md bg-black/80 rounded-[2.5rem] p-6 md:p-8 space-y-4 shadow-2xl transform-gpu">
                <div className="flex gap-3">
                  <Info className="text-[#00ff00] w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-[15px] font-black text-white tracking-[0.2em] leading-snug">The Official DWC Calculation Formula</h3>
                    <p className="text-[15px] text-white/80 font-medium leading-relaxed italic mt-1">
                      Permits are billed across four strict categories set by the Department of Wildlife Conservation (DWC):
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div className="bg-white/5 p-4 rounded-[1.5rem] space-y-1.5">
                    <span className="text-[10px] font-black tracking-widest text-[#00ff00] block">1. Entrance Fees</span>
                    <p className="text-[13px] text-white/80 font-medium leading-relaxed italic">
                      Determined strictly by age and nationality. Infants under 6 enter for free. SAARC nationals receive a moderate discount, and locals are heavily subsidized.
                    </p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-[1.5rem] space-y-1.5">
                    <span className="text-[10px] font-black tracking-widest text-[#00ff00] block">2. Vehicle Fees</span>
                    <p className="text-[13px] text-white/80 font-medium leading-relaxed italic">
                      Added for every vehicle entering the park boundary to maintain trails. Large tour buses/lorries pay a slightly higher charge.
                    </p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-[1.5rem] space-y-1.5">
                    <span className="text-[10px] font-black tracking-widest text-[#00ff00] block">3. Service Charge</span>
                    <p className="text-[13px] text-white/80 font-medium leading-relaxed italic">
                      Flat fee applied per group. Billed at <strong className="text-white">$10 USD</strong> if any foreigner is present, or <strong className="text-white">LKR 400</strong> for local-only groups.
                    </p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-[1.5rem] space-y-1.5">
                    <span className="text-[10px] font-black tracking-widest text-[#00ff00] block">4. 18% VAT</span>
                    <p className="text-[13px] text-white/80 font-medium leading-relaxed italic">
                      Sri Lankan VAT tax (18%) is applied directly on the combined subtotal of entry fees, vehicle admission charges, and the group service fee.
                    </p>
                  </div>
                </div>

                <div className="bg-[#00ff00]/10 p-4 rounded-[1.5rem] text-center backdrop-blur-sm transform-gpu">
                  <span className="font-mono text-[10px] text-[#00ff00] font-black tracking-widest block">
                    Subtotal = Passengers + Vehicle + Service Charge
                  </span>
                  <div className="h-px bg-[#00ff00]/10 my-2"></div>
                  <span className="font-mono text-[10px] text-[#00ff00] font-black tracking-widest block">
                    Permit Cost = Subtotal + 18% VAT + 2% Gateway Fee
                  </span>
                </div>
              </div>
            </div>

            {/* ================= RIGHT COLUMN: INVOICE & BOOKING FORM ================= */}
            <div className="lg:col-span-5 space-y-8">

              {/* LIVE INVOICE RECEIPT */}
              <div className="bg-black/90 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden group backdrop-blur-md transform-gpu">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>

                <div className="flex justify-between items-start mb-8">
                  <div>
                    <span className="text-[10px] font-black tracking-widest text-[#00ff00] block">
                      Permit Invoice Cost
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black tracking-widest text-white mt-1">
                      {pricing.totalLKR.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })} <span className="text-sm font-bold text-white/60">LKR</span>
                    </h2>
                    <span className="text-[13px] text-white/60 font-medium leading-relaxed italic block mt-1">
                      ~ ${pricing.totalUSD.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
                    </span>
                    <div className="mt-3 flex items-center gap-1.5 bg-white/5 w-fit px-3 py-1 rounded-full text-[10px] font-black tracking-widest text-white/80 leading-none">
                      <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", isLiveRate ? "bg-emerald-400 animate-pulse" : "bg-neutral-600")} />
                      <span>
                        {isLiveRate ? `Live Rate: 1 USD = ${exchangeRate.toFixed(2)} LKR` : `Rate: 1 USD = 327 LKR`}
                      </span>
                    </div>
                  </div>
                  <ShieldCheck size={48} className="text-[#00ff00] opacity-20 shrink-0" />
                </div>

                <div className="space-y-4 font-medium uppercase tracking-tight text-xs border-b border-white/10 pb-6 mb-6">
                  <InvoiceLine
                    label="Entry Fees Subtotal"
                    lkr={pricing.entryFeesLKR}
                    usd={pricing.entryFeesUSD}
                  />
                  <InvoiceLine
                    label="Vehicle Fees Subtotal"
                    lkr={pricing.vehicleFeesLKR}
                    usd={pricing.vehicleFeesUSD}
                  />
                  <InvoiceLine
                    label="Mandatory Service Fee"
                    lkr={pricing.serviceFeeLKR}
                    usd={pricing.serviceFeeUSD}
                  />
                  <div className="bg-white/5 h-[1px] my-2"></div>
                  <div className="flex justify-between font-black text-[13px] tracking-widest text-white">
                    <span>Invoice Subtotal</span>
                    <div className="text-right">
                      <span className="text-sm font-black">{pricing.subtotalLKR.toLocaleString("en-US")} LKR</span>
                      <span className="text-[10px] text-white/50 font-medium leading-relaxed italic block mt-0.5">({pricing.subtotalUSD.toLocaleString("en-US", { maximumFractionDigits: 1 })} USD)</span>
                    </div>
                  </div>
                  <InvoiceLine
                    label="Government VAT (18%)"
                    lkr={pricing.vatLKR}
                    usd={pricing.vatUSD}
                    italic
                  />
                  <InvoiceLine
                    label="Gateway Convenience Surcharge (2%)"
                    lkr={pricing.convenienceFeeLKR}
                    usd={pricing.convenienceFeeUSD}
                    italic
                  />
                </div>

                <div className="space-y-3 text-[13px] text-white/80 font-medium leading-relaxed italic">
                  <div className="flex gap-2">
                    <div className="w-1 h-1 rounded-full bg-[#00ff00] shrink-0 mt-2"></div>
                    <p>Prices based on Department of Wildlife Conservation (DWC) official regulations.</p>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-1 h-1 rounded-full bg-[#00ff00] shrink-0 mt-2"></div>
                    <p>
                      {isLiveRate
                        ? `Real-time exchange rate utilized: 1 USD = ${exchangeRate.toFixed(2)} LKR.`
                        : "Standard exchange rate fallback utilized: 1 USD = 327 LKR."
                      }
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-1 h-1 rounded-full bg-[#00ff00] shrink-0 mt-2"></div>
                    <p>Gateway fee represents online transaction processing cost (2%).</p>
                  </div>
                  <div className="flex gap-2 text-amber-300 bg-amber-500/10 p-3 rounded-[1.5rem] mt-2 not-italic">
                    <Info size={14} className="shrink-0 mt-0.5 text-amber-300" />
                    <p className="leading-relaxed"><strong>Excludes Jeep Hire:</strong> This ticket booking is for government entry permits only. Private 4x4 safari jeep hire and drivers are separate fees.</p>
                  </div>
                </div>
              </div>

              {/* TICKET RESERVATION GUEST FORM */}
              <div className="backdrop-blur-md bg-black/80 rounded-[2.5rem] p-6 md:p-8 shadow-2xl relative transform-gpu">

                <div className="mb-6">
                  <h3 className="text-[15px] font-black text-white tracking-[0.2em] flex items-center gap-2">
                    <Ticket className="text-[#00ff00] w-5 h-5 shrink-0" />
                    <span>Secure Your Permits</span>
                  </h3>
                  <p className="text-[15px] text-white/80 font-medium leading-relaxed italic mt-1.5">
                    Submit your booking. We will handle reservation verification and logistics.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">

                  {/* Name Input */}
                  <InputField icon={<User size={16} />} label="Full Name">
                    <input
                      required
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="form-input"
                      placeholder="Enter your name"
                    />
                  </InputField>

                  {/* Country Input */}
                  <InputField icon={<Globe size={16} />} label="Country / Region">
                    <select
                      required
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="form-input appearance-none cursor-pointer [color-scheme:dark]"
                    >
                      <option value="">Select your country</option>
                      {countryList.map((c) => (
                        <option key={c.code} value={c.name} className="bg-neutral-900">
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </InputField>

                  {/* Email Input */}
                  <InputField icon={<Mail size={16} />} label="Email Address">
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-input"
                      placeholder="email@example.com"
                    />
                  </InputField>

                  {/* Phone Input */}
                  <InputField icon={<Phone size={16} />} label="Phone Number">
                    <div className="flex items-center">
                      <span className="text-white font-semibold font-mono text-xs mr-4 opacity-75 shrink-0">
                        {phoneCode}
                      </span>
                      <input
                        required
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
                        className="form-input"
                        placeholder="Number"
                      />
                    </div>
                  </InputField>

                  {/* Date Input */}
                  <div className="space-y-1.5 group">
                    <div className="flex items-center gap-2 opacity-50 group-focus-within:opacity-100 transition-opacity duration-300">
                      <Calendar size={16} className="text-white/60 group-focus-within:text-[#00ff00] transition-colors flex items-center justify-center shrink-0" />
                      <span className="text-[10px] font-black tracking-[0.2em] text-white/60">
                        Safari Date
                      </span>
                    </div>
                    <div className="bg-white/5 hover:bg-white/10 p-4 rounded-[1rem] flex items-center gap-4 relative transition-all duration-300">
                      <input
                        required
                        type="date"
                        min={today}
                        value={date}
                        onChange={(e) => {
                          setDate(e.target.value);
                          e.target.blur();
                        }}
                        className="form-input border-none !p-0 !m-0 [color-scheme:dark] w-full"
                      />
                    </div>
                  </div>

                  {/* Notes / Messages */}
                  <div className="bg-white/5 hover:bg-white/10 p-4 rounded-[1.5rem] transition-all duration-300 group">
                    <div className="flex items-center gap-2 mb-3 opacity-50 group-focus-within:opacity-100 transition-opacity duration-300">
                      <MessageSquare size={14} className="text-white/60 group-focus-within:text-[#00ff00] transition-colors flex items-center justify-center shrink-0" />
                      <span className="text-[10px] font-black tracking-[0.2em] text-white/60">
                        Special Requests (Optional)
                      </span>
                    </div>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-transparent text-white text-[16px] md:text-[13px] font-semibold outline-none resize-none placeholder:text-white/20"
                      placeholder="Add special instructions, vehicle specs or group notes..."
                    />
                  </div>

                  {/* Submission triggers */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-white hover:bg-[#00ff00] text-black font-black py-4 rounded-full text-[10px] tracking-widest uppercase hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg group"
                  >
                    {isSubmitting ? (
                      <Loader2 className="animate-spin" size={18} />
                    ) : (
                      <>
                        Request Permit Tickets
                        <Send size={14} className="group-hover:translate-x-1.5 transition-transform duration-500" />
                      </>
                    )}
                  </button>

                  {notification && (
                    <div
                      className={cn(
                        "p-5 rounded-3xl text-sm font-semibold text-center animate-in zoom-in-95 border-none",
                        notification.type === "success"
                          ? "bg-green-950/20 text-[#00ff00]"
                          : "bg-red-950/20 text-red-400"
                      )}
                    >
                      {notification.message}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* ================= AUTO SEO CONTENT BLOCK ================= */}
        <AutoSEOWrapper
          pageTitle="Official Yala National Park Ticket Fees & Permit Calculator 2026/2027"
          pageDescription="Official 2026/2027 Yala National Park day entry permits online. Calculate DWC government passenger fees, vehicle admission charges, and 18% VAT dynamically in USD & LKR. Skip the line!"
          pageType="other"
        >
          <div className="container mx-auto px-4 py-16 relative">
            <section className="mt-8 flex flex-col items-center gap-2 animate-in slide-in-from-bottom duration-1000 ease-out">

              {/* 1. TINY TITLE ISLAND */}
              <div className="inline-block bg-black/80 backdrop-blur-md border border-white/5 px-4 py-1.5 rounded-full shadow-2xl">
                <h2 className="text-[15px] font-black text-white tracking-[0.2em]">
                  Permit Fees & Info
                </h2>
              </div>

              {/* 2. MINI DESCRIPTION PILL */}
              <div className="inline-block bg-black/80 backdrop-blur-md border border-white/5 px-6 py-5 rounded-[2rem] max-w-[720px] text-center shadow-2xl space-y-4">
                <p className="text-[15px] text-white/80 font-medium leading-relaxed italic">
                  Understand the official <strong>Department of Wildlife Conservation (DWC)</strong> entry permits. Our calculator mimics official portal logic grouping passenger tiers, vehicle fees, and the mandatory 18% VAT.
                </p>
                <p className="text-[14px] sm:text-[15px] text-white/80 font-medium leading-relaxed">
                  Submit your guest distribution to get an instant LKR/USD estimation. Our team secures the booking so you can skip the gate queues at Palatupana or Katagamuwa entirely.
                </p>
                <div className="w-12 h-px bg-white/10 mx-auto my-3"></div>
                <p className="text-[11px] text-white/40 italic font-medium">
                  Disclaimer: Represents government-mandated permit rates only. Excludes private safari jeep rentals and independent tracker tips.
                </p>
              </div>

              {/* 3. SMALLEST ACTION BUTTON */}
              <div className="inline-block mt-2">
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="group flex items-center gap-2 bg-white text-black px-5 py-2 rounded-full shadow-lg hover:bg-[#00ff00] transition-all active:scale-95"
                >
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    Calculate Now
                  </span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

              {/* ================= COMPACT OFFICIAL KEYWORD FAQ SECTION ================= */}
              <div className="mt-14 max-w-3xl w-full mx-auto space-y-6 animate-in fade-in slide-in-from-bottom duration-1000">
                <div className="text-center space-y-1">
                  <div className="inline-block bg-black/80 backdrop-blur-sm border border-white/5 px-3 py-1 rounded-full">
                    <span className="text-[10px] font-black text-[#00ff00] tracking-[0.25em]">
                      Official FAQ Desk
                    </span>
                  </div>
                  <h3 className="text-[15px] md:text-[15px] font-black text-white tracking-wide">
                    Frequently Asked Questions
                  </h3>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      q: "How do I buy Yala National Park tickets online?",
                      a: "You can calculate and request your official Yala National Park entry permits online directly using our dynamic DWC calculator. Input your visitor details, submit the booking inquiry, and our agents will secure the government permits in advance. This ensures a seamless entrance, letting you skip the long ticket counter lines entirely!"
                    },
                    {
                      q: "What is the Yala National Park entrance ticket price for foreigners?",
                      a: "For foreign visitors (Non-SAARC), the official day entrance permit fee is $25 USD for adults and $15 USD for children (6-12 years). Infants under 6 enter free of charge. Our portal dynamically converts these USD prices to LKR at the live daily exchange rate for transparent side-by-side calculation."
                    },
                    {
                      q: "Is the private safari jeep rental cost included in the ticket calculator?",
                      a: "No. The calculator computes only the official DWC government park permit charges (passenger entry tickets, vehicle trail fees, and mandatory government service charges plus 18% VAT). Private 4x4 safari jeep hire, driver services, and independent tracker tips must be booked separately."
                    },
                    {
                      q: "Do I need to book my Yala safari entry permits in advance?",
                      a: "Yes. Booking in advance is highly recommended for all visitors—especially international tourists—to ensure smooth clearance. Having your official permits prepared beforehand guarantees a stress-free experience, allowing you to bypass the gate counter queues at Palatupana or Katagamuwa and spend more time searching for leopards."
                    },
                    {
                      q: "What are the official ticket counter opening hours at Yala?",
                      a: "The Department of Wildlife Conservation (DWC) ticket offices at Palatupana Gate (Block 1 & 2) and Katagamuwa Gate (Block 2) operate daily from 6:00 AM to 6:00 PM. We strongly recommend securing your digital permits online before arrival to ensure seamless early-morning entry when wildlife tracking is optimal."
                    },
                    {
                      q: "Is there a discounted entrance fee for SAARC nationals?",
                      a: "Yes. SAARC adults pay a discounted government rate of $20 USD, while SAARC children aged 6 to 12 are charged $10 USD. Valid passport verification matching the registered booking details is required at the entry check-point to utilize these discounted tickets."
                    },
                    {
                      q: "Are there additional costs for half-day vs full-day safari permits?",
                      a: "Yes. Full-day safari permits include a slightly higher fixed vehicle admission and unified service fee, since the vehicle stays on trails for up to 12 hours. The DWC calculates this automatically based on hours of trail usage."
                    },
                    {
                      q: "What is the VAT rate and government service fee breakdown?",
                      a: "All official Yala permits are subject to a mandatory 18% Value Added Tax (VAT). Additionally, a unified government service charge is added per permit group ($10 USD equivalent for foreign visitor groups or LKR 400 for local groups), which our calculator handles dynamically."
                    }
                  ].map((faq, idx) => {
                    const isOpen = activeFaq === idx;
                    return (
                      <div
                        key={idx}
                        className="bg-black/60 backdrop-blur-md border border-white/5 rounded-[1.2rem] overflow-hidden transition-all duration-300 transform-gpu"
                      >
                        <button
                          type="button"
                          onClick={() => setActiveFaq(isOpen ? null : idx)}
                          className="w-full flex items-center justify-between px-5 py-4 text-left text-white hover:text-[#00ff00] transition-colors"
                        >
                          <span className="text-[13px] font-bold tracking-wide italic">
                            {faq.q}
                          </span>
                          <span className={`text-[15px] font-black leading-none ml-4 transition-transform duration-300 ${isOpen ? 'rotate-45 text-[#00ff00]' : 'text-white/40'}`}>
                            +
                          </span>
                        </button>
                        <div
                          className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[250px] opacity-100 border-t border-white/5' : 'max-h-0 opacity-0 pointer-events-none'}`}
                        >
                          <p className="px-5 py-4 text-[12.5px] text-white/70 font-medium leading-relaxed italic">
                            {faq.a}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </section>
          </div>
        </AutoSEOWrapper>
      </main>

      {/* Form input styling */}
      <style jsx global>{`
        .form-input {
          background: rgba(255, 255, 255, 0.05);
          width: 100%;
          font-size: 16px; /* Prevents auto-zoom on mobile safari */
          font-weight: 600;
          color: #ffffff;
          padding: 12px 16px;
          outline: none;
          border: none;
          border-radius: 16px;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @media (min-width: 768px) {
          .form-input {
            font-size: 13px; /* Original cute small size on desktop */
          }
        }
        .form-input:focus {
          background: rgba(255, 255, 255, 0.08);
          padding-left: 18px;
        }
        select.form-input {
          padding-right: 32px;
        }
      `}</style>
    </>
  );
}

// --- MICRO-COMPONENTS ---

interface CounterCardProps {
  id: string;
  title: string;
  subtitle: string;
  count: number;
  onInc: () => void;
  onDec: () => void;
}

function CounterCard({ id, title, subtitle, count, onInc, onDec }: CounterCardProps) {
  return (
    <div className="bg-white/5 hover:bg-white/10 p-4 rounded-[1.5rem] flex items-center justify-between transition-all duration-300 shadow-md">
      <div className="space-y-1 text-left">
        <span className="text-[13px] font-black text-white tracking-[0.15em] block">{title}</span>
        <span className="text-[11px] text-white/70 font-medium leading-relaxed italic block mt-0.5">{subtitle}</span>
      </div>

      <div className="flex items-center gap-4 bg-black px-2.5 py-1.5 rounded-full">
        <button
          id={`${id}-dec`}
          type="button"
          onClick={onDec}
          className="text-neutral-400 hover:text-[#00ff00] transition-colors p-1 flex items-center justify-center"
        >
          <Minus size={12} />
        </button>
        <span className="text-[13px] font-black text-white font-mono w-4 text-center leading-none">
          {count}
        </span>
        <button
          id={`${id}-inc`}
          type="button"
          onClick={onInc}
          className="text-neutral-400 hover:text-[#00ff00] transition-colors p-1 flex items-center justify-center"
        >
          <Plus size={12} />
        </button>
      </div>
    </div>
  );
}

interface InputFieldProps {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}

function InputField({ icon, label, children }: InputFieldProps) {
  return (
    <div className="flex flex-col group space-y-1.5">
      <div className="flex items-center gap-2 opacity-50 group-focus-within:opacity-100 transition-opacity duration-300">
        <div className="text-white/60 group-focus-within:text-[#00ff00] transition-colors flex items-center justify-center">{icon}</div>
        <span className="text-[10px] font-black tracking-[0.2em] text-white/60 group-focus-within:text-white transition-colors">
          {label}
        </span>
      </div>
      {children}
    </div>
  );
}

interface InvoiceLineProps {
  label: string;
  lkr: number;
  usd: number;
  italic?: boolean;
}

function InvoiceLine({ label, lkr, usd, italic = false }: InvoiceLineProps) {
  return (
    <div
      className={cn(
        "flex justify-between border-b border-white/5 pb-2 text-white/85 text-[13px] font-medium leading-relaxed italic tracking-wide",
        italic && "text-white/50"
      )}
    >
      <span>{label}</span>
      <div className="text-right">
        <span className="font-black text-white tracking-widest">{lkr.toLocaleString("en-US")} LKR</span>
        <span className="text-[10px] text-white/50 font-medium leading-relaxed italic block mt-0.5">({usd.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD)</span>
      </div>
    </div>
  );
}
