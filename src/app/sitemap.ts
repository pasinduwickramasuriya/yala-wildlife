// import { MetadataRoute } from 'next'
// import prisma from '@/lib/prisma'

// export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
//   const baseUrl = 'https://yalawildlife.com'
//   const currentDate = new Date().toISOString()

//   // Get all safari packages
//   const packages = await prisma.package.findMany({
//     select: {
//       slug: true,
//       name: true,
//     }
//   })

//   // Get all blog posts
//   const blogs = await prisma.blog.findMany({
//     select: {
//       slug: true,
//       createdAt: true,
//     }
//   })

//   // Static routes
//   const staticRoutes: MetadataRoute.Sitemap = [
//     {
//       url: baseUrl,
//       lastModified: currentDate,
//     },
//     {
//       url: `${baseUrl}/safari-packages`,
//       lastModified: currentDate,
//     },
//     {
//       url: `${baseUrl}/blog`,
//       lastModified: currentDate,
//     },
//     {
//       url: `${baseUrl}/reviews`,
//       lastModified: currentDate,
//     },
//     {
//       url: `${baseUrl}/contact`,
//       lastModified: currentDate,
//     },
//     {
//       url: `${baseUrl}/about`,
//       lastModified: currentDate,
//     },
//   ]

//   // Dynamic routes for packages
//   const packageRoutes: MetadataRoute.Sitemap = packages.map((pkg) => ({
//     url: `${baseUrl}/safari-packages/${pkg.slug}`,
//     lastModified: currentDate,
//   }))

//   // Dynamic routes for blog posts
//   const blogRoutes: MetadataRoute.Sitemap = blogs.map((blog) => ({
//     url: `${baseUrl}/blog/${blog.slug}`,
//     lastModified: blog.createdAt,
//   }))

//   // Combine all routes and return
//   return [...staticRoutes, ...packageRoutes, ...blogRoutes]
// }


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

  // High-priority static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0
    },
    {
      url: `${baseUrl}/safari-packages`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/reviews`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7
    },
  ]

  // Dynamic package pages with high priority
  const packageRoutes: MetadataRoute.Sitemap = packages.map((pkg) => ({
    url: `${baseUrl}/safari-packages/${pkg.slug}`,
    lastModified: currentDate, // Using current date since Package doesn't have timestamps
    changeFrequency: 'weekly',
    priority: 0.9
  }))

  // Blog posts with medium priority
  const blogRoutes: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: blog.createdAt.toISOString(),
    changeFrequency: 'monthly',
    priority: 0.6
  }))

  return [...staticRoutes, ...packageRoutes, ...blogRoutes]
}
