import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const all = searchParams.get("all");

  try {
    if (all === "true") {
      const reviews = await prisma.customerReview.findMany({
        orderBy: { createdAt: "desc" },
      });
      console.log("Fetched all reviews:", reviews);
      return NextResponse.json(reviews, { status: 200 });
    } else {
      const reviews = await prisma.customerReview.findMany({
        where: { isApproved: true },
        orderBy: { createdAt: "desc" },
      });
      console.log("Fetched approved reviews:", reviews);
      return NextResponse.json(reviews, { status: 200 });
    }
  } catch (error: unknown) {
    console.error("Error fetching reviews:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      { error: "Failed to fetch reviews", details: errorMessage },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const customerName = formData.get("customerName") as string;
    const customerEmail = formData.get("customerEmail") as string;
    const description = formData.get("description") as string;
    const image = formData.get("image") as File | null;

    if (!customerName || !customerEmail || !description) {
      return NextResponse.json(
        { error: "Missing required fields: customerName, customerEmail, or description" },
        { status: 400 }
      );
    }

    let imageUrl: string | null = null;
    if (image) {
      const buffer = Buffer.from(await image.arrayBuffer());
      const filename = `${Date.now()}-${image.name}`;
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      await mkdir(uploadDir, { recursive: true });
      const uploadPath = path.join(uploadDir, filename);
      await writeFile(uploadPath, buffer);
      imageUrl = `/uploads/${filename}`;
    }

    const review = await prisma.customerReview.create({
      data: {
        customerName,
        customerEmail,
        description,
        imageUrl,
        isApproved: false,
      },
    });

    return NextResponse.json(
      { message: "Review submitted successfully", review },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Error submitting review:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      { error: "Failed to submit review", details: errorMessage },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Review ID is required" }, { status: 400 });
    }

    const review = await prisma.customerReview.update({
      where: { id },
      data: { isApproved: true },
    });
    console.log("Approved review:", review);
    return NextResponse.json(review, { status: 200 });
  } catch (error: unknown) {
    console.error("Error approving review:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      { error: "Failed to approve review", details: errorMessage },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Review ID is required" }, { status: 400 });
    }

    await prisma.customerReview.delete({ where: { id } });
    console.log("Deleted review with ID:", id);
    return NextResponse.json({ message: "Review deleted successfully" }, { status: 200 });
  } catch (error: unknown) {
    console.error("Error deleting review:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      { error: "Failed to delete review", details: errorMessage },
      { status: 500 }
    );
  }
}