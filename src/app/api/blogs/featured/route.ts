import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic'; // Ensure new random selection on refresh

export async function GET() {
  try {
    // 1. Fetch a pool of recent blogs (e.g., last 20)
    const blogs = await prisma.blog.findMany({
      take: 20,
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        title: true,
        content: true,
        imageUrl: true,
        slug: true,
        createdAt: true,
      }
    });

    if (!blogs || blogs.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    // 2. Shuffle array to get "Random" blogs from the recent pool
    const shuffled = blogs.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 4); // Get 4 blogs

    return NextResponse.json(selected);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}