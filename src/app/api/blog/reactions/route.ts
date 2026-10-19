import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const VALID_REACTIONS = ["like", "dislike", "love", "insightful", "wow"] as const;
type ReactionType = (typeof VALID_REACTIONS)[number];

function isValidReaction(type: string): type is ReactionType {
  return VALID_REACTIONS.includes(type as ReactionType);
}

// GET: Fetch reactions summary for a blog slug (and current user's reaction)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    const clientParam = searchParams.get("clientId");
    const cookieVid = req.cookies.get("yala_vid")?.value;
    const clientId = clientParam || cookieVid;

    if (!slug) {
      return NextResponse.json({ error: "Blog slug is required" }, { status: 400 });
    }

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
      if (clientId && r.clientId === clientId && isValidReaction(type)) {
        userReaction = type;
      }
    }

    const total = reactions.length;

    const response = NextResponse.json({
      counts,
      total,
      userReaction,
    });

    // Ensure persistent 1-year visitor cookie is attached
    if (clientId && (!cookieVid || cookieVid !== clientId)) {
      response.cookies.set("yala_vid", clientId, {
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
      { status: 500 }
    );
  }
}

// POST: Toggle, switch, or add a reaction per unique visitor
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { slug, type } = body;
    const cookieVid = req.cookies.get("yala_vid")?.value;
    const clientId = (body.clientId || cookieVid || "").trim();

    if (!slug || typeof slug !== "string") {
      return NextResponse.json({ error: "Missing or invalid slug" }, { status: 400 });
    }

    if (!clientId) {
      return NextResponse.json({ error: "Missing or invalid visitor identifier" }, { status: 400 });
    }

    if (!type || !isValidReaction(type)) {
      return NextResponse.json(
        { error: `Invalid reaction type. Allowed: ${VALID_REACTIONS.join(", ")}` },
        { status: 400 }
      );
    }

    // Check if this unique visitor already reacted to this blog post
    const existing = await prisma.blogReaction.findUnique({
      where: {
        blogSlug_clientId: {
          blogSlug: slug,
          clientId,
        },
      },
    });

    let currentUserReaction: ReactionType | null = null;

    if (existing) {
      if (existing.type === type) {
        // Toggle OFF (un-react) if clicking the active reaction again
        await prisma.blogReaction.delete({
          where: { id: existing.id },
        });
        currentUserReaction = null;
      } else {
        // Switch to the other reaction (e.g. from dislike to heart, or vice versa)
        await prisma.blogReaction.update({
          where: { id: existing.id },
          data: { type },
        });
        currentUserReaction = type;
      }
    } else {
      // Create new unique reaction record
      await prisma.blogReaction.create({
        data: {
          blogSlug: slug,
          clientId,
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

    const counts: Record<ReactionType, number> = {
      like: 0,
      dislike: 0,
      love: 0,
      insightful: 0,
      wow: 0,
    };

    for (const r of allReactions) {
      const type = String(r.type);
      if (isValidReaction(type)) {
        counts[type] = (counts[type] || 0) + 1;
      }
    }

    // Sync counters on Blog model for quick queries
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (prisma.blog as any).updateMany({
        where: { slug },
        data: {
          likes: (counts.love || 0) + (counts.like || 0),
          dislikes: counts.dislike || 0,
        },
      });
    } catch (e) {
      console.warn("Could not sync blog counters:", e);
    }

    const response = NextResponse.json({
      success: true,
      userReaction: currentUserReaction,
      counts,
      total: allReactions.length,
    });

    // Ensure visitor cookie is stored for 1 year
    response.cookies.set("yala_vid", clientId, {
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
      sameSite: "lax",
    });

    return response;
  } catch (error) {
    console.error("Error saving blog reaction:", error);
    return NextResponse.json(
      { error: "Failed to record reaction", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
