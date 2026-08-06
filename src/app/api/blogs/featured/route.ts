import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const revalidate = 60;

const FALLBACK_BLOGS = [
  {
    id: "fb-1",
    title: "Leopard Spotting in Yala Block 1",
    content: "Discover the best granite outcrops and watering holes for spotting Sri Lankan leopards in Yala National Park.",
    imageUrl: "/uploads/yala1.webp",
    slug: "leopard-spotting-yala-block-1",
    createdAt: new Date().toISOString(),
  },
  {
    id: "fb-2",
    title: "The Wild Elephant Herds of Menik River",
    content: "Experience Asian elephants gathering along the Menik River banks during dusk and dawn game drives.",
    imageUrl: "/uploads/yala2.webp",
    slug: "wild-elephant-herds-menik-river",
    createdAt: new Date().toISOString(),
  },
  {
    id: "fb-3",
    title: "Complete Guide to Yala Safari Seasons",
    content: "Plan your wildlife trip with expert tips on climate, waterhole activity, and peak sighting months.",
    imageUrl: "https://images.unsplash.com/photo-1547970810-dc92b3848368?q=80&w=1200&auto=format&fit=crop",
    slug: "yala-safari-seasons-guide",
    createdAt: new Date().toISOString(),
  },
  {
    id: "fb-4",
    title: "Sloth Bears & Rare Birdlife of Yala",
    content: "Uncover Yala's incredible biodiversity beyond big cats, featuring sloth bears, crocodiles, and endemic birds.",
    imageUrl: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1200&auto=format&fit=crop",
    slug: "sloth-bears-rare-birdlife",
    createdAt: new Date().toISOString(),
  },
  {
    id: "fb-5",
    title: "Luxury 4x4 Jeep Safari Experience",
    content: "Why an upgraded custom 4x4 jeep makes all the difference for wildlife photography and comfort.",
    imageUrl: "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?q=80&w=1200&auto=format&fit=crop",
    slug: "luxury-4x4-jeep-safari",
    createdAt: new Date().toISOString(),
  },
  {
    id: "fb-6",
    title: "Spotted Deer in Golden Morning Light",
    content: "Graceful Axis deer grazing along the open savannahs of Yala during early morning safaris.",
    imageUrl: "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?q=80&w=1200&auto=format&fit=crop",
    slug: "spotted-deer-golden-light",
    createdAt: new Date().toISOString(),
  },
  {
    id: "fb-7",
    title: "Peacocks of Patanangala Dunes",
    content: "Vibrant Indian peacocks displaying magnificent plumage across the coastal dunes.",
    imageUrl: "https://images.unsplash.com/photo-1555169062-013468b47731?q=80&w=1200&auto=format&fit=crop",
    slug: "peacocks-patanangala-dunes",
    createdAt: new Date().toISOString(),
  },
  {
    id: "fb-8",
    title: "Sunset silhouetting Wild Water Buffalo",
    content: "Massive wild water buffalo wallowing in Palatupana lagoon under sunset skies.",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
    slug: "sunset-wild-water-buffalo",
    createdAt: new Date().toISOString(),
  },
  {
    id: "fb-9",
    title: "Crested Serpent Eagle in Canopy",
    content: "Spotting majestic birds of prey perched high atop dry zone forest trees.",
    imageUrl: "https://images.unsplash.com/photo-1618281377501-88c2328cbb9a?q=80&w=1200&auto=format&fit=crop",
    slug: "crested-serpent-eagle-canopy",
    createdAt: new Date().toISOString(),
  },
  {
    id: "fb-10",
    title: "Mugger Crocodile Basking on Sandbanks",
    content: "Giant reptiles warming up along riverbanks and watering holes of Block 1.",
    imageUrl: "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?q=80&w=1200&auto=format&fit=crop",
    slug: "mugger-crocodile-basking",
    createdAt: new Date().toISOString(),
  }
];

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      take: 20,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        content: true,
        imageUrl: true,
        slug: true,
        createdAt: true,
      },
    });

    if (!blogs || blogs.length === 0) {
      return NextResponse.json(FALLBACK_BLOGS, {
        status: 200,
        headers: { 'Cache-Control': 'public, max-age=60, s-maxage=3600, stale-while-revalidate=86400' },
      });
    }

    return NextResponse.json(blogs, {
      status: 200,
      headers: { 'Cache-Control': 'public, max-age=60, s-maxage=3600, stale-while-revalidate=86400' },
    });
  } catch (error) {
    console.error("Error fetching featured blogs, returning fallback data:", error);
    return NextResponse.json(FALLBACK_BLOGS, {
      status: 200,
      headers: { 'Cache-Control': 'public, max-age=60, s-maxage=3600, stale-while-revalidate=86400' },
    });
  }
}