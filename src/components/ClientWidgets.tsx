"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const WhatsAppButton = dynamic(() => import("./WhatsAppButton"), { ssr: false });
const GoogleTranslate = dynamic(() => import("./GoogleTranslate"), { ssr: false });
const ChatAssistant = dynamic(() => import("./ChatAssistant"), { ssr: false });

export default function ClientWidgets() {
  const [loadWidgets, setLoadWidgets] = useState(false);

  useEffect(() => {
    const handleInteraction = () => {
      setLoadWidgets(true);
      removeListeners();
    };

    const removeListeners = () => {
      window.removeEventListener("scroll", handleInteraction);
      window.removeEventListener("pointerdown", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };

    window.addEventListener("scroll", handleInteraction, { passive: true, once: true });
    window.addEventListener("pointerdown", handleInteraction, { passive: true, once: true });
    window.addEventListener("keydown", handleInteraction, { passive: true, once: true });
    window.addEventListener("touchstart", handleInteraction, { passive: true, once: true });

    let idleTimer: any;
    if ("requestIdleCallback" in window) {
      idleTimer = (window as any).requestIdleCallback(() => setLoadWidgets(true), { timeout: 7000 });
    } else {
      idleTimer = setTimeout(() => setLoadWidgets(true), 7000);
    }

    return () => {
      removeListeners();
      if ("cancelIdleCallback" in window) {
        (window as any).cancelIdleCallback(idleTimer);
      } else {
        clearTimeout(idleTimer);
      }
    };
  }, []);

  useEffect(() => {
    if (!loadWidgets) return;

    const loadAdSense = () => {
      if (document.getElementById("adsense-script")) return;
      const s = document.createElement("script");
      s.id = "adsense-script";
      s.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7796031889927448";
      s.async = true;
      s.crossOrigin = "anonymous";
      document.head.appendChild(s);
    };

    loadAdSense();
  }, [loadWidgets]);

  if (!loadWidgets) return null;

  return (
    <>
      <WhatsAppButton />
      <GoogleTranslate />
      <ChatAssistant />
    </>
  );
}
