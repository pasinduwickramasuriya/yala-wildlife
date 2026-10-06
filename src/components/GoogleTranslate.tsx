"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

const LANGUAGES = [
  { code: "", label: "Select Language", flag: "🇬🇧" },
  { code: "af", label: "Afrikaans", flag: "🇿🇦" },
  { code: "sq", label: "Albanian", flag: "🇦🇱" },
  { code: "am", label: "Amharic", flag: "🇪🇹" },
  { code: "ar", label: "Arabic", flag: "🇸🇦" },
  { code: "hy", label: "Armenian", flag: "🇦🇲" },
  { code: "az", label: "Azerbaijani", flag: "🇦🇿" },
  { code: "eu", label: "Basque", flag: "🇪🇸" },
  { code: "be", label: "Belarusian", flag: "🇧🇾" },
  { code: "bn", label: "Bengali", flag: "🇧🇩" },
  { code: "bs", label: "Bosnian", flag: "🇧🇦" },
  { code: "bg", label: "Bulgarian", flag: "🇧🇬" },
  { code: "ca", label: "Catalan", flag: "🇪🇸" },
  { code: "ceb", label: "Cebuano", flag: "🇵🇭" },
  { code: "ny", label: "Chichewa", flag: "🇲🇼" },
  { code: "zh-CN", label: "Chinese (Simplified)", flag: "🇨🇳" },
  { code: "zh-TW", label: "Chinese (Traditional)", flag: "🇹🇼" },
  { code: "hr", label: "Croatian", flag: "🇭🇷" },
  { code: "cs", label: "Czech", flag: "🇨🇿" },
  { code: "da", label: "Danish", flag: "🇩🇰" },
  { code: "nl", label: "Dutch", flag: "🇳🇱" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "eo", label: "Esperanto", flag: "🌍" },
  { code: "et", label: "Estonian", flag: "🇪🇪" },
  { code: "tl", label: "Filipino", flag: "🇵🇭" },
  { code: "fi", label: "Finnish", flag: "🇫🇮" },
  { code: "fr", label: "French", flag: "🇫🇷" },
  { code: "fy", label: "Frisian", flag: "🇳🇱" },
  { code: "gl", label: "Galician", flag: "🇪🇸" },
  { code: "ka", label: "Georgian", flag: "🇬🇪" },
  { code: "de", label: "German", flag: "🇩🇪" },
  { code: "el", label: "Greek", flag: "🇬🇷" },
  { code: "gu", label: "Gujarati", flag: "🇮🇳" },
  { code: "ht", label: "Haitian Creole", flag: "🇭🇹" },
  { code: "ha", label: "Hausa", flag: "🇳🇬" },
  { code: "haw", label: "Hawaiian", flag: "🇺🇸" },
  { code: "he", label: "Hebrew", flag: "🇮🇱" },
  { code: "hi", label: "Hindi", flag: "🇮🇳" },
  { code: "hmn", label: "Hmong", flag: "🌏" },
  { code: "hu", label: "Hungarian", flag: "🇭🇺" },
  { code: "is", label: "Icelandic", flag: "🇮🇸" },
  { code: "ig", label: "Igbo", flag: "🇳🇬" },
  { code: "id", label: "Indonesian", flag: "🇮🇩" },
  { code: "ga", label: "Irish", flag: "🇮🇪" },
  { code: "it", label: "Italian", flag: "🇮🇹" },
  { code: "ja", label: "Japanese", flag: "🇯🇵" },
  { code: "jw", label: "Javanese", flag: "🇮🇩" },
  { code: "kn", label: "Kannada", flag: "🇮🇳" },
  { code: "kk", label: "Kazakh", flag: "🇰🇿" },
  { code: "km", label: "Khmer", flag: "🇰🇭" },
  { code: "ko", label: "Korean", flag: "🇰🇷" },
  { code: "ku", label: "Kurdish", flag: "🇹🇷" },
  { code: "ky", label: "Kyrgyz", flag: "🇰🇬" },
  { code: "lo", label: "Lao", flag: "🇱🇦" },
  { code: "la", label: "Latin", flag: "🏛️" },
  { code: "lv", label: "Latvian", flag: "🇱🇻" },
  { code: "lt", label: "Lithuanian", flag: "🇱🇹" },
  { code: "lb", label: "Luxembourgish", flag: "🇱🇺" },
  { code: "mk", label: "Macedonian", flag: "🇲🇰" },
  { code: "mg", label: "Malagasy", flag: "🇲🇬" },
  { code: "ms", label: "Malay", flag: "🇲🇾" },
  { code: "ml", label: "Malayalam", flag: "🇮🇳" },
  { code: "mt", label: "Maltese", flag: "🇲🇹" },
  { code: "mi", label: "Maori", flag: "🇳🇿" },
  { code: "mr", label: "Marathi", flag: "🇮🇳" },
  { code: "mn", label: "Mongolian", flag: "🇲🇳" },
  { code: "my", label: "Myanmar (Burmese)", flag: "🇲🇲" },
  { code: "ne", label: "Nepali", flag: "🇳🇵" },
  { code: "no", label: "Norwegian", flag: "🇳🇴" },
  { code: "pa", label: "Punjabi", flag: "🇵🇰" },
  { code: "fa", label: "Persian", flag: "🇮🇷" },
  { code: "pl", label: "Polish", flag: "🇵🇱" },
  { code: "pt", label: "Portuguese", flag: "🇵🇹" },
  { code: "ro", label: "Romanian", flag: "🇷🇴" },
  { code: "ru", label: "Russian", flag: "🇷🇺" },
  { code: "sm", label: "Samoan", flag: "🇼🇸" },
  { code: "gd", label: "Scots Gaelic", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿" },
  { code: "sr", label: "Serbian", flag: "🇷🇸" },
  { code: "st", label: "Sesotho", flag: "🇱🇸" },
  { code: "sn", label: "Shona", flag: "🇿🇼" },
  { code: "sd", label: "Sindhi", flag: "🇵🇰" },
  { code: "si", label: "Sinhala", flag: "🇱🇰" },
  { code: "sk", label: "Slovak", flag: "🇸🇰" },
  { code: "sl", label: "Slovenian", flag: "🇸🇮" },
  { code: "so", label: "Somali", flag: "🇸🇴" },
  { code: "es", label: "Spanish", flag: "🇪🇸" },
  { code: "su", label: "Sundanese", flag: "🇮🇩" },
  { code: "sw", label: "Swahili", flag: "🇰🇪" },
  { code: "sv", label: "Swedish", flag: "🇸🇪" },
  { code: "tg", label: "Tajik", flag: "🇹🇯" },
  { code: "ta", label: "Tamil", flag: "🇱🇰" },
  { code: "te", label: "Telugu", flag: "🇮🇳" },
  { code: "th", label: "Thai", flag: "🇹🇭" },
  { code: "tr", label: "Turkish", flag: "🇹🇷" },
  { code: "tk", label: "Turkmen", flag: "🇹🇲" },
  { code: "uk", label: "Ukrainian", flag: "🇺🇦" },
  { code: "ur", label: "Urdu", flag: "🇵🇰" },
  { code: "uz", label: "Uzbek", flag: "🇺🇿" },
  { code: "vi", label: "Vietnamese", flag: "🇻🇳" },
  { code: "cy", label: "Welsh", flag: "🏴󠁧󠁢󠁷󠁬󠁳󠁿" },
  { code: "xh", label: "Xhosa", flag: "🇿🇦" },
  { code: "yi", label: "Yiddish", flag: "🌍" },
  { code: "yo", label: "Yoruba", flag: "🇳🇬" },
  { code: "zu", label: "Zulu", flag: "🇿🇦" },
];

function triggerTranslate(langCode: string) {
  const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");
  if (!select) return;
  select.value = langCode;
  select.dispatchEvent(new Event("change", { bubbles: true }));
}

export default function GoogleTranslate() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(LANGUAGES[0]);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: "en", autoDisplay: false },
        "gt-hidden-element"
      );
    };

    const loadScript = () => {
      if (!document.getElementById("gt-script")) {
        const s = document.createElement("script");
        s.id = "gt-script";
        s.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        s.async = true;
        document.head.appendChild(s);
      }
    };

    let idleId: number | null = null;
    if ("requestIdleCallback" in window) {
      idleId = (window as any).requestIdleCallback(loadScript, { timeout: 8000 });
    } else {
      idleId = setTimeout(loadScript, 5000) as any;
    }

    const handleInteraction = () => {
      loadScript();
      if (idleId !== null) {
        if ("cancelIdleCallback" in window) {
          (window as any).cancelIdleCallback(idleId);
        } else {
          clearTimeout(idleId);
        }
      }
      document.removeEventListener("pointerdown", handleInteraction);
    };

    document.addEventListener("pointerdown", handleInteraction, { passive: true, once: true });

    return () => {
      if (idleId !== null) {
        if ("cancelIdleCallback" in window) {
          (window as any).cancelIdleCallback(idleId);
        } else {
          clearTimeout(idleId);
        }
      }
      document.removeEventListener("pointerdown", handleInteraction);
    };
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (lang: (typeof LANGUAGES)[number]) => {
    setSelected(lang);
    setIsOpen(false);
    setSearch("");
    triggerTranslate(lang.code);
  };

  const filteredLanguages = LANGUAGES.slice(1).filter((l) =>
    l.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <style>{`
        .goog-te-banner-frame, iframe.goog-te-banner-frame { display:none!important; }
        body { top:0!important; position: static !important; }
        #goog-gt-tt, .goog-tooltip, .goog-te-balloon-frame { display:none!important; }
        #gt-hidden-element { display:none!important; }

        @media screen and (max-width: 768px) {
          .no-zoom-search {
            font-size: 16px !important;
            transform: scale(0.8);
            transform-origin: left center;
            width: 125% !important;
          }
        }
      `}</style>

      <div id="gt-hidden-element" aria-hidden="true" />

      <div
        ref={dropdownRef}
        className="fixed select-none"
        style={{ 
          bottom: "180px", 
          right: "20px",
          zIndex: 2147483647,
          isolation: "isolate",
          fontFamily: '"Google Sans", "Open Sans", Roboto, -apple-system, BlinkMacSystemFont, Arial, sans-serif'
        }}
      >
        {/* DROPDOWN PANEL - Clean Translucent Frosted Glass & Borderless Shadows */}
        <div
          className="absolute bottom-full right-0 mb-3 w-48 rounded-[1.75rem] shadow-[0_16px_40px_rgba(0,0,0,0.14)] overflow-hidden"
          style={{
            background: "rgba(255, 255, 255, 0.88)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            visibility: isOpen ? "visible" : "hidden",
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? "translateY(0) scale(1)" : "translateY(12px) scale(0.96)",
            transition: "all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)",
            maxHeight: "270px",
            overflowY: "auto",
          }}
        >
          {/* Search Header */}
          <div className="p-2.5 sticky top-0 bg-white/70 backdrop-blur-md z-10">
            <input
              ref={searchInputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search language..."
              className="no-zoom-search w-full bg-[#f1f3f4]/80 rounded-full px-3.5 py-1.5 text-[12px] font-semibold text-[#1f1f1f] placeholder:text-[#5f6368] outline-none transition-colors focus:bg-[#f1f3f4]"
            />
          </div>
          
          {/* Languages List */}
          <div className="px-1.5 pb-2">
            {filteredLanguages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 text-left rounded-xl transition-colors cursor-pointer ${
                  selected.code === lang.code 
                    ? "bg-[#e6f4ea] text-[#137333]" 
                    : "hover:bg-black/[0.04] active:bg-black/[0.08] text-[#1f1f1f]"
                }`}
              >
                <span className="text-base leading-none shrink-0 drop-shadow-xs">{lang.flag}</span>
                <span className="text-[12px] font-semibold truncate">
                  {lang.label}
                </span>
              </button>
            ))}
            {filteredLanguages.length === 0 && (
              <div className="text-[11px] font-semibold text-[#5f6368] text-center py-4">No results found</div>
            )}
          </div>
        </div>

        {/* TRIGGER BUTTON - Pure White Frosted Pill, Solid Black Arrow, Crisp Large Flag */}
        <button
          type="button"
          onClick={() => {
            setIsOpen(!isOpen);
            if (!isOpen) setTimeout(() => searchInputRef.current?.focus(), 150);
          }}
          className="flex items-center gap-2 rounded-full px-3.5 py-2 shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all cursor-pointer active:scale-95"
          style={{
            background: "rgba(255, 255, 255, 0.92)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
          }}
          aria-label="Select website language"
        >
          {/* Clear large flag */}
          <span className="text-xl leading-none drop-shadow-xs select-none">
            {selected.flag}
          </span>

          {/* Solid black arrow */}
          <svg
            width="10"
            height="6"
            viewBox="0 0 12 8"
            fill="none"
            className="transition-transform duration-300"
            style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
          >
            <path
              d="M1.5 1.75L6 6.25L10.5 1.75"
              stroke="#000000"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </>
  );
}