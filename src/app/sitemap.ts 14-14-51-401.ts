import { MetadataRoute } from 'next'
import prisma from '@/lib/prisma'

// ✅ ENHANCED: Revalidate every hour for fresh content
export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.yalawildlife.com'
  const currentDate = new Date().toISOString()

  try {
    // ✅ FIXED: Removed updatedAt from orderBy since it doesn't exist in Package model
    const packages = await prisma.package.findMany({
      select: {
        slug: true,
        name: true,
      },
      take: 1000 // Limit for performance
    })

    // ✅ FIXED: Removed 'published' field and related queries since it doesn't exist in Blog model
    const blogs = await prisma.blog.findMany({
      select: {
        slug: true,
        // createdAt: true, // ✅ REMOVED: Add this only if createdAt exists in your Blog model
      },
      // ✅ REMOVED: where clause with published field since it doesn't exist
      // where: {
      //   published: true
      // },
      // ✅ REMOVED: orderBy since createdAt might not exist
      // orderBy: {
      //   createdAt: 'desc'
      // },
      take: 1000 // Limit for performance
    })

    // ✅ ENHANCED: High-priority static routes matching your folder structure
    const staticRoutes: MetadataRoute.Sitemap = [
      {
        url: baseUrl,
        lastModified: currentDate,
        changeFrequency: 'daily',
        priority: 1.0  // Highest priority for homepage
      },
      {
        url: `${baseUrl}/safari-packages`,
        lastModified: currentDate,
        changeFrequency: 'daily',  // Changed to daily for better crawling
        priority: 0.95  // Very high priority for main service page
      },
      {
        url: `${baseUrl}/about`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.8
      },
      {
        url: `${baseUrl}/contact`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.8  // Important for local SEO
      },
      {
        url: `${baseUrl}/reviews`,
        lastModified: currentDate,
        changeFrequency: 'weekly',  // Reviews change frequently
        priority: 0.9  // High priority for trust signals
      },
      {
        url: `${baseUrl}/blog`,
        lastModified: currentDate,
        changeFrequency: 'weekly',  // Blog listing changes with new posts
        priority: 0.8
      },
      {
        url: `${baseUrl}/faq`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.7  // Based on your existing FAQ page
      },
    ]

    // ✅ FIXED: Use currentDate since createdAt may not exist in Package model
    const packageRoutes: MetadataRoute.Sitemap = packages.map((pkg) => ({
      url: `${baseUrl}/safari-packages/${pkg.slug}`,
      lastModified: currentDate, // ✅ FIXED: Use currentDate instead of timestamps
      changeFrequency: 'weekly' as const,  // Packages may get updated
      priority: 0.9  // High priority for service pages
    }))

    // ✅ FIXED: Use currentDate since createdAt may not exist in Blog model
    const blogRoutes: MetadataRoute.Sitemap = blogs.map((blog) => ({
      url: `${baseUrl}/blog/${blog.slug}`,
      lastModified: currentDate, // ✅ FIXED: Use currentDate instead of timestamps
      changeFrequency: 'monthly' as const,  // Blog posts are relatively static
      priority: 0.7  // Good for content marketing SEO
    }))

    // ✅ ADDED: High-value keyword-specific pages for better SEO coverage
    const keywordPages: MetadataRoute.Sitemap = [
      {
        url: `${baseUrl}/yala-national-park`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.9  // High-value keyword page
      },
      {
        url: `${baseUrl}/leopard-safari`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.9  // High-value keyword page
      },
      {
        url: `${baseUrl}/elephant-safari`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.9  // High-value keyword page
      },
      {
        url: `${baseUrl}/wildlife-photography`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.85 // Based on your gallery content
      },
      {
        url: `${baseUrl}/safari-booking`,
        lastModified: currentDate,
        changeFrequency: 'daily',
        priority: 0.95  // High conversion page
      },
      {
        url: `${baseUrl}/yala-wildlife-gallery`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.8  // Photo gallery page
      },
    ]

    // ✅ ADDED: Service-specific category pages for long-tail keywords
    const categoryRoutes: MetadataRoute.Sitemap = [
      {
        url: `${baseUrl}/half-day-safari`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.85
      },
      {
        url: `${baseUrl}/full-day-safari`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.85
      },
      {
        url: `${baseUrl}/private-safari`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.85
      },
      {
        url: `${baseUrl}/luxury-safari`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.85
      },
      {
        url: `${baseUrl}/budget-safari`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.8
      },
      {
        url: `${baseUrl}/group-safari`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.8
      },
    ]

    // ✅ ADDED: Location-based SEO pages for local search dominance
    const locationRoutes: MetadataRoute.Sitemap = [
      {
        url: `${baseUrl}/tissamaharama-safari`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.8
      },
      {
        url: `${baseUrl}/kataragama-safari`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.75
      },
      {
        url: `${baseUrl}/hambantota-safari`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.75
      },
      {
        url: `${baseUrl}/southern-province-safari`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.7
      },
    ]

    // ✅ ADDED: Seasonal and experience-based pages
    const experienceRoutes: MetadataRoute.Sitemap = [
      {
        url: `${baseUrl}/best-time-yala-safari`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.75
      },
      {
        url: `${baseUrl}/yala-safari-tips`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.7
      },
      {
        url: `${baseUrl}/what-to-expect-yala-safari`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.7
      },
      {
        url: `${baseUrl}/yala-safari-guide`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.75
      },
    ]

    const totalUrls = staticRoutes.length + packageRoutes.length + blogRoutes.length +
      keywordPages.length + categoryRoutes.length + locationRoutes.length +
      experienceRoutes.length

    console.log(`✅ Sitemap generated with ${totalUrls} URLs`)

    return [
      ...staticRoutes,
      ...packageRoutes,
      ...blogRoutes,
      ...keywordPages,
      ...categoryRoutes,
      ...locationRoutes,
      ...experienceRoutes
    ]

  } catch (error) {
    console.error('❌ Error generating sitemap:', error)

    // ✅ FALLBACK: Return essential static routes if database fails
    return [
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
        priority: 0.95
      },
      {
        url: `${baseUrl}/about`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.8
      },
      {
        url: `${baseUrl}/contact`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.8
      },
      {
        url: `${baseUrl}/reviews`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.9
      },
      {
        url: `${baseUrl}/blog`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.8
      },
      {
        url: `${baseUrl}/faq`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.7
      },
    ]
  }
}





