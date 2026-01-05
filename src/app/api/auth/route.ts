import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { signToken } from "@/lib/auth";
export async function POST(request: Request) {
  console.log("Auth route: Request received");
  try {
    const body = await request.json();
    console.log("Auth route: Body parsed", { email: body.email }); // Don't log password

    const { email, password } = body;

    console.log("Auth route: Attempting DB connection...");
    const user = await prisma.user.findUnique({ where: { email } });
    console.log("Auth route: User lookup result:", user ? "Found" : "Not found");

    if (!user) {
      console.log("Auth route: User not found");
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    console.log("Auth route: Verifying password...");
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      console.log("Auth route: Password invalid");
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    if (user.role !== "admin") {
      console.log("Auth route: User not admin");
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    console.log("Auth route: Signing token...");
    const token = await signToken({ id: user.id, role: user.role });
    console.log("Auth route: Token signed, returning response");

    return NextResponse.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}