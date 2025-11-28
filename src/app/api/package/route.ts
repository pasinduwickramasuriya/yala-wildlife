import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { v2 as cloudinary } from "cloudinary";

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
    // Validate token
    const token = request.headers.get("authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }
    const decoded = verifyToken(token);
    if (!decoded || decoded.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Parse form data
    const formData = await request.formData();
    const name = formData.get("name") as string | null;
    const description = formData.get("description") as string | null;
    const price = parseFloat(formData.get("price") as string) || 0;
    
    // --- NEW FIELDS ---
    const mealPrice = parseFloat(formData.get("mealPrice") as string) || 0;
    const ticketPrice = parseFloat(formData.get("ticketPrice") as string) || 0;
    // ------------------

    const slug = formData.get("slug") as string | null;
    const imageUrl = formData.get("imageUrl") as string | null;
    const imageFile = formData.get("image") as File | null;

    // Validate required fields
    if (!name || !slug) {
      return NextResponse.json({ error: "Name and slug are required" }, { status: 400 });
    }

    // Normalize slug
    const normalizedSlug = normalizeSlug(slug);

    // Handle image upload or URL
    let finalImageUrl: string;
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
    } else if (imageUrl) {
      finalImageUrl = imageUrl;
    } else {
      return NextResponse.json({ error: "Image URL or file is required" }, { status: 400 });
    }

    // Create package
    const pkg = await prisma.package.create({
      data: {
        name,
        description: description || "",
        imageUrl: finalImageUrl,
        price,
        mealPrice,   // Added
        ticketPrice, // Added
        slug: normalizedSlug,
      },
    });

    return NextResponse.json(pkg, { status: 201 });
  } catch (error) {
    return handleError(error, "creating");
  }
}

export async function PUT(request: Request) {
  try {
    // Validate token
    const token = request.headers.get("authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }
    const decoded = verifyToken(token);
    if (!decoded || decoded.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Get ID from query params
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    // Parse form data
    const formData = await request.formData();
    const name = formData.get("name") as string | null;
    const description = formData.get("description") as string | null;
    
    // Price parsing
    const priceRaw = formData.get("price") as string | null;
    const price = priceRaw ? parseFloat(priceRaw) : undefined;

    // --- NEW FIELDS PARSING ---
    const mealPriceRaw = formData.get("mealPrice") as string | null;
    const mealPrice = mealPriceRaw ? parseFloat(mealPriceRaw) : undefined;

    const ticketPriceRaw = formData.get("ticketPrice") as string | null;
    const ticketPrice = ticketPriceRaw ? parseFloat(ticketPriceRaw) : undefined;
    // --------------------------

    const slug = formData.get("slug") as string | null;
    const imageUrl = formData.get("imageUrl") as string | null;
    const imageFile = formData.get("image") as File | null;

    // Normalize slug if provided
    const normalizedSlug = slug ? normalizeSlug(slug) : undefined;

    // Handle image upload or URL (optional for update)
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
    } else if (imageUrl) {
      finalImageUrl = imageUrl;
    }

    // Update package
    const pkg = await prisma.package.update({
      where: { id },
      data: {
        name: name || undefined,
        description: description || undefined,
        imageUrl: finalImageUrl,
        price,
        mealPrice,   // Added
        ticketPrice, // Added
        slug: normalizedSlug,
      },
    });

    return NextResponse.json(pkg);
  } catch (error) {
    return handleError(error, "updating");
  }
}

export async function DELETE(request: Request) {
  try {
    // Validate token
    const token = request.headers.get("authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }
    const decoded = verifyToken(token);
    if (!decoded || decoded.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Get ID from query params
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    // Delete package
    await prisma.package.delete({ where: { id } });
    return NextResponse.json({ message: "Package deleted" }, { status: 200 });
  } catch (error) {
    return handleError(error, "deleting");
  }
}