"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, X, Loader2 } from "lucide-react";

type Message = {
    role: "user" | "model";
    content: string;
};

export default function ChatAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "model",
            content: "I am the Yala wildlife AI. I can assist you with:\n- Safari Packages & Pricing\n- any currency conversion(LKT to USD or any)\n- Sector/Block Details\n- Wildlife tracking information\nHow can I help you today?"
        }
    ]);
    const [isLoading, setIsLoading] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isOpen]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput("");

        // Add user message to UI
        const newMessages: Message[] = [...messages, { role: "user", content: userMessage }];
        setMessages(newMessages);
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    history: messages,
                    message: userMessage,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessages((prev) => [...prev, { role: "model", content: data.reply }]);
            } else {
                setMessages((prev) => [...prev, { role: "model", content: "**ERROR** // Communication link severed. Please try again." }]);
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            setMessages((prev) => [...prev, { role: "model", content: "**ERROR** // Network anomaly detected. Please try again." }]);
        } finally {
            setIsLoading(false);
        }
    };

    // --- HELPER: Formats AI text to show clear points and bold text ---
    const renderContent = (content: string) => {
        const lines = content.split('\n');
        return lines.map((line, i) => {
            // Check if line is a bullet point
            const isBullet = line.trim().startsWith('-') || line.trim().startsWith('*');
            const cleanLine = isBullet ? line.trim().substring(1).trim() : line;

            // Parse **bold** text
            const parts = cleanLine.split(/(\*\*.*?\*\*)/g);

            return (
                <div key={i} className={`${isBullet ? 'flex items-start gap-2 mt-2 ml-2' : 'mt-3 first:mt-0'}`}>
                    {isBullet && <span className="text-[#00ff00] text-[10px] mt-1.5 leading-none">⬢</span>}
                    <span className={isBullet ? 'flex-1 text-neutral-300' : 'text-neutral-300'}>
                        {parts.map((part, j) =>
                            part.startsWith('**') && part.endsWith('**')
                                ? <strong key={j} className="text-white font-bold tracking-wide">{part.slice(2, -2)}</strong>
                                : part
                        )}
                    </span>
                </div>
            );
        });
    };

    return (
        <>
            {/* Dark Overlay for mobile */}
            <div
                className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsOpen(false)}
            ></div>

            {/* ========================================================= */}
            {/* FLOATING ACTION BUTTON (Now detached as a floating pill)  */}
            {/* ========================================================= */}

            <button
                onClick={() => setIsOpen(!isOpen)}
                // Changed right-0 to right-4, rounded-l-[20px] to rounded-full, and updated shadow and translation
                className={`fixed top-1/2 right-2 -translate-y-1/2 z-50 flex flex-col items-center justify-center py-5 px-0.5 bg-white text-black transition-all duration-500 hover:text-[#00ff00]  shadow-[0_4px_20px_rgba(0,0,0,0.3)] rounded-full ${isOpen ? 'translate-x-[150%] opacity-0 pointer-events-none' : 'translate-x-0 opacity-100 delay-300'
                    }`}
            >
                <span
                    className="text-[15px] font-bold tracking-wide"
                    style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                >
                    Ask AI
                </span>
            </button>

            {/* ========================================================= */}
            {/* FLOATING CHAT WIDGET                                      */}
            {/* ========================================================= */}
            <div
                className={`fixed bottom-20 right-4 sm:right-8 w-[calc(100vw-32px)] sm:w-[360px] h-[520px] max-h-[calc(100dvh-100px)] bg-[#050505] z-50 flex flex-col shadow-[-15px_15px_40px_rgba(0,0,0,0.9)] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] border border-white/10 rounded-[1.5rem] overflow-hidden ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0 pointer-events-none'
                    }`}
            >
                {/* Header */}
                <div className="flex-shrink-0 flex justify-between items-center p-4 bg-[#0a0a0a] relative">
                    <div className="flex items-center gap-3">
                        <div className="relative p-2 bg-[#111] flex items-center justify-center rounded-lg">
                            <Bot className="w-4 h-4 text-[#00ff00]" />
                        </div>
                        <div>
                            <h3 className="font-black text-white text-[15px] tracking-widest uppercase leading-none mb-1">yala wildlife AI</h3>
                            <div className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 bg-[#00ff00] animate-pulse rounded-full"></span>
                                <span className="text-[8px] font-mono text-[#00ff00] uppercase tracking-widest">Sys_Online</span>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-1.5 bg-white/5 text-neutral-400 hover:text-black hover:bg-[#00ff00] transition-all duration-300 rounded-md"
                    >
                        <X className="w-4 h-4" />
                    </button>
                    {/* Bottom Border Accent */}
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#00ff00]/50 to-transparent"></div>
                </div>

                {/* Messages Area */}
                <div
                    data-lenis-prevent="true"
                    className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-4 flex flex-col gap-4 scrollbar-thin scrollbar-thumb-[#222] scrollbar-track-transparent"
                >
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex gap-2.5 max-w-[92%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}>

                            {/* Avatar */}
                            <div className={`w-7 h-7 flex items-center justify-center flex-shrink-0 rounded-full ${msg.role === 'user' ? 'bg-white' : 'bg-[#111]'}`}>
                                {msg.role === 'user' ? <User className="w-3.5 h-3.5 text-black" /> : <Bot className="w-3.5 h-3.5 text-[#00ff00]" />}
                            </div>

                            {/* Message Bubble (Smooth Rounded App Style) */}
                            <div
                                className={`p-3 text-[13px] leading-relaxed shadow-sm ${msg.role === 'user'
                                    ? 'bg-white text-black font-medium rounded-2xl rounded-tr-sm'
                                    : 'bg-[#111] text-neutral-300 font-light rounded-2xl rounded-tl-sm border border-white/5'
                                    }`}
                            >
                                {/* Formats points and bold text clearly */}
                                {msg.role === 'user' ? msg.content : renderContent(msg.content)}
                            </div>

                        </div>
                    ))}

                    {/* Loading State */}
                    {isLoading && (
                        <div className="flex gap-2.5 max-w-[85%] mr-auto animate-fadeIn">
                            <div className="w-7 h-7 flex items-center justify-center flex-shrink-0 bg-[#111] rounded-full">
                                <Bot className="w-3.5 h-3.5 text-[#00ff00]" />
                            </div>
                            <div className="p-3 bg-[#111] flex items-center gap-2 rounded-2xl rounded-tl-sm border border-white/5">
                                <Loader2 className="w-3.5 h-3.5 text-[#00ff00] animate-spin" />
                                <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest animate-pulse">Processing...</span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} className="h-1" />
                </div>

                {/* Input Area */}
                <form onSubmit={handleSend} className="flex-shrink-0 p-3 bg-[#0a0a0a] relative">
                    {/* Top Border Accent */}
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#00ff00]/20 via-transparent to-transparent"></div>

                    {/* Input Box (Smooth Rounded) */}
                    <div className="relative flex items-center bg-[#111] p-1 rounded-xl border border-white/5 focus-within:border-white/20 transition-colors">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Initiate query..."
                            className="w-full bg-transparent py-2.5 pl-3 pr-10 text-[16px] sm:text-[13px] text-white placeholder-neutral-500 focus:outline-none font-mono"
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            disabled={!input.trim() || isLoading}
                            className="absolute right-1 top-1 bottom-1 px-3 bg-white text-black hover:bg-[#00ff00] disabled:bg-[#333] disabled:text-[#555] transition-colors flex items-center justify-center rounded-lg"
                        >
                            <Send className="w-3.5 h-3.5" />
                        </button>
                    </div>
                    <div className="flex justify-center mt-2 mb-1">
                        <span className="text-[8px] font-mono uppercase tracking-[0.3em] text-[#444]">Secured by yalawildlife</span>
                    </div>
                </form>
            </div>
        </>
    );
}