import { MetadataRoute } from 'next'
import prisma from '@/lib/prisma'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://www.yalawildlife.com'
    const currentDate = new Date().toISOString()

    try {
        const blogs = await prisma.blog.findMany({
            select: {
                slug: true,
                createdAt: true,
            },
            take: 1000
        })

        const posts = blogs.map((blog) => ({
            url: `${baseUrl}/blog/${blog.slug}`,
            lastModified: blog.createdAt.toISOString(),
            changeFrequency: 'monthly' as const,
            priority: 0.8
        }))

        return [
            {
                url: `${baseUrl}/blog`, // Main Blog List Page
                lastModified: currentDate,
                changeFrequency: 'weekly',
                priority: 0.9
            },
            ...posts
        ]
    } catch (error) {
        console.error('❌ Blog Sitemap generation failed:', error)
        // Fallback: just separate the blog list
        return [
            {
                url: `${baseUrl}/blog`,
                lastModified: currentDate,
                changeFrequency: 'weekly',
                priority: 0.9
            }
        ]
    }
}
