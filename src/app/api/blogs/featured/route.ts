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
      return NextResponse.json(FALLBACK_BLOGS, { status: 200 });
    }

    const shuffled = [...blogs].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 5);

    return NextResponse.json(selected, { status: 200 });
  } catch (error) {
    console.error("Error fetching featured blogs, returning fallback data:", error);
    return NextResponse.json(FALLBACK_BLOGS, { status: 200 });
  }
}