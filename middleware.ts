// import { verifyToken } from "@/lib/auth";
// import { NextResponse } from "next/server";
// // import { verifyToken } from "./lib/auth";
// // import { verifyToken } from "@/lib/auth";

// export function middleware(request: Request) {
//   const url = new URL(request.url);
//   const token = request.headers.get("authorization")?.split(" ")[1];

//   if (url.pathname === "/admin/login") {
//     return NextResponse.next();
//   }

//   if (url.pathname.startsWith("/admin")) {
//     if (!token) {
//       return NextResponse.redirect(new URL("/admin/login", request.url));
//     }
//     try {
//       const decoded = verifyToken(token);
//       if (decoded.role !== "admin") {
//         return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
//       }
//       return NextResponse.next();
//     } catch (error) {
//       return NextResponse.redirect(new URL("/admin/login", request.url));
//     }
//   }
//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/admin/:path*"],
// };


import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function middleware(request: Request) {
  const url = new URL(request.url);
  // Check cookie first, then header (for compatibility)
  // Note: Standard Next.js Request object handling for cookies
  const cookieStore = request.cookies;
  // Need to cast to any or use correct type if available, but for Request:
  // request.cookies is available in Next.js Middleware.
  // Using basic header parsing or next/headers logic if easier, 
  // but standard Middleware receives NextRequest which has .cookies.
  // Let's assume request is NextRequest or has cookies.

  // Actually, standard Request doesn't have .cookies on all environments, 
  // but Next.js middleware signature `middleware(request: NextRequest)` does.
  // Let's rely on import/logic or just parsing 'Cookie' header if we stay with Request type.
  // However, normally we can use `request.cookies.get(...)` in Next middleware

  // Safest:
  // parse token from Cookie header manually or use request.cookies if it's NextRequest

  // Let's stick to the simpler logic compatible with the file:
  // Retrieve token from cookie 'admin_token'

  // We need to parse the cookie header manually since the signature is `request: Request`
  const cookieHeader = request.headers.get("cookie") || "";
  const getCookie = (name: string) => {
    const value = `; ${cookieHeader}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
  };

  const token = getCookie("admin_token") || request.headers.get("authorization")?.split(" ")[1];

  // Allow access to /admin/login without token
  if (url.pathname === "/admin/login") {
    return NextResponse.next();
  }

  // Protect all /admin/* routes
  if (url.pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    try {
      const decoded = await verifyToken(token);
      // Check if decoded is null or lacks required properties
      if (!decoded || decoded.role !== "admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
      }
      return NextResponse.next();
    } catch (error) {
      console.error("Middleware token error:", error);
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};