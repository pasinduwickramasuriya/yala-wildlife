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
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth";

export function middleware(request: NextRequest) {
  const url = new URL(request.url);
  const token = request.cookies.get("token")?.value;

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
      const decoded = verifyToken(token);
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