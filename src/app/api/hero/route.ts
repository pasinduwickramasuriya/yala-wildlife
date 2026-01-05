// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
// import { verifyToken } from "@/lib/auth";
// import fs from "fs/promises";
// import path from "path";

// export async function GET(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const id = searchParams.get("id");

//     if (id) {
//       const hero = await prisma.heroSection.findUnique({ where: { id } });
//       if (!hero) {
//         return NextResponse.json({ error: "Hero section not found" }, { status: 404 });
//       }
//       return NextResponse.json(hero);
//     } else {
//       const heroSections = await prisma.heroSection.findMany();
//       return NextResponse.json(heroSections);
//     }
//   } catch (error: unknown) {
//     const errorMessage = error instanceof Error ? error.message : String(error);
//     console.error("Error fetching hero sections:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch hero sections", details: errorMessage },
//       { status: 500 }
//     );
//   }
// }

// export async function POST(request: Request) {
//   try {
//     const token = request.headers.get("authorization")?.split(" ")[1];
//     if (!token) {
//       return NextResponse.json({ error: "No token provided" }, { status: 401 });
//     }
//     const decoded = verifyToken(token);
//     if (!decoded || decoded.role !== "admin") {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
//     }

//     const formData = await request.formData();
//     const title = formData.get("title") as string | null;
//     const subtitle = formData.get("subtitle") as string | null;
//     const imageUrl = formData.get("imageUrl") as string | null;
//     const imageFile = formData.get("image") as File | null;

//     let finalImageUrl: string;
//     if (imageFile && imageFile.size > 0) {
//       const uploadDir = path.join(process.cwd(), "public/uploads");
//       // Ensure the uploads directory exists
//       await fs.mkdir(uploadDir, { recursive: true });

//       const newFileName = `${Date.now()}-${imageFile.name}`;
//       const filePath = path.join(uploadDir, newFileName);
//       const buffer = Buffer.from(await imageFile.arrayBuffer());
//       await fs.writeFile(filePath, buffer);
//       finalImageUrl = `/uploads/${newFileName}`;
//     } else if (imageUrl) {
//       finalImageUrl = imageUrl;
//     } else {
//       return NextResponse.json({ error: "Image URL or file is required" }, { status: 400 });
//     }

//     const hero = await prisma.heroSection.create({
//       data: {
//         imageUrl: finalImageUrl,
//         title: title || "",
//         subtitle: subtitle || "",
//       },
//     });

//     return NextResponse.json(hero, { status: 201 });
//   } catch (error: unknown) {
//     const errorMessage = error instanceof Error ? error.message : String(error);
//     console.error("Error creating hero section:", { error, stack: error instanceof Error ? error.stack : undefined });
//     return NextResponse.json(
//       { error: "Failed to create hero section", details: errorMessage },
//       { status: 500 }
//     );
//   }
// }

// export async function PUT(request: Request) {
//   try {
//     const token = request.headers.get("authorization")?.split(" ")[1];
//     if (!token) {
//       return NextResponse.json({ error: "No token provided" }, { status: 401 });
//     }
//     const decoded = verifyToken(token);
//     if (!decoded || decoded.role !== "admin") {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
//     }

//     const { searchParams } = new URL(request.url);
//     const id = searchParams.get("id");
//     if (!id) {
//       return NextResponse.json({ error: "ID is required" }, { status: 400 });
//     }

//     const formData = await request.formData();
//     const title = formData.get("title") as string | null;
//     const subtitle = formData.get("subtitle") as string | null;
//     const imageUrl = formData.get("imageUrl") as string | null;
//     const imageFile = formData.get("image") as File | null;

//     let finalImageUrl: string | undefined;
//     if (imageFile && imageFile.size > 0) {
//       const uploadDir = path.join(process.cwd(), "public/uploads");
//       // Ensure the uploads directory exists
//       await fs.mkdir(uploadDir, { recursive: true });

//       const newFileName = `${Date.now()}-${imageFile.name}`;
//       const filePath = path.join(uploadDir, newFileName);
//       const buffer = Buffer.from(await imageFile.arrayBuffer());
//       await fs.writeFile(filePath, buffer);
//       finalImageUrl = `/uploads/${newFileName}`;
//     } else if (imageUrl) {
//       finalImageUrl = imageUrl;
//     }

//     const hero = await prisma.heroSection.update({
//       where: { id },
//       data: {
//         imageUrl: finalImageUrl,
//         title: title || undefined,
//         subtitle: subtitle || undefined,
//       },
//     });

//     return NextResponse.json(hero);
//   } catch (error: unknown) {
//     const errorMessage = error instanceof Error ? error.message : String(error);
//     console.error("Error updating hero section:", { error, stack: error instanceof Error ? error.stack : undefined });
//     return NextResponse.json(
//       { error: "Failed to update hero section", details: errorMessage },
//       { status: 500 }
//     );
//   }
// }

// export async function DELETE(request: Request) {
//   try {
//     const token = request.headers.get("authorization")?.split(" ")[1];
//     if (!token) {
//       return NextResponse.json({ error: "No token provided" }, { status: 401 });
//     }
//     const decoded = verifyToken(token);
//     if (!decoded || decoded.role !== "admin") {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
//     }

//     const { searchParams } = new URL(request.url);
//     const id = searchParams.get("id");
//     if (!id) {
//       return NextResponse.json({ error: "ID is required" }, { status: 400 });
//     }

//     await prisma.heroSection.delete({ where: { id } });
//     return NextResponse.json({ message: "Hero section deleted" }, { status: 200 });
//   } catch (error: unknown) {
//     const errorMessage = error instanceof Error ? error.message : String(error);
//     console.error("Error deleting hero section:", error);
//     return NextResponse.json(
//       { error: "Failed to delete hero section", details: errorMessage },
//       { status: 500 }
//     );
//   }
// }

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

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      const hero = await prisma.heroSection.findUnique({ where: { id } });
      if (!hero) {
        return NextResponse.json({ error: "Hero section not found" }, { status: 404 });
      }
      return NextResponse.json(hero);
    } else {
      const heroSections = await prisma.heroSection.findMany();
      return NextResponse.json(heroSections);
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error fetching hero sections:", error);
    return NextResponse.json(
      { error: "Failed to fetch hero sections", details: errorMessage },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const token = request.headers.get("authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }
    const decoded = await verifyToken(token);
    if (!decoded || decoded.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const formData = await request.formData();
    const title = formData.get("title") as string | null;
    const subtitle = formData.get("subtitle") as string | null;
    const imageUrl = formData.get("imageUrl") as string | null;
    const imageFile = formData.get("image") as File | null;

    let finalImageUrl: string;
    if (imageFile && imageFile.size > 0) {
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const uploadResult = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { folder: "hero_sections", resource_type: "image" },
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

    const hero = await prisma.heroSection.create({
      data: {
        imageUrl: finalImageUrl,
        title: title || "",
        subtitle: subtitle || "",
      },
    });

    return NextResponse.json(hero, { status: 201 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error creating hero section:", { error, stack: error instanceof Error ? error.stack : undefined });
    return NextResponse.json(
      { error: "Failed to create hero section", details: errorMessage },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const token = request.headers.get("authorization")?.split(" ")[1];
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

    const formData = await request.formData();
    const title = formData.get("title") as string | null;
    const subtitle = formData.get("subtitle") as string | null;
    const imageUrl = formData.get("imageUrl") as string | null;
    const imageFile = formData.get("image") as File | null;

    let finalImageUrl: string | undefined;
    if (imageFile && imageFile.size > 0) {
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const uploadResult = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { folder: "hero_sections", resource_type: "image" },
            (error, result) => (error ? reject(error) : resolve(result as CloudinaryUploadResult))
          )
          .end(buffer);
      });
      finalImageUrl = uploadResult.secure_url;
    } else if (imageUrl) {
      finalImageUrl = imageUrl;
    }

    const hero = await prisma.heroSection.update({
      where: { id },
      data: {
        imageUrl: finalImageUrl,
        title: title || undefined,
        subtitle: subtitle || undefined,
      },
    });

    return NextResponse.json(hero);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error updating hero section:", { error, stack: error instanceof Error ? error.stack : undefined });
    return NextResponse.json(
      { error: "Failed to update hero section", details: errorMessage },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const token = request.headers.get("authorization")?.split(" ")[1];
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

    await prisma.heroSection.delete({ where: { id } });
    return NextResponse.json({ message: "Hero section deleted" }, { status: 200 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error deleting hero section:", error);
    return NextResponse.json(
      { error: "Failed to delete hero section", details: errorMessage },
      { status: 500 }
    );
  }
}