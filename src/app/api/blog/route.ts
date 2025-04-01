import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (slug) {
      // Fetch a single blog post by slug
      const blog = await prisma.blog.findUnique({
        where: { slug },
      });
      if (!blog) {
        return NextResponse.json({ error: "Blog not found" }, { status: 404 });
      }
      return NextResponse.json(blog);
    } else {
      // Fetch all blog posts
      const blogs = await prisma.blog.findMany({
        orderBy: { createdAt: "desc" }, // Sort by newest first
      });
      return NextResponse.json(blogs);
    }
  } catch (error) {
    console.error("Error fetching blogs:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to fetch blogs", details: errorMessage },
      { status: 500 }
    );
  }
}