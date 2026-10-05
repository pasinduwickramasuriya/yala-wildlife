"use client";

import { Share2 } from "lucide-react";

export default function ShareButton({ title }: { title: string }) {
  const handleShare = () => {
    if (typeof window !== "undefined" && navigator.share) {
      navigator.share({
        title,
        url: window.location.href,
      }).catch(() => {});
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className="inline-flex items-center gap-2 bg-[#f8f9fa] hover:bg-[#f1f3f4] text-[#1f1f1f] font-bold text-[14px] px-5 py-2.5 rounded-full transition-colors cursor-pointer"
    >
      <Share2 className="w-4 h-4" />
      <span>Share</span>
    </button>
  );
}