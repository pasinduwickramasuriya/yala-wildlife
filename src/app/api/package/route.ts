import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import fs from "fs/promises";
import path from "path";

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
      console.log("Fetching package with slug:", slug); // Debug log for 404 issue
      const packageItem = await prisma.package.findUnique({ where: { slug } });
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
    const slug = formData.get("slug") as string | null;
    const imageUrl = formData.get("imageUrl") as string | null;
    const imageFile = formData.get("image") as File | null;

    // Validate required fields
    if (!name || !slug) {
      return NextResponse.json({ error: "Name and slug are required" }, { status: 400 });
    }

    // Handle image upload or URL
    let finalImageUrl: string;
    if (imageFile && imageFile.size > 0) {
      const uploadDir = path.join(process.cwd(), "public/uploads");
      await fs.mkdir(uploadDir, { recursive: true });
      const newFileName = `${Date.now()}-${imageFile.name}`;
      const filePath = path.join(uploadDir, newFileName);
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      await fs.writeFile(filePath, buffer);
      finalImageUrl = `/uploads/${newFileName}`;
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
        slug,
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
    const priceRaw = formData.get("price") as string | null;
    const price = priceRaw ? parseFloat(priceRaw) : undefined;
    const slug = formData.get("slug") as string | null;
    const imageUrl = formData.get("imageUrl") as string | null;
    const imageFile = formData.get("image") as File | null;

    // Handle image upload or URL (optional for update)
    let finalImageUrl: string | undefined;
    if (imageFile && imageFile.size > 0) {
      const uploadDir = path.join(process.cwd(), "public/uploads");
      await fs.mkdir(uploadDir, { recursive: true });
      const newFileName = `${Date.now()}-${imageFile.name}`;
      const filePath = path.join(uploadDir, newFileName);
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      await fs.writeFile(filePath, buffer);
      finalImageUrl = `/uploads/${newFileName}`;
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
        slug: slug || undefined,
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