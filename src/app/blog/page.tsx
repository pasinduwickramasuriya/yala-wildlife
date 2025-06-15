import Header from "@/components/Header";
import { Metadata } from "next";
import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import SEOContentBlock from "@/components/SEOContentBlock";

export const metadata: Metadata = {
  title: "Yala Wildlife Blog - Safari Stories & Wildlife Insights",
  description:
    "Explore Yala National Park through our expert wildlife guides, safari tips, and fascinating stories about Sri Lanka's diverse wildlife.",
  openGraph: {
    title: "Yala Wildlife Blog - Safari Stories & Wildlife Insights",
    description:
      "Explore Yala National Park through our expert wildlife guides, safari tips, and fascinating stories about Sri Lanka's diverse wildlife.",
    type: "article",
    images: [{ url: "/blog-hero.jpg", width: 1200, height: 630 }],
  },
};

export default async function BlogPage() {
  const posts = await prisma.blog.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const keywords = [
    "yala safari blog",
    "yala national park guide",
    "wildlife photography tips",
    "sri lanka safari blog",
    "yala wildlife stories",
    "leopard spotting guide",
    "best time to visit yala",
  ];

  const relatedLinks = [
    {
      title: "Book a Safari Package",
      href: "/safari-packages",
    },
    {
      title: "Customer Reviews",
      href: "/reviews",
    },
    {
      title: "Contact Us",
      href: "/contact",
    },
  ];

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SEOContentBlock
          title="Yala Wildlife Blog"
          description="Discover expert insights, wildlife stories, and safari tips from Yala National Park. Our blog features photography guides, animal spotting tips, and the latest park updates."
          keywords={keywords}
          relatedLinks={relatedLinks}
          showKeywords={true}
        />

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group block"
            >
              <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover transition group-hover:scale-105"
                />
              </div>
              <h2 className="mt-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
                {post.title}
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-400 line-clamp-2">
                {post.content.substring(0, 150)}...
              </p>
              <time className="mt-2 block text-sm text-gray-500">
                {new Date(post.createdAt).toLocaleDateString()}
              </time>
            </Link>
          ))}
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Blog",
              headline: "Yala Wildlife Blog",
              description:
                "Expert insights and stories from Yala National Park",
              publisher: {
                "@type": "Organization",
                name: "Yala Wildlife Safari",
                logo: {
                  "@type": "ImageObject",
                  url: "https://yalawildlife.com/logo.png",
                },
              },
              blogPost: posts.map((post) => ({
                "@type": "BlogPosting",
                headline: post.title,
                image: post.imageUrl,
                datePublished: post.createdAt,
                url: `https://yalawildlife.com/blog/${post.slug}`,
              })),
            }),
          }}
        />
      </div>
    </>
  );
}
