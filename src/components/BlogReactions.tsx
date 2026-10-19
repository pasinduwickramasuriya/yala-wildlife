"use client";

import { useState, useEffect, useCallback, useTransition } from "react";
import { Heart, ThumbsDown, Check } from "lucide-react";

export type ReactionType = "love" | "dislike";

interface ReactionButtonConfig {
  key: ReactionType;
  label: string;
  icon: typeof Heart;
  activeColor: string;
  activeBg: string;
  hoverColor: string;
}

const REACTIONS: ReactionButtonConfig[] = [
  {
    key: "love",
    label: "Heart",
    icon: Heart,
    activeColor: "text-rose-400",
    activeBg: "bg-rose-500/20",
    hoverColor: "hover:text-rose-400",
  },
  {
    key: "dislike",
    label: "Dislike",
    icon: ThumbsDown,
    activeColor: "text-red-400",
    activeBg: "bg-red-500/20",
    hoverColor: "hover:text-red-400",
  },
];

interface CompactBlogReactionsProps {
  slug: string;
  initialCounts?: {
    love?: number;
    dislike?: number;
    like?: number;
    insightful?: number;
    wow?: number;
  };
}

// Client-side helper for resilient persistent visitor ID (Cookie + localStorage)
function getVisitorId(): string {
  if (typeof window === "undefined") return "server";
  let vid = "";

  try {
    vid = localStorage.getItem("yala_visitor_id") || "";
  } catch {}

  // Fallback to cookie if localStorage is cleared or blocked on mobile
  if (!vid && typeof document !== "undefined") {
    const match = document.cookie.match(/(?:^|;\s*)yala_vid=([^;]+)/);
    if (match) {
      try {
        vid = decodeURIComponent(match[1]);
      } catch {
        vid = match[1];
      }
    }
  }

  // Generate new ID if not found anywhere
  if (!vid) {
    vid = "v_" + Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
  }

  // Ensure both localStorage and document.cookie are synced
  try {
    localStorage.setItem("yala_visitor_id", vid);
  } catch {}

  try {
    document.cookie = `yala_vid=${encodeURIComponent(vid)}; path=/; max-age=31536000; SameSite=Lax`;
  } catch {}

  return vid;
}

export default function CompactBlogReactions({ slug, initialCounts }: CompactBlogReactionsProps) {
  const [counts, setCounts] = useState<Record<ReactionType, number>>({
    love: (initialCounts?.love ?? 0) + (initialCounts?.like ?? 0),
    dislike: initialCounts?.dislike ?? 0,
  });

  // Start with null on SSR to ensure 100% clean hydration match between server and client
  const [userReaction, setUserReaction] = useState<ReactionType | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeBounce, setActiveBounce] = useState<ReactionType | null>(null);
  const [, startTransition] = useTransition();

  // Restore from localStorage and sync with server on mount
  useEffect(() => {
    // 1. Immediately restore local reaction after hydration (no SSR mismatch)
    try {
      const cached = localStorage.getItem(`yala_reaction_${slug}`);
      if (cached === "love" || cached === "dislike") {
        setUserReaction(cached);
      }
    } catch {}

    const vid = getVisitorId();
    if (!vid || vid === "server") return;

    fetch(
      `/api/blog/reactions?slug=${encodeURIComponent(slug)}&clientId=${encodeURIComponent(vid)}&_t=${Date.now()}`,
      { cache: "no-store" }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data && data.counts) {
          startTransition(() => {
            const serverLove = (data.counts.love ?? 0) + (data.counts.like ?? 0);
            const serverDislike = data.counts.dislike ?? 0;

            setCounts({
              love: serverLove,
              dislike: serverDislike,
            });

            const verifiedReaction =
              data.userReaction === "like"
                ? "love"
                : data.userReaction === "love" || data.userReaction === "dislike"
                ? data.userReaction
                : null;

            setUserReaction(verifiedReaction);

            // Keep localStorage strictly in sync with server truth
            try {
              if (verifiedReaction) {
                localStorage.setItem(`yala_reaction_${slug}`, verifiedReaction);
              } else {
                localStorage.removeItem(`yala_reaction_${slug}`);
              }
            } catch {}
          });
        }
      })
      .catch((err) => {
        console.warn("Could not sync reactions:", err);
      });
  }, [slug]);

  // Handle reaction click with instant optimistic update & instant removal
  const handleReactionClick = useCallback(
    async (type: ReactionType) => {
      if (isSubmitting) return;

      const vid = getVisitorId();
      const prevReaction = userReaction;
      const prevCounts = { ...counts };

      // Optimistic state update
      const nextCounts = { ...counts };
      let nextReaction: ReactionType | null = null;

      if (prevReaction === type) {
        // Toggle OFF (un-react) -> Remove immediately
        nextCounts[type] = Math.max(0, (nextCounts[type] || 0) - 1);
        nextReaction = null;
        try {
          localStorage.removeItem(`yala_reaction_${slug}`);
        } catch {}
      } else {
        // Switch or new reaction
        if (prevReaction) {
          nextCounts[prevReaction] = Math.max(0, (nextCounts[prevReaction] || 0) - 1);
        }
        nextCounts[type] = (nextCounts[type] || 0) + 1;
        nextReaction = type;
        try {
          localStorage.setItem(`yala_reaction_${slug}`, type);
        } catch {}
      }

      setCounts(nextCounts);
      setUserReaction(nextReaction);
      setActiveBounce(type);
      setTimeout(() => setActiveBounce(null), 500);

      setIsSubmitting(true);

      try {
        const res = await fetch("/api/blog/reactions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
          },
          body: JSON.stringify({
            slug,
            type,
            clientId: vid,
          }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed");

        if (data.counts) {
          const verifiedLove = (data.counts.love ?? 0) + (data.counts.like ?? 0);
          const verifiedDislike = data.counts.dislike ?? 0;

          setCounts({
            love: verifiedLove,
            dislike: verifiedDislike,
          });

          const serverVerifiedReaction =
            data.userReaction === "like"
              ? "love"
              : data.userReaction === "love" || data.userReaction === "dislike"
              ? data.userReaction
              : null;

          setUserReaction(serverVerifiedReaction);

          try {
            if (serverVerifiedReaction) {
              localStorage.setItem(`yala_reaction_${slug}`, serverVerifiedReaction);
            } else {
              localStorage.removeItem(`yala_reaction_${slug}`);
            }
          } catch {}
        }
      } catch (err) {
        console.error("Reaction request failed:", err);
        // Rollback on network failure
        setCounts(prevCounts);
        setUserReaction(prevReaction);
        try {
          if (prevReaction) {
            localStorage.setItem(`yala_reaction_${slug}`, prevReaction);
          } else {
            localStorage.removeItem(`yala_reaction_${slug}`);
          }
        } catch {}
      } finally {
        setIsSubmitting(false);
      }
    },
    [counts, isSubmitting, slug, userReaction]
  );

  return (
    <div
      className="inline-flex items-center gap-1 bg-white/5 rounded-full px-1.5 py-1 backdrop-blur-md"
      role="group"
      aria-label="Blog reactions"
    >
      {REACTIONS.map((r) => {
        const Icon = r.icon;
        const isSelected = userReaction === r.key;
        const count = counts[r.key] || 0;
        const isBouncing = activeBounce === r.key;

        return (
          <button
            key={r.key}
            type="button"
            onClick={() => handleReactionClick(r.key)}
            disabled={isSubmitting}
            title={`${r.label} (${count})`}
            aria-label={`${r.label}: ${count} reactions`}
            aria-pressed={isSelected}
            className={`group inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all duration-200 active:scale-95 cursor-pointer border-none outline-none ${
              isSelected
                ? `${r.activeBg} ${r.activeColor}`
                : `text-neutral-300 hover:bg-white/10 ${r.hoverColor}`
            }`}
          >
            <Icon
              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                isBouncing ? "scale-125" : "group-hover:scale-110"
              } ${isSelected ? `${r.activeColor} fill-current` : ""}`}
            />
            <span className="font-mono text-[11px] leading-none">{count}</span>
          </button>
        );
      })}
    </div>
  );
}

// Interactive Share button helper with clipboard copy fallback (borderless)
export function BlogShareButton({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : `https://yalawildlife.com/blog/${slug}`;
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title,
          url,
        });
        return;
      } catch {
        // User cancelled or share failed, fallback to clipboard
      }
    }
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (e) {
        console.warn("Could not copy:", e);
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      type="button"
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border-none outline-none text-xs font-medium text-neutral-300 hover:text-white transition-all cursor-pointer"
      title="Share article"
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-[#00ff00]" />
          <span className="text-[#00ff00]">Copied!</span>
        </>
      ) : (
        <>
          <span className="w-3.5 h-3.5 flex items-center justify-center">🔗</span>
          <span>Share</span>
        </>
      )}
    </button>
  );
}
