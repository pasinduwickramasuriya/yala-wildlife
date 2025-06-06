import { MetadataRoute } from 'next'
import prisma from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://yalawildlife.com'
  const currentDate = new Date()

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
      updatedAt: true,
    },
  })

  // Static routes
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/safari-packages`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/reviews`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]

  // Dynamic routes for packages
  const packageRoutes = packages.map((pkg) => ({
    url: `${baseUrl}/safari-packages/${pkg.slug}`,
    lastModified: pkg.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  // Dynamic routes for blog posts
  const blogRoutes = blogs.map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: blog.updatedAt,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticRoutes, ...packageRoutes, ...blogRoutes]
}
