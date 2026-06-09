import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";
import { verifyToken } from "@/lib/auth";
import { revalidatePath } from "next/cache";

// Define a minimal type for Cloudinary upload res
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
    const token = req.cookies.get("admin_token")?.value || req.headers.get("Authorization")?.replace("Bearer ", "");
    const decoded = token ? await verifyToken(token) : null;

    if (!token || !decoded) {
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
      finalImageUrl = (uploadResult as CloudinaryUploadResult).secure_url;
    }

    const blog = await prisma.blog.create({
      data: { title, content, imageUrl: finalImageUrl!, slug },
    });

    // Revalidate blog listing and the new post page
    revalidatePath("/blog");
    revalidatePath(`/blog/${slug}`);

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
    const token = req.cookies.get("admin_token")?.value || req.headers.get("Authorization")?.replace("Bearer ", "");
    const decoded = token ? await verifyToken(token) : null;

    if (!token || !decoded) {
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
      finalImageUrl = (uploadResult as CloudinaryUploadResult).secure_url;
    }

    // Fetch the old blog slug to revalidate it if the slug changes
    const oldBlog = await prisma.blog.findUnique({
      where: { id },
      select: { slug: true }
    });

    const blog = await prisma.blog.update({
      where: { id },
      data: { title, content, imageUrl: finalImageUrl || undefined, slug },
    });

    // Revalidate pages to display updated content
    revalidatePath("/blog");
    revalidatePath(`/blog/${slug}`);
    if (oldBlog && oldBlog.slug !== slug) {
      revalidatePath(`/blog/${oldBlog.slug}`);
    }

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
    const token = req.cookies.get("admin_token")?.value || req.headers.get("Authorization")?.replace("Bearer ", "");
    const decoded = token ? await verifyToken(token) : null;

    if (!token || !decoded) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const id = req.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Missing blog ID" }, { status: 400 });
    }

    // Fetch the blog to get the slug for revalidation before deleting
    const blogToDelete = await prisma.blog.findUnique({
      where: { id },
      select: { slug: true }
    });

    if (blogToDelete) {
      await prisma.blog.delete({ where: { id } });

      // Revalidate pages to remove the deleted content from listing
      revalidatePath("/blog");
      revalidatePath(`/blog/${blogToDelete.slug}`);
    }

    return NextResponse.json({ message: "Blog deleted" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { error: "Failed to delete blog", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}