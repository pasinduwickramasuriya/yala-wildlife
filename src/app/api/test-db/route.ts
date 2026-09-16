import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
//p
export async function GET() {
    try {
        console.log("Test DB route: Attempting connection...");
        const start = Date.now();
        const count = await prisma.user.count();
        const duration = Date.now() - start;

        console.log("Test DB route: Connection successful", { count, duration });
        return NextResponse.json({
            status: "ok",
            message: "Database connection successful",
            userCount: count,
            duration: `${duration}ms`
        });
    } catch (error: any) {
        console.error("Test DB route: Connection failed", error);
        return NextResponse.json({
            status: "error",
            message: "Database connection failed",
            error: error.message,
            stack: error.stack
        }, { status: 500 });
    }
}
