'use client';

import React from "react";
import Image from "next/image";
import Header from "@/components/Header";
import { RefreshCcw, Lock, FileText } from "lucide-react";

export default function LegalPage() {
  return (
    <main className="relative min-h-screen font-sans selection:bg-[#00ff00] selection:text-black">
      
      {/* --- Fixed Background Image Layer --- */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/uploads/1748935199061-20250603_1239_Leopard Emerges from Darkness_simple_compose_01jwt9yv7qect8krxy794bcr23.webp"
          alt="Legal Page Background"
          fill
          priority
          className="object-cover opacity-90"
          quality={90}
        />
        {/* Dark overlay to ensure text readability against the busy image */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* --- Content Layer --- */}
      <div className="relative z-10">
        <Header />

        <div className="container mx-auto px-4 py-24 max-w-4xl">
          
          {/* --- Header --- */}
          <div className="text-center mb-12 space-y-3">
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white drop-shadow-lg">
              Legal & <span className="text-[#00ff00]">Policies</span>
            </h1>
            <p className="text-neutral-300 font-mono text-xs tracking-wide">
              Last Updated: December 2025
            </p>
          </div>

          {/* --- Navigation Anchors --- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <a href="#cancellation" className="bg-black/70 backdrop-blur-sm hover:bg-[#00ff00] hover:text-black p-5 rounded-xl transition-all group">
              <RefreshCcw className="w-6 h-6 mb-3 text-[#00ff00] group-hover:text-black" />
              <h3 className="font-bold text-base">Refund Policy</h3>
              <p className="text-[10px] uppercase tracking-wider text-neutral-400 group-hover:text-black/70 mt-2 font-mono">Cancellations & Money Back.</p>
            </a>
            <a href="#privacy" className="bg-black/70 backdrop-blur-sm hover:bg-[#00ff00] hover:text-black p-5 rounded-xl transition-all group">
              <Lock className="w-6 h-6 mb-3 text-[#00ff00] group-hover:text-black" />
              <h3 className="font-bold text-base">Privacy Policy</h3>
              <p className="text-[10px] uppercase tracking-wider text-neutral-400 group-hover:text-black/70 mt-2 font-mono">Data handling.</p>
            </a>
            <a href="#terms" className="bg-black/70 backdrop-blur-sm hover:bg-[#00ff00] hover:text-black p-5 rounded-xl transition-all group">
              <FileText className="w-6 h-6 mb-3 text-[#00ff00] group-hover:text-black" />
              <h3 className="font-bold text-base">Terms of Service</h3>
              <p className="text-[10px] uppercase tracking-wider text-neutral-400 group-hover:text-black/70 mt-2 font-mono">Liability & Conduct.</p>
            </a>
          </div>

          {/* --- 1. REFUND POLICY --- */}
          <section id="cancellation" className="mb-12 scroll-mt-28">
            <div className="flex items-center gap-3 mb-5 drop-shadow-lg">
              <RefreshCcw className="text-[#00ff00] w-5 h-5" />
              <h2 className="text-xl font-bold uppercase tracking-wide text-white">Refund & Cancellation Policy</h2>
            </div>
            <div className="bg-black/70 backdrop-blur-md p-8 rounded-3xl prose prose-invert prose-sm max-w-none text-neutral-200">
              <p>
                At Yala Wildlife Safari, we understand plans change. As we reserve jeeps in advance, the following fees apply:
              </p>
              <ul className="space-y-1">
                <li><strong className="text-white">24 Hours Before:</strong> 100% Full Refund.</li>
                <li><strong className="text-white">12-24 Hours Before:</strong> 50% Refund.</li>
                <li><strong className="text-white">Less than 12 Hours / No Show:</strong> Non-refundable.</li>
              </ul>
              <h4 className="text-white font-bold mt-4 text-sm uppercase tracking-wider">Weather Policy</h4>
              <p>
                Safaris proceed rain or shine. Refunds are only issued if the DWC officially closes the park for safety. In such cases, a 100% refund is issued.
              </p>
              <h4 className="text-white font-bold mt-4 text-sm uppercase tracking-wider">Processing Time</h4>
              <p>
                Approved refunds are processed within 5-7 business days to the original payment method.
              </p>
            </div>
          </section>

          {/* --- 2. PRIVACY POLICY --- */}
          <section id="privacy" className="mb-12 scroll-mt-28">
            <div className="flex items-center gap-3 mb-5 drop-shadow-lg">
              <Lock className="text-[#00ff00] w-5 h-5" />
              <h2 className="text-xl font-bold uppercase tracking-wide text-white">Privacy Policy</h2>
            </div>
            <div className="bg-black/70 backdrop-blur-md p-8 rounded-3xl prose prose-invert prose-sm max-w-none text-neutral-200">
              <p>
                Yala Wildlife ("we", "us") is committed to protecting your privacy. This policy outlines how we collect and use your information.
              </p>
              <h4 className="text-white font-bold mt-4 text-sm uppercase tracking-wider">Information We Collect</h4>
              <ul className="space-y-1">
                <li>Name and Contact Information (Email, Phone)</li>
                <li>Payment Information (Processed securely via payment partner; we do not store card details)</li>
                <li>Passport/ID details (Required for Park Tickets)</li>
              </ul>
              <h4 className="text-white font-bold mt-4 text-sm uppercase tracking-wider">How We Use Your Data</h4>
              <p>
                Your data is used solely for booking confirmation, issuing park permits, and communication. We do not sell or share your data.
              </p>
            </div>
          </section>

          {/* --- 3. TERMS OF SERVICE --- */}
          <section id="terms" className="mb-12 scroll-mt-28">
            <div className="flex items-center gap-3 mb-5 drop-shadow-lg">
              <FileText className="text-[#00ff00] w-5 h-5" />
              <h2 className="text-xl font-bold uppercase tracking-wide text-white">Terms & Conditions</h2>
            </div>
            <div className="bg-black/70 backdrop-blur-md p-8 rounded-3xl prose prose-invert prose-sm max-w-none text-neutral-200">
              <h4 className="text-white font-bold text-sm uppercase tracking-wider">1. Liability Waiver</h4>
              <p>
                Yala National Park is a wild environment. Yala Wildlife Safari is not liable for personal injury, loss of belongings, or animal attacks within the park. Visitors enter at their own risk.
              </p>
              <h4 className="text-white font-bold mt-4 text-sm uppercase tracking-wider">2. Visitor Conduct</h4>
              <p>
                Visitors must adhere to the DWC "Jungle Code". Feeding animals, littering, or shouting is prohibited. We reserve the right to terminate a tour without refund due to dangerous behavior.
              </p>
              <h4 className="text-white font-bold mt-4 text-sm uppercase tracking-wider">3. Pricing</h4>
              <p>
                We reserve the right to adjust prices if government park fees increase without prior notice.
              </p>
            </div>
          </section>

          {/* --- Footer Note --- */}
          <div className="text-center pt-8 border-t border-white/10 mb-12">
            <p className="text-neutral-300 text-xs font-mono">
              Legal inquiries: <span className="text-white">pasindusadanjana17@gmail.com</span>
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}