'use client';

import React, { useState, useEffect } from "react";
import { RefreshCcw, Lock, FileText, ShieldCheck } from "lucide-react";

export default function LegalPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main
      className="relative min-h-screen bg-white text-[#1f1f1f] selection:bg-[#00ff00] selection:text-black antialiased pt-16 sm:pt-24 pb-20"
      style={{
        fontFamily:
          '"Google Sans", "Open Sans", Roboto, -apple-system, BlinkMacSystemFont, Arial, sans-serif',
      }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* --- Header --- */}
        <div className="text-center mb-12 sm:mb-16 space-y-3">
        

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1f1f1f] leading-tight">
            Legal & Policies 
            {/* <span className="text-[#137333]">Policies</span> */}
          </h1>

          <p className="text-[#5f6368] text-[13px] sm:text-[14px] font-semibold">
            Last Updated: December 2025 • Official Yala Wildlife Safari Portal
          </p>
        </div>

        {/* --- Navigation Cards --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mb-14">
          <a
            href="#cancellation"
            className="bg-[#f8f9fa] hover:bg-[#e6f4ea] p-5 rounded-3xl transition-colors duration-150 group block text-left"
          >
            <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center mb-3">
              <RefreshCcw className="w-5 h-5 text-[#137333]" />
            </div>
            <h3 className="font-bold text-[16px] text-[#1f1f1f]">Refund Policy</h3>
            <p className="text-[12px] text-[#5f6368] font-semibold mt-1">
              Cancellations, weather closures & money back.
            </p>
          </a>

          <a
            href="#privacy"
            className="bg-[#f8f9fa] hover:bg-[#e6f4ea] p-5 rounded-3xl transition-colors duration-150 group block text-left"
          >
            <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center mb-3">
              <Lock className="w-5 h-5 text-[#137333]" />
            </div>
            <h3 className="font-bold text-[16px] text-[#1f1f1f]">Privacy Policy</h3>
            <p className="text-[12px] text-[#5f6368] font-semibold mt-1">
              Passenger data, permits & encryption.
            </p>
          </a>

          <a
            href="#terms"
            className="bg-[#f8f9fa] hover:bg-[#e6f4ea] p-5 rounded-3xl transition-colors duration-150 group block text-left"
          >
            <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center mb-3">
              <FileText className="w-5 h-5 text-[#137333]" />
            </div>
            <h3 className="font-bold text-[16px] text-[#1f1f1f]">Terms of Service</h3>
            <p className="text-[12px] text-[#5f6368] font-semibold mt-1">
              Park regulations, liability & conduct.
            </p>
          </a>
        </div>

        {/* --- 1. REFUND POLICY --- */}
        <section id="cancellation" className="mb-10 scroll-mt-28">
          <div className="bg-[#f8f9fa] p-6 sm:p-8 rounded-[2rem] space-y-4 text-left">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0">
                <RefreshCcw className="text-[#137333] w-4 h-4" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1f1f1f]">
                Refund & Cancellation Policy
              </h2>
            </div>

            <p className="text-[15px] sm:text-[16px] text-[#3c4043] font-semibold leading-relaxed">
              We understand plans can change. Because safari jeeps and park permits are pre-booked in advance with Department of Wildlife Conservation (DWC) rangers, the following terms apply:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
              <div className="bg-white p-3.5 rounded-2xl">
                <span className="text-[11px] font-bold text-[#137333] uppercase block">24+ Hours Notice</span>
                <span className="text-[18px] font-bold text-[#1f1f1f]">100% Refund</span>
                <p className="text-[12px] text-[#5f6368] mt-0.5">Full return of deposit</p>
              </div>
              <div className="bg-white p-3.5 rounded-2xl">
                <span className="text-[11px] font-bold text-[#b06000] uppercase block">12-24 Hours Notice</span>
                <span className="text-[18px] font-bold text-[#1f1f1f]">50% Refund</span>
                <p className="text-[12px] text-[#5f6368] mt-0.5">Covers jeep reservation</p>
              </div>
              <div className="bg-white p-3.5 rounded-2xl">
                <span className="text-[11px] font-bold text-[#d93025] uppercase block">&lt; 12 Hours / No Show</span>
                <span className="text-[18px] font-bold text-[#1f1f1f]">Non-Refundable</span>
                <p className="text-[12px] text-[#5f6368] mt-0.5">Permits already issued</p>
              </div>
            </div>

            <div className="space-y-3 pt-2 text-[14px] sm:text-[15px] text-[#3c4043] font-semibold leading-relaxed">
              <div>
                <h4 className="text-[15px] font-bold text-[#1f1f1f] mb-1">Weather Policy</h4>
                <p>
                  Safaris operate rain or shine. In rare conditions where the DWC officially closes Yala National Park for visitor safety, a full 100% refund or alternate tour rescheduling is issued automatically.
                </p>
              </div>
              <div>
                <h4 className="text-[15px] font-bold text-[#1f1f1f] mb-1">Processing Time</h4>
                <p>
                  Approved refunds are processed back to the original source card or account within 5 to 7 business days.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- 2. PRIVACY POLICY --- */}
        <section id="privacy" className="mb-10 scroll-mt-28">
          <div className="bg-[#f8f9fa] p-6 sm:p-8 rounded-[2rem] space-y-4 text-left">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0">
                <Lock className="text-[#137333] w-4 h-4" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1f1f1f]">
                Privacy Policy
              </h2>
            </div>

            <p className="text-[15px] sm:text-[16px] text-[#3c4043] font-semibold leading-relaxed">
              We protect your personal data with standard encryption. We only gather information required to conduct excursions and secure government entrance clearances:
            </p>

            <ul className="space-y-2 text-[14px] sm:text-[15px] text-[#3c4043] font-semibold">
              <li className="flex items-start gap-2">
                <span className="text-[#137333] font-bold select-none">•</span>
                <span><strong>Contact Coordinates:</strong> Full passenger names, WhatsApp number, and email address for transfer coordination.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#137333] font-bold select-none">•</span>
                <span><strong>Identification Data:</strong> Passport numbers strictly required by the DWC ticketing gates for foreign permit issuance.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#137333] font-bold select-none">•</span>
                <span><strong>Payment Processing:</strong> Transactions are handled through verified payment gateways; we never store raw card numbers.</span>
              </li>
            </ul>

            <p className="text-[13px] text-[#5f6368] font-semibold pt-1">
              Your details are never monetized, distributed, or shared with third-party advertising brokers.
            </p>
          </div>
        </section>

        {/* --- 3. TERMS OF SERVICE --- */}
        <section id="terms" className="mb-12 scroll-mt-28">
          <div className="bg-[#f8f9fa] p-6 sm:p-8 rounded-[2rem] space-y-4 text-left">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0">
                <FileText className="text-[#137333] w-4 h-4" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1f1f1f]">
                Terms & Conditions
              </h2>
            </div>

            <div className="space-y-3.5 text-[14px] sm:text-[15px] text-[#3c4043] font-semibold leading-relaxed">
              <div>
                <h4 className="text-[15px] font-bold text-[#1f1f1f] mb-1">1. Wilderness Liability</h4>
                <p>
                  Yala National Park is an untamed sanctuary. Guests must remain inside designated safari vehicles at all times. We provide licensed drivers and guides; however, guests acknowledge natural park hazards and assume standard eco-tourism risk.
                </p>
              </div>

              <div>
                <h4 className="text-[15px] font-bold text-[#1f1f1f] mb-1">2. Visitor Conduct & Jungle Code</h4>
                <p>
                  All guests must obey Department of Wildlife Conservation rules: no littering, no smoking, no loud audio equipment, and no animal feeding. Drivers reserve the right to exit the park without compensation if disruptive behavior occurs.
                </p>
              </div>

              <div>
                <h4 className="text-[15px] font-bold text-[#1f1f1f] mb-1">3. Government Park Dues</h4>
                <p>
                  Park admission rates are subject to official Sri Lanka Gazette modifications. If government fee structures revise unexpectedly, rate revisions are applied transparently.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- Footer Note --- */}
        <div className="text-center pt-6 border-t border-[#f1f3f4]">
          <p className="text-[13px] font-semibold text-[#5f6368]">
            Legal & corporate inquiries:{" "}
            <a
              href={`mailto:${mounted ? "pasindusadanjana17@gmail.com" : "pasindusadanjana17@gmail.com"}`}
              className="text-[#1f1f1f] font-bold hover:text-[#137333] underline transition-colors"
            >
              {mounted ? "pasindusadanjana17@gmail.com" : "pasindusadanjana17 [at] gmail.com"}
            </a>
          </p>
        </div>

      </div>
    </main>
  );
}