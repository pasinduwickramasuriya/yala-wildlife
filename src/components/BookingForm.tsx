

"use client";

import { useState, useEffect } from "react";
import { countries } from "countries-list";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BookingData {
  name: string;
  phoneCode: string;
  phoneNumber: string;
  email: string;
  date: string;
  country: string;
  tourPackage: string;
  message: string;
}

type Notification = {
  type: "success" | "error";
  message: string;
} | null;

const Emoji = ({ symbol, label }: { symbol: string; label: string }) => (
  <span role="img" aria-label={label} className="inline-block mr-2">
    {symbol}
  </span>
);

export default function BookingForm({ tourPackage }: { tourPackage: string }) {
  const [formData, setFormData] = useState<BookingData>({
    name: "",
    phoneCode: "+94",
    phoneNumber: "",
    email: "",
    date: "",
    country: "",
    tourPackage,
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<Notification>(null);

  useEffect(() => {
    console.log("BookingForm v7 loaded - iOS zoom fix applied");
  }, []);

  // Create country list
  const countryList = Object.entries(countries)
    .map(([code, data]) => ({
      code,
      name: data.name,
      phoneCode: `+${data.phone}`,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  // Create unique phone code list
  const phoneCodeList = Array.from(
    new Map(countryList.map((country) => [country.phoneCode, country])).values()
  );

  // FIXED: Auto-update phone code when country changes
  useEffect(() => {
    if (formData.country) {
      const selectedCountry = countryList.find(
        (country) => country.name === formData.country
      );
      if (selectedCountry && selectedCountry.phoneCode !== formData.phoneCode) {
        setFormData((prev) => ({
          ...prev,
          phoneCode: selectedCountry.phoneCode,
        }));
      }
    }
    // FIXED: Added formData.phoneCode to dependency array to resolve react-hooks/exhaustive-deps warning
    // This prevents potential infinite loops and ensures the effect runs when phoneCode changes
  }, [formData.country, formData.phoneCode, countryList]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setNotification(null);

    const fullPhone = `${formData.phoneCode}${formData.phoneNumber}`;
    const submissionData = { ...formData, phone: fullPhone };

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });

      if (res.ok) {
        setNotification({
          type: "success",
          message: "Booking submitted! Check your email for confirmation.",
        });
        setFormData({
          name: "",
          phoneCode: "+94",
          phoneNumber: "",
          email: "",
          date: "",
          country: "",
          tourPackage,
          message: "",
        });
      } else {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to submit booking");
      }
    } catch (error) {
      console.error("Booking error:", error);
      setNotification({
        type: "error",
        message: error instanceof Error ? error.message : "Failed to submit booking.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="w-full max-w-xs mx-auto p-4 bg-black/20 backdrop-blur-md rounded-3xl shadow-2xl
                    sm:max-w-sm sm:p-6 
                    md:max-w-md md:p-8
                    lg:max-w-lg">
      <h2 className="text-lg font-bold text-white mb-6 text-center flex items-center justify-center gap-2
                     sm:text-xl sm:mb-8
                     md:text-xl">
        <Emoji symbol="🎯" label="target" />
        Book Your Adventure
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        {/* Full Name */}
        <div className="space-y-1 sm:space-y-2">
          <label htmlFor="name" className="text-white font-semibold text-sm flex items-center">
            <Emoji symbol="👤" label="person" />
            Full Name
          </label>
          <input
            id="name"
            type="text"
            required
            placeholder="Enter your full name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full rounded-full bg-white/10 backdrop-blur-sm text-white px-4 py-3 text-base
                     placeholder-green-400 outline-none border border-white/20
                     focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:bg-white/20
                     hover:bg-white/15 transition-all duration-200"
          />
        </div>

        {/* Country */}
        <div className="space-y-1 sm:space-y-2">
          <label htmlFor="country" className="text-white font-semibold text-sm flex items-center">
            <Emoji symbol="🌍" label="globe" />
            Country
          </label>
          <select
            id="country"
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            className="w-full rounded-full bg-white/10 backdrop-blur-sm text-white px-4 py-3 text-base
                     outline-none border border-white/20 appearance-none cursor-pointer
                     focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:bg-white/20
                     hover:bg-white/15 transition-all duration-200"
          >
            <option value="" disabled className="text-green-400 bg-black/80">
              Select your country
            </option>
            {countryList.map((country) => (
              <option key={country.code} value={country.name} className="bg-black/90 text-white">
                {country.name}
              </option>
            ))}
          </select>
        </div>

        {/* Phone Number */}
        <div className="space-y-1 sm:space-y-2">
          <label htmlFor="phoneCode" className="text-white font-semibold text-sm flex items-center">
            <Emoji symbol="📱" label="phone" />
            Phone Number
          </label>
          <div className="flex gap-2 sm:gap-3">
            <select
              value={formData.phoneCode}
              onChange={(e) => setFormData({ ...formData, phoneCode: e.target.value })}
              className="w-1/3 rounded-full bg-white/10 backdrop-blur-sm text-white px-3 py-3 text-base
                       outline-none border border-white/20 cursor-pointer appearance-none
                       focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:bg-white/20
                       hover:bg-white/15 transition-all duration-200"
            >
              {phoneCodeList.map((country) => (
                <option key={country.code} value={country.phoneCode} className="bg-black/90 text-white">
                  {country.phoneCode}
                </option>
              ))}
            </select>
            <input
              id="phoneNumber"
              type="tel"
              required
              placeholder="Enter phone number"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value.replace(/\D/g, "") })}
              className="w-2/3 rounded-full bg-white/10 backdrop-blur-sm text-white px-4 py-3 text-base
                       placeholder-green-400 outline-none border border-white/20
                       focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:bg-white/20
                       hover:bg-white/15 transition-all duration-200"
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-1 sm:space-y-2">
          <label htmlFor="email" className="text-white font-semibold text-sm flex items-center">
            <Emoji symbol="📧" label="email" />
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full rounded-full bg-white/10 backdrop-blur-sm text-white px-4 py-3 text-base
                     placeholder-green-400 outline-none border border-white/20
                     focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:bg-white/20
                     hover:bg-white/15 transition-all duration-200"
          />
        </div>

        {/* Date */}
        <div className="space-y-1 sm:space-y-2">
          <label htmlFor="date" className="text-white font-semibold text-sm flex items-center">
            <Emoji symbol="📅" label="calendar" />
            Date
          </label>
          <input
            id="date"
            type="date"
            required
            min={today}
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full rounded-full bg-white/10 backdrop-blur-sm text-white px-4 py-3 text-base
                     outline-none border border-white/20 [color-scheme:dark]
                     focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:bg-white/20
                     hover:bg-white/15 transition-all duration-200"
          />
        </div>

        {/* Tour Package */}
        <div className="space-y-1 sm:space-y-2">
          <label htmlFor="tourPackage" className="text-white font-semibold text-sm flex items-center">
            <Emoji symbol="🎫" label="ticket" />
            Tour Package
          </label>
          <input
            id="tourPackage"
            type="text"
            disabled
            value={formData.tourPackage}
            className="w-full rounded-full bg-white/5 backdrop-blur-sm text-green-400 px-4 py-3 text-base
                     cursor-not-allowed border border-white/10"
          />
        </div>

        {/* Message */}
        <div className="space-y-1 sm:space-y-2">
          <label htmlFor="message" className="text-white font-semibold text-sm flex items-center">
            <Emoji symbol="💬" label="message" />
            Message (Optional)
          </label>
          <textarea
            id="message"
            rows={3}
            placeholder="Any additional details?"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full rounded-2xl bg-white/10 backdrop-blur-sm text-white px-4 py-3 text-base
                     placeholder-green-400 outline-none resize-none border border-white/20
                     focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:bg-white/20
                     hover:bg-white/15 transition-all duration-200"
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={loading}
          className={cn(
            "w-full rounded-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 text-base",
            "transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]",
            "disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100",
            "shadow-lg hover:shadow-green-500/25"
          )}
        >
          {loading ? "Submitting..." : "Submit Booking"}
        </Button>

        {/* Notification */}
        {notification && (
          <div
            className={cn(
              "mt-4 p-3 text-center rounded-2xl font-semibold text-base transition-all duration-300",
              notification.type === "success"
                ? "bg-green-600/90 backdrop-blur-sm text-white"
                : "bg-black/90 backdrop-blur-sm text-white ring-2 ring-green-500"
            )}
          >
            {notification.message}
          </div>
        )}
      </form>
    </div>
  );
}
