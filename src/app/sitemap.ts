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







// import { MetadataRoute } from 'next'
// import prisma from '@/lib/prisma'

// // ✅ ENHANCED: Revalidate every hour for fresh content
// export const revalidate = 3600

// export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
//   const baseUrl = 'https://www.yalawildlife.com'  // ✅ FIXED: Added www subdomain
//   const currentDate = new Date().toISOString()

//   try {
//     // ✅ ENHANCED: Get packages with better data selection
//     const packages = await prisma.package.findMany({
//       select: {
//         slug: true,
//         updatedAt: true,
//         createdAt: true,
//         name: true, // For better error handling
//       },
//       orderBy: {
//         updatedAt: 'desc'
//       },
//       take: 1000 // Limit for performance
//     })

//     // ✅ ENHANCED: Get blogs with better data selection
//     const blogs = await prisma.blog.findMany({
//       select: {
//         slug: true,
//         updatedAt: true,
//         createdAt: true,
//         title: true, // For better error handling
//       },
//       where: {
//         published: true // Only published blogs
//       },
//       orderBy: {
//         updatedAt: 'desc'
//       },
//       take: 1000 // Limit for performance
//     })

//     // ✅ ENHANCED: High-priority static routes with SEO-optimized priorities
//     const staticRoutes: MetadataRoute.Sitemap = [
//       {
//         url: baseUrl,
//         lastModified: currentDate,
//         changeFrequency: 'daily',
//         priority: 1.0  // Highest priority for homepage
//       },
//       {
//         url: `${baseUrl}/safari-packages`,
//         lastModified: currentDate,
//         changeFrequency: 'daily',  // Changed to daily for better crawling
//         priority: 0.95  // Very high priority for main service page
//       },
//       {
//         url: `${baseUrl}/about`,
//         lastModified: currentDate,
//         changeFrequency: 'monthly',
//         priority: 0.8
//       },
//       {
//         url: `${baseUrl}/contact`,
//         lastModified: currentDate,
//         changeFrequency: 'monthly',
//         priority: 0.8  // Important for local SEO
//       },
//       {
//         url: `${baseUrl}/reviews`,
//         lastModified: currentDate,
//         changeFrequency: 'weekly',  // Reviews change frequently
//         priority: 0.9  // High priority for trust signals
//       },
//       {
//         url: `${baseUrl}/blog`,
//         lastModified: currentDate,
//         changeFrequency: 'daily',  // Blog listing changes with new posts
//         priority: 0.85
//       },
//       // ✅ ADDED: Additional important pages for SEO
//       {
//         url: `${baseUrl}/yala-national-park`,
//         lastModified: currentDate,
//         changeFrequency: 'weekly',
//         priority: 0.9  // High-value keyword page
//       },
//       {
//         url: `${baseUrl}/leopard-safari`,
//         lastModified: currentDate,
//         changeFrequency: 'weekly',
//         priority: 0.9  // High-value keyword page
//       },
//       {
//         url: `${baseUrl}/elephant-safari`,
//         lastModified: currentDate,
//         changeFrequency: 'weekly',
//         priority: 0.9  // High-value keyword page
//       },
//       {
//         url: `${baseUrl}/wildlife-photography`,
//         lastModified: currentDate,
//         changeFrequency: 'weekly',
//         priority: 0.85
//       },
//       {
//         url: `${baseUrl}/safari-booking`,
//         lastModified: currentDate,
//         changeFrequency: 'daily',
//         priority: 0.95  // High conversion page
//       },
//       {
//         url: `${baseUrl}/faq`,
//         lastModified: currentDate,
//         changeFrequency: 'monthly',
//         priority: 0.7
//       },
//     ]

//     // ✅ ENHANCED: Dynamic package pages with optimized settings
//     const packageRoutes: MetadataRoute.Sitemap = packages.map((pkg) => ({
//       url: `${baseUrl}/safari-packages/${pkg.slug}`,
//       lastModified: pkg.updatedAt ? pkg.updatedAt.toISOString() : pkg.createdAt.toISOString(),
//       changeFrequency: 'weekly' as const,  // Packages may get updated
//       priority: 0.9  // High priority for service pages
//     }))

//     // ✅ ENHANCED: Blog posts with better SEO settings
//     const blogRoutes: MetadataRoute.Sitemap = blogs.map((blog) => ({
//       url: `${baseUrl}/blog/${blog.slug}`,
//       lastModified: blog.updatedAt ? blog.updatedAt.toISOString() : blog.createdAt.toISOString(),
//       changeFrequency: 'monthly' as const,  // Blog posts are relatively static
//       priority: 0.7  // Good for content marketing SEO
//     }))

//     // ✅ ADDED: Category pages for better SEO coverage
//     const categoryRoutes: MetadataRoute.Sitemap = [
//       {
//         url: `${baseUrl}/half-day-safari`,
//         lastModified: currentDate,
//         changeFrequency: 'weekly',
//         priority: 0.85
//       },
//       {
//         url: `${baseUrl}/full-day-safari`,
//         lastModified: currentDate,
//         changeFrequency: 'weekly',
//         priority: 0.85
//       },
//       {
//         url: `${baseUrl}/private-safari`,
//         lastModified: currentDate,
//         changeFrequency: 'weekly',
//         priority: 0.85
//       },
//       {
//         url: `${baseUrl}/luxury-safari`,
//         lastModified: currentDate,
//         changeFrequency: 'weekly',
//         priority: 0.85
//       },
//       {
//         url: `${baseUrl}/budget-safari`,
//         lastModified: currentDate,
//         changeFrequency: 'weekly',
//         priority: 0.8
//       },
//     ]

//     console.log(`Sitemap generated with ${staticRoutes.length + packageRoutes.length + blogRoutes.length + categoryRoutes.length} URLs`)

//     return [...staticRoutes, ...packageRoutes, ...blogRoutes, ...categoryRoutes]

//   } catch (error) {
//     console.error('Error generating sitemap:', error)
    
//     // ✅ FALLBACK: Return static routes if database fails
//     return [
//       {
//         url: baseUrl,
//         lastModified: currentDate,
//         changeFrequency: 'daily',
//         priority: 1.0
//       },
//       {
//         url: `${baseUrl}/safari-packages`,
//         lastModified: currentDate,
//         changeFrequency: 'daily',
//         priority: 0.95
//       },
//       {
//         url: `${baseUrl}/about`,
//         lastModified: currentDate,
//         changeFrequency: 'monthly',
//         priority: 0.8
//       },
//       {
//         url: `${baseUrl}/contact`,
//         lastModified: currentDate,
//         changeFrequency: 'monthly',
//         priority: 0.8
//       },
//     ]
//   }
// }
