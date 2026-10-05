"use client";

import { useState, useMemo, useEffect, useRef, memo } from "react";
import Link from "next/link";
import { countries } from "countries-list";
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
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Pricing Constants in LKR (Locals & Vehicles only)
const RATES = {
  LOCAL_ADULT: 150,
  LOCAL_CHILD: 100,
  INFANT: 0,
  VEHICLE_JEEP: 300,
  VEHICLE_CAR: 150,
  VEHICLE_BUS: 500,
  SERVICE_LOCAL: 400,
  VAT_RATE: 0.18,
};

export default function ClientTicketsPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Exchange Rate State
  const [exchangeRate, setExchangeRate] = useState(330);
  const [isLiveRate, setIsLiveRate] = useState(false);

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
    let isMounted = true;
    const fetchExchangeRate = async () => {
      try {
        const res = await fetch("https://open.er-api.com/v6/latest/USD");
        if (!res.ok) throw new Error("Exchange rate API response error");
        const data = await res.json();
        if (isMounted && data?.rates?.LKR) {
          setExchangeRate(data.rates.LKR);
          setIsLiveRate(true);
        }
      } catch {
        if (isMounted) {
          setExchangeRate(327);
          setIsLiveRate(false);
        }
      }
    };
    fetchExchangeRate();
    return () => {
      isMounted = false;
    };
  }, []);

  // --- 2. VEHICLE COUNTS STATE ---
  const [jeeps, setJeeps] = useState(1);
  const [cars, setCars] = useState(0);
  const [buses, setBuses] = useState(0);

  // Auto-calculate minimum jeeps based on total passengers
  const totalPassengersCount =
    foreignAdults +
    foreignChildren +
    saarcAdults +
    saarcChildren +
    localAdults +
    localChildren +
    infants;

  const minJeepsRequired =
    totalPassengersCount > 0 ? Math.max(1, Math.ceil(totalPassengersCount / 8)) : 0;

  useEffect(() => {
    setJeeps(minJeepsRequired);
  }, [minJeepsRequired]);

  // --- 3. UNCONTROLLED GUEST INFO FORM REFS ---
  const formRef = useRef<HTMLFormElement>(null);
  const [phoneCode, setPhoneCode] = useState("+94");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

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

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = countryList.find((c) => c.name === e.target.value);
    if (selected) {
      setPhoneCode(selected.phoneCode);
    }
  };

  // --- 5. DWC FEE PRICING CALCULATION ---
  const pricing = useMemo(() => {
    const foreignAdultRateLKR = 25 * exchangeRate;
    const foreignChildRateLKR = 15 * exchangeRate;
    const saarcAdultRateLKR = 20 * exchangeRate;
    const saarcChildRateLKR = 10 * exchangeRate;

    const entryFeesLKR =
      foreignAdults * foreignAdultRateLKR +
      foreignChildren * foreignChildRateLKR +
      saarcAdults * saarcAdultRateLKR +
      saarcChildren * saarcChildRateLKR +
      localAdults * RATES.LOCAL_ADULT +
      localChildren * RATES.LOCAL_CHILD;

    const vehicleFeesLKR =
      jeeps * RATES.VEHICLE_JEEP +
      cars * RATES.VEHICLE_CAR +
      buses * RATES.VEHICLE_BUS;

    const totalPassengers =
      foreignAdults +
      foreignChildren +
      saarcAdults +
      saarcChildren +
      localAdults +
      localChildren +
      infants;

    const hasForeigners =
      foreignAdults + foreignChildren + saarcAdults + saarcChildren > 0;

    let serviceFeeLKR = 0;
    if (totalPassengers > 0) {
      serviceFeeLKR =
        (hasForeigners ? 10 * exchangeRate : RATES.SERVICE_LOCAL) *
        (jeeps + cars + buses);
    }

    const subtotalLKR = entryFeesLKR + vehicleFeesLKR + serviceFeeLKR;
    const vatLKR = subtotalLKR * RATES.VAT_RATE;
    const convenienceFeeLKR = (subtotalLKR + vatLKR) * 0.1;
    const totalLKR = subtotalLKR + vatLKR + convenienceFeeLKR;

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
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSubmitting(true);
    setNotification(null);

    const formData = new FormData(formRef.current);
    const rawNumber = (formData.get("phoneNumber") as string)?.replace(/\D/g, "") ?? "";
    const fullPhone = `${phoneCode}${rawNumber}`;

    const payload = {
      name: formData.get("name"),
      phone: fullPhone,
      email: formData.get("email"),
      date: formData.get("date"),
      country: formData.get("country"),
      message: formData.get("message"),
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
          message:
            "Permit inquiry submitted successfully! Our team will contact you shortly.",
        });
        formRef.current.reset();
      } else {
        throw new Error("API error");
      }
    } catch {
      setNotification({
        type: "error",
        message: "Failed to submit booking request. Please check your connection and retry.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const today = useMemo(() => new Date().toLocaleDateString("en-ca"), []);

  return (
    <>
      <main
        className="w-full bg-white text-[#1f1f1f] selection:bg-[#00ff00] selection:text-black antialiased overflow-x-hidden"
        style={{
          fontFamily:
            '"Google Sans", "Open Sans", Roboto, -apple-system, BlinkMacSystemFont, Arial, sans-serif',
        }}
        role="main"
      >
        <div className="pt-28 sm:pt-32 pb-20 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto flex flex-col gap-12 sm:gap-16 bg-white">
          {/* =========================================
              HEADER SECTION (GOOGLE PILL + CENTERED)
          ========================================= */}
          <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto bg-white">
            <h1 className="text-4xl sm:text-5xl lg:text-5xl font-bold text-[#1f1f1f] tracking-tight leading-tight mb-4">
              Park Entry Permit Calculator
            </h1>

            <p className="text-[18px] text-[#5f6368] font-semibold leading-relaxed mb-6">
              Plan your park entry costs instantly. Replicating Department of Wildlife Conservation (DWC) formulas with real-time tax breakdowns.
            </p>

            <Link
              href="/safari-packages"
              className="inline-flex items-center gap-2 bg-[#f8f9fa] hover:bg-[#00ff00] text-black font-bold text-[18px] px-8 py-3.5 rounded-full transition-colors duration-150 active:scale-95 shadow-none"
            >
              <span>Explore Safari Packages</span>
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </Link>
          </div>

          {/* =========================================
              MAIN INTERACTIVE GRID
          ========================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-white">
            {/* ================= LEFT COLUMN: CALCULATOR & DETAILS ================= */}
            <div className="lg:col-span-7 flex flex-col gap-6 bg-white">
              {/* Visitor Tiered Section */}
              <div className="bg-[#f8f9fa] rounded-[2.25rem] p-6 sm:p-8 flex flex-col [contain:paint]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-[#1f1f1f] shrink-0">
                    <Users className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#1f1f1f] tracking-tight">
                    1. Select Visitor Group
                  </h2>
                </div>

                <p className="text-[18px] text-[#5f6368] font-semibold leading-relaxed mb-6">
                  * Note: If visiting with a private 4x4 safari jeep, it is mandatory to include at least 1 Local Adult (for your driver-guide&apos;s entry) and 1 Jeep.
                </p>

                <div className="space-y-6">
                  {/* Category: Foreigners */}
                  <div className="space-y-3">
                    <span className="text-[18px] font-bold uppercase tracking-wider text-[#5f6368] block">
                      Foreign Visitors (Non-SAARC)
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

                  {/* Category: SAARC */}
                  <div className="space-y-3">
                    <span className="text-[18px] font-bold uppercase tracking-wider text-[#5f6368] block">
                      SAARC Nationals
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

                  {/* Category: Locals & Infants */}
                  <div className="space-y-3">
                    <span className="text-[18px] font-bold uppercase tracking-wider text-[#5f6368] block">
                      Local Residents & Infants
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
                        subtitle="6-12 yrs • LKR 100"
                        count={localChildren}
                        onInc={() => setLocalChildren((p) => p + 1)}
                        onDec={() => setLocalChildren((p) => Math.max(0, p - 1))}
                      />
                      <CounterCard
                        id="cnt-infants"
                        title="Infants"
                        subtitle="Under 6 yrs • Free"
                        count={infants}
                        onInc={() => setInfants((p) => p + 1)}
                        onDec={() => setInfants((p) => Math.max(0, p - 1))}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Vehicle Registration Section */}
              <div className="bg-[#f8f9fa] rounded-[2.25rem] p-6 sm:p-8 flex flex-col [contain:paint]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-[#1f1f1f] shrink-0">
                    <Car className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#1f1f1f] tracking-tight">
                    2. Register Entry Vehicles
                  </h2>
                </div>

                <p className="text-[18px] text-[#5f6368] font-semibold leading-relaxed mb-6">
                  Vehicles entering Yala National Park pay a fixed trail admission charge.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <CounterCard
                    id="cnt-vehicle-jeep"
                    title="Jeeps /Vans"
                    subtitle="LKR 300.00"
                    count={jeeps}
                    onInc={() => setJeeps((p) => p + 1)}
                    onDec={() => setJeeps((p) => Math.max(minJeepsRequired, p - 1))}
                  />
                  <CounterCard
                    id="cnt-vehicle-car"
                    title="Cars /SUVs"
                    subtitle="LKR 150.00"
                    count={cars}
                    onInc={() => setCars((p) => p + 1)}
                    onDec={() => setCars((p) => Math.max(0, p - 1))}
                  />
                  <CounterCard
                    id="cnt-vehicle-bus"
                    title="Buses /Lorries"
                    subtitle="LKR 500.00"
                    count={buses}
                    onInc={() => setBuses((p) => p + 1)}
                    onDec={() => setBuses((p) => Math.max(0, p - 1))}
                  />
                </div>
              </div>

              {/* Explicit Fee Formula Explanation */}
              <div className="bg-[#f8f9fa] rounded-[2.25rem] p-6 sm:p-8 flex flex-col gap-5 [contain:paint]">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-[#1f1f1f] shrink-0">
                    <Info className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#1f1f1f] tracking-tight">
                      Official DWC Formula Breakdown
                    </h3>
                    <p className="text-[18px] text-[#5f6368] font-semibold leading-relaxed mt-1">
                      Permits are billed across four strict categories set by the Department of Wildlife Conservation:
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-white p-5 rounded-2xl flex flex-col gap-1">
                    <span className="text-[18px] font-bold uppercase tracking-wider text-[#1f1f1f]">
                      1. Entrance Fees
                    </span>
                    <p className="text-[18px] text-[#5f6368] font-semibold leading-relaxed">
                      Determined by age and nationality. Under 6 enter free. SAARC visitors receive a moderate discount.
                    </p>
                  </div>
                  <div className="bg-white p-5 rounded-2xl flex flex-col gap-1">
                    <span className="text-[18px] font-bold uppercase tracking-wider text-[#1f1f1f]">
                      2. Vehicle Fees
                    </span>
                    <p className="text-[18px] text-[#5f6368] font-semibold leading-relaxed">
                      Assessed per registered vehicle entering park trails. Tour buses pay a slightly higher trail rate.
                    </p>
                  </div>
                  <div className="bg-white p-5 rounded-2xl flex flex-col gap-1">
                    <span className="text-[18px] font-bold uppercase tracking-wider text-[#1f1f1f]">
                      3. Service Charge
                    </span>
                    <p className="text-[18px] text-[#5f6368] font-semibold leading-relaxed">
                      Flat group fee: $10 USD equivalent if any foreigner is present, or LKR 400 for local groups.
                    </p>
                  </div>
                  <div className="bg-white p-5 rounded-2xl flex flex-col gap-1">
                    <span className="text-[18px] font-bold uppercase tracking-wider text-[#1f1f1f]">
                      4. 18% VAT Tax
                    </span>
                    <p className="text-[18px] text-[#5f6368] font-semibold leading-relaxed">
                      Applied directly to the combined subtotal of entry permits, vehicle fees, and the group service charge.
                    </p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl text-center">
                  <span className="text-[18px] font-bold text-[#1f1f1f] tracking-wide block">
                    Permit Cost = Subtotal + 18% VAT + 2% Gateway Surcharge
                  </span>
                </div>
              </div>
            </div>

            {/* ================= RIGHT COLUMN: INVOICE & FORM ================= */}
            <div className="lg:col-span-5 flex flex-col gap-6 bg-white">
              {/* LIVE INVOICE RECEIPT */}
              <div className="bg-[#f8f9fa] rounded-[2.25rem] p-6 sm:p-8 flex flex-col [contain:paint]">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-[18px] font-bold uppercase tracking-wider text-[#5f6368] block">
                      Permit Estimate Cost
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1f1f1f] mt-1">
                      {pricing.totalLKR.toLocaleString("en-US", {
                        maximumFractionDigits: 0,
                      })}{" "}
                      <span className="text-xl font-semibold text-[#5f6368]">LKR</span>
                    </h2>
                    <span className="text-[18px] text-[#5f6368] font-semibold block mt-1">
                      ~ ${pricing.totalUSD.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
                    </span>
                    <div className="mt-3 inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full text-[18px] font-bold text-[#1f1f1f]">
                      <span className={cn("w-2.5 h-2.5 rounded-full", isLiveRate ? "bg-[#00ff00]" : "bg-[#5f6368]")} />
                      <span>
                        {isLiveRate
                          ? `Live: 1 USD = ${exchangeRate.toFixed(2)} LKR`
                          : `Standard: 1 USD = 327 LKR`}
                      </span>
                    </div>
                  </div>
                  <ShieldCheck size={40} className="text-[#1f1f1f]" />
                </div>

                <div className="space-y-4 border-y border-[#e8eaed] py-5 mb-5">
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
                  <div className="flex justify-between font-bold text-[18px] text-[#1f1f1f] pt-1">
                    <span>Invoice Subtotal</span>
                    <div className="text-right">
                      <span>{pricing.subtotalLKR.toLocaleString("en-US")} LKR</span>
                      <span className="text-[18px] text-[#5f6368] font-medium block">
                        (${pricing.subtotalUSD.toLocaleString("en-US", { maximumFractionDigits: 1 })} USD)
                      </span>
                    </div>
                  </div>
                  <InvoiceLine
                    label="Government VAT (18%)"
                    lkr={pricing.vatLKR}
                    usd={pricing.vatUSD}
                  />
                  <InvoiceLine
                    label="Gateway Surcharge (2%)"
                    lkr={pricing.convenienceFeeLKR}
                    usd={pricing.convenienceFeeUSD}
                  />
                </div>

                <div className="space-y-2 text-[18px] text-[#5f6368] font-semibold leading-relaxed">
                  <p>• Prices calculated according to official DWC gazette regulations.</p>
                  <p>• Online booking fee handles queue bypass reservation prep.</p>
                  <div className="p-4 bg-white rounded-xl text-[#1f1f1f] font-semibold text-[18px] mt-3">
                    <strong>Excludes Jeep Hire:</strong> This booking covers official park entry permits only. Private 4x4 safari jeep hire and drivers are arranged separately.
                  </div>
                </div>
              </div>

              {/* TICKET RESERVATION GUEST FORM */}
              <div className="bg-[#f8f9fa] rounded-[2.25rem] p-6 sm:p-8 flex flex-col [contain:paint]">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-[#1f1f1f] tracking-tight flex items-center gap-2">
                    <Ticket className="w-6 h-6 text-[#1f1f1f]" />
                    <span>Secure Your Permits</span>
                  </h3>
                  <p className="text-[18px] text-[#5f6368] font-semibold mt-1">
                    Submit your details and our desk will secure your entry reservation.
                  </p>
                </div>

                <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                  {/* Name Input */}
                  <InputField icon={<User size={18} />} label="Full Name">
                    <input
                      name="name"
                      required
                      type="text"
                      autoComplete="name"
                      className="form-input"
                      placeholder="e.g. Jane Smith"
                    />
                  </InputField>

                  {/* Country Input */}
                  <InputField icon={<Globe size={18} />} label="Country / Region">
                    <select
                      name="country"
                      required
                      onChange={handleCountryChange}
                      className="form-input appearance-none cursor-pointer"
                      defaultValue=""
                    >
                      <option value="" disabled>Select your country</option>
                      {countryList.map((c) => (
                        <option key={c.code} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </InputField>

                  {/* Email Input */}
                  <InputField icon={<Mail size={18} />} label="Email Address">
                    <input
                      name="email"
                      required
                      type="email"
                      autoComplete="email"
                      className="form-input"
                      placeholder="name@example.com"
                    />
                  </InputField>

                  {/* Phone Input */}
                  <InputField icon={<Phone size={18} />} label="Phone Number">
                    <div className="flex items-center gap-2">
                      <span className="text-[#1f1f1f] font-bold text-[18px] shrink-0 px-3 py-3 bg-white rounded-xl">
                        {phoneCode}
                      </span>
                      <input
                        name="phoneNumber"
                        required
                        type="tel"
                        autoComplete="tel"
                        className="form-input flex-1"
                        placeholder="77 123 4567"
                      />
                    </div>
                  </InputField>

                  {/* Date Input */}
                  <InputField icon={<Calendar size={18} />} label="Safari Date">
                    <input
                      name="date"
                      required
                      type="date"
                      min={today}
                      className="form-input w-full cursor-pointer"
                    />
                  </InputField>

                  {/* Notes / Messages */}
                  <InputField icon={<MessageSquare size={18} />} label="Special Requests (Optional)">
                    <textarea
                      name="message"
                      rows={3}
                      className="form-input min-h-[110px] resize-none"
                      placeholder="Add vehicle preferences, timing, or special notes..."
                    />
                  </InputField>

                  {/* Submission triggers */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#000000] hover:bg-[#00ff00] text-white hover:text-black font-bold py-4 rounded-full text-[18px] transition-colors duration-150 active:scale-95 flex items-center justify-center gap-2 cursor-pointer shadow-none mt-2"
                  >
                    {isSubmitting ? (
                      <Loader2 className="animate-spin w-5 h-5 stroke-[2.5]" />
                    ) : (
                      <>
                        <span>Request Permit Tickets</span>
                        <Send size={18} className="stroke-[2.5]" />
                      </>
                    )}
                  </button>

                  {notification && (
                    <div
                      className={cn(
                        "p-4 rounded-2xl text-[18px] font-semibold text-center mt-2",
                        notification.type === "success"
                          ? "bg-[#e6f4ea] text-[#137333]"
                          : "bg-[#fce8e6] text-[#c5221f]"
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

        {/* ================= AUTO SEO & FAQ BLOCK ================= */}
        <AutoSEOWrapper
          pageTitle="Official Yala National Park Ticket Fees & Permit Calculator 2026/2027"
          pageDescription="Official 2026/2027 Yala National Park day entry permits online. Calculate DWC government passenger fees, vehicle admission charges, and 18% VAT dynamically in USD & LKR. Skip the line!"
          pageType="other"
        >
          <section className="w-full bg-white text-[#1f1f1f] py-16 px-4 sm:px-8 border-t border-[#f1f3f4] [content-visibility:auto] [contain-intrinsic-size:1px_400px]">
            <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1f1f1f] tracking-tight mb-4">
                Permit Fees & Park Information
              </h2>

              <p className="text-[18px] text-[#5f6368] font-semibold leading-relaxed mb-10 max-w-3xl">
                Understand official Department of Wildlife Conservation (DWC) entry permits. Our calculator mimics official gateway logic grouping passenger tiers, vehicle charges, and the mandatory 18% VAT.
              </p>

              {/* FAQ Section */}
              <div className="w-full flex flex-col gap-3 text-left">
                {[
                  {
                    q: "How do I buy Yala National Park tickets online?",
                    a: "You can calculate and request your official Yala National Park entry permits online directly using our dynamic DWC calculator. Input your visitor details, submit the booking inquiry, and our agents will secure the government permits in advance so you can skip the gate counter queues entirely.",
                  },
                  {
                    q: "What is the Yala National Park entrance ticket price for foreigners?",
                    a: "For foreign visitors (Non-SAARC), the official day entrance permit fee is $25 USD for adults and $15 USD for children (6-12 years). Infants under 6 enter free of charge. Our portal dynamically converts these USD prices to LKR at the live daily exchange rate for transparent side-by-side calculation.",
                  },
                  {
                    q: "Is private safari jeep rental cost included in the ticket calculator?",
                    a: "No. The calculator computes only the official DWC government park permit charges (passenger entry tickets, vehicle trail fees, and mandatory government service charges plus 18% VAT). Private 4x4 safari jeep hire, driver services, and tracker tips are booked separately.",
                  },
                  {
                    q: "Do I need to book my Yala safari entry permits in advance?",
                    a: "Yes. Booking in advance is highly recommended for all visitors to ensure smooth clearance. Having your official permits prepared beforehand allows you to bypass the gate counter queues at Palatupana or Katagamuwa and spend more time inside the park.",
                  },
                  {
                    q: "What are the official ticket counter opening hours at Yala?",
                    a: "The Department of Wildlife Conservation (DWC) ticket offices at Palatupana Gate (Block 1 & 2) and Katagamuwa Gate (Block 2) operate daily from 6:00 AM to 6:00 PM. We strongly recommend securing your digital permits before arrival to ensure seamless early-morning tracking.",
                  },
                  {
                    q: "Is there a discounted entrance fee for SAARC nationals?",
                    a: "Yes. SAARC adults pay a discounted government rate of $20 USD, while SAARC children aged 6 to 12 are charged $10 USD. Valid passport verification matching the registered booking details is required at the entry check-point to utilize these discounted tickets.",
                  },
                ].map((faq, idx) => {
                  const isOpen = activeFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="bg-[#f8f9fa] rounded-2xl overflow-hidden transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => setActiveFaq(isOpen ? null : idx)}
                        className="w-full flex items-center justify-between p-5 text-left text-[#1f1f1f] hover:text-black font-bold text-[18px] transition-colors cursor-pointer"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={cn(
                            "w-6 h-6 shrink-0 text-[#5f6368] transition-transform duration-200",
                            isOpen && "rotate-180 text-black"
                          )}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-5 pt-1 text-[18px] text-[#5f6368] font-semibold leading-relaxed">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </AutoSEOWrapper>
      </main>

      {/* Styled clean native inputs */}
      <style jsx global>{`
        .form-input {
          background-color: #ffffff;
          width: 100%;
          font-size: 18px;
          font-weight: 500;
          color: #1f1f1f;
          padding: 14px 18px;
          outline: none;
          border: none;
          border-radius: 14px;
          transition: background-color 0.15s ease;
        }
        .form-input:focus {
          background-color: #f1f3f4;
        }
        .form-input::placeholder {
          color: #9aa0a6;
          font-weight: 400;
          font-size: 18px;
        }
      `}</style>
    </>
  );
}

// --- OPTIMIZED MICRO-COMPONENTS ---

interface CounterCardProps {
  id: string;
  title: string;
  subtitle: string;
  count: number;
  onInc: () => void;
  onDec: () => void;
}

const CounterCard = memo(function CounterCard({
  id,
  title,
  subtitle,
  count,
  onInc,
  onDec,
}: CounterCardProps) {
  return (
    <div className="bg-white p-4 rounded-2xl flex items-center justify-between transition-colors [contain:paint]">
      <div className="flex flex-col text-left">
        <span className="text-[18px] font-bold text-[#1f1f1f] block leading-tight">
          {title}
        </span>
        <span className="text-[14px] text-[#5f6368] font-semibold block mt-0.5">
          {subtitle}
        </span>
      </div>

      <div className="flex items-center gap-3 bg-[#f8f9fa] px-3 py-2 rounded-full shrink-0">
        <button
          id={`${id}-dec`}
          type="button"
          onClick={onDec}
          className="text-[#1f1f1f] hover:text-black transition-colors p-1 flex items-center justify-center cursor-pointer active:scale-95"
          aria-label={`Decrease ${title}`}
        >
          <Minus size={16} strokeWidth={2.5} />
        </button>
        <span className="text-[18px] font-bold text-[#1f1f1f] font-mono w-5 text-center leading-none">
          {count}
        </span>
        <button
          id={`${id}-inc`}
          type="button"
          onClick={onInc}
          className="text-[#1f1f1f] hover:text-black transition-colors p-1 flex items-center justify-center cursor-pointer active:scale-95"
          aria-label={`Increase ${title}`}
        >
          <Plus size={16} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
});

interface InputFieldProps {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}

function InputField({ icon, label, children }: InputFieldProps) {
  return (
    <div className="flex flex-col gap-1.5 text-left">
      <div className="flex items-center gap-2 px-1 text-[18px] font-bold text-[#1f1f1f]">
        <span className="text-[#5f6368]">{icon}</span>
        <span>{label}</span>
      </div>
      {children}
    </div>
  );
}

interface InvoiceLineProps {
  label: string;
  lkr: number;
  usd: number;
}

function InvoiceLine({ label, lkr, usd }: InvoiceLineProps) {
  return (
    <div className="flex justify-between items-center text-[#5f6368] text-[18px] font-semibold">
      <span>{label}</span>
      <div className="text-right">
        <span className="font-bold text-[#1f1f1f]">
          {lkr.toLocaleString("en-US", { maximumFractionDigits: 0 })} LKR
        </span>
        <span className="text-[18px] text-[#5f6368] block">
          (${usd.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD)
        </span>
      </div>
    </div>
  );
}