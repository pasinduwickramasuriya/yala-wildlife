import fs from "fs";
import path from "path";
import prisma from "@/lib/prisma";

export interface PackageData {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  price?: number | null;
  imageUrl?: string | null;
}

export interface HeroSectionData {
  id: string;
  imageUrl: string;
  title: string;
  subtitle: string;
}

export interface ReviewPhotoData {
  reviewId: string;
  authorName: string;
  rating: number;
  relativeTime: string;
  reviewText: string;
  url: string;
}

export interface ReviewData {
  id: string;
  author_name: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
}

export interface BlogData {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  slug: string;
  createdAt: string;
}

const DEFAULT_HERO_SECTIONS: HeroSectionData[] = [
  {
    id: "default-1",
    title: "YALA WILDLIFE SAFARI",
    subtitle: "Experience Sri Lanka's premier national park with guaranteed leopard sightings and luxury 4x4 jeeps.",
    imageUrl: "/uploads/yala1.webp",
  },
  {
    id: "default-2",
    title: "WILD ELEPHANT HERDS",
    subtitle: "Watch majestic Asian elephants gathering along the scenic Menik River bank at dusk.",
    imageUrl: "/uploads/yala2.webp",
  },
  {
    id: "default-3",
    title: "EXPERT SAFARI GUIDES",
    subtitle: "Custom tailored wildlife game drives led by top naturalist trackers in Yala Block 1.",
    imageUrl: "https://res.cloudinary.com/dkfnpmzpv/image/upload/v1784456381/blogs/jqbr6khinkvptii7ax0c.jpg",
  },
];

const DEFAULT_BLOGS: BlogData[] = [
  {
    id: "fb-1",
    title: "Leopard Spotting in Yala Block 1",
    content: "Discover the best granite outcrops and watering holes for spotting Sri Lankan leopards.",
    imageUrl: "/uploads/yala1.webp",
    slug: "leopard-spotting-yala-block-1",
    createdAt: new Date().toISOString(),
  },
  {
    id: "fb-2",
    title: "The Wild Elephant Herds of Menik River",
    content: "Experience Asian elephants gathering along the Menik River banks.",
    imageUrl: "/uploads/yala2.webp",
    slug: "wild-elephant-herds-menik-river",
    createdAt: new Date().toISOString(),
  },
  {
    id: "fb-3",
    title: "Complete Guide to Yala Safari Seasons",
    content: "Plan your wildlife trip with expert tips on climate and waterhole activity.",
    imageUrl: "https://res.cloudinary.com/dkfnpmzpv/image/upload/v1784456381/blogs/jqbr6khinkvptii7ax0c.jpg",
    slug: "yala-safari-seasons-guide",
    createdAt: new Date().toISOString(),
  },
  {
    id: "fb-4",
    title: "Sloth Bears & Rare Birdlife of Yala",
    content: "Uncover Yala's incredible biodiversity beyond big cats.",
    imageUrl: "https://res.cloudinary.com/dkfnpmzpv/image/upload/v1784789489/blogs/cey5tcc2jkxwzj4kd9dc.jpg",
    slug: "sloth-bears-rare-birdlife",
    createdAt: new Date().toISOString(),
  },
  {
    id: "fb-5",
    title: "Luxury 4x4 Jeep Safari Experience",
    content: "Why an upgraded custom 4x4 jeep makes all the difference.",
    imageUrl: "https://res.cloudinary.com/dkfnpmzpv/image/upload/v1784792078/blogs/q9pbmwka9hce9zfydocc.jpg",
    slug: "luxury-4x4-jeep-safari",
    createdAt: new Date().toISOString(),
  },
];

export async function getHomePageData() {
  let packages: PackageData[] = [];
  let heroSections: HeroSectionData[] = [];
  let blogs: BlogData[] = [];
  let reviewPhotos: ReviewPhotoData[] = [];
  let reviews: ReviewData[] = [];

  try {
    const dbPackages = await prisma.package.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        price: true,
        imageUrl: true,
      },
    });
    packages = dbPackages as PackageData[];
  } catch (error) {
    console.error("Error loading packages from DB:", error);
  }

  try {
    const dbHero = await prisma.heroSection.findMany();
    if (Array.isArray(dbHero) && dbHero.length > 0) {
      heroSections = dbHero as HeroSectionData[];
    } else {
      heroSections = DEFAULT_HERO_SECTIONS;
    }
  } catch (error) {
    heroSections = DEFAULT_HERO_SECTIONS;
  }

  try {
    const dbBlogs = await prisma.blog.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        content: true,
        imageUrl: true,
        slug: true,
        createdAt: true,
      },
    });
    if (Array.isArray(dbBlogs) && dbBlogs.length > 0) {
      blogs = dbBlogs.map((b) => ({
        ...b,
        createdAt: typeof b.createdAt === "string" ? b.createdAt : new Date(b.createdAt).toISOString(),
      }));
    } else {
      blogs = DEFAULT_BLOGS;
    }
  } catch (error) {
    blogs = DEFAULT_BLOGS;
  }

  // Load Review Photos from JSON
  try {
    const filePath = path.join(process.cwd(), "data", "review-photos.json");
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        reviewPhotos = parsed
          .filter((p: any) => p.url && p.rating >= 4 && p.reviewText?.trim().length > 0);
      }
    }
  } catch (error) {
    console.error("Error reading review-photos.json:", error);
  }

  // Load Reviews from JSON
  try {
    const filePath = path.join(process.cwd(), "data", "reviews.json");
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        reviews = parsed.filter((r: any) => r.rating >= 4 && r.text?.trim().length > 0);
      }
    }
  } catch (error) {
    console.error("Error reading reviews.json:", error);
  }

  return {
    packages,
    heroSections,
    blogs,
    reviewPhotos,
    reviews,
  };
}
