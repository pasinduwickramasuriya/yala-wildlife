import React from "react";
import prisma from "@/lib/prisma";
import { tourPackages as staticTourPackages } from "@/data/tours";
import { Tour } from "./TourPackageCard";
import { TourHeroSlider } from "./TourHeroSlider";

export default async function TourNavigator() {
    // 1. DEFENSIVE AND CRASH-PROOF FETCHING
    let tourPackages: Tour[] = [];
    const tourModel = (prisma as any).tour;

    // Static fallback utility helper
    const getStaticTours = (): Tour[] => {
        return staticTourPackages.map(st => {
            const durationDays = st.itinerary.length;
            return {
                id: st.id,
                title: st.title,
                slug: st.slug,
                route: st.route,
                price: Number(st.price),
                duration: `${durationDays} Days / ${durationDays - 1} Nights`,
                imageUrl: "https://res.cloudinary.com/dkfnpmzpv/image/upload/v1771401761/hero_sections/dcjjvovjfbgidkiydjgw.jpg",
                isFeatured: st.id.includes("8-day") || st.id.includes("14-day"),
                description: st.description,
            } as Tour;
        });
    };

    if (tourModel) {
        try {
            const dbTours = await tourModel.findMany();
            if (dbTours && dbTours.length > 0) {
                tourPackages = dbTours.map((t: any) => ({
                    id: t.id || t.slug,
                    title: t.title,
                    slug: t.slug,
                    route: t.route,
                    price: Number(t.price),
                    duration: t.duration,
                    imageUrl: t.imageUrl,
                    isFeatured: !!t.isFeatured,
                    description: t.description,
                }));
            } else {
                tourPackages = getStaticTours();
            }
        } catch (err) {
            console.error("Prisma lookup failed in TourNavigator, using static fallback:", err);
            tourPackages = getStaticTours();
        }
    } else {
        console.warn("Prisma.tour is undefined in TourNavigator. Using static tours fallback.");
        tourPackages = getStaticTours();
    }

    return <TourHeroSlider tourPackages={tourPackages} />;
}