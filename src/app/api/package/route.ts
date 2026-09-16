import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { PrismaClient } from "@prisma/client";
import { verifyToken } from "@/lib/auth";
import { v2 as cloudinary } from "cloudinary";

const prisma = new PrismaClient();

// Define Cloudinary upload response type
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

// Utility function to normalize slug
function normalizeSlug(slug: string): string {
  return slug
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Utility function to handle errors consistently
const handleError = (error: unknown, action: string) => {
  const errorMessage = error instanceof Error ? error.message : String(error);
  console.error(`Error ${action} package:`, error);
  return NextResponse.json(
    { error: `Failed to ${action} package`, details: errorMessage },
    { status: 500 }
  );
};

// Helper for extracting token from request cookies or header
async function getAdminToken(request: Request): Promise<string | undefined> {
  try {
    const cookieStore = await cookies();
    const tokenFromCookie = cookieStore.get("admin_token")?.value;
    if (tokenFromCookie) return tokenFromCookie;
  } catch {
    // ignore header fallback
  }
  return (request as any).cookies?.get("admin_token")?.value || request.headers.get("authorization")?.split(" ")[1];
}

// Helper to parse newline-separated or JSON list
function parseList(val: string | null): string[] | undefined {
  if (val === null || val === undefined) return undefined;
  const trimmed = val.trim();
  if (trimmed.startsWith("[")) {
    try {
      return JSON.parse(trimmed);
    } catch {
      // Fallback to newline split
    }
  }
  return trimmed.split("\n").map((s) => s.trim()).filter(Boolean);
}

// Helper to parse number safely without returning NaN
function parseNumber(val: string | null): number | undefined {
  if (!val || val.trim() === "") return undefined;
  const num = parseFloat(val);
  return isNaN(num) ? undefined : num;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const slug = searchParams.get("slug");

    if (id) {
      const packageItem = await prisma.package.findUnique({ where: { id } });
      if (!packageItem) {
        return NextResponse.json({ error: "Package not found" }, { status: 404 });
      }
      return NextResponse.json(packageItem);
    } else if (slug) {
      const normalizedSlug = normalizeSlug(slug);
      console.log("Fetching package with slug:", normalizedSlug);
      const packageItem = await prisma.package.findUnique({
        where: { slug: normalizedSlug },
      });
      if (!packageItem) {
        return NextResponse.json({ error: "Package not found" }, { status: 404 });
      }
      return NextResponse.json(packageItem);
    } else {
      const packages = await prisma.package.findMany();
      return NextResponse.json(packages);
    }
  } catch (error) {
    return handleError(error, "fetching");
  }
}

export async function POST(request: Request) {
  try {
    // 1. Auth Check
    const token = await getAdminToken(request);
    const decoded = token ? await verifyToken(token) : null;

    if (!token || !decoded || decoded.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // 2. Parse Data
    const formData = await request.formData();
    const name = formData.get("name") as string | null;
    const slug = formData.get("slug") as string | null;
    const description = (formData.get("description") as string) || "";

    // Price parsing
    const price = parseNumber(formData.get("price") as string) || 0;
    const mealPrice = parseNumber(formData.get("mealPrice") as string) || 0;
    const ticketPrice = parseNumber(formData.get("ticketPrice") as string) || 0;

    // Array parsing
    const highlights = parseList(formData.get("highlights") as string | null) || [];
    const inclusions = parseList(formData.get("inclusions") as string | null) || [];
    const exclusions = parseList(formData.get("exclusions") as string | null) || [];

    // Image Data
    const imageUrl = formData.get("imageUrl") as string | null;
    const imageFile = formData.get("image") as File | null;

    if (!name || !slug) {
      console.error("POST Failed: Missing Name or Slug", { name, slug });
      return NextResponse.json({ error: "Name and slug are required" }, { status: 400 });
    }

    let finalImageUrl = "";
    if (imageFile && imageFile.size > 0) {
      console.log("Uploading image to Cloudinary...");
      try {
        const arrayBuffer = await imageFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const uploadResult = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              { folder: "packages", resource_type: "image" },
              (error, result) => (error ? reject(error) : resolve(result as CloudinaryUploadResult))
            )
            .end(buffer);
        });
        finalImageUrl = uploadResult.secure_url;
      } catch (uploadError) {
        console.error("Cloudinary Upload Failed:", uploadError);
        return NextResponse.json({ error: "Image upload failed" }, { status: 500 });
      }
    } else if (imageUrl && imageUrl.trim() !== "") {
      finalImageUrl = imageUrl;
    } else {
      console.error("POST Failed: No Image Provided");
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }

    const normalizedSlug = normalizeSlug(slug);

    const pkg = await (prisma.package as any).create({
      data: {
        name,
        slug: normalizedSlug,
        description,
        imageUrl: finalImageUrl,
        price,
        mealPrice,
        ticketPrice,
        highlights,
        inclusions,
        exclusions,
      },
    });

    console.log("Package Created Successfully:", pkg.id);
    return NextResponse.json(pkg, { status: 201 });
  } catch (error) {
    console.error("POST Database Error:", error);
    return handleError(error, "creating");
  }
}

export async function PUT(request: Request) {
  try {
    // Validate token
    const token = await getAdminToken(request);
    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }
    const decoded = await verifyToken(token);
    if (!decoded || decoded.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const formData = await request.formData();
    const id = searchParams.get("id") || (formData.get("id") as string | null);

    if (!id || id.trim() === "") {
      return NextResponse.json({ error: "Package ID is required for update" }, { status: 400 });
    }

    const name = formData.get("name") as string | null;
    const description = formData.get("description") as string | null;

    const price = parseNumber(formData.get("price") as string);
    const mealPrice = parseNumber(formData.get("mealPrice") as string);
    const ticketPrice = parseNumber(formData.get("ticketPrice") as string);

    const highlights = parseList(formData.get("highlights") as string | null);
    const inclusions = parseList(formData.get("inclusions") as string | null);
    const exclusions = parseList(formData.get("exclusions") as string | null);

    const slug = formData.get("slug") as string | null;
    const imageUrl = formData.get("imageUrl") as string | null;
    const imageFile = formData.get("image") as File | null;

    let finalImageUrl: string | undefined;
    if (imageFile && imageFile.size > 0) {
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const uploadResult = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { folder: "packages", resource_type: "image" },
            (error, result) => (error ? reject(error) : resolve(result as CloudinaryUploadResult))
          )
          .end(buffer);
      });
      finalImageUrl = uploadResult.secure_url;
    } else if (imageUrl && imageUrl.trim() !== "") {
      finalImageUrl = imageUrl;
    }

    const updateData: any = {};
    if (name) updateData.name = name;
    if (description !== null && description !== undefined) updateData.description = description;
    if (finalImageUrl) updateData.imageUrl = finalImageUrl;
    if (price !== undefined) updateData.price = price;
    if (mealPrice !== undefined) updateData.mealPrice = mealPrice;
    if (ticketPrice !== undefined) updateData.ticketPrice = ticketPrice;
    if (slug) updateData.slug = normalizeSlug(slug);
    if (highlights !== undefined) updateData.highlights = highlights;
    if (inclusions !== undefined) updateData.inclusions = inclusions;
    if (exclusions !== undefined) updateData.exclusions = exclusions;

    console.log("Updating package ID:", id, "Payload keys:", Object.keys(updateData));

    let pkg;
    try {
      pkg = await (prisma.package as any).update({
        where: { id },
        data: updateData,
      });
    } catch (updateErr: any) {
      if (updateErr?.message?.includes("Unknown argument")) {
        console.warn("Prisma schema mismatch detected in dev process memory. Attempting fallback update.");
        const fallbackData = { ...updateData };
        delete fallbackData.highlights;
        delete fallbackData.inclusions;
        delete fallbackData.exclusions;
        pkg = await (prisma.package as any).update({
          where: { id },
          data: fallbackData,
        });
      } else {
        throw updateErr;
      }
    }

    console.log("Package Updated Successfully:", pkg.id);
    return NextResponse.json(pkg);
  } catch (error) {
    console.error("PUT Database Error:", error);
    return handleError(error, "updating");
  }
}

export async function DELETE(request: Request) {
  try {
    const token = await getAdminToken(request);
    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }
    const decoded = await verifyToken(token);
    if (!decoded || decoded.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    await prisma.package.delete({ where: { id } });
    return NextResponse.json({ message: "Package deleted" }, { status: 200 });
  } catch (error) {
    return handleError(error, "deleting");
  }
}