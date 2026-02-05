// "use client";

// import Link from "next/link";
// import { MessageCircle } from "lucide-react";

// export default function WhatsAppButton() {
//   return (
//     <div className="fixed bottom-8 right-8 z-50 group flex flex-col items-end">
      
//       {/* --- 1. The Button --- */}
//       <Link
//         href="https://wa.me/940778158004?text=Hello,%20I'm%20interested%20in%20your%20safaris"
//         target="_blank"
//         rel="noopener noreferrer"
//         aria-label="Chat on WhatsApp"
//         // ADDED: 'animate-bounce' for the effect, 'hover:animate-none' for better clickability
//         className="relative flex items-center justify-center w-13 h-13 bg-[#00ff00] text-black rounded-full shadow-[0_4px_15px_rgba(0,255,0,0.4)] hover:shadow-[0_0_30px_#00ff00] hover:scale-110 transition-all duration-300 ease-out z-20 animate-bounce hover:animate-none"
//       >
//         {/* Inner Icon */}
//         <MessageCircle className="w-9 h-9 fill-black/10 stroke-[2.5px]" />
        
//         {/* Glass Shine Effect (Subtle overlay) */}
//         <div className="absolute inset-0 rounded-full ring-1 ring-white/20 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none" />
//       </Link>

//       {/* --- 2. The "Pulse" Signal (Background Ring) --- */}
//       {/* Stays distinct at the bottom to anchor the bounce */}
//       <div className="absolute bottom-0 right-0 w-14 h-14 bg-[#00ff00] rounded-full opacity-20 animate-ping pointer-events-none z-10" />

//       {/* --- 3. Modern Tooltip (Slides in from left) --- */}
//       <div className="absolute right-16 top-1/2 -translate-y-1/2 pointer-events-none">
//         <span className="block px-3 py-1.5 bg-neutral-900/90 backdrop-blur-md border border-white/10 text-white text-xs font-bold rounded-lg shadow-xl opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap">
//           Chat with us
//           {/* Tooltip Arrow */}
//           <span className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-neutral-900/90 border-t border-r border-white/10 rotate-45 transform" />
//         </span>
//       </div>

//     </div>
//   );
// }




"use client";

import { useState, useRef } from "react";
import { MessageCircle, X, Send, User, Sparkles } from "lucide-react"; 

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  
  const chatRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    
    const phoneNumber = "940778158004"; 
    const baseUrl = `https://wa.me/${phoneNumber}`;

    const textToSend = message.trim().length > 0 
      ? message 
      : "Hello, I'm interested in your safaris 🐆";

    const encodedText = encodeURIComponent(textToSend);
    const finalUrl = `${baseUrl}?text=${encodedText}`;

    window.open(finalUrl, "_blank");
    setMessage("");
  };

  return (
    <div 
      // FIX 1: Add 'pointer-events-none'. 
      // This ensures the invisible container wrapper never blocks clicks on your website.
      className="fixed bottom-8 right-8 z-50 flex flex-col items-end font-sans pointer-events-none"
      ref={chatRef}
    >
      
      {/* ================================================================== */}
      {/* 1. THE CUTE CHAT WINDOW                                            */}
      {/* ================================================================== */}
      <div 
        // FIX 2: Add 'pointer-events-auto' here.
        // This makes sure the chat window ITSELF is clickable/typeable.
        className={`
          mb-6 w-[340px] bg-neutral-900 rounded-[2.5rem] shadow-2xl overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] origin-bottom-right border-4 border-neutral-800 pointer-events-auto
          ${isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-50 translate-y-10 pointer-events-none"}
        `}
      >
        {/* --- Header --- */}
        <div className="bg-neutral-800/90 backdrop-blur-md p-5 flex items-center justify-between text-white border-b border-neutral-700">
          <div className="flex items-center gap-3">
             {/* Operator Avatar */}
            <div className="relative group">
              <div className="w-12 h-12 bg-neutral-700 rounded-full flex items-center justify-center border-2 border-neutral-600 group-hover:scale-110 transition-transform duration-300 cursor-pointer overflow-hidden">
                 <User className="w-7 h-7 text-[#00ff00]" />
              </div>
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#00ff00] border-2 border-neutral-800 rounded-full animate-pulse"></span>
            </div>
            <div>
              <h3 className="font-bold text-base text-white flex items-center gap-1">
                Safari Team <Sparkles className="w-3 h-3 text-yellow-400 fill-yellow-400" />
              </h3>
              <p className="text-[11px] text-[#00ff00] font-medium opacity-90">Online & Happy to Help! 🌿</p>
            </div>
          </div>
          <button 
            onClick={toggleChat} 
            className="w-8 h-8 flex items-center justify-center rounded-full bg-neutral-700/50 hover:bg-red-500/20 text-neutral-400 hover:text-red-400 transition-all duration-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* --- Chat Body --- */}
        <div className="h-[220px] bg-[#121212] p-5 flex flex-col overflow-y-auto relative">
           <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none"></div>
           
           <div className="bg-neutral-800 p-4 rounded-3xl rounded-tl-none shadow-sm self-start text-sm text-gray-200 z-10 border border-neutral-700 max-w-[85%] animate-fadeIn">
              <p className="leading-relaxed">
                Hi there! <span className="text-xl"></span> <br/>
                Ready to spot some Leopards?  <br/>
                <span className="text-neutral-400 text-xs mt-2 block">Ask us anything!</span>
              </p>
           </div>
           
           <div className="text-[10px] text-neutral-600 mt-2 ml-2">Just now</div>
        </div>

        {/* --- Input Area --- */}
        <div className="bg-neutral-900 p-4 border-t border-neutral-800">
           <form onSubmit={handleSend} className="flex items-center gap-2 bg-neutral-800 rounded-full p-1.5 border border-neutral-700 focus-within:border-[#00ff00] transition-colors duration-300">
             
             <input 
               type="text" 
               placeholder="Type a message..." 
               className="flex-1 bg-transparent rounded-full px-4 text-base md:text-sm text-white placeholder-neutral-500 focus:outline-none"
               value={message}
               onChange={(e) => setMessage(e.target.value)}
             />

             <button 
                type="submit" 
                className="w-10 h-10 flex items-center justify-center bg-[#00ff00] hover:bg-[#33ff33] rounded-full text-black transition-transform duration-300 hover:scale-110 active:scale-95 shadow-lg"
             >
                <Send className="w-4 h-4 ml-0.5 fill-current" />
             </button>
           </form>
        </div>
      </div>


      {/* ================================================================== */}
      {/* 2. THE CUTE TRIGGER BUTTON                                         */}
      {/* ================================================================== */}
      <button
        onClick={toggleChat}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        // FIX 3: Add 'pointer-events-auto' here.
        // This makes sure the green button is still clickable.
        className={`
          relative flex items-center justify-center w-14 h-14 bg-[#00ff00] text-black rounded-[2rem] shadow-[0_8px_25px_rgba(0,255,0,0.3)] hover:shadow-[0_10px_40px_rgba(0,255,0,0.5)] transition-all duration-500 cubic-bezier(0.175, 0.885, 0.32, 1.275) z-20 pointer-events-auto
          ${isOpen ? "rotate-[360deg] scale-90 bg-white text-black rounded-full" : "hover:scale-110 hover:-rotate-12"}
        `}
        aria-label="Toggle Chat"
      >
        {isOpen ? (
          <X className="w-8 h-8" />
        ) : (
          <MessageCircle className="w-8 h-8 fill-black/10 stroke-[2.5px]" />
        )}

        {/* --- Cute Tooltip (Bubble) --- */}
        {!isOpen && (
            <div 
              className={`
                absolute right-20 top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-300 
                ${isHovered ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-4 scale-90'}
              `}
            >
                <div className="relative px-4 py-2 bg-white text-black text-sm font-bold rounded-xl shadow-xl whitespace-nowrap">
                  Chat with us! 💬
                  <span className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-white rotate-45 rounded-sm"></span>
                </div>
            </div>
        )}
      </button>

      {/* Ripple/Pulse Effect */}
      {!isOpen && (
         <div className="absolute bottom-0 right-0 w-16 h-16 bg-[#00ff00] rounded-[2rem] opacity-20 animate-ping pointer-events-none z-10 duration-1000" />
      )}

    </div>
  );
}