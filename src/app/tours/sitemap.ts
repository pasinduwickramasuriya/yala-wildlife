import { MetadataRoute } from 'next';
import prisma from '@/lib/prisma';
import { tourPackages as staticTourPackages } from '@/data/tours';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://www.yalawildlife.com';
    const currentDate = new Date().toISOString();

    let tourPackages: any[] = [];
    const tourModel = (prisma as any).tour;

    if (tourModel) {
        try {
            tourPackages = await tourModel.findMany({
                select: {
                    slug: true,
                },
                take: 1000
            });
        } catch (error) {
            console.error('❌ Tour Sitemap database fetch failed, using static fallback:', error);
        }
    }

    if (!tourPackages || tourPackages.length === 0) {
        tourPackages = staticTourPackages.map(st => ({ slug: st.slug }));
    }

    const tourRoutes = tourPackages.map((tour) => ({
        url: `${baseUrl}/tours/${tour.slug}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.8
    }));

    return [
        {
            url: `${baseUrl}/tours`, // Main Tours Page
            lastModified: currentDate,
            changeFrequency: 'daily' as const,
            priority: 0.9
        },
        ...tourRoutes
    ];
}