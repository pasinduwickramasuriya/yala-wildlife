"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie, Check, X, Settings, ChevronDown, ChevronUp } from "lucide-react";

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  functional: boolean;
}

const STORAGE_KEY = "yala_cookie_consent_v1";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [showPreferences, setShowPreferences] = useState<boolean>(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: true,
    functional: true,
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        const timer = setTimeout(() => setIsVisible(true), 1000);
        return () => clearTimeout(timer);
      } else {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed === "object") {
          setPreferences(parsed);
        }
      }
    } catch {
      setIsVisible(true);
    }
  }, []);

  useEffect(() => {
    const handleOpenSettings = () => {
      setIsVisible(true);
      setShowPreferences(true);
    };

    window.addEventListener("open-cookie-settings", handleOpenSettings);
    return () => window.removeEventListener("open-cookie-settings", handleOpenSettings);
  }, []);

  const savePreferences = (prefs: CookiePreferences, label: string) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
      const maxAge = 365 * 24 * 60 * 60;
      document.cookie = `cookie_consent=${encodeURIComponent(label)}; max-age=${maxAge}; path=/; SameSite=Lax`;
    } catch (e) {
      console.error("Failed to save cookie preferences", e);
    }
    setIsVisible(false);
    setShowPreferences(false);
  };

  const handleAcceptAll = () => {
    const allOn: CookiePreferences = { essential: true, analytics: true, functional: true };
    setPreferences(allOn);
    savePreferences(allOn, "accepted_all");
  };

  const handleRejectNonEssential = () => {
    const essentialOnly: CookiePreferences = { essential: true, analytics: false, functional: false };
    setPreferences(essentialOnly);
    savePreferences(essentialOnly, "essential_only");
  };

  const handleSaveCustom = () => {
    savePreferences(preferences, "custom");
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Cookie Consent Dialog"
      className="fixed top-[120px] left-1/2 -translate-x-1/2 w-[calc(100%-1.5rem)] sm:top-auto sm:bottom-4 sm:w-full sm:max-w-[340px] z-100 animate-in fade-in slide-in-from-top-4 sm:slide-in-from-bottom-4 duration-300 selection:bg-[#00ff00] selection:text-black"
    >
      <div className="relative bg-zinc-950/95 backdrop-blur-2xl rounded-3xl p-4 shadow-[0_12px_40px_rgba(0,0,0,0.65)] text-white flex flex-col gap-3 mx-4 sm:mx-0">
        {/* Glow accent */}
        <div className="absolute -top-8 -left-8 w-24 h-24 bg-[#00ff00]/10 rounded-full blur-2xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between gap-2 relative z-10">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-full bg-amber-500/15 text-amber-400 shrink-0">
              <Cookie className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-white tracking-tight">
              Cookie Preferences
            </h3>
          </div>
          <button
            onClick={handleRejectNonEssential}
            className="text-zinc-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Readable & cute description */}
        <p className="text-[11px] text-zinc-300 leading-relaxed font-normal relative z-10">
          We use cookies to improve your safari experience and analyze site traffic.
        </p>

        {/* Expandable Preferences Drawer (No borders) */}
        {showPreferences && (
          <div className="flex flex-col gap-2 py-1 relative z-10 animate-in fade-in duration-200">
            {/* Essential */}
            <div className="flex items-center justify-between gap-2 p-2 rounded-2xl bg-white/[0.06]">
              <div className="flex flex-col">
                <span className="text-[11px] font-medium text-zinc-200 flex items-center gap-1">
                  Essential
                  <span className="text-[9px] bg-white/10 text-[#00ff00] px-1.5 py-0.2 rounded-full font-mono">
                    Required
                  </span>
                </span>
                <span className="text-[10px] text-zinc-400">Core site functionality</span>
              </div>
              <input
                type="checkbox"
                checked={true}
                disabled={true}
                className="w-3.5 h-3.5 rounded-full accent-[#00ff00] cursor-not-allowed opacity-60"
              />
            </div>

            {/* Analytics */}
            <div className="flex items-center justify-between gap-2 p-2 rounded-2xl bg-white/[0.06] hover:bg-white/[0.09] transition-colors">
              <div className="flex flex-col">
                <span className="text-[11px] font-medium text-zinc-200">Analytics</span>
                <span className="text-[10px] text-zinc-400">Performance &amp; traffic</span>
              </div>
              <input
                type="checkbox"
                id="cookie-analytics"
                checked={preferences.analytics}
                onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                className="w-3.5 h-3.5 rounded-full accent-[#00ff00] cursor-pointer"
              />
            </div>

            {/* Functional */}
            <div className="flex items-center justify-between gap-2 p-2 rounded-2xl bg-white/[0.06] hover:bg-white/[0.09] transition-colors">
              <div className="flex flex-col">
                <span className="text-[11px] font-medium text-zinc-200">Functional</span>
                <span className="text-[10px] text-zinc-400">Settings &amp; options</span>
              </div>
              <input
                type="checkbox"
                id="cookie-functional"
                checked={preferences.functional}
                onChange={(e) => setPreferences({ ...preferences, functional: e.target.checked })}
                className="w-3.5 h-3.5 rounded-full accent-[#00ff00] cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* Buttons & Footer (No borders) */}
        <div className="flex flex-col gap-2 relative z-10 pt-0.5">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleAcceptAll}
              className="flex items-center justify-center gap-1 px-3 py-1.5 rounded-full bg-[#00ff00] text-black font-bold text-[11px] hover:bg-[#00e600] transition-all active:scale-95 shadow-md shadow-[#00ff00]/20 cursor-pointer"
            >
              <Check className="w-3 h-3 stroke-[3]" />
              Accept All
            </button>
            <button
              onClick={handleRejectNonEssential}
              className="flex items-center justify-center gap-1 px-3 py-1.5 rounded-full bg-white/10 text-zinc-200 font-semibold text-[11px] hover:bg-white/15 transition-all active:scale-95 cursor-pointer"
            >
              Essential Only
            </button>
          </div>

          <div className="flex items-center justify-between px-0.5 pt-0.5">
            <button
              onClick={() => setShowPreferences(!showPreferences)}
              className="text-[10px] font-medium text-zinc-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Settings className="w-2.5 h-2.5 text-[#00ff00]" />
              {showPreferences ? "Hide Options" : "Customize"}
              {showPreferences ? <ChevronUp className="w-2.5 h-2.5" /> : <ChevronDown className="w-2.5 h-2.5" />}
            </button>

            {showPreferences && (
              <button
                onClick={handleSaveCustom}
                className="text-[10px] font-bold text-[#00ff00] hover:underline cursor-pointer"
              >
                Save Choice
              </button>
            )}

            <Link
              href="/legal#privacy"
              className="text-[10px] font-normal text-zinc-400 hover:text-white underline underline-offset-2 transition-colors ml-auto"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
