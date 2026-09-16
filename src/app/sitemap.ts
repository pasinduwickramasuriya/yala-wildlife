import { MetadataRoute } from 'next'
import prisma from '@/lib/prisma'

// ✅ ENHANCED: Revalidate every hour for fresh content
export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.yalawildlife.com'
  const currentDate = new Date().toISOString()

  try {
    // 1. Fetch dynamic packages
    const packages = await prisma.package.findMany({
      select: {
        slug: true,
      },
      take: 1000 // Limit for performance
    })

    // 2. Fetch dynamic blogs
    const blogs = await prisma.blog.findMany({
      select: {
        slug: true,
      },
      take: 1000 // Limit for performance
    })

    // 3. Fetch dynamic tours
    let tours: any[] = []
    const tourModel = (prisma as any).tour
    if (tourModel) {
      try {
        tours = await tourModel.findMany({
          select: {
            slug: true,
          },
          take: 1000
        })
      } catch (err) {
        console.error('⚠️ Could not query tours from database in main sitemap:', err)
      }
    }

    // 4. Static routes that ACTUALLY exist in your `src/app` folder
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
        changeFrequency: 'daily',
        priority: 0.95
      },
      {
        url: `${baseUrl}/tours`,
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
        priority: 0.8  // Important for local SEO
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
      {
        url: `${baseUrl}/pickup-dropoff`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.8
      },
      {
        url: `${baseUrl}/yala-national-park-tickets`,
        lastModified: currentDate,
        changeFrequency: 'daily',
        priority: 0.9
      },
      {
        url: `${baseUrl}/legal`,
        lastModified: currentDate,
        changeFrequency: 'yearly',
        priority: 0.5
      },
    ]

    // 5. Build dynamic paths
    const packageRoutes: MetadataRoute.Sitemap = packages.map((pkg) => ({
      url: `${baseUrl}/safari-packages/${pkg.slug}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9
    }))

    const blogRoutes: MetadataRoute.Sitemap = blogs.map((blog) => ({
      url: `${baseUrl}/blog/${blog.slug}`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7
    }))

    const tourRoutes: MetadataRoute.Sitemap = tours.map((tour) => ({
      url: `${baseUrl}/tours/${tour.slug}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9
    }))

    const totalUrls = staticRoutes.length + packageRoutes.length + blogRoutes.length + tourRoutes.length
    console.log(`✅ Sitemap generated with ${totalUrls} URLs`)

    return [
      ...staticRoutes,
      ...packageRoutes,
      ...blogRoutes,
      ...tourRoutes
    ]

  } catch (error) {
    console.error('❌ Error generating sitemap:', error)

    // FALLBACK: Return essential static routes if database fails
    return [
      { url: baseUrl, lastModified: currentDate, changeFrequency: 'daily', priority: 1.0 },
      { url: `${baseUrl}/safari-packages`, lastModified: currentDate, changeFrequency: 'daily', priority: 0.95 },
      { url: `${baseUrl}/tours`, lastModified: currentDate, changeFrequency: 'daily', priority: 0.95 },
      { url: `${baseUrl}/about`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.8 },
      { url: `${baseUrl}/contact`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.8 },
      { url: `${baseUrl}/reviews`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.9 },
      { url: `${baseUrl}/blog`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.8 },
      { url: `${baseUrl}/faq`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.7 },
      { url: `${baseUrl}/pickup-dropoff`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.8 },
      { url: `${baseUrl}/yala-national-park-tickets`, lastModified: currentDate, changeFrequency: 'daily', priority: 0.9 },
      { url: `${baseUrl}/legal`, lastModified: currentDate, changeFrequency: 'yearly', priority: 0.5 },
    ]
  }
}
