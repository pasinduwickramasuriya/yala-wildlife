"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  const select = document.querySelector<HTMLSelectElement>(
    ".goog-te-combo"
  );
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

  // Load Google Translate (hidden)
  useEffect(() => {
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: "en", autoDisplay: false },
        "gt-hidden-element"
      );
    };
    if (!document.getElementById("gt-script")) {
      const s = document.createElement("script");
      s.id = "gt-script";
      s.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      s.async = true;
      document.head.appendChild(s);
    }
  }, []);

  // Close on outside click
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

  const handleOpen = () => {
    setIsOpen((v) => {
      if (!v) {
        setSearch("");
        // auto-focus search after panel animates in
        setTimeout(() => searchInputRef.current?.focus(), 50);
      }
      return !v;
    });
  };

  const filteredLanguages = LANGUAGES.slice(1).filter((l) =>
    l.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <style>{`
        /* Hide Google's banner bar */
        .goog-te-banner-frame { display:none!important; }
        body { top:0!important; }
        #goog-gt-tt, .goog-tooltip, .goog-te-balloon-frame { display:none!important; }
        /* Hide the Google widget itself */
        #gt-hidden-element { display:none!important; position:absolute; }
      `}</style>

      {/* Hidden Google Translate target — always in DOM */}
      <div id="gt-hidden-element" aria-hidden="true" />

      {/* Custom dropdown */}
      <div
        ref={dropdownRef}
        className="fixed z-[9999]"
        style={{ bottom: "118px", right: "16px" }}
      >
        {/* Language list panel */}
        <div
          className="absolute bottom-full right-0 mb-2 w-44 rounded-2xl overflow-hidden"
          style={{
            background: "rgba(10,10,10,0.92)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
            visibility: isOpen ? "visible" : "hidden",
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? "translateY(0) scale(1)" : "translateY(6px) scale(0.97)",
            transition: "opacity 0.18s ease, transform 0.18s ease, visibility 0.18s",
            pointerEvents: isOpen ? "auto" : "none",
            maxHeight: "260px",
            overflowY: "auto",
          }}
        >
          <div className="px-3 pt-3 pb-2">
            {/* Search input */}
            <div className="relative">
              <svg
                className="absolute left-2.5 top-1/2 -translate-y-1/2 opacity-40"
                width="11" height="11" viewBox="0 0 24 24" fill="none"
                stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                ref={searchInputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search language..."
                className="w-full bg-white/5 rounded-lg pl-7 pr-3 py-1.5 text-[11px] text-white/70 placeholder-white/25 outline-none focus:bg-white/10 transition-colors"
              />
            </div>
          </div>
          {filteredLanguages.length === 0 && (
            <p className="px-3 py-3 text-[11px] text-white/25 text-center">
              No languages found
            </p>
          )}
          {filteredLanguages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang)}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-left transition-colors
                         hover:bg-white/10 focus:outline-none"
              style={{
                background:
                  selected.code === lang.code
                    ? "rgba(0,255,0,0.12)"
                    : "transparent",
              }}
            >
              <span className="text-base leading-none">{lang.flag}</span>
              <span
                className="text-xs font-semibold"
                style={{
                  color: selected.code === lang.code ? "#00ff00" : "#d4d4d4",
                }}
              >
                {lang.label}
              </span>
              {selected.code === lang.code && (
                <span className="ml-auto text-[#00ff00] text-xs">✓</span>
              )}
            </button>
          ))}
          {selected.code !== "" && (
            <div className="px-3 py-2 border-t border-white/10">
              <button
                onClick={() => handleSelect(LANGUAGES[0])}
                className="text-[10px] text-white/40 hover:text-white/70 transition-colors w-full text-center"
              >
                Show original
              </button>
            </div>
          )}
        </div>

        {/* Trigger pill */}
        <button
          onClick={handleOpen}
          aria-label="Translate page"
          className="flex items-center gap-1.5 rounded-full focus:outline-none transition-all duration-200 hover:scale-105"
          style={{
            background: isOpen
              ? "rgba(0,255,0,0.15)"
              : "rgba(10,10,10,0.82)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            boxShadow: isOpen
              ? "0 0 0 1.5px rgba(0,255,0,0.4), 0 4px 20px rgba(0,0,0,0.4)"
              : "0 4px 20px rgba(0,0,0,0.4)",
            padding: "7px 12px 7px 9px",
          }}
        >
          <span className="text-sm leading-none">{selected.flag}</span>
          <span className="text-[11px] font-bold text-white/80">
            {selected.code === "" ? "Translate" : selected.label}
          </span>
          <svg
            width="8" height="5" viewBox="0 0 8 5" fill="none"
            className="transition-transform duration-200"
            style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
          >
            <path d="M1 1l3 3 3-3" stroke="#00ff00" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </>
  );
}




