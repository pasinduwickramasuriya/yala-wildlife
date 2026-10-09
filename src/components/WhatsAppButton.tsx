"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { X, Send, ChevronRight } from "lucide-react";

// Official WhatsApp Vector Icon (Sharp & Solid)
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.507 14.307l-.009.075c-2.399-1.2-2.823-1.423-3.324-.712-.416.591-.814 1.026-1.144 1.026-.307 0-.742-.147-1.492-.482-1.748-.781-3.033-2.34-3.414-2.868-.31-.43-.033-.663.189-.885.2-.2.443-.518.665-.777.223-.259.296-.444.444-.741.148-.297.074-.555-.037-.777s-.999-2.408-1.369-3.298c-.36-.867-.726-.749-.999-.763-.258-.014-.554-.017-.85-.017-.297 0-.777.111-1.184.555-.407.444-1.554 1.518-1.554 3.702s1.591 4.295 1.813 4.591c.222.296 3.128 4.779 7.579 6.702 1.058.457 1.884.73 2.528.935 1.063.338 2.031.29 2.796.176.853-.128 2.628-1.074 2.998-2.11.37-1.036.37-1.924.259-2.11-.11-.186-.407-.296-.851-.519zM12.02 21.657h-.008c-1.78-.001-3.522-.48-5.044-1.385l-.362-.215-3.752.984 1.001-3.658-.236-.375c-.994-1.582-1.519-3.42-1.517-5.305.004-5.518 4.492-10.005 10.016-10.005 2.673.001 5.185 1.043 7.073 2.933s2.928 4.405 2.926 7.081c-.004 5.521-4.493 10.005-10.096 10.005zM12.02 0C5.391 0 0 5.391 0 12.02c0 2.115.553 4.179 1.603 5.998L0 24l6.168-1.572c1.761.96 3.753 1.468 5.844 1.469h.008c6.628 0 12.02-5.391 12.02-12.02S18.648 0 12.02 0z" />
  </svg>
);

const QUICK_ACTIONS = [
  { label: "Book Safari Jeep", text: "Hi! I would like to book a Jeep Safari in Yala National Park. Can you help me?" },
  { label: "Packages & Prices", text: "Hi! Could you please provide details about the packages and prices for safaris?" },
  { label: "Best Time to Visit", text: "Hi! When is the best time of year to visit Yala to see leopards and other wildlife?" },
  { label: "General Inquiry", text: "Hi! I have a few questions about visiting Yala National Park." }
];

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [showPromo, setShowPromo] = useState(true);

  const chatRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setShowPromo(false);
    }
  };

  const triggerWhatsApp = (text: string) => {
    // Valid Sri Lanka mobile format: 94 + 778158004 (no trunk 0)
    const phoneNumber = "94778158004"; 
    const baseUrl = `https://wa.me/${phoneNumber}`;
    const textToSend = text.trim().length > 0 
      ? text 
      : "Hello, I'm interested in booking a Yala safari 🌿";
    const encodedText = encodeURIComponent(textToSend);
    window.open(`${baseUrl}?text=${encodedText}`, "_blank");
    setMessage("");
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    triggerWhatsApp(message);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div 
      className="fixed bottom-6 right-6 z-[99999] flex flex-col items-end pointer-events-none select-none"
      ref={chatRef}
      style={{
        fontFamily:
          '"Google Sans", "Open Sans", Roboto, -apple-system, BlinkMacSystemFont, Arial, sans-serif',
      }}
    >
      {/* 1. CHAT WINDOW (GOOGLE EDITORIAL CLEAN WHITE CARD) */}
      {isOpen && (
        <div 
          className="mb-4 w-[340px] max-w-[calc(100vw-32px)] bg-white text-[#1f1f1f] rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.18)] border border-[#e8eaed] overflow-hidden pointer-events-auto transition-all duration-200 origin-bottom-right"
        >
          {/* Header */}
          <div className="p-4 flex items-center justify-between border-b border-[#f1f3f4] bg-white">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 shrink-0">
                <div className="w-11 h-11 rounded-full overflow-hidden bg-[#f8f9fa] border border-[#e8eaed]">
                  <Image 
                    src="/emma-64.png" 
                    alt="Guide Avatar"
                    width={44}
                    height={44}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-[#25D366] text-white rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                  <WhatsAppIcon className="w-3 h-3" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-[14px] text-[#1f1f1f] leading-none mb-1">
                  Yala Safari Desk
                </h3>
                <p className="text-[11px] font-semibold text-[#137333] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#25D366] inline-block animate-pulse" />
                  Live WhatsApp Dispatch
                </p>
              </div>
            </div>
            <button 
              type="button"
              onClick={toggleChat} 
              className="w-8 h-8 flex items-center justify-center rounded-full bg-[#f8f9fa] hover:bg-[#f1f3f4] text-[#5f6368] hover:text-[#1f1f1f] transition-colors cursor-pointer"
              aria-label="Close Chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="h-[270px] bg-white p-4 flex flex-col gap-3.5 overflow-y-auto">
            {/* Greeting Bubble */}
            <div className="flex gap-2.5 max-w-[95%]">
              <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 bg-[#f8f9fa] border border-[#e8eaed] mt-0.5">
                <Image 
                  src="/emma-64.png" 
                  alt="Guide Avatar" 
                  width={28} 
                  height={28} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="bg-[#f8f9fa] p-3.5 rounded-2xl rounded-tl-xs text-[13px] text-[#3c4043] font-medium leading-relaxed">
                <p className="font-bold text-[#1f1f1f] mb-1">Ayubowan! 🌿</p>
                <p>Welcome to Yala National Park. Ask a question or pick an instant topic below to chat with our safari desk directly on WhatsApp.</p>
              </div>
            </div>
            
            {/* Quick Action Chips */}
            <div className="flex flex-col gap-1.5 ml-9">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#5f6368] mb-0.5">
                Quick Topics
              </span>
              {QUICK_ACTIONS.map((action, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => triggerWhatsApp(action.text)}
                  className="flex items-center justify-between px-3.5 py-2.5 bg-[#f8f9fa] hover:bg-[#f1f3f4] text-[#1f1f1f] rounded-xl text-[12px] font-semibold transition-colors text-left pointer-events-auto w-full group cursor-pointer border border-transparent hover:border-[#e8eaed]"
                >
                  <span>{action.label}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#5f6368] group-hover:text-[#1f1f1f] group-hover:translate-x-0.5 transition-transform" />
                </button>
              ))}
            </div>
          </div>

          {/* Message Input Form */}
          <div className="p-3 bg-white border-t border-[#f1f3f4]">
            <form onSubmit={handleSend} className="flex items-center gap-1.5 bg-[#f8f9fa] focus-within:bg-[#f1f3f4] rounded-full p-1 transition-colors">
              <input 
                type="text" 
                placeholder="Type your message..." 
                className="flex-1 bg-transparent px-3 py-2 text-base md:text-[14px] font-medium text-[#1f1f1f] placeholder:text-[#9aa0a6] focus:outline-none"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button 
                type="submit" 
                className="w-9 h-9 flex items-center justify-center bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white rounded-full transition-all cursor-pointer shrink-0 shadow-sm"
                aria-label="Send via WhatsApp"
              >
                <Send className="w-4 h-4 stroke-[2.5]" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 2. TRIGGER BUTTON */}
      <div className="relative flex items-center pointer-events-auto">
        {/* Promo Speech Bubble */}
        {!isOpen && showPromo && (
          <div className="absolute right-18 bg-white text-[#1f1f1f] text-[12px] font-semibold px-3.5 py-2 rounded-full shadow-lg border border-[#e8eaed] flex items-center gap-2 whitespace-nowrap animate-in fade-in duration-300">
            <span>Chat on WhatsApp</span>
            <button 
              type="button" 
              onClick={(e) => { 
                e.stopPropagation(); 
                setShowPromo(false); 
              }} 
              className="text-[#5f6368] hover:text-[#1f1f1f] transition-colors cursor-pointer"
              aria-label="Dismiss banner"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        {/* Floating Action Button */}
        <button
          type="button"
          onClick={toggleChat}
          className={`
            relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl cursor-pointer active:scale-95 border border-[#e8eaed]
            ${isOpen 
              ? "bg-white hover:bg-[#f8f9fa] text-[#1f1f1f]" 
              : "bg-white hover:shadow-2xl"
            }
          `}
          aria-label={isOpen ? "Close WhatsApp Menu" : "Open WhatsApp Chat"}
        >
          {isOpen ? (
            <X className="w-6 h-6 text-[#1f1f1f]" />
          ) : (
            <div className="relative w-full h-full p-0.5">
              {/* Avatar image container with isolated circular overflow */}
              <div className="w-full h-full rounded-full overflow-hidden">
                <Image 
                  src="/emma-128.png" 
                  alt="Guide Avatar" 
                  width={56} 
                  height={56} 
                  className="w-full h-full object-cover" 
                />
              </div>

              {/* Explicit WhatsApp badge cleanly placed outside image container */}
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#25D366] text-white rounded-full flex items-center justify-center border-2 border-white shadow-md">
                <WhatsAppIcon className="w-3.5 h-3.5" />
              </div>
            </div>
          )}
        </button>
      </div>
    </div>
  );
}