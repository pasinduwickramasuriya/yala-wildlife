/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import { X, Lock, ArrowRight, ShieldCheck } from 'lucide-react';

export default function AdvancePaymentForm() {
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        country: '',
        amount: 0,
        additionalNote: ''
    });

    // --- SCROLL LOCK ---
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePayment = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        try {
            // 1. Call your API to save "Pending" booking & get Hash
            const res = await fetch('/api/advance-payment/initiate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!data.orderId) throw new Error("Initialization failed");

            // 2. Format Amount Logic (Critical for PayHere)
            const finalAmount = data.amountFormatted || parseFloat(formData.amount.toString()).toFixed(2);

            // 3. Create PayHere Form
            const form = document.createElement('form');
            form.setAttribute('method', 'POST');
            form.setAttribute('action', `${process.env.NEXT_PUBLIC_PAYHERE_URL}/pay/checkout`);

            const params: any = {
                merchant_id: data.merchantId,
                return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success?orderId=${data.orderId}`,
                cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/cancel`,
                notify_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/advance-payment/notify`,
                order_id: data.orderId,
                items: `Advance Payment (Ref: ${data.orderId})`,
                currency: 'LKR',
                amount: finalAmount,
                first_name: formData.firstName,
                last_name: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                address: 'No 1, Yala Road',
                city: 'Yala',
                country: formData.country,
                hash: data.hash,
            };

            for (const key in params) {
                const input = document.createElement('input');
                input.setAttribute('type', 'hidden');
                input.setAttribute('name', key);
                input.setAttribute('value', params[key]);
                form.appendChild(input);
            }

            document.body.appendChild(form);
            form.submit();

        } catch (err) {
            console.error(err);
            alert("Something went wrong. Please check your details.");
            setLoading(false);
        }
    };

    // --- Trigger Button ---
    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="group relative w-full max-w-[280px] bg-black/40 backdrop-blur-md px-8 py-5 rounded-full hover:bg-black/60 transition-all duration-300 shadow-xl overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-full h-full bg-[#00ff00]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-center justify-between z-10">
                    <span className="text-white font-black text-xs uppercase tracking-[0.2em] group-hover:text-[#00ff00] transition-colors">
                        Secure Booking
                    </span>
                    <div className="bg-white/10 p-1.5 rounded-full group-hover:bg-[#00ff00] transition-colors">
                        <ArrowRight className="w-3 h-3 text-white group-hover:text-black transition-colors" />
                    </div>
                </div>
            </button>
        );
    }

    // --- Modal ---
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setIsOpen(false)} />
            <div className="relative w-full max-w-[380px] animate-in zoom-in-95 duration-300">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#00ff00]/20 blur-[100px] -z-10 rounded-full opacity-50" />
                <div className="bg-black/80 backdrop-blur-xl rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden">
                    <div className="bg-white/5 pt-8 pb-6 px-8 flex justify-between items-start">
                        <div>
                            <p className="text-[#00ff00] text-[9px] font-black uppercase tracking-widest mb-1 flex items-center gap-1">
                                <Lock className="w-3 h-3" /> Secure Pay
                            </p>
                            <h2 className="font-black text-lg uppercase tracking-wider text-white">Yala Wildlife</h2>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-neutral-400 hover:bg-white/20 hover:text-white transition-all">
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                    <form onSubmit={handlePayment}>
                        <div className="p-8 space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                                <input name="firstName" placeholder="First Name" onChange={handleChange} required className="w-full bg-white/5 hover:bg-white/10 focus:bg-white/10 text-white placeholder:text-neutral-400 text-[11px] font-bold uppercase px-4 py-3.5 rounded-2xl focus:outline-none focus:ring-1 focus:ring-[#00ff00]/50 transition-all" />
                                <input name="lastName" placeholder="Last Name" onChange={handleChange} required className="w-full bg-white/5 hover:bg-white/10 focus:bg-white/10 text-white placeholder:text-neutral-400 text-[11px] font-bold uppercase px-4 py-3.5 rounded-2xl focus:outline-none focus:ring-1 focus:ring-[#00ff00]/50 transition-all" />
                            </div>
                            <input name="email" type="email" placeholder="Email Address" onChange={handleChange} required className="w-full bg-white/5 hover:bg-white/10 focus:bg-white/10 text-white placeholder:text-neutral-400 text-[11px] font-bold px-4 py-3.5 rounded-2xl focus:outline-none focus:ring-1 focus:ring-[#00ff00]/50 transition-all" />
                            <div className="grid grid-cols-2 gap-3">
                                <input name="phone" placeholder="WhatsApp No" onChange={handleChange} required className="w-full bg-white/5 hover:bg-white/10 focus:bg-white/10 text-white placeholder:text-neutral-400 text-[11px] font-bold uppercase px-4 py-3.5 rounded-2xl focus:outline-none focus:ring-1 focus:ring-[#00ff00]/50 transition-all" />
                                <input name="country" placeholder="Country" onChange={handleChange} required className="w-full bg-white/5 hover:bg-white/10 focus:bg-white/10 text-white placeholder:text-neutral-400 text-[11px] font-bold uppercase px-4 py-3.5 rounded-2xl focus:outline-none focus:ring-1 focus:ring-[#00ff00]/50 transition-all" />
                            </div>
                            <textarea name="additionalNote" rows={1} placeholder="Optional Notes" onChange={handleChange} className="w-full bg-white/5 hover:bg-white/10 focus:bg-white/10 text-white placeholder:text-neutral-400 text-[11px] font-bold uppercase px-4 py-3.5 rounded-2xl focus:outline-none focus:ring-1 focus:ring-[#00ff00]/50 transition-all resize-none" />
                        </div>
                        <div className="px-8 pb-2">
                            <div className="bg-black/50 rounded-2xl p-4 flex justify-between items-center shadow-inner border border-white/5">
                                <span className="text-[#00ff00] text-[17px] font-bold uppercase tracking-widest">Amount (LKR)</span>
                                <input name="amount" type="number" value={formData.amount} onChange={handleChange} required className="bg-transparent text-right text-white font-black text-xl w-32 focus:outline-none focus:text-[#00ff00] transition-colors" />
                            </div>
                        </div>
                        <div className="p-8 pt-4">
                            <button type="submit" disabled={loading} className="group w-full bg-[#00ff00] hover:bg-white text-black font-black uppercase tracking-[0.2em] py-4 rounded-full transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(0,255,0,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]">
                                {loading ? <span className="animate-pulse">Processing...</span> : <>Confirm Pay <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>}
                            </button>
                            <div className="mt-5 flex items-center justify-center gap-2 opacity-100 hover:opacity-100 transition-opacity">
                                <ShieldCheck className="w-3 h-3 text-neutral-400" />
                                <span className="text-[9px] font-bold uppercase text-neutral-400 tracking-widest">Secured by</span>
                                <span className="text-xl font-black italic tracking-tighter leading-none"><span className="text-[#2b86f6]">Pay</span><span className="text-white">Here</span></span>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}