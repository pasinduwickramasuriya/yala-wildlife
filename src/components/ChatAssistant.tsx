"use client";

import { useState, useRef, useEffect } from "react";
import { Send, User, X, Loader2, Volume2, VolumeX, Mic } from "lucide-react";

type Message = {
    role: "user" | "model";
    content: string;
};

export default function ChatAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [isSoundOn, setIsSoundOn] = useState(false);
    const [isListening, setIsListening] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const recognitionRef = useRef<any>(null);

    // Auto-scroll to bottom when new messages arrive.
    // Switching behavior to "auto" during active typing prevents scroll animation stutter.
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: isTyping ? "auto" : "smooth" });
        }
    }, [messages, isOpen, isTyping]);

    // Clean up typing interval and speech on unmount
    useEffect(() => {
        return () => {
            if (typingIntervalRef.current) {
                clearInterval(typingIntervalRef.current);
            }
            if (typeof window !== "undefined" && window.speechSynthesis) {
                window.speechSynthesis.cancel();
            }
        };
    }, []);

    // Stop speech if chat widget is closed
    useEffect(() => {
        if (!isOpen && typeof window !== "undefined" && window.speechSynthesis) {
            window.speechSynthesis.cancel();
        }
    }, [isOpen]);

    // Pre-load voices on mount to ensure SpeechSynthesis behaves nicely
    useEffect(() => {
        if (typeof window !== "undefined" && window.speechSynthesis) {
            window.speechSynthesis.getVoices();
            if (window.speechSynthesis.onvoiceschanged !== undefined) {
                window.speechSynthesis.onvoiceschanged = () => {
                    window.speechSynthesis.getVoices();
                };
            }
        }
    }, []);

    const speakText = (text: string) => {
        if (typeof window === "undefined" || !window.speechSynthesis) return;

        // Cancel any currently speaking text
        window.speechSynthesis.cancel();

        // Strip markdown or bullet formatting for natural speech
        const cleanText = text
            .replace(/[*#_`~-]/g, "") // remove formatting characters
            .replace(/⬢/g, "")
            .trim();

        const utterance = new SpeechSynthesisUtterance(cleanText);

        // Select the most beautiful/natural female voice available
        const voices = window.speechSynthesis.getVoices();
        const englishVoices = voices.filter(voice => voice.lang.startsWith("en"));

        const priorityNames = [
            "natural",                // Neural voices (e.g. Edge Natural voices)
            "google us english",      // High quality Chrome voice
            "google uk english female",
            "siri",                   // Apple Siri
            "samantha",               // Apple Samantha (very natural Siri voice)
            "aria",                   // Microsoft Aria (natural)
            "jenny",                  // Microsoft Jenny (natural)
            "zira",                   // Microsoft Zira
            "hazel",                  // Microsoft Hazel
            "female"                  // Generic female
        ];

        let selectedVoice = null;
        for (const pattern of priorityNames) {
            selectedVoice = englishVoices.find(voice =>
                voice.name.toLowerCase().includes(pattern) &&
                !voice.name.toLowerCase().includes("male") // avoid male voices
            );
            if (selectedVoice) break;
        }

        if (!selectedVoice && englishVoices.length > 0) {
            selectedVoice = englishVoices.find(v => !v.name.toLowerCase().includes("male")) || englishVoices[0];
        }

        if (selectedVoice) {
            utterance.voice = selectedVoice;
        }

        utterance.rate = 0.95; // Slightly slower speed for a warmer, more natural tone
        utterance.pitch = 1.05; // Slightly higher friendly pitch
        window.speechSynthesis.speak(utterance);
    };

    const startListening = () => {
        if (typeof window === "undefined") return;
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Speech recognition is not supported in this browser. Try using Chrome or Safari.");
            return;
        }

        // Stop any current speaking so the microphone doesn't pick up Emma's voice
        if (window.speechSynthesis) {
            window.speechSynthesis.cancel();
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.lang = "en-US";
        recognition.interimResults = false;

        recognition.onstart = () => {
            setIsListening(true);
        };

        recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            setInput(transcript);
        };

        recognition.onerror = (event: any) => {
            console.error("Speech recognition error:", event.error);
            setIsListening(false);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognitionRef.current = recognition;
        recognition.start();
    };

    const stopListening = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
        setIsListening(false);
    };

    const toggleListening = () => {
        if (isListening) {
            stopListening();
        } else {
            startListening();
        }
    };

    const streamResponse = (fullText: string) => {
        if (typingIntervalRef.current) {
            clearInterval(typingIntervalRef.current);
        }

        setIsTyping(true);
        // Add an empty model message first
        setMessages((prev) => [...prev, { role: "model", content: "" }]);

        // Speak the response if sound is on
        if (isSoundOn) {
            speakText(fullText);
        }

        let currentLength = 0;
        typingIntervalRef.current = setInterval(() => {
            setMessages((prev) => {
                const updated = [...prev];
                const lastIndex = updated.length - 1;

                if (lastIndex >= 0 && updated[lastIndex].role === "model") {
                    // Type exactly 1 character at a time very slowly and smoothly
                    currentLength += 1;

                    if (currentLength >= fullText.length) {
                        updated[lastIndex].content = fullText;
                        if (typingIntervalRef.current) {
                            clearInterval(typingIntervalRef.current);
                            typingIntervalRef.current = null;
                        }
                        setIsTyping(false);
                    } else {
                        updated[lastIndex].content = fullText.slice(0, currentLength);
                    }
                } else {
                    if (typingIntervalRef.current) {
                        clearInterval(typingIntervalRef.current);
                        typingIntervalRef.current = null;
                    }
                    setIsTyping(false);
                }
                return updated;
            });
        }, 3); // 55ms for very slow and smooth typewriter action
    };

    // Trigger welcome message typing when chat is opened for the first time
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            const welcomeText = "Ayubowan! Welcome to Yala Wildlife National Park. I am Emma, your AI Ranger, here to assist you with:\n- Safari Packages & Pricing \n- Currency conversion (LKR to USD, etc.)\n- Sector & Block Details\n- Wildlife tracking information\nHow can I help you today?";
            streamResponse(welcomeText);
        }
    }, [isOpen, messages.length]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading || isTyping) return;

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

            setIsLoading(false);
            if (response.ok) {
                streamResponse(data.reply);
            } else {
                streamResponse("**ERROR** // Communication link severed. Please try again.");
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            setIsLoading(false);
            streamResponse("**ERROR** // Network anomaly detected. Please try again.");
        }
    };

    // --- HELPER: Formats AI text to show clear points and bold text ---
    const renderContent = (content: string, showCursor: boolean = false) => {
        const lines = content.split('\n');
        return lines.map((line, i) => {
            // Check if line is a bullet point
            const isBullet = line.trim().startsWith('-') || line.trim().startsWith('*');
            const cleanLine = isBullet ? line.trim().substring(1).trim() : line;

            // Parse **bold** text
            const parts = cleanLine.split(/(\*\*.*?\*\*)/g);
            const isLastLine = i === lines.length - 1;

            return (
                <div key={i} className={`${isBullet ? 'flex items-start gap-2 mt-2 ml-2' : 'mt-3 first:mt-0'}`}>
                    {isBullet && <span className="text-[#00ff00] text-[10px] mt-1.5 leading-none">⬢</span>}
                    <span className={isBullet ? 'flex-1 text-neutral-300' : 'text-neutral-300'}>
                        {parts.map((part, j) =>
                            part.startsWith('**') && part.endsWith('**')
                                ? <strong key={j} className="text-white font-bold tracking-wide">{part.slice(2, -2)}</strong>
                                : part
                        )}
                        {isLastLine && showCursor && (
                            <span className="inline-block w-2 h-3.5 bg-[#00ff00] ml-1 align-middle animate-[pulse_0.8s_infinite] shadow-[0_0_8px_#00ff00]" />
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
                        <div className="relative w-9 h-9 flex-shrink-0 overflow-hidden rounded-full bg-white">
                            <img src="/emma.png" alt="Emma" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h3 className="font-black text-white text-[15px] tracking-widest leading-none mb-1">Emma</h3>
                            <div className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 bg-[#00ff00] animate-pulse rounded-full"></span>
                                <span className="text-[8px] font-mono text-[#00ff00] tracking-widest">Online</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <button
                            type="button"
                            onClick={() => {
                                const newSoundState = !isSoundOn;
                                setIsSoundOn(newSoundState);
                                if (newSoundState) {
                                    speakText("Voice enabled");
                                } else {
                                    if (typeof window !== "undefined" && window.speechSynthesis) {
                                        window.speechSynthesis.cancel();
                                    }
                                }
                            }}
                            className={`p-1.5 rounded-md transition-all duration-300 ${isSoundOn ? 'bg-[#00ff00]/10 text-[#00ff00] hover:bg-[#00ff00]/20' : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10'}`}
                            title={isSoundOn ? "Mute Emma" : "Unmute Emma"}
                        >
                            {isSoundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                        </button>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-1.5 bg-white/5 text-neutral-400 hover:text-black hover:bg-[#00ff00] transition-all duration-300 rounded-md"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                    {/* Bottom Border Accent */}
                    {/* <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#00ff00]/50 to-transparent"></div> */}
                </div>

                {/* Messages Area */}
                <div
                    data-lenis-prevent="true"
                    className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-4 flex flex-col gap-4 scrollbar-thin scrollbar-thumb-[#222] scrollbar-track-transparent"
                >
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex gap-2.5 max-w-[92%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}>

                            {/* Avatar */}
                            <div className="w-7 h-7 flex items-center justify-center flex-shrink-0 rounded-full overflow-hidden bg-white">
                                {msg.role === 'user' ? (
                                    <User className="w-3.5 h-3.5 text-black" />
                                ) : (
                                    <img src="/emma.png" alt="Emma" className="w-full h-full object-cover" />
                                )}
                            </div>

                            {/* Message Bubble (Smooth Rounded App Style) */}
                            <div
                                className={`p-3 text-[13px] leading-relaxed shadow-sm ${msg.role === 'user'
                                    ? 'bg-white text-black font-medium rounded-2xl rounded-tr-sm'
                                    : 'bg-[#111] text-neutral-300 font-light rounded-2xl rounded-tl-sm border border-white/5'
                                    }`}
                            >
                                {/* Formats points and bold text clearly */}
                                {msg.role === 'user'
                                    ? msg.content
                                    : renderContent(msg.content, isTyping && index === messages.length - 1)}
                            </div>

                        </div>
                    ))}

                    {/* Loading State */}
                    {isLoading && (
                        <div className="flex gap-2.5 max-w-[85%] mr-auto animate-fadeIn">
                            <div className="w-7 h-7 flex items-center justify-center flex-shrink-0 rounded-full overflow-hidden bg-white">
                                <img src="/emma.png" alt="Emma" className="w-full h-full object-cover animate-pulse" />
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
                            placeholder={isListening ? "Listening..." : "Initiate query..."}
                            className={`w-full bg-transparent py-2.5 pl-3 pr-24 text-[16px] sm:text-[13px] text-white placeholder-neutral-500 focus:outline-none font-mono ${isListening ? 'text-[#00ff00]' : ''}`}
                            disabled={isLoading || isTyping}
                        />
                        <div className="absolute right-1 top-1 bottom-1 flex items-center gap-1">
                            <button
                                type="button"
                                onClick={toggleListening}
                                disabled={isLoading || isTyping}
                                className={`px-2.5 h-8 rounded-lg transition-colors flex items-center justify-center ${isListening ? 'bg-[#00ff00]/20 text-[#00ff00] animate-pulse' : 'bg-white/5 text-neutral-400 hover:text-white disabled:opacity-30'}`}
                                title={isListening ? "Stop listening" : "Talk to Emma"}
                            >
                                <Mic className="w-3.5 h-3.5" />
                            </button>
                            <button
                                type="submit"
                                disabled={!input.trim() || isLoading || isTyping || isListening}
                                className="h-8 px-3 bg-white text-black hover:bg-[#00ff00] disabled:bg-[#333] disabled:text-[#555] transition-colors flex items-center justify-center rounded-lg"
                            >
                                <Send className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-center mt-2 mb-1">
                        <span className="text-[8px] font-mono uppercase tracking-[0.3em] text-[#444]">Secured by yalawildlife</span>
                    </div>
                </form>
            </div>
        </>
    );
}