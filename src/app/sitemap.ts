import { MetadataRoute } from 'next'
import prisma from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://yalawildlife.com'
  const currentDate = new Date().toISOString()

  // Get all safari packages
  const packages = await prisma.package.findMany({
    select: {
      slug: true,
      name: true,
    }
  })

  // Get all blog posts
  const blogs = await prisma.blog.findMany({
    select: {
      slug: true,
      createdAt: true,
    }
  })

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
    },
    {
      url: `${baseUrl}/safari-packages`,
      lastModified: currentDate,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
    },
    {
      url: `${baseUrl}/reviews`,
      lastModified: currentDate,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
    },
  ]

  // Dynamic routes for packages
  const packageRoutes: MetadataRoute.Sitemap = packages.map((pkg) => ({
    url: `${baseUrl}/safari-packages/${pkg.slug}`,
    lastModified: currentDate,
  }))

  // Dynamic routes for blog posts
  const blogRoutes: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: blog.createdAt,
  }))

  // Combine all routes and return
  return [...staticRoutes, ...packageRoutes, ...blogRoutes]
}
