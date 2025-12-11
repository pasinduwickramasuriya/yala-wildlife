import { MetadataRoute } from 'next'
import prisma from '@/lib/prisma'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://www.yalawildlife.com'
    const currentDate = new Date().toISOString()

    try {
        const packages = await prisma.package.findMany({
            select: {
                slug: true,
            },
            take: 1000
        })

        const packageRoutes = packages.map((pkg) => ({
            url: `${baseUrl}/safari-packages/${pkg.slug}`,
            lastModified: currentDate,
            changeFrequency: 'weekly' as const,
            priority: 0.9
        }))

        return [
            {
                url: `${baseUrl}/safari-packages`, // Main Packages List Page
                lastModified: currentDate,
                changeFrequency: 'daily',
                priority: 0.95
            },
            ...packageRoutes
        ]
    } catch (error) {
        console.error('❌ Safari Package Sitemap generation failed:', error)
        return [
            {
                url: `${baseUrl}/safari-packages`,
                lastModified: currentDate,
                changeFrequency: 'daily',
                priority: 0.95
            }
        ]
    }
}
