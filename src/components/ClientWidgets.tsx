"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";

const WhatsAppButton = dynamic(() => import("./WhatsAppButton"), { ssr: false });
const GoogleTranslate = dynamic(() => import("./GoogleTranslate"), { ssr: false });
const ChatAssistant = dynamic(() => import("./ChatAssistant"), { ssr: false });

export default function ClientWidgets() {
  useEffect(() => {
    const loadAdSense = () => {
      if (document.getElementById("adsense-script")) return;
      const s = document.createElement("script");
      s.id = "adsense-script";
      s.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7796031889927448";
      s.async = true;
      s.crossOrigin = "anonymous";
      document.head.appendChild(s);
    };

    if ("requestIdleCallback" in window) {
      const handle = (window as any).requestIdleCallback(loadAdSense, { timeout: 6000 });
      return () => (window as any).cancelIdleCallback(handle);
    } else {
      const timer = setTimeout(loadAdSense, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      <WhatsAppButton />
      <GoogleTranslate />
      <ChatAssistant />
    </>
  );
}
