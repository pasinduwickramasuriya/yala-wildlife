import { MetadataRoute } from 'next'

export const revalidate = 3600

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.yalawildlife.com'
    const currentDate = new Date().toISOString()

    return [
        {
            url: `${baseUrl}/reviews`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.85
        }
    ]
}
