"use client";

import { useEffect, useRef } from "react";

interface AdUnitProps {
  className?: string;
}

export default function AdUnit({ className = "" }: AdUnitProps) {
  const adRef = useRef<HTMLModElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    try {
      // Push the ad only once per mount
      (
        (window as unknown as { adsbygoogle: unknown[] }).adsbygoogle =
          (window as unknown as { adsbygoogle: unknown[] }).adsbygoogle || []
      ).push({});
    } catch (e) {
      // silently fail in environments where adsbygoogle isn't available (e.g. SSR)
      console.warn("AdSense push failed:", e);
    }
  }, []);

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-7796031889927448"
        data-ad-slot="6659358448"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
