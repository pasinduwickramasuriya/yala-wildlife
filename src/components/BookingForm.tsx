"use client";

import { useState, useEffect } from "react";
import { countries } from "countries-list";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
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

export default function BookingForm({ tourPackage }: { tourPackage: string }) {
  const [formData, setFormData] = useState<BookingData>({
    name: "",
    phoneCode: "+94", // Default to Sri Lanka
    phoneNumber: "",
    email: "",
    date: "",
    country: "",
    tourPackage,
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<Notification>(null);

  // Log to confirm this version is running
  useEffect(() => {
    console.log("BookingForm v2 loaded - deduplicated phone codes");
  }, []);

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

  // Deduplicate phone codes by keeping only the first occurrence
  const countryList = Object.entries(countries)
    .map(([code, data]) => ({
      code,
      name: data.name,
      phoneCode: `+${data.phone}`,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  // Create a unique phone code list
  const phoneCodeList = Array.from(
    new Map(countryList.map((country) => [country.phoneCode, country])).values()
  );

  // Log phone codes for debugging
  useEffect(() => {
    console.log("Phone codes rendered:", phoneCodeList.map((c) => `${c.phoneCode} (${c.code})`));
    // Changed: Added phoneCodeList to dependency array to fix react-hooks/exhaustive-deps
  }, [phoneCodeList]);

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="max-w-2xl mx-auto p-6 bg-card rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
        Book Your Adventure
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            placeholder="Enter your full name"
          />
        </div>

        {/* Phone */}
        <div>
          <Label htmlFor="phoneCode">Phone Number</Label>
          <div className="flex gap-2">
            <Select
              value={formData.phoneCode}
              onValueChange={(value) => setFormData({ ...formData, phoneCode: value })}
            >
              <SelectTrigger className="w-1/3">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {phoneCodeList.map((country) => (
                  <SelectItem key={country.code} value={country.phoneCode}>
                    {country.phoneCode}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              id="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value.replace(/\D/g, "") })}
              required
              className="w-2/3"
              placeholder="Enter your phone number"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            placeholder="Enter your email"
          />
        </div>

        {/* Date */}
        <div>
          <Label htmlFor="date">Preferred Date</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
            min={today}
          />
        </div>

        {/* Country */}
        <div>
          <Label htmlFor="country">Country</Label>
          <Select
            value={formData.country}
            onValueChange={(value) => setFormData({ ...formData, country: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select your country" />
            </SelectTrigger>
            <SelectContent>
              {countryList.map((country) => (
                <SelectItem key={country.code} value={country.name}>
                  {country.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Tour Package */}
        <div>
          <Label htmlFor="tourPackage">Tour Package</Label>
          <Input
            id="tourPackage"
            type="text"
            value={formData.tourPackage}
            disabled
            className="bg-muted"
          />
        </div>

        {/* Message */}
        <div>
          <Label htmlFor="message">Message (Optional)</Label>
          <Textarea
            id="message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            rows={3}
            placeholder="Any additional details?"
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:bg-muted"
        >
          {loading ? "Submitting..." : "Submit Booking"}
        </Button>

        {/* Notification */}
        {notification && (
          <div
            className={cn(
              "mt-4 p-2 text-center rounded-md",
              notification.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-destructive/20 text-destructive"
            )}
          >
            {notification.message}
          </div>
        )}
      </form>
    </div>
  );
}