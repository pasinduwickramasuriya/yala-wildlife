import { MetadataRoute } from 'next';
import { tourPackages } from '@/data/tours';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://yalawildlife.com';

    // 1. DYNAMIC TOUR DATA
    // We set these to 'weekly' because tour details rarely change daily, 
    // but we want Google to check for availability/price updates regularly.
    const tourUrls = tourPackages.map((tour) => ({
        url: `${baseUrl}/tours/${tour.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    // 2. STATIC CORE PAGES
    // Higher priority (1.0 - 0.9) tells Google these are your main entry points.
    const staticPages = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily' as const, // Home page changes most often with feed/updates
            priority: 1.0,
        },
        {
            url: `${baseUrl}/tours`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.6,
        },
    ];

    // 3. COMBINE & OPTIMIZE
    // Spreading the arrays to create one flat list for search engines.
    return [...staticPages, ...tourUrls];
}