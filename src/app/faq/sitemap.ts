import { MetadataRoute } from 'next'

export const revalidate = 3600

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.yalawildlife.com'
    const currentDate = new Date().toISOString()

    return [
        {
            url: `${baseUrl}/faq`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.75
        }
    ]
}
