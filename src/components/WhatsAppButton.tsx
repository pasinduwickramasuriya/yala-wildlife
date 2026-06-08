"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, ChevronRight } from "lucide-react"; 

// Custom WhatsApp SVG Icon
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12.012 2C6.48 2 2 6.48 2 12.012c0 1.764.456 3.48 1.332 5.004L2 22l5.124-1.308c1.488.816 3.168 1.248 4.888 1.248C17.52 21.94 22 17.46 22 11.928 22 6.48 17.52 2 12.012 2zm4.704 14.1c-.24.672-1.2 1.248-1.668 1.344-.432.096-.996.168-3.084-.684-2.676-1.092-4.404-3.816-4.536-4-.132-.18-1.008-1.344-1.008-2.556 0-1.212.624-1.812.852-2.052.228-.24.504-.3.672-.3.168 0 .336.006.48.012.156.006.36-.06.564.396.204.504.708 1.728.768 1.848.06.12.1.264.018.42-.078.156-.12.264-.24.408-.12.144-.252.324-.36.432-.12.12-.24.252-.108.48.132.228.588.972 1.26 1.572.864.768 1.596 1.008 1.824 1.128.228.12.36.102.492-.048.132-.15.564-.66.72-.888.156-.228.312-.192.528-.108.216.084 1.368.648 1.608.768.24.12.396.18.456.288.06.108.06.624-.18 1.296z" />
  </svg>
);

const QUICK_ACTIONS = [
  { label: "Book Safari Jeep 🚜", text: "Hi! I would like to book a Jeep Safari in Yala National Park. Can you help me?" },
  { label: "Packages & Prices 💰", text: "Hi! Could you please provide details about the packages and prices for safaris?" },
  { label: "Best Time to Visit 📅", text: "Hi! When is the best time of year to visit Yala to see leopards and other wildlife?" },
  { label: "General Inquiry 🐾", text: "Hi! I have a few questions about visiting Yala National Park." }
];

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [showPromo, setShowPromo] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  
  const chatRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setShowPromo(false); // Hide the greeting badge when chat is opened
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    triggerWhatsApp(message);
  };

  const triggerWhatsApp = (text: string) => {
    const phoneNumber = "940778158004"; 
    const baseUrl = `https://wa.me/${phoneNumber}`;
    const textToSend = text.trim().length > 0 
      ? text 
      : "Hello, I'm interested in booking a Yala safari 🌿";
    const encodedText = encodeURIComponent(textToSend);
    window.open(`${baseUrl}?text=${encodedText}`, "_blank");
    setMessage("");
  };

  const handleQuickAction = (text: string) => {
    triggerWhatsApp(text);
  };

  // Close when clicking outside
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
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans pointer-events-none"
      ref={chatRef}
    >
      {/* Inject custom CSS keyframes and animations directly in component */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes wa-pulse-ring {
          0% {
            transform: scale(0.95);
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            transform: scale(1.3);
            opacity: 0;
          }
        }
        @keyframes wa-fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes wa-pop-in {
          0% {
            opacity: 0;
            transform: scale(0.8) translateY(20px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .wa-pulse-active::before {
          content: '';
          position: absolute;
          inset: -5px;
          border-radius: 9999px;
          border: 2px solid #25D366;
          animation: wa-pulse-ring 2s cubic-bezier(0.24, 0, 0.38, 1) infinite;
          z-index: -1;
        }
        .wa-animate-pop {
          animation: wa-pop-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .wa-animate-fade {
          animation: wa-fade-in 0.3s ease-out forwards;
        }
      `}} />

      {/* ================================================================== */}
      {/* 1. THE CHAT WINDOW                                                 */}
      {/* ================================================================== */}
      {isOpen && (
        <div 
          className="mb-4 w-[350px] max-w-[calc(100vw-32px)] bg-neutral-950/95 backdrop-blur-md rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden pointer-events-auto wa-animate-pop origin-bottom-right"
        >
          {/* Header */}
          <div className="bg-neutral-900/90 p-4 flex items-center justify-between border-b border-white/5">
            <div className="flex items-center gap-3">
              {/* Operator Avatar */}
              <div className="relative">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 bg-white">
                  <img 
                    src="/emma.png" 
                    alt="Guide Avatar" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#25D366] border-2 border-neutral-900 rounded-full"></span>
              </div>
              <div>
                <h3 className="font-bold text-sm text-white flex items-center gap-1.5">
                  Safari Guide
                  <span className="text-[10px] bg-[#25D366]/10 text-[#25D366] px-1.5 py-0.5 rounded-full font-medium">Online</span>
                </h3>
                <p className="text-[10px] text-neutral-400">Ready to help 🌿</p>
              </div>
            </div>
            <button 
              onClick={toggleChat} 
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
              aria-label="Close Chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="h-[280px] bg-gradient-to-b from-[#0a0a0a] to-[#0f0f0f] p-4 flex flex-col gap-4 overflow-y-auto relative scrollbar-thin">
            {/* Background Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none"></div>
            
            {/* Greeting Bubble */}
            <div className="flex gap-2.5 max-w-[90%] z-10">
              <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 bg-white border border-white/10">
                <img src="/emma.png" alt="Guide Avatar" className="w-full h-full object-cover" />
              </div>
              <div className="bg-white/5 border border-white/10 p-3 rounded-2xl rounded-tl-none text-xs text-neutral-200 leading-relaxed shadow-sm">
                <p className="font-semibold text-white mb-1">Ayubowan! 🌿</p>
                <p>Welcome to Yala Safari. I'm your Yala Safari guide. Let me help you book your safari jeep or answer your questions. Chat with us directly on WhatsApp! 🐆</p>
              </div>
            </div>
            
            {/* Quick Action Chips */}
            <div className="flex flex-col gap-1.5 ml-9.5 z-10">
              <p className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 mb-1">Select a topic:</p>
              {QUICK_ACTIONS.map((action, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickAction(action.text)}
                  className="flex items-center justify-between px-3 py-2 bg-neutral-900/80 hover:bg-neutral-800/80 border border-white/5 hover:border-white/20 rounded-xl text-[11px] text-neutral-300 hover:text-white transition-all duration-200 text-left pointer-events-auto w-full group cursor-pointer"
                >
                  <span>{action.label}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white transition-transform group-hover:translate-x-0.5" />
                </button>
              ))}
            </div>
          </div>

          {/* Custom Message Form */}
          <div className="bg-neutral-950 p-3.5 border-t border-white/5">
            <form onSubmit={handleSend} className="flex items-center gap-2 bg-neutral-900 border border-white/10 rounded-xl p-1 focus-within:border-[#25D366]/40 transition-all">
              <input 
                type="text" 
                placeholder="Type a custom message..." 
                className="flex-1 bg-transparent px-3 py-1.5 text-base md:text-xs text-white placeholder-neutral-500 focus:outline-none"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button 
                type="submit" 
                className="w-8 h-8 flex items-center justify-center bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-md"
                aria-label="Send to WhatsApp"
              >
                <Send className="w-3.5 h-3.5 fill-current text-white" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ================================================================== */}
      {/* 2. THE TRIGGER BUTTON                                             */}
      {/* ================================================================== */}
      <div className="relative flex items-center pointer-events-auto">
        
        {/* Promo Speech Bubble Badge */}
        {!isOpen && showPromo && (
          <div className="absolute right-16 bg-neutral-950 border border-white/10 text-white text-[11px] font-medium px-3.5 py-2.5 rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.4)] flex items-center gap-2.5 whitespace-nowrap wa-animate-fade z-30">
            <span>Chat with us!</span>
            <button 
              onClick={(e) => { 
                e.stopPropagation(); 
                setShowPromo(false); 
              }} 
              className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Dismiss message"
            >
              <X className="w-3 h-3" />
            </button>
            <span className="absolute top-1/2 -right-1 -translate-y-1/2 w-2.5 h-2.5 bg-neutral-950 border-r border-t border-white/10 rotate-45"></span>
          </div>
        )}

        {/* Floating Button */}
        <button
          onClick={toggleChat}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`
            relative w-15 h-15 rounded-full flex items-center justify-center transition-all duration-500 shadow-[0_8px_25px_rgba(0,0,0,0.4)] z-20 overflow-visible cursor-pointer
            ${isOpen 
              ? "bg-white text-black hover:scale-105 rotate-180" 
              : "bg-neutral-900 text-white hover:scale-105 wa-pulse-active"
            }
          `}
          aria-label={isOpen ? "Close Chat" : "Open WhatsApp Chat"}
        >
          {isOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <div className="w-full h-full rounded-full overflow-hidden p-0.5 bg-neutral-900">
              <img 
                src="/emma.png" 
                alt="Guide Avatar" 
                className="w-full h-full object-cover rounded-full"
              />
              {/* WhatsApp overlapping Badge */}
              <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-[#25D366] text-white rounded-full flex items-center justify-center border-2 border-neutral-900 shadow-md">
                <WhatsAppIcon className="w-2.5 h-2.5" />
              </div>
            </div>
          )}

          {/* Simple Tooltip on Hover */}
          {!isOpen && isHovered && !showPromo && (
            <div className="absolute right-16 bg-neutral-950 border border-white/10 text-white text-[11px] font-medium px-3 py-1.5 rounded-xl shadow-lg whitespace-nowrap transition-all duration-200">
              Chat with us 🌿
              <span className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-neutral-950 border-r border-t border-white/10 rotate-45"></span>
            </div>
          )}
        </button>
      </div>
    </div>
  );
}