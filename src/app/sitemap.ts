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

  // HIGH-PRIORITY Yala-focused pages for TOP RANKINGS
  const yalaTopPriorityPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0, // MAXIMUM PRIORITY - Homepage optimized for "Yala Wildlife"
    },
    {
      url: `${baseUrl}/yala-national-park-safari`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0, // TARGET: "Yala National Park Safari"
    },
    {
      url: `${baseUrl}/yala-safari-tours`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0, // TARGET: "Yala Safari Tours"
    },
    {
      url: `${baseUrl}/yala-jeep-services`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0, // TARGET: "Yala Jeep Services"
    },
    {
      url: `${baseUrl}/yala-wildlife-tours`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0, // TARGET: "Yala Wildlife Tours"
    }
  ]

  // SECOND-TIER Yala-specific service pages
  const yalaServicePages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/yala-leopard-safari`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.95, // TARGET: "Yala Leopard Safari"
    },
    {
      url: `${baseUrl}/yala-elephant-safari`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.95, // TARGET: "Yala Elephant Safari"
    },
    {
      url: `${baseUrl}/yala-safari-booking`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.95, // TARGET: "Yala Safari Booking"
    },
    {
      url: `${baseUrl}/yala-game-drive`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.95, // TARGET: "Yala Game Drive"
    },
    {
      url: `${baseUrl}/best-yala-safari`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.95, // TARGET: "Best Yala Safari"
    },
    {
      url: `${baseUrl}/yala-safari-prices`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9, // TARGET: "Yala Safari Prices"
    },
    {
      url: `${baseUrl}/yala-safari-packages`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9, // Redirect to main packages page
    }
  ]

  // THIRD-TIER Yala informational pages
  const yalaInfoPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/yala-national-park-guide`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.85, // TARGET: "Yala National Park Guide"
    },
    {
      url: `${baseUrl}/yala-safari-tips`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.85, // TARGET: "Yala Safari Tips"
    },
    {
      url: `${baseUrl}/yala-wildlife-photography`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8, // TARGET: "Yala Wildlife Photography"
    },
    {
      url: `${baseUrl}/yala-park-zones`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8, // TARGET: "Yala Park Zones"
    },
    {
      url: `${baseUrl}/yala-best-time-visit`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8, // TARGET: "Best Time Visit Yala"
    }
  ]

  // Enhanced static routes with Yala focus
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/safari-packages`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9, // High priority for main service page
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8, // Blog for fresh content
    },
    {
      url: `${baseUrl}/reviews`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85, // Reviews important for local SEO
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7, // Contact for local business
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6, // About page
    }
  ]

  // Dynamic routes for packages with Yala prioritization
  const packageRoutes: MetadataRoute.Sitemap = packages.map((pkg) => {
    // HIGHEST priority for Yala-related packages
    const isYalaPackage = pkg.name.toLowerCase().includes('yala') || 
                         pkg.slug.toLowerCase().includes('yala') ||
                         pkg.name.toLowerCase().includes('safari') ||
                         pkg.name.toLowerCase().includes('wildlife')
    
    return {
      url: `${baseUrl}/safari-packages/${pkg.slug}`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: isYalaPackage ? 0.9 : 0.7, // Prioritize Yala packages
    }
  })

  // Dynamic routes for blog posts with Yala content prioritization
  const blogRoutes: MetadataRoute.Sitemap = blogs.map((blog) => {
    // Higher priority for Yala-related blog content
    const isYalaBlog = blog.slug.toLowerCase().includes('yala') ||
                      blog.slug.toLowerCase().includes('safari') ||
                      blog.slug.toLowerCase().includes('wildlife') ||
                      blog.slug.toLowerCase().includes('leopard') ||
                      blog.slug.toLowerCase().includes('elephant')
    
    return {
      url: `${baseUrl}/blog/${blog.slug}`,
      lastModified: blog.createdAt.toISOString(),
      changeFrequency: 'monthly' as const,
      priority: isYalaBlog ? 0.8 : 0.6, // Prioritize Yala blog content
    }
  })

  // LOCATION-BASED Yala pages for local SEO
  const yalaLocationPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/yala-kirinda-entrance`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/yala-palatupana-entrance`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/tissamaharama-yala-safari`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.75,
    }
  ]

  // Combine ALL routes with strategic ordering (highest priority first)
  const allRoutes = [
    ...yalaTopPriorityPages,      // Priority 1.0 - Target main Yala keywords
    ...yalaServicePages,          // Priority 0.9-0.95 - Service-specific
    ...staticRoutes,              // Priority 0.6-0.9 - Core pages
    ...yalaInfoPages,             // Priority 0.8-0.85 - Informational
    ...packageRoutes,             // Priority 0.7-0.9 - Dynamic packages
    ...blogRoutes,                // Priority 0.6-0.8 - Blog content
    ...yalaLocationPages,         // Priority 0.75 - Location-based
  ]

  // Sort by priority (highest first) for optimal crawling
  return allRoutes.sort((a, b) => (b.priority || 0.5) - (a.priority || 0.5))
}
