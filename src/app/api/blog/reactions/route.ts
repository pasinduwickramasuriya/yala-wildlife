import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const VALID_REACTIONS = ["like", "dislike", "love", "insightful", "wow"] as const;
type ReactionType = (typeof VALID_REACTIONS)[number];

function isValidReaction(type: string): type is ReactionType {
  return VALID_REACTIONS.includes(type as ReactionType);
}

const NO_CACHE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0, s-maxage=0",
  "Pragma": "no-cache",
  "Expires": "0",
};

// GET: Fetch real-time reactions summary for a blog slug (and current user's reaction)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    const clientParam = searchParams.get("clientId");
    const cookieVid = req.cookies.get("yala_vid")?.value;

    if (!slug) {
      return NextResponse.json({ error: "Blog slug is required" }, { status: 400, headers: NO_CACHE_HEADERS });
    }

    const clientIds = Array.from(
      new Set([clientParam, cookieVid].filter(Boolean).map((s) => String(s).trim()))
    );

    const reactions = await prisma.blogReaction.findMany({
      where: { blogSlug: slug },
      select: { type: true, clientId: true },
    });

    const counts: Record<ReactionType, number> = {
      like: 0,
      dislike: 0,
      love: 0,
      insightful: 0,
      wow: 0,
    };

    let userReaction: ReactionType | null = null;

    for (const r of reactions) {
      const type = String(r.type);
      if (isValidReaction(type)) {
        counts[type] = (counts[type] || 0) + 1;
      }
      if (clientIds.length > 0 && clientIds.includes(r.clientId) && isValidReaction(type)) {
        userReaction = type === "like" ? "love" : type;
      }
    }

    // Merge love and legacy like counts into love
    const totalLove = (counts.love || 0) + (counts.like || 0);

    const response = NextResponse.json(
      {
        counts: {
          love: totalLove,
          dislike: counts.dislike || 0,
          like: 0,
          insightful: 0,
          wow: 0,
        },
        total: totalLove + (counts.dislike || 0),
        userReaction,
      },
      { headers: NO_CACHE_HEADERS }
    );

    // Sync cookie across browser if clientId is known
    const activeClientId = clientIds[0];
    if (activeClientId && (!cookieVid || cookieVid !== activeClientId)) {
      response.cookies.set("yala_vid", activeClientId, {
        maxAge: 60 * 60 * 24 * 365,
        path: "/",
        sameSite: "lax",
      });
    }

    return response;
  } catch (error) {
    console.error("Error fetching blog reactions:", error);
    return NextResponse.json(
      { error: "Failed to fetch reactions", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500, headers: NO_CACHE_HEADERS }
    );
  }
}

// POST: Toggle, switch, or add a reaction per unique visitor
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { slug, type } = body;
    const cookieVid = req.cookies.get("yala_vid")?.value;
    const clientParam = body.clientId as string | undefined;

    const clientIds = Array.from(
      new Set([clientParam, cookieVid].filter(Boolean).map((s) => String(s).trim()))
    );

    if (!slug || typeof slug !== "string") {
      return NextResponse.json({ error: "Missing or invalid slug" }, { status: 400, headers: NO_CACHE_HEADERS });
    }

    if (clientIds.length === 0) {
      return NextResponse.json(
        { error: "Missing or invalid visitor identifier" },
        { status: 400, headers: NO_CACHE_HEADERS }
      );
    }

    if (!type || !isValidReaction(type)) {
      return NextResponse.json(
        { error: `Invalid reaction type. Allowed: ${VALID_REACTIONS.join(", ")}` },
        { status: 400, headers: NO_CACHE_HEADERS }
      );
    }

    const primaryClientId = clientIds[0];

    // Check if this visitor already reacted to this blog (matching either cookie or clientId)
    const existing = await prisma.blogReaction.findFirst({
      where: {
        blogSlug: slug,
        clientId: { in: clientIds },
      },
    });

    let currentUserReaction: ReactionType | null = null;

    if (existing) {
      const isSameReaction =
        existing.type === type ||
        (existing.type === "like" && type === "love") ||
        (existing.type === "love" && type === "like");

      if (isSameReaction) {
        // Toggle OFF (un-react) - remove all records for this visitor on this blog
        await prisma.blogReaction.deleteMany({
          where: {
            blogSlug: slug,
            clientId: { in: clientIds },
          },
        });
        currentUserReaction = null;
      } else {
        // Switch to the other reaction
        await prisma.blogReaction.update({
          where: { id: existing.id },
          data: {
            type,
            clientId: primaryClientId,
          },
        });
        currentUserReaction = type;
      }
    } else {
      // Create new unique reaction record
      await prisma.blogReaction.create({
        data: {
          blogSlug: slug,
          clientId: primaryClientId,
          type,
        },
      });
      currentUserReaction = type;
    }

    // Compute updated aggregates
    const allReactions = await prisma.blogReaction.findMany({
      where: { blogSlug: slug },
      select: { type: true },
    });

    let loveCount = 0;
    let dislikeCount = 0;

    for (const r of allReactions) {
      if (r.type === "love" || r.type === "like") {
        loveCount++;
      } else if (r.type === "dislike") {
        dislikeCount++;
      }
    }

    // Sync counters on Blog model for quick queries
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (prisma.blog as any).updateMany({
        where: { slug },
        data: {
          likes: loveCount,
          dislikes: dislikeCount,
        },
      });
    } catch (e) {
      console.warn("Could not sync blog counters:", e);
    }

    // Invalidate Next.js cache so the page immediately reflects updated counts
    try {
      revalidatePath(`/blog/${slug}`);
    } catch (e) {
      console.warn("Could not revalidate blog path:", e);
    }

    const response = NextResponse.json(
      {
        success: true,
        userReaction: currentUserReaction,
        counts: {
          love: loveCount,
          dislike: dislikeCount,
          like: 0,
          insightful: 0,
          wow: 0,
        },
        total: loveCount + dislikeCount,
      },
      { headers: NO_CACHE_HEADERS }
    );

    // Keep visitor cookie alive for 1 year
    response.cookies.set("yala_vid", primaryClientId, {
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
      sameSite: "lax",
    });

    return response;
  } catch (error) {
    console.error("Error saving blog reaction:", error);
    return NextResponse.json(
      { error: "Failed to record reaction", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500, headers: NO_CACHE_HEADERS }
    );
  }
}
