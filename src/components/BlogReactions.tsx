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

// Client-side helper for anonymous persistent visitor ID
function getVisitorId(): string {
  if (typeof window === "undefined") return "server";
  let vid = localStorage.getItem("yala_visitor_id");
  if (!vid) {
    vid = "v_" + Math.random().toString(36).substring(2, 12) + Date.now().toString(36);
    try {
      localStorage.setItem("yala_visitor_id", vid);
    } catch {
      // Ignore private browsing quota restrictions
    }
  }
  return vid;
}

export default function CompactBlogReactions({ slug, initialCounts }: CompactBlogReactionsProps) {
  const [counts, setCounts] = useState<Record<ReactionType, number>>({
    love: initialCounts?.love ?? (initialCounts?.like ?? 0),
    dislike: initialCounts?.dislike ?? 0,
  });

  const [userReaction, setUserReaction] = useState<ReactionType | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeBounce, setActiveBounce] = useState<ReactionType | null>(null);
  const [, startTransition] = useTransition();

  // Sync visitor's active reaction from server
  useEffect(() => {
    const vid = getVisitorId();
    if (!vid || vid === "server") return;

    fetch(`/api/blog/reactions?slug=${encodeURIComponent(slug)}&clientId=${encodeURIComponent(vid)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.counts) {
          startTransition(() => {
            setCounts({
              love: data.counts.love ?? 0,
              dislike: data.counts.dislike ?? 0,
            });
            if (data.userReaction === "love" || data.userReaction === "dislike") {
              setUserReaction(data.userReaction);
            } else if (data.userReaction === "like") {
              // Backward compatibility if user had previously liked
              setUserReaction("love");
            }
          });
        }
      })
      .catch((err) => {
        console.warn("Could not sync reactions:", err);
      });
  }, [slug]);

  // Handle reaction click with optimistic update
  const handleReactionClick = useCallback(
    async (type: ReactionType) => {
      if (isSubmitting) return;

      const vid = getVisitorId();
      const prevReaction = userReaction;
      const prevCounts = { ...counts };

      // Optimistic state
      const nextCounts = { ...counts };
      let nextReaction: ReactionType | null = null;

      if (prevReaction === type) {
        // Toggle OFF (un-react)
        nextCounts[type] = Math.max(0, (nextCounts[type] || 0) - 1);
        nextReaction = null;
      } else {
        if (prevReaction) {
          nextCounts[prevReaction] = Math.max(0, (nextCounts[prevReaction] || 0) - 1);
        }
        nextCounts[type] = (nextCounts[type] || 0) + 1;
        nextReaction = type;
      }

      setCounts(nextCounts);
      setUserReaction(nextReaction);
      setActiveBounce(type);
      setTimeout(() => setActiveBounce(null), 500);

      setIsSubmitting(true);

      try {
        const res = await fetch("/api/blog/reactions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            slug,
            type,
            clientId: vid,
          }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed");

        if (data.counts) {
          setCounts({
            love: data.counts.love ?? 0,
            dislike: data.counts.dislike ?? 0,
          });
          setUserReaction(data.userReaction);
        }
      } catch (err) {
        console.error("Reaction request failed:", err);
        // Rollback on network failure
        setCounts(prevCounts);
        setUserReaction(prevReaction);
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
