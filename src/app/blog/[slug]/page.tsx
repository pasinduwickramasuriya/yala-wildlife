import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import prisma from "@/lib/prisma"; // Import Prisma client
import DotsBackground from "@/components/DotsBackground";

// Define the Blog interface based on the Prisma schema
interface Blog {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  slug: string;
  createdAt: Date; // Prisma DateTime returns as Date object
}

// Fetch blog post by slug directly from the database
async function getBlog(slug: string): Promise<Blog> {
  try {
    const blog = await prisma.blog.findUnique({
      where: { slug },
    });
    if (!blog) {
      notFound(); // Trigger Next.js 404 page if blog not found
    }
    return blog; // Return blog data if found
  } catch (error) {
    console.error("Error fetching blog:", error);
    notFound(); // Trigger 404 on error
  }
}

// Custom props type for Next.js server component
interface BlogPostProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export default async function BlogPost({ params }: BlogPostProps) {
  // Fetch blog data using the slug from params
  const blog = await getBlog((await params).slug);

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-4xl mt-6 bg-background">
        {/* Blog Header */}
        <h1 className="text-4xl font-bold text-foreground mb-6">
          {blog.title}
        </h1>

        {/* Blog Image */}
        <div className="relative w-full h-96 mb-6">
          <Image
            src={blog.imageUrl || "/placeholder-image.jpg"}
            alt={blog.title}
            fill
            className="object-cover rounded-lg"
            priority // Load image faster for above-the-fold content
          />
        </div>

        {/* Blog Metadata */}
        <div className="flex items-center justify-between text-muted-foreground mb-8">
          <p>
            {blog.createdAt.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p>{blog.title}</p>
        </div>

        {/* Blog Content */}
        <div className="prose prose-lg text-foreground">
          {blog.content.split("\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {/* Back to Blog List Link */}
        <div className="mt-8">
          <Link
            href="/blog"
            className="text-green-600 font-medium hover:underline"
          >
            ← Back to All Blogs
          </Link>
        </div>
      </div>
      <DotsBackground/>
    </>
  );
}

export const revalidate = 0; // Disable caching for dynamic content
