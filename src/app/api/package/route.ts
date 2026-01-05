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
    // 1. Auth Check
    const token = (request as any).cookies?.get("admin_token")?.value || request.headers.get("authorization")?.split(" ")[1];
    const decoded = token ? await verifyToken(token) : null;

    if (!token || !decoded || decoded.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // 2. Parse Data
    const formData = await request.formData();
    const name = formData.get("name") as string | null;
    const slug = formData.get("slug") as string | null;
    const description = formData.get("description") as string || "";

    // Safer number parsing
    const price = parseFloat(formData.get("price")?.toString() || "0");
    const mealPrice = parseFloat(formData.get("mealPrice")?.toString() || "0");
    const ticketPrice = parseFloat(formData.get("ticketPrice")?.toString() || "0");

    // Image Data
    const imageUrl = formData.get("imageUrl") as string | null;
    const imageFile = formData.get("image") as File | null;

    // 3. Validation Logging (Check your terminal if it fails!)
    if (!name || !slug) {
      console.error("POST Failed: Missing Name or Slug", { name, slug });
      return NextResponse.json({ error: "Name and slug are required" }, { status: 400 });
    }

    // 4. Image Handling Logic
    let finalImageUrl = "";

    // Priority 1: File Upload
    if (imageFile && imageFile.size > 0) {
      console.log("Uploading image to Cloudinary...");
      try {
        const arrayBuffer = await imageFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const uploadResult = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { folder: "packages", resource_type: "image" },
            (error, result) => (error ? reject(error) : resolve(result as CloudinaryUploadResult))
          ).end(buffer);
        });
        finalImageUrl = uploadResult.secure_url;
      } catch (uploadError) {
        console.error("Cloudinary Upload Failed:", uploadError);
        return NextResponse.json({ error: "Image upload failed" }, { status: 500 });
      }
    }
    // Priority 2: URL String
    else if (imageUrl && imageUrl.trim() !== "") {
      finalImageUrl = imageUrl;
    }
    // Fail if neither exists
    else {
      console.error("POST Failed: No Image Provided");
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }

    // 5. Create Record
    const normalizedSlug = normalizeSlug(slug);

    const pkg = await prisma.package.create({
      data: {
        name,
        slug: normalizedSlug,
        description,
        imageUrl: finalImageUrl,
        price,
        mealPrice,
        ticketPrice,
      },
    });

    console.log("Package Created Successfully:", pkg.id);
    return NextResponse.json(pkg, { status: 201 });

  } catch (error) {
    // This logs the exact Prisma error to your terminal
    console.error("POST Database Error:", error);
    return handleError(error, "creating");
  }
}
export async function PUT(request: Request) {
  try {
    // Validate token
    const token = (request as any).cookies?.get("admin_token")?.value || request.headers.get("authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }
    const decoded = await verifyToken(token);
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
    const token = (request as any).cookies?.get("admin_token")?.value || request.headers.get("authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }
    const decoded = await verifyToken(token);
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