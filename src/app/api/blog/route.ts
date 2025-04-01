// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";

// export async function GET(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const slug = searchParams.get("slug");

//     if (slug) {
//       // Fetch a single blog post by slug
//       const blog = await prisma.blog.findUnique({
//         where: { slug },
//       });
//       if (!blog) {
//         return NextResponse.json({ error: "Blog not found" }, { status: 404 });
//       }
//       return NextResponse.json(blog);
//     } else {
//       // Fetch all blog posts
//       const blogs = await prisma.blog.findMany({
//         orderBy: { createdAt: "desc" }, // Sort by newest first
//       });
//       return NextResponse.json(blogs);
//     }
//   } catch (error) {
//     console.error("Error fetching blogs:", error);
//     const errorMessage = error instanceof Error ? error.message : "Unknown error";
//     return NextResponse.json(
//       { error: "Failed to fetch blogs", details: errorMessage },
//       { status: 500 }
//     );
//   }
// }


import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";
import { verifyToken } from "@/lib/auth";

// Define a minimal type for Cloudinary upload result
interface CloudinaryUploadResult {
  secure_url: string;
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (slug) {
      const blog = await prisma.blog.findUnique({ where: { slug } });
      if (!blog) {
        return NextResponse.json({ error: "Blog not found" }, { status: 404 });
      }
      return NextResponse.json(blog);
    } else {
      const blogs = await prisma.blog.findMany({
        orderBy: { createdAt: "desc" },
      });
      return NextResponse.json(blogs.length ? blogs : []);
    }
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const slug = formData.get("slug") as string;
    const imageFile = formData.get("image") as File | null;
    const imageUrl = formData.get("imageUrl") as string | null;

    if (!title || !content || !slug || (!imageFile && !imageUrl)) {
      return NextResponse.json(
        { error: "Missing required fields: title, content, slug, or image" },
        { status: 400 }
      );
    }

    let finalImageUrl = imageUrl;
    if (imageFile) {
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { folder: "blogs", resource_type: "image" },
            (error, result) => (error ? reject(error) : resolve(result))
          )
          .end(buffer);
      });
      finalImageUrl = (uploadResult as CloudinaryUploadResult).secure_url; // Changed: Use defined type
    }

    const blog = await prisma.blog.create({
      data: { title, content, imageUrl: finalImageUrl!, slug },
    });
    return NextResponse.json({ message: "Blog created", blog }, { status: 201 });
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      { error: "Failed to create blog", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const id = req.nextUrl.searchParams.get("id");
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const slug = formData.get("slug") as string;
    const imageFile = formData.get("image") as File | null;
    const imageUrl = formData.get("imageUrl") as string | null;

    if (!id || !title || !content || !slug) {
      return NextResponse.json(
        { error: "Missing required fields: id, title, content, or slug" },
        { status: 400 }
      );
    }

    let finalImageUrl = imageUrl;
    if (imageFile) {
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { folder: "blogs", resource_type: "image" },
            (error, result) => (error ? reject(error) : resolve(result))
          )
          .end(buffer);
      });
      finalImageUrl = (uploadResult as CloudinaryUploadResult).secure_url; // Changed: Use defined type
    }

    const blog = await prisma.blog.update({
      where: { id },
      data: { title, content, imageUrl: finalImageUrl || undefined, slug },
    });
    return NextResponse.json({ message: "Blog updated", blog });
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json(
      { error: "Failed to update blog", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const id = req.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Missing blog ID" }, { status: 400 });
    }

    await prisma.blog.delete({ where: { id } });
    return NextResponse.json({ message: "Blog deleted" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { error: "Failed to delete blog", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}