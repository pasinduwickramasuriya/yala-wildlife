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
    const [isSoundOn, setIsSoundOn] = useState(false);
    const [isListening, setIsListening] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const recognitionRef = useRef<any>(null);

    // Auto-scroll to bottom when new messages arrive.
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isOpen]);

    // Clean up speech on unmount
    useEffect(() => {
        return () => {
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

        window.speechSynthesis.cancel();

        const cleanText = text
            .replace(/[*#_`~-]/g, "")
            .replace(/⬢/g, "")
            .trim();

        const utterance = new SpeechSynthesisUtterance(cleanText);

        const voices = window.speechSynthesis.getVoices();
        const englishVoices = voices.filter(voice => voice.lang.startsWith("en"));

        const priorityNames = [
            "natural",
            "google us english",
            "google uk english female",
            "siri",
            "samantha",
            "aria",
            "jenny",
            "zira",
            "hazel",
            "female"
        ];

        let selectedVoice = null;
        for (const pattern of priorityNames) {
            selectedVoice = englishVoices.find(voice =>
                voice.name.toLowerCase().includes(pattern) &&
                !voice.name.toLowerCase().includes("male")
            );
            if (selectedVoice) break;
        }

        if (!selectedVoice && englishVoices.length > 0) {
            selectedVoice = englishVoices.find(v => !v.name.toLowerCase().includes("male")) || englishVoices[0];
        }

        if (selectedVoice) {
            utterance.voice = selectedVoice;
        }

        utterance.rate = 0.95;
        utterance.pitch = 1.05;
        window.speechSynthesis.speak(utterance);
    };

    const startListening = () => {
        if (typeof window === "undefined") return;
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Speech recognition is not supported in this browser. Try using Chrome or Safari.");
            return;
        }

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
        if (isSoundOn) {
            speakText(fullText);
        }
        setMessages((prev) => [...prev, { role: "model", content: fullText }]);
    };

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            const welcomeText = "Ayubowan! Welcome to Yala National Park. I'm Emma, your wildlife guide. How can I assist you with safari packages, permits, or travel routes today?";
            streamResponse(welcomeText);
        }
    }, [isOpen, messages.length]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput("");

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
                streamResponse("I am having trouble reaching our system. Please try again or message our desk.");
            }
        } catch (error) {
            setIsLoading(false);
            streamResponse("Network connection interrupted. Please try again in a moment.");
        }
    };

    const renderContent = (content: string) => {
        const lines = content.split('\n');
        return lines.map((line, i) => {
            const isBullet = line.trim().startsWith('-') || line.trim().startsWith('*');
            const cleanLine = isBullet ? line.trim().substring(1).trim() : line;
            const parts = cleanLine.split(/(\*\*.*?\*\*)/g);

            return (
                <div key={i} className={`${isBullet ? 'flex items-start gap-2 mt-1.5 ml-1' : 'mt-2 first:mt-0'}`}>
                    {isBullet && <span className="text-[#137333] text-[12px] font-bold mt-0.5 leading-none">•</span>}
                    <span className={isBullet ? 'flex-1 text-[#3c4043]' : 'text-[#3c4043]'}>
                        {parts.map((part, j) =>
                            part.startsWith('**') && part.endsWith('**')
                                ? <strong key={j} className="text-[#1f1f1f] font-bold">{part.slice(2, -2)}</strong>
                                : part
                        )}
                    </span>
                </div>
            );
        });
    };

    return (
        <>
            {/* Backdrop Blur Overlay for Mobile */}
            <div
                className={`fixed inset-0 bg-black/20 backdrop-blur-xs z-40 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsOpen(false)}
            />

            {/* Floating Pill Trigger */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed top-1/2 right-3 -translate-y-1/2 z-50 flex items-center gap-2 py-4 px-0 bg-white text-[#1f1f1f] hover:bg-[#00ff00] hover:text-black transition-all duration-300 rounded-full cursor-pointer shadow-md active:scale-95 ${
                    isOpen ? 'translate-x-[200%] opacity-0 pointer-events-none' : 'translate-x-0 opacity-100'
                }`}
                style={{
                    fontFamily: '"Google Sans", "Open Sans", Roboto, sans-serif',
                }}
            >
                <span
                    className="text-[18px] font-semibold tracking-wide select-none"
                    style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                >
                    Ask AI
                </span>
            </button>

            {/* Chat Container */}
            <div
                className={`fixed bottom-6 right-4 sm:right-8 w-[calc(100vw-32px)] sm:w-[380px] h-[550px] max-h-[calc(100dvh-60px)] bg-white text-[#1f1f1f] z-50 flex flex-col rounded-[2rem] overflow-hidden transition-all duration-300 ease-out shadow-2xl ${
                    isOpen ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95 pointer-events-none'
                }`}
                style={{
                    fontFamily: '"Google Sans", "Open Sans", Roboto, -apple-system, BlinkMacSystemFont, Arial, sans-serif',
                }}
            >
                {/* Header */}
                <div className="flex-shrink-0 flex justify-between items-center px-5 py-4 bg-white border-b border-[#f1f3f4]">
                    <div className="flex items-center gap-3">
                        <div className="relative w-9 h-9 flex-shrink-0 rounded-full overflow-hidden bg-[#f8f9fa] border border-[#e8eaed]">
                            <img src="/emma-64.png" alt="Emma" className="w-full h-full object-cover" width={36} height={36} />
                        </div>
                        <div>
                            <h3 className="font-bold text-[#1f1f1f] text-[15px] leading-tight">Emma</h3>
                            <div className="flex items-center gap-1.5 mt-0.5">
                                <span className="w-2 h-2 bg-[#00ff00] rounded-full" />
                                <span className="text-[11px] font-semibold text-[#5f6368]">Safari AI Ranger</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-1">
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
                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                                isSoundOn ? 'bg-[#e6f4ea] text-[#137333]' : 'bg-[#f8f9fa] text-[#5f6368] hover:bg-[#f1f3f4] hover:text-[#1f1f1f]'
                            }`}
                            title={isSoundOn ? "Mute audio" : "Enable voice"}
                        >
                            {isSoundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="w-8 h-8 rounded-full bg-[#f8f9fa] hover:bg-[#f1f3f4] text-[#5f6368] hover:text-[#1f1f1f] flex items-center justify-center transition-colors cursor-pointer"
                            aria-label="Close"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Messages Area */}
                <div
                    data-lenis-prevent="true"
                    className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-5 py-4 flex flex-col gap-3.5 bg-white"
                >
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex gap-2 max-w-[88%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}>
                            {/* Avatar */}
                            <div className="w-6 h-6 flex items-center justify-center shrink-0 rounded-full overflow-hidden bg-[#f8f9fa] mt-1">
                                {msg.role === 'user' ? (
                                    <User className="w-3.5 h-3.5 text-[#5f6368]" />
                                ) : (
                                    <img src="/emma-64.png" alt="Emma" className="w-full h-full object-cover" width={24} height={24} />
                                )}
                            </div>

                            {/* Bubble */}
                            <div
                                className={`px-4 py-3 text-[14px] leading-relaxed rounded-2xl ${
                                    msg.role === 'user'
                                        ? 'bg-[#f1f3f4] text-[#1f1f1f] font-semibold rounded-tr-xs'
                                        : 'bg-[#f8f9fa] text-[#3c4043] font-medium rounded-tl-xs'
                                }`}
                            >
                                {msg.role === 'user' ? msg.content : renderContent(msg.content)}
                            </div>
                        </div>
                    ))}

                    {/* Loading State */}
                    {isLoading && (
                        <div className="flex gap-2 max-w-[85%] mr-auto">
                            <div className="w-6 h-6 flex items-center justify-center shrink-0 rounded-full overflow-hidden bg-[#f8f9fa] mt-1">
                                <img src="/emma-64.png" alt="Emma" className="w-full h-full object-cover animate-pulse" width={24} height={24} />
                            </div>
                            <div className="px-4 py-2.5 bg-[#f8f9fa] flex items-center gap-2 rounded-2xl rounded-tl-xs">
                                <Loader2 className="w-3.5 h-3.5 text-[#137333] animate-spin" />
                                <span className="text-[12px] font-semibold text-[#5f6368]">Emma is drafting a response...</span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} className="h-1" />
                </div>

                {/* Input Area */}
                <form onSubmit={handleSend} className="flex-shrink-0 p-3 bg-white border-t border-[#f1f3f4]">
                    <div className="relative flex items-center bg-[#f8f9fa] focus-within:bg-[#f1f3f4] rounded-full p-1.5 transition-colors">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={isListening ? "Listening..." : "Ask Emma about safaris, wildlife..."}
                            className={`w-full bg-transparent py-2 pl-3.5 pr-20 text-base md:text-[14px] font-medium text-[#1f1f1f] placeholder:text-[#9aa0a6] focus:outline-none ${
                                isListening ? 'text-[#137333] font-bold' : ''
                            }`}
                            disabled={isLoading}
                        />

                        <div className="absolute right-1.5 flex items-center gap-1">
                            <button
                                type="button"
                                onClick={toggleListening}
                                disabled={isLoading}
                                className={`w-8 h-8 rounded-full transition-colors flex items-center justify-center cursor-pointer ${
                                    isListening
                                        ? 'bg-[#e6f4ea] text-[#137333] animate-pulse'
                                        : 'hover:bg-white text-[#5f6368] hover:text-[#1f1f1f] disabled:opacity-30'
                                }`}
                                title={isListening ? "Stop listening" : "Speak your message"}
                            >
                                <Mic className="w-4 h-4" />
                            </button>

                            <button
                                type="submit"
                                disabled={!input.trim() || isLoading || isListening}
                                className="w-8 h-8 rounded-full bg-[#00ff00] hover:brightness-105 active:scale-95 disabled:bg-[#f1f3f4] disabled:text-[#bdc1c6] text-black flex items-center justify-center transition-all cursor-pointer"
                                aria-label="Send message"
                            >
                                <Send className="w-3.5 h-3.5 stroke-[2.5]" />
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}