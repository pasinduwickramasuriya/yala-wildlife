"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";

const WhatsAppButton = dynamic(() => import("./WhatsAppButton"), { ssr: false });
const GoogleTranslate = dynamic(() => import("./GoogleTranslate"), { ssr: false });
const ChatAssistant = dynamic(() => import("./ChatAssistant"), { ssr: false });
const SEOIndicator = dynamic(() => import("./SEOIndicator").then((mod) => mod.SEOIndicator), { ssr: false });

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

    const triggerLoad = () => {
      loadAdSense();
      document.removeEventListener("scroll", triggerLoad);
      document.removeEventListener("touchstart", triggerLoad);
    };

    document.addEventListener("scroll", triggerLoad, { passive: true });
    document.addEventListener("touchstart", triggerLoad, { passive: true });

    return () => {
      document.removeEventListener("scroll", triggerLoad);
      document.removeEventListener("touchstart", triggerLoad);
    };
  }, []);

  return (
    <>
      <WhatsAppButton />
      <GoogleTranslate />
      <ChatAssistant />
      <SEOIndicator />
    </>
  );
}
