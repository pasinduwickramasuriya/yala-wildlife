import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { v2 as cloudinary } from "cloudinary";

interface CloudinaryUploadResult {
  secure_url: string;
  [key: string]: unknown;
}

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Utility to normalize slug
function normalizeSlug(slug: string): string {
  return slug
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Global error handler
const handleError = (error: unknown, action: string) => {
  const errorMessage = error instanceof Error ? error.message : String(error);
  console.error(`Error ${action} tour:`, error);
  return NextResponse.json(
    { error: `Failed to ${action} tour`, details: errorMessage },
    { status: 500 }
  );
};

// GET HANDLER
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const slug = searchParams.get("slug");

    const tourModel = (prisma as any).tour;

    // --- STALE PRISMA CACHE RECOVERY ---
    if (!tourModel) {
      console.warn("Prisma.tour is undefined inside GET /api/tours. Falling back to static data mapping.");
      const { tourPackages } = require("@/data/tours");

      if (id || slug) {
        const found = tourPackages.find((p: any) => p.id === id || p.slug === slug);
        if (!found) return NextResponse.json({ error: "Tour not found" }, { status: 404 });
        
        const durationDays = found.itinerary.length;
        return NextResponse.json({
          id: found.id,
          title: found.title,
          slug: found.slug,
          route: found.route,
          price: found.price,
          duration: `${durationDays} Days / ${durationDays - 1} Nights`,
          imageUrl: "https://res.cloudinary.com/dkfnpmzpv/image/upload/v1771401761/hero_sections/dcjjvovjfbgidkiydjgw.jpg",
          isFeatured: found.id.includes("8-day") || found.id.includes("14-day"),
          description: found.description,
          longDescription: found.longDescription,
          highlights: found.highlights,
          inclusions: [
            "Private air-conditioned luxury vehicle",
            "English-speaking licensed chauffeur guide",
            "All fuel, highway toll charges, and parking fees",
            "Airport pick-up and drop-off transfers",
            "All accommodation on Bed & Breakfast basis"
          ],
          exclusions: [
            "International flights and Sri Lankan entry visa fees",
            "Entrance tickets to sightseeing sites & national parks",
            "Lunch & dinner meals (unless specified)"
          ],
          itinerary: found.itinerary.map((it: any) => ({
            day: Number(it.day),
            title: String(it.title),
            description: String(it.description),
            included: it.included ? String(it.included) : null,
            highlight: it.highlight ? String(it.highlight) : null
          })),
          seoKeywords: found.seoKeywords
        });
      }

      const durationMapped = tourPackages.map((st: any) => {
        const durationDays = st.itinerary.length;
        return {
          id: st.id,
          title: st.title,
          slug: st.slug,
          route: st.route,
          price: st.price,
          duration: `${durationDays} Days / ${durationDays - 1} Nights`,
          imageUrl: "https://res.cloudinary.com/dkfnpmzpv/image/upload/v1771401761/hero_sections/dcjjvovjfbgidkiydjgw.jpg",
          isFeatured: st.id.includes("8-day") || st.id.includes("14-day"),
          description: st.description,
          longDescription: st.longDescription,
          highlights: st.highlights,
          inclusions: [],
          exclusions: [],
          itinerary: st.itinerary,
          seoKeywords: st.seoKeywords
        };
      });
      return NextResponse.json(durationMapped);
    }

    // --- DYNAMIC DATABASE QUERY ---
    if (id) {
      const tour = await tourModel.findUnique({ where: { id } });
      if (!tour) return NextResponse.json({ error: "Tour not found" }, { status: 404 });
      return NextResponse.json(tour);
    } else if (slug) {
      const normalizedSlug = normalizeSlug(slug);
      const tour = await tourModel.findUnique({ where: { slug: normalizedSlug } });
      if (!tour) return NextResponse.json({ error: "Tour not found" }, { status: 404 });
      return NextResponse.json(tour);
    } else {
      const tours = await tourModel.findMany();
      return NextResponse.json(tours);
    }
  } catch (error) {
    return handleError(error, "fetching");
  }
}

// POST HANDLER
export async function POST(request: Request) {
  try {
    // 1. Authenticate Admin
    const token = (request as any).cookies?.get("admin_token")?.value || request.headers.get("authorization")?.split(" ")[1];
    if (!token) return NextResponse.json({ error: "Unauthorized: No token provided" }, { status: 401 });
    
    const decoded = await verifyToken(token);
    if (!decoded || decoded.role !== "admin") {
      return NextResponse.json({ error: "Forbidden: Admins only" }, { status: 403 });
    }

    const tourModel = (prisma as any).tour;

    // --- STALE PRISMA CACHE RECOVERY ---
    if (!tourModel) {
      return NextResponse.json({
        error: "Next.js Dev Server Restart Required",
        details: "The new Tour database model has been generated successfully, but the Next.js dev server cache is holding onto a stale Prisma Client definition in memory. Please restart your Next.js development server (Ctrl+C and run 'npm run dev' again) to reload the Prisma Client."
      }, { status: 503 });
    }

    // 2. Parse Form Data
    const formData = await request.formData();
    const title = formData.get("title") as string | null;
    const slug = formData.get("slug") as string | null;
    const route = formData.get("route") as string || "";
    const duration = formData.get("duration") as string || "";
    const description = formData.get("description") as string || "";
    const longDescription = formData.get("longDescription") as string || "";
    const seoKeywords = formData.get("seoKeywords") as string || "";
    
    const price = parseFloat(formData.get("price")?.toString() || "0");
    const isFeatured = formData.get("isFeatured") === "true";

    // Image file or URL
    const imageUrl = formData.get("imageUrl") as string | null;
    const imageFile = formData.get("image") as File | null;

    // Highlights, Inclusions, Exclusions (split by newlines)
    const highlightsText = formData.get("highlights") as string || "";
    const highlights = highlightsText.split("\n").map(s => s.trim()).filter(Boolean);

    const inclusionsText = formData.get("inclusions") as string || "";
    const inclusions = inclusionsText.split("\n").map(s => s.trim()).filter(Boolean);

    const exclusionsText = formData.get("exclusions") as string || "";
    const exclusions = exclusionsText.split("\n").map(s => s.trim()).filter(Boolean);

    // Itinerary Day array (JSON string)
    const itineraryRaw = formData.get("itinerary") as string || "[]";
    let itinerary = [];
    try {
      itinerary = JSON.parse(itineraryRaw);
      // Ensure day fields are integers
      itinerary = itinerary.map((item: any) => ({
        day: parseInt(item.day) || 1,
        title: String(item.title || ""),
        description: String(item.description || ""),
        included: item.included ? String(item.included) : null,
        highlight: item.highlight ? String(item.highlight) : null,
      }));
    } catch (e) {
      console.error("Failed to parse itinerary JSON:", e);
    }

    if (!title || !slug) {
      return NextResponse.json({ error: "Name and Slug are required" }, { status: 400 });
    }

    // 3. Image Upload
    let finalImageUrl = "";
    if (imageFile && imageFile.size > 0) {
      try {
        const arrayBuffer = await imageFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const uploadResult = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { folder: "tours", resource_type: "image" },
            (error, result) => (error ? reject(error) : resolve(result as CloudinaryUploadResult))
          ).end(buffer);
        });
        finalImageUrl = uploadResult.secure_url;
      } catch (uploadError) {
        console.error("Cloudinary upload failed for tour:", uploadError);
        return NextResponse.json({ error: "Image upload failed" }, { status: 500 });
      }
    } else if (imageUrl && imageUrl.trim() !== "") {
      finalImageUrl = imageUrl;
    } else {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }

    // 4. Create database record
    const normalizedSlug = normalizeSlug(slug);
    const tour = await tourModel.create({
      data: {
        title,
        slug: normalizedSlug,
        route,
        price,
        duration,
        imageUrl: finalImageUrl,
        isFeatured,
        description,
        longDescription,
        highlights,
        inclusions,
        exclusions,
        itinerary,
        seoKeywords,
      },
    });

    return NextResponse.json(tour, { status: 201 });
  } catch (error) {
    return handleError(error, "creating");
  }
}

// PUT HANDLER
export async function PUT(request: Request) {
  try {
    // 1. Authenticate Admin
    const token = (request as any).cookies?.get("admin_token")?.value || request.headers.get("authorization")?.split(" ")[1];
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    
    const decoded = await verifyToken(token);
    if (!decoded || decoded.role !== "admin") {
      return NextResponse.json({ error: "Forbidden: Admins only" }, { status: 403 });
    }

    const tourModel = (prisma as any).tour;

    // --- STALE PRISMA CACHE RECOVERY ---
    if (!tourModel) {
      return NextResponse.json({
        error: "Next.js Dev Server Restart Required",
        details: "The new Tour database model has been generated successfully, but the Next.js dev server cache is holding onto a stale Prisma Client definition in memory. Please restart your Next.js development server (Ctrl+C and run 'npm run dev' again) to reload the Prisma Client."
      }, { status: 503 });
    }

    // 2. Extract ID
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Tour ID is required" }, { status: 400 });

    // 3. Parse Data
    const formData = await request.formData();
    const title = formData.get("title") as string | null;
    const slug = formData.get("slug") as string | null;
    const route = formData.get("route") as string | null;
    const duration = formData.get("duration") as string | null;
    const description = formData.get("description") as string | null;
    const longDescription = formData.get("longDescription") as string | null;
    const seoKeywords = formData.get("seoKeywords") as string | null;
    
    const priceRaw = formData.get("price");
    const price = priceRaw ? parseFloat(priceRaw.toString()) : undefined;
    
    const isFeaturedRaw = formData.get("isFeatured");
    const isFeatured = isFeaturedRaw !== null ? isFeaturedRaw === "true" : undefined;

    const imageUrl = formData.get("imageUrl") as string | null;
    const imageFile = formData.get("image") as File | null;

    // Process lists
    const highlightsText = formData.get("highlights") as string | null;
    const highlights = highlightsText !== null ? highlightsText.split("\n").map(s => s.trim()).filter(Boolean) : undefined;

    const inclusionsText = formData.get("inclusions") as string | null;
    const inclusions = inclusionsText !== null ? inclusionsText.split("\n").map(s => s.trim()).filter(Boolean) : undefined;

    const exclusionsText = formData.get("exclusions") as string | null;
    const exclusions = exclusionsText !== null ? exclusionsText.split("\n").map(s => s.trim()).filter(Boolean) : undefined;

    const itineraryRaw = formData.get("itinerary") as string | null;
    let itinerary = undefined;
    if (itineraryRaw !== null) {
      try {
        const parsed = JSON.parse(itineraryRaw);
        itinerary = parsed.map((item: any) => ({
          day: parseInt(item.day) || 1,
          title: String(item.title || ""),
          description: String(item.description || ""),
          included: item.included ? String(item.included) : null,
          highlight: item.highlight ? String(item.highlight) : null,
        }));
      } catch (e) {
        console.error("Failed to parse itinerary JSON during PUT:", e);
      }
    }

    // Handle Image
    let finalImageUrl: string | undefined = undefined;
    if (imageFile && imageFile.size > 0) {
      try {
        const arrayBuffer = await imageFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const uploadResult = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { folder: "tours", resource_type: "image" },
            (error, result) => (error ? reject(error) : resolve(result as CloudinaryUploadResult))
          ).end(buffer);
        });
        finalImageUrl = uploadResult.secure_url;
      } catch (uploadError) {
        console.error("Cloudinary upload failed for tour update:", uploadError);
        return NextResponse.json({ error: "Image upload failed" }, { status: 500 });
      }
    } else if (imageUrl !== null && imageUrl.trim() !== "") {
      finalImageUrl = imageUrl;
    }

    // 4. Update
    const normalizedSlug = slug ? normalizeSlug(slug) : undefined;
    const tour = await tourModel.update({
      where: { id },
      data: {
        title: title || undefined,
        slug: normalizedSlug,
        route: route || undefined,
        price,
        duration: duration || undefined,
        imageUrl: finalImageUrl,
        isFeatured,
        description: description || undefined,
        longDescription: longDescription || undefined,
        highlights,
        inclusions,
        exclusions,
        itinerary,
        seoKeywords: seoKeywords || undefined,
      },
    });

    return NextResponse.json(tour);
  } catch (error) {
    return handleError(error, "updating");
  }
}

// DELETE HANDLER
export async function DELETE(request: Request) {
  try {
    // 1. Authenticate Admin
    const token = (request as any).cookies?.get("admin_token")?.value || request.headers.get("authorization")?.split(" ")[1];
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    
    const decoded = await verifyToken(token);
    if (!decoded || decoded.role !== "admin") {
      return NextResponse.json({ error: "Forbidden: Admins only" }, { status: 403 });
    }

    const tourModel = (prisma as any).tour;

    // --- STALE PRISMA CACHE RECOVERY ---
    if (!tourModel) {
      return NextResponse.json({
        error: "Next.js Dev Server Restart Required",
        details: "The new Tour database model has been generated successfully, but the Next.js dev server cache is holding onto a stale Prisma Client definition in memory. Please restart your Next.js development server (Ctrl+C and run 'npm run dev' again) to reload the Prisma Client."
      }, { status: 503 });
    }

    // 2. Extract ID
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Tour ID is required" }, { status: 400 });

    // 3. Delete from DB
    await tourModel.delete({ where: { id } });
    return NextResponse.json({ message: "Tour deleted successfully" }, { status: 200 });
  } catch (error) {
    return handleError(error, "deleting");
  }
}
