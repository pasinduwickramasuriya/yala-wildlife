import { MetadataRoute } from 'next'

export const revalidate = 3600

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.yalawildlife.com'
  const currentDate = new Date().toISOString()

  return [
    {
      url: `${baseUrl}/yala-national-park-tickets`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.95 // Maximum commercial priority for search indexing
    }
  ]
}
