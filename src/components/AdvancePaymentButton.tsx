"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, CreditCard, Loader2 } from "lucide-react";

export default function AdvancePaymentButton() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    price: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    country: "Sri Lanka",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const initiatePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.price || isNaN(Number(formData.price))) return alert("Please enter a valid price");

    setLoading(true);
    const orderId = `ADV-${Date.now()}`;
    const amount = Number(formData.price).toFixed(2);
    const currency = "LKR";

    try {
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
        alert("PayHere script is not loaded");
      }
    } catch (error) {
      console.error(error);
      alert("Error initiating payment");
    } finally {
      setLoading(false);
    }
  };

  // Common input class to prevent iOS zoom and keep it "cute"
  // Note: text-base (16px) prevents auto-zoom on mobile
  const inputClasses = "w-full bg-[#1a1a1a] border border-white/5 rounded-xl px-3 py-2 text-base md:text-sm focus:outline-none focus:ring-1 focus:ring-[#00ff00] transition-all placeholder:text-neutral-600";
  const labelClasses = "block text-[10px] uppercase text-neutral-500 mb-1 ml-1 font-bold tracking-widest";

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-full font-bold uppercase text-[11px] tracking-widest hover:bg-[#00ff00] transition-all active:scale-95 shadow-lg">
          <CreditCard className="w-4 h-4" />
          Advance Payment
        </button>
      </Dialog.Trigger>
      
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-md z-50 animate-in fade-in duration-300" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0a0a0a] p-6 rounded-[2rem] w-[92%] max-w-[360px] z-50 text-white focus:outline-none animate-in zoom-in-95 duration-200">
          
          <div className="text-center mb-5">
            <Dialog.Title className="text-lg font-black uppercase tracking-tighter text-[#00ff00]">Secure Advance</Dialog.Title>
            <Dialog.Description className="text-neutral-500 text-[11px] leading-tight mt-1">
              Custom safari expedition deposit.Enter the custom advance amount instructed by our team and fill out your details to securely pay via PayHere.
            </Dialog.Description>
          </div>

          <form onSubmit={initiatePayment} className="space-y-3">
            <div>
              <label className={labelClasses}>Amount (LKR)</label>
              <input
                type="number"
                name="price"
                required
                min="1"
                step="0.01"
                placeholder="0.00"
                value={formData.price}
                onChange={handleChange}
                className={`${inputClasses} text-[#00ff00] font-mono font-bold text-lg`}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClasses}>First Name</label>
                <input type="text" name="firstName" required value={formData.firstName} onChange={handleChange} className={inputClasses} />
              </div>
              <div>
                <label className={labelClasses}>Last Name</label>
                <input type="text" name="lastName" required value={formData.lastName} onChange={handleChange} className={inputClasses} />
              </div>
            </div>

            <div>
              <label className={labelClasses}>Email Address</label>
              <input type="email" name="email" required value={formData.email} onChange={handleChange} className={inputClasses} />
            </div>

            <div>
              <label className={labelClasses}>WhatsApp / Phone</label>
              <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className={inputClasses} />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 flex items-center justify-center gap-2 bg-[#00ff00] text-black py-3 rounded-xl font-black uppercase text-xs tracking-widest hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Pay Now"}
            </button>

            <div className="flex justify-center opacity-100  transition-all mt-2">
              <img src="https://www.payhere.lk/downloads/images/payhere_long_banner.png" alt="PayHere" className="h-6 object-contain" />
            </div>
          </form>

          <Dialog.Close asChild>
            <button className="absolute top-5 right-5 text-neutral-600 hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}