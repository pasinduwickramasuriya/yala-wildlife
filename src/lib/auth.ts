// import jwt from "jsonwebtoken";

// const SECRET = process.env.JWT_SECRET || "your-secret-key";

// export function signToken(payload: { id: string; role: string }) {
//   return jwt.sign(payload, SECRET, { expiresIn: "1h" });
// }

// export function verifyToken(token: string) {
//   return jwt.verify(token, SECRET) as { id: string; role: string };
// }


// import jwt from "jsonwebtoken";

// const SECRET = process.env.JWT_SECRET || "your-secret-key";

// export function signToken(payload: { id: string; role: string }) {
//   return jwt.sign(payload, SECRET, { expiresIn: "1h" });
// }

// export function verifyToken(token: string) {
//   try {
//     return jwt.verify(token, SECRET) as { id: string; role: string };
//   } catch (error) {
//     console.error("Token verification failed:", error);
//     return { role: "unauthorized" };
//   }
// }

import { SignJWT, jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key"
);

export interface TokenPayload {
  id: string;
  role: string;
}

export async function signToken(payload: TokenPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(SECRET);
}

export async function verifyToken(token: string): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    // Ensure payload has id and role
    if (
      typeof payload === "object" &&
      payload !== null &&
      "id" in payload &&
      "role" in payload
    ) {
      return { id: payload.id as string, role: payload.role as string };
    }
    throw new Error("Invalid token payload");
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}