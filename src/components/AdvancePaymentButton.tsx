"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, CreditCard, Loader2, ArrowRight } from "lucide-react";

function loadPayHereScript(): Promise<void> {
  if (typeof window !== "undefined" && (window as any).payhere) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const existing = document.getElementById("payhere-sdk");
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("Failed to load PayHere script")));
      return;
    }
    const script = document.createElement("script");
    script.id = "payhere-sdk";
    script.src = "https://www.payhere.lk/lib/payhere.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load PayHere script"));
    document.head.appendChild(script);
  });
}

export default function AdvancePaymentButton() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agreedToPolicy, setAgreedToPolicy] = useState(false);
  const [formData, setFormData] = useState({
    price: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    country: "Sri Lanka",
  });

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) {
      loadPayHereScript().catch((err) => console.warn("PayHere lazy load notice:", err));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const numPrice = Number(formData.price);
  const isValidPrice = !isNaN(numPrice) && numPrice > 0;
  const processingFee = isValidPrice ? numPrice * 0.033 : 0;
  const totalAmount = isValidPrice ? numPrice + processingFee : 0;

  const initiatePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.price || !isValidPrice) return alert("Please enter a valid amount");
    if (!agreedToPolicy) return alert("Please accept the privacy policy to proceed");

    setLoading(true);
    const orderId = `ADV-${Date.now()}`;
    const amount = totalAmount.toFixed(2);
    const currency = "LKR";

    try {
      await loadPayHereScript();

      const res = await fetch("/api/payhere/hash", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, orderId, currency }),
      });
      const data = await res.json();
      if (!data.hash) throw new Error("Could not generate payment hash");

      const isSandbox = process.env.NEXT_PUBLIC_PAYHERE_URL?.includes("sandbox");
      const payment: any = {
        ...(isSandbox ? { sandbox: true } : {}),
        merchant_id: process.env.NEXT_PUBLIC_PAYHERE_MERCHANT_ID,
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/safari-packages`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/safari-packages`,
        notify_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payhere/notify`,
        order_id: orderId,
        items: "Advance Safari Payment",
        amount: amount,
        currency: currency,
        hash: data.hash,
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.city || "Yala National Park",
        city: formData.city || "Tissamaharama",
        country: formData.country || "Sri Lanka",
        custom_1: formData.email,
        custom_2: `${formData.firstName}|${formData.lastName}|${formData.phone}`
      };

      // @ts-ignore
      if (typeof window.payhere !== "undefined") {
        // @ts-ignore
        window.payhere.startPayment(payment);
        setOpen(false);
      } else {
        alert("Payment gateway failed to initialize. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Error initiating payment");
    } finally {
      setLoading(false);
    }
  };

  const inputClasses =
    "w-full bg-[#f8f9fa] rounded-xl px-3 py-2 text-base md:text-[13px] font-semibold text-[#1f1f1f] focus:outline-none focus:bg-[#f1f3f4] transition-colors placeholder:text-[#9aa0a6] placeholder:font-normal";
  const labelClasses = "block text-[14px] font-semibold text-[#5f6368] mb-1 tracking-wider";

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 bg-[#f8f9fa] hover:bg-[#00ff00] text-[#1f1f1f] hover:text-black px-4 py-2 rounded-full text-[18px] font-semibold tracking-wide transition-colors duration-150 active:scale-95 cursor-pointer"
        >
          <CreditCard className="w-3.5 h-3.5 shrink-0" />
          <span>Pay Advance</span>
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/20 backdrop-blur-xs z-50 animate-in fade-in duration-200" />

        <Dialog.Content
          className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-5 sm:p-6 rounded-[1.75rem] w-[90%] max-w-[370px] max-h-[90vh] overflow-y-auto z-50 text-[#1f1f1f] focus:outline-none animate-in zoom-in-95 duration-200"
          style={{
            fontFamily:
              '"Google Sans", "Open Sans", Roboto, -apple-system, BlinkMacSystemFont, Arial, sans-serif',
          }}
        >
          {/* Header */}
          <div className="text-center mb-4">
            <Dialog.Title className="text-base sm:text-lg font-bold tracking-tight text-[#1f1f1f] leading-snug">
              Secure Advance
            </Dialog.Title>
            <Dialog.Description className="text-[11px] font-semibold text-[#5f6368] leading-tight mt-1 max-w-[280px] mx-auto">
              Enter the customized amount agreed with our team to proceed via PayHere.
            </Dialog.Description>
          </div>

          <form onSubmit={initiatePayment} className="space-y-2.5">
            {/* Amount Input */}
            <div>
              <label className={labelClasses}>Advance Amount (LKR)</label>
              <input
                type="number"
                name="price"
                required
                min="1"
                step="0.01"
                placeholder="0.00"
                value={formData.price}
                onChange={handleChange}
                className={`${inputClasses} text-base md:text-[14px] font-bold text-[#1f1f1f]`}
              />
            </div>

            {/* Breakdown Mini Pill */}
            {isValidPrice && (
              <div className="bg-[#f8f9fa] rounded-xl p-2.5 text-[11px] font-semibold space-y-1">
                <div className="flex justify-between text-[#5f6368]">
                  <span>Deposit:</span>
                  <span className="text-[#1f1f1f]">
                    LKR {numPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between text-[#5f6368]">
                  <span>Fee (3.3%):</span>
                  <span className="text-[#1f1f1f]">
                    LKR {processingFee.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between pt-1 border-t border-[#e8eaed] text-[#1f1f1f] font-bold text-[11px]">
                  <span>Total:</span>
                  <span>
                    LKR {totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            )}

            {/* Names */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className={labelClasses}>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  required
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={inputClasses}
                />
              </div>
              <div>
                <label className={labelClasses}>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  required
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={inputClasses}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className={labelClasses}>Email</label>
              <input
                type="email"
                name="email"
                required
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>

            {/* WhatsApp / Phone */}
            <div>
              <label className={labelClasses}>WhatsApp / Phone</label>
              <input
                type="tel"
                name="phone"
                required
                placeholder="+94 7X XXX XXXX"
                value={formData.phone}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>

            {/* Privacy Policy Checkbox */}
            <div className="flex items-start gap-2 pt-1 pb-0.5">
              <input
                type="checkbox"
                id="privacy-policy"
                required
                checked={agreedToPolicy}
                onChange={(e) => setAgreedToPolicy(e.target.checked)}
                className="mt-0.5 w-3.5 h-3.5 rounded border-none bg-[#f8f9fa] accent-[#00ff00] cursor-pointer"
              />
              <label
                htmlFor="privacy-policy"
                className="text-[11px] font-semibold text-[#5f6368] leading-tight cursor-pointer select-none"
              >
                I agree to the{" "}
                <a
                  href="/legal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1f1f1f] underline hover:text-[#00c800]"
                >
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              disabled={loading || !agreedToPolicy}
              className="w-full mt-2 flex items-center justify-center gap-1.5 bg-[#00ff00] hover:brightness-105 active:scale-[0.99] text-black py-2.5 rounded-full text-[12px] font-bold transition-all cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : isValidPrice ? (
                <>
                  <span>Pay LKR {totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </>
              ) : (
                "Proceed to Payment"
              )}
            </button>

            {/* Gateway Logo */}
            <div className="flex justify-center pt-1">
              <img
                src="https://www.payhere.lk/downloads/images/payhere_long_banner.png"
                alt="PayHere Secure Gateway"
                className="h-4 object-contain opacity-80"
              />
            </div>
          </form>

          {/* Close Icon Button */}
          <Dialog.Close asChild>
            <button
              className="absolute top-4 right-4 w-6 h-6 rounded-full bg-[#f8f9fa] hover:bg-[#e8eaed] text-[#5f6368] hover:text-[#1f1f1f] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}