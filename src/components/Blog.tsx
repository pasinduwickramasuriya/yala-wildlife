"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface Blog {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  slug: string;
  createdAt: string; // DateTime from Prisma comes as ISO string
}

export default function Blog() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api/blog", {
          cache: "no-store", // Ensure fresh data
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch blogs");
        }
        const blogData: Blog[] = await response.json();
        setBlogs(blogData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-gray-200 animate-pulse rounded-lg shadow-md p-4">
              <div className="h-48 w-full bg-gray-300 rounded-md" />
              <div className="mt-4 h-6 bg-gray-300 rounded w-3/4" />
              <div className="mt-2 h-4 bg-gray-300 rounded w-full" />
              <div className="mt-2 h-4 bg-gray-300 rounded w-5/6" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-red-600 dark:text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
        Latest Blog Posts
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white dark:bg-black rounded-lg  overflow-hidden transition-transform hover:-translate-y-1"
          >
            <div className="relative h-48 w-full">
              <Image
                src={blog.imageUrl || "/placeholder-image.jpg"}
                alt={blog.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white line-clamp-1">
                {blog.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-2 line-clamp-2">
                {blog.content}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                {new Date(blog.createdAt).toLocaleDateString()}
              </p>
              <Link
                href={`/blog/${blog.slug}`}
                className="mt-4 inline-block text-green-600 dark:text-green-400 font-medium hover:underline"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}